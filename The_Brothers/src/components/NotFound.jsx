import React from 'react'
import proimg from '/assets/pro_img_2.png';
import '/css/TopWear.css';
import '/css/NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
    <div className='AllProNotFound'>
        <div className='NoProducts'>
            <img src={proimg} alt="" />
        </div>
        <div>
            <p className='NotFonText'>Unfortunately the page you are looking for has been <br /> moved or deleted</p>
        </div>
        <Link to="/">Go Home</Link>
    </div>
    </>
  )
}

export default NotFound
