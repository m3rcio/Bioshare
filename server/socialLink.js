let mongoose=require("mongoose")
const url='mongodb://127.0.0.1:27017/bioshare';


async function connectDB() {
    try {
      await mongoose.connect(url, {
      });
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error:', error);
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
    type: String,
    required: true,
  },
});

const SocialLink = mongoose.model("SocialLink", socialLinkSchema);

module.exports = SocialLink;
