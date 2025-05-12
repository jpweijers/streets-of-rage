import { InputComponent } from "../components/input.component";
import { StateComponent } from "../components/state.component";
import type { Entity } from "../entities/entity";
import { System } from "./system";

export class InputSystem extends System {
  update(entities: Entity[]): void {
    const inputEntities = entities.filter((entity) => {
      return (
        entity.hasComponent(InputComponent) &&
        entity.hasComponent(StateComponent)
      );
    });

    inputEntities.forEach((entity: Entity) => {
      const input = entity.getComponent(InputComponent) as InputComponent;
      const state = entity.getComponent(StateComponent) as StateComponent;

      const lastKey = input.getLastKey();

      if (lastKey === "j") {
        state.state = "jab";
      }

      if (lastKey === "u") {
        state.state = "uppercut";
      }
    });
  }
}
