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
              {" "}
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
          <li>
            <i
                class="bx bxs-filter-alt"
                id="btnFilter"
                onClick={toggleSidebar}
              ></i>
              <span className="nav-item filter">Filter</span>
          </li>
        </ul>
        <div className="textFilter">
          <div className="filter-content">
          <div className="filter-container">
            <h3 className="filter-title"> Position</h3>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> All
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> Manager
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> Executive Associate
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> IT Consultant
            </label>
          </div>

          <div className="filter-container">
            <h3 className="filter-title"> Location </h3>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> All
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> Quezon City
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> Makati City
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> Taguig City
            </label>
          </div>

          <div className="filter-container">
            <h3 className="filter-title"> Age </h3>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> All
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> 18 - 24 years old
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> 25 - 50 years old
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> &gt; 50 years old
            </label>
          </div>

          <div className="filter-container">
            <h3 className="filter-title"> Salary </h3>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> All
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> &lt; P10,000
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> P10,000 - P50,000
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> &gt; P50,000
            </label>
          </div>

          <div className="filter-container">
            <h3 className="filter-title"> Beneficiary Type </h3>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> All
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> Primary
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="test" />
              <span className="checkmark"></span> Secondary
            </label>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
