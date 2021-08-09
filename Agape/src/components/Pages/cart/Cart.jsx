import React from 'react'
import ModalId from './ModalId'
import Formulario from './Formulario'
import CartList from './CartList'
import { useFirebase } from '../../context/firebase-context'
import * as FaIcons from 'react-icons/fa'
import('./carrito.css')

//Cart monta por un lado CartList y por otro el formulario para enviar

const Cart = () => {
    //Traigo el state que guarda el id del pedido creado
     const { idPedido} = useFirebase()
    
    return (
        <div className='pages container pt-3'>
            <div className=' container-titulo d-flex align-items-center justify-content-center '>
              <span className='titulo mb-0 '>Carrito de compras</span>
              <FaIcons.FaShoppingBag color='white' size={30}/>                  
            </div>
            {
                //Si no esta vacio entonces se realizo una compra
                  idPedido !== '' && 
                    //Llamo al ModalId, de bootstrap, para que la muestre como alert
                     <ModalId id= {idPedido}/>
              
              }
            <div className='container-items mt-5'>
              {/* Aca va el CartList */}
                <CartList/>

                
            </div>
            
            <Formulario />
        </div>
    )
}

export default Cart
