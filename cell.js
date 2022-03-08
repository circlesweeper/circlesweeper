class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.revealed = false;
    this.flagged = false;
    
    this.isMine = false;
    this.numMines = 0;
  }
  
  countMines(arr) {
    const x = this.x;
    const y = this.y;
    const cols = arr.length;
    const rows = arr[0].length;
    
    let num = 0;
    
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const col = (x + i) % cols;
        const row = (y + j) % rows;
        if (col > -1 && col < cols && row > -1 && row < rows) {
          if (arr[col][row].isMine) num++;
        }
      }
    }
    if (this.isMine) num--;
    
    this.numMines = num;
    return num;
  }
  
  containsPoint(x, y) {
    const mx = this.x*this.size;
    const my = this.y*this.size;
    return (x > mx && 
      x < mx+this.size && 
      y > my && 
      y < my+this.size);
  }
  
  floodFill(arr) {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const col = (this.x + i);
        const row = (this.y + j);
        if (col > -1 && col < cols && row > -1 && row < rows) {
          const ref = arr[col][row];
          if (!ref.isMine && !ref.revealed) ref.reveal(arr);
        }
      }
    }
  }
  
  reveal(arr) {
    this.revealed = true;
    
    if (this.numMines == 0) {
      this.floodFill(arr);
    }
  }
  
  display() {
    const x = this.x*this.size;
    const y = this.y*this.size;
    
    if(this.revealed) {  
      strokeWeight(this.size/40);
      stroke(88, 91, 86); // Gray
      if (this.isMine) {
        fill(247, 86, 124); // Pink
      } else {
        fill(252, 246, 189); // Beige
      }
      square(x, y, this.size);
      
      if (!this.isMine && this.numMines != 0) {
        const tOffset = this.size/2;
        
        fill(88, 91, 86); // Gray
        textAlign(CENTER, CENTER);
        textSize(this.size/2);
        text(this.numMines, x+tOffset, y+tOffset);
      }
    } else {
      strokeWeight(this.size/40);
      stroke(88, 91, 86);
      fill(147, 125, 100); // Shadow
      square(x, y, this.size);
      
      if (this.flagged) {
        const offset = this.size/8;
        
        fill(142, 125, 190); // Purple
        square(x+offset, y+offset, this.size*0.75);
      }
    }
  }
}
