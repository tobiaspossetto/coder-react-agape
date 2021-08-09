import React,{ useState, useEffect} from "react";

 


import {useFirebase} from './firebase-context'
import { useLocation } from 'react-router-dom';

const CartContext = React.createContext();



export  function CartProvider(props) {
  
    //USER SECTION
    
   
const { pathname } = useLocation();
   useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

    //DATA SECTION

   
   
   
    


   






    //CART SECTION
    const [cartProducts, setCartProducts] = useState([])
    const [total, setTotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0)
      
    const totalItemsFunc = () =>{
        let itemsTotal = 0
        cartProducts.forEach(i => {
            itemsTotal = itemsTotal + i.quantity
        });
  
        setTotalItems(itemsTotal)
    }
    useEffect(() =>{
      
        totalItemsFunc()
     
           
      
    },[cartProducts,total])
   
  
    const finalPrice = () =>{
        let total =0
        cartProducts.forEach(i => {
            total = total + i.item.price * i.quantity
        });

        setTotal(total)
    }
    useEffect(() => {
        let total =0
        cartProducts.forEach(i => {
            total = total + i.item.price * i.quantity
        });
        
        setTotal(total)
    
    },[cartProducts])
    const addProduct = (newProduct, quantity) => {
        setCartProducts([...cartProducts,{ item: newProduct, quantity: quantity}])
        //finalPrice()
        
      
    }

    //modificar porque ya existia
    const modifyProduct =  (id, quantity) => {

        let modify = cartProducts
       
        modify.forEach(i => {
            if(i.item.id=== id){
                i.quantity = quantity;
              
            }
           
        });
       finalPrice()
       
         setCartProducts(modify)
         totalItemsFunc()
       
    }

    //modificar desde el componente carrito
   
    const addProductExistent = (newProduct,cant) => {

        let modify = cartProducts
        

        modify.forEach(i => {
            if(i.item.id === newProduct.id){
                i.quantity = cant;
              
            }
           
        });
       // finalPrice()
       totalItemsFunc()
         setCartProducts(modify)
        
    }
    const removeAll = () =>{
        setCartProducts([])
       // finalPrice()
       
    }
    
    const removeProduct = (id) => {
        let removeFinale = cartProducts.filter(i => i.item.id !== id)
        setCartProducts(removeFinale)
         //finalPrice()
        
    }

    const verifyReply = (newProduct, quantity) => {
      
        
       let coincidence = false

       for (const i in cartProducts) {
           //si hay coincidencia  en el id
            if(cartProducts[i].item.id === newProduct.id){
                
                 coincidence = true
          
            }
       }
 
     
        if(!coincidence){
           //No hay repetidos entonces puedo agregarlo
            addProduct(newProduct, quantity)
        }else{
            //ya existe, hay que modificar
            addProductExistent(newProduct, quantity)
            
        }

       
        
    }









   
    //forma mas simple de pasarle los children
    return <CartContext.Provider value={{
        cartProducts,
        addProduct,
        modifyProduct,
        removeProduct,
        verifyReply,
        removeAll,
        total,
        totalItems
       
       
       
        
        
    }} {...props} />
}


export  function useCart() {
    const context = React.useContext(CartContext)

    //asegurarme de que no lo estoy llamando en un componente que no es hijo
    //solo es una verificacion
    if(!context){
        throw new Error ('useCart debe estar dentro del provider CartContext')
    }

    return context;
}