// To-Do App with localStorage functionality
class TodoApp {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.taskForm = document.getElementById('task-form');
    this.taskInput = document.getElementById('task-input');
    this.dueDateInput = document.getElementById('due-date');
    this.prioritySelect = document.getElementById('priority');
    this.taskList = document.getElementById('task-list');
    
    this.init();
  }

  // Initialize the app
  init() {
    this.renderTasks();
    this.taskForm.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  // Handle form submission to add new task
  handleSubmit(e) {
    e.preventDefault();
    
    const taskText = this.taskInput.value.trim();
    const dueDate = this.dueDateInput.value;
    const priority = this.prioritySelect.value;
    
    if (taskText) {
      const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        dueDate: dueDate,
        priority: priority,
        createdAt: new Date().toISOString()
      };
      
      this.tasks.push(task);
      this.saveTasks();
      this.renderTasks();
      this.taskForm.reset();
    }
  }

  // Toggle task completion status
  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.renderTasks();
    }
  }

  // Delete a task
  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
    this.renderTasks();
  }

  // Edit a task
  editTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      const newText = prompt('Edit task:', task.text);
      if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        this.saveTasks();
        this.renderTasks();
      }
    }
  }

  // Save tasks to localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Render all tasks to the DOM
  renderTasks() {
    this.taskList.innerHTML = '';
    
    this.tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;
      
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} 
               onchange="todoApp.toggleTask(${task.id})">
        <div class="task-content">
          <div class="task-title">${task.text}</div>
          <div class="task-details">
            ${task.dueDate ? `Due: ${task.dueDate}` : ''} | 
            Priority: ${task.priority}
          </div>
        </div>
        <div class="task-actions">
          <button class="edit-btn" onclick="todoApp.editTask(${task.id})">✏️</button>
          <button class="delete-btn" onclick="todoApp.deleteTask(${task.id})">🗑️</button>
        </div>
      `;
      
      this.taskList.appendChild(li);
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.todoApp = new TodoApp();
}); 