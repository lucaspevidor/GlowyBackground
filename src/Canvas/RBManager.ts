import { Vector } from "vector2d";

export interface Circle {
  radius: number;
  color: string;
}

export interface RigidBody {
  id?: number;
  type: Circle;
  mass: number;
  velocity: Vector;
  position: Vector;
}

export class RBManager {
  public RBList: RigidBody[] = [];
  public rbCounter = 0;

  private maxV = 250;

  constructor(public tlBounds: Vector, public brBounds: Vector) {}

  public AddRB(rb: RigidBody) {
    rb.id = this.rbCounter++;
    this.RBList.push(rb);
  }

  public simulate(dt: number) {
    this.RBList.forEach((rb) => {
      const other = this.RBList.filter((o) => o.id !== rb.id);

      // Resulting force update:
      let rForce = new Vector(0, 0);
      other.forEach((o) => {
        const k = 100 * rb.mass * o.mass;
        const f = k / rb.position.clone().subtract(o.position).magnitude();
        rForce = rForce.add(
          o.position.clone().subtract(rb.position).unit().mulS(f)
        );
      });

      // Position update:
      rb.position = rb.position.add(rb.velocity.clone().mulS(dt));

      // Velocity update;
      rb.velocity = rb.velocity.add(rForce.divS(rb.mass));
      if (rb.velocity.magnitude() > this.maxV) {
        rb.velocity = rb.velocity.unit().mulS(this.maxV);
      }

      // Check for bounds and inverts speed
      if (
        (rb.position.x > this.brBounds.x && rb.velocity.x > 0) ||
        (rb.position.x < this.tlBounds.x && rb.velocity.x < 0)
      ) {
        rb.velocity.x = -rb.velocity.x;
      }
      if (
        (rb.position.y > this.brBounds.y && rb.velocity.y > 0) ||
        (rb.position.y < this.tlBounds.y && rb.velocity.y < 0)
      ) {
        rb.velocity.y = -rb.velocity.y;
      }
    });
  }

  public Generate(n: number, canvas: HTMLCanvasElement, colors: string[]) {
    const { width, height } = canvas;

    if (colors.length === 0) throw new Error("Invalid color array");
    let colorCounter = 0;

    for (let i = 0; i < n; i++) {
      const obj: RigidBody = {
        type: {
          radius: 30 + Math.random() * 0.15 * Math.min(width, height),
          color: colors[colorCounter],
        },
        mass: (Math.random() * 3) / (n / 1.5),
        velocity: new Vector(
          Math.random() * 250 + 30 * Math.sign(Math.random() - 0.5),
          Math.random() * 250 + 30 * Math.sign(Math.random() - 0.5)
        ),
        position: new Vector(Math.random() * width, Math.random() * height),
      };

      colorCounter++;
      if (colorCounter >= colors.length) {
        colorCounter = 0;
      }

      this.AddRB(obj);
    }
  }
}
