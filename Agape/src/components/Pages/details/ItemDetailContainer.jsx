import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail'
import {useCart} from '../../context/cart-context'

require('../../styles.css')

const ItemDetailContainer = () => {
    
    const {allProducts} = useCart()
    
    //Trae el parametro id
    const { id } = useParams();

    const [prod, setProd] = useState([])

    

    useEffect(() => {

        const getById =  () => {
            //hace la llamada pasando id
           
            let prodDetail = allProducts.filter(product => product.id === id)
            //Limpio el state  para que solo tenga un producto en detalle
             setProd([])
             //Por alguna razon no me seteaba el state
            //Lo resolvi con el spread ...
             setProd(...prodDetail)
           
            
           
        }


       //Siguiendo al parametro se ejecuta
       getById()
    },[id]);


    return (
        <div className='pages'>
            {/* Paso el state  */}
            <ItemDetail product={prod}/>
        </div>
    )
}

export default ItemDetailContainer