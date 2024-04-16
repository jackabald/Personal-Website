var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

var count = 0;

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.rotation = 0;
    const image = new Image();
    image.src = "./img/spaceship.png";
    image.onload = () => {
      const scale = 0.17;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20, // Slightly above the bottom
      };
    };
  }

  draw() {
    c.save();
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    c.rotate(this.rotation);
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    c.restore();
  }

  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
    }
  }
}
class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 3;
  }
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "black";
    c.fill();
    c.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
class Particle {
  constructor({ position, velocity, radius }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
  }
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "black";
    c.fill();
    c.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
class Letter {
  constructor({ imageSrc, scale }) {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
    };
  }
  draw() {
    if (this.image) {
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }
}
class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.letters = [
      new Letter({ imageSrc: "./img/J.png", scale: 0.3 }),
      new Letter({ imageSrc: "./img/A.png", scale: 0.28 }),
      new Letter({ imageSrc: "./img/C.png", scale: 0.28 }),
      new Letter({ imageSrc: "./img/K.png", scale: 0.28 }),
    ];
  }
}

const player = new Player();
const projectiles = [];
const grid = new Grid();
const particles = [];
const keys = {
  a: { pressed: false },
  d: { pressed: false },
  space: { pressed: false },
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "black";
  c.font = "bold 24px arial";
  const text = "Hi, my name is";
  const textWidth = c.measureText(text).width;
  const textX = canvas.width / 2 - textWidth / 2;
  const textY = 100;
  c.strokeText(text, textX, textY);

  positionLettersBelowText(textY + 30);

  player.update();
  particles.forEach((particle) => {
    particle.update();
  });
  projectiles.forEach((projectile, index) => {
    if (projectile.position.y + projectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    } else {
      projectile.update();
    }
  });
  grid.letters.forEach((letter, i) => {
    projectiles.forEach((projectile, j) => {
      if (
        projectile.position.y - projectile.radius <=
          letter.position.y + letter.height &&
        projectile.position.x + projectile.radius >= letter.position.x &&
        projectile.position.x - projectile.radius <=
          letter.position.x + letter.width &&
        projectile.position.y + projectile.radius >= letter.position.y
      ) {
        count++;
        console.log(count);
        for (let i = 0; i < 50; i++) {
          particles.push(
            new Particle({
              position: {
                x: letter.position.x + letter.width / 2,
                y: letter.position.y + letter.height / 2,
              },
              velocity: {
                x: (Math.random() - 0.5) * 4,
                y: (Math.random() - 0.5) * 4,
              },
              radius: Math.random() * 7,
            })
          );
        }
        setTimeout(() => {
          grid.letters.splice(i, 1);
          projectiles.splice(j, 1);
        }, 0);
      }
    });
  });

  if (keys.a.pressed && player.position.x >= 3) {
    player.velocity.x = -6;
    player.rotation = -0.2;
  } else if (
    keys.d.pressed &&
    player.position.x + player.width <= canvas.width - 3
  ) {
    player.velocity.x = 6;
    player.rotation = 0.2;
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }
}

function positionLettersBelowText(startY) {
  const letterSpacing = 60;
  let totalLettersWidth =
    grid.letters.reduce((acc, letter) => acc + letter.width, 0) +
    letterSpacing * (grid.letters.length - 1);
  let startX = canvas.width / 2 - totalLettersWidth / 2;

  grid.letters.forEach((letter) => {
    letter.position = { x: startX, y: startY };
    letter.draw();
    startX += letter.width + letterSpacing;
  });
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  animate();
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case " ":
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y,
          },
          velocity: {
            x: 0,
            y: -10,
          },
        })
      );
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  if (key === "a") {
    keys.a.pressed = false;
  } else if (key === "d") {
    keys.d.pressed = false;
  }
});
