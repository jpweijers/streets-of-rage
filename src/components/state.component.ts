import { Component } from "./component";

export type StateOption = "idle" | "jab" | "uppercut";

export class StateComponent extends Component {
  private _state: StateOption;

  constructor(state: StateOption) {
    super();
    this._state = state;
  }

  get state(): StateOption {
    return this._state;
  }

  set state(value: StateOption) {
    if (this._state === value) {
      return;
    }
    this._state = value;
  }
}
