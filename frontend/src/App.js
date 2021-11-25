import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, Events, Profile, Login, SignUp, EventRegistration, Logout } from "./components";
import useToken from "./components/useToken";
import { useCookies } from 'react-cookie';


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken', 'username']);
  const {token, setToken} = useToken();

  const setAuthToken = newToken => {
    setCookie("authToken", newToken);
  }

  const setUsername = newUsername => {
    setCookie("username", newUsername);
  }

  return (
    <div className="App">
        <Router>
        <Navigation token={token}/>
        <Switch>
          <Route path="/" exact component={() => <Home cookies={cookies} setCookie={setCookie} />} />
          <Route path="/events" exact component={() => <Events />} />
          <Route path="/profile" exact component={() => <Profile />} />
          <Route path="/login" render={(props) => ( <Login {...props} setToken={setToken} setAuthToken={setAuthToken} setUsername={setUsername}/>)} />  
          <Route path="/event-registration" exact component={() => <EventRegistration />} />
          <Route path="/signup" render={(props) => (<SignUp {...props} />)}/>
          <Route path="/logout" exact component={() => <Logout/>} />
        </Switch>
      </Router>
    </div>
  );

}
export default App;
