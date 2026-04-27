// ─── State ───────────────────────────────────────
let tasks = [];
let currentFilter = 'all';

// ─── DOM References ───────────────────────────────
const taskInput = document.getElementById('task-input');
const addBtn    = document.getElementById('add-btn');
const taskList  = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const filterBtns = document.querySelectorAll('.filter-btn');

// ─── Add Task ─────────────────────────────────────
function addTask() {
  const title = taskInput.value.trim();
  if (!title) return;

  tasks.push({ id: Date.now(), title, completed: false });
  taskInput.value = '';
  taskInput.focus();
  render();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

// ─── Toggle Complete ──────────────────────────────
function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  render();
}

// ─── Filter ───────────────────────────────────────
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

function getFilteredTasks() {
  switch (currentFilter) {
    case 'active':    return tasks.filter(t => !t.completed);
    case 'completed': return tasks.filter(t => t.completed);
    default:          return tasks;
  }
}

// ─── Render ───────────────────────────────────────
function render() {
  const filtered = getFilteredTasks();

  // Task list
  taskList.innerHTML = '';

  if (filtered.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = currentFilter === 'all'
      ? 'No tasks yet. Add one above!'
      : `No ${currentFilter} tasks.`;
    taskList.appendChild(empty);
  } else {
    filtered.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.completed ? ' completed' : '');
      li.setAttribute('role', 'checkbox');
      li.setAttribute('aria-checked', task.completed);
      li.setAttribute('tabindex', '0');
      li.innerHTML = `
        <span class="task-check" aria-hidden="true"></span>
        <span class="task-text">${escapeHtml(task.title)}</span>
      `;
      li.addEventListener('click', () => toggleTask(task.id));
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTask(task.id);
        }
      });
      taskList.appendChild(li);
    });
  }

  // Task count (always based on full list, not filtered)
  const remaining = tasks.filter(t => !t.completed).length;
  taskCount.innerHTML = `<span>${remaining}</span> task${remaining !== 1 ? 's' : ''} remaining`;
}

// ─── Utility ──────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Init ─────────────────────────────────────────
render();
