import React from 'react';
import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

// Styles
import "../../styles.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5020/login', {
        Username: username,
        Password: password
      });
      
      if (response.status === 200) {
        const { userID, applicantID } = response.data;
        if (applicantID){
          navigate(`/userProfile?applicantID=${applicantID}`);
        } else {
          navigate(`/apply?userID=${userID}`);
        }
        
      }

    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.status === 401) {
        alert('Invalid Inputs.');
      } else if (error.response && error.response.status === 400) {
        alert('Please fill in the requirements.');
      } else {
        alert('Login failed. Please try again.');
      }
    }
  };

  return (
    <>
      <main>
        <div className="main">
            <div className="login">
                <label htmlFor="login" className="login-lbl"><span className="company-name">PRU Life U.K.</span> Account</label>
                <div className="container">
                    <div className="login-hdr">
                        <h3 className="log-hdr">LOGIN</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="login-container">
                      <div className="fill login-fill">
                        <label htmlFor="username">Username</label>
                        <input 
                          type="text" 
                          id="username" 
                          name="username" 
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="fill">
                        <label htmlFor="password">Password</label>
                        <input 
                          type="password" 
                          id="password" 
                          name="password" 
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          />
                      </div>
                      <div className="form-footer">
                        <div className="tick">
                            <input type="checkbox" id="remember" name="remember"/>
                            <label htmlFor="remember">Remember Me</label>
                        </div>
                        <a href="password-reauth" className="forgot">Forgot Password</a>
                      </div>
                      <div className="login-btn">
                        <input type="submit" value="LOGIN"/>
                      </div>
                      <Link to="/register" className="register">
                        Don't have an account yet? Register.
                      </Link>
                    </form>
                </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default Login;