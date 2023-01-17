const express =require("express");
const { getfollower, addfollwer, deletefollower, updatefollower } = require("../controller/followers");
const router = express.Router();


////////////// this is request to get all post //////////////
router.get("/getfollower",getfollower);
////////////// this is request to add post //////////////
router.post("/addfollower",addfollwer);
////////////// this is request to delete post //////////////
router.delete("/deletefollower/:dollowerid",deletefollower);
////////////// this is request to update a post //////////////
router.put("/updatefollower/:followerid",updatefollower);



module.exports = router;