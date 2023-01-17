const express =require("express");
const { getaward, addaward, deleteaward, updateaward } = require("../controller/user_award");
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


////////////// this is request to get all user favorite //////////////
router.get("/getaward",getaward);
////////////// this is request to add user favorite//////////////
router.post("/addaward",upload.single('image'),addaward);
////////////// this is request to delete user favorite //////////////
router.delete("/deleteaward/:awardid",deleteaward);
////////////// this is requst to update user award //////////////
router.put("/updateaward/:awardid",updateaward);




module.exports = router;