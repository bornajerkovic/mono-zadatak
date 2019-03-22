import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="container--header">
        <Link to="/cart">
          <button>Cart</button>
        </Link>

        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    );
  }
}

export default Header;
