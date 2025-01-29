import React, { useContext, useEffect } from 'react'
import '../css/Body.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../useContext/UserProvider';

const Body = () => {
  const {isUserLoggedIn} = useContext(UserContext);
  
  return (
    <>
      {/* Body Page */}
      <header>
        <div className="container header__container">
          <div className="header__left">
            <h1  >Grow Your Skills To Advance Your Career Path</h1>
            <p className='mt-4 text-black'>Ng Tech provide universal access to the world's best
              education, partnering with top universities and
              organizations to offer courses online.</p>
            {isUserLoggedIn ? (
              <Link className='btn1 mb-5' to="/profile"  >Dashboard</Link>
            ) : (
              <button className='btn1 mb-5' type="button" id="getstared" data-bs-toggle="modal" data-bs-target="#exampleModal">Get Started</button>

            )}
          </div>

          <div className="header__right">
            <div className="header__right-image">
              <img src="./header.svg" alt="Image" />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Body