import TimeSpan from "../TimeSpan";

describe("TimeSpan", () => {
    describe("constructor", () => {
        it("creates a TimeSpan instance with 0 ticks when no argument is passed", () => {
            const ts = new TimeSpan();
            expect(ts.ticks).toBe(0);
        });

        it("creates a TimeSpan instance with the passed ticks", () => {
            const ts = new TimeSpan(123);
            expect(ts.ticks).toBe(123);
        });
    });

    describe("getDefaultValue", () => {
        it("returns a TimeSpan with 0 ticks", () => {
            const ts = TimeSpan.getDefaultValue();
            expect(ts.ticks).toBe(0);
        });
    });

    describe("compareTo", () => {
        it("returns -1 when this.ticks is less than other.ticks", () => {
            const ts1 = new TimeSpan(1);
            const ts2 = new TimeSpan(2);
            expect(ts1.compareTo(ts2)).toBe(-1);
        });

        it("returns 1 when this.ticks is greater than other.ticks", () => {
            const ts1 = new TimeSpan(2);
            const ts2 = new TimeSpan(1);
            expect(ts1.compareTo(ts2)).toBe(1);
        });

        it("returns 0 when this.ticks is equal to other.ticks", () => {
            const ts1 = new TimeSpan(1);
            const ts2 = new TimeSpan(1);
            expect(ts1.compareTo(ts2)).toBe(0);
        });
    });

    describe("equals", () => {
        it("returns true when the ticks of both TimeSpans are equal", () => {
            const ts1 = new TimeSpan(1);
            const ts2 = new TimeSpan(1);
            expect(ts1.equals(ts2)).toBe(true);
        });

        it("returns false when the ticks of both TimeSpans are not equal", () => {
            const ts1 = new TimeSpan(1);
            const ts2 = new TimeSpan(2);
            expect(ts1.equals(ts2)).toBe(false);
        });
    });

    describe("toString", () => {
        it("returns the correct string representation for a TimeSpan with 0 ticks", () => {
            const ts = new TimeSpan();
            expect(ts.toString()).toBe("00:00:00");
        });

        it("returns the correct string representation for positive ticks", () => {
            const ts = new TimeSpan(1234567890123);
            expect(ts.toString()).toBe("01.10:17:36.7890123");
        });

        it("returns the correct string representation for negative ticks", () => {
            const ts = new TimeSpan(-1234567890123);
            expect(ts.toString()).toBe("-1.-10:-17:-36");
        });

        it("returns the correct string representation for large ticks", () => {
            const ts = new TimeSpan(86400000000000);
            expect(ts.toString()).toBe("100.00:00:00");
        });
    });
});
