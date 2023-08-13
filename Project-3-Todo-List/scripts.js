const applicationLogic = {
    data() {
        return {
            todoListElements: [],
            newTodoListElement: {
                isDone: false,
            },
        };
    },
    methods: {
        addTodoList: function() {
            if (this.newTodoListElement.name) {
                this.todoListElements.push(this.newTodoListElement);

                this.newTodoListElement = {isDone: false,};
            } else {
                alert('Name field is mandatory.');
            }
        },
    },
}

Vue.createApp(applicationLogic).mount('#app');
