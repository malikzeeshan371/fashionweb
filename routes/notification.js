const express =require("express");
const { getnotification, addnotification, deletenotification } = require("../controller/notification");

const router = express.Router();


////////////// this is request to get all post //////////////
router.get("/getnotification/:postid",getnotification);
////////////// this is request to add post //////////////
router.post("/addnotification",addnotification);
////////////// this is request to delete post //////////////
router.delete("/deletenotification/:notificationid",deletenotification);


module.exports = router;