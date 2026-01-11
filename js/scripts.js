// Seleção de elementos
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;
//Funções
const saveTask = (text) => {

    const task = document.createElement("div");
    task.classList.add("task");

    const taskTitle = document.createElement("h3");
    taskTitle.innerText = text;
    task.appendChild(taskTitle);

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-task")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    task.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-task")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    task.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-task")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    task.appendChild(deleteBtn)

    taskList.appendChild(task);

    taskInput.value = "";
    taskInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    taskForm.classList.toggle("hide");
    taskList.classList.toggle("hide");
};

const updateTask = (text) => {
    const todas = document.querySelectorAll(".task");

        todas.forEach((task) => {
        
            let taskTitle = task.querySelector("h3")

            if(taskTitle.innerText === oldInputValue) {
                taskTitle.innerText = text
            }

    });

};

//Eventos
taskForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const inputValue = taskInput.value;

    if (inputValue) {
        saveTask(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let taskTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        taskTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-task")) {
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains("remove-task")) {
        parentEl.remove();
    }

    if (targetEl.classList.contains("edit-task")) {
        toggleForms();

        editInput.value = taskTitle
        oldInputValue = taskTitle
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTask(editInputValue);
    }

    toggleForms();
});
