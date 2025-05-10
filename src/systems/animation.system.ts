import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import { StateComponent } from "../components/state.component";
import type { Entity } from "../entities/entity";
import { System } from "./system";

export class AnimationSystem extends System {
  update(entities: Entity[], deltaTime: number): void {
    const animatedEntities = entities.filter((entity) => {
      return (
        entity.hasComponent(AnimatedSpriteComponent) &&
        entity.hasComponent(StateComponent)
      );
    });

    animatedEntities.forEach((entity: Entity) => {
      this.updateAnimation(entity, deltaTime);
    });
  }

  private updateAnimation(entity: Entity, deltaTime: number): void {
    const animatedSprite = entity.getComponent(
      AnimatedSpriteComponent,
    ) as AnimatedSpriteComponent;
    const state = entity.getComponent(StateComponent) as StateComponent;

    animatedSprite.changeAnimation(state.state);
    animatedSprite.elapsedTime += deltaTime;

    // check if enough time has passed to update the animation
    if (
      animatedSprite.elapsedTime < animatedSprite.currentAnimation.frameDuration
    ) {
      return;
    }

    // reset the elapsed time and update the current frame
    animatedSprite.elapsedTime = 0;
    animatedSprite.currentAnimation.currentFrame += 1;

    // check if the current frame is within the bounds of the animation
    if (
      animatedSprite.currentAnimation.currentFrame <
      animatedSprite.currentAnimation.frameCount
    ) {
      return;
    }

    // loop the animation or set to idle
    if (animatedSprite.currentAnimation.loop) {
      animatedSprite.currentAnimation.currentFrame = 0;
      return;
    }

    // set back to idle
    state.state = "idle";
    animatedSprite.changeAnimation("idle");
  }
}
