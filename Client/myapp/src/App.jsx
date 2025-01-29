import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import React, { useContext } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Coursepage from './pages/Coursepage.jsx'
import Aboutpage from './pages/Aboutpage.jsx'
import Contactpage from './pages/Contactpage.jsx'
import Homepage from './pages/Homepage.jsx'
import Dashboard from './Admin/Page/Dashboard.jsx'
import Courses from './Admin/Page/Courses.jsx'
import Lesson from './Admin/Page/Lesson.jsx'
import Students from './Admin/Page/Students.jsx'
import SellReport from './Admin/Page/SellReport.jsx'
import Feedback from './Admin/Page/Feedback.jsx'
import ChangePassword from './Admin/Page/ChangePassword.jsx'
import AddCourse from './Admin/Page/AddCourse.jsx'
import AddStudent from './Admin/Page/AddStudent.jsx'
import UpdateCourse from './Admin/Page/UpdateCourse.jsx'
import UpdateStudents from './Admin/Page/UpdateStudents.jsx'
import AddLesson from './Admin/Page/AddLesson.jsx'
import UpdateLesson from './Admin/Page/UpdateLesson.jsx'
import Profile from './User/pages/Profile.jsx'
import MyCourse from './User/pages/MyCourse.jsx'
import UserFeedback from './User/pages/Feedback.jsx'
import UserChangePass from './User/pages/ChangePassword.jsx'
import CourseDetail from './components/CourseDetail.jsx'
import VideoList from './components/Video.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import VerifyEmail from './components/VerifyEmail.jsx'
import Contact from './Admin/Page/Contact.jsx'
import { Toaster } from 'react-hot-toast';
import SuccessPage from './components/SuccessPage.jsx';
import ScrollToTop from './components/SrollToTop.jsx';
import { UserContext } from './useContext/UserProvider.jsx';

function App() {

  const { isUserLoggedIn, isAdminLoggedIn } = useContext(UserContext);

  return (
    <>

      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          {/*Main Home page*/}
          <Route path='/' element={<Homepage />} />
          <Route path='/course' element={<Coursepage />} />
          <Route path='/contact' element={<Contactpage />} />
          <Route path='/about' element={<Aboutpage />} />
          <Route path='/courseDetail/:id' element={<CourseDetail />} />
          <Route path='/forget-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
          <Route path='/verifyEmail/:id/:token' element={<VerifyEmail />} />

          {/*Admin*/}

          {isAdminLoggedIn ? (
            <>
              <Route path='/admin' element={<Dashboard />} />
              <Route path='/admin/course' element={<Courses />} />
              <Route path='/admin/updateCourse/:id' element={<UpdateCourse />} />
              <Route path='/admin/addCourse' element={<AddCourse />} />
              <Route path='/admin/lessons' element={<Lesson />} />
              <Route path='/admin/contact' element={<Contact />} />
              <Route path='/admin/lessons/addLesson/:id' element={<AddLesson />} />
              <Route path='/admin/lessons/updateLesson/:id' element={<UpdateLesson />} />
              <Route path='/admin/students' element={<Students />} />
              <Route path='/admin/updateStudent/:id' element={<UpdateStudents />} />
              <Route path='/admin/sellReports' element={<SellReport />} />
              <Route path='/admin/feedback' element={<Feedback />} />
              <Route path='/admin/changePassword' element={<ChangePassword />} />
              <Route path='/admin/addStudent' element={<AddStudent />} />
            </>
          ) : (<Route path='*' element={<Homepage />} />)}


          {/* User */}

          {isUserLoggedIn ? (
            <>
              <Route path='/profile' element={<Profile />} />
              <Route path='/myCourse' element={<MyCourse />} />
              <Route path='/feedback' element={<UserFeedback />} />
              <Route path='/changepassword' element={<UserChangePass />} />
              <Route path='/watchCourse/:id' element={<VideoList />} />
              <Route path='/success' element={<SuccessPage />} />
            </>
          ) : (<Route path='*' element={<Homepage />} />)}

        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  )
}

export default App
