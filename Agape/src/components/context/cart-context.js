import React,{ useState, useEffect} from "react";

import Axios from "axios"

const CartContext = React.createContext();



export  function CartProvider(props) {
    
    //USER SECTION
    
    

    //DATA SECTION

    const [allProducts, setAllProducts] = useState([]);
    const [categoryRopa, setCategoryRopa] = useState([]);
    const [categoryAccesorios, setCategoryAccesorios] = useState([]);




    const getProdFirebase = async () =>{
       
       let data = await Axios.get('https://agapeapp-7f28c-default-rtdb.firebaseio.com/items.json')
       let resData = data.data
        //resData = [...data.data]
        
        let productosArray = []

        let claves = Object.keys(resData)
         for (let i = 0; i < claves.length; i++){
             let clave = claves[i]
            
             productosArray.push(resData[clave])
         }
         
        
        // productosArray.forEach(i => {
        //     console.log('--------------')
        //     console.log(productosArray[i])
        //     console.log(claves[i])
        //     console.log('--------------')
        // });
         let productoFinal = []
        for (let i = 0; i < productosArray.length; i++) {
            // console.log(productosArray[i])
            // console.log(claves[i])
            productoFinal.push({id:claves[i], name:productosArray[i].name, description: productosArray[i].description, price:productosArray[i].price, img: productosArray[i].img, category:productosArray[i].category})
            
        }
      // console.log(productoFinal)
       setAllProducts(productoFinal)
    }

    
    const getCategoryRopa = () =>{
        let result = allProducts.filter( i => i.category === 'Ropa')
        setCategoryRopa(result)
    }

    const getCategoryAccesorios = () =>{
        let result = allProducts.filter( i => i.category === 'Accesorios')
        setCategoryAccesorios(result)
    }
    
    
    useEffect(() =>{
        getProdFirebase()
       //console.log(allProducts)
     
    },[])


    useEffect(() =>{
        getCategoryRopa()
        getCategoryAccesorios()
    },[allProducts])







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
        categoryRopa,
        categoryAccesorios,
        
        
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