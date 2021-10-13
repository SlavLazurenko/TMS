import React, { useState } from "react";
import axios from 'axios';

function Home() {

  const [message, setMessage] = useState("Click to get a random number");

  return (
    <div className="home">
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
    </div>
  );
}

export default Home;
