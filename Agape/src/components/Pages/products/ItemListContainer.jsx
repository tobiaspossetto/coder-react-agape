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
   
    const {allProducts} = useCart()
    
   
    useEffect(()=>{ 
        const getProducts =  () =>{
            //Si llega un parametro de category entonces
            if(category){
               
              let prodByCat = allProducts.filter(product => product.category === category)
              setProducts(prodByCat)
            }else{
                
                setProducts(allProducts)
              
            }
        }
        getProducts()
       
    },[category])
    //ESTE COMPONENTE PARA MI ESTA AL VICIO, PERO ES PARA CUMPLIR CON LA CONSIGNA
    return (
        <div className="pages">
            <ItemList products={products}/>
            
        </div>
    )
}

export default ItemListContainer
