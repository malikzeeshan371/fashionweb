const express =require("express");
const { getjob, addjob, deletejob, updatejob } = require("../controller/jobs");
const router = express.Router();


////////////// this is request to get all post //////////////
router.get("/getjob",getjob);
////////////// this is request to add post //////////////
router.post("/addjob",addjob);
////////////// this is request to delete post //////////////
router.delete("/deletejob/:jobid",deletejob);
////////////// this is request to update a post //////////////
router.put("/updatejob/:jobid",updatejob);



module.exports = router;