import React, { Component } from "react";
import "../App.css";
import { observer, inject } from "mobx-react";

import Header from "./Header";

class Details extends Component {
  render() {
    let model = this.props.store.all_models.find(
      item => item.id === parseInt(this.props.match.params.id)
    );
    return (
      <div className="App">
        <Header />
        <div className="container--details">
          <h2>{model.name}</h2>
          <img
            src={`http://localhost:3000/${model.image}`}
            alt="img"
            className="details--image"
          />
          <h3>{model.price} USD</h3>
          <p>{model.info}</p>
        </div>
      </div>
    );
  }
}

export default inject(["store"])(observer(Details));
