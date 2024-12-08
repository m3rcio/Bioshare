const express= require('express');
const app= express();
const mongoose= require('mongoose');
const port=3000
// mongoose.connect('mongodb://127.0.0.1:27017/users');
// const db=mongoose.connection;

// db.on('error',(error)=>console.error(error))
// db.once('open',()=>console.log('connected to database'))

// app.get('/myprofile',(req,res)=>{
//     console.log('hello world!')
// })

// let MongoClient= require('mongodb').MongoClient;

const url='mongodb://127.0.0.1:27017/bioshare';

mongoose.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });

app.listen(port, ()=>console.log('server started at '+port))
