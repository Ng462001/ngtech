import React, { useState } from 'react';
import '../css/ForgetPass.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VerifyEmail = () => {

    const navigate = useNavigate();
    const { id, token } = useParams()
    const [loading, setLoading] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/verifyEmail/${id}/${token}`);
            if (result.data.Status === "Success") {
                toast.success("Email Verify Successfully")
                setLoading(false)
                navigate("/");
            }
        } catch (error) {
            setLoading(false)
            if (error.response && error.response.status === 404) {
                console.log("Endpoint not found. Please check server configuration.");
            } else {
                console.log("An error occurred while processing your request.");
            }
        }

    };

    return (
        <div className='w-100 vh-100 d-flex justify-content-center align-items-center '>
            <div className='forget_paswword_div'>
                <h2 className='fw-bold mb-5 '>Verify Your Email</h2>
                <form className="row g-2" onSubmit={handleSubmit}>
                    <div className="mb-3 text-center">
                        <FontAwesomeIcon className="fontasm" icon={faEnvelope} />
                    </div>
                    <div className="mb-3">
                        {loading ?
                            <button className="send1 mb-3" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Verifying...
                            </button>
                            :
                            <button type="submit" className="send1 mb-3">Verify</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmail;
