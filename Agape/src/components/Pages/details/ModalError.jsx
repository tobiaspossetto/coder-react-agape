import React,{useState} from 'react'
import { Modal } from 'react-bootstrap';
import { useHistory  } from 'react-router-dom';
const ModalError = () => {
    const [show, setShow] = useState(true);
    let history = useHistory();

    const handleClose = () => {
        setShow(false)
        history.push("/");
    };
  
    return (
       
             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Error en la busqueda:</Modal.Title>
                </Modal.Header>
                <Modal.Body>El producto no existe</Modal.Body>
                <Modal.Footer>
                <button className="btn btn-danger" onClick={handleClose}>
                    Cerrar
                </button>
                
                </Modal.Footer>
            </Modal>
      
    )
}

export default ModalError
