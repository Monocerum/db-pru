import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo-main.svg";
import SideNav from "../components/sidenav";

function Home() {
  const [applicant, setApplicant] = useState([]);
  const [beneficiary, setBeneficiary] = useState([]);
  const [employer, setEmployer] = useState([]);
  const [applicantTotal, setApplicantTotal] = useState(0);
  const [beneficiaryTotal, setBeneficiaryTotal] = useState(0);
  const [employerTotal, setEmployerTotal] = useState(0);
  
  
  const[search, setSearch] = useState('');
  console.log(search)

  useEffect(() => {
    axios
      .get("http://localhost:5020/applicants")
      .then((response) => {
        setApplicant(response.data);
        setApplicantTotal(response.data.length);
      })
      axios
      .get("http://localhost:5020/beneficiaries")
      .then((response) => {
        setBeneficiary(response.data);
        setBeneficiaryTotal(response.data.length);
      })
      axios
      .get("http://localhost:5020/employers")
      .then((response) => {
        setEmployer(response.data);
        setEmployerTotal(response.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
 },[]);
  
  return (
    <>
      <div>
        <main>
          <SideNav />
          <div className="main">
            <div className="header">
              <div className="profile-hero">
                <div className="hero-img">
                  <img
                    src={PruLogo}
                    alt="Pru Life U.K."
                    className="profile-img"
                  />
                </div>
                <div className="hero-text">
                  <h1>PRU LIFE U.K.</h1>
                  <h2>Group Term Life Insurance</h2>
                  <h3>Individual Application</h3>
                  <input
                    className="search"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Employee, Beneficiary, Employer"
                  />
                </div>
              </div>
            </div>
            <div className="dashboard-rectangle">
              <div className="dashboard">
                <h2 className="text">DASHBOARD</h2>
                <hr />
                <div className="dashboard-container">
                  <div className="num-container" id="numContainer1">
                    <div className="memberNum total-container">
                      <h2>{applicantTotal}</h2>
                      <p>Total Number of Members</p>
                    </div>
                  </div>
                  <div className="num-container" id="numContainer2">
                    <div className="beneficiaryNum total-container">
                      <h2>{beneficiaryTotal}</h2>
                      <p>Total Number of Beneficiaries</p>
                    </div>
                  </div>
                  <div className="num-container" id="numContainer3">
                    <div className="employernum total-container">
                      <h2>{employerTotal}</h2>
                      <p>Total Number of Employers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="recent-container">
              <div className="recent-rectangle">
              <Link to="/dbMembers"> 
                <h3 className="recent-text"> Members 
                  <i className='bx bxs-chevron-right'></i></h3> 
              </Link>
                
                <table className="table dashboard-members">
                  <thead>
                    <tr>
                      <th className="id-header">ApplicantID</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicant.filter((a) => {
                      return search.toLowerCase() === '' ? a
                        : a.ApplicantName.toLowerCase().includes(search.toLowerCase());
                    })
                      .map((a, key) => (
                        <tr key={key}>
                          <td className="data-container">
                            {a.ApplicantID}
                          </td>
                          <td className="data-container">
                            {a.ApplicantName}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="recent-rectangle">
              <Link to="/dbBeneficiaries"> 
              <h3 className="recent-text"> Beneficiaries 
                <i className='bx bxs-chevron-right'></i></h3> 
              </Link>
                <table className="table dashboard-beneficiaries">
                  <thead>
                    <tr>
                      <th className="id-header">ApplicantID</th>
                      <th className="id-header">BeneficiaryCode</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beneficiary.filter((b) => {
                      return search.toLowerCase() === '' ? b
                        : b.BeneficiaryName.toLowerCase().includes(search.toLowerCase());
                    })
                      .map((b, key) => (
                        <tr key={key}>
                          <td className="data-container">
                            {b.ApplicantID}
                          </td>
                          <td className="data-container">
                            {b.BeneficiaryCode}
                          </td>
                          <td className="data-container">
                            {b.BeneficiaryName}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="recent-rectangle">
              <Link to="/dbEmployer"> <h3 className="recent-text"> Employers 
                <i className='bx bxs-chevron-right'></i></h3> 
              </Link>
                <table className="table dashboard-beneficiaries">
                  <thead>
                    <tr>
                      <th className="id-header">EmployerCode</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employer.filter((e) => {
                      return search.toLowerCase() === '' ? e
                        : e.EmpOrBusName.toLowerCase().includes(search.toLowerCase());
                    })
                      .map((e, key) => (
                        <tr key={key}>
                          <td className="data-container">
                            {e.EmployerCode}
                          </td>
                          <td className="data-container">
                            {e.EmpOrBusName}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
