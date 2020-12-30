import React from "react";
import { ModalFuncProps } from "../core/Modal";
import { ModalFunc, create } from "../core/Modal/function";
import { SafeReactChildren } from "../type";

type CreateModalReturnType = ReturnType<ModalFunc>;

type ModalConfigWithoutEvent = Omit<ModalConfig, "onConfirm" | "onCancel">;

interface ModalConfig {
  body: SafeReactChildren;
  title?: React.ReactChild;
  closable?: boolean;
  width?: number;
  className?: string;
  confirmText?: string;
  cancelText?: string;
  subTitle?: string;
  onConfirm?: () => any;
  onCancel?: (byClose: boolean) => any;
  autoFocusButton?: "confirm" | "cancel" | null;
  hideButtons?: boolean;
  addInnerPadding?: boolean;
}

const createSync = (config: ModalConfig): CreateModalReturnType => {
  const defaultConfig: Partial<ModalConfig> = {
    title: "Title",
    closable: true,
    width: 550,
    className: "",
    confirmText: "Confirm",
    autoFocusButton: "confirm",
    addInnerPadding: true,
  };
  const merged = { ...defaultConfig, ...config };
  if (Array.isArray(merged.body)) {
    merged.body = merged.body.map((_, i) => <p key={i}>{_}</p>);
  }
  const getTitle = (): SafeReactChildren => {
    const titleNode: SafeReactChildren = [merged.title!];

    return merged.closable ? (
      <>
        <span>{titleNode}</span>
        <button onClick={() => destroy(true)}>X</button>
      </>
    ) : (
      titleNode
    );
  };

  const RootConfig: ModalFuncProps = {
    title: getTitle(),
    content: (
      <>
        <div className="header">{merged.subTitle}</div>
        <div className="body">{merged.body}</div>
      </>
    ),
    width: merged.width,
    confirmText: merged.confirmText,
    cancelText: merged.cancelText,
    onConfirm: merged.onConfirm,
    onCancel: () => merged.onCancel?.(false),
  };

  const ref = create(RootConfig);

  const destroy = (byClose: boolean) => {
    ref.destroy();
    merged.onCancel?.(byClose);
  };

  const enhancedRef = { ...ref, destroy: () => destroy(false) };
  return enhancedRef;
};

const createAsync = (config: ModalConfigWithoutEvent): Promise<boolean> => {
  return new Promise<boolean>((res) => {
    createSync({
      ...config,
      onConfirm: () => res(true),
      onCancel: () => res(false),
    });
  });
};

export const ModalUtil = Object.freeze({
  createSync,
  createAsync,
});
