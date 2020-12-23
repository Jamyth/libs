const fromArray = <T>(array: T[]): T | null => {
  const length = array.length;
  return length > 0 ? array[Math.floor(Math.random() * length)] : null;
};

const integerBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const RandomUtil = Object.freeze({
  fromArray,
  integerBetween,
});
