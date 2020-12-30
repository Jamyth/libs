import React from "react";
import ReactDOM from "react-dom";
import { Modal, ModalFuncProps, destroyFns } from "./index";

export type ModalFunc = (
  props: ModalFuncProps
) => {
  destroy: () => void;
};

export const create = (config: ModalFuncProps) => {
  const div = document.createElement("div");
  document.body.appendChild(div);

  let currentConfig = { ...config, onCancel: () => {}, visible: true } as any;

  const destroy = (...args: any[]) => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    if (config.onCancel) {
      config.onCancel(...args);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  };

  const render = (props: any) => {
    setTimeout(() => {
      ReactDOM.render(
        <Modal {...props} fromFunction onCancel={destroy} />,
        div
      );
    });
  };

  const close = (...args: any[]) => {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: destroy.bind(this, ...args),
    };
    render(currentConfig);
  };

  render(currentConfig);

  destroyFns.push(close);

  return {
    destroy: close,
  };
};
