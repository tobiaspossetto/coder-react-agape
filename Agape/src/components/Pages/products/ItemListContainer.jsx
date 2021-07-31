import React, {useState, useEffect} from 'react'
import {useCart} from '../../context/cart-context'
import ItemList from './ItemList'
import { useParams } from 'react-router-dom';
require('../../styles.css')
const ItemListContainer = () => {
    //traigo category
    const { category } = useParams();
    
    //estado donde guardo los productos
    const [products, setProducts] = useState([]);
   
    const {allProducts,categoryRopa,categoryAccesorios} = useCart()
    const getProducts =  () =>{
        //Si llega un parametro de category entonces
        if(category){
           
            if(category === 'Ropa'){
                setProducts(categoryRopa)
            }else{
                setProducts(categoryAccesorios)
            }

        }else{
            
            setProducts(allProducts)
          
        }
    }
   
    useEffect(()=>{ 
        
        getProducts()
       
    })
    //ESTE COMPONENTE PARA MI ESTA AL VICIO, PERO ES PARA CUMPLIR CON LA CONSIGNA
    return (
        <div className="pages">
            <ItemList products={products}/>
            
        </div>
    )
}

export default ItemListContainer
