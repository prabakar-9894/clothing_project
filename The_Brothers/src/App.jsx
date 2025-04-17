import React, { createContext, useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, data } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Home from './Home';
import Header from './components/Header';
import Filter from './components/Filter';
import Footer from './components/Footer';
import PickView from './components/PickView';
import AddHoodies from './components/AddHoodies';
import AddPants from './components/AddPants';
import AddTShirt from './components/AddTShirt';
import AddCart from './components/AddCart';
import TopWear from './components/TopWear';
import BottomWear from './components/BottomWear';

import 'bootstrap/dist/css/bootstrap.min.css';
import '/css/CartBtnAll.css';
import '/css/HomeAllCards.css';
import '/css/TopAndBottomCard.css';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import StarRateIcon from '@mui/icons-material/StarRate';
import AddUser from './components/AddUser';
import Login from './components/Login';
import NotFound from './components/NotFound';


export const ShopContext = createContext()

const App = () => {

  const [PickId,setPickId] = useState(null);
  const [FilProductPick,setFilProductPick] = useState([]);
  const [FilProductTop,setFilProductTop] = useState([]);
  const [FilProductBest,setFilProductBest] = useState([]);
  const [TshirtId,setTshirtId] = useState(null);
  const [totalCount,setTotalCount] = useState(0);

  const [formsAllData, setFormsAllData] = useState({ id: null, image: null });
  const [storedData, setStoredData] = useState([]);
  const [UserId, setUserId] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // To display the uploaded image URL
 const [UserName, setUserName] = useState(null);

  const [users, setUsers] = useState([]);

     const TopClickOne = useRef(null);
    const BottomClickOne = useRef(null);

 const [FilterCart,setFilterCart] = useState([]);
  const [cartCollection,setCartCollection] = useState([]);
  const [cartAllStore,setCartAllStore] = useState({
    id:"",
    userId: "",
    ProductId: "",
    Image: "",
    Quantity: ""
      });


// DataBase Collection in Mongodb start

  const [TopWearCollection,setTopWearCollection] = useState([])
  const [BottomWearCollection,setBottomWearCollection] = useState([])
  
  const [ AllProductsCollection,setAllProductsCollection ] =useState([])
  const [HerobannerCollection,setHerobannerCollection] = useState([])



  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }


  useEffect(() => {

    const fetchDataCollection = async () => {
      try{
          const [ allpro, herobanner ] = await Promise.all([

          axios.get(`${import.meta.env.VITE_BACKEND_URL}/allproductsData`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/herobannersData`),
          

        ]);

      
        setAllProductsCollection(allpro.data)
        setHerobannerCollection(herobanner.data)

      }catch(err){
        console.error("Error Fetching collection",err);
      }
    };

    fetchDataCollection();
   

  }, [])

  useEffect(()=>{
    setTopWearCollection(AllProductsCollection.filter((pickupleft)=> pickupleft.Categorys === "TopWears"));
    setBottomWearCollection(AllProductsCollection.filter((pickupleft)=> pickupleft.Categorys === "BottomWears"));
   
  },[AllProductsCollection])

  const ScrollToTop = () => {
    const { pathname } = useLocation(); // Get the current route (pathname)
  
    useEffect(() => {
      // Scroll to the top of the page whenever the route changes
      window.scrollTo(0, 0);
    }, [pathname]); // Run this effect whenever `pathname` changes
  
    return null; // This component doesn't render anything
  };

  

useEffect(() => {
  const retrievedData = JSON.parse(localStorage.getItem("formsAllData")) || [];
  setStoredData(retrievedData);
  const Upimg = retrievedData;
  retrievedData.filter((item) => setUserId(item.id)); // Use retrievedData directly
  Upimg.filter((item) =>  setUploadedImage(item.image)); // Use retrievedData directly
}, []); // Dependency array removed to avoid unnecessary re-renders



useEffect(()=>{
  const fetchCartData = async () => {

try{
  const [ CartResponce ] = await Promise.all([
  axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/carts`),
  

]);


setCartCollection(CartResponce.data);

}catch(err){
  console.error("Error Fetching collection",err);
}

  }

  fetchCartData()
},[]);

    useEffect(()=> {
      setFilterCart(cartCollection.filter((pickCart)=> pickCart.userId === UserId));
    },[cartCollection]);




  return (
    <>
      <ShopContext.Provider value={{ FilterCart,setFilterCart,BottomClickOne,TopClickOne,cartAllStore,setCartAllStore,formsAllData, setFormsAllData,storedData, setStoredData,UserName,setUserName,uploadedImage, setUploadedImage,UserId, setUserId,BottomWearCollection,TopWearCollection,handleLogout,cartCollection,setCartCollection,users, setUsers,HerobannerCollection,setHerobannerCollection,AllProductsCollection,setAllProductsCollection,totalCount,setTotalCount,StarRateIcon,RemoveShoppingCartIcon,AddShoppingCartIcon,PickId,setPickId,FilProductPick,setFilProductPick,FilProductTop,FilProductBest,setFilProductTop,setFilProductBest,TshirtId,setTshirtId,CurrencyRupeeIcon}}>

      <Router>
      <ScrollToTop/>
        <Header/>
        <Filter/>
        
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/ViewDetails' element={<PickView />} />
                <Route path='/AddTShirt' element={<AddTShirt />} />
                <Route path='/AddHoodies' element={<AddHoodies />} />
                <Route path='/AddPants' element={<AddPants />} />
                <Route path='/AddCart' element={<AddCart />}/>
                <Route path='/TopWear' element={<TopWear />} />
                <Route path='/BottomWear' element={<BottomWear />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/login" element={<Login />} />       
                <Route path='*' element={<NotFound/>} /> 
            </Routes>
          <Footer/>
          </Router>

      </ShopContext.Provider>
    </>
  )
}

export default App;