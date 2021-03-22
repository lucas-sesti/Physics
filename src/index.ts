import { Vector2 } from "./vector";
import { Ball } from "./ball";

const $canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;

const balls: Ball[] = Array.from({ length: 100 }, (_) => {
  const ball = new Ball(2);
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

  ball.friction = 0.9999;

  return ball;
});
const wind = new Vector2(0.005, 0);
const gravity = new Vector2(0, 0.05);
const fps = 1000 / 60;
let lastTime = 0;
console.log(balls);
// ball.velocity = new Vector2(1, 0);

function update(dt: number) {
  // console.log(dt);
  balls.forEach((ball) => {
    ball.acceleration.add(wind).add(gravity);

    ball.update(dt);

    if (ball.position.y >= $canvas.height) {
      ball.position.y = $canvas.height;
      ball.velocity.scale(new Vector2(1, -1));
    }

    if (ball.position.y <= 0) {
      ball.position.y = 0;
      ball.velocity.scale(new Vector2(1, -1));
    }

    if (ball.position.x >= $canvas.width) {
      ball.position.x = $canvas.width;
      ball.velocity.scale(new Vector2(-1, 1));
    }

    if (ball.position.x <= 0) {
      ball.position.x = 0;
      ball.velocity.scale(new Vector2(-1, 1));
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
