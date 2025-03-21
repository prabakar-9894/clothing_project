import React, { useContext } from 'react'
import { ShopContext } from '../App'
import { Container, Row, Col } from 'react-bootstrap'
import '/css/AddCart.css'
import AddCartHoodies from './AddCartHoodies'

const AddHoodies = () => {
     const {WomensCollection} = useContext(ShopContext);

  return (
    <>
     <div className="pick_up">
          <Container fluid>
              <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <div className="centerOne">
                        {
                            WomensCollection.map((Hoodie) => (
                                <AddCartHoodies key={Hoodie.Id} HoodieProduct={Hoodie} />
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

export default AddHoodies
