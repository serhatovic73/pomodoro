// File: mini-todo.js

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

const TODO_KEY = "todoTasks";

// Initialize To-Do list
function initTodo() {
  const tasks = JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
  renderTodo(tasks);
}

// Render tasks
function renderTodo(tasks) {
  todoList.innerHTML = "";
  tasks.forEach((taskObj, i) => {
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center text-black bg-gray-100 p-2 rounded-md shadow-sm";

    const span = document.createElement("span");
    span.className = "break-words";
    span.textContent = taskObj.text;
    if (taskObj.completed) {
      span.classList.add("line-through", "text-gray-400");
    }

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "flex gap-1";

    const btnToggle = document.createElement("button");
    btnToggle.className =
      "bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs";
    btnToggle.textContent = taskObj.completed ? "Undo" : "Done";
    btnToggle.addEventListener("click", () => toggleTask(i));

    const btnDelete = document.createElement("button");
    btnDelete.className =
      "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs";
    btnDelete.textContent = "Delete";
    btnDelete.addEventListener("click", () => deleteTask(i));

    buttonsDiv.appendChild(btnToggle);
    buttonsDiv.appendChild(btnDelete);

    li.appendChild(span);
    li.appendChild(buttonsDiv);
    todoList.appendChild(li);
  });
}

// Add new task
function addTask() {
  const value = todoInput.value.trim();
  if (!value) return alert("Task cannot be empty");
  const tasks = JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
  tasks.push({ text: value, completed: false });
  localStorage.setItem(TODO_KEY, JSON.stringify(tasks));
  todoInput.value = "";
  renderTodo(tasks);
}

// Toggle completed state
function toggleTask(index) {
  const tasks = JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
  if (index < 0 || index >= tasks.length) return;
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem(TODO_KEY, JSON.stringify(tasks));
  renderTodo(tasks);
}

// Delete task
function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
  if (index < 0 || index >= tasks.length) return;
  tasks.splice(index, 1);
  localStorage.setItem(TODO_KEY, JSON.stringify(tasks));
  renderTodo(tasks);
}

// Event listener for adding task
addTodoBtn.addEventListener("click", addTask);

// Allow pressing Enter to add task
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Initialize on page load
initTodo();
