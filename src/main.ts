import { GameLoop } from "./core/game-loop";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<canvas id="canvas" width="800" height="600"></canvas>
`;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("webgl2");

if (!ctx) {
  throw new Error("WebGL2 not supported");
}

new GameLoop(ctx).loop();
