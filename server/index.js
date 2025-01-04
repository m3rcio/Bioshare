const express= require('express');
const app= express();
const mongoose= require('mongoose');
const port=3000
const pasth= require('path');
const collection = require("./demo_create_mongo_db")
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.post("/signup",async (req,res)=>{
    const data={
        nome: req.body.userName,
        password: req.body.password
    }

    const usuarioExistente= await collection.findOne({nome:data.nome})

    if(usuarioExistente){
        res.send("Este usuário já existe. Por favor escolha outro");
    }
    
    const userData= await collection.inserMany(data);
    console.log(userData);
})


app.listen(port, ()=>console.log('server started at '+port))
