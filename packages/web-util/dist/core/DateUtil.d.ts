export declare type DayStartOrEnd = "day-end" | "day-start";
export declare const DateUtil: Readonly<{
    daysBeforeToday: (days: number, type: DayStartOrEnd) => Date;
    daysAfterToday: (days: number, type: DayStartOrEnd) => Date;
    today: (type: DayStartOrEnd) => Date;
    daysBefore: (date: Date, days: number, type: DayStartOrEnd) => Date;
    daysAfter: (date: Date, days: number, type: DayStartOrEnd) => Date;
    someday: (date: Date, type: DayStartOrEnd) => Date;
    parse: (text: string) => Date | null;
    format: (date: Date | null, type?: "default" | "with-time" | "no-year" | "no-year-with-time" | "no-day" | "chinese" | "chinese-with-time" | "time", delimiter?: string) => string;
    isSameMinute: (time1: Date, time2: Date) => boolean;
}>;
