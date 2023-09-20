import { CanvasAnimation } from "./Canvas/CanvasAnimation";

const canvasElement = document.getElementById("bg-canvas") as HTMLCanvasElement;
const rootDiv = document.getElementsByTagName("body").item(0);
if (!rootDiv) throw new Error("Rootdiv not found");

const colorList = ["#ff124f", "#ff00a0", "#fe75fe", "#7a04eb", "#120458"];

const animation = new CanvasAnimation(canvasElement, rootDiv, 50, colorList);

requestAnimationFrame((ts) => animation.UpdateFrame(ts, animation));
