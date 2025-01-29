import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../css/Navbar.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address!");
        return;
      }
      if (!email || !password) {
        toast.error('Please enter both email and password.');
        return;
      }
      setLoading(true);
      const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, { email, password });
      if (result.data.verifyemail === 'true') {
        const token = result.data.token
        localStorage.setItem("token", token)
        setLoading(false);
        toast.success('Login Successful');
        location.reload(true)
      } else {
        setLoading(false);
        toast.error(result.data.Error);
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const onClickForgotPassword = () => {
    navigate(`/forget-password`)
    location.reload(true)
  };

  return (
    <>
      <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" >
          <div className="modal-content text-black">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Login</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold"><span className='m-2'><FontAwesomeIcon icon={faUser} /></span>Email address</label>
                  <input type="email" name='email' required className="form-control" placeholder='Email' aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                  <div id="emailHelp" className="form-text text-black">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold"><span className='m-2'><FontAwesomeIcon icon={faLock} /></span>Password</label>
                  <input type="password" className="form-control" name='password' required placeholder='Password' aria-describedby="passwordHelpBlock" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                  <Link onClick={onClickForgotPassword}>Forgot Password ?</Link>
                </div>

                <div className="modal-footer">
                  {loading ?
                    <button className="btn btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Logging...
                    </button>
                    :
                    <button type="submit" className="btn btn-primary" disabled={!email || !password}>Login</button>
                  }
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
