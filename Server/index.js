const dotenv = require('dotenv')
dotenv.config()
const express = require("express")
const cors = require("cors")
const db = require("./db/db.js")
const AllRoutes = require("./Routes/routes.js")
const PORT = process.env.PORT || "8081"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["PUT", "POST", "DELETE", "GET"],
    credentials: true
}))
app.use(express.static("uploads"))

// Database Connection
db;

app.use('/api', AllRoutes)


app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})


