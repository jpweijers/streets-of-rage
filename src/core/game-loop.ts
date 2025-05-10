import { PlayerEntity } from "../entities/player.entity";
import { AnimationSystem } from "../systems/animation.system";
import { InputSystem } from "../systems/input.system";
import { RenderingSystem } from "../systems/rendering.system";
import { Controls } from "./controls";
import { Engine } from "./engine";

export class GameLoop {
  private lastTime: number = 0;
  private engine: Engine = new Engine();
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.engine.addEntity(new PlayerEntity());

    this.engine.addSystem(new RenderingSystem(ctx));
    this.engine.addSystem(new AnimationSystem());
    this.engine.addSystem(new InputSystem());

    new Controls(this.engine);
  }

  loop(time: number = 0): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const deltaTime = (time - this.lastTime) / 1000;
    this.engine.update(deltaTime);
    this.lastTime = time;
    requestAnimationFrame(this.loop.bind(this));
  }
}
