const express =require("express");
const { getcomment, addcomment, deletecomment, updatecomment } = require("../controller/comments");
const router = express.Router();


////////////// this is request to get all post //////////////
router.get("/getcomment/:postid",getcomment);
////////////// this is request to add post //////////////
router.post("/addcomment",addcomment);
////////////// this is request to delete post //////////////
router.delete("/deletecomment/:commentid",deletecomment);
////////////// this is request to update a post //////////////
router.put("/updatecomment/:commentid",updatecomment);



module.exports = router;