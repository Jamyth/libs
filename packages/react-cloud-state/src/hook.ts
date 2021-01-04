import React from "react";
import { initialState as rootState, setState } from "./state";
import { InitialState } from "./type";
import { Module } from "./Module";
import { ModuleProxy } from "./ModuleProxy";

const useForceRender = () => {
  const [, fn] = React.useReducer((s) => s + 1, []);
  return fn;
};

export const useSelector = <M extends InitialState, T>(
  fn: (state: M) => T
): T => {
  return fn(rootState as M);
};

export const useAction = <P extends any[]>(action: (...args: P) => void) => {
  const fn = useForceRender();
  return (...args: P) => {
    action(...args);
    fn();
  };
};

export const usePromiseAction = <P extends any[]>(
  action: (...args: P) => void
) => {
  const fn = useForceRender();
  return async (args: P) => {
    await action(...args);
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
      await action(...args);
      setLoadingKey(false);
    };
  };
};

export const useLoadingState = <K extends keyof InitialState["loading"]>(
  key: K = "default" as K
): boolean => {
  return Boolean(rootState.loading[key]);
};

export const register = <M extends Module<any, any>>(
  module: M
): ModuleProxy<M> => {
  const moduleName: string = module.name;
  if (!module.rootState.app[moduleName]) {
    setState({
      ...rootState,
      app: {
        ...rootState.app,
        [moduleName]: module.initialState,
      },
    });
  }

  const actions: any = {};

  const getKeys = <M extends Module<any, any>>(module: M) => {
    const keys: string[] = [];
    for (const propertyName of Object.getOwnPropertyNames(
      Object.getPrototypeOf(module)
    )) {
      if (
        (module as any)[propertyName] instanceof Function &&
        propertyName !== "constructor"
      ) {
        keys.push(propertyName);
      }
    }
    return keys;
  };

  getKeys(module).forEach((key) => {
    const method = (module as any)[key];
    actions[key] = method.bind(module);
  });

  return new ModuleProxy(module, actions);
};
