import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles.css";

import React from 'react';
import axios from 'axios';

function Register() {
    document.getElementById("registrationForm").addEventListener("submit", function(event)
        {
            event.preventDefault();

            var email = document.getElementById("email").value;
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            var confirmPass = document.getElementById("confirm").value;
            var agreement = document.getElementById("agreement").checked;

            if (!email || !username || !password || !confirmPass || !agreement) {
                alert("Please fill in all the necessary information.");
                return;
            }

            if (password !== confirmPass) {
                alert("Passwords do not match.");
                return;
            }

            this.submit();
        });
        
  return (
    <>
      <main>
        <div className="main">
        <div className="register">
                <label for="register" className="register-lbl"><span className="company-name">PRU Life U.K.</span> Account</label>
                <div className="container">
                    <div className="register-hdr">
                        <h3 className="reg-hdr">REGISTER</h3>
                    </div>
                        <form id="registrationForm" action="/register" method="POST">
                            <div className="fill register-fill">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Email" required/>
                            </div>
                            <div className="fill register-fill">
                                <label for="username">Username</label>
                                <input type="text" id="username" name="username" placeholder="Username" required/>
                            </div>
                            <div className="fill register-fill">
                                <label for="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="Password" required/>
                            </div>
                            <div className="fill register-fill">
                                <label for="confirm">Confirm Password</label>
                                <input type="password" id="confirm" name="confirm" placeholder="Confirm Password" required/>
                            </div>
                            <div className="tick">
                                <input type="checkbox" id="agreement" name="agreement" required/>
                                <label for="agreement">I have read and agree to the Terms of Service & Privacy Policy</label>
                            </div>
                            <div className="register-btn">
                                <input type="submit" value="REGISTER"/>
                            </div>
                            <Link to="/login" className="log-in">Already have an account? Log-in.</Link>
                        </form>
                </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default Register;