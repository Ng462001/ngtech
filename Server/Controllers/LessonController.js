const db = require("../db/db.js")


class Lesson {
    static createdoc = (req, res) => {
        let sql = "INSERT INTO lessons (`course_name`, `course_id`, `lesson_name`, `lesson_id`, `lesson_desc`";
        const { course_name, lesson_name, lesson_id, lesson_desc, video_link } = req.body;
        const course_id = req.params.id;
        let values = [
            course_name,
            course_id,
            lesson_name,
            lesson_id,
            lesson_desc,
        ];

        if (req.file) {
            sql += ", `lesson_video`";
            values.push(req.file.filename);
        }

        if (req.body.video_link) {
            sql += ", `video_link`";
            values.push(video_link);
        }

        sql += ") VALUES (?)";

        db.query(sql, [values], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data);
        });
    }

    static getDoc = (req, res) => {
        const id = req.params.id;
        const sql = "select * from courses where course_id=?"
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })

    }
    static getLessonDoc = (req, res) => {
        const id = req.params.id;
        const sql = "select * from lessons where course_id=?"
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })

    }
    static updateDoc = (req, res) => {
        const id = req.params.id;
        const sql = "select * from lessons where lesson_id=?"
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })
    }
    static updateDocById = (req, res) => {
        const id = req.params.id;
        let sql = "Update lessons set `course_id`=?,`course_name`=?,`lesson_name`= ?,`lesson_desc`=?";
        const { course_id, course_name, lesson_name, lesson_desc, video_link } = req.body;
        let queryParams = [course_id, course_name, lesson_name, lesson_desc]

        if (req.body.video_link) {
            sql += ", `video_link`=?";
            queryParams.push(video_link);
        }
        if (req.file) {
            sql += ", `lesson_video`=?";
            queryParams.push(req.file.filename);
        }
        // Add WHERE condition for the course_id
        sql += " where lesson_id=?";
        queryParams.push(id)
        db.query(sql, queryParams, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data)
        })
    }

    static deleteDocById = (req, res) => {
        const sql = "delete from lessons where lesson_id = ?"
        const id = req.params.id;
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.send(data)
        })
    }
}
module.exports = Lesson