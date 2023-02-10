const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const moment = require("moment")
const JWT_secret = 'fashionwebsite';

//////////////////////////////////////////////////////////////////////////////////////

///////// request to get all post public /////////////
exports.getPostpublic = (req, res) => {

  //   ////////////////// select all post ///////////
  let final = [];
  pool.query("SELECT p.*, u.full_name AS post_auther  FROM post AS p JOIN user AS u ON (u.id = p.user_id) WHERE p.status = ? ORDER BY p.id DESC", ["public"], async (err, rows) => {
    if (!err) {

      await rows.forEach(async element => {
        let postid = element.id
        let postss = {};
        postss = element;
        ////////////////// select all like of post ///////////
        await pool.query("SELECT status FROM post_like_dislike where post_id=? and status=? ", [postid, "like"], (err, rows) => {
          if (!err) {
            const like = rows.length

            Object.assign(postss, { "likes": like });
          } else {
            return res.status(403).json("invalid error");
          }
        })
        ////////////////// select all like of post ///////////
        // const dislike = "dislike";
        await pool.query("SELECT status FROM post_like_dislike where post_id=? and status=? ", [postid, "dislike"], (err, rows) => {
          if (!err) {
            const dislike = rows.length

            Object.assign(postss, { "dislikes": dislike });
          } else {
            return res.status(403).json("invalid error");
          }
        })

        await pool.query("SELECT c.id,c.comment,c.user_id, u.full_name AS comment_auther  FROM posts_comments AS c JOIN user AS u ON (u.id = c.user_id) where post_id=?", [postid], async (err, com) => {
          if (!err) {
            Object.assign(postss, { "comments": com });
            final.push(postss)
            // res.json(final)
          } else {
            return res.status(403).json(err);
          }
        })

      })
      setTimeout(() => {
        res.json(final)
      }, 3000)

    } else {
      return res.status(403).json(err);
    }

  })
}

//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get all post friends /////////////
exports.getPostfriends = (req, res) => {
  ///////////// verify that user is logedin /////////
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, JWT_secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    ////////////////// select all post ///////////
    let final = [];
    pool.query(`SELECT p.*, u.id AS userId, full_name as post_auther FROM post AS p JOIN user AS u ON (u.id = p.user_id)
    LEFT JOIN follower AS f ON (p.user_id = f.followed_user_id) WHERE f.following_user_id= ? OR p.user_id =? ORDER BY p.id DESC`, [userInfo.id, userInfo.id], async (err, rows) => {
      if (!err) {
        await rows.forEach(async element => {
          let postid = element.id
          let postss = {};
          postss = element
          ////////////////// select all like of post ///////////
          await pool.query("SELECT status FROM post_like_dislike where post_id=? and status=? ", [postid, "like"], (err, rows) => {
            if (!err) {
              const like = rows.length

              Object.assign(postss, { "likes": like });
            } else {
              return res.status(403).json("invalid error");
            }
          })
          ////////////////// select all like of post ///////////
          // const dislike = "dislike";
          await pool.query("SELECT status FROM post_like_dislike where post_id=? and status=? ", [postid, "dislike"], (err, rows) => {
            if (!err) {
              const dislike = rows.length

              Object.assign(postss, { "dislikes": dislike });
            } else {
              return res.status(403).json("invalid error");
            }
          })
          await pool.query("SELECT c.id,c.comment,c.user_id, u.full_name AS comment_auther  FROM posts_comments AS c JOIN user AS u ON (u.id = c.user_id) where post_id=?", [postid], async (err, com) => {
            if (!err) {
              Object.assign(postss, { "comments": com });
              final.push(postss)
              // res.json(final)
            } else {
              return res.status(403).json(err);
            }
          })
        })
        setTimeout(() => {
          res.json(final)
        }, 3000)
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
      image = `https://fashionweb-production.up.railway.app/profile/${req.file.filename}`,
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
