function highlight(table) {
  const rows = Array.from(table.rows);
  rows.shift();

  rows.forEach((row) => {
    const cells = Array.from(row.cells);

    cells.forEach((cell) => {
      // Status column
      if (cell.cellIndex === 3) {
        if (!Object.hasOwn(cell.dataset, "available")) {
          row.setAttribute("hidden", true);
        }
        if (cell.dataset.available === "true") {
          row.classList.add("available");
        }
        if (cell.dataset.available === "false") {
          row.classList.add("unavailable");
        }
      }
      // Gender column
      if (cell.cellIndex === 2) {
        if (cell.innerText === "m") row.classList.add("male");
        if (cell.innerText === "f") row.classList.add("female");
      }
      // Age column
      if (cell.cellIndex === 1) {
        if (Number(cell.innerText) < 18)
          row.style.textDecoration = "line-through";
      }
    });
  });
}
