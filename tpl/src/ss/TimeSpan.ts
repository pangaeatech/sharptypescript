import { padLeftString } from "./strings";

export default class TimeSpan {
    ticks: number;

    constructor(t?: number) {
        this.ticks = t || 0;
    }

    static getDefaultValue() {
        return new TimeSpan();
    }

    compareTo(other: TimeSpan): number {
        return this.ticks < other.ticks ? -1 : this.ticks > other.ticks ? 1 : 0;
    }

    equals(other: TimeSpan): boolean {
        return other.ticks === this.ticks;
    }

    toString(): string {
        var d = function (s: string | number, n?: number) {
            return padLeftString(s + "", n || 2, 48);
        };

        var ticks = this.ticks;
        var result = "";
        if (Math.abs(ticks) >= 864000000000) {
            result += d((ticks / 864000000000) | 0) + ".";
            ticks %= 864000000000;
        }

        result += d((ticks / 36000000000) | 0) + ":";
        ticks %= 36000000000;

        result += d((ticks / 600000000) | 0) + ":";
        ticks %= 600000000;

        result += d((ticks / 10000000) | 0);
        ticks %= 10000000;

        if (ticks > 0) result += "." + d(ticks, 7);
        return result;
    }
}
