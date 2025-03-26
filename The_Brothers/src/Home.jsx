import React, {  useContext, useEffect,useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import HeroPage from './components/HeroPage'
import PickUpLeftOff from './components/PickUpLeftOff'
import TopOfTheDay from './components/TopOfTheDay'
import BestSellsOfWeek from './components/BestSellsOfWeek'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Categories from './components/Categories'
import { ShopContext } from './App'




const Home = () => {
const {AllProductsCollection} = useContext(ShopContext);

const [PickUpDataBaseCollection,setPickUpDataBaseCollection] = useState([]);
  const [TopOfDayCollection,setTopOfDayCollection] = useState([]);
  const [BestOfweekCollection,setBestOfweekCollection] = useState([]);

useEffect(()=>{

  setPickUpDataBaseCollection(AllProductsCollection.filter((pickupleft)=> pickupleft.Categorys === "PickUp"));
  setTopOfDayCollection(AllProductsCollection.filter((pickupleft)=> pickupleft.Categorys === "TopDay"));
  setBestOfweekCollection(AllProductsCollection.filter((pickupleft)=> pickupleft.Categorys === "BestWeek"));

},[AllProductsCollection])


  return (
    <>
   
  <HeroPage/>
  <Categories />

<div className="pick_up">
      <Container fluid>
        <h2>Pick up Where You Left Off</h2>
          <Row>
              <Col lg={12} md={12} sm={12} xs={12}>
                <div className="centerOne">
                  {PickUpDataBaseCollection.map((pickUp)=>(
                    <PickUpLeftOff RupeeIcon={CurrencyRupeeIcon} key={pickUp.Id} PickProduct={pickUp} />
                  ))}
                </div>
              </Col>
          </Row>
      </Container>
</div>

<div className="top_of_day">
      <Container fluid>
      <h2>Top Of The Day</h2>
          <Row>
              <Col lg={12} md={12} sm={12} xs={12}>
                  <div className="centerTwo">
      {
        TopOfDayCollection.map((Tops)=>(
          <TopOfTheDay RupeeIcon={CurrencyRupeeIcon} key={Tops.Id} TopProduct={Tops}/>
        ))
      }
                  </div>
              </Col>
        </Row>
    </Container>
</div>


<div className="best_sells_of_week">
  <h2>Best Sells Of Week</h2>
    <Container fluid>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <div className="center_3">
            {BestOfweekCollection.map((Best)=> (
            <BestSellsOfWeek RupeeIcon={CurrencyRupeeIcon} key={Best.Id} BestProduct={Best}/>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
</div>
      

    </>
  )
}

export default Home;
