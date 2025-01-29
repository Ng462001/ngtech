import React, { useContext, useEffect, useState } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import '../css/Course.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faL } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { UserContext } from '../useContext/UserProvider';


const CourseDetail = () => {

    const { isUserLoggedIn, name, email } = useContext(UserContext);
    const { id } = useParams();
    const [lessons, setLessons] = useState([])
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(true)
    const [btnloading, setBtnLoading] = useState(false)
    const [values, setFormData] = useState({
        stu_id: '',
        name: '',
        email: ''
    });
    const [isCoursePurchased, setIsCoursePurchased] = useState(false);
    const token = localStorage.getItem("token")
    let num = 1;

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/checkCoursePurchase/${id}`, { params: { email } })
            .then(response => {
                if (response.data.purchased === true) {
                    setIsCoursePurchased(true);
                    setLoading(false);
                } else {
                    setIsCoursePurchased(false);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, [email, id]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getlessons/${id}`)
            .then(lesson => {
                setLessons(lesson.data);
                setLoading(false);
            })
            .catch(err => {
                toast.error("Error fetching lesson data. Please try again.");
                setLoading(false);
                console.log(err);
            });
    }, [])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/check`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.data.Status === 'Success' && res.data.role === 'user') {
                    setFormData({
                        ...values,
                        stu_id: res.data.id,
                        name: res.data.name,
                        email: res.data.email,
                    });
                    setLoading(false);
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/updateCourse/` + id)
            .then(courses => {
                setCourse(courses.data[0]);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [id]);



    const handleShowModal = async () => {
        setBtnLoading(true)
        try {
            if (!isUserLoggedIn) {
                toast.error('Please login to proceed with the purchase.')
                setBtnLoading(false)
                return;
            }

            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_CLIENT_KEY);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/charge`, {
                course_id: id,
                course_price: course.course_price,
                email: values.email,
                stu_id: values.stu_id,
                course_name: course.course_name,
                courseImage: course.course_image
            });
            setBtnLoading(false)
            const sessionId = response.data.sessionId;

            const { error } = await stripe.redirectToCheckout({
                sessionId: sessionId,
            });
            if (error) {
                console.error('Error redirecting to checkout:', error);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    return (
        <>
            <Navbar isUserLoggedIn={isUserLoggedIn} name={name} />
            <Background />
            {loading ? (
                <div className="container mt-5 placeholder-glow">
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img
                                src=""
                                className="card-img-top img-thumbnail placeholder"
                            />
                        </div>
                        <div className="col-md-8 mt-4">
                            <div className="card-body d-flex flex-column gap-1">
                                <h5 className="card-title fw-bold placeholder">
                                    <span className="placeholder col-6"></span>
                                </h5>
                                <p className="card-text fw-bold mt-3 placeholder">
                                    <span className="placeholder col-8"></span>
                                </p>
                                <p className="card-text fw-bold placeholder">
                                    <span className="placeholder col-4"></span>
                                </p>
                                <div className="">
                                    <p className="card-text d-inline fw-bold placeholder">
                                        <small>
                                            <del>
                                                <span className="placeholder col-3"></span>
                                            </del>
                                        </small>
                                        <span className="font-weight-bolder mx-2">
                                            <span className="placeholder col-2"></span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mt-5">
                        <div className="row">
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" className="placeholder-glow">
                                            <span className="placeholder col-4"></span>
                                        </th>
                                        <th scope="col" className="placeholder-glow">
                                            <span className="placeholder col-6"></span>
                                        </th>
                                        <th scope="col" className="placeholder-glow">
                                            <span className="placeholder col-8"></span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className="placeholder-glow">
                                            <span className="placeholder col-2"></span>
                                        </th>
                                        <td className="placeholder-glow">
                                            <span className="placeholder col-4"></span>
                                        </td>
                                        <td className="placeholder-glow">
                                            <span className="placeholder col-6"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            ) : (
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-md-4 text-center'>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/${course.course_image}`} alt="Course Image" className='card-img-top img-thumbnail' />
                        </div>
                        <div className='col-md-8 mt-4'>
                            <div className='card-body d-flex flex-column gap-1'>
                                <h5 className=' card-title fw-bold'>Course Name: {course.course_name}</h5>
                                <p className='card-text fw-bold mt-3'>Description: {course.course_desc}</p>
                                <p className='card-text fw-bold'>Duration: {course.course_duration} Month </p>
                                <div className=''>
                                    <p className="card-text d-inline  fw-bold">Price:<small><del><FontAwesomeIcon className='mx-2' icon={faIndianRupeeSign} />{course.course_original_price}</del></small>
                                        <span className='font-weight-bolder mx-2'><FontAwesomeIcon className='mx-1' icon={faIndianRupeeSign} />{course.course_price}</span></p>
                                    <div className='maincard'>
                                        {isCoursePurchased ? (
                                            <p className='mt-3 fw-bold text-danger'>You have already purchased this course.</p>
                                        ) : (
                                            btnloading ?
                                                <button className="btn btn-primary mt-3" type="button" disabled>
                                                    <span className="spinner-border p-2 spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Redirecting...
                                                </button>
                                                : <Button onClick={handleShowModal} className='mt-3'>Buy Now</Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container mt-5 '>
                        <div className='row'>
                            <table className='table table-hover table-striped '>
                                <thead>
                                    <tr >
                                        <th scope='col'>Lesson No.</th>
                                        <th scope='col'>Lesson Name</th>
                                        <th scope='col'>Lesson Description</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {lessons.map((lesson) => (
                                        <tr key={lesson.lesson_id}>
                                            <th scope='row'>{num++}</th>
                                            <td>{lesson.lesson_name}</td>
                                            <td>{lesson.lesson_desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            )
            }
        </>
    );
};

export default CourseDetail;
