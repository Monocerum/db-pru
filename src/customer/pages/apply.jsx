import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo-main.svg";

function Apply() {
  const navigate = useNavigate();

  const [tickSameAdrs, tickChecked] = useState(false);
  const [psAddress, setPsAddress] = useState("");
  const [psCountry, setPsCountry] = useState("");
  const [psZIP, setPsZIP] = useState("");
  const [pmAddress, setPmAddress] = useState("");
  const [pmCountry, setPmCountry] = useState("");
  const [pmZIP, setPmZIP] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.toUpperCase(),
    });

    if (tickSameAdrs) {
      if (name === "ps_address") {
        setPmAddress(value.toUpperCase());
        setFormData((prevState) => ({
          ...prevState,
          pm_address: value.toUpperCase(),
        }));
      } else if (name === "ps_country") {
        setPmCountry(value.toUpperCase());
        setFormData((prevState) => ({
          ...prevState,
          pm_country: value.toUpperCase(),
        }));
      } else if (name === "ps_zip") {
        setPmZIP(value.toUpperCase());

        setFormData((prevState) => ({
          ...prevState,
          pm_zip: value.toUpperCase(),
        }));
      }
    }

    if (name === "pm_address") {
      setPmAddress(value.toUpperCase());
    }

    if (name === "pm_country") {
      setPmCountry(value.toUpperCase());
    }

    if (name === "pm_zip") {
      setPmZIP(value.toUpperCase());
    }

    if (name === "ps_address") {
      setPsAddress(value.toUpperCase());
    }

    if (name === "ps_country") {
      setPsCountry(value.toUpperCase());
    }

    if (name === "ps_zip") {
      setPsZIP(value.toUpperCase());
    }
  };

  const checkboxChange = () => {
    tickChecked(!tickSameAdrs);
    if (!tickSameAdrs) {
      setPmAddress(psAddress);
      setPmCountry(psCountry);
      setPmZIP(psZIP);

      setFormData((prevState) => ({
        ...prevState,
        pm_address: prevState.ps_address,
        pm_country: prevState.ps_country,
        pm_zip: prevState.ps_zip,
      }));
    } else {
      setPmAddress("");
      setPmCountry("");
      setPmZIP("");

      setFormData((prevState) => ({
        ...prevState,
        pm_address: "",
        pm_country: "",
        pm_zip: "",
      }));
    }
  };

  const handleRadio = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        ...(name === "sof" && value !== "Others" && { sof_text: "" }),
      }));
    }
  };

  const fields = [
    'fullname', 'salutation', 'alias', 'age', 'bday', 'bplace', 'civil_status',
    'nationality', 'height', 'weight', 'sex', 'ps_address', 'ps_country',
    'ps_zip', 'pm_address', 'pm_country', 'pm_zip', 'occupation', 'position',
    'work_nature', 'sof', 'sof_text', 'gai', 'nw', 'hired', 'regular', 'income', 'sss', 'tin',
    'otherid', 'otheridnum', 'otherid2', 'otherid2number', 'mobile', 'tel', 'email', 
    'employerName', 'employerWorkNature', 'employerTel', 'employerAdrs',
    'employerCountry', 'employerZip', 
    'beneficiary1Name', 'beneficiary1Bday', 'beneficiary1Sex', 'beneficiary1Relationship',
    'beneficiary1Share', 'beneficiary1Type', 'beneficiary1Designation',
    'beneficiary1Bplace', 'beneficiary1Nationality', 'beneficiary1PsAddress',
    'beneficiary1PsCountry', 'beneficiary1PsZip', 'beneficiary1Mobile',
    'beneficiary1Tel', 'beneficiary1Email', 
    'beneficiary2Name', 'beneficiary2Bday', 'beneficiary2Sex', 'beneficiary2Relationship',
    'beneficiary2Share', 'beneficiary2Type', 'beneficiary2Designation',
    'beneficiary2Bplace', 'beneficiary2Nationality', 'beneficiary2PsAddress',
    'beneficiary2PsCountry', 'beneficiary2PsZip', 'beneficiary2Mobile',
    'beneficiary2Tel', 'beneficiary2Email'
  ];

  const [formData, setFormData] = useState({});

  useState(() => {
    const initialData = {};
    fields.forEach((field) => {
      initialData[field] = "";
    });
    setFormData(initialData);
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: id === "email" || id === "beneficiary1Email" || id === "beneficiary2Email"
        ? value
        : value.toUpperCase(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5020/apply",
        formData
      );
      if (response.status === 200) {
        const { applicantId } = response.data;
        navigate(`/userProfile?applicantID=${applicantId}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <>
      <div className="application-page">
        <p>test</p>
        <main>
          <div className="hero">
            <img src={PruLogo} alt="Pru Life U.K." />
          </div>
          <div className="banner">
            <div className="banner-left">
              <h1>Individual Application Form</h1>
              <h2>For Group Term Life Insurance</h2>
            </div>
            <div className="banner-right">
              <p className="reminder">REMINDERS:</p>
              <p>Please use CAPITAL LETTERS.</p>
              <p>Tick the appropriate box to indicate your choice.</p>
              <p>If not applicable, put “N/A” in all empty fields.</p>
              <p>
                This form should be accompanied by one (1) valid <br />
                government ID or two (2) valid non-government IDs.
              </p>
            </div>
          </div>
          <div className="form-container">
            <form
              onSubmit={handleSubmit}
              className="employee-form application-form"
            >
              <div className="form-apply">
                <div className="employee">
                  <div className="form-hdr">
                    <h2>EMPLOYEE</h2>
                  </div>
                  <div className="line-1 line">
                    <div className="fill name-fill">
                      <label htmlFor="fullname">
                        Full Name<span className="required">*</span>
                      </label>
                      <input
                        className="name-input"
                        type="text"
                        id="fullname"
                        name="fullname"
                        placeholder="Surname, Given Name, Middle Name"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill salutation-fill">
                      <label htmlFor="salutation">Salutation</label>
                      <input
                        className="salutation-input"
                        type="text"
                        id="salutation"
                        name="salutation"
                        placeholder="Salutation (Mr./Mrs./Miss/etc.)"
                        value={formData.salutation}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="fill alias-fill">
                      <label htmlFor="alias">Other Legal Name/Alias</label>
                      <input
                        className="alias-input"
                        type="text"
                        id="alias"
                        name="alias"
                        placeholder="Other Legal Name/Alias"
                        value={formData.alias}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="line-2 line">
                    <div className="fill age-fill">
                      <label htmlFor="age">
                        Age<span className="required">*</span>
                      </label>
                      <input
                        className="age-input"
                        type="text"
                        id="age"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill bday-fill">
                      <label htmlFor="bday">
                        Birthdate<span className="required">*</span>
                      </label>
                      <input
                        className="bday-input"
                        type="date"
                        id="bday"
                        name="bday"
                        placeholder="Birthdate"
                        value={formData.bday}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill bplace-fill">
                      <label htmlFor="bplace">
                        Birthplace<span className="required">*</span>
                      </label>
                      <input
                        className="bplace-input"
                        type="text"
                        id="bplace"
                        name="bplace"
                        placeholder="Birthplace"
                        value={formData.bplace}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="line-3 line">
                    <div className="fill cs-fill">
                      <p>
                        Civil Status<span className="required">*</span>
                      </p>
                      <div className="rdb">
                        <div className="rdb-left">
                          <div className="rdb-single radio">
                            <input
                              type="radio"
                              id="single"
                              name="civil_status"
                              value="S"
                              checked={formData.civil_status === "S"}
                              onChange={handleRadio}
                              required
                            />
                            <label htmlFor="single">Single</label>
                          </div>
                          <div className="rdb-married radio">
                            <input
                              type="radio"
                              id="married"
                              name="civil_status"
                              value="M"
                              checked={formData.civil_status === "M"}
                              onChange={handleRadio}
                              required
                            />
                            <label htmlFor="married">Married</label>
                          </div>
                        </div>
                        <div className="rdb-right">
                          <div className="rdb-widowed radio">
                            <input
                              type="radio"
                              id="widowed"
                              name="civil_status"
                              value="W"
                              checked={formData.civil_status === "W"}
                              onChange={handleRadio}
                              required
                            />
                            <label htmlFor="widowed">Widowed</label>
                          </div>
                          <div className="rdb-separated radio">
                            <input
                              type="radio"
                              id="separated"
                              name="civil_status"
                              value="LS"
                              checked={formData.civil_status === "LS"}
                              onChange={handleRadio}
                              required
                            />
                            <label htmlFor="separated">Legally Separated</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fill nationality-fill">
                      <label htmlFor="nationality">
                        Nationality<span className="required">*</span>
                      </label>
                      <input
                        className="nationality-input"
                        type="text"
                        id="nationality"
                        name="nationality"
                        placeholder="Nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill height-fill">
                      <label htmlFor="height">
                        Height<span className="required">*</span>
                      </label>
                      <input
                        className="height-input"
                        type="text"
                        id="height"
                        name="height"
                        placeholder="ft' in&#34;"
                        value={formData.height}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill weight-fill">
                      <label htmlFor="weight">
                        Weight<span className="required">*</span>
                      </label>
                      <input
                        className="weight-input"
                        type="text"
                        id="weight"
                        name="weight"
                        placeholder="lbs"
                        value={formData.weight}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill sex-fill">
                      <p>
                        Sex<span className="required">*</span>
                      </p>
                      <div className="sex-rdb">
                        <div className="rdb rdb-fem radio">
                          <input
                            type="radio"
                            id="fem"
                            name="sex"
                            value="F"
                            checked={formData.sex === "F"}
                            onChange={handleRadio}
                            required
                          />
                          <label htmlFor="fem">Female</label>
                        </div>
                        <div className="rdb rdb-male radio">
                          <input
                            type="radio"
                            id="male"
                            name="sex"
                            value="M"
                            checked={formData.sex === "M"}
                            onChange={handleRadio}
                            required
                          />
                          <label htmlFor="male">Male</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="line-5 line">
                    <div className="ps-address-fill fill">
                      <label htmlFor="ps_address">
                        Present Address<span className="required">*</span>
                      </label>
                      <input
                        className="ps-adrs-input"
                        type="text"
                        id="ps_address"
                        name="ps_address"
                        placeholder="Number, street, municipality/city, province"
                        value={psAddress || formData.ps_address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="ps-country-fill fill">
                      <label htmlFor="ps_country">
                        Country<span className="required">*</span>
                      </label>
                      <input
                        className="ps-country-input"
                        type="text"
                        id="ps_country"
                        name="ps_country"
                        placeholder="Country"
                        value={psCountry || formData.ps_country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="ps-zip-fill fill">
                      <label htmlFor="ps_zip">
                        ZIP Code<span className="required">*</span>
                      </label>
                      <input
                        className="ps-zip-input"
                        type="text"
                        id="ps_zip"
                        name="ps_zip"
                        placeholder="ZIP"
                        value={psZIP}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="line-6 line">
                    <div className="pm-address-fill fill">
                      <div className="pm-adrs-lbl">
                        <label htmlFor="pm_address">
                          Permanent Address<span className="required">*</span>
                        </label>
                        <div className="tick">
                          <input
                            type="checkbox"
                            id="same-adrs"
                            name="same-adrs"
                            checked={tickSameAdrs}
                            onChange={checkboxChange}
                          />
                          <label htmlFor="same-adrs">
                            Same as present address.
                          </label>
                        </div>
                      </div>
                      <input
                        className="pm-adrs-input"
                        type="text"
                        id="pm_address"
                        name="pm_address"
                        placeholder="Number, street, municipality/city, province"
                        value={pmAddress}
                        disabled={tickSameAdrs}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="pm-country-fill fill">
                      <label htmlFor="pm_country">
                        Country<span className="required">*</span>
                      </label>
                      <input
                        className="pm-country-input"
                        type="text"
                        id="pm_country"
                        name="pm_country"
                        placeholder="Country"
                        value={pmCountry}
                        disabled={tickSameAdrs}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="pm-zip-fill fill">
                      <label htmlFor="pm_zip">
                        ZIP Code<span className="required">*</span>
                      </label>
                      <input
                        className="pm-zip-input"
                        type="text"
                        id="pm_zip"
                        name="pm_zip"
                        placeholder="ZIP"
                        value={pmZIP}
                        disabled={tickSameAdrs}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="line-7 line">
                    <div className="occupation-fill fill">
                      <label htmlFor="occupation">
                        Occupation<span className="required">*</span>
                      </label>
                      <input
                        className="occupation-input"
                        type="text"
                        id="occupation"
                        name="occupation"
                        placeholder="State Duties/Rank"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="position-fill fill">
                      <label htmlFor="position">
                        Position<span className="required">*</span>
                      </label>
                      <input
                        className="position-input"
                        type="text"
                        id="position"
                        name="position"
                        placeholder="Position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="work-nature-fill fill">
                      <label htmlFor="work_nature">
                        Nature of Work/Business (if self-employed)
                      </label>
                      <input
                        className="work-nature-input"
                        type="text"
                        id="work_nature"
                        name="work_nature"
                        placeholder="Nature of Work/Business"
                        value={formData.work_nature}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="line-8 line">
                    <div className="sof-fill fill">
                      <p>
                        Source of Funds<span className="required">*</span>
                      </p>
                      <div className="sof">
                        <div className="sof-left">
                          <div className="rdb rdb-salary radio">
                            <input
                              type="radio"
                              id="salary"
                              name="sof"
                              value="Salary"
                              placeholder="Salary RDB"
                              checked={formData.sof === "Salary"}
                              onChange={handleRadio}
                              required
                            />
                            <label htmlFor="salary">Salary</label>
                          </div>
                          <div className="rdb rdb-business radio">
                            <input
                              type="radio"
                              id="business"
                              name="sof"
                              value="Business"
                              placeholder="Business RDB"
                              checked={formData.sof === "Business"}
                              onChange={handleRadio}
                              required
                            />
                            <label htmlFor="business">Business</label>
                          </div>
                        </div>
                        <div className="sof-right">
                          <div className="rdb rdb-others radio">
                            <input
                              type="radio"
                              id="others"
                              name="sof"
                              value="Others"
                              placeholder="Others RDB"
                              checked={formData.sof === "Others"}
                              onChange={handleRadio}
                              required
                            />
                            <label htmlFor="others">Others</label>
                            <input
                              className="sof-input"
                              type="text"
                              id="sof_text"
                              name="sof_text"
                              placeholder="Source of Funds"
                              value={formData.sof === "Others" ? formData.sof_text : formData.sof}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gai-fill fill">
                      <label htmlFor="gai">
                        Gross Annual Income<span className="required">*</span>
                      </label>
                      <input
                        className="gai-input"
                        type="text"
                        id="gai"
                        name="gai"
                        placeholder="Gross Annual Income"
                        value={formData.gai}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="nw-fill fill">
                      <label htmlFor="nw">
                        Net Worth<span className="required">*</span>
                      </label>
                      <input
                        className="nw-input"
                        type="text"
                        id="nw"
                        name="nw"
                        placeholder="Net Worth"
                        value={formData.nw}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="line-9 line">
                    <div className="fill hired-fill">
                      <label htmlFor="hired">
                        Date Hired<span className="required">*</span>
                      </label>
                      <input
                        className="hired-input"
                        type="date"
                        id="hired"
                        name="hired"
                        placeholder="Date Hired"
                        value={formData.hired}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill regular-fill">
                      <label htmlFor="regular">
                        Date of Regularization
                        <span className="required">*</span>
                      </label>
                      <input
                        className="regular-input"
                        type="date"
                        id="regular"
                        name="regular"
                        placeholder="Date of Regularization"
                        value={formData.regular}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="income-fill fill">
                      <label htmlFor="income">
                        Monthly Income<span className="required">*</span>
                      </label>
                      <input
                        className="income-input"
                        type="text"
                        id="income"
                        name="income"
                        placeholder="Monthly Income"
                        value={formData.income}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-subhdr">
                    <h3>IDENTIFICATION INFORMATION</h3>
                  </div>
                  <div className="line-10 line">
                    <div className="sss-fill fill">
                      <label htmlFor="sss">
                        SSS/GSIS<span className="required">*</span>
                      </label>
                      <input
                        className="sss-input"
                        type="text"
                        id="sss"
                        name="sss"
                        placeholder="SSS/GSIS"
                        value={formData.sss}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="tin-fill fill">
                      <label htmlFor="tin">
                        TIN<span className="required">*</span>
                      </label>
                      <input
                        className="tin-input"
                        type="text"
                        id="tin"
                        name="tin"
                        placeholder="TIN"
                        value={formData.tin}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="line-11 line">
                    <div className="otherid-fill fill">
                      <label htmlFor="otherid">Other ID #1</label>
                      <input
                        className="otherid-input"
                        type="text"
                        id="otherid"
                        name="otherid"
                        placeholder="ID Name"
                        value={formData.otherid}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="otheridnum-fill fill">
                      <label htmlFor="otheridnum">Other ID Number #1</label>
                      <input
                        className="otheridnum-input"
                        type="text"
                        id="otheridnum"
                        name="otheridnum"
                        placeholder="ID Number"
                        value={formData.otheridnum}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="otherid-fill fill">
                      <label htmlFor="otherid2">Other ID #2</label>
                      <input
                        className="otherid-input"
                        type="text"
                        id="otherid2"
                        name="otherid2"
                        placeholder="ID Name"
                        value={formData.otherid2}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="otheridnum-fill fill">
                      <label htmlFor="otherid2number">Other ID Number #2</label>
                      <input
                        className="otheridnum-input"
                        type="text"
                        id="otherid2number"
                        name="otherid2number"
                        placeholder="ID Number"
                        value={formData.otherid2number}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="line-12 line">
                    <div className="mobile-fill fill">
                      <label htmlFor="mobile">
                        Mobile Number<span className="required">*</span>
                      </label>
                      <input
                        className="mobile-input"
                        type="text"
                        id="mobile"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="tel-fill fill">
                      <label htmlFor="tel">Telephone Number</label>
                      <input
                        className="tel-input"
                        type="text"
                        id="tel"
                        name="tel"
                        placeholder="Telephone Number"
                        value={formData.tel}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="email-fill fill">
                      <label htmlFor="email">
                        Email Address<span className="required">*</span>
                      </label>
                      <input
                        className="email-input"
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="employer">
                  <br />
                  <br />
                  <div className="form-hdr">
                    <h2>EMPLOYER</h2>
                  </div>
                  <div className="line-13 line">
                    <div className="fill name-fill">
                      <label htmlFor="employerName">
                        Name of Employer/Name of Business
                        <span className="required">*</span>
                      </label>
                      <input
                        className="empname-input"
                        type="text"
                        id="employerName"
                        name="employerName"
                        placeholder="Name of Employer/Name of Business"
                        value={formData.employerName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill work-nature-fill">
                      <label htmlFor="employerWorkNature">
                        Nature of Work of Employer/Business
                      </label>
                      <input
                        className="employerWorkNature"
                        type="text"
                        id="employerWorkNature"
                        name="employerWorkNature"
                        placeholder="Nature of Work of Employer/Business"
                        value={formData.employerWorkNature}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="tel-fill fill">
                      <label htmlFor="employerTel">
                        Telephone Number<span className="required">*</span>
                      </label>
                      <input
                        className="employerTel"
                        type="text"
                        id="employerTel"
                        name="employerTel"
                        placeholder="Telephone Number"
                        value={formData.employerTel}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="line-14 line">
                    <div className="fill ps-address-fill">
                      <label htmlFor="employerAdrs">
                        Employer Address/Business Address
                        <span className="required">*</span>
                      </label>
                      <input
                        className="employerAdrs"
                        type="text"
                        id="employerAdrs"
                        name="employerAdrs"
                        placeholder="Number, street, municipality/city, province"
                        value={formData.employerAdrs}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill ps-country-fill">
                      <label htmlFor="employerCountry">
                        Country<span className="required">*</span>
                      </label>
                      <input
                        className="employerCountry"
                        type="text"
                        id="employerCountry"
                        name="employerCountry"
                        placeholder="Country"
                        value={formData.employerCountry}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill ps-zip-fill">
                      <label htmlFor="employerZip">
                        ZIP Code<span className="required">*</span>
                      </label>
                      <input
                        className="employerZip"
                        type="text"
                        id="employerZip"
                        name="employerZip"
                        placeholder="ZIP"
                        value={formData.employerZip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="beneficiary">
                  <br />
                  <br />
                  <div className="form-hdr">
                    <h2>BENEFICIARIES</h2>
                  </div>
                  <div className="form-subhdr">
                    <h3 id="prim">PRIMARY BENEFICIARY</h3>
                  </div>
                  <div className="line-15 line">
                    <div className="fill name-fill">
                      <label htmlFor="beneficiary1Name">
                        Full Name<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary1-name-input"
                        type="text"
                        id="beneficiary1Name"
                        name="beneficiary1Name"
                        placeholder="Surname, Given Name, Middle Name"
                        value={formData.beneficiary1Name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill bday-fill">
                      <label htmlFor="beneficiary1Bday">
                        Birthdate<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary1-bday-input"
                        type="date"
                        id="beneficiary1Bday"
                        name="beneficiary1Bday"
                        placeholder="Birthdate"
                        value={formData.beneficiary1Bday}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill sex-fill">
                      <p>
                        Sex<span className="required">*</span>
                      </p>
                      <div className="sex-rdb">
                        <div className="rdb rdb-fem radio">
                          <input
                            type="radio"
                            id="beneficiary1-fem"
                            name="beneficiary1Sex"
                            value="F"
                            onChange={handleRadio}
                            required
                          />
                          <label htmlFor="beneficiary1-fem">Female</label>
                        </div>
                        <div className="rdb rdb-male radio">
                          <input
                            type="radio"
                            id="beneficiary1-male"
                            name="beneficiary1Sex"
                            value="M"
                            onChange={handleRadio}
                            required
                          />
                          <label htmlFor="beneficiary1-male">Male</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="line-16 line">
                    <div className="fill rel-fill">
                      <label htmlFor="beneficiary1Relationship">
                        Relationship to Insured
                        <span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary1-relationship-input"
                        type="text"
                        id="beneficiary1Relationship"
                        name="beneficiary1Relationship"
                        placeholder="Relationship to Insured"
                        value={formData.beneficiary1Relationship}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill share-fill">
                      <label htmlFor="beneficiary1Share">
                        % Share<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary1-share-input"
                        type="text"
                        id="beneficiary1Share"
                        name="beneficiary1Share"
                        placeholder="% Share"
                        value={formData.beneficiary1Share}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill type-fill">
                      <p>
                        Type of Beneficiary<span className="required">*</span>
                      </p>
                      <div className="type-rdb">
                        <div className="rdb rdb-prim radio">
                          <input
                            type="radio"
                            id="beneficiary1-primary"
                            name="beneficiary1Type"
                            value="P"
                            onChange={handleRadio}
                            required
                          />
                          <label htmlFor="beneficiary1-primary">Primary</label>
                        </div>
                        <div className="rdb rdb-sec radio">
                          <input
                            type="radio"
                            id="beneficiary1-secondary"
                            name="beneficiary1Type"
                            value="S"
                            onChange={handleRadio}
                            required
                          />
                          <label htmlFor="beneficiary1-secondary">
                            Secondary
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="fill designation-fill">
                      <p>
                        Beneficiary Designation
                        <span className="required">*</span>
                      </p>
                      <div className="desig-rdb">
                        <div className="rdb rdb-revo radio">
                          <input
                            type="radio"
                            id="beneficiary1-revo"
                            name="beneficiary1Designation"
                            value="R"
                            onChange={handleRadio}
                            required
                          />
                          <label htmlFor="beneficiary1-revo">Revocable</label>
                        </div>
                        <div className="rdb rdb-irrevo radio">
                          <input
                            type="radio"
                            id="beneficiary1-irrevo"
                            name="beneficiary1Designation"
                            value="I"
                            onChange={handleRadio}
                            required
                          />
                          <label htmlFor="beneficiary1-irrevo">
                            Irrevocable
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="line-17 line">
                    <div className="fill bplace-fill">
                      <label htmlFor="beneficiary1Bplace">
                        Place of Birth<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary1-bplace-input"
                        type="text"
                        id="beneficiary1Bplace"
                        name="beneficiary1Bplace"
                        placeholder="Number, street, municipality/city, province"
                        value={formData.beneficiary1Bplace}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="fill nationality-fill">
                      <label htmlFor="beneficiary1Nationality">
                        Nationality<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary1-nationality-input"
                        type="text"
                        id="beneficiary1Nationality"
                        name="beneficiary1Nationality"
                        placeholder="Nationality"
                        value={formData.beneficiary1Nationality}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="line-18 line">
                    <div className="ps-address-fill fill">
                      <label htmlFor="beneficiary1PsAddress">
                        Present Address<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary1-ps-adrs-input"
                        type="text"
                        id="beneficiary1PsAddress"
                        name="beneficiary1PsAddress"
                        placeholder="Number, street, municipality/city, province"
                        value={formData.beneficiary1PsAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="ps-country-fill fill">
                      <label htmlFor="beneficiary1PsCountry">
                        Country<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary1-ps-country-input"
                        type="text"
                        id="beneficiary1PsCountry"
                        name="beneficiary1PsCountry"
                        placeholder="Country"
                        value={formData.beneficiary1PsCountry}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="ps-zip-fill fill">
                      <label htmlFor="beneficiary1PsZip">
                        ZIP Code<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary1-ps-zip-input"
                        type="text"
                        id="beneficiary1PsZip"
                        name="beneficiary1PsZip"
                        placeholder="ZIP"
                        value={formData.beneficiary1PsZip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="line-19 line">
                    <div className="mobile-fill fill">
                      <label htmlFor="beneficiary1Mobile">
                        Mobile Number<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary1-mobile"
                        type="text"
                        id="beneficiary1Mobile"
                        name="beneficiary1Mobile"
                        placeholder="Mobile Number"
                        value={formData.beneficiary1Mobile}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="tel-fill fill">
                      <label htmlFor="beneficiary1Tel">Telephone Number</label>
                      <input
                        className="beneficiary1-tel-input"
                        type="text"
                        id="beneficiary1Tel"
                        name="beneficiary1Mobile"
                        placeholder="Telephone Number"
                        value={formData.beneficiary1Tel}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="email-fill fill">
                      <label htmlFor="beneficiary1Email">
                        Email Address<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary1-email-input"
                        type="text"
                        id="beneficiary1Email"
                        name="beneficiary1Email"
                        placeholder="Email Address"
                        value={formData.beneficiary1Email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-subhdr">
                    <h3>SECONDARY BENEFICIARY</h3>
                  </div>
                  <div className="line-15 line">
                    <div className="fill name-fill">
                      <label htmlFor="beneficiary2Name">
                        Full Name<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary2-name-input"
                        type="text"
                        id="beneficiary2Name"
                        name="beneficiary2Name"
                        placeholder="Surname, Given Name, Middle Name"
                        value={formData.beneficiary2Name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="fill bday-fill">
                      <label htmlFor="beneficiary2Bday">
                        Birthdate<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary2-bday-input"
                        type="date"
                        id="beneficiary2Bday"
                        name="beneficiary2Bday"
                        placeholder="Birthdate"
                        value={formData.beneficiary2Bday}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="fill sex-fill">
                      <p>
                        Sex<span className="required">*</span>
                      </p>
                      <div className="sex-rdb">
                        <div className="rdb rdb-fem radio">
                          <input
                            type="radio"
                            id="beneficiary2-fem"
                            name="beneficiary2Sex"
                            value="F"
                            onChange={handleRadio}
                          />
                          <label htmlFor="beneficiary2-fem">Female</label>
                        </div>
                        <div className="rdb rdb-male radio">
                          <input
                            type="radio"
                            id="beneficiary2-male"
                            name="beneficiary2Sex"
                            value="M"
                            onChange={handleRadio}
                          />
                          <label htmlFor="beneficiary2-male">Male</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="line-16 line">
                    <div className="fill rel-fill">
                      <label htmlFor="beneficiary2Relationship">
                        Relationship to Insured
                        <span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary2-relationship-input"
                        type="text"
                        id="beneficiary2Relationship"
                        name="beneficiary2Relationship"
                        placeholder="Relationship to Insured"
                        value={formData.beneficiary2Relationship}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="fill share-fill">
                      <label htmlFor="beneficiary2Share">
                        % Share<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary2-share-input"
                        type="text"
                        id="beneficiary2Share"
                        name="beneficiary2Share"
                        placeholder="% Share"
                        value={formData.beneficiary2Share}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="fill type-fill">
                      <p>
                        Type of Beneficiary<span className="required">*</span>
                      </p>
                      <div className="type-rdb">
                        <div className="rdb rdb-prim radio">
                          <input
                            type="radio"
                            id="beneficiary2-primary"
                            name="beneficiary2Type"
                            value="P"
                            onChange={handleRadio}
                          />
                          <label htmlFor="beneficiary2-primary">Primary</label>
                        </div>
                        <div className="rdb rdb-sec radio">
                          <input
                            type="radio"
                            id="beneficiary2-secondary"
                            name="beneficiary2Type"
                            value="S"
                            onChange={handleRadio}
                          />
                          <label htmlFor="beneficiary2-secondary">
                            Secondary
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="fill designation-fill">
                      <p>
                        Beneficiary Designation
                        <span className="required">*</span>
                      </p>
                      <div className="desig-rdb">
                        <div className="rdb rdb-revo radio">
                          <input
                            type="radio"
                            id="beneficiary2-revo"
                            name="beneficiary2Designation"
                            value="R"
                            onChange={handleRadio}
                          />
                          <label htmlFor="beneficiary2-revo">Revocable</label>
                        </div>
                        <div className="rdb rdb-irrevo radio">
                          <input
                            type="radio"
                            id="beneficiary2-irrevo"
                            name="beneficiary2Designation"
                            value="I"
                            onChange={handleRadio}
                          />
                          <label htmlFor="beneficiary2-irrevo">
                            Irrevocable
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="line-17 line">
                    <div className="fill bplace-fill">
                      <label htmlFor="beneficiary2Bplace">
                        Place of Birth<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary2-bplace-input"
                        type="text"
                        id="beneficiary2Bplace"
                        name="beneficiary2Bplace"
                        placeholder="Number, street, municipality/city, province"
                        value={formData.beneficiary2Bplace}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="fill nationality-fill">
                      <label htmlFor="beneficiary2Nationality">
                        Nationality<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary2-nationality-input"
                        type="text"
                        id="beneficiary2Nationality"
                        name="beneficiary2Nationality"
                        placeholder="Nationality"
                        value={formData.beneficiary2Nationality}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="line-18 line">
                    <div className="ps-address-fill fill">
                      <label htmlFor="beneficiary2PsAddress">
                        Present Address<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary2-ps-adrs-input"
                        type="text"
                        id="beneficiary2PsAddress"
                        name="beneficiary2PsAddress"
                        placeholder="Number, street, municipality/city, province"
                        value={formData.beneficiary2PsAddress}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="ps-country-fill fill">
                      <label htmlFor="beneficiary2PsCountry">
                        Country<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary2-ps-country-input"
                        type="text"
                        id="beneficiary2PsCountry"
                        name="beneficiary2PsCountry"
                        placeholder="Country"
                        value={formData.beneficiary2PsCountry}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="ps-zip-fill fill">
                      <label htmlFor="beneficiary2PsZip">
                        ZIP Code<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary2-ps-zip-input"
                        type="text"
                        id="beneficiary2PsZip"
                        name="beneficiary2PsZip"
                        placeholder="ZIP"
                        value={formData.beneficiary2PsZip}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="line-19 line">
                    <div className="mobile-fill fill">
                      <label htmlFor="beneficiary2Mobile">
                        Mobile Number<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary2-mobile-input"
                        type="text"
                        id="beneficiary2Mobile"
                        name="beneficiary2Mobile"
                        placeholder="Mobile Number"
                        value={formData.beneficiary2Mobile}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="tel-fill fill">
                      <label htmlFor="beneficiary2Tel">Telephone Number</label>
                      <input
                        className="beneficiary2-tel-input"
                        type="text"
                        id="beneficiary2Tel"
                        name="beneficiary2Tel"
                        placeholder="Telephone Number"
                        value={formData.beneficiary2Tel}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="email-fill fill">
                      <label htmlFor="beneficiary2Email">
                        Email Address<span className="required">*</span>
                      </label>
                      <input
                        className="beneficiary2-email-input"
                        type="text"
                        id="beneficiary2Email"
                        name="beneficiary2Email"
                        placeholder="Email Address"
                        value={formData.beneficiary2Email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn">
                <input
                  className="application-btn"
                  type="Submit"
                  defaultValue="SUBMIT"
                />
              </div>
            </form>
            <div>
              {/* <div className="logOut">
                <button className="logOut-btn" id="logOut">LOG OUT</button>
            </div> */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Apply;
