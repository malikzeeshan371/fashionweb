const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const JWT_secret = 'fashionwebsite';
const moment = require("moment")

//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get notification of post /////////////
exports.getnotification = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ////////////////// select all comments for post ///////////
        pool.query("SELECT * FROM notification where show_user_id=?", [userInfo.id], (err, rows) => {
            if (!err) {
                res.json(rows)
            } else {
                return res.status(403).json("invalid error");
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////

///////////// request to add notification /////////////
exports.addnotification = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// adding data into notification /////////////
        pool.query("SELECT user_id FROM post where id=?", [req.body.post_id], (err, rows) => {
            if (rows.length > 0) {
                const show = rows[0].user_id;
                const values = [
                    userInfo.id,
                    req.body.post_id,
                    show,
                    req.body.type,
                    0,
                    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                ]
                pool.query("INSERT INTO  notification (user_id,post_id,show_user_id,type,status,date_time) VALUES(?)", [values], (err, rows) => {
                    if (!err) {
                        return res.status(200).json("notification has been created.");
                    } else {
                        return res.status(500).json(err);
                    }
                })
            } else {
                return res.status(403).json("invalid error");
            }
        })


    })
}

///////////////////////////////////////////////////////////////////////////////////

///////////// request to delete a comment /////////////
exports.deletenotification = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ///////////// delete a notification /////////////
        pool.query("DELETE FROM  notification where id=? and user_id=?", [req.params.noticationid, userInfo.id], (err, rows) => {
            if (err) return res.status(500).json(err);
            if (rows.affectedRows > 0) return res.status(200).json("Post has been deleted.");
            return res.status(403).json("You can delete only your post")
        });
    });
};

///////////////////////////////////////////////////////////////////////////////////
///////////// request to update a notification /////////////
exports.updatenotification = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// updating data into post /////////////

        pool.query("UPDATE notification SET status=? WHERE id=? and show_user_id=?",
            [
                1,
                req.body.id,
                userInfo.id
            ],
            (err, rows) => {
                if (err) res.status(500).json(err);
                if (rows.affectedRows > 0) return res.json("Updated!");
                return res.status(403).json("You can update only your post!");
            })
    })
}