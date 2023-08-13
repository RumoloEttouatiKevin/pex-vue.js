const app = {
    data() {
        return {
            todoList: [],
            newTodo: {
                isDone: false,
            },
        };
    },
    methods: {
        addTodo: function() {
            if (this.newTodo.name) {
                this.todoList.push(this.newTodo);

                this.newTodo = {isDone: false};

                localStorage.setItem('todoList', JSON.stringify(this.todoList));
            } else {
                alert('Name field is required.');
            }
        },
        storeTodoList() {
            localStorage.setItem('todoList', JSON.stringify(this.todoList));
        },
    },
    created() {
        this.todoList = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : this.todoList ;
    },
    // updated() {
    //     localStorage.setItem('todoList', JSON.stringify(this.todoList));
    // },
}

Vue.createApp(app).mount('#app');
