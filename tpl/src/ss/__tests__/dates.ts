import { utcNow, formatDate, netFormatDate } from "../dates";

beforeAll(() => {
    jest.spyOn(Date.prototype, "toString").mockReturnValue("{{toString}}");
    jest.spyOn(Date.prototype, "toDateString").mockReturnValue("{{toDateString}}");
    jest.spyOn(Date.prototype, "toTimeString").mockReturnValue("{{toTimeString}}");
    jest.spyOn(Date.prototype, "getHours").mockReturnValue(8);
    jest.spyOn(Date.prototype, "getMinutes").mockReturnValue(34);
    jest.spyOn(Date.prototype, "getDate").mockReturnValue(1);
    jest.spyOn(Date.prototype, "getDay").mockReturnValue(2);
    jest.spyOn(Date.prototype, "getMonth").mockReturnValue(0);
    jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(2022);
    jest.spyOn(Date.prototype, "getTimezoneOffset").mockReturnValue(-180);
});

const testDate = new Date("2022-01-01T08:34:56Z");

describe("utcNow", () => {
    test("returns a Date object", () => {
        expect(utcNow()).toBeInstanceOf(Date);
    });
});

describe("formatDate", () => {
    test("returns a string", () => {
        expect(typeof formatDate(testDate, "")).toBe("string");
    });

    test("returns ISO string by default", () => {
        expect(formatDate(testDate, "")).toBe("{{toString}}");
    });

    test("returns date string when format is 'id'", () => {
        expect(formatDate(testDate, "id")).toBe("{{toDateString}}");
    });

    test("returns time string when format is 'it'", () => {
        expect(formatDate(testDate, "it")).toBe("{{toTimeString}}");
    });

    test("returns formatted date string when format is valid", () => {
        expect(formatDate(testDate, "yyyy/MM/dd HH:mm:ss")).toBe("2022/01/01 08:34:56");
    });

    test("returns original date string when format is invalid or null/empty", () => {
        expect(formatDate(testDate)).toBe("{{toString}}");
        expect(formatDate(testDate, "")).toBe("{{toString}}");
        expect(formatDate(testDate, "invalid")).toBe("invali1");
    });
});

describe("netFormatDate", () => {
    test("returns a string", () => {
        expect(typeof netFormatDate(testDate, "")).toBe("string");
    });

    test("returns formatted date string when format is valid", () => {
        expect(netFormatDate(testDate, "yyyy/MM/dd HH:mm:ss")).toBe("2022/01/01 08:34:56");
    });

    test("returns original date string when format is invalid or null/empty", () => {
        expect(netFormatDate(testDate, "")).toBe("{{toString}}");
        expect(netFormatDate(testDate, "invalid")).toBe("invali1");
    });

    test("netFormatDate with date and format", () => {
        const result = netFormatDate(testDate, "yyyy/MM/dd HH:mm:ss");
        expect(result).toBe("2022/01/01 08:34:56");
    });

    test("netFormatDate with date only", () => {
        const result = netFormatDate(testDate);
        expect(result).toBe("{{toString}}");
    });

    test("netFormatDate with d format", () => {
        const result = netFormatDate(testDate, "d");
        expect(result).toBe("1/1/2022");
    });

    test("netFormatDate with ddd format", () => {
        const result = netFormatDate(testDate, "ddd");
        expect(result).toBe("Tue");
    });

    test("netFormatDate with MMM format", () => {
        const result = netFormatDate(testDate, "MMM");
        expect(result).toBe("Jan");
    });

    test("netFormatDate with MMMM format", () => {
        const result = netFormatDate(testDate, "MMMM");
        expect(result).toBe("January");
    });

    test("netFormatDate with yyyy format", () => {
        const result = netFormatDate(testDate, "yyyy");
        expect(result).toBe("2022");
    });

    test("netFormatDate with yy format", () => {
        const result = netFormatDate(testDate, "yy");
        expect(result).toBe("22");
    });

    test("netFormatDate with hh format", () => {
        const result = netFormatDate(testDate, "hh");
        expect(result).toBe("08");
    });

    test("netFormatDate with HH format", () => {
        const result = netFormatDate(testDate, "HH");
        expect(result).toBe("08");
    });

    test("netFormatDate with mm format", () => {
        const result = netFormatDate(testDate, "mm");
        expect(result).toBe("34");
    });

    test("netFormatDate with ss format", () => {
        const result = netFormatDate(testDate, "ss");
        expect(result).toBe("56");
    });

    test("netFormatDate with t format in AM", () => {
        const result = netFormatDate(testDate, "t");
        expect(result).toBe("8:34 AM");
    });

    test("netFormatDate with f format", () => {
        const result = netFormatDate(testDate, "f");
        expect(result).toBe("Tuesday, January 01, 2022 8:34 AM");
    });

    test("netFormatDate with z format", () => {
        const result = netFormatDate(testDate, "z");
        expect(result).toBe("+3");
    });

    test("netFormatDate with zzz format", () => {
        const result = netFormatDate(testDate, "zzz");
        expect(result).toBe("+03:00");
    });
});
