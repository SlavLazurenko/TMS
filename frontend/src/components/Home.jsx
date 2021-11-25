import React, { useState } from "react";
import axios from 'axios';

function Home(props) {

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
      <button onClick={() => {
        props.setCookie("authToken", "Hello");
      }}>
        Set Cookie
      </button>
      <button onClick={() => {
        console.log(props.cookies);
      }}>
        See Cookie
      </button>
    </div>
  );
}

export default Home;
