const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const JWT_secret = 'fashionwebsite';
const moment = require("moment");



//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get all users projects /////////////
exports.getproject = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ////////////////// select all user projects  ///////////
        pool.query("SELECT * FROM projects where user_id", [req.params.userid], (err, rows) => {
            if (!err) {
                res.json(rows)
            } else {
                return res.status(403).json("invalid error");
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////

///////////// request to add projects /////////////
exports.addproject= (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// adding data into user projects/////////////
       
        const values = [
            userInfo.id,
            req.body.title,
            req.body.description,
            poster_image = `http://localhost:8000/profile/${req.file.filename}`,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        pool.query("INSERT INTO  projects (user_id,title,description,poster_image,date_time) VALUES(?)", [values], (err, rows) => {
            if (!err) {
                return res.status(200).json("projects has been added.");
            } else {
                return res.status(500).json(err);
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////////

///////////// request to delete user projects /////////////
exports.deleteproject= (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ///////////// deleting user  projects/////////////
        pool.query("DELETE FROM  projects where id=? and user_id=?", [req.params.projectid, userInfo.id], (err, rows) => {
            if (err) return res.status(500).json(err);
            if (rows.affectedRows > 0) return res.status(200).json(" projects has been deleted.");
            return res.status(403).json("You can delete only your post")
        });
    });
};

///////////////////////////////////////////////////////////////////////////////////

///////////// request to update a user  projects/////////////
exports.updateprojects = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// updating data into projects  /////////////

        pool.query("UPDATE projects SET title=?,description=?,poster_image=? WHERE id=? and user_id=?",
         [
            req.body.title,
            req.body.description,
            poster_image = `http://localhost:8000/profile/${req.file.filename}`,,
            req.params.projectid,
            userInfo.id,
        ],
            (err, rows) => {
                if (err) res.status(500).json(err);
                if (rows.affectedRows > 0) return res.json("Updated!");
                return res.status(403).json("You can update only your post!");
            })
    })
}