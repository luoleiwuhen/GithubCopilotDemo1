class TodoApp {
    constructor() {
        this.todoInput    = document.getElementById('todoInput');
        this.addBtn       = document.getElementById('addBtn');
        this.todoList     = document.getElementById('todoList');
        this.emptyState   = document.getElementById('emptyState');
        this.totalCount   = document.getElementById('totalCount');
        this.completedCount = document.getElementById('completedCount');
        this.progressBar  = document.getElementById('progressBar');
        this.themeToggle  = document.getElementById('themeToggle');
        this.filterBtns   = document.querySelectorAll('.filter-btn');
        this.todos        = [];
        this.currentFilter = 'all';

        this.init();
    }

    init() {
        // 从 localStorage 加载待办事项和主题
        this.loadTodos();
        this.loadTheme();

        // 绑定事件监听器
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.render();
            });
        });

        this.todoInput.addEventListener('animationend', () => {
            this.todoInput.classList.remove('shake');
        });

        // 初始化渲染
        this.render();
    }

    addTodo() {
        const text = this.todoInput.value.trim();

        if (text === '') {
            this.todoInput.focus();
            this.todoInput.classList.add('shake');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        this.todos.push(todo);
        this.todoInput.value = '';
        this.todoInput.focus();

        this.saveTodos();
        this.render();
    }

    deleteTodo(id) {
        const item = this.todoList.querySelector(`[data-id="${id}"]`);
        if (item) {
            item.classList.add('removing');
            item.addEventListener('animationend', () => {
                this.todos = this.todos.filter(t => t.id !== id);
                this.saveTodos();
                this.render();
            }, { once: true });
        } else {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveTodos();
            this.render();
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    filteredTodos() {
        switch (this.currentFilter) {
            case 'active':    return this.todos.filter(t => !t.completed);
            case 'completed': return this.todos.filter(t =>  t.completed);
            default:          return this.todos;
        }
    }

    render() {
        const visible = this.filteredTodos();

        // 更新统计与进度
        const total     = this.todos.length;
        const done      = this.todos.filter(t => t.completed).length;
        const pct       = total > 0 ? Math.round((done / total) * 100) : 0;

        this.totalCount.textContent     = `${total} 项`;
        this.completedCount.textContent = `${done} 完成`;
        this.progressBar.style.width    = `${pct}%`;

        // 清空列表
        this.todoList.innerHTML = '';

        if (visible.length === 0) {
            this.emptyState.classList.remove('hidden');
        } else {
            this.emptyState.classList.add('hidden');

            visible.forEach(todo => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                li.dataset.id = todo.id;

                li.innerHTML = `
                    <input
                        type="checkbox"
                        class="todo-checkbox"
                        ${todo.completed ? 'checked' : ''}
                        aria-label="标记完成"
                    >
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <button class="delete-btn" aria-label="删除任务">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                `;

                li.querySelector('.todo-checkbox').addEventListener('change', () => this.toggleTodo(todo.id));
                li.querySelector('.delete-btn').addEventListener('click', () => this.deleteTodo(todo.id));

                this.todoList.appendChild(li);
            });
        }
    }

    toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            this.themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    }

    loadTheme() {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.themeToggle.textContent = '☀️';
        }
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        const saved = localStorage.getItem('todos');
        if (saved) {
            this.todos = JSON.parse(saved);
        }
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
