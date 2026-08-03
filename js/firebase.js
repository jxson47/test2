// ===================================
// Firebase Verbindung
// ===================================


// DEINE FIREBASE DATEN

const firebaseConfig = {

    apiKey: "AIzaSyC90htVTaTMSaTb9xbqpEaEL_dRZOJt-K8",

    authDomain:
    "webseite-roller.firebaseapp.com",

    projectId:
    "webseite-roller",

    storageBucket:
    "webseite-roller.firebasestorage.app",

    messagingSenderId:
    "889692196344",

    appId:
    "1:889692196344:web:598cc494ee4c45fd221a0d"

};



// Firebase starten

if(!firebase.apps.length){

    firebase.initializeApp(firebaseConfig);

}



// Globale Verbindungen

const auth = firebase.auth();

const db = firebase.firestore();