const db = require("../db/db.js")
const bcrypt = require("bcrypt")
const salt = 10

class Profile {

    static UpdatePassword = (req, res) => {
        const { oldpassword, password } = req.body;
        const id = req.params.id;

        const sqlOldPassword = "SELECT * FROM students WHERE id = ?";
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
                        const sqlUpdatePassword = "UPDATE students SET password = ? WHERE id = ?";
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

    static updateProfileBYId = (req, res) => {
        const id = req.params.id;
        const { name, email } = req.body;
        let sql = "Update students set `name`=?,`email`=? ";
        let queryParams = [name, email]

        if (req.file) {
            sql += ", `image`=?";
            queryParams.push(req.file.filename);
        }

        // Add WHERE condition for the course_id
        sql += " where id=?";
        queryParams.push(id);

        db.query(sql, queryParams, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json({ Status: "Success", data });
        })
    }

    static getMycourse = (req, res) => {
        const { email } = req.query;

        const sql = `
            SELECT co.order_id, c.course_id, c.course_name, c.course_duration, c.course_desc,
                   c.course_image, c.course_author, c.course_original_price, c.course_price 
            FROM course_order AS co 
            JOIN courses AS c ON c.course_id = co.course_id 
            WHERE co.email = ?`;

        db.query(sql, [email], (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.json(data);
        });
    }
}
module.exports = Profile