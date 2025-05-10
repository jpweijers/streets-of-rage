import {
  type AnimatedSprite,
  AnimatedSpriteComponent,
} from "../components/animated-sprite.component";
import { Entity } from "./entity";

class IdleAnimation {
  static instance: IdleAnimation | null = null;
  public image: HTMLImageElement;

  private constructor() {
    this.image = new Image();
    this.image.src = "/idle.png";
  }

  static getInstance(): IdleAnimation {
    if (!IdleAnimation.instance) {
      IdleAnimation.instance = new IdleAnimation();
    }
    return IdleAnimation.instance;
  }

  static get image(): HTMLImageElement {
    return IdleAnimation.getInstance().image;
  }
}

const sprites: { [key: string]: AnimatedSprite } = {
  idle: {
    image: IdleAnimation.image,
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 3,
    frameDuration: 60 / 300,
    currentFrame: 0,
    anchor: { x: 0.5, y: 0.5 },
    loop: true,
  },
};

export class PlayerEntity extends Entity {
  constructor() {
    super();

    this.addComponent(new AnimatedSpriteComponent(sprites));
  }
}
