import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyChzdKAGmmNYoSDqt2RKTyEPPqAX5SoHXY",
    authDomain: "mytodoapp-6d507.firebaseapp.com",
    projectId: "mytodoapp-6d507",
    storageBucket: "mytodoapp-6d507.appspot.com",
    messagingSenderId: "848258017845",
    appId: "1:848258017845:web:a0eaa8a41780734e665f7c",
    measurementId: "G-MFH0EQPSZR"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

export default database;
