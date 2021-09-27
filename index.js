const express = require("express");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

// Database
connection.authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// Usando o express para dizer que o EJS é a engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Substitui o body parser
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Rotas
app.get("/", (req, res) => {    
    res.render("index");
});

app.get("/perguntar",(req, res) =>{
    res.render("perguntar");
});

app.post("/perguntarSalvar",(req, res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("formulario recebido! titulo " + titulo + " " + " descricao " + descricao);
});


// Caminho
app.listen(8080,()=>{console.log("App Rodando!")});