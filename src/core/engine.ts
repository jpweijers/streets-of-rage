export class Engine {
  private entities: any[] = [];
  private systems: any[] = [];

  get entties(): any[] {
    return this.entities;
  }

  addEntity(entity: any): void {
    this.entities.push(entity);
  }

  removeEntity(entity: any): void {
    this.entities = this.entities.filter((e) => e !== entity);
  }

  addSystem(system: any): void {
    this.systems.push(system);
  }

  update(deltaTime: number): void {
    this.systems.forEach((system) => {
      system.update(this.entities, deltaTime);
    });
  }
}
