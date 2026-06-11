const data = require("../data.json");

const getTodoIndexById = (todos, id) => {
    return todos.findIndex((todo) => Number(todo.id) === Number(id))
}

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

    const id = Number(req.params.id)
    const index = getTodoIndexById(todos, id)
    const todo = todos[index]

    if (!todos) {
        res.status(404).json({
            message: 'Todos not found'
        })
    }
    else if (index === -1) {
        res.status(404).json({
            message: 'Todo not found'
        })
    }
    else {
        res.status(200).json({
            message: 'Todo found',
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
        id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1, //Fonction pour générer un id unique prenant le max id + 1
        title: req.body.title ?? req.body.name, //Je sais pas comment ca marche mais ca marche pas sans ca...
        description: req.body.description,
        priority: Number(req.body.priority ?? 0),
        checked: Boolean(req.body.checked)
    }
    

    if (!todos) {
        res.status(404).json({
            message: 'Todos not found'
        })
    }
    else {
        todos.push(newTodo)
        res.status(201).json({
            message: 'Todo created',
            newTodo
        })
    }
}

//Modifie un todo par id
const patchTodoById = (req, res) => {

    const todos = data.todos
    const id = Number(req.params.id)
    const index = getTodoIndexById(todos, id)
    const todo = todos[index]

    if (!todos) {
        res.status(404).json({
            message: 'Todos not found'
        })
    }
    else if (index === -1) {
        res.status(404).json({
            message: 'Todo not found'
        })
    }
    else {
        if (req.body.title !== undefined) {
            todo.title = req.body.title
        }
        if (req.body.description !== undefined) {
            todo.description = req.body.description
        }
        if (req.body.priority !== undefined) {
            todo.priority = Number(req.body.priority)
        }
        if (req.body.checked !== undefined) {
            todo.checked = Boolean(req.body.checked)
        }
        res.status(200).json({
            message: 'Todo updated',
            todo
        })
    }
}

//Supprimer un todo par id
const deleteTodoById = (req, res) => {
    const todos = data.todos
    const id = Number(req.params.id)
    const index = getTodoIndexById(todos, id)
    const todo = todos[index]
    if (!todos) {
        res.status(404).json({
            message: 'Todos not found'
        })
    }
    else if (index === -1) {
        res.status(404).json({
            message: 'Todo not found'
        })
    }
    else {
        todos.splice(index, 1)
        res.status(200).json({
            message: 'Todo deleted',
            todo
        })
    }
}

module.exports = {getAllTodo, getTodoById, getTodoByPriority, postTodo, patchTodoById, deleteTodoById}
