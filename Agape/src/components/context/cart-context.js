import React,{ useState} from "react";


const CartContext = React.createContext();



export  function CartProvider(props) {


    const [cartProducts, setCartProducts] = useState([])


    const addProduct = (newProduct, quantity) => {
        setCartProducts([...cartProducts,{ newProduct, quantity}])
        console.log('producto agregado')

        setTimeout(() => {
            console.log(cartProducts)
        }, 5000);
      
    }
    

    const removeProduct = (id) => {

    }













    //useMemo optimiza, guarda una referencia al objeto y retorna ese objeto sin volverlo a crear 
    //a menos que la referencia cambie. Ayuda a que react no refresque al vicio 
    const value = React.useMemo(() => {
        return ({
            cartProducts,
            addProduct
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