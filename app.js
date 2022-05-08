// //npm install express --save
// //npm install nodemon --save-dev
// const express = require("express")
// const app = express()

// // vamos implementar a cadeia de middleware, que é percorrida na ordem em que é declarada com app.use(middleware-function)

// // o primeiro middleware a ser usado é um que já vem com o express. Ele pega o body enviado na requisição - req.body - e o disponibiliza como json

// app.use(express.json())

// // o segundo middleware vai imprimir o req.body recebido junto com a hora atual

// const log = (req, res, next)=>{
//     console.log(req.body)
//     console.log("Data atual: "+ Date.now())
//     next() // essa linha é pra chamar o proximo middleware, caso haja proximo
// }

// app.use(log)    // se eu rodar apenas esse middleware, sem o express.json() o req.body devolve undefined

// app.get("/", (req, res)=>{
//     res.send("<h1>Lista de tarefas</h1>")
// })

// app.get("/json", (req,res)=>{
//     res.json({title: "Lista de tarefas", firstTask: "do something", done: true})
// })

// app.listen(3000, ()=>{
//     console.log("SERVIDOR RODANDO!")
// })

//-------------------------------------------------------------------------------------------------

const checklist = require("./src/routes/checklist")
const rootRouter = require("./src/routes/index.js")
const path = require('path')
require('./config/database')    // isso aqui é pra conectar à base de dados criada pelo terminal do mongo - só repete o macaco do database.js
const express = require("express")
const app = express()

app.set('view engine', 'ejs')   // essa linha diz ao express que vamos gerar paginas ejs ("react") atraves das rotas -> view engine (mecanismo de vista) é o ejs tem que instalar -> npm install ejs --save

app.use(express.static(path.join(__dirname, "public"))) // existem arquivos estaticos, que sao sempre iguais, que devem ser carregados

app.use(express.json())

app.set("views", path.join(__dirname, 'src/views'))
// aqui podemos chamar as rotas definidas em outros arquivos como se fossem middlewares

app.use("/", rootRouter)
// o primeiro parametro serve para que façamos essa requisição quando estivermos no caminho /checklist e o restante é o que está dentro do path 
// das requisições do arquivo checklist
app.use("/checklists", checklist)

app.listen(3000, ()=>{
    console.log("SERVIDOR RODANDO!") 
})