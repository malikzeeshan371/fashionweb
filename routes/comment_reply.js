const express =require("express");
const { getcommentreply, addcommentreply, deletecommentreply, updatecommentreply } = require("../controller/comment_reply");
const router = express.Router();


////////////// this is request to get all post //////////////
router.get("/getcommentreply/:commentid",getcommentreply);
////////////// this is request to add post //////////////
router.post("/addcommentreply",addcommentreply);
////////////// this is request to delete post //////////////
router.delete("/deletecommentreply/:replyid",deletecommentreply);
////////////// this is request to update a post //////////////
router.put("/updatecommentreply/:replyid",updatecommentreply);



module.exports = router;