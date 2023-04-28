const taskList = document.getElementById('taskList');
const addForm = document.getElementById('addForm');
const taskInput = document.getElementById('taskInput');

const getTasks = () => {
    axios.get('http://localhost:3000/tasks').then((res) => {
        displayTasks(res.data.result)
    })
}

const displayTasks = (tasks) => {

    taskList.innerHTML = '';

    tasks = tasks.reverse()

    tasks.forEach((element) => {
        const li = document.createElement('li');
        li.id = "list-item"
        const span = document.createElement('span');
        if (element.completed == 1) {
            span.id = "task-span"
        }

        const div = document.createElement('div');
        div.id = "task-buttons"

        const delButton = document.createElement('button');
        const doneButton = document.createElement('button');
        const editButton = document.createElement('button');

        doneButton.innerHTML = element.completed == 0 ? 'Done' : 'Undone'
        editButton.innerHTML = 'Edit';

        doneButton.addEventListener('click', () => {
            const value = element.completed == 0 ? 1 : 0;
            toggleDoneTask(element.id, value);
        })

        editButton.addEventListener('click', () => {
            const newTask = prompt("Enter new task: ");
            if (newTask) {
                editTask(element.id, newTask);
            }
        })

        delButton.innerText = 'Delete';

        delButton.addEventListener('click', () => {
            DeleteTask(element.id);
        })

        span.innerText = element.task;

        div.appendChild(delButton);
        div.appendChild(doneButton);
        div.appendChild(editButton);

        li.appendChild(span);
        li.append(div)
        taskList.appendChild(li);
    });

}

const toggleDoneTask = (id, value) => {
    axios.patch('http://localhost:3000/toggledone/' + id, { value }).then((res) => {
        console.log(res);
    })
    getTasks();
}
const editTask = (id, newTask) => {
    axios.patch('http://localhost:3000/edittask/' + id, { newTask }).then((res) => {
        console.log(res);
    })
    getTasks();
}

const DeleteTask = (id) => {
    axios.delete('http://localhost:3000/deleteTask/' + id).then((res) => {
        console.log(res);
    })
    getTasks();
}

const addTasks = (task) => {
    axios.post('http://localhost:3000/tasks', { task }).then((res) => {
        console.log(res);
    })
    getTasks()
}

addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
        addTasks(task);
        taskInput.value = '';
    }
})

getTasks();