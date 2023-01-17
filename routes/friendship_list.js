const express =require("express");
const { getfriend_request, addfriend_request, deletefriend_request, updatefreiend_request } = require("../controller/friendship_list");

const router = express.Router();


////////////// this is request to get all post //////////////
router.get("/getfriendrequest",getfriend_request);
////////////// this is request to add post //////////////
router.post("/addfriendrequest",addfriend_request);
////////////// this is request to delete post //////////////
router.delete("/deletefriendrequest/:id",deletefriend_request);
////////////// this is request to update a post //////////////
router.put("/acceptfriendrequest/:id",updatefreiend_request);



module.exports = router;