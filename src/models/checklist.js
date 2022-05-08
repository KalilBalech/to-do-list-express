const mongoose = require("mongoose")

// O mongo é um banco de dados nao relacional, ou seja, não existe uma estrutura fixa dos dados que serão armazenados. Dessa forma, fica muito dificil
// manipular os dados de entrada que receberemos. Para lidarmos melhor com isso, criaremos estruturas de dados mais ou menos fixas, que serão 
// objetos javascript. Cada coleção da nossa base de dados terá uma estruturazinha

// teremos duas coleções: checklist e task


const ChecklistSchema = mongoose.Schema({   // o schema cria uma estrutura de dados a ser recebida na base de dados to-do-list
    name: {type: String, required: true},   // uma base de dados pode ter diversas coleções. Cada coleção com o seu schema diferente.
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

const ChecklistModel = mongoose.model("ChecklistsCollection", ChecklistSchema) // essa linha vincula o ChecklistSchema à coleção chamada ChecklistsCollection. Demos um nome para a coleção daquele schema

module.exports = ChecklistModel