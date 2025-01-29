import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { faLariSign } from '@fortawesome/free-solid-svg-icons';

const UpdateStudents = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState();
  const [btnLoading, setBtnLoading] = useState()
  const navigate = useNavigate();
  const { id } = useParams();

  const validatePass = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/updateStudent/${id}`)
      .then(res => {
        setLoading(false);
        setValues({ name: res.data[0].name, email: res.data[0].email, password: '' }); // Set password to empty
      })
      .catch(err => {
        toast.error("Failed to fetch student data");
        setLoading(false);
      });
  }, [id]);

  const Update_Student = (e) => {
    e.preventDefault();
    const updateValues = { name: values.name, email: values.email };
    if (values.password) {
      if (!validatePass(values.password)) {
        toast.error("Password must be at least 8 characters long, and include at least one letter, one number, and one special character.");
        return;
      }
      updateValues.password = values.password;
    }
    setBtnLoading(true)
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updateStudentByID/${id}`, updateValues)
      .then(response => {
        if (response.data.Status === "Success" || response.data.Status === "Email send") {
          toast.success("Student updated successfully");
          setBtnLoading(false)
          navigate("/admin/students");
          setTimeout(() => {
            if (response.data.Status === "Email send") {
              toast.success(`Verification link sent to ${values.email}`);
            }
          }, 2000)
        } else {
          toast.error(response.data.Error || "Failed to update student");
          setBtnLoading(false)
        }
      })
      .catch(error => {
        setBtnLoading(false)
        console.log(error);
        toast.error("Failed to update student");
      });
  };

  return (
    <>
      {/* Navbar */}
      <Header />

      <div className="container-fluid mb-5 admin">
        <div className="row">
          {/* Sidebar */}
          <Sidebar />
          {/* Update Student page */}
          <div className='col-sm-6 mt-5 jumbotron'>
            <h3 className='text-center fw-bold my-4'>Update Student</h3>
            {loading ? (
              <div className="loading-placeholder text-center mt-5">
                <div className="spinner-border" role="status">
                </div>
              </div>
            ) : (
              <form method='post' className='fw-bold d-flex flex-column gap-4' onSubmit={Update_Student}>
                <div className='form-group'>
                  <label htmlFor="stu_name">Name</label>
                  <input type="text" name="name" id="name" className='form-control mt-2' value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
                </div>
                <div className='form-group'>
                  <label htmlFor="stu_email">Email</label>
                  <input type="email" name="email" id="email" className='form-control mt-2' value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
                </div>
                <div className='form-group'>
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" className='form-control mt-2' placeholder="Leave blank to keep current password" onChange={(e) => setValues({ ...values, password: e.target.value })} />
                </div>
                <div className='text-center mt-4'>
                  {btnLoading ?
                    <button className="btn btn-success mx-3" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Updating...
                    </button>
                    :
                    <button type="submit" className='btn btn-success mx-3' id='studentSubmitBtn' name='studentSubmitBtn' disabled={!values.name || !values.email}>Update</button>
                  }
                  <Link className='btn btn-secondary' to="/admin/students">Close</Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateStudents;
