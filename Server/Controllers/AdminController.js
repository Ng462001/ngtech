const db = require("../db/db.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const salt = 10


class Admin {

    static createDoc = (req, res) => {

        const sql = "INSERT INTO admin (`name`,`email`,`password`) values (?)";
        const { name, email, password } = req.body;
        bcrypt.hash(password.toString(), salt, (err, hash) => {
            if (err) return res.json({ Error: "Error for Hassing Password" });

            const value = [
                name,
                email,
                hash
            ]
            db.query(sql, [value], (err, data) => {
                if (err) {
                    return res.json(err);
                }
                return res.json({ Status: "Success" })
            })
        })

    }

    static getDoc = (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ Error: 'Email and Password are required' })
        }
        const sql = "SELECT * FROM admin WHERE `email` = ?";
        db.query(sql, [email], (err, data) => {
            if (err) return res.json({ Error: "Login Error in server" });
            if (data.length > 0) {
                bcrypt.compare(req.body.password.toString(), data[0].password, (error, result) => {
                    if (error) return res.json({ Error: "Password Compare Error" });
                    if (result) {
                        const id = data[0].id;
                        const role = data[0].role;
                        const name = data[0].name;
                        const email = data[0].email;
                        const token = jwt.sign({ id, role, name, email }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                        return res.json({ Status: "Success", token });
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
    static UpdatePassword = (req, res) => {

        const { oldpassword, password } = req.body;
        const id = req.params.id;

        const sqlOldPassword = "SELECT * FROM admin WHERE id = ?";
        db.query(sqlOldPassword, [id], (err, data) => {
            if (err) return res.json({ Error: "Login Error in server" });
            if (data.length === 0) {
                return res.json({ Error: "User not found" });
            }

            bcrypt.compare(oldpassword, data[0].password, (error, result) => {
                if (error) return res.json({ Error: "Password Compare Error" });
                if (result) {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) return res.json({ Error: "Error for Hashing Password" });
                        const sqlUpdatePassword = "Update admin set `password`=? where id=?";
                        db.query(sqlUpdatePassword, [hash, id], (err, data) => {
                            if (err) {
                                return res.json({ Error: "Error updating password" });
                            }
                            return res.json({ Status: "Success" });
                        });
                    });
                } else {
                    return res.json({ Error: "Old password does not match" });
                }
            })
        })
    }

}

module.exports = Admin