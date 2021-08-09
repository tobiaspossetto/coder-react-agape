import React from 'react'

import Formulario from './Formulario'
import * as FaIcons from 'react-icons/fa'

import CartList from './CartList'

 import { useFirebase } from '../../context/firebase-context'

import('./carrito.css')
const Cart = () => {
     const { idPedido} = useFirebase()
    
   

    
  
    return (
        <div className='pages container pt-3'>

            <div className=' container-titulo d-flex align-items-center justify-content-center '>
      
              <span className='titulo mb-0 '>Carrito de compras</span>
              
              <FaIcons.FaShoppingBag color='white' size={30}/>
                                
            </div>
            {
                  idPedido !== '' && 
                  <div className='p-3 w-75 m-auto rounded  badge-success'>
                      <p className='text-center m-0'>Su id de compra es:</p>
                      <p className='text-center m-0'> {idPedido}</p>
                  </div>
              }
            <div className='container-items mt-5'>
           
                <CartList/>

                
            </div>
            
            <Formulario />
        </div>
    )
}

export default Cart
