import Enum from "../Enum";
import { ArgumentException } from "../exceptions";

describe("Enum", () => {
    enum ExampleEnum {
        FOO = "foo",
        BAR = "bar",
        BAZ = "baz"
    }

    it("should parse enum values correctly", () => {
        expect(Enum.parse(ExampleEnum, "foo")).toBe(ExampleEnum.FOO);
        expect(Enum.parse(ExampleEnum, "bar")).toBe(ExampleEnum.BAR);
        expect(Enum.parse(ExampleEnum, "baz")).toBe(ExampleEnum.BAZ);
    });

    it("should throw an exception when parsing an invalid string", () => {
        expect(() => Enum.parse(ExampleEnum, "invalid")).toThrow(ArgumentException);
    });

    it("should convert enum values to strings correctly", () => {
        expect(Enum.toString(ExampleEnum, ExampleEnum.FOO)).toBe("FOO");
        expect(Enum.toString(ExampleEnum, ExampleEnum.BAR)).toBe("BAR");
        expect(Enum.toString(ExampleEnum, ExampleEnum.BAZ)).toBe("BAZ");
    });

    it("should throw an exception when converting an invalid value", () => {
        expect(() => Enum.toString(ExampleEnum, "invalid")).toThrow(ArgumentException);
    });

    it("should return an array of enum values when calling getValues()", () => {
        const values = Enum.getValues(ExampleEnum);
        expect(values.length).toBe(3);
        expect(values).toContain(ExampleEnum.FOO);
        expect(values).toContain(ExampleEnum.BAR);
        expect(values).toContain(ExampleEnum.BAZ);
    });
});
