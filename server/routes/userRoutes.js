const express=require('express');
const { 
     getAllUsers, getUsersById, updateUser,  deleteUser , updateProfilePicture, upload
} = require("../controllers/userController");
const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:user_id", getUsersById);
router.put("/user/:user_id", updateUser);
router.delete("/user/:user_id", deleteUser);

module.exports = router;

