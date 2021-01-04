import { ModuleLifeCycleListener } from "./Module";
export interface InitialState {
  loading: Record<string, boolean>;
  app: object;
}

export interface ActionCreators<
  ModuleState extends InitialState,
  ModuleName extends keyof ModuleState["app"] & string
> {
  (store: {
    setState: <K extends keyof ModuleState["app"][ModuleName]>(
      stateOrUpdater:
        | ModuleState["app"][ModuleName]
        | Pick<ModuleState["app"][ModuleName], K>
        | ((state: ModuleState["app"][ModuleName]) => void)
    ) => void;
    getState: () => ModuleState["app"][ModuleName];
    getRootState: () => ModuleState;
  }): Record<string, Function>;
}

type ActionCreator<H> = H extends (...args: infer P) => void
  ? (...args: P) => void
  : never;
type HandlerKeys<H> = {
  [K in keyof H]: H[K] extends (...args: any[]) => void ? K : never;
}[Exclude<keyof H, keyof ModuleLifeCycleListener>];
export type ActionsCreators<H> = {
  readonly [K in HandlerKeys<H>]: ActionCreator<H[K]>;
};
