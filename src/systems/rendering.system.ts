import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import type { Entity } from "../entities/entity";
import { System } from "./system";

export class RenderingSystem extends System {
  constructor(private ctx: CanvasRenderingContext2D) {
    super();
  }

  update(entities: Entity[]): void {
    const renderableEntities = entities.filter((entity) => {
      return entity.hasComponent(AnimatedSpriteComponent);
    });

    renderableEntities.forEach((entity) => {
      this.render(entity);
    });
  }

  private render(entity: Entity): void {
    const animatedSprite = entity.getComponent(
      AnimatedSpriteComponent,
    ) as AnimatedSpriteComponent;

    const sprite = animatedSprite.currentAnimation;

    this.ctx.drawImage(
      sprite.image,
      sprite.currentFrame * sprite.frameWidth,
      0,
      sprite.frameWidth,
      sprite.frameHeight,
      0,
      0,
      sprite.frameWidth * 4,
      sprite.frameHeight * 4,
    );
  }
}
