const express= require('express');
const app= express();
const mongoose= require('mongoose');
const port=3000
// mongoose.connect('mongodb://localhost/users',{useNewUrlParser: true});
// const db=mongoose.connection;

// db.on('error',(error)=>console.error(error))
// db.once('open',()=>console.log('connected to database'))



app.get('/myprofile',(req,res)=>{
    console.log('hello world!')
})

app.listen(port, ()=>console.log('server started at '+port))
