import {
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
} from "../collections";

import { InvalidOperationException, NotSupportedException } from "../exceptions";

describe("ArrayEnumerator tests", () => {
    test("ArrayEnumerator moveNext() returns true when there is a next element in the array", () => {
        const arr = ["a", "b", "c"];
        const enumerator = new ArrayEnumerator(arr);

        expect(enumerator.moveNext()).toBe(true);
    });

    test("ArrayEnumerator moveNext() returns false when there is no next element in the array", () => {
        const arr = ["a", "b", "c"];
        const enumerator = new ArrayEnumerator(arr);

        enumerator.moveNext();
        enumerator.moveNext();
        enumerator.moveNext();

        expect(enumerator.moveNext()).toBe(false);
    });

    test("ArrayEnumerator reset() resets the index to -1", () => {
        const arr = ["a", "b", "c"];
        const enumerator = new ArrayEnumerator(arr);

        enumerator.moveNext();
        enumerator.moveNext();
        enumerator.reset();

        expect(enumerator.moveNext()).toBe(true);
    });

    test("ArrayEnumerator current() returns the current element", () => {
        const arr = ["a", "b", "c"];
        const enumerator = new ArrayEnumerator(arr);

        enumerator.moveNext();

        expect(enumerator.current()).toBe("a");
    });

    test("ArrayEnumerator current() throws an error if index is out of bounds", () => {
        const arr = ["a", "b", "c"];
        const enumerator = new ArrayEnumerator(arr);

        expect(() => enumerator.current()).toThrow();
    });

    test("ArrayEnumerator dispose() does not throw an error", () => {
        const arr = ["a", "b", "c"];
        const enumerator = new ArrayEnumerator(arr);

        expect(() => enumerator.dispose()).not.toThrow();
    });
});

describe("ObjectEnumerator", () => {
    const dictionary = { a: 1, b: 2, c: 3 };
    const objectEnumerator = new ObjectEnumerator<number>(dictionary);

    it("should be able to moveNext", () => {
        expect(objectEnumerator.moveNext()).toBe(true);
    });

    it("should be able to reset", () => {
        objectEnumerator.reset();
        expect(objectEnumerator.moveNext()).toBe(true);
    });

    it("should throw error on current() when index < 0", () => {
        expect(() => {
            objectEnumerator.reset();
            objectEnumerator.current();
        }).toThrow(InvalidOperationException);
    });

    it("should throw error on current() when index >= keys.length", () => {
        expect(() => {
            objectEnumerator.reset();
            while (objectEnumerator.moveNext()) {}
            objectEnumerator.current();
        }).toThrow(InvalidOperationException);
    });

    it("should return correct key and value on current()", () => {
        objectEnumerator.reset();
        expect(objectEnumerator.moveNext()).toBe(true);
        expect(objectEnumerator.current()).toEqual({ key: "a", value: 1 });
        expect(objectEnumerator.moveNext()).toBe(true);
        expect(objectEnumerator.current()).toEqual({ key: "b", value: 2 });
        expect(objectEnumerator.moveNext()).toBe(true);
        expect(objectEnumerator.current()).toEqual({ key: "c", value: 3 });
    });
});

describe("IteratorBlockEnumerable", () => {
    describe("getEnumerator()", () => {
        test("returns an instance of IteratorBlockEnumerator", () => {
            const enumBlock = new IteratorBlockEnumerable(
                () =>
                    new IteratorBlockEnumerator(
                        () => true,
                        () => 42,
                        undefined,
                        null
                    ),
                null
            );
            expect(enumBlock.getEnumerator()).toBeInstanceOf(IteratorBlockEnumerator);
        });
    });
});

describe("IteratorBlockEnumerator", () => {
    describe("moveNext()", () => {
        test("calls _moveNext function with _this argument", () => {
            const moveNext = jest.fn(() => true);
            const iteration = new IteratorBlockEnumerator(moveNext, () => 42, undefined, null);
            iteration.moveNext();
            expect(moveNext).toHaveBeenCalledWith(null);
        });

        test("returns the value returned by _moveNext function", () => {
            const iteration = new IteratorBlockEnumerator(
                () => true,
                () => 42,
                undefined,
                null
            );
            expect(iteration.moveNext()).toBe(true);
        });

        test("calls _dispose function and throws exception if _moveNext function throws exception", () => {
            const moveNext = jest.fn(() => {
                throw new Error("Exception");
            });
            const dispose = jest.fn();
            const iteration = new IteratorBlockEnumerator(moveNext, () => 42, dispose, null);
            expect(() => iteration.moveNext()).toThrow(InvalidOperationException);
            expect(dispose).toHaveBeenCalledWith(null);
        });
    });

    describe("current()", () => {
        test("calls _getCurrent function with _this argument", () => {
            const getCurrent = jest.fn(() => 42);
            const iteration = new IteratorBlockEnumerator(() => true, getCurrent, undefined, null);
            iteration.current();
            expect(getCurrent).toHaveBeenCalledWith(null);
        });

        test("returns the value returned by _getCurrent function", () => {
            const iteration = new IteratorBlockEnumerator(
                () => true,
                () => 42,
                undefined,
                null
            );
            expect(iteration.current()).toBe(42);
        });
    });

    describe("reset()", () => {
        test("throws an Error", () => {
            const iteration = new IteratorBlockEnumerator(
                () => true,
                () => 42,
                undefined,
                null
            );
            expect(() => iteration.reset()).toThrow(NotSupportedException);
        });
    });

    describe("dispose()", () => {
        test("calls _dispose function with _this argument if it is defined", () => {
            const dispose = jest.fn();
            const iteration = new IteratorBlockEnumerator(
                () => true,
                () => 42,
                dispose,
                null
            );
            iteration.dispose();
            expect(dispose).toHaveBeenCalledWith(null);
        });

        test("does not call _dispose function if it is undefined", () => {
            const dispose = jest.fn();
            const moveNext = () => {
                throw "bad";
            };
            const iteration = new IteratorBlockEnumerator(moveNext, () => 42, undefined, null);
            expect(() => iteration.moveNext()).toThrow();
            iteration.dispose();
            expect(dispose).not.toHaveBeenCalled();
        });
    });
});

