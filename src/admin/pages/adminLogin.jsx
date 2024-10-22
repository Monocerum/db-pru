import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Styles
import "../../styles.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5020/adminLogin", {
        Username: username,
        Password: password,
      });

      if (response.status === 200) {
        navigate("/home");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <>
      <main>
        <div className="main">
          <div className="login">
            <label htmlFor="login" className="login-lbl">
              <span className="company-name">PRU Life U.K.</span> Admin Account
            </label>
            <div className="container">
              <div className="login-hdr">
                <h3 className="log-hdr">ADMIN LOGIN</h3>
              </div>
              <form className="login-container" onSubmit={handleLogin}>
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
                    <input type="checkbox" id="remember" name="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                  <a href="password-reauth" className="forgot">
                    Forgot Password
                  </a>
                </div>
                <div className="login-btn">
                  <button type="submit" className="admin-btn">LOGIN</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminLogin;