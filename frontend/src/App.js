import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, SearchEvent, Event, Profile, Login, SignUp, EventRegistration, Logout, WebsocketTest } from "./components";
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken', 'username']);

  const setAuthToken = newToken => {
    setCookie("authToken", newToken, {path: '/'});
  }

  const setUsername = newUsername => {
    setCookie("username", newUsername, {path: '/'});
  }

  const unsetAccount = () => {
    console.log("unset account");
    removeCookie("authToken", {path: '/'});
    removeCookie("username",  {path: "/"});
  }

  return (
    <div className="App">
        <Router>
        <Navigation username={cookies.username} unsetAccount={unsetAccount}/>
        <Switch>
          <Route path="/" exact component={() => <Home cookies={cookies} setCookie={setCookie} />} />
          <Route path="/search-event" render={(props) => (<SearchEvent {...props} />)}/>
          <Route path="/profile/:username" render={(props) => (<Profile {...props} />)}/>
          <Route path="/login" render={(props) => (
            <Login {...props} 
              setAuthToken={setAuthToken} 
              setUsername={setUsername}
            />
          )}/> 
          <Route path="/event-registration" render={(props) => <EventRegistration {...props}/>} />
          <Route path="/signup" render={(props) => (<SignUp {...props} />)}/>
          <Route path="/logout" render={(props) => (<Logout {...props} unsetAccount={unsetAccount}  />)}/>
          <Route path="/event/:id" render={(props) => <Event {...props} username={cookies.username} />}/> 
          <Route path="/websocket" render={(props) => <WebsocketTest {...props}/>} />
        </Switch>
      </Router>
    </div>
  );

}
export default App;
