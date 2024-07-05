import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Styles
import '../../styles.css';

// Assets
import PruLogo from '../../assets/pru-logo-main.svg';

function Apply() {
  const navigate = useNavigate();
  
  const [tickSameAdrs, tickChecked] = useState(false);
  const [psAddress, setPsAddress] = useState('');
  const [psCountry, setPsCountry] = useState('');
  const [psZIP, setPsZIP] = useState('');
  const [pmAddress, setPmAddress] = useState('');
  const [pmCountry, setPmCountry] = useState('');
  const [pmZIP, setPmZIP] = useState('');
    
  useEffect(() => {
    const handleAddressChange = () => {
      if (tickSameAdrs) {
        setPmAddress(psAddress);
        setPmCountry(psCountry);
        setPmZIP(psZIP);
      } else {
        setPmAddress('');
        setPmCountry('');
        setPmZIP('');
      }
    };

    if (sameAdrsCheck) {
      sameAdrsCheck.addEventListener('change', handleAddressChange);
      
      return () => {
        sameAdrsCheck.removeEventListener('change', handleAddressChange);
      };
    }
  }, [tickSameAdrs, psAddress, psCountry, psZIP]);

  const sameAdrsCheck = document.getElementById('same-adrs');

  const handleChange = (e) => {
    const { id, value } = e.target;
		
    if (id === 'ps_address') {
      setPsAddress(value.toUpperCase());
      setPsAddress(() => {setFormData({
        ...formData, value : value.toUpperCase()
        });})
      if (tickSameAdrs) {
          setPmAddress(value);
      }
    } else if (id === 'ps_country') {
        setPsCountry(value.toUpperCase());
        if (tickSameAdrs) {
            setPmCountry(value);
        }
    } else if (id === 'ps_zip') {
        setPsZIP(value.toUpperCase());
        if (tickSameAdrs) {
            setPmZIP(value);
        }
    } else if (id === 'pm_address') {
      setPmAddress(value.toUpperCase());
    } else if (id === 'pm_country') {
      setPmCountry(value.toUpperCase());
    } else if (id === 'pm_zip') {
      setPmZIP(value.toUpperCase());
    }
  }

  const handleRadio = (e) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
        ...(name === 'sof' && value !== 'Others' && { sof_text: '' })
      }));
    }
  };
  

  const checkboxChange = () => {
    tickChecked(!tickSameAdrs);
  }

  const fields = ['fullname', 'salutation', 'alias', 'age', 'bday', 'bplace', 'single', 'married', 'widowed', 'separated', 
    'nationality', 'height', 'weight', 'fem', 'male', 'ps_address', 'ps_country', 'ps_zip', 'pm_address', 'pm_country', 'pm_zip',
    'occupation', 'position', 'work-nature',  'salary', 'business', 'sof', 'sof_text', 'gai', 'nw', 'hired', 'regular', 'income',
    'sss', 'tin', 'otherid', 'otheridnum', 'otherid2', 'otherid2num', 'mobile', 'tel', 'email', 'employer-name', 'employer-work-nature', 'employer-tel',
    'employer-adrs', 'employer-country', 'employer-zip', 'beneficiary1-name', 'beneficiary1-bday', 'beneficiary1-fem', 'beneficiary1-male',
    'beneficiary1-relationship', 'beneficiary1-share', 'beneficiary1-primary', 'beneficiary1-secondary', 'beneficiary1-revo', 'beneficiary1-irrevo',
    'beneficiary1-bplace', 'beneficiary1-nationality', 'beneficiary1-ps-address', 'beneficiary1-ps-country', 'beneficiary1-ps-zip',
    'beneficiary1-mobile', 'beneficiary1-tel', 'beneficiary1-email', 'beneficiary2-name', 'beneficiary2-bday', 'beneficiary2-fem', 'beneficiary2-male',
    'beneficiary2-relationship', 'beneficiary2-share', 'beneficiary2-primary', 'beneficiary2-secondary', 'beneficiary2-revo', 'beneficiary2-irrevo',
    'beneficiary2-bplace', 'beneficiary2-nationality', 'beneficiary2-ps-address', 'beneficiary2-ps-country', 'beneficiary2-ps-zip',
    'beneficiary2-mobile', 'beneficiary2-tel', 'beneficiary2-email'];

	const [formData, setFormData] = useState({});

	useState(() => {
		const initialData = {};
		fields.forEach(field => {
			initialData[field] = '';
		});
		setFormData(initialData);
	});
	
	const handleInputChange = (e) => {
		const { id, value } = e.target;
			setFormData({
			...formData,
			[id]: id.includes('email', 'beneficiary1-email', 'beneficiary2-email') ? value : value.toUpperCase()
		});
	};

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5020/apply', formData);
          if (response.status === 200) {
            const { applicantId } = response.data;
            navigate(`/userProfile?applicantID=${applicantId}`);
          }
        } catch (error) {
          console.error('Error submitting application:', error);
        }
      };

  return (
    <>
      <div className="application-page">
        <p>test</p>
        <main>
          <div className="hero">
              <img src={PruLogo} alt="Pru Life U.K."/>
          </div>
          <div className="banner">
            <div className="banner-left">
              <h1>Individual Application Form</h1>
              <h2>htmlFor Group Term Life Insurance</h2>
            </div>
            <div className="banner-right">
              <p className="reminder">REMINDERS:</p>
              <p>Please use CAPITAL LETTERS.</p>
              <p>Tick the appropriate box to indicate your choice.</p>
              <p>If not applicable, put “N/A” in all empty fields.</p>
              <p>This form should be accompanied by one (1) valid <br />government ID or two (2) valid non-government IDs.</p>
            </div>
            </div>
            <div className="form-container">
              <form onSubmit={handleSubmit} className="employee-form application-form">
              <div className="form-apply">
              <div className="employee">
                <div className="form-hdr">
                  <h2>EMPLOYEE</h2>
                </div>
                <div className="line-1 line">
            	    <div className="fill name-fill">
                    <label htmlFor="fullname">Full Name<span className="required">*</span></label>
                    <input className="name-input" type="text" id="fullname" name="fullname" placeholder="Surname, Given Name, Middle Name" value={formData.fullname} onChange={handleInputChange} required/>
                  </div>
                  <div className="fill salutation-fill">
                    <label htmlFor="salutation">Salutation</label>
                                <input className="salutation-input" type="text" id="salutation" name="salutation" placeholder="Salutation (Mr./Mrs./Miss/etc.)" value={formData.salutation} onChange={handleInputChange}/>
                            </div>
                            <div className="fill alias-fill">
                                <label htmlFor="alias">Other Legal Name/Alias</label>
                                <input className="alias-input" type="text" id="alias" name="alias" placeholder="Other Legal Name/Alias" value={formData.alias} onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="line-2 line">
                            <div className="fill age-fill">
                                <label htmlFor="age">Age<span className="required">*</span></label>
                                <input className="age-input" type="text" id="age" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} required/>
                            </div>
                            <div className="fill bday-fill">
                                <label htmlFor="bday">Birthdate<span className="required">*</span></label>
                                <input className="bday-input" type="date" id="bday" name="bday" placeholder="Birthdate" value={formData.bday} onChange={handleInputChange} required/>
                            </div>
                            <div className="fill bplace-fill">
                                <label htmlFor="bplace">Birthplace<span className="required">*</span></label>
                                <input className="bplace-input" type="text" id="bplace" name="bplace" placeholder="Birthplace" value={formData.bplace} onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="line-3 line">
                            <div className="fill cs-fill">
                                <p>Civil Status<span className="required">*</span></p>
                                    <div className="rdb">
                                        <div className="rdb-left">
                                            <div className="rdb-single radio">
                                                <input type="radio" id="single" name="civil_status" value="S" checked={formData.civil_status === "S"} onChange={handleRadio} required/>
                                                <label htmlFor="single">Single</label>
                                            </div>
                                            <div className="rdb-married radio">
                                                <input type="radio" id="married" name="civil_status" value="M" checked={formData.civil_status === "M"} onChange={handleRadio} required/>
                                                <label htmlFor="married">Married</label>
                                            </div>
                                        </div>
                                        <div className="rdb-right">
                                            <div className="rdb-widowed radio">
                                                <input type="radio" id="widowed" name="civil_status" value="W" checked={formData.civil_status === "W"} onChange={handleRadio} required/>
                                                <label htmlFor="widowed">Widowed</label>
                                            </div>
                                            <div className="rdb-separated radio">
                                                <input type="radio" id="separated" name="civil_status" value="LS" checked={formData.civil_status === "LS"} onChange={handleRadio} required/>
                                                <label htmlFor="separated">Legally Separated</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="fill nationality-fill">
                                <label htmlFor="nationality">Nationality<span className="required">*</span></label>
                                <input className="nationality-input" type="text" id="nationality" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleInputChange} required/>
                            </div>
                            <div className="fill height-fill">
                                <label htmlFor="height">Height<span className="required">*</span></label>
                                <input className="height-input" type="text" id="height" name="height" placeholder="ft' in&#34;" value={formData.height} onChange={handleInputChange} required/>
                            </div>
                            <div className="fill weight-fill">
                                <label htmlFor="weight">Weight<span className="required">*</span></label>
                                <input className="weight-input" type="text" id="weight" name="weight" placeholder="lbs" value={formData.weight} onChange={handleInputChange} required/>
                            </div>
                            <div className="fill sex-fill">
                                <p>Sex<span className="required">*</span></p>
                                <div className="sex-rdb">
                                    <div className="rdb rdb-fem radio">
                                        <input type="radio" id="fem" name="sex" value="F" checked={formData.sex === "F"} onChange={handleRadio} required/>
                                        <label htmlFor="fem">Female</label>
                                    </div>
                                    <div className="rdb rdb-male radio">
                                        <input type="radio" id="male" name="sex" value="M" checked={formData.sex === "M"} onChange={handleRadio} required/>
                                        <label htmlFor="male">Male</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="line-5 line">
                            <div className="ps-address-fill fill">
                                <label htmlFor="ps_address">Present Address<span className="required">*</span></label>
                                <input 
                                    className="ps-adrs-input" 
                                    type="text" 
                                    id="ps_address" 
                                    name="ps_address" 
                                    placeholder="Number, street, municipality/city, province" 
                                    value={psAddress} 
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="ps-country-fill fill">
                                <label htmlFor="ps_country">Country<span className="required">*</span></label>
                                <input 
                                    className="ps-country-input" 
                                    type="text" 
                                    id="ps_country" 
                                    name="ps_country" 
                                    placeholder="Country" 
                                    value={psCountry} 
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="ps-zip-fill fill">
                                <label htmlFor="ps_zip">ZIP Code<span className="required">*</span></label>
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
                                    <label htmlFor="pm_address">Permanent Address<span className="required">*</span></label>
                                    <div className="tick">
                                        <input 
                                            type="checkbox" 
                                            id="same-adrs" 
                                            name="same-adrs" 
                                            checked={tickSameAdrs} 
                                            onChange={checkboxChange}
                                        />
                                        <label htmlFor="same-adrs">Same as present address.</label>
                                    </div>
                                </div>
                                <input className="pm-adrs-input" type="text" id="pm_address" name="pm_address" placeholder="Number, street, municipality/city, province" value={pmAddress} disabled={tickSameAdrs} onChange={handleChange} required/>
                            </div>
                            <div className="pm-country-fill fill">
                                <label htmlFor="pm_country">Country<span className="required">*</span></label>
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
                                <label htmlFor="pm_zip">ZIP Code<span className="required">*</span></label>
                                <input className="pm-zip-input" type="text" id="pm_zip" name="pm_zip" placeholder="ZIP" value={pmZIP} disabled={tickSameAdrs} onChange={handleChange} required/>
                            </div>
                        </div>
                        <div className="line-7 line">
                            <div className="occupation-fill fill">
                                <label htmlFor="occupation">Occupation<span className="required">*</span></label>
                                <input className="occupation-input" type="text" id="occupation" name="occupation" placeholder="State Duties/Rank" value={formData.occupation} onChange={handleInputChange} required/>
                            </div>
                            <div className="position-fill fill">
                                <label htmlFor="position">Position<span className="required">*</span></label>
                                <input className="position-input" type="text" id="position" name="position" placeholder="Position" value={formData.position} onChange={handleInputChange} required/>
                            </div>
                            <div className="work-nature-fill fill">
                                <label htmlFor="workNature">Nature of Work/Business (if self-employed)</label>
                                <input className="work-nature-input" type="text" id="workNature" name="workNature" placeholder="Nature of Work/Business" value={formData.workNature} onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="line-8 line">
                            <div className="sof-fill fill">
                                <p>Source of Funds<span className="required">*</span></p>
                                    <div className="sof">
                                        <div className="sof-left">
                                            <div className="rdb rdb-salary radio">
                                                <input type="radio" id="salary" name="sof" value="Salary" placeholder="Salary RDB" checked={formData.sof === "Salary"} onChange={handleRadio} required/>
                                                <label htmlFor="salary">Salary</label>
                                            </div>
                                            <div className="rdb rdb-business radio">
                                                <input type="radio" id="business" name="sof" value="Business" placeholder="Business RDB" checked={formData.sof === "Business"} onChange={handleRadio} required/>
                                                <label htmlFor="business">Business</label>
                                            </div>
                                        </div>
                                        <div className="sof-right">
                                            <div className="rdb rdb-others radio">
                                                <input type="radio" id="others" name="sof" value="Others" placeholder="Others RDB" checked={formData.sof === "Others"} onChange={handleRadio} required/>
                                                <label htmlFor="sof">Others</label>
                                                <input className="sof-input" type="text" id="sof_text" name="sof_text" placeholder="Source of Funds" value={formData.sof} onChange={handleInputChange}/>
                                            </div>
                                        </div>
                                    </div>
                            </div> 
                            <div className="gai-fill fill">
                                <label htmlFor="gai">Gross Annual Income<span className="required">*</span></label>
                                <input className="gai-input" type="text" id="gai" name="gai" placeholder="Gross Annual Income" value={formData.gai} onChange={handleInputChange} required/>
                            </div>
                            <div className="nw-fill fill">
                                <label htmlFor="nw">Net Worth<span className="required">*</span></label>
                                <input className="nw-input" type="text" id="nw" name="nw" placeholder="Net Worth" value={formData.nw} onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="line-9 line">
                            <div className="fill hired-fill">
                                <label htmlFor="hired">Date Hired<span className="required">*</span></label>
                                <input className="hired-input" type="date" id="hired" name="hired" placeholder="Date Hired" value={formData.hired} onChange={handleInputChange} required/>
                            </div>
                            <div className="fill regular-fill">
                                <label htmlFor="regular">Date of Regularization<span className="required">*</span></label>
                                <input className="regular-input" type="date" id="regular" name="regular" placeholder="Date of Regularization" value={formData.regular} onChange={handleInputChange} required/>
                            </div>
                            <div className="income-fill fill">
                                <label htmlFor="income">Monthly Income<span className="required">*</span></label>
                                <input className="income-input" type="text" id="income" name="income" placeholder="Monthly Income" value={formData.income} onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="form-subhdr">
                            <h3>IDENTIFICATION INFORMATION</h3>
                        </div>
                        <div className="line-10 line">
                            <div className="sss-fill fill">
                                <label htmlFor="sss">SSS/GSIS<span className="required">*</span></label>
                                <input className="sss-input" type="text" id="sss" name="sss" placeholder="SSS/GSIS" value={formData.sss} onChange={handleInputChange} required/>
                            </div>
                            <div className="tin-fill fill">
                                <label htmlFor="tin">TIN<span className="required">*</span></label>
                                <input className="tin-input" type="text" id="tin" name="tin" placeholder="TIN" value={formData.tin} onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="line-11 line">
                            <div className="otherid-fill fill">
                                <label htmlFor="otherid">Other ID #1</label>
                                <input className="otherid-input" type="text" id="otherid" name="otherid" placeholder="ID Name" value={formData.otherid} onChange={handleInputChange}/>                        
                            </div>
                            <div className="otheridnum-fill fill">
                                <label htmlFor="otheridnum">Other ID Number #1</label>
                                <input className="otheridnum-input" type="text" id="otheridnum" name="otheridnum" placeholder="ID Number" value={formData.otheridnum} onChange={handleInputChange}/>
                            </div>
                            <div className="otherid-fill fill">
                                <label htmlFor="otherid2">Other ID #2</label>
                                <input className="otherid-input" type="text" id="otherid2" name="otherid2" placeholder="ID Name" value={formData.otherid2} onChange={handleInputChange}/>                        
                            </div>
                            <div className="otheridnum-fill fill">
                                <label htmlFor="otherid2num">Other ID Number #2</label>
                                <input className="otheridnum-input" type="text" id="otherid2num" name="otherid2num" placeholder="ID Number" value={formData.otherid2num} onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="line-12 line">
                            <div className="mobile-fill fill">
                                <label htmlFor="mobile">Mobile Number<span className="required">*</span></label>
                                <input className="mobile-input" type="text" id="mobile" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleInputChange}/>
                            </div>
                            <div className="tel-fill fill">
                                <label htmlFor="tel">Telephone Number</label>
                                <input className="tel-input" type="text" id="tel" name="tel" placeholder="Telephone Number" value={formData.tel} onChange={handleInputChange}/>
                            </div>
                            <div className="email-fill fill">
                                <label htmlFor="email">Email Address<span className="required">*</span></label>
                                <input className="email-input" type="text" id="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required/>
                            </div>
                        </div>
                    </div>
                <div className="employer">
                    <br /><br />
                    <div className="form-hdr">
                        <h2>EMPLOYER</h2>
                    </div>
                        <div className="line-13 line">
                            <div className="fill name-fill">
                                <label htmlFor="empname">Name of Employer/Name of Business<span className="required">*</span></label>
                                <input className="empname-input" type="text" id="empname" name="employerName" placeholder="Name of Employer/Name of Business" value={formData.empname} onChange={handleInputChange} required/>
                            </div>
                            <div className="fill work-nature-fill">
                                <label htmlFor="empwn">Nature of Work of Employer/Business</label>
                                <input className="empwn" type="text" id="empwn" name="employerWorkNature" placeholder="Nature of Work of Employer/Business" value={formData.empwn} onChange={handleInputChange} required/>
                            </div>
                            <div className="tel-fill fill">
                                <label htmlFor="emptel">Telephone Number<span className="required">*</span></label>
                                <input className="emptel" type="text" id="emptel" name="employerTel" placeholder="Telephone Number" value={formData.emptel} onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="line-14 line">
                            <div className="fill ps-address-fill">
                                <label htmlFor="empadrs">Employer Address/Business Address<span className="required">*</span></label>
                                <input className="empadrs" type="text" id="empadrs" name="employerAdrs" placeholder="Number, street, municipality/city, province" value={formData.empadrs} onChange={handleInputChange} required/>
                            </div>
                            <div className="fill ps-country-fill">
                                <label htmlFor="empcountry">Country<span className="required">*</span></label>
                                <input className="empcountry" type="text" id="empcountry" name="employerCountry" placeholder="Country" value={formData.empcountry} onChange={handleInputChange} required/>
                            </div>
                            <div className="fill ps-zip-fill">
                                <label htmlFor="empzip">ZIP Code<span className="required">*</span></label>
                                <input className="empzip" type="text" id="empzip" name="employerZip" placeholder="ZIP" value={formData.empzip} onChange={handleInputChange} required/>
                            </div>
                        </div>
                    </div>
                    <div className="beneficiary">
                        <br /><br />
                        <div className="form-hdr">
                            <h2>BENEFICIARIES</h2>
                        </div>
                        <div className="form-subhdr">
                            <h3 id="prim">PRIMARY BENEFICIARY</h3>
                        </div>
                            <div className="line-15 line">
                                <div className="fill name-fill">
                                    <label htmlFor="b1name">Full Name<span className="required">*</span></label>
                                    <input className="beneficiary1-name-input" type="text" id="b1name" name="beneficiary1Name" placeholder="Surname, Given Name, Middle Name" value={formData.b1name} onChange={handleInputChange} required/>
                                </div>
                                <div className="fill bday-fill">
                                    <label htmlFor="b1bday">Birthdate<span className="required">*</span></label>
                                    <input className="beneficiary1-bday-input" type="date" id="b1bday" name="beneficiary1Bday" placeholder="Birthdate" value={formData.b1bday} onChange={handleInputChange} required/>
                                </div>
                                <div className="fill sex-fill">
                                    <p>Sex<span className="required">*</span></p>
                                    <div className="sex-rdb">
                                        <div className="rdb rdb-fem radio">
                                            <input type="radio" id="beneficiary1-fem" name="beneficiary1Sex" value="F" onChange={handleRadio} required/>
                                            <label htmlFor="beneficiary1-fem">Female</label>
                                        </div>
                                        <div className="rdb rdb-male radio">
                                            <input type="radio" id="beneficiary1-male" name="beneficiary1Sex" value="M" onChange={handleRadio} required/>
                                            <label htmlFor="beneficiary1-male">Male</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="line-16 line">
                                <div className="fill rel-fill">
                                    <label htmlFor="b1rel">Relationship to Insured<span className="required">*</span></label>
                                    <input className="beneficiary1-relationship-input" type="text" id="b1rel" name="beneficiary1Relationship" placeholder="Relationship to Insured" value={formData.b1rel} onChange={handleInputChange} required/>
                                </div>
                                <div className="fill share-fill">
                                    <label htmlFor="b1share">% Share<span className="required">*</span></label>
                                    <input className="beneficiary1-share-input" type="text" id="b1share" name="beneficiary1Share" placeholder="% Share" value={formData.b1share} onChange={handleInputChange} required/>
                                </div>
                                <div className="fill type-fill">
                                    <p>Type of Beneficiary<span className="required">*</span></p>
                                    <div className="type-rdb">
                                        <div className="rdb rdb-prim radio">
                                            <input type="radio" id="beneficiary1-primary" name="beneficiary1Type" value="P" onChange={handleRadio} required/>
                                            <label htmlFor="beneficiary1-primary">Primary</label>
                                        </div>
                                        <div className="rdb rdb-sec radio">
                                            <input type="radio" id="beneficiary1-secondary" name="beneficiary1Type" value="S" onChange={handleRadio} required/>
                                            <label htmlFor="beneficiary1-secondary">Secondary</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="fill designation-fill">
                                    <p>Beneficiary Designation<span className="required">*</span></p>
                                    <div className="desig-rdb">
                                        <div className="rdb rdb-revo radio">
                                            <input type="radio" id="beneficiary1-revo" name="beneficiary1Designation" value="R" onChange={handleRadio} required/>
                                            <label htmlFor="beneficiary1-revo">Revocable</label>
                                        </div>
                                        <div className="rdb rdb-irrevo radio">
                                            <input type="radio" id="beneficiary1-irrevo" name="beneficiary1Designation" value="I" onChange={handleRadio} required/>
                                            <label htmlFor="beneficiary1-irrevo">Irrevocable</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="line-17 line">
                                <div className="fill bplace-fill">
                                    <label htmlFor="b1bplace">Place of Birth<span className="required">*</span></label>
                                    <input className="beneficiary1-bplace-input" type="text" id="b1bplace" name="beneficiary1Bplace" placeholder="Number, street, municipality/city, province" value={formData.b1bplace} onChange={handleInputChange} required/>
                                </div>
                                <div className="fill nationality-fill">
                                    <label htmlFor="b1nationality">Nationality<span className="required">*</span></label>
                                    <input className="beneficiary1-nationality-input" type="text" id="b1nationality" name="beneficiary1Nationality" placeholder="Nationality" value={formData.b1nationality} onChange={handleInputChange} required/>
                                </div>
                            </div>
                            <div className="line-18 line">
                                <div className="ps-address-fill fill">
                                    <label htmlFor="b1psadrs">Present Address<span className="required">*</span></label>
                                    <input className="beneficiary1-ps-adrs-input" type="text" id="b1psadrs" name="beneficiary1PsAddress" placeholder="Number, street, municipality/city, province" value={formData.b1psadrs} onChange={handleInputChange} required/>
                                </div>
                                <div className="ps-country-fill fill">
                                    <label htmlFor="b1pscountry">Country<span className="required">*</span></label>
                                    <input className="beneficiary1-ps-country-input" type="text" id="b1pscountry" name="beneficiary1PsCountry" placeholder="Country" value={formData.b1pscountry} onChange={handleInputChange} required/>
                                </div>
                                <div className="ps-zip-fill fill">
                                    <label htmlFor="b1pszip">ZIP Code<span className="required">*</span></label>
                                    <input className="beneficiary1-ps-zip-input" type="text" id="b1pszip" name="beneficiary1PsZip" placeholder="ZIP" value={formData.b1pszip} onChange={handleInputChange} required/>
                                </div>
                            </div>
                            <div className="line-19 line">
                                <div className="mobile-fill fill">
                                    <label htmlFor="b1mobile">Mobile Number<span className="required">*</span></label>
                                    <input className="beneficiary1-mobile" type="text" id="b1mobile" name="beneficiary1Mobile" placeholder="Mobile Number" value={formData.b1mobile} onChange={handleInputChange} required/>
                                </div>
                                <div className="tel-fill fill">
                                    <label htmlFor="b1tel">Telephone Number</label>
                                    <input className="beneficiary1-tel-input" type="text" id="b1tel" name="beneficiary1Mobile" placeholder="Telephone Number" value={formData.b1tel} onChange={handleInputChange}/>
                                </div>
                                <div className="email-fill fill">
                                    <label htmlFor="b1email">Email Address<span className="required">*</span></label>
                                    <input className="beneficiary1-email-input" type="text" id="b1email" name="beneficiary1Email" placeholder="Email Address" value={formData.b1email} onChange={handleInputChange} required/>
                                </div>
                            </div>
                        <br />
                        <div className="form-subhdr">
                            <h3>SECONDARY BENEFICIARY</h3>
                        </div>
                        <div className="line-15 line">
                            <div className="fill name-fill">
                                <label htmlFor="b2name">Full Name<span className="required">*</span></label>
                                <input className="beneficiary2-name-input" type="text" id="b2name" name="beneficiary2Name" placeholder="Surname, Given Name, Middle Name" value={formData.b2name} onChange={handleInputChange}/>
                            </div>
                            <div className="fill bday-fill">
                                <label htmlFor="b2bday">Birthdate<span className="required">*</span></label>
                                <input className="beneficiary2-bday-input" type="date" id="b2bday" name="beneficiary2Bday" placeholder="Birthdate" value={formData.b2bday} onChange={handleInputChange}/>
                            </div>
                            <div className="fill sex-fill">
                                <p>Sex<span className="required">*</span></p>
                                <div className="sex-rdb">
                                    <div className="rdb rdb-fem radio">
                                        <input type="radio" id="beneficiary2-fem" name="beneficiary2Sex" value="F" onChange={handleRadio}/>
                                        <label htmlFor="beneficiary2-fem">Female</label>
                                    </div>
                                    <div className="rdb rdb-male radio">
                                        <input type="radio" id="beneficiary2-male" name="beneficiary2Sex" value="M" onChange={handleRadio}/>
                                        <label htmlFor="beneficiary2-male">Male</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="line-16 line">
                            <div className="fill rel-fill">
                                <label htmlFor="b2rel">Relationship to Insured<span className="required">*</span></label>
                                <input className="beneficiary2-relationship-input" type="text" id="b2rel" name="beneficiary2Relationship" placeholder="Relationship to Insured" value={formData.b2rel} onChange={handleInputChange}/>
                            </div>
                            <div className="fill share-fill">
                                <label htmlFor="b2share">% Share<span className="required">*</span></label>
                                <input className="beneficiary2-share-input" type="text" id="b2share" name="beneficiary2Share" placeholder="% Share" value={formData.b2share} onChange={handleInputChange}/>
                            </div>
                            <div className="fill type-fill">
                                <p>Type of Beneficiary<span className="required">*</span></p>
                                <div className="type-rdb">
                                    <div className="rdb rdb-prim radio">
                                        <input type="radio" id="beneficiary2-primary" name="beneficiary2Type" value="P" onChange={handleRadio}/>
                                        <label htmlFor="beneficiary2-primary">Primary</label>
                                    </div>
                                    <div className="rdb rdb-sec radio">
                                        <input type="radio" id="beneficiary2-secondary" name="beneficiary2Type" value="S" onChange={handleRadio}/>
                                        <label htmlFor="beneficiary2-secondary">Secondary</label>
                                    </div>
                                </div>
                            </div>
                            <div className="fill designation-fill">
                                <p>Beneficiary Designation<span className="required">*</span></p>
                                <div className="desig-rdb">
                                    <div className="rdb rdb-revo radio">
                                        <input type="radio" id="beneficiary2-revo" name="beneficiary2Designation" value="R" onChange={handleRadio}/>
                                        <label htmlFor="beneficiary2-revo">Revocable</label>
                                    </div>
                                    <div className="rdb rdb-irrevo radio">
                                        <input type="radio" id="beneficiary2-irrevo" name="beneficiary2Designation" value="I" onChange={handleRadio}/>
                                        <label htmlFor="beneficiary2-irrevo">Irrevocable</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="line-17 line">
                            <div className="fill bplace-fill">
                                <label htmlFor="b2bplace">Place of Birth<span className="required">*</span></label>
                                <input className="beneficiary2-bplace-input" type="text" id="b2bplace" name="beneficiary2Bplace" placeholder="Number, street, municipality/city, province" value={formData.b2bplace} onChange={handleInputChange}/>
                            </div>
                            <div className="fill nationality-fill">
                                <label htmlFor="b2nationality">Nationality<span className="required">*</span></label>
                                <input className="beneficiary2-nationality-input" type="text" id="b2nationality" name="beneficiary2Nationality" placeholder="Nationality" value={formData.b2nationality} onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="line-18 line">
                            <div className="ps-address-fill fill">
                                <label htmlFor="b2psadrs">Present Address<span className="required">*</span></label>
                                <input className="beneficiary2-ps-adrs-input" type="text" id="b2psadrs" name="beneficiary2PsAddress" placeholder="Number, street, municipality/city, province" value={formData.b2psadrs} onChange={handleInputChange}/>
                            </div>
                            <div className="ps-country-fill fill">
                                <label htmlFor="b2pscountry">Country<span className="required">*</span></label>
                                <input className="beneficiary2-ps-country-input" type="text" id="b2pscountry" name="beneficiary2PsCountry" placeholder="Country" value={formData.b2pscountry} onChange={handleInputChange}/>
                            </div>
                            <div className="ps-zip-fill fill">
                                <label htmlFor="b2pszip">ZIP Code<span className="required">*</span></label>
                                <input className="beneficiary2-ps-zip-input" type="text" id="b2pszip" name="beneficiary2PsZip" placeholder="ZIP" value={formData.b2pszip} onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="line-19 line">
                            <div className="mobile-fill fill">
                                <label htmlFor="b2mobile">Mobile Number<span className="required">*</span></label>
                                <input className="beneficiary2-mobile-input" type="text" id="b2mobile" name="beneficiary2Mobile" placeholder="Mobile Number" value={formData.b2mobile} onChange={handleInputChange}/>
                            </div>
                            <div className="tel-fill fill">
                                <label htmlFor="b2tel">Telephone Number</label>
                                <input className="beneficiary2-tel-input" type="text" id="b2tel" name="beneficiary2Tel" placeholder="Telephone Number" value={formData.b2tel} onChange={handleInputChange}/>
                            </div>
                            <div className="email-fill fill">
                                <label htmlFor="b2email">Email Address<span className="required">*</span></label>
                                <input className="beneficiary2-email-input" type="text" id="b2email" name="beneficiary2Email" placeholder="Email Address" value={formData.b2email} onChange={handleInputChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn">
                    <input className="application-btn" type="Submit" defaultValue="SUBMIT" />
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
  )
}

export default Apply;