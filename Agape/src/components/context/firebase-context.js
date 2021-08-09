import React,{ useState, useEffect} from "react";

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';
import { useCart } from './cart-context'

import Axios from 'axios'




const FirebaseContext = React.createContext();

const firebaseConfig = {
    apiKey: "AIzaSyCs57LkTJ17PhrkEo5XPVY4b71sKw2-0BU",
    authDomain: "agapeapp-7f28c.firebaseapp.com",
    projectId: "agapeapp-7f28c",
    storageBucket: "agapeapp-7f28c.appspot.com",
    messagingSenderId: "1007000022642",
    appId: "1:1007000022642:web:97d4831415780cd460dceb"
  };
   const app = firebase.initializeApp(firebaseConfig);
 const auth = firebase.auth()
const  provider = new firebase.auth.GoogleAuthProvider();



export  function FirebaseProvider(props) {

    const { total, cartProducts,removeAll } = useCart()

  const [isLogged, setIsLogged] = useState(false);
 
  const [user, setUser] = useState({
      name:null,
      email:null,
      tokenId: null,
      uid: null
  })




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
             setidPedido(response.data.name))

         .catch((error) => console.log(error))
           updateStock()
        
        
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
             
             productoFinal.push({id:claves[i], name:productosArray[i].name, description: productosArray[i].description, price:productosArray[i].price, img: productosArray[i].img, category:productosArray[i].category, stock:productosArray[i].stock})
             
         }
        
        setAllProducts(productoFinal)
     }
 
     
   
     
     
     useEffect(() =>{
         getProdFirebase()
        
      
     },[])












  
       
  useEffect(() =>{
    auth.onAuthStateChanged(user =>{
        if(user){
           
            setIsLogged(true)
            
           
            user.getIdToken(true)
                .then((token) =>
                   
                      setUser({name: user.displayName, email: user.email, tokenId: token, uid: user.uid})
                     
                )
                .catch((error) => console.log(error))

          
          
        }else{
            setIsLogged(false)
            setUser({name: null, email: null, tokenId: null})
           
        }
    })
  },[])
      
  
  
    



const authGoogle = () => {
    
    console.log('no esta logead')
   auth.signInWithPopup(provider)
    .then(response => {
       if(response.credential){
          
         
       }
        
      
    })
    .catch(err => {
        console.log(err)
       
      
    })
   
    
}
const signOut = () => {
    auth.signOut().then(()=>{
      
        
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