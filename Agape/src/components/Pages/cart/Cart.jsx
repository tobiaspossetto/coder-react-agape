import React, {useState} from 'react'
import Item from './Item'
import Formulario from './Formulario'
import * as FaIcons from 'react-icons/fa'
import {useCart} from '../../context/cart-context'
require('./carrito.css')
const Cart = () => {

    
    const {cartProducts} = useCart()

    const [pedido, setPedido] = useState([]);
  
    
    return (
        <div className=''>
            <div className='container-titulo d-flex align-items-center justify-content-center'>
      
              <span className='titulo mb-0'>Carrito de compras</span>
              <FaIcons.FaShoppingBag  size={30}/>
                                
            </div>
            <div className='container-items'>


                {

                    cartProducts.map((i) => {
                        return (
                            <Item key={i.item.id}
                                    id={i.item.id}
                                  category={i.item.category}
                                  description={i.item.description}
                                  img={i.item.img}
                                  name={i.item.name}
                                  price={i.item.price}
                                  quantity={i.quantity}
                                  
                                  
                                  
                            />
                        )
                    })

                }
              
                <div className='w-100 d-flex align-items-center justify-content-center'>

                 <button className='btn btn-danger  w-50'>Borrar todo</button>
                </div>
            </div>
            
            <Formulario/>
        </div>
    )
}

export default Cart
