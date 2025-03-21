import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '/css/Categories.css'
import { Link } from 'react-router-dom'
import CategorieImgOne from '../assets/men_cat_img.webp'
import CategorieImgTwo from '../assets/JBL07470.jpg'
import CategorieImgThree from '../assets/kids_cat_img.avif'

const Categories = () => {
  return (
    <>
    <div className="categories">
    <h2>Categories</h2>
        <Container fluid>
            <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
                 <div className="center_4">
                    <div id="colletions" className="card">
                        <Link to='/AddTShirt'>
                        <img src={CategorieImgOne} alt="" />
                        </Link>
                        <ul>
                            <li className="four"><h5>MEN</h5></li>
                        </ul>
                    </div>
                    <div id="colletions" className="card">
                        <Link to='/AddHoodies'>
                        <img src={CategorieImgTwo} alt="" />
                        </Link>
                        <ul>
                            <li className="four"><h5>WOMEN</h5></li>
                        </ul>
                    </div>
                    <div id="colletions" className="card">
                        <Link to='/AddPants'>
                        <img src={CategorieImgThree} alt="" />
                        </Link>
                        <ul>
                            <li className="four"><h5>KIDS</h5></li>
                        </ul>
                    </div>
                </div>
            </Col>
            </Row>
        </Container>
    </div>
        
    </>
  )
}

export default Categories
