import React, { useContext, useEffect, useState } from 'react';
import '/css/Header.css'
import Logo from '/assets/Logos.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Dropdown} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShopContext } from '../App';
import axios from "axios";
import Logout from './Logout';
import "/css/Logout.css"
import Dropdowns from './Dropdown';
import '/css/Dropdown.css';


const Header = () => {

  const { BottomClickOne,TopClickOne,storedData, setStoredData,UserName,setUserName,users, setUsers, uploadedImage, setUploadedImage,UserId, setUserId } = useContext(ShopContext);

  const [ShowLogOut,setShowLogOut] = useState(false);

    //  const [DisplayUserId, setDisplayUserId] = useState(null);
     const [DisplayUploadedImage, setDisplayUploadedImage] = useState(null); // To display the uploaded image URL

    //  useEffect(()=>{
    //   const storedDataID = localStorage.getItem("UserId");
    //   const storedDataImage = localStorage.getItem("uploadedImage");
    //   // setUserId(storedDataID);
    //   setDisplayUploadedImage(storedDataImage);
    //  },[])
    function HomeClick(){
      TopClickOne.current.classList.remove("topwearClick");
      BottomClickOne.current.classList.remove("bottomwearClick");
  }


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

  const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
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
                        <li id="logo"><Link to="/" onClick={HomeClick}><img src={Logo} alt="" id='logo_image' /></Link></li>
                        <li id="men"><Link to='/' id="men_color" onClick={HomeClick}>Home</Link></li>
                        {/* <li><Dropdowns/></li> */}
                    </ul>
                    {ShowLogOut == true ? (  
                      <div className='LogDiv'>
                        <button onClick={toggleDropdown}>
                        <img src={`${import.meta.env.VITE_BACKEND_URL}${uploadedImage}`} alt="" />
                        </button>
                        {/* <p>{UserName}</p> */}
                        
                        {isOpen && (
                          <div className="dropdown-content">
                             <Logout storedData={storedData} setStoredData={setStoredData}/> 
                          </div>
                        )}
                       
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
