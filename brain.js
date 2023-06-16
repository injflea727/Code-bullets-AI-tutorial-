class Brain {
    constructor(size) {
      this.directions = new Array(size).fill(0);
      this.randomize();
      this.step = 0;
    }
  
    randomize() {
      for (let i = 0; i < this.directions.length; i++) {
        const randomAngle = Math.random() * (2 * Math.PI);
        this.directions[i] = p5.Vector.fromAngle(randomAngle);
      }
    }
  
    //WOOOOOOOOO MORE CODEEEEEEEEEEEEEEEEEEE//
  
    clone() {
      this.newbrain = new Brain(this.directions.length);
      for (let i = 0; i < this.directions.length; i++) {
        this.newbrain.directions[i] = this.directions[i].copy();
      }
  
      return this.newbrain;
    }
  
    mutate() {
      this.mutationRate = 0.01;
      for (let i = 0; i < this.directions.length; i++) {
        this.rand = Math.random(1);
        if (this.rand < this.mutationRate) {
          //mutate le direction
          this.randomAngle = Math.random() * (2 * Math.PI);
          this.directions[i] = p5.Vector.fromAngle(this.randomAngle);
        }
      }
    }
  }