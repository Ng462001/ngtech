const db = require("../db/db.js")

class Order {
    static getOrder = (req, res) => {
        const sql = "select * from course_order"
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })

    }

    static deleteDocById = (req, res) => {
        const sql = "delete from course_order where order_id = ?"
        const id = req.params.id;
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.send(data)
        })
    }

    static getNumberOfOrder = (req, res) => {
        const sql = "SELECT COUNT(*) AS total_sold FROM course_order"
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json({ total_sold: data[0].total_sold })
        })

    }


    static coursePurchase = (req, res) => {
        const id = req.params.id;
        const { email } = req.query;

        const query = 'SELECT * FROM course_order WHERE email = ? AND course_id = ?';
        db.query(query, [email, id], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.length > 0) {
                return res.json({ purchased: true });
            } else {
                return res.json({ purchased: false });
            }
        });
    }

    static getsellReport = (req, res) => {
        const { startdate, enddate } = req.body;
        

        const sql = "SELECT * FROM course_order WHERE date BETWEEN ? AND ?";
        db.query(sql, [startdate, enddate], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })

    }
}
module.exports = Order