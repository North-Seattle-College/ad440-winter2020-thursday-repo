import React from 'react';
//import ReactLogo from './React-icon.svg'
import './Footer.css'

export default function Footer() {
  return(
    <footer>
      <div className='flex-react-logo'>
        <p className='flex-react-logo'>Developed using</p>
        <a href='https://reactjs.org/' target="_blank">
          <img  alt='React logo' className='react-logo' />
        </a>
      </div>
      <div className='flex-license'>
        <p className='flex-license'>Our code released under</p>
        <a href='https://www.apache.org/licenses/LICENSE-2.0' target="_blank">
          Apache 2.0 license
        </a>
      </div>
    </footer>
  );
}
