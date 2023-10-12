import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null;
  #steps = 5;
  #value = 0;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.elem = createElement(this.#template());

    this.elem.addEventListener("click", (e) => {
      let thumb = this.elem.querySelector(".slider__thumb");
      let value = this.elem.querySelector(".slider__value");
      let progress = this.elem.querySelector(".slider__progress");
      let steps = this.elem.querySelector(".slider__steps");

      let left = e.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.#steps - 1;
      let approximateValue = Math.round(leftRelative * segments);
      let valuePercents = (approximateValue / segments) * 100;

      this.#value = approximateValue;
      value.innerText = approximateValue;
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      const spans = Array.from(steps.children);
      spans.map((span, index) => {
        if (span.classList.contains("slider__step-active")) {
          span.classList.remove("slider__step-active");
        }
        if (index === approximateValue + 1) {
          span.classList.add("slider__step-active");
        }
      });

      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.#value,
          bubbles: true,
        })
      );
    });
  }

  #template() {
    return `<!--Корневой элемент слайдера-->
    <div class="slider">
  
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">${this.#value}</span>
      </div>
  
      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 0%;"></div>
  
      <!--Шаги слайдера-->
      <div class="slider__steps">
        <span class="slider__step-active"></span>
        ${"<span></span>\n".repeat(this.#steps - 1)}
      </div>
    </div>`;
  }
}

// class="slider__step-active"
