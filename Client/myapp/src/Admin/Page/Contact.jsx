import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Contact = () => {
    const [contacts, setContact] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getcontact`)
            .then(contacts => {
                setLoading(false)
                setContact(contacts.data)
            })
            .catch(err => console.log(err))
    }, [])

    function DeleteByID(id) {
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteContact/` + id)
            .then(students => {
                setContact(prevUsers => prevUsers.filter(Contact => Contact.c_id !== id));
            })
            .catch(err => console.log(err))
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(options);
    }

    return (
        <>
            {/* Navbar*/}
            <Header />

            <div className="container-fluid mb-5 admin">
                <div className="row">
                    {/* Sidebar*/}
                    <Sidebar />
                    {/* Student page*/}
                    <div className="col-sm-12 col-lg-9  text-center">
                        <p className='bg-dark text-white mt-5 p-2'>Contact</p>
                        {loading ?
                            <div className="loading-placeholder text-center mt-5">
                                <div className="spinner-border" role="status">
                                </div>
                            </div>
                            :
                            <>
                                {
                                    contacts.length == 0 ?
                                        <h4 className='mt-5'>No Contact Found.</h4>
                                        :
                                        < div className="table-responsive">
                                            <table className="table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className='col'>Contact Id</th>
                                                        <th className='col'>Name</th>
                                                        <th className='col'>Email</th>
                                                        <th className='col'>Subject</th>
                                                        <th className='col'>Message</th>
                                                        <th className='col'>Date</th>
                                                        <th className='col'>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        contacts.map(Contact => {
                                                            return <tr key={Contact.c_id}>
                                                                <th scope='row'>{Contact.c_id}</th>
                                                                <td>{Contact.name}</td>
                                                                <td>{Contact.email}</td>
                                                                <td>{Contact.subject}</td>
                                                                <td>{Contact.message}</td>
                                                                <td>{formatDate(Contact.date)}</td>
                                                                <td >
                                                                    <button type='submit' onClick={(e) => DeleteByID(Contact.c_id)} className='btn btn-secondary' name='delete' value='Delete'><FontAwesomeIcon icon={faTrash} /></button></td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default Contact