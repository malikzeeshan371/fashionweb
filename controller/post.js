const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const moment = require("moment")
const JWT_secret = 'fashionwebsite';

//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get all post public /////////////
exports.getPostpublic = (req, res) => {

    ////////////////// select all post ///////////
    pool.query("SELECT * FROM post where status=?", ["public"],(err, rows) => {
      if (!err) {
        res.json(rows)
      } else {
        return res.status(403).json("invalid error");
      }
    })
  
}
///////////// request to get all post friends /////////////
exports.getPostfriends = (req, res) => {
  ///////////// verify that user is logedin /////////
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, JWT_secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    ////////////////// select all post ///////////
    pool.query(`SELECT p.*, u.id AS userId, full_name FROM post AS p JOIN user AS u ON (u.id = p.user_id)
    LEFT JOIN follower AS f ON (p.user_id = f.followed_user_id) WHERE f.following_user_id= ? OR p.user_id =?
    ORDER BY p.date_time DESC`,[userInfo.id,userInfo.id], (err, rows) => {
      if (!err) {
        res.json(rows)
      } else {
        return res.status(403).json(err);
      }
    })
  })
}

///////////////////////////////////////////////////////////////////////////////

///////////// request to add post /////////////
exports.addPost = (req, res) => {
  ///////////// verify that user is logedin /////////
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, JWT_secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
///////////// adding data into post /////////////
    const values = [
      userInfo.id,
      req.body.title,
      req.body.description,
      image = `http://localhost:8000/profile/${req.file.filename}`,
      req.body.status,
      req.body.is_profile,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ]
    pool.query("INSERT INTO  post(user_id,title,description,image,status,is_profile,date_time) VALUES(?)", [values], (err, rows) => {
      if (!err) {
        return res.status(200).json("Post has been created.");
      } else {
        return res.status(500).json(err);
      }
    })
  })
}

///////////////////////////////////////////////////////////////////////////////////

///////////// request to delete a post /////////////
exports.deletePost = (req, res) => {
  ///////////// verify that user is logedin /////////
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, JWT_secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

  ///////////// deleting a post /////////////
    pool.query("DELETE FROM  post where id=? and user_id=?", [req.params.postid,userInfo.id], (err, rows) => {
      if (err) return res.status(500).json(err);
      if(rows.affectedRows>0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post")
    });
  });
};

///////////////////////////////////////////////////////////////////////////////////

///////////// request to update a post /////////////
exports.updatePost = (req, res) => {
  ///////////// verify that user is logedin /////////
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, JWT_secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
///////////// updating data into post /////////////
 
    pool.query("UPDATE post SET title=?,description=?,image=?,status=? WHERE id=? and user_id=?", 
     [
      req.body.title,
      req.body.description,
      image = `http://localhost:8000/profile/${req.file.filename}`,
      req.body.status,
      req.params.postid,
      userInfo.id
    ], 
    (err, rows)  => {
      if (err) res.status(500).json(err);
      if (rows.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your post!");
    })
  })
}