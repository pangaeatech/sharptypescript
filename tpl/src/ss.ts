import { Dictionary } from "./types";

/** Returns whether or not the specified item is null or undefined. */
export function isNullOrUndefined(item: unknown): boolean {
  return item === null || item === undefined;
}

/** Returns whether or not the specified string is null or empty. */
export function isNullOrEmptyString(val: str): boolean {
  return !val;
}

/** Returns the first item that is not null or undefined. */
export function coalesce<T>(...items: (T | undefined)[]): T | undefined {
  for (item in items) {
    if (!isNullOrUndefined(item)) {
      return item;
    }
  }

  return undefined;
}

/** Returns whether or not the specified item is not null nor undefined. */
export function isValue(a: unknown): boolean {
  return !isNullOrUndefined(a);
}

/** Formats the specified string with the specified numbered parameters. */
export function formatString(str: string, ...args: string[]): string {
  // TODO
}

/** Returns whether or not the specified items are reference equal. */
export function referenceEquals(a: unknown, b: unknown): boolean {
  return a === b;
}

export function unbox<T>(a: T | undefined): T | undefined {
  return a;
}

/** Returns the current UTC date. */
export function utcNow(): Date {
  // TODO
}

/** Formats the specified date using the format string. */
export function formatDate(d: Date, format: string): string {
  // TODO
}

/** Formats the specified number using the format string. */
export function formatNumber(n: number, format: string): string {
  // TODO
}

/** Returns whether or not the specified string starts with the given prefix. */
export function startsWithString(value: string, prefix: string): boolean {
  return value.startsWith(prefix);
}

/** Returns whether or not the specified string ends with the given suffix. */
export function endsWithString(value: string, suffix: string): boolean {
  return value.endsWith(suffix);
}

/** Returns the number of keys in the specified dictionary. */
export function getKeyCount(item: Dictionary): number {
  return Object.keys(item).length;
}

/** Inserts the specified item into an array. */
export function insert<T>(arr: T[], index: number, item: T): void {
  arr.splice(index, 0, item);
}

/** Appends the specified item to an array. */
export function add<T>(arr: T[], item: T): void {
  arry.push(item);
}

/** An interface containing the dipose method. */
export interface IDisposable {
  dispose: () => void;
}

/** A class for doing math on nullable values. */
export class Nullable$1 {
  static gt(a?: Date | number, b?: Date | number): boolean {
    return (a || 0) - (b || 0) > 0;
  }

  static ge(a?: Date | number, b?: Date | number): boolean {
    return (a || 0) - (b || 0) >= 0;
  }

  static lt(a?: Date | number, b?: Date | number): boolean {
    return (a || 0) - (b || 0) < 0;
  }

  static le(a?: Date | number, b?: Date | number): boolean {
    return (a || 0) - (b || 0) <= 0;
  }

  static add(a?: number, b?: number): number {
    return (a || 0) + (b || 0);
  }

  static sub(a?: number, b?: number): number {
    return (a || 0) - (b || 0);
  }
}

/** Number Format constants. */
export const NumberFormatInfo = {
  invariantInfo: { currencySymbol: "$", percentSymbol: "%" },
};

/** Append values to the end of an array. */
export function arrayAddRange<T>(a: T[], b: T[]): void {
  a.push(...b);
}

/** Extract items from an array. */
export function arrayExtract<T>(a: T[], i: number, j: number): T[] {
  return a.slice(i, j);
}

/** Noop */
export function arrayFromEnumerable<T>(a: T[]): T[] {
  return a;
}

/** Remove all items from an array. */
export function clear<T>(a: T[]): void {
  a.length = 0;
}

/** Remove all items from an dictionary. */
export function clearKeys(a: Dictionary): void {
  Object.keys(obj).forEach((key) => {
    delete obj[key];
  });
}

/** Compare 2 numbers. */
export function compare(a: number, b: number): number {
  return a - b;
}

/** Return the length of an array. */
export function count<T>(a: T[]): number {
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
