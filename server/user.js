const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profile_picture:{
    type:String,
    default:"/uploads/profile_picture.webp"
  }
});

const User = mongoose.model("User", loginSchema);

module.exports = User;
