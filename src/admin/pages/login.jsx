import React, { useState } from "react";
import axios from "axios";

// Styles
import "../../styles.css";

function Login() {
  return (
    <>
      <main>
        <div className="main">
          <div className="login">
            <label for="login" className="login-lbl">
              <span className="company-name">PRU Life U.K.</span> Account
            </label>
            <div className="container">
              <div className="login-hdr">
                <h3 className="log-hdr">LOGIN</h3>
              </div>
              <form action="submit" className="login-container">
                <div className="fill login-fill">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                  />
                </div>
                <div className="fill">
                  <label for="password">Password</label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="form-footer">
                  <div className="tick">
                    <input type="checkbox" id="remember" name="remember" />
                    <label for="remember">Remember Me</label>
                  </div>
                  <a href="password-reauth" className="forgot">
                    Forgot Password
                  </a>
                </div>
                <div className="login-btn">
                  <input type="submit" value="LOG IN" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;