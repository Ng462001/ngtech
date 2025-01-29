import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
library.add(faUser, faEnvelope, faLock);
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';


const Signup = () => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validatePass = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  const OnSignup = async (e) => {
    try {
      e.preventDefault()

      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address!");
        return;
      }
      if (!validatePass(password)) {
        toast.error("Password must be at least 8 characters long, and include at least one letter, one number, and one special character.");
        return;
      }
      setLoading(true);
      const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, { name, email, password })
      if (result.data.Status) {
        toast.success(`Verification Link Sent to ${email}`)
        setTimeout(() => {
          setLoading(false)
          navigate("/")
          window.location.reload()
        }, 1000)
      } else {
        setLoading(false)
        toast.error(result.data.Error)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
  return (
    <>

      {/* SignUp Page*/}
      <div className="modal fade " id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" >
          <div className="modal-content text-black">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Registration</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold"><span className='m-2'><FontAwesomeIcon icon="fa-solid fa-user" /></span>Name</label>
                  <input type="text" className="form-control" placeholder='Name' name='name' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold"><span className='m-2'><FontAwesomeIcon icon="fa-solid fa-envelope" /></span>Email address</label>
                  <input type="email" className="form-control" placeholder='Email' aria-describedby="emailHelp" name='email' onChange={(e) => setEmail(e.target.value.toLowerCase())} />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold"><span className='m-2'><FontAwesomeIcon icon="fa-solid fa-lock" /></span>Password</label>
                  <input type="password" className="form-control" name='password' placeholder='Password' aria-describedby="passwordHelpBlock" onChange={(e) => setPassword(e.target.value)} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              {loading ?
                <button className="btn btn-primary" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Signing...
                </button>
                :
                <button type="button" className="btn btn-primary" onClick={OnSignup} disabled={!name || !email || !password}>SignUp</button>
              }
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup