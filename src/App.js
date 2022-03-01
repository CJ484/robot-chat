import "./App.css";
import InputBox from "./Components/Input";
import ChatBox from "./Components/ChatBox";
import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

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


export default class App extends React.Component {
  state = {
    messagesList: [],
    validValue: false,
    robotSaid: ["Test 1", "Test 2", "Test 3", "Test 4"],
    robotList: []
  };

  componentDidMount() {
    this.ReceivedMessages();
  }

  ReceivedMessages = async () => {
    const messagesDB = collection(db, "messages");
    const messagesSnapshot = await getDocs(messagesDB);

    const allmessages = [];

    // Using the test field, will determine what template should be used in order to retrieve the corresponding message
    messagesSnapshot.forEach((doc) => {
      if (doc.data().test === true) {
        const eachMessages = {
          id: doc.id,
          said: doc.data().said,
          test: doc.data().test
        };
        allmessages.push(eachMessages);
      } else {
        const eachRobotMessages = {
          id: doc.id,
          robotStatement: doc.data().robotStatement,
          test: doc.data().test
        };
        allmessages.push(eachRobotMessages);
      }
    });
    this.setState({
      messagesList: allmessages,
    });

    // console.log("After your data has been pulled. This is whats in the the.state.messagesList: ", this.state.messagesList);  
    // ^^^ This was used to display what data was being pushed from the DataBase. ^^^
  };

  checkValue = () => {
    const inputTarget = document.querySelector("input");
    const spanTarget = document.querySelector("span");
    if (inputTarget.value === "") {
      inputTarget.style.border = "4px solid red";
      spanTarget.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      alert("No Text Try Again")
      return;
    }
    else {
      inputTarget.style.border = "none"
      this.state.validValue = true;
      return;
    }

    // I have attempted my own version of a text value checker. To prevent blank values from being uploaded and taking up memory. 
    // Every newDoc will detect if the input tag has a value. If a value has been detected, then it will change the validValue state to true
    // where it will allow the newDoc() "if" statement to run its condition and add the new value to the DataBase. After it finishes uploading it will return its
    // validValue to false. If not returned to false the empty field will be pushed to the cloud.
  }

  newDoc = async (said) => {
    const collectionData = collection(db, "messages");
    this.checkValue();
    
    // With every added doc from the user will return a test that shows that a human wrote the text and now the "robot"
    if (this.state.validValue === true) {
      await addDoc(collectionData, {
        said: said,
        test: true
      });
    }
    this.state.validValue = false;
    this.phrases();
    this.ReceivedMessages();
  }

  deleteDoc = async id => {
    const messagesDB = collection(db, "messages");
    const messagesDoc = doc(messagesDB, id);
    await deleteDoc(messagesDoc);
    this.ReceivedMessages();
  }

  // Random Robot Generator
  getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  phrases = async () => {
    const robotStatement = this.state.robotSaid[this.getRandomInt(3)]
    const collectionData = collection(db, "messages");
    await addDoc(collectionData, {
      robotStatement: robotStatement,
      test: false
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Robot Chatter</h1>
        <ChatBox messagesList={this.state.messagesList} deleteDoc={this.deleteDoc}/>
        <InputBox newDoc={this.newDoc}/>
      </div>
    );
  }
}
