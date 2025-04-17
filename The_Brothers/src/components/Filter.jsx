import React, { useContext, useRef } from 'react'
import '/css/filter.css'
import { Container, Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShopContext } from '../App';


const Filter = () => {

    const { BottomClickOne,TopClickOne,FilterCart } = useContext(ShopContext);


    $(document).ready(function(){

        $('.topwear').mouseover(function(){
            $('#dropdown_menu_1').show();
    
        });
        $('.topwear').mouseout(function(){
            $('#dropdown_menu_1').hide();
        });
    
    
        $('.bottomwear').mouseover(function(){
            $('#dropdown_menu_2').show();
        });
        $('.bottomwear').mouseout(function(){
            $('#dropdown_menu_2').hide();
        });
    
    
        $('.themes').mouseover(function(){
            $('#dropdown_menu_3').show();
        });
        $('.themes').mouseout(function(){
            $('#dropdown_menu_3').hide();
        });

    
    });


    function TopClick(){
        TopClickOne.current.classList.add("topwearClick");
        BottomClickOne.current.classList.remove("bottomwearClick");
    }
    function BottomClick(){
        TopClickOne.current.classList.remove("topwearClick");
        BottomClickOne.current.classList.add("bottomwearClick");
    }
  


  return (
      <>
      <div className="filter">
        <Container fluid>
            <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
            <nav className="conter_2">
                    <ul>
                       
                        <li className="topwear" ref={TopClickOne} onClick={TopClick}><Link to='/TopWear' id="dropdown_1">Topwear</Link>
                           
                        </li>
                        <li className="bottomwear" ref={BottomClickOne} onClick={BottomClick}><Link to='/BottomWear' id="dropdown_2">Bottomwear</Link>
                            
                        </li>
                
                       
                    </ul>
                    <div className="search_and_cart" >
                      
                        <Link to='/AddCart' id="add_cart" >Cart<span className='countcart'>{FilterCart.length}</span></Link>
                    </div>
                </nav>
            </Col>
            </Row>
        </Container>
      </div>
      </>
)
}

export default Filter
