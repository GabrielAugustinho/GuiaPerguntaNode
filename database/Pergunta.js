const Sequelize = require("sequelize");
const connection = require("./database");

// Define um model
const Pergunta = connection.define('perguntas',{
    // Campos da tabela
    titulo:{
        // tipos
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    } 
});

// Passa o model para o banco pelo Sync (Sincroniza com o banco).
Pergunta.sync({force: false}).then(()=>{
    console.log("Tabela criada")
});

// Exportando o modulo.
module.exports = Pergunta;