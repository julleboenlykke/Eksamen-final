// Firebase setup
// Import firebase
import firebase from "firebase/compat";

// Konfiguration af Firebase til vores projekt
const firebaseConfig = {
    apiKey: "AIzaSyBYyGvmmFWDHyL0DnWuXhC1_Gx25EXv41M",
    authDomain: "eksamen-c7a2c.firebaseapp.com",
    databaseURL: "https://eksamen-c7a2c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "eksamen-c7a2c",
    storageBucket: "eksamen-c7a2c.appspot.com",
    messagingSenderId: "580927712033",
    appId: "1:580927712033:web:dfc9e66a62f7fdcd9c2c60"
};

// Vi sikre os at Firebase ikke allerede kører
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

//Vi exportere authentikation (auth) og database (db) til brug i vores projekt.
const auth = firebase.auth();
const db = firebase.database();


export { auth, db };