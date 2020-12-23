export type DayStartOrEnd = "day-end" | "day-start";

const daysBeforeToday = (days: number, type: DayStartOrEnd): Date => {
  if (days < 0) {
    throw new Error(
      "[DateUtil]: Days must be >= 0, or use DateUtil.daysAfterToday"
    );
  }
  return dateRelativeTo(new Date(), -days, type);
};

const daysAfterToday = (days: number, type: DayStartOrEnd): Date => {
  if (days < 0) {
    throw new Error(
      "[DateUtil]: Days must be >= 0, or use DateUtil.daysBeforeToday"
    );
  }
  return dateRelativeTo(new Date(), days, type);
};

const today = (type: DayStartOrEnd): Date => {
  return dateRelativeTo(new Date(), 0, type);
};

const daysBefore = (date: Date, days: number, type: DayStartOrEnd): Date => {
  if (days < 0) {
    throw new Error("[DateUtil]: Days must be >= 0, or use DateUtil.daysAfter");
  }
  return dateRelativeTo(date, -days, type);
};

const daysAfter = (date: Date, days: number, type: DayStartOrEnd): Date => {
  if (days < 0) {
    throw new Error("[DateUtil]: Days must be >= 0, or use DateUtil.daysAfter");
  }
  return dateRelativeTo(date, days, type);
};

const someday = (date: Date, type: DayStartOrEnd): Date => {
  return dateRelativeTo(date, 0, type);
};

const parse = (text: string): Date | null => {
  const date = new Date(text);
  return isNaN(date.getTime()) ? null : date;
};

const format = (
  date: Date | null,
  type:
    | "default"
    | "with-time"
    | "no-year"
    | "no-year-with-time"
    | "no-day"
    | "chinese"
    | "chinese-with-time"
    | "time" = "default",
  delimiter: string = "-"
): string => {
  if (date !== null) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const timePart = date.toTimeString().split(" ")[0];
    switch (type) {
      case "default":
        return [year, month, day].join(delimiter);
      case "with-time":
        return [year, month, day].join(delimiter) + " " + timePart;
      case "no-year":
        return [month, day].join(delimiter);
      case "no-year-with-time":
        return [month, day].join(delimiter) + " " + timePart;
      case "no-day":
        return [year, month].join(delimiter);
      case "chinese":
        return year + "年" + month + "月" + day + "日";
      case "chinese-with-time":
        return year + "年" + month + "月" + day + "日 " + timePart;
      case "time":
        return timePart;
    }
  }
  return "-";
};

const isSameMinute = (time1: Date, time2: Date): boolean => {
  return (
    Math.floor(time1.getTime() / 60000) === Math.floor(time2.getTime() / 60000)
  );
};

const dateRelativeTo = (date: Date, diffDays: number, type: DayStartOrEnd) => {
  return type === "day-end"
    ? new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + diffDays,
        23,
        59,
        59
      )
    : new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + diffDays,
        0,
        0,
        0
      );
};

export const DateUtil = Object.freeze({
  daysBeforeToday,
  daysAfterToday,
  today,
  daysBefore,
  daysAfter,
  someday,
  parse,
  format,
  isSameMinute,
});
