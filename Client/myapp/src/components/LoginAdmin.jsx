import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
library.add(faUser, faLock);
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';


const LoginAdmin = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const onsubmit = async (e) => {
    try {
      e.preventDefault()
      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address!");
        return;
      }
      if (!email || !password) {
        toast.error('Please enter both email and password.');
        return;
      }
      setLoading(true);
      const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/login`, { email, password })
      if (result.data.Status == "Success") {
        const token = result.data.token
        localStorage.setItem("token", token)
        toast.success("Login Successful")
        setTimeout(() => {
          navigate("/admin")
          window.location.reload()
        }, 1000)
      }
      else {
        toast.error(result.data.Error);
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <>
      {/* Login Page*/}

      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" >
          <div className="modal-content text-black">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Admin Login</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold"><span className='m-2'><FontAwesomeIcon icon="fa-solid fa-user" /></span>Email address</label>
                  <input type="email" name='email' className="form-control" placeholder='Email' aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold"><span className='m-2'><FontAwesomeIcon icon="fa-solid fa-lock" /></span>Password</label>
                  <input type="password" className="form-control" name='password' placeholder='Password' aria-describedby="passwordHelpBlock" onChange={(e) => setPassword(e.target.value)} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={onsubmit} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default LoginAdmin