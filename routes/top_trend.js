const express =require("express");
const { gettrend, addtrend, deletetrend, updatetrend } = require("../controller/top_trend");
const router = express.Router();


////////////// this is request to get all user favorite //////////////
router.get("/gettrend",gettrend);
////////////// this is request to add user favorite//////////////
router.post("/addtrend",addtrend);
////////////// this is request to delete user favorite //////////////
router.delete("/deletetrend/:trendid",deletetrend);
////////////// this is requst to update user trend //////////////
router.put("/updatetrend/:trendid",updatetrend);




module.exports = router;