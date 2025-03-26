import React, { useContext,useState } from 'react'
import '/css/TopOfTheDay.css'
import { ShopContext } from '../App'
import { Link } from 'react-router-dom';
import axios from "axios"

const TopOfTheDay = ({TopProduct}) => {
    const {setPickId,cartCollection,setCartCollection,RemoveShoppingCartIcon,AddShoppingCartIcon} = useContext(ShopContext);

   const [UserId] = useState("67d2d68a07d12890c143b768"); // Fixed static UserId
     
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
           setCartCollection([...cartCollection, response.data.cartsProduct]); // Fix response object
          
         } catch (err) {
           alert(err.response?.data?.message || "Something went wrong!");
         }
       };
     
       const RemoveCart = async (id) => {
         try {
           await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${id}`);
           setCartCollection(cartCollection.filter((cart) => cart.ProductId !== id));
         } catch (err) {
           console.log(err.response?.data?.message || "Error removing from cart!");
         }
       };

  return (
    <>
 
<div  key={TopProduct._id}>
<div className="one_pice">
         <Link to='/ViewDetails' onClick={()=>setPickId(TopProduct._id)}>
         <img src={`${import.meta.env.VITE_BACKEND_URL}${TopProduct.Image}`} alt="" />
         </Link>
         <ul>
         <li className='CartBtnLi'>
              {TopProduct.Type}
              {cartCollection.some((cart) => cart.ProductId === TopProduct._id) ? (
                   cartCollection.map((cartProId)=>(
                    <button
                    key={cartProId._id}
                  className="RemoveCart"
                  disabled={cartProId._id}
                  onClick={() => RemoveCart(cartProId._id)}
              >
                   <RemoveShoppingCartIcon />
              </button>
                  ))
              ) : (
                <button onClick={() => addToCart(TopProduct)} className='addToCart'><AddShoppingCartIcon /></button>
              )}
            </li>
             <li>Rs.{TopProduct.Price}
                <span style={{ textDecoration:"line-through", color:"#000" }}> M.R.P : Rs.{TopProduct.Mrp}</span>
                 <span className='Off'> {TopProduct.Offer}% OFF</span>
                </li>
         </ul>
     </div>       
</div>
  



    </>
  )
}

export default TopOfTheDay






