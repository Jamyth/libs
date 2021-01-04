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
