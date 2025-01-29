const express = require("express")
const Course = require("../Controllers/CourseController")
const Student = require("../Controllers/StudentController")
const Lesson = require("../Controllers/LessonController")
const Profile = require("../Controllers/ProfileController")
const Payment = require("../Controllers/PaymentController")
const Feedback = require("../Controllers/FeedbackController")
const Admin = require("../Controllers/AdminController")
const Order = require("../Controllers/OrderController")
const Contact = require("../Controllers/ContactController")
const router = express.Router()
const multer = require("multer")
const jwt = require("jsonwebtoken")



//Upload Image Middleware

const uploadimg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "_" + Date.now() + ".jpg")
        }
    })
}).single("course_image")

//Upload Profile Image Middleware

const uploadProfileimg = multer({

    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "_" + Date.now() + ".jpg")
        }
    })
}).single("image")


//Upload Video Middleware

const uploadvideo = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "_" + Date.now() + ".mp4")
        }
    })
}).single("lesson_video")


//Verify JWT Token Middleware

const verify = (req, res, next) => {
    const token = req.headers["authorization"]
    if (!token) {
        return res.json({ Error: "unauthorized" })
    } else {
        const maintoken = token.split(" ")[1];

        jwt.verify(maintoken, process.env.JWT_SECRET_KEY, (err, data) => {
            if (err) {
                return res.json({ Error: "Token not Correct" })
            } else {
                req.id = data.id;
                req.role = data.role;
                req.name = data.name;
                req.email = data.email;
                req.image = data.image;
                next();
            }
        })
    }

}

//Auth Routes

router.get('/check', verify, (req, res) => {
    return res.json({ Status: "Success", id: req.id, role: req.role, name: req.name, email: req.email , image: req.image})
})

//Contact Routes


router.post("/contact", Contact.createContact)
router.get("/getcontact", Contact.getDoc)
router.delete("/deleteContact/:id", Contact.deleteDoc)

//students Routes

router.post("/signup", Student.createDoc)
router.post("/login", Student.getLogin)
router.get("/student", Student.getDoc)
router.get("/numberOfStudents", Student.getNumberOfStudent)
router.get("/updateStudent/:id", Student.updateDoc)
router.put("/updateStudentByID/:id", Student.updateDocById)
router.delete("/deleteStudentByID/:id", Student.deleteDocById)

//Forget Password

router.post("/forget_Password", Student.ForgetPassword)
router.post("/reset_Password/:id/:token", Student.ResetPassword)
router.post("/verifyEmail/:id/:token", Student.VerifyEmail)


//Admin Login and Signup

router.post("/admin/login", Admin.getDoc)
router.post("/admin/signup", Admin.createDoc)
router.put("/updateAdminPass/:id", Admin.UpdatePassword)


//Feedback

router.post("/addfeedback", Feedback.insertDoc)
router.get("/feedback", Feedback.getDoc)
router.get("/getAllFeedback", Feedback.getAllFeedback)
router.delete("/deleteFeedback/:id", Feedback.deleteDocById)


//order 

router.get("/order", Order.getOrder)
router.delete("/deleteorder/:id", Order.deleteDocById)
router.get("/checkCoursePurchase/:id", Order.coursePurchase)
router.get("/numberOfsold", Order.getNumberOfOrder)
router.post("/sellreport", Order.getsellReport)

//Profile Routes

router.put("/updateProfile/:id", uploadProfileimg, Profile.updateProfileBYId)
router.put("/updateProfilePass/:id", Profile.UpdatePassword)
router.get("/getCourse", Profile.getMycourse)


//courses Routes

router.post("/course", uploadimg, Course.createdoc)
router.get("/course", Course.getDoc)
router.get("/courseshow3", Course.getDoc3)
router.get("/numberOfCourses", Course.getNumberOfCourse)
router.get("/courseshow6", Course.getDoc6)
router.get("/courseshow", Course.showAllDoc)
router.get("/updateCourse/:id", Course.updateDoc)
router.delete("/deleteCourseByID/:id", Course.deleteDocById)
router.put("/updateCourseByID/:id", uploadimg, Course.updateDocById)


//lesson Routes

router.get("/lessons/:id", Lesson.getDoc)
router.post("/addLesson/:id", uploadvideo, Lesson.createdoc)
router.get("/getlessons/:id", Lesson.getLessonDoc)
router.get("/updateLesson/:id", Lesson.updateDoc)
router.put("/updateLessonByID/:id", uploadvideo, Lesson.updateDocById)
router.delete("/deleteLessonByID/:id", Lesson.deleteDocById)

//Payment

router.post('/charge', Payment.createPayment)
router.post('/paymentcomplete', Payment.paymentStatus)

module.exports = router
