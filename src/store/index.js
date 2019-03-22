import { observable, decorate, action } from "mobx";
import { Component } from "react";
import { all_models } from "./res";

class Store extends Component {
  all_models = all_models;
  filtered_categories = [];
  cart_items = [];
  cart_total = 0;

  // Prolazi kroz sve iteme i uzima njihove kategorije te ih filtrira da nema duplikata
  setCategories() {
    let elements = [];
    let categories = [];
    elements = this.all_models;
    elements.forEach(element => {
      categories = [...categories, element.category];
    });
    this.filtered_categories = Array.from(new Set(categories));
  }

  //provejerava dali je ista spremljeno u localstorage te ako je onda to stavlja u cart_items
  loadCartItems() {
    let items = JSON.parse(localStorage.getItem("cart_items"));
    if (items) {
      this.cart_items = items;
      this.cart_total = 0;
      this.cart_items.map(item => {
        return (this.cart_total += item.price * item.quantity);
      });
    }
  }

  //dodaje item u cart i sprema cart u localstorage
  addToCart(product) {
    this.cart_items = [...this.cart_items, product];
    this.cart_total += product.price;
    localStorage.setItem("cart_items", JSON.stringify(this.cart_items));
  }

  //uklanja item iz carta te takodjer sprema novi cart_items u local storage
  removeFromCart(item) {
    this.cart_items = this.cart_items.filter(product => product.id !== item.id);
    localStorage.setItem("cart_items", JSON.stringify(this.cart_items));
    this.cart_total -= item.price * item.quantity;
  }

  //inkrementira item i sprema izmjene
  increment(item) {
    let itemToIncrement = this.cart_items.find(
      product => product.id === item.id
    );
    this.cart_total -= item.price * item.quantity;
    itemToIncrement.quantity++;
    this.cart_total += item.price * item.quantity;
    localStorage.setItem("cart_items", JSON.stringify(this.cart_items));
  }

  //smanjuje broj itema i sprema izmjene
  decrement(item) {
    let itemToDecrement = this.cart_items.find(
      product => product.id === item.id
    );
    if (itemToDecrement.quantity !== 1) {
      this.cart_total -= item.price;
      itemToDecrement.quantity -= 1;
      localStorage.setItem("cart_items", JSON.stringify(this.cart_items));
    }
  }
}

decorate(Store, {
  all_models: observable,
  detail_model: observable,
  cart_items: observable,
  cart_total: observable,
  addToCart: action,
  increment: action,
  decrement: action,
  loadCartItems: action,
  removeFromCart: action,
  setCategories: action,
  filtered_categories: observable
});

const store = new Store();
export default store;
