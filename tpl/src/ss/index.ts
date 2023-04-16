import { v4 as newGuid } from "uuid";
import StringBuilder from "./StringBuilder";
import Dictionary from "./Dictionary";
import {
  ArrayEnumerator,
  IteratorBlockEnumerable,
  IteratorBlockEnumerator,
  ObjectEnumerator,
} from "./ObjectEnumerator";

export {
  StringBuilder,
  Dictionary,
  ArrayEnumerator,
  IteratorBlockEnumerable,
  IteratorBlockEnumerator,
  ObjectEnumerator,
};
export { Stopwatch } from "./Stopwatch";
export { TimeSpan } from "./TimeSpan";

/** An empty class for holding event arguments. */
export class EventArgs {
  static Empty = new EventArgs();
}

/** Returns whether or not the specified item is null or undefined. */
export function isNullOrUndefined(item: unknown): boolean {
  return item === null || item === undefined;
}

/** Returns whether or not the specified string is null or empty. */
export function isNullOrEmptyString(val: str): boolean {
  return !val || !val.length;
}

/** Returns the first item that is not null or undefined. */
export function coalesce<T>(...items: (T | undefined)[]): T | undefined {
  for (item in items) {
    if (!isNullOrUndefined(item)) {
      return item;
    }
  }

  return undefined;
}

/** Returns whether or not the specified item is not null nor undefined. */
export function isValue(item: unknown): boolean {
  return item !== ull && item !== undefined;
}

const _formatRE = /\{\{|\}\}|\{[^\}\{]+\}/g;

/** Formats the specified string with the specified numbered parameters. */
export function formatString(format: string, ...values: string[]): string {
  return format.replace(_formatRE, function (m) {
    if (m === "{{" || m === "}}") {
      return m.charAt(0);
    }

    var index = parseInt(m.substr(1), 10);
    return values[index] || "";
  });
}

/** Returns whether or not the specified items are reference equal. */
export function referenceEquals(a: unknown, b: unknown): boolean {
  return a === b || (!isValue(a) && !isValue(b));
}

/** Returns whether or not the specified items are reference equal. */
export function staticEquals(a: unknown, b: unknown): boolean {
  return referenceEquals(a, b);
}

