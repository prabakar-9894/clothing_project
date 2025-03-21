import React, { useContext,useState } from 'react'
import { ShopContext } from '../App'
import '/css/AddCartTable.css'
import axios from "axios";

const AddCartView = ({ product }) => {

    const {  setCartCollection } = useContext(ShopContext);
    const [loading, setLoading] = useState(false);
    
    const updateCartQuantity = async (id, newQuantity) => {
        try {
          const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${id}`, { Quantity: newQuantity });
          setCartCollection((prev) =>
            prev.map((item) => (item._id === id ? { ...item, Quantity: newQuantity, Price: response.data.updatedCart.Price } : item))
          );
          
        } catch (error) {
          alert(error.response?.data?.message || "Error updating quantity!");
        }
      };
    
      const handleDelete = async (id) => {
        try {
          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${id}`);
          setCartCollection((prev) => prev.filter((item) => item._id !== id));
          
        } catch (error) {
          alert(error.response?.data?.message || "Error removing from cart!");
        }
      };
    

    return (
        <>


<td className="td_2">
  <img src={product.Image} alt={product.Type} className="product-image" /> 
</td>

<td className="td_4">
  <button 
    className="decrement-button" 
    onClick={() => updateCartQuantity(product._id, product.Quantity - 1)} 
    disabled={loading || product.Quantity === 1}>
    -
  </button>
  <span className="product-quantity">{product.Quantity}</span>
  <button 
    className="increment-button" 
    onClick={() => updateCartQuantity(product._id, product.Quantity + 1)} 
    disabled={loading}>
    +
  </button>
</td>
<td className="td_5">
  <button className="remove-button" onClick={() => handleDelete(product._id)}>Remove</button>
</td>
<td className="td_6">
  <p className="product-price"><span>Rs.</span>{product.Price}</p>
</td>
        </>
    )
}

export default AddCartView;



