const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const JWT_secret = 'fashionwebsite';
const moment = require("moment");
const { selectFields } = require("express-validator/src/select-fields.js");
const { matchedData } = require("express-validator");

//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get all likes /////////////

exports.getlikes = (req, res) => {
  ///////////// verify that user is logedin /////////
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, JWT_secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    ////////////////// select all like of post ///////////
    pool.query("SELECT * FROM post_like_dislike where post_id=?", [req.params.postid], (err, rows) => {
      if (!err) {
        res.json(rows)
      } else {
        return res.status(403).json("invalid error");
      }
    })
  })
}
//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get all likes count /////////////

exports.getlikescount = (req, res) => {
  ///////////// verify that user is logedin /////////
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, JWT_secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    ////////////////// select all like of post ///////////
    // const dislike = "dislike";
    pool.query("SELECT status FROM post_like_dislike where post_id=? and status=? ", [req.body.postid,"like"], (err, rows) => {
      if (!err) {
      const like = rows.length 
      
      res.json({like})
      } else {
        return res.status(403).json("invalid error");
      }
    })
  })
}

//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get all dislikes count /////////////

exports.getdislikescount = (req, res) => {
  ///////////// verify that user is logedin /////////
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, JWT_secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    ////////////////// select all like of post ///////////
    // const dislike = "dislike";
    pool.query("SELECT status FROM post_like_dislike where post_id=? and status=? ", [req.body.postid,"dislike"], (err, rows) => {
      if (!err) {
      const dislike = rows.length 
      
      res.json({dislike})
      } else {
        return res.status(403).json("invalid error");
      }
    })
  })
}
//////////////////////////////////////////////////////////////////////////////////////

///////////// request to add likes /////////////

exports.addlikes = (req, res) => {
  ///////////// verify that user is logedin /////////
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, JWT_secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    ////////////////// adding a like in post ///////////
    const values = [
      req.body.post_id,
      userInfo.id,
      req.body.status,
      req.body.type,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ]
    pool.query("INSERT INTO post_like_dislike (post_id,user_id,status,type,date_time) VALUES(?)", [values], (err, rows) => {
      if (!err) {
        return res.status(200).json("like has been created.");
      } else {
        return res.status(500).json(err);
      }
    })
  })
}

///////////////////////////////////////////////////////////////////////////////////

///////////// request to delete a like /////////////
exports.deletelike = (req, res) => {
  ///////////// verify that user is logedin /////////
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, JWT_secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    ///////////// deleting a like /////////////
    pool.query("DELETE FROM  post_like_dislike where id=? and user_id=?", [req.params.likeid, userInfo.id], (err, rows) => {
      if (err) return res.status(500).json(err);
      if (rows.affectedRows > 0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post")
    });
  });
};