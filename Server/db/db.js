const mysql = require("mysql")

const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME

})
if (db) {
    console.log("Database Connected Successfully")
}

module.exports = db
