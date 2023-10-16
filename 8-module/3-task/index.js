export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;
    const result = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (result) {
      result.count++;
    } else {
      this.cartItems.push({ product, count: 1 });
    }

    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    const result = this.cartItems.find((item) => item.product.id === productId);
    result.count = result.count + amount;
    if (!result.count) {
      this.cartItems = this.cartItems.filter(
        (item) => item.product.id !== productId
      );
    }

    this.onProductUpdate(this.cartItem);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
