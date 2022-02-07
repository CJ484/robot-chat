import person from "./Images/person.png";
import robot2 from "./Images/robot_2.png";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Robot Chatter</h1>
      <div className="chat">
        <div className="chatbox-robot">
          <img src={robot2} alt="robot"/>
          <h4>How are you doing?</h4>
        </div>
        <div className="chatbox-human">
          <h4>Hiya!</h4>  
          <img src={person} alt="person"/>
        </div>
      </div>
    </div>
  );
}

export default App;
