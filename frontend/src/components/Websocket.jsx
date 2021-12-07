// import { useState } from "react";
// import { w3cwebsocket } from "websocket";

// let client = new w3cwebsocket('ws://localhost:3001/ws/set-value/3', 'echo-protocol');

// client.onopen = function() {
//   console.log("Connection established");
// }


// function WebsocketTest(props) {
//   const [state, setState] = useState({value: ""});

//   const [formData, setFormState] = useState({
//     value: ""
//   });

//   const handleInputChange = event => {
//     const {name, value} = event.target;
//     setFormState({...formData, [name]: value});
//   }

//   const handleSubmit = event => {
//     event.preventDefault();
//     client.send(JSON.stringify({action: 'set-value', data: formData}));
//     // alert("Submitted");
//   }

//   client.onmessage = function(event) {
//     const msg = JSON.parse(event.data);

//     console.log(msg);
  
//     if (msg.action === 'set-value') {
//       setState({...state, value: msg.data});
//     }
//     console.log('State', state);
//   }

//   return (
//     <div className="websocket-test">
//       <div className="value">
//         {state.value}
//       </div>
//       <form onSubmit={handleSubmit}>
//         <input 
//           type="text"
//           name="value"
//           placeholder="Value"
//           value={formData.value}
//           onChange={handleInputChange}
//         >
//         </input>
//         <input type="submit" value="Submit"></input>
//       </form>
//     </div>
//   );
// }

// export default WebsocketTest;
