const data = require("../data.json");

//Toutes les todos
const getAllTodo = (req, res) => {

    const todos = data.todos

    if (!todos) {
        res.status(404).json({
            message: 'Todos not found'
        })
    } 
    else {
        res.status(200).json({
            message: 'Todos found',
            todos
        })
    }
}

//Cherche les todos par id
const getTodoById = (req, res) => {

    const todos = data.todos

    const id = req.params.id
    const todo = todos[id]

    if (!todos) {
        res.status(404).json({
            message: 'Todos not found'
        })
    } 
    else {
        res.status(200).json({
            message: 'Todos found',
            todo
        })
    }
}

//Cherche les todos par priorite
const getTodoByPriority = (req, res) => {

    const todos = data.todos

    const todo = []
    const priority = req.params.priority

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].priority == priority){
            todo.push(todos[i])
        }    
    }
    
    if (!todos) {
        res.status(404).json({
            message: 'Todos not found'
        })
    } 
    else {
        res.status(200).json({
            message: 'Todos found',
            todo
            
        })
    }
}

//Crée un nouveau todo
const postTodo = (req, res) => {
    const todos = data.todos

    const newTodo = {
        id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1, //Fonction pour générer un id unique prenant le max id + 1²
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,    
        checked: req.body.checked
    }
    todos.push(newTodo)

    if (!todos) {
        res.status(404).json({
            message: 'Todos not found'
        })
    }
    else {
        res.status(200).json({
            message: 'Todo created',
            newTodo
        })
    }
}

//Modifie un todo par id
const patchTodoById = (req, res) => {

    const todos = data.todos
    const id = req.body.id

    const todo = todos[id]

    if (!todos) {
        res.status(404).json({
            message: 'Todos not found'
        })
    }
    else {
        if (req.body.title) {
            todo.title = req.body.title
        }
        if (req.body.description) {
            todo.description = req.body.description
        }
        if (req.body.priority) {
            todo.priority = req.body.priority
        }
        if (req.body.checked) {
            todo.checked = req.body.checked
        }
        res.status(200).json({
            message: 'Todo updated',
            todo
        })
    }

    res.status(200).json({
        message: 'Todo updated',
        todo
    })
}

//Supprimer un todo par id
const deleteTodoById = (req, res) => {
    const todos = data.todos
    const id = req.body.id
    const todo = todos[id]
    if (!todos) {
        res.status(404).json({
            message: 'Todos not found'
        })
    }
    else {
        todos.splice(id, 1)
        res.status(200).json({
            message: 'Todo deleted',
            todo
        })
    }
}

module.exports = {getAllTodo, getTodoById, getTodoByPriority, postTodo, patchTodoById, deleteTodoById}
