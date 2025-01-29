import React, { useEffect, useState, useCallback } from 'react'
import '../css/Admin.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios';

library.add(faTrash);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [students, setStudents] = useState(0);
  const [courses, setCourses] = useState(0);
  const [sold, setSold] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, studentRes, soldRes, courseRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/numberOfStudents`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/numberOfsold`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/numberOfCourses`)
        ]);

        setOrders(orderRes.data);
        setStudents(studentRes.data.total_students);
        setSold(soldRes.data.total_sold);
        setCourses(courseRes.data.total_courses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const DeleteByID = useCallback((id) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteorder/${id}`)
      .then(() => {
        setOrders(prevOrders => prevOrders.filter(order => order.order_id !== id));
      })
      .catch(err => console.error("Error deleting order:", err));
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' });
  };

  return (
    <>
      <Header />

      <div className="container-fluid mb-5 admin">
        <div className="row">
          <Sidebar />

          <div className='col-sm-9 mt-5'>
            <div className="row mx-5 text-center">
              <div className="col-sm-4 mt-5">
                <div className="card text-white bg-danger mb-3">
                  <div className="card-header">Courses</div>
                  <div className="card-body">
                    <h4 className='card-title'>{courses}</h4>
                    <Link className='btn text-white border-0' to="/admin/course">View</Link>
                  </div>
                </div>
              </div>

              <div className="col-sm-4 mt-5">
                <div className="card text-white bg-success mb-3">
                  <div className="card-header">Students</div>
                  <div className="card-body">
                    <h4 className='card-title'>{students}</h4>
                    <Link className='btn text-white border-0' to="/admin/students">View</Link>
                  </div>
                </div>
              </div>

              <div className="col-sm-4 mt-5">
                <div className="card text-white bg-info mb-3">
                  <div className="card-header">Sold</div>
                  <div className="card-body">
                    <h4 className='card-title'>{sold}</h4>
                    <Link className='btn text-white border-0' to="/admin/sellReports">View</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mt-5">
              <p className="bg-dark text-white p-2 text-center">Course Ordered</p>

              {loading ? (
                <div className="loading-placeholder text-center mt-5">
                  <div className="spinner-border" role="status"></div>
                </div>
              ) : (
                <div className="table-responsive">
                  {orders.length === 0 ? (
                    <div className='text-center mt-5'>
                      <h4>No orders found.</h4>
                    </div>
                  ) : (
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th className='col'>Order ID</th>
                          <th className='col'>Course ID</th>
                          <th className='col'>Student Email</th>
                          <th className='col'>Amount</th>
                          <th className='col'>Order Date</th>
                          <th className='col'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.order_id}>
                            <th scope='row'>{order.order_id}</th>
                            <td>{order.course_id}</td>
                            <td>{order.email}</td>
                            <td>{order.amount}</td>
                            <td>{formatDate(order.date)}</td>
                            <td>
                              <button
                                type='button'
                                onClick={() => DeleteByID(order.order_id)}
                                className='btn btn-secondary'
                              >
                                <FontAwesomeIcon icon="trash" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
