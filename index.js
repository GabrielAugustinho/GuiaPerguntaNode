const express = require("express");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
    // Select * from perguntas Order by DESC
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC'] // ASC crescente || DESC decrescente      
    ]}).then(perguntas => {
        // Enviando as perguntas para o front-end
        res.render("index", {
            perguntas: perguntas
        });
    });    
});

app.get("/perguntar",(req, res) =>{
    res.render("perguntar");
});

app.post("/perguntarSalvar",(req, res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    // Salvando no banco de dados
    Pergunta.create({
        titulo: titulo,
        descricao: descricao    
    }).then(()=>{
        // Quando a pergunta for salva jogo o usuário novamente para a página inicial.
        res.redirect("/");
    });
});

// Rota que direciona para a página das perguntas
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    // Busca no banco de dados a PERGUNTA que têm a variavel id.
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta =>{
        if(pergunta != undefined){ // Pergunta achada
            // Busca todas as RESPOSTAS da pergunta.
            Resposta.findAll({
                where: { perguntaID: pergunta.id },
                order: [
                    ['id', 'DESC']
                ] 
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });            
        } else{ // Não encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaID = req.body.perguntaID;
    Resposta.create({
        corpo: corpo,
        perguntaID: perguntaID    
    }).then(()=>{
        // Quando a pergunta for salva jogo o usuário novamente para a página inicial.
        res.redirect("/pergunta"+perguntaID);
    });
})

// Caminho
app.listen(8080,()=>{console.log("App Rodando!")});