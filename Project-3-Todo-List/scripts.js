const applicationLogic = {
    data() {
        return {
            todoList: [],
            newTodo: {
                isDone: false,
            },
        };
    },
    methods: {
        addTodoList: function() {
            if (this.newTodo.name) {
                this.todoList.push(this.newTodo);

                this.newTodo = {isDone: false};
            } else {
                alert('Name field is required.');
            }
        },
    },
}

Vue.createApp(applicationLogic).mount('#app');
