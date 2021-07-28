import React from 'react'

import Formulario from './Formulario'
import * as FaIcons from 'react-icons/fa'

import CartList from './CartList'
require('./carrito.css')
const Cart = () => {

    
   

    
  
    return (
        <div className='pages'>
            <div className='container-titulo d-flex align-items-center justify-content-center mt-3'>
      
              <span className='titulo mb-0 '>Carrito de compras</span>
              <FaIcons.FaShoppingBag  size={30}/>
                                
            </div>
            <div className='container-items'>
                <CartList/>

                
            </div>
            
            <Formulario />
        </div>
    )
}

export default Cart
