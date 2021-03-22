export class Vector2 {
  constructor(public x: number = 0, public y: number = 0) {}

  public add(vector: Vector2) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  public scale(vector: Vector2) {
    // console.log(vector);
    this.x *= vector.x;
    this.y *= vector.y;

    return this;
  }

  public clone() {
    return new Vector2(this.x, this.y);
  }
}
