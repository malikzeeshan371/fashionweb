const express =require("express");
const { getsociallinks, addsociallinks, deletesociallinks, updatesociallinks } = require("../controller/social_links");
const router = express.Router();
const multer = require("multer");
const path =require("path")



///////////////////////// images ////////////////////////////////////////////
const storage = multer.diskStorage({
    destination: "./upload/images/",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 10000000000
  }
  })
  router.use('/profile', express.static("./upload/images/"));
  ////////////////////////////////////////////////////////////////////


////////////// this is request to get all user social_links //////////////
router.get("/getsociallinks/:userid",getsociallinks);
////////////// this is request to add user social_links//////////////
router.post("/addsociallinks",upload.single('image'),addsociallinks);
////////////// this is request to delete user social_links //////////////
router.delete("/deletesociallinks/:linkid",deletesociallinks);
////////////// this is requst to update user social_links //////////////
router.put("/updatesociallinks/:linkid",updatesociallinks);




module.exports = router;