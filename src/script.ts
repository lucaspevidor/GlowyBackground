const canvasElement = document.getElementById("bg-canvas") as HTMLCanvasElement;
const c = canvasElement.getContext("2d") as CanvasRenderingContext2D;

const rootDiv = document.getElementsByTagName("body").item(0);

if (rootDiv) {
  canvasElement.width = rootDiv.clientWidth;
  canvasElement.height = rootDiv.clientHeight;
}

console.log({ w: canvasElement.width, h: canvasElement.height });
