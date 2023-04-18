import Stopwatch from "../Stopwatch";

describe("Stopwatch", () => {
    let stopwatch: Stopwatch;

    beforeEach(() => {
        stopwatch = new Stopwatch();
    });

    test("should start correctly", () => {
        stopwatch.start();
        expect(stopwatch.milliseconds()).toBeGreaterThanOrEqual(0);
    });

    test("should stop correctly", () => {
        stopwatch.start();
        const prevMilliseconds = stopwatch.milliseconds();
        stopwatch.stop();
        expect(stopwatch.milliseconds()).toEqual(prevMilliseconds);
    });

    test("should restart correctly", () => {
        stopwatch.start();
        const prevMilliseconds = stopwatch.milliseconds();
        stopwatch.restart();
        expect(stopwatch.milliseconds()).toBeGreaterThanOrEqual(prevMilliseconds);
    });

    test("should reset correctly", () => {
        stopwatch.start();
        stopwatch.start();
        stopwatch.stop();
        stopwatch.stop();
        stopwatch.reset();
        expect(stopwatch.milliseconds()).toBe(0);
    });

    test("should calculate ticks correctly", () => {
        stopwatch.start();
        stopwatch.stop();
        expect(stopwatch.ticks()).toBeGreaterThanOrEqual(0);
    });

    test("should calculate time span correctly", () => {
        stopwatch.start();
        const timeSpan = stopwatch.timeSpan();
        expect(timeSpan.ticks).toBeGreaterThanOrEqual(stopwatch.milliseconds());
    });

    test("should generate a new stopwatch", () => {
        const newStopwatch = Stopwatch.startNew();
        expect(newStopwatch).toBeInstanceOf(Stopwatch);
    });
});
