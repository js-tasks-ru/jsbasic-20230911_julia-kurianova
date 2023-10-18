import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null;
  steps = 5;
  value = 0;

  constructor({ steps, value = 0 }) {
    this.steps = steps || this.steps;
    this.value = value;
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());

    const firstStep = this.elem
      .querySelector(".slider__steps")
      .querySelector("span");
    firstStep.classList.add("slider__step-active");

    this.elem.ondragstart = (event) => {
      event.preventDefault();
    };
    this.elem.addEventListener("click", this.#onSliderClick);
    this.elem.addEventListener("pointerdown", this.#onPointerDown);
  }

  #onSliderClick = (e) => {
    let value = this.elem.querySelector(".slider__value");
    let progress = this.elem.querySelector(".slider__progress");
    let thumb = this.elem.querySelector(".slider__thumb");

    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    let segments = this.steps - 1;
    let approximateValue = Math.round(leftRelative * segments);
    if (approximateValue >= this.steps) approximateValue = this.steps - 1;
    if (approximateValue <= 0) approximateValue = 0;

    let valuePercents = (approximateValue / segments) * 100;

    this.value = approximateValue;
    value.innerText = approximateValue;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    this.#changeValue();
  };

  #onPointerDown = () => {
    document.addEventListener("pointermove", this.#onPointerMove);
    document.addEventListener("pointerup", this.#onPointerUp, {
      once: true,
    });
  };

  #onPointerMove = (e) => {
    let value = this.elem.querySelector(".slider__value");
    let progress = this.elem.querySelector(".slider__progress");
    let thumb = this.elem.querySelector(".slider__thumb");

    this.elem.classList.add("slider_dragging");

    let left = e.clientX - this.elem.getBoundingClientRect().left;
    if (e.clientX <= this.elem.getBoundingClientRect().left) {
      left = 0;
    }
    if (e.clientX >= this.elem.getBoundingClientRect().right) {
      left = this.elem.offsetWidth;
    }

    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = Math.round(leftRelative * segments);

    if (approximateValue >= this.steps) approximateValue = this.steps - 1;
    if (approximateValue <= 0) approximateValue = 0;

    let valuePercents = leftRelative * 100;

    this.value = approximateValue;
    value.innerText = approximateValue;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
  };

  #onPointerUp = () => {
    let steps = this.elem.querySelector(".slider__steps");
    let progress = this.elem.querySelector(".slider__progress");
    let thumb = this.elem.querySelector(".slider__thumb");

    const spans = Array.from(steps.children);
    spans.map((span, index) => {
      if (span.classList.contains("slider__step-active")) {
        span.classList.remove("slider__step-active");
      }
      if (index === this.value) {
        span.classList.add("slider__step-active");
      }
    });

    thumb.style.left = `${(this.value / (this.steps - 1)) * 100}%`;
    progress.style.width = `${(this.value / (this.steps - 1)) * 100}%`;

    this.elem.classList.remove("slider_dragging");
    document.removeEventListener("pointermove", this.#onPointerMove);
    this.#changeValue();
  };

  #changeValue = () => {
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  };

  #template() {
    return `<!--Корневой элемент слайдера-->
    <div class="slider">
  
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">${this.value}</span>
      </div>
  
      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 0%;"></div>
  
      <!--Шаги слайдера-->
      <div class="slider__steps">
        ${"<span></span>\n".repeat(this.steps)}
      </div>
    </div>`;
  }
}
