import React from 'react'
import '../css/About.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp, faInstagram, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import LoginAdmin from './LoginAdmin'

const About = () => {
    return (
        <>

            {/* About header*/}
            <div className='container-fluid aboutdiv mt-5'>
                <div className='text-black text-center p-1 d-flex flex-lg-row flex-column'>
                    <div className="col">
                        <a className='text-black social-hover' href="#"><FontAwesomeIcon className='mx-2' icon={faFacebook} />Facebook</a>
                    </div>
                    <div className="col">
                        <a className='text-black social-hover' href="#"><FontAwesomeIcon className='mx-2' icon={faXTwitter} />Twitter</a>
                    </div>
                    <div className="col">
                        <a className='text-black social-hover' href="#"><FontAwesomeIcon className='mx-2' icon={faWhatsapp} />Whatsapp</a>
                    </div>
                    <div className="col">
                        <a className='text-black social-hover ' href="#"><FontAwesomeIcon className='mx-2' icon={faInstagram} />Instagram</a>
                    </div>
                </div>
            </div>

            {/* About */}

            <div className="container-fluid bg-body-secondary p-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-sm">
                            <h5 className='fw-bold'>About Us</h5>
                            <p>Ng Tech provide universal access to the world's best
                                education, partnering with top universities and
                                organizations to offer courses online.</p>
                        </div>
                        <div className="col-sm">
                            <h5 className='fw-bold'> Category</h5>

                            <Link className='text-black' to="/courseDetail/101">Java</Link><br />
                            <Link className='text-black' to="/courseDetail/102">Python</Link><br />
                            <Link className='text-black' to="/courseDetail/103">React</Link><br />
                            <Link className='text-black' to="/courseDetail/105">Angular</Link><br />
                            <Link className='text-black' to="/courseDetail/106">C++</Link><br />
                            <Link className='text-black' to="/courseDetail/107">Web development</Link><br />
                        </div>
                        <div className="col-sm">
                            <h5 className='fw-bold'>Contact Us</h5>
                            <p>NG Tech Pvt Ltd,<br />
                                Near IT Park, Hinjewadi,<br />
                                Pune - 411057<br />
                                Phone: +7177295311<br /></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* footer*/}
            <div className="container-fluid bg-dark text-center p-2">
                <small className='text-white'>Copyright &copy; 2024 || Designed By Nikhil || <Link to='/admin' className='text-white' data-bs-toggle="modal" data-bs-target="#exampleModal2"> Admin Login</Link></small>
            </div>
            <LoginAdmin />
        </>
    )
}

export default About