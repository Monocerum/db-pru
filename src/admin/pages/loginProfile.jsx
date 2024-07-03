import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo-main.svg";

const LoginDetails = () => {
  const [user, setUser] = useState({});
  const [editActive, setEditStatus] = useState(false);

  const [applicant, setApplicant] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const UserID = searchParams.get("userID");

    console.log(UserID);

    if (UserID) {
      axios
        .get(`http://localhost:5020/users/${UserID}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location.search]);

  const EditProfile = () => {
    if (window.confirm("Do you want to edit the user profile?")) {
      setEditStatus(true);
    }
  };

  const cancelEdit = () => {
    if (window.confirm("Do you want to cancel editing?")) {
      setEditStatus(false);
      setState(initialState);
    }
  };

  const saveEdit = () => {
    if (window.confirm("Do you want to save?")) {
      setEditStatus(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const newInput = (label, name, value) => (
    <div className="info" key={name}>
      <label htmlFor={name} className="info-label">
        {label}
      </label>
      <br />
      <input
        className="info-input"
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={!editActive}
      />
    </div>
  );

  const activePage = useLocation();

  return (
    <div>
      <main>
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
          <div className="information">
            <div className="member-info">
              <div className="personal-header">
                <div className="header-info">
                  <h2>
                    <span id="main-salutation">{user.Username}</span>
                  </h2>
                  <h3>Company Name</h3>
                </div>
                <div className="edit">
                  <button
                    className={`edit-btn ${editActive ? "active" : ""}`}
                    id="userEdit"
                    onClick={EditProfile}
                    hidden={editActive}
                  >
                    EDIT
                  </button>
                </div>
              </div>
              <div className="personal-info">
                <div className="personal-info-header">
                  <h3 className="info-header">User Details</h3>
                </div>
                <div className="user-info">
                  {newInput("Membership Number", "membershipNum", user.UserID)}
                  {newInput("Name", "memberName", user.EmailAddress)}
                  {newInput("Salutation", "memberSalutation", user.Username)}
                  {newInput(
                    "Other Legal Name/Alias",
                    "memberAlias",
                    user.Password
                  )}
                  <div className="btns">
                    <div className="cancel">
                      <button
                        className="cancel-btn"
                        id="userCancel"
                        onClick={cancelEdit}
                        hidden={!editActive}
                      >
                        CANCEL EDITING
                      </button>
                    </div>
                    <div className="save">
                      <button
                        className="save-btn"
                        id="userSave"
                        onClick={saveEdit}
                        hidden={!editActive}
                      >
                        SAVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="return-db">
              <Link to="/dbMembers" className="return-profile">
                Return to database.
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default LoginDetails;
