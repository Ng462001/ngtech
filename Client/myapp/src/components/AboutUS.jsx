// AboutUs.js
import React from 'react';
import '../css/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className='text-center fw-bold text-black mt-5 mb-5'>About Us</h1>
      <p>
        At NGTech, we're dedicated to making learning accessible, engaging, and effective for everyone, everywhere.
      </p>
      
      <div className="section">
        <h2>Who We Are</h2>
        <p>
          Founded in 2023, we are a team of educators, industry experts, and tech enthusiasts committed to breaking down barriers to education.
        </p>
      </div>
      
      <div className="section">
        <h2>Our Vision</h2>
        <p>
          We envision a world where education is a lifelong journey, accessible to all. Our courses empower individuals to achieve their personal and professional goals.
        </p>
      </div>
      
      <div className="section">
        <h2>What We Offer</h2>
        <ul>
          <li><strong>Diverse Courses:</strong> Wide range of subjects designed by industry experts.</li>
          <li><strong>Expert Instructors:</strong> Learn from seasoned professionals and academics.</li>
          <li><strong>Interactive Learning:</strong> Engage with videos and hands-on projects.</li>
          <li><strong>Flexible Schedule:</strong> Learn at your own pace, anytime, anywhere.</li>
        </ul>
      </div>
      
      <div className="section">
        <h2>Our Commitment</h2>
        <p>
          We continuously update our courses to reflect the latest trends and advancements, ensuring high-quality content and learner satisfaction.
        </p>
      </div>
      
      <div className="section">
        <h2>Join Us Today</h2>
        <p>
          Start your learning journey with us and unlock your potential. Whether you're advancing your career, acquiring new skills, or exploring new interests, we have the right course for you.
        </p>
      </div>
      
      <div className="section">
        <h2>Contact Us</h2>
        <p>
          Have questions? Reach out to us at ngtech46@gmail.com or visit our <a href="/contact">Contact Page</a>.
        </p>
      </div>
      
      <p>Thank you for choosing NGTech. Let's make learning a lifelong adventure!</p>
    </div>
  );
};

export default AboutUs;
