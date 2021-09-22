const express = require("express");
const app = express();

// Usando o express para dizer que o EJS é a engine
app.set('view engine', 'ejs');

// Rotas
app.get("/", (req, res) => {    
    res.render("index");
});

// Caminho
app.listen(8080,()=>{console.log("App Rodando!")});