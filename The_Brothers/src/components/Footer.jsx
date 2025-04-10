import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Logo from '/assets/logo.png'
import '/css/Footer.css'

const Footer = () => {
  return (
    <>
      <div className='Footer'>
        <Container fluid>
            <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
            <div className='footerContainer'>
                <ul>
                    <li className='LogoAndName'><img src={Logo} className='LogoImg' alt="" /><h3>The<br/>Brothers</h3></li>
                    <li>Start Up Company</li>
                    <li>From Thanjavur</li>
                </ul>
                <ul>
                    <li><h3>Company</h3></li>
                    <li><a href="*">About Us</a></li>
                    <li><a href="*">Career</a></li>
                    <li><a href="*">Team</a></li>
                    <li><a href="*">Privacy Policy</a></li>
                    <li><a href="*">Cookie Policy</a></li>
                </ul>
                <ul>
                    <li><h3>Contact us</h3></li>
                    <li><LocationOnIcon/>Thanjavur</li>
                    <li><PhoneIcon/>8585858585</li>
                    <li><EmailIcon/>Brothers@gmail.com</li>
                    <li><a href="*">Partner with us</a></li>
                    <li><InstagramIcon/><FacebookIcon/><LinkedInIcon/><TwitterIcon/></li>
                </ul>
                <ul>
                    <li><h3>Branches</h3></li>
                    <li>Chennai</li>
                    <li>Coimbatore</li>
                    <li>Salem</li>
                    <li>Thanjavur</li>
                    <li>Trichy </li>
                </ul>
            </div>
            </Col>
            </Row>
        </Container>
      </div>
    </>
  )
}

export default Footer
