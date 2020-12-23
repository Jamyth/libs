export declare type StringBasedEnumMap<Enum> = {
    [P in keyof Enum]: Enum[P] & string;
};
export declare type StringBasedEnumValue<Enum> = Enum extends StringBasedEnumMap<Enum> ? Enum[keyof Enum] : never;
export declare const EnumUtil: Readonly<{
    toRecord: <Enum extends StringBasedEnumMap<Enum>, V>(enumMap: Enum, mapperCallback: (item: StringBasedEnumValue<Enum>) => V) => Record<StringBasedEnumValue<Enum>, V>;
    toArray: <Enum_1 extends StringBasedEnumMap<Enum_1>>(enumMap: Enum_1) => StringBasedEnumValue<Enum_1>[];
    fromValue: <EnumMap extends StringBasedEnumMap<EnumMap>>(enumMap: EnumMap, value: string) => StringBasedEnumValue<EnumMap> | null;
}>;
