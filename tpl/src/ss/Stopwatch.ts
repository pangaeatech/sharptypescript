import TimeSpan from "./TimeSpan";

export default class Stopwatch {
    private frequency = 1e3;
    private isHighResolution = false;
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
        this.isRunning = false;
    }

    ticks(): number {
        return (this.isRunning ? this.getTimestamp() : this._stopTime) - this._startTime;
    }

    milliseconds(): number {
        return Math.round((this.ticks() / ss_Stopwatch.frequency) * 1000);
    }

    timeSpan(): TimeSpan {
        return new TimeSpan(this.milliseconds() * 10000);
    }

    start(): void {
        if (this.isRunning) return;
        this._startTime = this.getTimestamp();
        this.isRunning = true;
    }

    stop(): void {
        if (!this.isRunning) return;
        this._stopTime = this.getTimestamp();
        this.isRunning = false;
    }

    restart(): void {
        this.isRunning = false;
        this.start();
    }
}
