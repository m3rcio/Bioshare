require('dotenv').config();
const express= require('express');
const app= express();
const port=3000
const cors= require('cors');
const pasth= require('path');
const collection = require("./demo_create_mongo_db");
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const authMiddleware= require('./middleware/auth.js');
app.use(cors());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const tokenkey= process.env.tokenkey;


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
    const token=jwt.sign({_id: nomeInserido._id},tokenkey,{ expiresIn: '1m' });
    return res.json({ token });
    }else{
      return res.status(401).json({ error: 'palavra-passe errada!' });
    }

    // res.json({success:true,token});
  }catch (error){
   return res.status(400).json({message:'credenciais inválidas!'})
  }
})

// const auth=(req,res,next)=>{
//   const token = req.header('Authorization').replace('Bearer ', '');
//   try{
//     const decoded= jwt.verify(token,tokenkey);
//     req.user=decoded; // verify later for issues
//     next();
//   } catch (error) {
//     res.status(401).send({ message: 'Não autorizado' });
//   }
// }

app.get('/api/protected',authMiddleware,(req,res)=>{
  res.send({message:'Esta Rota está protegida',user:req.userName});
});

app.listen(port, ()=>console.log('server started at '+port))
