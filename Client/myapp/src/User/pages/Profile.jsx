import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import toast from 'react-hot-toast';
import { UserContext } from '../../useContext/UserProvider';

const Profile = () => {
    const { id, image, name, email, setImage } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const [values, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        image: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        setFormData({
            id,
            name,
            email,
            image
        });
    }, [id, name, email, image]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const Update_Profile = async (e) => {
        e.preventDefault();
        setLoading(true);

        const dataToSend = new FormData();
        for (const key in values) {
            dataToSend.append(key, values[key]);
        }
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updateProfile/${values.id}`, dataToSend);
            const getStudentDetails = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/updateStudent/${values.id}`);
            if (getStudentDetails.data) {
                setImage(getStudentDetails.data[0].image);
            }
            toast.success("Profile Updated Successfully");
            navigate("/profile");

        } catch (err) {
            console.error("Error updating profile:", err);
            toast.error("Profile update failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-lg mb-5 mt-5">
                <div className="row">
                    <Sidebar />

                    <div className='col-sm-12 col-md-6 col-lg-9 mt-5 jumbotron'>
                        <h3 className='text-center fw-bold my-4'>Profile</h3>
                        <div className='w-100' style={{ display: "grid", placeItems: "center" }}>
                            <form className='d-grid col-lg-8 gap-4 ' onSubmit={Update_Profile}>
                                <div className='form-group'>
                                    <label htmlFor="id">Student ID</label>
                                    <input type="text" name="id" id="id" className='form-control' value={values.id} disabled />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" className='form-control' value={values.name} onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" className='form-control' value={values.email} disabled />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="image">Profile Image</label>
                                    <input type="file" name="image" id="image" className='form-control-file mx-4' onChange={handleChange} />
                                </div>
                                <div className='text-center mt-4'>
                                    <button type="submit" className='btn btn-success mx-3' disabled={loading}>
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Updating...
                                            </>
                                        ) : (
                                            "Update"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
