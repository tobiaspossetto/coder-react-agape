import React,{ useState, useEffect} from "react";

 

import Axios from "axios"
import {useFirebase} from './firebase-context'
import { useLocation } from 'react-router-dom';
import axios from "axios";
const CartContext = React.createContext();



export  function CartProvider(props) {
  
    //USER SECTION
    
   
const { pathname } = useLocation();
   useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

    //DATA SECTION

    const [allProducts, setAllProducts] = useState([]);
    const [pedido, setpedido] = useState({})
    const {user} = useFirebase()
    const newPedido = (datosForm) =>{
        let fecha = new Date()
        let month = fecha.getMonth() + 1;
        let day = fecha.getUTCDate();
        let year = fecha.getUTCFullYear();

        let fechaFinal = `${day}/${month}/${year}`
       // setpedido({})
        let newOrder = {
            buyer:{
                nombre: user.name,
                email: user.email,
                direccion: datosForm.direccion,
                telefono: datosForm.telefono,
            },
            items:[
                ...cartProducts,
              
            ],
            date: fechaFinal,
            totalPrice : total

        }
        setpedido(newOrder)
        setCartProducts([])
        axios.post(`https://agapeapp-7f28c-default-rtdb.firebaseio.com/orders/${user.uid}.json?auth=${user.tokenId}`,pedido)
         .then(response =>
         
            setpedido(response.data.name))
        .catch((error) => console.log(error))
    }
    


    const getProdFirebase = async () =>{
       
       let data = await Axios.get('https://agapeapp-7f28c-default-rtdb.firebaseio.com/items.json')
       let resData = data.data
       
        
        let productosArray = []

        let claves = Object.keys(resData)
         for (let i = 0; i < claves.length; i++){
             let clave = claves[i]
            
             productosArray.push(resData[clave])
         }
         
        
       
         let productoFinal = []
        for (let i = 0; i < productosArray.length; i++) {
            
            productoFinal.push({id:claves[i], name:productosArray[i].name, description: productosArray[i].description, price:productosArray[i].price, img: productosArray[i].img, category:productosArray[i].category})
            
        }
     
       setAllProducts(productoFinal)
    }

    
  
    
    
    useEffect(() =>{
        getProdFirebase()
       
     
    },[])


   






    //CART SECTION
    const [cartProducts, setCartProducts] = useState([])
    const [total, setTotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0)
   
    useEffect(() =>{
        const totalItemsCart = () => {
            let itemsTotal = 0
           cartProducts.forEach(i => {
               itemsTotal = itemsTotal + i.quantity
           });
     
           setTotalItems(itemsTotal)
     
           
        }
        totalItemsCart()
    },[cartProducts,total])
   
  
    const finalPrice = () =>{
        let total =0
        cartProducts.forEach(i => {
            total = total + i.item.price * i.quantity
        });

        setTotal(total)
    }

    const addProduct = (newProduct, quantity) => {
        setCartProducts([...cartProducts,{ item: newProduct, quantity: quantity}])
        finalPrice()
        
      
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
        console.log(cartProducts)
    }

    //modificar desde el componente carrito
    const addProductExistent =  (newProduct,cant) => {

        let modify = cartProducts
        

        modify.forEach(i => {
            if(i.item.id === newProduct.id){
                i.quantity = i.quantity+cant;
              
            }
           
        });
        finalPrice()
       
         setCartProducts(modify)
        
    }
    const removeAll = () =>{
        setCartProducts([])
        finalPrice()
       
    }
    
    const removeProduct = (id) => {
        let removeFinale = cartProducts.filter(i => i.item.id !== id)
        setCartProducts(removeFinale)
         finalPrice()
        
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
        totalItems,
        allProducts,
        newPedido
        
       
        
        
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