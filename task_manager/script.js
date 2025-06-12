const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addBtn = document.getElementById('add-btn');
const taskTemplate = document.getElementById('task-template');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => addTask(task.text, task.done));
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(li => ({
        text: li.querySelector('.task-text').textContent,
        done: li.querySelector('.task-complete').checked
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text, done = false) {
    const clone = taskTemplate.content.cloneNode(true);
    const li = clone.querySelector('li');
    const checkbox = li.querySelector('.task-complete');
    const span = li.querySelector('.task-text');
    const delBtn = li.querySelector('.delete-btn');

    span.textContent = text;
    checkbox.checked = done;
    if (done) span.classList.add('done');

    checkbox.addEventListener('change', () => {
        span.classList.toggle('done', checkbox.checked);
        saveTasks();
    });

    delBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
    saveTasks();
}

addBtn.addEventListener('click', () => {
    const text = newTaskInput.value.trim();
    if (text) {
        addTask(text);
        newTaskInput.value = '';
    }
});

newTaskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

loadTasks();
