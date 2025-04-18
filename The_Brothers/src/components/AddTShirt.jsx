import React, { useContext,useEffect,useState } from 'react'
import { ShopContext } from '../App'
import { Container, Row, Col } from 'react-bootstrap'
import '/css/AddCart.css'
import AddCartTshirt from './AddCartTshirt'

const AddTShirt = () => {
    const {AllTable,AllProductsCollection} = useContext(ShopContext);
    const [MensCollection,setMensCollection] = useState([]);

    useEffect(()=>{
        setMensCollection(AllProductsCollection.filter((pickupleft)=> pickupleft.Categorys === "Mens"));
      },[AllProductsCollection])

  return (
    <>
<div className="pick_up">
      <Container fluid>
          <Row>
              <Col lg={12} md={12} sm={12} xs={12}>
                <div className="centerOne">
                    {
                        MensCollection.map((Tshirt) => (
                            <AddCartTshirt key={Tshirt.Id} TshirtProduct={Tshirt} tableAll={AllTable}/>
                        ))
                    }
                </div>
              </Col>
          </Row>
      </Container>
</div>
      
    </>
  )
}

export default AddTShirt
