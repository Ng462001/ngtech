import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash);
import axios from 'axios'

const Feedback = () => {

  const [feedbacks, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`)
      .then(feedback => {
        setLoading(false)
        setFeedback(feedback.data)
      })
      .catch(err => console.log(err))
  }, [])

  function DeleteByID(id) {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteFeedback/` + id)
      .then(students => {
        setFeedback(prevFeedbacks => prevFeedbacks.filter(fb => fb.f_id !== id));
      })
      .catch(err => console.log(err))

  }
  return (
    <>
      {/* Navbar*/}
      <Header />

      <div className="container-fluid mb-5 admin">
        <div className="row">
          {/* Sidebar*/}
          <Sidebar />
          {/* Feedback page*/}

          {loading ?
            <div className="col-sm-9 mt-5">
              <p className='bg-dark text-white p-2 text-center'>Feedback</p>
              <div className="loading-placeholder text-center">
                <div className="spinner-border mt-5" role="status">
                </div>
              </div>
            </div>
            :
            <>
              {feedbacks.length == 0 ?
                <div className="col-sm-9 mt-5">
                  <p className='bg-dark text-white p-2 text-center'>Feedback</p>
                  <h4 className='mt-5 text-center'>No Feedback Found.</h4>
                </div>
                :
                <div className="col-sm-9 mt-5">
                  <p className='bg-dark text-white p-2 text-center'>Feedback</p>
                  <div className="table-responsive ">
                    <table className="table table-striped table-hover text-center">
                      <thead >
                        <tr >
                          <th className='col'>Feedback ID</th>
                          <th className='col'>Studuent ID</th>
                          <th className='col'>Student Name</th>
                          <th className='col'>Feedback</th>
                          <th className='col'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          feedbacks.map(fb => {
                            return <tr key={fb.f_id}>
                              <th scope='row'>{fb.f_id}</th>
                              <td>{fb.stu_id}</td>
                              <td>{fb.name}</td>
                              <td>{fb.feedback}</td>
                              <td ><button type='submit' onClick={(e) => DeleteByID(fb.f_id)} className='btn btn-secondary' name='delete' value='Delete'>
                                <FontAwesomeIcon icon="fa-solid fa-trash" /></button></td>
                            </tr>
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              }
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Feedback