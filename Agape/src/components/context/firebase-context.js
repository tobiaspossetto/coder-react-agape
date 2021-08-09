import React,{ useState, useEffect} from "react";
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';
import Axios from 'axios'
import { useCart } from './cart-context'


//Inicio la app de firebase antes de comenzar el context

const FirebaseContext = React.createContext();

const firebaseConfig = {
    apiKey: "AIzaSyCs57LkTJ17PhrkEo5XPVY4b71sKw2-0BU",
    authDomain: "agapeapp-7f28c.firebaseapp.com",
    projectId: "agapeapp-7f28c",
    storageBucket: "agapeapp-7f28c.appspot.com",
    messagingSenderId: "1007000022642",
    appId: "1:1007000022642:web:97d4831415780cd460dceb"
  };
  firebase.initializeApp(firebaseConfig);
 const auth = firebase.auth()
const  provider = new firebase.auth.GoogleAuthProvider();

//Provider
export  function FirebaseProvider(props) {

    //Necesito estas funciones y estados del cart-context 
    const { total, cartProducts,removeAll } = useCart()


    //SECCION DE LOGIN DEL USUARIO

    //State booleano que indica si esta loggeado o no, utilizado en el navbar para el btn de ingresar
   const [isLogged, setIsLogged] = useState(false);
    
   //Datos del usuario que se completan y vacian dependiendo si ingreso
    const [user, setUser] = useState({
        name:null,
        email:null,
        tokenId: null,
        uid: null
    })


        
  useEffect(() =>{
      //Esta funcion escucha si hay algun cambio de autenticacion
    auth.onAuthStateChanged(user =>{
        if(user){
           //Si detecta que hay un usuario seteo el state IsLogged
            setIsLogged(true)
            
           //Ejecuto esta funcion que me devuelve su token, me sirve para cuando cree un pedido
            user.getIdToken(true)
                .then((token) =>
                    //Si recibo el token entonces completo los datos del usuario
                      setUser({name: user.displayName, email: user.email, tokenId: token, uid: user.uid})
                     
                )
                .catch((error) => console.log(error))

        }else{
            //Si no detecta que hay un usuario, significa que salio o nunca entro
            //Borro todo lo que tenga que ver con un usuario
            setIsLogged(false)
            setUser({name: null, email: null, tokenId: null})
           
        }
    })
  },[])
      
//Funcion que abre el popup de Google y permite ingresar con una cuenta
const authGoogle = () => {
   auth.signInWithPopup(provider)
}
//Funcion que cierra sesión 
const signOut = () => {
    auth.signOut()
   
}


//SECCION DE PEDIDO DE PRODUCTO A LA DATABASE

    const getProdFirebase = async () =>{
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
          for (let i = 0; i < claves.length; i++){
              let clave = claves[i]
             
              productosArray.push(resData[clave])
          }
         
         for (let i = 0; i < productosArray.length; i++) {
             
             productoFinal.push({id:claves[i], name:productosArray[i].name, description: productosArray[i].description, price:productosArray[i].price, img: productosArray[i].img, category:productosArray[i].category, stock:productosArray[i].stock})
             
         }
        
        setAllProducts(productoFinal)
     }
 
     
   
     
     //Se llama al montarse
     useEffect(() =>{
         getProdFirebase()
        
      
     },[])









  const [allProducts, setAllProducts] = useState([]);
  
  const [pedido, setpedido] = useState({})
  const [idPedido, setidPedido] = useState('');
 const newPedido = async (datosForm) =>{
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
        
         Axios.post(`https://agapeapp-7f28c-default-rtdb.firebaseio.com/orders/${user.uid}.json?auth=${user.tokenId}`,pedido)
          .then(response =>
             setidPedido(response.data.name),
             updateStock())

         .catch((error) => console.log(error))
          
        
        
     }
     
      const updateStock = () =>{

        cartProducts.forEach(cartI => {
            let prod = allProducts.filter(allP => allP.id === cartI.item.id)
            let newStock = {stock:prod[0].stock - cartI.quantity}
            //console.log(newStock)
            Axios.patch(`https://agapeapp-7f28c-default-rtdb.firebaseio.com/items/${cartI.item.id}.json`, newStock)
                        .then((result) => {
                            console.log(result)
                            removeAll()
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



export  function useFirebase() {
    const context = React.useContext(FirebaseContext)

    //asegurarme de que no lo estoy llamando en un componente que no es hijo
    //solo es una verificacion
    if(!context){
        throw new Error ('useFirestore debe estar dentro del provider UserFirestore')
    }

    return context;
}