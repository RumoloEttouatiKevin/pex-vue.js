const applicationLogic = {
    data() {
        return {
            todoListElements: [
                {
                    name: 'toto',
                    isDone: false,
                },
                {
                    name: 'tata',
                    isDone: true,
                }
            ],
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
