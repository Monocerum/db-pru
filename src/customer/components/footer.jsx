import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ribbonFooter from '../../assets/ribbon-footer.png';

import React from 'react';
import axios from 'axios';

function Footer() {
  const [count, setCount] = useState(0)

  return (
    <>
        <footer>
            <img className="ribbon-ftr" src={ribbonFooter} alt="Footer"/>
        </footer>
    </>
  )
}

export default Footer;
