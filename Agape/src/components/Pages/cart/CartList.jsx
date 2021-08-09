import React from 'react'
import CartItem from './CartItem'
import { useCart } from '../../context/cart-context'
import {Link} from 'react-router-dom';
const CartList = () => {

    const { cartProducts,removeAll } = useCart()
    //Funcion que va a borrar el carrito, llamar directamente a removeAll no funciona;
    const clear = () =>{
        removeAll()
    }
    return (
        <>
            <div>

                {
                    cartProducts.length === 0 ? <h4 className='text-center mb-3 text-danger  '>No hay productos</h4> :

                        cartProducts.map((i) => {
                            return (

                                <CartItem key={i.item.id}
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
            </div>
           

            <div className='w-100 d-flex align-items-center justify-content-center'>
            {
                cartProducts.length === 0 ? <Link className='btn btn-warning' to={'/'}>Comenzá a comprar</Link> :
                <button className='btn btn-danger  w-50' onClick={clear}>Borrar todo</button>
            }
            
            </div>
        

    </>
    )
}

export default CartList
