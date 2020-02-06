const form = document.getElementById("form");
const text = document.getElementById("text");
const addBTN = document.getElementById("addBTN");
const clearBTN = document.getElementById("clearBTN");
const list = document.getElementById("list");
const itemTitle = document.querySelector(".itemTitle");

const localStorageTodos = JSON.parse(localStorage.getItem("todos"));

let todos = localStorage.getItem("todos") !== null ? localStorageTodos : [];

// 3 Add Todo to list
function addTodo(e) {
  e.preventDefault();

  if (text.value === "") {
    return false;
  } else {
    clearBTN.style.opacity = "1";
    const todo = {
      id: randomID(),
      text: text.value
    };
    todos.push(todo);
    addTodosDom(todo);
    updateLocalStorage();

    text.value = "";
  }
}

// 5 Remove

function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== id);

  updateLocalStorage();
  init();
}

// 1 Add ToDos to DOM
function addTodosDom(todo) {
  itemTitle.style.display = "block";

  const li = document.createElement("li");
  li.classList.add("list-item");
  li.innerHTML = `${todo.text} <button class="delete-btn" onclick="removeTodo(${todo.id})">X</button>`;
  list.appendChild(li);
}

// 4 random ID
function randomID() {
  return Math.floor(Math.random() * 100000000);
}

// 7.
function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 2 init
function init() {
  list.innerHTML = "";
  todos.forEach(addTodosDom);
}
init();

// 8
function clearTodos() {
  localStorage.clear();
  todos = [];
  list.innerHTML = "";
  itemTitle.style.display = "none";
  clearBTN.style.opacity = "0.1";
}

// event listeners
form.addEventListener("submit", addTodo);
clearBTN.addEventListener("click", clearTodos);
