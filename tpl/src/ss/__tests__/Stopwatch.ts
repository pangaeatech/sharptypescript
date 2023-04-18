import Stopwatch from "../Stopwatch";

describe("Stopwatch", () => {
    let stopwatch: Stopwatch;

    beforeEach(() => {
        stopwatch = new Stopwatch();
    });

    test("should start correctly", async () => {
        stopwatch.start();
        await new Promise((r) => setTimeout(r, 2));
        expect(stopwatch.milliseconds()).toBeGreaterThanOrEqual(0);
    });

    test("should stop correctly", async () => {
        stopwatch.start();
        await new Promise((r) => setTimeout(r, 2));
        const prevMilliseconds = stopwatch.milliseconds();
        stopwatch.stop();
        await new Promise((r) => setTimeout(r, 2));
        expect(stopwatch.milliseconds()).toEqual(prevMilliseconds);
    });

    test("should restart correctly", async () => {
        stopwatch.start();
        await new Promise((r) => setTimeout(r, 2));
        const prevMilliseconds = stopwatch.milliseconds();
        await new Promise((r) => setTimeout(r, 2));
        stopwatch.restart();
        expect(stopwatch.milliseconds()).toBeLessThanOrEqual(prevMilliseconds);
    });

    test("should reset correctly", async () => {
        stopwatch.start();
        await new Promise((r) => setTimeout(r, 2));
        stopwatch.start();
        await new Promise((r) => setTimeout(r, 2));
        stopwatch.stop();
        stopwatch.stop();
        stopwatch.reset();
        await new Promise((r) => setTimeout(r, 2));
        expect(stopwatch.milliseconds()).toBe(0);
    });

    test("should calculate ticks correctly", async () => {
        stopwatch.start();
        await new Promise((r) => setTimeout(r, 2));
        stopwatch.stop();
        expect(stopwatch.ticks()).toBeGreaterThanOrEqual(0);
    });

    test("should calculate time span correctly", async () => {
        stopwatch.start();
        await new Promise((r) => setTimeout(r, 2));
        const timeSpan = stopwatch.timeSpan();
        expect(timeSpan.ticks).toBeGreaterThanOrEqual(stopwatch.milliseconds());
    });

    test("should generate a new stopwatch", () => {
        const newStopwatch = Stopwatch.startNew();
        expect(newStopwatch).toBeInstanceOf(Stopwatch);
    });
});
