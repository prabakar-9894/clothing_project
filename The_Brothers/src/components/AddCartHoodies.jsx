import React, { useContext,useState } from 'react'
import { ShopContext } from '../App'
import axios from "axios"


const AddCartHoodies = ({HoodieProduct}) => {

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

<div key={HoodieProduct._id}>
    <div className="one_pice">
        <img src={HoodieProduct.Image} alt="" />
        <ul>
        <li className='CartBtnLi'>
              {HoodieProduct.Type}
              {cartCollection.some((cart) => cart.ProductId === HoodieProduct._id) ? (
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
                <button onClick={() => addToCart(HoodieProduct)} className='addToCart'><AddShoppingCartIcon /></button>
              )}
            </li>
            <li>Rs.{HoodieProduct.Price}
               <span style={{ textDecoration:"line-through", color:"#000" }}> M.R.P : Rs.{HoodieProduct.Mrp}</span>
                <span className='Off'> {HoodieProduct.Offer}% OFF</span>
               </li>
        </ul>
    </div>      
    </div>

     
    </>
  )
}

export default AddCartHoodies
