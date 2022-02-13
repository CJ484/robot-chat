import React from "react";
import person from "./Images/person.png"


const PhilsNewResponse = props => {
    const PhilsResponseTemplate = props.messagesList.map((response) => {
        return (
                <h4 key={response.id}>
                    {response.said}
                </h4>
        )
    })

    return (
        <div className="phil">
            <img src={person} alt="yourself" />
            <div>{PhilsResponseTemplate}</div>
        </div>
    )
}

export default PhilsNewResponse;