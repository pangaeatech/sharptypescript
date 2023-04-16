export interface Pointer<T> {
  $: T;
}

export default class Dictionary<K, V> {
  [key: K]: V;

  add(key: K, value: V) {
    if (key in this) {
      throw "Key " + key + " already exists.";
    }

    this[key] = value;
  }

  set_item(key: K, value: V) {
    this[key] = value;
  }

  get_item(key: K): V {
    var v = this[key];
    if (v === undefined) {
      throw "Key " + key + " does not exist.";
    }
    return v;
  }

  tryGetValue(key: K, value: Pointer<V>): boolean {
    var v = this[key];
    if (v !== undefined) {
      value.$ = v;
      return true;
    } else {
      value.$ = undefined;
      return false;
    }
  }

  containsKey(key: K): boolean {
    return key in this;
  }

  clear(): void {
    for (let n in this) {
      if (this.hasOwnProperty(n)) {
        delete this[n];
      }
    }
  }

  remove(key: K): boolean {
    if (key in this) {
      delete this[key];
      return true;
    }

    return false;
  }

  get_count(): number {
    return Object.keys(this).length;
  }

  get_keys(): K[] {
    return Object.keys(this);
  }

  get_values(): V[] {
    return Object.values(this);
  }

  contains(v: V): boolean {
    return v in Object.values(this);
  }
}
