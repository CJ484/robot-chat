import "./App.css";
import InputBox from "./Components/Input";
import ChatBox from "./Components/ChatBox";
import React from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

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
    robotSaid: ["Greetings Human",
     "Outlook Good", 
     "Concentrate and ask again", 
     "My reply is No", 
     "You humans are so cliche",
    "Robot...I think that is a hot topic",
    "Currently the best thing about being a robot is that we don't have wives!"],
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
          test: doc.data().test,
          timePosted: doc.data().timePosted,
        };

        allmessages.push(eachMessages);
      } else {
        const eachRobotMessages = {
          id: doc.id,
          robotStatement: doc.data().robotStatement,
          test: doc.data().test,
          timePosted: doc.data().timePosted,
        };
        allmessages.push(eachRobotMessages);
      }
    });
 
    //The section on the bottom sorts the timestamps from every messages so that they are displayed by the newest minutes on the lowest part of the chatBox

    const sortedMessages = allmessages.sort((a, b) => {
      return b.timePosted - a.timePosted;
    });
    this.setState({
      messagesList: sortedMessages,
    });
    // console.log("After your data has been pulled. This is whats in the the.state.messagesList: ", this.state.messagesList);
    // ^^^ This was used to display what data was being pushed from the DataBase. ^^^
  };

  checkValue = () => {
    const inputTarget = document.querySelector("input");
    if (inputTarget.value === "") {
      inputTarget.style.border = "2px solid red";
      inputTarget.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      alert("No Text Try Again");
      return;
    } else {
      inputTarget.style.border = "none";
      inputTarget.style.background = "#b1e5f2";
      this.state.validValue = true;
      return;
    }
    // I have attempted my own version of a text value checker. To prevent blank values from being uploaded and taking up memory.
    // Every newDoc will detect if the input tag has a value. If a value has been detected, then it will change the validValue state to true
    // where it will allow the newDoc() "if" statement to run its condition and add the new value to the DataBase. After it finishes uploading it will return its
    // validValue to false. If not returned to false the empty field will be pushed to the cloud.
  };

  newDoc = async (said) => {
    const collectionData = collection(db, "messages");
    const date = new Date();
    const dateFormat = s;
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    const newDate = `${month} ${day} ${year} ${hour} ${minutes} ${seconds}`;
    const testValue = true;
    const robotStatement = this.state.robotSaid[getRandomInt(7)];
    const robotData = {
      robotStatement: robotStatement,
      test: false,
      timePosted: new Date(),
    };
    const updateState = () => {
      this.ReceivedMessages();
    };

    console.log(newDate);
    
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    this.checkValue();
    // With every added doc from the user will return a test that shows that a human wrote the text and now the "robot"
    if (this.state.validValue === true) {
      await addDoc(collectionData, {
        said: said,
        test: testValue,
        timePosted: new Date(),
      });
    }
    this.state.validValue = false;
    this.ReceivedMessages();
    setTimeout(async function robotStatement() {
      await addDoc(collectionData, robotData);
      updateState();
    }, 5000);
  };

  deleteDoc = async (id) => {
    const messagesDB = collection(db, "messages");
    const messagesDoc = doc(messagesDB, id);
    await deleteDoc(messagesDoc);
    this.ReceivedMessages();
  };

  timeStamp = () => {
    const timeStamp = new Date();
    return timeStamp;
  };

  render() {
    return (
      <div className="App">
        <h1>Robot Chatter</h1>
        <ChatBox
          messagesList={this.state.messagesList}
          deleteDoc={this.deleteDoc}
        />
        <InputBox newDoc={this.newDoc} />
      </div>
    );
  }
}
