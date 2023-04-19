import { ArgumentException } from "./exceptions";

export default class Enum {
    static parse<T extends object>(enumType: T, s: string): unknown {
        var keys = Object.keys(enumType);
        for (const k of keys) {
            if (k === s) {
                return enumType[k];
            }
        }
        throw new ArgumentException("Invalid Enumeration Value");
    }

    static toString<T extends object>(enumType: T, value: unknown): string {
        var keys = Object.keys(enumType);
        for (const k of keys) {
            if (enumType[k] === value) {
                return k;
            }
        }
        throw new ArgumentException("Invalid Enumeration Value");
    }

    static getValues<T extends object>(enumType: T): unknown[] {
        var parts: unknown[] = [];
        var keys = Object.keys(enumType);
        for (const k of keys) {
            if (enumType.hasOwnProperty(k)) {
                parts.push(enumType[k]);
            }
        }
        return parts;
    }
}
