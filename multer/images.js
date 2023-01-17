// const express=require("express")
// const multer = require("multer");
// const path = require("path");
// const router = express.Router();

// ///////////////////////// images ////////////////////////////////////////////
// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
//   })
  
//   const upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 10000000000
//   }
//   })
//   router.use('/profile', express.static('upload/images'));
//   ////////////////////////////////////////////////////////////////////