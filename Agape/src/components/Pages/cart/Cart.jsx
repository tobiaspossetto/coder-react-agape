import React from 'react'
import Item from './Item'
import Formulario from './Formulario'
import * as FaIcons from 'react-icons/fa'

require('./carrito.css')
const Cart = () => {

    

    
  
    return (
        <div className=''>
            <div className='container-titulo d-flex align-items-center justify-content-center'>
      
              <span className='titulo mb-0'>Carrito de compras</span>
              <FaIcons.FaShoppingBag  size={30}/>
                                
            </div>
            <div className='container-items'>

                <Item/>
               
                <Item/>
                <Item/>
                <Item/>
                <div className='w-100 d-flex align-items-center justify-content-center'>

                 <button className='btn btn-danger  w-50'>Borrar todo</button>
                </div>
            </div>
            
            <Formulario/>
        </div>
    )
}

export default Cart
