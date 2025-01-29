import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import '../css/Video.css';
import { Container, Row, Col, ListGroup, Card, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { UserContext } from '../useContext/UserProvider';

const VideoList = () => {
  const {isUserLoggedIn,email,name} = useContext(UserContext);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCoursePurchased, setIsCoursePurchased] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/checkCoursePurchase/${id}`, { params: { email } })
        .then(response => {
            if (response.data.purchased === true) {
                setIsCoursePurchased(true);
            } else {
                setIsCoursePurchased(false);
                navigate("/profile")
            }
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
}, [email, id]);


  useEffect(() => {
    fetchLessons();
  }, []);

  useEffect(() => {

    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [selectedLesson]);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getlessons/${id}`);
      setLessons(response.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      setError('Error fetching lessons. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const selectLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <>
      <Navbar isUserLoggedIn={isUserLoggedIn} name={name} />
      <Container fluid className="video-list-container">
        {isCoursePurchased ? (
          <>
            <Row>
              <Col md={4} className="lessons-list">
                <h2 className="text-center fw-bold mb-4">List Of Lessons</h2>
                {loading && <Spinner animation="border" />}
                {error && <Alert variant="danger">{error}</Alert>}
                {!loading && !error && (
                  <ListGroup>
                    {lessons.map((lesson, index) => (
                      <ListGroup.Item
                        key={lesson.id}
                        action
                        onClick={() => selectLesson(lesson)}
                        active={selectedLesson === lesson}
                        className="lesson-item"
                      >
                        {index + 1}. {lesson.lesson_name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Col>
              <Col md={8} className="video-details">
                {selectedLesson && (
                  <Card className="lesson-card">
                    <Card.Body>
                      <Card.Title className="fw-bold">{selectedLesson.lesson_name}</Card.Title>
                      <Card.Text>{selectedLesson.lesson_desc}</Card.Text>
                      <div className="video-wrapper">
                        {selectedLesson.video_link === "undefined" ? (
                          <video
                            width="100%"
                            height="315"
                            controls
                            className='lesson-video'
                            ref={videoRef} 
                          >
                            <source src={`${import.meta.env.VITE_BACKEND_URL}/${selectedLesson.lesson_video}`} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <iframe
                            title={selectedLesson.lesson_name}
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${selectedLesson.video_link}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </Col>
            </Row>
          </>
        ) : null}
      </Container>
    </>
  );
};

export default VideoList;

