const clamp = (value: number, min: number, max: number) => {
  if (min > max) {
    throw new Error(
      `[NumberUtil]: NumberUtil.clamp min(${min}) must be <= max(${max})`
    );
  }
  return Math.max(min, Math.min(max, value));
};

const max = (list: Array<number | undefined | null>): number => {
  return Math.max(
    ...list.map((_) => (_ === undefined || _ === null ? -Infinity : _))
  );
};

const min = (list: Array<number | undefined | null>): number => {
  return Math.min(
    ...list.map((_) => (_ === undefined || _ === null ? Infinity : _))
  );
};

const formatWithComma = (value: number | null): string => {
  if (value !== null && Number.isFinite(value)) {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  } else {
    return "-";
  }
};

export const NumberUtil = Object.freeze({
  clamp,
  max,
  min,
  formatWithComma,
});
