import React, { useContext } from 'react'
import { ShopContext } from '../App'
import { Container, Row, Col } from 'react-bootstrap'
import '/css/AddCart.css'
import AddCartPants from './AddCartPants'

const AddPants = () => {
  const {Pants,KidsCollection,setKidsCollection} = useContext(ShopContext);
  return (
    <>
      <div className="pick_up">
          <Container fluid>
              <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <div className="centerOne">
                        {
                            KidsCollection.map((pant) => (
                                <AddCartPants key={pant.Id} PantsProduct={pant} />
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

export default AddPants
