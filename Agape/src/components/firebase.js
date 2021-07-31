import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyD_OQ1R7OY_yrPAK1ZYwSPU6skcI_CZhv8",
    authDomain: "agape-coder.firebaseapp.com",
    projectId: "agape-coder",
    storageBucket: "agape-coder.appspot.com",
    messagingSenderId: "556990994637",
    appId: "1:556990994637:web:b423192b3ea9afb33fb184"
};


const app = firebase.initializeApp(firebaseConfig);

export const getFirestore = () => {
    //retorna el acceso al servicio firestore
    return firebase.firestore(app)
}