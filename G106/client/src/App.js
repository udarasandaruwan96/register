import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Contact from "./components/Contact/Contact";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import Customer from "./components/Customer/Customer.js";
import { CartContext } from "./Context/CartContext";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/customer" component={Customer} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
