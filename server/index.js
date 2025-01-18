const express= require('express');
const app= express();
const mongoose= require('mongoose');
const port=3000
const cors= require('cors');
const pasth= require('path');
const collection = require("./demo_create_mongo_db");
const bcrypt= require('bcrypt');
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
        const saltRounds= 10;
        const passwordEncriptada= await bcrypt.hash(data.password, saltRounds);
        data.password= passwordEncriptada;

      } catch (error) {
        console.error('Error during signup:', error);
      
      }
})

app.post('/api/login', async (req,res)=>{
  try{
    const nomeInserido= await collection.findOne({name: req.body.userName});
    if(!nomeInserido){
      res.send('usuário não encontrado')
    }
    const passwordMatch= await bcrypt.compare(req.body.password,nomeInserido.password )
    if(passwordMatch){
      res.render('/myprofile');
    }else{
      req.send('palavra-passe errada!');
    }
  }catch{
    res.send('Credenciais Inválidas')
  }
})

app.listen(port, ()=>console.log('server started at '+port))