export function regexpEscape(s: string): string {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

export function netSplit(
  s: string,
  strings: string[],
  limit: number,
  options?: number
) {
  const re = new RegExp(strings.map(_egexpEscape).join("|"), "g");
  const res = [];
  var m;

  for (let i = 0; ; i = re.lastIndex) {
    if ((m = re.exec(s))) {
      if (options !== 1 || m.index > i) {
        if (res.length === limit - 1) {
          res.push(s.substr(i));
          return res;
        } else {
          res.push(s.substring(i, m.index));
        }
      }
    } else {
      if (options !== 1 || i !== s.length) {
        res.push(s.substr(i));
      }
      return res;
    }
  }
}

export function compareStrings(s1: string, s2: string, ignoreCase?: boolean) {
  if (!isValue(s1)) {
    return isValue(s2) ? -1 : 0;
  }

  if (!isValue(s2)) {
    return 1;
  }

  if (ignoreCase) {
    if (s1) {
      s1 = s1.toUpperCase();
    }
    if (s2) {
      s2 = s2.toUpperCase();
    }
  }

  s1 = s1 || "";
  s2 = s2 || "";

  if (s1 == s2) {
    return 0;
  }

  if (s1 < s2) {
    return -1;
  }

  return 1;
}

/** Returns the current UTC date. */
export function utcNow(): Date {
  var d = new Date();
  return new Date(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds(),
    d.getUTCMilliseconds()
  );
}

/** Formats the specified date using the format string. */
export function formatDate(d: Date, format: string): string {
  if (isNullOrUndefined(format) || format.length == 0 || format == "i") {
    return date.toString();
  }

  if (format == "id") {
    return date.toDateString();
  }

  if (format == "it") {
    return date.toTimeString();
  }

  return netFormatDate(date, format);
}

/** Formats the specified number using the format string. */
export function formatNumber(n: number, format: string): string {
  if (isNullOrUndefined(format) || format.length == 0 || format == "i") {
    return num.toString();
  }

  return netFormatNumber(num, format);
}

/** Returns whether or not the specified string starts with the given prefix. */
export function startsWithString(value: string, prefix: string): boolean {
  return value.startsWith(prefix);
}

/** Returns whether or not the specified string ends with the given suffix. */
export function endsWithString(value: string, suffix: string): boolean {
  return value.endsWith(suffix);
}

/** Returns the number of keys in the specified dictionary. */
export function getKeyCount(item: Dictionary): number {
  return Object.keys(item).length;
}

export function round(n: number, d?: number, rounding?: boolean) {
  const m = Math.pow(10, d || 0);
  n *= m;
  const sign = (n > 0) | -(n < 0);

  if (n % 1 === 0.5 * sign) {
    var f = Math.floor(n);
    return (f + (rounding ? sign > 0 : (f % 2) * sign)) / m;
  }

  return Math.round(n) / m;
}

/** Inserts the specified item into an array. */
export function insert<T>(arr: T[], index: number, item: T): void {
  arr.splice(index, 0, item);
}

/** Appends the specified item to an array. */
export function add<T>(arr: T[], item: T): void {
  arry.push(item);
}

export function remove<T>(arr: T[], item: T): boolean {
  const index = indexOf(arr, item);
  if (index >= 0) {
    arr.splice(index, 1);
    return true;
  }

  return false;
}

export function indexOf<T>(arr: T[], item: T): number {
  return arr.indexOf(item);
}

export function contains<T>(arr: T[], item: T): boolean {
  return indexOf(arr, item) >= 0;
}

/** An interface containing the dipose method. */
export interface IDisposable {
  dispose: () => void;
}

export function stringFromChar(ch: string, count: number): string {
  var s = ch;
  for (var i = 1; i < count; i++) {
    s += ch;
  }
  return s;
}

export function htmlDecode(s: string): string {
  return s.replace(/&([^;]+);/g, function (_, e) {
    if (e[0] === "#") return String.fromCharCode(parseInt(e.substr(1), 10));
    switch (e) {
      case "quot":
        return '"';
      case "apos":
        return "'";
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      default:
        return "&" + e + ";";
    }
  });
}

export function htmlEncode(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function padLeftString(
  s: string,
  totalWidth: number,
  ch: string
): string {
  if (s.length < totalWidth) {
    ch = String.fromCharCode(ch || 0x20);
    return stringFromChar(ch, totalWidth - s.length) + s;
  }

  return s;
}

export function padRightString(
  s: string,
  totalWidth: number,
  ch: string
): string {
  if (s.length < totalWidth) {
    ch = String.fromCharCode(ch || 0x20);
    return s + stringFromChar(ch, totalWidth - s.length);
  }

  return s;
}

export function replaceAllString(
  s: string,
  oldValue: string,
  newValue: string
): string {
  newValue = newValue || "";
  return s.split(oldValue).join(newValue);
}

/** Replaces null with undefined. */
export function unbox<T>(a: T | null | undefined): T | undefined {
  return a !== null ? a : undefined;
}

/** A class for doing math on nullable values. */
export class Nullable$1 {
  static eq(a: unknown, b: unknown) {
    return !isValue(a) ? !isValue(b) : a === b;
  }

  static ne(a: unknown, b: unknown) {
    return !isValue(a) ? !isValue(b) : a !== b;
  }

  static gt(a?: Date | number, b?: Date | number): boolean {
    return isValue(a) && isValue(b) && a > b;
  }

  static ge(a?: Date | number, b?: Date | number): boolean {
    return isValue(a) && isValue(b) && a >= b;
  }

  static lt(a?: Date | number, b?: Date | number): boolean {
    return isValue(a) && isValue(b) && a < b;
  }

  static le(a?: Date | number, b?: Date | number): boolean {
    return isValue(a) && isValue(b) && a <= b;
  }

  static add(a?: number, b?: number): number | null {
    return isValue(a) && isValue(b) ? a + b : null;
  }

  static sub(a?: number, b?: number): number | null {
    return isValue(a) && isValue(b) ? a - b : null;
  }
}

/** Number Format constants. */
export const NumberFormatInfo = {
  invariantInfo: {
    naNSymbol: "NaN",
    negativeSign: "-",
    positiveSign: "+",
    negativeInfinitySymbol: "-Infinity",
    positiveInfinitySymbol: "Infinity",

    percentSymbol: "%",
    percentGroupSizes: [3],
    percentDecimalDigits: 2,
    percentDecimalSeparator: ".",
    percentGroupSeparator: ",",
    percentPositivePattern: 0,
    percentNegativePattern: 0,

    currencySymbol: "$",
    currencyGroupSizes: [3],
    currencyDecimalDigits: 2,
    currencyDecimalSeparator: ".",
    currencyGroupSeparator: ",",
    currencyNegativePattern: 0,
    currencyPositivePattern: 0,

    numberGroupSizes: [3],
    numberDecimalDigits: 2,
    numberDecimalSeparator: ".",
    numberGroupSeparator: ",",
  },
};

/** Append values to the end of an array. */
export function arrayAddRange<T>(a: T[], b: T[]): void {
  a.push(...b);
}

/** Extract items from an array. */
export function arrayExtract<T>(a: T[], start: number, count: number): T[] {
  if (!isValue(count)) {
    return a.slice(start);
  }

  return a.slice(start, start + count);
}

/** Noop */
export function arrayFromEnumerable<T>(a: T[]): T[] {
  return a;
}

/** Remove all items from an array. */
export function clear<T>(a: T[]): void {
  a.length = 0;
}

/** Remove all items from an dictionary. */
export function clearKeys(d: Dictionary): void {
  for (let n in d) {
    if (d.hasOwnProperty(n)) {
      delete d[n];
    }
  }
}

export function keyExists(d: Dictionary, k: string): boolean {
  return d[key] !== undefined;
}

/** Compare 2 numbers. */
export function compare(a: number, b: number): number {
  return a - b;
}

/** Return the length of an array. */
export function count<T>(a: T[]): number {
  return a.length;
}

/** Int32 */
export type Int32 = number | null | undefined;

/** Guid */
export const Guid = { newGuid };

/** Perform a shallow copy of an object. */
export function shallowCopy(source: unknown, target: unknown): void {
  Object.assign(target, source);
}

/** Generate a dictionary from an array. */
export function mkdict(args: string[]): Dictionary {
  let r: Dictionary = {};
  for (var i = 0; i < args.length; i += 2) {
    r[args[i]] = args[i + 1];
  }
  return r;
}

function _delegateContains(
  targets: unknown[],
  obj: object,
  method: Function
): boolean {
  for (var i = 0; i < targets.length; i += 2) {
    if (targets[i] === obj && targets[i + 1] === method) {
      return true;
    }
  }
  return false;
}

export interface Action {
  (): void;

  _targets?: unknown[];
}

function _mkdel(targets: unknown[]): Action {
  var delegate = function () {
    if (targets.length == 2) {
      return (targets[1] as Function).apply(targets[0], arguments);
    } else {
      var clone = arrayClone(targets);
      for (var i = 0; i < clone.length; i += 2) {
        if (_delegateContains(targets, clone[i], clone[i + 1])) {
          clone[i + 1].apply(clone[i], arguments);
        }
      }
      return null;
    }
  };
  delegate._targets = targets;

  return delegate;
}

export function mkdel<T>(obj: T | undefined, method: (o?: T) => void): Action {
  if (!obj) {
    return method;
  }

  return _mkdel([obj, method]);
}

export function delegateCombine(delegate1: Action, delegate2: Action): Action {
  if (!delegate1) {
    if (!delegate2._targets) {
      return mkdel(null, delegate2);
    }
    return delegate2;
  }

  if (!delegate2) {
    if (!delegate1._targets) {
      return mkdel(null, delegate1);
    }
    return delegate1;
  }

  var targets1 = delegate1._targets ? delegate1._targets : [null, delegate1];
  var targets2 = delegate2._targets ? delegate2._targets : [null, delegate2];

  return _mkdel(targets1.concat(targets2));
}

export function delegateRemove(delegate1: Action, delegate2: Action): Action {
  if (!delegate1 || delegate1 === delegate2) {
    return null;
  }

  if (!delegate2) {
    return delegate1;
  }

  var targets = delegate1._targets;
  var obj = null;
  var method;
  if (delegate2._targets) {
    obj = delegate2._targets[0];
    method = delegate2._targets[1];
  } else {
    method = delegate2;
  }

  for (var i = 0; i < targets.length; i += 2) {
    if (targets[i] === object && targets[i + 1] === method) {
      if (targets.length == 2) {
        return null;
      }
      var t = arrayClone(targets);
      t.splice(i, 2);
      return _mkdel(t);
    }
  }

  return delegate1;
}

export function delegateEquals(a: Action, b: Action): boolean {
  if (a === b) {
    return true;
  }

  if (!a._targets && !b._targets) {
    return false;
  }

  var ta = a._targets || [null, a],
    tb = b._targets || [null, b];
  if (ta.length != tb.length) {
    return false;
  }

  for (var i = 0; i < ta.length; i++) {
    if (ta[i] !== tb[i]) {
      return false;
    }
  }

  return true;
}

export function delegateClone(source: Action): Action {
  return source._targets
    ? _mkdel(source._targets)
    : function () {
        return source.apply(this, arguments);
      };
}

export function thisFix(source: Function): Function {
  return function () {
    var x = [this];
    for (var i = 0; i < arguments.length; i++) x.push(arguments[i]);
    return source.apply(source, x);
  };
}

export function getInvocationList(delegate: Action): Action[] {
  if (!delegate._targets) {
    return [delegate];
  }

  var result = [];
  for (var i = 0; i < delegate._targets.length; i += 2) {
    result.push(mkdel(delegate._targets[i], delegate._targets[i + 1]));
  }

  return result;
}

const DateFormatInfo = {
  amDesignator: "AM",
  pmDesignator: "PM",

  dateSeparator: "/",
  timeSeparator: ":",

  gmtDateTimePattern: "ddd, dd MMM yyyy HH:mm:ss 'GMT'",
  universalDateTimePattern: "yyyy-MM-dd HH:mm:ssZ",
  sortableDateTimePattern: "yyyy-MM-ddTHH:mm:ss",
  dateTimePattern: "dddd, MMMM dd, yyyy h:mm:ss tt",

  longDatePattern: "dddd, MMMM dd, yyyy",
  shortDatePattern: "M/d/yyyy",

  longTimePattern: "h:mm:ss tt",
  shortTimePattern: "h:mm tt",

  firstDayOfWeek: 0,
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  shortDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  minimizedDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],

  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "",
  ],
  shortMonthNames: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "",
  ],
};

