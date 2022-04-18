class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.revealed = false;
    
    this.flagged = false;
    this.numFlagged = 0;
    
    this.isMine = false;
    this.numMines = 0;
  }
  
  countMines(arr) {
    const x = this.x;
    const y = this.y;
    const cols = arr.length;
    const rows = arr[0].length;
    
    let num = 0;
    
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const col = (x + i);
        const row = (y + j);
        if (col > -1 && col < cols && row > -1 && row < rows) {
          if (arr[col][row].isMine) num++;
        }
      }
    }
    if (this.isMine) num--;
    
    this.numMines = num;
    return num;
  }
  
  countFlagged(arr) {
    const x = this.x;
    const y = this.y;
    const cols = arr.length;
    const rows = arr[0].length;
    
    let num = 0;
    
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const col = (x + i);
        const row = (y + j);
        if (col > -1 && col < cols && row > -1 && row < rows) {
          if (arr[col][row].flagged) num++;
        }
      }
    }
    if (this.flagged) num--;
    
    this.numFlagged = num;
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
          const cell = arr[col][row];
          if (!cell.isMine && !cell.revealed) cell.reveal(arr);
        }
      }
    }
  }
  
  clicked(arr) {
    if (this.containsPoint(mouseX, mouseY)) {
      if (mouseButton == LEFT) {
        switch (this.revealed) {
          case false:
            if (this.flagged) this.flagged = false;
            else if (this.isMine) lose();
            else this.reveal(arr);
            break;
          case true:
            if (this.flagged) this.flagged = false; 
            
            this.countFlagged(arr);
            if (this.numFlagged === this.numMines) {
              this.revealNeighbors(arr);
            }
            break;
        }
      }
      if (mouseButton == RIGHT) {
        this.flagged = !this.flagged;
      }
    }
  }
  
  reveal(arr) {
    this.revealed = true;
    
    if (this.numMines == 0) {
      this.floodFill(arr);
    }
  }
  
  revealNeighbors(arr) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const col = (this.x + i);
        const row = (this.y + j);
        if (col > -1 && col < cols && row > -1 && row < rows) {
          const cell = arr[col][row];
          if (!cell.flagged && !cell.revealed && cell.isMine) {
            lose();
          } else if (!cell.isMine) {
            cell.reveal(arr);
          }
        }
      }
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
