import {
    Delegate,
    mkdel,
    delegateCombine,
    delegateRemove,
    delegateEquals,
    delegateClone,
    thisFix,
    getInvocationList
} from "../delegates";

describe("Testing mkdel", () => {
    test("should return a delegate if obj is not null or undefined", () => {
        const obj = {};
        const method = jest.fn();
        const del = mkdel(obj, method);
        expect(del._targets).toBeDefined();
    });

    test("should return a delegate if obj is null or undefined", () => {
        const obj = null;
        const method = jest.fn();
        const del = mkdel(obj, method);
        expect(del._targets).toBeDefined();
    });
});

describe("Testing delegateCombine", () => {
    test("should combine two delegates into one and return the resulting delegate", () => {
        const d1 = (() => {}) as Delegate;
        d1._targets = [jest.fn()];
        const d2 = (() => {}) as Delegate;
        d2._targets = [jest.fn()];
        const combDel = delegateCombine(d1, d2);
        expect(combDel._targets.length).toBe(d1._targets.length + d2._targets.length);
    });
});

describe("Testing delegateRemove", () => {
    test("should remove any targets of d1 that are in d2 and return the resulting delegate", () => {
        const d1 = (() => {}) as Delegate;
        d1._targets = [jest.fn(), jest.fn(), jest.fn()];
        const d2 = (() => {}) as Delegate;
        d2._targets = [d1._targets[0], d1._targets[2]];
        const remDel = delegateRemove(d1, d2);
        expect(remDel._targets.length).toBe(d1._targets.length - d2._targets.length);
    });
});

describe("Testing delegateEquals", () => {
    test("should return true if two delegates have the same targets", () => {
        const d1 = (() => {}) as Delegate;
        d1._targets = [jest.fn(), jest.fn()];
        const d2 = (() => {}) as Delegate;
        d2._targets = [d1._targets[0], d1._targets[1]];
        const equals = delegateEquals(d1, d2);
        expect(equals).toBe(true);
    });

    test("should return false if two delegates do not have the same targets", () => {
        const d1 = (() => {}) as Delegate;
        d1._targets = [jest.fn(), jest.fn()];
        const d2 = (() => {}) as Delegate;
        d2._targets = [d1._targets[0]];
        const equals = delegateEquals(d1, d2);
        expect(equals).toBe(false);
    });
});

describe("Testing delegateClone", () => {
    test("should create a new delegate with the same targets as the source delegate", () => {
        const source = (() => {}) as Delegate;
        source._targets = [jest.fn(), jest.fn(), jest.fn()];
        const clone = delegateClone(source);
        expect(clone._targets.length).toBe(source._targets.length);
    });
});

describe("Testing thisFix", () => {
    test("should bind the function to null and provide null as the first argument", () => {
        const func = function (a: any, b: string, c: string, d?: string) {
            return a + b + c + d;
        };
        const fixFunc = thisFix(func);
        const result = fixFunc("any", "remaining", "arguments");
        expect(result).toEqual("nullanyremainingarguments");
    });
});

describe("Testing getInvocationList", () => {
    test("should return an array of targets of a given delegate", () => {
        const delegate = (() => {}) as Delegate;
        delegate._targets = [jest.fn(), jest.fn()];
        const targets = getInvocationList(delegate);
        expect(targets.length).toBe(delegate._targets.length);
    });
});
