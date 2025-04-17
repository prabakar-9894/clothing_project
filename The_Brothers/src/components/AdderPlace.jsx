import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
import '/css/AdderPlace.css'

function AdderPlace() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function handleClose(){
    setShow(false);
    navigate("/");
}
function handleCloses(){
    setShow(false);
}
  const handleShow = () => setShow(true);

  return (
    <>
      <Button id='ProceedCheckout' variant="" onClick={handleShow}>
      PROCEED TO CHECKOUT
      </Button>

      <Modal show={show} onHide={handleCloses}>
        <Modal.Header closeButton>
          <Modal.Title>PROCEED TO CHECKOUT</Modal.Title>
        </Modal.Header>
        <Modal.Body>Adder Placed Successfull!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdderPlace;