function store() {
  //stores items in the localStorage
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var dept = document.getElementById("dept").value;
  var blood = document.getElementById("blood").value;
  var addr = document.getElementById("addr").value;
  var contact = document.getElementById("contact").value; //gets the key from the user

  const details = {
    name: name,
    age: age,
    dept: dept,
    blood: blood,
    addr: addr,
    contact: contact,
  };

  window.localStorage.setItem(contact, JSON.stringify(details));
  //converting object to string
}
window.onload = function () {
  document.getElementById("detailsForm").onsubmit = store;
};
