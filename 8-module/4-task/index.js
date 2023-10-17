import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";
import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    const productToAdd = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (productToAdd) {
      productToAdd.count++;
    } else {
      this.cartItems.push({ product, count: 1 });
    }

    this.onProductUpdate(this.cartItem);
  }

  // change amount of product
  updateProductCount(productId, amount) {
    const product = this.cartItems.find(
      (item) => item.product.id === productId
    );
    product.count = product.count + amount;
    if (!product.count) {
      this.cartItems = this.cartItems.filter(
        (item) => item.product.id !== productId
      );
    }
    this.onProductUpdate(product);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => (sum += item.count), 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, item) => (sum += item.count * item.product.price),
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modal = new Modal();

    const cartItemsNode = this.cartItems.map((item) => {
      const { product, count } = item;
      return this.renderProduct(product, count);
    });

    modal.setTitle("Your order");
    cartItemsNode.forEach((node) => {
      modal.setBody(node);
    });
    modal.setBody(this.renderOrderForm());
    modal.open();

    const modalBody = modal.elem.querySelector(".modal__body");

    modalBody.addEventListener("click", (e) => {
      const btnCounterMinus = e.target.closest(".cart-counter__button_minus");
      const btnCounterPlus = e.target.closest(".cart-counter__button_plus");
      if (btnCounterMinus) {
        const productId =
          btnCounterMinus.closest(".cart-product").dataset.productId;
        this.updateProductCount(productId, -1);
      }
      if (btnCounterPlus) {
        const productId =
          btnCounterPlus.closest(".cart-product").dataset.productId;
        this.updateProductCount(productId, 1);
      }
    });

    const form = document.body.querySelector(".cart-form");
    form.addEventListener("submit", this.onSubmit.bind(this));
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains("is-modal-open")) {
      const modal = document.body.querySelector(".modal");
      const modalBody = document.body.querySelector(".modal__body");

      let productElem = modalBody.querySelector(
        `[data-product-id="${cartItem.product.id}"].cart-product`
      );
      // Элемент, который хранит количество товаров с таким productId в корзине
      let productCount = modalBody.querySelector(
        `[data-product-id="${cartItem.product.id}"] .cart-counter__count`
      );
      // Элемент с общей стоимостью всех единиц этого товара
      let productPrice = modalBody.querySelector(
        `[data-product-id="${cartItem.product.id}"] .cart-product__price`
      );
      // Элемент с суммарной стоимостью всех товаров
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      // remove element if it has count: 0
      if (!cartItem.count) {
        productElem.remove();
      }

      // close modal if cart is empty
      if (this.isEmpty()) {
        document.body.classList.remove("is-modal-open");
        modal.remove();
      }

      // update coun in cart, total price for item, and total price for order
      productCount.innerText = cartItem.count;
      productPrice.innerText = `€${(
        cartItem.product.price * cartItem.count
      ).toFixed(2)}`;
      infoPrice.innerText = `€${this.getTotalPrice().toFixed(2)}`;
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const modal = document.body.querySelector(".modal");
    const modalTitle = modal.querySelector(".modal__title");
    const modalBody = modal.querySelector(".modal__body");
    const form = modal.querySelector(".cart-form");
    const submit = modal.querySelector("button[type='submit']");
    submit.classList.add("is-loading");
    const formData = new FormData(form);

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        submit.classList.remove("is-loading");
        modalTitle.innerText = "Success!";
        modalBody.innerHTML = `
        <div class="modal__body-inner">
          <p>Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`;
        this.cartItems = [];
        this.cartIcon.update(this);
      })
      .catch((e) => console.log(e));
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
