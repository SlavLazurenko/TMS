import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, Events, Profile, Login } from "./components";

function App() {
  return (
    <div className="App">
        <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/events" exact component={() => <Events />} />
          <Route path="/profile" exact component={() => <Profile />} />
          <Route path="/login" exact component={() => <Login />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
