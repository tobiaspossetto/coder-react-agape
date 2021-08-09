import firebase from 'firebase/app'
import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyCs57LkTJ17PhrkEo5XPVY4b71sKw2-0BU",
    authDomain: "agapeapp-7f28c.firebaseapp.com",
    projectId: "agapeapp-7f28c",
    storageBucket: "agapeapp-7f28c.appspot.com",
    messagingSenderId: "1007000022642",
    appId: "1:1007000022642:web:97d4831415780cd460dceb"
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider();