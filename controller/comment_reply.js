const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const JWT_secret = 'fashionwebsite';
const moment = require("moment")

//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get all reply of comment /////////////
exports.getcommentreply = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ////////////////// select all reply of comments  ///////////
        pool.query("SELECT * FROM comment_reply where comment_id=?", [req.params.commentid], (err, rows) => {
            if (!err) {
                res.json(rows)
            } else {
                return res.status(403).json("invalid error");
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////

///////////// request to add reply of comment /////////////
exports.addcommentreply = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// adding data into comments reply /////////////
        const values = [
            userInfo.id,
            req.body.comment_id,
            req.body.text,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        pool.query("INSERT INTO  comment_reply(user_id,comment_id,text,date_time) VALUES(?)", [values], (err, rows) => {
            if (!err) {
                return res.status(200).json("comment reply has been created.");
            } else {
                return res.status(500).json(err);
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////////

///////////// request to delete a comment reply /////////////
exports.deletecommentreply = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ///////////// deleting a comment reply /////////////
        pool.query("DELETE FROM  comment_reply where id=? and user_id=?", [req.params.replyid, userInfo.id], (err, rows) => {
            if (err) return res.status(500).json(err);
            if (rows.affectedRows > 0) return res.status(200).json("comment reply  has been deleted.");
            return res.status(403).json("You can delete only your post")
        });
    });
};

///////////////////////////////////////////////////////////////////////////////////

///////////// request to update a comment reply /////////////
exports.updatecommentreply = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// updating data into comment reply /////////////

        pool.query("UPDATE comment_reply SET text=? WHERE id=? and user_id=?",
            [
                req.body.text,
                req.params.replyid,
                userInfo.id
            ],
            (err, rows) => {
                if (err) res.status(500).json(err);
                if (rows.affectedRows > 0) return res.json("Updated!");
                return res.status(403).json("You can update only your post!");
            })
    })
}