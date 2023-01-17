const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const JWT_secret = 'fashionwebsite';
const moment = require("moment")

//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get all the messages /////////////
exports.getmessage= (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ////////////////// select all messages  ///////////
        pool.query("SELECT * FROM messages where post_id=?", [req.params.postid], (err, rows) => {
            if (!err) {
                res.json(rows)
            } else {
                return res.status(403).json("invalid error");
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////

///////////// request to send message  /////////////
exports.addmessage = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// adding message /////////////
        const values = [
            userInfo.id,
            req.body.to_user_id,
            req.body.message,
            0,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        pool.query("INSERT INTO  message (from_user_id,to_user_id,message,status,date_time) VALUES(?)", [values], (err, rows) => {
            if (!err) {
                return res.status(200).json("Post has been created.");
            } else {
                return res.status(500).json(err);
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////////

///////////// request to delete a comment /////////////
exports.deletemessage = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ///////////// deleting a comment /////////////
        pool.query("DELETE FROM  messages where id=? and from_user_id=?", [req.params.messageid, userInfo.id], (err, rows) => {
            if (err) return res.status(500).json(err);
            if (rows.affectedRows > 0) return res.status(200).json("message has been deleted.");
            return res.status(403).json("You can delete only your message")
        });
    });
};

///////////////////////////////////////////////////////////////////////////////////

///////////// request to seen a message  /////////////
exports.updatemessage = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// updating status seen into messages /////////////

        pool.query("UPDATE messages SET status=? WHERE from_user_id and to_user_id=?",
            [
                1,
                req.params.fromuserid,
                userInfo.id
            ],
            (err, rows) => {
                if (err) res.status(500).json(err);
                if (rows.affectedRows > 0) return res.json("seen");
                return res.status(403).json("You can update only your post!");
            })
    })
}