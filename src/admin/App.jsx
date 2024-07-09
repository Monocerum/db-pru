import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FilterProvider } from './components/FilterContext';

// Styles
import '../styles.css';

// Components
import Header from './components/header';
import Footer from './components/footer';
import Scroll from './components/scroll';

// Pages
import Home from './pages/home';
import Apply from './pages/apply';
import AdminLogin from './pages/adminLogin';
import Register from './pages/register';
import EmployerRegister from './pages/employerRegistration';

// Profiles
import UserProfile from './pages/userProfile';
import BeneficiaryProfile from './pages/beneficiaryProfile';
import BeneficiaryDetails from './pages/indivBeneficiary';
import EmployerProfile from './pages/employerProfile';
import EmployerDetails from './pages/employerDetails';
import LoginDetails from './pages/loginProfile';

// Databases
import DBMembers from './pages/dbMembers';
import DBUsers from './pages/dbUsers';
import DBBeneficiaries from './pages/dbBeneficiaries';
import DBEmployers from './pages/dbEmployers';
import DBAll from './pages/db';

// Moderate Problem Statement
import ModerateEmployer4 from './pages/moderateEmployer4.jsx'
import ModerateMember5 from './pages/moderateMember5.jsx';
import ModerateBeneficiary6 from'./pages/moderateBeneficiary6.jsx'
import ModerateMember7 from './pages/moderateMember7.jsx';

// Difficult
import Difficult1 from './pages/difficult1.jsx';
import Difficult2 from './pages/difficult2.jsx';
import Difficult3 from './pages/difficult3.jsx';

// Assets
import PruLogo from '../assets/pru-logo.svg';

function App() {
  return (
    <>
      <div className="body">
        <FilterProvider>
        <Router>
        <Header />
        <Scroll />
          <div>
            <main>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/apply' element={<Apply />} />
              <Route path='/adminLogin' element={<AdminLogin />} />
              <Route path='/register' element={<Register />} />
              <Route path='/employerRegistration' element={<EmployerRegister />} />
              <Route path='/userProfile' element={<UserProfile />} />
              <Route path="/beneficiaryProfile" element={<BeneficiaryProfile />} />
              <Route path="/beneficiaryDetails" element={<BeneficiaryDetails />} />
              <Route path="/employerProfile" element={<EmployerProfile />} />
              <Route path="/employerDetails" element={<EmployerDetails />} />
              <Route path="/loginProfile" element={<LoginDetails />} />
              <Route path="/dbMembers" element={<DBMembers />} />
              <Route path="/dbUsers" element={<DBUsers />} />
              <Route path="/dbBeneficiaries" element={<DBBeneficiaries />} />
              <Route path="/dbEmployers" element={<DBEmployers />} />
              <Route path="/dbAll" element={<DBAll />} ></Route>
              <Route path="/moderateMember5" element={<ModerateMember5 />} ></Route>
              <Route path="/moderateMember7" element={<ModerateMember7 />} ></Route>
              <Route path="/moderateEmployer4" element={<ModerateEmployer4 />} ></Route>
              <Route path="/moderateBeneficiary6" element={<ModerateBeneficiary6 />} ></Route>
              <Route path="/difficult1" element={<Difficult1 />} ></Route>
              <Route path="/difficult2" element={<Difficult2 />} ></Route>
              <Route path="/difficult3" element={<Difficult3 />} ></Route>
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
                    <div className="login-btn">
                      <Link to="/adminLogin" className="admin-btn">ADMIN LOGIN</Link>
                    </div>
                  </div>
                }
              />
            </Routes>
            </main>
            <Footer />
          </div>
        </Router>
        </FilterProvider>
      </div>
    </>
  )
}

export default App;