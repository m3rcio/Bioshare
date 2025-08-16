const express=require('express');
const upload = require("../middleware/uploads.js");
const { 
     getAllUsers, getUsersById, updateUser,  deleteUser , updateProfilePicture
} = require("../controllers/userController");
const router = express.Router();

router.put("/user/:user_id/profile-picture", upload.single("profile_picture"), updateProfilePicture);
router.get("/users", getAllUsers);
router.get("/user/:user_id", getUsersById);
router.put("/user/:user_id", updateUser);
router.delete("/user/:user_id", deleteUser);

module.exports = router;

