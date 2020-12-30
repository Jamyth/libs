import React from "react";
import { SafeReactChild, SafeReactChildren } from "../../type";
import { PortalWrapper } from "../Portal/Wrap";

export const destroyFns: Array<() => void> = [];

interface Props {
  fromFunction?: boolean;
  visible?: boolean;
  confirmLoading?: boolean;
  title?: SafeReactChild;
  content?: SafeReactChild;
  closable?: boolean;
  onConfirm?: (e: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  afterClose?: () => void;
  centered?: boolean;
  width?: string | number;
  confirmText?: SafeReactChild;
  cancelText?: SafeReactChild;
}

export interface ModalFuncProps {
  title?: SafeReactChildren;
  content?: SafeReactChildren;
  width?: number;
  onConfirm?: (...args: any[]) => void;
  onCancel?: (...args: any[]) => void;
  confirmText?: SafeReactChild;
  cancelText?: SafeReactChild;
}

export const Modal = React.memo((props: Props) => {
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onCancel, afterClose } = props;
    if (onCancel) {
      onCancel(e);
    }
    if (afterClose) {
      afterClose();
    }
  };
  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onConfirm, afterClose } = props;
    if (onConfirm) {
      console.log("hello");
      onConfirm(e);
    }
    if (afterClose) {
      afterClose();
    }
  };
  const renderFooter = () => {
    const { confirmText, cancelText } = props;

    return (
      <>
        <button onClick={handleCancel}>{cancelText || "Cancel"}</button>
        <button onClick={handleConfirm}>{confirmText || "Confirm"}</button>
      </>
    );
  };

  if (props.fromFunction) {
    return (
      <>
        {props.content !== undefined ? props.content : ""}
        {renderFooter()}
      </>
    );
  }

  return (
    <PortalWrapper>
      {props.content !== undefined ? props.content : ""}
      {renderFooter()}
    </PortalWrapper>
  );
});
