import React from 'react'
import {  Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
const Portada = () => {
    return (
        <div className="portada">
               <div className="portada-opacidad">

               <div className="portada-titulo">
                   <h1>A G Á P E</h1>
                   <h5>Tienda online</h5>
                   <Button as={Link} to="/productos" className='btn-ver' >Ver Productos</Button>
               </div>
               </div>
           </div>
    )
}

export default Portada
