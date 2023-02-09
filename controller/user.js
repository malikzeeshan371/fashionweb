const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const moment = require("moment")
const JWT_secret = 'fashionwebsite';
const bcrypt = require("bcryptjs");



////////////// to get single user ///////////////
exports.getUser = (req, res) => {
    const userId = req.params.id;
    const q = "SELECT * FROM user WHERE id=?";
  
    pool.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      const { password, ...info } = data[0];
      return res.json(info);
    });
  };

  ////////////// to get all user ///////////
  exports.getalluser=  (req, res) => {
    pool.query("SELECT id,full_name,email from user ", (err, rows) => {
        if (!err) {
       res.json(rows)
       
  
          
        } else {
            console.log(err)
        }
    })
}

////////////////// to delete a user //////////////
 exports.deleteuser =  (req, res) => {
    pool.query("DELETE from user WHERE id=? ", [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send("deleted sucessfully")
        } else {
            res.status(401).send("Unuserorized access..!");
        }
    })
}


/////////////////////////////////////////////////////////////////////////////////


///////////// request to update a user /////////////
exports.updateuser = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, JWT_secret, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  ///////////// updating data into post /////////////
   
      pool.query("UPDATE user SET full_name=?,mobile_number=?,email=?,status=? WHERE id=? ", 
       [
        req.body.full_name,
        req.body.mobile_number,
        req.body.email,
        req.body.status,
        userInfo.id
      ], 
      (err, rows)  => {
        if (err) res.status(500).json(err);
        if (rows.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      })
    })
  }
///////////// request to update a user /////////////
exports.updateuserpassword = (req, res) => {
  ////////// verifying old password ////////
  const userId = req.body.userid;
  const q = "SELECT password FROM user WHERE id=?";

  pool.query(q, [userId], async (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    else {
      ////////// checking old pass word ///////////
      const checkpassword = bcrypt.compareSync(req.body.oldpassword, data[0].password)
      if (!checkpassword) {
        return res.status(400).json("Wrong password");
      }
      // ////////// secure password hash //////////
      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.newpassword, salt);
      //////////// storing new password  ////////////
      await pool.query("UPDATE user SET password=? WHERE id=? ",
        [
          secpassword,
          req.body.userid

        ],
        (err, rows) => {
          if (err) res.status(500).json(err);
          if (rows.affectedRows > 0) return res.json("Updated!");
          return res.status(403).json("You can update only your post!");
        })
    }
  });
}

