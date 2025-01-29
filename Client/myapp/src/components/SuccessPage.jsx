import React, { useEffect, useState } from 'react';
import '../css/SuccessPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const SuccessPage = () => {
    const [paymentComplete, setPaymentComplete] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');
        const courseId = params.get('course_id');
        const coursePrice = params.get('course_price');
        const email = params.get('email');
        const stuId = params.get('stu_id');
        const courseName = params.get('course_name');

        if (sessionId === null) {
            return
        }
        setPaymentComplete(true);

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/paymentcomplete?session_id=${sessionId}&course_id=${courseId}&course_price=${coursePrice}&email=${email}&stu_id=${stuId}&course_name=${courseName}`)
            .then(res => {
                if (res.data.Status === "success") {
                    toast.success("Payment Done Successfully")
                } else {
                    toast.error(res.data.Error)
                }
            }).catch(err =>
                console.error(err)
            )
    }, [])


    return (
        <>
            {paymentComplete ? (
                <div className="success-content" >
                    <img src="./success.png" alt="Success" className="success-image" />
                    <h1 className="success-heading fw-bold mt-2">Payment Successful!</h1>
                    <p className="success-text ">Thank you for your purchase. Your payment has been successfully processed.</p>
                    <Link className="success-button" to="/myCourse">Continue to MyCourse</Link>
                </div>
            ) : (navigate("/"))
            }
        </>


    )
}

export default SuccessPage;
