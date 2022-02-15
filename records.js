function storeDefault() {
  // dummy data of 20 persons are stored here
  var name = "Vijay Dubey";
  var age = "23";
  var dept = "IT";
  var blood = "B+";
  var addr = "Kolkata";
  var contact = "+918282828283";
  var data = {
    name: name,
    age: age,
    dept: dept,
    blood: blood,
    addr: addr,
    contact: contact,
  };
  // console.log("HI");

  // https://www.w3schools.com/jsref/prop_win_localstorage.asp
  window.localStorage.setItem(contact, JSON.stringify(data));
  name = "Neeraj Mishra";
  age = "24";
  dept = "IT";
  blood = "A+";
  addr = "Belur";
  contact = "+918484848484";
  data = {
    name: name,
    age: age,
    dept: dept,
    blood: blood,
    addr: addr,
    contact: contact,
  };
  window.localStorage.setItem(contact, JSON.stringify(data));
  name = "Raunak Sharma";
  age = "22";
  dept = "CSE";
  blood = "AB";
  addr = "Burrabazar";
  contact = "+918383838383";
  data = {
    name: name,
    age: age,
    dept: dept,
    blood: blood,
    addr: addr,
    contact: contact,
  };
  window.localStorage.setItem(contact, JSON.stringify(data));

  var mytable = "";
  items = { ...localStorage };
  for (var key in items) {
    arr = JSON.parse(window.localStorage.getItem(key));
    mytable += "<tr id='" + arr.name + '\' contenteditable="false">';
    mytable += "<td >" + arr.name + "</td>";
    mytable += "<td >" + arr.age + "</td>";
    mytable += "<td>" + arr.dept + "</td>";
    mytable += "<td>" + arr.blood + "</td>";
    mytable += "<td>" + arr.addr + "</td>";
    mytable += "<td>" + arr.contact + "</td>";
    mytable +=
      "<td><button onclick=\"editFunction('" +
      arr.contact +
      '\')" type="button" class="btn btn-group btn-warning edit">Edit</button></td>';
    mytable +=
      "<td><button onclick=\"deleteFunction('" +
      arr.contact +
      '\')" type="button" class="btn btn-group btn-danger">Delete</button></td>';
    // console.log(arr.contact);
    mytable += "</tr>";
  }
  document.getElementById("my-table").innerHTML += mytable;
}
var arr = [];
window.onload = function () {
  // if my local storage is not empty I will retrieve the data as an object
  // place the data in the table and I have two buttons- edit and delete
  //which onclick have the corresponding functions
  if (window.localStorage.length > 0) {
    var mytable = "";
    items = { ...localStorage };
    for (var key in items) {
      arr = JSON.parse(window.localStorage.getItem(key));
      mytable += "<tr id='" + arr.name + '\' contenteditable="false">';
      mytable += "<td >" + arr.name + "</td>";
      mytable += "<td >" + arr.age + "</td>";
      mytable += "<td>" + arr.dept + "</td>";
      mytable += "<td>" + arr.blood + "</td>";
      mytable += "<td>" + arr.addr + "</td>";
      mytable += "<td>" + arr.contact + "</td>";
      mytable +=
        "<td><button onclick=\"editFunction('" +
        arr.contact +
        '\')" type="button" class="btn btn-group btn-warning edit">Edit</button></td>';
      mytable +=
        "<td><button onclick=\"deleteFunction('" +
        arr.contact +
        '\')" type="button" class="btn btn-group btn-danger">Delete</button></td>';
      // console.log(arr.name);
      mytable += "</tr>";
    }
    document.getElementById("my-table").innerHTML += mytable;
  } else {
    storeDefault();
  }
  //pagination
  const rowsPerPage = 5;
  const rows = $("#my-table tbody tr");
  const rowsCount = rows.length;
  const pageCount = Math.ceil(rowsCount / rowsPerPage); // avoid decimals
  const numbers = $("#numbers");

  // Generate the pagination.
  for (var i = 0; i < pageCount; i++) {
    numbers.append('<li><a href="#">' + (i + 1) + "</a></li>");
  }

  // Mark the first page link as active.
  $("#numbers li:first-child a").addClass("active");

  // Display the first set of rows.
  displayRows(1);

  // On pagination click.
  $("#numbers li a").click(function (e) {
    var $this = $(this);

    e.preventDefault();

    // Remove the active class from the links.
    $("#numbers li a").removeClass("active");

    // Add the active class to the current link.
    $this.addClass("active");

    // Show the rows corresponding to the clicked page ID.
    displayRows($this.text());
  });

  // Function that displays rows for a specific page.
  function displayRows(index) {
    var start = (index - 1) * rowsPerPage;
    var end = start + rowsPerPage;

    // Hide all rows.
    rows.hide();

    // Show the proper rows for this page.
    rows.slice(start, end).show();
  }
};
function deleteFunction(keyElement) {
  //remove the item from local storage
  localStorage.removeItem(keyElement);
  //updates the table
  location.reload();
}
function editFunction(editKey) {
  //changes save button to edit and save the updated data in local storage
  if (
    document.getElementById(editKey).getElementsByClassName("edit")[0]
      .innerHTML === "Save"
  ) {
    document
      .getElementById(editKey)
      .getElementsByClassName("edit")[0].innerHTML = "Edit";
    document
      .getElementById(editKey)
      .getElementsByClassName("edit")[0]
      .classList.remove("btn-success");
    document
      .getElementById(editKey)
      .getElementsByClassName("edit")[0]
      .classList.add("btn-warning");
    document.getElementById(editKey).contentEditable = "false";
    var newTable = document.getElementById(editKey).getElementsByTagName("td");
    var name = newTable[0].innerHTML;
    var age = newTable[1].innerHTML;
    var dept = newTable[2].innerHTML;
    var blood = newTable[3].innerHTML;
    var addr = newTable[4].innerHTML;
    var contact = newTable[5].innerHTML;
    details = {
      name: name,
      age: age,
      dept: dept,
      blood: blood,
      addr: addr,
      contact: contact,
    };

    window.localStorage.setItem(contact, JSON.stringify(details));
    if (editKey != contact) {
      deleteFunction(editKey);
    }
    location.reload();
  } else {
    console.log(editKey);
    document.getElementById(editKey).contentEditable = "true";
    document
      .getElementById(editKey)
      .getElementsByClassName("edit")[0].innerHTML = "Save";
    document
      .getElementById(editKey)
      .getElementsByClassName("edit")[0]
      .classList.remove("btn-warning");
    document
      .getElementById(editKey)
      .getElementsByClassName("edit")[0]
      .classList.add("btn-success");
  }
}
