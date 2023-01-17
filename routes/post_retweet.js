const express =require("express");
const { getretweet, addretweet, deleteretweet, getcount } = require("../controller/post_retweet");
const router = express.Router();


////////////// this is request to get all retweetedpost //////////////
router.get("/getretweet/:postid",getretweet);
////////////// this is request to get post retweet count //////////////
router.get("/getretweetcount/:postid",getcount);
////////////// this is request to add retweet//////////////
router.post("/addretweet",addretweet);
////////////// this is request to delete retweet //////////////
router.delete("/deleteretweet/:postid",deleteretweet);




module.exports = router;