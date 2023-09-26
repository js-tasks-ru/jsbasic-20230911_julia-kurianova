function makeDiagonalRed(table) {
  const rows = Array.from(table.rows);
  rows.forEach((row, index) => {
    const cells = Array.from(row.cells);
    cells[index].style.backgroundColor = "red";
  });
}
