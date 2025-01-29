import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/check`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => {
                    if (res.data.Status === 'Success' && res.data.role === 'admin') {
                        setId(res.data.id);
                        setName(res.data.name);
                        setEmail(res.data.email);
                        setIsAdminLoggedIn(true);
                    } else if (res.data.Status === 'Success' && res.data.role === 'user') {
                        setId(res.data.id);
                        setName(res.data.name);
                        setEmail(res.data.email);
                        setImage(res.data.image);
                        setIsUserLoggedIn(true);

                    } else {
                        setIsAdminLoggedIn(false);
                        setIsUserLoggedIn(false);
                    }
                })
                .catch(err => console.log(err));
        } else {
            setIsAdminLoggedIn(false);
            setIsUserLoggedIn(false);
        }
    }, []);

    return (
        <UserContext.Provider value={{ isAdminLoggedIn, isUserLoggedIn, id, name, email, image, setImage }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

