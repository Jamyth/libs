import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

export interface BasePortalProps {
  closePortal: () => void;
}

const Portal = ({ closePortal }: BasePortalProps) => {
  return (
    <div id="portal-container">
      <div className="portal-header">
        <h4>Title</h4>
      </div>
      <div className="portal-body">Body</div>
      <div className="portal-footer">
        <button onClick={closePortal}>Close</button>
      </div>
    </div>
  );
};

interface CreatePortalReturn {
  id: number;
  closePortal: () => void;
}

const portals: CreatePortalReturn[] = [];

const getParent = () => {
  let parent = document.getElementById("jamyth-portal");
  if (!parent) {
    parent = document.createElement("div");
    parent.id = "jamyth-portal";
    document.body.appendChild(parent);
  }
  return parent;
};

const createPortal = <T extends BasePortalProps>(
  config: Omit<T, "closePortal">,
  Component?: React.ComponentType<T>
): CreatePortalReturn => {
  const parent = getParent();

  const id = Date.now();
  const div = document.createElement("div");
  parent.appendChild(div);

  const _Component = Component ?? Portal;

  const closePortal = () => {
    const unMountResult = ReactDOM.unmountComponentAtNode(div);
    if (unMountResult) {
      parent.removeChild(div);
    }
    for (let i = 0; i < portals.length; i++) {
      const currentRef = portals[i];
      if (currentRef.id === id) {
        portals.splice(i, 1);
        break;
      }
    }
    if (!portals.length && parent.parentNode) {
      parent.parentNode.removeChild(parent);
    }
  };

  const render = (config: Omit<T, "closePortal">) => {
    setTimeout(() => {
      const _config = { ...config, closePortal } as T;
      ReactDOM.render(<_Component {..._config} />, div);
    });
  };

  render({ ...config });

  const ref = {
    id,
    closePortal,
  };

  portals.push(ref);

  return ref;
};

const destroyAll = () => {
  while (portals.length) {
    const ref = portals.pop();
    ref?.closePortal();
  }
};

export const PortalUtil = Object.freeze({
  createPortal,
  destroyAll,
});
