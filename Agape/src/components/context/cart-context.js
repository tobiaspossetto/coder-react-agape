import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const CartContext = React.createContext();

export function CartProvider(props) {

    //Este useEffect hace que cada vez que cambio de ruta empiezo desde arriba
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);



    //CART SECTION
    //El state que tiene los items del cart
    const [cartProducts, setCartProducts] = useState([])
    //State para el importe total
    const [total, setTotal] = useState(0);
    //El state para el total de items que hay en el cart
    const [totalItems, setTotalItems] = useState(0)

    //State que me indica si se ejecuto la funcion modifyProduct, el contador desde el cart
    const [modify, setModify] = useState(false)



    useEffect(() => {
        //Suma todos los items para saber el total que compro
        //tambien saco el importe total

        let itemsTotal = 0
        let totalPrice = 0
        cartProducts.forEach(i => {
            itemsTotal = itemsTotal + i.quantity
            totalPrice = totalPrice + i.item.price * i.quantity
        });

        setTotalItems(itemsTotal)
        setTotal(totalPrice)

        setModify(false)



    }, [cartProducts, modify])


    const addProduct = (newProduct, quantity) => {
        setCartProducts([...cartProducts, { item: newProduct, quantity: quantity }])

    }

    //Suma o resta items desde el contador del cart
    const modifyProduct = (id, quantity) => {

        let modify = cartProducts

        modify.forEach(i => {
            if (i.item.id === id) {
                i.quantity = quantity;

            }

        });

        setCartProducts(modify)
        setModify(true)

    }

    //Funcion que se llama si se vuelve a cargar el mismo producto desde el catalogo 
    //Reemplaza el anterior que coincida, lo implemente de la idea de un compañero del curso

    const addProductExistent = (newProduct, cant) => {
        let modify = cartProducts

        modify.forEach(i => {
            if (i.item.id === newProduct.id) {
                i.quantity = cant;

            }

        });

        setCartProducts(modify)

    }
    // Esta funcion solo setea el state pero la necesito en el provider de firebase y en el cart
    const removeAll = () => {
        setCartProducts([])
    }

    //Elimina un producto por su id
    const removeProduct = (id) => {
        let removeFinale = cartProducts.filter(i => i.item.id !== id)
        setCartProducts(removeFinale)

    }



    //Cuando se agrega un producto al cart se llama a la funcion
    const verifyReply = (newProduct, quantity) => {

        let coincidence = false
        //Busca en el cart para saber si ya existia
        for (const i in cartProducts) {
            //si hay coincidencia  en el id
            if (cartProducts[i].item.id === newProduct.id) {

                coincidence = true

            }
        }


        if (!coincidence) {
            //No hay repetidos entonces puedo agregarlo
            addProduct(newProduct, quantity)
        } else {
            //ya existe, hay que modificar
            addProductExistent(newProduct, quantity)

        }



    }




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


export function useCart() {
    const context = React.useContext(CartContext)

    //asegurarme de que no lo estoy llamando en un componente que no es hijo
    //solo es una verificacion
    if (!context) {
        throw new Error('useCart debe estar dentro del provider CartContext')
    }

    return context;
}