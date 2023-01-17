const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const JWT_secret = 'fashionwebsite';
const moment = require("moment")

//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get all users social links /////////////
exports.getsociallinks = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ////////////////// select all user social links ///////////
        pool.query("SELECT * FROM social_links where user_id", [req.params.userid], (err, rows) => {
            if (!err) {
                res.json(rows)
            } else {
                return res.status(403).json("invalid error");
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////

///////////// request to add social links /////////////
exports.addsociallinks = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// adding data into user social links /////////////
        const values = [
            userInfo.id,
            image = `http://localhost:8000/profile/${req.file.filename}`,
            req.body.link,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        pool.query("INSERT INTO  social_links (user_id,image,link,date_time) VALUES(?)", [values], (err, rows) => {
            if (!err) {
                return res.status(200).json("social links has been added.");
            } else {
                return res.status(500).json(err);
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////////

///////////// request to delete user social links /////////////
exports.deletesociallinks= (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ///////////// deleting user social links/////////////
        pool.query("DELETE FROM  social_links where id=? and user_id=?", [req.params.linkid, userInfo.id], (err, rows) => {
            if (err) return res.status(500).json(err);
            if (rows.affectedRows > 0) return res.status(200).json("social links has been deleted.");
            return res.status(403).json("You can delete only your post")
        });
    });
};

///////////////////////////////////////////////////////////////////////////////////

///////////// request to update a user social links/////////////
exports.updatesociallinks = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// updating data into social links  /////////////

        pool.query("UPDATE social_links SET image=?,link=? WHERE id=? and user_id=?",
            [
                image = `http://localhost:8000/profile/${req.file.filename}`,,
                req.body.link,
                req.params.linkid,
                userInfo.id
            ],
            (err, rows) => {
                if (err) res.status(500).json(err);
                if (rows.affectedRows > 0) return res.json("Updated!");
                return res.status(403).json("You can update only your post!");
            })
    })
}