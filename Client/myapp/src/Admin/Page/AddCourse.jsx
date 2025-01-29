import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

const AddCourse = () => {
    const [name, setName] = useState()
    const [desc, setDesc] = useState()
    const [author, setAuthor] = useState()
    const [duration, setDuration] = useState()
    const [originalprice, setOriginalPrice] = useState()
    const [price, setPrice] = useState()
    const [image, setImage] = useState()
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState()
    const navigate = useNavigate()


    const Add_course = (e) => {
        setLoading(true)
        e.preventDefault();
        const formData = new FormData()
        formData.append('course_name', name)
        formData.append('course_desc', desc)
        formData.append('course_author', author)
        formData.append('course_duration', duration)
        formData.append('course_original_price', originalprice)
        formData.append('course_price', price)
        formData.append('course_image', image)

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/course`, formData)
            .then(res => {
                setLoading(false)
                toast.success("Course Added Successfully")
                navigate("/admin/course")
            })
            .catch(error => console.log(error))
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]));
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
                    <div className='col-sm-12  col-lg-6  mt-5 jumbotron'>
                        <h3 className='text-center fw-bold my-4 '>Add New Course</h3>
                        <form method="post" onSubmit={Add_course} className='d-flex flex-column gap-4 fw-bold'>
                            <div className='form-group'>
                                <label htmlFor="course_name">Course Name</label>
                                <input type="text" name="course_name" required id="course_name" className='form-control mt-2' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="course_name">Course Description</label>
                                <textarea name="course_desc" id="course_desc" required className='form-control mt-2' rows='2' onChange={(e) => setDesc(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="course_author">Course Author</label>
                                <input type="text" name="course_author" id="course_author" required className='form-control mt-2' onChange={(e) => setAuthor(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="course_duration">Course Duration</label>
                                <input type="number" name="course_duration" id="course_duration" required className='form-control mt-2' onChange={(e) => setDuration(e.target.value)} />
                                <i className='text-danger fw-lighter'>Note: Duration in Month </i>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="course_original_price">Course Original Price</label>
                                <input type="number" name="course_original_price" id="course_original_price" required className='form-control mt-2' onChange={(e) => setOriginalPrice(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="course_price">Course Price</label>
                                <input type="number" name="course_price" id="course_price" required className='form-control mt-2' onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="course_image">Course Image</label>
                                <input type="file" name="course_image" id="course_image" required className='form-control-file mt-2 mx-4' onChange={handleFileChange} />
                                {imageUrl && <img src={imageUrl} className='text-center' alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                            </div>
                            <div className='text-center mt-4'>
                                {loading ?
                                    < button className="btn btn-success mx-3" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Adding...
                                    </button>
                                    :
                                    <button type="submit" className='btn btn-success mx-3' required id='courseSubmitBtn' name='courseSubmitBtn'>Add</button>
                                }
                                <Link className='btn btn-secondary' to="/admin/Course">Close</Link>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default AddCourse