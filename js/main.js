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

            edited: false,
            editedDescription:'',
            editedDeadline: ''
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
                    edited: false,
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
        editTasks(task) {
            task.edited = true;


        },

        saveEditedTask(task,text,date){
            task.edited = false
            task.description=text
            task.deadline=date
            task.editedData =new Date().toLocaleString()
            this.editedDeadline=''
            this.editedDescription=''

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
            let dateNow= new Date().getTime();
            let dateCompleted=new Date(task.deadline).getTime()
            if (dateCompleted >=dateNow){
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