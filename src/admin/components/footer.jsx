import React, { useState } from 'react';
import axios from 'axios';

// Assets
import ribbonFooter from '../../assets/ribbon-footer.png';

function Footer() {
  return (
    <>
        <footer>
            <img className="ribbon-ftr" src={ribbonFooter} alt="Footer"/>
        </footer>
    </>
  )
}

export default Footer;
