import {
  type AnimatedSprite,
  AnimatedSpriteComponent,
} from "../components/animated-sprite.component";
import { InputComponent } from "../components/input.component";
import { StateComponent } from "../components/state.component";
import { Entity } from "./entity";

const idle = new Image();
idle.src = "/idle-2.png";

const jab = new Image();
jab.src = "/jab-2.png";

const sprites: { [key: string]: AnimatedSprite } = {
  idle: {
    image: idle,
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 3,
    frameDuration: 60 / 300,
    currentFrame: 0,
    anchor: { x: 0.5, y: 0.5 },
    loop: true,
  },
  jab: {
    image: jab,
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 1,
    frameDuration: 60 / 300,
    currentFrame: 0,
    anchor: { x: 1.2, y: 0.5 },
    loop: false,
  },
};

export class PlayerEntity extends Entity {
  constructor() {
    super();

    this.addComponent(new AnimatedSpriteComponent(sprites));
    this.addComponent(new StateComponent("idle"));
    this.addComponent(new InputComponent());
  }
}
