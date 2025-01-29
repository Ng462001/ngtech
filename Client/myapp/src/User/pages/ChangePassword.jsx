import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import { UserContext } from '../../useContext/UserProvider'

const ChangePassword = () => {
  const { id, email } = useContext(UserContext);
  const [loading, setLoading] = useState()
  const [values, setFormData] = useState({
    id: '',
    email: ''
  })
  const [password, setPassword] = useState('')
  const [oldpassword, setOldPassword] = useState('')
  const navigate = useNavigate()

  const validatePass = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  useEffect(() => {
    setFormData({
      ...values,
      id: id,
      email: email
    })
  }, [])

  const UpdatePass = async (e) => {
    e.preventDefault()
    if (!validatePass(password)) {
      toast.error("Password must be at least 8 characters long, and include at least one letter, one number, and one special character.");
      return;
    }
    if (!validatePass(oldpassword)) {
      toast.error("Password must be at least 8 characters long, and include at least one letter, one number, and one special character.");
      return;
    }
    setLoading(true)
    try {
      const result = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updateProfilePass/` + values.id, { password, oldpassword })
      if (result.data.Status === "Success") {
        toast.success("Password Update Successfully")
        setLoading(false)
        navigate("/profile")
      } else {
        setLoading(false)
        toast.error(result.data.Error)

      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }
  return (
    <>
      {/* Navbar*/}
      <Navbar />

      <div className="container-lg mb-5 mt-5">
        <div className="row">
          {/* Sidebar*/}
          <Sidebar />
          {/* Change password page*/}

          <div className='col-sm-12 col-md-6 col-lg-9 mt-5 jumbotron'>
            <h3 className='text-center fw-bold my-4 '>Change Password</h3>
            <div className='w-100' style={{ display: "grid", placeItems: "center" }} >
              <form method='post' className='my-3 col-lg-8  ' onSubmit={UpdatePass}>
                <div className='form-group'>
                  <label htmlFor="email">Email</label>
                  <input type="email" className='form-control' name="email" id="email" value={values.email} disabled onChange={(e) => setFormData({ ...values, email: e.target.value })} />
                </div>
                <div className='form-group mt-4'>
                  <label htmlFor="oldPassword">Old Password</label>
                  <input className='form-control' type="password" required name="oldPassword" id="oldPassword" placeholder='Old Password' onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className='form-group mt-4'>
                  <label htmlFor="password">New Password</label>
                  <input className='form-control' type="password" required name="password" id="password" placeholder='New Password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='form-group text-center' >
                  {loading ?
                    <button className="btn btn-success" type="button" disabled>
                      <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
                      Updating...
                    </button>
                    :
                    <button type="submit" className='btn btn-success mt-4' name="updatePassword" disabled={!password || !oldpassword} >Update</button>
                  }
                  <button type="reset" className='btn btn-secondary mt-4 mx-4' >Reset</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePassword