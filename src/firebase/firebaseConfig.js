import * as firebase from 'firebase'

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAPFNS9l27JQ-zlv2OIhjo30uY8zKOvmjk",
    authDomain: "tcc-andrei.firebaseapp.com",
    databaseURL: "https://tcc-andrei.firebaseio.com",
    projectId: "tcc-andrei",
    storageBucket: "tcc-andrei.appspot.com",
    messagingSenderId: "656028081787",
    appId: "1:656028081787:web:ca85eba8255176c262ccde"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db_firebase = firebaseApp.firestore();