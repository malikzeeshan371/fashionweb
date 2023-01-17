const pool = require("../connection/mysql.js");
const jwt = require('jsonwebtoken');
const JWT_secret = 'fashionwebsite';
const moment = require("moment")

//////////////////////////////////////////////////////////////////////////////////////

///////////// request to get all subcategories /////////////
exports.get_subcategory = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ////////////////// select all subcategories  ///////////
        pool.query("SELECT * FROM sub_categories where category_id=? ", [req.params.categoryid],(err, rows) => {
            if (!err) {
                res.json(rows)
            } else {
                return res.status(403).json("invalid error");
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////

///////////// request to add sub category /////////////
exports.add_subcategory = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// adding data into sub categories /////////////
        const values = [
            req.body.category_id,
            req.body.name,
            req.body.slug,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        pool.query("INSERT INTO  sub_categories (category_id,name,slug,date_time) VALUES(?)", [values], (err, rows) => {
            if (!err) {
                return res.status(200).json("sub category has been added.");
            } else {
                return res.status(500).json(err);
            }
        })
    })
}

///////////////////////////////////////////////////////////////////////////////////

///////////// request to delete a subcategory //////////////
exports.delete_subcatergory = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        ///////////// deleting a subcategory /////////////
        pool.query("DELETE FROM  sub_categories where sub_category_id=?", [req.params.subcategoryid], (err, rows) => {
            if (err) return res.status(500).json(err);
            if (rows.affectedRows > 0) return res.status(200).json("sub category has been deleted.");
            return res.status(403).json("You can delete only your post")
        });
    });
};

///////////////////////////////////////////////////////////////////////////////////

///////////// request to update a sub category /////////////
exports.update_subcategory = (req, res) => {
    ///////////// verify that user is logedin /////////
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JWT_secret, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        ///////////// updating data into sub category  /////////////

        pool.query("UPDATE sub_categories SET name=?,slug=? WHERE sub_category_id=? ",
            [
                req.body.name,
                req.body.slug,
                req.params.subcategoryid,
            ],
            (err, rows) => {
                if (err) res.status(500).json(err);
                if (rows.affectedRows > 0) return res.json("Updated!");
                return res.status(403).json("You can update only your post!");
            })
    })
}