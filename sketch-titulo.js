let tituloSketch = (p) => {

    let particles = [];
    let num = 180;

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent("anim-titulo");

        for (let i = 0; i < num; i++) {
            particles.push(new Particle());
        }

        p.background(0);
        p.noStroke();
    };

    p.draw = () => {
        // FONDO CON MUCHO RASTRO
        p.background(0, 10); // ← más bajo = más rastro

        for (let part of particles) {
            part.update();
            part.show();
        }
    };

    class Particle {
        constructor() {
            this.x = p.random(p.width);
            this.y = p.random(p.height);
            this.size = p.random(1.5, 3);
            this.speedX = p.random(-0.5, 0.5);
            this.speedY = p.random(-0.5, 0.5);
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = p.width;
            if (this.x > p.width) this.x = 0;
            if (this.y < 0) this.y = p.height;
            if (this.y > p.height) this.y = 0;
        }

        show() {
            // brillo más bonito
            p.fill(150, 200, 255, 170);
            p.circle(this.x, this.y, this.size);
        }
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};
