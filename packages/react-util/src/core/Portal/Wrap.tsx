import React from "react";
import { Portal, Ref } from "./index";
import { DOMUtil } from "../../util/DOMUtil";
import { SafeReactChildren } from "../../type";
import { useForceUpdate } from "../../hook/forceUpdate";

type GetContainer = string | HTMLElement | (() => HTMLElement);

const getParent = (getContainer?: GetContainer): Element | null => {
  if (!DOMUtil.isDOM()) {
    return null;
  }
  if (getContainer) {
    if (typeof getContainer === "string") {
      return document.querySelectorAll(getContainer)[0];
    }
    if (typeof getContainer === "function") {
      return getContainer();
    }
    if (
      typeof getContainer === "object" &&
      getContainer instanceof window.HTMLElement
    ) {
      return getContainer;
    }
  }
  return document.body;
};

interface Props {
  getContainer?: GetContainer;
  wrapperClassName?: string;
  children: SafeReactChildren;
}

export const PortalWrapper = React.memo((props: Props) => {
  const forceUpdate = useForceUpdate();
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const componentRef: React.RefObject<Ref> = React.createRef();

  const attachToParent = (element?: HTMLElement) => {
    const { getContainer } = props;
    if (element || (container && !container.parentNode)) {
      const parent = getParent(getContainer);
      if (parent) {
        parent.appendChild(element ?? container!);
        return true;
      }
      return false;
    }
    return true;
  };

  const getContainer = () => {
    if (!DOMUtil.isDOM()) {
      throw new Error("Dom is not defined.");
    }
    if (!container) {
      const div = document.createElement("div");
      setContainer(div);
      attachToParent(div);
      return div;
    }
    setWrapperClassName();
    return container!;
  };

  const setWrapperClassName = () => {
    const { wrapperClassName } = props;
    if (
      container &&
      wrapperClassName &&
      wrapperClassName !== container.className
    ) {
      container.className = wrapperClassName;
    }
  };

  const removeCurrentContainer = () => {
    container?.parentNode?.removeChild(container);
  };

  const { children } = props;
  React.useEffect(() => {
    if (!attachToParent()) {
      forceUpdate();
    }
    return () => {
      removeCurrentContainer();
    };
  }, []);

  return (
    <Portal getContainer={getContainer} ref={componentRef}>
      {children}
    </Portal>
  );
});
