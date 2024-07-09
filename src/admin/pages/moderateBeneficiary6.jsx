import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo.svg";
import SideNav from "../components/sidenav";

function ModerateBeneficiary6() {
  const [filterOptions, setFilterOptions] = useState({});
  const [employer, setApplicant] = useState([]);
  const [visibleAttributes, setVisibleAttributes] = useState([
    "BeneficiaryType", "NumBeneficiaries"]);

  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [lastUserId, setLastUserId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5020/beneficiaryModerate")
      .then((response) => {
        setApplicant(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:5020/members/filter", filterOptions);
      setApplicant(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterOptions]);

  const activePage = useLocation();

  return (
    <>
      <div>
        <main className="cont">
          <SideNav filterOptions={filterOptions} setFilterOptions={setFilterOptions} onFilter={fetchData} />
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
                <h2 className="db-name">Beneficiaries</h2>
                {/* <div className="action-buttons">
                  <button className="add-button" onClick={handleAddEmployer} disabled>Add Employer</button>
                </div> */}
              </div>
              <div className="action-db">
                <div className="search-container">
                  <input
                    className="search"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Beneficiary Name"
                    disabled
                  />
                  <button className="search-button">Search</button>
                </div>
                {/* <div className="db-buttons">
                  <button className="reset-button">Reset</button>
                  <button className="save-button">Save</button>
                </div> */}
              </div>
              <h3>PROBLEM STATEMENT 6</h3>
              <p>As a person in charge of the database, your supervisor has 
                tasked you with presenting a comprehensive analysis of 
                beneficiaries classified according to their type. This data 
                holds significance for the company’s long-term financial 
                strategy over the next decade or so.</p>
              <div className="db">
                <table className="table database-table">
                  <thead>
                    <tr>
                      {/* <th id="icon-header"></th>
                      <th id="icon-header"></th>
                      <th id="icon-header"></th> */}
                      {visibleAttributes.includes("BeneficiaryType") && <th>Beneficiary Type</th>}
                      {visibleAttributes.includes("NumBeneficiaries") && <th>Number of Beneficiary</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {employer.filter((a) => {
                      return search.trim() === '' || a.BeneficiaryType.toLowerCase().includes(search.toLowerCase());
                    })
                    .map((a, key) => (
                      <tr key={key}>
                        {/* <td className="data-container">
                          <Link to={`/userProfile?applicantID=${a.ApplicantID}`}>
                            <i className="bx bx-show-alt"></i>
                          </Link>
                        </td>
                        <td className="data-container">
                          <Link to={`/userProfile?applicantID=${a.ApplicantID}&autoEdit=true`}>
                            <i className="bx bx-edit"></i>
                          </Link>
                        </td>
                        <td className="data-container">
                          <i className="bx bx-trash" onClick={() => deleteData(a.ApplicantID)}></i>
                        </td> */}
                        {visibleAttributes.includes("BeneficiaryType") && <td className="data-container">{a.BeneficiaryType}</td>}
                        {visibleAttributes.includes("NumBeneficiaries") && <td className="data-container">{a.NumBeneficiaries}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="info-nav">
                <ul>
                  <li className={`display-nav ${activePage.pathname === "/dbUsers" ? "active" : ""}`}>
                    <Link to="/dbUsers" className="user nav-label">
                      User
                    </Link>
                  </li>
                  <li className={`display-nav ${activePage.pathname === "/dbMembers" ? "active" : ""}`}>
                    <Link to="/dbMembers" className="employer nav-label">
                      Member
                    </Link>
                  </li>
                  <li className={`display-nav ${activePage.pathname === "/dbBeneficiaries" ? "active" : ""}`}>
                    <Link to="/dbBeneficiaries" className="beneficiary nav-label">
                      Beneficiary
                    </Link>
                  </li>
                  <li className={`display-nav ${activePage.pathname === "/dbEmployers" ? "active" : ""}`}>
                    <Link to="/dbEmployers" className="employer nav-label">
                      Employer
                    </Link>
                  </li>
                  <li className={`display-nav ${activePage.pathname === "/dbAll" ? "active" : ""}`}>
                    <Link to="/dbAll" className="all-db nav-label">
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

export default ModerateBeneficiary6;