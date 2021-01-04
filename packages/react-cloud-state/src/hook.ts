import React from "react";
import { initialState as rootState, setState } from "./state";
import { ActionCreators, InitialState } from "./type";
import { produce } from "immer";

const useForceRender = () => {
  const [, fn] = React.useReducer((s) => s + 1, []);
  return fn;
};

export const useSelector = <M extends InitialState, T>(
  fn: (state: M) => T
): T => {
  return fn(rootState as M);
};

export const useAction = (action: Function) => {
  const fn = useForceRender();
  return (...args: any[]) => {
    action(...args);
    fn();
  };
};

export const loading = <K extends keyof InitialState["loading"]>(
  key: K = "default" as K
) => {
  const setLoadingKey = (status: boolean) =>
    setState({
      ...rootState,
      loading: {
        ...rootState.loading,
        [key]: status,
      },
    });
  if (rootState.loading[key] === undefined) {
    setLoadingKey(true);
  }
  if (rootState.loading[key] === false) {
    setLoadingKey(true);
  }
  return (action: Function) => {
    return async (...args: any[]) => {
      if (rootState.loading[key] === undefined) {
        setLoadingKey(true);
      }
      if (rootState.loading[key] === false) {
        setLoadingKey(true);
      }
      action(...args);
      setLoadingKey(false);
    };
  };
};

export const useLoadingState = <K extends keyof InitialState["loading"]>(
  key: K = "default" as K
): boolean => {
  return Boolean(rootState.loading[key]);
};

export const registerModule = <
  ModuleState extends InitialState,
  ModuleName extends keyof ModuleState["app"] & string
>(
  moduleName: ModuleName,
  initialState: ModuleState["app"][ModuleName],
  actionCreators: ActionCreators<ModuleState, ModuleName>
) => {
  if (!(moduleName in rootState.app)) {
    setState({
      ...rootState,
      app: {
        ...rootState.app,
        [moduleName]: initialState,
      },
    });
  }

  const setModuleState = <K extends keyof ModuleState["app"][ModuleName]>(
    stateOrUpdater:
      | ((state: ModuleState["app"][ModuleName]) => void)
      | Pick<ModuleState["app"][ModuleName], K>
      | ModuleState["app"][ModuleName]
  ): void => {
    if (typeof stateOrUpdater === "function") {
      const originalState = getModuleState();
      const updater = stateOrUpdater as (
        state: ModuleState["app"][ModuleName]
      ) => void;
      const newState = produce<
        Readonly<ModuleState["app"][ModuleName]>,
        ModuleState["app"][ModuleName]
      >(originalState, (draftState) => {
        // Wrap into a void function, in case updater() might return anything
        updater(draftState);
      });
      if (newState !== originalState) {
        setState({
          ...rootState,
          app: {
            ...rootState.app,
            [moduleName]: newState,
          },
        });
      }
    } else {
      const partialState = stateOrUpdater as object;
      setModuleState((state) => Object.assign(state, partialState));
    }
  };

  const getModuleState = (): ModuleState["app"][ModuleName] => {
    return (rootState.app as ModuleState["app"])[moduleName];
  };

  const getRootState = () => {
    return rootState as ModuleState;
  };

  const actions = actionCreators({
    setState: setModuleState,
    getState: getModuleState,
    getRootState,
  });

  const getActions = () => {
    return actions;
  };

  return {
    getActions,
  };
};
