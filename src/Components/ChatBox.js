import React from "react";
import person from "../Images/person.png"
import robot2 from "../Images/robot_2.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";


// Installing npm install --save @fortawesome/free-solid-svg-icons
// then importing the icon that is needed.

const ChatBox = props => {

  const ChatBoxTemplate = props.messagesList.map((response) => {
    if(response.test === true) {
      return (
        <div className="parsedHuman">
              <FontAwesomeIcon icon={faCircleXmark} size="lg" onClick={() => props.deleteDoc(response.id)} />
              <h4 key={response.id}>{response.said}</h4>
              <img src={person} alt="yourself" />
            </div>
          );
    } else {
        return (
          <div className="chatbox-robot">
            <img src={robot2} alt="robot"/>
            <h4 key={response.id}>{response.robotStatement}</h4>
            <FontAwesomeIcon icon={faCircleXmark} size="lg" onClick={() => props.deleteDoc(response.id)} />
          </div>
        );
    }
      })
      
    // const AndroidResponseTemplate = props.messagesList.map((responseR) => {
    // })
      
  return (
    <div className="flex-chat">
      {ChatBoxTemplate}
    </div>
  );
}

export default ChatBox;