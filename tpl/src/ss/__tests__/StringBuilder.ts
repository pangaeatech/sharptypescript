import StringBuilder from "../StringBuilder";

describe("StringBuilder", () => {
    let sb: StringBuilder;

    beforeEach(() => {
        sb = new StringBuilder();
    });

    describe("append", () => {
        it("should append a stringable object to the builder", () => {
            const obj = { toString: () => "test" };
            sb.append(obj);
            expect(sb.toString()).toEqual("test");
        });

        it("should append null without error", () => {
            sb.append(null);
            expect(sb.toString()).toEqual("");
        });

        it("should append undefined without error", () => {
            sb.append(undefined);
            expect(sb.toString()).toEqual("");
        });
    });

    describe("appendChar", () => {
        it("should append a character to the builder", () => {
            sb.appendChar(65);
            expect(sb.toString()).toEqual("A");
        });
    });

    describe("appendLine", () => {
        it("should append a string with a newline to the builder", () => {
            sb.appendLine("hello");
            expect(sb.toString()).toEqual("hello\r\n");
        });
    });

    describe("appendLineChar", () => {
        it("should append a character with a newline to the builder", () => {
            sb.appendLineChar(65);
            expect(sb.toString()).toEqual("A\r\n");
        });
    });

    describe("clear", () => {
        it("should clear out the builder", () => {
            sb.append("hello");
            sb.clear();
            expect(sb.toString()).toEqual("");
        });
    });

    describe("toString", () => {
        it("should return the string representation of the builder", () => {
            sb.append("hello").append("world");
            const str = sb.toString();
            expect(str).toEqual("helloworld");
        });
    });

    describe("constructor should work", () => {
        it("should return the string representation of the string", () => {
            const sb1 = new StringBuilder("bark");
            const str = sb1.toString();
            expect(str).toEqual("bark");
        });
    });
});
