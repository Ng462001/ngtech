import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
library.add(faTrash, faPen, faPlus);
import axios from 'axios'

const Students = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/student`)
      .then(users => {
        setUsers(users.data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  function DeleteByID(id) {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteStudentByID/` + id)
      .then(students => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      })
      .catch(err => console.log(err))
  }

  const filteredCourses = users.filter(student => {
    return student.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      {/* Navbar*/}
      <Header />

      <div className="container-fluid mb-5 admin">
        <div className="row">
          {/* Sidebar*/}
          <Sidebar />
          {/* Student page*/}
          {loading ?
            <div className="col-sm-9 mt-5 text-center ">
              <div className="col-12 ">
                <p className='bg-dark text-white p-2'>Students</p>
                <div className="loading-placeholder text-center mt-5">
                  <div className="spinner-border" role="status">
                  </div>
                </div>
              </div>
            </div>
            :
            <>
              {users.length == 0 ?
                <div className="col-sm-9 mt-5 text-center ">
                  <div className="col-12 ">
                    <p className='bg-dark text-white p-2'>Students</p>
                    <h4 className='mt-5'>No Student Found.</h4>
                  </div>
                </div>
                :
                < div className="col-sm-9 mt-5 text-center ">
                  <form className='mt-3 form-inline d-print-none mb-3'>
                    <div className='d-flex flex-lg-row gap-4 flex-column'>
                      <div className='form-group fw-bold mr-3 mt-2'>
                        <label htmlFor="checkid " >Enter Student Name:</label>
                      </div>
                      <div>
                        <input
                          type="search"
                          className='form-control ml-3'
                          name="search"
                          id="search"
                          placeholder="Search Student..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    </div>
                  </form>
                  <div className="col-12 mt-5">
                    <p className='bg-dark text-white p-2'>Students</p>
                    <div className="table-responsive">
                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th className='col'>Student ID</th>
                            <th className='col'>Name</th>
                            <th className='col'>Email</th>
                            <th className='col'>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            filteredCourses.map(user => {
                              return <tr key={user.id}>
                                <th scope='row'>{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className='d-flex justify-content-center'><Link type='submit' to={`/admin/updateStudent/${user.id}`} className='btn btn-info view' name='view' value='View'><FontAwesomeIcon icon="pen" /></Link>
                                  <button type='submit' onClick={(e) => DeleteByID(user.id)} className='btn btn-secondary' name='delete' value='Delete'><FontAwesomeIcon icon="trash" /></button></td>
                              </tr>
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              }
            </>

          }
        </div>
      </div >
      {/* Add Button*/}
      < div >
        <Link className='btn btn-danger box' to='/admin/addStudent'> <FontAwesomeIcon icon="plus" /></Link>
      </div >
    </>
  )
}

export default Students