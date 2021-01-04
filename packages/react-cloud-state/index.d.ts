declare module "react-cloud-state" {
  export interface CloudState {
    loading: Record<string, boolean>;
    app: object;
  }
  type ActionCreator<H> = H extends (...args: infer P) => void
    ? (...args: P) => void
    : never;
  type HandlerKeys<H> = {
    [K in keyof H]: H[K] extends (...args: any[]) => void ? K : never;
  }[Exclude<keyof H, keyof ModuleLifeCycleListener>];
  type ActionsCreators<H> = {
    readonly [K in HandlerKeys<H>]: ActionCreator<H[K]>;
  };
  interface ModuleLifeCycleListener {
    onEnter: (props: any) => void;
    onDestroy: () => void;
    onRender: (prevProps: any) => void;
    onError: () => void;
  }
  class ModuleProxy<M extends Module<any, any>> {
    private module;
    private actions;
    constructor(module: M, actions: ActionsCreators<M>);
    getActions(): ActionsCreators<M>;
    attachLifecycle<P extends object>(
      ComponentType: React.ComponentType<P>
    ): React.ComponentType<P>;
  }

  export class Module<
    RootState extends CloudState,
    ModuleName extends keyof RootState["app"] & string
  > implements ModuleLifeCycleListener {
    readonly name: ModuleName;
    readonly initialState: RootState["app"][ModuleName];
    constructor(name: ModuleName, initialState: RootState["app"][ModuleName]);
    get state(): Readonly<RootState["app"][ModuleName]>;
    get rootState(): Readonly<RootState>;
    setState<K extends keyof RootState["app"][ModuleName]>(
      stateOrUpdater:
        | ((state: RootState["app"][ModuleName]) => void)
        | Pick<RootState["app"][ModuleName], K>
        | RootState["app"][ModuleName]
    ): void;
    onEnter(): void;
    onDestroy(): void;
    onRender(): void;
    onError(): void;
  }
  export const useSelector: <M extends CloudState, T>(fn: (state: M) => T) => T;
  export const useAction: <P extends any[]>(
    action: (...args: P) => void
  ) => (...args: P) => void;
  export const usePromiseAction: <P extends any[]>(
    action: (...args: P) => void
  ) => (...args: P) => Promise<void>;
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

  export const register: <M extends Module<any, any>>(
    module: M
  ) => ModuleProxy<M>;
}
