// selector
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const finterOption = document.querySelector(".filter-todo");
// function
const addTodo = function (event) {
  // prevent from form submiting
  event.preventDefault();
  //   todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // todo local storage
  saveLocaltodos(todoInput.value);
  //   check mark
  const completebtn = document.createElement("button");
  completebtn.innerHTML = "<i class= 'fas fa-check'></i>";
  completebtn.classList.add("complete-btn");
  todoDiv.appendChild(completebtn);

  //   Delete btn
  const deletebtn = document.createElement("button");
  deletebtn.innerHTML = "<i class= 'fas fa-trash'></i>";
  deletebtn.classList.add("delete-btn");
  todoDiv.appendChild(deletebtn);

  //   appened to the ul list
  todoList.appendChild(todoDiv);
  //   clear to do input value
  todoInput.value = "";
};

const deleteCheck = function (event) {
  const item = event.target;
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    // animation

    todo.classList.add("fall");
    removeTodo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // check
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("Completed");
  }
};

const filterTodo = function (e) {
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        {
          if (todo.classList.contains("Completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("Completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

const saveLocaltodos = function (todo) {
  // check
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //   check mark
    const completebtn = document.createElement("button");
    completebtn.innerHTML = "<i class= 'fas fa-check'></i>";
    completebtn.classList.add("complete-btn");
    todoDiv.appendChild(completebtn);

    //   Delete btn
    const deletebtn = document.createElement("button");
    deletebtn.innerHTML = "<i class= 'fas fa-trash'></i>";
    deletebtn.classList.add("delete-btn");
    todoDiv.appendChild(deletebtn);

    //   appened to the ul list
    todoList.appendChild(todoDiv);
  });
}

const removeTodo = function (todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// event listener
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
finterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);
