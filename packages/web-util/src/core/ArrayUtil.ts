const sum = (numbers: ReadonlyArray<number>): number => {
  return numbers.reduce((acc, curr) => acc + curr, 0);
};

const sumByKey = <T>(array: ReadonlyArray<T>, key: keyof T): number => {
  let sum = 0;
  array.forEach((_) => (sum += Number(_[key]) ?? 0));
  return sum;
};

const toggleElement = <T>(array: ReadonlyArray<T>, element: T): T[] => {
  const index = array.indexOf(element);
  if (index >= 0) {
    const cloned = [...array];
    cloned.splice(index, 1);
    return cloned;
  } else {
    return [...array, element];
  }
};

const areSame = <T>(
  a: ReadonlyArray<T>,
  b: ReadonlyArray<T>,
  compareOrdering: boolean = false
): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  if (compareOrdering) {
    return a.every((_, index) => b[index] === _);
  } else {
    return a.every((_) => b.includes(_)) && b.every((_) => a.includes(_));
  }
};

const hasIntersection = <T>(
  a: ReadonlyArray<T>,
  b: ReadonlyArray<T>
): boolean => {
  return a.some((_) => b.includes(_));
};

const toObject = <T, V>(
  array: ReadonlyArray<T>,
  mapperCallback: (item: T, index: number) => [string, V]
): { [key: string]: V } => {
  const result: { [key: string]: V } = {};
  array.forEach((_, i) => {
    const mappedKV = mapperCallback(_, i);
    result[mappedKV[0]] = mappedKV[1];
  });
  return result;
};

export const ArrayUtil = Object.freeze({
  sum,
  sumByKey,
  toggleElement,
  areSame,
  hasIntersection,
  toObject,
});
