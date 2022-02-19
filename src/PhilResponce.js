import React from "react";
import person from "./Images/person.png"
import robot2 from "./Images/robot_2.png"


const PhilsNewResponse = props => {
    const PhilsResponseTemplate = props.messagesList.map((response) => {
        return (
            <div className="parsedHuman">
                <h4 key={response.id}>
                    {response.said}
                </h4>
                <img src={person} alt="yourself" />
            </div>
        )
    })

    return (
      <div className="flex-chat">
        <div className="chatbox-robot">
          <img src={robot2} alt="robot" />
          <h4>How are you doing?</h4>
        </div>
        {PhilsResponseTemplate}
      </div>
    );
}

export default PhilsNewResponse;