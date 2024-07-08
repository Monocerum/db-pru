import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo.svg";
import SideNav from "../components/sidenav";

function DBEmployers() {
  const [employer, setEmployer] = useState([]);
  const [visibleAttributes, setVisibleAttributes] = useState([
    "EmployerCode", "EmpOrBusName", "EmpOrBusNature", "EmpOrBusTelNo", 
    "EmpOrBusAdrs", "EmpOrBusCountry", "EmpOrBusZIP"
  ]);

  const activePage = useLocation();
  const [search, setSearch] = useState('');
  
  const navigate = useNavigate();
  const handleAddEmployer = () => {
    navigate('/employerRegistration');
  };

  useEffect(() => {
    axios
      .get("http://localhost:5020/employers")
      .then((response) => {
        setEmployer(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteData = async (EmployerCode) => { 
    if (window.confirm("Do you want to delete record?")) {
      try {
        await axios.delete(`http://localhost:5020/employers/${EmployerCode}`);
        setEmployer(employer.filter(emp => emp.EmployerCode !== EmployerCode));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const toggleAttribute = (attribute) => {
    setVisibleAttributes((prevAttributes) => {
      if (prevAttributes.includes(attribute)) {
        return prevAttributes.filter(attr => attr !== attribute);
      } else {
        return [...prevAttributes, attribute];
      }
    });
  };

  const toggleLocationAttributes = () => {
    setVisibleAttributes((prevAttributes) => {
      const addressIncluded = prevAttributes.includes("EmpOrBusAdrs");
      const countryIncluded = prevAttributes.includes("EmpOrBusCountry");
      
      if (addressIncluded && countryIncluded) {
        return prevAttributes.filter(attr => attr !== "EmpOrBusAdrs" && attr !== "EmpOrBusCountry");
      } else {
        return [...new Set([...prevAttributes, "EmpOrBusAdrs", "EmpOrBusCountry"])];
      }
    });
  };

  const showAllAttributes = () => {
    setVisibleAttributes([
      "EmployerCode", "EmpOrBusName", "EmpOrBusNature", "EmpOrBusTelNo", 
      "EmpOrBusAdrs", "EmpOrBusCountry", "EmpOrBusZIP"
    ]);
  };

  const showSpecificAttributes = (attributes) => {
    setVisibleAttributes(attributes);
  };

  return (
    <>
      <div>
        <main className="cont">
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
                </div>
              </div>
            </div>
            <div className="db-container">
              <div className="db-header">
                <h2 className="db-name">Employers</h2>
                <div className="action-buttons">
                  <button className="add-button" onClick={handleAddEmployer}>Add Employer</button>
                  {/* <ul>
                    <Link to="/apply" className="add-button action-btn">
                      Add
                    </Link>
                  </ul> */}
                </div>
              </div>
              <div className="action-db">
                <div className="search-container">
                  <input
                    className="search"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search Employer Name"
                  />
                  <button className="search-button">Search</button>
                </div>

                <div className="db-buttons">
                  <button className="reset-button" onClick={() => setSearch('')}>Reset</button>
                  <button className="save-button">Save</button>
                </div>
              </div>
              
              <div className="show-flex">
                <button className="show-btns" onClick={showAllAttributes}>Show All Attributes</button>
                <button
                  className={`show-btns ${visibleAttributes.includes("EmployerCode") ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["EmployerCode"])}
                >
                  EmployerID
                </button>
                <button
                  className={`show-btns ${visibleAttributes.includes("EmpOrBusName") ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["EmpOrBusName"])}
                >
                  EmployerName
                </button>
                <button
                  className={`show-btns ${(visibleAttributes.includes("EmpOrBusAdrs") && visibleAttributes.includes("EmpOrBusCountry")) ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["EmpOrBusAdrs", "EmpOrBusCountry"])}
                >
                  Location
                </button>
              </div>
              
              <div className="db">
                <table className="table database-table">
                  <thead>
                    <tr>
                      <th id="icon-header"></th>
                      <th id="icon-header"></th>
                      <th id="icon-header"></th>
                      {visibleAttributes.includes("EmployerCode") && <th id="id-header">Employer or Business Code</th>}
                      {visibleAttributes.includes("EmpOrBusName") && <th>Name</th>}
                      {visibleAttributes.includes("EmpOrBusNature") && <th>Nature of Work of Employer</th>}
                      {visibleAttributes.includes("EmpOrBusTelNo") && <th>Telephone Number</th>}
                      {visibleAttributes.includes("EmpOrBusAdrs") && <th>Present Address</th>}
                      {visibleAttributes.includes("EmpOrBusCountry") && <th>Country</th>}
                      {visibleAttributes.includes("EmpOrBusZIP") && <th>ZIP</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {employer.filter((e) => {
                      return search.trim() === '' || e.EmpOrBusName.toLowerCase().includes(search.toLowerCase());
                    })
                    .map((e, key) => (
                      <tr key={key}>
                        <td className="data-container employer-data">
                          <Link
                            to={`/employerDetails?employerCode=${e.EmployerCode}`}
                          >
                            <i className="bx bx-show-alt"></i>
                          </Link>
                        </td>
                        <td className="data-container employer-data">
                          <Link
                            to={`/employerDetails?employerCode=${e.EmployerCode}&autoEdit=true`}
                          >
                            <i className="bx bx-edit"></i>
                          </Link>
                        </td>
                        <td className="data-container employer-data">
                          <i className="bx bx-trash" onClick={() => deleteData(e.EmployerCode)}></i>
                        </td>
                        {visibleAttributes.includes("EmployerCode") && <td className="data-container employer-data">{e.EmployerCode}</td>}
                        {visibleAttributes.includes("EmpOrBusName") && <td className="data-container employer-data">{e.EmpOrBusName}</td>}
                        {visibleAttributes.includes("EmpOrBusNature") && <td className="data-container employer-data">{e.EmpOrBusNature}</td>}
                        {visibleAttributes.includes("EmpOrBusTelNo") && <td className="data-container employer-data">{e.EmpOrBusTelNo}</td>}
                        {visibleAttributes.includes("EmpOrBusAdrs") && <td className="data-container employer-data">{e.EmpOrBusAdrs}</td>}
                        {visibleAttributes.includes("EmpOrBusCountry") && <td className="data-container employer-data">{e.EmpOrBusCountry}</td>}
                        {visibleAttributes.includes("EmpOrBusZIP") && <td className="data-container employer-data">{e.EmpOrBusZIP}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="info-nav">
                <ul>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbUsers" ? "active" : ""
                    }`}
                  >
                    <Link to="/dbUsers" className="user nav-label">
                      User
                    </Link>
                  </li>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbMembers" ? "active" : ""
                    }`}
                  >
                    <Link to="/dbMembers" className="applicant nav-label">
                      Member
                    </Link>
                  </li>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbBeneficiaries" ? "active" : ""
                    }`}
                  >
                    <Link
                      to="/dbBeneficiaries"
                      className="beneficiary nav-label"
                    >
                      Beneficiary
                    </Link>
                  </li>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbEmployers" ? "active" : ""
                    }`}
                  >
                    <Link to="/dbEmployers" className="employer nav-label">
                      Employer
                    </Link>
                  </li>
                  <li className={`display-nav ${activePage.pathname === "/dbAll" ? "active" : ""}`}>
                    <Link to="/dbAll" className="all nav-label">
                      Joined
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default DBEmployers;