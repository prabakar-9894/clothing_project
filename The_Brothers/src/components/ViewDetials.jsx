import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../App';
import { Container, Row,Col } from 'react-bootstrap';
import '/css/ViewDetials.css';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


const ViewDetials = () => {

    const {TopId,BestId,TopDay,PickId,BestSells,PickUp,FilProductPick,setFilProductPick,FilProductTop,FilProductBest,setFilProductTop,setFilProductBest} = useContext(ShopContext);


    useEffect(() => {
        if(PickId && PickUp){
            setFilProductPick(PickUp.filter((u) => u.Id === PickId));
        }
        else if (TopId && TopDay) {
            setFilProductTop(TopDay.filter((p) => p.Id === TopId));
        }
        else if (BestId && BestSells) {
            setFilProductBest(BestSells.filter((e) => e.Id === BestId)); 
        }
    }, [PickId, TopId, BestId, PickUp, TopDay, BestSells]);


    console.log('FilProductPick',FilProductPick);
    console.log('FilProductTop',FilProductTop);
    console.log('FilProductBest',FilProductBest);


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


  return (
    <>

<div className="body_1">
    <Container>
    { FilProductPick.length > 0 && FilProductPick.length <=3 ? (
            FilProductPick.map((prods)=> (
                <Row key={prods.Id}>
        <Col lg={6} md={6} sm={6} xs={12}>
        <div className="left_1">
                <div className='bigImg'>
                <img src={prods.Image} alt="" />
                </div>
                <div className="sub_img_1">
                    <img className='smallImg' src={prods.Image} alt="" />
                    <img src={prods.Image} alt=""  />
                </div>
            </div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
        <div className="right_1">
                    <ul>
                        <li><h1>ONE PIECE EMBROIDERY <br /> SWEATSHIRT</h1></li>
                        <li>
                            <div className='RatingDiv'>
                                <h3>Rating</h3>
                                <Stack spacing={1}>
                                <Rating name="size-medium" defaultValue={2} />
                                </Stack>
                            </div>
                        </li>
                        <li><hr /></li>
                        <li><h5>Size</h5></li>
                        <li>
                            <button className='Size-S'>S</button><button className='Size-M'>M</button>
                            <button className='Size-L'>L</button><button className='Size-XL'>XL</button></li>
                        <li><hr /></li>
                        <li><button className='DealBtn'>Limited time deal</button></li>
                        <li><p>M.R.P : <span className='RateCros' > Rs . 1799.00 </span><br /><span> Rs . {prods.Price}.00</span><span className='sales' >sale</span></p></li>
                        <li><h1 className='Off'>50%</h1></li>
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
                        <li><hr /></li>
                        <li className='Prodails'><h2>Product details</h2></li>
                        <li className='Prodails'><h4>Material composition :</h4> Cotton Blend</li>
                        <li className='Prodails'><h4>Length :</h4>Standard Length</li>
                        <li className='Prodails'><h4>Neck style :</h4>Collared Neck</li>
                        <li className='Prodails'><h4>Country of Origin :</h4>India</li>
                    </ul>
                </div>
        </Col>
        </Row> )))
        :
    FilProductTop.length >= 4 && FilProductTop.length <=6  ? (
     FilProductTop.map((products)=>(
        <Row key={products.Id}>
        <Col lg={6} md={6} sm={6} xs={12}>
            <div className="left_1">
                <div className='bigImg'>
                <img src={products.Image} alt="" />
                </div>
                <div className="sub_img_1">
                    <img className='smallImg' src={products.Image} alt="" />
                    <img src={products.Image} alt=""  />
                </div>
            </div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
        <div className="right_1">
                    <ul>
                        <li><h1>ONE PIECE EMBROIDERY <br /> SWEATSHIRT</h1></li>
                        <li>
                            <div className='RatingDiv'>
                                <h3>Rating</h3>
                                <Stack spacing={1}>
                                <Rating name="size-medium" defaultValue={2} />
                                </Stack>
                            </div>
                        </li>
                        <li><hr /></li>
                        <li><h5>Size</h5></li>
                        <li>
                            <button className='Size-S'>S</button><button className='Size-M'>M</button>
                            <button className='Size-L'>L</button><button className='Size-XL'>XL</button></li>
                        <li><hr /></li>
                        <li><button className='DealBtn'>Limited time deal</button></li>
                        <li><p>M.R.P : <span className='RateCros' > Rs . 1799.00 </span><br /><span> Rs . {products.Price}.00</span><span className='sales' >sale</span></p></li>
                        <li><h1 className='Off'>50%</h1></li>
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
                        <li><hr /></li>
                        <li className='Prodails'><h2>Product details</h2></li>
                        <li className='Prodails'><h4>Material composition :</h4> Cotton Blend</li>
                        <li className='Prodails'><h4>Length :</h4>Standard Length</li>
                        <li className='Prodails'><h4>Neck style :</h4>Collared Neck</li>
                        <li className='Prodails'><h4>Country of Origin :</h4>India</li>
                    </ul>
                </div>
        </Col>
        </Row>
        ))) 
        : 
        FilProductBest.length >= 7 && FilProductBest.length  <= 9  ? (
            FilProductBest.map((pro)=> (
                <Row key={pro.Id}>
        <Col lg={6} md={6} sm={6} xs={12}>
        <div className="left_1">
                <div className='bigImg'>
                <img src={pro.Image} alt="" />
                </div>
                <div className="sub_img_1">
                    <img className='smallImg' src={pro.Image} alt="" />
                    <img src={pro.Image} alt=""  />
                </div>
            </div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
        <div className="right_1">
                    <ul>
                        <li><h1>ONE PIECE EMBROIDERY <br /> SWEATSHIRT</h1></li>
                        <li>
                            <div className='RatingDiv'>
                                <h3>Rating</h3>
                                <Stack spacing={1}>
                                <Rating name="size-medium" defaultValue={2} />
                                </Stack>
                            </div>
                        </li>
                        <li><hr /></li>
                        <li><h5>Size</h5></li>
                        <li>
                            <button className='Size-S'>S</button><button className='Size-M'>M</button>
                            <button className='Size-L'>L</button><button className='Size-XL'>XL</button></li>
                        <li><hr /></li>
                        <li><button className='DealBtn'>Limited time deal</button></li>
                        <li><p>M.R.P : <span className='RateCros' > Rs . 1799.00 </span><br /><span> Rs . {pro.Price}.00</span><span className='sales' >sale</span></p></li>
                        <li><h1 className='Off'>50%</h1></li>
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
                        <li><hr /></li>
                        <li className='Prodails'><h2>Product details</h2></li>
                        <li className='Prodails'><h4>Material composition :</h4> Cotton Blend</li>
                        <li className='Prodails'><h4>Length :</h4>Standard Length</li>
                        <li className='Prodails'><h4>Neck style :</h4>Collared Neck</li>
                        <li className='Prodails'><h4>Country of Origin :</h4>India</li>
                    </ul>
                </div>
        </Col>
        </Row>
        ))) : 
         (
            <h1>Product Not Found</h1>
        )
         
}
    </Container>
</div>






    </>
  )
}

export default ViewDetials;