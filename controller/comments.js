const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const JWT_secret = 'fashionwebsite';
const moment = require("moment")

//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get all comments of post /////////////
exports.getcomment = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ////////////////// select all comments for post ///////////
        pool.query("SELECT * FROM posts_comments where post_id=?", [req.params.postid], (err, rows) => {
            if (!err) {
                res.json(rows)
            } else {
                return res.status(403).json("invalid error");
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////

///////////// request to add comment of post /////////////
exports.addcomment = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// adding data into comment of post /////////////
        const values = [
            userInfo.id,
            req.body.post_id,
            req.body.comment,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        pool.query("INSERT INTO  posts_comments(user_id,post_id,comment,date_time) VALUES(?)", [values], (err, rows) => {
            if (!err) {
                return res.status(200).json("comment has been created.");
            } else {
                return res.status(500).json(err);
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////////

///////////// request to delete a comment /////////////
exports.deletecomment = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ///////////// deleting a comment /////////////
        pool.query("DELETE FROM  posts_comments where id=? and user_id=?", [req.params.commentid, userInfo.id], (err, rows) => {
            if (err) return res.status(500).json(err);
            if (rows.affectedRows > 0) return res.status(200).json("comment  has been deleted.");
            return res.status(403).json("You can delete only your post")
        });
    });
};

///////////////////////////////////////////////////////////////////////////////////

///////////// request to update a comment /////////////
exports.updatecomment = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// updating data into comment /////////////

        pool.query("UPDATE posts_comments SET comment=? WHERE id=? and user_id=?",
            [
                req.body.comment,
                req.params.commentid,
                userInfo.id
            ],
            (err, rows) => {
                if (err) res.status(500).json(err);
                if (rows.affectedRows > 0) return res.json("Updated!");
                return res.status(403).json("You can update only your post!");
            })
    })
}