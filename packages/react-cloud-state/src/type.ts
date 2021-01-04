import { ModuleLifeCycleListener } from "./Module";
export interface InitialState {
  loading: Record<string, boolean>;
  app: object;
}

type ActionCreator<H> = H extends (...args: infer P) => void
  ? (...args: P) => void
  : never;
type HandlerKeys<H> = {
  [K in keyof H]: H[K] extends (...args: any[]) => void ? K : never;
}[Exclude<keyof H, keyof ModuleLifeCycleListener>];
export type ActionsCreators<H> = {
  readonly [K in HandlerKeys<H>]: ActionCreator<H[K]>;
};
