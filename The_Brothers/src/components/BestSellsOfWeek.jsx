import React, { useContext,useState } from 'react'
import '/css/BestSellsOfWeek.css'
import { ShopContext } from '../App'
import { Link } from 'react-router-dom'
import axios from "axios"


const BestSellsOfWeek = ({BestProduct}) => {
    const { UserId, setUserId,setPickId,cartCollection,setCartCollection,RemoveShoppingCartIcon,AddShoppingCartIcon} = useContext(ShopContext);

    //  const [UserId] = useState("67d2d68a07d12890c143b768"); // Fixed static UserId
         
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
                 setCartCollection(cartCollection.filter((cart) => cart._id !== id));
             } catch (err) {
                 console.error(err.response?.data?.message || "Error removing from cart!");
             } 
            
         };
  return (
    <>
<div key={BestProduct._id}>
 <div className="one_pice">
         <Link to='/ViewDetails' onClick={()=>setPickId(BestProduct._id)}>
         <img src={`${import.meta.env.VITE_BACKEND_URL}${BestProduct.Image}`} alt="" />
         </Link>
         <ul>
         <li className='CartBtnLi'>
              {BestProduct.Type}
              {cartCollection.some((cart) => cart.ProductId === BestProduct._id) ? (
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
                <button onClick={() => addToCart(BestProduct)} className='addToCart'><AddShoppingCartIcon /></button>
              )}
            </li>
             <li className='rsOffers'><div>Rs.{BestProduct.Price}
                <span className='rupe' style={{ textDecoration:"line-through" }}>  Rs.{BestProduct.Mrp}</span>
                </div>
                 <span className='Off'> {BestProduct.Offer}% OFF</span>
                </li>
         </ul>
     </div> 
     </div>

  
    </>
  )
}

export default BestSellsOfWeek
