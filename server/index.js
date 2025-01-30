const express= require('express');
const app= express();
const port=3000
const cors= require('cors');
const pasth= require('path');
const collection = require("./demo_create_mongo_db");
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const tokenkey= require('./.env');

app.post("/api/signup",async (req,res)=>{
    try {
        const data = {
          nome: req.body.userName,
          password: req.body.password,
          email: req.body.email
        };
    
        const usuarioExistente = await collection.findOne({ nome: data.nome });
    
        if (usuarioExistente) {
          return res.status(400).json({message:'Este username já existe. Por favor escolha outro'});
        }

        const saltRounds= 10;
        data.password= await bcrypt.hash(data.password, saltRounds);
      
        const userData = await collection.insertMany(data);
        res.status(201).json({message: 'Usuário criado com sucesso!'});
  

      } catch (error) {
        console.error('Error during signup:', error);
      
      }
})

app.post('/api/login', async (req,res)=>{
  try{
    const nomeInserido= await collection.findOne({nome: req.body.userName});
    if(!nomeInserido){
      return res.status(404).json({ error: 'usuário não encontrado' });
      
    }
    const passwordMatch= await bcrypt.compare(req.body.password,nomeInserido.password )
    if(passwordMatch){
    // const token=jwt.sign({id: user._id},tokenkey);
    return res.json({ success: true });
    }else{
      return res.status(401).json({ error: 'palavra-passe errada!' });
    }

    // res.json({success:true,token});
  }catch (error){
   return res.json({message:'Credenciais Inválidas'});
  }
})

app.listen(port, ()=>console.log('server started at '+port))
