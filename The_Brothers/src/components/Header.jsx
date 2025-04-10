import React, { useContext, useEffect, useState } from 'react';
import '/css/Header.css'
import Logo from '/assets/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShopContext } from '../App';
import axios from "axios";
import Logout from './Logout';
import "/css/Logout.css"


const Header = () => {

  const { UserName,setUserName,users, setUsers, uploadedImage, setUploadedImage,UserId, setUserId } = useContext(ShopContext);

  const [ShowLogOut,setShowLogOut] = useState(false);

 useEffect(() => {

  if(UserId == null){
    setShowLogOut(false);
  }else if(UserId){
    setShowLogOut(true);
  }


}, [UserId]); // Depend on showModal instead

const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to Log out this Account?")) {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    
    }
  };


   
  const lastObject =  users[users.length - 1];


  return (
    <>
    <div className='header'>
      <Container fluid>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
          <nav className="conter_1">

                    <ul>
                        <li id="logo"><img src={Logo} alt="" id='logo_image' /></li>
                        <li id="men"><Link to='/' id="men_color">Home</Link></li>
                    </ul>
                    {ShowLogOut == true ? (  
                      <div className='LogDiv'>
                        <img src={`${import.meta.env.VITE_BACKEND_URL}${uploadedImage}`} alt="" width={50} height={50}  />
                        {/* <p>{UserName}</p> */}
                        <Logout/> 
                      </div>
                      
                    ) :
                   ShowLogOut == false ? (
                        <button className='sin' ><Link to="/add-user"  >Sign In</Link></button>
                   ) : ""
                      }
                </nav>
               
          </Col>
        </Row>
      </Container>
    </div>
    </>
    
  )


}

export default Header
