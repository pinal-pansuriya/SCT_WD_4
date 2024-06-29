// script.js
document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value;
    const taskTime = taskDate.value;
    const taskId = Date.now().toString();

    const task = {
        id: taskId,
        text: taskText,
        time: taskTime,
        completed: false
    };

    createTaskElement(task);
    saveTask(task);
    taskForm.reset();
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;

    const taskInfo = document.createElement('div');
    taskInfo.innerHTML = `<strong>${task.text}</strong> <small>${task.time}</small>`;

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.addEventListener('click', () => completeTask(task.id));

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', () => editTask(task.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(taskInfo);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    if (task.completed) {
        li.classList.add('completed');
    }

    taskList.appendChild(li);
}

function completeTask(id) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks(tasks);
    refreshTaskList();
}

function editTask(id) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === id);

    taskInput.value = task.text;
    taskDate.value = task.time;

    deleteTask(id);
}

function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    refreshTaskList();
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(createTaskElement);
}

function refreshTaskList() {
    taskList.innerHTML = '';
    loadTasks();
}


// addTask: Adds a new task.
// createTaskElement: Creates and appends a task element to the list.
// completeTask: Toggles the completion status of a task.
// editTask: Allows editing of a task.
// deleteTask: Deletes a task.
// saveTask, saveTasks, getTasks: Handle saving to and retrieving from LocalStorage.
// loadTasks: Loads tasks from LocalStorage on page load.
// refreshTaskList: Refreshes the task list to reflect updates.



