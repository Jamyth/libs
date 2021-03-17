"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
const daysBeforeToday = (days, type) => {
    if (days < 0) {
        throw new Error("[DateUtil]: Days must be >= 0, or use DateUtil.daysAfterToday");
    }
    return dateRelativeTo(new Date(), -days, type);
};
const daysAfterToday = (days, type) => {
    if (days < 0) {
        throw new Error("[DateUtil]: Days must be >= 0, or use DateUtil.daysBeforeToday");
    }
    return dateRelativeTo(new Date(), days, type);
};
const today = (type) => {
    return dateRelativeTo(new Date(), 0, type);
};
const daysBefore = (date, days, type) => {
    if (days < 0) {
        throw new Error("[DateUtil]: Days must be >= 0, or use DateUtil.daysAfter");
    }
    return dateRelativeTo(date, -days, type);
};
const daysAfter = (date, days, type) => {
    if (days < 0) {
        throw new Error("[DateUtil]: Days must be >= 0, or use DateUtil.daysAfter");
    }
    return dateRelativeTo(date, days, type);
};
const someday = (date, type) => {
    return dateRelativeTo(date, 0, type);
};
const parse = (text) => {
    const date = new Date(text);
    return isNaN(date.getTime()) ? null : date;
};
const format = (date, type = "default", delimiter = "-") => {
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
const isSameMinute = (time1, time2) => {
    return (Math.floor(time1.getTime() / 60000) === Math.floor(time2.getTime() / 60000));
};
const dateRelativeTo = (date, diffDays, type) => {
    return type === "day-end"
        ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + diffDays, 23, 59, 59)
        : new Date(date.getFullYear(), date.getMonth(), date.getDate() + diffDays, 0, 0, 0);
};
exports.DateUtil = Object.freeze({
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
