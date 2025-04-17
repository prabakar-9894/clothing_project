import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { ShopContext } from '../App';
import { Container, Row,Col } from 'react-bootstrap';
import '/css/ViewDetials.css';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import proimg from '/assets/pro_img_2.png';
import '/css/TopWear.css';

const PickView = () => {
    const {UserId,RemoveShoppingCartIcon,AddShoppingCartIcon,PickId,AllProductsCollection,FilProductPick,setFilProductPick,cartCollection,setCartCollection} = useContext(ShopContext);

    const [pickOne,setPickOne] = useState(true);
    const [pickTwo,setPickTwo] = useState(false);
    const [pickThree,setPickThree] = useState(false);
    // const [FilProductPickFilter,setFilProductPickFilter] = useState();

    function PickOne(){
        setPickOne(true);
        setPickTwo(false);
        setPickThree(false);
    }
    function PickTwo(){
        setPickOne(false);
        setPickTwo(true);
        setPickThree(false);
    }
    function PickThree(){
        setPickOne(false);
        setPickTwo(false);
        setPickThree(true);
    }

       useEffect(() => {
                setFilProductPick(AllProductsCollection.filter((u) => u._id === PickId));
           
        }, [PickId, AllProductsCollection]);

        
        $(document).ready(function(){
            $('.Size-S').click(function(){
                $('.Size-S').css('background-color','#8da700');
                $('.Size-M').css('background-color','#fff');
                $('.Size-L').css('background-color','#fff');
                $('.Size-XL').css('background-color','#fff');
                $('.Size-S').css('color','#fff');
                $('.Size-L').css('color','#000');
                $('.Size-M').css('color','#000');
                $('.Size-XL').css('color','#000');
            });
    
            $('.Size-M').click(function(){
                $('.Size-S').css('background-color','#fff');
                $('.Size-M').css('background-color','#8da700');
                $('.Size-L').css('background-color','#fff');
                $('.Size-XL').css('background-color','#fff');
                $('.Size-M').css('color','#fff');
                $('.Size-L').css('color','#000');
                $('.Size-S').css('color','#000');
                $('.Size-XL').css('color','#000');
            })
    
            $('.Size-L').click(function(){
                $('.Size-S').css('background-color','#fff');
                $('.Size-M').css('background-color','#fff');
                $('.Size-L').css('background-color','#8da700');
                $('.Size-XL').css('background-color','#fff');
                $('.Size-L').css('color','#fff');
                $('.Size-M').css('color','#000');
                $('.Size-S').css('color','#000');
                $('.Size-XL').css('color','#000');
            })
    
            $('.Size-XL').click(function(){
                $('.Size-S').css('background-color','#fff');
                $('.Size-M').css('background-color','#fff');
                $('.Size-L').css('background-color','#fff');
                $('.Size-XL').css('background-color','#8da700');
                $('.Size-XL').css('color','#fff');
                $('.Size-M').css('color','#000');
                $('.Size-S').css('color','#000');
                $('.Size-L').css('color','#000');
            })
        })

            const addToCart = async (pro) => {
        
        
              const newCartItem = {
                userId: UserId,
                ProductId: pro._id,
                Image: pro.Image,
                PricePerUnit: pro.Price, // Use PricePerUnit for accurate calculation
                Name: pro.Type,
                Quantity: 1 // Default quantity for new cart items
              };
          
              try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/carts`, newCartItem);
                setCartCollection((prev) => [...prev, response.data.cartsProduct]);
        
        
               
              } catch (err) {
                alert(err.response?.data?.message || "Something went wrong!");
              }
            };

        

  return (
    <>
      <div className="body_1">
    <Container fluid>
{ FilProductPick.length === 0 ? (
        <div className='NoProducts'>
            <img src={proimg} alt="" />
        </div>
) : (

     FilProductPick.map((prods)=> (
                <Row key={prods.Id}>
        <Col lg={6} md={6} sm={6} xs={12}>
            <div className="left_1">
               
                    <div className='bigImg'>
                        { pickOne === true ? <img src={`${import.meta.env.VITE_BACKEND_URL}${prods.Image}`} alt="" /> : 
                        pickTwo === true ? <img src={`${import.meta.env.VITE_BACKEND_URL}${prods.img2}`} alt="" /> :
                        pickThree === true ? <img src={`${import.meta.env.VITE_BACKEND_URL}${prods.img3}`} alt="" />:""}
                </div>
                <div className="sub_img_1">
                    <img onClick={PickOne} src={`${import.meta.env.VITE_BACKEND_URL}${prods.Image}`} alt="" />
                    { prods.img2 &&  (
                         <img onClick={PickTwo} src={`${import.meta.env.VITE_BACKEND_URL}${prods.img2}`} alt="" />
                    )}
                    {prods.img3 && (
                         <img onClick={PickThree} src={`${import.meta.env.VITE_BACKEND_URL}${prods.img3}`} alt=""  />
                    )}
        
                </div>
    
            </div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
        <div className="right_1">
                    <ul>
                        <li><h1>{prods.Type}</h1></li>
                        <li>
                            <div className='RatingDiv'>
                                <h3>Rating</h3>
                                <Stack spacing={1}>
                                <Rating name="size-medium" defaultValue={2} />
                                </Stack>
                            </div>
                        </li>
                        <li><hr /></li>
                        
                        <li className='Prodails'><h2>Product details</h2></li>
                        <li className='Prodails'><h4>Material composition :</h4> Cotton Blend</li>
                        <li className='Prodails'><h4>Length :</h4>Standard Length</li>
                        <li className='Prodails'><h4>Neck style :</h4>Collared Neck</li>
                        <li className='Prodails'><h4>Country of Origin :</h4>India</li>
                        
                        <li><hr /></li>

                        <li><h5>Size</h5></li>
                        <li>
                            <button className='Size-S'>S</button><button className='Size-M'>M</button>
                            <button className='Size-L'>L</button><button className='Size-XL'>XL</button></li>
                        <li><hr /></li>
                        <li><button className='DealBtn'>Limited time deal</button></li>
                        <li><p>M.R.P : <span className='RateCros' > Rs . 1799.00 </span><br /><span> Rs . {prods.Price}.00</span><span className='sales' >sale</span></p></li>
                        <li><h1 className='Off'>50%</h1></li>

                        <li>
              {cartCollection.some((cart) => cart.ProductId === prods._id) ? (
           
                <button
                    
                    className="RemoveViewCarts"
                    disabled
                    
                    >
                    <RemoveShoppingCartIcon />
                </button>
            //   ))

                ) : (
                <button onClick={() => addToCart(prods)} className='AddViewCarts'><AddShoppingCartIcon/></button>
                )}
                        </li>
                        <li><hr /></li>

                        <li className='AllDelivery'>
                            <div className='Delivery'>
                            <CurrencyExchangeIcon/><br />
                            10 days Return <br/> & Exchange
                            </div>
                            <div className='Delivery'>
                                <PaymentIcon/><br />
                            Pay on Delivery
                            </div>
                            <div className='Delivery'>
                                <LocalShippingIcon/><br />
                            Free Delivery
                            </div>
                            <div className='Delivery'>
                                <EmojiEventsIcon/><br />
                            Top Brand
                            </div>
                        </li>
                        
                    </ul>
                </div>
        </Col>
        </Row> )))}
    </Container>
</div>
    </>

  )
}

export default PickView
