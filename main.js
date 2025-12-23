import { fetchTasks } from './api.js';
import { Task, TaskManager } from './taskManager.js';

const taskManager = new TaskManager();

const loadBtn = document.getElementById('loadTasksBtn');
const statusMsg = document.getElementById('statusMessage');
const taskListContainer = document.getElementById('taskList');

async function handleLoadTasks() {
    try {
        statusMsg.textContent = "Loading tasks...";
        taskListContainer.innerHTML = ""; 

        const rawData = await fetchTasks();

        const jsonString = JSON.stringify(rawData);
        const parsedData = JSON.parse(jsonString);

        const taskInstances = parsedData.map(t => new Task(t.id, t.title, t.completed));
        
        taskManager.setTasks(taskInstances);
        render();
        
        statusMsg.textContent = ""; 
    } catch (error) {
        statusMsg.textContent = "Error: Could not load tasks.";
        console.error(error);
    }
}

function render() {
    taskListContainer.innerHTML = "";

    taskManager.tasks.forEach(task => {
        
        const taskDiv = document.createElement('div');
        taskDiv.className = `task ${task.completed ? 'completed' : ''}`;

        const span = document.createElement('span');
        span.textContent = task.title;
        if (task.completed) span.style.textDecoration = "line-through";

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = "Toggle";
        toggleBtn.addEventListener('click', () => {
            taskManager.toggleTask(task.id);
            render();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', () => {
            taskManager.removeTask(task.id);
            render();
        });

        taskDiv.appendChild(span);
        taskDiv.appendChild(toggleBtn);
        taskDiv.appendChild(deleteBtn);
        taskListContainer.appendChild(taskDiv);
    });
}

loadBtn.addEventListener('click', handleLoadTasks);