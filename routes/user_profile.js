const express =require("express");
const { getprofile, addprofile, deleteprofile, updateprofile, getuserprofile } = require("../controller/user_profile");
const router = express.Router();


////////////// this is request to get all user profile //////////////
router.get("/getprofile",getprofile);
////////////// this is request to get all user profile //////////////
router.get("/getprofile/:userid",getuserprofile);
////////////// this is request to add user profile//////////////
router.post("/addprofile",addprofile);
////////////// this is request to delete user profile //////////////
router.delete("/deleteprofile/:profileid",deleteprofile);
////////////// this is requst to update user profile //////////////
router.put("/updateprofile/:profileid",updateprofile);




module.exports = router;