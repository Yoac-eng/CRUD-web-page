//Setting up express server
const express = require("express");
const app = express();
//Import mysql 
const mysql = require("mysql");
//Import cors para utilizar API local
const cors = require("cors");

app.use(cors());
app.use(express.json());


//A partir dessa variável db criaremos um objeto que irá conter
//todas as informações para fazer a conexão com o BD.
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "registersystem",
});

//Setando as interações para com o front-end
app.post("/create", (req, res) => {
    //Criando variáveis pra guardar informações que vem do front-end
    //Essa variável irá guardar informações de um objeto body com os atributos do objeto
    const name = req.body.Name;
    const email = req.body.Email;
    const username = req.body.Username;
    const address = req.body.Address;
    const password = req.body.Password;

    //Colocando essas variáveis no banco de dados
    db.query
        ("INSERT INTO users (Name, Email, Username, Address, Password) VALUES (?,?,?,?,?)", 
        [name, email, username, address, password], 
        (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send("Values Inserted");
            }
        }
    );
});

//Request pra dar read nos usuarios
app.get("/users", (req,res) =>{
    db.query("SELECT * FROM users", 
    (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    });
});

//Request pra dar update nos dados
app.put("/update/name/", (req,res) => {
    const ID = req.body.ID;
    const Name = req.body.Name;
    db.query("UPDATE users SET Name = ? WHERE ID = ?", [Name, ID], (err, result) => {
        if(err){
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    });
});

app.put("/update/email/", (req,res) => {
    const ID = req.body.ID;
    const Email = req.body.Email;
    db.query("UPDATE users SET Email = ? WHERE ID = ?", [Email, ID], (err, result) => {
        if(err){
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    });
});

app.put("/update/username/", (req,res) => {
    const ID = req.body.ID;
    const Username = req.body.Username;
    db.query("UPDATE users SET Username = ? WHERE ID = ?", [Username, ID], (err, result) => {
        if(err){
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    });
});

app.put("/update/address/", (req,res) => {
    const ID = req.body.ID;
    const Address = req.body.Address;
    db.query("UPDATE users SET Address = ? WHERE ID = ?", [Address, ID], (err, result) => {
        if(err){
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    });
});


//Request para deletar os dados
app.delete('/delete/:ID', (req,res) => {
    const ID = req.params.ID
    db.query("DELETE FROM users WHERE id = ?", ID, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});


//Começando app
app.listen(3001, ()=>{
    console.log("Yeh, the server is running on port 3001");
});