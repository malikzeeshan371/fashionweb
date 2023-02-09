
const express =require("express");
const { getUser, getalluser, deleteuser, updateuser, updateuserpassword } = require("../controller/user");
const router = express.Router();



//////// This is request for single user detail ////////////
router.get("/getuser/:id",getUser)
//////// This is request to get all user  ////////////
router.get("/getalluser", getalluser)
//////// This is request to delete user  ////////////
router.delete("/deleteuser/:id",deleteuser)
///////// this is request to update user data //////////////
router.put("/updateuser",updateuser)
///////// this is request to update user data //////////////
router.put("/updateuserpassword",updateuserpassword)


module.exports = router;

