import React, { Component } from "react";
import "../App.css";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Header from "./Header";

class Cart extends Component {
  state = {
    cart_items: this.props.store.cart_items
  };

  componentDidMount() {
    this.props.store.loadCartItems();
    this.setState({ cart_items: this.props.store.cart_items });
  }

  removeFromCart(item) {
    this.props.store.removeFromCart(item);
    this.setState({ cart_items: this.props.store.cart_items }, () =>
      this.displayContent()
    );
  }

  displayContent() {
    if (this.state.cart_items !== null) {
      return this.state.cart_items.map(item => (
        <div className="container--vehicle" key={item.id}>
          <h3>
            {item.name} {item.price} USD
          </h3>

          <button
            className="div--align"
            onClick={() => this.props.store.increment(item)}
          >
            +
          </button>
          <button className="div--align quan" disabled>
            {item.quantity}
          </button>
          <button
            className="div--align"
            onClick={() => this.props.store.decrement(item)}
          >
            -
          </button>

          <Link
            to={{
              pathname: `/details/${item.id}`
            }}
          >
            <button>
              <p className="button--text">Details</p>
            </button>
          </Link>

          <button
            className="remove"
            onClick={() => {
              this.removeFromCart(item);
            }}
          >
            <p className="button--text">Remove</p>
          </button>
        </div>
      ));
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        {this.displayContent()}
        <p>Total : {this.props.store.cart_total}$</p>
      </div>
    );
  }
}

export default inject(["store"])(observer(Cart));
