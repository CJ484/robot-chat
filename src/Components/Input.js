import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// The following is a component that will take care of the user's typed input 
// so that the following component can take the responce and push it to the 
// Google Data Firebase

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

export default class InputBox extends React.Component {
    state = {
        newText: ''
    }

    handleChange = (x) => {
        this.setState({
            newText: x.target.value
        })
    }

    handleSubmit = (x) => {
        x.preventDefault();
        this.props.newDoc(this.state.newText);
        this.setState({
            newText: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <span>
                        <input placeholder="Type Here" id="input" className="form-control" 
                        value={this.state.newText} onChange={this.handleChange} />
                    </span>
                    <button type="submit" className="btn">Send</button>
                </div>
            </form>
        )
    }
}