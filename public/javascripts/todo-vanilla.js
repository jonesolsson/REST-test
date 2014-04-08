var listEl = document.querySelector("#list"),
    countEl = document.querySelector("#count"),
    formEl = document.forms[0],
    single = "is 1 thing",
    plural = "are x things";

formEl.onsubmit = function(e) {
  e.preventDefault();
  addTask(formEl.elements[0].value);
  formEl.elements[0].value = "";
}

listEl.onclick = function(e) {
  if(e.target.tagName == "INPUT") {
    listEl.removeChild(e.target.parentNode);
    updateCount();
  }
}

function addTask(val) {

  var li = document.createElement("li"),
      label = document.createTextNode(val),
      input = document.createElement("input");

  input.type = "checkbox"
  li.appendChild(input)
  li.appendChild(label)
  listEl.appendChild(li);
  updateCount();
}

function updateCount() {
  if(listEl.children.length == 1) {
    countEl.innerHTML = single;
  } else {
    countEl.innerHTML = plural.replace("x",listEl.children.length);
  }
}
