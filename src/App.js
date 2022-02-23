import person from "./Images/person.png";
import robot2 from "./Images/robot_2.png";
import "./App.css";
import InputBox from "./Input";
import Messages from "./Messages_human";
import PhilsNewResponse from "./PhilResponce";
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
    messagesList: []
  };

  componentDidMount() {
    this.ReceivedMessages();
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

    console.log("After your data has been pulled. This is whats in the the.state.messagesList: ", this.state.messagesList);
  };

  checkValue = () => {
    const targetId =document.querySelector("input");
    if (targetId.value == "") {
      targetId.style.border = "2px solid red";
      return true;
    }
    else {
      targetId.style.border = "none"
      return false;
    }
  }

  newDoc = async (said) => {
    if (this.checkValue == true) {
      alert("no text")
      return
    }
    await addDoc(collection(db, "messages"), { said });
    this.ReceivedMessages();
  }

  deleteDoc = async id => {
    const messagesDB = collection(db, "messages");
    const messagesDoc = doc(messagesDB, id);
    await deleteDoc(messagesDoc);
    this.ReceivedMessages();
  }

  render() {
    return (
      <div className="App">
        <h1>Robot Chatter</h1>
        <PhilsNewResponse messagesList={this.state.messagesList} deleteDoc={this.deleteDoc}/>
        <InputBox newDoc={this.newDoc}/>
      </div>
    );
  }
}
