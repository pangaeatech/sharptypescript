import { v4 as newGuid } from "uuid";

export { default as StringBuilder } from "./StringBuilder";
export { default as Stopwatch } from "./Stopwatch";
export { default as TimeSpan } from "./TimeSpan";

export { JsDate, utcNow, toUTC, fromUTC, today, formatDate, netFormatDate } from "./dates";
export { formatNumber, round, unbox, Nullable$1, NumberFormatInfo, compare, Int32, netFormatNumber } from "./numbers";
export {
    Action,
    Delegate,
    mkdel,
    delegateCombine,
    delegateRemove,
    delegateEquals,
    delegateClone,
    thisFix,
    getInvocationList
} from "./delegates";
export {
    Exception,
    AggregateException,
    AmbiguousMatchException,
    ArgumentException,
    ArgumentNullException,
    ArgumentOutOfRangeException,
    DivideByZeroException,
    FormatException,
    InvalidCastException,
    InvalidOperationException,
    JsErrorException,
    KeyNotFoundException,
    NotImplementedException,
    NotSupportedException,
    NullReferenceException,
    PromiseException
} from "./exceptions";
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
    jsEncode,
    padLeftString,
    padRightString,
    replaceAllString,
    parseXml,
    isLower,
    isUpper
} from "./strings";
export {
    Dictionary,
    IDisposable,
    IEnumerator,
    IEnumerable,
    ArrayEnumerator,
    ObjectEnumerator,
    IteratorBlockEnumerable,
    IteratorBlockEnumerator,
    insert,
    add,
    remove,
    indexOf,
    getItem,
    setItem,
    removeAt,
    indexOfArray,
    contains,
    arrayLength,
    arrayPeekFront,
    arrayPeekBack,
    arrayRemoveRange,
    arrayAddRange,
    arrayExtract,
    arrayFromEnumerable,
    arrayClone,
    clear,
    count,
    getEnumerator,
    getKeyCount,
    clearKeys,
    keyExists,
    mkdict,
    repeat,
    arrayFill,
    arrayCopy,
    arrayInsertRange
} from "./collections";

/** An empty class for holding event arguments. */
export class EventArgs {
    static Empty = new EventArgs();
}

export class CancelEventArgs extends EventArgs {
    cancel = false;
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
    if (referenceEquals(typ, Boolean)) {
        return false as unknown as T;
    }

    if (referenceEquals(typ, Date)) {
        return new Date(0) as unknown as T;
    }

    if (referenceEquals(typ, Number)) {
        return 0 as unknown as T;
    }

    return null;
}

export function createInstance<T>(typ: Type<T>): T {
    if (typeof typ.createInstance === "function") {
        return typ.createInstance();
    }

    if (referenceEquals(typ, Boolean)) {
        return false as unknown as T;
    }

    if (referenceEquals(typ, Date)) {
        return new Date(0) as unknown as T;
    }

    if (referenceEquals(typ, Number)) {
        return 0 as unknown as T;
    }

    if (referenceEquals(typ, String)) {
        return "" as unknown as T;
    }

    return new typ();
}

/* eslint-enable @typescript-eslint/ban-types */
