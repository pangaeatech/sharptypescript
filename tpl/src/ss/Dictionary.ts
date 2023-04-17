export interface Pointer<T> {
    $: T;
}

interface DictData<T> {
    [key: string]: T;
}

export type JsDictionary = DictData<unknown>;

export default class Dictionary<K extends string, V> {
    private data: DictData<V>;

    constructor() {
        data = {};
    }

    add(key: K, value: V) {
        if (key in this.data) {
            throw "Key " + key + " already exists.";
        }

        this.data[key] = value;
    }

    set_item(key: K, value: V) {
        this.data[key] = value;
    }

    get_item(key: K): V {
        var v = this.data[key];
        if (v === undefined) {
            throw "Key " + key + " does not exist.";
        }
        return v;
    }

    tryGetValue(key: K, value: Pointer<V>): boolean {
        var v = this.data[key];
        if (v !== undefined) {
            value.$ = v;
            return true;
        } else {
            value.$ = undefined;
            return false;
        }
    }

    containsKey(key: K): boolean {
        return key in this.data;
    }

    clear(): void {
        this.data = {};
    }

    remove(key: K): boolean {
        if (key in this.data) {
            delete this.data[key];
            return true;
        }

        return false;
    }

    get_count(): number {
        return Object.keys(this.data).length;
    }

    get_keys(): K[] {
        return Object.keys(this.data);
    }

    get_values(): V[] {
        return Object.values(this.data);
    }

    contains(v: V): boolean {
        return v in Object.values(this.data);
    }
}
