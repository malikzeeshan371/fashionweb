const express =require("express");
const { getcategory, addcategory, deletecatergory, updatecategory } = require("../controller/category");
const router = express.Router();


////////////// this is request to get all post //////////////
router.get("/getcategory",getcategory);
////////////// this is request to add post //////////////
router.post("/addcategory",addcategory);
////////////// this is request to delete post //////////////
router.delete("/deletecategory/:categoryid",deletecatergory);
////////////// this is request to update a post //////////////
router.put("/updatecategory/:categoryid",updatecategory);



module.exports = router;