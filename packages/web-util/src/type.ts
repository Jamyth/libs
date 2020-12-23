export interface ControlledFormValue<T> {
  value: T;
  onChange: (value: T) => void;
}
