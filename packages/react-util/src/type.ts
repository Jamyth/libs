import React from "react";

export interface ControlledFormValue<T> {
  value: T;
  onChange: (value: T) => void;
}

export type SafeReactChild = React.ReactChild | boolean | null;
export type SafeReactChildren = SafeReactChild | SafeReactChild[];
