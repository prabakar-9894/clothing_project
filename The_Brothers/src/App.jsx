import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";


import Home from './Home'
import Header from './components/Header'
import Filter from './components/Filter'
import Footer from './components/Footer'
import PickView from './components/PickView'
import TopView from './components/TopView'
import BestView from './components/BestView'
import AddHoodies from './components/AddHoodies'
import AddPants from './components/AddPants'
import AddTShirt from './components/AddTShirt'
import AddCart from './components/AddCart'
import TopWear from './components/TopWear'
import BottomWear from './components/BottomWear'

import 'bootstrap/dist/css/bootstrap.min.css';
import '/css/CartBtnAll.css'
import '/css/HomeAllCards.css'
import '/css/TopAndBottomCard.css'

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import StarRateIcon from '@mui/icons-material/StarRate';
import AddUser from './components/AddUser';
import Login from './components/Login';


export const ShopContext = createContext()

const App = () => {

  const [PickId,setPickId] = useState(null)
  const [TopId,setTopId] = useState(null);
  const [BestId,setBestId] = useState(null);
  const [FilProductPick,setFilProductPick] = useState([]);
  const [FilProductTop,setFilProductTop] = useState([]);
  const [FilProductBest,setFilProductBest] = useState([]);
  const [TshirtId,setTshirtId] = useState(null);
  const [totalCount,setTotalCount] = useState(0);


  const [users, setUsers] = useState([]);


  const [cartCollection,setCartCollection] = useState([]);


//// DataBase Collection in Mongodb start

  const [PickUpDataBaseCollection,setPickUpDataBaseCollection] = useState([]);
  const [TopOfDayCollection,setTopOfDayCollection] = useState([]);
  const [BestOfweekCollection,setBestOfweekCollection] = useState([]);
  const [TopWearCollection,setTopWearCollection] = useState([]);
  const [BottomWearCollection,setBottomWearCollection] = useState([]);
  const [MensCollection,setMensCollection] = useState([]);
  const [WomensCollection,setWomensCollection] = useState([]);
  const [KidsCollection,setKidsCollection] = useState([]);
  const[HerobannerCollection,setHerobannerCollection] = useState([]);



  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };


  // const prox = ;
  // console.log("prox",prox);




  useEffect(() => {

    const fetchDataCollection = async () => {
      try{
        const [ pickup, topofday, bestofweek, topwear, bottomwear, men, women, kid, herobanner ] = await Promise.all([
          

          axios.get(`${import.meta.env.VITE_BACKEND_URL}/AllProducts/pickuplefts`) ,
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/AllProducts/topofdays`) ,
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/AllProducts/bestofweeks`) ,
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/AllProducts/topwears`) ,
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/AllProducts/bottomwears`) ,
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/AllProducts/mens`) ,
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/AllProducts/womens`) ,
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/AllProducts/kids`) ,
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/AllProducts/herobanners`)

          // axios.get("http://localhost:5011/AllProducts/pickuplefts") ,
          // axios.get("http://localhost:5011/AllProducts/topofdays") ,
          // axios.get("http://localhost:5011/AllProducts/bestofweeks") ,
          // axios.get("http://localhost:5011/AllProducts/topwears") ,
          // axios.get("http://localhost:5011/AllProducts/bottomwears") ,
          // axios.get("http://localhost:5011/AllProducts/mens") ,
          // axios.get("http://localhost:5011/AllProducts/womens") ,
          // axios.get("http://localhost:5011/AllProducts/kids") ,
          // axios.get("http://localhost:5011/AllProducts/herobanners")

        ]);

        setPickUpDataBaseCollection(pickup.data);
        setTopOfDayCollection(topofday.data);
        setBestOfweekCollection(bestofweek.data);
        setTopWearCollection(topwear.data);
        setBottomWearCollection(bottomwear.data);
        setMensCollection(men.data);
        setWomensCollection(women.data);
        setKidsCollection(kid.data);
        setHerobannerCollection(herobanner.data);



      }catch(err){
        console.error("Error Fetching collection",err);
      }
    };

    fetchDataCollection();


  }, []);











  return (
    <>
      <ShopContext.Provider value={{ handleLogout,cartCollection,setCartCollection,users, setUsers,HerobannerCollection,setHerobannerCollection,KidsCollection,setKidsCollection,WomensCollection,setWomensCollection,MensCollection,setMensCollection,BottomWearCollection,setBottomWearCollection,TopWearCollection,setTopWearCollection,BestOfweekCollection,setBestOfweekCollection,TopOfDayCollection,setTopOfDayCollection,PickUpDataBaseCollection,setPickUpDataBaseCollection,totalCount,setTotalCount,StarRateIcon,RemoveShoppingCartIcon,AddShoppingCartIcon,PickId,TopId,BestId,setPickId,setTopId,setBestId,FilProductPick,setFilProductPick,FilProductTop,FilProductBest,setFilProductTop,setFilProductBest,TshirtId,setTshirtId,CurrencyRupeeIcon}}>

      <Router>
        <Header/>
        <Filter/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/PickUpView' element={<PickView />} />
                <Route path='/TopDayView' element={<TopView />} />
                <Route path='/BestWeekView' element={<BestView />} />
                <Route path='/AddTShirt' element={<AddTShirt />} />
                <Route path='/AddHoodies' element={<AddHoodies />} />
                <Route path='/AddPants' element={<AddPants />} />
                <Route path='/AddCart' element={<AddCart />}/>
                <Route path='/TopWear' element={<TopWear />} />
                <Route path='/BottomWear' element={<BottomWear />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/login" element={<Login />} />        
            </Routes>
          <Footer/>
          </Router>

      </ShopContext.Provider>
    </>
  )
}

export default App

