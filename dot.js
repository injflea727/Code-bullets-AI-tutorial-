class Dot {
    constructor() {
      this.brain = new Brain(200);
      this.pos = new p5.Vector(width / 2, height - 10);
      this.vel = new p5.Vector(0, 0);
      this.acc = new p5.Vector(0, 0);
      this.dead = false;
      this.reachedGoal = false;
      this.goal = new p5.Vector(260, 10);
      const fitness = 0;
    }
  
    show() {
      if (this.isBest) {
        fill(0, 255, 0);
        ellipse(this.pos.x, this.pos.y, 8, 8);
      } else {
        fill(0);
        ellipse(this.pos.x, this.pos.y, 4, 4);
      }
    }
  
    move() {
      if (this.brain.directions.length > this.brain.step) {
        this.acc = this.brain.directions[this.brain.step];
        this.brain.step++;
      } else {
        this.dead = true;
      }
  
      this.vel.add(this.acc);
      this.vel.limit(5);
      this.pos.add(this.vel);
    }
  
    update() {
      if (!this.dead && !this.reachedGoal) {
        this.move();
        if (this.pos.x < 2 ||this.pos.y < 2 ||this.pos.x > width - 2 ||this.pos.y > height - 2) {
          this.dead = true;
        } else if (dist(this.pos.x, this.pos.y, this.goal.x, this.goal.y) < 5) {
          this.reachedGoal = true;
        } else if(this.pos.x < 425 && this.pos.y < 210 && this.pos.x > 75 && this.pos.y > 200){
          this.dead = true;
        }
      }
    }
  
    calculateFitness() {
      if (this.reachedGoal) {
        this.fitness = 1.0/16.0 +10000.0 / float(this.brain.step * this.brain.step);
      } else {
        const distanceToGoal = dist(
          this.pos.x,
          this.pos.y,
          this.goal.x,
          this.goal.y
        );
        this.fitness = 1.0 / (distanceToGoal * distanceToGoal);
      }
    }
    gimmiebaby() {
      this.baby = new Dot();
      this.baby.brain = this.brain.clone();
      return this.baby;
    }
  }
  