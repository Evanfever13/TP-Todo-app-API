const urlAPI = "http://localhost:8080/"

const btn = document.querySelector(".btn")
btn.addEventListener('click', getAllTodo)


function getAllTodo() {
    fetch(urlAPI + "todoId/0")
    .then(response => response.json())
    .then(data =>  data)
    .catch(error => console.error('Error fetching data : ', error))
}   