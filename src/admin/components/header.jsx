import React, { useState } from 'react';
import axios from 'axios';

// Import assets
import PruLogo from '../../assets/pru-logo-test.png';
import UserIcon from '../../assets/user-icon.png';



function Header() {
  return (
    <>
        <header>
            <nav className="navbar">
                <div className="nav">
                    <div className="left-nav">
                        <ul>
                            <li><a href='../pages/entry' className="logo"><img src={PruLogo} alt="Pru Life Logo" className="nav-logo"/></a></li>
                            <li><a href='../pages/entry' className="nav-label">PRU Life U.K.</a></li>
                        </ul>
                    </div>
                    <div className="right-nav">
                        <ul>
                            <li><a href='../pages/login'><img src={UserIcon} alt="User Icon" className="user-icon"/></a></li>
                            <li><a href='../pages/login'>Login</a></li>
                        </ul>
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
