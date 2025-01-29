import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

const AddLesson = () => {
    const [lessonname, setLessonName] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState()
    const [videoUpload, setVideo] = useState(null);
    const [videoLink, SetVideoLink] = useState('');
    const [uploadType, setUploadType] = useState('');
    const { id } = useParams();
    const [users, setUsers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/lessons/` + id)
            .then(course => {
                setUsers(course.data[0]);
            })
            .catch(err => console.log(err));
    }, []);


    function Add_Lesson() {
        setLoading(true)
        const formData = new FormData();
        formData.append('course_name', users.course_name);
        formData.append('lesson_name', lessonname);
        formData.append('lesson_desc', desc);
        formData.append('video_link', videoLink);
        formData.append('lesson_video', videoUpload);

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addLesson/` + id, formData)
            .then(res => {
                toast.success("Lesson Added Successfully")
                setLoading(false)
                navigate("/admin/lessons")
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <Header />
            <div className="container-fluid mb-5 admin">
                <div className="row">
                    <Sidebar />
                    <div className='col-sm-6 mt-5 mx-3 jumbotron'>
                        <h3 className='text-center fw-bold my-4'>Add New Lesson</h3>
                        <div className='d-flex flex-column gap-4 fw-bold'>

                            <div className='form-group'>
                                <label htmlFor="course_id">Course ID</label>
                                <input type="text" name="course_id" id="course_id" className='form-control mt-2' value={users.course_id || ''} disabled />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="course_name">Course Name</label>
                                <input type="text" name="course_name" id="course_name" className='form-control mt-2' value={users.course_name || ''} disabled />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="lesson_name">Lesson Name</label>
                                <input type="text" name="lesson_name" id="lesson_name" className='form-control mt-2' value={lessonname} onChange={(e) => setLessonName(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="lesson_desc">Lesson Description</label>
                                <textarea name="lesson_desc" id="lesson_desc" className='form-control mt-2' rows='2' value={desc} onChange={(e) => setDesc(e.target.value)} />
                            </div>
                            <select className="form-select" aria-label="Select Upload Type" value={uploadType} onChange={(e) => setUploadType(e.target.value)}>
                                <option value="">Select Upload Type</option>
                                <option value="video_link">Video Link</option>
                                <option value="video_upload">Video Upload</option>
                            </select>
                            {uploadType === 'video_link' && (
                                <div className='form-group'>
                                    <label htmlFor="video_link">Video Link</label>
                                    <input type="text" name="video_link" id="video_link" className='form-control mt-2' value={videoLink} onChange={(e) => SetVideoLink(e.target.value)} />
                                </div>
                            )}

                            {uploadType === 'video_upload' && (
                                <div className='form-group'>
                                    <label htmlFor="lesson_video">Lesson Video</label>
                                    <input type="file" name="lesson_video" id="lesson_video" className='form-control-file mx-4' onChange={(e) => setVideo(e.target.files[0])} />
                                </div>
                            )}
                            <div className='text-center mt-4'>
                                {loading ?
                                    < button className="btn btn-success mx-3" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Adding...
                                    </button>
                                    :
                                    <button type="submit" className='btn btn-success mx-3' id='courseSubmitBtn' name='courseSubmitBtn' onClick={Add_Lesson} disabled={!lessonname || !desc || (!videoLink && !videoUpload)}>Add</button>
                                }

                                <Link className='btn btn-secondary' to="/admin/lessons">Close</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddLesson;
