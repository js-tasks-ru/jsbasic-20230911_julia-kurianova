import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  elem = null;
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#cardTemplate());
    this.#renderGrid();
  }

  #renderGrid() {
    const grid = this.elem.querySelector(".products-grid__inner");
    grid.innerHTML = "";

    const filteredProducts = this.products.filter((product) => {
      return !(
        (this.filters.noNuts && product.nuts) ||
        (this.filters.vegeterianOnly && !product.vegeterian) ||
        (this.filters.maxSpiciness !== 0 &&
          product.spiciness > this.filters.maxSpiciness) ||
        (this.filters.category && product.category != this.filters.category)
      );
    });

    filteredProducts.forEach((product) => {
      grid.append(new ProductCard(product).elem);
    });
  }

  #cardTemplate() {
    return `<div class="products-grid">
    <div class="products-grid__inner">
    </div>
  </div>`;
  }

  updateFilter(filters) {
    this.filters = { ...this.filters, ...filters };
    this.#renderGrid();
  }
}
