import React, { useEffect, useState } from 'react'
import '../css/Contact.css'
import axios from 'axios'
import toast from 'react-hot-toast';

const Contact = () => {

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address!");
            return;
        }

        if (message.length < 20) {
            toast.error("Please write a minimum 20-character message!");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
                name,
                subject,
                email,
                message,
            });

            if (res.data.Status === "Success") {
                setLoading(false);
                toast.success("Message sent successfully!");
                e.target.reset();
                setName(''); setSubject(''); setEmail(''); setMessage('');
            }
        } catch (error) {
            setLoading(false);
            console.error(error.response || error);
            toast.error(error.response?.data?.Error || 'Something went wrong!');
        }
    };


    return (
        <>
            <div className='vh-100 container mt-5'>
                <h1 className='text-black fw-bold text-center mb-4'>Contact</h1>
                <div className='d-flex justify-content-center align-items-lg-center gap-4 flex-column flex-lg-row flex-column '>
                    {/* First column*/}
                    <div className=''>
                        <form className="row g-2" onSubmit={handleSubmit}>
                            <div className=" mb-3">
                                <label htmlFor="name" className="form-label fw-bold">Name</label>
                                <input type="text" className="form-control" required id="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className=" mb-3">
                                <label htmlFor="subject" className="form-label fw-bold">Subject</label>
                                <input type="text" className="form-control" required id="subject" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
                            </div>
                            <div className=" mb-3">
                                <label htmlFor="email" className="form-label fw-bold">Email address</label>
                                <input type="email" className="form-control" required id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label fw-bold">Message</label>
                                <textarea className="form-control" id="message" required rows="5" placeholder="Message" onChange={(e) => setMessage(e.target.value)}></textarea>
                            </div>

                            <div className="mb-3">
                                {loading ?
                                    <button className="btn btn-primary mb-3" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Sending...
                                    </button>
                                    :
                                    <button type="submit" className="btn btn-primary mb-3">Send</button>
                                }
                            </div>
                        </form>
                    </div>
                    {/* Second column*/}
                    <div className='contactdiv'>
                        <h4>NG Tech</h4>
                        <p>NG Tech,
                            Near IT Park, Hinjewadi,<br />
                            Pune - 411057<br />
                            Phone: +7177295311<br />
                            www.ngtech.com<br />
                            ngtech46@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact