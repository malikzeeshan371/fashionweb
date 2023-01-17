const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const JWT_secret = 'fashionwebsite';
const moment = require("moment")

//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get all retweet /////////////
exports.getretweet = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ////////////////// select all user retweet ///////////
        pool.query("SELECT * FROM post_retweet where post_id=?", [req.params.postid], (err, rows) => {
            if (!err) {
                res.json(rows);
            } else {
                return res.status(403).json("invalid error");
            }
        })
    })
}
//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get retweet  count /////////////
exports.getcount = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ////////////////// to send count ///////////////////
        pool.query("SELECT count FROM post_retweet where post_id=?", [req.params.postid], (err, rows) => {
            if (rows.length > 0) {
                const lasttweet = rows.length - 1;
                const count = rows[lasttweet];
                res.json(count)
            } else {
                return res.status(403).json("invalid error");
            }
        })
    })
}




///////////////////////////////////////////////////////////////////////////////

///////////// request to add retweet /////////////
exports.addretweet = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////////////// check that this post is retweeted//////////////
        pool.query("SELECT * FROM post_retweet where  post_id=?", [req.params.postid], (err, rows) => {
            if (rows.length > 0) {
                ////////////////// adding retweet if already retweeted //////////////////
                const lasttweet = rows.length - 1;
                const count = rows[lasttweet].count + 1;
                const values = [
                    userInfo.id,
                    req.body.post_id,
                    count,
                    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                ]
                pool.query("INSERT INTO  post_retweet(user_id,post_id,count,date_time) VALUES(?)", [values], (err, rows) => {
                    if (!err) {
                        return res.status(200).json("post retweeted");
                    } else {
                        return res.status(500).json(err);
                    }
                })

                ///////////////////////// adding if its frist time retweeted ///////////////   
            } else {
                const values = [
                    userInfo.id,
                    req.body.post_id,
                    count = 1,
                    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                ]
                pool.query("INSERT INTO  post_retweet(user_id,post_id,count,date_time) VALUES(?)", [values], (err, rows) => {
                    if (!err) {
                        return res.status(200).json("post retweeted");
                    } else {
                        return res.status(500).json(err);
                    }
                })


            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////////

///////////// request to delete retweet /////////////
exports.deleteretweet = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ///////////// deleting user retweet /////////////
        pool.query("DELETE FROM  post_retweet where id=? and user_id=?", [req.params.postid, userInfo.id], (err, rows) => {
            if (err) return res.status(500).json(err);
            if (rows.affectedRows > 0) return res.status(200).json("Post has been deleted.");
            return res.status(403).json("You can delete only your post")
        });
    });
};

///////////////////////////////////////////////////////////////////////////////////

