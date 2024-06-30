import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles.css";

import React from 'react';
import axios from 'axios';

function Register() {
  return (
    <>
      <main>
        <div className="main">
        <div class="register">
                <label for="register" class="register-lbl"><span class="company-name">PRU Life U.K.</span> Account</label>
                <div class="container">
                    <div class="register-hdr">
                        <h3 class="reg-hdr">REGISTER</h3>
                    </div>
                        <form id="registrationForm" action="/register" method="POST">
                            <div class="fill register-fill">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Email" required/>
                            </div>
                            <div class="fill register-fill">
                                <label for="username">Username</label>
                                <input type="text" id="username" name="username" placeholder="Username" required/>
                            </div>
                            <div class="fill register-fill">
                                <label for="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="Password" required/>
                            </div>
                            <div class="fill register-fill">
                                <label for="confirm">Confirm Password</label>
                                <input type="password" id="confirm" name="confirm" placeholder="Confirm Password" required/>
                            </div>
                            <div class="tick">
                                <input type="checkbox" id="agreement" name="agreement" required/>
                                <label for="agreement">I have read and agree to the Terms of Service & Privacy Policy</label>
                            </div>
                            <div class="register-btn">
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