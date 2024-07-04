import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPass: '',
    agreement: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, username, password, confirmPass } = formData;

    // Validation
    // if (!email || !username || !password || !confirmPass || !agreement) {
    //   alert("Please fill in all the necessary information.");
    //   return;
    // }

    // if (password !== confirmPass) {
    //   alert("Passwords do not match.");
    //   return;
    // }

    try {
      // Send POST request to server
      const response = await axios.post('http://localhost:5020/register', formData); 
      const { data } = response;
      const userId = data.userId;
      
      // Redirect or handle success message as needed
      console.log('Registration successful. UserID', userId);

      // Redirect to application page
      navigate(`/apply?userID=${userId}`);
      
    } catch (error) {
      console.error('Registration failed:', error.response);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <main>
      <div className="main">
        <div className="register">
          <label htmlFor="register" className="register-lbl">
            <span className="company-name">PRU Life U.K.</span> Account
          </label>
          <div className="container">
            <div className="register-hdr">
              <h3 className="reg-hdr">REGISTER</h3>
            </div>
            <form onSubmit={handleSubmit} id="registrationForm">
              <div className="fill register-fill">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="fill register-fill">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="fill register-fill">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="fill register-fill">
                <label htmlFor="confirm">Confirm Password</label>
                <input
                  type="password"
                  id="confirm"
                  name="confirmPass"
                  placeholder="Confirm Password"
                  value={formData.confirmPass}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="tick">
                <input
                  type="checkbox"
                  id="agreement"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="agreement">
                  I have read and agree to the Terms of Service & Privacy Policy
                </label>
              </div>
              <div className="register-btn">
                <input type="submit" value="REGISTER" />
              </div>
              <Link to="/login" className="log-in">
                Already have an account? Log-in.
              </Link>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
