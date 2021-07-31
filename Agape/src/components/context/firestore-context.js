import React,{ useState, useEffect} from "react";

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';


const FirestoreContext = React.createContext();
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



export  function FirestoreProvider(props) {
  const [isLogged, setIsLogged] = useState(false);
    
       
   useEffect(() =>{
        auth.onAuthStateChanged(user =>{
            if(user){
                setIsLogged(true)
                console.log("ENTRO")
                console.log(user.displayName)
            }else{
                setIsLogged(false)
               console.log("SALIO")
            }
        })
   })
  
    



const authGoogle = () => {
    
    console.log('no esta logead')
   auth.signInWithPopup(provider)
    .then(response => {
       
        
      
    })
    .catch(err => {
        console.log(err)
       
      
    })
   
    
}
const signOut = () => {
    auth.signOut().then(()=>{
        
        
    })
}
const getFirestore = () => {
    //retorna el acceso al servicio firestore
    return firebase.firestore(app)
}

    return <FirestoreContext.Provider value={{
        authGoogle,
        getFirestore,
        isLogged,
        signOut
    }} {...props} />
}



export  function useFirestore() {
    const context = React.useContext(FirestoreContext)

    //asegurarme de que no lo estoy llamando en un componente que no es hijo
    //solo es una verificacion
    if(!context){
        throw new Error ('useFirestore debe estar dentro del provider UserFirestore')
    }

    return context;
}