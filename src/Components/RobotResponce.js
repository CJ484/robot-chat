import React from "react";
import robot2 from "../Images/robot_2.png"


export default class RandomPhrase extends React.Component {
    state = {
        said = ["Test 1", "Test 2", "Test 3", "Test 4"]
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    phrases = () => {
        console.log(this.getRandomInt(3));
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}