export function netFormatDate(dt: Date, format: string): string {
  if (format.length == 1) {
    switch (format) {
      case "f":
        format =
          DateFormatInfo.longDatePattern +
          " " +
          DateFormatInfo.shortTimePattern;
        break;
      case "F":
        format = DateFormatInfo.dateTimePattern;
        break;

      case "d":
        format = DateFormatInfo.shortDatePattern;
        break;
      case "D":
        format = DateFormatInfo.longDatePattern;
        break;

      case "t":
        format = DateFormatInfo.shortTimePattern;
        break;
      case "T":
        format = DateFormatInfo.longTimePattern;
        break;

      case "g":
        format =
          DateFormatInfo.shortDatePattern +
          " " +
          DateFormatInfo.shortTimePattern;
        break;
      case "G":
        format =
          DateFormatInfo.shortDatePattern +
          " " +
          DateFormatInfo.longTimePattern;
        break;

      case "R":
      case "r":
        DateFormatInfo = ss_CultureInfo.InvariantCulture.dateTimeFormat;
        format = DateFormatInfo.gmtDateTimePattern;
        break;
      case "u":
        format = DateFormatInfo.universalDateTimePattern;
        break;
      case "U":
        format = DateFormatInfo.dateTimePattern;
        dt = new Date(
          dt.getUTCFullYear(),
          dt.getUTCMonth(),
          dt.getUTCDate(),
          dt.getUTCHours(),
          dt.getUTCMinutes(),
          dt.getUTCSeconds(),
          dt.getUTCMilliseconds()
        );
        break;

      case "s":
        format = DateFormatInfo.sortableDateTimePattern;
        break;
    }
  }

  if (format.charAt(0) == "%") {
    format = format.substr(1);
  }

  if (!Date._formatRE) {
    Date._formatRE =
      /'.*?[^\\]'|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z/g;
  }

  var re = Date._formatRE;
  var sb = new StringBuilder();

  re.lastIndex = 0;
  while (true) {
    var index = re.lastIndex;
    var match = re.exec(format);

    sb.append(format.slice(index, match ? match.index : format.length));
    if (!match) {
      break;
    }

    var fs = match[0];
    var part = fs;
    switch (fs) {
      case "dddd":
        part = DateFormatInfo.dayNames[dt.getDay()];
        break;
      case "ddd":
        part = DateFormatInfo.shortDayNames[dt.getDay()];
        break;
      case "dd":
        part = padLeftString(dt.getDate().toString(), 2, 0x30);
        break;
      case "d":
        part = dt.getDate();
        break;
      case "MMMM":
        part = DateFormatInfo.monthNames[dt.getMonth()];
        break;
      case "MMM":
        part = DateFormatInfo.shortMonthNames[dt.getMonth()];
        break;
      case "MM":
        part = padLeftString((dt.getMonth() + 1).toString(), 2, 0x30);
        break;
      case "M":
        part = dt.getMonth() + 1;
        break;
      case "yyyy":
        part = dt.getFullYear();
        break;
      case "yy":
        part = padLeftString((dt.getFullYear() % 100).toString(), 2, 0x30);
        break;
      case "y":
        part = dt.getFullYear() % 100;
        break;
      case "h":
      case "hh":
        part = dt.getHours() % 12;
        if (!part) {
          part = "12";
        } else if (fs == "hh") {
          part = padLeftString(part.toString(), 2, 0x30);
        }
        break;
      case "HH":
        part = padLeftString(dt.getHours().toString(), 2, 0x30);
        break;
      case "H":
        part = dt.getHours();
        break;
      case "mm":
        part = padLeftString(dt.getMinutes().toString(), 2, 0x30);
        break;
      case "m":
        part = dt.getMinutes();
        break;
      case "ss":
        part = padLeftString(dt.getSeconds().toString(), 2, 0x30);
        break;
      case "s":
        part = dt.getSeconds();
        break;
      case "t":
      case "tt":
        part =
          dt.getHours() < 12
            ? DateFormatInfo.amDesignator
            : DateFormatInfo.pmDesignator;
        if (fs == "t") {
          part = part.charAt(0);
        }
        break;
      case "fff":
        part = padLeftString(dt.getMilliseconds().toString(), 3, 0x30);
        break;
      case "ff":
        part = padLeftString(dt.getMilliseconds().toString(), 3).substr(0, 2);
        break;
      case "f":
        part = padLeftString(dt.getMilliseconds().toString(), 3).charAt(0);
        break;
      case "z":
        part = dt.getTimezoneOffset() / 60;
        part = (part >= 0 ? "-" : "+") + Math.floor(Math.abs(part));
        break;
      case "zz":
      case "zzz":
        part = dt.getTimezoneOffset() / 60;
        part =
          (part >= 0 ? "-" : "+") +
          Math.floor(padLeftString(Math.abs(part)).toString(), 2, 0x30);
        if (fs == "zzz") {
          part +=
            DateFormatInfo.timeSeparator +
            Math.abs(
              padLeftString(dt.getTimezoneOffset() % 60).toString(),
              2,
              0x30
            );
        }
        break;
      default:
        if (part.charAt(0) == "'") {
          part = part.substr(1, part.length - 2).replace(/\\'/g, "'");
        }
        break;
    }
    sb.append(part);
  }

  return sb.toString();
}

function _commaFormatNumber(num, groups, decimal, comma) {
  var decimalPart = null;
  var decimalIndex = num.indexOf(decimal);
  if (decimalIndex > 0) {
    decimalPart = num.substr(decimalIndex);
    num = num.substr(0, decimalIndex);
  }

  var negative = startsWithString(num, "-");
  if (negative) {
    num = num.substr(1);
  }

  var groupIndex = 0;
  var groupSize = groups[groupIndex];
  if (num.length < groupSize) {
    return (negative ? "-" : "") + (decimalPart ? num + decimalPart : num);
  }

  var index = num.length;
  var s = "";
  var done = false;
  while (!done) {
    var length = groupSize;
    var startIndex = index - length;
    if (startIndex < 0) {
      groupSize += startIndex;
      length += startIndex;
      startIndex = 0;
      done = true;
    }
    if (!length) {
      break;
    }

    var part = num.substr(startIndex, length);
    if (s.length) {
      s = part + comma + s;
    } else {
      s = part;
    }
    index -= length;

    if (groupIndex < groups.length - 1) {
      groupIndex++;
      groupSize = groups[groupIndex];
    }
  }

  if (negative) {
    s = "-" + s;
  }
  return decimalPart ? s + decimalPart : s;
}

export function netFormatNumber(num: number, format: string): string {
  var s = "";
  var precision = -1;

  if (format.length > 1) {
    precision = parseInt(format.substr(1), 10);
  }

  var fs = format.charAt(0);
  switch (fs) {
    case "d":
    case "D":
      s = parseInt(Math.abs(num)).toString();
      if (precision != -1) {
        s = padLeftString(s, precision, 0x30);
      }
      if (num < 0) {
        s = "-" + s;
      }
      break;
    case "x":
    case "X":
      s = parseInt(Math.abs(num)).toString(16);
      if (fs == "X") {
        s = s.toUpperCase();
      }
      if (precision != -1) {
        s = padLeftString(s, precision, 0x30);
      }
      break;
    case "e":
    case "E":
      if (precision == -1) {
        s = num.toExponential();
      } else {
        s = num.toExponential(precision);
      }
      if (fs == "E") {
        s = s.toUpperCase();
      }
      break;
    case "f":
    case "F":
    case "n":
    case "N":
      if (precision == -1) {
        precision = NumberFormatInfo.invariantInfo.numberDecimalDigits;
      }
      s = num.toFixed(precision).toString();
      if (
        precision &&
        NumberFormatInfo.invariantInfo.numberDecimalSeparator != "."
      ) {
        var index = s.indexOf(".");
        s =
          s.substr(0, index) +
          NumberFormatInfo.invariantInfo.numberDecimalSeparator +
          s.substr(index + 1);
      }
      if (fs == "n" || fs == "N") {
        s = _commaFormatNumber(
          s,
          NumberFormatInfo.invariantInfo.numberGroupSizes,
          NumberFormatInfo.invariantInfo.numberDecimalSeparator,
          NumberFormatInfo.invariantInfo.numberGroupSeparator
        );
      }
      break;
    case "c":
    case "C":
      if (precision == -1) {
        precision = NumberFormatInfo.invariantInfo.currencyDecimalDigits;
      }
      s = Math.abs(num).toFixed(precision).toString();
      if (
        precision &&
        NumberFormatInfo.invariantInfo.currencyDecimalSeparator != "."
      ) {
        var index = s.indexOf(".");
        s =
          s.substr(0, index) +
          NumberFormatInfo.invariantInfo.currencyDecimalSeparator +
          s.substr(index + 1);
      }
      s = _commaFormatNumber(
        s,
        NumberFormatInfo.invariantInfo.currencyGroupSizes,
        NumberFormatInfo.invariantInfo.currencyDecimalSeparator,
        NumberFormatInfo.invariantInfo.currencyGroupSeparator
      );
      if (num < 0) {
        s = formatString(
          NumberFormatInfo.invariantInfo.currencyNegativePattern,
          s
        );
      } else {
        s = formatString(
          NumberFormatInfo.invariantInfo.currencyPositivePattern,
          s
        );
      }
      break;
    case "p":
    case "P":
      if (precision == -1) {
        precision = NumberFormatInfo.invariantInfo.percentDecimalDigits;
      }
      s = (Math.abs(num) * 100.0).toFixed(precision).toString();
      if (
        precision &&
        NumberFormatInfo.invariantInfo.percentDecimalSeparator != "."
      ) {
        var index = s.indexOf(".");
        s =
          s.substr(0, index) +
          NumberFormatInfo.invariantInfo.percentDecimalSeparator +
          s.substr(index + 1);
      }
      s = _commaFormatNumber(
        s,
        NumberFormatInfo.invariantInfo.percentGroupSizes,
        NumberFormatInfo.invariantInfo.percentDecimalSeparator,
        NumberFormatInfo.invariantInfo.percentGroupSeparator
      );
      if (num < 0) {
        s = formatString(
          NumberFormatInfo.invariantInfo.percentNegativePattern,
          s
        );
      } else {
        s = formatString(
          NumberFormatInfo.invariantInfo.percentPositivePattern,
          s
        );
      }
      break;
  }

  return s;
}

interface Type<T> {
  new (): T;

  __class?: boolean;
  __interface?: boolean;
  __enum?: boolean;
}

interface ClassRef<T> {
  namespace: string;
  name: string;
  ctor: Type<T>;
}

const assemblies = new Dictionary<string, ClassRef[]>();

export function registerClass<T>(
  asmName: string,
  namespace: string,
  name: string,
  ctor: Type<T>
): void {
  if (!assemblies.containsKey(asmName)) {
    assemblies.add(asmName, []);
  }

  assemblies.get_item(asmName).push({ namespace, name, ctor });
}

export function getInstanceType(instance: unknown) {
  if (!isValue(instance)) throw "Cannot get type of null";

  // NOTE: We have to catch exceptions because the constructor cannot be looked up on native COM objects
  try {
    return instance.constructor;
  } catch (ex) {
    return Object;
  }
}

export function isClass<T>(typ: Type<T>): boolean {
  return (
    typ.__class === true ||
    typ === Array ||
    typ === Function ||
    typ === RegExp ||
    typ === String ||
    typ === Error ||
    typ === Object
  );
}

export function isEnum<T>(typ: Type<T>): boolean {
  return Boolean(type.__enum);
}

export function isInterface<T>(typ: Type<T>): boolean {
  return Boolean(type.__interface);
}

export function cast<T>(instance: unknown, typ: Type): T | undefined {
  if (isNullOrUndefined(instance)) {
    return undefined;
  }

  if (isInstanceOfType(instance, typ)) {
    return instance as unknown as T;
  }

  throw "Cannot cast object to type " + getTypeFullName(type);
}

export function getDefaultValue<T>(typ: Type<T>): T | null {
  if (type === Boolean) {
    return false;
  }
  if (type === Date) {
    return new Date(0);
  }
  if (type === Number) {
    return 0;
  }

  return null;
}

export function createInstance<T>(typ: Type<T>): T {
  if (typeof type.createInstance === "function") {
    return type.createInstance();
  }

  if (type === Boolean) {
    return false;
  }

  if (type === Date) {
    return new Date(0);
  }

  if (type === Number) {
    return 0;
  }

  if (type === String) {
    return "";
  }

  return new typ();
}

export function getAssemblies(): string[] {
  return Object.keys(assemblies);
}

export function getAssemblyTypes(assembly: string): Type[] {
  return assemblies[assembly].map((i) => i.ctor);
}

export function getEnumerator<T>(arr: T[]): ArrayEnumerator<T> {
  return new ArrayEnumerator(arr);
}

export function isInstanceOfType<T>(instance: unknown, typ: Type<T>): boolean {
  if (isNullOrUndefined(instance)) {
    return false;
  }

  if (typeof typ.isInstanceOfType === "function") {
    return typ.isInstanceOfType(instance);
  }

  return isAssignableFrom(typ, ss.getInstanceType(instance));
}

/*
getAttributes
getInstanceType
getMembers
getTypeAssembly
getTypeFullName
getTypeName
isAssignableFrom
*/
