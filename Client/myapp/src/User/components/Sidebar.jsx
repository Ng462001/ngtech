import React, { useContext, memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLock, faComment } from '@fortawesome/free-solid-svg-icons';
import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons';
import '../css/User.css';
import { UserContext } from '../../useContext/UserProvider';
import axios from 'axios';

const Sidebar = () => {
    const { id, image, setImage } = useContext(UserContext);
    const [profileImage, setProfileImage] = useState(image);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/updateStudent/${id}`)
            .then((res) => {
                setProfileImage(res.data[0].image);
                setImage(res.data[0].image);
            })
            .catch((err) => console.error("Error fetching image:", err));

    }, [image]);

    return (
        <nav className="col-sm-12 col-lg-3 col-md-6 sidebar py-5 d-print-none">
            <div className="sidebar-sticky">
                <ul className="nav flex-column allnav">
                    <li className="nav-item mb-4 mt-3">
                        <img
                            src={profileImage ? `${import.meta.env.VITE_BACKEND_URL}/${profileImage}` : "./default Imgae.jpg"}
                            alt="Student Image"
                            className="img-thumbnail rounded-circle"
                        />
                    </li>

                    <li className="nav-item">
                        <NavLink to="/profile" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
                            <FontAwesomeIcon icon={faHouse} /> Profile
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/myCourse" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
                            <FontAwesomeIcon icon={faAccessibleIcon} /> My Course
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/feedback" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
                            <FontAwesomeIcon icon={faComment} /> Feedback
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/changePassword" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
                            <FontAwesomeIcon icon={faLock} /> Change Password
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default memo(Sidebar);
