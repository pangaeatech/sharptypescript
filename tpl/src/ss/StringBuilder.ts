import { isValue } from "./index";

export default class StringBuilder {
    private _parts: string[];

    constructor(s?: string) {
        if (s && s.length > 0) {
            this._parts = [s];
        } else {
            this._parts = [];
        }
    }

    append(o?: unknown): StringBuilder {
        if (isValue(o)) {
            this._parts.push(o.toString());
        }

        return this;
    }

    appendChar(c: string): StringBuilder {
        return this.append(String.fromCharCode(c));
    }

    appendLine(s: string): StringBuilder {
        this.append(s);
        this.append("\r\n");
        return this;
    }

    appendLineChar(c: string): StringBuilder {
        return this.appendLine(String.fromCharCode(c));
    }

    clear() {
        this._parts = [];
    }

    toString() {
        return this._parts.join("");
    }
}
