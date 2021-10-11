import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import axios from 'axios';

function App() {

  const [message, setMessage] = useState("Click to get a random number");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          { message }
        </p>
        <button onClick={() => {
          axios.get("http://localhost:3001/get-message")
            .then(res => {
              setMessage(`${res.status} ${res.statusText}: ${res.data}`);
            })
            .catch(err => {
              setMessage("ERROR");
              console.log(err);
            });
        }}>
          Send Request
        </button>
      </header>
    </div>
  );
}

export default App;
