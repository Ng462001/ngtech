import React, { useContext, useEffect, useState } from 'react'
import '../css/Navbar.css'
import Login from './Login'
import Signup from './Signup'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../useContext/UserProvider'



const Navbar = () => {
  const { isUserLoggedIn, name } = useContext(UserContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      setDropdownOpen(false);
    };
  }, []);


  useEffect(() => {
    window.addEventListener('scroll', () => {
      document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 0);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
    location.reload()
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar fixed-top navbar-expand-lg mainnavbar">
        <div className="container ">
          {/* Logo */}
          <Link className="navbar-brand " to="/"><img className="img" src="\logo\png\logo-no-background.png" alt="NGTech" width="200px" height="50px" srcSet="" /></Link>
          {/* Toggle Btn */}
          <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Sidebar */}
          <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            {/* Sidebar header */}
            <div className="offcanvas-header text-black border-4 border-bottom">
              <h5 className="offcanvas-title " id="offcanvasNavbarLabel">NGTech</h5>
              <button type="button" className="btn-close shadow-none border-0" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            {/* Sidebar body */}
            <div className="offcanvas-body text-center d-flex flex-column px-4 flex-lg-row">
              <ul className="navbar-nav justify-content-center justify-content-lg-end align-items-center fs-5 fw-semibold flex-grow-1 pe-3 navlinkedit">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/course">Course</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/contact">Contact</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
              </ul>
              {/* Login/Sighup Button */}
              {isUserLoggedIn ? (

                <div className="nav-item dropdown ">
                  <button
                    className="nav-link dropdown-toggle  mainbutton"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen ? "true" : "false"}
                  >
                    <FontAwesomeIcon icon={faUser} /> {name}
                  </button>
                  <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                    <Link className="dropdown-item" to="/profile">
                      Dashboard
                    </Link>
                    <Link className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                </div>
              ) : (
                <div className=" d-flex justify-content-center align-items-center flex-column flex-lg-row gap-3">
                  <button className='btn2' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1">Login </button>
                  <button className='btn2' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Signup</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Login />
      <Signup />
    </>
  )
}

export default Navbar

