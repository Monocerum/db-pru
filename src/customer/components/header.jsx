import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

// Assets
import PruLogo from '../../assets/pru-logo-test.png';
import UserIcon from '../../assets/user-icon.png';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = location.pathname === '/apply' || location.pathname === '/userProfile' || location.pathname === '/beneficiaryProfile';
  const isAuthPage = location.pathname === '/register' || location.pathname === '/login';

  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  
  return (
    <>
        <header>
            <nav className="navbar">
                <div className="nav">
                    <div className="left-nav">
                        <ul>
                            <li><Link to='/' className="logo"><img src={PruLogo} alt="Pru Life Logo" className="nav-logo"/></Link></li>
                            <li><Link to='/' className="nav-label">PRU Life U.K.</Link></li>
                        </ul>
                    </div>
                    <div className="right-nav">
                        {!isAuthPage && (
                            <ul>
                                {isAuthenticated ? (
                                    <>
                                    {/* <li><Link to='/userProfile' className="user-icon"><img src={UserIcon} alt="User Icon" className="user-icon"/></Link></li> */}
                                    <li><button className="logout" onClick={handleLogout}>Logout</button></li>
                                    </>
                                ) : (
                                    <>
                                    <li><Link to='/login' className="user-icon"><img src={UserIcon} alt="User Icon" className="user-icon"/></Link></li>
                                    <li><Link to='/login' className="login">Login</Link></li>
                                    </>
                                )}
                            </ul>
                        )}
                    </div>
                    {/* If nakalog-in, 'yung lalabas kapag clinick user icon is 'yung user profile; if hindi nakalog-in, redirect sa login page.
                    If nakalog-in, 'yung nakasulat sa "login" na part is 'yung username ng user, if hindi, 'yung nakalagay is login. */}
                </div>
            </nav>
        </header>
    </>
  )
}

export default Header;
