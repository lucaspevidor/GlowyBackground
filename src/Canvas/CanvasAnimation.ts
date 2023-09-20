import { Vector } from "vector2d";
import { CanvasManager } from "./CanvasManager";
import { RBManager } from "./RBManager";

export class CanvasAnimation {
  public runAnimation = true;

  private cm: CanvasManager;
  private rm: RBManager;

  private lastUpdate: number = 0;

  constructor(
    canvas: HTMLCanvasElement,
    rootDiv: HTMLBodyElement,
    nObjects: number,
    colorList: string[]
  ) {
    if (colorList.length < 1) throw new Error("Invalid color list");
    if (nObjects < 1) throw new Error("Invalid number of objects");

    this.cm = new CanvasManager(canvas, rootDiv);
    this.rm = new RBManager(
      new Vector(-50, -50),
      new Vector(canvas.width + 50, canvas.height + 50)
    );

    this.rm.Generate(nObjects, canvas, colorList);
  }

  private DrawItems() {
    this.rm.RBList.forEach((rb) => {
      this.cm.drawer.DrawCircle(rb.position, rb.type.radius, rb.type.color);
    });
  }

  public UpdateFrame(timestamp: number, ca: CanvasAnimation) {
    let dt = (timestamp - ca.lastUpdate) / 1000;
    if (dt > 0.3 || dt < 0) {
      dt = 0;
    }
    ca.lastUpdate = timestamp;

    ca.cm.drawer.ClearCanvas();
    ca.rm.simulate(dt);
    ca.DrawItems();

    if (ca.runAnimation) {
      requestAnimationFrame((timestamp) => ca.UpdateFrame(timestamp, ca));
    }
  }
}
