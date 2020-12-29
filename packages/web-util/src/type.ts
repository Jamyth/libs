export interface ControlledFormValue<T> {
  value: T;
  onChange: (value: T) => void;
}

export type MarkAsOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
export type MarkAsRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
export type MarkAsNullable<T, K extends keyof T> = Omit<T, K> &
  { [P in K]: T[P] | null };
