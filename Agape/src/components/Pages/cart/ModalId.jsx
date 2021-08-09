import React,{useState} from 'react'
import { Modal } from 'react-bootstrap';

const ModalId = (props) => {
    const [show, setShow] = useState(true);
    
    const handleClose = () => setShow(false);
  
    return (
       
             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Su id de la compra es:</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.id}</Modal.Body>
                <Modal.Footer>
                <button className="btn btn-danger" onClick={handleClose}>
                    Cerrar
                </button>
                
                </Modal.Footer>
            </Modal>
      
    )
}

export default ModalId
