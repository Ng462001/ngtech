import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import { UserContext } from '../../useContext/UserProvider'

const Feedback = () => {
    const { id, name } = useContext(UserContext);

    const [feedback, setFeedback] = useState()
    const [loading, setLoading] = useState()
    const navigate = useNavigate()

    const Add_Feedback = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addfeedback`, { id, name, feedback })
            if (result) {
                toast.success("Feedback Added Successfully")
                setLoading(false)
                navigate("/profile")
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <>
            {/* Navbar*/}
            <Navbar />

            <div className="container-lg mb-5 mt-5 ">
                <div className="row">
                    {/* Sidebar*/}
                    <Sidebar />
                    {/* Change password page*/}

                    <div className='col-sm-12 col-md-6 col-lg-9 mt-5 jumbotron'>
                        <h3 className='text-center fw-bold my-4 '>Feedback</h3>

                        <div className='w-100' style={{ display: "grid", placeItems: "center" }} >
                            <form className='my-2 col-lg-8'>
                                <div className='form-group'>
                                    <label htmlFor="id">Student ID</label>
                                    <input type="text" className='form-control' name="id" id="id" value={id} disabled />
                                </div>
                                <div className='form-group mt-4'>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className='form-control' name="name" id="name" value={name} disabled />
                                </div>
                                <div className='form-group mt-4'>
                                    <label htmlFor="feedback">Feedback</label>
                                    <textarea className="form-control" id="feedback" rows="4" placeholder="Feedback" onChange={(e) => setFeedback(e.target.value)} />
                                </div>
                                <div className='form-group text-center'>
                                    {loading ?
                                        <button className="btn btn-success mt-4 " type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Adding...
                                        </button>
                                        :
                                        <button type="button" className='btn btn-success  mt-4' name="updatePassword" disabled={!feedback} onClick={Add_Feedback} >Add</button>
                                    }

                                    <button type="reset" className='btn btn-secondary  mt-4 mx-4' >Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feedback