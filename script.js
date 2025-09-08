const form = document.getElementById('task-form');
const textBox = document.getElementById('textBox');
const category = document.getElementById('category');
const taskList = document.getElementById('task-list');

// const form = document.getElementById('task-form');
// const taskInput = document.getElementById('task-input');
// const categorySelect = document.getElementById('category-select');
// const taskList = document.getElementById('task-list');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>[${task.category}] ${task.text}</span>
      <div>
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="editTask(${index})">✏</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = {
    text: textBox.value,
    category: category.value,
    completed: false
  };
  tasks.push(newTask);
  textBox.value = '';
  saveTasks();
});

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    saveTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

renderTasks();