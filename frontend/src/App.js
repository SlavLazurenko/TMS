import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, Events, Profile, Login, SignUp, EventRegistration } from "./components";


function App() {
  return (
    <div className="App">
        <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/events" exact component={() => <Events />} />
          <Route path="/profile" exact component={() => <Profile />} />
          <Route path="/login" render={(props) => (<Login {...props} />)} />
          <Route path="/event-registration" exact component={() => <EventRegistration />} />
          <Route path="/signup" render={(props) => (<SignUp {...props} /> )}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
