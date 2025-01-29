const db = require("../db/db.js")

class Contact {
    static createContact = (req, res) => {
        const sql = "INSERT INTO contact (`name`,`subject`,`email`,`message`,`date`) values (?)";
        const { name, subject, email, message } = req.body;
        const value = [
            name,
            subject,
            email,
            message,
            new Date()
        ]
        db.query(sql, [value], (err, data) => {
            if (err) {
                return res.json({ Error: "something wrong", err });
            }
            return res.json({ Status: "Success", data })
        })
    }

    static getDoc = (req, res) => {
        const sql = "select * from contact"
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })

    }

    static deleteDoc = (req, res) => {
        const sql = "delete from contact where c_id = ?"
        const id = req.params.id;
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })
    }
}

module.exports = Contact