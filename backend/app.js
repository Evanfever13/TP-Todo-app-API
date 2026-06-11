const express = require('express')
const app = express()
const port = 8080

const cors = require('cors')
app.use(cors({origin: '*'}))
app.use(express.json())

const Router = require('./router/todo.js')
app.use(Router)

app.listen(port, () => console.log('Server listening on port', port))