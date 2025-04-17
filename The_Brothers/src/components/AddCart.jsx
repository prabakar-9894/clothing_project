import React, { useState,useContext,useEffect,useRef, use } from 'react'
import { ShopContext } from '../App';
import AddCartView from './AddCartView';
import '/css/AddCartTable.css'
import { Container, Row, Col } from 'react-bootstrap';
import ProductNotFoundImg from '/assets/pro_img_2.png' 
import '/css/ProductNotFoundImg.css'
import AdderPlace from './AdderPlace';

const AddCart = () => {
    
    const { FilterCart,setFilterCart,cartCollection,setCartCollection,UserId, setUserId } = useContext(ShopContext);
    const [total,setTotal] = useState(0);
    
    const[AllTotal,setAllTotal] = useState();

    const AllTable = useRef(null)
    const AllProductNot = useRef(null)

    useEffect(()=>{
      
        setTotal(FilterCart.reduce((allTotals,currentPrice)=>allTotals+parseInt(currentPrice.Price),0));
        
        if(FilterCart.length > 0){ 
            AllTable.current.classList.add("tableAlls");
            AllProductNot.current.classList.add("AllProductNotFoud");
        }else if(FilterCart.length === 0){
            AllTable.current.classList.remove("tableAlls");
            AllProductNot.current.classList.remove("AllProductNotFoud");
        }
        setAllTotal(50+total);
      },[FilterCart,total])

      const [AllCartStored,SetAllCartStored] = useState([]);


  return (
    <>
<div className='CartNotDisplayAll' ref={AllProductNot}>
<div className="CartNotDisplay">
  <Container>
    <Row>
    <Col lg={12} md={12} sm={12} xs={12}>
    <div className='ProNotShowDisplay'>
      <h1> Product Not Found</h1> 
      <div className='ImgNot'>
        <img className='ProductNotFoundImg' src={ProductNotFoundImg} width={300} alt="" />
      </div>
    </div>
    </Col>
    </Row>
  </Container>
</div>
</div>



<div className="all-cart" ref={AllTable}>
  <table className="cart-table">
    <thead className="cart-header">
      <tr>
        <th className="header-product">Product</th>
        <th className="header-quantity">Quantity</th>
        <th className="header-remove">Remove Cart</th>
        <th className="header-price">Price</th>
      </tr>
    </thead>
    {FilterCart.map((product) => (
      <tbody key={product._id} className="cart-body">
        <tr className="cart-row">
          <AddCartView product={product} allTables={AllTable} AllCartStored={AllCartStored} SetAllCartStored={SetAllCartStored} />
        </tr>
      </tbody>
    ))}
    <tbody className="cart-footer">
      <tr className="total-row">
        <td className="footer-empty" colSpan={2}></td>
        <td className="footer-label">Total Price</td>
        <td className="footer-price"><span>Rs.</span>{total}</td>
      </tr>
    </tbody>
  </table>

<div className="AdderPlace">
  <table className="cartTable">
    <tbody>
      <tr>
        <td className='cartTableTd'><h3>Cart Total</h3></td>
      </tr>
      <tr>
        <td><p>Subtotal</p></td><td className='cartTableTdRight'><p><span>Rs</span>.{total}</p></td>
      </tr>
      <tr>
        <td><p>Delivery Fee</p></td><td className='cartTableTdRight'><p><span>Rs</span>.50</p></td>
      </tr>
      <tr>
        <td className='cartTableTd'><h5>Total</h5></td><td className='cartTableTdRight RightTable'><h5><span>Rs</span>.{AllTotal}</h5></td>
      </tr>
      <tr>
        
      </tr>
    </tbody>
  </table>
  <AdderPlace />
</div>


</div>
    </>
  )
}

export default AddCart

