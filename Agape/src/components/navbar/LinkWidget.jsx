import React from 'react'
import {useCart} from '../context/cart-context'
//Toma los props y renderiza
const LinkWidget = (props) => {
    const {totalItems} = useCart()
    return (
        <div className="cardWidget">
           
            <div className="d-flex align-items-center"> 
            
                {props.icon}
               
                 <span className="ml-2 ">{props.name}</span>
                 {/* Si  el link es el carrito entonces en el se agrega la cantidad de items que tengo en el cart*/}
                 {totalItems>0 && props.name==='Carrito' && <div style={{
                     color: 'black',
                     marginLeft: '5px',
                     fontSize: '20px',
                     background: 'white',
                     width: '20px',
                     textAlign: 'center',
                     borderRadius: '5px'   
                 }} className="cantCart">{totalItems}</div>}
            </div>
           
           
        </div>
    )
}

export default LinkWidget


