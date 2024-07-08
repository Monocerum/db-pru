import React, { useState } from "react";
import { Link } from "react-router-dom";

// Assets
import PruLogoWhite from "../../assets/pru-logo-white.png";

const SideNav = ({ filterOptions, setFilterOptions, onFilter }) => {
  const [isActive, setActive] = useState(false);
  const [filters, setFilters] = useState({
    position: [],
    location: [],
    age: [],
    salary: [],
    beneficiaryType: []
  });

  const toggleSidebar = () => {
    setActive(!isActive);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    setFilters((prevFilters) => {
      const updatedFilter = checked
        ? [...prevFilters[name], value]
        : prevFilters[name].filter((item) => item !== value);
      return { ...prevFilters, [name]: updatedFilter };
    });
  };
  
  const applyFilters = () => {
    setFilterOptions(filters);
    onFilter();
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
                className="bx bxs-filter-alt"
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
              <input type="checkbox" name="position" value="All" onChange={handleCheckboxChange} />
              <span className="checkmark"></span> All
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="position" value="Manager" onChange={handleCheckboxChange} />
              <span className="checkmark"></span> Manager
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="position" value="Executive Associate" onChange={handleCheckboxChange} />
              <span className="checkmark"></span> Executive Associate
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="position" value="IT Consultant" onChange={handleCheckboxChange} />
              <span className="checkmark"></span> IT Consultant
            </label>
          </div>

          <div className="filter-container">
            <h3 className="filter-title"> Location </h3>
            <label className="filter-label-container">
              <input type="checkbox" name="location" value="AllLocations" onChange={handleCheckboxChange}  />
              <span className="checkmark"></span> All
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="location" value="Quezon City" onChange={handleCheckboxChange}  />
              <span className="checkmark"></span> Quezon City
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="location" value="Manila City" onChange={handleCheckboxChange}  />
              <span className="checkmark"></span> Manila City
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="location" value="Makati City" onChange={handleCheckboxChange}  />
              <span className="checkmark"></span> Makati City
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="location" value="Taguig City" onChange={handleCheckboxChange}  />
              <span className="checkmark"></span> Taguig City
            </label>
          </div>

          <div className="filter-container">
            <h3 className="filter-title"> Age </h3>
            <label className="filter-label-container">
              <input type="checkbox" name="age" value="AllAges" onChange={handleCheckboxChange}  />
              <span className="checkmark"></span> All
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="age" value="BETWEEN 18 AND 24" onChange={handleCheckboxChange} />
              <span className="checkmark"></span> 18 - 24 years old
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="age" value="BETWEEN 25 AND 50" onChange={handleCheckboxChange} />
              <span className="checkmark"></span> 25 - 50 years old
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="age" value="> 50" onChange={handleCheckboxChange} />
              <span className="checkmark"></span> &gt; 50 years old
            </label>
          </div>

          <div className="filter-container">
            <h3 className="filter-title"> Salary </h3>
            <label className="filter-label-container">
              <input type="checkbox" name="salary" value="AllSalaries" onChange={handleCheckboxChange}  />
              <span className="checkmark"></span> All
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="salary" value="10k" onChange={handleCheckboxChange}  />
              <span className="checkmark"></span> &lt; P10,000
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="salary" value="10k50k" onChange={handleCheckboxChange}  />
              <span className="checkmark"></span> P10,000 - P50,000
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="salary" value="50k" onChange={handleCheckboxChange}  />
              <span className="checkmark"></span> &gt; P50,000
            </label>
          </div>

          <div className="filter-container">
            <h3 className="filter-title"> Beneficiary Type </h3>
            <label className="filter-label-container">
              <input type="checkbox" name="salary" value="AllTypes" onChange={handleCheckboxChange}  />
              <span className="checkmark"></span> All
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="salary" value="Primary" onChange={handleCheckboxChange}  />
              <span className="checkmark"></span> Primary
            </label>
            <label className="filter-label-container">
              <input type="checkbox" name="salary" value="Secondary" onChange={handleCheckboxChange}  />
              <span className="checkmark"></span> Secondary
            </label>
          </div>
          </div>

          <button onClick={applyFilters}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
