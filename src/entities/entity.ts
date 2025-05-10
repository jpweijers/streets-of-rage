import type { Component } from "../components/component";
import { randomId } from "../utils/random-id";

export abstract class Entity {
  public id: string = randomId();
  private components: Map<string, any> = new Map();

  addComponent(component: Component): void {
    this.components.set(component.constructor.name, component);
  }

  getComponent<T extends Component, Args extends unknown[]>(
    componentType: new (...args: Args) => T,
  ): T | undefined {
    return this.components.get(componentType.name) as T;
  }

  hasComponent<Args extends unknown[]>(
    componentType: new (...args: Args) => Component,
  ): boolean {
    return this.components.has(componentType.name);
  }

  hasComponents<Args extends unknown[]>(
    componentTypes: Array<new (...args: Args) => Component>,
  ): boolean {
    return componentTypes.every((componentType) =>
      this.hasComponent(componentType),
    );
  }

  removeComponent<Args extends unknown[]>(
    componentType: new (...args: Args) => Component,
  ): void {
    this.components.delete(componentType.name);
  }
}
