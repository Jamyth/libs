declare type WithoutUndefined<T> = T extends undefined ? never : T;
export declare const ObjectUtil: Readonly<{
    firstKey: <T extends object>(object: T) => keyof T | null;
    safeAssign: <T_1 extends object | null | undefined>(object: T_1, updateFields: Partial<NonNullable<T_1>> | null | undefined) => T_1;
    toObject: <T_2 extends object, V>(object: T_2, mapperCallback: (key: keyof T_2, value: WithoutUndefined<T_2[keyof T_2]>, index: number) => WithoutUndefined<V>) => Record<keyof T_2, WithoutUndefined<V>>;
    toArray: <T_3 extends object, V_1>(object: T_3, mapperCallback: (key: keyof T_3 & string, value: WithoutUndefined<T_3[keyof T_3]>, index: number) => WithoutUndefined<V_1>) => WithoutUndefined<V_1>[];
    forEach: <T_4 extends object>(object: T_4, forEachCallback: (key: keyof T_4 & string, value: WithoutUndefined<T_4[keyof T_4]>, index: number) => any) => void;
    isEmpty: (object: object) => boolean;
    findKey: <T_5 extends object>(object: T_5, value: WithoutUndefined<T_5[keyof T_5]>) => keyof T_5 | null;
    sortByKeys: <T_6 extends object>(object: T_6, priorityList: readonly (keyof T_6)[]) => T_6;
}>;
export {};
