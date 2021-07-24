import React,{ useState} from "react";


const CartContext = React.createContext();



export  function CartProvider(props) {


    const [cartProducts, setCartProducts] = useState([])


    const addProduct = (newProduct, quantity) => {
        setCartProducts([...cartProducts,{ item: newProduct, quantity: quantity}])
        console.log('producto agregado')
        console.log(cartProducts)
        
      
    }

    const modifyProduct =  (id, quantity) => {

        let modify = cartProducts
       
        modify.forEach(i => {
            if(i.item.id=== id){
                i.quantity = quantity;
              
            }
           
        });

         setCartProducts(modify)
        
    }

    const removeProduct = (id) => {
        let removeFinale = cartProducts.filter(i => i.item.id !== id)
        setCartProducts(removeFinale)

    }













    //useMemo optimiza, guarda una referencia al objeto y retorna ese objeto sin volverlo a crear 
    //a menos que la referencia cambie. Ayuda a que react no refresque al vicio 
    const value = React.useMemo(() => {
        return ({
            cartProducts,
            addProduct,
            modifyProduct,
            removeProduct
        })
    },[cartProducts])

    //forma mas simple de pasarle los children
    return <CartContext.Provider value={value} {...props} />
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