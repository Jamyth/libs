import React from "react";
import ReactDOM from "react-dom";
import { SafeReactChildren } from "../../type";
import { DOMUtil } from "../../util/DOMUtil";

export type Ref = {};

interface Props {
  getContainer: () => HTMLElement;
  didUpdate?: (prevProps: Props) => void;
  children?: SafeReactChildren;
}

export const Portal = React.forwardRef<Ref, Props>((props, ref) => {
  const { didUpdate, getContainer, children } = props;
  const containerRef = React.useRef<HTMLElement>();

  React.useImperativeHandle(ref, () => ({}));

  const initRef = React.useRef(false);
  if (!initRef.current && DOMUtil.isDOM()) {
    containerRef.current = getContainer();
    initRef.current = true;
  }

  React.useEffect(() => {
    didUpdate?.(props);
  });

  React.useEffect(() => {
    return () => {
      containerRef.current?.parentNode?.removeChild(containerRef.current);
    };
  }, []);

  return containerRef.current
    ? ReactDOM.createPortal(children, containerRef.current)
    : null;
});
