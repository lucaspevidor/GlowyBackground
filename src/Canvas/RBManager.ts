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
      console.log(rForce.magnitude());
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
}
