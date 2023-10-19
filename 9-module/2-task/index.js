import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  carousel = {};
  ribbonMenu = {};
  stepSlider = {};
  cartIcon = {};
  cart = {};
  productsGrid = {};

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({ steps: 5 });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
  }

  async render() {
    const result = await fetch("./products.json");
    const products = await result.json();

    this.productsGrid = new ProductsGrid(products);

    const body = document.body;
    const carouselHolder = document.body.querySelector(
      "[data-carousel-holder]"
    );
    const ribbonHolder = document.body.querySelector("[data-ribbon-holder]");
    const sliderHolder = document.body.querySelector("[data-slider-holder]");
    const cartHolder = document.body.querySelector("[data-cart-icon-holder]");
    const productsGridHolder = document.body.querySelector(
      "[data-products-grid-holder]"
    );
    const nutCheck = document.body.querySelector("#nuts-checkbox");
    const vegCheck = document.body.querySelector("#vegeterian-checkbox");
    const filters = document.body.querySelector(".filters");

    carouselHolder.append(this.carousel.elem);
    ribbonHolder.append(this.ribbonMenu.elem);
    sliderHolder.append(this.stepSlider.elem);
    cartHolder.append(this.cartIcon.elem);
    productsGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });

    body.addEventListener("product-add", (e) => {
      const productToAdd = products.find((product) => product.id === e.detail);
      this.cart.addProduct(productToAdd);
    });

    sliderHolder.addEventListener("slider-change", (e) => {
      this.productsGrid.updateFilter({ maxSpiciness: e.detail });
    });

    ribbonHolder.addEventListener("ribbon-select", (e) => {
      this.productsGrid.updateFilter({
        category: e.detail,
      });
    });

    filters.addEventListener("change", (e) => {
      if (e.target.id === "nuts-checkbox")
        this.productsGrid.updateFilter({ noNuts: e.target.checked });
      if (e.target.id === "vegeterian-checkbox")
        this.productsGrid.updateFilter({ vegeterianOnly: e.target.checked });
    });
  }
}
