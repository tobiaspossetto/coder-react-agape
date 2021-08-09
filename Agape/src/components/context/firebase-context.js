import React, { useState, useEffect } from "react";

import {auth, provider} from "../../firebase"

import Axios from 'axios'
import { useCart } from './cart-context'


//Inicio la app de firebase antes de comenzar el context

const FirebaseContext = React.createContext();



//Provider
export function FirebaseProvider(props) {

    //Necesito estas funciones y estados del cart-context 
    const { total, cartProducts, removeAll } = useCart()


    //SECCION DE LOGIN DEL USUARIO

    //State booleano que indica si esta loggeado o no, utilizado en el navbar para el btn de ingresar
    const [isLogged, setIsLogged] = useState(false);

    //Datos del usuario que se completan y vacian dependiendo si ingreso
    const [user, setUser] = useState({
        name: null,
        email: null,
        tokenId: null,
        uid: null
    })



    useEffect(() => {
        //Esta funcion escucha si hay algun cambio de autenticacion
        auth.onAuthStateChanged(user => {
            if (user) {
                //Si detecta que hay un usuario seteo el state IsLogged
                setIsLogged(true)

                //Ejecuto esta funcion que me devuelve su token, me sirve para cuando cree un pedido
                user.getIdToken(true)
                    .then((token) =>
                        //Si recibo el token entonces completo los datos del usuario
                        setUser({ name: user.displayName, email: user.email, tokenId: token, uid: user.uid })

                    )
                    .catch((error) => console.log(error))

            } else {
                //Si no detecta que hay un usuario, significa que salio o nunca entro
                //Borro todo lo que tenga que ver con un usuario
                setIsLogged(false)
                setUser({ name: null, email: null, tokenId: null })

            }
        })
    }, [])

    //Funcion que abre el popup de Google y permite ingresar con una cuenta
    //Usado en el btn del navbar y el form
    const authGoogle = () => {
        auth.signInWithPopup(provider)
    }
    //Funcion que cierra sesión 
    const signOut = () => {
        auth.signOut()

    }


    //SECCION DE PEDIDO DE PRODUCTO A LA DATABASE

    const [allProducts, setAllProducts] = useState([]);

    const getProdFirebase = async () => {
        //Llamada get a la db
        let data = await Axios.get('https://agapeapp-7f28c-default-rtdb.firebaseio.com/items.json')
        let resData = data.data
        /* 
            el array de productos viene asi:
            [
                id{
                    dato:dato,
                    dato:dato,
                    dato:dato,
                    dato:dato
                },
                id{
                    dato:dato,
                    dato:dato,
                    dato:dato,
                    dato:dato
                },
                id{
                    dato:dato,
                    dato:dato,
                    dato:dato,
                    dato:dato
                }
            ]

            //Necesito que quede asi:

            [
                {
                    id:id,
                    dato:dato,
                    dato:dato,
                    dato:dato,
                    dato:dato
                },
                {
                    id:id,
                    dato:dato,
                    dato:dato,
                    dato:dato,
                    dato:dato
                },
                {
                    id:id,
                    dato:dato,
                    dato:dato,
                    dato:dato,
                    dato:dato
                }
            ]
        */
        //El siguiente codigo hace eso. Quiza se podria optimizar pero es lo que se me ocurrio en el momento

        let productosArray = []
        let productoFinal = []
        let claves = Object.keys(resData)
        for (let i = 0; i < claves.length; i++) {
            let clave = claves[i]

            productosArray.push(resData[clave])
        }

        for (let i = 0; i < productosArray.length; i++) {

            productoFinal.push({ id: claves[i], name: productosArray[i].name, description: productosArray[i].description, price: productosArray[i].price, img: productosArray[i].img, category: productosArray[i].category, stock: productosArray[i].stock })

        }

        setAllProducts(productoFinal)
    }




    //Se llama al montarse
    useEffect(() => {
        getProdFirebase()


    }, [])



    //SECCION DEL ARMADO DEL PEDIDO 

    const [pedido, setpedido] = useState({})
    const [idPedido, setidPedido] = useState('');

    //Funcion que se ejecuta cuando se envia el form
    const newPedido = (datosForm) => {

        //ATENCION: Segui los pasos que decia la presentacion de la clase para la libreria Timestamp
        //No me funciono, me daba segundos y milisegundos. Lo resolvi usando esta funcion propia de js
        //Termino creando una variable que indica la fecha actual(9/8/2021)
        let date = new Date()
        let month = date.getMonth() + 1;
        let day = date.getUTCDate();
        let year = date.getUTCFullYear();

        let finalDate = `${day}/${month}/${year}`

        //Dentro del buyer uso los datos que obtengo del usuario por ingresar con Google
        //Y los datos del form
        let newOrder = {
            buyer: {
                nombre: user.name,
                email: user.email,
                direccion: datosForm.direccion,
                telefono: datosForm.telefono,
            },
            //Items tiene los items del cart
            items: [
                ...cartProducts,

            ],
            date: finalDate,
            totalPrice: total

        }
        setpedido(newOrder)
        //Envia por post el pedido. tengo una subcoleccion dentro de la coleccion orders que corresponde al uid del usuario. dentro se coloca cada pedido
        //Esto queda asi debido a la regla que le puse a la db.
        /*
           orders:{
               userUID:{
                   Pedido1:{

                   }

                   Pedido2:{

                   }
               },
               userUID:{
                   Pedido:{

                   }

               }
           }
        */


        Axios.post(`https://agapeapp-7f28c-default-rtdb.firebaseio.com/orders/${user.uid}.json?auth=${user.tokenId}`, pedido)
            .then(response =>
                //Se guarda en el state idPedido el id para mostrar y se actualiza el stock
                setidPedido(response.data.name),
                updateStock())

            .catch((error) => console.log(error))



    }

    const updateStock = () => {
        //Se recorre el cart
        cartProducts.forEach(cartI => {
            //Se busca el producto que corresponde con ese id
            let prod = allProducts.filter(allP => allP.id === cartI.item.id)
            //Obtengo ese stock y le resto la cantidad que compro
            let newStock = { stock: prod[0].stock - cartI.quantity }
            //Actualizo ese stock del producto en la db
            Axios.patch(`https://agapeapp-7f28c-default-rtdb.firebaseio.com/items/${cartI.item.id}.json`, newStock)
                .then((result) => {
                    //Borro el cart
                    removeAll()
                    //Llamo a los productos para actualizar el catalogo
                    getProdFirebase()

                }).catch((err) => {
                    console.log(err)
                });
        })


    }



    return <FirebaseContext.Provider value={{
        authGoogle,
        isLogged,
        signOut,
        user,
        allProducts,
        newPedido,
        idPedido,
        setidPedido

    }} {...props} />
}



export function useFirebase() {
    const context = React.useContext(FirebaseContext)

    //asegurarme de que no lo estoy llamando en un componente que no es hijo
    //solo es una verificacion
    if (!context) {
        throw new Error('useFirebase debe estar dentro del provider UseFirebase')
    }

    return context;
}