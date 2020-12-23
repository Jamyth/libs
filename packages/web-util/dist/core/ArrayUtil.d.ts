export declare const ArrayUtil: Readonly<{
    sum: (numbers: ReadonlyArray<number>) => number;
    sumByKey: <T>(array: readonly T[], key: keyof T) => number;
    toggleElement: <T_1>(array: readonly T_1[], element: T_1) => T_1[];
    areSame: <T_2>(a: readonly T_2[], b: readonly T_2[], compareOrdering?: boolean) => boolean;
    hasIntersection: <T_3>(a: readonly T_3[], b: readonly T_3[]) => boolean;
    toObject: <T_4, V>(array: readonly T_4[], mapperCallback: (item: T_4, index: number) => [string, V]) => {
        [key: string]: V;
    };
}>;
