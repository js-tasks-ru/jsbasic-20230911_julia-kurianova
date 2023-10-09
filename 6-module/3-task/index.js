import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  elem = null;
  #slides = [];

  constructor(slides) {
    this.#slides = slides || this.#slides;
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#templateSlide());
    this.#initCarousel();

    const btns = this.elem.querySelectorAll(".carousel__button");
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const cardId = e.target.closest(".carousel__slide").dataset.id;
        this.#onAddClick(cardId);
      });
    });
  }

  #onAddClick(id) {
    const e = new CustomEvent("product-add", {
      bubbles: true,
      detail: id,
    });
    this.elem.dispatchEvent(e);
  }

  #initCarousel() {
    const carouselInner = this.elem.querySelector(".carousel__inner");
    const btnRight = this.elem.querySelector(".carousel__arrow_right");
    const btnLeft = this.elem.querySelector(".carousel__arrow_left");
    const slides = Array.from(this.elem.querySelectorAll(".carousel__slide"));

    let slideWidth;
    let currentSlideNum = 1;

    //initial left arrow state
    if (currentSlideNum === 1) {
      btnLeft.style.display = "none";
    }

    btnRight.addEventListener("click", () => {
      // calculate slide width on first load
      if (!slideWidth)
        slideWidth = this.elem.querySelector(".carousel__img").width;

      btnLeft.style.display = "flex";
      carouselInner.style.transform = `translateX(-${
        slideWidth * currentSlideNum
      }px)`;
      currentSlideNum++;

      // if current slide is the last slide
      if (currentSlideNum === slides.length) {
        btnRight.style.display = "none";
      }
    });

    btnLeft.addEventListener("click", () => {
      currentSlideNum--;
      carouselInner.style.transform = `translateX(-${
        slideWidth * currentSlideNum - slideWidth
      }px)`;

      // if current slide is the first slide
      if (currentSlideNum === 1) {
        btnLeft.style.display = "none";
        btnRight.style.display = "flex";
      }
    });
  }

  #templateSlide() {
    return `
  <!--Корневой элемент карусели-->
  <div class="carousel">
      <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    
    <div class="carousel__inner">
      ${this.#slides
        .map((slide) => {
          return `
      <div class="carousel__slide" data-id="${slide.id}">
       <img src="/assets/images/carousel/${
         slide.image
       }" class="carousel__img" alt="slide" />
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `;
        })
        .join("")}
    </div>
  </div>`;
  }
}
