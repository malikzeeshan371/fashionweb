const express =require("express");
const { getlikes, addlikes, deletelike, getlikescount, getdislikescount } = require("../controller/like_dislike");
const router = express.Router();


////////////// this is request to get all likes //////////////
router.get("/getlike/:postid",getlikes);
////////////// this is request to get all likes count //////////////
router.get("/getlikecount",getlikescount);
////////////// this is request to get all dislikes count //////////////
router.get("/getdislikecount",getdislikescount);
////////////// this is request to add likes //////////////
router.post("/addlike/:postid",addlikes);
////////////// this is request to delete likes //////////////
router.post("/deletelike/:likeid",deletelike);




module.exports = router;