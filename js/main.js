Vue.component('board', {
    template: `
    <div>
    <div class="board">
        <div class="column">
            <h2 class="title_column">Запланированные задачи</h2>
            <div class="content_form">
                <form @submit.prevent="addTask">
                    <div class="title_form">
                        <h4>Создание новой задачи</h4>
                    </div>
                    <label for="task-name">Название задачи:</label>
                    <input id="task-name" type="text" v-model="taskName" required>
                    <label for="task-desc">Описание задачи:</label>
                    <textarea id="task-desc" v-model="description" required></textarea>
                    <label for="deadline">Срок сдачи:</label>
                    <input type="date" id="deadline" v-model="deadline" name="deadline-task" min="2024-01-01" max="2025-12-31" required />
                    <button class='form_button' type="submit">Создать</button>
                </form>
            </div>
                <div v-for="task in planTask" :key="task.id" class="task">
                    <span>Создано: {{task.createdDate }}</span>
                    <span>Срок сдачи: {{task.deadline}}</span>
                    <div class="title-desc">
                        <h3>{{ task.title }}</h3>
                        <span>{{task.description}}</span>
                    </div>
                    <div v-if="task.editedData">Отредактировано: {{task.editedData}}</div>
                        <div v-if="task.edited">
                            <label>Измените описание:</label><br>
                            <textarea class="edited-desc" v-model="editedDescription"></textarea><br>
                            <label>Измените срок сдачи:</label>
                            <input type="date" v-model="editedDeadline" class="edited-deadline" min="2024-01-01" max="2025-12-31"/><br>
                            <button v-on:click="saveEditedTask(task,editedDescription, editedDeadline)">Сохранить</button>
                        </div>
                    <div class="buttons">
                        <button v-on:click="removeTask(task)">Удалить</button>
                        <button  v-on:click="editTasks(task)">Редактировать</button>
                        <button class="arrow_button"  v-on:click="moveFromPlanTask(task)"><i class="arrow right"></i></button>
                    </div>

                </div>


        </div>
        <div class="column">
            <h2 class="title_column">В работе</h2>
            <div v-for="task in workTask" :key="task.id" class="task">
                <span>Создано: {{task.createdDate }}</span>
                <span>Срок сдачи: {{task.deadline}}</span>
                <div class="title-desc">
                    <h3>{{ task.title }}</h3>
                    <span>{{task.description}}</span>
                </div>
                <div v-if="task.editedData">Отредактировано: {{task.editedData}}</div>
                <div v-if="task.edited">
                    <label>Измените описание:</label><br>
                    <textarea class="edited-desc" v-model="editedDescription"></textarea><br>
                    <label>Измените срок сдачи:</label>
                    <input type="date" v-model="editedDeadline" class="edited-deadline" min="2024-01-01" max="2025-12-31"/><br>
                    <button v-on:click="saveEditedTask(task,editedDescription)">Сохранить</button>
                </div>
                <div v-if="task.reason!==''">
                    <span>Причина возврата:</span>
                    {{task.reason}}
                </div>

                <div class="buttons">
                    <button  v-on:click="editTasks(task)">Редактировать</button>
                    <button class="arrow_button" v-on:click="moveFromWorkTask(task)"><i class="arrow right"></i></button>
                </div>


            </div>
        </div>
        <div class="column">
            <h2 class="title_column">Тестирование</h2>
            <div v-for="task in testingTask" :key="task.id" class="task">
                <span>Создано: {{task.createdDate }}</span>
                <span>Срок сдачи: {{task.deadline}}</span>
                <div class="title-desc">
                    <h3>{{ task.title }}</h3>
                    <span>{{task.description}}</span>
                </div>
                <div v-if="task.editedData">Отредактировано: {{task.editedData}}</div>
                <div v-if="task.edited">
                    <label>Измените описание:</label><br>
                    <textarea class="edited-desc" v-model="editedDescription"></textarea><br>
                    <label>Измените срок сдачи:</label>
                    <input type="date" v-model="editedDeadline" class="edited-deadline" min="2024-01-01" max="2025-12-31"/><br>
                    <button v-on:click="saveEditedTask(task,editedDescription)">Сохранить</button>
                </div>
                <div class="buttons">
                    <button v-on:click="editTasks(task)">Редактировать</button>
                    <button class="arrow_button" v-on:click="moveFromTestingTaskBack(task)" :disabled="task.reason === ''" ><i class="arrow left"></i></button>
                    <button class="arrow_button" v-on:click="moveFromTestingTask(task)"><i class="arrow right"></i></button><br>
                </div>

                <label for="reason">Укажите причину, если хотите вернуть задачу назад:</label>
                <input id="reason" type="text" v-model="task.reason"/>
            </div>
        </div>
        <div class="column">
            <h2 class="title_column">Выполненные задачи</h2>
            <div v-for="task in completedTask" :key="task.id" class="task">
                <span>Создано: {{task.createdDate }}</span>
                <span>Срок сдачи: {{task.deadline}}</span>
                <div class="title-desc">
                    <h3>{{ task.title }}</h3>
                    <span>{{task.description}}</span>
                </div>
                <div v-if="task.editedData">Отредактировано: {{task.editedData}}</div>
                <p>{{task.check}}</p>
            </div>
        </div>
    </div>
</div>
    `,
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

let app = new Vue({
    el: '#app',
});