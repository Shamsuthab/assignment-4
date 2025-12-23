export class Task {
    constructor(id, title, completed) {
        Object.defineProperty(this, 'id', {
            value: id,
            writable: false,
            enumerable: true
        });
        this.title = title;
        this.completed = completed;
    }

    toggle() {
        return new Task(this.id, this.title, !this.completed);
    }
}

export class TaskManager {
    constructor() {
        this.tasks = [];
    }

    setTasks(tasks) {
        this.tasks = [...tasks]; 
    }

    addTask(task) {
        this.tasks = [...this.tasks, task];
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
    }

    toggleTask(taskId) {
        this.tasks = this.tasks.map(t => 
            t.id === taskId ? t.toggle() : t
        );
    }
}