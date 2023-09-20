import { CanvasDrawer } from "./CanvasDrawer";

class CanvasManager {
  public readonly c: CanvasRenderingContext2D;
  public readonly drawer: CanvasDrawer;

  constructor(
    public canvas: HTMLCanvasElement,
    public parentElement: HTMLBodyElement
  ) {
    const ctx = canvas.getContext("2d");
    if (ctx === null) throw new Error("Couldn't get canvas context");

    this.c = ctx;
    this.drawer = new CanvasDrawer(this);

    this.InitializeCanvas();
  }

  private InitializeCanvas() {
    this.ResizeCanvas(this);
    window.addEventListener("resize", () => {
      this.ResizeCanvas(this);
    });
  }

  private ResizeCanvas(cm: CanvasManager) {
    this.canvas.width = this.parentElement.clientWidth;
    this.canvas.height = this.parentElement.clientHeight;
  }
}

export { CanvasManager };
