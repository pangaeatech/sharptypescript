import {
    ArgumentException,
    ArgumentOutOfRangeException,
    InvalidOperationException,
    NotSupportedException
} from "./exceptions";

/** A dictionary with string keys. */
export interface Dictionary<T> {
    [key: string]: T;
}

/** An interface containing the dipose method. */
export interface IDisposable {
    dispose: () => void;
}

/** An interface for all Enumerators to implement. */
export interface IEnumerator<T> extends IDisposable {
    moveNext: () => boolean;
    reset: () => void;
    current: () => T;
}

export interface IEnumerable<T> {
    getEnumerator: () => IEnumerator<T>;
}

/** An enumerator that works over arrays. */
export class ArrayEnumerator<T> implements IEnumerator<T> {
    private _array: T[];
    private _index: number;

    constructor(array: T[]) {
        this._array = array;
        this._index = -1;
    }

    moveNext(): boolean {
        this._index++;
        return this._index < this._array.length;
    }

    reset(): void {
        this._index = -1;
    }

    current(): T {
        if (this._index < 0 || this._index >= this._array.length) {
            throw new InvalidOperationException();
        }

        return this._array[this._index];
    }

    dispose(): void {}
}

interface ObjectEntry<T> {
    key: string;
    value: T;
}

/** An enumerator that works over objects. */
export class ObjectEnumerator<T> implements IEnumerator<ObjectEntry<T>> {
    private _keys: string[];
    private _index: number;
    private _object: Dictionary<T>;

    constructor(o: Dictionary<T>) {
        this._keys = Object.keys(o);
        this._index = -1;
        this._object = o;
    }

    moveNext(): boolean {
        this._index++;
        return this._index < this._keys.length;
    }

    reset(): void {
        this._index = -1;
    }

    current(): ObjectEntry<T> {
        if (this._index < 0 || this._index >= this._keys.length) {
            throw new InvalidOperationException();
        }

        var k = this._keys[this._index];
        return { key: k, value: this._object[k] };
    }

    dispose(): void {}
}

export class IteratorBlockEnumerable<T, X> implements IEnumerable<T> {
    private _enumerator: ($this: X) => IteratorBlockEnumerator<T, X>;
    private _this: X;

    constructor(enumerator: ($this: X) => IteratorBlockEnumerator<T, X>, $this: X) {
        this._enumerator = enumerator;
        this._this = $this;
    }

    getEnumerator(): IteratorBlockEnumerator<T, X> {
        return this._enumerator(this._this);
    }
}

export class IteratorBlockEnumerator<T, X> implements IEnumerator<T> {
    private _moveNext: ($this: X) => boolean;
    private _getCurrent: ($this: X) => T;
    private _dispose?: ($this: X) => void;
    private _this: X;

    constructor(
        moveNext: ($this: X) => boolean,
        getCurrent: ($this: X) => T,
        dispose: (($this: X) => void) | undefined,
        $this: X
    ) {
        this._moveNext = moveNext;
        this._getCurrent = getCurrent;
        this._dispose = dispose;
        this._this = $this;
    }

    moveNext(): boolean {
        try {
            return this._moveNext(this._this);
        } catch (ex) {
            if (this._dispose) {
                this._dispose(this._this);
            }
            throw new InvalidOperationException();
        }
    }

    current(): T {
        return this._getCurrent(this._this);
    }

    reset(): never {
        throw new NotSupportedException("Reset is not supported.");
    }

    dispose(): void {
        if (this._dispose) {
            this._dispose(this._this);
        }
    }
}

/** Inserts the specified item into an array. */
export function insert<T>(arr: T[], index: number, item: T): void {
    arr.splice(index, 0, item);
}

/** Appends the specified item to an array. */
export function add<T>(arr: T[], item: T): void {
    arr.push(item);
}

export function remove<T>(arr: T[], item: T): boolean {
    const index = indexOf(arr, item);
    if (index >= 0) {
        arr.splice(index, 1);
        return true;
    }

    return false;
}

