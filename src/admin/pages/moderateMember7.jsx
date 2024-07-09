import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo.svg";
import SideNav from "../components/sidenav";

function ModerateMember7() {
  const [filterOptions, setFilterOptions] = useState({});
  const [applicant, setApplicant] = useState([]);
  const [visibleAttributes, setVisibleAttributes] = useState([
    "EmployerCode", "NumMembers"
  ]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [lastUserId, setLastUserId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5020/memberModerate2")
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

  const handleAddMember = () => {
    if (lastUserId) {
      navigate(`/apply?userID=${lastUserId}`);
    } else {
      console.error("No user found.");
    }
  };

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
                <h2 className="db-name">Members</h2>
                <div className="action-buttons">
                  <button className="add-button" onClick={handleAddMember} disabled>Add Member</button>
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
                    disabled
                  />
                  <button className="search-button">Search</button>
                </div>
                {/* <div className="db-buttons">
                  <button className="reset-button">Reset</button>
                  <button className="save-button">Save</button>
                </div> */}
              </div>
              <h3>PROBLEM STATEMENT 7</h3>
              <p>To ensure that the insurance plan for each employee is adequately 
                meeting their needs, it is crucial to tailor the insurance plan to 
                maximize the benefits provided by the insurance company. As an 
                administrator, you have been assigned to count the number of members 
                aged over 50 years who are Engineers, categorized by employer code.</p>
              <div className="db">
                <table className="table database-table">
                  <thead>
                    <tr>
                      {/* <th id="icon-header"></th>
                      <th id="icon-header"></th>
                      <th id="icon-header"></th> */}
                      {visibleAttributes.includes("EmployerCode") && <th>Employer Code</th>}
                      {visibleAttributes.includes("NumMembers") && <th>Number of Members</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {applicant.filter((a) => {
                      return search.trim() === '' || a.ApplicantName.toLowerCase().includes(search.toLowerCase());
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
                        {visibleAttributes.includes("EmployerCode") && <td className="data-container">{a.EmployerCode}</td>}
                        {visibleAttributes.includes("NumMembers") && <td className="data-container">{a.NumMembers}</td>}
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

export default ModerateMember7;