import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, Events, Profile, Login, SignUp, EventRegistration, Logout } from "./components";
import { useCookies } from 'react-cookie';
import axios from './axiosConfig.js';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken', 'username']);

  const setAuthToken = newToken => {
    setCookie("authToken", newToken);
    axios.defaults.headers.common['Authorization'] = newToken;
  }

  const setUsername = newUsername => {
    setCookie("username", newUsername);
  }

  const unsetAccount = () => {
    removeCookie("authToken");
    removeCookie("username");
    delete axios.defaults.headers.common['Authorization'];
  }

  return (
    <div className="App">
        <Router>
        <Navigation username={cookies.username}/>
        <Switch>
          <Route path="/" exact component={() => <Home cookies={cookies} setCookie={setCookie} />} />
          <Route path="/events" exact component={() => <Events />} />
          <Route path="/profile" exact component={() => <Profile />} />
          <Route path="/login" render={(props) => (
            <Login {...props} 
              setAuthToken={setAuthToken} 
              setUsername={setUsername}
            />
          )}/> 
          <Route path="/event-registration" exact component={() => <EventRegistration />} />
          <Route path="/signup" render={(props) => (<SignUp {...props} />)}/>
          <Route path="/logout" render={(props) => (<Logout {...props} unsetAccount={unsetAccount}  />)}/>
        </Switch>
      </Router>
    </div>
  );

}
export default App;
