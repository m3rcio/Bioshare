let mongoose=require("mongoose");
require('dotenv').config();
const mongodb_connection_string= process.env.mongodb_connection_string;



async function connectDB() {
    try {
      await mongoose.connect(mongodb_connection_string, {
      });
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error: ', error);
      process.exit(1);
    }
  }
connectDB();


const socialLinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    default: "",
  },
  Url: {
    type: String,
    required: false,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    required: false,
    default: 'fas fa-image'
  },
  icon_color: {
     type: String,
    default: '#1b1a1aff'
   },
   user_id: {                   
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const SocialLink = mongoose.model("SocialLink", socialLinkSchema);

module.exports = SocialLink;
