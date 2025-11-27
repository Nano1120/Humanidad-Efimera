let portadaSketch = (p) => {

  let inc = 0.1;
  let scl = 26; 
  let cols, rows;
  let zoff = 0;

  let particles = [];
  let flowfield = [];

  p.setup = () => {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent("anim-portada");

    initFlowfield();

    let totalParticles = p.windowWidth < 900 ? 1500 : 2500;
    for (let i = 0; i < totalParticles; i++) {
      particles.push(new Particle(p));
    }

    p.background(24, 55, 40);
    p.strokeCap(p.ROUND);
  };

  function initFlowfield() {
    cols = p.floor(p.width / scl);
    rows = p.floor(p.height / scl);
    flowfield = new Array(cols * rows);
  }
  
  p.draw = () => {
    p.background(24, 55, 40, 20);

    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;

      for (let x = 0; x < cols; x++) {
        let index = x + y * cols;
        let angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 2.1;
        let v = p5.Vector.fromAngle(angle);
        v.setMag(0.12);

        flowfield[index] = v;
        xoff += inc;
      }

      yoff += inc;
    }

    zoff += 0.00015;

    for (let prt of particles) {
      prt.follow(flowfield, scl, cols);
      prt.update();
      prt.edges(p.width, p.height);
      prt.show();
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    initFlowfield();
  };

  class Particle {
    constructor(p) {
      this.p = p;
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(0, 0);
      this.maxspeed = 0.45;
    }

    follow(flow, scl, cols) {
      let x = this.p.floor(this.pos.x / scl);
      let y = this.p.floor(this.pos.y / scl);
      let index = x + y * cols;
      let force = flow[index];
      if (force) this.applyForce(force);
    }

    applyForce(f) {
      this.acc.add(f);
    }

    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    show() {
      this.p.stroke(130, 255, 220, 140);
      this.p.strokeWeight(1);
      this.p.point(this.pos.x, this.pos.y);
    }

    edges(w, h) {
      if (this.pos.x > w) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = w;
      if (this.pos.y > h) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = h;
    }
  }
};