export function indexOf<T>(arr: T[], item: T): number {
    return arr.indexOf(item);
}

export function getItem<T>(arr: T[], index: number): T | undefined {
    return arr[index];
}

export function setItem<T>(arr: T[], index: number, value: T): void {
    arr[index] = value;
}

export function removeAt<T>(arr: T[], index: number): void {
    arr.splice(index, 1);
}

export function indexOfArray<T>(arr: T[], item: T, startIndex?: number): number {
    return arr.indexOf(item, startIndex);
}

export function contains<T>(arr: T[], item: T): boolean {
    return indexOf(arr, item) >= 0;
}

export function arrayLength<T>(arr: T[]): number {
    return arr.length;
}

export function arrayPeekFront<T>(arr: T[]): T {
    if (arr.length) {
        return arr[0];
    }

    throw new ArgumentException("Array is empty");
}

export function arrayPeekBack<T>(arr: T[]): T {
    if (arr.length) {
        return arr[arr.length - 1];
    }

    throw new ArgumentException("Array is empty");
}

export function arrayRemoveRange<T>(arr: T[], index: number, count: number) {
    arr.splice(index, count);
}

/** Append values to the end of an array. */
export function arrayAddRange<T>(a: T[], b: T[]): void {
    a.push(...b);
}

/** Extract items from an array. */
export function arrayExtract<T>(a: T[], start: number, count?: number): T[] {
    if (!count) {
        return a.slice(start);
    }

    return a.slice(start, start + count);
}

/** Clone the array */
export function arrayFromEnumerable<T>(a: T[]): T[] {
    return arrayClone(a);
}

export function arrayClone<T>(a: T[]): T[] {
    return [...a];
}

/** Remove all items from an array. */
export function clear<T>(a: T[]): void {
    a.length = 0;
}

/** Return the length of an array. */
export function count<T>(a: T[]): number {
    return a.length;
}

export function getEnumerator<T>(arr: T[]): ArrayEnumerator<T> {
    return new ArrayEnumerator(arr);
}

/** Returns the number of keys in the specified dictionary. */
export function getKeyCount<T>(item: Dictionary<T>): number {
    return Object.keys(item).length;
}

/** Remove all items from an dictionary. */
export function clearKeys<T>(d: Dictionary<T>): void {
    for (const n in d) {
        if (d.hasOwnProperty(n)) {
            delete d[n];
        }
    }
}

export function keyExists<T>(d: Dictionary<T>, k: string): boolean {
    return d[k] !== undefined;
}

/** Generate a dictionary from an array. */
export function mkdict(args: string[]): Dictionary<string> {
    const r: Dictionary<string> = {};
    for (var i = 0; i < args.length; i += 2) {
        r[args[i]] = args[i + 1];
    }
    return r;
}

export function repeat<T>(value: T, count: number): T[] {
    var result: T[] = [];
    for (var i = 0; i < count; i++) {
        result.push(value);
    }
    return result;
}

export function arrayFill<T>(dst: T[], val: T, index: number, count: number): void {
    dst.fill(val, index, index + count);
}

export function arrayCopy<T>(src: T[], spos: number, dst: T[], dpos: number, len: number): void {
    if (spos < 0 || dpos < 0 || len < 0) {
        throw new ArgumentOutOfRangeException();
    }

    if (len > src.length - spos || len > dst.length - dpos) {
        throw new ArgumentException();
    }

    if (spos < dpos && src === dst) {
        while (--len >= 0) dst[dpos + len] = src[spos + len];
    } else {
        for (var i = 0; i < len; i++) dst[dpos + i] = src[spos + i];
    }
}

export function arrayInsertRange<T>(arr: T[], index: number, items: T[]): void {
    if (index === 0) {
        arr.unshift.apply(arr, items);
    } else {
        for (var i = 0; i < items.length; i++) {
            arr.splice(index + i, 0, items[i]);
        }
    }
}
