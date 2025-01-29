import React, { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

export const AddStudent = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState()
    const navigate = useNavigate()

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);

    }
    const validatePass = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    const Add_Student = async (e) => {
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
            setLoading(true)
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, { name, email, password })
            if (result.data.Status == "Success") {
                toast.success(`Verification Link Sent to ${email}`)
                setLoading(false)
                navigate("/admin/students")
            } else {
                setLoading(false)
                toast.error(result.data.Error)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
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

                    {/* Add Student page*/}
                    <div className='col-sm-6 mt-5 mx-3 jumbotron'>
                        <h3 className='text-center fw-bold my-4'>Add New Student</h3>
                        <form method='post' onSubmit={Add_Student} className='d-flex flex-column gap-4 fw-bold'>
                            <div className='form-group'>
                                <label htmlFor="stu_name">Name</label>
                                <input type="text" name="course_name" id="course_name" className='form-control mt-2' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="stu_email">Email</label>
                                <input type="email" name="stu_email" id="stu_email" className='form-control mt-2' onChange={(e) => setEmail(e.target.value.toLowerCase())} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="stu_pass">Password</label>
                                <input type="password" name="stu_pass" id="stu_pass" className='form-control mt-2' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='text-center mt-4'>
                                {loading ?
                                    < button className="btn btn-success mx-3" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Adding...
                                    </button>
                                    :
                                    <button type="submit" className='btn btn-success mx-3' id='studentSubmitBtn' disabled={!name || !email || !password} name='studentSubmitBtn'>Add</button>
                                }
                                <Link className='btn btn-secondary' to="/admin/students">Close</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddStudent