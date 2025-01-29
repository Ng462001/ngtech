import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import '../css/Admin.css'

const Header = () => {
    
    return (
        <>
            {/* Top Bar*/}

            <nav className='navbar fixed-top p-0 shadow navbar1'>
                <Link className="navbar-brand col-sm-3 col-2  p-2 d-flex gap-3" to="/admin"><img className="img" src="\logo\png\logo-no-background.png" alt="NGTech" width="200px" height="50px"  /><span className='mt-3'>Admin Dashbord</span></Link>
            </nav>
              
        </>
    )
}

export default memo(Header)