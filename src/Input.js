import React from "react";


// The following is a component that will take care of the user's typed input 
// so that the following component can take the responce and push it to the 
// Google Data Firebase

export default class InputBox extends React.Component {
    state = {
        newText: ''
    }

    handleChange = x => {
        this.setState({
            newText: x.target.value
        })
    }

    handleSubmit = x => {
        x.preventDefault();

        const newTextObj = {
            human: this.state.newText
        }
         console.log(newTextObj);

         this.setState({
             newText: ''
         })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <span>
                        <input placeholder="Type Here" className="form-control" 
                        value={this.state.newText} onChange={this.handleChange} />
                    </span>
                    <button type="submit" className="btn">Send</button>
                </div>
            </form>
        )
    }
}