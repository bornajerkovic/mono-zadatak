import React, { Component } from "react";
import "../App.css";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

import Header from "./Header";

class Home extends Component {
  state = {
    category_filter: "all_categories",
    model_filter: "all_models",
    all_models: this.props.store.all_models,
    display_models: this.props.store.all_models,
    cart_items: []
  };
  componentDidMount() {
    this.props.store.setCategories();
    this.props.store.loadCartItems();
    this.displayItems();
  }

  //pokazuje opcije odnosno <option> nakon odabrane kategorije auta
  setModelOptions() {
    let allModels = this.state.all_models;
    allModels = allModels.filter(
      item => item.category === this.state.category_filter
    );
    return allModels.map(item => <option key={item.id}>{item.name}</option>);
  }

  //pokazuje kategorije auta
  setModelCategories() {
    return this.props.store.filtered_categories.map(item => (
      <option key={item}>{item}</option>
    ));
  }

  //prikaz
  displayItems() {
    let filtered_items = [];
    filtered_items = this.state.display_models;
    return filtered_items.map(item => (
      <div className="container--vehicle" key={item.id}>
        <div className="container--image">
          <img
            className="image"
            src={item.image}
            alt="img"
            width="160px"
            height="100px"
          />
        </div>

        <div className="cotainer--det">
          <h3 key={item.id}>
            {item.name} {item.price} USD
          </h3>

          <Link
            to={{
              pathname: `/details/${item.id}`
            }}
          >
            <button>
              <p className="button--text">Details</p>
            </button>
          </Link>

          <button onClick={() => this.addToCart(item)}>
            {this.itemState(item) ? <p>Add to Cart</p> : <p>Item in Cart</p>}
          </button>
        </div>
      </div>
    ));
  }

  //provjerava dali je item u cartu te ga dodaje
  addToCart(item) {
    this.itemState(item)
      ? this.props.store.addToCart(item)
      : console.log("Item already in cart");
  }

  //funkcija koja iskljucivo provjerava dali je item u cartu ili nije
  itemState(item) {
    let itemToFind = this.props.store.cart_items.find(
      product => product.id === item.id
    );

    if (!itemToFind) {
      return true;
    }
    return false;
  }

  //funkcija koja prikazuje iteme nakon odabrane kategorije
  getFilter(e) {
    let filterModels = [];
    let allModels = [];
    filterModels = this.state.display_models;
    allModels = this.state.all_models;

    if (e.target.value !== "all_categories") {
      filterModels = allModels.filter(item => item.category === e.target.value);
      this.setState(
        {
          display_models: filterModels,
          category_filter: e.target.value
        },
        () => this.displayItems()
      );
    } else {
      this.setState(
        {
          display_models: allModels,
          category_filter: e.target.value
        },
        () => this.displayItems()
      );
    }
  }

  //funkcija koja prikazuje modele nakon odabrane kategorije
  filterItems(e) {
    let allModels = [];
    allModels = this.state.all_models;

    allModels = allModels.filter(item => item.name === e.target.value);
    this.setState({ display_models: allModels }, () => this.displayItems());
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container--filter">
          <select
            onChange={e => this.getFilter(e)}
            id="category_filter"
            value={this.state.category_filter}
          >
            <option value="all_categories">All Categories</option>
            {this.setModelCategories()}
          </select>

          <select
            onChange={e => this.filterItems(e)}
            id="model_filter"
            value={this.state.model_filter}
          >
            {this.setModelOptions()}
          </select>
        </div>

        <div>
          <div>{this.displayItems()}</div>
        </div>
      </div>
    );
  }
}

export default inject(["store"])(observer(Home));
