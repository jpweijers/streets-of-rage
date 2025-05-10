import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import type { Entity } from "../entities/entity";
import { System } from "./system";

export class AnimationSystem extends System {
  update(entities: Entity[], deltaTime: number): void {
    const animatedEntities = entities.filter((entity) => {
      return entity.hasComponent(AnimatedSpriteComponent);
    });

    animatedEntities.forEach((entity: Entity) => {
      this.updateAnimation(entity, deltaTime);
    });
  }

  private updateAnimation(entity: Entity, deltaTime: number): void {
    const animatedSprite = entity.getComponent(AnimatedSpriteComponent);

    if (!animatedSprite) {
      return;
    }

    animatedSprite.updateElapsedTime(deltaTime);
    if (
      animatedSprite.elapsedTime < animatedSprite.currentAnimation.frameDuration
    ) {
      return;
    }

    animatedSprite.resetElapsedTime();
    animatedSprite.currentAnimation.currentFrame += 1;

    if (
      animatedSprite.currentAnimation.currentFrame <
      animatedSprite.currentAnimation.frameCount
    ) {
      return;
    }

    if (animatedSprite.currentAnimation.loop) {
      animatedSprite.currentAnimation.currentFrame = 0;
      return;
    }

    animatedSprite.currentAnimation.currentFrame =
      animatedSprite.currentAnimation.frameCount - 1;
  }
}
