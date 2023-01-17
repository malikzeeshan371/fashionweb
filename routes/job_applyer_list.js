
const express =require("express");
const { getapplyerlist, addapplyerlist, deleteapplyerlist } = require("../controller/job_applyer_list");
const router = express.Router();


////////////// this is request to get all post //////////////
router.get("/getapplyerlist/:jobid",getapplyerlist);
////////////// this is request to add post //////////////
router.post("/addapplyerlist",addapplyerlist);
////////////// this is request to delete post //////////////
router.delete("/deleteapplyerlist/:applyerlistid",deleteapplyerlist);




module.exports = router;