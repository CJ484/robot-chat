import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs  } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDBvgpVLYPsm7xBHwCIaBZCgg9I1S1lgdc",
  authDomain: "robot-chat--789.firebaseapp.com",
  projectId: "robot-chat--789",
  storageBucket: "robot-chat--789.appspot.com",
  messagingSenderId: "6195977863",
  appId: "1:6195977863:web:1dc6cc56d64971b669a222",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default class messages extends React.Component {
    state = {
        humanSays : []
    }

    getMessages = () => {
        const messagesDB = collection(db, 'messages')
    }

    render() {
        <div>
            <h1>{this.getMessages}</h1>
        </div>
    };
}
