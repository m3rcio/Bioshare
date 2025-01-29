let mongoose=require("mongoose")
const url='mongodb://127.0.0.1:27017/bioshare';
let conection= mongoose.connect(url);


async function connectDB() {
    try {
      await mongoose.connect(url, {
      
      });
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
connectDB();

const loginSchema= new mongoose.Schema({
  nome:{
    type:String,
    required: true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  }
});

const collection= new mongoose.model("users",loginSchema);

module.exports= collection;