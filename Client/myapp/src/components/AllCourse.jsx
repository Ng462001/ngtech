import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPeopleGroup, faKeyboard, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const Course = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/courseshow`);
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <div className='course_row p-1'>
        <div className='d-flex flex-column flex-lg-row text-center mt-1'>
          <div className='col'>
            <h5 className='fw-bold'><span className='mx-2'><FontAwesomeIcon icon={faBook} /></span>Online Course</h5>
          </div>
          <div className='col'>
            <h5 className='fw-bold'><span className='mx-1'><FontAwesomeIcon icon={faPeopleGroup} /></span> Expert Instructors</h5>
          </div>
          <div className='col'>
            <h5 className='fw-bold'><span className='mx-1'><FontAwesomeIcon icon={faKeyboard} /></span> Access Lifetime</h5>
          </div>
          <div className='col'>
            <h5 className='fw-bold'><span className='mx-1'><FontAwesomeIcon icon={faIndianRupeeSign} /></span> Money Back Guarantee*</h5>
          </div>
        </div>
      </div>

      <div>
        <h1 className='text-center fw-bold text-black mt-5'>All Courses</h1>

        {loading ?
          <div className="loading-placeholder text-center mt-5">
            <div className="spinner-border" role="status">
            </div>
          </div>
          :
          <section className="courses">
            <div className="container courses__container">
              {
                courses.map((course, index) => (
                  <article key={index} className="course">
                    <div className="course__Image">
                      <img src={`${import.meta.env.VITE_BACKEND_URL}/${course.course_image}`} alt="" />
                    </div>
                    <div className="course__info">
                      <h4>{course.course_name}</h4>
                      <p>{course.course_desc}</p>
                      <p className="card-text d-inline fw-bold">
                        Price:<small><del><FontAwesomeIcon className='mx-2' icon={faIndianRupeeSign} />{course.course_original_price}</del></small>
                        <span className='font-weight-bolder mx-2'><FontAwesomeIcon className='mx-1' icon={faIndianRupeeSign} />{course.course_price}</span>
                      </p>
                      <Link className='btn btn-primary text-white font-weight-bolder float-right enroll' to={`/courseDetail/${course.course_id}`}>Enroll</Link>
                    </div>
                  </article>
                ))
              }
            </div>
          </section>
        }
      </div>
    </div>
  );
};

export default Course;
