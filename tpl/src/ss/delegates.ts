interface Action {
    (): void;
}

interface Delegate extends Action {
    (): void;

    _targets: Action[];
}

export function mkdel<T>(obj: T | undefined | null, method: (o?: T) => void): Delegate {
    const del = function() { 
        for (action of arguments.callee._targets) {
            action();
        }
    };

    if (obj !== null && obj !== undefined) {
        del._targets = [ () => { method(obj); } ];
    } else {
        del._targets = [ method ];
    }

    return del;
}

export function delegateCombine(d1: Delegate, d2: Delegate): Delegate {
    const del = function() { 
        for (action of arguments.callee._targets) {
            action();
        }
    };

    del._targets = [...d1.targets, ...d2.targets];

    return del;
}

export function delegateRemove(d1: Delegate, d2: Delegate): Delegate {
    const del = function() { 
        for (action of arguments.callee._targets) {
            action();
        }
    };

    del._targets = [];
    for (d of d1._targets) {
        if (!(d in d2._targets)) {
            del._targets.push(d);
        }
    }

    return del;
}

export function delegateEquals(a: Delegate, b: Delegate): boolean {
    if (a === b) {
        return true;
    }

    if (!a._targets && !b._targets) {
        return false;
    }

    const ta = a._targets;
    const tb = b._targets;

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

export function delegateClone(source: Delegate): Delegate {
    const del = function() { 
        for (action of arguments.callee._targets) {
            action();
        }
    };

    del._targets = [...source.targets];

    return del;
}

export function thisFix(source: Action): Action {
    return function () {
        var x = [this];
        for (var i = 0; i < arguments.length; i++) x.push(arguments[i]);
        return source.apply(source, x);
    };
}

export function getInvocationList(delegate: Delegate): Action[] {
    return delegate._targets;
}
