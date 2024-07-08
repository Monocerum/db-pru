import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Styles
import "../../styles.css";

function EmployerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    empOrBusName: '',
    empOrBusNature: '',
    empOrBusTelNo: '',
    empOrBusAdrs: '',
    empOrBusCountry: '',
    empOrBusZIP: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value.toUpperCase()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to server
      await axios.post('http://localhost:5020/employerRegistration', formData); 

      // Redirect to some page after registration
      navigate(`/dbEmployers`);
      
    } catch (error) {
      console.error('Registration failed:', error.response);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <main>
      <div className="main">
        <div className="register">
          <label htmlFor="employer-register" className="login-lbl">
            <span className="company-name">PRU Life U.K.</span> Employer Account
          </label>
          <div className="container">
            <div className="login-hdr">
              <h3 className="log-hdr">EMPLOYER REGISTRATION</h3>
            </div>
            <form onSubmit={handleSubmit} id="employerRegistrationForm">
              <div className="fill register-fill">
                <label htmlFor="empOrBusName">Employer/Business Name <span className='required'> *</span></label>
                <input
                  type="text"
                  id="empOrBusName"
                  name="empOrBusName"
                  placeholder="Employer/Business Name"
                  value={formData.empOrBusName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="fill register-fill">
                <label htmlFor="empOrBusNature">Nature of Business <span className='required'> *</span></label>
                <input
                  type="text"
                  id="empOrBusNature"
                  name="empOrBusNature"
                  placeholder="Nature of Business"
                  value={formData.empOrBusNature}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="fill register-fill">
                <label htmlFor="empOrBusTelNo">Telephone Number <span className='required'> *</span></label>
                <input
                  type="text"
                  id="empOrBusTelNo"
                  name="empOrBusTelNo"
                  placeholder="Telephone Number"
                  value={formData.empOrBusTelNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="fill register-fill">
                <label htmlFor="empOrBusAdrs">Address <span className='required'> *</span></label>
                <input
                  type="text"
                  id="empOrBusAdrs"
                  name="empOrBusAdrs"
                  placeholder="Address"
                  value={formData.empOrBusAdrs}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="fill register-fill">
                <label htmlFor="empOrBusCountry">Country <span className='required'> *</span></label>
                <input
                  type="text"
                  id="empOrBusCountry"
                  name="empOrBusCountry"
                  placeholder="Country"
                  value={formData.empOrBusCountry}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="fill register-fill">
                <label htmlFor="empOrBusZIP">ZIP Code <span className='required'> *</span></label>
                <input
                  type="text"
                  id="empOrBusZIP"
                  name="empOrBusZIP"
                  placeholder="ZIP Code"
                  value={formData.empOrBusZIP}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="register-btn">
                <input type="submit" value="REGISTER" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EmployerRegister;