import { CanvasManager } from "./CanvasManager";
import { Vector } from "vector2d";

class CanvasDrawer {
  constructor(public cm: CanvasManager) {}

  DrawCircle(position: Vector, radius: number, color: string) {
    const { c } = this.cm;

    c.shadowColor = color;
    c.shadowBlur = 100;

    c.fillStyle = color;
    c.beginPath();
    c.ellipse(position.x, position.y, radius, radius, 0, 0, 2 * Math.PI);
    c.fill();
  }

  ClearCanvas() {
    this.cm.c.clearRect(0, 0, this.cm.canvas.width, this.cm.canvas.height);
  }
}

export { CanvasDrawer };
