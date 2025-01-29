import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

const UpdateLesson = () => {

    const [values, setFormData] = useState({
        course_id: '',
        course_name: '',
        lesson_name: '',
        lesson_desc: '',
        video_link: '',
        lesson_video: null
    })
    const [loading, setLoading] = useState()
    const [btnLoading, setBtnLoading] = useState()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/updateLesson/` + id)
            .then(res => {
                setLoading(false)
                setFormData({
                    ...values,
                    course_id: res.data[0].course_id,
                    course_name: res.data[0].course_name,
                    lesson_name: res.data[0].lesson_name,
                    lesson_desc: res.data[0].lesson_desc,
                    video_link: res.data[0].video_link,
                    lesson_video: res.data[0].lesson_video,
                });
            })
            .catch(err => console.log(err))
    }, [])

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,

        }))
    }

    function Update_Lesson(e) {
        e.preventDefault()
        const dataTosend = new FormData();
        for (const key in values) {
            dataTosend.append(key, values[key]);
        }
        setBtnLoading(true)
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updateLessonByID/` + id, dataTosend)
            .then(courses => {
                toast.success("Lesson Update Successfully")
                setBtnLoading(false)
                navigate("/admin/lessons")
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {/* Navbar*/}
            <Header />
            <div className="container-fluid mb-5 admin">
                <div className="row">
                    {/* Sidebar*/}
                    <Sidebar />
                    {/* Add Course page*/}
                    <div className='col-sm-6 mt-5 mx-3 jumbotron'>
                        <h3 className='text-center fw-bold my-4'>Update Lesson</h3>
                        {loading ?
                            <div className="loading-placeholder text-center mt-5">
                                <div className="spinner-border" role="status">
                                </div>
                            </div>
                            :
                            <form className='d-flex flex-column gap-4 fw-bold' onSubmit={Update_Lesson}>
                                <div className='form-group'>
                                    <label htmlFor="course_id">Course ID</label>
                                    <input type="text" name="course_id" id="course_id" className='form-control m-2 ' value={values.course_id} disabled onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="course_name">Course Name</label>
                                    <input type="text" name="course_name" id="course_name" className='form-control m-2' value={values.course_name} disabled onChange={handleChange} />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="lesson_name">Lesson Name</label>
                                    <input type="text" name="lesson_name" id="lesson_name" className='form-control m-2' value={values.lesson_name} onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="lesson_desc">Lesson Description</label>
                                    <textarea name="lesson_desc" id="lesson_desc" className='form-control m-2' rows='2' value={values.lesson_desc} onChange={handleChange} />
                                </div>
                                {values.video_link === "undefined" ? (
                                    <div className='form-group'>
                                        <label htmlFor="lesson_video">Lesson Video</label>
                                        <input type="file" name="lesson_video" id="lesson_video" className='form-control-file mx-4 m-2' onChange={handleChange} />
                                    </div>
                                ) : (
                                    <div className='form-group'>
                                        <label htmlFor="video_link">Video Link</label>
                                        <input type="text" name="video_link" id="video_link" className='form-control m-2' value={values.video_link} onChange={handleChange} />
                                    </div>
                                )}
                                <div className='text-center mt-4'>
                                    {btnLoading ?
                                        <button className="btn btn-success mx-3" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Updating...
                                        </button>
                                        :
                                        <button type="submit" className='btn btn-success mx-3' id='courseSubmitBtn' name='courseSubmitBtn'>Update</button>
                                    }
                                    <Link className='btn btn-secondary' to="/admin/lessons">Close</Link>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateLesson