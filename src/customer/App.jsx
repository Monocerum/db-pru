import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Components
import Header from './components/header';
import Footer from './components/footer';
import Scroll from './components/scroll';

// Pages
import Apply from './pages/apply';
import Login from './pages/login';
import Register from './pages/register';
import UserProfile from './pages/userProfile';
import BeneficiaryProfile from './pages/beneficiaryProfile';

// Styles
import '../styles.css';

// Assets
import PruLogo from '../assets/pru-logo.svg';

function App() {
  return (
    <>
      <div className="body">
        <Router>
        <Header />
        <Scroll />
          <div>
            <main>
            <Routes>
              <Route path='/apply' element={<Apply />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/userProfile' element={<UserProfile />} />
              <Route path="/beneficiaryProfile" element={<BeneficiaryProfile />} />
              {/* <Route path="/" element={<Admin />} /> */}
              <Route 
                path='/*'
                element={
                  <div className="main">
                    <div className="hero">
                        <img src={PruLogo} alt="Pru Life U.K. Logo" className="main-logo"/>
                    </div> 
                    <div className="main-text">
                        <h1>PRU Life U.K.</h1>
                        <h2>Group Term Life Insurance</h2>
                        <h3>Individual Application</h3>
                    </div>
                    <div className="register-btn">
                      <Link to="/register" className="reg-btn">REGISTER</Link>
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