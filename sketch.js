function setup(){
    createCanvas(500, 480);
    this.Population = new Population(500);
    this.goal = new p5.Vector(260, 10);
  }
  
  function draw(){
    background(220);
    
    fill(255,0,0);
    ellipse(this.goal.x,this.goal.y,10,10);
    
    fill(0,0,255);
    rect(75,200,350,10);
    
    if(this.Population.allDotsDead()){
      this.Population.calculateFitness();
      this.Population.naturalSelection();
      this.Population.mutateDemBabies();
    }else{
    
    this.Population.update();
    this.Population.show();
    }
  }
  // I finished this boi on june 15th 2023 at 10:49 pm
  //And I started at 2:00 pm