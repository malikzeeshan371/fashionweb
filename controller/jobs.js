const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const JWT_secret = 'fashionwebsite';
const moment = require("moment")

//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get list of all jobs /////////////
exports.getjob = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ////////////////// select all jobs ///////////
        pool.query("SELECT * FROM jobs ", (err, rows) => {
            if (!err) {
                res.json(rows)
            } else {
                return res.status(403).json("invalid error");
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////

///////////// request to add a job /////////////
exports.addjob = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// adding data into jobs list /////////////
        const values = [
            userInfo.id,
            req.body.title,
            req.body.description,
            req.body.type,
            req.body.country,
            req.body.city,
            req.body.catergory,
            req.body.sub_catergory,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        pool.query("INSERT INTO  jobs (user_id,title,description,type,country,city,category_id,sub_category_id,date_time) VALUES(?)", [values], (err, rows) => {
            if (!err) {
                return res.status(200).json("job has been added.");
            } else {
                return res.status(500).json(err);
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////////

///////////// request to delete a job /////////////
exports.deletejob = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ///////////// deleting a job /////////////
        pool.query("DELETE FROM  jobs where job_id=? and user_id=?", [req.params.jobid, userInfo.id], (err, rows) => {
            if (err) return res.status(500).json(err);
            if (rows.affectedRows > 0) return res.status(200).json("job has been deleted.");
            return res.status(403).json("You can delete only your post")
        });
    });
};

///////////////////////////////////////////////////////////////////////////////////

///////////// request to update a job /////////////
exports.updatejob = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// updating data into job /////////////

        pool.query("UPDATE jobs SET title=?,description=?,type=?,country=?,city=?,category_id=?,sub_category_id=? WHERE job_id=? and user_id=?",
         [
            
            req.body.title,
            req.body.description,
            req.body.type,
            req.body.country,
            req.body.city,
            req.body.catergory,
            req.body.sub_catergory,
            req.params.jobid,
            userInfo.id
           
        ],
            (err, rows) => {
                if (err) res.status(500).json(err);
                if (rows.affectedRows > 0) return res.json("Updated!");
                return res.status(403).json("You can update only your post!");
            })
    })
}