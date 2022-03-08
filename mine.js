class Mine extends Cell {
  constructor(x, y, size) {
    super(x, y, size);
    this.isMine = true;
  }
  
  display() {
    const x = this.x*this.size;
    const y = this.y*this.size;
    
    if (this.revealed) {
      strokeWeight(this.size/40);
      stroke(88, 91, 86);
      fill(147, 125, 100); // Shadow
      square(x, y, this.size);
      
      const offset = this.size/2;
      fill(247, 86, 124); // Pink
      ellipse(x+offset, y + offset, this.size*0.75, this.size*0.75)
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
