class Population {
    constructor(size) {
      this.dots = [];
      this.gen = 1;
      this.bestDot = 0;
      this.minStep = 200;
  
      for (let i = 0; i < size; i++) {
        this.dots.push(new Dot(this.goal));
      }
    }
    show() {
      for (let i = 0; i < this.dots.length; i++) {
        this.dots[i].show();
      }
      this.dots[0].show();
    }
  
    update() {
      for (let i = 0; i < this.dots.length; i++) {
        if (this.dots[i].brain.step > this.minStep) {
          this.dots[i].dead = true;
        } else {
        this.dots[i].update();
      }
    }
  }
    //----------------------------------------------------------
    calculateFitness() {
      for (let i = 0; i < this.dots.length; i++) {
        this.dots[i].calculateFitness();
      }
    }
  
    //--------------------------------------------------------
  
    allDotsDead() {
      for (let i = 0; i < this.dots.length; i++) {
        if (!this.dots[i].dead && !this.dots[i].reachedGoal) {
          return false;
        }
      }
  
      return true;
    }
  
    /*nwew line*/
  
    naturalSelection() {
      this.newDots = new Array(this.dots.length);
      this.setBestDot();
      this.calculateFitnessSum();
  
      this.newDots[0] = this.dots[this.bestDot].gimmiebaby();
      this.newDots[0].isBest = true;
      for (let i = 1; i < this.newDots.length; i++) {
        //find the chosen one
        let parent = this.selectParent();
  
        //get baby
        this.newDots[i] = parent.gimmiebaby();
      }
  
      this.dots = this.newDots.slice();
      this.gen++;
    }
  
    calculateFitnessSum() {
      this.fitnessSum = 0;
      for (let i = 0; i < this.dots.length; i++) {
        this.fitnessSum += this.dots[i].fitness;
      }
    }
  
    selectParent() {
      this.rand = random(this.fitnessSum);
  
      this.runningSum = 0;
  
      for (let i = 0; i < this.dots.length; i++) {
        this.runningSum += this.dots[i].fitness;
  
        if (this.runningSum > this.rand) {
          return this.dots[i];
        }
      }
  
      // ya done fucked up
  
      return null;
    }
  
    ////////////////////////////////////////////////////
  
    mutateDemBabies() {
      for (let i = 1; i < this.dots.length; i++) {
        this.dots[i].brain.mutate();
      }
    }
  
    setBestDot() {
      this.maxs = 0;
      this.maxIndex = 0;
      for (let i = 0; i < this.dots.length; i++) {
        if (this.dots[i].fitness > this.maxs) {
          this.maxs = this.dots[i].fitness;
          this.maxIndex = i;
        }
      }
      this.bestDot = this.maxIndex;
      if (this.dots[this.bestDot].reachedGoal) {
        this.minStep = this.dots[this.bestDot].brain.step;
      }
    }
  }