import { Vector2 } from "./vector";

export class Ball {
  public position: Vector2 = new Vector2();
  public velocity: Vector2 = new Vector2();
  public acceleration: Vector2 = new Vector2();
  public friction: number = 2;

  constructor(public radius: number = 16, public color = "#000000") {}

  public render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  public update(dt: number) {
    this.velocity
      .add(this.acceleration)
      .scale(new Vector2(this.friction, this.friction));
    this.acceleration.scale(new Vector2(0, 0));
    this.position.add(this.velocity.clone().scale(new Vector2(dt, dt)));
  }
}
