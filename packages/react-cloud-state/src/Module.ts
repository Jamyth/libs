import { InitialState } from "./type";
import { initialState as state, setState as setRootState } from "./state";
import { produce } from "immer";

export interface ModuleLifeCycleListener {
  onEnter: (props: any) => void;
  onDestroy: () => void;
  onRender: (prevProps: any) => void;
  onError: () => void;
}

export class Module<
  RootState extends InitialState,
  ModuleName extends keyof RootState["app"] & string
> implements ModuleLifeCycleListener {
  constructor(
    readonly name: ModuleName,
    readonly initialState: RootState["app"][ModuleName]
  ) {}

  get state(): Readonly<RootState["app"][ModuleName]> {
    return this.rootState.app[this.name];
  }

  get rootState(): Readonly<RootState> {
    return state as Readonly<RootState>;
  }

  setState<K extends keyof RootState["app"][ModuleName]>(
    stateOrUpdater:
      | ((state: RootState["app"][ModuleName]) => void)
      | Pick<RootState["app"][ModuleName], K>
      | RootState["app"][ModuleName]
  ): void {
    if (typeof stateOrUpdater === "function") {
      const originalState = this.state;
      const updater = stateOrUpdater as (
        state: RootState["app"][ModuleName]
      ) => void;
      const newState = produce<
        Readonly<RootState["app"][ModuleName]>,
        RootState["app"][ModuleName]
      >(originalState, (draftState) => {
        // Wrap into a void function, in case updater() might return anything
        updater(draftState);
      });
      if (newState !== originalState) {
        setRootState({
          ...this.rootState,
          app: {
            ...this.rootState.app,
            [this.name]: newState,
          },
        });
      }
    } else {
      const partialState = stateOrUpdater as object;
      this.setState((state) => Object.assign(state, partialState));
    }
  }

  onEnter() {}
  onDestroy() {}
  onRender() {}
  onError() {}
}
