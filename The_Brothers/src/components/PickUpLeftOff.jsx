
import React, { useContext,useEffect,useState } from 'react'
import '/css/PickUpLeftOff.css'
import { ShopContext } from '../App';
import { Link } from 'react-router-dom';
import axios from "axios";

const PickUpLeftOff = ({ PickProduct }) => {
    const { cartAllStore,setCartAllStore,UserId, setUserId,cartCollection,setCartCollection,setPickId,RemoveShoppingCartIcon,AddShoppingCartIcon} = useContext(ShopContext);



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


    

    const RemoveCart = async (id) => {
      console.log("Removing cart item with ID:", id); // Debugging
     
      try {
          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${id}`);
          setCartCollection((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
          console.error(err.response?.data?.message || "Error removing from cart!");
      }
   
  };
  

    return (
      <div>
        <div className="one_pice" key={PickProduct._id}>
        <Link to='/ViewDetails' onClick={()=>setPickId(PickProduct._id)}>
        <img src={`${import.meta.env.VITE_BACKEND_URL}${PickProduct.Image}`} alt="img" />
        </Link>
        <ul>

        <li className='CartBtnLi'>
              {PickProduct.Type}
              {cartCollection.some((cart) => cart.ProductId === PickProduct._id) ? (
              cartCollection.map((cartproId) => (
                <button
                    key={cartproId._id} // React uses this to uniquely identify each DOM element
                    className="RemoveCart"
                    disabled={cartproId._id}
                    onClick={() => RemoveCart(cartproId._id)}>
                    <RemoveShoppingCartIcon />
                </button>
              ))

                ) : (
                <button onClick={() => addToCart(PickProduct)} className='addToCart'><AddShoppingCartIcon /></button>
                )}

            </li>

            <li className='rsOffers'><div>Rs.{PickProduct.Price}
                <span className='rupe' style={{ textDecoration:"line-through" }}>  Rs.{PickProduct.Mrp}</span>
                </div>
                 <span className='Off'> {PickProduct.Offer}% OFF</span>
                </li>
        </ul>
        </div>
      </div>
    );
  };
  export default PickUpLeftOff



 








