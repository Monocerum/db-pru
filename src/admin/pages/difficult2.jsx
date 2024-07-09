import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo.svg";
import SideNav from "../components/sidenav";

function Difficult2() {
  const [entry, setEntry] = useState([]);
  const [visibleAttributes, setVisibleAttributes] = useState([
    "ApplicantID", "ApplicantName", "Age", "GrossAnnualIncome", "MonthlyIncome",
    "PresentAddress", "PrsntAdrsCountry", "PermanentAddress", "PermntAdrsCountry"
  ]);
  
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [lastUserId, setLastUserId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5020/difficult2")
      .then((response) => {
        setEntry(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch last UserID from login table
    axios
      .get("http://localhost:5020/lastUserID")
      .then((response) => {
        if (response.data.lastUserId) {
          setLastUserId(response.data.lastUserId);
        } else {
          console.error("No users found.");
          setError("No users found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching last UserID:", error);
      });

  }, []);

  const activePage = useLocation();

  const handleAddMember = () => {
    if (lastUserId) {
      navigate(`/apply?userID=${lastUserId}`);

    } else {
      console.error("No user found.");
    }
  };

  const showAllAttributes = () => {
    setVisibleAttributes([
      "ApplicantID", "ApplicantName", "Age", "GrossAnnualIncome", "MonthlyIncome",
      "PresentAddress", "PrsntAdrsCountry", "PermanentAddress", "PermntAdrsCountry"
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
                <h2 className="db-name">Database</h2>
                <div className="action-buttons">
                  <button className="add-button" onClick={handleAddMember}>Add Member</button>
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
                    placeholder="Search Member Name"
                  />
                  <button className="search-button">Search</button>
                </div>
                <div className="db-buttons">
                  <button className="reset-button">Reset</button>
                  <button className="save-button">Save</button>
                </div>
              </div>
              <div className="show-flex">
                <button className="show-btns" onClick={showAllAttributes}>Show All Attributes</button>
                <button
                  className={`show-btns ${visibleAttributes.includes("ApplicantID") ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["ApplicantID"])}
                >
                  ApplicantID
                </button>
                <button
                  className={`show-btns ${visibleAttributes.includes("ApplicantName") ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["ApplicantName"])}
                >
                  ApplicantName
                </button>
                <button
                  className={`show-btns ${visibleAttributes.includes("Age") ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["Age"])}
                >
                  Age
                </button>
                <button
                  className={`show-btns ${visibleAttributes.includes("Position") ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["Position"])}
                >
                  Position
                </button>
                <button
                  className={`show-btns ${visibleAttributes.includes("GrossAnnualIncome") ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["GrossAnnualIncome", "MonthlyIncome"])}
                >
                  Salary
                </button>
                <button
                  className={`show-btns ${(visibleAttributes.includes("PresentAddress") && visibleAttributes.includes("PrsntAdrsCountry")) ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["PresentAddress", "PrsntAdrsCountry"])}
                >
                  Location
                </button>
              </div>
              <div className="db">
                <table className="table database-table">
                  <thead>
                    <tr>
                    <th id="id-header">Employer or Business Name</th>
                      <th id="id-header">Number of Employees</th>
                      <th id="id-header">Average Monthly Income</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.filter((e) => {
                      return search.trim() === '' || e.ApplicantName.toLowerCase().includes(search.toLowerCase());
                    })
                    .map((e, key) => (
                      <tr key={key}>
                        <td className="data-container">{e.EmpOrBusName}</td>
                        <td className="data-container">{e.NumberOfEmployees}</td>
                        <td className="data-container">{e.AverageMonthlyIncome}</td>
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
                    <Link to="/dbMembers" className="applicant nav-label">
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

export default Difficult2;
