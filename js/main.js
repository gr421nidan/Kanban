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
            reason: '',
            check: '',
            dateCompleted: new Date().toLocaleDateString(),
            editedTaskName: '',
            editedDescription: '',
            editedDeadline: '',
            editedTaskModal: false,
            editedTask:{}
        };
    },
    methods: {

        addTask() {
            if (this.taskName !== '') {
                const newTask={
                    id: Date.now(),
                    title: this.taskName,
                    description: this.description,
                    deadline: this.deadline,
                    reason: this.reason,
                    check: this.check,
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
        editedTasks(task) {
            this.editedTaskModal = true;
            this.editedTask = task;
            this.editedTaskName = task.title;
            this.editedDescription = task.description;
            this.editedDeadline = task.deadline;

        },
        saveEditedTask(newTask) {
            const index = newTask.indexOf(this.editedTask);
            newTask[index].title = this.editedTaskName;
            newTask[index].description = this.editedDescription;
            newTask[index].deadline = this.editedDeadline;
            this.editedTaskModal = false;
        },

        moveFromPlanTask(task){
            this.planTask.splice(this.planTask.indexOf(task), 1)
            this.workTask.push(task)
        },
        moveFromWorkTask(task){
            this.workTask.splice(this.workTask.indexOf(task), 1)
            this.testingTask.push(task)
        },
        moveFromTestingTask(task){
            this.reason=''
            this.testingTask.splice(this.testingTask.indexOf(task), 1)
            this.completedTask.push(task)
            if (task.deadline >= task.createdDate){
                task.check = 'Выполнено в срок'
            }else {
                task.check = 'Просроченно'
            }
        },
        moveFromTestingTaskBack(task){
            this.testingTask.splice(this.testingTask.indexOf(task), 1)
            this.workTask.push(task)

        }
    },



});