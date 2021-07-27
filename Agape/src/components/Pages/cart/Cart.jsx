import React from 'react'
import Item from './Item'
import Formulario from './Formulario'
import * as FaIcons from 'react-icons/fa'
import {useCart} from '../../context/cart-context'
import {Link} from 'react-router-dom';

require('./carrito.css')
const Cart = () => {

    
    const {cartProducts,removeAll} = useCart()

    
    const clear = () =>{
        removeAll()
    }
    return (
        <div className=''>
            <div className='container-titulo d-flex align-items-center justify-content-center mt-3'>
      
              <span className='titulo mb-0 '>Carrito de compras</span>
              <FaIcons.FaShoppingBag  size={30}/>
                                
            </div>
            <div className='container-items'>


                {
                    cartProducts.length === 0 ? <h4 className='text-center mb-3 text-danger  '>No hay productos</h4> :
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
                 {
                      cartProducts.length === 0 ? <Link className='btn btn-warning' to={'/productos/'}>Comenzá a comprar</Link> :
                      <button className='btn btn-danger  w-50' onClick={clear}>Borrar todo</button>
                 }
                
                </div>
            </div>
            
            <Formulario/>
        </div>
    )
}

export default Cart
