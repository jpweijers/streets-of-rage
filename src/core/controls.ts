import { InputComponent } from "../components/input.component";
import { Engine } from "./engine";

export class Controls {
  private engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;

    window.addEventListener("keydown", (event) => {
      this.handleKeyEvent(event.key, "down");
    });

    window.addEventListener("keyup", (event) => {
      this.handleKeyEvent(event.key, "up");
    });
  }

  private handleKeyEvent(key: string, eventType: "up" | "down"): void {
    const inputEntities = this.engine.entities.filter((entity) => {
      return entity.hasComponent(InputComponent);
    });

    const keyState = eventType === "down" ? true : false;

    inputEntities.forEach((entity) => {
      const input = entity.getComponent(InputComponent) as InputComponent;
      input.setKeyState(key, keyState);
    });
  }
}
