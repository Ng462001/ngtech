const db = require("../db/db.js")

class Course {

    static createdoc = (req, res) => {
        const sql = "INSERT INTO courses (`course_name`,`course_desc`,`course_author`,`course_duration`,`course_original_price`,`course_price`,`course_image`) values (?)";
        const { course_name, course_desc, course_author, course_duration, course_original_price, course_price } = req.body;
        const value = [
            course_name,
            course_desc,
            course_author,
            course_duration,
            course_original_price,
            course_price,
            req.file.filename
        ]
        db.query(sql, [value], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.send("Success")
        })
    }
    static getDoc = (req, res) => {
        const sql = "select * from courses"
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })
    }
    static getDoc3 = (req, res) => {
        const sql = "select * from courses LIMIT 3"
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })
    }
    static getDoc6 = (req, res) => {
        const sql = "select * from courses LIMIT 3,3"
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })
    }
    static showAllDoc = (req, res) => {
        const sql = "select * from courses "
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })
    }
    static getNumberOfCourse = (req, res) => {
        const sql = "SELECT COUNT(*) AS total_courses FROM courses"
        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json({ total_courses: data[0].total_courses })
        })

    }

    static updateDoc = (req, res) => {
        const id = req.params.id;
        const sql = "select * from courses where course_id=?"
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })
    }
    static updateDocById = (req, res) => {
        const id = req.params.id;
        let sql = "UPDATE courses SET `course_name`=?, `course_desc`=?, `course_author`=?, `course_duration`=?, `course_original_price`=?, `course_price`=?"
        const { course_name, course_desc, course_author, course_duration, course_original_price, course_price } = req.body;
        let queryParams = [course_name, course_desc, course_author, course_duration, course_original_price, course_price];

        // Check if a new image is uploaded
        if (req.file) {
            sql += ", `course_image`=?";
            queryParams.push(req.file.filename);
        }

        // Add WHERE condition for the course_id
        sql += " WHERE course_id=?";
        queryParams.push(id);

        // Execute the query with dynamic parameters
        db.query(sql, queryParams, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.send("Success");
        });
    }

    static deleteDocById = (req, res) => {
        const sql = "delete from courses where course_id = ?"
        const id = req.params.id;
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.send(data)
        })
    }


}
module.exports = Course