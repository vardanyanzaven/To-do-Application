let todoEls = Array.from(document.querySelectorAll(".todo-el"));
const editBtns = document.querySelectorAll(".todo-edit-btn");
const deleteBtns = document.querySelectorAll(".todo-delete-btn");
const todosSearchbar = document.querySelector(".todos-searchbar");
const addTodoField = document.querySelector(".add-todo-field");
const addTodoBtn = document.querySelector(".add-todo-btn");
const todoCategories = document.querySelector(".tab-category");

function addTodo(event) {    
    event.preventDefault();
    if(addTodoField.value.trim().length !== 0) {
        const todoList = document.querySelector(".todos-list");
        todoList.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="todo-el">
            <button class="todo-edit-btn"><i class="fas fa-edit"></i></button>
            <p class="todo-text">${addTodoField.value}</p>
            <button class="todo-delete-btn">&#9587;</button>
        `
        );
        document.querySelector(".todo-delete-btn").addEventListener("click", addDeleteEvent);
        document.querySelector(".todo-edit-btn").addEventListener("click", addEditEvent)
        addTodoField.value = "";

        document.querySelector(".todo-text").addEventListener("click", function() {
            if(this.classList.contains("todo-text-completed")) {
                this.parentElement.classList.remove("todo-el-completed");
                this.classList.remove("todo-text-completed");
            } else {
                this.parentElement.classList.add("todo-el-completed");
                this.classList.add("todo-text-completed");
            } 
        })
    }
}

function addDeleteEvent() {
        document.querySelector(".todos-list").removeChild(this.parentElement);
};

function addEditEvent() {
    if(this.nextElementSibling.tagName.toLowerCase() === "input") return;
    const pTextContent = this.nextElementSibling.textContent.trim();
    const textInputEl = document.createElement("input");
    textInputEl.classList.add("edit-todo-input");
    textInputEl.setAttribute("type", "text");
    textInputEl.setAttribute("value", pTextContent);
    this.nextElementSibling.replaceWith(textInputEl);
    const editInput = this.parentElement.querySelector(".edit-todo-input");
    editInput.style.width = `${
        editInput.value.length / 1.3
    }ch`;
    editInput.focus();

    const pEl = document.createElement("p");
    pEl.classList.add("todo-text");
    editInput.addEventListener("keypress", (e) => {
        if(e.key === "Enter") {
            e.stopPropagation();
            pEl.innerText = editInput.value;
            editInput.replaceWith(pEl);
        }
    });
}

addTodoBtn.addEventListener("click", addTodo);
document.addEventListener("keypress", (e) => {
    if(e.key === "Enter") addTodo(e);   
});

deleteBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        document.querySelector(".todos-list").removeChild(btn.parentElement);
    })
});

editBtns.forEach(btn => {
    btn.addEventListener("click", addEditEvent)
});
