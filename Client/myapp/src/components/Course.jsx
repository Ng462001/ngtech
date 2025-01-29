import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPeopleGroup, faKeyboard, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response3 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/courseshow3`);
        const response6 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/courseshow6`);
        setCourses([...response3.data, ...response6.data]);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
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
        <h1 className='text-center fw-bold text-black mt-5'>Popular Courses</h1>
        <section className="courses">
          <div className="container courses__container">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <article key={index} className="course placeholder-glow">
                  <div className="course__Image">
                    <div className="placeholder__image"></div>
                  </div>
                  <div className="course__info placeholder w-100">
                    <div className="placeholder__text "></div>
                    <div className="placeholder__text short"></div>
                    <p className="card-text d-inline fw-bold placeholder__text price"></p>
                    <div className="placeholder__button"></div>
                  </div>
                </article>
              ))
            ) : (
              courses.map((course, index) => (
                <article key={index} className="course">
                  <div className="course__Image">
                    <img src={`${import.meta.env.VITE_BACKEND_URL}/${course.course_image}`} alt="Course Image" />
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
            )}
          </div>
          <div className='text-center mt-5'>
            <Link className='btn btn-primary text-white font-weight-bolder float-right enroll1 text-center' to="/course">View All</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Course;
