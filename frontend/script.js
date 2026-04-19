// const constants = require("node:fs/promises")
// const ref = require("node:process")

const urlAPI = "http://localhost:8080/"

const todoList = document.querySelector(".todos-list")
const addBtn = document.querySelector(".add-btn")
const refreshBtn = document.querySelector(".refresh-btn")
let allTodos = []

async function apiRequest(path, options = {}) {
    const response = await fetch(urlAPI + path, options)
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
    }
    return response.json()
}

async function getAllTodo() {
    try{
        const result = await apiRequest("todos/")

        if (Array.isArray(result)) {
            return result
        }

        if (Array.isArray(result.todos)) {
            return result.todos
        }

        if (Array.isArray(result.todo)) {
            return result.todo
        }

        return []
    } catch(error){
        console.error('Error fetching data : ', error)
        return []
    }
    

}

async function addTodo() {
    const title = prompt("Titre du nouveau todo :")
    if (!title) {
        return
    }

    const description = prompt("Description du todo :", "") ?? ""
    const priorityInput = prompt("Priorite (nombre) :", "0")
    const priority = Number(priorityInput)

    try {
        await apiRequest("post/todo/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description,
                priority: Number.isNaN(priority) ? 0 : priority,
                checked: false
            })
        })

        await displayTodo()
    } catch (error) {
        alert("Impossible d'ajouter le todo.")
        console.error(error)
    }
}

async function editTodo(todo) {
    const newTitle = prompt("Entrez le nouveau titre :", todo.title ?? todo.name ?? "")
    if (newTitle === null) {
        return
    }

    const newDescription = prompt("Entrez la nouvelle description :", todo.description ?? "")
    if (newDescription === null) {
        return
    }

    const newPriorityInput = prompt("Entrez la nouvelle priorite :", String(todo.priority ?? 0))
    if (newPriorityInput === null) {
        return
    }

    const newChecked = confirm("Le todo est-il termine ?")
    const parsedPriority = Number(newPriorityInput)

    try {
        await apiRequest(`patch/todo/${todo.id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTitle,
                description: newDescription,
                priority: Number.isNaN(parsedPriority) ? 0 : parsedPriority,
                checked: newChecked
            })
        })

        await displayTodo()
    } catch (error) {
        alert("Impossible de modifier le todo.")
        console.error(error)
    }
}

async function deleteTodo(todo) {
    const confirmDelete = confirm(`Etes-vous sur de vouloir supprimer le todo \"${todo.title ?? todo.name ?? "Sans titre"}\" ?`)
    if (!confirmDelete) {
        return
    }

    try {
        await apiRequest(`delete/todo/${todo.id}/`, {
            method: "DELETE"
        })

        await displayTodo()
    } catch (error) {
        alert("Impossible de supprimer le todo.")
        console.error(error)
    }
}

async function displayTodo() {
    allTodos = await getAllTodo()
    todoList.innerHTML = ""

    if (!Array.isArray(allTodos) || allTodos.length === 0) {
        const emptyState = document.createElement("p")
        emptyState.textContent = "Aucun todo a afficher. Verifiez que le backend est lance sur le port 8080."
        todoList.appendChild(emptyState)
        return
    }

    allTodos.forEach(todo => {
        const todoElement = document.createElement("div")
        todoElement.classList.add("todo-item")

        const titreElement = document.createElement("h3")
        titreElement.textContent = todo.title ?? todo.name ?? "Sans titre"

        const descriptionElement = document.createElement("p")
        descriptionElement.textContent = todo.description

        const checkedElement = document.createElement("input")
        checkedElement.type = "checkbox"
        checkedElement.checked = todo.checked

        const editButton = document.createElement("button")
        editButton.textContent = "Modifier"
        editButton.classList.add("edit-btn")
        editButton.addEventListener("click", () => editTodo(todo))

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Supprimer"
        deleteButton.classList.add("delete-btn")
        deleteButton.addEventListener("click", () => deleteTodo(todo))

        todoElement.appendChild(titreElement)
        todoElement.appendChild(descriptionElement)
        todoElement.appendChild(checkedElement)
        todoElement.appendChild(editButton)
        todoElement.appendChild(deleteButton)

        todoList.appendChild(todoElement)
    })
}

refreshBtn.addEventListener("click", () => {
    displayTodo()
})

addBtn.addEventListener("click", () => {
    addTodo()
})

displayTodo()
