import React, { useContext,useState } from 'react'
import { ShopContext } from '../App'
import axios from "axios"

const AddCartPants = ({PantsProduct}) => {
   const {cartCollection,setCartCollection,RemoveShoppingCartIcon,AddShoppingCartIcon} = useContext(ShopContext);
  
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

<div key={PantsProduct._id}>
    <div className="one_pice">
        <img src={PantsProduct.Image} alt="" />
        <ul>
        <li className='CartBtnLi'>
              {PantsProduct.Type}
              {cartCollection.some((cart) => cart.ProductId === PantsProduct._id) ? (
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
                <button onClick={() => addToCart(PantsProduct)} className='addToCart'><AddShoppingCartIcon /></button>
              )}
            </li>
            <li>Rs.{PantsProduct.Price}
               <span style={{ textDecoration:"line-through", color:"#000" }}> M.R.P : Rs.{PantsProduct.Mrp}</span>
                <span className='Off'> {PantsProduct.Offer}% OFF</span>
               </li>
        </ul>
    </div>      
    </div>

    </>
  )
}

export default AddCartPants
