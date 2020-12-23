type WithoutUndefined<T> = T extends undefined ? never : T;

const firstKey = <T extends object>(object: T): keyof T | null => {
  const keys = Object.keys(object);
  return keys.length > 0 ? (keys[0] as keyof T) : null;
};

const safeAssign = <T extends object | undefined | null>(
  object: T,
  updateFields: Partial<NonNullable<T>> | undefined | null
): T => {
  if (object) {
    return Object.assign(object, updateFields);
  } else {
    return object;
  }
};

const toObject = <T extends object, V>(
  object: T,
  mapperCallback: (
    key: keyof T,
    value: WithoutUndefined<T[keyof T]>,
    index: number
  ) => WithoutUndefined<V>
): Record<keyof T, WithoutUndefined<V>> => {
  const newObject = {};
  Object.keys(object).forEach((key, index) => {
    if (object[key] !== undefined) {
      const mappedValue = mapperCallback(
        key as keyof T & string,
        object[key],
        index
      );
      newObject[key] = mappedValue;
    }
  });
  return newObject as Record<keyof T, WithoutUndefined<V>>;
};

const toArray = <T extends object, V>(
  object: T,
  mapperCallback: (
    key: keyof T & string,
    value: WithoutUndefined<T[keyof T]>,
    index: number
  ) => WithoutUndefined<V>
): WithoutUndefined<V>[] => {
  const result: WithoutUndefined<V>[] = [];
  Object.keys(object).forEach(
    (key, index) =>
      object[key] !== undefined &&
      result.push(mapperCallback(key as keyof T & string, object[key], index))
  );
  return result;
};

const forEach = <T extends object>(
  object: T,
  forEachCallback: (
    key: keyof T & string,
    value: WithoutUndefined<T[keyof T]>,
    index: number
  ) => any
): void => {
  Object.keys(object).forEach(
    (key, index) =>
      object[key] !== undefined &&
      forEachCallback(key as keyof T & string, object[key], index)
  );
};

const findKey = <T extends object>(
  object: T,
  value: WithoutUndefined<T[keyof T]>
): keyof T | null => {
  let matchedKey: keyof T | null = null;
  forEach(object, (key) => {
    if (object[key] === value) {
      matchedKey = key;
    }
  });
  return matchedKey;
};

const sortByKeys = <T extends object>(
  object: T,
  priorityList: ReadonlyArray<keyof T>
): T => {
  const objectKeys = Object.keys(object) as Array<keyof T>;
  objectKeys.sort((a, b) => {
    const aIndex = priorityList.indexOf(a);
    const bIndex = priorityList.indexOf(b);
    if (aIndex < 0 && bIndex < 0) {
      return 0;
    } else if (aIndex < 0) {
      // b should be before a
      return 1;
    } else if (bIndex < 0) {
      // a should be before b
      return -1;
    } else {
      return aIndex - bIndex;
    }
  });
  const obj: T = {} as T;
  objectKeys.forEach((_) => (obj[_] = object[_]));
  return obj;
};

const isEmpty = (object: object): boolean => {
  return Object.keys(object).length === 0;
};

export const ObjectUtil = Object.freeze({
  firstKey,
  safeAssign,
  toObject,
  toArray,
  forEach,
  isEmpty,
  findKey,
  sortByKeys,
});
