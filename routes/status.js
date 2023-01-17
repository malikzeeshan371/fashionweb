const express =require("express");
const { getstatus, addstatus, deletestatus, updatestatus } = require("../controller/status");
const router = express.Router();


////////////// this is request to get all user status //////////////
router.get("/getstatus",getstatus);
////////////// this is request to add user status//////////////
router.post("/addstatus",addstatus);
////////////// this is request to delete user status //////////////
router.delete("/deletestatus/:linkid",deletestatus);
////////////// this is requst to update user status //////////////
router.put("/updatestatus/:linkid",updatestatus);




module.exports = router;