let cells = [];
let cellSize;
let cols, rows;

function setup() {
  createCanvas(500, 500);
  const div = document.querySelector("canvas");
  div.addEventListener("contextmenu", (event) => {event.preventDefault(); return false; });
  
  cellSize = floor(random(18, 40));
  while (width % cellSize !== 0) {
    cellSize++;
  }
  
  // Making 2D Array
  rows = height / cellSize;
  cols = width / cellSize;

  cells = [];
  for (let i = 0; i < cols; i++) {
    let col = [];
    for (let j = 0; j < rows; j++) {
      
      const r = Math.round(random(0, 3));
      let element;
      if (r == 0) {
        element = new Mine(i, j, cellSize);
      } else {
        element = new Cell(i, j, cellSize);
      }
      
      col.push(element);
    }
  cells.push(col);
  }
}

function nToCoord(n, xs) {
  const x = n % xs;
  const y = (n-x) / xs;
  return createVector(x, y);
}

function lose() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      cells[i][j].revealed = true;
    }
  }
}

function draw() {
  background(255);
  
  // Display all cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      cells[i][j].countMines(cells);
      cells[i][j].display();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cell = cells[i][j];
      cell.clicked(cells);
    }
  }
}
