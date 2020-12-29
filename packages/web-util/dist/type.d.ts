export interface ControlledFormValue<T> {
    value: T;
    onChange: (value: T) => void;
}
export declare type MarkAsOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare type MarkAsRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export declare type MarkAsNullable<T, K extends keyof T> = Omit<T, K> & {
    [P in K]: T[P] | null;
};
