import { IDisposable } from "./index";

export class ArrayEnumerator<T> implements IDisposable {
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
      throw "Invalid operation";
    }

    return this._array[this._index];
  }

  dispose(): void {}
}

export interface ObjectEntry<T> {
  key: string;
  value: T;
}

export class ObjectEnumerator<T> implements IDisposable {
  private _keys: string[];
  private _index: number;
  private _object: Dictionary<string, T>;

  constructor(o: Dictionary<string, T>) {
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
      throw "Invalid operation";
    }

    var k = this._keys[this._index];
    return { key: k, value: this._object[k] };
  }

  dispose(): void {}
}

export class IteratorBlockEnumerable<T> {
  private _enumerator: () => IteratorBlockEnumerator;

  constructor(enumerator: () => IteratorBlockEnumerator, $this: unknown) {
    this._enumerator = enumerator;
  }

  getEnumerator(): IteratorBlockEnumerator {
    return this._enumerator();
  }
}

export class IteratorBlockEnumerator<T> implements IDisposable {
  private _moveNext: ($this: unknown) => void;
  private _getCurrent: ($this: unknown) => T;
  private _dispose?: () => void;
  private _this: unknown;

  constructor(
    moveNext: ($this: unknown) => void,
    getCurrent: ($this: unknown) => T,
    dispose: (() => void) | undefined,
    $this: unknown
  ) {
    this._moveNext = moveNext;
    this._getCurrent = getCurrent;
    this._dispose = dispose;
    this._this = $this;
  }

  moveNext(): void {
    try {
      return this._moveNext(this._this);
    } catch (ex) {
      if (this._dispose) {
        this._dispose(this._this);
      }
      throw ex;
    }
  }

  current(): T {
    return this._getCurrent(this._this);
  }

  reset(): never {
    throw new Error("Reset is not supported.");
  }

  dispose(): void {
    if (this._dispose) {
      this._dispose(this._this);
    }
  }
}
