const express= require('express');
const app= express();
const mongoose= require('mongoose');
const port=3000
const cors= require('cors');
const pasth= require('path');
const collection = require("./demo_create_mongo_db")
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',()=>{console.log('olá mundo!')});
app.post("/api/signup",async (req,res)=>{
    try {
        const data = {
          nome: req.body.userName,
          password: req.body.password
        };
    
        const usuarioExistente = await collection.findOne({ nome: data.nome });
    
        if (usuarioExistente) {
          return res.status(400).send('Este usuário já existe. Por favor escolha outro');
        }
    
        const userData = await collection.insertMany(data);
        res.status(201).send('Usuário criado com sucesso!');
      } catch (error) {
        console.error('Error during signup:', error);
      
      }
})


app.listen(port, ()=>console.log('server started at '+port))
