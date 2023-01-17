const express =require("express");
const { getPost, addPost, deletePost, updatePost } = require("../controller/post");
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


////////////// this is request to get all post //////////////
router.get("/getpost/",getPost);
////////////// this is request to add post //////////////
router.post("/addpost",upload.single('image'),addPost);
////////////// this is request to delete post //////////////
router.delete("/deletepost/:postid",deletePost);
////////////// this is request to update a post //////////////
router.put("/updatepost/:postid",upload.single('image'),updatePost);



module.exports = router;