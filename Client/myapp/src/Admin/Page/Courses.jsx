import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/course`)
      .then(response => {
        setLoading(false)
        setCourses(response.data)
      })
      .catch(error => console.log(error));
  }, []);

  const deleteCourseByID = (id) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteCourseByID/${id}`)
      .then(() => {
        setCourses(prevCourses => prevCourses.filter(course => course.course_id !== id));
      })
      .catch(error => console.log(error));
  };

  const filteredStudents = courses.filter(course => {
    return course.course_name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Header />
      <div className="container-fluid mb-5 admin">
        <div className="row">
          <Sidebar />
          {loading ?
            <div className="col-9 mt-5 text-center">
              <p className='bg-dark text-white p-2'>Courses</p>
              <div className=" loading-placeholder text-center mt-5  ">
                <div className="spinner-border" role="status">
                </div>
              </div>
            </div>
            :
            <div className="col-sm-9 mt-5 text-center">

              <form className='mt-3 form-inline d-print-none mb-3'>
                <div className='d-flex flex-lg-row gap-4 flex-column'>
                  <div className='form-group fw-bold mr-3 mt-2'>
                    <label htmlFor="checkid " >Enter Course Name:</label>
                  </div>
                  <div>
                    <input
                      type="search"
                      className='form-control ml-3'
                      name="search"
                      id="search"
                      placeholder="Search course..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </form>

              <div className="col-12 mt-5">
                <p className='bg-dark text-white p-2'>Courses</p>
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th className='col'>Course ID</th>
                        <th className='col'>Name</th>
                        <th className='col'>Author</th>
                        <th className='col'>Action</th>
                      </tr>
                    </thead>
                    <tbody >
                      {filteredStudents.map(course => (
                        <tr key={course.course_id}>
                          <th scope='row'>{course.course_id}</th>
                          <td>{course.course_name}</td>
                          <td>{course.course_author}</td>
                          <td className='d-flex justify-content-center'>
                            <Link to={`/admin/updateCourse/${course.course_id}`} className='btn btn-info view' name='view' value='View'>
                              <FontAwesomeIcon icon={faPen} />
                            </Link>
                            <button className='btn btn-secondary' name='delete' value='Delete' onClick={() => deleteCourseByID(course.course_id)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <div>
        <Link className='btn btn-danger box' to='/admin/addCourse'>
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
    </>
  );
};

export default Courses;
