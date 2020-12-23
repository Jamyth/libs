export declare const TextUtil: Readonly<{
    truncate: (text: string, maxLength: number, suffix?: string) => string;
    interpolate: (text: string, ...parameters: string[]) => string;
    splitByLength: (text: string, charLength: number, delimiter: string) => string;
}>;
