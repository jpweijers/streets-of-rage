import { Engine } from "./engine";

export class GameLoop {
  private lastTime: number = 0;
  private engine: Engine = new Engine();
  private ctx: WebGL2RenderingContext;

  constructor(ctx: WebGL2RenderingContext) {
    console.log("GameLoop initialized");
    this.ctx = ctx;
    console.log(this.ctx);
  }

  loop(time: number = 0): void {
    const deltaTime = (time - this.lastTime) / 1000;
    this.engine.update(deltaTime);
    this.lastTime = time;
    requestAnimationFrame(this.loop.bind(this));
  }
}
