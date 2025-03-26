import React, { useEffect, useState, useContext } from 'react';
import {  Row, Col } from 'react-bootstrap'
import { ShopContext } from '../App'
import SearchIcon from '@mui/icons-material/Search';
import '/css/FilterHead.css'
import '/css/TopWear.css'
import proimg from '/assets/pro_img_2.png'
import axios from "axios"
import { Link } from 'react-router-dom';

const TopWear = () => {
    const { setPickId,TopWearCollection,StarRateIcon,cartCollection,setCartCollection,RemoveShoppingCartIcon,AddShoppingCartIcon} = useContext(ShopContext);
    
    const [searchQuery, setSearchQuery] = useState('');

      const [selectedCategories, setSelectedCategories] = useState([]);
      const [selectedRating, setSelectedRating] = useState(false);
      const [isOfferChecked, setIsOfferChecked] = useState(false);
      const [selectedPrice, setSelectedPrice] = useState("all");
      // const [alPrice, setAlPrice] = useState(true);
      const [filteredProducts, setFilteredProducts] = useState(TopWearCollection);

      

              const handleCategoryChange = (event) => {
                const { value, checked } = event.target;
                setSelectedCategories((prevCategories) => 
                  checked ? [...prevCategories, value] : prevCategories.filter((Category) => Category !== value)
                );
              };
            
              const handleRatingChange = (event) => {
                setSelectedRating(event.target.checked)
               };

               const handleFilterChange = (event) => {
                setSelectedPrice(event.target.value);
                // setAlPrice(event.target.value);
              };

              
            
              const handleOfferChange = (event) => {
                setIsOfferChecked(event.target.checked);
              };


              
             




              const filterAndSortProducts = async () => {
                let filtered = TopWearCollection;
            

                // Filter by search query
                if (searchQuery) {
                  filtered = filtered.filter((product) =>
                    product.Name.toLowerCase().includes(searchQuery.toLowerCase())
                  );
                }

                // Filter by selected categories
                if (selectedCategories.length > 0) {
                  filtered = filtered.filter((product) => selectedCategories.includes(product.Category));
                }
            
                // Filter by rating
                if (selectedRating) {
                  filtered = filtered.filter((product) => product.Rating >= 4);
                }
            
                // Filter by offer percentage (offer above 25%)
                if (isOfferChecked) {
                  filtered = filtered.filter((product) => product.Offer >= 25);
                }
            
                // Sort by price

                filtered = filtered.filter((product) => {
                  if (selectedPrice === "all") return true;
                  if (selectedPrice === "low" && product.Price <= 300) return true;
                  if (selectedPrice === "medium" && product.Price > 300 && product.Price <= 700) return true;
                  if (selectedPrice === "high" && product.Price > 700) return true;
                  return false;
                });

                  // Sort products based on selected order
  // if (selectedPrice === "lowToHigh") {
  //   filtered = filtered.sort((a, b) => a.Price - b.Price); // Ascending order
  // } else if (selectedPrice === "highToLow") {
  //   filtered = filtered.sort((a, b) => b.Price - a.Price); // Descending order
  // }

  // if (selectedPrice === "lowToHigh") {
  //   filtered = filtered.sort((a, b) => a.Price - b.Price); // Ascending order
  // } else if (selectedPrice === "highToLow") {
  //   filtered = filtered.sort((a, b) => b.Price - a.Price); // Descending order
  // }


              
            
                setFilteredProducts(filtered);
              };

              useEffect(() => {


                // setFilteredProducts(filtered);
                 filterAndSortProducts();
              }, [selectedCategories, selectedRating, isOfferChecked, selectedPrice,searchQuery])
              
              function search(e){
                if(e.key ==='Enter'){
                 setSearchQuery(e.target.value)
                 filterAndSortProducts();
                }
             }
            //  function FilterPrices(FilPrice){
            //   let filtereds = TopWearCollection;
            //   if (FilPrice === "lowToHigh") {
            //     filtereds = filtereds.sort((a, b) => a.Price - b.Price); // Ascending order
            //   } else if (FilPrice === "highToLow") {
            //     filtereds = filtereds.sort((a, b) => b.Price - a.Price); // Descending order
            //   }
            //   setFilteredProducts(filtereds)
            // }

            
       
  return (
    <>

<div className="pick_up_TopWear">
  
     
    <Row>
    <Col lg={3} md={3} sm={3} xs={4}>

    <div className="filter_head">

        <div className="fil_alls">


            <div className="top_filter">
                <h4>Filters</h4>
            </div>
            <div className="center_1_filter">
                <h5>Price</h5>   
                <div className="price_btns">

                {["all", "low", "medium", "high"].map((range) => (
          <label key={range}>
            <input
              type="radio"
              name="price"
              value={range}
              checked={selectedPrice === range}
              onChange={handleFilterChange}
              className="cursor-pointer"
            />
            {range === "all"
              ? "All"
              : range === "low"
              ? "Low"
              : range === "medium"
              ? "Medium"
              : "High"}
          </label>
        ))}
              

              {/* <label>
  <input
    type="checkbox"
    value="lowToHigh"
    checked={selectedPrice === "lowToHigh"}
    onChange={(e) => setSelectedPrice(e.target.value)}
    // onChange={handleFilterChange}
  />
  Low to High
</label>
<label>
  <input
    type="checkbox"
    value="highToLow"
    checked={selectedPrice === "highToLow"}
    onChange={(e) => setSelectedPrice(e.target.value)}
    // onChange={handleFilterChange}
  />
  High to Low
</label> */}
{/* <button onChange={()=>setSelectedPrice("lowToHigh")}>Low to high</button><br />
<button onChange={()=>setSelectedPrice("highToLow")}>High to Low</button> */}

              
                </div> 
            </div>

            <div className="center_2_filter">
        
                <ul>
                    <li><h5>Categories</h5></li>
                    <li><input type="checkbox"  value="t shirt" onChange={handleCategoryChange}  />T Shirt</li>
                    <li><input type="checkbox"  value="hoodie" onChange={handleCategoryChange}  />Hoodies</li>
                    <li><input type="checkbox"  value="shirt" onChange={handleCategoryChange}  />Shirt</li>
                </ul>
                <hr />
                <ul>
                    <li><h5>Filter</h5></li>
                    <li><input type="checkbox"  value="4.5" onChange={handleRatingChange}  />Top Rating</li>
                    <li><input type="checkbox"  onChange={handleOfferChange}  />25% above</li>
                </ul>
            </div>
          </div>
    </div>
</Col>

<Col lg={9} md={9} sm={9} xs={8}>
<div className='ProSearchAll'>
  <form action="">
      <input type="text" id="men_dress" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} onKeyDown={search} placeholder="Search for products..." />
      <SearchIcon id="searchIcon" />
   </form>
  </div>
        <div className="center_1_TopWear">
            {filteredProducts.length === 0 ? (
              <div className='NoProducts'>
                   <img src={proimg} alt="" />
              </div>
           
            ) : (




            filteredProducts.map((topwears) => {
              const UserId = "67d2d68a07d12890c143b768"; // Fixed static UserId
         
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


  <div key={topwears._id}>
    <div className="one_pice_TopWear">
        <Link to="/ViewDetails" onClick={()=>setPickId(topwears._id)}>
        <img src={`${import.meta.env.VITE_BACKEND_URL}${topwears.Image}`} alt="" />
        </Link>
        <ul>
            <li className='CartBtnLiTopWear'>{topwears.Type} 
              <span className='SpanRating' ><StarRateIcon className='Rating' /> {topwears.Rating}</span>
              {cartCollection.some((cart) => cart.ProductId === topwears._id) ? (
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
                              <button onClick={() => addToCart(topwears)} className='addToCart'><AddShoppingCartIcon /></button>
                            )}
                            </li>
            <li>Rs.{topwears.Price}
               <span style={{ textDecoration:"line-through", color:"#000" }}> M.R.P : Rs.{topwears.Mrp}</span>
                <span className='OffTopWear'> {topwears.Offer}% OFF</span>
            </li>
        </ul>
    </div>      
  </div>


                
              )
            })
            



              )}
          </div>
        </Col>
      </Row>
</div> 
</>
  )
}

export default TopWear









