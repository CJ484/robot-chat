import person from "./Images/person.png";
import robot2 from "./Images/robot_2.png";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Robot Chatter</h1>
      <div className="chat">
        <div className="chatbox-human">
          <img src={person} alt="person"/>  
        </div>
        <div className="chatbox-robot">
          <img src={robot2} alt="robot"/>
        </div>
      </div>
    </div>
  );
}

export default App;
