import React, { useState, useEffect } from 'react'
import ItemDetail from './ItemDetail'
import ModalError from './ModalError'
import {useFirebase} from '../../context/firebase-context'
import { useParams} from 'react-router-dom';
import('../../styles.css')
import('./ItemDetail')

const ItemDetailContainer = () => {
    
    const {allProducts} = useFirebase()
    

    
    //Trae el parametro id
    const { id } = useParams();

    //prod va a ser mi producto
    const [prod, setProd] = useState([])
    const [patchError, setPatchError] = useState(false)
    

    useEffect(() => {
        //filtra mi array del cart(allProducts)
            let prodDetail =  allProducts.filter(product => product.id === id)
            //Si esta vacio, significa que el id de la url es invalido
            if(prodDetail.length === 0) {
                //Setea el state para que muestre el Modal
                setPatchError(true)
              
               
            }else{
                    //Limpio el state  para que solo tenga un producto en detalle
            setProd([])
            //Por alguna razon no me seteaba el state
            //Lo resolvi con el spread ...
            setProd(...prodDetail)
            }
            
        //React me advierte que en dependencies tambien va history y allProducts pero me anda bien con id
    },[id]);
   
   
    return (
        <div className='pages'>
            {/* Paso el state  */}
            <ItemDetail product={prod}/>

            {
                patchError&&   <ModalError/>
            }
        </div>
    )
}

export default ItemDetailContainer
