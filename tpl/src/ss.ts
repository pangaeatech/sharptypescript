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

/*
Dictionary$2
Enum
EventArgs
Guid
ICollection
IDisposable
IEnumerable
Int32
InvalidOperationException
IteratorBlockEnumerable
IteratorBlockEnumerator
JsDate
Nullable$1
NumberFormatInfo
ObjectEnumerator
Stopwatch
StringBuilder
TimeSpan
arrayAddRange
arrayExtract
arrayFromEnumerable
clear
clearKeys
coalesce
compare
compareStrings
contains
count
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
unbox
*/
