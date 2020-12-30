import React from "react";

export const useForceUpdate = () => {
  const [, forceRender] = React.useReducer((s) => s + 1, 0);
  return forceRender;
};
