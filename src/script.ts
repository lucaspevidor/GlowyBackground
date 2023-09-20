import { Vector } from "vector2d";
import { CanvasManager } from "./Canvas/CanvasManager";

const canvasElement = document.getElementById("bg-canvas") as HTMLCanvasElement;
const rootDiv = document.getElementsByTagName("body").item(0);
if (!rootDiv) throw new Error("Rootdiv not found");

const cm = new CanvasManager(canvasElement, rootDiv);

cm.drawer.DrawCircle(new Vector(50, 50), 10, "pink");
