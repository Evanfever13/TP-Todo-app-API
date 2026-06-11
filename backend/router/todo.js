const express = require('express')
const controller = require('../controller/todo')
const router = express.Router()


router.get('/todos/', controller.getAllTodo)
router.get('/todoId/:id/', controller.getTodoById)
router.get('/todoPrio/:priority/', controller.getTodoByPriority)
router.post('/post/todo/', controller.postTodo)
router.patch('/patch/todo/:id/', controller.patchTodoById)
router.delete('/delete/todo/:id/', controller.deleteTodoById)

module.exports = router