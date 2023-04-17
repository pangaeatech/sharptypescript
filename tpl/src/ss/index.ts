import { v4 as newGuid } from "uuid";

export { default as StringBuilder } from "./StringBuilder";
export { default as Stopwatch } from "./Stopwatch";
export { default as TimeSpan } from "./TimeSpan";

export { utcNow, formatDate, netFormatDate } from "./dates";
export { formatNumber, round, unbox, Nullable$1, NumberFormatInfo, compare, Int32, netFormatNumber } from "./numbers";
export {
    Action,
    mkdel,
    delegateCombine,
    delegateRemove,
    delegateEquals,
    delegateClone,
    thisFix,
    getInvocationList
} from "./delegates";
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
export {
    IDisposable,
    Dictionary,
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

/** An empty class for holding event arguments. */
export class EventArgs {
    static Empty = new EventArgs();
}

/** Returns whether or not the specified item is null or undefined. */
export function isNullOrUndefined(item: unknown): boolean {
    return item === null || item === undefined;
}

/** Returns the first item that is not null or undefined. */
export function coalesce<T>(...items: (T | null | undefined)[]): T | undefined {
    for (const item of items) {
        if (item !== undefined && item !== null) {
            return item;
        }
    }

    return undefined;
}

/** Returns whether or not the specified item is not null nor undefined. */
export function isValue(item: unknown): boolean {
    return item !== null && item !== undefined;
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
export function shallowCopy(source: unknown, target: object): void {
    Object.assign(target, source);
}

export interface Type<T> {
    new (): T;

    createInstance?: () => T;
}

export function cast<F extends T, T>(o: F, typ: Type<T>): T {
    return o as T;
}

export function safeCast<F extends T, T>(o: F, typ: Type<T>): T {
    return o as T;
}

/* eslint-disable @typescript-eslint/ban-types */

export function getDefaultValue<T>(typ: Type<T>): T | null {
    if (typ === (Boolean as Type<Boolean>)) {
        return new Boolean(false) as unknown as T;
    }

    if (typ === (Date as Type<Date>)) {
        return new Date(0) as unknown as T;
    }

    if (typ === (Number as Type<Number>)) {
        return new Number(0) as unknown as T;
    }

    return null;
}

export function createInstance<T>(typ: Type<T>): T {
    if (typeof typ.createInstance === "function") {
        return typ.createInstance();
    }

    if (typ === (Boolean as Type<Boolean>)) {
        return new Boolean(false) as unknown as T;
    }

    if (typ === (Date as Type<Date>)) {
        return new Date(0) as unknown as T;
    }
    if (typ === (Number as Type<Number>)) {
        return new Number(0) as unknown as T;
    }

    if (typ === (String as Type<String>)) {
        return new String("") as unknown as T;
    }

    return new typ();
}

/* eslint-enable @typescript-eslint/ban-types */
