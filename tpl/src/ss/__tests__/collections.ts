import { ArrayEnumerator } from "../collections";

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
