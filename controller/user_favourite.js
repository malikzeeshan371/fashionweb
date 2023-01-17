const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const JWT_secret = 'fashionwebsite';
const moment = require("moment")

//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get all user favourite /////////////
exports.getfavourite = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ////////////////// select all user favourite ///////////
        pool.query("SELECT * FROM user_favourite where user_id", [userInfo.id], (err, rows) => {
            if (!err) {
                res.json(rows)
            } else {
                return res.status(403).json("invalid error");
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////

///////////// request to add post /////////////
exports.addfavourite = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// adding data into user favourite /////////////
        const values = [
            userInfo.id,
            req.body.post_id,
            req.body.status,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        pool.query("INSERT INTO  user_favourite(user_id,post_id,status,date_time) VALUES(?)", [values], (err, rows) => {
            if (!err) {
                return res.status(200).json("added has been favourite");
            } else {
                return res.status(500).json(err);
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////////

///////////// request to delete user favourite /////////////
exports.deletefavourite = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ///////////// deleting user favourite/////////////
        pool.query("DELETE FROM  user_favourite where id=? and user_id=?", [req.params.favouriteid, userInfo.id], (err, rows) => {
            if (err) return res.status(500).json(err);
            if (rows.affectedRows > 0) return res.status(200).json("deleted from favourite");
            return res.status(403).json("You can delete only your post")
        });
    });
};

///////////////////////////////////////////////////////////////////////////////////

