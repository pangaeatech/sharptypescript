/** Returns whether or not the specified item is null or undefined. */
export function isNullOrUndefined(item: unknown): boolean 
{
    return item === null || item === undefined;
}

/** Returns whether or not the specified string is null or empty. */
export function isNullOrEmptyString(val: str): boolean
{
    return !val;
}

/** Returns the first item that is not null or undefined. */
export function coalesce<T>(...items: (T | undefined)[]): T | undefined
{
    for (item in items) {
        if (!isNullOrUndefined(item)) {
            return item;
        }
    }

    return undefined;
}

/** Returns whether or not the specified item is not null nor undefined. */
export function isValue(a: unknown): boolean
{
    return !isNullOrUndefined(a);
}

/** Formats the specified string with the specified numbered parameters. */
export function formatString(str: string, ...args: string[]): string
{
    // TODO
}

/** Returns whether or not the specified items are reference equal. */
export function referenceEquals(a: unknown, b: unknown): boolean
{
    return a === b;
}

export function unbox<T>(a: T): T 
{
    return a;
}

/** Returns the current UTC date. */
export function utcNow(): Date
{
    // TODO
}

/** Formats the specified date using the format string. */
export function formatDate(d: Date, format: string): string
{
    // TODO
}

/** Formats the specified number using the format string. */
export function formatNumber(n: number, format: string): string
{
    // TODO
}

/** Returns whether or not the specified string starts with the given prefix. */
export function startsWithString(value: string, prefix: string): boolean
{
    // TODO
}

/** Returns whether or not the specified string ends with the given suffix. */
export function endsWithString(value: string, suffix: string): boolean
{
    // TODO
}

/** Returns the number of keys in the specified object. */
export function getKeyCount(item: Object): number
{
    return Object.keys(item).length;
}

/** Inserts the specified item into an array. */
export function insert<T>(arr: T[], index: number, item: T): void
{
    // TODO
}

/** Appends the specified item to an array. */
export function add<T>(arr: T[], item: T): void
{
    // TODO
}

/** An interface containing the dipose method. */
export interface IDisposable 
{
    dispose: () => void;
}

export class Nullable$1
{
    static gt(a?: Date | number, b?: Date | number): boolean
    {
        // TODO
    }

    static ge(a?: Date | number, b?: Date | number): boolean
    {
        // TODO
    }

    static lt(a?: Date | number, b?: Date | number): boolean
    {
        // TODO
    }

    static le(a?: Date | number, b?: Date | number): boolean
    {
        // TODO
    }

    static add(a?: number, b?: number): number | undefined
    {
        // TODO
    }

    static sub(a?: number, b?: number): number | undefined
    {
        // TODO
    }
}

export const NumberFormatInfo = { invariantInfo: { currencySymbol: "$", percentSymbol: "%" } };

export function arrayAddRange<T>(a: T[], b: T[]): void
{
    a.push(...b);
}

export function arrayExtract<T>(a: T[], i: number, j: number): T[]
{
    return a.slice(i, j);
}

export function arrayFromEnumerable<T>(a: T[]): T[]
{
    return a;
}

export function clear<T>(a: T[]): void
{
    a.length = 0;
}

export function clearKeys(a: unknown): void
{
    Object.keys(obj).forEach(key => { delete obj[key]; });
}

export function compare(a: number, b: number): number
{
    return a - b;
}

export function count<T>(a: T[]): number
{
    return a.length;
}

/*
EventArgs
Guid
Int32
InvalidOperationException
IteratorBlockEnumerable
IteratorBlockEnumerator
ObjectEnumerator
Stopwatch
StringBuilder
TimeSpan
compareStrings
contains
createInstance
delegateCombine
delegateRemove
getAssemblies
getAssemblyTypes
getAttributes
getEnumerator
getInstanceType
getMembers
getTypeAssembly
getTypeFullName
getTypeName
indexOf
insert
isAssignableFrom
isClass
isInstanceOfType
keyExists
makeGenericType
midel
mkdel
mkdict
netFormatNumber
netSplit
padLeftString
padRightString
remove
replaceAllString
round
safeCast
setMetadata
shallowCopy
staticEquals
thisFix
*/
