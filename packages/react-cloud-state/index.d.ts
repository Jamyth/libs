declare module "react-cloud-state" {
  export interface CloudState {
    loading: Record<string, boolean>;
    app: object;
  }
  export const useSelector: <M extends CloudState, T>(fn: (state: M) => T) => T;
  export const useAction: (action: Function) => (...args: any[]) => void;
  export const usePromiseAction: (
    action: Function
  ) => (...args: any[]) => Promise<void>;
  export const loading: <K extends keyof CloudState["loading"] & string>(
    key?: K
  ) => (action: Function) => (...args: any[]) => Promise<void>;
  export const useLoadingState: <
    K extends keyof CloudState["loading"] & string
  >(
    key?: K
  ) => boolean;
  export const registerModule: <
    ModuleState extends CloudState,
    ModuleName extends keyof ModuleState["app"] & string
  >(
    moduleName: ModuleName,
    initialState: ModuleState["app"][ModuleName],
    actionCreators: (store: {
      setState: <K extends keyof ModuleState["app"][ModuleName]>(
        stateOrUpdater:
          | ModuleState["app"][ModuleName]
          | Pick<ModuleState["app"][ModuleName], K>
          | ((state: ModuleState["app"][ModuleName]) => void)
      ) => void;
      getState: () => ModuleState["app"][ModuleName];
      getRootState: () => ModuleState;
    }) => Record<string, Function>
  ) => { getActions: () => Record<string, Function> };
}
