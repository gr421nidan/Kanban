new Vue({
    el: '#app',

    data() {
        return {
            taskName: '',
            planTask: [],
            workTask: [],
            testingTask: [],
            completedTask: [],
            description: '',
            deadline: '',


        };
    },
    methods: {

        addTask() {
            if (this.taskName !== '') {
                const newTask = {
                    title: this.taskName,
                    description: this.description,
                    deadline: this.deadline,
                };
                if (this.taskName !== '') {
                    newTask.createdDate = new Date().toLocaleDateString();
                    this.planTask.push(newTask);
                } else alert("Введите название задачи")

                this.taskName = '';
                this.description = '';
                this.deadline = '';

            }
        }
    }

});