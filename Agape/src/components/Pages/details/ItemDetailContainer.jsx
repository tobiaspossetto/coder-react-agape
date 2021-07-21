import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail'


require('../../styles.css')

const ItemDetailContainer = () => {
    

    //Trae el parametro id
    const { id } = useParams();

    const [prod, setProd] = useState([])

    

    useEffect(() => {

        const getById = async () => {
            //hace la llamada pasando id
            const data = await axios.get(`http://localhost:4000/product/${id}`)
            
            //Limpio el state  para que solo tenga un producto en detalle
             setProd([])
             //Por alguna razon no me seteaba el state
            //Lo resolvi con el spread ...
             setProd(...data.data)
           
            
           
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
