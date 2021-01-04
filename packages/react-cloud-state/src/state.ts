import { InitialState } from "./type";

export let initialState: InitialState = {
  loading: {},
  app: {},
};

export const setState = (state: InitialState) => {
  initialState = state;
};
