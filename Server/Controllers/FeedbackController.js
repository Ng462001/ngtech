const db = require("../db/db.js")
class Feedback {
    static insertDoc = (req, res) => {
        const sql = "INSERT INTO feedback (`stu_id`,`name`,`feedback`) values (?)";
        const { id, name, feedback } = req.body;
        const value = [
            id,
            name,
            feedback
        ]
        db.query(sql, [value], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.send("Success")
        })

    }
    static getDoc = (req, res) => {
        const sql = "select * from feedback"
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })

    }

    static deleteDocById = (req, res) => {
        const sql = "delete from feedback where f_id = ?"
        const id = req.params.id;
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.send(data)
        })
    }

    static getAllFeedback = (req, res) => {
        const sql = `
        SELECT f.f_id, f.stu_id, f.name, f.feedback, s.image
        FROM feedback AS f 
        JOIN students AS s ON s.id = f.stu_id `

        db.query(sql, (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.json(data);
        });
    }
}

module.exports = Feedback