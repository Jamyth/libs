export type StringBasedEnumMap<Enum> = { [P in keyof Enum]: Enum[P] & string };
export type StringBasedEnumValue<Enum> = Enum extends StringBasedEnumMap<Enum>
  ? Enum[keyof Enum]
  : never;

const toRecord = <Enum extends StringBasedEnumMap<Enum>, V>(
  enumMap: Enum,
  mapperCallback: (item: StringBasedEnumValue<Enum>) => V
): Record<StringBasedEnumValue<Enum>, V> => {
  const result: { [key in StringBasedEnumValue<Enum>]?: V } = {};
  toArray(enumMap).forEach((item) => (result[item] = mapperCallback(item)));
  return result as Record<StringBasedEnumValue<Enum>, V>;
};

const toArray = <Enum extends StringBasedEnumMap<Enum>>(
  enumMap: Enum
): StringBasedEnumValue<Enum>[] => {
  return Object.values(enumMap);
};

const fromValue = <EnumMap extends StringBasedEnumMap<EnumMap>>(
  enumMap: EnumMap,
  value: string
): StringBasedEnumValue<EnumMap> | null => {
  if (Object.values(enumMap).includes(value)) {
    return value as StringBasedEnumValue<EnumMap>;
  }
  return null;
};

export const EnumUtil = Object.freeze({
  toRecord,
  toArray,
  fromValue,
});
