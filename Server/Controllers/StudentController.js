const db = require("../db/db.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const salt = 10
const nodemailer = require("nodemailer")

class Student {

    static createDoc = (req, res) => {
        const sqlCheckEmail = "SELECT * FROM students WHERE email = ?";
        const sqlInsertDoc = "INSERT INTO students (name, email, password, role, verifyemail) VALUES (?)";

        const { name, email, password } = req.body;
        const verifyemail = "false";
        const role = "user";

        db.query(sqlCheckEmail, [email], (err, existingUserData) => {
            if (err) {
                return res.json({ Error: "Database error", err });
            }

            if (existingUserData.length > 0) {
                return res.json({ Error: "Email already exists" });
            }

            bcrypt.hash(password.toString(), salt, (err, hash) => {
                if (err) {
                    return res.json({ Error: "Error hashing password", err });
                }

                const values = [name, email, hash, role, verifyemail];

                db.query(sqlInsertDoc, [values], (err, data) => {
                    if (err) {
                        return res.json({ Error: "Database error", err });
                    }

                    const id = data.insertId;

                    const token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.NODEMAILER_USER,
                            pass: process.env.NODEMAILER_PASS
                        }
                    });
                    const text = `Hi ${name},

                    Thanks for getting started with NGTech!

                    We need a little more information to complete your registration, including a confirmation of your email address.

                    Click below link to confirm your email address:

                    ${process.env.FRONTEND_URL}/verifyEmail/${id}/${token}`

                    var mailOptions = {
                        from: process.env.NODEMAILER_USER,
                        to: email,
                        subject: 'Verify Your Email',
                        text: text

                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            return res.json({ Error: "Error sending email", error });
                        } else {
                            return res.json({ Status: "Success", data });
                        }
                    });
                });
            });
        });
    };


    static ForgetPassword = (req, res) => {
        const { email } = req.body;
        const sql = "SELECT * FROM students WHERE `email` = ?";
        db.query(sql, [email], (err, data) => {
            if (err) {
                return res.json({ Error: "Server Problem" });
            }
            if (data.length < 0){
                return res.json({ Error: "No Email Found!" });

            }
            if (data.length > 0) {
                const id = data[0].id;
                const token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.NODEMAILER_USER,
                        pass: process.env.NODEMAILER_PASS
                    }
                });

                var mailOptions = {
                    from: process.env.NODEMAILER_USER,
                    to: email,
                    subject: 'Reset Password',
                    text: `${process.env.FRONTEND_URL}/reset-password/${id}/${token}`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return res.json({ Error: "Failed to send email" });
                    } else {
                        return res.json({ Success: "Email sent successfully" });
                    }
                });
            } else {
                return res.json({ Error: "No Email Existed" });
            }
        });

    }


    static ResetPassword = (req, res) => {
        const { id, token } = req.params;
        const { password } = req.body;
        const sql = "UPDATE students SET `password` = ? WHERE id = ?";

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({ Error: "Not a valid token!" });
            }

            bcrypt.hash(password.toString(), salt, (err, hash) => {
                if (err) {
                    return res.json({ Error: "Error hashing password" });
                }

                db.query(sql, [hash, id], (err, data) => {
                    if (err) {
                        return res.json({ Error: "Database error", err });
                    }
                    return res.json({ Status: "Success", data });
                });
            });
        });
    };


    static VerifyEmail = (req, res) => {
        const { id, token } = req.params;
        const sql = "UPDATE students SET verifyemail = ? WHERE id = ?";
        const trueVariable = "true";

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({ Error: "Not a valid token!" });
            }
            db.query(sql, [trueVariable, id], (err, data) => {
                if (err) {
                    return res.json(err);
                }
                return res.json({ Status: 'Success', data })
            })


        });
    };


    static getLogin = (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ Error: 'Email and Password are required' })
        }
        const sql = "SELECT * FROM students WHERE `email` = ? ";
        db.query(sql, [email], (err, data) => {
            if (err) return res.json({ Error: "Login Error in server" });
            if (data.length > 0) {
                const verifyemail = data[0].verifyemail;

                if (verifyemail === 'false') {
                    return res.json({ Error: "Please verify your Email", err });
                }
                bcrypt.compare(req.body.password.toString(), data[0].password, (error, result) => {
                    if (error) return res.json({ Error: "Password Compare Error" });
                    if (result) {
                        const id = data[0].id;
                        const role = data[0].role;
                        const name = data[0].name;
                        const email = data[0].email;
                        const image = data[0].image;
                        const verifyemail = data[0].verifyemail;
                        const token = jwt.sign({ id, role, name, email, image }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                        return res.json({ Status: 'Success', token, verifyemail })

                    } else {
                        return res.json({ Error: "Password not matched" });
                    }
                })
            }
            else {
                return res.json({ Error: "No Email Existed" })
            }
        })
    }

    static getDoc = (req, res) => {
        const sql = "select * from students"
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })

    }
    static getNumberOfStudent = (req, res) => {
        const sql = "SELECT COUNT(*) AS total_students FROM students"
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json({ total_students: data[0].total_students })
        })

    }
    static updateDoc = (req, res) => {
        const id = req.params.id;
        const sql = "select * from students where id=?"
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })

    }

    static updateDocById = (req, res) => {
        const id = req.params.id;
        const { name, email, password } = req.body;

        db.query("SELECT * FROM students WHERE id = ?", [id], (err, result) => {
            if (err) {
                return res.json({ Error: "Database error", err });
            }
            if (result.length === 0) {
                return res.json({ Error: "Student not found" });
            }

            const currentEmail = result[0].email;
            const currentPassword = result[0].password;
            const verifyemail = "false";

            const updateValues = [name, email, currentPassword, verifyemail, id];

            // Check if the email has changed
            if (email !== currentEmail) {
                const sqlCheckEmail = "SELECT * FROM students WHERE email = ?";
                db.query(sqlCheckEmail, [email], (err, existingUserData) => {
                    if (err) {
                        return res.json({ Error: "Database error", err });
                    }

                    if (existingUserData.length > 0) {
                        return res.json({ Error: "Email already exists" });
                    }

                    handlePasswordUpdate();
                });
            } else {
                handlePasswordUpdate();
            }

            function handlePasswordUpdate() {
                if (password) {
                    bcrypt.hash(password.toString(), saltRounds, (err, hash) => {
                        if (err) {
                            return res.json({ Error: "Error hashing password" });
                        }
                        updateValues[2] = hash;
                        executeUpdate();
                    });
                } else {
                    executeUpdate();
                }
            }

            function executeUpdate() {
                const sql = "UPDATE students SET `name` = ?, `email` = ?, `password` = ?, `verifyemail` = ? WHERE id = ?";
                db.query(sql, updateValues, (err, data) => {
                    if (err) {
                        return res.json({ Error: "Database error", err });
                    }
                    if (email !== currentEmail) {

                        const token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.NODEMAILER_USER,
                                pass: process.env.NODEMAILER_PASS
                            }
                        });
                        const text = `Hi ${name},
        
                        Thanks for updating your details with NGTech!
        
                        We need a little more information to complete your update, including a confirmation of your email address.
        
                        Click the link below to confirm your email address:
        
                        ${process.env.FRONTEND_URL}/verifyEmail/${id}/${token}`;

                        var mailOptions = {
                            from: process.env.NODEMAILER_USER,
                            to: email,
                            subject: 'Verify Your Updated Email',
                            text: text
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                return res.json({ Error: "Error sending email", error });
                            } else {
                                return res.json({ Status: "Email send", data });
                            }
                        });
                    }
                    return res.json({ Status: "Success", data });
                });
            }
        });
    }


    static deleteDocById = (req, res) => {
        const sql = "delete from students where id = ?"
        const id = req.params.id;
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.send(data)
        })
    }
}

module.exports = Student