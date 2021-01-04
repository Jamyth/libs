import React from "react";
import { Module, ModuleLifeCycleListener } from "./Module";
import { ActionsCreators } from "./type";

export class ModuleProxy<M extends Module<any, any>> {
  constructor(private module: M, private actions: ActionsCreators<M>) {}

  getActions(): ActionsCreators<M> {
    return this.actions;
  }

  attachLifecycle<P extends object>(
    ComponentType: React.ComponentType<P>
  ): React.ComponentType<P> {
    const lifecycleListener = this.module as ModuleLifeCycleListener;

    return class extends React.PureComponent<P> {
      componentDidMount() {
        const props = this.props;
        lifecycleListener.onEnter(props);
      }

      componentDidUpdate(prev: Readonly<P>) {
        lifecycleListener.onRender(prev);
      }

      componentDidCatch() {
        lifecycleListener.onError();
      }

      componentWillUnmount() {
        lifecycleListener.onDestroy();
      }

      render() {
        return <ComponentType {...this.props} />;
      }
    };
  }
}
