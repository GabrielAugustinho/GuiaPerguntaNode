const express = require("express");
const app = express();

// Usando o express para dizer que o EJS é a engine
app.set('view engine', 'ejs');

// Rotas
app.get("/:nome/:lang", (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = true;

    var produtos = [
        {nome: "Doritos", preco: 3.14},
        {nome: "Coca-cola", preco: 5.00},
        {nome: "Leite", preco: 1.45}
    ]

    res.render("index", {
        nome: nome,
        lang: lang,
        empresa: "DrogaBella",
        inscritos: 8000,
        msg: exibirMsg,
        produtos: produtos
    });
});

// Caminho
app.listen(8080,()=>{console.log("App Rodando!")});