describe("insert", () => {
    test("should insert an item at the specified index", () => {
        const arr = [1, 2, 4];
        insert(arr, 2, 3);
        expect(arr).toEqual([1, 2, 3, 4]);
    });
});

describe("add", () => {
    test("should append an item to the end of an array", () => {
        const arr = [1, 2];
        add(arr, 3);
        expect(arr).toEqual([1, 2, 3]);
    });
});

describe("remove", () => {
    test("should remove the specified item from an array", () => {
        const arr = [1, 2, 3];
        remove(arr, 2);
        expect(arr).toEqual([1, 3]);
    });

    test("should return false when trying to remove an item not in the array", () => {
        const arr = [1, 2, 3];
        expect(remove(arr, 4)).toBe(false);
    });
});

describe("indexOf", () => {
    test("should return the index of the specified item in an array", () => {
        const arr = [1, 2, 3];
        expect(indexOf(arr, 2)).toBe(1);
    });

    test("should return -1 when the specified item is not in the array", () => {
        const arr = [1, 2, 3];
        expect(indexOf(arr, 4)).toBe(-1);
    });
});

describe("contains", () => {
    test("should return true when an item is in an array", () => {
        const arr = [1, 2, 3];
        expect(contains(arr, 2)).toBe(true);
    });

    test("should return false when an item is not in an array", () => {
        const arr = [1, 2, 3];
        expect(contains(arr, 4)).toBe(false);
    });
});

describe("arrayAddRange", () => {
    test("should append an array to the end of another array", () => {
        const a = [1, 2];
        const b = [3, 4];
        arrayAddRange(a, b);
        expect(a).toEqual([1, 2, 3, 4]);
    });
});

describe("arrayExtract", () => {
    test("should extract a range of items from an array", () => {
        const arr = [1, 2, 3, 4, 5];
        expect(arrayExtract(arr, 1, 3)).toEqual([2, 3, 4]);
    });

    test("should extract all items starting from a specified index", () => {
        const arr = [1, 2, 3, 4, 5];
        expect(arrayExtract(arr, 2)).toEqual([3, 4, 5]);
    });

    test("should extract all items starting from a specified index", () => {
        const arr = [1, 2, 3, 4, 5];
        expect(arrayExtract(arr, 2, 0)).toEqual([3, 4, 5]);
    });
});

describe("arrayFromEnumerable", () => {
    test("should return the same array that was passed in", () => {
        const arr = [1, 2, 3];
        expect(arrayFromEnumerable(arr)).not.toBe(arr);
        expect(arrayFromEnumerable(arr)).toEqual(arr);
    });
});

describe("clear", () => {
    test("should remove all items from an array", () => {
        const arr = [1, 2, 3];
        clear(arr);
        expect(arr).toEqual([]);
    });
});

describe("count", () => {
    test("should return the length of an array", () => {
        const arr = [1, 2, 3];
        expect(count(arr)).toBe(3);
    });
});

describe("getEnumerator", () => {
    test("should return an enumerator for an array", () => {
        const arr = [1, 2, 3];
        const enumerator = getEnumerator(arr);
        enumerator.moveNext();
        expect(enumerator.current()).toBe(1);
        expect(enumerator.moveNext()).toBe(true);
        expect(enumerator.current()).toBe(2);
        expect(enumerator.moveNext()).toBe(true);
        expect(enumerator.current()).toBe(3);
        expect(enumerator.moveNext()).toBe(false);
    });
});

describe("getKeyCount", () => {
    test("should return the number of keys in a dictionary", () => {
        const dict = { a: 1, b: 2 };
        expect(getKeyCount(dict)).toBe(2);
    });
});

describe("clearKeys", () => {
    test("should remove all keys from a dictionary", () => {
        const dict = { a: 1, b: 2 };
        clearKeys(dict);
        expect(dict).toEqual({});
    });
});

describe("keyExists", () => {
    test("should return true if a key exists in a dictionary", () => {
        const dict = { a: 1, b: 2 };
        expect(keyExists(dict, "a")).toBe(true);
    });

    test("should return false if a key does not exist in a dictionary", () => {
        const dict = { a: 1, b: 2 };
        expect(keyExists(dict, "c")).toBe(false);
    });
});

describe("mkdict", () => {
    test("should create a dictionary from an array of key-value pairs", () => {
        const dict = mkdict(["a", "1", "b", "2"]);
        expect(dict).toEqual({ a: "1", b: "2" });
    });
});
