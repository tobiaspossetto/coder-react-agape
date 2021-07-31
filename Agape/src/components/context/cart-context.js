import React,{ useState, useEffect} from "react";


import {useFirestore} from './firestore-context'
const CartContext = React.createContext();



export  function CartProvider(props) {
    const {getFirestore} = useFirestore()
    //USER SECTION
    
    

    //DATA SECTION

    const [allProducts, setAllProducts] = useState([]);
    const [categoryRopa, setCategoryRopa] = useState([]);
    const [categoryAccesorios, setCategoryAccesorios] = useState([]);




    const getProdFirestore = async () =>{
        let firestore =  getFirestore()
        let collection =   firestore.collection('items')
       // console.log(collection)
        const result =  await collection.get()
        let products = []
        result.forEach((item) =>{
            //Por alguna razon .data() no me trae el id asi que lo agregue yo mismo
            let document = {...item.data(),id:item.id}
            products.push(document)
         
           
        })
       
       setAllProducts(products)
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
        getProdFirestore()
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