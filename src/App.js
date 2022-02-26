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
    this.phrases();
  }

  ReceivedMessages = async () => {
    const messagesDB = collection(db, "messages");
    const messagesSnapshot = await getDocs(messagesDB);

    const allmessages = [];
    messagesSnapshot.forEach((doc) => {
      const eachMessages = {
        id: doc.id,
        said: doc.data().said
      };
      allmessages.push(eachMessages);
    });
    this.setState({
      messagesList: allmessages,
    });

    // console.log("After your data has been pulled. This is whats in the the.state.messagesList: ", this.state.messagesList);  <== This was used to display what data was being pushed from the DataBase.
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

    //I have attempted my own version of a text value checker. To prevent blank values from being uploaded and taking up memory. 
    //Every newDoc will detect if the input tag has a value. If a value has been detected, then it will change the validValue state to true
    //where it will allow the newDoc() "if" statement to run its condition and add the new value to the DataBase. After it finishes uploading it will return its
    //validValue to false. If not returned to false the empty field will be pushed to the cloud.
  }

  newDoc = async (said) => {
    this.checkValue();
    if (this.state.validValue === true) {
      await addDoc(collection(db, "messages"), { said });
    }
    this.state.validValue = false;
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

  phrases = () => {
    const holdStatements = [];
    const eachStatements = {
      robotStatement: this.state.robotSaid[this.getRandomInt(3)],
    };
    holdStatements.push(eachStatements);
    this.setState({
      robotList: holdStatements
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Robot Chatter</h1>
        <ChatBox messagesList={this.state.messagesList} deleteDoc={this.deleteDoc} autoResponse={this.state.robotList}/>
        <InputBox newDoc={this.newDoc}/>
      </div>
    );
  }
}
