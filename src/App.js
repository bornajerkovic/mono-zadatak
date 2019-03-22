import React, { Component } from "react";
import Home from "./components/Home";
import Details from "./components/Details";
import Cart from "./components/Cart";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/details/:id" component={Details} />
          <Route exact path="/cart" component={Cart} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
