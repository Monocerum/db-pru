import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo.svg";
import SideNav from "../components/sidenav";

function DBMembers() {
  const [filterOptions, setFilterOptions] = useState({});
  const [applicant, setApplicant] = useState([]);
  const [visibleAttributes, setVisibleAttributes] = useState([
    "ApplicantID", "ApplicantName", "Salutation", "Alias", "Age", "GrossAnnualIncome", "MonthlyIncome",
    "PresentAddress", "PrsntAdrsCountry", "PermanentAddress", "PermntAdrsCountry",
    "Birthdate", "Birthplace", "CivilStatus", "Nationality", "Height", "Weight",
    "Sex", "PrsntAdrsZIP", "PermntAdrsZIP", "Occupation", "Position", "ApplicantWorkNature",
    "SourceOfFunds", "NetWorth", "DateHired", "DateOfRegularization", "SSSID", "TINID",
    "OtherID", "OtherID2Number", "MobileNumber", "TelNo", "EmailAddress"
  ]);
  
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [lastUserId, setLastUserId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5020/applicants")
      .then((response) => {
        setApplicant(response.data);
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

    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5020/members/filter", filterOptions);
        const formattedData = response.data.map(applicant => {
          if (applicant.Birthdate) {
            applicant.Birthdate = new Date(applicant.Birthdate).toISOString().split('T')[0];
          }
          if (applicant.DateHired) {
            applicant.DateHired = new Date(applicant.DateHired).toISOString().split('T')[0];
          }
          if (applicant.DateOfRegularization) {
            applicant.DateOfRegularization = new Date(applicant.DateOfRegularization).toISOString().split('T')[0];
          }
          if (applicant.Sex) {
            applicant.Sex = applicant.Sex === 'F' ? 'FEMALE' : 'MALE';
          }
          if (applicant.CivilStatus) {
            const statusMap = {
              'S': 'SINGLE',
              'M': 'MARRIED',
              'W': 'WIDOWED',
              'L': 'LEGALLY SEPARATED'
            };
            applicant.CivilStatus = statusMap[applicant.CivilStatus];
          }
          if (applicant.Weight) {
            applicant.Weight = Math.floor(applicant.Weight);
          }
          return applicant;
        });
        setApplicant(formattedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    
    useEffect(() => {
      fetchData();
    }, [filterOptions])

  const deleteData = async (ApplicantID) => {
    if (window.confirm("Do you want to delete record?")) {
      try {
        await axios.delete(`http://localhost:5020/applicants/${ApplicantID}`);
        setApplicant(applicant.filter(app => app.ApplicantID !== ApplicantID));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const activePage = useLocation();

  const handleAddMember = () => {
    if (lastUserId) {
     navigate(`/apply?userID=${lastUserId}`);

    } else {
      console.error("No user found.");

    }
  };

  const moderateBtn = () => {
     navigate(`/moderateMember5`);
  };

  const showAllAttributes = () => {
    setVisibleAttributes([
      "ApplicantID", "ApplicantName", "Salutation", "Alias", "Age", "GrossAnnualIncome", "MonthlyIncome",
      "PresentAddress", "PrsntAdrsCountry", "PermanentAddress", "PermntAdrsCountry",
      "Birthdate", "Birthplace", "CivilStatus", "Nationality", "Height", "Weight",
      "Sex", "PrsntAdrsZIP", "PermntAdrsZIP", "Occupation", "Position", "ApplicantWorkNature",
      "SourceOfFunds", "NetWorth", "DateHired", "DateOfRegularization", "SSSID", "TINID",
      "OtherID", "OtherID2Number", "MobileNumber", "TelNo", "EmailAddress"
    ]);
  };

  const showSpecificAttributes = (attributes) => {
    setVisibleAttributes(attributes);
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
                  className={`show-btns ${(visibleAttributes.includes("PresentAddress") ) ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["PresentAddress", "PrsntAdrsCountry"])}
                >
                  Location
                </button>
                <button className="show-btns" onClick={moderateBtn}>??</button>
              </div>
              <div className="db">
                <table className="table database-table">
                  <thead>
                    <tr>
                    <th id="icon-header"></th>
                      <th id="icon-header"></th>
                      <th id="icon-header"></th>
                      {filterOptions && filterOptions.selectFields ? ( <>
                        {filterOptions.selectFields.includes("ApplicantID") && <th id="id-header">ApplicantID</th>}
                        {filterOptions.selectFields.includes("ApplicantName") && <th>Name</th>}
                        {filterOptions.selectFields.includes("Salutation") && <th>Salutation</th>}
                        {filterOptions.selectFields.includes("Alias") && <th>Alias</th>}
                        {filterOptions.selectFields.includes("Age") && <th>Age</th>}
                        {filterOptions.selectFields.includes("Birthdate") && <th>Birthdate</th>}
                        {filterOptions.selectFields.includes("Birthplace") && <th>Birthplace</th>}
                        {filterOptions.selectFields.includes("CivilStatus") && <th>Civil Status</th>}
                        {filterOptions.selectFields.includes("Nationality") && <th>Nationality</th>}
                        {filterOptions.selectFields.includes("Height") && <th>Height</th>}
                        {filterOptions.selectFields.includes("Weight") && <th>Weight</th>}
                        {filterOptions.selectFields.includes("Sex") && <th>Sex</th>}
                        {filterOptions.selectFields.includes("GrossAnnualIncome") && <th>Gross Annual Income</th>}
                        {filterOptions.selectFields.includes("MonthlyIncome") && <th>Monthly Income</th>}
                        {filterOptions.selectFields.includes("PresentAddress") && <th>Present Address</th>}
                        {filterOptions.selectFields.includes("PrsntAdrsCountry") && <th>Country</th>}
                        {filterOptions.selectFields.includes("PrsntAdrsZIP") && <th>ZIP Code</th>}
                        {filterOptions.selectFields.includes("PermanentAddress") && <th>Permanent Address</th>}
                        {filterOptions.selectFields.includes("PermntAdrsCountry") && <th>Country</th>}
                        {filterOptions.selectFields.includes("PermntAdrsZIP") && <th>ZIP Code</th>}
                        {filterOptions.selectFields.includes("Occupation") && <th>Current Occupation</th>}
                        {filterOptions.selectFields.includes("Position") && <th>Work Position</th>}
                        {filterOptions.selectFields.includes("ApplicantWorkNature") && <th>Nature of Work</th>}
                        {filterOptions.selectFields.includes("SourceOfFunds") && <th>Source of Funds</th>}
                        {filterOptions.selectFields.includes("GrossAnnualIncome") && <th>Gross Income</th>}
                        {filterOptions.selectFields.includes("NetWorth") && <th>Net Worth</th>}
                        {filterOptions.selectFields.includes("DateHired") && <th>Date of Hiring</th>}
                        {filterOptions.selectFields.includes("DateOfRegularization") && <th>Regularization Date</th>}
                        {filterOptions.selectFields.includes("SSSID") && <th>SSS ID</th>}
                        {filterOptions.selectFields.includes("TINID") && <th>TIN ID</th>}
                        {filterOptions.selectFields.includes("OtherID") && <th>Other IDs</th>}
                        {filterOptions.selectFields.includes("OtherID2Number") && <th>Other IDs Used</th>}
                        {filterOptions.selectFields.includes("MobileNumber") && <th>Mobile Number</th>}
                        {filterOptions.selectFields.includes("TelNo") && <th>Telephone Number</th>}
                        {filterOptions.selectFields.includes("EmailAddress") && <th>E-mail Address</th>}
                        </> ) : ( <>
                        {visibleAttributes.includes("ApplicantID") && <th id="id-header">ApplicantID</th>}
                        {visibleAttributes.includes("ApplicantName") && <th>Name</th>}
                        {visibleAttributes.includes("Salutation") && <th>Salutation</th>}
                        {visibleAttributes.includes("Alias") && <th>Alias</th>}
                        {visibleAttributes.includes("Age") && <th>Age</th>}
                        {visibleAttributes.includes("Birthdate") && <th>Birthdate</th>}
                        {visibleAttributes.includes("Birthplace") && <th>Birthplace</th>}
                        {visibleAttributes.includes("CivilStatus") && <th>Civil Status</th>}
                        {visibleAttributes.includes("Nationality") && <th>Nationality</th>}
                        {visibleAttributes.includes("Height") && <th>Height</th>}
                        {visibleAttributes.includes("Weight") && <th>Weight</th>}
                        {visibleAttributes.includes("Sex") && <th>Sex</th>}
                        {visibleAttributes.includes("GrossAnnualIncome") && <th>Gross Annual Income</th>}
                        {visibleAttributes.includes("MonthlyIncome") && <th>Monthly Income</th>}
                        {visibleAttributes.includes("PresentAddress") && <th>Present Address</th>}
                        {visibleAttributes.includes("PrsntAdrsCountry") && <th>Country</th>}
                        {visibleAttributes.includes("PrsntAdrsZIP") && <th>ZIP Code</th>}
                        {visibleAttributes.includes("PermanentAddress") && <th>Permanent Address</th>}
                        {visibleAttributes.includes("PermntAdrsCountry") && <th>Country</th>}
                        {visibleAttributes.includes("PermntAdrsZIP") && <th>ZIP Code</th>}
                        {visibleAttributes.includes("Occupation") && <th>Current Occupation</th>}
                        {visibleAttributes.includes("Position") && <th>Work Position</th>}
                        {visibleAttributes.includes("ApplicantWorkNature") && <th>Nature of Work</th>}
                        {visibleAttributes.includes("SourceOfFunds") && <th>Source of Funds</th>}
                        {visibleAttributes.includes("GrossAnnualIncome") && <th>Gross Income</th>}
                        {visibleAttributes.includes("NetWorth") && <th>Net Worth</th>}
                        {visibleAttributes.includes("DateHired") && <th>Date of Hiring</th>}
                        {visibleAttributes.includes("DateOfRegularization") && <th>Regularization Date</th>}
                        {visibleAttributes.includes("SSSID") && <th>SSS ID</th>}
                        {visibleAttributes.includes("TINID") && <th>TIN ID</th>}
                        {visibleAttributes.includes("OtherID") && <th>Other IDs</th>}
                        {visibleAttributes.includes("OtherID2Number") && <th>Other IDs Used</th>}
                        {visibleAttributes.includes("MobileNumber") && <th>Mobile Number</th>}
                        {visibleAttributes.includes("TelNo") && <th>Telephone Number</th>}
                        {visibleAttributes.includes("EmailAddress") && <th>E-mail Address</th>}
                      </>)}
                    </tr>
                  </thead>
                  <tbody>
                    {applicant.filter((a) => {
                      return search.trim() === '' || a.ApplicantName.toLowerCase().includes(search.toLowerCase());
                    })
                    .map((a, key) => (
                      <tr key={key}>
                        <td className="data-container">
                          <Link
                            to={`/userProfile?applicantID=${a.ApplicantID}`}
                          >
                            <i className="bx bx-show-alt"></i>
                          </Link>
                        </td>
                        <td className="data-container">
                          <Link
                            to={`/userProfile?applicantID=${a.ApplicantID}&autoEdit=true`}
                          >
                            <i className="bx bx-edit"></i>
                          </Link>
                        </td>
                        <td className="data-container">
                          <i className="bx bx-trash" onClick={() => deleteData(a.ApplicantID)}></i>
                        </td>
                        {filterOptions && filterOptions.selectFields ? (
                        <>
                        {filterOptions.selectFields.includes("ApplicantID") && <td className="data-container">{a.ApplicantID}</td>}
                        {filterOptions.selectFields.includes("ApplicantName") && <td className="data-container">{a.ApplicantName}</td>}
                        {filterOptions.selectFields.includes("Salutation") && <td className="data-container">{a.Salutation}</td>}
                        {filterOptions.selectFields.includes("Alias") && <td className="data-container">{a.Alias}</td>}
                        {filterOptions.selectFields.includes("Age") && <td className="data-container">{a.Age}</td>}
                        {filterOptions.selectFields.includes("Birthdate") && <td className="data-container">{a.Birthdate}</td>}
                        {filterOptions.selectFields.includes("Birthplace") && <td className="data-container">{a.Birthplace}</td>}
                        {filterOptions.selectFields.includes("CivilStatus") && <td className="data-container">{a.CivilStatus}</td>}
                        {filterOptions.selectFields.includes("Nationality") && <td className="data-container">{a.Nationality}</td>}
                        {filterOptions.selectFields.includes("Height") && <td className="data-container">{a.Height}</td>}
                        {filterOptions.selectFields.includes("Weight") && <td className="data-container">{a.Weight}</td>}
                        {filterOptions.selectFields.includes("Sex") && <td className="data-container">{a.Sex}</td>}
                        {filterOptions.selectFields.includes("GrossAnnualIncome") && <td className="data-container">{a.GrossAnnualIncome}</td>}
                        {filterOptions.selectFields.includes("MonthlyIncome") && <td className="data-container">{a.MonthlyIncome}</td>}
                        {filterOptions.selectFields.includes("PresentAddress") && <td className="data-container">{a.PresentAddress}</td>}
                        {filterOptions.selectFields.includes("PrsntAdrsCountry") && <td className="data-container">{a.PrsntAdrsCountry}</td>}
                        {filterOptions.selectFields.includes("PrsntAdrsZIP") && <td className="data-container">{a.PrsntAdrsZIP}</td>}
                        {filterOptions.selectFields.includes("PermanentAddress") && <td className="data-container">{a.PermanentAddress}</td>}
                        {filterOptions.selectFields.includes("PermntAdrsCountry") && <td className="data-container">{a.PermntAdrsCountry}</td>}
                        {filterOptions.selectFields.includes("PermntAdrsZIP") && <td className="data-container">{a.PermntAdrsZIP}</td>}
                        {filterOptions.selectFields.includes("Occupation") && <td className="data-container">{a.Occupation}</td>}
                        {filterOptions.selectFields.includes("Position") && <td className="data-container">{a.Position}</td>}
                        {filterOptions.selectFields.includes("ApplicantWorkNature") && <td className="data-container">{a.ApplicantWorkNature}</td>}
                        {filterOptions.selectFields.includes("SourceOfFunds") && <td className="data-container">{a.SourceOfFunds}</td>}
                        {filterOptions.selectFields.includes("GrossAnnualIncome") && <td className="data-container">{a.GrossAnnualIncome}</td>}
                        {filterOptions.selectFields.includes("NetWorth") && <td className="data-container">{a.NetWorth}</td>}
                        {filterOptions.selectFields.includes("DateHired") && <td className="data-container">{a.DateHired}</td>}
                        {filterOptions.selectFields.includes("DateOfRegularization") && <td className="data-container">{a.DateOfRegularization}</td>}
                        {filterOptions.selectFields.includes("SSSID") && <td className="data-container">{a.SSSID}</td>}
                        {filterOptions.selectFields.includes("TINID") && <td className="data-container">{a.TINID}</td>}
                        {filterOptions.selectFields.includes("OtherID") && <td className="data-container">{a.OtherID}</td>}
                        {filterOptions.selectFields.includes("OtherID2Number") && <td className="data-container">{a.OtherID2Number}</td>}
                        {filterOptions.selectFields.includes("MobileNumber") && <td className="data-container">{a.MobileNumber}</td>}
                        {filterOptions.selectFields.includes("TelNo") && <td className="data-container">{a.TelNo}</td>}
                        {filterOptions.selectFields.includes("EmailAddress") && <td className="data-container">{a.EmailAddress}</td>}
                        </>
                        ) : ( 
                        <>
                        {visibleAttributes.includes("ApplicantID") && <td className="data-container">{a.ApplicantID}</td>}
                        {visibleAttributes.includes("ApplicantName") && <td className="data-container">{a.ApplicantName}</td>}
                        {visibleAttributes.includes("Salutation") && <td className="data-container">{a.Salutation}</td>}
                        {visibleAttributes.includes("Alias") && <td className="data-container">{a.Alias}</td>}
                        {visibleAttributes.includes("Age") && <td className="data-container">{a.Age}</td>}
                        {visibleAttributes.includes("Birthdate") && <td className="data-container">{a.Birthdate}</td>}
                        {visibleAttributes.includes("Birthplace") && <td className="data-container">{a.Birthplace}</td>}
                        {visibleAttributes.includes("CivilStatus") && <td className="data-container">{a.CivilStatus}</td>}
                        {visibleAttributes.includes("Nationality") && <td className="data-container">{a.Nationality}</td>}
                        {visibleAttributes.includes("Height") && <td className="data-container">{a.Height}</td>}
                        {visibleAttributes.includes("Weight") && <td className="data-container">{a.Weight}</td>}
                        {visibleAttributes.includes("Sex") && <td className="data-container">{a.Sex}</td>}
                        {visibleAttributes.includes("GrossAnnualIncome") && <td className="data-container">{a.GrossAnnualIncome}</td>}
                        {visibleAttributes.includes("MonthlyIncome") && <td className="data-container">{a.MonthlyIncome}</td>}
                        {visibleAttributes.includes("PresentAddress") && <td className="data-container">{a.PresentAddress}</td>}
                        {visibleAttributes.includes("PrsntAdrsCountry") && <td className="data-container">{a.PrsntAdrsCountry}</td>}
                        {visibleAttributes.includes("PrsntAdrsZIP") && <td className="data-container">{a.PrsntAdrsZIP}</td>}
                        {visibleAttributes.includes("PermanentAddress") && <td className="data-container">{a.PermanentAddress}</td>}
                        {visibleAttributes.includes("PermntAdrsCountry") && <td className="data-container">{a.PermntAdrsCountry}</td>}
                        {visibleAttributes.includes("PermntAdrsZIP") && <td className="data-container">{a.PermntAdrsZIP}</td>}
                        {visibleAttributes.includes("Occupation") && <td className="data-container">{a.Occupation}</td>}
                        {visibleAttributes.includes("Position") && <td className="data-container">{a.Position}</td>}
                        {visibleAttributes.includes("ApplicantWorkNature") && <td className="data-container">{a.ApplicantWorkNature}</td>}
                        {visibleAttributes.includes("SourceOfFunds") && <td className="data-container">{a.SourceOfFunds}</td>}
                        {visibleAttributes.includes("GrossAnnualIncome") && <td className="data-container">{a.GrossAnnualIncome}</td>}
                        {visibleAttributes.includes("NetWorth") && <td className="data-container">{a.NetWorth}</td>}
                        {visibleAttributes.includes("DateHired") && <td className="data-container">{a.DateHired}</td>}
                        {visibleAttributes.includes("DateOfRegularization") && <td className="data-container">{a.DateOfRegularization}</td>}
                        {visibleAttributes.includes("SSSID") && <td className="data-container">{a.SSSID}</td>}
                        {visibleAttributes.includes("TINID") && <td className="data-container">{a.TINID}</td>}
                        {visibleAttributes.includes("OtherID") && <td className="data-container">{a.OtherID}</td>}
                        {visibleAttributes.includes("OtherID2Number") && <td className="data-container">{a.OtherID2Number}</td>}
                        {visibleAttributes.includes("MobileNumber") && <td className="data-container">{a.MobileNumber}</td>}
                        {visibleAttributes.includes("TelNo") && <td className="data-container">{a.TelNo}</td>}
                        {visibleAttributes.includes("EmailAddress") && <td className="data-container">{a.EmailAddress}</td>}
                        </>
                        )}
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

export default DBMembers;
