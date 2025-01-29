import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Lesson = () => {
  const [id, setCheckIdValue] = useState();
  const [users, setUsers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [showAddButton, setShowAddButton] = useState(false);
  const [loading, setLoading] = useState()

  const handleOnclick = (e) => {
    e.preventDefault();
    if (!id) {
      toast.error("please Enter the course id");
      return;
    }
    setLoading(true)

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/lessons/${id}`)
      .then(course => {
        setUsers(course.data);
        setLoading(false)
        if (!course.data || course.data.length === 0) {
          toast.error("No course found with the entered ID");
          setLoading(false)
          setShowAddButton(false)
          return;
        }
        setShowAddButton(true);
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
        setLoading(false)
      });

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getlessons/${id}`)
      .then(lesson => {
        setLessons(lesson.data);
        setLoading(false)
      })
      .catch(err => {
        toast.error("Error fetching lesson data. Please try again.");
        setLoading(false)
        console.log(err);
      });

  };

  function DeleteByID(id) {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteLessonByID/` + id)
      .then(courses => {
        setLessons(prevLessons => prevLessons.filter(lesson => lesson.lesson_id !== id));
      })
      .catch(err => console.log(err));
  }

  return (
    <>

      {/* Navbar*/}
      <Header />

      <div className="container-fluid mb-5 admin">
        <div className="row">
          {/* Sidebar*/}
          <Sidebar />
          {/* Lesson page*/}
          <div className='col-sm-9 mt-5'>
            <form className='mt-3 form-inline d-print-none'>
              <div className='d-flex flex-lg-row gap-4 flex-column'>
                <div className='form-group fw-bold mr-3 mt-2'>
                  <label htmlFor="checkid " >Enter Course ID:</label>
                </div>
                <div>
                  <input type="number" className='form-control ml-3' required name="checkid" id="checkid" onChange={(e) => setCheckIdValue(e.target.value)} />
                </div>
                <div>
                  {loading ?
                    <button className="btn btn-danger" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Searching...
                    </button>
                    :
                    <button type="button" className='btn btn-danger' onClick={handleOnclick}>Search</button>
                  }
                </div>
              </div>
            </form>

            {/* Lesson page Table*/}
            {(users.length !== 0) && (
              <>
                <p className='bg-dark text-white p-2 mt-5 text-center '>Course ID:  {users[0].course_id}  Course Name:  {users[0].course_name}</p>
                <div className="table-responsive text-center ">
                  <table className="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th className='col'>Lesson ID</th>
                        <th className='col'>Lesson Name</th>
                        <th className='col'>Lesson Description</th>
                        <th className='col'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        lessons.map(lesson => {
                          return <tr key={lesson.lesson_id}>
                            <th scope='row'>{lesson.lesson_id}</th>
                            <td>{lesson.lesson_name}</td>
                            <td>{lesson.lesson_desc}</td>
                            <td className='d-flex justify-content-center'><Link type='submit' to={`/admin/lessons/updateLesson/${lesson.lesson_id}`} className='btn btn-info view' name='view' value='View'><FontAwesomeIcon icon={faPen} /></Link>
                              <button type='submit' className='btn btn-secondary' name='delete' value='Delete'><FontAwesomeIcon icon={faTrash} onClick={(e) => DeleteByID(lesson.lesson_id)} /></button></td>
                          </tr>;
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {/* Add Button*/}
            {showAddButton && (
              <div id="button">
                <Link className='btn btn-danger box ' to={`/admin/lessons/addLesson/${users[0].course_id}`}> <FontAwesomeIcon icon={faPlus} /></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lesson;
