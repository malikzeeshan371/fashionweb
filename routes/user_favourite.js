const express =require("express");
const { getfavourite, addfavourite, deletefavourite } = require("../controller/user_favourite");
const router = express.Router();


////////////// this is request to get all user favourite //////////////
router.get("/getfavourite",getfavourite);
////////////// this is request to add user favourite//////////////
router.post("/addfavourite",addfavourite);
////////////// this is request to delete user favourite //////////////
router.delete("/deletefavourite/:favouriteid",deletefavourite);




module.exports = router;