// ===================================
// Firebase Verbindung
// ===================================


// DEINE FIREBASE DATEN EINTRAGEN

const firebaseConfig = {

    apiKey: "DEIN_API_KEY",

    authDomain:
    "webseite-roller.firebaseapp.com",

    projectId:
    "webseite-roller",

    storageBucket:
    "webseite-roller.firebasestorage.app",

    messagingSenderId:
    "DEINE_MESSAGING_ID",

    appId:
    "DEINE_APP_ID"

};



// Firebase starten

firebase.initializeApp(firebaseConfig);



const auth = firebase.auth();

const db = firebase.firestore();