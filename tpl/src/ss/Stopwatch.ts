import TimeSpan from "./TimeSpan";

export default class Stopwatch {
    private static frequency = 1e3;
    private _stopTime = 0;
    private _startTime = 0;
    private _isRunning = false;

    static startNew(): Stopwatch {
        var s = new Stopwatch();
        s.start();
        return s;
    }

    getTimestamp(): number {
        return new Date().valueOf();
    }

    reset(): void {
        this._stopTime = this._startTime = this.getTimestamp();
        this._isRunning = false;
    }

    ticks(): number {
        return (this._isRunning ? this.getTimestamp() : this._stopTime) - this._startTime;
    }

    milliseconds(): number {
        return Math.round((this.ticks() / Stopwatch.frequency) * 1000);
    }

    timeSpan(): TimeSpan {
        return new TimeSpan(this.milliseconds() * 10000);
    }

    start(): void {
        if (this._isRunning) return;
        this._startTime = this.getTimestamp();
        this._isRunning = true;
    }

    stop(): void {
        if (!this._isRunning) return;
        this._stopTime = this.getTimestamp();
        this._isRunning = false;
    }

    restart(): void {
        this._isRunning = false;
        this.start();
    }
}
