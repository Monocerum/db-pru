import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Apply from './pages/apply';
import Login from './pages/login';
import UserProfile from './pages/userProfile';
import BeneficiaryProfile from './pages/beneficiaryProfile';
import EmployerProfile from './pages/employerProfile';



// import './App.css'

import React from 'react';
import axios from 'axios';

import PruLogo from './assets/pru-logo.svg';

function App() {
  return (
    <>
      <div className="body">
        <Router>
        <Header />
          <div>
            <main>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/apply' element={<Apply />} />
              <Route path='/login' element={<Login />} />
              <Route path='/userProfile' element={<UserProfile />} />
              <Route path="/beneficiaryProfile" element={<BeneficiaryProfile />} />
              <Route path="/employerProfile" element={<EmployerProfile />} />
              <Route 
                path='/*'
                element={
                  <div class="main">
                    <div class="hero">
                        <img src={PruLogo} alt="Pru Life U.K. Logo" class="main-logo"/>
                    </div> 
                    <div class="main-text">
                        <h1>PRU Life U.K.</h1>
                        <h2>Group Term Life Insurance</h2>
                        <h3>Individual Application</h3>
                    </div>
                    <div class="login-btn">
                      <a href='/login' class="admin-btn">ADMIN LOGIN</a>
                    </div>
                  </div>
                }
              />
            </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </div>
    </>
  )
}

export default App;