import * as firebase from 'firebase';
import 'firebase/firestore';
    
const config = {
    apiKey: "AIzaSyDPLxKxN3DMOx8ngA3eMAdIX9QuoOHyAmw",
    authDomain: "klk-messenger.firebaseapp.com",
    databaseURL: "https://klk-messenger.firebaseio.com/",
    projectId: "klk-messenger",
    storageBucket: "klk-messenger.appspot.com",
    messagingSenderId: "867379790697",
    appId: "1:867379790697:web:b9936f99da8fce662ef3f8",
    measurementId: "G-PE3KSQLXP1"
};
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    
export default firebase;