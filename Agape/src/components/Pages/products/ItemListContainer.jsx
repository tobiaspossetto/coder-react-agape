import React, {useState, useEffect} from 'react'
import {useFirebase} from '../../context/firebase-context'
import ItemList from './ItemList'
import { useParams } from 'react-router-dom';
import('../../styles.css')


const ItemListContainer = () => {
    //Mis productos desde el context
    const {allProducts} = useFirebase()


    //traigo category
    const { category } = useParams();
    
    //estado donde guardo los productos
    const [products, setProducts] = useState([]);
   
    
    

    
    useEffect(()=>{ 
        const getProducts =  () =>{
            //Si llega un parametro de category entonces
            if(category){
               //Filtro mi allProducts
              let prodByCat = allProducts.filter(product => product.category === category)
              setProducts(prodByCat)
            }else{
                //mis productos van a tener mi allProducts completo
                setProducts(allProducts)
              
            }
        }
        getProducts()
       
    },[category,allProducts])







  
    return (
        <div className="pages">
            <ItemList products={products}/>
            
        </div>
    )
}

export default ItemListContainer
