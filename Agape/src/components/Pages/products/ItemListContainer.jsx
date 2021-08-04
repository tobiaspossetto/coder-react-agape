import React, {useState, useEffect} from 'react'
import {useCart} from '../../context/cart-context'
import ItemList from './ItemList'
import { useParams,useLocation } from 'react-router-dom';
import('../../styles.css')
const ItemListContainer = () => {
    //traigo category
    const { category } = useParams();
    
    //estado donde guardo los productos
    const [products, setProducts] = useState([]);
   
    const {allProducts} = useCart()
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

    
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
       
    },[category,allProducts])







    //ESTE COMPONENTE PARA MI ESTA AL VICIO, PERO ES PARA CUMPLIR CON LA CONSIGNA
    return (
        <div className="pages">
            <ItemList products={products}/>
            
        </div>
    )
}

export default ItemListContainer
