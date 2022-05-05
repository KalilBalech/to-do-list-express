//npm install express --save
//npm install nodemon --save-dev
const express = require("express")

const app = express()

app.get("/", (req, res)=>{
    res.send("<h1>Lista de tarefas</h1>")
})

app.get("/json", (req,res)=>{
    res.json({title: "Lista de tarefas", firstTask: "do something", done: true})
})

app.listen(3000, ()=>{
    console.log("SERVIDOR RODANDO!")
})