import { Vector2 } from "./vector";
import { Ball } from "./ball";

const $canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;

let friction = 1;

function generateBall() {
  const ball = new Ball(Math.floor(Math.random() * 5) + 1);
  const x = Math.random() * $canvas.width;
  const y = Math.random() * $canvas.height;
  ball.position.x = x;
  ball.position.y = y;
  ball.velocity = new Vector2(
    Math.floor(Math.random() * 2) - 2,
    Math.floor(Math.random() * 2) - 2
  );
  const color = Math.floor(Math.random() * 0xffffff).toString(16);
  ball.color = `#${color.padStart(6, "0")}`;

  ball.friction = friction;

  return ball;
}

const balls: Ball[] = Array.from({ length: 100 }, (_) => generateBall());

const wind = new Vector2(0.005, 0);
const gravity = new Vector2(0, 0.05);
const keyboard = new Vector2(0, 0);
const fps = 1000 / 60;
let lastTime = 0;
// ball.velocity = new Vector2(1, 0);
const $friction = document.getElementById("friction") as HTMLInputElement;
const $wind = document.getElementById("wind") as HTMLInputElement;
const $gravity = document.getElementById("gravity") as HTMLInputElement;

$friction.addEventListener("input", (e) => {
  friction = Number($friction.value);
});

$gravity.addEventListener("input", (e) => {
  gravity.y = Number($gravity.value);
});

$wind.addEventListener("input", (e) => {
  wind.x = Number($wind.value);
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") {
    keyboard.add(new Vector2(0, -0.01));
  } else if (e.key === "ArrowDown") {
    keyboard.add(new Vector2(0, 0.01));
  }

  if (e.key === "ArrowLeft") {
    keyboard.add(new Vector2(-0.01, 0));
  } else if (e.key === "ArrowRight") {
    keyboard.add(new Vector2(0.01, 0));
  }
});

function update(dt: number) {
  // console.log(dt);
  balls.forEach((ball, index) => {
    ball.friction = friction;
    ball.acceleration.add(wind).add(gravity);
    ball.acceleration.add(keyboard);

    ball.update(dt);

    if (ball.position.y >= $canvas.height) {
      ball.position.y = $canvas.height;
      ball.velocity.scale(new Vector2(1, -1));

      // balls.splice(index, 1, generateBall());
    }

    if (ball.position.y <= 0) {
      ball.position.y = 0;
      ball.velocity.scale(new Vector2(1, -1));

      // balls.splice(index, 1, generateBall());
    }

    if (ball.position.x >= $canvas.width) {
      ball.position.x = $canvas.width;
      ball.velocity.scale(new Vector2(-1, 1));

      // balls.splice(index, 1, generateBall());
    }

    if (ball.position.x <= 0) {
      ball.position.x = 0;
      ball.velocity.scale(new Vector2(-1, 1));

      // balls.splice(index, 1, generateBall());
    }
  });
}

function render() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  balls.forEach((ball) => {
    ball.render(ctx);
  });
}

function loop(timestamp: number) {
  window.requestAnimationFrame(loop);

  const elapsedTime = timestamp - lastTime;

  // console.log(elapsedTime, fps, elapsedTime >= fps);
  lastTime = timestamp;
  const dt = elapsedTime / fps;

  update(dt);
  render();
}

window.requestAnimationFrame(loop);
