const express =require("express");
const { get_subcategory, add_subcategory, delete_subcatergory, update_subcategory } = require("../controller/sub_category");
const router = express.Router();


////////////// this is request to get all post //////////////
router.get("/getsubcategory/:categoryid",get_subcategory);
////////////// this is request to add post //////////////
router.post("/addsubcategory",add_subcategory);
////////////// this is request to delete post //////////////
router.delete("/deletesubcategory/:subcategoryid",delete_subcatergory);
////////////// this is request to update a post //////////////
router.put("/updatesubcategory/:subcategoryid",update_subcategory);



module.exports = router;