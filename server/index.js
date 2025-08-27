require('dotenv').config();
const express= require('express');
const app= express();
const port=3000
const cors= require('cors');
const pasth= require('path');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const authMiddleware= require('./middleware/auth.js');
const SocialLinksRoutes=require('./routes/socialLinksRoutes');
app.use(cors());
app.use(cors({ origin: 'https://bioshare-tau.vercel.app' }));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const tokenkey= process.env.tokenkey;
const UserRoutes=require('./routes/userRoutes');
const User = require("./user.js");



app.use("/api",SocialLinksRoutes)
app.use("/api",UserRoutes)
app.post("/api/signup",async (req,res)=>{
    try {
        const data = {
          nome: req.body.userName,
          password: req.body.password,
          email: req.body.email
        };
    
        const usuarioExistente = await User.findOne({ nome: data.nome });
    
        if (usuarioExistente) {
          return res.status(400).json({message:'Este username já existe. Por favor escolha outro'});
        }

        const emailExistente = await User.findOne({ email: data.email });
        if (emailExistente) {
          return res.status(400).json({ message: "Este email já está cadastrado." });
        }

        const saltRounds= 10;
        data.password= await bcrypt.hash(data.password, saltRounds);

         await User.create(data);
      
        return res.status(201).json({message: 'Usuário criado com sucesso!'});
  

      } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: "Erro no servidor." });
      }
})

app.post('/api/login', async (req,res)=>{
  try{
    if(!req.params.nome && !req.params.password){
    }
    const nomeInserido= await User.findOne({nome: req.body.nome});
    if(!nomeInserido){
      return res.status(404).json({ error: 'usuário não encontrado' });
      
    }
    const passwordMatch= await bcrypt.compare(req.body.password,nomeInserido.password )
    if(passwordMatch){
    const token=jwt.sign({_id: nomeInserido._id},tokenkey,{ expiresIn: '1h' });
    return res.json({ token });
    }else{
      return res.status(401).json({ error: 'palavra-passe errada!' });
    }

  }catch (error){
   return res.status(400).json({message:'credenciais inválidas!'})
  }
})



app.get('/api/protected',authMiddleware,(req,res)=>{
  res.send({message:'Esta Rota está protegida',user:req.nome});
});

app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({ error: "Internal server error" });
});

app.use('/uploads', express.static('uploads'));

app.listen(port, ()=>console.log('server started at '+port))
