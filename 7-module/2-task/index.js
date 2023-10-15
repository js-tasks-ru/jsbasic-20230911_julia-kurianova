import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  elem = null;

  constructor() {
    this.elem = createElement(this.#template());

    const closeBtn = this.elem.querySelector(".modal__close");
    closeBtn.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("keydown", (e) => this.#onCloseEsc(e));
  }

  setTitle(title) {
    this.elem.querySelector(".modal__title").innerText = title;
  }

  setBody(body) {
    this.elem.querySelector(".modal__body").append(body);
  }

  open() {
    document.body.classList.add("is-modal-open");
    document.body.append(this.elem);
  }

  close() {
    document.body.classList.remove("is-modal-open");
    const modal = document.body.querySelector(".modal");
    if (modal) modal.remove();

    document.removeEventListener("keydown", this.#onCloseEsc);
  }

  #onCloseEsc(e) {
    if (e.code === "Escape") {
      this.close();
    }
  }

  #template() {
    return `
    <!--Корневой элемент Modal-->
  <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
  </div>
    `;
  }
}
