import React, { useState } from "react";
import { Link } from "react-router-dom";

// Assets
import PruLogoWhite from "../../assets/pru-logo-white.png";

function SideNav() {
    const [isActive, setActive] = useState(false);

    const toggleSidebar = () => {
        setActive(!isActive);
    };

    return (
        <div className={`nav-sidebar ${isActive ? "active" : ""}`}>
            <div className="nav-sidebar-content">
              <div className="top">
                <div className="logo">
                  <img
                    src={PruLogoWhite}
                    alt="Pru Life Logo"
                    className="sidenav-logo"
                  />
                  <span>PRU LIFE U.K.</span>
                </div>
              </div>
              <ul className="nav-list">
                <li>
                  <i
                    className="bx bx-menu-alt-left"
                    id="btnMenu"
                    onClick={toggleSidebar}
                  ></i>
                </li>
                <li>
                  <Link to="/home">
                    <i className="bx bx-grid-alt"></i>
                    <span className="nav-item">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dbUsers">
                    <i className="bx bx-log-in-circle"></i>
                    <span className="nav-item">Users</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dbMembers">
                    <i className="bx bx-user"></i>
                    <span className="nav-item">Members</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dbEmployers">
                    <i className="bx bx-file"></i>
                    <span className="nav-item">Employers</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dbBeneficiaries">
                    <i className="bx bx-user-check"></i>
                    <span className="nav-item">Beneficiaries</span>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <i className="bx bx-log-out-circle"></i>
                    <span className="nav-item">Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
    )
}

export default SideNav;