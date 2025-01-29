import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import { UserContext } from '../../useContext/UserProvider'

const ChangePassword = () => {
  const { id, email } = useContext(UserContext);

  const [password, setPassword] = useState('')
  const [oldpassword, setOldPassword] = useState('')
  const navigate = useNavigate()

  const UpdatePass = async (e) => {
    try {
      e.preventDefault()
      const result = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updateAdminPass/` + id, { password, oldpassword })
      if (result.data.Status === "Success") {
        toast.success("Password Update Successfully")
        navigate("/admin")
      } else {
        toast.error(result.data.Error)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {/* Navbar*/}
      <Header />

      <div className="container-fluid mb-5 admin">
        <div className="row">
          {/* Sidebar*/}
          <Sidebar />
          {/* Change password page*/}

          <div className="col-sm-9 mt-5">
            <div className='row'>
              <div className='col-sm-6'>
                <form className='mt-5 mx-5' method='post' onSubmit={UpdatePass}>
                  <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' name="email" id="email" value={email} disabled />
                  </div>
                  <div className='form-group mt-4'>
                    <label htmlFor="oldPassword">Old Password</label>
                    <input className='form-control' type="password" required name="oldPassword" id="oldPassword" placeholder='Old Password' onChange={(e) => setOldPassword(e.target.value)} />
                  </div>
                  <div className='form-group mt-4'>
                    <label htmlFor="password">New Password</label>
                    <input className='form-control' type="password" required name="password" id="password" placeholder='New Password' onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <button type="submit" className='btn btn-success mt-4' name="updatePassword" disabled={!password || !oldpassword} >Update</button>
                  <button type="reset" className='btn btn-secondary mt-4 mx-4' >Reset</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePassword