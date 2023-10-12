/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
function createElement(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.firstElementChild;
}

export default class UserTable {
  elem = null;
  #rows = [];

  constructor(rows) {
    this.#rows = rows || this.#rows;
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());
    this.elem.addEventListener("click", this.#removeRow);
  }

  #removeRow(e) {
    if (e.target.innerHTML === "X") {
      e.target.closest("tr").remove();
    }
  }

  #template() {
    return ` <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${this.#rows
          .map((row, index) => {
            return `<tr>
          <td>${row.name}</td>
          <td>${row.age}</td>
          <td>${row.salary}</td>
          <td>${row.city}</td>
          <td><button>X</button></td>
        </tr>`;
          })
          .join("\n")}
      </tbody>
    </table>
    `;
  }
}
