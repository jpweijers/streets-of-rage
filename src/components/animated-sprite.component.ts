import { Component } from "./component";

export interface AnimatedSprite {
  image: HTMLImageElement;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  frameDuration: number;
  currentFrame: number;
  anchor: { x: number; y: number };
  loop: boolean;
}

export class AnimatedSpriteComponent extends Component {
  private _elapsedTime: number = 0;
  private key?: string;
  private animations: { [key: string]: AnimatedSprite };

  constructor(animations: { [key: string]: AnimatedSprite }) {
    super();
    this.key = animations[Object.keys(animations)[0]]
      ? Object.keys(animations)[0]
      : undefined;
    this.animations = animations;
  }

  get currentAnimation(): AnimatedSprite {
    if (!this.key) {
      throw new Error("No animation key set");
    }
    return this.animations[this.key];
  }

  get elapsedTime(): number {
    return this._elapsedTime;
  }

  updateElapsedTime(deltaTime: number): void {
    this._elapsedTime += deltaTime;
  }

  resetElapsedTime(): void {
    this._elapsedTime = 0;
  }

  changeAnimation(key: string): void {
    if (!this.animations[key]) {
      throw new Error(`Animation ${key} not found`);
    }

    if (this.key === key) {
      return;
    }

    this.key = key;
    this.animations[this.key].currentFrame = 0;
  }
}
