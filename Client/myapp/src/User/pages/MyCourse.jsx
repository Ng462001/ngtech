import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar'
import Sidebar from '../components/Sidebar';
import '../css/User.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../useContext/UserProvider';


const MyCourse = () => {
    const { email } = useContext(UserContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getCourse`, { params: { email } })
            .then(response => {
                setLoading(false)
                setCourses(response.data);

            })
            .catch(error => {
                setLoading(false)
                console.error('Error fetching courses:', error);

            });
    }, [email]);

    return (
        <>
            {/* Navbar*/}
            <Navbar />

            <div className="container-lg mb-5 mt-5 ">
                <div className="row">
                    {/* Sidebar*/}
                    <Sidebar />
                    {/* My Courses */}
                    {loading ?
                        <div className='col-sm-12 col-md-12 col-lg-9 mt-5 jumbotron' >
                            <h3 className='text-center fw-bold my-4'>All Courses</h3>
                            <div className="loading-placeholder text-center mt-5">
                                <div className="spinner-border" role="status">
                                </div>
                            </div>
                        </div>
                        :
                        <div className='col-sm-12 col-md-12 col-lg-9 mt-5 jumbotron'>
                            <h3 className='text-center fw-bold my-4'>All Courses</h3>
                            {courses.length == 0 ? (
                                <div className='text-center'>
                                    <h5>You don't purchase any course yet. Please view and purchase course from below</h5>
                                    <Link className='btn btn-success  mt-3' to="/course">All Courses</Link>
                                </div>

                            ) : (
                                courses.map(course => (
                                    <div key={course.course_id} className='mt-5 edit_mycourse'>
                                        <div className='row'>
                                            <div className='col-md-4 col-sm-12  text-center'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/${course.course_image}`} alt="Course Image" className='card-img-top img-thumbnail' />
                                            </div>
                                            <div className='col-md-8 mt-4'>
                                                <div className='card-body d-flex flex-column gap-1'>
                                                    <h5 className=' card-title fw-bold'>Course Name: {course.course_name}</h5>
                                                    <p className='card-text fw-bold mt-2'>Description: {course.course_desc}</p>
                                                    <p className='card-text fw-bold'>Duration: {course.course_duration} Month</p>
                                                    <p className='card-text fw-bold'>Author: {course.course_author}</p>
                                                    <div className='maincard'>
                                                        <p className="card-text d-inline fw-bold">Price:<small><del><FontAwesomeIcon className='mx-2' icon={faIndianRupeeSign} />{course.course_original_price}</del></small>
                                                            <span className='font-weight-bolder mx-2'><FontAwesomeIcon icon={faIndianRupeeSign} />{course.course_price}</span></p>
                                                        <Link type="submit" to={`/watchCourse/${course.course_id}`} className='btn btn-primary text-white font-weight-bolder btn_watch'>Watch Now</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                            }
                        </div>
                    }
                </div>
            </div >
        </>
    )
}

export default MyCourse;
