
const express = require("express");
const { body, validationResult } = require('express-validator');
const userapi = require("../controller/user.js");
const router = express.Router();
const moment = require("moment");
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const JWT_secret = 'fashionwebsite';
const pool = require("../connection/mysql.js");
const { response } = require("express");
const e = require("express");

/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


/////////// nodemailder /////////
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'developerhex1@gmail.com',
        pass: 'letngzdspwdlfejm',
    }
});
///////////////////////////////////////////

//  This is request for creating a new user : no login required
router.post("/createuser", [
    body('full_name', "enter valid name ").isLength({ min: 3 }),
    body('email', " enter valid email").isEmail(),
    body('password', "enter valid password").isLength({ min: 5 }),

    body('mobile_number', "enter valid number ").isLength({ min: 10 }),


], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    try {
        //////////// check email already exist ///////////
        await pool.query("SELECT * FROM user WHERE email=?", [req.body.email],  async (err, rows) => {
            if (rows.length > 0) {
                return res.status(400).json("A user with this email already exist ");
            }
            else {
                // ////////// secure password hash //////////
                 const  salt = await bcrypt.genSalt(10);
                const secpassword = await bcrypt.hash(req.body.password, salt);

                ///////////  create user /////////////////
                pool.query("INSERT INTO user(full_name,email,mobile_number,password,status,verify_by_email) values (?,?,?,?,?,?) ", [req.body.full_name, req.body.email, req.body.mobile_number, secpassword, req.body.status, "0"], async (err, data) => {
                    if (!err) {

                        // res.json(data.insertId)
                        //////////// send varification code ///////////
                        const code = `${Math.floor(1000 + Math.random() * 9000)}`
                        ///////////// email varification ////////
                        const mailto = {
                            from: "developerhex1@gmail.com",
                            to: req.body.email,
                            subject: "verify your email",
                            html: `<p>your email varification code is <b>${code}</b>`
                        }
                      await  transporter.sendMail(mailto);

                        ////////// saving code to db ///////////////
                        pool.query("INSERT INTO uservarification(user_id,code,date_time) values (?,?,?)", [data.insertId, code,moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")], (err, rows) => {
                            if (err) {
                                res.json(err)
                            }
                            else {
                                res.send({ message: "varification code is sent ", user_id : data.insertId });
                            }
                        })

                    } else {
                        // console.log(err)
                        return res.status(400).json(err);

                    }

                })
            }
        })

    }
    catch (error) {
        console.error(error.message);
        res.status(400).send("internal server error");

    }

})
/////////////////////// end ///////////////////////////////////////////

///// to check email varification //////////
router.post("/varify", async (req, res) => {
    await pool.query("SELECT code from uservarification where user_id=? ORDER BY id DESC", [req.body.user_id], async (err, rows) => {
        if (err) {
            res.json(err)
        }
        else {
            const code = rows[0].code;
            const varify = req.body.code;
            if (code == varify) {
                ///////////// updating data into post /////////////
                await pool.query("UPDATE user SET verify_by_email=? WHERE id=? ",
                    [
                        1,
                        req.body.user_id
                    ],
                    (err, rows) => {
                        if (err) res.status(500).json(err);
                        // if (rows.affectedRows > 0) return res.json("verified");
                    })
                await pool.query("SELECT * FROM user WHERE id=?", [req.body.user_id], async (err, rows) => {
                    if (!err) {
                        const token = await jwt.sign({ id: req.body.user_id }, JWT_secret);

                        const { password, ...others } = rows[0];

                        res
                            .cookie("accessToken", token, {
                                httpOnly: true,
                            })
                            .status(200)
                            .json(others);
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })

            } else {
                res.json("worng code")
            }
        }
    })
})

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//////// This is request for login a user : no login required ////////////

router.post("/login", [
    body('email', " enter valid email").isEmail(),
    body('password', "password can not be blank").exists(),
], async (req, res) => {
    /////////////// check for valid password //////////
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    try {

        ////////////// find that user exist ///////////
        const user = await pool.query("SELECT * FROM user WHERE email=?", [req.body.email], async (err, rows) => {
            if (rows.length == 0) {
                return res.status(400).json("A user with this email does not exist ");
            } else {
                /////////////// check for  password //////////
                const checkpassword = bcrypt.compareSync(req.body.password, rows[0].password)
                if (!checkpassword) {
                    return res.status(400).json("Wrong password or username!");
                }
                // //////////// if email and password is correct then login /////////
                //////////// send varification code ///////////
                const code = `${Math.floor(1000 + Math.random() * 9000)}`
                ///////////// email varification ////////
                const mailto = {
                    from: "developerhex1@gmail.com",
                    to: req.body.email,
                    subject: "verify your email",
                    html: `<p>your email varification code is <b>${code}</b>`
                }
                await transporter.sendMail(mailto);
                /////////
                const userid = rows[0].id

                ////////// saving code to db ///////////////
                await pool.query("INSERT INTO uservarification(user_id,code,date_time) values (?,?,?)", [userid, code,moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")], (err, rows) => {
                    if (err) {
                        res.json(err)
                    }
                    else {
                        res.send({ message: "varification code is sent ", user_id: userid });
                    }
                })

                // const token = jwt.sign({ id: rows[0].id }, JWT_secret);

                // const { password, ...others } = rows[0];

                // res
                //     .cookie("accessToken", token, {
                //         httpOnly: true,
                //     })
                //     .status(200)
                //     .json(others);
            }
        })

    } catch (error) {
        console.error(error.message);
        res.status(400).send("internal server error");

    }
})


/////////////////////// end ///////////////////////////////////////////


//////// This is request for get user detail ////////////
router.post("/logout", (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out.")
});




module.exports = router;
