const express =require("express");
const { getproject, addproject, deleteproject, updateprojects } = require("../controller/projects");
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



////////////// this is request to get all user projects //////////////
router.get("/getproject/:userid",getproject);
////////////// this is request to add user projects//////////////
router.post("/addproject",upload.single('poster_image'),addproject);
////////////// this is request to delete user projects //////////////
router.delete("/deleteproject/:projectid",deleteproject);
////////////// this is requst to update user projects //////////////
router.put("/updateproject/:projectid",updateprojects);




module.exports = router;