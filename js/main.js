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
        },
        removeTask(task, type){
            this.planTask.splice(this.planTask.indexOf(task), 1)

        },
        // updateTask(task){
        //
        // },

        moveTask(task){
            this.planTask.splice(this.planTask.indexOf(task), 1)
            this.workTask.push(task)
        }

    }

});