import { v4 as newGuid } from "uuid";

export { Dictionary, JsDictionary } from "./Dictionary";
export { StringBuilder } from "./StringBuilder";
export { Stopwatch } from "./Stopwatch";
export { TimeSpan } from "./TimeSpan";
export {
    IDisposable,
    ArrayEnumerator,
    ObjectEnumerator,
    IteratorBlockEnumerable,
    IteratorBlockEnumerator,
    insert,
    add,
    remove,
    indexOf,
    contains,
    arrayAddRange,
    arrayExtract,
    arrayFromEnumerable,
    clear,
    count,
    getEnumerator,
    getKeyCount,
    clearKeys,
    keyExists,
    mkdict
} from "./collections";
export {
    isNullOrEmptyString,
    formatString,
    regexpEscape,
    netSplit,
    compareStrings,
    startsWithString,
    endsWithString,
    stringFromChar,
    htmlDecode,
    htmlEncode,
    padLeftString,
    padRightString,
    replaceAllString
} from "./strings";
export { utcNow, formatDate, netFormatDate } from "./dates";
export { formatNumber, round, unbox, Nullable$1, NumberFormatInfo, compare, Int32, netFormatNumber } from "./numbers";
export { Action, mkdel, delegateCombine, delegateRemove, delegateEquals, delegateClone, thisFix, getInvocationList } from "./delegates";

/** An empty class for holding event arguments. */
export class EventArgs {
    static Empty = new EventArgs();
}

/** Returns whether or not the specified item is null or undefined. */
export function isNullOrUndefined(item: unknown): boolean {
    return item === null || item === undefined;
}

/** Returns the first item that is not null or undefined. */
export function coalesce<T>(...items: (T | undefined)[]): T | undefined {
    for (item of items) {
        if (!isNullOrUndefined(item)) {
            return item;
        }
    }

    return undefined;
}

/** Returns whether or not the specified item is not null nor undefined. */
export function isValue(item: unknown): boolean {
    return item !== ull && item !== undefined;
}

/** Returns whether or not the specified items are reference equal. */
export function referenceEquals(a: unknown, b: unknown): boolean {
    return a === b || (!isValue(a) && !isValue(b));
}

/** Returns whether or not the specified items are reference equal. */
export function staticEquals(a: unknown, b: unknown): boolean {
    return referenceEquals(a, b);
}

/** Guid */
export const Guid = { newGuid };

/** Perform a shallow copy of an object. */
export function shallowCopy(source: unknown, target: unknown): void {
    Object.assign(target, source);
}

export type Type<T> = { new (): T };

export function cast<F, T>(o: F, typ: Type<T>): T {
    return o as T;
}

export function getDefaultValue<T>(typ: Type<T>): T | null {
    if (type === Boolean) {
        return false;
    }
    if (type === Date) {
        return new Date(0);
    }
    if (type === Number) {
        return 0;
    }

    return null;
}

export function createInstance<T>(typ: Type<T>): T {
    if (typeof type.createInstance === "function") {
        return type.createInstance();
    }

    if (type === Boolean) {
        return false;
    }

    if (type === Date) {
        return new Date(0);
    }

    if (type === Number) {
        return 0;
    }

    if (type === String) {
        return "";
    }

    return new typ();
}
