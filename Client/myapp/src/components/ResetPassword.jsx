import React, { useState } from 'react';
import '../css/ForgetPass.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id, token } = useParams()

    const validatePass = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePass(password)) {
            toast.error("Password must be at least 8 characters long, and include at least one letter, one number, and one special character.");
            return;
        }
        try {
            setLoading(true)
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/reset_Password/${id}/${token}`, { password });
            if (result.data.Status === "Success") {
                toast.success("Password Change Successfully")
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
                <h2 className='fw-bold mb-5 '>Reset Password</h2>
                <form className="row g-2" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold">New Password</label>
                        <input type="password" required className="form-control" id="password" name="password" placeholder='New Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        {loading ?
                            <button className="send1 mb-3" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Proceessing...
                            </button>
                            :
                            <button type="submit" className="send1 mb-3">Change Password</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
