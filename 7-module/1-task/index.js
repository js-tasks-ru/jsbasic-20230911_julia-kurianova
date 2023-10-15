import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  categories = [];
  elem = null;

  constructor(categories) {
    this.categories = categories || this.categories;
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());
    this.#onScrollMenu();
    this.#onMenuItemClick();
  }

  #onScrollMenu() {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    const leftArrow = this.elem.querySelector(".ribbon__arrow_left");
    const rightArrow = this.elem.querySelector(".ribbon__arrow_right");
    let scrollWidth;
    let clientWidth;
    let scrollLeft;
    let scrollRight;

    leftArrow.addEventListener("click", () => {
      ribbonInner.scrollBy(-350, 0);

      ribbonInner.addEventListener("scroll", () => {
        scrollLeft = ribbonInner.scrollLeft;
        if (scrollLeft === 0)
          leftArrow.classList.remove("ribbon__arrow_visible");
        else rightArrow.classList.add("ribbon__arrow_visible");
      });
    });

    rightArrow.addEventListener("click", () => {
      scrollWidth = ribbonInner.scrollWidth;
      clientWidth = ribbonInner.clientWidth;
      ribbonInner.scrollBy(350, 0);

      ribbonInner.addEventListener("scroll", () => {
        leftArrow.classList.add("ribbon__arrow_visible");
        scrollLeft = ribbonInner.scrollLeft;
        scrollRight = scrollWidth - scrollLeft - clientWidth;
        if (scrollRight === 0)
          rightArrow.classList.remove("ribbon__arrow_visible");
      });
    });
  }

  #onMenuItemClick() {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");

    // first menuItem active by default
    const itemActive = this.elem.querySelector(".ribbon__item");
    itemActive.classList.add("ribbon__item_active");

    ribbonInner.addEventListener("click", (e) => {
      e.preventDefault();

      const item = e.target.closest(".ribbon__item");
      const id = e.target.closest(".ribbon__item").dataset.id;
      const text = e.target.closest(".ribbon__item").innerText;

      if (id === text) {
        item.classList.add("ribbon__item_active");
      }

      itemActive.classList.remove("ribbon__item_active");
      this.#onSelectMenuItem(id);
    });
  }

  #onSelectMenuItem(id) {
    const e = new CustomEvent("ribbon-select", {
      detail: id,
      bubbles: true,
    });
    this.elem.dispatchEvent(e);
  }

  #template() {
    return `<!--Корневой элемент RibbonMenu-->
  <div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
      ${this.categories
        .map((category) => {
          return `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
        })
        .join("\n")}
      </nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`;
  }
}
