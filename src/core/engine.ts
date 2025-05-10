import type { Entity } from "../entities/entity";
import type { System } from "../systems/system";

export class Engine {
  private _entities: Entity[] = [];
  private systems: System[] = [];

  get entities(): Entity[] {
    return this._entities;
  }

  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  removeEntity(entity: Entity): void {
    this._entities = this.entities.filter((e) => e !== entity);
  }

  addSystem(system: System): void {
    this.systems.push(system);
  }

  update(deltaTime: number): void {
    this.systems.forEach((system) => {
      system.update(this.entities, deltaTime);
    });
  }
}
