import React, { useState } from "react";
import axios from '../axiosConfig.js';

function Home(props) {

  const [message, setMessage] = useState("Click to get a random number");

  return (
    <div className="home">
      <p>
        { message }
      </p>
      <button onClick={() => {
        axios.get("/get-message")
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
      <button onClick={() => {
        axios.post("/test")
        .then(res => {
          console.log(res.status, res.data);
        })
        .catch(err => {
          console.log(err.response.status, err.response.data);
        });
      }}>
        Auth request
      </button>
    </div>
  );
}

export default Home;
