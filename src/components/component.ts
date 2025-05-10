import { randomId } from "../utils/random-id";

export abstract class Component {
  public id = randomId();
}
