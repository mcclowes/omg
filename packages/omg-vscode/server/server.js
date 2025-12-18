#!/usr/bin/env node
'use strict';
var A0 = Object.create;
var ji = Object.defineProperty;
var q0 = Object.getOwnPropertyDescriptor;
var P0 = Object.getOwnPropertyNames;
var O0 = Object.getPrototypeOf,
  I0 = Object.prototype.hasOwnProperty;
var H = (e, t) => () => (e && (t = e((e = 0))), t);
var O = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  Bi = (e, t) => {
    for (var n in t) ji(e, n, { get: t[n], enumerable: !0 });
  },
  Rl = (e, t, n, r) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let i of P0(t))
        !I0.call(e, i) &&
          i !== n &&
          ji(e, i, { get: () => t[i], enumerable: !(r = q0(t, i)) || r.enumerable });
    return e;
  };
var Nn = (e, t, n) => (
    (n = e != null ? A0(O0(e)) : {}),
    Rl(t || !e || !e.__esModule ? ji(n, 'default', { value: e, enumerable: !0 }) : n, e)
  ),
  Gs = (e) => Rl(ji({}, '__esModule', { value: !0 }), e);
var Hi = O((Me) => {
  'use strict';
  Object.defineProperty(Me, '__esModule', { value: !0 });
  Me.thenable =
    Me.typedArray =
    Me.stringArray =
    Me.array =
    Me.func =
    Me.error =
    Me.number =
    Me.string =
    Me.boolean =
      void 0;
  function F0(e) {
    return e === !0 || e === !1;
  }
  Me.boolean = F0;
  function Al(e) {
    return typeof e == 'string' || e instanceof String;
  }
  Me.string = Al;
  function N0(e) {
    return typeof e == 'number' || e instanceof Number;
  }
  Me.number = N0;
  function L0(e) {
    return e instanceof Error;
  }
  Me.error = L0;
  function ql(e) {
    return typeof e == 'function';
  }
  Me.func = ql;
  function Pl(e) {
    return Array.isArray(e);
  }
  Me.array = Pl;
  function M0(e) {
    return Pl(e) && e.every((t) => Al(t));
  }
  Me.stringArray = M0;
  function j0(e, t) {
    return Array.isArray(e) && e.every(t);
  }
  Me.typedArray = j0;
  function B0(e) {
    return e && ql(e.then);
  }
  Me.thenable = B0;
});
var cr = O((rt) => {
  'use strict';
  Object.defineProperty(rt, '__esModule', { value: !0 });
  rt.stringArray = rt.array = rt.func = rt.error = rt.number = rt.string = rt.boolean = void 0;
  function H0(e) {
    return e === !0 || e === !1;
  }
  rt.boolean = H0;
  function Ol(e) {
    return typeof e == 'string' || e instanceof String;
  }
  rt.string = Ol;
  function z0(e) {
    return typeof e == 'number' || e instanceof Number;
  }
  rt.number = z0;
  function U0(e) {
    return e instanceof Error;
  }
  rt.error = U0;
  function W0(e) {
    return typeof e == 'function';
  }
  rt.func = W0;
  function Il(e) {
    return Array.isArray(e);
  }
  rt.array = Il;
  function V0(e) {
    return Il(e) && e.every((t) => Ol(t));
  }
  rt.stringArray = V0;
});
var va = O((Y) => {
  'use strict';
  Object.defineProperty(Y, '__esModule', { value: !0 });
  Y.Message =
    Y.NotificationType9 =
    Y.NotificationType8 =
    Y.NotificationType7 =
    Y.NotificationType6 =
    Y.NotificationType5 =
    Y.NotificationType4 =
    Y.NotificationType3 =
    Y.NotificationType2 =
    Y.NotificationType1 =
    Y.NotificationType0 =
    Y.NotificationType =
    Y.RequestType9 =
    Y.RequestType8 =
    Y.RequestType7 =
    Y.RequestType6 =
    Y.RequestType5 =
    Y.RequestType4 =
    Y.RequestType3 =
    Y.RequestType2 =
    Y.RequestType1 =
    Y.RequestType =
    Y.RequestType0 =
    Y.AbstractMessageSignature =
    Y.ParameterStructures =
    Y.ResponseError =
    Y.ErrorCodes =
      void 0;
  var Ln = cr(),
    Ks;
  (function (e) {
    ((e.ParseError = -32700),
      (e.InvalidRequest = -32600),
      (e.MethodNotFound = -32601),
      (e.InvalidParams = -32602),
      (e.InternalError = -32603),
      (e.jsonrpcReservedErrorRangeStart = -32099),
      (e.serverErrorStart = -32099),
      (e.MessageWriteError = -32099),
      (e.MessageReadError = -32098),
      (e.PendingResponseRejected = -32097),
      (e.ConnectionInactive = -32096),
      (e.ServerNotInitialized = -32002),
      (e.UnknownErrorCode = -32001),
      (e.jsonrpcReservedErrorRangeEnd = -32e3),
      (e.serverErrorEnd = -32e3));
  })(Ks || (Y.ErrorCodes = Ks = {}));
  var Qs = class e extends Error {
    constructor(t, n, r) {
      (super(n),
        (this.code = Ln.number(t) ? t : Ks.UnknownErrorCode),
        (this.data = r),
        Object.setPrototypeOf(this, e.prototype));
    }
    toJson() {
      let t = { code: this.code, message: this.message };
      return (this.data !== void 0 && (t.data = this.data), t);
    }
  };
  Y.ResponseError = Qs;
  var gt = class e {
    constructor(t) {
      this.kind = t;
    }
    static is(t) {
      return t === e.auto || t === e.byName || t === e.byPosition;
    }
    toString() {
      return this.kind;
    }
  };
  Y.ParameterStructures = gt;
  gt.auto = new gt('auto');
  gt.byPosition = new gt('byPosition');
  gt.byName = new gt('byName');
  var Te = class {
    constructor(t, n) {
      ((this.method = t), (this.numberOfParams = n));
    }
    get parameterStructures() {
      return gt.auto;
    }
  };
  Y.AbstractMessageSignature = Te;
  var Js = class extends Te {
    constructor(t) {
      super(t, 0);
    }
  };
  Y.RequestType0 = Js;
  var Zs = class extends Te {
    constructor(t, n = gt.auto) {
      (super(t, 1), (this._parameterStructures = n));
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  };
  Y.RequestType = Zs;
  var Xs = class extends Te {
    constructor(t, n = gt.auto) {
      (super(t, 1), (this._parameterStructures = n));
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  };
  Y.RequestType1 = Xs;
  var ea = class extends Te {
    constructor(t) {
      super(t, 2);
    }
  };
  Y.RequestType2 = ea;
  var ta = class extends Te {
    constructor(t) {
      super(t, 3);
    }
  };
  Y.RequestType3 = ta;
  var na = class extends Te {
    constructor(t) {
      super(t, 4);
    }
  };
  Y.RequestType4 = na;
  var ra = class extends Te {
    constructor(t) {
      super(t, 5);
    }
  };
  Y.RequestType5 = ra;
  var ia = class extends Te {
    constructor(t) {
      super(t, 6);
    }
  };
  Y.RequestType6 = ia;
  var oa = class extends Te {
    constructor(t) {
      super(t, 7);
    }
  };
  Y.RequestType7 = oa;
  var sa = class extends Te {
    constructor(t) {
      super(t, 8);
    }
  };
  Y.RequestType8 = sa;
  var aa = class extends Te {
    constructor(t) {
      super(t, 9);
    }
  };
  Y.RequestType9 = aa;
  var ua = class extends Te {
    constructor(t, n = gt.auto) {
      (super(t, 1), (this._parameterStructures = n));
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  };
  Y.NotificationType = ua;
  var ca = class extends Te {
    constructor(t) {
      super(t, 0);
    }
  };
  Y.NotificationType0 = ca;
  var la = class extends Te {
    constructor(t, n = gt.auto) {
      (super(t, 1), (this._parameterStructures = n));
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  };
  Y.NotificationType1 = la;
  var fa = class extends Te {
    constructor(t) {
      super(t, 2);
    }
  };
  Y.NotificationType2 = fa;
  var da = class extends Te {
    constructor(t) {
      super(t, 3);
    }
  };
  Y.NotificationType3 = da;
  var pa = class extends Te {
    constructor(t) {
      super(t, 4);
    }
  };
  Y.NotificationType4 = pa;
  var ha = class extends Te {
    constructor(t) {
      super(t, 5);
    }
  };
  Y.NotificationType5 = ha;
  var ma = class extends Te {
    constructor(t) {
      super(t, 6);
    }
  };
  Y.NotificationType6 = ma;
  var ga = class extends Te {
    constructor(t) {
      super(t, 7);
    }
  };
  Y.NotificationType7 = ga;
  var ya = class extends Te {
    constructor(t) {
      super(t, 8);
    }
  };
  Y.NotificationType8 = ya;
  var ba = class extends Te {
    constructor(t) {
      super(t, 9);
    }
  };
  Y.NotificationType9 = ba;
  var Fl;
  (function (e) {
    function t(i) {
      let o = i;
      return o && Ln.string(o.method) && (Ln.string(o.id) || Ln.number(o.id));
    }
    e.isRequest = t;
    function n(i) {
      let o = i;
      return o && Ln.string(o.method) && i.id === void 0;
    }
    e.isNotification = n;
    function r(i) {
      let o = i;
      return (
        o &&
        (o.result !== void 0 || !!o.error) &&
        (Ln.string(o.id) || Ln.number(o.id) || o.id === null)
      );
    }
    e.isResponse = r;
  })(Fl || (Y.Message = Fl = {}));
});
var wa = O((dn) => {
  'use strict';
  var Nl;
  Object.defineProperty(dn, '__esModule', { value: !0 });
  dn.LRUCache = dn.LinkedMap = dn.Touch = void 0;
  var it;
  (function (e) {
    ((e.None = 0), (e.First = 1), (e.AsOld = e.First), (e.Last = 2), (e.AsNew = e.Last));
  })(it || (dn.Touch = it = {}));
  var zi = class {
    constructor() {
      ((this[Nl] = 'LinkedMap'),
        (this._map = new Map()),
        (this._head = void 0),
        (this._tail = void 0),
        (this._size = 0),
        (this._state = 0));
    }
    clear() {
      (this._map.clear(),
        (this._head = void 0),
        (this._tail = void 0),
        (this._size = 0),
        this._state++);
    }
    isEmpty() {
      return !this._head && !this._tail;
    }
    get size() {
      return this._size;
    }
    get first() {
      return this._head?.value;
    }
    get last() {
      return this._tail?.value;
    }
    has(t) {
      return this._map.has(t);
    }
    get(t, n = it.None) {
      let r = this._map.get(t);
      if (r) return (n !== it.None && this.touch(r, n), r.value);
    }
    set(t, n, r = it.None) {
      let i = this._map.get(t);
      if (i) ((i.value = n), r !== it.None && this.touch(i, r));
      else {
        switch (((i = { key: t, value: n, next: void 0, previous: void 0 }), r)) {
          case it.None:
            this.addItemLast(i);
            break;
          case it.First:
            this.addItemFirst(i);
            break;
          case it.Last:
            this.addItemLast(i);
            break;
          default:
            this.addItemLast(i);
            break;
        }
        (this._map.set(t, i), this._size++);
      }
      return this;
    }
    delete(t) {
      return !!this.remove(t);
    }
    remove(t) {
      let n = this._map.get(t);
      if (n) return (this._map.delete(t), this.removeItem(n), this._size--, n.value);
    }
    shift() {
      if (!this._head && !this._tail) return;
      if (!this._head || !this._tail) throw new Error('Invalid list');
      let t = this._head;
      return (this._map.delete(t.key), this.removeItem(t), this._size--, t.value);
    }
    forEach(t, n) {
      let r = this._state,
        i = this._head;
      for (; i; ) {
        if ((n ? t.bind(n)(i.value, i.key, this) : t(i.value, i.key, this), this._state !== r))
          throw new Error('LinkedMap got modified during iteration.');
        i = i.next;
      }
    }
    keys() {
      let t = this._state,
        n = this._head,
        r = {
          [Symbol.iterator]: () => r,
          next: () => {
            if (this._state !== t) throw new Error('LinkedMap got modified during iteration.');
            if (n) {
              let i = { value: n.key, done: !1 };
              return ((n = n.next), i);
            } else return { value: void 0, done: !0 };
          },
        };
      return r;
    }
    values() {
      let t = this._state,
        n = this._head,
        r = {
          [Symbol.iterator]: () => r,
          next: () => {
            if (this._state !== t) throw new Error('LinkedMap got modified during iteration.');
            if (n) {
              let i = { value: n.value, done: !1 };
              return ((n = n.next), i);
            } else return { value: void 0, done: !0 };
          },
        };
      return r;
    }
    entries() {
      let t = this._state,
        n = this._head,
        r = {
          [Symbol.iterator]: () => r,
          next: () => {
            if (this._state !== t) throw new Error('LinkedMap got modified during iteration.');
            if (n) {
              let i = { value: [n.key, n.value], done: !1 };
              return ((n = n.next), i);
            } else return { value: void 0, done: !0 };
          },
        };
      return r;
    }
    [((Nl = Symbol.toStringTag), Symbol.iterator)]() {
      return this.entries();
    }
    trimOld(t) {
      if (t >= this.size) return;
      if (t === 0) {
        this.clear();
        return;
      }
      let n = this._head,
        r = this.size;
      for (; n && r > t; ) (this._map.delete(n.key), (n = n.next), r--);
      ((this._head = n), (this._size = r), n && (n.previous = void 0), this._state++);
    }
    addItemFirst(t) {
      if (!this._head && !this._tail) this._tail = t;
      else if (this._head) ((t.next = this._head), (this._head.previous = t));
      else throw new Error('Invalid list');
      ((this._head = t), this._state++);
    }
    addItemLast(t) {
      if (!this._head && !this._tail) this._head = t;
      else if (this._tail) ((t.previous = this._tail), (this._tail.next = t));
      else throw new Error('Invalid list');
      ((this._tail = t), this._state++);
    }
    removeItem(t) {
      if (t === this._head && t === this._tail) ((this._head = void 0), (this._tail = void 0));
      else if (t === this._head) {
        if (!t.next) throw new Error('Invalid list');
        ((t.next.previous = void 0), (this._head = t.next));
      } else if (t === this._tail) {
        if (!t.previous) throw new Error('Invalid list');
        ((t.previous.next = void 0), (this._tail = t.previous));
      } else {
        let n = t.next,
          r = t.previous;
        if (!n || !r) throw new Error('Invalid list');
        ((n.previous = r), (r.next = n));
      }
      ((t.next = void 0), (t.previous = void 0), this._state++);
    }
    touch(t, n) {
      if (!this._head || !this._tail) throw new Error('Invalid list');
      if (!(n !== it.First && n !== it.Last)) {
        if (n === it.First) {
          if (t === this._head) return;
          let r = t.next,
            i = t.previous;
          (t === this._tail
            ? ((i.next = void 0), (this._tail = i))
            : ((r.previous = i), (i.next = r)),
            (t.previous = void 0),
            (t.next = this._head),
            (this._head.previous = t),
            (this._head = t),
            this._state++);
        } else if (n === it.Last) {
          if (t === this._tail) return;
          let r = t.next,
            i = t.previous;
          (t === this._head
            ? ((r.previous = void 0), (this._head = r))
            : ((r.previous = i), (i.next = r)),
            (t.next = void 0),
            (t.previous = this._tail),
            (this._tail.next = t),
            (this._tail = t),
            this._state++);
        }
      }
    }
    toJSON() {
      let t = [];
      return (
        this.forEach((n, r) => {
          t.push([r, n]);
        }),
        t
      );
    }
    fromJSON(t) {
      this.clear();
      for (let [n, r] of t) this.set(n, r);
    }
  };
  dn.LinkedMap = zi;
  var xa = class extends zi {
    constructor(t, n = 1) {
      (super(), (this._limit = t), (this._ratio = Math.min(Math.max(0, n), 1)));
    }
    get limit() {
      return this._limit;
    }
    set limit(t) {
      ((this._limit = t), this.checkTrim());
    }
    get ratio() {
      return this._ratio;
    }
    set ratio(t) {
      ((this._ratio = Math.min(Math.max(0, t), 1)), this.checkTrim());
    }
    get(t, n = it.AsNew) {
      return super.get(t, n);
    }
    peek(t) {
      return super.get(t, it.None);
    }
    set(t, n) {
      return (super.set(t, n, it.Last), this.checkTrim(), this);
    }
    checkTrim() {
      this.size > this._limit && this.trimOld(Math.round(this._limit * this._ratio));
    }
  };
  dn.LRUCache = xa;
});
var Ml = O((Ui) => {
  'use strict';
  Object.defineProperty(Ui, '__esModule', { value: !0 });
  Ui.Disposable = void 0;
  var Ll;
  (function (e) {
    function t(n) {
      return { dispose: n };
    }
    e.create = t;
  })(Ll || (Ui.Disposable = Ll = {}));
});
var pn = O((Sa) => {
  'use strict';
  Object.defineProperty(Sa, '__esModule', { value: !0 });
  var ka;
  function _a() {
    if (ka === void 0) throw new Error('No runtime abstraction layer installed');
    return ka;
  }
  (function (e) {
    function t(n) {
      if (n === void 0) throw new Error('No runtime abstraction layer provided');
      ka = n;
    }
    e.install = t;
  })(_a || (_a = {}));
  Sa.default = _a;
});
var fr = O((lr) => {
  'use strict';
  Object.defineProperty(lr, '__esModule', { value: !0 });
  lr.Emitter = lr.Event = void 0;
  var $0 = pn(),
    jl;
  (function (e) {
    let t = { dispose() {} };
    e.None = function () {
      return t;
    };
  })(jl || (lr.Event = jl = {}));
  var Ca = class {
      add(t, n = null, r) {
        (this._callbacks || ((this._callbacks = []), (this._contexts = [])),
          this._callbacks.push(t),
          this._contexts.push(n),
          Array.isArray(r) && r.push({ dispose: () => this.remove(t, n) }));
      }
      remove(t, n = null) {
        if (!this._callbacks) return;
        let r = !1;
        for (let i = 0, o = this._callbacks.length; i < o; i++)
          if (this._callbacks[i] === t)
            if (this._contexts[i] === n) {
              (this._callbacks.splice(i, 1), this._contexts.splice(i, 1));
              return;
            } else r = !0;
        if (r)
          throw new Error(
            'When adding a listener with a context, you should remove it with the same context'
          );
      }
      invoke(...t) {
        if (!this._callbacks) return [];
        let n = [],
          r = this._callbacks.slice(0),
          i = this._contexts.slice(0);
        for (let o = 0, s = r.length; o < s; o++)
          try {
            n.push(r[o].apply(i[o], t));
          } catch (a) {
            (0, $0.default)().console.error(a);
          }
        return n;
      }
      isEmpty() {
        return !this._callbacks || this._callbacks.length === 0;
      }
      dispose() {
        ((this._callbacks = void 0), (this._contexts = void 0));
      }
    },
    Wi = class e {
      constructor(t) {
        this._options = t;
      }
      get event() {
        return (
          this._event ||
            (this._event = (t, n, r) => {
              (this._callbacks || (this._callbacks = new Ca()),
                this._options &&
                  this._options.onFirstListenerAdd &&
                  this._callbacks.isEmpty() &&
                  this._options.onFirstListenerAdd(this),
                this._callbacks.add(t, n));
              let i = {
                dispose: () => {
                  this._callbacks &&
                    (this._callbacks.remove(t, n),
                    (i.dispose = e._noop),
                    this._options &&
                      this._options.onLastListenerRemove &&
                      this._callbacks.isEmpty() &&
                      this._options.onLastListenerRemove(this));
                },
              };
              return (Array.isArray(r) && r.push(i), i);
            }),
          this._event
        );
      }
      fire(t) {
        this._callbacks && this._callbacks.invoke.call(this._callbacks, t);
      }
      dispose() {
        this._callbacks && (this._callbacks.dispose(), (this._callbacks = void 0));
      }
    };
  lr.Emitter = Wi;
  Wi._noop = function () {};
});
var Yi = O((dr) => {
  'use strict';
  Object.defineProperty(dr, '__esModule', { value: !0 });
  dr.CancellationTokenSource = dr.CancellationToken = void 0;
  var Y0 = pn(),
    G0 = cr(),
    Ta = fr(),
    Vi;
  (function (e) {
    ((e.None = Object.freeze({
      isCancellationRequested: !1,
      onCancellationRequested: Ta.Event.None,
    })),
      (e.Cancelled = Object.freeze({
        isCancellationRequested: !0,
        onCancellationRequested: Ta.Event.None,
      })));
    function t(n) {
      let r = n;
      return (
        r &&
        (r === e.None ||
          r === e.Cancelled ||
          (G0.boolean(r.isCancellationRequested) && !!r.onCancellationRequested))
      );
    }
    e.is = t;
  })(Vi || (dr.CancellationToken = Vi = {}));
  var K0 = Object.freeze(function (e, t) {
      let n = (0, Y0.default)().timer.setTimeout(e.bind(t), 0);
      return {
        dispose() {
          n.dispose();
        },
      };
    }),
    $i = class {
      constructor() {
        this._isCancelled = !1;
      }
      cancel() {
        this._isCancelled ||
          ((this._isCancelled = !0), this._emitter && (this._emitter.fire(void 0), this.dispose()));
      }
      get isCancellationRequested() {
        return this._isCancelled;
      }
      get onCancellationRequested() {
        return this._isCancelled
          ? K0
          : (this._emitter || (this._emitter = new Ta.Emitter()), this._emitter.event);
      }
      dispose() {
        this._emitter && (this._emitter.dispose(), (this._emitter = void 0));
      }
    },
    Da = class {
      get token() {
        return (this._token || (this._token = new $i()), this._token);
      }
      cancel() {
        this._token ? this._token.cancel() : (this._token = Vi.Cancelled);
      }
      dispose() {
        this._token ? this._token instanceof $i && this._token.dispose() : (this._token = Vi.None);
      }
    };
  dr.CancellationTokenSource = Da;
});
var Bl = O((pr) => {
  'use strict';
  Object.defineProperty(pr, '__esModule', { value: !0 });
  pr.SharedArrayReceiverStrategy = pr.SharedArraySenderStrategy = void 0;
  var Q0 = Yi(),
    Kr;
  (function (e) {
    ((e.Continue = 0), (e.Cancelled = 1));
  })(Kr || (Kr = {}));
  var Ea = class {
    constructor() {
      this.buffers = new Map();
    }
    enableCancellation(t) {
      if (t.id === null) return;
      let n = new SharedArrayBuffer(4),
        r = new Int32Array(n, 0, 1);
      ((r[0] = Kr.Continue), this.buffers.set(t.id, n), (t.$cancellationData = n));
    }
    async sendCancellation(t, n) {
      let r = this.buffers.get(n);
      if (r === void 0) return;
      let i = new Int32Array(r, 0, 1);
      Atomics.store(i, 0, Kr.Cancelled);
    }
    cleanup(t) {
      this.buffers.delete(t);
    }
    dispose() {
      this.buffers.clear();
    }
  };
  pr.SharedArraySenderStrategy = Ea;
  var Ra = class {
      constructor(t) {
        this.data = new Int32Array(t, 0, 1);
      }
      get isCancellationRequested() {
        return Atomics.load(this.data, 0) === Kr.Cancelled;
      }
      get onCancellationRequested() {
        throw new Error("Cancellation over SharedArrayBuffer doesn't support cancellation events");
      }
    },
    Aa = class {
      constructor(t) {
        this.token = new Ra(t);
      }
      cancel() {}
      dispose() {}
    },
    qa = class {
      constructor() {
        this.kind = 'request';
      }
      createCancellationTokenSource(t) {
        let n = t.$cancellationData;
        return n === void 0 ? new Q0.CancellationTokenSource() : new Aa(n);
      }
    };
  pr.SharedArrayReceiverStrategy = qa;
});
var Oa = O((Gi) => {
  'use strict';
  Object.defineProperty(Gi, '__esModule', { value: !0 });
  Gi.Semaphore = void 0;
  var J0 = pn(),
    Pa = class {
      constructor(t = 1) {
        if (t <= 0) throw new Error('Capacity must be greater than 0');
        ((this._capacity = t), (this._active = 0), (this._waiting = []));
      }
      lock(t) {
        return new Promise((n, r) => {
          (this._waiting.push({ thunk: t, resolve: n, reject: r }), this.runNext());
        });
      }
      get active() {
        return this._active;
      }
      runNext() {
        this._waiting.length === 0 ||
          this._active === this._capacity ||
          (0, J0.default)().timer.setImmediate(() => this.doRunNext());
      }
      doRunNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) return;
        let t = this._waiting.shift();
        if ((this._active++, this._active > this._capacity))
          throw new Error('To many thunks active');
        try {
          let n = t.thunk();
          n instanceof Promise
            ? n.then(
                (r) => {
                  (this._active--, t.resolve(r), this.runNext());
                },
                (r) => {
                  (this._active--, t.reject(r), this.runNext());
                }
              )
            : (this._active--, t.resolve(n), this.runNext());
        } catch (n) {
          (this._active--, t.reject(n), this.runNext());
        }
      }
    };
  Gi.Semaphore = Pa;
});
var zl = O((hn) => {
  'use strict';
  Object.defineProperty(hn, '__esModule', { value: !0 });
  hn.ReadableStreamMessageReader = hn.AbstractMessageReader = hn.MessageReader = void 0;
  var Fa = pn(),
    hr = cr(),
    Ia = fr(),
    Z0 = Oa(),
    Hl;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        r &&
        hr.func(r.listen) &&
        hr.func(r.dispose) &&
        hr.func(r.onError) &&
        hr.func(r.onClose) &&
        hr.func(r.onPartialMessage)
      );
    }
    e.is = t;
  })(Hl || (hn.MessageReader = Hl = {}));
  var Ki = class {
    constructor() {
      ((this.errorEmitter = new Ia.Emitter()),
        (this.closeEmitter = new Ia.Emitter()),
        (this.partialMessageEmitter = new Ia.Emitter()));
    }
    dispose() {
      (this.errorEmitter.dispose(), this.closeEmitter.dispose());
    }
    get onError() {
      return this.errorEmitter.event;
    }
    fireError(t) {
      this.errorEmitter.fire(this.asError(t));
    }
    get onClose() {
      return this.closeEmitter.event;
    }
    fireClose() {
      this.closeEmitter.fire(void 0);
    }
    get onPartialMessage() {
      return this.partialMessageEmitter.event;
    }
    firePartialMessage(t) {
      this.partialMessageEmitter.fire(t);
    }
    asError(t) {
      return t instanceof Error
        ? t
        : new Error(
            `Reader received error. Reason: ${hr.string(t.message) ? t.message : 'unknown'}`
          );
    }
  };
  hn.AbstractMessageReader = Ki;
  var Na;
  (function (e) {
    function t(n) {
      let r,
        i,
        o,
        s = new Map(),
        a,
        u = new Map();
      if (n === void 0 || typeof n == 'string') r = n ?? 'utf-8';
      else {
        if (
          ((r = n.charset ?? 'utf-8'),
          n.contentDecoder !== void 0 && ((o = n.contentDecoder), s.set(o.name, o)),
          n.contentDecoders !== void 0)
        )
          for (let c of n.contentDecoders) s.set(c.name, c);
        if (
          (n.contentTypeDecoder !== void 0 && ((a = n.contentTypeDecoder), u.set(a.name, a)),
          n.contentTypeDecoders !== void 0)
        )
          for (let c of n.contentTypeDecoders) u.set(c.name, c);
      }
      return (
        a === void 0 && ((a = (0, Fa.default)().applicationJson.decoder), u.set(a.name, a)),
        {
          charset: r,
          contentDecoder: o,
          contentDecoders: s,
          contentTypeDecoder: a,
          contentTypeDecoders: u,
        }
      );
    }
    e.fromOptions = t;
  })(Na || (Na = {}));
  var La = class extends Ki {
    constructor(t, n) {
      (super(),
        (this.readable = t),
        (this.options = Na.fromOptions(n)),
        (this.buffer = (0, Fa.default)().messageBuffer.create(this.options.charset)),
        (this._partialMessageTimeout = 1e4),
        (this.nextMessageLength = -1),
        (this.messageToken = 0),
        (this.readSemaphore = new Z0.Semaphore(1)));
    }
    set partialMessageTimeout(t) {
      this._partialMessageTimeout = t;
    }
    get partialMessageTimeout() {
      return this._partialMessageTimeout;
    }
    listen(t) {
      ((this.nextMessageLength = -1),
        (this.messageToken = 0),
        (this.partialMessageTimer = void 0),
        (this.callback = t));
      let n = this.readable.onData((r) => {
        this.onData(r);
      });
      return (
        this.readable.onError((r) => this.fireError(r)),
        this.readable.onClose(() => this.fireClose()),
        n
      );
    }
    onData(t) {
      try {
        for (this.buffer.append(t); ; ) {
          if (this.nextMessageLength === -1) {
            let r = this.buffer.tryReadHeaders(!0);
            if (!r) return;
            let i = r.get('content-length');
            if (!i) {
              this.fireError(
                new Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(r))}`)
              );
              return;
            }
            let o = parseInt(i);
            if (isNaN(o)) {
              this.fireError(new Error(`Content-Length value must be a number. Got ${i}`));
              return;
            }
            this.nextMessageLength = o;
          }
          let n = this.buffer.tryReadBody(this.nextMessageLength);
          if (n === void 0) {
            this.setPartialMessageTimer();
            return;
          }
          (this.clearPartialMessageTimer(),
            (this.nextMessageLength = -1),
            this.readSemaphore
              .lock(async () => {
                let r =
                    this.options.contentDecoder !== void 0
                      ? await this.options.contentDecoder.decode(n)
                      : n,
                  i = await this.options.contentTypeDecoder.decode(r, this.options);
                this.callback(i);
              })
              .catch((r) => {
                this.fireError(r);
              }));
        }
      } catch (n) {
        this.fireError(n);
      }
    }
    clearPartialMessageTimer() {
      this.partialMessageTimer &&
        (this.partialMessageTimer.dispose(), (this.partialMessageTimer = void 0));
    }
    setPartialMessageTimer() {
      (this.clearPartialMessageTimer(),
        !(this._partialMessageTimeout <= 0) &&
          (this.partialMessageTimer = (0, Fa.default)().timer.setTimeout(
            (t, n) => {
              ((this.partialMessageTimer = void 0),
                t === this.messageToken &&
                  (this.firePartialMessage({ messageToken: t, waitingTime: n }),
                  this.setPartialMessageTimer()));
            },
            this._partialMessageTimeout,
            this.messageToken,
            this._partialMessageTimeout
          )));
    }
  };
  hn.ReadableStreamMessageReader = La;
});
var Yl = O((mn) => {
  'use strict';
  Object.defineProperty(mn, '__esModule', { value: !0 });
  mn.WriteableStreamMessageWriter = mn.AbstractMessageWriter = mn.MessageWriter = void 0;
  var Ul = pn(),
    Qr = cr(),
    X0 = Oa(),
    Wl = fr(),
    ex = 'Content-Length: ',
    Vl = `\r
`,
    $l;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        r && Qr.func(r.dispose) && Qr.func(r.onClose) && Qr.func(r.onError) && Qr.func(r.write)
      );
    }
    e.is = t;
  })($l || (mn.MessageWriter = $l = {}));
  var Qi = class {
    constructor() {
      ((this.errorEmitter = new Wl.Emitter()), (this.closeEmitter = new Wl.Emitter()));
    }
    dispose() {
      (this.errorEmitter.dispose(), this.closeEmitter.dispose());
    }
    get onError() {
      return this.errorEmitter.event;
    }
    fireError(t, n, r) {
      this.errorEmitter.fire([this.asError(t), n, r]);
    }
    get onClose() {
      return this.closeEmitter.event;
    }
    fireClose() {
      this.closeEmitter.fire(void 0);
    }
    asError(t) {
      return t instanceof Error
        ? t
        : new Error(
            `Writer received error. Reason: ${Qr.string(t.message) ? t.message : 'unknown'}`
          );
    }
  };
  mn.AbstractMessageWriter = Qi;
  var Ma;
  (function (e) {
    function t(n) {
      return n === void 0 || typeof n == 'string'
        ? { charset: n ?? 'utf-8', contentTypeEncoder: (0, Ul.default)().applicationJson.encoder }
        : {
            charset: n.charset ?? 'utf-8',
            contentEncoder: n.contentEncoder,
            contentTypeEncoder: n.contentTypeEncoder ?? (0, Ul.default)().applicationJson.encoder,
          };
    }
    e.fromOptions = t;
  })(Ma || (Ma = {}));
  var ja = class extends Qi {
    constructor(t, n) {
      (super(),
        (this.writable = t),
        (this.options = Ma.fromOptions(n)),
        (this.errorCount = 0),
        (this.writeSemaphore = new X0.Semaphore(1)),
        this.writable.onError((r) => this.fireError(r)),
        this.writable.onClose(() => this.fireClose()));
    }
    async write(t) {
      return this.writeSemaphore.lock(async () =>
        this.options.contentTypeEncoder
          .encode(t, this.options)
          .then((r) =>
            this.options.contentEncoder !== void 0 ? this.options.contentEncoder.encode(r) : r
          )
          .then(
            (r) => {
              let i = [];
              return (i.push(ex, r.byteLength.toString(), Vl), i.push(Vl), this.doWrite(t, i, r));
            },
            (r) => {
              throw (this.fireError(r), r);
            }
          )
      );
    }
    async doWrite(t, n, r) {
      try {
        return (await this.writable.write(n.join(''), 'ascii'), this.writable.write(r));
      } catch (i) {
        return (this.handleError(i, t), Promise.reject(i));
      }
    }
    handleError(t, n) {
      (this.errorCount++, this.fireError(t, n, this.errorCount));
    }
    end() {
      this.writable.end();
    }
  };
  mn.WriteableStreamMessageWriter = ja;
});
var Gl = O((Ji) => {
  'use strict';
  Object.defineProperty(Ji, '__esModule', { value: !0 });
  Ji.AbstractMessageBuffer = void 0;
  var tx = 13,
    nx = 10,
    rx = `\r
`,
    Ba = class {
      constructor(t = 'utf-8') {
        ((this._encoding = t), (this._chunks = []), (this._totalLength = 0));
      }
      get encoding() {
        return this._encoding;
      }
      append(t) {
        let n = typeof t == 'string' ? this.fromString(t, this._encoding) : t;
        (this._chunks.push(n), (this._totalLength += n.byteLength));
      }
      tryReadHeaders(t = !1) {
        if (this._chunks.length === 0) return;
        let n = 0,
          r = 0,
          i = 0,
          o = 0;
        e: for (; r < this._chunks.length; ) {
          let c = this._chunks[r];
          for (i = 0; i < c.length; ) {
            switch (c[i]) {
              case tx:
                switch (n) {
                  case 0:
                    n = 1;
                    break;
                  case 2:
                    n = 3;
                    break;
                  default:
                    n = 0;
                }
                break;
              case nx:
                switch (n) {
                  case 1:
                    n = 2;
                    break;
                  case 3:
                    ((n = 4), i++);
                    break e;
                  default:
                    n = 0;
                }
                break;
              default:
                n = 0;
            }
            i++;
          }
          ((o += c.byteLength), r++);
        }
        if (n !== 4) return;
        let s = this._read(o + i),
          a = new Map(),
          u = this.toString(s, 'ascii').split(rx);
        if (u.length < 2) return a;
        for (let c = 0; c < u.length - 2; c++) {
          let f = u[c],
            p = f.indexOf(':');
          if (p === -1)
            throw new Error(`Message header must separate key and value using ':'
${f}`);
          let m = f.substr(0, p),
            h = f.substr(p + 1).trim();
          a.set(t ? m.toLowerCase() : m, h);
        }
        return a;
      }
      tryReadBody(t) {
        if (!(this._totalLength < t)) return this._read(t);
      }
      get numberOfBytes() {
        return this._totalLength;
      }
      _read(t) {
        if (t === 0) return this.emptyBuffer();
        if (t > this._totalLength) throw new Error('Cannot read so many bytes!');
        if (this._chunks[0].byteLength === t) {
          let o = this._chunks[0];
          return (this._chunks.shift(), (this._totalLength -= t), this.asNative(o));
        }
        if (this._chunks[0].byteLength > t) {
          let o = this._chunks[0],
            s = this.asNative(o, t);
          return ((this._chunks[0] = o.slice(t)), (this._totalLength -= t), s);
        }
        let n = this.allocNative(t),
          r = 0,
          i = 0;
        for (; t > 0; ) {
          let o = this._chunks[i];
          if (o.byteLength > t) {
            let s = o.slice(0, t);
            (n.set(s, r),
              (r += t),
              (this._chunks[i] = o.slice(t)),
              (this._totalLength -= t),
              (t -= t));
          } else
            (n.set(o, r),
              (r += o.byteLength),
              this._chunks.shift(),
              (this._totalLength -= o.byteLength),
              (t -= o.byteLength));
        }
        return n;
      }
    };
  Ji.AbstractMessageBuffer = Ba;
});
var Xl = O((se) => {
  'use strict';
  Object.defineProperty(se, '__esModule', { value: !0 });
  se.createMessageConnection =
    se.ConnectionOptions =
    se.MessageStrategy =
    se.CancellationStrategy =
    se.CancellationSenderStrategy =
    se.CancellationReceiverStrategy =
    se.RequestCancellationReceiverStrategy =
    se.IdCancellationReceiverStrategy =
    se.ConnectionStrategy =
    se.ConnectionError =
    se.ConnectionErrors =
    se.LogTraceNotification =
    se.SetTraceNotification =
    se.TraceFormat =
    se.TraceValues =
    se.Trace =
    se.NullLogger =
    se.ProgressType =
    se.ProgressToken =
      void 0;
  var Kl = pn(),
    Re = cr(),
    X = va(),
    Ql = wa(),
    Jr = fr(),
    Ha = Yi(),
    ei;
  (function (e) {
    e.type = new X.NotificationType('$/cancelRequest');
  })(ei || (ei = {}));
  var za;
  (function (e) {
    function t(n) {
      return typeof n == 'string' || typeof n == 'number';
    }
    e.is = t;
  })(za || (se.ProgressToken = za = {}));
  var Zr;
  (function (e) {
    e.type = new X.NotificationType('$/progress');
  })(Zr || (Zr = {}));
  var Ua = class {
    constructor() {}
  };
  se.ProgressType = Ua;
  var Wa;
  (function (e) {
    function t(n) {
      return Re.func(n);
    }
    e.is = t;
  })(Wa || (Wa = {}));
  se.NullLogger = Object.freeze({ error: () => {}, warn: () => {}, info: () => {}, log: () => {} });
  var we;
  (function (e) {
    ((e[(e.Off = 0)] = 'Off'),
      (e[(e.Messages = 1)] = 'Messages'),
      (e[(e.Compact = 2)] = 'Compact'),
      (e[(e.Verbose = 3)] = 'Verbose'));
  })(we || (se.Trace = we = {}));
  var Jl;
  (function (e) {
    ((e.Off = 'off'), (e.Messages = 'messages'), (e.Compact = 'compact'), (e.Verbose = 'verbose'));
  })(Jl || (se.TraceValues = Jl = {}));
  (function (e) {
    function t(r) {
      if (!Re.string(r)) return e.Off;
      switch (((r = r.toLowerCase()), r)) {
        case 'off':
          return e.Off;
        case 'messages':
          return e.Messages;
        case 'compact':
          return e.Compact;
        case 'verbose':
          return e.Verbose;
        default:
          return e.Off;
      }
    }
    e.fromString = t;
    function n(r) {
      switch (r) {
        case e.Off:
          return 'off';
        case e.Messages:
          return 'messages';
        case e.Compact:
          return 'compact';
        case e.Verbose:
          return 'verbose';
        default:
          return 'off';
      }
    }
    e.toString = n;
  })(we || (se.Trace = we = {}));
  var Tt;
  (function (e) {
    ((e.Text = 'text'), (e.JSON = 'json'));
  })(Tt || (se.TraceFormat = Tt = {}));
  (function (e) {
    function t(n) {
      return Re.string(n) ? ((n = n.toLowerCase()), n === 'json' ? e.JSON : e.Text) : e.Text;
    }
    e.fromString = t;
  })(Tt || (se.TraceFormat = Tt = {}));
  var Va;
  (function (e) {
    e.type = new X.NotificationType('$/setTrace');
  })(Va || (se.SetTraceNotification = Va = {}));
  var Zi;
  (function (e) {
    e.type = new X.NotificationType('$/logTrace');
  })(Zi || (se.LogTraceNotification = Zi = {}));
  var Xr;
  (function (e) {
    ((e[(e.Closed = 1)] = 'Closed'),
      (e[(e.Disposed = 2)] = 'Disposed'),
      (e[(e.AlreadyListening = 3)] = 'AlreadyListening'));
  })(Xr || (se.ConnectionErrors = Xr = {}));
  var mr = class e extends Error {
    constructor(t, n) {
      (super(n), (this.code = t), Object.setPrototypeOf(this, e.prototype));
    }
  };
  se.ConnectionError = mr;
  var $a;
  (function (e) {
    function t(n) {
      let r = n;
      return r && Re.func(r.cancelUndispatched);
    }
    e.is = t;
  })($a || (se.ConnectionStrategy = $a = {}));
  var Xi;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        r &&
        (r.kind === void 0 || r.kind === 'id') &&
        Re.func(r.createCancellationTokenSource) &&
        (r.dispose === void 0 || Re.func(r.dispose))
      );
    }
    e.is = t;
  })(Xi || (se.IdCancellationReceiverStrategy = Xi = {}));
  var Ya;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        r &&
        r.kind === 'request' &&
        Re.func(r.createCancellationTokenSource) &&
        (r.dispose === void 0 || Re.func(r.dispose))
      );
    }
    e.is = t;
  })(Ya || (se.RequestCancellationReceiverStrategy = Ya = {}));
  var eo;
  (function (e) {
    e.Message = Object.freeze({
      createCancellationTokenSource(n) {
        return new Ha.CancellationTokenSource();
      },
    });
    function t(n) {
      return Xi.is(n) || Ya.is(n);
    }
    e.is = t;
  })(eo || (se.CancellationReceiverStrategy = eo = {}));
  var to;
  (function (e) {
    e.Message = Object.freeze({
      sendCancellation(n, r) {
        return n.sendNotification(ei.type, { id: r });
      },
      cleanup(n) {},
    });
    function t(n) {
      let r = n;
      return r && Re.func(r.sendCancellation) && Re.func(r.cleanup);
    }
    e.is = t;
  })(to || (se.CancellationSenderStrategy = to = {}));
  var no;
  (function (e) {
    e.Message = Object.freeze({ receiver: eo.Message, sender: to.Message });
    function t(n) {
      let r = n;
      return r && eo.is(r.receiver) && to.is(r.sender);
    }
    e.is = t;
  })(no || (se.CancellationStrategy = no = {}));
  var ro;
  (function (e) {
    function t(n) {
      let r = n;
      return r && Re.func(r.handleMessage);
    }
    e.is = t;
  })(ro || (se.MessageStrategy = ro = {}));
  var Zl;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        r &&
        (no.is(r.cancellationStrategy) || $a.is(r.connectionStrategy) || ro.is(r.messageStrategy))
      );
    }
    e.is = t;
  })(Zl || (se.ConnectionOptions = Zl = {}));
  var zt;
  (function (e) {
    ((e[(e.New = 1)] = 'New'),
      (e[(e.Listening = 2)] = 'Listening'),
      (e[(e.Closed = 3)] = 'Closed'),
      (e[(e.Disposed = 4)] = 'Disposed'));
  })(zt || (zt = {}));
  function ix(e, t, n, r) {
    let i = n !== void 0 ? n : se.NullLogger,
      o = 0,
      s = 0,
      a = 0,
      u = '2.0',
      c,
      f = new Map(),
      p,
      m = new Map(),
      h = new Map(),
      A,
      I = new Ql.LinkedMap(),
      L = new Map(),
      q = new Set(),
      S = new Map(),
      w = we.Off,
      N = Tt.Text,
      V,
      P = zt.New,
      Z = new Jr.Emitter(),
      ye = new Jr.Emitter(),
      fe = new Jr.Emitter(),
      ge = new Jr.Emitter(),
      Fe = new Jr.Emitter(),
      ue = r && r.cancellationStrategy ? r.cancellationStrategy : no.Message;
    function $(y) {
      if (y === null)
        throw new Error("Can't send requests with id null since the response can't be correlated.");
      return 'req-' + y.toString();
    }
    function ee(y) {
      return y === null ? 'res-unknown-' + (++a).toString() : 'res-' + y.toString();
    }
    function te() {
      return 'not-' + (++s).toString();
    }
    function _e(y, D) {
      X.Message.isRequest(D)
        ? y.set($(D.id), D)
        : X.Message.isResponse(D)
          ? y.set(ee(D.id), D)
          : y.set(te(), D);
    }
    function De(y) {}
    function Xe() {
      return P === zt.Listening;
    }
    function $e() {
      return P === zt.Closed;
    }
    function v() {
      return P === zt.Disposed;
    }
    function ze() {
      (P === zt.New || P === zt.Listening) && ((P = zt.Closed), ye.fire(void 0));
    }
    function et(y) {
      Z.fire([y, void 0, void 0]);
    }
    function k(y) {
      Z.fire(y);
    }
    (e.onClose(ze), e.onError(et), t.onClose(ze), t.onError(k));
    function Ue() {
      A ||
        I.size === 0 ||
        (A = (0, Kl.default)().timer.setImmediate(() => {
          ((A = void 0), ln());
        }));
    }
    function St(y) {
      X.Message.isRequest(y)
        ? Ae(y)
        : X.Message.isNotification(y)
          ? ht(y)
          : X.Message.isResponse(y)
            ? $t(y)
            : mt(y);
    }
    function ln() {
      if (I.size === 0) return;
      let y = I.shift();
      try {
        let D = r?.messageStrategy;
        ro.is(D) ? D.handleMessage(y, St) : St(y);
      } finally {
        Ue();
      }
    }
    let Xt = (y) => {
      try {
        if (X.Message.isNotification(y) && y.method === ei.type.method) {
          let D = y.params.id,
            M = $(D),
            U = I.get(M);
          if (X.Message.isRequest(U)) {
            let pe = r?.connectionStrategy,
              xe = pe && pe.cancelUndispatched ? pe.cancelUndispatched(U, De) : void 0;
            if (xe && (xe.error !== void 0 || xe.result !== void 0)) {
              (I.delete(M),
                S.delete(D),
                (xe.id = U.id),
                Yt(xe, y.method, Date.now()),
                t.write(xe).catch(() => i.error('Sending response for canceled message failed.')));
              return;
            }
          }
          let ce = S.get(D);
          if (ce !== void 0) {
            (ce.cancel(), en(y));
            return;
          } else q.add(D);
        }
        _e(I, y);
      } finally {
        Ue();
      }
    };
    function Ae(y) {
      if (v()) return;
      function D(ne, de, be) {
        let qe = { jsonrpc: u, id: y.id };
        (ne instanceof X.ResponseError
          ? (qe.error = ne.toJson())
          : (qe.result = ne === void 0 ? null : ne),
          Yt(qe, de, be),
          t.write(qe).catch(() => i.error('Sending response failed.')));
      }
      function M(ne, de, be) {
        let qe = { jsonrpc: u, id: y.id, error: ne.toJson() };
        (Yt(qe, de, be), t.write(qe).catch(() => i.error('Sending response failed.')));
      }
      function U(ne, de, be) {
        ne === void 0 && (ne = null);
        let qe = { jsonrpc: u, id: y.id, result: ne };
        (Yt(qe, de, be), t.write(qe).catch(() => i.error('Sending response failed.')));
      }
      On(y);
      let ce = f.get(y.method),
        pe,
        xe;
      ce && ((pe = ce.type), (xe = ce.handler));
      let le = Date.now();
      if (xe || c) {
        let ne = y.id ?? String(Date.now()),
          de = Xi.is(ue.receiver)
            ? ue.receiver.createCancellationTokenSource(ne)
            : ue.receiver.createCancellationTokenSource(y);
        (y.id !== null && q.has(y.id) && de.cancel(), y.id !== null && S.set(ne, de));
        try {
          let be;
          if (xe)
            if (y.params === void 0) {
              if (pe !== void 0 && pe.numberOfParams !== 0) {
                M(
                  new X.ResponseError(
                    X.ErrorCodes.InvalidParams,
                    `Request ${y.method} defines ${pe.numberOfParams} params but received none.`
                  ),
                  y.method,
                  le
                );
                return;
              }
              be = xe(de.token);
            } else if (Array.isArray(y.params)) {
              if (pe !== void 0 && pe.parameterStructures === X.ParameterStructures.byName) {
                M(
                  new X.ResponseError(
                    X.ErrorCodes.InvalidParams,
                    `Request ${y.method} defines parameters by name but received parameters by position`
                  ),
                  y.method,
                  le
                );
                return;
              }
              be = xe(...y.params, de.token);
            } else {
              if (pe !== void 0 && pe.parameterStructures === X.ParameterStructures.byPosition) {
                M(
                  new X.ResponseError(
                    X.ErrorCodes.InvalidParams,
                    `Request ${y.method} defines parameters by position but received parameters by name`
                  ),
                  y.method,
                  le
                );
                return;
              }
              be = xe(y.params, de.token);
            }
          else c && (be = c(y.method, y.params, de.token));
          let qe = be;
          be
            ? qe.then
              ? qe.then(
                  (Ge) => {
                    (S.delete(ne), D(Ge, y.method, le));
                  },
                  (Ge) => {
                    (S.delete(ne),
                      Ge instanceof X.ResponseError
                        ? M(Ge, y.method, le)
                        : Ge && Re.string(Ge.message)
                          ? M(
                              new X.ResponseError(
                                X.ErrorCodes.InternalError,
                                `Request ${y.method} failed with message: ${Ge.message}`
                              ),
                              y.method,
                              le
                            )
                          : M(
                              new X.ResponseError(
                                X.ErrorCodes.InternalError,
                                `Request ${y.method} failed unexpectedly without providing any details.`
                              ),
                              y.method,
                              le
                            ));
                  }
                )
              : (S.delete(ne), D(be, y.method, le))
            : (S.delete(ne), U(be, y.method, le));
        } catch (be) {
          (S.delete(ne),
            be instanceof X.ResponseError
              ? D(be, y.method, le)
              : be && Re.string(be.message)
                ? M(
                    new X.ResponseError(
                      X.ErrorCodes.InternalError,
                      `Request ${y.method} failed with message: ${be.message}`
                    ),
                    y.method,
                    le
                  )
                : M(
                    new X.ResponseError(
                      X.ErrorCodes.InternalError,
                      `Request ${y.method} failed unexpectedly without providing any details.`
                    ),
                    y.method,
                    le
                  ));
        }
      } else
        M(
          new X.ResponseError(X.ErrorCodes.MethodNotFound, `Unhandled method ${y.method}`),
          y.method,
          le
        );
    }
    function $t(y) {
      if (!v())
        if (y.id === null)
          y.error
            ? i.error(`Received response message without id: Error is: 
${JSON.stringify(y.error, void 0, 4)}`)
            : i.error(
                'Received response message without id. No further error information provided.'
              );
        else {
          let D = y.id,
            M = L.get(D);
          if ((or(y, M), M !== void 0)) {
            L.delete(D);
            try {
              if (y.error) {
                let U = y.error;
                M.reject(new X.ResponseError(U.code, U.message, U.data));
              } else if (y.result !== void 0) M.resolve(y.result);
              else throw new Error('Should never happen.');
            } catch (U) {
              U.message
                ? i.error(`Response handler '${M.method}' failed with message: ${U.message}`)
                : i.error(`Response handler '${M.method}' failed unexpectedly.`);
            }
          }
        }
    }
    function ht(y) {
      if (v()) return;
      let D, M;
      if (y.method === ei.type.method) {
        let U = y.params.id;
        (q.delete(U), en(y));
        return;
      } else {
        let U = m.get(y.method);
        U && ((M = U.handler), (D = U.type));
      }
      if (M || p)
        try {
          if ((en(y), M))
            if (y.params === void 0)
              (D !== void 0 &&
                D.numberOfParams !== 0 &&
                D.parameterStructures !== X.ParameterStructures.byName &&
                i.error(
                  `Notification ${y.method} defines ${D.numberOfParams} params but received none.`
                ),
                M());
            else if (Array.isArray(y.params)) {
              let U = y.params;
              y.method === Zr.type.method && U.length === 2 && za.is(U[0])
                ? M({ token: U[0], value: U[1] })
                : (D !== void 0 &&
                    (D.parameterStructures === X.ParameterStructures.byName &&
                      i.error(
                        `Notification ${y.method} defines parameters by name but received parameters by position`
                      ),
                    D.numberOfParams !== y.params.length &&
                      i.error(
                        `Notification ${y.method} defines ${D.numberOfParams} params but received ${U.length} arguments`
                      )),
                  M(...U));
            } else
              (D !== void 0 &&
                D.parameterStructures === X.ParameterStructures.byPosition &&
                i.error(
                  `Notification ${y.method} defines parameters by position but received parameters by name`
                ),
                M(y.params));
          else p && p(y.method, y.params);
        } catch (U) {
          U.message
            ? i.error(`Notification handler '${y.method}' failed with message: ${U.message}`)
            : i.error(`Notification handler '${y.method}' failed unexpectedly.`);
        }
      else fe.fire(y);
    }
    function mt(y) {
      if (!y) {
        i.error('Received empty message.');
        return;
      }
      i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(y, null, 4)}`);
      let D = y;
      if (Re.string(D.id) || Re.number(D.id)) {
        let M = D.id,
          U = L.get(M);
        U &&
          U.reject(new Error('The received response has neither a result nor an error property.'));
      }
    }
    function Ye(y) {
      if (y != null)
        switch (w) {
          case we.Verbose:
            return JSON.stringify(y, null, 4);
          case we.Compact:
            return JSON.stringify(y);
          default:
            return;
        }
    }
    function fn(y) {
      if (!(w === we.Off || !V))
        if (N === Tt.Text) {
          let D;
          ((w === we.Verbose || w === we.Compact) &&
            y.params &&
            (D = `Params: ${Ye(y.params)}

`),
            V.log(`Sending request '${y.method} - (${y.id})'.`, D));
        } else Rt('send-request', y);
    }
    function ir(y) {
      if (!(w === we.Off || !V))
        if (N === Tt.Text) {
          let D;
          ((w === we.Verbose || w === we.Compact) &&
            (y.params
              ? (D = `Params: ${Ye(y.params)}

`)
              : (D = `No parameters provided.

`)),
            V.log(`Sending notification '${y.method}'.`, D));
        } else Rt('send-notification', y);
    }
    function Yt(y, D, M) {
      if (!(w === we.Off || !V))
        if (N === Tt.Text) {
          let U;
          ((w === we.Verbose || w === we.Compact) &&
            (y.error && y.error.data
              ? (U = `Error data: ${Ye(y.error.data)}

`)
              : y.result
                ? (U = `Result: ${Ye(y.result)}

`)
                : y.error === void 0 &&
                  (U = `No result returned.

`)),
            V.log(
              `Sending response '${D} - (${y.id})'. Processing request took ${Date.now() - M}ms`,
              U
            ));
        } else Rt('send-response', y);
    }
    function On(y) {
      if (!(w === we.Off || !V))
        if (N === Tt.Text) {
          let D;
          ((w === we.Verbose || w === we.Compact) &&
            y.params &&
            (D = `Params: ${Ye(y.params)}

`),
            V.log(`Received request '${y.method} - (${y.id})'.`, D));
        } else Rt('receive-request', y);
    }
    function en(y) {
      if (!(w === we.Off || !V || y.method === Zi.type.method))
        if (N === Tt.Text) {
          let D;
          ((w === we.Verbose || w === we.Compact) &&
            (y.params
              ? (D = `Params: ${Ye(y.params)}

`)
              : (D = `No parameters provided.

`)),
            V.log(`Received notification '${y.method}'.`, D));
        } else Rt('receive-notification', y);
    }
    function or(y, D) {
      if (!(w === we.Off || !V))
        if (N === Tt.Text) {
          let M;
          if (
            ((w === we.Verbose || w === we.Compact) &&
              (y.error && y.error.data
                ? (M = `Error data: ${Ye(y.error.data)}

`)
                : y.result
                  ? (M = `Result: ${Ye(y.result)}

`)
                  : y.error === void 0 &&
                    (M = `No result returned.

`)),
            D)
          ) {
            let U = y.error ? ` Request failed: ${y.error.message} (${y.error.code}).` : '';
            V.log(
              `Received response '${D.method} - (${y.id})' in ${Date.now() - D.timerStart}ms.${U}`,
              M
            );
          } else V.log(`Received response ${y.id} without active response promise.`, M);
        } else Rt('receive-response', y);
    }
    function Rt(y, D) {
      if (!V || w === we.Off) return;
      let M = { isLSPMessage: !0, type: y, message: D, timestamp: Date.now() };
      V.log(M);
    }
    function jt() {
      if ($e()) throw new mr(Xr.Closed, 'Connection is closed.');
      if (v()) throw new mr(Xr.Disposed, 'Connection is disposed.');
    }
    function sr() {
      if (Xe()) throw new mr(Xr.AlreadyListening, 'Connection is already listening');
    }
    function ar() {
      if (!Xe()) throw new Error('Call listen() first.');
    }
    function At(y) {
      return y === void 0 ? null : y;
    }
    function In(y) {
      if (y !== null) return y;
    }
    function Fn(y) {
      return y != null && !Array.isArray(y) && typeof y == 'object';
    }
    function E(y, D) {
      switch (y) {
        case X.ParameterStructures.auto:
          return Fn(D) ? In(D) : [At(D)];
        case X.ParameterStructures.byName:
          if (!Fn(D))
            throw new Error('Received parameters by name but param is not an object literal.');
          return In(D);
        case X.ParameterStructures.byPosition:
          return [At(D)];
        default:
          throw new Error(`Unknown parameter structure ${y.toString()}`);
      }
    }
    function B(y, D) {
      let M,
        U = y.numberOfParams;
      switch (U) {
        case 0:
          M = void 0;
          break;
        case 1:
          M = E(y.parameterStructures, D[0]);
          break;
        default:
          M = [];
          for (let ce = 0; ce < D.length && ce < U; ce++) M.push(At(D[ce]));
          if (D.length < U) for (let ce = D.length; ce < U; ce++) M.push(null);
          break;
      }
      return M;
    }
    let Q = {
      sendNotification: (y, ...D) => {
        jt();
        let M, U;
        if (Re.string(y)) {
          M = y;
          let pe = D[0],
            xe = 0,
            le = X.ParameterStructures.auto;
          X.ParameterStructures.is(pe) && ((xe = 1), (le = pe));
          let ne = D.length,
            de = ne - xe;
          switch (de) {
            case 0:
              U = void 0;
              break;
            case 1:
              U = E(le, D[xe]);
              break;
            default:
              if (le === X.ParameterStructures.byName)
                throw new Error(
                  `Received ${de} parameters for 'by Name' notification parameter structure.`
                );
              U = D.slice(xe, ne).map((be) => At(be));
              break;
          }
        } else {
          let pe = D;
          ((M = y.method), (U = B(y, pe)));
        }
        let ce = { jsonrpc: u, method: M, params: U };
        return (
          ir(ce),
          t.write(ce).catch((pe) => {
            throw (i.error('Sending notification failed.'), pe);
          })
        );
      },
      onNotification: (y, D) => {
        jt();
        let M;
        return (
          Re.func(y)
            ? (p = y)
            : D &&
              (Re.string(y)
                ? ((M = y), m.set(y, { type: void 0, handler: D }))
                : ((M = y.method), m.set(y.method, { type: y, handler: D }))),
          {
            dispose: () => {
              M !== void 0 ? m.delete(M) : (p = void 0);
            },
          }
        );
      },
      onProgress: (y, D, M) => {
        if (h.has(D)) throw new Error(`Progress handler for token ${D} already registered`);
        return (
          h.set(D, M),
          {
            dispose: () => {
              h.delete(D);
            },
          }
        );
      },
      sendProgress: (y, D, M) => Q.sendNotification(Zr.type, { token: D, value: M }),
      onUnhandledProgress: ge.event,
      sendRequest: (y, ...D) => {
        (jt(), ar());
        let M, U, ce;
        if (Re.string(y)) {
          M = y;
          let ne = D[0],
            de = D[D.length - 1],
            be = 0,
            qe = X.ParameterStructures.auto;
          X.ParameterStructures.is(ne) && ((be = 1), (qe = ne));
          let Ge = D.length;
          Ha.CancellationToken.is(de) && ((Ge = Ge - 1), (ce = de));
          let Ct = Ge - be;
          switch (Ct) {
            case 0:
              U = void 0;
              break;
            case 1:
              U = E(qe, D[be]);
              break;
            default:
              if (qe === X.ParameterStructures.byName)
                throw new Error(
                  `Received ${Ct} parameters for 'by Name' request parameter structure.`
                );
              U = D.slice(be, Ge).map((Li) => At(Li));
              break;
          }
        } else {
          let ne = D;
          ((M = y.method), (U = B(y, ne)));
          let de = y.numberOfParams;
          ce = Ha.CancellationToken.is(ne[de]) ? ne[de] : void 0;
        }
        let pe = o++,
          xe;
        ce &&
          (xe = ce.onCancellationRequested(() => {
            let ne = ue.sender.sendCancellation(Q, pe);
            return ne === void 0
              ? (i.log(`Received no promise from cancellation strategy when cancelling id ${pe}`),
                Promise.resolve())
              : ne.catch(() => {
                  i.log(`Sending cancellation messages for id ${pe} failed`);
                });
          }));
        let le = { jsonrpc: u, id: pe, method: M, params: U };
        return (
          fn(le),
          typeof ue.sender.enableCancellation == 'function' && ue.sender.enableCancellation(le),
          new Promise(async (ne, de) => {
            let be = (Ct) => {
                (ne(Ct), ue.sender.cleanup(pe), xe?.dispose());
              },
              qe = (Ct) => {
                (de(Ct), ue.sender.cleanup(pe), xe?.dispose());
              },
              Ge = { method: M, timerStart: Date.now(), resolve: be, reject: qe };
            try {
              (await t.write(le), L.set(pe, Ge));
            } catch (Ct) {
              throw (
                i.error('Sending request failed.'),
                Ge.reject(
                  new X.ResponseError(
                    X.ErrorCodes.MessageWriteError,
                    Ct.message ? Ct.message : 'Unknown reason'
                  )
                ),
                Ct
              );
            }
          })
        );
      },
      onRequest: (y, D) => {
        jt();
        let M = null;
        return (
          Wa.is(y)
            ? ((M = void 0), (c = y))
            : Re.string(y)
              ? ((M = null), D !== void 0 && ((M = y), f.set(y, { handler: D, type: void 0 })))
              : D !== void 0 && ((M = y.method), f.set(y.method, { type: y, handler: D })),
          {
            dispose: () => {
              M !== null && (M !== void 0 ? f.delete(M) : (c = void 0));
            },
          }
        );
      },
      hasPendingResponse: () => L.size > 0,
      trace: async (y, D, M) => {
        let U = !1,
          ce = Tt.Text;
        (M !== void 0 &&
          (Re.boolean(M)
            ? (U = M)
            : ((U = M.sendNotification || !1), (ce = M.traceFormat || Tt.Text))),
          (w = y),
          (N = ce),
          w === we.Off ? (V = void 0) : (V = D),
          U && !$e() && !v() && (await Q.sendNotification(Va.type, { value: we.toString(y) })));
      },
      onError: Z.event,
      onClose: ye.event,
      onUnhandledNotification: fe.event,
      onDispose: Fe.event,
      end: () => {
        t.end();
      },
      dispose: () => {
        if (v()) return;
        ((P = zt.Disposed), Fe.fire(void 0));
        let y = new X.ResponseError(
          X.ErrorCodes.PendingResponseRejected,
          'Pending response rejected since connection got disposed'
        );
        for (let D of L.values()) D.reject(y);
        ((L = new Map()),
          (S = new Map()),
          (q = new Set()),
          (I = new Ql.LinkedMap()),
          Re.func(t.dispose) && t.dispose(),
          Re.func(e.dispose) && e.dispose());
      },
      listen: () => {
        (jt(), sr(), (P = zt.Listening), e.listen(Xt));
      },
      inspect: () => {
        (0, Kl.default)().console.log('inspect');
      },
    };
    return (
      Q.onNotification(Zi.type, (y) => {
        if (w === we.Off || !V) return;
        let D = w === we.Verbose || w === we.Compact;
        V.log(y.message, D ? y.verbose : void 0);
      }),
      Q.onNotification(Zr.type, (y) => {
        let D = h.get(y.token);
        D ? D(y.value) : ge.fire(y);
      }),
      Q
    );
  }
  se.createMessageConnection = ix;
});
var io = O((R) => {
  'use strict';
  Object.defineProperty(R, '__esModule', { value: !0 });
  R.ProgressType =
    R.ProgressToken =
    R.createMessageConnection =
    R.NullLogger =
    R.ConnectionOptions =
    R.ConnectionStrategy =
    R.AbstractMessageBuffer =
    R.WriteableStreamMessageWriter =
    R.AbstractMessageWriter =
    R.MessageWriter =
    R.ReadableStreamMessageReader =
    R.AbstractMessageReader =
    R.MessageReader =
    R.SharedArrayReceiverStrategy =
    R.SharedArraySenderStrategy =
    R.CancellationToken =
    R.CancellationTokenSource =
    R.Emitter =
    R.Event =
    R.Disposable =
    R.LRUCache =
    R.Touch =
    R.LinkedMap =
    R.ParameterStructures =
    R.NotificationType9 =
    R.NotificationType8 =
    R.NotificationType7 =
    R.NotificationType6 =
    R.NotificationType5 =
    R.NotificationType4 =
    R.NotificationType3 =
    R.NotificationType2 =
    R.NotificationType1 =
    R.NotificationType0 =
    R.NotificationType =
    R.ErrorCodes =
    R.ResponseError =
    R.RequestType9 =
    R.RequestType8 =
    R.RequestType7 =
    R.RequestType6 =
    R.RequestType5 =
    R.RequestType4 =
    R.RequestType3 =
    R.RequestType2 =
    R.RequestType1 =
    R.RequestType0 =
    R.RequestType =
    R.Message =
    R.RAL =
      void 0;
  R.MessageStrategy =
    R.CancellationStrategy =
    R.CancellationSenderStrategy =
    R.CancellationReceiverStrategy =
    R.ConnectionError =
    R.ConnectionErrors =
    R.LogTraceNotification =
    R.SetTraceNotification =
    R.TraceFormat =
    R.TraceValues =
    R.Trace =
      void 0;
  var Ce = va();
  Object.defineProperty(R, 'Message', {
    enumerable: !0,
    get: function () {
      return Ce.Message;
    },
  });
  Object.defineProperty(R, 'RequestType', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType;
    },
  });
  Object.defineProperty(R, 'RequestType0', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType0;
    },
  });
  Object.defineProperty(R, 'RequestType1', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType1;
    },
  });
  Object.defineProperty(R, 'RequestType2', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType2;
    },
  });
  Object.defineProperty(R, 'RequestType3', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType3;
    },
  });
  Object.defineProperty(R, 'RequestType4', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType4;
    },
  });
  Object.defineProperty(R, 'RequestType5', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType5;
    },
  });
  Object.defineProperty(R, 'RequestType6', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType6;
    },
  });
  Object.defineProperty(R, 'RequestType7', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType7;
    },
  });
  Object.defineProperty(R, 'RequestType8', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType8;
    },
  });
  Object.defineProperty(R, 'RequestType9', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType9;
    },
  });
  Object.defineProperty(R, 'ResponseError', {
    enumerable: !0,
    get: function () {
      return Ce.ResponseError;
    },
  });
  Object.defineProperty(R, 'ErrorCodes', {
    enumerable: !0,
    get: function () {
      return Ce.ErrorCodes;
    },
  });
  Object.defineProperty(R, 'NotificationType', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType;
    },
  });
  Object.defineProperty(R, 'NotificationType0', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType0;
    },
  });
  Object.defineProperty(R, 'NotificationType1', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType1;
    },
  });
  Object.defineProperty(R, 'NotificationType2', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType2;
    },
  });
  Object.defineProperty(R, 'NotificationType3', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType3;
    },
  });
  Object.defineProperty(R, 'NotificationType4', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType4;
    },
  });
  Object.defineProperty(R, 'NotificationType5', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType5;
    },
  });
  Object.defineProperty(R, 'NotificationType6', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType6;
    },
  });
  Object.defineProperty(R, 'NotificationType7', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType7;
    },
  });
  Object.defineProperty(R, 'NotificationType8', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType8;
    },
  });
  Object.defineProperty(R, 'NotificationType9', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType9;
    },
  });
  Object.defineProperty(R, 'ParameterStructures', {
    enumerable: !0,
    get: function () {
      return Ce.ParameterStructures;
    },
  });
  var Ga = wa();
  Object.defineProperty(R, 'LinkedMap', {
    enumerable: !0,
    get: function () {
      return Ga.LinkedMap;
    },
  });
  Object.defineProperty(R, 'LRUCache', {
    enumerable: !0,
    get: function () {
      return Ga.LRUCache;
    },
  });
  Object.defineProperty(R, 'Touch', {
    enumerable: !0,
    get: function () {
      return Ga.Touch;
    },
  });
  var ox = Ml();
  Object.defineProperty(R, 'Disposable', {
    enumerable: !0,
    get: function () {
      return ox.Disposable;
    },
  });
  var ef = fr();
  Object.defineProperty(R, 'Event', {
    enumerable: !0,
    get: function () {
      return ef.Event;
    },
  });
  Object.defineProperty(R, 'Emitter', {
    enumerable: !0,
    get: function () {
      return ef.Emitter;
    },
  });
  var tf = Yi();
  Object.defineProperty(R, 'CancellationTokenSource', {
    enumerable: !0,
    get: function () {
      return tf.CancellationTokenSource;
    },
  });
  Object.defineProperty(R, 'CancellationToken', {
    enumerable: !0,
    get: function () {
      return tf.CancellationToken;
    },
  });
  var nf = Bl();
  Object.defineProperty(R, 'SharedArraySenderStrategy', {
    enumerable: !0,
    get: function () {
      return nf.SharedArraySenderStrategy;
    },
  });
  Object.defineProperty(R, 'SharedArrayReceiverStrategy', {
    enumerable: !0,
    get: function () {
      return nf.SharedArrayReceiverStrategy;
    },
  });
  var Ka = zl();
  Object.defineProperty(R, 'MessageReader', {
    enumerable: !0,
    get: function () {
      return Ka.MessageReader;
    },
  });
  Object.defineProperty(R, 'AbstractMessageReader', {
    enumerable: !0,
    get: function () {
      return Ka.AbstractMessageReader;
    },
  });
  Object.defineProperty(R, 'ReadableStreamMessageReader', {
    enumerable: !0,
    get: function () {
      return Ka.ReadableStreamMessageReader;
    },
  });
  var Qa = Yl();
  Object.defineProperty(R, 'MessageWriter', {
    enumerable: !0,
    get: function () {
      return Qa.MessageWriter;
    },
  });
  Object.defineProperty(R, 'AbstractMessageWriter', {
    enumerable: !0,
    get: function () {
      return Qa.AbstractMessageWriter;
    },
  });
  Object.defineProperty(R, 'WriteableStreamMessageWriter', {
    enumerable: !0,
    get: function () {
      return Qa.WriteableStreamMessageWriter;
    },
  });
  var sx = Gl();
  Object.defineProperty(R, 'AbstractMessageBuffer', {
    enumerable: !0,
    get: function () {
      return sx.AbstractMessageBuffer;
    },
  });
  var tt = Xl();
  Object.defineProperty(R, 'ConnectionStrategy', {
    enumerable: !0,
    get: function () {
      return tt.ConnectionStrategy;
    },
  });
  Object.defineProperty(R, 'ConnectionOptions', {
    enumerable: !0,
    get: function () {
      return tt.ConnectionOptions;
    },
  });
  Object.defineProperty(R, 'NullLogger', {
    enumerable: !0,
    get: function () {
      return tt.NullLogger;
    },
  });
  Object.defineProperty(R, 'createMessageConnection', {
    enumerable: !0,
    get: function () {
      return tt.createMessageConnection;
    },
  });
  Object.defineProperty(R, 'ProgressToken', {
    enumerable: !0,
    get: function () {
      return tt.ProgressToken;
    },
  });
  Object.defineProperty(R, 'ProgressType', {
    enumerable: !0,
    get: function () {
      return tt.ProgressType;
    },
  });
  Object.defineProperty(R, 'Trace', {
    enumerable: !0,
    get: function () {
      return tt.Trace;
    },
  });
  Object.defineProperty(R, 'TraceValues', {
    enumerable: !0,
    get: function () {
      return tt.TraceValues;
    },
  });
  Object.defineProperty(R, 'TraceFormat', {
    enumerable: !0,
    get: function () {
      return tt.TraceFormat;
    },
  });
  Object.defineProperty(R, 'SetTraceNotification', {
    enumerable: !0,
    get: function () {
      return tt.SetTraceNotification;
    },
  });
  Object.defineProperty(R, 'LogTraceNotification', {
    enumerable: !0,
    get: function () {
      return tt.LogTraceNotification;
    },
  });
  Object.defineProperty(R, 'ConnectionErrors', {
    enumerable: !0,
    get: function () {
      return tt.ConnectionErrors;
    },
  });
  Object.defineProperty(R, 'ConnectionError', {
    enumerable: !0,
    get: function () {
      return tt.ConnectionError;
    },
  });
  Object.defineProperty(R, 'CancellationReceiverStrategy', {
    enumerable: !0,
    get: function () {
      return tt.CancellationReceiverStrategy;
    },
  });
  Object.defineProperty(R, 'CancellationSenderStrategy', {
    enumerable: !0,
    get: function () {
      return tt.CancellationSenderStrategy;
    },
  });
  Object.defineProperty(R, 'CancellationStrategy', {
    enumerable: !0,
    get: function () {
      return tt.CancellationStrategy;
    },
  });
  Object.defineProperty(R, 'MessageStrategy', {
    enumerable: !0,
    get: function () {
      return tt.MessageStrategy;
    },
  });
  var ax = pn();
  R.RAL = ax.default;
});
var sf = O((eu) => {
  'use strict';
  Object.defineProperty(eu, '__esModule', { value: !0 });
  var rf = require('util'),
    nn = io(),
    oo = class e extends nn.AbstractMessageBuffer {
      constructor(t = 'utf-8') {
        super(t);
      }
      emptyBuffer() {
        return e.emptyBuffer;
      }
      fromString(t, n) {
        return Buffer.from(t, n);
      }
      toString(t, n) {
        return t instanceof Buffer ? t.toString(n) : new rf.TextDecoder(n).decode(t);
      }
      asNative(t, n) {
        return n === void 0
          ? t instanceof Buffer
            ? t
            : Buffer.from(t)
          : t instanceof Buffer
            ? t.slice(0, n)
            : Buffer.from(t, 0, n);
      }
      allocNative(t) {
        return Buffer.allocUnsafe(t);
      }
    };
  oo.emptyBuffer = Buffer.allocUnsafe(0);
  var Ja = class {
      constructor(t) {
        this.stream = t;
      }
      onClose(t) {
        return (
          this.stream.on('close', t),
          nn.Disposable.create(() => this.stream.off('close', t))
        );
      }
      onError(t) {
        return (
          this.stream.on('error', t),
          nn.Disposable.create(() => this.stream.off('error', t))
        );
      }
      onEnd(t) {
        return (this.stream.on('end', t), nn.Disposable.create(() => this.stream.off('end', t)));
      }
      onData(t) {
        return (this.stream.on('data', t), nn.Disposable.create(() => this.stream.off('data', t)));
      }
    },
    Za = class {
      constructor(t) {
        this.stream = t;
      }
      onClose(t) {
        return (
          this.stream.on('close', t),
          nn.Disposable.create(() => this.stream.off('close', t))
        );
      }
      onError(t) {
        return (
          this.stream.on('error', t),
          nn.Disposable.create(() => this.stream.off('error', t))
        );
      }
      onEnd(t) {
        return (this.stream.on('end', t), nn.Disposable.create(() => this.stream.off('end', t)));
      }
      write(t, n) {
        return new Promise((r, i) => {
          let o = (s) => {
            s == null ? r() : i(s);
          };
          typeof t == 'string' ? this.stream.write(t, n, o) : this.stream.write(t, o);
        });
      }
      end() {
        this.stream.end();
      }
    },
    of = Object.freeze({
      messageBuffer: Object.freeze({ create: (e) => new oo(e) }),
      applicationJson: Object.freeze({
        encoder: Object.freeze({
          name: 'application/json',
          encode: (e, t) => {
            try {
              return Promise.resolve(Buffer.from(JSON.stringify(e, void 0, 0), t.charset));
            } catch (n) {
              return Promise.reject(n);
            }
          },
        }),
        decoder: Object.freeze({
          name: 'application/json',
          decode: (e, t) => {
            try {
              return e instanceof Buffer
                ? Promise.resolve(JSON.parse(e.toString(t.charset)))
                : Promise.resolve(JSON.parse(new rf.TextDecoder(t.charset).decode(e)));
            } catch (n) {
              return Promise.reject(n);
            }
          },
        }),
      }),
      stream: Object.freeze({
        asReadableStream: (e) => new Ja(e),
        asWritableStream: (e) => new Za(e),
      }),
      console,
      timer: Object.freeze({
        setTimeout(e, t, ...n) {
          let r = setTimeout(e, t, ...n);
          return { dispose: () => clearTimeout(r) };
        },
        setImmediate(e, ...t) {
          let n = setImmediate(e, ...t);
          return { dispose: () => clearImmediate(n) };
        },
        setInterval(e, t, ...n) {
          let r = setInterval(e, t, ...n);
          return { dispose: () => clearInterval(r) };
        },
      }),
    });
  function Xa() {
    return of;
  }
  (function (e) {
    function t() {
      nn.RAL.install(of);
    }
    e.install = t;
  })(Xa || (Xa = {}));
  eu.default = Xa;
});
var Bn = O((me) => {
  'use strict';
  var ux =
      (me && me.__createBinding) ||
      (Object.create
        ? function (e, t, n, r) {
            r === void 0 && (r = n);
            var i = Object.getOwnPropertyDescriptor(t, n);
            ((!i || ('get' in i ? !t.__esModule : i.writable || i.configurable)) &&
              (i = {
                enumerable: !0,
                get: function () {
                  return t[n];
                },
              }),
              Object.defineProperty(e, r, i));
          }
        : function (e, t, n, r) {
            (r === void 0 && (r = n), (e[r] = t[n]));
          }),
    cx =
      (me && me.__exportStar) ||
      function (e, t) {
        for (var n in e)
          n !== 'default' && !Object.prototype.hasOwnProperty.call(t, n) && ux(t, e, n);
      };
  Object.defineProperty(me, '__esModule', { value: !0 });
  me.createMessageConnection =
    me.createServerSocketTransport =
    me.createClientSocketTransport =
    me.createServerPipeTransport =
    me.createClientPipeTransport =
    me.generateRandomPipeName =
    me.StreamMessageWriter =
    me.StreamMessageReader =
    me.SocketMessageWriter =
    me.SocketMessageReader =
    me.PortMessageWriter =
    me.PortMessageReader =
    me.IPCMessageWriter =
    me.IPCMessageReader =
      void 0;
  var gr = sf();
  gr.default.install();
  var af = require('path'),
    lx = require('os'),
    fx = require('crypto'),
    uo = require('net'),
    Dt = io();
  cx(io(), me);
  var tu = class extends Dt.AbstractMessageReader {
    constructor(t) {
      (super(), (this.process = t));
      let n = this.process;
      (n.on('error', (r) => this.fireError(r)), n.on('close', () => this.fireClose()));
    }
    listen(t) {
      return (
        this.process.on('message', t),
        Dt.Disposable.create(() => this.process.off('message', t))
      );
    }
  };
  me.IPCMessageReader = tu;
  var nu = class extends Dt.AbstractMessageWriter {
    constructor(t) {
      (super(), (this.process = t), (this.errorCount = 0));
      let n = this.process;
      (n.on('error', (r) => this.fireError(r)), n.on('close', () => this.fireClose));
    }
    write(t) {
      try {
        return (
          typeof this.process.send == 'function' &&
            this.process.send(t, void 0, void 0, (n) => {
              n ? (this.errorCount++, this.handleError(n, t)) : (this.errorCount = 0);
            }),
          Promise.resolve()
        );
      } catch (n) {
        return (this.handleError(n, t), Promise.reject(n));
      }
    }
    handleError(t, n) {
      (this.errorCount++, this.fireError(t, n, this.errorCount));
    }
    end() {}
  };
  me.IPCMessageWriter = nu;
  var ru = class extends Dt.AbstractMessageReader {
    constructor(t) {
      (super(),
        (this.onData = new Dt.Emitter()),
        t.on('close', () => this.fireClose),
        t.on('error', (n) => this.fireError(n)),
        t.on('message', (n) => {
          this.onData.fire(n);
        }));
    }
    listen(t) {
      return this.onData.event(t);
    }
  };
  me.PortMessageReader = ru;
  var iu = class extends Dt.AbstractMessageWriter {
    constructor(t) {
      (super(),
        (this.port = t),
        (this.errorCount = 0),
        t.on('close', () => this.fireClose()),
        t.on('error', (n) => this.fireError(n)));
    }
    write(t) {
      try {
        return (this.port.postMessage(t), Promise.resolve());
      } catch (n) {
        return (this.handleError(n, t), Promise.reject(n));
      }
    }
    handleError(t, n) {
      (this.errorCount++, this.fireError(t, n, this.errorCount));
    }
    end() {}
  };
  me.PortMessageWriter = iu;
  var Mn = class extends Dt.ReadableStreamMessageReader {
    constructor(t, n = 'utf-8') {
      super((0, gr.default)().stream.asReadableStream(t), n);
    }
  };
  me.SocketMessageReader = Mn;
  var jn = class extends Dt.WriteableStreamMessageWriter {
    constructor(t, n) {
      (super((0, gr.default)().stream.asWritableStream(t), n), (this.socket = t));
    }
    dispose() {
      (super.dispose(), this.socket.destroy());
    }
  };
  me.SocketMessageWriter = jn;
  var so = class extends Dt.ReadableStreamMessageReader {
    constructor(t, n) {
      super((0, gr.default)().stream.asReadableStream(t), n);
    }
  };
  me.StreamMessageReader = so;
  var ao = class extends Dt.WriteableStreamMessageWriter {
    constructor(t, n) {
      super((0, gr.default)().stream.asWritableStream(t), n);
    }
  };
  me.StreamMessageWriter = ao;
  var uf = process.env.XDG_RUNTIME_DIR,
    dx = new Map([
      ['linux', 107],
      ['darwin', 103],
    ]);
  function px() {
    let e = (0, fx.randomBytes)(21).toString('hex');
    if (process.platform === 'win32') return `\\\\.\\pipe\\vscode-jsonrpc-${e}-sock`;
    let t;
    uf ? (t = af.join(uf, `vscode-ipc-${e}.sock`)) : (t = af.join(lx.tmpdir(), `vscode-${e}.sock`));
    let n = dx.get(process.platform);
    return (
      n !== void 0 &&
        t.length > n &&
        (0, gr.default)().console.warn(
          `WARNING: IPC handle "${t}" is longer than ${n} characters.`
        ),
      t
    );
  }
  me.generateRandomPipeName = px;
  function hx(e, t = 'utf-8') {
    let n,
      r = new Promise((i, o) => {
        n = i;
      });
    return new Promise((i, o) => {
      let s = (0, uo.createServer)((a) => {
        (s.close(), n([new Mn(a, t), new jn(a, t)]));
      });
      (s.on('error', o),
        s.listen(e, () => {
          (s.removeListener('error', o), i({ onConnected: () => r }));
        }));
    });
  }
  me.createClientPipeTransport = hx;
  function mx(e, t = 'utf-8') {
    let n = (0, uo.createConnection)(e);
    return [new Mn(n, t), new jn(n, t)];
  }
  me.createServerPipeTransport = mx;
  function gx(e, t = 'utf-8') {
    let n,
      r = new Promise((i, o) => {
        n = i;
      });
    return new Promise((i, o) => {
      let s = (0, uo.createServer)((a) => {
        (s.close(), n([new Mn(a, t), new jn(a, t)]));
      });
      (s.on('error', o),
        s.listen(e, '127.0.0.1', () => {
          (s.removeListener('error', o), i({ onConnected: () => r }));
        }));
    });
  }
  me.createClientSocketTransport = gx;
  function yx(e, t = 'utf-8') {
    let n = (0, uo.createConnection)(e, '127.0.0.1');
    return [new Mn(n, t), new jn(n, t)];
  }
  me.createServerSocketTransport = yx;
  function bx(e) {
    let t = e;
    return t.read !== void 0 && t.addListener !== void 0;
  }
  function vx(e) {
    let t = e;
    return t.write !== void 0 && t.addListener !== void 0;
  }
  function xx(e, t, n, r) {
    n || (n = Dt.NullLogger);
    let i = bx(e) ? new so(e) : e,
      o = vx(t) ? new ao(t) : t;
    return (
      Dt.ConnectionStrategy.is(r) && (r = { connectionStrategy: r }),
      (0, Dt.createMessageConnection)(i, o, n, r)
    );
  }
  me.createMessageConnection = xx;
});
var ou = O((wR, cf) => {
  'use strict';
  cf.exports = Bn();
});
var lo = O((lf, co) => {
  (function (e) {
    if (typeof co == 'object' && typeof co.exports == 'object') {
      var t = e(require, lf);
      t !== void 0 && (co.exports = t);
    } else typeof define == 'function' && define.amd && define(['require', 'exports'], e);
  })(function (e, t) {
    'use strict';
    (Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.TextDocument =
        t.EOL =
        t.WorkspaceFolder =
        t.InlineCompletionContext =
        t.SelectedCompletionInfo =
        t.InlineCompletionTriggerKind =
        t.InlineCompletionList =
        t.InlineCompletionItem =
        t.StringValue =
        t.InlayHint =
        t.InlayHintLabelPart =
        t.InlayHintKind =
        t.InlineValueContext =
        t.InlineValueEvaluatableExpression =
        t.InlineValueVariableLookup =
        t.InlineValueText =
        t.SemanticTokens =
        t.SemanticTokenModifiers =
        t.SemanticTokenTypes =
        t.SelectionRange =
        t.DocumentLink =
        t.FormattingOptions =
        t.CodeLens =
        t.CodeAction =
        t.CodeActionContext =
        t.CodeActionTriggerKind =
        t.CodeActionKind =
        t.DocumentSymbol =
        t.WorkspaceSymbol =
        t.SymbolInformation =
        t.SymbolTag =
        t.SymbolKind =
        t.DocumentHighlight =
        t.DocumentHighlightKind =
        t.SignatureInformation =
        t.ParameterInformation =
        t.Hover =
        t.MarkedString =
        t.CompletionList =
        t.CompletionItem =
        t.CompletionItemLabelDetails =
        t.InsertTextMode =
        t.InsertReplaceEdit =
        t.CompletionItemTag =
        t.InsertTextFormat =
        t.CompletionItemKind =
        t.MarkupContent =
        t.MarkupKind =
        t.TextDocumentItem =
        t.OptionalVersionedTextDocumentIdentifier =
        t.VersionedTextDocumentIdentifier =
        t.TextDocumentIdentifier =
        t.WorkspaceChange =
        t.WorkspaceEdit =
        t.DeleteFile =
        t.RenameFile =
        t.CreateFile =
        t.TextDocumentEdit =
        t.AnnotatedTextEdit =
        t.ChangeAnnotationIdentifier =
        t.ChangeAnnotation =
        t.TextEdit =
        t.Command =
        t.Diagnostic =
        t.CodeDescription =
        t.DiagnosticTag =
        t.DiagnosticSeverity =
        t.DiagnosticRelatedInformation =
        t.FoldingRange =
        t.FoldingRangeKind =
        t.ColorPresentation =
        t.ColorInformation =
        t.Color =
        t.LocationLink =
        t.Location =
        t.Range =
        t.Position =
        t.uinteger =
        t.integer =
        t.URI =
        t.DocumentUri =
          void 0));
    var n;
    (function (d) {
      function x(_) {
        return typeof _ == 'string';
      }
      d.is = x;
    })(n || (t.DocumentUri = n = {}));
    var r;
    (function (d) {
      function x(_) {
        return typeof _ == 'string';
      }
      d.is = x;
    })(r || (t.URI = r = {}));
    var i;
    (function (d) {
      ((d.MIN_VALUE = -2147483648), (d.MAX_VALUE = 2147483647));
      function x(_) {
        return typeof _ == 'number' && d.MIN_VALUE <= _ && _ <= d.MAX_VALUE;
      }
      d.is = x;
    })(i || (t.integer = i = {}));
    var o;
    (function (d) {
      ((d.MIN_VALUE = 0), (d.MAX_VALUE = 2147483647));
      function x(_) {
        return typeof _ == 'number' && d.MIN_VALUE <= _ && _ <= d.MAX_VALUE;
      }
      d.is = x;
    })(o || (t.uinteger = o = {}));
    var s;
    (function (d) {
      function x(g, l) {
        return (
          g === Number.MAX_VALUE && (g = o.MAX_VALUE),
          l === Number.MAX_VALUE && (l = o.MAX_VALUE),
          { line: g, character: l }
        );
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.objectLiteral(l) && T.uinteger(l.line) && T.uinteger(l.character);
      }
      d.is = _;
    })(s || (t.Position = s = {}));
    var a;
    (function (d) {
      function x(g, l, C, F) {
        if (T.uinteger(g) && T.uinteger(l) && T.uinteger(C) && T.uinteger(F))
          return { start: s.create(g, l), end: s.create(C, F) };
        if (s.is(g) && s.is(l)) return { start: g, end: l };
        throw new Error(
          'Range#create called with invalid arguments['
            .concat(g, ', ')
            .concat(l, ', ')
            .concat(C, ', ')
            .concat(F, ']')
        );
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.objectLiteral(l) && s.is(l.start) && s.is(l.end);
      }
      d.is = _;
    })(a || (t.Range = a = {}));
    var u;
    (function (d) {
      function x(g, l) {
        return { uri: g, range: l };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.objectLiteral(l) && a.is(l.range) && (T.string(l.uri) || T.undefined(l.uri));
      }
      d.is = _;
    })(u || (t.Location = u = {}));
    var c;
    (function (d) {
      function x(g, l, C, F) {
        return { targetUri: g, targetRange: l, targetSelectionRange: C, originSelectionRange: F };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          T.objectLiteral(l) &&
          a.is(l.targetRange) &&
          T.string(l.targetUri) &&
          a.is(l.targetSelectionRange) &&
          (a.is(l.originSelectionRange) || T.undefined(l.originSelectionRange))
        );
      }
      d.is = _;
    })(c || (t.LocationLink = c = {}));
    var f;
    (function (d) {
      function x(g, l, C, F) {
        return { red: g, green: l, blue: C, alpha: F };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          T.objectLiteral(l) &&
          T.numberRange(l.red, 0, 1) &&
          T.numberRange(l.green, 0, 1) &&
          T.numberRange(l.blue, 0, 1) &&
          T.numberRange(l.alpha, 0, 1)
        );
      }
      d.is = _;
    })(f || (t.Color = f = {}));
    var p;
    (function (d) {
      function x(g, l) {
        return { range: g, color: l };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.objectLiteral(l) && a.is(l.range) && f.is(l.color);
      }
      d.is = _;
    })(p || (t.ColorInformation = p = {}));
    var m;
    (function (d) {
      function x(g, l, C) {
        return { label: g, textEdit: l, additionalTextEdits: C };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          T.objectLiteral(l) &&
          T.string(l.label) &&
          (T.undefined(l.textEdit) || V.is(l)) &&
          (T.undefined(l.additionalTextEdits) || T.typedArray(l.additionalTextEdits, V.is))
        );
      }
      d.is = _;
    })(m || (t.ColorPresentation = m = {}));
    var h;
    (function (d) {
      ((d.Comment = 'comment'), (d.Imports = 'imports'), (d.Region = 'region'));
    })(h || (t.FoldingRangeKind = h = {}));
    var A;
    (function (d) {
      function x(g, l, C, F, oe, Pe) {
        var Se = { startLine: g, endLine: l };
        return (
          T.defined(C) && (Se.startCharacter = C),
          T.defined(F) && (Se.endCharacter = F),
          T.defined(oe) && (Se.kind = oe),
          T.defined(Pe) && (Se.collapsedText = Pe),
          Se
        );
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          T.objectLiteral(l) &&
          T.uinteger(l.startLine) &&
          T.uinteger(l.startLine) &&
          (T.undefined(l.startCharacter) || T.uinteger(l.startCharacter)) &&
          (T.undefined(l.endCharacter) || T.uinteger(l.endCharacter)) &&
          (T.undefined(l.kind) || T.string(l.kind))
        );
      }
      d.is = _;
    })(A || (t.FoldingRange = A = {}));
    var I;
    (function (d) {
      function x(g, l) {
        return { location: g, message: l };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.defined(l) && u.is(l.location) && T.string(l.message);
      }
      d.is = _;
    })(I || (t.DiagnosticRelatedInformation = I = {}));
    var L;
    (function (d) {
      ((d.Error = 1), (d.Warning = 2), (d.Information = 3), (d.Hint = 4));
    })(L || (t.DiagnosticSeverity = L = {}));
    var q;
    (function (d) {
      ((d.Unnecessary = 1), (d.Deprecated = 2));
    })(q || (t.DiagnosticTag = q = {}));
    var S;
    (function (d) {
      function x(_) {
        var g = _;
        return T.objectLiteral(g) && T.string(g.href);
      }
      d.is = x;
    })(S || (t.CodeDescription = S = {}));
    var w;
    (function (d) {
      function x(g, l, C, F, oe, Pe) {
        var Se = { range: g, message: l };
        return (
          T.defined(C) && (Se.severity = C),
          T.defined(F) && (Se.code = F),
          T.defined(oe) && (Se.source = oe),
          T.defined(Pe) && (Se.relatedInformation = Pe),
          Se
        );
      }
      d.create = x;
      function _(g) {
        var l,
          C = g;
        return (
          T.defined(C) &&
          a.is(C.range) &&
          T.string(C.message) &&
          (T.number(C.severity) || T.undefined(C.severity)) &&
          (T.integer(C.code) || T.string(C.code) || T.undefined(C.code)) &&
          (T.undefined(C.codeDescription) ||
            T.string((l = C.codeDescription) === null || l === void 0 ? void 0 : l.href)) &&
          (T.string(C.source) || T.undefined(C.source)) &&
          (T.undefined(C.relatedInformation) || T.typedArray(C.relatedInformation, I.is))
        );
      }
      d.is = _;
    })(w || (t.Diagnostic = w = {}));
    var N;
    (function (d) {
      function x(g, l) {
        for (var C = [], F = 2; F < arguments.length; F++) C[F - 2] = arguments[F];
        var oe = { title: g, command: l };
        return (T.defined(C) && C.length > 0 && (oe.arguments = C), oe);
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.defined(l) && T.string(l.title) && T.string(l.command);
      }
      d.is = _;
    })(N || (t.Command = N = {}));
    var V;
    (function (d) {
      function x(C, F) {
        return { range: C, newText: F };
      }
      d.replace = x;
      function _(C, F) {
        return { range: { start: C, end: C }, newText: F };
      }
      d.insert = _;
      function g(C) {
        return { range: C, newText: '' };
      }
      d.del = g;
      function l(C) {
        var F = C;
        return T.objectLiteral(F) && T.string(F.newText) && a.is(F.range);
      }
      d.is = l;
    })(V || (t.TextEdit = V = {}));
    var P;
    (function (d) {
      function x(g, l, C) {
        var F = { label: g };
        return (l !== void 0 && (F.needsConfirmation = l), C !== void 0 && (F.description = C), F);
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          T.objectLiteral(l) &&
          T.string(l.label) &&
          (T.boolean(l.needsConfirmation) || l.needsConfirmation === void 0) &&
          (T.string(l.description) || l.description === void 0)
        );
      }
      d.is = _;
    })(P || (t.ChangeAnnotation = P = {}));
    var Z;
    (function (d) {
      function x(_) {
        var g = _;
        return T.string(g);
      }
      d.is = x;
    })(Z || (t.ChangeAnnotationIdentifier = Z = {}));
    var ye;
    (function (d) {
      function x(C, F, oe) {
        return { range: C, newText: F, annotationId: oe };
      }
      d.replace = x;
      function _(C, F, oe) {
        return { range: { start: C, end: C }, newText: F, annotationId: oe };
      }
      d.insert = _;
      function g(C, F) {
        return { range: C, newText: '', annotationId: F };
      }
      d.del = g;
      function l(C) {
        var F = C;
        return V.is(F) && (P.is(F.annotationId) || Z.is(F.annotationId));
      }
      d.is = l;
    })(ye || (t.AnnotatedTextEdit = ye = {}));
    var fe;
    (function (d) {
      function x(g, l) {
        return { textDocument: g, edits: l };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.defined(l) && $e.is(l.textDocument) && Array.isArray(l.edits);
      }
      d.is = _;
    })(fe || (t.TextDocumentEdit = fe = {}));
    var ge;
    (function (d) {
      function x(g, l, C) {
        var F = { kind: 'create', uri: g };
        return (
          l !== void 0 &&
            (l.overwrite !== void 0 || l.ignoreIfExists !== void 0) &&
            (F.options = l),
          C !== void 0 && (F.annotationId = C),
          F
        );
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          l &&
          l.kind === 'create' &&
          T.string(l.uri) &&
          (l.options === void 0 ||
            ((l.options.overwrite === void 0 || T.boolean(l.options.overwrite)) &&
              (l.options.ignoreIfExists === void 0 || T.boolean(l.options.ignoreIfExists)))) &&
          (l.annotationId === void 0 || Z.is(l.annotationId))
        );
      }
      d.is = _;
    })(ge || (t.CreateFile = ge = {}));
    var Fe;
    (function (d) {
      function x(g, l, C, F) {
        var oe = { kind: 'rename', oldUri: g, newUri: l };
        return (
          C !== void 0 &&
            (C.overwrite !== void 0 || C.ignoreIfExists !== void 0) &&
            (oe.options = C),
          F !== void 0 && (oe.annotationId = F),
          oe
        );
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          l &&
          l.kind === 'rename' &&
          T.string(l.oldUri) &&
          T.string(l.newUri) &&
          (l.options === void 0 ||
            ((l.options.overwrite === void 0 || T.boolean(l.options.overwrite)) &&
              (l.options.ignoreIfExists === void 0 || T.boolean(l.options.ignoreIfExists)))) &&
          (l.annotationId === void 0 || Z.is(l.annotationId))
        );
      }
      d.is = _;
    })(Fe || (t.RenameFile = Fe = {}));
    var ue;
    (function (d) {
      function x(g, l, C) {
        var F = { kind: 'delete', uri: g };
        return (
          l !== void 0 &&
            (l.recursive !== void 0 || l.ignoreIfNotExists !== void 0) &&
            (F.options = l),
          C !== void 0 && (F.annotationId = C),
          F
        );
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          l &&
          l.kind === 'delete' &&
          T.string(l.uri) &&
          (l.options === void 0 ||
            ((l.options.recursive === void 0 || T.boolean(l.options.recursive)) &&
              (l.options.ignoreIfNotExists === void 0 ||
                T.boolean(l.options.ignoreIfNotExists)))) &&
          (l.annotationId === void 0 || Z.is(l.annotationId))
        );
      }
      d.is = _;
    })(ue || (t.DeleteFile = ue = {}));
    var $;
    (function (d) {
      function x(_) {
        var g = _;
        return (
          g &&
          (g.changes !== void 0 || g.documentChanges !== void 0) &&
          (g.documentChanges === void 0 ||
            g.documentChanges.every(function (l) {
              return T.string(l.kind) ? ge.is(l) || Fe.is(l) || ue.is(l) : fe.is(l);
            }))
        );
      }
      d.is = x;
    })($ || (t.WorkspaceEdit = $ = {}));
    var ee = (function () {
        function d(x, _) {
          ((this.edits = x), (this.changeAnnotations = _));
        }
        return (
          (d.prototype.insert = function (x, _, g) {
            var l, C;
            if (
              (g === void 0
                ? (l = V.insert(x, _))
                : Z.is(g)
                  ? ((C = g), (l = ye.insert(x, _, g)))
                  : (this.assertChangeAnnotations(this.changeAnnotations),
                    (C = this.changeAnnotations.manage(g)),
                    (l = ye.insert(x, _, C))),
              this.edits.push(l),
              C !== void 0)
            )
              return C;
          }),
          (d.prototype.replace = function (x, _, g) {
            var l, C;
            if (
              (g === void 0
                ? (l = V.replace(x, _))
                : Z.is(g)
                  ? ((C = g), (l = ye.replace(x, _, g)))
                  : (this.assertChangeAnnotations(this.changeAnnotations),
                    (C = this.changeAnnotations.manage(g)),
                    (l = ye.replace(x, _, C))),
              this.edits.push(l),
              C !== void 0)
            )
              return C;
          }),
          (d.prototype.delete = function (x, _) {
            var g, l;
            if (
              (_ === void 0
                ? (g = V.del(x))
                : Z.is(_)
                  ? ((l = _), (g = ye.del(x, _)))
                  : (this.assertChangeAnnotations(this.changeAnnotations),
                    (l = this.changeAnnotations.manage(_)),
                    (g = ye.del(x, l))),
              this.edits.push(g),
              l !== void 0)
            )
              return l;
          }),
          (d.prototype.add = function (x) {
            this.edits.push(x);
          }),
          (d.prototype.all = function () {
            return this.edits;
          }),
          (d.prototype.clear = function () {
            this.edits.splice(0, this.edits.length);
          }),
          (d.prototype.assertChangeAnnotations = function (x) {
            if (x === void 0)
              throw new Error('Text edit change is not configured to manage change annotations.');
          }),
          d
        );
      })(),
      te = (function () {
        function d(x) {
          ((this._annotations = x === void 0 ? Object.create(null) : x),
            (this._counter = 0),
            (this._size = 0));
        }
        return (
          (d.prototype.all = function () {
            return this._annotations;
          }),
          Object.defineProperty(d.prototype, 'size', {
            get: function () {
              return this._size;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (d.prototype.manage = function (x, _) {
            var g;
            if (
              (Z.is(x) ? (g = x) : ((g = this.nextId()), (_ = x)), this._annotations[g] !== void 0)
            )
              throw new Error('Id '.concat(g, ' is already in use.'));
            if (_ === void 0) throw new Error('No annotation provided for id '.concat(g));
            return ((this._annotations[g] = _), this._size++, g);
          }),
          (d.prototype.nextId = function () {
            return (this._counter++, this._counter.toString());
          }),
          d
        );
      })(),
      _e = (function () {
        function d(x) {
          var _ = this;
          ((this._textEditChanges = Object.create(null)),
            x !== void 0
              ? ((this._workspaceEdit = x),
                x.documentChanges
                  ? ((this._changeAnnotations = new te(x.changeAnnotations)),
                    (x.changeAnnotations = this._changeAnnotations.all()),
                    x.documentChanges.forEach(function (g) {
                      if (fe.is(g)) {
                        var l = new ee(g.edits, _._changeAnnotations);
                        _._textEditChanges[g.textDocument.uri] = l;
                      }
                    }))
                  : x.changes &&
                    Object.keys(x.changes).forEach(function (g) {
                      var l = new ee(x.changes[g]);
                      _._textEditChanges[g] = l;
                    }))
              : (this._workspaceEdit = {}));
        }
        return (
          Object.defineProperty(d.prototype, 'edit', {
            get: function () {
              return (
                this.initDocumentChanges(),
                this._changeAnnotations !== void 0 &&
                  (this._changeAnnotations.size === 0
                    ? (this._workspaceEdit.changeAnnotations = void 0)
                    : (this._workspaceEdit.changeAnnotations = this._changeAnnotations.all())),
                this._workspaceEdit
              );
            },
            enumerable: !1,
            configurable: !0,
          }),
          (d.prototype.getTextEditChange = function (x) {
            if ($e.is(x)) {
              if ((this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0))
                throw new Error('Workspace edit is not configured for document changes.');
              var _ = { uri: x.uri, version: x.version },
                g = this._textEditChanges[_.uri];
              if (!g) {
                var l = [],
                  C = { textDocument: _, edits: l };
                (this._workspaceEdit.documentChanges.push(C),
                  (g = new ee(l, this._changeAnnotations)),
                  (this._textEditChanges[_.uri] = g));
              }
              return g;
            } else {
              if ((this.initChanges(), this._workspaceEdit.changes === void 0))
                throw new Error('Workspace edit is not configured for normal text edit changes.');
              var g = this._textEditChanges[x];
              if (!g) {
                var l = [];
                ((this._workspaceEdit.changes[x] = l),
                  (g = new ee(l)),
                  (this._textEditChanges[x] = g));
              }
              return g;
            }
          }),
          (d.prototype.initDocumentChanges = function () {
            this._workspaceEdit.documentChanges === void 0 &&
              this._workspaceEdit.changes === void 0 &&
              ((this._changeAnnotations = new te()),
              (this._workspaceEdit.documentChanges = []),
              (this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()));
          }),
          (d.prototype.initChanges = function () {
            this._workspaceEdit.documentChanges === void 0 &&
              this._workspaceEdit.changes === void 0 &&
              (this._workspaceEdit.changes = Object.create(null));
          }),
          (d.prototype.createFile = function (x, _, g) {
            if ((this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0))
              throw new Error('Workspace edit is not configured for document changes.');
            var l;
            P.is(_) || Z.is(_) ? (l = _) : (g = _);
            var C, F;
            if (
              (l === void 0
                ? (C = ge.create(x, g))
                : ((F = Z.is(l) ? l : this._changeAnnotations.manage(l)), (C = ge.create(x, g, F))),
              this._workspaceEdit.documentChanges.push(C),
              F !== void 0)
            )
              return F;
          }),
          (d.prototype.renameFile = function (x, _, g, l) {
            if ((this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0))
              throw new Error('Workspace edit is not configured for document changes.');
            var C;
            P.is(g) || Z.is(g) ? (C = g) : (l = g);
            var F, oe;
            if (
              (C === void 0
                ? (F = Fe.create(x, _, l))
                : ((oe = Z.is(C) ? C : this._changeAnnotations.manage(C)),
                  (F = Fe.create(x, _, l, oe))),
              this._workspaceEdit.documentChanges.push(F),
              oe !== void 0)
            )
              return oe;
          }),
          (d.prototype.deleteFile = function (x, _, g) {
            if ((this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0))
              throw new Error('Workspace edit is not configured for document changes.');
            var l;
            P.is(_) || Z.is(_) ? (l = _) : (g = _);
            var C, F;
            if (
              (l === void 0
                ? (C = ue.create(x, g))
                : ((F = Z.is(l) ? l : this._changeAnnotations.manage(l)), (C = ue.create(x, g, F))),
              this._workspaceEdit.documentChanges.push(C),
              F !== void 0)
            )
              return F;
          }),
          d
        );
      })();
    t.WorkspaceChange = _e;
    var De;
    (function (d) {
      function x(g) {
        return { uri: g };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.defined(l) && T.string(l.uri);
      }
      d.is = _;
    })(De || (t.TextDocumentIdentifier = De = {}));
    var Xe;
    (function (d) {
      function x(g, l) {
        return { uri: g, version: l };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.defined(l) && T.string(l.uri) && T.integer(l.version);
      }
      d.is = _;
    })(Xe || (t.VersionedTextDocumentIdentifier = Xe = {}));
    var $e;
    (function (d) {
      function x(g, l) {
        return { uri: g, version: l };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.defined(l) && T.string(l.uri) && (l.version === null || T.integer(l.version));
      }
      d.is = _;
    })($e || (t.OptionalVersionedTextDocumentIdentifier = $e = {}));
    var v;
    (function (d) {
      function x(g, l, C, F) {
        return { uri: g, languageId: l, version: C, text: F };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          T.defined(l) &&
          T.string(l.uri) &&
          T.string(l.languageId) &&
          T.integer(l.version) &&
          T.string(l.text)
        );
      }
      d.is = _;
    })(v || (t.TextDocumentItem = v = {}));
    var ze;
    (function (d) {
      ((d.PlainText = 'plaintext'), (d.Markdown = 'markdown'));
      function x(_) {
        var g = _;
        return g === d.PlainText || g === d.Markdown;
      }
      d.is = x;
    })(ze || (t.MarkupKind = ze = {}));
    var et;
    (function (d) {
      function x(_) {
        var g = _;
        return T.objectLiteral(_) && ze.is(g.kind) && T.string(g.value);
      }
      d.is = x;
    })(et || (t.MarkupContent = et = {}));
    var k;
    (function (d) {
      ((d.Text = 1),
        (d.Method = 2),
        (d.Function = 3),
        (d.Constructor = 4),
        (d.Field = 5),
        (d.Variable = 6),
        (d.Class = 7),
        (d.Interface = 8),
        (d.Module = 9),
        (d.Property = 10),
        (d.Unit = 11),
        (d.Value = 12),
        (d.Enum = 13),
        (d.Keyword = 14),
        (d.Snippet = 15),
        (d.Color = 16),
        (d.File = 17),
        (d.Reference = 18),
        (d.Folder = 19),
        (d.EnumMember = 20),
        (d.Constant = 21),
        (d.Struct = 22),
        (d.Event = 23),
        (d.Operator = 24),
        (d.TypeParameter = 25));
    })(k || (t.CompletionItemKind = k = {}));
    var Ue;
    (function (d) {
      ((d.PlainText = 1), (d.Snippet = 2));
    })(Ue || (t.InsertTextFormat = Ue = {}));
    var St;
    (function (d) {
      d.Deprecated = 1;
    })(St || (t.CompletionItemTag = St = {}));
    var ln;
    (function (d) {
      function x(g, l, C) {
        return { newText: g, insert: l, replace: C };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return l && T.string(l.newText) && a.is(l.insert) && a.is(l.replace);
      }
      d.is = _;
    })(ln || (t.InsertReplaceEdit = ln = {}));
    var Xt;
    (function (d) {
      ((d.asIs = 1), (d.adjustIndentation = 2));
    })(Xt || (t.InsertTextMode = Xt = {}));
    var Ae;
    (function (d) {
      function x(_) {
        var g = _;
        return (
          g &&
          (T.string(g.detail) || g.detail === void 0) &&
          (T.string(g.description) || g.description === void 0)
        );
      }
      d.is = x;
    })(Ae || (t.CompletionItemLabelDetails = Ae = {}));
    var $t;
    (function (d) {
      function x(_) {
        return { label: _ };
      }
      d.create = x;
    })($t || (t.CompletionItem = $t = {}));
    var ht;
    (function (d) {
      function x(_, g) {
        return { items: _ || [], isIncomplete: !!g };
      }
      d.create = x;
    })(ht || (t.CompletionList = ht = {}));
    var mt;
    (function (d) {
      function x(g) {
        return g.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
      }
      d.fromPlainText = x;
      function _(g) {
        var l = g;
        return T.string(l) || (T.objectLiteral(l) && T.string(l.language) && T.string(l.value));
      }
      d.is = _;
    })(mt || (t.MarkedString = mt = {}));
    var Ye;
    (function (d) {
      function x(_) {
        var g = _;
        return (
          !!g &&
          T.objectLiteral(g) &&
          (et.is(g.contents) || mt.is(g.contents) || T.typedArray(g.contents, mt.is)) &&
          (_.range === void 0 || a.is(_.range))
        );
      }
      d.is = x;
    })(Ye || (t.Hover = Ye = {}));
    var fn;
    (function (d) {
      function x(_, g) {
        return g ? { label: _, documentation: g } : { label: _ };
      }
      d.create = x;
    })(fn || (t.ParameterInformation = fn = {}));
    var ir;
    (function (d) {
      function x(_, g) {
        for (var l = [], C = 2; C < arguments.length; C++) l[C - 2] = arguments[C];
        var F = { label: _ };
        return (
          T.defined(g) && (F.documentation = g),
          T.defined(l) ? (F.parameters = l) : (F.parameters = []),
          F
        );
      }
      d.create = x;
    })(ir || (t.SignatureInformation = ir = {}));
    var Yt;
    (function (d) {
      ((d.Text = 1), (d.Read = 2), (d.Write = 3));
    })(Yt || (t.DocumentHighlightKind = Yt = {}));
    var On;
    (function (d) {
      function x(_, g) {
        var l = { range: _ };
        return (T.number(g) && (l.kind = g), l);
      }
      d.create = x;
    })(On || (t.DocumentHighlight = On = {}));
    var en;
    (function (d) {
      ((d.File = 1),
        (d.Module = 2),
        (d.Namespace = 3),
        (d.Package = 4),
        (d.Class = 5),
        (d.Method = 6),
        (d.Property = 7),
        (d.Field = 8),
        (d.Constructor = 9),
        (d.Enum = 10),
        (d.Interface = 11),
        (d.Function = 12),
        (d.Variable = 13),
        (d.Constant = 14),
        (d.String = 15),
        (d.Number = 16),
        (d.Boolean = 17),
        (d.Array = 18),
        (d.Object = 19),
        (d.Key = 20),
        (d.Null = 21),
        (d.EnumMember = 22),
        (d.Struct = 23),
        (d.Event = 24),
        (d.Operator = 25),
        (d.TypeParameter = 26));
    })(en || (t.SymbolKind = en = {}));
    var or;
    (function (d) {
      d.Deprecated = 1;
    })(or || (t.SymbolTag = or = {}));
    var Rt;
    (function (d) {
      function x(_, g, l, C, F) {
        var oe = { name: _, kind: g, location: { uri: C, range: l } };
        return (F && (oe.containerName = F), oe);
      }
      d.create = x;
    })(Rt || (t.SymbolInformation = Rt = {}));
    var jt;
    (function (d) {
      function x(_, g, l, C) {
        return C !== void 0
          ? { name: _, kind: g, location: { uri: l, range: C } }
          : { name: _, kind: g, location: { uri: l } };
      }
      d.create = x;
    })(jt || (t.WorkspaceSymbol = jt = {}));
    var sr;
    (function (d) {
      function x(g, l, C, F, oe, Pe) {
        var Se = { name: g, detail: l, kind: C, range: F, selectionRange: oe };
        return (Pe !== void 0 && (Se.children = Pe), Se);
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          l &&
          T.string(l.name) &&
          T.number(l.kind) &&
          a.is(l.range) &&
          a.is(l.selectionRange) &&
          (l.detail === void 0 || T.string(l.detail)) &&
          (l.deprecated === void 0 || T.boolean(l.deprecated)) &&
          (l.children === void 0 || Array.isArray(l.children)) &&
          (l.tags === void 0 || Array.isArray(l.tags))
        );
      }
      d.is = _;
    })(sr || (t.DocumentSymbol = sr = {}));
    var ar;
    (function (d) {
      ((d.Empty = ''),
        (d.QuickFix = 'quickfix'),
        (d.Refactor = 'refactor'),
        (d.RefactorExtract = 'refactor.extract'),
        (d.RefactorInline = 'refactor.inline'),
        (d.RefactorRewrite = 'refactor.rewrite'),
        (d.Source = 'source'),
        (d.SourceOrganizeImports = 'source.organizeImports'),
        (d.SourceFixAll = 'source.fixAll'));
    })(ar || (t.CodeActionKind = ar = {}));
    var At;
    (function (d) {
      ((d.Invoked = 1), (d.Automatic = 2));
    })(At || (t.CodeActionTriggerKind = At = {}));
    var In;
    (function (d) {
      function x(g, l, C) {
        var F = { diagnostics: g };
        return (l != null && (F.only = l), C != null && (F.triggerKind = C), F);
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          T.defined(l) &&
          T.typedArray(l.diagnostics, w.is) &&
          (l.only === void 0 || T.typedArray(l.only, T.string)) &&
          (l.triggerKind === void 0 ||
            l.triggerKind === At.Invoked ||
            l.triggerKind === At.Automatic)
        );
      }
      d.is = _;
    })(In || (t.CodeActionContext = In = {}));
    var Fn;
    (function (d) {
      function x(g, l, C) {
        var F = { title: g },
          oe = !0;
        return (
          typeof l == 'string'
            ? ((oe = !1), (F.kind = l))
            : N.is(l)
              ? (F.command = l)
              : (F.edit = l),
          oe && C !== void 0 && (F.kind = C),
          F
        );
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          l &&
          T.string(l.title) &&
          (l.diagnostics === void 0 || T.typedArray(l.diagnostics, w.is)) &&
          (l.kind === void 0 || T.string(l.kind)) &&
          (l.edit !== void 0 || l.command !== void 0) &&
          (l.command === void 0 || N.is(l.command)) &&
          (l.isPreferred === void 0 || T.boolean(l.isPreferred)) &&
          (l.edit === void 0 || $.is(l.edit))
        );
      }
      d.is = _;
    })(Fn || (t.CodeAction = Fn = {}));
    var E;
    (function (d) {
      function x(g, l) {
        var C = { range: g };
        return (T.defined(l) && (C.data = l), C);
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.defined(l) && a.is(l.range) && (T.undefined(l.command) || N.is(l.command));
      }
      d.is = _;
    })(E || (t.CodeLens = E = {}));
    var B;
    (function (d) {
      function x(g, l) {
        return { tabSize: g, insertSpaces: l };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.defined(l) && T.uinteger(l.tabSize) && T.boolean(l.insertSpaces);
      }
      d.is = _;
    })(B || (t.FormattingOptions = B = {}));
    var Q;
    (function (d) {
      function x(g, l, C) {
        return { range: g, target: l, data: C };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.defined(l) && a.is(l.range) && (T.undefined(l.target) || T.string(l.target));
      }
      d.is = _;
    })(Q || (t.DocumentLink = Q = {}));
    var y;
    (function (d) {
      function x(g, l) {
        return { range: g, parent: l };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.objectLiteral(l) && a.is(l.range) && (l.parent === void 0 || d.is(l.parent));
      }
      d.is = _;
    })(y || (t.SelectionRange = y = {}));
    var D;
    (function (d) {
      ((d.namespace = 'namespace'),
        (d.type = 'type'),
        (d.class = 'class'),
        (d.enum = 'enum'),
        (d.interface = 'interface'),
        (d.struct = 'struct'),
        (d.typeParameter = 'typeParameter'),
        (d.parameter = 'parameter'),
        (d.variable = 'variable'),
        (d.property = 'property'),
        (d.enumMember = 'enumMember'),
        (d.event = 'event'),
        (d.function = 'function'),
        (d.method = 'method'),
        (d.macro = 'macro'),
        (d.keyword = 'keyword'),
        (d.modifier = 'modifier'),
        (d.comment = 'comment'),
        (d.string = 'string'),
        (d.number = 'number'),
        (d.regexp = 'regexp'),
        (d.operator = 'operator'),
        (d.decorator = 'decorator'));
    })(D || (t.SemanticTokenTypes = D = {}));
    var M;
    (function (d) {
      ((d.declaration = 'declaration'),
        (d.definition = 'definition'),
        (d.readonly = 'readonly'),
        (d.static = 'static'),
        (d.deprecated = 'deprecated'),
        (d.abstract = 'abstract'),
        (d.async = 'async'),
        (d.modification = 'modification'),
        (d.documentation = 'documentation'),
        (d.defaultLibrary = 'defaultLibrary'));
    })(M || (t.SemanticTokenModifiers = M = {}));
    var U;
    (function (d) {
      function x(_) {
        var g = _;
        return (
          T.objectLiteral(g) &&
          (g.resultId === void 0 || typeof g.resultId == 'string') &&
          Array.isArray(g.data) &&
          (g.data.length === 0 || typeof g.data[0] == 'number')
        );
      }
      d.is = x;
    })(U || (t.SemanticTokens = U = {}));
    var ce;
    (function (d) {
      function x(g, l) {
        return { range: g, text: l };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return l != null && a.is(l.range) && T.string(l.text);
      }
      d.is = _;
    })(ce || (t.InlineValueText = ce = {}));
    var pe;
    (function (d) {
      function x(g, l, C) {
        return { range: g, variableName: l, caseSensitiveLookup: C };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          l != null &&
          a.is(l.range) &&
          T.boolean(l.caseSensitiveLookup) &&
          (T.string(l.variableName) || l.variableName === void 0)
        );
      }
      d.is = _;
    })(pe || (t.InlineValueVariableLookup = pe = {}));
    var xe;
    (function (d) {
      function x(g, l) {
        return { range: g, expression: l };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return l != null && a.is(l.range) && (T.string(l.expression) || l.expression === void 0);
      }
      d.is = _;
    })(xe || (t.InlineValueEvaluatableExpression = xe = {}));
    var le;
    (function (d) {
      function x(g, l) {
        return { frameId: g, stoppedLocation: l };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return T.defined(l) && a.is(g.stoppedLocation);
      }
      d.is = _;
    })(le || (t.InlineValueContext = le = {}));
    var ne;
    (function (d) {
      ((d.Type = 1), (d.Parameter = 2));
      function x(_) {
        return _ === 1 || _ === 2;
      }
      d.is = x;
    })(ne || (t.InlayHintKind = ne = {}));
    var de;
    (function (d) {
      function x(g) {
        return { value: g };
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          T.objectLiteral(l) &&
          (l.tooltip === void 0 || T.string(l.tooltip) || et.is(l.tooltip)) &&
          (l.location === void 0 || u.is(l.location)) &&
          (l.command === void 0 || N.is(l.command))
        );
      }
      d.is = _;
    })(de || (t.InlayHintLabelPart = de = {}));
    var be;
    (function (d) {
      function x(g, l, C) {
        var F = { position: g, label: l };
        return (C !== void 0 && (F.kind = C), F);
      }
      d.create = x;
      function _(g) {
        var l = g;
        return (
          (T.objectLiteral(l) &&
            s.is(l.position) &&
            (T.string(l.label) || T.typedArray(l.label, de.is)) &&
            (l.kind === void 0 || ne.is(l.kind)) &&
            l.textEdits === void 0) ||
          (T.typedArray(l.textEdits, V.is) &&
            (l.tooltip === void 0 || T.string(l.tooltip) || et.is(l.tooltip)) &&
            (l.paddingLeft === void 0 || T.boolean(l.paddingLeft)) &&
            (l.paddingRight === void 0 || T.boolean(l.paddingRight)))
        );
      }
      d.is = _;
    })(be || (t.InlayHint = be = {}));
    var qe;
    (function (d) {
      function x(_) {
        return { kind: 'snippet', value: _ };
      }
      d.createSnippet = x;
    })(qe || (t.StringValue = qe = {}));
    var Ge;
    (function (d) {
      function x(_, g, l, C) {
        return { insertText: _, filterText: g, range: l, command: C };
      }
      d.create = x;
    })(Ge || (t.InlineCompletionItem = Ge = {}));
    var Ct;
    (function (d) {
      function x(_) {
        return { items: _ };
      }
      d.create = x;
    })(Ct || (t.InlineCompletionList = Ct = {}));
    var Li;
    (function (d) {
      ((d.Invoked = 0), (d.Automatic = 1));
    })(Li || (t.InlineCompletionTriggerKind = Li = {}));
    var Sl;
    (function (d) {
      function x(_, g) {
        return { range: _, text: g };
      }
      d.create = x;
    })(Sl || (t.SelectedCompletionInfo = Sl = {}));
    var Cl;
    (function (d) {
      function x(_, g) {
        return { triggerKind: _, selectedCompletionInfo: g };
      }
      d.create = x;
    })(Cl || (t.InlineCompletionContext = Cl = {}));
    var Tl;
    ((function (d) {
      function x(_) {
        var g = _;
        return T.objectLiteral(g) && r.is(g.uri) && T.string(g.name);
      }
      d.is = x;
    })(Tl || (t.WorkspaceFolder = Tl = {})),
      (t.EOL = [
        `
`,
        `\r
`,
        '\r',
      ]));
    var Dl;
    (function (d) {
      function x(C, F, oe, Pe) {
        return new R0(C, F, oe, Pe);
      }
      d.create = x;
      function _(C) {
        var F = C;
        return !!(
          T.defined(F) &&
          T.string(F.uri) &&
          (T.undefined(F.languageId) || T.string(F.languageId)) &&
          T.uinteger(F.lineCount) &&
          T.func(F.getText) &&
          T.func(F.positionAt) &&
          T.func(F.offsetAt)
        );
      }
      d.is = _;
      function g(C, F) {
        for (
          var oe = C.getText(),
            Pe = l(F, function (ur, Mi) {
              var El = ur.range.start.line - Mi.range.start.line;
              return El === 0 ? ur.range.start.character - Mi.range.start.character : El;
            }),
            Se = oe.length,
            Bt = Pe.length - 1;
          Bt >= 0;
          Bt--
        ) {
          var Ht = Pe[Bt],
            tn = C.offsetAt(Ht.range.start),
            he = C.offsetAt(Ht.range.end);
          if (he <= Se) oe = oe.substring(0, tn) + Ht.newText + oe.substring(he, oe.length);
          else throw new Error('Overlapping edit');
          Se = tn;
        }
        return oe;
      }
      d.applyEdits = g;
      function l(C, F) {
        if (C.length <= 1) return C;
        var oe = (C.length / 2) | 0,
          Pe = C.slice(0, oe),
          Se = C.slice(oe);
        (l(Pe, F), l(Se, F));
        for (var Bt = 0, Ht = 0, tn = 0; Bt < Pe.length && Ht < Se.length; ) {
          var he = F(Pe[Bt], Se[Ht]);
          he <= 0 ? (C[tn++] = Pe[Bt++]) : (C[tn++] = Se[Ht++]);
        }
        for (; Bt < Pe.length; ) C[tn++] = Pe[Bt++];
        for (; Ht < Se.length; ) C[tn++] = Se[Ht++];
        return C;
      }
    })(Dl || (t.TextDocument = Dl = {}));
    var R0 = (function () {
        function d(x, _, g, l) {
          ((this._uri = x),
            (this._languageId = _),
            (this._version = g),
            (this._content = l),
            (this._lineOffsets = void 0));
        }
        return (
          Object.defineProperty(d.prototype, 'uri', {
            get: function () {
              return this._uri;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(d.prototype, 'languageId', {
            get: function () {
              return this._languageId;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(d.prototype, 'version', {
            get: function () {
              return this._version;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (d.prototype.getText = function (x) {
            if (x) {
              var _ = this.offsetAt(x.start),
                g = this.offsetAt(x.end);
              return this._content.substring(_, g);
            }
            return this._content;
          }),
          (d.prototype.update = function (x, _) {
            ((this._content = x.text), (this._version = _), (this._lineOffsets = void 0));
          }),
          (d.prototype.getLineOffsets = function () {
            if (this._lineOffsets === void 0) {
              for (var x = [], _ = this._content, g = !0, l = 0; l < _.length; l++) {
                g && (x.push(l), (g = !1));
                var C = _.charAt(l);
                ((g =
                  C === '\r' ||
                  C ===
                    `
`),
                  C === '\r' &&
                    l + 1 < _.length &&
                    _.charAt(l + 1) ===
                      `
` &&
                    l++);
              }
              (g && _.length > 0 && x.push(_.length), (this._lineOffsets = x));
            }
            return this._lineOffsets;
          }),
          (d.prototype.positionAt = function (x) {
            x = Math.max(Math.min(x, this._content.length), 0);
            var _ = this.getLineOffsets(),
              g = 0,
              l = _.length;
            if (l === 0) return s.create(0, x);
            for (; g < l; ) {
              var C = Math.floor((g + l) / 2);
              _[C] > x ? (l = C) : (g = C + 1);
            }
            var F = g - 1;
            return s.create(F, x - _[F]);
          }),
          (d.prototype.offsetAt = function (x) {
            var _ = this.getLineOffsets();
            if (x.line >= _.length) return this._content.length;
            if (x.line < 0) return 0;
            var g = _[x.line],
              l = x.line + 1 < _.length ? _[x.line + 1] : this._content.length;
            return Math.max(Math.min(g + x.character, l), g);
          }),
          Object.defineProperty(d.prototype, 'lineCount', {
            get: function () {
              return this.getLineOffsets().length;
            },
            enumerable: !1,
            configurable: !0,
          }),
          d
        );
      })(),
      T;
    (function (d) {
      var x = Object.prototype.toString;
      function _(he) {
        return typeof he < 'u';
      }
      d.defined = _;
      function g(he) {
        return typeof he > 'u';
      }
      d.undefined = g;
      function l(he) {
        return he === !0 || he === !1;
      }
      d.boolean = l;
      function C(he) {
        return x.call(he) === '[object String]';
      }
      d.string = C;
      function F(he) {
        return x.call(he) === '[object Number]';
      }
      d.number = F;
      function oe(he, ur, Mi) {
        return x.call(he) === '[object Number]' && ur <= he && he <= Mi;
      }
      d.numberRange = oe;
      function Pe(he) {
        return x.call(he) === '[object Number]' && -2147483648 <= he && he <= 2147483647;
      }
      d.integer = Pe;
      function Se(he) {
        return x.call(he) === '[object Number]' && 0 <= he && he <= 2147483647;
      }
      d.uinteger = Se;
      function Bt(he) {
        return x.call(he) === '[object Function]';
      }
      d.func = Bt;
      function Ht(he) {
        return he !== null && typeof he == 'object';
      }
      d.objectLiteral = Ht;
      function tn(he, ur) {
        return Array.isArray(he) && he.every(ur);
      }
      d.typedArray = tn;
    })(T || (T = {}));
  });
});
var Ee = O((yt) => {
  'use strict';
  Object.defineProperty(yt, '__esModule', { value: !0 });
  yt.ProtocolNotificationType =
    yt.ProtocolNotificationType0 =
    yt.ProtocolRequestType =
    yt.ProtocolRequestType0 =
    yt.RegistrationType =
    yt.MessageDirection =
      void 0;
  var yr = Bn(),
    ff;
  (function (e) {
    ((e.clientToServer = 'clientToServer'),
      (e.serverToClient = 'serverToClient'),
      (e.both = 'both'));
  })(ff || (yt.MessageDirection = ff = {}));
  var su = class {
    constructor(t) {
      this.method = t;
    }
  };
  yt.RegistrationType = su;
  var au = class extends yr.RequestType0 {
    constructor(t) {
      super(t);
    }
  };
  yt.ProtocolRequestType0 = au;
  var uu = class extends yr.RequestType {
    constructor(t) {
      super(t, yr.ParameterStructures.byName);
    }
  };
  yt.ProtocolRequestType = uu;
  var cu = class extends yr.NotificationType0 {
    constructor(t) {
      super(t);
    }
  };
  yt.ProtocolNotificationType0 = cu;
  var lu = class extends yr.NotificationType {
    constructor(t) {
      super(t, yr.ParameterStructures.byName);
    }
  };
  yt.ProtocolNotificationType = lu;
});
var fo = O((je) => {
  'use strict';
  Object.defineProperty(je, '__esModule', { value: !0 });
  je.objectLiteral =
    je.typedArray =
    je.stringArray =
    je.array =
    je.func =
    je.error =
    je.number =
    je.string =
    je.boolean =
      void 0;
  function wx(e) {
    return e === !0 || e === !1;
  }
  je.boolean = wx;
  function df(e) {
    return typeof e == 'string' || e instanceof String;
  }
  je.string = df;
  function kx(e) {
    return typeof e == 'number' || e instanceof Number;
  }
  je.number = kx;
  function _x(e) {
    return e instanceof Error;
  }
  je.error = _x;
  function Sx(e) {
    return typeof e == 'function';
  }
  je.func = Sx;
  function pf(e) {
    return Array.isArray(e);
  }
  je.array = pf;
  function Cx(e) {
    return pf(e) && e.every((t) => df(t));
  }
  je.stringArray = Cx;
  function Tx(e, t) {
    return Array.isArray(e) && e.every(t);
  }
  je.typedArray = Tx;
  function Dx(e) {
    return e !== null && typeof e == 'object';
  }
  je.objectLiteral = Dx;
});
var gf = O((po) => {
  'use strict';
  Object.defineProperty(po, '__esModule', { value: !0 });
  po.ImplementationRequest = void 0;
  var hf = Ee(),
    mf;
  (function (e) {
    ((e.method = 'textDocument/implementation'),
      (e.messageDirection = hf.MessageDirection.clientToServer),
      (e.type = new hf.ProtocolRequestType(e.method)));
  })(mf || (po.ImplementationRequest = mf = {}));
});
var vf = O((ho) => {
  'use strict';
  Object.defineProperty(ho, '__esModule', { value: !0 });
  ho.TypeDefinitionRequest = void 0;
  var yf = Ee(),
    bf;
  (function (e) {
    ((e.method = 'textDocument/typeDefinition'),
      (e.messageDirection = yf.MessageDirection.clientToServer),
      (e.type = new yf.ProtocolRequestType(e.method)));
  })(bf || (ho.TypeDefinitionRequest = bf = {}));
});
var kf = O((br) => {
  'use strict';
  Object.defineProperty(br, '__esModule', { value: !0 });
  br.DidChangeWorkspaceFoldersNotification = br.WorkspaceFoldersRequest = void 0;
  var mo = Ee(),
    xf;
  (function (e) {
    ((e.method = 'workspace/workspaceFolders'),
      (e.messageDirection = mo.MessageDirection.serverToClient),
      (e.type = new mo.ProtocolRequestType0(e.method)));
  })(xf || (br.WorkspaceFoldersRequest = xf = {}));
  var wf;
  (function (e) {
    ((e.method = 'workspace/didChangeWorkspaceFolders'),
      (e.messageDirection = mo.MessageDirection.clientToServer),
      (e.type = new mo.ProtocolNotificationType(e.method)));
  })(wf || (br.DidChangeWorkspaceFoldersNotification = wf = {}));
});
var Cf = O((go) => {
  'use strict';
  Object.defineProperty(go, '__esModule', { value: !0 });
  go.ConfigurationRequest = void 0;
  var _f = Ee(),
    Sf;
  (function (e) {
    ((e.method = 'workspace/configuration'),
      (e.messageDirection = _f.MessageDirection.serverToClient),
      (e.type = new _f.ProtocolRequestType(e.method)));
  })(Sf || (go.ConfigurationRequest = Sf = {}));
});
var Ef = O((vr) => {
  'use strict';
  Object.defineProperty(vr, '__esModule', { value: !0 });
  vr.ColorPresentationRequest = vr.DocumentColorRequest = void 0;
  var yo = Ee(),
    Tf;
  (function (e) {
    ((e.method = 'textDocument/documentColor'),
      (e.messageDirection = yo.MessageDirection.clientToServer),
      (e.type = new yo.ProtocolRequestType(e.method)));
  })(Tf || (vr.DocumentColorRequest = Tf = {}));
  var Df;
  (function (e) {
    ((e.method = 'textDocument/colorPresentation'),
      (e.messageDirection = yo.MessageDirection.clientToServer),
      (e.type = new yo.ProtocolRequestType(e.method)));
  })(Df || (vr.ColorPresentationRequest = Df = {}));
});
var qf = O((xr) => {
  'use strict';
  Object.defineProperty(xr, '__esModule', { value: !0 });
  xr.FoldingRangeRefreshRequest = xr.FoldingRangeRequest = void 0;
  var bo = Ee(),
    Rf;
  (function (e) {
    ((e.method = 'textDocument/foldingRange'),
      (e.messageDirection = bo.MessageDirection.clientToServer),
      (e.type = new bo.ProtocolRequestType(e.method)));
  })(Rf || (xr.FoldingRangeRequest = Rf = {}));
  var Af;
  (function (e) {
    ((e.method = 'workspace/foldingRange/refresh'),
      (e.messageDirection = bo.MessageDirection.serverToClient),
      (e.type = new bo.ProtocolRequestType0(e.method)));
  })(Af || (xr.FoldingRangeRefreshRequest = Af = {}));
});
var If = O((vo) => {
  'use strict';
  Object.defineProperty(vo, '__esModule', { value: !0 });
  vo.DeclarationRequest = void 0;
  var Pf = Ee(),
    Of;
  (function (e) {
    ((e.method = 'textDocument/declaration'),
      (e.messageDirection = Pf.MessageDirection.clientToServer),
      (e.type = new Pf.ProtocolRequestType(e.method)));
  })(Of || (vo.DeclarationRequest = Of = {}));
});
var Lf = O((xo) => {
  'use strict';
  Object.defineProperty(xo, '__esModule', { value: !0 });
  xo.SelectionRangeRequest = void 0;
  var Ff = Ee(),
    Nf;
  (function (e) {
    ((e.method = 'textDocument/selectionRange'),
      (e.messageDirection = Ff.MessageDirection.clientToServer),
      (e.type = new Ff.ProtocolRequestType(e.method)));
  })(Nf || (xo.SelectionRangeRequest = Nf = {}));
});
var Hf = O((gn) => {
  'use strict';
  Object.defineProperty(gn, '__esModule', { value: !0 });
  gn.WorkDoneProgressCancelNotification =
    gn.WorkDoneProgressCreateRequest =
    gn.WorkDoneProgress =
      void 0;
  var Ex = Bn(),
    wo = Ee(),
    Mf;
  (function (e) {
    e.type = new Ex.ProgressType();
    function t(n) {
      return n === e.type;
    }
    e.is = t;
  })(Mf || (gn.WorkDoneProgress = Mf = {}));
  var jf;
  (function (e) {
    ((e.method = 'window/workDoneProgress/create'),
      (e.messageDirection = wo.MessageDirection.serverToClient),
      (e.type = new wo.ProtocolRequestType(e.method)));
  })(jf || (gn.WorkDoneProgressCreateRequest = jf = {}));
  var Bf;
  (function (e) {
    ((e.method = 'window/workDoneProgress/cancel'),
      (e.messageDirection = wo.MessageDirection.clientToServer),
      (e.type = new wo.ProtocolNotificationType(e.method)));
  })(Bf || (gn.WorkDoneProgressCancelNotification = Bf = {}));
});
var Vf = O((yn) => {
  'use strict';
  Object.defineProperty(yn, '__esModule', { value: !0 });
  yn.CallHierarchyOutgoingCallsRequest =
    yn.CallHierarchyIncomingCallsRequest =
    yn.CallHierarchyPrepareRequest =
      void 0;
  var wr = Ee(),
    zf;
  (function (e) {
    ((e.method = 'textDocument/prepareCallHierarchy'),
      (e.messageDirection = wr.MessageDirection.clientToServer),
      (e.type = new wr.ProtocolRequestType(e.method)));
  })(zf || (yn.CallHierarchyPrepareRequest = zf = {}));
  var Uf;
  (function (e) {
    ((e.method = 'callHierarchy/incomingCalls'),
      (e.messageDirection = wr.MessageDirection.clientToServer),
      (e.type = new wr.ProtocolRequestType(e.method)));
  })(Uf || (yn.CallHierarchyIncomingCallsRequest = Uf = {}));
  var Wf;
  (function (e) {
    ((e.method = 'callHierarchy/outgoingCalls'),
      (e.messageDirection = wr.MessageDirection.clientToServer),
      (e.type = new wr.ProtocolRequestType(e.method)));
  })(Wf || (yn.CallHierarchyOutgoingCallsRequest = Wf = {}));
});
var Jf = O((bt) => {
  'use strict';
  Object.defineProperty(bt, '__esModule', { value: !0 });
  bt.SemanticTokensRefreshRequest =
    bt.SemanticTokensRangeRequest =
    bt.SemanticTokensDeltaRequest =
    bt.SemanticTokensRequest =
    bt.SemanticTokensRegistrationType =
    bt.TokenFormat =
      void 0;
  var rn = Ee(),
    $f;
  (function (e) {
    e.Relative = 'relative';
  })($f || (bt.TokenFormat = $f = {}));
  var ti;
  (function (e) {
    ((e.method = 'textDocument/semanticTokens'), (e.type = new rn.RegistrationType(e.method)));
  })(ti || (bt.SemanticTokensRegistrationType = ti = {}));
  var Yf;
  (function (e) {
    ((e.method = 'textDocument/semanticTokens/full'),
      (e.messageDirection = rn.MessageDirection.clientToServer),
      (e.type = new rn.ProtocolRequestType(e.method)),
      (e.registrationMethod = ti.method));
  })(Yf || (bt.SemanticTokensRequest = Yf = {}));
  var Gf;
  (function (e) {
    ((e.method = 'textDocument/semanticTokens/full/delta'),
      (e.messageDirection = rn.MessageDirection.clientToServer),
      (e.type = new rn.ProtocolRequestType(e.method)),
      (e.registrationMethod = ti.method));
  })(Gf || (bt.SemanticTokensDeltaRequest = Gf = {}));
  var Kf;
  (function (e) {
    ((e.method = 'textDocument/semanticTokens/range'),
      (e.messageDirection = rn.MessageDirection.clientToServer),
      (e.type = new rn.ProtocolRequestType(e.method)),
      (e.registrationMethod = ti.method));
  })(Kf || (bt.SemanticTokensRangeRequest = Kf = {}));
  var Qf;
  (function (e) {
    ((e.method = 'workspace/semanticTokens/refresh'),
      (e.messageDirection = rn.MessageDirection.serverToClient),
      (e.type = new rn.ProtocolRequestType0(e.method)));
  })(Qf || (bt.SemanticTokensRefreshRequest = Qf = {}));
});
var ed = O((ko) => {
  'use strict';
  Object.defineProperty(ko, '__esModule', { value: !0 });
  ko.ShowDocumentRequest = void 0;
  var Zf = Ee(),
    Xf;
  (function (e) {
    ((e.method = 'window/showDocument'),
      (e.messageDirection = Zf.MessageDirection.serverToClient),
      (e.type = new Zf.ProtocolRequestType(e.method)));
  })(Xf || (ko.ShowDocumentRequest = Xf = {}));
});
var rd = O((_o) => {
  'use strict';
  Object.defineProperty(_o, '__esModule', { value: !0 });
  _o.LinkedEditingRangeRequest = void 0;
  var td = Ee(),
    nd;
  (function (e) {
    ((e.method = 'textDocument/linkedEditingRange'),
      (e.messageDirection = td.MessageDirection.clientToServer),
      (e.type = new td.ProtocolRequestType(e.method)));
  })(nd || (_o.LinkedEditingRangeRequest = nd = {}));
});
var fd = O((ot) => {
  'use strict';
  Object.defineProperty(ot, '__esModule', { value: !0 });
  ot.WillDeleteFilesRequest =
    ot.DidDeleteFilesNotification =
    ot.DidRenameFilesNotification =
    ot.WillRenameFilesRequest =
    ot.DidCreateFilesNotification =
    ot.WillCreateFilesRequest =
    ot.FileOperationPatternKind =
      void 0;
  var qt = Ee(),
    id;
  (function (e) {
    ((e.file = 'file'), (e.folder = 'folder'));
  })(id || (ot.FileOperationPatternKind = id = {}));
  var od;
  (function (e) {
    ((e.method = 'workspace/willCreateFiles'),
      (e.messageDirection = qt.MessageDirection.clientToServer),
      (e.type = new qt.ProtocolRequestType(e.method)));
  })(od || (ot.WillCreateFilesRequest = od = {}));
  var sd;
  (function (e) {
    ((e.method = 'workspace/didCreateFiles'),
      (e.messageDirection = qt.MessageDirection.clientToServer),
      (e.type = new qt.ProtocolNotificationType(e.method)));
  })(sd || (ot.DidCreateFilesNotification = sd = {}));
  var ad;
  (function (e) {
    ((e.method = 'workspace/willRenameFiles'),
      (e.messageDirection = qt.MessageDirection.clientToServer),
      (e.type = new qt.ProtocolRequestType(e.method)));
  })(ad || (ot.WillRenameFilesRequest = ad = {}));
  var ud;
  (function (e) {
    ((e.method = 'workspace/didRenameFiles'),
      (e.messageDirection = qt.MessageDirection.clientToServer),
      (e.type = new qt.ProtocolNotificationType(e.method)));
  })(ud || (ot.DidRenameFilesNotification = ud = {}));
  var cd;
  (function (e) {
    ((e.method = 'workspace/didDeleteFiles'),
      (e.messageDirection = qt.MessageDirection.clientToServer),
      (e.type = new qt.ProtocolNotificationType(e.method)));
  })(cd || (ot.DidDeleteFilesNotification = cd = {}));
  var ld;
  (function (e) {
    ((e.method = 'workspace/willDeleteFiles'),
      (e.messageDirection = qt.MessageDirection.clientToServer),
      (e.type = new qt.ProtocolRequestType(e.method)));
  })(ld || (ot.WillDeleteFilesRequest = ld = {}));
});
var gd = O((bn) => {
  'use strict';
  Object.defineProperty(bn, '__esModule', { value: !0 });
  bn.MonikerRequest = bn.MonikerKind = bn.UniquenessLevel = void 0;
  var dd = Ee(),
    pd;
  (function (e) {
    ((e.document = 'document'),
      (e.project = 'project'),
      (e.group = 'group'),
      (e.scheme = 'scheme'),
      (e.global = 'global'));
  })(pd || (bn.UniquenessLevel = pd = {}));
  var hd;
  (function (e) {
    ((e.$import = 'import'), (e.$export = 'export'), (e.local = 'local'));
  })(hd || (bn.MonikerKind = hd = {}));
  var md;
  (function (e) {
    ((e.method = 'textDocument/moniker'),
      (e.messageDirection = dd.MessageDirection.clientToServer),
      (e.type = new dd.ProtocolRequestType(e.method)));
  })(md || (bn.MonikerRequest = md = {}));
});
var xd = O((vn) => {
  'use strict';
  Object.defineProperty(vn, '__esModule', { value: !0 });
  vn.TypeHierarchySubtypesRequest =
    vn.TypeHierarchySupertypesRequest =
    vn.TypeHierarchyPrepareRequest =
      void 0;
  var kr = Ee(),
    yd;
  (function (e) {
    ((e.method = 'textDocument/prepareTypeHierarchy'),
      (e.messageDirection = kr.MessageDirection.clientToServer),
      (e.type = new kr.ProtocolRequestType(e.method)));
  })(yd || (vn.TypeHierarchyPrepareRequest = yd = {}));
  var bd;
  (function (e) {
    ((e.method = 'typeHierarchy/supertypes'),
      (e.messageDirection = kr.MessageDirection.clientToServer),
      (e.type = new kr.ProtocolRequestType(e.method)));
  })(bd || (vn.TypeHierarchySupertypesRequest = bd = {}));
  var vd;
  (function (e) {
    ((e.method = 'typeHierarchy/subtypes'),
      (e.messageDirection = kr.MessageDirection.clientToServer),
      (e.type = new kr.ProtocolRequestType(e.method)));
  })(vd || (vn.TypeHierarchySubtypesRequest = vd = {}));
});
var _d = O((_r) => {
  'use strict';
  Object.defineProperty(_r, '__esModule', { value: !0 });
  _r.InlineValueRefreshRequest = _r.InlineValueRequest = void 0;
  var So = Ee(),
    wd;
  (function (e) {
    ((e.method = 'textDocument/inlineValue'),
      (e.messageDirection = So.MessageDirection.clientToServer),
      (e.type = new So.ProtocolRequestType(e.method)));
  })(wd || (_r.InlineValueRequest = wd = {}));
  var kd;
  (function (e) {
    ((e.method = 'workspace/inlineValue/refresh'),
      (e.messageDirection = So.MessageDirection.serverToClient),
      (e.type = new So.ProtocolRequestType0(e.method)));
  })(kd || (_r.InlineValueRefreshRequest = kd = {}));
});
var Dd = O((xn) => {
  'use strict';
  Object.defineProperty(xn, '__esModule', { value: !0 });
  xn.InlayHintRefreshRequest = xn.InlayHintResolveRequest = xn.InlayHintRequest = void 0;
  var Sr = Ee(),
    Sd;
  (function (e) {
    ((e.method = 'textDocument/inlayHint'),
      (e.messageDirection = Sr.MessageDirection.clientToServer),
      (e.type = new Sr.ProtocolRequestType(e.method)));
  })(Sd || (xn.InlayHintRequest = Sd = {}));
  var Cd;
  (function (e) {
    ((e.method = 'inlayHint/resolve'),
      (e.messageDirection = Sr.MessageDirection.clientToServer),
      (e.type = new Sr.ProtocolRequestType(e.method)));
  })(Cd || (xn.InlayHintResolveRequest = Cd = {}));
  var Td;
  (function (e) {
    ((e.method = 'workspace/inlayHint/refresh'),
      (e.messageDirection = Sr.MessageDirection.serverToClient),
      (e.type = new Sr.ProtocolRequestType0(e.method)));
  })(Td || (xn.InlayHintRefreshRequest = Td = {}));
});
var Id = O((Pt) => {
  'use strict';
  Object.defineProperty(Pt, '__esModule', { value: !0 });
  Pt.DiagnosticRefreshRequest =
    Pt.WorkspaceDiagnosticRequest =
    Pt.DocumentDiagnosticRequest =
    Pt.DocumentDiagnosticReportKind =
    Pt.DiagnosticServerCancellationData =
      void 0;
  var Od = Bn(),
    Rx = fo(),
    Cr = Ee(),
    Ed;
  (function (e) {
    function t(n) {
      let r = n;
      return r && Rx.boolean(r.retriggerRequest);
    }
    e.is = t;
  })(Ed || (Pt.DiagnosticServerCancellationData = Ed = {}));
  var Rd;
  (function (e) {
    ((e.Full = 'full'), (e.Unchanged = 'unchanged'));
  })(Rd || (Pt.DocumentDiagnosticReportKind = Rd = {}));
  var Ad;
  (function (e) {
    ((e.method = 'textDocument/diagnostic'),
      (e.messageDirection = Cr.MessageDirection.clientToServer),
      (e.type = new Cr.ProtocolRequestType(e.method)),
      (e.partialResult = new Od.ProgressType()));
  })(Ad || (Pt.DocumentDiagnosticRequest = Ad = {}));
  var qd;
  (function (e) {
    ((e.method = 'workspace/diagnostic'),
      (e.messageDirection = Cr.MessageDirection.clientToServer),
      (e.type = new Cr.ProtocolRequestType(e.method)),
      (e.partialResult = new Od.ProgressType()));
  })(qd || (Pt.WorkspaceDiagnosticRequest = qd = {}));
  var Pd;
  (function (e) {
    ((e.method = 'workspace/diagnostic/refresh'),
      (e.messageDirection = Cr.MessageDirection.serverToClient),
      (e.type = new Cr.ProtocolRequestType0(e.method)));
  })(Pd || (Pt.DiagnosticRefreshRequest = Pd = {}));
});
var Hd = O((Oe) => {
  'use strict';
  Object.defineProperty(Oe, '__esModule', { value: !0 });
  Oe.DidCloseNotebookDocumentNotification =
    Oe.DidSaveNotebookDocumentNotification =
    Oe.DidChangeNotebookDocumentNotification =
    Oe.NotebookCellArrayChange =
    Oe.DidOpenNotebookDocumentNotification =
    Oe.NotebookDocumentSyncRegistrationType =
    Oe.NotebookDocument =
    Oe.NotebookCell =
    Oe.ExecutionSummary =
    Oe.NotebookCellKind =
      void 0;
  var ni = lo(),
    Ut = fo(),
    Gt = Ee(),
    fu;
  (function (e) {
    ((e.Markup = 1), (e.Code = 2));
    function t(n) {
      return n === 1 || n === 2;
    }
    e.is = t;
  })(fu || (Oe.NotebookCellKind = fu = {}));
  var du;
  (function (e) {
    function t(i, o) {
      let s = { executionOrder: i };
      return ((o === !0 || o === !1) && (s.success = o), s);
    }
    e.create = t;
    function n(i) {
      let o = i;
      return (
        Ut.objectLiteral(o) &&
        ni.uinteger.is(o.executionOrder) &&
        (o.success === void 0 || Ut.boolean(o.success))
      );
    }
    e.is = n;
    function r(i, o) {
      return i === o
        ? !0
        : i == null || o === null || o === void 0
          ? !1
          : i.executionOrder === o.executionOrder && i.success === o.success;
    }
    e.equals = r;
  })(du || (Oe.ExecutionSummary = du = {}));
  var Co;
  (function (e) {
    function t(o, s) {
      return { kind: o, document: s };
    }
    e.create = t;
    function n(o) {
      let s = o;
      return (
        Ut.objectLiteral(s) &&
        fu.is(s.kind) &&
        ni.DocumentUri.is(s.document) &&
        (s.metadata === void 0 || Ut.objectLiteral(s.metadata))
      );
    }
    e.is = n;
    function r(o, s) {
      let a = new Set();
      return (
        o.document !== s.document && a.add('document'),
        o.kind !== s.kind && a.add('kind'),
        o.executionSummary !== s.executionSummary && a.add('executionSummary'),
        (o.metadata !== void 0 || s.metadata !== void 0) &&
          !i(o.metadata, s.metadata) &&
          a.add('metadata'),
        (o.executionSummary !== void 0 || s.executionSummary !== void 0) &&
          !du.equals(o.executionSummary, s.executionSummary) &&
          a.add('executionSummary'),
        a
      );
    }
    e.diff = r;
    function i(o, s) {
      if (o === s) return !0;
      if (o == null || s === null || s === void 0 || typeof o != typeof s || typeof o != 'object')
        return !1;
      let a = Array.isArray(o),
        u = Array.isArray(s);
      if (a !== u) return !1;
      if (a && u) {
        if (o.length !== s.length) return !1;
        for (let c = 0; c < o.length; c++) if (!i(o[c], s[c])) return !1;
      }
      if (Ut.objectLiteral(o) && Ut.objectLiteral(s)) {
        let c = Object.keys(o),
          f = Object.keys(s);
        if (c.length !== f.length || (c.sort(), f.sort(), !i(c, f))) return !1;
        for (let p = 0; p < c.length; p++) {
          let m = c[p];
          if (!i(o[m], s[m])) return !1;
        }
      }
      return !0;
    }
  })(Co || (Oe.NotebookCell = Co = {}));
  var Fd;
  (function (e) {
    function t(r, i, o, s) {
      return { uri: r, notebookType: i, version: o, cells: s };
    }
    e.create = t;
    function n(r) {
      let i = r;
      return (
        Ut.objectLiteral(i) &&
        Ut.string(i.uri) &&
        ni.integer.is(i.version) &&
        Ut.typedArray(i.cells, Co.is)
      );
    }
    e.is = n;
  })(Fd || (Oe.NotebookDocument = Fd = {}));
  var Tr;
  (function (e) {
    ((e.method = 'notebookDocument/sync'),
      (e.messageDirection = Gt.MessageDirection.clientToServer),
      (e.type = new Gt.RegistrationType(e.method)));
  })(Tr || (Oe.NotebookDocumentSyncRegistrationType = Tr = {}));
  var Nd;
  (function (e) {
    ((e.method = 'notebookDocument/didOpen'),
      (e.messageDirection = Gt.MessageDirection.clientToServer),
      (e.type = new Gt.ProtocolNotificationType(e.method)),
      (e.registrationMethod = Tr.method));
  })(Nd || (Oe.DidOpenNotebookDocumentNotification = Nd = {}));
  var Ld;
  (function (e) {
    function t(r) {
      let i = r;
      return (
        Ut.objectLiteral(i) &&
        ni.uinteger.is(i.start) &&
        ni.uinteger.is(i.deleteCount) &&
        (i.cells === void 0 || Ut.typedArray(i.cells, Co.is))
      );
    }
    e.is = t;
    function n(r, i, o) {
      let s = { start: r, deleteCount: i };
      return (o !== void 0 && (s.cells = o), s);
    }
    e.create = n;
  })(Ld || (Oe.NotebookCellArrayChange = Ld = {}));
  var Md;
  (function (e) {
    ((e.method = 'notebookDocument/didChange'),
      (e.messageDirection = Gt.MessageDirection.clientToServer),
      (e.type = new Gt.ProtocolNotificationType(e.method)),
      (e.registrationMethod = Tr.method));
  })(Md || (Oe.DidChangeNotebookDocumentNotification = Md = {}));
  var jd;
  (function (e) {
    ((e.method = 'notebookDocument/didSave'),
      (e.messageDirection = Gt.MessageDirection.clientToServer),
      (e.type = new Gt.ProtocolNotificationType(e.method)),
      (e.registrationMethod = Tr.method));
  })(jd || (Oe.DidSaveNotebookDocumentNotification = jd = {}));
  var Bd;
  (function (e) {
    ((e.method = 'notebookDocument/didClose'),
      (e.messageDirection = Gt.MessageDirection.clientToServer),
      (e.type = new Gt.ProtocolNotificationType(e.method)),
      (e.registrationMethod = Tr.method));
  })(Bd || (Oe.DidCloseNotebookDocumentNotification = Bd = {}));
});
var Wd = O((To) => {
  'use strict';
  Object.defineProperty(To, '__esModule', { value: !0 });
  To.InlineCompletionRequest = void 0;
  var zd = Ee(),
    Ud;
  (function (e) {
    ((e.method = 'textDocument/inlineCompletion'),
      (e.messageDirection = zd.MessageDirection.clientToServer),
      (e.type = new zd.ProtocolRequestType(e.method)));
  })(Ud || (To.InlineCompletionRequest = Ud = {}));
});
var rh = O((b) => {
  'use strict';
  Object.defineProperty(b, '__esModule', { value: !0 });
  b.WorkspaceSymbolRequest =
    b.CodeActionResolveRequest =
    b.CodeActionRequest =
    b.DocumentSymbolRequest =
    b.DocumentHighlightRequest =
    b.ReferencesRequest =
    b.DefinitionRequest =
    b.SignatureHelpRequest =
    b.SignatureHelpTriggerKind =
    b.HoverRequest =
    b.CompletionResolveRequest =
    b.CompletionRequest =
    b.CompletionTriggerKind =
    b.PublishDiagnosticsNotification =
    b.WatchKind =
    b.RelativePattern =
    b.FileChangeType =
    b.DidChangeWatchedFilesNotification =
    b.WillSaveTextDocumentWaitUntilRequest =
    b.WillSaveTextDocumentNotification =
    b.TextDocumentSaveReason =
    b.DidSaveTextDocumentNotification =
    b.DidCloseTextDocumentNotification =
    b.DidChangeTextDocumentNotification =
    b.TextDocumentContentChangeEvent =
    b.DidOpenTextDocumentNotification =
    b.TextDocumentSyncKind =
    b.TelemetryEventNotification =
    b.LogMessageNotification =
    b.ShowMessageRequest =
    b.ShowMessageNotification =
    b.MessageType =
    b.DidChangeConfigurationNotification =
    b.ExitNotification =
    b.ShutdownRequest =
    b.InitializedNotification =
    b.InitializeErrorCodes =
    b.InitializeRequest =
    b.WorkDoneProgressOptions =
    b.TextDocumentRegistrationOptions =
    b.StaticRegistrationOptions =
    b.PositionEncodingKind =
    b.FailureHandlingKind =
    b.ResourceOperationKind =
    b.UnregistrationRequest =
    b.RegistrationRequest =
    b.DocumentSelector =
    b.NotebookCellTextDocumentFilter =
    b.NotebookDocumentFilter =
    b.TextDocumentFilter =
      void 0;
  b.MonikerRequest =
    b.MonikerKind =
    b.UniquenessLevel =
    b.WillDeleteFilesRequest =
    b.DidDeleteFilesNotification =
    b.WillRenameFilesRequest =
    b.DidRenameFilesNotification =
    b.WillCreateFilesRequest =
    b.DidCreateFilesNotification =
    b.FileOperationPatternKind =
    b.LinkedEditingRangeRequest =
    b.ShowDocumentRequest =
    b.SemanticTokensRegistrationType =
    b.SemanticTokensRefreshRequest =
    b.SemanticTokensRangeRequest =
    b.SemanticTokensDeltaRequest =
    b.SemanticTokensRequest =
    b.TokenFormat =
    b.CallHierarchyPrepareRequest =
    b.CallHierarchyOutgoingCallsRequest =
    b.CallHierarchyIncomingCallsRequest =
    b.WorkDoneProgressCancelNotification =
    b.WorkDoneProgressCreateRequest =
    b.WorkDoneProgress =
    b.SelectionRangeRequest =
    b.DeclarationRequest =
    b.FoldingRangeRefreshRequest =
    b.FoldingRangeRequest =
    b.ColorPresentationRequest =
    b.DocumentColorRequest =
    b.ConfigurationRequest =
    b.DidChangeWorkspaceFoldersNotification =
    b.WorkspaceFoldersRequest =
    b.TypeDefinitionRequest =
    b.ImplementationRequest =
    b.ApplyWorkspaceEditRequest =
    b.ExecuteCommandRequest =
    b.PrepareRenameRequest =
    b.RenameRequest =
    b.PrepareSupportDefaultBehavior =
    b.DocumentOnTypeFormattingRequest =
    b.DocumentRangesFormattingRequest =
    b.DocumentRangeFormattingRequest =
    b.DocumentFormattingRequest =
    b.DocumentLinkResolveRequest =
    b.DocumentLinkRequest =
    b.CodeLensRefreshRequest =
    b.CodeLensResolveRequest =
    b.CodeLensRequest =
    b.WorkspaceSymbolResolveRequest =
      void 0;
  b.InlineCompletionRequest =
    b.DidCloseNotebookDocumentNotification =
    b.DidSaveNotebookDocumentNotification =
    b.DidChangeNotebookDocumentNotification =
    b.NotebookCellArrayChange =
    b.DidOpenNotebookDocumentNotification =
    b.NotebookDocumentSyncRegistrationType =
    b.NotebookDocument =
    b.NotebookCell =
    b.ExecutionSummary =
    b.NotebookCellKind =
    b.DiagnosticRefreshRequest =
    b.WorkspaceDiagnosticRequest =
    b.DocumentDiagnosticRequest =
    b.DocumentDiagnosticReportKind =
    b.DiagnosticServerCancellationData =
    b.InlayHintRefreshRequest =
    b.InlayHintResolveRequest =
    b.InlayHintRequest =
    b.InlineValueRefreshRequest =
    b.InlineValueRequest =
    b.TypeHierarchySupertypesRequest =
    b.TypeHierarchySubtypesRequest =
    b.TypeHierarchyPrepareRequest =
      void 0;
  var j = Ee(),
    Vd = lo(),
    Ke = fo(),
    Ax = gf();
  Object.defineProperty(b, 'ImplementationRequest', {
    enumerable: !0,
    get: function () {
      return Ax.ImplementationRequest;
    },
  });
  var qx = vf();
  Object.defineProperty(b, 'TypeDefinitionRequest', {
    enumerable: !0,
    get: function () {
      return qx.TypeDefinitionRequest;
    },
  });
  var Xp = kf();
  Object.defineProperty(b, 'WorkspaceFoldersRequest', {
    enumerable: !0,
    get: function () {
      return Xp.WorkspaceFoldersRequest;
    },
  });
  Object.defineProperty(b, 'DidChangeWorkspaceFoldersNotification', {
    enumerable: !0,
    get: function () {
      return Xp.DidChangeWorkspaceFoldersNotification;
    },
  });
  var Px = Cf();
  Object.defineProperty(b, 'ConfigurationRequest', {
    enumerable: !0,
    get: function () {
      return Px.ConfigurationRequest;
    },
  });
  var eh = Ef();
  Object.defineProperty(b, 'DocumentColorRequest', {
    enumerable: !0,
    get: function () {
      return eh.DocumentColorRequest;
    },
  });
  Object.defineProperty(b, 'ColorPresentationRequest', {
    enumerable: !0,
    get: function () {
      return eh.ColorPresentationRequest;
    },
  });
  var th = qf();
  Object.defineProperty(b, 'FoldingRangeRequest', {
    enumerable: !0,
    get: function () {
      return th.FoldingRangeRequest;
    },
  });
  Object.defineProperty(b, 'FoldingRangeRefreshRequest', {
    enumerable: !0,
    get: function () {
      return th.FoldingRangeRefreshRequest;
    },
  });
  var Ox = If();
  Object.defineProperty(b, 'DeclarationRequest', {
    enumerable: !0,
    get: function () {
      return Ox.DeclarationRequest;
    },
  });
  var Ix = Lf();
  Object.defineProperty(b, 'SelectionRangeRequest', {
    enumerable: !0,
    get: function () {
      return Ix.SelectionRangeRequest;
    },
  });
  var yu = Hf();
  Object.defineProperty(b, 'WorkDoneProgress', {
    enumerable: !0,
    get: function () {
      return yu.WorkDoneProgress;
    },
  });
  Object.defineProperty(b, 'WorkDoneProgressCreateRequest', {
    enumerable: !0,
    get: function () {
      return yu.WorkDoneProgressCreateRequest;
    },
  });
  Object.defineProperty(b, 'WorkDoneProgressCancelNotification', {
    enumerable: !0,
    get: function () {
      return yu.WorkDoneProgressCancelNotification;
    },
  });
  var bu = Vf();
  Object.defineProperty(b, 'CallHierarchyIncomingCallsRequest', {
    enumerable: !0,
    get: function () {
      return bu.CallHierarchyIncomingCallsRequest;
    },
  });
  Object.defineProperty(b, 'CallHierarchyOutgoingCallsRequest', {
    enumerable: !0,
    get: function () {
      return bu.CallHierarchyOutgoingCallsRequest;
    },
  });
  Object.defineProperty(b, 'CallHierarchyPrepareRequest', {
    enumerable: !0,
    get: function () {
      return bu.CallHierarchyPrepareRequest;
    },
  });
  var Dr = Jf();
  Object.defineProperty(b, 'TokenFormat', {
    enumerable: !0,
    get: function () {
      return Dr.TokenFormat;
    },
  });
  Object.defineProperty(b, 'SemanticTokensRequest', {
    enumerable: !0,
    get: function () {
      return Dr.SemanticTokensRequest;
    },
  });
  Object.defineProperty(b, 'SemanticTokensDeltaRequest', {
    enumerable: !0,
    get: function () {
      return Dr.SemanticTokensDeltaRequest;
    },
  });
  Object.defineProperty(b, 'SemanticTokensRangeRequest', {
    enumerable: !0,
    get: function () {
      return Dr.SemanticTokensRangeRequest;
    },
  });
  Object.defineProperty(b, 'SemanticTokensRefreshRequest', {
    enumerable: !0,
    get: function () {
      return Dr.SemanticTokensRefreshRequest;
    },
  });
  Object.defineProperty(b, 'SemanticTokensRegistrationType', {
    enumerable: !0,
    get: function () {
      return Dr.SemanticTokensRegistrationType;
    },
  });
  var Fx = ed();
  Object.defineProperty(b, 'ShowDocumentRequest', {
    enumerable: !0,
    get: function () {
      return Fx.ShowDocumentRequest;
    },
  });
  var Nx = rd();
  Object.defineProperty(b, 'LinkedEditingRangeRequest', {
    enumerable: !0,
    get: function () {
      return Nx.LinkedEditingRangeRequest;
    },
  });
  var Hn = fd();
  Object.defineProperty(b, 'FileOperationPatternKind', {
    enumerable: !0,
    get: function () {
      return Hn.FileOperationPatternKind;
    },
  });
  Object.defineProperty(b, 'DidCreateFilesNotification', {
    enumerable: !0,
    get: function () {
      return Hn.DidCreateFilesNotification;
    },
  });
  Object.defineProperty(b, 'WillCreateFilesRequest', {
    enumerable: !0,
    get: function () {
      return Hn.WillCreateFilesRequest;
    },
  });
  Object.defineProperty(b, 'DidRenameFilesNotification', {
    enumerable: !0,
    get: function () {
      return Hn.DidRenameFilesNotification;
    },
  });
  Object.defineProperty(b, 'WillRenameFilesRequest', {
    enumerable: !0,
    get: function () {
      return Hn.WillRenameFilesRequest;
    },
  });
  Object.defineProperty(b, 'DidDeleteFilesNotification', {
    enumerable: !0,
    get: function () {
      return Hn.DidDeleteFilesNotification;
    },
  });
  Object.defineProperty(b, 'WillDeleteFilesRequest', {
    enumerable: !0,
    get: function () {
      return Hn.WillDeleteFilesRequest;
    },
  });
  var vu = gd();
  Object.defineProperty(b, 'UniquenessLevel', {
    enumerable: !0,
    get: function () {
      return vu.UniquenessLevel;
    },
  });
  Object.defineProperty(b, 'MonikerKind', {
    enumerable: !0,
    get: function () {
      return vu.MonikerKind;
    },
  });
  Object.defineProperty(b, 'MonikerRequest', {
    enumerable: !0,
    get: function () {
      return vu.MonikerRequest;
    },
  });
  var xu = xd();
  Object.defineProperty(b, 'TypeHierarchyPrepareRequest', {
    enumerable: !0,
    get: function () {
      return xu.TypeHierarchyPrepareRequest;
    },
  });
  Object.defineProperty(b, 'TypeHierarchySubtypesRequest', {
    enumerable: !0,
    get: function () {
      return xu.TypeHierarchySubtypesRequest;
    },
  });
  Object.defineProperty(b, 'TypeHierarchySupertypesRequest', {
    enumerable: !0,
    get: function () {
      return xu.TypeHierarchySupertypesRequest;
    },
  });
  var nh = _d();
  Object.defineProperty(b, 'InlineValueRequest', {
    enumerable: !0,
    get: function () {
      return nh.InlineValueRequest;
    },
  });
  Object.defineProperty(b, 'InlineValueRefreshRequest', {
    enumerable: !0,
    get: function () {
      return nh.InlineValueRefreshRequest;
    },
  });
  var wu = Dd();
  Object.defineProperty(b, 'InlayHintRequest', {
    enumerable: !0,
    get: function () {
      return wu.InlayHintRequest;
    },
  });
  Object.defineProperty(b, 'InlayHintResolveRequest', {
    enumerable: !0,
    get: function () {
      return wu.InlayHintResolveRequest;
    },
  });
  Object.defineProperty(b, 'InlayHintRefreshRequest', {
    enumerable: !0,
    get: function () {
      return wu.InlayHintRefreshRequest;
    },
  });
  var ri = Id();
  Object.defineProperty(b, 'DiagnosticServerCancellationData', {
    enumerable: !0,
    get: function () {
      return ri.DiagnosticServerCancellationData;
    },
  });
  Object.defineProperty(b, 'DocumentDiagnosticReportKind', {
    enumerable: !0,
    get: function () {
      return ri.DocumentDiagnosticReportKind;
    },
  });
  Object.defineProperty(b, 'DocumentDiagnosticRequest', {
    enumerable: !0,
    get: function () {
      return ri.DocumentDiagnosticRequest;
    },
  });
  Object.defineProperty(b, 'WorkspaceDiagnosticRequest', {
    enumerable: !0,
    get: function () {
      return ri.WorkspaceDiagnosticRequest;
    },
  });
  Object.defineProperty(b, 'DiagnosticRefreshRequest', {
    enumerable: !0,
    get: function () {
      return ri.DiagnosticRefreshRequest;
    },
  });
  var Kt = Hd();
  Object.defineProperty(b, 'NotebookCellKind', {
    enumerable: !0,
    get: function () {
      return Kt.NotebookCellKind;
    },
  });
  Object.defineProperty(b, 'ExecutionSummary', {
    enumerable: !0,
    get: function () {
      return Kt.ExecutionSummary;
    },
  });
  Object.defineProperty(b, 'NotebookCell', {
    enumerable: !0,
    get: function () {
      return Kt.NotebookCell;
    },
  });
  Object.defineProperty(b, 'NotebookDocument', {
    enumerable: !0,
    get: function () {
      return Kt.NotebookDocument;
    },
  });
  Object.defineProperty(b, 'NotebookDocumentSyncRegistrationType', {
    enumerable: !0,
    get: function () {
      return Kt.NotebookDocumentSyncRegistrationType;
    },
  });
  Object.defineProperty(b, 'DidOpenNotebookDocumentNotification', {
    enumerable: !0,
    get: function () {
      return Kt.DidOpenNotebookDocumentNotification;
    },
  });
  Object.defineProperty(b, 'NotebookCellArrayChange', {
    enumerable: !0,
    get: function () {
      return Kt.NotebookCellArrayChange;
    },
  });
  Object.defineProperty(b, 'DidChangeNotebookDocumentNotification', {
    enumerable: !0,
    get: function () {
      return Kt.DidChangeNotebookDocumentNotification;
    },
  });
  Object.defineProperty(b, 'DidSaveNotebookDocumentNotification', {
    enumerable: !0,
    get: function () {
      return Kt.DidSaveNotebookDocumentNotification;
    },
  });
  Object.defineProperty(b, 'DidCloseNotebookDocumentNotification', {
    enumerable: !0,
    get: function () {
      return Kt.DidCloseNotebookDocumentNotification;
    },
  });
  var Lx = Wd();
  Object.defineProperty(b, 'InlineCompletionRequest', {
    enumerable: !0,
    get: function () {
      return Lx.InlineCompletionRequest;
    },
  });
  var pu;
  (function (e) {
    function t(n) {
      let r = n;
      return Ke.string(r) || Ke.string(r.language) || Ke.string(r.scheme) || Ke.string(r.pattern);
    }
    e.is = t;
  })(pu || (b.TextDocumentFilter = pu = {}));
  var hu;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        Ke.objectLiteral(r) &&
        (Ke.string(r.notebookType) || Ke.string(r.scheme) || Ke.string(r.pattern))
      );
    }
    e.is = t;
  })(hu || (b.NotebookDocumentFilter = hu = {}));
  var mu;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        Ke.objectLiteral(r) &&
        (Ke.string(r.notebook) || hu.is(r.notebook)) &&
        (r.language === void 0 || Ke.string(r.language))
      );
    }
    e.is = t;
  })(mu || (b.NotebookCellTextDocumentFilter = mu = {}));
  var gu;
  (function (e) {
    function t(n) {
      if (!Array.isArray(n)) return !1;
      for (let r of n) if (!Ke.string(r) && !pu.is(r) && !mu.is(r)) return !1;
      return !0;
    }
    e.is = t;
  })(gu || (b.DocumentSelector = gu = {}));
  var $d;
  (function (e) {
    ((e.method = 'client/registerCapability'),
      (e.messageDirection = j.MessageDirection.serverToClient),
      (e.type = new j.ProtocolRequestType(e.method)));
  })($d || (b.RegistrationRequest = $d = {}));
  var Yd;
  (function (e) {
    ((e.method = 'client/unregisterCapability'),
      (e.messageDirection = j.MessageDirection.serverToClient),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Yd || (b.UnregistrationRequest = Yd = {}));
  var Gd;
  (function (e) {
    ((e.Create = 'create'), (e.Rename = 'rename'), (e.Delete = 'delete'));
  })(Gd || (b.ResourceOperationKind = Gd = {}));
  var Kd;
  (function (e) {
    ((e.Abort = 'abort'),
      (e.Transactional = 'transactional'),
      (e.TextOnlyTransactional = 'textOnlyTransactional'),
      (e.Undo = 'undo'));
  })(Kd || (b.FailureHandlingKind = Kd = {}));
  var Qd;
  (function (e) {
    ((e.UTF8 = 'utf-8'), (e.UTF16 = 'utf-16'), (e.UTF32 = 'utf-32'));
  })(Qd || (b.PositionEncodingKind = Qd = {}));
  var Jd;
  (function (e) {
    function t(n) {
      let r = n;
      return r && Ke.string(r.id) && r.id.length > 0;
    }
    e.hasId = t;
  })(Jd || (b.StaticRegistrationOptions = Jd = {}));
  var Zd;
  (function (e) {
    function t(n) {
      let r = n;
      return r && (r.documentSelector === null || gu.is(r.documentSelector));
    }
    e.is = t;
  })(Zd || (b.TextDocumentRegistrationOptions = Zd = {}));
  var Xd;
  (function (e) {
    function t(r) {
      let i = r;
      return (
        Ke.objectLiteral(i) && (i.workDoneProgress === void 0 || Ke.boolean(i.workDoneProgress))
      );
    }
    e.is = t;
    function n(r) {
      let i = r;
      return i && Ke.boolean(i.workDoneProgress);
    }
    e.hasWorkDoneProgress = n;
  })(Xd || (b.WorkDoneProgressOptions = Xd = {}));
  var ep;
  (function (e) {
    ((e.method = 'initialize'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(ep || (b.InitializeRequest = ep = {}));
  var tp;
  (function (e) {
    e.unknownProtocolVersion = 1;
  })(tp || (b.InitializeErrorCodes = tp = {}));
  var np;
  (function (e) {
    ((e.method = 'initialized'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolNotificationType(e.method)));
  })(np || (b.InitializedNotification = np = {}));
  var rp;
  (function (e) {
    ((e.method = 'shutdown'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType0(e.method)));
  })(rp || (b.ShutdownRequest = rp = {}));
  var ip;
  (function (e) {
    ((e.method = 'exit'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolNotificationType0(e.method)));
  })(ip || (b.ExitNotification = ip = {}));
  var op;
  (function (e) {
    ((e.method = 'workspace/didChangeConfiguration'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolNotificationType(e.method)));
  })(op || (b.DidChangeConfigurationNotification = op = {}));
  var sp;
  (function (e) {
    ((e.Error = 1), (e.Warning = 2), (e.Info = 3), (e.Log = 4), (e.Debug = 5));
  })(sp || (b.MessageType = sp = {}));
  var ap;
  (function (e) {
    ((e.method = 'window/showMessage'),
      (e.messageDirection = j.MessageDirection.serverToClient),
      (e.type = new j.ProtocolNotificationType(e.method)));
  })(ap || (b.ShowMessageNotification = ap = {}));
  var up;
  (function (e) {
    ((e.method = 'window/showMessageRequest'),
      (e.messageDirection = j.MessageDirection.serverToClient),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(up || (b.ShowMessageRequest = up = {}));
  var cp;
  (function (e) {
    ((e.method = 'window/logMessage'),
      (e.messageDirection = j.MessageDirection.serverToClient),
      (e.type = new j.ProtocolNotificationType(e.method)));
  })(cp || (b.LogMessageNotification = cp = {}));
  var lp;
  (function (e) {
    ((e.method = 'telemetry/event'),
      (e.messageDirection = j.MessageDirection.serverToClient),
      (e.type = new j.ProtocolNotificationType(e.method)));
  })(lp || (b.TelemetryEventNotification = lp = {}));
  var fp;
  (function (e) {
    ((e.None = 0), (e.Full = 1), (e.Incremental = 2));
  })(fp || (b.TextDocumentSyncKind = fp = {}));
  var dp;
  (function (e) {
    ((e.method = 'textDocument/didOpen'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolNotificationType(e.method)));
  })(dp || (b.DidOpenTextDocumentNotification = dp = {}));
  var pp;
  (function (e) {
    function t(r) {
      let i = r;
      return (
        i != null &&
        typeof i.text == 'string' &&
        i.range !== void 0 &&
        (i.rangeLength === void 0 || typeof i.rangeLength == 'number')
      );
    }
    e.isIncremental = t;
    function n(r) {
      let i = r;
      return (
        i != null && typeof i.text == 'string' && i.range === void 0 && i.rangeLength === void 0
      );
    }
    e.isFull = n;
  })(pp || (b.TextDocumentContentChangeEvent = pp = {}));
  var hp;
  (function (e) {
    ((e.method = 'textDocument/didChange'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolNotificationType(e.method)));
  })(hp || (b.DidChangeTextDocumentNotification = hp = {}));
  var mp;
  (function (e) {
    ((e.method = 'textDocument/didClose'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolNotificationType(e.method)));
  })(mp || (b.DidCloseTextDocumentNotification = mp = {}));
  var gp;
  (function (e) {
    ((e.method = 'textDocument/didSave'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolNotificationType(e.method)));
  })(gp || (b.DidSaveTextDocumentNotification = gp = {}));
  var yp;
  (function (e) {
    ((e.Manual = 1), (e.AfterDelay = 2), (e.FocusOut = 3));
  })(yp || (b.TextDocumentSaveReason = yp = {}));
  var bp;
  (function (e) {
    ((e.method = 'textDocument/willSave'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolNotificationType(e.method)));
  })(bp || (b.WillSaveTextDocumentNotification = bp = {}));
  var vp;
  (function (e) {
    ((e.method = 'textDocument/willSaveWaitUntil'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(vp || (b.WillSaveTextDocumentWaitUntilRequest = vp = {}));
  var xp;
  (function (e) {
    ((e.method = 'workspace/didChangeWatchedFiles'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolNotificationType(e.method)));
  })(xp || (b.DidChangeWatchedFilesNotification = xp = {}));
  var wp;
  (function (e) {
    ((e.Created = 1), (e.Changed = 2), (e.Deleted = 3));
  })(wp || (b.FileChangeType = wp = {}));
  var kp;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        Ke.objectLiteral(r) &&
        (Vd.URI.is(r.baseUri) || Vd.WorkspaceFolder.is(r.baseUri)) &&
        Ke.string(r.pattern)
      );
    }
    e.is = t;
  })(kp || (b.RelativePattern = kp = {}));
  var _p;
  (function (e) {
    ((e.Create = 1), (e.Change = 2), (e.Delete = 4));
  })(_p || (b.WatchKind = _p = {}));
  var Sp;
  (function (e) {
    ((e.method = 'textDocument/publishDiagnostics'),
      (e.messageDirection = j.MessageDirection.serverToClient),
      (e.type = new j.ProtocolNotificationType(e.method)));
  })(Sp || (b.PublishDiagnosticsNotification = Sp = {}));
  var Cp;
  (function (e) {
    ((e.Invoked = 1), (e.TriggerCharacter = 2), (e.TriggerForIncompleteCompletions = 3));
  })(Cp || (b.CompletionTriggerKind = Cp = {}));
  var Tp;
  (function (e) {
    ((e.method = 'textDocument/completion'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Tp || (b.CompletionRequest = Tp = {}));
  var Dp;
  (function (e) {
    ((e.method = 'completionItem/resolve'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Dp || (b.CompletionResolveRequest = Dp = {}));
  var Ep;
  (function (e) {
    ((e.method = 'textDocument/hover'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Ep || (b.HoverRequest = Ep = {}));
  var Rp;
  (function (e) {
    ((e.Invoked = 1), (e.TriggerCharacter = 2), (e.ContentChange = 3));
  })(Rp || (b.SignatureHelpTriggerKind = Rp = {}));
  var Ap;
  (function (e) {
    ((e.method = 'textDocument/signatureHelp'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Ap || (b.SignatureHelpRequest = Ap = {}));
  var qp;
  (function (e) {
    ((e.method = 'textDocument/definition'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(qp || (b.DefinitionRequest = qp = {}));
  var Pp;
  (function (e) {
    ((e.method = 'textDocument/references'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Pp || (b.ReferencesRequest = Pp = {}));
  var Op;
  (function (e) {
    ((e.method = 'textDocument/documentHighlight'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Op || (b.DocumentHighlightRequest = Op = {}));
  var Ip;
  (function (e) {
    ((e.method = 'textDocument/documentSymbol'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Ip || (b.DocumentSymbolRequest = Ip = {}));
  var Fp;
  (function (e) {
    ((e.method = 'textDocument/codeAction'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Fp || (b.CodeActionRequest = Fp = {}));
  var Np;
  (function (e) {
    ((e.method = 'codeAction/resolve'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Np || (b.CodeActionResolveRequest = Np = {}));
  var Lp;
  (function (e) {
    ((e.method = 'workspace/symbol'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Lp || (b.WorkspaceSymbolRequest = Lp = {}));
  var Mp;
  (function (e) {
    ((e.method = 'workspaceSymbol/resolve'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Mp || (b.WorkspaceSymbolResolveRequest = Mp = {}));
  var jp;
  (function (e) {
    ((e.method = 'textDocument/codeLens'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(jp || (b.CodeLensRequest = jp = {}));
  var Bp;
  (function (e) {
    ((e.method = 'codeLens/resolve'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Bp || (b.CodeLensResolveRequest = Bp = {}));
  var Hp;
  (function (e) {
    ((e.method = 'workspace/codeLens/refresh'),
      (e.messageDirection = j.MessageDirection.serverToClient),
      (e.type = new j.ProtocolRequestType0(e.method)));
  })(Hp || (b.CodeLensRefreshRequest = Hp = {}));
  var zp;
  (function (e) {
    ((e.method = 'textDocument/documentLink'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(zp || (b.DocumentLinkRequest = zp = {}));
  var Up;
  (function (e) {
    ((e.method = 'documentLink/resolve'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Up || (b.DocumentLinkResolveRequest = Up = {}));
  var Wp;
  (function (e) {
    ((e.method = 'textDocument/formatting'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Wp || (b.DocumentFormattingRequest = Wp = {}));
  var Vp;
  (function (e) {
    ((e.method = 'textDocument/rangeFormatting'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Vp || (b.DocumentRangeFormattingRequest = Vp = {}));
  var $p;
  (function (e) {
    ((e.method = 'textDocument/rangesFormatting'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })($p || (b.DocumentRangesFormattingRequest = $p = {}));
  var Yp;
  (function (e) {
    ((e.method = 'textDocument/onTypeFormatting'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Yp || (b.DocumentOnTypeFormattingRequest = Yp = {}));
  var Gp;
  (function (e) {
    e.Identifier = 1;
  })(Gp || (b.PrepareSupportDefaultBehavior = Gp = {}));
  var Kp;
  (function (e) {
    ((e.method = 'textDocument/rename'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Kp || (b.RenameRequest = Kp = {}));
  var Qp;
  (function (e) {
    ((e.method = 'textDocument/prepareRename'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Qp || (b.PrepareRenameRequest = Qp = {}));
  var Jp;
  (function (e) {
    ((e.method = 'workspace/executeCommand'),
      (e.messageDirection = j.MessageDirection.clientToServer),
      (e.type = new j.ProtocolRequestType(e.method)));
  })(Jp || (b.ExecuteCommandRequest = Jp = {}));
  var Zp;
  (function (e) {
    ((e.method = 'workspace/applyEdit'),
      (e.messageDirection = j.MessageDirection.serverToClient),
      (e.type = new j.ProtocolRequestType('workspace/applyEdit')));
  })(Zp || (b.ApplyWorkspaceEditRequest = Zp = {}));
});
var oh = O((Do) => {
  'use strict';
  Object.defineProperty(Do, '__esModule', { value: !0 });
  Do.createProtocolConnection = void 0;
  var ih = Bn();
  function Mx(e, t, n, r) {
    return (
      ih.ConnectionStrategy.is(r) && (r = { connectionStrategy: r }),
      (0, ih.createMessageConnection)(e, t, n, r)
    );
  }
  Do.createProtocolConnection = Mx;
});
var ah = O((vt) => {
  'use strict';
  var jx =
      (vt && vt.__createBinding) ||
      (Object.create
        ? function (e, t, n, r) {
            r === void 0 && (r = n);
            var i = Object.getOwnPropertyDescriptor(t, n);
            ((!i || ('get' in i ? !t.__esModule : i.writable || i.configurable)) &&
              (i = {
                enumerable: !0,
                get: function () {
                  return t[n];
                },
              }),
              Object.defineProperty(e, r, i));
          }
        : function (e, t, n, r) {
            (r === void 0 && (r = n), (e[r] = t[n]));
          }),
    Eo =
      (vt && vt.__exportStar) ||
      function (e, t) {
        for (var n in e)
          n !== 'default' && !Object.prototype.hasOwnProperty.call(t, n) && jx(t, e, n);
      };
  Object.defineProperty(vt, '__esModule', { value: !0 });
  vt.LSPErrorCodes = vt.createProtocolConnection = void 0;
  Eo(Bn(), vt);
  Eo(lo(), vt);
  Eo(Ee(), vt);
  Eo(rh(), vt);
  var Bx = oh();
  Object.defineProperty(vt, 'createProtocolConnection', {
    enumerable: !0,
    get: function () {
      return Bx.createProtocolConnection;
    },
  });
  var sh;
  (function (e) {
    ((e.lspReservedErrorRangeStart = -32899),
      (e.RequestFailed = -32803),
      (e.ServerCancelled = -32802),
      (e.ContentModified = -32801),
      (e.RequestCancelled = -32800),
      (e.lspReservedErrorRangeEnd = -32800));
  })(sh || (vt.LSPErrorCodes = sh = {}));
});
var Ne = O((Qt) => {
  'use strict';
  var Hx =
      (Qt && Qt.__createBinding) ||
      (Object.create
        ? function (e, t, n, r) {
            r === void 0 && (r = n);
            var i = Object.getOwnPropertyDescriptor(t, n);
            ((!i || ('get' in i ? !t.__esModule : i.writable || i.configurable)) &&
              (i = {
                enumerable: !0,
                get: function () {
                  return t[n];
                },
              }),
              Object.defineProperty(e, r, i));
          }
        : function (e, t, n, r) {
            (r === void 0 && (r = n), (e[r] = t[n]));
          }),
    uh =
      (Qt && Qt.__exportStar) ||
      function (e, t) {
        for (var n in e)
          n !== 'default' && !Object.prototype.hasOwnProperty.call(t, n) && Hx(t, e, n);
      };
  Object.defineProperty(Qt, '__esModule', { value: !0 });
  Qt.createProtocolConnection = void 0;
  var zx = ou();
  uh(ou(), Qt);
  uh(ah(), Qt);
  function Ux(e, t, n, r) {
    return (0, zx.createMessageConnection)(e, t, n, r);
  }
  Qt.createProtocolConnection = Ux;
});
var ku = O((Ot) => {
  'use strict';
  Object.defineProperty(Ot, '__esModule', { value: !0 });
  Ot.generateUuid = Ot.parse = Ot.isUUID = Ot.v4 = Ot.empty = void 0;
  var ii = class {
      constructor(t) {
        this._value = t;
      }
      asHex() {
        return this._value;
      }
      equals(t) {
        return this.asHex() === t.asHex();
      }
    },
    oi = class e extends ii {
      static _oneOf(t) {
        return t[Math.floor(t.length * Math.random())];
      }
      static _randomHex() {
        return e._oneOf(e._chars);
      }
      constructor() {
        super(
          [
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            '-',
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            '-',
            '4',
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            '-',
            e._oneOf(e._timeHighBits),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            '-',
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
            e._randomHex(),
          ].join('')
        );
      }
    };
  oi._chars = ['0', '1', '2', '3', '4', '5', '6', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  oi._timeHighBits = ['8', '9', 'a', 'b'];
  Ot.empty = new ii('00000000-0000-0000-0000-000000000000');
  function ch() {
    return new oi();
  }
  Ot.v4 = ch;
  var Wx = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  function lh(e) {
    return Wx.test(e);
  }
  Ot.isUUID = lh;
  function Vx(e) {
    if (!lh(e)) throw new Error('invalid uuid');
    return new ii(e);
  }
  Ot.parse = Vx;
  function $x() {
    return ch().asHex();
  }
  Ot.generateUuid = $x;
});
var fh = O((kn) => {
  'use strict';
  Object.defineProperty(kn, '__esModule', { value: !0 });
  kn.attachPartialResult = kn.ProgressFeature = kn.attachWorkDone = void 0;
  var wn = Ne(),
    Yx = ku(),
    zn = class e {
      constructor(t, n) {
        ((this._connection = t), (this._token = n), e.Instances.set(this._token, this));
      }
      begin(t, n, r, i) {
        let o = { kind: 'begin', title: t, percentage: n, message: r, cancellable: i };
        this._connection.sendProgress(wn.WorkDoneProgress.type, this._token, o);
      }
      report(t, n) {
        let r = { kind: 'report' };
        (typeof t == 'number'
          ? ((r.percentage = t), n !== void 0 && (r.message = n))
          : (r.message = t),
          this._connection.sendProgress(wn.WorkDoneProgress.type, this._token, r));
      }
      done() {
        (e.Instances.delete(this._token),
          this._connection.sendProgress(wn.WorkDoneProgress.type, this._token, { kind: 'end' }));
      }
    };
  zn.Instances = new Map();
  var Ro = class extends zn {
      constructor(t, n) {
        (super(t, n), (this._source = new wn.CancellationTokenSource()));
      }
      get token() {
        return this._source.token;
      }
      done() {
        (this._source.dispose(), super.done());
      }
      cancel() {
        this._source.cancel();
      }
    },
    si = class {
      constructor() {}
      begin() {}
      report() {}
      done() {}
    },
    Ao = class extends si {
      constructor() {
        (super(), (this._source = new wn.CancellationTokenSource()));
      }
      get token() {
        return this._source.token;
      }
      done() {
        this._source.dispose();
      }
      cancel() {
        this._source.cancel();
      }
    };
  function Gx(e, t) {
    if (t === void 0 || t.workDoneToken === void 0) return new si();
    let n = t.workDoneToken;
    return (delete t.workDoneToken, new zn(e, n));
  }
  kn.attachWorkDone = Gx;
  var Kx = (e) =>
    class extends e {
      constructor() {
        (super(), (this._progressSupported = !1));
      }
      initialize(t) {
        (super.initialize(t),
          t?.window?.workDoneProgress === !0 &&
            ((this._progressSupported = !0),
            this.connection.onNotification(wn.WorkDoneProgressCancelNotification.type, (n) => {
              let r = zn.Instances.get(n.token);
              (r instanceof Ro || r instanceof Ao) && r.cancel();
            })));
      }
      attachWorkDoneProgress(t) {
        return t === void 0 ? new si() : new zn(this.connection, t);
      }
      createWorkDoneProgress() {
        if (this._progressSupported) {
          let t = (0, Yx.generateUuid)();
          return this.connection
            .sendRequest(wn.WorkDoneProgressCreateRequest.type, { token: t })
            .then(() => new Ro(this.connection, t));
        } else return Promise.resolve(new Ao());
      }
    };
  kn.ProgressFeature = Kx;
  var _u;
  (function (e) {
    e.type = new wn.ProgressType();
  })(_u || (_u = {}));
  var Su = class {
    constructor(t, n) {
      ((this._connection = t), (this._token = n));
    }
    report(t) {
      this._connection.sendProgress(_u.type, this._token, t);
    }
  };
  function Qx(e, t) {
    if (t === void 0 || t.partialResultToken === void 0) return;
    let n = t.partialResultToken;
    return (delete t.partialResultToken, new Su(e, n));
  }
  kn.attachPartialResult = Qx;
});
var dh = O((qo) => {
  'use strict';
  Object.defineProperty(qo, '__esModule', { value: !0 });
  qo.ConfigurationFeature = void 0;
  var Jx = Ne(),
    Zx = Hi(),
    Xx = (e) =>
      class extends e {
        getConfiguration(t) {
          return t
            ? Zx.string(t)
              ? this._getConfiguration({ section: t })
              : this._getConfiguration(t)
            : this._getConfiguration({});
        }
        _getConfiguration(t) {
          let n = { items: Array.isArray(t) ? t : [t] };
          return this.connection
            .sendRequest(Jx.ConfigurationRequest.type, n)
            .then((r) =>
              Array.isArray(r) ? (Array.isArray(t) ? r : r[0]) : Array.isArray(t) ? [] : null
            );
        }
      };
  qo.ConfigurationFeature = Xx;
});
var ph = O((Oo) => {
  'use strict';
  Object.defineProperty(Oo, '__esModule', { value: !0 });
  Oo.WorkspaceFoldersFeature = void 0;
  var Po = Ne(),
    ew = (e) =>
      class extends e {
        constructor() {
          (super(), (this._notificationIsAutoRegistered = !1));
        }
        initialize(t) {
          super.initialize(t);
          let n = t.workspace;
          n &&
            n.workspaceFolders &&
            ((this._onDidChangeWorkspaceFolders = new Po.Emitter()),
            this.connection.onNotification(Po.DidChangeWorkspaceFoldersNotification.type, (r) => {
              this._onDidChangeWorkspaceFolders.fire(r.event);
            }));
        }
        fillServerCapabilities(t) {
          super.fillServerCapabilities(t);
          let n = t.workspace?.workspaceFolders?.changeNotifications;
          this._notificationIsAutoRegistered = n === !0 || typeof n == 'string';
        }
        getWorkspaceFolders() {
          return this.connection.sendRequest(Po.WorkspaceFoldersRequest.type);
        }
        get onDidChangeWorkspaceFolders() {
          if (!this._onDidChangeWorkspaceFolders)
            throw new Error("Client doesn't support sending workspace folder change events.");
          return (
            !this._notificationIsAutoRegistered &&
              !this._unregistration &&
              (this._unregistration = this.connection.client.register(
                Po.DidChangeWorkspaceFoldersNotification.type
              )),
            this._onDidChangeWorkspaceFolders.event
          );
        }
      };
  Oo.WorkspaceFoldersFeature = ew;
});
var hh = O((Io) => {
  'use strict';
  Object.defineProperty(Io, '__esModule', { value: !0 });
  Io.CallHierarchyFeature = void 0;
  var Cu = Ne(),
    tw = (e) =>
      class extends e {
        get callHierarchy() {
          return {
            onPrepare: (t) =>
              this.connection.onRequest(Cu.CallHierarchyPrepareRequest.type, (n, r) =>
                t(n, r, this.attachWorkDoneProgress(n), void 0)
              ),
            onIncomingCalls: (t) => {
              let n = Cu.CallHierarchyIncomingCallsRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
            onOutgoingCalls: (t) => {
              let n = Cu.CallHierarchyOutgoingCallsRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
          };
        }
      };
  Io.CallHierarchyFeature = tw;
});
var Du = O((_n) => {
  'use strict';
  Object.defineProperty(_n, '__esModule', { value: !0 });
  _n.SemanticTokensBuilder = _n.SemanticTokensDiff = _n.SemanticTokensFeature = void 0;
  var Fo = Ne(),
    nw = (e) =>
      class extends e {
        get semanticTokens() {
          return {
            refresh: () => this.connection.sendRequest(Fo.SemanticTokensRefreshRequest.type),
            on: (t) => {
              let n = Fo.SemanticTokensRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
            onDelta: (t) => {
              let n = Fo.SemanticTokensDeltaRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
            onRange: (t) => {
              let n = Fo.SemanticTokensRangeRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
          };
        }
      };
  _n.SemanticTokensFeature = nw;
  var No = class {
    constructor(t, n) {
      ((this.originalSequence = t), (this.modifiedSequence = n));
    }
    computeDiff() {
      let t = this.originalSequence.length,
        n = this.modifiedSequence.length,
        r = 0;
      for (; r < n && r < t && this.originalSequence[r] === this.modifiedSequence[r]; ) r++;
      if (r < n && r < t) {
        let i = t - 1,
          o = n - 1;
        for (; i >= r && o >= r && this.originalSequence[i] === this.modifiedSequence[o]; )
          (i--, o--);
        (i < r || o < r) && (i++, o++);
        let s = i - r + 1,
          a = this.modifiedSequence.slice(r, o + 1);
        return a.length === 1 && a[0] === this.originalSequence[i]
          ? [{ start: r, deleteCount: s - 1 }]
          : [{ start: r, deleteCount: s, data: a }];
      } else
        return r < n
          ? [{ start: r, deleteCount: 0, data: this.modifiedSequence.slice(r) }]
          : r < t
            ? [{ start: r, deleteCount: t - r }]
            : [];
    }
  };
  _n.SemanticTokensDiff = No;
  var Tu = class {
    constructor() {
      ((this._prevData = void 0), this.initialize());
    }
    initialize() {
      ((this._id = Date.now()),
        (this._prevLine = 0),
        (this._prevChar = 0),
        (this._data = []),
        (this._dataLen = 0));
    }
    push(t, n, r, i, o) {
      let s = t,
        a = n;
      (this._dataLen > 0 && ((s -= this._prevLine), s === 0 && (a -= this._prevChar)),
        (this._data[this._dataLen++] = s),
        (this._data[this._dataLen++] = a),
        (this._data[this._dataLen++] = r),
        (this._data[this._dataLen++] = i),
        (this._data[this._dataLen++] = o),
        (this._prevLine = t),
        (this._prevChar = n));
    }
    get id() {
      return this._id.toString();
    }
    previousResult(t) {
      (this.id === t && (this._prevData = this._data), this.initialize());
    }
    build() {
      return ((this._prevData = void 0), { resultId: this.id, data: this._data });
    }
    canBuildEdits() {
      return this._prevData !== void 0;
    }
    buildEdits() {
      return this._prevData !== void 0
        ? { resultId: this.id, edits: new No(this._prevData, this._data).computeDiff() }
        : this.build();
    }
  };
  _n.SemanticTokensBuilder = Tu;
});
var mh = O((Lo) => {
  'use strict';
  Object.defineProperty(Lo, '__esModule', { value: !0 });
  Lo.ShowDocumentFeature = void 0;
  var rw = Ne(),
    iw = (e) =>
      class extends e {
        showDocument(t) {
          return this.connection.sendRequest(rw.ShowDocumentRequest.type, t);
        }
      };
  Lo.ShowDocumentFeature = iw;
});
var gh = O((Mo) => {
  'use strict';
  Object.defineProperty(Mo, '__esModule', { value: !0 });
  Mo.FileOperationsFeature = void 0;
  var Er = Ne(),
    ow = (e) =>
      class extends e {
        onDidCreateFiles(t) {
          return this.connection.onNotification(Er.DidCreateFilesNotification.type, (n) => {
            t(n);
          });
        }
        onDidRenameFiles(t) {
          return this.connection.onNotification(Er.DidRenameFilesNotification.type, (n) => {
            t(n);
          });
        }
        onDidDeleteFiles(t) {
          return this.connection.onNotification(Er.DidDeleteFilesNotification.type, (n) => {
            t(n);
          });
        }
        onWillCreateFiles(t) {
          return this.connection.onRequest(Er.WillCreateFilesRequest.type, (n, r) => t(n, r));
        }
        onWillRenameFiles(t) {
          return this.connection.onRequest(Er.WillRenameFilesRequest.type, (n, r) => t(n, r));
        }
        onWillDeleteFiles(t) {
          return this.connection.onRequest(Er.WillDeleteFilesRequest.type, (n, r) => t(n, r));
        }
      };
  Mo.FileOperationsFeature = ow;
});
var yh = O((jo) => {
  'use strict';
  Object.defineProperty(jo, '__esModule', { value: !0 });
  jo.LinkedEditingRangeFeature = void 0;
  var sw = Ne(),
    aw = (e) =>
      class extends e {
        onLinkedEditingRange(t) {
          return this.connection.onRequest(sw.LinkedEditingRangeRequest.type, (n, r) =>
            t(n, r, this.attachWorkDoneProgress(n), void 0)
          );
        }
      };
  jo.LinkedEditingRangeFeature = aw;
});
var bh = O((Bo) => {
  'use strict';
  Object.defineProperty(Bo, '__esModule', { value: !0 });
  Bo.TypeHierarchyFeature = void 0;
  var Eu = Ne(),
    uw = (e) =>
      class extends e {
        get typeHierarchy() {
          return {
            onPrepare: (t) =>
              this.connection.onRequest(Eu.TypeHierarchyPrepareRequest.type, (n, r) =>
                t(n, r, this.attachWorkDoneProgress(n), void 0)
              ),
            onSupertypes: (t) => {
              let n = Eu.TypeHierarchySupertypesRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
            onSubtypes: (t) => {
              let n = Eu.TypeHierarchySubtypesRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
          };
        }
      };
  Bo.TypeHierarchyFeature = uw;
});
var xh = O((Ho) => {
  'use strict';
  Object.defineProperty(Ho, '__esModule', { value: !0 });
  Ho.InlineValueFeature = void 0;
  var vh = Ne(),
    cw = (e) =>
      class extends e {
        get inlineValue() {
          return {
            refresh: () => this.connection.sendRequest(vh.InlineValueRefreshRequest.type),
            on: (t) =>
              this.connection.onRequest(vh.InlineValueRequest.type, (n, r) =>
                t(n, r, this.attachWorkDoneProgress(n))
              ),
          };
        }
      };
  Ho.InlineValueFeature = cw;
});
var kh = O((zo) => {
  'use strict';
  Object.defineProperty(zo, '__esModule', { value: !0 });
  zo.FoldingRangeFeature = void 0;
  var wh = Ne(),
    lw = (e) =>
      class extends e {
        get foldingRange() {
          return {
            refresh: () => this.connection.sendRequest(wh.FoldingRangeRefreshRequest.type),
            on: (t) => {
              let n = wh.FoldingRangeRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
          };
        }
      };
  zo.FoldingRangeFeature = lw;
});
var _h = O((Uo) => {
  'use strict';
  Object.defineProperty(Uo, '__esModule', { value: !0 });
  Uo.InlayHintFeature = void 0;
  var Ru = Ne(),
    fw = (e) =>
      class extends e {
        get inlayHint() {
          return {
            refresh: () => this.connection.sendRequest(Ru.InlayHintRefreshRequest.type),
            on: (t) =>
              this.connection.onRequest(Ru.InlayHintRequest.type, (n, r) =>
                t(n, r, this.attachWorkDoneProgress(n))
              ),
            resolve: (t) =>
              this.connection.onRequest(Ru.InlayHintResolveRequest.type, (n, r) => t(n, r)),
          };
        }
      };
  Uo.InlayHintFeature = fw;
});
var Sh = O((Wo) => {
  'use strict';
  Object.defineProperty(Wo, '__esModule', { value: !0 });
  Wo.DiagnosticFeature = void 0;
  var ai = Ne(),
    dw = (e) =>
      class extends e {
        get diagnostics() {
          return {
            refresh: () => this.connection.sendRequest(ai.DiagnosticRefreshRequest.type),
            on: (t) =>
              this.connection.onRequest(ai.DocumentDiagnosticRequest.type, (n, r) =>
                t(
                  n,
                  r,
                  this.attachWorkDoneProgress(n),
                  this.attachPartialResultProgress(ai.DocumentDiagnosticRequest.partialResult, n)
                )
              ),
            onWorkspace: (t) =>
              this.connection.onRequest(ai.WorkspaceDiagnosticRequest.type, (n, r) =>
                t(
                  n,
                  r,
                  this.attachWorkDoneProgress(n),
                  this.attachPartialResultProgress(ai.WorkspaceDiagnosticRequest.partialResult, n)
                )
              ),
          };
        }
      };
  Wo.DiagnosticFeature = dw;
});
var qu = O((Vo) => {
  'use strict';
  Object.defineProperty(Vo, '__esModule', { value: !0 });
  Vo.TextDocuments = void 0;
  var Un = Ne(),
    Au = class {
      constructor(t) {
        ((this._configuration = t),
          (this._syncedDocuments = new Map()),
          (this._onDidChangeContent = new Un.Emitter()),
          (this._onDidOpen = new Un.Emitter()),
          (this._onDidClose = new Un.Emitter()),
          (this._onDidSave = new Un.Emitter()),
          (this._onWillSave = new Un.Emitter()));
      }
      get onDidOpen() {
        return this._onDidOpen.event;
      }
      get onDidChangeContent() {
        return this._onDidChangeContent.event;
      }
      get onWillSave() {
        return this._onWillSave.event;
      }
      onWillSaveWaitUntil(t) {
        this._willSaveWaitUntil = t;
      }
      get onDidSave() {
        return this._onDidSave.event;
      }
      get onDidClose() {
        return this._onDidClose.event;
      }
      get(t) {
        return this._syncedDocuments.get(t);
      }
      all() {
        return Array.from(this._syncedDocuments.values());
      }
      keys() {
        return Array.from(this._syncedDocuments.keys());
      }
      listen(t) {
        t.__textDocumentSync = Un.TextDocumentSyncKind.Incremental;
        let n = [];
        return (
          n.push(
            t.onDidOpenTextDocument((r) => {
              let i = r.textDocument,
                o = this._configuration.create(i.uri, i.languageId, i.version, i.text);
              this._syncedDocuments.set(i.uri, o);
              let s = Object.freeze({ document: o });
              (this._onDidOpen.fire(s), this._onDidChangeContent.fire(s));
            })
          ),
          n.push(
            t.onDidChangeTextDocument((r) => {
              let i = r.textDocument,
                o = r.contentChanges;
              if (o.length === 0) return;
              let { version: s } = i;
              if (s == null)
                throw new Error(
                  `Received document change event for ${i.uri} without valid version identifier`
                );
              let a = this._syncedDocuments.get(i.uri);
              a !== void 0 &&
                ((a = this._configuration.update(a, o, s)),
                this._syncedDocuments.set(i.uri, a),
                this._onDidChangeContent.fire(Object.freeze({ document: a })));
            })
          ),
          n.push(
            t.onDidCloseTextDocument((r) => {
              let i = this._syncedDocuments.get(r.textDocument.uri);
              i !== void 0 &&
                (this._syncedDocuments.delete(r.textDocument.uri),
                this._onDidClose.fire(Object.freeze({ document: i })));
            })
          ),
          n.push(
            t.onWillSaveTextDocument((r) => {
              let i = this._syncedDocuments.get(r.textDocument.uri);
              i !== void 0 &&
                this._onWillSave.fire(Object.freeze({ document: i, reason: r.reason }));
            })
          ),
          n.push(
            t.onWillSaveTextDocumentWaitUntil((r, i) => {
              let o = this._syncedDocuments.get(r.textDocument.uri);
              return o !== void 0 && this._willSaveWaitUntil
                ? this._willSaveWaitUntil(Object.freeze({ document: o, reason: r.reason }), i)
                : [];
            })
          ),
          n.push(
            t.onDidSaveTextDocument((r) => {
              let i = this._syncedDocuments.get(r.textDocument.uri);
              i !== void 0 && this._onDidSave.fire(Object.freeze({ document: i }));
            })
          ),
          Un.Disposable.create(() => {
            n.forEach((r) => r.dispose());
          })
        );
      }
    };
  Vo.TextDocuments = Au;
});
var Ou = O((Rr) => {
  'use strict';
  Object.defineProperty(Rr, '__esModule', { value: !0 });
  Rr.NotebookDocuments = Rr.NotebookSyncFeature = void 0;
  var It = Ne(),
    Ch = qu(),
    pw = (e) =>
      class extends e {
        get synchronization() {
          return {
            onDidOpenNotebookDocument: (t) =>
              this.connection.onNotification(It.DidOpenNotebookDocumentNotification.type, (n) => {
                t(n);
              }),
            onDidChangeNotebookDocument: (t) =>
              this.connection.onNotification(It.DidChangeNotebookDocumentNotification.type, (n) => {
                t(n);
              }),
            onDidSaveNotebookDocument: (t) =>
              this.connection.onNotification(It.DidSaveNotebookDocumentNotification.type, (n) => {
                t(n);
              }),
            onDidCloseNotebookDocument: (t) =>
              this.connection.onNotification(It.DidCloseNotebookDocumentNotification.type, (n) => {
                t(n);
              }),
          };
        }
      };
  Rr.NotebookSyncFeature = pw;
  var $o = class e {
    onDidOpenTextDocument(t) {
      return (
        (this.openHandler = t),
        It.Disposable.create(() => {
          this.openHandler = void 0;
        })
      );
    }
    openTextDocument(t) {
      this.openHandler && this.openHandler(t);
    }
    onDidChangeTextDocument(t) {
      return (
        (this.changeHandler = t),
        It.Disposable.create(() => {
          this.changeHandler = t;
        })
      );
    }
    changeTextDocument(t) {
      this.changeHandler && this.changeHandler(t);
    }
    onDidCloseTextDocument(t) {
      return (
        (this.closeHandler = t),
        It.Disposable.create(() => {
          this.closeHandler = void 0;
        })
      );
    }
    closeTextDocument(t) {
      this.closeHandler && this.closeHandler(t);
    }
    onWillSaveTextDocument() {
      return e.NULL_DISPOSE;
    }
    onWillSaveTextDocumentWaitUntil() {
      return e.NULL_DISPOSE;
    }
    onDidSaveTextDocument() {
      return e.NULL_DISPOSE;
    }
  };
  $o.NULL_DISPOSE = Object.freeze({ dispose: () => {} });
  var Pu = class {
    constructor(t) {
      (t instanceof Ch.TextDocuments
        ? (this._cellTextDocuments = t)
        : (this._cellTextDocuments = new Ch.TextDocuments(t)),
        (this.notebookDocuments = new Map()),
        (this.notebookCellMap = new Map()),
        (this._onDidOpen = new It.Emitter()),
        (this._onDidChange = new It.Emitter()),
        (this._onDidSave = new It.Emitter()),
        (this._onDidClose = new It.Emitter()));
    }
    get cellTextDocuments() {
      return this._cellTextDocuments;
    }
    getCellTextDocument(t) {
      return this._cellTextDocuments.get(t.document);
    }
    getNotebookDocument(t) {
      return this.notebookDocuments.get(t);
    }
    getNotebookCell(t) {
      let n = this.notebookCellMap.get(t);
      return n && n[0];
    }
    findNotebookDocumentForCell(t) {
      let n = typeof t == 'string' ? t : t.document,
        r = this.notebookCellMap.get(n);
      return r && r[1];
    }
    get onDidOpen() {
      return this._onDidOpen.event;
    }
    get onDidSave() {
      return this._onDidSave.event;
    }
    get onDidChange() {
      return this._onDidChange.event;
    }
    get onDidClose() {
      return this._onDidClose.event;
    }
    listen(t) {
      let n = new $o(),
        r = [];
      return (
        r.push(this.cellTextDocuments.listen(n)),
        r.push(
          t.notebooks.synchronization.onDidOpenNotebookDocument((i) => {
            this.notebookDocuments.set(i.notebookDocument.uri, i.notebookDocument);
            for (let o of i.cellTextDocuments) n.openTextDocument({ textDocument: o });
            (this.updateCellMap(i.notebookDocument), this._onDidOpen.fire(i.notebookDocument));
          })
        ),
        r.push(
          t.notebooks.synchronization.onDidChangeNotebookDocument((i) => {
            let o = this.notebookDocuments.get(i.notebookDocument.uri);
            if (o === void 0) return;
            o.version = i.notebookDocument.version;
            let s = o.metadata,
              a = !1,
              u = i.change;
            u.metadata !== void 0 && ((a = !0), (o.metadata = u.metadata));
            let c = [],
              f = [],
              p = [],
              m = [];
            if (u.cells !== void 0) {
              let q = u.cells;
              if (q.structure !== void 0) {
                let S = q.structure.array;
                if (
                  (o.cells.splice(S.start, S.deleteCount, ...(S.cells !== void 0 ? S.cells : [])),
                  q.structure.didOpen !== void 0)
                )
                  for (let w of q.structure.didOpen)
                    (n.openTextDocument({ textDocument: w }), c.push(w.uri));
                if (q.structure.didClose)
                  for (let w of q.structure.didClose)
                    (n.closeTextDocument({ textDocument: w }), f.push(w.uri));
              }
              if (q.data !== void 0) {
                let S = new Map(q.data.map((w) => [w.document, w]));
                for (let w = 0; w <= o.cells.length; w++) {
                  let N = S.get(o.cells[w].document);
                  if (N !== void 0) {
                    let V = o.cells.splice(w, 1, N);
                    if ((p.push({ old: V[0], new: N }), S.delete(N.document), S.size === 0)) break;
                  }
                }
              }
              if (q.textContent !== void 0)
                for (let S of q.textContent)
                  (n.changeTextDocument({ textDocument: S.document, contentChanges: S.changes }),
                    m.push(S.document.uri));
            }
            this.updateCellMap(o);
            let h = { notebookDocument: o };
            a && (h.metadata = { old: s, new: o.metadata });
            let A = [];
            for (let q of c) A.push(this.getNotebookCell(q));
            let I = [];
            for (let q of f) I.push(this.getNotebookCell(q));
            let L = [];
            for (let q of m) L.push(this.getNotebookCell(q));
            ((A.length > 0 || I.length > 0 || p.length > 0 || L.length > 0) &&
              (h.cells = { added: A, removed: I, changed: { data: p, textContent: L } }),
              (h.metadata !== void 0 || h.cells !== void 0) && this._onDidChange.fire(h));
          })
        ),
        r.push(
          t.notebooks.synchronization.onDidSaveNotebookDocument((i) => {
            let o = this.notebookDocuments.get(i.notebookDocument.uri);
            o !== void 0 && this._onDidSave.fire(o);
          })
        ),
        r.push(
          t.notebooks.synchronization.onDidCloseNotebookDocument((i) => {
            let o = this.notebookDocuments.get(i.notebookDocument.uri);
            if (o !== void 0) {
              this._onDidClose.fire(o);
              for (let s of i.cellTextDocuments) n.closeTextDocument({ textDocument: s });
              this.notebookDocuments.delete(i.notebookDocument.uri);
              for (let s of o.cells) this.notebookCellMap.delete(s.document);
            }
          })
        ),
        It.Disposable.create(() => {
          r.forEach((i) => i.dispose());
        })
      );
    }
    updateCellMap(t) {
      for (let n of t.cells) this.notebookCellMap.set(n.document, [n, t]);
    }
  };
  Rr.NotebookDocuments = Pu;
});
var Th = O((Yo) => {
  'use strict';
  Object.defineProperty(Yo, '__esModule', { value: !0 });
  Yo.MonikerFeature = void 0;
  var hw = Ne(),
    mw = (e) =>
      class extends e {
        get moniker() {
          return {
            on: (t) => {
              let n = hw.MonikerRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
          };
        }
      };
  Yo.MonikerFeature = mw;
});
var ju = O((ve) => {
  'use strict';
  Object.defineProperty(ve, '__esModule', { value: !0 });
  ve.createConnection =
    ve.combineFeatures =
    ve.combineNotebooksFeatures =
    ve.combineLanguagesFeatures =
    ve.combineWorkspaceFeatures =
    ve.combineWindowFeatures =
    ve.combineClientFeatures =
    ve.combineTracerFeatures =
    ve.combineTelemetryFeatures =
    ve.combineConsoleFeatures =
    ve._NotebooksImpl =
    ve._LanguagesImpl =
    ve.BulkUnregistration =
    ve.BulkRegistration =
    ve.ErrorMessageTracker =
      void 0;
  var z = Ne(),
    Ft = Hi(),
    Fu = ku(),
    re = fh(),
    gw = dh(),
    yw = ph(),
    bw = hh(),
    vw = Du(),
    xw = mh(),
    ww = gh(),
    kw = yh(),
    _w = bh(),
    Sw = xh(),
    Cw = kh(),
    Tw = _h(),
    Dw = Sh(),
    Ew = Ou(),
    Rw = Th();
  function Iu(e) {
    if (e !== null) return e;
  }
  var Nu = class {
    constructor() {
      this._messages = Object.create(null);
    }
    add(t) {
      let n = this._messages[t];
      (n || (n = 0), n++, (this._messages[t] = n));
    }
    sendErrors(t) {
      Object.keys(this._messages).forEach((n) => {
        t.window.showErrorMessage(n);
      });
    }
  };
  ve.ErrorMessageTracker = Nu;
  var Go = class {
      constructor() {}
      rawAttach(t) {
        this._rawConnection = t;
      }
      attach(t) {
        this._connection = t;
      }
      get connection() {
        if (!this._connection) throw new Error('Remote is not attached to a connection yet.');
        return this._connection;
      }
      fillServerCapabilities(t) {}
      initialize(t) {}
      error(t) {
        this.send(z.MessageType.Error, t);
      }
      warn(t) {
        this.send(z.MessageType.Warning, t);
      }
      info(t) {
        this.send(z.MessageType.Info, t);
      }
      log(t) {
        this.send(z.MessageType.Log, t);
      }
      debug(t) {
        this.send(z.MessageType.Debug, t);
      }
      send(t, n) {
        this._rawConnection &&
          this._rawConnection
            .sendNotification(z.LogMessageNotification.type, { type: t, message: n })
            .catch(() => {
              (0, z.RAL)().console.error('Sending log message failed');
            });
      }
    },
    Lu = class {
      constructor() {}
      attach(t) {
        this._connection = t;
      }
      get connection() {
        if (!this._connection) throw new Error('Remote is not attached to a connection yet.');
        return this._connection;
      }
      initialize(t) {}
      fillServerCapabilities(t) {}
      showErrorMessage(t, ...n) {
        let r = { type: z.MessageType.Error, message: t, actions: n };
        return this.connection.sendRequest(z.ShowMessageRequest.type, r).then(Iu);
      }
      showWarningMessage(t, ...n) {
        let r = { type: z.MessageType.Warning, message: t, actions: n };
        return this.connection.sendRequest(z.ShowMessageRequest.type, r).then(Iu);
      }
      showInformationMessage(t, ...n) {
        let r = { type: z.MessageType.Info, message: t, actions: n };
        return this.connection.sendRequest(z.ShowMessageRequest.type, r).then(Iu);
      }
    },
    Dh = (0, xw.ShowDocumentFeature)((0, re.ProgressFeature)(Lu)),
    Eh;
  (function (e) {
    function t() {
      return new Ko();
    }
    e.create = t;
  })(Eh || (ve.BulkRegistration = Eh = {}));
  var Ko = class {
      constructor() {
        ((this._registrations = []), (this._registered = new Set()));
      }
      add(t, n) {
        let r = Ft.string(t) ? t : t.method;
        if (this._registered.has(r)) throw new Error(`${r} is already added to this registration`);
        let i = Fu.generateUuid();
        (this._registrations.push({ id: i, method: r, registerOptions: n || {} }),
          this._registered.add(r));
      }
      asRegistrationParams() {
        return { registrations: this._registrations };
      }
    },
    Rh;
  (function (e) {
    function t() {
      return new ui(void 0, []);
    }
    e.create = t;
  })(Rh || (ve.BulkUnregistration = Rh = {}));
  var ui = class {
      constructor(t, n) {
        ((this._connection = t),
          (this._unregistrations = new Map()),
          n.forEach((r) => {
            this._unregistrations.set(r.method, r);
          }));
      }
      get isAttached() {
        return !!this._connection;
      }
      attach(t) {
        this._connection = t;
      }
      add(t) {
        this._unregistrations.set(t.method, t);
      }
      dispose() {
        let t = [];
        for (let r of this._unregistrations.values()) t.push(r);
        let n = { unregisterations: t };
        this._connection.sendRequest(z.UnregistrationRequest.type, n).catch(() => {
          this._connection.console.info('Bulk unregistration failed.');
        });
      }
      disposeSingle(t) {
        let n = Ft.string(t) ? t : t.method,
          r = this._unregistrations.get(n);
        if (!r) return !1;
        let i = { unregisterations: [r] };
        return (
          this._connection.sendRequest(z.UnregistrationRequest.type, i).then(
            () => {
              this._unregistrations.delete(n);
            },
            (o) => {
              this._connection.console.info(`Un-registering request handler for ${r.id} failed.`);
            }
          ),
          !0
        );
      }
    },
    Qo = class {
      attach(t) {
        this._connection = t;
      }
      get connection() {
        if (!this._connection) throw new Error('Remote is not attached to a connection yet.');
        return this._connection;
      }
      initialize(t) {}
      fillServerCapabilities(t) {}
      register(t, n, r) {
        return t instanceof Ko
          ? this.registerMany(t)
          : t instanceof ui
            ? this.registerSingle1(t, n, r)
            : this.registerSingle2(t, n);
      }
      registerSingle1(t, n, r) {
        let i = Ft.string(n) ? n : n.method,
          o = Fu.generateUuid(),
          s = { registrations: [{ id: o, method: i, registerOptions: r || {} }] };
        return (
          t.isAttached || t.attach(this.connection),
          this.connection.sendRequest(z.RegistrationRequest.type, s).then(
            (a) => (t.add({ id: o, method: i }), t),
            (a) => (
              this.connection.console.info(`Registering request handler for ${i} failed.`),
              Promise.reject(a)
            )
          )
        );
      }
      registerSingle2(t, n) {
        let r = Ft.string(t) ? t : t.method,
          i = Fu.generateUuid(),
          o = { registrations: [{ id: i, method: r, registerOptions: n || {} }] };
        return this.connection.sendRequest(z.RegistrationRequest.type, o).then(
          (s) =>
            z.Disposable.create(() => {
              this.unregisterSingle(i, r).catch(() => {
                this.connection.console.info(`Un-registering capability with id ${i} failed.`);
              });
            }),
          (s) => (
            this.connection.console.info(`Registering request handler for ${r} failed.`),
            Promise.reject(s)
          )
        );
      }
      unregisterSingle(t, n) {
        let r = { unregisterations: [{ id: t, method: n }] };
        return this.connection.sendRequest(z.UnregistrationRequest.type, r).catch(() => {
          this.connection.console.info(`Un-registering request handler for ${t} failed.`);
        });
      }
      registerMany(t) {
        let n = t.asRegistrationParams();
        return this.connection.sendRequest(z.RegistrationRequest.type, n).then(
          () =>
            new ui(
              this._connection,
              n.registrations.map((r) => ({ id: r.id, method: r.method }))
            ),
          (r) => (this.connection.console.info('Bulk registration failed.'), Promise.reject(r))
        );
      }
    },
    Mu = class {
      constructor() {}
      attach(t) {
        this._connection = t;
      }
      get connection() {
        if (!this._connection) throw new Error('Remote is not attached to a connection yet.');
        return this._connection;
      }
      initialize(t) {}
      fillServerCapabilities(t) {}
      applyEdit(t) {
        function n(i) {
          return i && !!i.edit;
        }
        let r = n(t) ? t : { edit: t };
        return this.connection.sendRequest(z.ApplyWorkspaceEditRequest.type, r);
      }
    },
    Ah = (0, ww.FileOperationsFeature)(
      (0, yw.WorkspaceFoldersFeature)((0, gw.ConfigurationFeature)(Mu))
    ),
    Jo = class {
      constructor() {
        this._trace = z.Trace.Off;
      }
      attach(t) {
        this._connection = t;
      }
      get connection() {
        if (!this._connection) throw new Error('Remote is not attached to a connection yet.');
        return this._connection;
      }
      initialize(t) {}
      fillServerCapabilities(t) {}
      set trace(t) {
        this._trace = t;
      }
      log(t, n) {
        this._trace !== z.Trace.Off &&
          this.connection
            .sendNotification(z.LogTraceNotification.type, {
              message: t,
              verbose: this._trace === z.Trace.Verbose ? n : void 0,
            })
            .catch(() => {});
      }
    },
    Zo = class {
      constructor() {}
      attach(t) {
        this._connection = t;
      }
      get connection() {
        if (!this._connection) throw new Error('Remote is not attached to a connection yet.');
        return this._connection;
      }
      initialize(t) {}
      fillServerCapabilities(t) {}
      logEvent(t) {
        this.connection.sendNotification(z.TelemetryEventNotification.type, t).catch(() => {
          this.connection.console.log('Sending TelemetryEventNotification failed');
        });
      }
    },
    Xo = class {
      constructor() {}
      attach(t) {
        this._connection = t;
      }
      get connection() {
        if (!this._connection) throw new Error('Remote is not attached to a connection yet.');
        return this._connection;
      }
      initialize(t) {}
      fillServerCapabilities(t) {}
      attachWorkDoneProgress(t) {
        return (0, re.attachWorkDone)(this.connection, t);
      }
      attachPartialResultProgress(t, n) {
        return (0, re.attachPartialResult)(this.connection, n);
      }
    };
  ve._LanguagesImpl = Xo;
  var qh = (0, Cw.FoldingRangeFeature)(
      (0, Rw.MonikerFeature)(
        (0, Dw.DiagnosticFeature)(
          (0, Tw.InlayHintFeature)(
            (0, Sw.InlineValueFeature)(
              (0, _w.TypeHierarchyFeature)(
                (0, kw.LinkedEditingRangeFeature)(
                  (0, vw.SemanticTokensFeature)((0, bw.CallHierarchyFeature)(Xo))
                )
              )
            )
          )
        )
      )
    ),
    es = class {
      constructor() {}
      attach(t) {
        this._connection = t;
      }
      get connection() {
        if (!this._connection) throw new Error('Remote is not attached to a connection yet.');
        return this._connection;
      }
      initialize(t) {}
      fillServerCapabilities(t) {}
      attachWorkDoneProgress(t) {
        return (0, re.attachWorkDone)(this.connection, t);
      }
      attachPartialResultProgress(t, n) {
        return (0, re.attachPartialResult)(this.connection, n);
      }
    };
  ve._NotebooksImpl = es;
  var Ph = (0, Ew.NotebookSyncFeature)(es);
  function Oh(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineConsoleFeatures = Oh;
  function Ih(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineTelemetryFeatures = Ih;
  function Fh(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineTracerFeatures = Fh;
  function Nh(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineClientFeatures = Nh;
  function Lh(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineWindowFeatures = Lh;
  function Mh(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineWorkspaceFeatures = Mh;
  function jh(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineLanguagesFeatures = jh;
  function Bh(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineNotebooksFeatures = Bh;
  function Aw(e, t) {
    function n(i, o, s) {
      return i && o ? s(i, o) : i || o;
    }
    return {
      __brand: 'features',
      console: n(e.console, t.console, Oh),
      tracer: n(e.tracer, t.tracer, Fh),
      telemetry: n(e.telemetry, t.telemetry, Ih),
      client: n(e.client, t.client, Nh),
      window: n(e.window, t.window, Lh),
      workspace: n(e.workspace, t.workspace, Mh),
      languages: n(e.languages, t.languages, jh),
      notebooks: n(e.notebooks, t.notebooks, Bh),
    };
  }
  ve.combineFeatures = Aw;
  function qw(e, t, n) {
    let r = n && n.console ? new (n.console(Go))() : new Go(),
      i = e(r);
    r.rawAttach(i);
    let o = n && n.tracer ? new (n.tracer(Jo))() : new Jo(),
      s = n && n.telemetry ? new (n.telemetry(Zo))() : new Zo(),
      a = n && n.client ? new (n.client(Qo))() : new Qo(),
      u = n && n.window ? new (n.window(Dh))() : new Dh(),
      c = n && n.workspace ? new (n.workspace(Ah))() : new Ah(),
      f = n && n.languages ? new (n.languages(qh))() : new qh(),
      p = n && n.notebooks ? new (n.notebooks(Ph))() : new Ph(),
      m = [r, o, s, a, u, c, f, p];
    function h(S) {
      return S instanceof Promise
        ? S
        : Ft.thenable(S)
          ? new Promise((w, N) => {
              S.then(
                (V) => w(V),
                (V) => N(V)
              );
            })
          : Promise.resolve(S);
    }
    let A,
      I,
      L,
      q = {
        listen: () => i.listen(),
        sendRequest: (S, ...w) => i.sendRequest(Ft.string(S) ? S : S.method, ...w),
        onRequest: (S, w) => i.onRequest(S, w),
        sendNotification: (S, w) => {
          let N = Ft.string(S) ? S : S.method;
          return i.sendNotification(N, w);
        },
        onNotification: (S, w) => i.onNotification(S, w),
        onProgress: i.onProgress,
        sendProgress: i.sendProgress,
        onInitialize: (S) => (
          (I = S),
          {
            dispose: () => {
              I = void 0;
            },
          }
        ),
        onInitialized: (S) => i.onNotification(z.InitializedNotification.type, S),
        onShutdown: (S) => (
          (A = S),
          {
            dispose: () => {
              A = void 0;
            },
          }
        ),
        onExit: (S) => (
          (L = S),
          {
            dispose: () => {
              L = void 0;
            },
          }
        ),
        get console() {
          return r;
        },
        get telemetry() {
          return s;
        },
        get tracer() {
          return o;
        },
        get client() {
          return a;
        },
        get window() {
          return u;
        },
        get workspace() {
          return c;
        },
        get languages() {
          return f;
        },
        get notebooks() {
          return p;
        },
        onDidChangeConfiguration: (S) =>
          i.onNotification(z.DidChangeConfigurationNotification.type, S),
        onDidChangeWatchedFiles: (S) =>
          i.onNotification(z.DidChangeWatchedFilesNotification.type, S),
        __textDocumentSync: void 0,
        onDidOpenTextDocument: (S) => i.onNotification(z.DidOpenTextDocumentNotification.type, S),
        onDidChangeTextDocument: (S) =>
          i.onNotification(z.DidChangeTextDocumentNotification.type, S),
        onDidCloseTextDocument: (S) => i.onNotification(z.DidCloseTextDocumentNotification.type, S),
        onWillSaveTextDocument: (S) => i.onNotification(z.WillSaveTextDocumentNotification.type, S),
        onWillSaveTextDocumentWaitUntil: (S) =>
          i.onRequest(z.WillSaveTextDocumentWaitUntilRequest.type, S),
        onDidSaveTextDocument: (S) => i.onNotification(z.DidSaveTextDocumentNotification.type, S),
        sendDiagnostics: (S) => i.sendNotification(z.PublishDiagnosticsNotification.type, S),
        onHover: (S) =>
          i.onRequest(z.HoverRequest.type, (w, N) => S(w, N, (0, re.attachWorkDone)(i, w), void 0)),
        onCompletion: (S) =>
          i.onRequest(z.CompletionRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onCompletionResolve: (S) => i.onRequest(z.CompletionResolveRequest.type, S),
        onSignatureHelp: (S) =>
          i.onRequest(z.SignatureHelpRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), void 0)
          ),
        onDeclaration: (S) =>
          i.onRequest(z.DeclarationRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onDefinition: (S) =>
          i.onRequest(z.DefinitionRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onTypeDefinition: (S) =>
          i.onRequest(z.TypeDefinitionRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onImplementation: (S) =>
          i.onRequest(z.ImplementationRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onReferences: (S) =>
          i.onRequest(z.ReferencesRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onDocumentHighlight: (S) =>
          i.onRequest(z.DocumentHighlightRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onDocumentSymbol: (S) =>
          i.onRequest(z.DocumentSymbolRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onWorkspaceSymbol: (S) =>
          i.onRequest(z.WorkspaceSymbolRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onWorkspaceSymbolResolve: (S) => i.onRequest(z.WorkspaceSymbolResolveRequest.type, S),
        onCodeAction: (S) =>
          i.onRequest(z.CodeActionRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onCodeActionResolve: (S) => i.onRequest(z.CodeActionResolveRequest.type, (w, N) => S(w, N)),
        onCodeLens: (S) =>
          i.onRequest(z.CodeLensRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onCodeLensResolve: (S) => i.onRequest(z.CodeLensResolveRequest.type, (w, N) => S(w, N)),
        onDocumentFormatting: (S) =>
          i.onRequest(z.DocumentFormattingRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), void 0)
          ),
        onDocumentRangeFormatting: (S) =>
          i.onRequest(z.DocumentRangeFormattingRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), void 0)
          ),
        onDocumentOnTypeFormatting: (S) =>
          i.onRequest(z.DocumentOnTypeFormattingRequest.type, (w, N) => S(w, N)),
        onRenameRequest: (S) =>
          i.onRequest(z.RenameRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), void 0)
          ),
        onPrepareRename: (S) => i.onRequest(z.PrepareRenameRequest.type, (w, N) => S(w, N)),
        onDocumentLinks: (S) =>
          i.onRequest(z.DocumentLinkRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onDocumentLinkResolve: (S) =>
          i.onRequest(z.DocumentLinkResolveRequest.type, (w, N) => S(w, N)),
        onDocumentColor: (S) =>
          i.onRequest(z.DocumentColorRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onColorPresentation: (S) =>
          i.onRequest(z.ColorPresentationRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onFoldingRanges: (S) =>
          i.onRequest(z.FoldingRangeRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onSelectionRanges: (S) =>
          i.onRequest(z.SelectionRangeRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), (0, re.attachPartialResult)(i, w))
          ),
        onExecuteCommand: (S) =>
          i.onRequest(z.ExecuteCommandRequest.type, (w, N) =>
            S(w, N, (0, re.attachWorkDone)(i, w), void 0)
          ),
        dispose: () => i.dispose(),
      };
    for (let S of m) S.attach(q);
    return (
      i.onRequest(z.InitializeRequest.type, (S) => {
        (t.initialize(S), Ft.string(S.trace) && (o.trace = z.Trace.fromString(S.trace)));
        for (let w of m) w.initialize(S.capabilities);
        if (I) {
          let w = I(S, new z.CancellationTokenSource().token, (0, re.attachWorkDone)(i, S), void 0);
          return h(w).then((N) => {
            if (N instanceof z.ResponseError) return N;
            let V = N;
            V || (V = { capabilities: {} });
            let P = V.capabilities;
            (P || ((P = {}), (V.capabilities = P)),
              P.textDocumentSync === void 0 || P.textDocumentSync === null
                ? (P.textDocumentSync = Ft.number(q.__textDocumentSync)
                    ? q.__textDocumentSync
                    : z.TextDocumentSyncKind.None)
                : !Ft.number(P.textDocumentSync) &&
                  !Ft.number(P.textDocumentSync.change) &&
                  (P.textDocumentSync.change = Ft.number(q.__textDocumentSync)
                    ? q.__textDocumentSync
                    : z.TextDocumentSyncKind.None));
            for (let Z of m) Z.fillServerCapabilities(P);
            return V;
          });
        } else {
          let w = { capabilities: { textDocumentSync: z.TextDocumentSyncKind.None } };
          for (let N of m) N.fillServerCapabilities(w.capabilities);
          return w;
        }
      }),
      i.onRequest(z.ShutdownRequest.type, () => {
        if (((t.shutdownReceived = !0), A)) return A(new z.CancellationTokenSource().token);
      }),
      i.onNotification(z.ExitNotification.type, () => {
        try {
          L && L();
        } finally {
          t.shutdownReceived ? t.exit(0) : t.exit(1);
        }
      }),
      i.onNotification(z.SetTraceNotification.type, (S) => {
        o.trace = z.Trace.fromString(S.value);
      }),
      q
    );
  }
  ve.createConnection = qw;
});
var Hh = O((xt) => {
  'use strict';
  Object.defineProperty(xt, '__esModule', { value: !0 });
  xt.resolveModulePath =
    xt.FileSystem =
    xt.resolveGlobalYarnPath =
    xt.resolveGlobalNodePath =
    xt.resolve =
    xt.uriToFilePath =
      void 0;
  var Pw = require('url'),
    Wt = require('path'),
    Bu = require('fs'),
    Wu = require('child_process');
  function Ow(e) {
    let t = Pw.parse(e);
    if (t.protocol !== 'file:' || !t.path) return;
    let n = t.path.split('/');
    for (var r = 0, i = n.length; r < i; r++) n[r] = decodeURIComponent(n[r]);
    if (process.platform === 'win32' && n.length > 1) {
      let o = n[0],
        s = n[1];
      o.length === 0 && s.length > 1 && s[1] === ':' && n.shift();
    }
    return Wt.normalize(n.join('/'));
  }
  xt.uriToFilePath = Ow;
  function Hu() {
    return process.platform === 'win32';
  }
  function ts(e, t, n, r) {
    let i = 'NODE_PATH',
      o = [
        'var p = process;',
        "p.on('message',function(m){",
        "if(m.c==='e'){",
        'p.exit(0);',
        '}',
        "else if(m.c==='rs'){",
        'try{',
        'var r=require.resolve(m.a);',
        "p.send({c:'r',s:true,r:r});",
        '}',
        'catch(err){',
        "p.send({c:'r',s:false});",
        '}',
        '}',
        '});',
      ].join('');
    return new Promise((s, a) => {
      let u = process.env,
        c = Object.create(null);
      (Object.keys(u).forEach((f) => (c[f] = u[f])),
        t &&
          Bu.existsSync(t) &&
          (c[i] ? (c[i] = t + Wt.delimiter + c[i]) : (c[i] = t),
          r && r(`NODE_PATH value is: ${c[i]}`)),
        (c.ELECTRON_RUN_AS_NODE = '1'));
      try {
        let f = (0, Wu.fork)('', [], { cwd: n, env: c, execArgv: ['-e', o] });
        if (f.pid === void 0) {
          a(new Error(`Starting process to resolve node module  ${e} failed`));
          return;
        }
        (f.on('error', (m) => {
          a(m);
        }),
          f.on('message', (m) => {
            m.c === 'r' &&
              (f.send({ c: 'e' }), m.s ? s(m.r) : a(new Error(`Failed to resolve module: ${e}`)));
          }));
        let p = { c: 'rs', a: e };
        f.send(p);
      } catch (f) {
        a(f);
      }
    });
  }
  xt.resolve = ts;
  function zu(e) {
    let t = 'npm',
      n = Object.create(null);
    (Object.keys(process.env).forEach((o) => (n[o] = process.env[o])),
      (n.NO_UPDATE_NOTIFIER = 'true'));
    let r = { encoding: 'utf8', env: n };
    Hu() && ((t = 'npm.cmd'), (r.shell = !0));
    let i = () => {};
    try {
      process.on('SIGPIPE', i);
      let o = (0, Wu.spawnSync)(t, ['config', 'get', 'prefix'], r).stdout;
      if (!o) {
        e && e("'npm config get prefix' didn't return a value.");
        return;
      }
      let s = o.trim();
      return (
        e && e(`'npm config get prefix' value is: ${s}`),
        s.length > 0
          ? Hu()
            ? Wt.join(s, 'node_modules')
            : Wt.join(s, 'lib', 'node_modules')
          : void 0
      );
    } catch {
      return;
    } finally {
      process.removeListener('SIGPIPE', i);
    }
  }
  xt.resolveGlobalNodePath = zu;
  function Iw(e) {
    let t = 'yarn',
      n = { encoding: 'utf8' };
    Hu() && ((t = 'yarn.cmd'), (n.shell = !0));
    let r = () => {};
    try {
      process.on('SIGPIPE', r);
      let i = (0, Wu.spawnSync)(t, ['global', 'dir', '--json'], n),
        o = i.stdout;
      if (!o) {
        e && (e("'yarn global dir' didn't return a value."), i.stderr && e(i.stderr));
        return;
      }
      let s = o.trim().split(/\r?\n/);
      for (let a of s)
        try {
          let u = JSON.parse(a);
          if (u.type === 'log') return Wt.join(u.data, 'node_modules');
        } catch {}
      return;
    } catch {
      return;
    } finally {
      process.removeListener('SIGPIPE', r);
    }
  }
  xt.resolveGlobalYarnPath = Iw;
  var Uu;
  (function (e) {
    let t;
    function n() {
      return (
        t !== void 0 ||
          (process.platform === 'win32'
            ? (t = !1)
            : (t =
                !Bu.existsSync(__filename.toUpperCase()) ||
                !Bu.existsSync(__filename.toLowerCase()))),
        t
      );
    }
    e.isCaseSensitive = n;
    function r(i, o) {
      return n()
        ? Wt.normalize(o).indexOf(Wt.normalize(i)) === 0
        : Wt.normalize(o).toLowerCase().indexOf(Wt.normalize(i).toLowerCase()) === 0;
    }
    e.isParent = r;
  })(Uu || (xt.FileSystem = Uu = {}));
  function Fw(e, t, n, r) {
    return n
      ? (Wt.isAbsolute(n) || (n = Wt.join(e, n)),
        ts(t, n, n, r)
          .then((i) =>
            Uu.isParent(n, i)
              ? i
              : Promise.reject(new Error(`Failed to load ${t} from node path location.`))
          )
          .then(void 0, (i) => ts(t, zu(r), e, r)))
      : ts(t, zu(r), e, r);
  }
  xt.resolveModulePath = Fw;
});
var Vu = O((RA, zh) => {
  'use strict';
  zh.exports = Ne();
});
var Uh = O((ns) => {
  'use strict';
  Object.defineProperty(ns, '__esModule', { value: !0 });
  ns.InlineCompletionFeature = void 0;
  var Nw = Ne(),
    Lw = (e) =>
      class extends e {
        get inlineCompletion() {
          return {
            on: (t) =>
              this.connection.onRequest(Nw.InlineCompletionRequest.type, (n, r) =>
                t(n, r, this.attachWorkDoneProgress(n))
              ),
          };
        }
      };
  ns.InlineCompletionFeature = Lw;
});
var $h = O((st) => {
  'use strict';
  var Mw =
      (st && st.__createBinding) ||
      (Object.create
        ? function (e, t, n, r) {
            r === void 0 && (r = n);
            var i = Object.getOwnPropertyDescriptor(t, n);
            ((!i || ('get' in i ? !t.__esModule : i.writable || i.configurable)) &&
              (i = {
                enumerable: !0,
                get: function () {
                  return t[n];
                },
              }),
              Object.defineProperty(e, r, i));
          }
        : function (e, t, n, r) {
            (r === void 0 && (r = n), (e[r] = t[n]));
          }),
    Vh =
      (st && st.__exportStar) ||
      function (e, t) {
        for (var n in e)
          n !== 'default' && !Object.prototype.hasOwnProperty.call(t, n) && Mw(t, e, n);
      };
  Object.defineProperty(st, '__esModule', { value: !0 });
  st.ProposedFeatures = st.NotebookDocuments = st.TextDocuments = st.SemanticTokensBuilder = void 0;
  var jw = Du();
  Object.defineProperty(st, 'SemanticTokensBuilder', {
    enumerable: !0,
    get: function () {
      return jw.SemanticTokensBuilder;
    },
  });
  var Bw = Uh();
  Vh(Ne(), st);
  var Hw = qu();
  Object.defineProperty(st, 'TextDocuments', {
    enumerable: !0,
    get: function () {
      return Hw.TextDocuments;
    },
  });
  var zw = Ou();
  Object.defineProperty(st, 'NotebookDocuments', {
    enumerable: !0,
    get: function () {
      return zw.NotebookDocuments;
    },
  });
  Vh(ju(), st);
  var Wh;
  (function (e) {
    e.all = { __brand: 'features', languages: Bw.InlineCompletionFeature };
  })(Wh || (st.ProposedFeatures = Wh = {}));
});
var Zh = O((Nt) => {
  'use strict';
  var Uw =
      (Nt && Nt.__createBinding) ||
      (Object.create
        ? function (e, t, n, r) {
            r === void 0 && (r = n);
            var i = Object.getOwnPropertyDescriptor(t, n);
            ((!i || ('get' in i ? !t.__esModule : i.writable || i.configurable)) &&
              (i = {
                enumerable: !0,
                get: function () {
                  return t[n];
                },
              }),
              Object.defineProperty(e, r, i));
          }
        : function (e, t, n, r) {
            (r === void 0 && (r = n), (e[r] = t[n]));
          }),
    Qh =
      (Nt && Nt.__exportStar) ||
      function (e, t) {
        for (var n in e)
          n !== 'default' && !Object.prototype.hasOwnProperty.call(t, n) && Uw(t, e, n);
      };
  Object.defineProperty(Nt, '__esModule', { value: !0 });
  Nt.createConnection = Nt.Files = void 0;
  var Yh = require('node:util'),
    $u = Hi(),
    Ww = ju(),
    ci = Hh(),
    Wn = Vu();
  Qh(Vu(), Nt);
  Qh($h(), Nt);
  var Gh;
  (function (e) {
    ((e.uriToFilePath = ci.uriToFilePath),
      (e.resolveGlobalNodePath = ci.resolveGlobalNodePath),
      (e.resolveGlobalYarnPath = ci.resolveGlobalYarnPath),
      (e.resolve = ci.resolve),
      (e.resolveModulePath = ci.resolveModulePath));
  })(Gh || (Nt.Files = Gh = {}));
  var Kh;
  function rs() {
    if (Kh !== void 0)
      try {
        Kh.end();
      } catch {}
  }
  var Ar = !1,
    Jh;
  function Vw() {
    let e = '--clientProcessId';
    function t(n) {
      try {
        let r = parseInt(n);
        isNaN(r) ||
          (Jh = setInterval(() => {
            try {
              process.kill(r, 0);
            } catch {
              (rs(), process.exit(Ar ? 0 : 1));
            }
          }, 3e3));
      } catch {}
    }
    for (let n = 2; n < process.argv.length; n++) {
      let r = process.argv[n];
      if (r === e && n + 1 < process.argv.length) {
        t(process.argv[n + 1]);
        return;
      } else {
        let i = r.split('=');
        i[0] === e && t(i[1]);
      }
    }
  }
  Vw();
  var $w = {
    initialize: (e) => {
      let t = e.processId;
      $u.number(t) &&
        Jh === void 0 &&
        setInterval(() => {
          try {
            process.kill(t, 0);
          } catch {
            process.exit(Ar ? 0 : 1);
          }
        }, 3e3);
    },
    get shutdownReceived() {
      return Ar;
    },
    set shutdownReceived(e) {
      Ar = e;
    },
    exit: (e) => {
      (rs(), process.exit(e));
    },
  };
  function Yw(e, t, n, r) {
    let i, o, s, a;
    return (
      e !== void 0 && e.__brand === 'features' && ((i = e), (e = t), (t = n), (n = r)),
      Wn.ConnectionStrategy.is(e) || Wn.ConnectionOptions.is(e)
        ? (a = e)
        : ((o = e), (s = t), (a = n)),
      Gw(o, s, a, i)
    );
  }
  Nt.createConnection = Yw;
  function Gw(e, t, n, r) {
    let i = !1;
    if (!e && !t && process.argv.length > 2) {
      let u,
        c,
        f = process.argv.slice(2);
      for (let p = 0; p < f.length; p++) {
        let m = f[p];
        if (m === '--node-ipc') {
          ((e = new Wn.IPCMessageReader(process)), (t = new Wn.IPCMessageWriter(process)));
          break;
        } else if (m === '--stdio') {
          ((i = !0), (e = process.stdin), (t = process.stdout));
          break;
        } else if (m === '--socket') {
          u = parseInt(f[p + 1]);
          break;
        } else if (m === '--pipe') {
          c = f[p + 1];
          break;
        } else {
          var o = m.split('=');
          if (o[0] === '--socket') {
            u = parseInt(o[1]);
            break;
          } else if (o[0] === '--pipe') {
            c = o[1];
            break;
          }
        }
      }
      if (u) {
        let p = (0, Wn.createServerSocketTransport)(u);
        ((e = p[0]), (t = p[1]));
      } else if (c) {
        let p = (0, Wn.createServerPipeTransport)(c);
        ((e = p[0]), (t = p[1]));
      }
    }
    var s =
      "Use arguments of createConnection or set command line parameters: '--node-ipc', '--stdio' or '--socket={number}'";
    if (!e) throw new Error('Connection input stream is not set. ' + s);
    if (!t) throw new Error('Connection output stream is not set. ' + s);
    if ($u.func(e.read) && $u.func(e.on)) {
      let u = e;
      (u.on('end', () => {
        (rs(), process.exit(Ar ? 0 : 1));
      }),
        u.on('close', () => {
          (rs(), process.exit(Ar ? 0 : 1));
        }));
    }
    let a = (u) => {
      let c = (0, Wn.createProtocolConnection)(e, t, u, n);
      return (i && Kw(u), c);
    };
    return (0, Ww.createConnection)(a, $w, r);
  }
  function Kw(e) {
    function t(r) {
      return r.map((i) => (typeof i == 'string' ? i : (0, Yh.inspect)(i))).join(' ');
    }
    let n = new Map();
    ((console.assert = function (i, ...o) {
      if (!i)
        if (o.length === 0) e.error('Assertion failed');
        else {
          let [s, ...a] = o;
          e.error(`Assertion failed: ${s} ${t(a)}`);
        }
    }),
      (console.count = function (i = 'default') {
        let o = String(i),
          s = n.get(o) ?? 0;
        ((s += 1), n.set(o, s), e.log(`${o}: ${o}`));
      }),
      (console.countReset = function (i) {
        i === void 0 ? n.clear() : n.delete(String(i));
      }),
      (console.debug = function (...i) {
        e.log(t(i));
      }),
      (console.dir = function (i, o) {
        e.log((0, Yh.inspect)(i, o));
      }),
      (console.log = function (...i) {
        e.log(t(i));
      }),
      (console.error = function (...i) {
        e.error(t(i));
      }),
      (console.trace = function (...i) {
        let o = new Error().stack.replace(/(.+\n){2}/, ''),
          s = 'Trace';
        (i.length !== 0 && (s += `: ${t(i)}`),
          e.log(`${s}
${o}`));
      }),
      (console.warn = function (...i) {
        e.warn(t(i));
      }));
  }
});
var em = O((IA, Xh) => {
  'use strict';
  Xh.exports = Zh();
});
var li = O((NA, om) => {
  var Jw = Object.prototype.toString;
  om.exports = function (t) {
    if (t === void 0) return 'undefined';
    if (t === null) return 'null';
    var n = typeof t;
    if (n === 'boolean') return 'boolean';
    if (n === 'string') return 'string';
    if (n === 'number') return 'number';
    if (n === 'symbol') return 'symbol';
    if (n === 'function') return nk(t) ? 'generatorfunction' : 'function';
    if (Zw(t)) return 'array';
    if (ok(t)) return 'buffer';
    if (ik(t)) return 'arguments';
    if (ek(t)) return 'date';
    if (Xw(t)) return 'error';
    if (tk(t)) return 'regexp';
    switch (im(t)) {
      case 'Symbol':
        return 'symbol';
      case 'Promise':
        return 'promise';
      case 'WeakMap':
        return 'weakmap';
      case 'WeakSet':
        return 'weakset';
      case 'Map':
        return 'map';
      case 'Set':
        return 'set';
      case 'Int8Array':
        return 'int8array';
      case 'Uint8Array':
        return 'uint8array';
      case 'Uint8ClampedArray':
        return 'uint8clampedarray';
      case 'Int16Array':
        return 'int16array';
      case 'Uint16Array':
        return 'uint16array';
      case 'Int32Array':
        return 'int32array';
      case 'Uint32Array':
        return 'uint32array';
      case 'Float32Array':
        return 'float32array';
      case 'Float64Array':
        return 'float64array';
    }
    if (rk(t)) return 'generator';
    switch (((n = Jw.call(t)), n)) {
      case '[object Object]':
        return 'object';
      case '[object Map Iterator]':
        return 'mapiterator';
      case '[object Set Iterator]':
        return 'setiterator';
      case '[object String Iterator]':
        return 'stringiterator';
      case '[object Array Iterator]':
        return 'arrayiterator';
    }
    return n.slice(8, -1).toLowerCase().replace(/\s/g, '');
  };
  function im(e) {
    return typeof e.constructor == 'function' ? e.constructor.name : null;
  }
  function Zw(e) {
    return Array.isArray ? Array.isArray(e) : e instanceof Array;
  }
  function Xw(e) {
    return (
      e instanceof Error ||
      (typeof e.message == 'string' &&
        e.constructor &&
        typeof e.constructor.stackTraceLimit == 'number')
    );
  }
  function ek(e) {
    return e instanceof Date
      ? !0
      : typeof e.toDateString == 'function' &&
          typeof e.getDate == 'function' &&
          typeof e.setDate == 'function';
  }
  function tk(e) {
    return e instanceof RegExp
      ? !0
      : typeof e.flags == 'string' &&
          typeof e.ignoreCase == 'boolean' &&
          typeof e.multiline == 'boolean' &&
          typeof e.global == 'boolean';
  }
  function nk(e, t) {
    return im(e) === 'GeneratorFunction';
  }
  function rk(e) {
    return (
      typeof e.throw == 'function' && typeof e.return == 'function' && typeof e.next == 'function'
    );
  }
  function ik(e) {
    try {
      if (typeof e.length == 'number' && typeof e.callee == 'function') return !0;
    } catch (t) {
      if (t.message.indexOf('callee') !== -1) return !0;
    }
    return !1;
  }
  function ok(e) {
    return e.constructor && typeof e.constructor.isBuffer == 'function'
      ? e.constructor.isBuffer(e)
      : !1;
  }
});
var am = O((LA, sm) => {
  'use strict';
  sm.exports = function (t) {
    return typeof t < 'u' && t !== null && (typeof t == 'object' || typeof t == 'function');
  };
});
var lm = O((MA, cm) => {
  'use strict';
  var um = am();
  cm.exports = function (t) {
    um(t) || (t = {});
    for (var n = arguments.length, r = 1; r < n; r++) {
      var i = arguments[r];
      um(i) && sk(t, i);
    }
    return t;
  };
  function sk(e, t) {
    for (var n in t) ak(t, n) && (e[n] = t[n]);
  }
  function ak(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
});
var pm = O((jA, dm) => {
  'use strict';
  var uk = li(),
    ck = lm();
  dm.exports = function (e, t) {
    typeof t == 'function' && (t = { parse: t });
    var n = fk(e),
      r = { section_delimiter: '---', parse: pk },
      i = ck({}, r, t),
      o = i.section_delimiter,
      s = n.content.split(/\r?\n/),
      a = null,
      u = fm(),
      c = [],
      f = [];
    function p(q) {
      ((n.content = q), (a = []), (c = []));
    }
    function m(q) {
      f.length &&
        ((u.key = dk(f[0], o)),
        (u.content = q),
        i.parse(u, a),
        a.push(u),
        (u = fm()),
        (c = []),
        (f = []));
    }
    for (var h = 0; h < s.length; h++) {
      var A = s[h],
        I = f.length,
        L = A.trim();
      if (lk(L, o)) {
        if (L.length === 3 && h !== 0) {
          if (I === 0 || I === 2) {
            c.push(A);
            continue;
          }
          (f.push(L),
            (u.data = c.join(`
`)),
            (c = []));
          continue;
        }
        (a === null &&
          p(
            c.join(`
`)
          ),
          I === 2 &&
            m(
              c.join(`
`)
            ),
          f.push(L));
        continue;
      }
      c.push(A);
    }
    return (
      a === null
        ? p(
            c.join(`
`)
          )
        : m(
            c.join(`
`)
          ),
      (n.sections = a),
      n
    );
  };
  function lk(e, t) {
    return !(e.slice(0, t.length) !== t || e.charAt(t.length + 1) === t.slice(-1));
  }
  function fk(e) {
    if (
      (uk(e) !== 'object' && (e = { content: e }), typeof e.content != 'string' && !hk(e.content))
    )
      throw new TypeError('expected a buffer or string');
    return ((e.content = e.content.toString()), (e.sections = []), e);
  }
  function dk(e, t) {
    return e ? e.slice(t.length).trim() : '';
  }
  function fm() {
    return { key: '', data: '', content: '' };
  }
  function pk(e) {
    return e;
  }
  function hk(e) {
    return e && e.constructor && typeof e.constructor.isBuffer == 'function'
      ? e.constructor.isBuffer(e)
      : !1;
  }
});
var $n = O((BA, Vn) => {
  'use strict';
  function hm(e) {
    return typeof e > 'u' || e === null;
  }
  function mk(e) {
    return typeof e == 'object' && e !== null;
  }
  function gk(e) {
    return Array.isArray(e) ? e : hm(e) ? [] : [e];
  }
  function yk(e, t) {
    var n, r, i, o;
    if (t) for (o = Object.keys(t), n = 0, r = o.length; n < r; n += 1) ((i = o[n]), (e[i] = t[i]));
    return e;
  }
  function bk(e, t) {
    var n = '',
      r;
    for (r = 0; r < t; r += 1) n += e;
    return n;
  }
  function vk(e) {
    return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
  }
  Vn.exports.isNothing = hm;
  Vn.exports.isObject = mk;
  Vn.exports.toArray = gk;
  Vn.exports.repeat = bk;
  Vn.exports.isNegativeZero = vk;
  Vn.exports.extend = yk;
});
var qr = O((HA, mm) => {
  'use strict';
  function fi(e, t) {
    (Error.call(this),
      (this.name = 'YAMLException'),
      (this.reason = e),
      (this.mark = t),
      (this.message =
        (this.reason || '(unknown reason)') + (this.mark ? ' ' + this.mark.toString() : '')),
      Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = new Error().stack || ''));
  }
  fi.prototype = Object.create(Error.prototype);
  fi.prototype.constructor = fi;
  fi.prototype.toString = function (t) {
    var n = this.name + ': ';
    return (
      (n += this.reason || '(unknown reason)'),
      !t && this.mark && (n += ' ' + this.mark.toString()),
      n
    );
  };
  mm.exports = fi;
});
var bm = O((zA, ym) => {
  'use strict';
  var gm = $n();
  function Gu(e, t, n, r, i) {
    ((this.name = e), (this.buffer = t), (this.position = n), (this.line = r), (this.column = i));
  }
  Gu.prototype.getSnippet = function (t, n) {
    var r, i, o, s, a;
    if (!this.buffer) return null;
    for (
      t = t || 4, n = n || 75, r = '', i = this.position;
      i > 0 &&
      `\0\r
\x85\u2028\u2029`.indexOf(this.buffer.charAt(i - 1)) === -1;
    )
      if (((i -= 1), this.position - i > n / 2 - 1)) {
        ((r = ' ... '), (i += 5));
        break;
      }
    for (
      o = '', s = this.position;
      s < this.buffer.length &&
      `\0\r
\x85\u2028\u2029`.indexOf(this.buffer.charAt(s)) === -1;
    )
      if (((s += 1), s - this.position > n / 2 - 1)) {
        ((o = ' ... '), (s -= 5));
        break;
      }
    return (
      (a = this.buffer.slice(i, s)),
      gm.repeat(' ', t) +
        r +
        a +
        o +
        `
` +
        gm.repeat(' ', t + this.position - i + r.length) +
        '^'
    );
  };
  Gu.prototype.toString = function (t) {
    var n,
      r = '';
    return (
      this.name && (r += 'in "' + this.name + '" '),
      (r += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1)),
      t ||
        ((n = this.getSnippet()),
        n &&
          (r +=
            `:
` + n)),
      r
    );
  };
  ym.exports = Gu;
});
var We = O((UA, xm) => {
  'use strict';
  var vm = qr(),
    xk = [
      'kind',
      'resolve',
      'construct',
      'instanceOf',
      'predicate',
      'represent',
      'defaultStyle',
      'styleAliases',
    ],
    wk = ['scalar', 'sequence', 'mapping'];
  function kk(e) {
    var t = {};
    return (
      e !== null &&
        Object.keys(e).forEach(function (n) {
          e[n].forEach(function (r) {
            t[String(r)] = n;
          });
        }),
      t
    );
  }
  function _k(e, t) {
    if (
      ((t = t || {}),
      Object.keys(t).forEach(function (n) {
        if (xk.indexOf(n) === -1)
          throw new vm('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
      }),
      (this.tag = e),
      (this.kind = t.kind || null),
      (this.resolve =
        t.resolve ||
        function () {
          return !0;
        }),
      (this.construct =
        t.construct ||
        function (n) {
          return n;
        }),
      (this.instanceOf = t.instanceOf || null),
      (this.predicate = t.predicate || null),
      (this.represent = t.represent || null),
      (this.defaultStyle = t.defaultStyle || null),
      (this.styleAliases = kk(t.styleAliases || null)),
      wk.indexOf(this.kind) === -1)
    )
      throw new vm('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
  }
  xm.exports = _k;
});
var Yn = O((WA, km) => {
  'use strict';
  var wm = $n(),
    ss = qr(),
    Sk = We();
  function Ku(e, t, n) {
    var r = [];
    return (
      e.include.forEach(function (i) {
        n = Ku(i, t, n);
      }),
      e[t].forEach(function (i) {
        (n.forEach(function (o, s) {
          o.tag === i.tag && o.kind === i.kind && r.push(s);
        }),
          n.push(i));
      }),
      n.filter(function (i, o) {
        return r.indexOf(o) === -1;
      })
    );
  }
  function Ck() {
    var e = { scalar: {}, sequence: {}, mapping: {}, fallback: {} },
      t,
      n;
    function r(i) {
      e[i.kind][i.tag] = e.fallback[i.tag] = i;
    }
    for (t = 0, n = arguments.length; t < n; t += 1) arguments[t].forEach(r);
    return e;
  }
  function Pr(e) {
    ((this.include = e.include || []),
      (this.implicit = e.implicit || []),
      (this.explicit = e.explicit || []),
      this.implicit.forEach(function (t) {
        if (t.loadKind && t.loadKind !== 'scalar')
          throw new ss(
            'There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.'
          );
      }),
      (this.compiledImplicit = Ku(this, 'implicit', [])),
      (this.compiledExplicit = Ku(this, 'explicit', [])),
      (this.compiledTypeMap = Ck(this.compiledImplicit, this.compiledExplicit)));
  }
  Pr.DEFAULT = null;
  Pr.create = function () {
    var t, n;
    switch (arguments.length) {
      case 1:
        ((t = Pr.DEFAULT), (n = arguments[0]));
        break;
      case 2:
        ((t = arguments[0]), (n = arguments[1]));
        break;
      default:
        throw new ss('Wrong number of arguments for Schema.create function');
    }
    if (
      ((t = wm.toArray(t)),
      (n = wm.toArray(n)),
      !t.every(function (r) {
        return r instanceof Pr;
      }))
    )
      throw new ss(
        'Specified list of super schemas (or a single Schema object) contains a non-Schema object.'
      );
    if (
      !n.every(function (r) {
        return r instanceof Sk;
      })
    )
      throw new ss(
        'Specified list of YAML types (or a single Type object) contains a non-Type object.'
      );
    return new Pr({ include: t, explicit: n });
  };
  km.exports = Pr;
});
var Sm = O((VA, _m) => {
  'use strict';
  var Tk = We();
  _m.exports = new Tk('tag:yaml.org,2002:str', {
    kind: 'scalar',
    construct: function (e) {
      return e !== null ? e : '';
    },
  });
});
var Tm = O(($A, Cm) => {
  'use strict';
  var Dk = We();
  Cm.exports = new Dk('tag:yaml.org,2002:seq', {
    kind: 'sequence',
    construct: function (e) {
      return e !== null ? e : [];
    },
  });
});
var Em = O((YA, Dm) => {
  'use strict';
  var Ek = We();
  Dm.exports = new Ek('tag:yaml.org,2002:map', {
    kind: 'mapping',
    construct: function (e) {
      return e !== null ? e : {};
    },
  });
});
var as = O((GA, Rm) => {
  'use strict';
  var Rk = Yn();
  Rm.exports = new Rk({ explicit: [Sm(), Tm(), Em()] });
});
var qm = O((KA, Am) => {
  'use strict';
  var Ak = We();
  function qk(e) {
    if (e === null) return !0;
    var t = e.length;
    return (t === 1 && e === '~') || (t === 4 && (e === 'null' || e === 'Null' || e === 'NULL'));
  }
  function Pk() {
    return null;
  }
  function Ok(e) {
    return e === null;
  }
  Am.exports = new Ak('tag:yaml.org,2002:null', {
    kind: 'scalar',
    resolve: qk,
    construct: Pk,
    predicate: Ok,
    represent: {
      canonical: function () {
        return '~';
      },
      lowercase: function () {
        return 'null';
      },
      uppercase: function () {
        return 'NULL';
      },
      camelcase: function () {
        return 'Null';
      },
    },
    defaultStyle: 'lowercase',
  });
});
var Om = O((QA, Pm) => {
  'use strict';
  var Ik = We();
  function Fk(e) {
    if (e === null) return !1;
    var t = e.length;
    return (
      (t === 4 && (e === 'true' || e === 'True' || e === 'TRUE')) ||
      (t === 5 && (e === 'false' || e === 'False' || e === 'FALSE'))
    );
  }
  function Nk(e) {
    return e === 'true' || e === 'True' || e === 'TRUE';
  }
  function Lk(e) {
    return Object.prototype.toString.call(e) === '[object Boolean]';
  }
  Pm.exports = new Ik('tag:yaml.org,2002:bool', {
    kind: 'scalar',
    resolve: Fk,
    construct: Nk,
    predicate: Lk,
    represent: {
      lowercase: function (e) {
        return e ? 'true' : 'false';
      },
      uppercase: function (e) {
        return e ? 'TRUE' : 'FALSE';
      },
      camelcase: function (e) {
        return e ? 'True' : 'False';
      },
    },
    defaultStyle: 'lowercase',
  });
});
var Fm = O((JA, Im) => {
  'use strict';
  var Mk = $n(),
    jk = We();
  function Bk(e) {
    return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
  }
  function Hk(e) {
    return 48 <= e && e <= 55;
  }
  function zk(e) {
    return 48 <= e && e <= 57;
  }
  function Uk(e) {
    if (e === null) return !1;
    var t = e.length,
      n = 0,
      r = !1,
      i;
    if (!t) return !1;
    if (((i = e[n]), (i === '-' || i === '+') && (i = e[++n]), i === '0')) {
      if (n + 1 === t) return !0;
      if (((i = e[++n]), i === 'b')) {
        for (n++; n < t; n++)
          if (((i = e[n]), i !== '_')) {
            if (i !== '0' && i !== '1') return !1;
            r = !0;
          }
        return r && i !== '_';
      }
      if (i === 'x') {
        for (n++; n < t; n++)
          if (((i = e[n]), i !== '_')) {
            if (!Bk(e.charCodeAt(n))) return !1;
            r = !0;
          }
        return r && i !== '_';
      }
      for (; n < t; n++)
        if (((i = e[n]), i !== '_')) {
          if (!Hk(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== '_';
    }
    if (i === '_') return !1;
    for (; n < t; n++)
      if (((i = e[n]), i !== '_')) {
        if (i === ':') break;
        if (!zk(e.charCodeAt(n))) return !1;
        r = !0;
      }
    return !r || i === '_' ? !1 : i !== ':' ? !0 : /^(:[0-5]?[0-9])+$/.test(e.slice(n));
  }
  function Wk(e) {
    var t = e,
      n = 1,
      r,
      i,
      o = [];
    return (
      t.indexOf('_') !== -1 && (t = t.replace(/_/g, '')),
      (r = t[0]),
      (r === '-' || r === '+') && (r === '-' && (n = -1), (t = t.slice(1)), (r = t[0])),
      t === '0'
        ? 0
        : r === '0'
          ? t[1] === 'b'
            ? n * parseInt(t.slice(2), 2)
            : t[1] === 'x'
              ? n * parseInt(t, 16)
              : n * parseInt(t, 8)
          : t.indexOf(':') !== -1
            ? (t.split(':').forEach(function (s) {
                o.unshift(parseInt(s, 10));
              }),
              (t = 0),
              (i = 1),
              o.forEach(function (s) {
                ((t += s * i), (i *= 60));
              }),
              n * t)
            : n * parseInt(t, 10)
    );
  }
  function Vk(e) {
    return (
      Object.prototype.toString.call(e) === '[object Number]' &&
      e % 1 === 0 &&
      !Mk.isNegativeZero(e)
    );
  }
  Im.exports = new jk('tag:yaml.org,2002:int', {
    kind: 'scalar',
    resolve: Uk,
    construct: Wk,
    predicate: Vk,
    represent: {
      binary: function (e) {
        return e >= 0 ? '0b' + e.toString(2) : '-0b' + e.toString(2).slice(1);
      },
      octal: function (e) {
        return e >= 0 ? '0' + e.toString(8) : '-0' + e.toString(8).slice(1);
      },
      decimal: function (e) {
        return e.toString(10);
      },
      hexadecimal: function (e) {
        return e >= 0
          ? '0x' + e.toString(16).toUpperCase()
          : '-0x' + e.toString(16).toUpperCase().slice(1);
      },
    },
    defaultStyle: 'decimal',
    styleAliases: {
      binary: [2, 'bin'],
      octal: [8, 'oct'],
      decimal: [10, 'dec'],
      hexadecimal: [16, 'hex'],
    },
  });
});
var Mm = O((ZA, Lm) => {
  'use strict';
  var Nm = $n(),
    $k = We(),
    Yk = new RegExp(
      '^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$'
    );
  function Gk(e) {
    return !(e === null || !Yk.test(e) || e[e.length - 1] === '_');
  }
  function Kk(e) {
    var t, n, r, i;
    return (
      (t = e.replace(/_/g, '').toLowerCase()),
      (n = t[0] === '-' ? -1 : 1),
      (i = []),
      '+-'.indexOf(t[0]) >= 0 && (t = t.slice(1)),
      t === '.inf'
        ? n === 1
          ? Number.POSITIVE_INFINITY
          : Number.NEGATIVE_INFINITY
        : t === '.nan'
          ? NaN
          : t.indexOf(':') >= 0
            ? (t.split(':').forEach(function (o) {
                i.unshift(parseFloat(o, 10));
              }),
              (t = 0),
              (r = 1),
              i.forEach(function (o) {
                ((t += o * r), (r *= 60));
              }),
              n * t)
            : n * parseFloat(t, 10)
    );
  }
  var Qk = /^[-+]?[0-9]+e/;
  function Jk(e, t) {
    var n;
    if (isNaN(e))
      switch (t) {
        case 'lowercase':
          return '.nan';
        case 'uppercase':
          return '.NAN';
        case 'camelcase':
          return '.NaN';
      }
    else if (Number.POSITIVE_INFINITY === e)
      switch (t) {
        case 'lowercase':
          return '.inf';
        case 'uppercase':
          return '.INF';
        case 'camelcase':
          return '.Inf';
      }
    else if (Number.NEGATIVE_INFINITY === e)
      switch (t) {
        case 'lowercase':
          return '-.inf';
        case 'uppercase':
          return '-.INF';
        case 'camelcase':
          return '-.Inf';
      }
    else if (Nm.isNegativeZero(e)) return '-0.0';
    return ((n = e.toString(10)), Qk.test(n) ? n.replace('e', '.e') : n);
  }
  function Zk(e) {
    return (
      Object.prototype.toString.call(e) === '[object Number]' &&
      (e % 1 !== 0 || Nm.isNegativeZero(e))
    );
  }
  Lm.exports = new $k('tag:yaml.org,2002:float', {
    kind: 'scalar',
    resolve: Gk,
    construct: Kk,
    predicate: Zk,
    represent: Jk,
    defaultStyle: 'lowercase',
  });
});
var Qu = O((XA, jm) => {
  'use strict';
  var Xk = Yn();
  jm.exports = new Xk({ include: [as()], implicit: [qm(), Om(), Fm(), Mm()] });
});
var Ju = O((eq, Bm) => {
  'use strict';
  var e_ = Yn();
  Bm.exports = new e_({ include: [Qu()] });
});
var Wm = O((tq, Um) => {
  'use strict';
  var t_ = We(),
    Hm = new RegExp('^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$'),
    zm = new RegExp(
      '^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$'
    );
  function n_(e) {
    return e === null ? !1 : Hm.exec(e) !== null || zm.exec(e) !== null;
  }
  function r_(e) {
    var t,
      n,
      r,
      i,
      o,
      s,
      a,
      u = 0,
      c = null,
      f,
      p,
      m;
    if (((t = Hm.exec(e)), t === null && (t = zm.exec(e)), t === null))
      throw new Error('Date resolve error');
    if (((n = +t[1]), (r = +t[2] - 1), (i = +t[3]), !t[4])) return new Date(Date.UTC(n, r, i));
    if (((o = +t[4]), (s = +t[5]), (a = +t[6]), t[7])) {
      for (u = t[7].slice(0, 3); u.length < 3; ) u += '0';
      u = +u;
    }
    return (
      t[9] &&
        ((f = +t[10]), (p = +(t[11] || 0)), (c = (f * 60 + p) * 6e4), t[9] === '-' && (c = -c)),
      (m = new Date(Date.UTC(n, r, i, o, s, a, u))),
      c && m.setTime(m.getTime() - c),
      m
    );
  }
  function i_(e) {
    return e.toISOString();
  }
  Um.exports = new t_('tag:yaml.org,2002:timestamp', {
    kind: 'scalar',
    resolve: n_,
    construct: r_,
    instanceOf: Date,
    represent: i_,
  });
});
var $m = O((nq, Vm) => {
  'use strict';
  var o_ = We();
  function s_(e) {
    return e === '<<' || e === null;
  }
  Vm.exports = new o_('tag:yaml.org,2002:merge', { kind: 'scalar', resolve: s_ });
});
var Km = O((rq, Gm) => {
  'use strict';
  var Gn;
  try {
    ((Ym = require), (Gn = Ym('buffer').Buffer));
  } catch {}
  var Ym,
    a_ = We(),
    Zu = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function u_(e) {
    if (e === null) return !1;
    var t,
      n,
      r = 0,
      i = e.length,
      o = Zu;
    for (n = 0; n < i; n++)
      if (((t = o.indexOf(e.charAt(n))), !(t > 64))) {
        if (t < 0) return !1;
        r += 6;
      }
    return r % 8 === 0;
  }
  function c_(e) {
    var t,
      n,
      r = e.replace(/[\r\n=]/g, ''),
      i = r.length,
      o = Zu,
      s = 0,
      a = [];
    for (t = 0; t < i; t++)
      (t % 4 === 0 && t && (a.push((s >> 16) & 255), a.push((s >> 8) & 255), a.push(s & 255)),
        (s = (s << 6) | o.indexOf(r.charAt(t))));
    return (
      (n = (i % 4) * 6),
      n === 0
        ? (a.push((s >> 16) & 255), a.push((s >> 8) & 255), a.push(s & 255))
        : n === 18
          ? (a.push((s >> 10) & 255), a.push((s >> 2) & 255))
          : n === 12 && a.push((s >> 4) & 255),
      Gn ? (Gn.from ? Gn.from(a) : new Gn(a)) : a
    );
  }
  function l_(e) {
    var t = '',
      n = 0,
      r,
      i,
      o = e.length,
      s = Zu;
    for (r = 0; r < o; r++)
      (r % 3 === 0 &&
        r &&
        ((t += s[(n >> 18) & 63]),
        (t += s[(n >> 12) & 63]),
        (t += s[(n >> 6) & 63]),
        (t += s[n & 63])),
        (n = (n << 8) + e[r]));
    return (
      (i = o % 3),
      i === 0
        ? ((t += s[(n >> 18) & 63]),
          (t += s[(n >> 12) & 63]),
          (t += s[(n >> 6) & 63]),
          (t += s[n & 63]))
        : i === 2
          ? ((t += s[(n >> 10) & 63]),
            (t += s[(n >> 4) & 63]),
            (t += s[(n << 2) & 63]),
            (t += s[64]))
          : i === 1 &&
            ((t += s[(n >> 2) & 63]), (t += s[(n << 4) & 63]), (t += s[64]), (t += s[64])),
      t
    );
  }
  function f_(e) {
    return Gn && Gn.isBuffer(e);
  }
  Gm.exports = new a_('tag:yaml.org,2002:binary', {
    kind: 'scalar',
    resolve: u_,
    construct: c_,
    predicate: f_,
    represent: l_,
  });
});
var Jm = O((iq, Qm) => {
  'use strict';
  var d_ = We(),
    p_ = Object.prototype.hasOwnProperty,
    h_ = Object.prototype.toString;
  function m_(e) {
    if (e === null) return !0;
    var t = [],
      n,
      r,
      i,
      o,
      s,
      a = e;
    for (n = 0, r = a.length; n < r; n += 1) {
      if (((i = a[n]), (s = !1), h_.call(i) !== '[object Object]')) return !1;
      for (o in i)
        if (p_.call(i, o))
          if (!s) s = !0;
          else return !1;
      if (!s) return !1;
      if (t.indexOf(o) === -1) t.push(o);
      else return !1;
    }
    return !0;
  }
  function g_(e) {
    return e !== null ? e : [];
  }
  Qm.exports = new d_('tag:yaml.org,2002:omap', { kind: 'sequence', resolve: m_, construct: g_ });
});
var Xm = O((oq, Zm) => {
  'use strict';
  var y_ = We(),
    b_ = Object.prototype.toString;
  function v_(e) {
    if (e === null) return !0;
    var t,
      n,
      r,
      i,
      o,
      s = e;
    for (o = new Array(s.length), t = 0, n = s.length; t < n; t += 1) {
      if (((r = s[t]), b_.call(r) !== '[object Object]' || ((i = Object.keys(r)), i.length !== 1)))
        return !1;
      o[t] = [i[0], r[i[0]]];
    }
    return !0;
  }
  function x_(e) {
    if (e === null) return [];
    var t,
      n,
      r,
      i,
      o,
      s = e;
    for (o = new Array(s.length), t = 0, n = s.length; t < n; t += 1)
      ((r = s[t]), (i = Object.keys(r)), (o[t] = [i[0], r[i[0]]]));
    return o;
  }
  Zm.exports = new y_('tag:yaml.org,2002:pairs', { kind: 'sequence', resolve: v_, construct: x_ });
});
var tg = O((sq, eg) => {
  'use strict';
  var w_ = We(),
    k_ = Object.prototype.hasOwnProperty;
  function __(e) {
    if (e === null) return !0;
    var t,
      n = e;
    for (t in n) if (k_.call(n, t) && n[t] !== null) return !1;
    return !0;
  }
  function S_(e) {
    return e !== null ? e : {};
  }
  eg.exports = new w_('tag:yaml.org,2002:set', { kind: 'mapping', resolve: __, construct: S_ });
});
var Or = O((aq, ng) => {
  'use strict';
  var C_ = Yn();
  ng.exports = new C_({
    include: [Ju()],
    implicit: [Wm(), $m()],
    explicit: [Km(), Jm(), Xm(), tg()],
  });
});
var ig = O((uq, rg) => {
  'use strict';
  var T_ = We();
  function D_() {
    return !0;
  }
  function E_() {}
  function R_() {
    return '';
  }
  function A_(e) {
    return typeof e > 'u';
  }
  rg.exports = new T_('tag:yaml.org,2002:js/undefined', {
    kind: 'scalar',
    resolve: D_,
    construct: E_,
    predicate: A_,
    represent: R_,
  });
});
var sg = O((cq, og) => {
  'use strict';
  var q_ = We();
  function P_(e) {
    if (e === null || e.length === 0) return !1;
    var t = e,
      n = /\/([gim]*)$/.exec(e),
      r = '';
    return !(t[0] === '/' && (n && (r = n[1]), r.length > 3 || t[t.length - r.length - 1] !== '/'));
  }
  function O_(e) {
    var t = e,
      n = /\/([gim]*)$/.exec(e),
      r = '';
    return (
      t[0] === '/' && (n && (r = n[1]), (t = t.slice(1, t.length - r.length - 1))),
      new RegExp(t, r)
    );
  }
  function I_(e) {
    var t = '/' + e.source + '/';
    return (e.global && (t += 'g'), e.multiline && (t += 'm'), e.ignoreCase && (t += 'i'), t);
  }
  function F_(e) {
    return Object.prototype.toString.call(e) === '[object RegExp]';
  }
  og.exports = new q_('tag:yaml.org,2002:js/regexp', {
    kind: 'scalar',
    resolve: P_,
    construct: O_,
    predicate: F_,
    represent: I_,
  });
});
var cg = O((lq, ug) => {
  'use strict';
  var us;
  try {
    ((ag = require), (us = ag('esprima')));
  } catch {
    typeof window < 'u' && (us = window.esprima);
  }
  var ag,
    N_ = We();
  function L_(e) {
    if (e === null) return !1;
    try {
      var t = '(' + e + ')',
        n = us.parse(t, { range: !0 });
      return !(
        n.type !== 'Program' ||
        n.body.length !== 1 ||
        n.body[0].type !== 'ExpressionStatement' ||
        (n.body[0].expression.type !== 'ArrowFunctionExpression' &&
          n.body[0].expression.type !== 'FunctionExpression')
      );
    } catch {
      return !1;
    }
  }
  function M_(e) {
    var t = '(' + e + ')',
      n = us.parse(t, { range: !0 }),
      r = [],
      i;
    if (
      n.type !== 'Program' ||
      n.body.length !== 1 ||
      n.body[0].type !== 'ExpressionStatement' ||
      (n.body[0].expression.type !== 'ArrowFunctionExpression' &&
        n.body[0].expression.type !== 'FunctionExpression')
    )
      throw new Error('Failed to resolve function');
    return (
      n.body[0].expression.params.forEach(function (o) {
        r.push(o.name);
      }),
      (i = n.body[0].expression.body.range),
      n.body[0].expression.body.type === 'BlockStatement'
        ? new Function(r, t.slice(i[0] + 1, i[1] - 1))
        : new Function(r, 'return ' + t.slice(i[0], i[1]))
    );
  }
  function j_(e) {
    return e.toString();
  }
  function B_(e) {
    return Object.prototype.toString.call(e) === '[object Function]';
  }
  ug.exports = new N_('tag:yaml.org,2002:js/function', {
    kind: 'scalar',
    resolve: L_,
    construct: M_,
    predicate: B_,
    represent: j_,
  });
});
var di = O((fq, fg) => {
  'use strict';
  var lg = Yn();
  fg.exports = lg.DEFAULT = new lg({ include: [Or()], explicit: [ig(), sg(), cg()] });
});
var qg = O((dq, pi) => {
  'use strict';
  var on = $n(),
    bg = qr(),
    H_ = bm(),
    vg = Or(),
    z_ = di(),
    Cn = Object.prototype.hasOwnProperty,
    cs = 1,
    xg = 2,
    wg = 3,
    ls = 4,
    Xu = 1,
    U_ = 2,
    dg = 3,
    W_ =
      /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
    V_ = /[\x85\u2028\u2029]/,
    $_ = /[,\[\]\{\}]/,
    kg = /^(?:!|!!|![a-z\-]+!)$/i,
    _g = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function pg(e) {
    return Object.prototype.toString.call(e);
  }
  function Jt(e) {
    return e === 10 || e === 13;
  }
  function Qn(e) {
    return e === 9 || e === 32;
  }
  function wt(e) {
    return e === 9 || e === 32 || e === 10 || e === 13;
  }
  function Ir(e) {
    return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
  }
  function Y_(e) {
    var t;
    return 48 <= e && e <= 57 ? e - 48 : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
  }
  function G_(e) {
    return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
  }
  function K_(e) {
    return 48 <= e && e <= 57 ? e - 48 : -1;
  }
  function hg(e) {
    return e === 48
      ? '\0'
      : e === 97
        ? '\x07'
        : e === 98
          ? '\b'
          : e === 116 || e === 9
            ? '	'
            : e === 110
              ? `
`
              : e === 118
                ? '\v'
                : e === 102
                  ? '\f'
                  : e === 114
                    ? '\r'
                    : e === 101
                      ? '\x1B'
                      : e === 32
                        ? ' '
                        : e === 34
                          ? '"'
                          : e === 47
                            ? '/'
                            : e === 92
                              ? '\\'
                              : e === 78
                                ? '\x85'
                                : e === 95
                                  ? '\xA0'
                                  : e === 76
                                    ? '\u2028'
                                    : e === 80
                                      ? '\u2029'
                                      : '';
  }
  function Q_(e) {
    return e <= 65535
      ? String.fromCharCode(e)
      : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
  }
  function Sg(e, t, n) {
    t === '__proto__'
      ? Object.defineProperty(e, t, { configurable: !0, enumerable: !0, writable: !0, value: n })
      : (e[t] = n);
  }
  var Cg = new Array(256),
    Tg = new Array(256);
  for (Kn = 0; Kn < 256; Kn++) ((Cg[Kn] = hg(Kn) ? 1 : 0), (Tg[Kn] = hg(Kn)));
  var Kn;
  function J_(e, t) {
    ((this.input = e),
      (this.filename = t.filename || null),
      (this.schema = t.schema || z_),
      (this.onWarning = t.onWarning || null),
      (this.legacy = t.legacy || !1),
      (this.json = t.json || !1),
      (this.listener = t.listener || null),
      (this.implicitTypes = this.schema.compiledImplicit),
      (this.typeMap = this.schema.compiledTypeMap),
      (this.length = e.length),
      (this.position = 0),
      (this.line = 0),
      (this.lineStart = 0),
      (this.lineIndent = 0),
      (this.documents = []));
  }
  function Dg(e, t) {
    return new bg(t, new H_(e.filename, e.input, e.position, e.line, e.position - e.lineStart));
  }
  function J(e, t) {
    throw Dg(e, t);
  }
  function fs(e, t) {
    e.onWarning && e.onWarning.call(null, Dg(e, t));
  }
  var mg = {
    YAML: function (t, n, r) {
      var i, o, s;
      (t.version !== null && J(t, 'duplication of %YAML directive'),
        r.length !== 1 && J(t, 'YAML directive accepts exactly one argument'),
        (i = /^([0-9]+)\.([0-9]+)$/.exec(r[0])),
        i === null && J(t, 'ill-formed argument of the YAML directive'),
        (o = parseInt(i[1], 10)),
        (s = parseInt(i[2], 10)),
        o !== 1 && J(t, 'unacceptable YAML version of the document'),
        (t.version = r[0]),
        (t.checkLineBreaks = s < 2),
        s !== 1 && s !== 2 && fs(t, 'unsupported YAML version of the document'));
    },
    TAG: function (t, n, r) {
      var i, o;
      (r.length !== 2 && J(t, 'TAG directive accepts exactly two arguments'),
        (i = r[0]),
        (o = r[1]),
        kg.test(i) || J(t, 'ill-formed tag handle (first argument) of the TAG directive'),
        Cn.call(t.tagMap, i) &&
          J(t, 'there is a previously declared suffix for "' + i + '" tag handle'),
        _g.test(o) || J(t, 'ill-formed tag prefix (second argument) of the TAG directive'),
        (t.tagMap[i] = o));
    },
  };
  function Sn(e, t, n, r) {
    var i, o, s, a;
    if (t < n) {
      if (((a = e.input.slice(t, n)), r))
        for (i = 0, o = a.length; i < o; i += 1)
          ((s = a.charCodeAt(i)),
            s === 9 || (32 <= s && s <= 1114111) || J(e, 'expected valid JSON character'));
      else W_.test(a) && J(e, 'the stream contains non-printable characters');
      e.result += a;
    }
  }
  function gg(e, t, n, r) {
    var i, o, s, a;
    for (
      on.isObject(n) || J(e, 'cannot merge mappings; the provided source object is unacceptable'),
        i = Object.keys(n),
        s = 0,
        a = i.length;
      s < a;
      s += 1
    )
      ((o = i[s]), Cn.call(t, o) || (Sg(t, o, n[o]), (r[o] = !0)));
  }
  function Fr(e, t, n, r, i, o, s, a) {
    var u, c;
    if (Array.isArray(i))
      for (i = Array.prototype.slice.call(i), u = 0, c = i.length; u < c; u += 1)
        (Array.isArray(i[u]) && J(e, 'nested arrays are not supported inside keys'),
          typeof i == 'object' && pg(i[u]) === '[object Object]' && (i[u] = '[object Object]'));
    if (
      (typeof i == 'object' && pg(i) === '[object Object]' && (i = '[object Object]'),
      (i = String(i)),
      t === null && (t = {}),
      r === 'tag:yaml.org,2002:merge')
    )
      if (Array.isArray(o)) for (u = 0, c = o.length; u < c; u += 1) gg(e, t, o[u], n);
      else gg(e, t, o, n);
    else
      (!e.json &&
        !Cn.call(n, i) &&
        Cn.call(t, i) &&
        ((e.line = s || e.line), (e.position = a || e.position), J(e, 'duplicated mapping key')),
        Sg(t, i, o),
        delete n[i]);
    return t;
  }
  function ec(e) {
    var t;
    ((t = e.input.charCodeAt(e.position)),
      t === 10
        ? e.position++
        : t === 13
          ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++)
          : J(e, 'a line break is expected'),
      (e.line += 1),
      (e.lineStart = e.position));
  }
  function Be(e, t, n) {
    for (var r = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
      for (; Qn(i); ) i = e.input.charCodeAt(++e.position);
      if (t && i === 35)
        do i = e.input.charCodeAt(++e.position);
        while (i !== 10 && i !== 13 && i !== 0);
      if (Jt(i))
        for (ec(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
          (e.lineIndent++, (i = e.input.charCodeAt(++e.position)));
      else break;
    }
    return (n !== -1 && r !== 0 && e.lineIndent < n && fs(e, 'deficient indentation'), r);
  }
  function ds(e) {
    var t = e.position,
      n;
    return (
      (n = e.input.charCodeAt(t)),
      !!(
        (n === 45 || n === 46) &&
        n === e.input.charCodeAt(t + 1) &&
        n === e.input.charCodeAt(t + 2) &&
        ((t += 3), (n = e.input.charCodeAt(t)), n === 0 || wt(n))
      )
    );
  }
  function tc(e, t) {
    t === 1
      ? (e.result += ' ')
      : t > 1 &&
        (e.result += on.repeat(
          `
`,
          t - 1
        ));
  }
  function Z_(e, t, n) {
    var r,
      i,
      o,
      s,
      a,
      u,
      c,
      f,
      p = e.kind,
      m = e.result,
      h;
    if (
      ((h = e.input.charCodeAt(e.position)),
      wt(h) ||
        Ir(h) ||
        h === 35 ||
        h === 38 ||
        h === 42 ||
        h === 33 ||
        h === 124 ||
        h === 62 ||
        h === 39 ||
        h === 34 ||
        h === 37 ||
        h === 64 ||
        h === 96 ||
        ((h === 63 || h === 45) &&
          ((i = e.input.charCodeAt(e.position + 1)), wt(i) || (n && Ir(i)))))
    )
      return !1;
    for (e.kind = 'scalar', e.result = '', o = s = e.position, a = !1; h !== 0; ) {
      if (h === 58) {
        if (((i = e.input.charCodeAt(e.position + 1)), wt(i) || (n && Ir(i)))) break;
      } else if (h === 35) {
        if (((r = e.input.charCodeAt(e.position - 1)), wt(r))) break;
      } else {
        if ((e.position === e.lineStart && ds(e)) || (n && Ir(h))) break;
        if (Jt(h))
          if (
            ((u = e.line), (c = e.lineStart), (f = e.lineIndent), Be(e, !1, -1), e.lineIndent >= t)
          ) {
            ((a = !0), (h = e.input.charCodeAt(e.position)));
            continue;
          } else {
            ((e.position = s), (e.line = u), (e.lineStart = c), (e.lineIndent = f));
            break;
          }
      }
      (a && (Sn(e, o, s, !1), tc(e, e.line - u), (o = s = e.position), (a = !1)),
        Qn(h) || (s = e.position + 1),
        (h = e.input.charCodeAt(++e.position)));
    }
    return (Sn(e, o, s, !1), e.result ? !0 : ((e.kind = p), (e.result = m), !1));
  }
  function X_(e, t) {
    var n, r, i;
    if (((n = e.input.charCodeAt(e.position)), n !== 39)) return !1;
    for (
      e.kind = 'scalar', e.result = '', e.position++, r = i = e.position;
      (n = e.input.charCodeAt(e.position)) !== 0;
    )
      if (n === 39)
        if ((Sn(e, r, e.position, !0), (n = e.input.charCodeAt(++e.position)), n === 39))
          ((r = e.position), e.position++, (i = e.position));
        else return !0;
      else
        Jt(n)
          ? (Sn(e, r, i, !0), tc(e, Be(e, !1, t)), (r = i = e.position))
          : e.position === e.lineStart && ds(e)
            ? J(e, 'unexpected end of the document within a single quoted scalar')
            : (e.position++, (i = e.position));
    J(e, 'unexpected end of the stream within a single quoted scalar');
  }
  function eS(e, t) {
    var n, r, i, o, s, a;
    if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
    for (
      e.kind = 'scalar', e.result = '', e.position++, n = r = e.position;
      (a = e.input.charCodeAt(e.position)) !== 0;
    ) {
      if (a === 34) return (Sn(e, n, e.position, !0), e.position++, !0);
      if (a === 92) {
        if ((Sn(e, n, e.position, !0), (a = e.input.charCodeAt(++e.position)), Jt(a))) Be(e, !1, t);
        else if (a < 256 && Cg[a]) ((e.result += Tg[a]), e.position++);
        else if ((s = G_(a)) > 0) {
          for (i = s, o = 0; i > 0; i--)
            ((a = e.input.charCodeAt(++e.position)),
              (s = Y_(a)) >= 0 ? (o = (o << 4) + s) : J(e, 'expected hexadecimal character'));
          ((e.result += Q_(o)), e.position++);
        } else J(e, 'unknown escape sequence');
        n = r = e.position;
      } else
        Jt(a)
          ? (Sn(e, n, r, !0), tc(e, Be(e, !1, t)), (n = r = e.position))
          : e.position === e.lineStart && ds(e)
            ? J(e, 'unexpected end of the document within a double quoted scalar')
            : (e.position++, (r = e.position));
    }
    J(e, 'unexpected end of the stream within a double quoted scalar');
  }
  function tS(e, t) {
    var n = !0,
      r,
      i = e.tag,
      o,
      s = e.anchor,
      a,
      u,
      c,
      f,
      p,
      m = {},
      h,
      A,
      I,
      L;
    if (((L = e.input.charCodeAt(e.position)), L === 91)) ((u = 93), (p = !1), (o = []));
    else if (L === 123) ((u = 125), (p = !0), (o = {}));
    else return !1;
    for (
      e.anchor !== null && (e.anchorMap[e.anchor] = o), L = e.input.charCodeAt(++e.position);
      L !== 0;
    ) {
      if ((Be(e, !0, t), (L = e.input.charCodeAt(e.position)), L === u))
        return (
          e.position++,
          (e.tag = i),
          (e.anchor = s),
          (e.kind = p ? 'mapping' : 'sequence'),
          (e.result = o),
          !0
        );
      (n || J(e, 'missed comma between flow collection entries'),
        (A = h = I = null),
        (c = f = !1),
        L === 63 &&
          ((a = e.input.charCodeAt(e.position + 1)),
          wt(a) && ((c = f = !0), e.position++, Be(e, !0, t))),
        (r = e.line),
        Nr(e, t, cs, !1, !0),
        (A = e.tag),
        (h = e.result),
        Be(e, !0, t),
        (L = e.input.charCodeAt(e.position)),
        (f || e.line === r) &&
          L === 58 &&
          ((c = !0),
          (L = e.input.charCodeAt(++e.position)),
          Be(e, !0, t),
          Nr(e, t, cs, !1, !0),
          (I = e.result)),
        p ? Fr(e, o, m, A, h, I) : c ? o.push(Fr(e, null, m, A, h, I)) : o.push(h),
        Be(e, !0, t),
        (L = e.input.charCodeAt(e.position)),
        L === 44 ? ((n = !0), (L = e.input.charCodeAt(++e.position))) : (n = !1));
    }
    J(e, 'unexpected end of the stream within a flow collection');
  }
  function nS(e, t) {
    var n,
      r,
      i = Xu,
      o = !1,
      s = !1,
      a = t,
      u = 0,
      c = !1,
      f,
      p;
    if (((p = e.input.charCodeAt(e.position)), p === 124)) r = !1;
    else if (p === 62) r = !0;
    else return !1;
    for (e.kind = 'scalar', e.result = ''; p !== 0; )
      if (((p = e.input.charCodeAt(++e.position)), p === 43 || p === 45))
        Xu === i ? (i = p === 43 ? dg : U_) : J(e, 'repeat of a chomping mode identifier');
      else if ((f = K_(p)) >= 0)
        f === 0
          ? J(e, 'bad explicit indentation width of a block scalar; it cannot be less than one')
          : s
            ? J(e, 'repeat of an indentation width identifier')
            : ((a = t + f - 1), (s = !0));
      else break;
    if (Qn(p)) {
      do p = e.input.charCodeAt(++e.position);
      while (Qn(p));
      if (p === 35)
        do p = e.input.charCodeAt(++e.position);
        while (!Jt(p) && p !== 0);
    }
    for (; p !== 0; ) {
      for (
        ec(e), e.lineIndent = 0, p = e.input.charCodeAt(e.position);
        (!s || e.lineIndent < a) && p === 32;
      )
        (e.lineIndent++, (p = e.input.charCodeAt(++e.position)));
      if ((!s && e.lineIndent > a && (a = e.lineIndent), Jt(p))) {
        u++;
        continue;
      }
      if (e.lineIndent < a) {
        i === dg
          ? (e.result += on.repeat(
              `
`,
              o ? 1 + u : u
            ))
          : i === Xu &&
            o &&
            (e.result += `
`);
        break;
      }
      for (
        r
          ? Qn(p)
            ? ((c = !0),
              (e.result += on.repeat(
                `
`,
                o ? 1 + u : u
              )))
            : c
              ? ((c = !1),
                (e.result += on.repeat(
                  `
`,
                  u + 1
                )))
              : u === 0
                ? o && (e.result += ' ')
                : (e.result += on.repeat(
                    `
`,
                    u
                  ))
          : (e.result += on.repeat(
              `
`,
              o ? 1 + u : u
            )),
          o = !0,
          s = !0,
          u = 0,
          n = e.position;
        !Jt(p) && p !== 0;
      )
        p = e.input.charCodeAt(++e.position);
      Sn(e, n, e.position, !1);
    }
    return !0;
  }
  function yg(e, t) {
    var n,
      r = e.tag,
      i = e.anchor,
      o = [],
      s,
      a = !1,
      u;
    for (
      e.anchor !== null && (e.anchorMap[e.anchor] = o), u = e.input.charCodeAt(e.position);
      u !== 0 && !(u !== 45 || ((s = e.input.charCodeAt(e.position + 1)), !wt(s)));
    ) {
      if (((a = !0), e.position++, Be(e, !0, -1) && e.lineIndent <= t)) {
        (o.push(null), (u = e.input.charCodeAt(e.position)));
        continue;
      }
      if (
        ((n = e.line),
        Nr(e, t, wg, !1, !0),
        o.push(e.result),
        Be(e, !0, -1),
        (u = e.input.charCodeAt(e.position)),
        (e.line === n || e.lineIndent > t) && u !== 0)
      )
        J(e, 'bad indentation of a sequence entry');
      else if (e.lineIndent < t) break;
    }
    return a ? ((e.tag = r), (e.anchor = i), (e.kind = 'sequence'), (e.result = o), !0) : !1;
  }
  function rS(e, t, n) {
    var r,
      i,
      o,
      s,
      a = e.tag,
      u = e.anchor,
      c = {},
      f = {},
      p = null,
      m = null,
      h = null,
      A = !1,
      I = !1,
      L;
    for (
      e.anchor !== null && (e.anchorMap[e.anchor] = c), L = e.input.charCodeAt(e.position);
      L !== 0;
    ) {
      if (
        ((r = e.input.charCodeAt(e.position + 1)),
        (o = e.line),
        (s = e.position),
        (L === 63 || L === 58) && wt(r))
      )
        (L === 63
          ? (A && (Fr(e, c, f, p, m, null), (p = m = h = null)), (I = !0), (A = !0), (i = !0))
          : A
            ? ((A = !1), (i = !0))
            : J(
                e,
                'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line'
              ),
          (e.position += 1),
          (L = r));
      else if (Nr(e, n, xg, !1, !0))
        if (e.line === o) {
          for (L = e.input.charCodeAt(e.position); Qn(L); ) L = e.input.charCodeAt(++e.position);
          if (L === 58)
            ((L = e.input.charCodeAt(++e.position)),
              wt(L) ||
                J(
                  e,
                  'a whitespace character is expected after the key-value separator within a block mapping'
                ),
              A && (Fr(e, c, f, p, m, null), (p = m = h = null)),
              (I = !0),
              (A = !1),
              (i = !1),
              (p = e.tag),
              (m = e.result));
          else if (I) J(e, 'can not read an implicit mapping pair; a colon is missed');
          else return ((e.tag = a), (e.anchor = u), !0);
        } else if (I)
          J(e, 'can not read a block mapping entry; a multiline key may not be an implicit key');
        else return ((e.tag = a), (e.anchor = u), !0);
      else break;
      if (
        ((e.line === o || e.lineIndent > t) &&
          (Nr(e, t, ls, !0, i) && (A ? (m = e.result) : (h = e.result)),
          A || (Fr(e, c, f, p, m, h, o, s), (p = m = h = null)),
          Be(e, !0, -1),
          (L = e.input.charCodeAt(e.position))),
        e.lineIndent > t && L !== 0)
      )
        J(e, 'bad indentation of a mapping entry');
      else if (e.lineIndent < t) break;
    }
    return (
      A && Fr(e, c, f, p, m, null),
      I && ((e.tag = a), (e.anchor = u), (e.kind = 'mapping'), (e.result = c)),
      I
    );
  }
  function iS(e) {
    var t,
      n = !1,
      r = !1,
      i,
      o,
      s;
    if (((s = e.input.charCodeAt(e.position)), s !== 33)) return !1;
    if (
      (e.tag !== null && J(e, 'duplication of a tag property'),
      (s = e.input.charCodeAt(++e.position)),
      s === 60
        ? ((n = !0), (s = e.input.charCodeAt(++e.position)))
        : s === 33
          ? ((r = !0), (i = '!!'), (s = e.input.charCodeAt(++e.position)))
          : (i = '!'),
      (t = e.position),
      n)
    ) {
      do s = e.input.charCodeAt(++e.position);
      while (s !== 0 && s !== 62);
      e.position < e.length
        ? ((o = e.input.slice(t, e.position)), (s = e.input.charCodeAt(++e.position)))
        : J(e, 'unexpected end of the stream within a verbatim tag');
    } else {
      for (; s !== 0 && !wt(s); )
        (s === 33 &&
          (r
            ? J(e, 'tag suffix cannot contain exclamation marks')
            : ((i = e.input.slice(t - 1, e.position + 1)),
              kg.test(i) || J(e, 'named tag handle cannot contain such characters'),
              (r = !0),
              (t = e.position + 1))),
          (s = e.input.charCodeAt(++e.position)));
      ((o = e.input.slice(t, e.position)),
        $_.test(o) && J(e, 'tag suffix cannot contain flow indicator characters'));
    }
    return (
      o && !_g.test(o) && J(e, 'tag name cannot contain such characters: ' + o),
      n
        ? (e.tag = o)
        : Cn.call(e.tagMap, i)
          ? (e.tag = e.tagMap[i] + o)
          : i === '!'
            ? (e.tag = '!' + o)
            : i === '!!'
              ? (e.tag = 'tag:yaml.org,2002:' + o)
              : J(e, 'undeclared tag handle "' + i + '"'),
      !0
    );
  }
  function oS(e) {
    var t, n;
    if (((n = e.input.charCodeAt(e.position)), n !== 38)) return !1;
    for (
      e.anchor !== null && J(e, 'duplication of an anchor property'),
        n = e.input.charCodeAt(++e.position),
        t = e.position;
      n !== 0 && !wt(n) && !Ir(n);
    )
      n = e.input.charCodeAt(++e.position);
    return (
      e.position === t && J(e, 'name of an anchor node must contain at least one character'),
      (e.anchor = e.input.slice(t, e.position)),
      !0
    );
  }
  function sS(e) {
    var t, n, r;
    if (((r = e.input.charCodeAt(e.position)), r !== 42)) return !1;
    for (r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !wt(r) && !Ir(r); )
      r = e.input.charCodeAt(++e.position);
    return (
      e.position === t && J(e, 'name of an alias node must contain at least one character'),
      (n = e.input.slice(t, e.position)),
      Cn.call(e.anchorMap, n) || J(e, 'unidentified alias "' + n + '"'),
      (e.result = e.anchorMap[n]),
      Be(e, !0, -1),
      !0
    );
  }
  function Nr(e, t, n, r, i) {
    var o,
      s,
      a,
      u = 1,
      c = !1,
      f = !1,
      p,
      m,
      h,
      A,
      I;
    if (
      (e.listener !== null && e.listener('open', e),
      (e.tag = null),
      (e.anchor = null),
      (e.kind = null),
      (e.result = null),
      (o = s = a = ls === n || wg === n),
      r &&
        Be(e, !0, -1) &&
        ((c = !0),
        e.lineIndent > t ? (u = 1) : e.lineIndent === t ? (u = 0) : e.lineIndent < t && (u = -1)),
      u === 1)
    )
      for (; iS(e) || oS(e); )
        Be(e, !0, -1)
          ? ((c = !0),
            (a = o),
            e.lineIndent > t
              ? (u = 1)
              : e.lineIndent === t
                ? (u = 0)
                : e.lineIndent < t && (u = -1))
          : (a = !1);
    if (
      (a && (a = c || i),
      (u === 1 || ls === n) &&
        (cs === n || xg === n ? (A = t) : (A = t + 1),
        (I = e.position - e.lineStart),
        u === 1
          ? (a && (yg(e, I) || rS(e, I, A))) || tS(e, A)
            ? (f = !0)
            : ((s && nS(e, A)) || X_(e, A) || eS(e, A)
                ? (f = !0)
                : sS(e)
                  ? ((f = !0),
                    (e.tag !== null || e.anchor !== null) &&
                      J(e, 'alias node should not have any properties'))
                  : Z_(e, A, cs === n) && ((f = !0), e.tag === null && (e.tag = '?')),
              e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
          : u === 0 && (f = a && yg(e, I))),
      e.tag !== null && e.tag !== '!')
    )
      if (e.tag === '?') {
        for (
          e.result !== null &&
            e.kind !== 'scalar' &&
            J(
              e,
              'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'
            ),
            p = 0,
            m = e.implicitTypes.length;
          p < m;
          p += 1
        )
          if (((h = e.implicitTypes[p]), h.resolve(e.result))) {
            ((e.result = h.construct(e.result)),
              (e.tag = h.tag),
              e.anchor !== null && (e.anchorMap[e.anchor] = e.result));
            break;
          }
      } else
        Cn.call(e.typeMap[e.kind || 'fallback'], e.tag)
          ? ((h = e.typeMap[e.kind || 'fallback'][e.tag]),
            e.result !== null &&
              h.kind !== e.kind &&
              J(
                e,
                'unacceptable node kind for !<' +
                  e.tag +
                  '> tag; it should be "' +
                  h.kind +
                  '", not "' +
                  e.kind +
                  '"'
              ),
            h.resolve(e.result)
              ? ((e.result = h.construct(e.result)),
                e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
              : J(e, 'cannot resolve a node with !<' + e.tag + '> explicit tag'))
          : J(e, 'unknown tag !<' + e.tag + '>');
    return (
      e.listener !== null && e.listener('close', e),
      e.tag !== null || e.anchor !== null || f
    );
  }
  function aS(e) {
    var t = e.position,
      n,
      r,
      i,
      o = !1,
      s;
    for (
      e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = {}, e.anchorMap = {};
      (s = e.input.charCodeAt(e.position)) !== 0 &&
      (Be(e, !0, -1), (s = e.input.charCodeAt(e.position)), !(e.lineIndent > 0 || s !== 37));
    ) {
      for (o = !0, s = e.input.charCodeAt(++e.position), n = e.position; s !== 0 && !wt(s); )
        s = e.input.charCodeAt(++e.position);
      for (
        r = e.input.slice(n, e.position),
          i = [],
          r.length < 1 && J(e, 'directive name must not be less than one character in length');
        s !== 0;
      ) {
        for (; Qn(s); ) s = e.input.charCodeAt(++e.position);
        if (s === 35) {
          do s = e.input.charCodeAt(++e.position);
          while (s !== 0 && !Jt(s));
          break;
        }
        if (Jt(s)) break;
        for (n = e.position; s !== 0 && !wt(s); ) s = e.input.charCodeAt(++e.position);
        i.push(e.input.slice(n, e.position));
      }
      (s !== 0 && ec(e),
        Cn.call(mg, r) ? mg[r](e, r, i) : fs(e, 'unknown document directive "' + r + '"'));
    }
    if (
      (Be(e, !0, -1),
      e.lineIndent === 0 &&
      e.input.charCodeAt(e.position) === 45 &&
      e.input.charCodeAt(e.position + 1) === 45 &&
      e.input.charCodeAt(e.position + 2) === 45
        ? ((e.position += 3), Be(e, !0, -1))
        : o && J(e, 'directives end mark is expected'),
      Nr(e, e.lineIndent - 1, ls, !1, !0),
      Be(e, !0, -1),
      e.checkLineBreaks &&
        V_.test(e.input.slice(t, e.position)) &&
        fs(e, 'non-ASCII line breaks are interpreted as content'),
      e.documents.push(e.result),
      e.position === e.lineStart && ds(e))
    ) {
      e.input.charCodeAt(e.position) === 46 && ((e.position += 3), Be(e, !0, -1));
      return;
    }
    if (e.position < e.length - 1) J(e, 'end of the stream or a document separator is expected');
    else return;
  }
  function Eg(e, t) {
    ((e = String(e)),
      (t = t || {}),
      e.length !== 0 &&
        (e.charCodeAt(e.length - 1) !== 10 &&
          e.charCodeAt(e.length - 1) !== 13 &&
          (e += `
`),
        e.charCodeAt(0) === 65279 && (e = e.slice(1))));
    var n = new J_(e, t),
      r = e.indexOf('\0');
    for (
      r !== -1 && ((n.position = r), J(n, 'null byte is not allowed in input')), n.input += '\0';
      n.input.charCodeAt(n.position) === 32;
    )
      ((n.lineIndent += 1), (n.position += 1));
    for (; n.position < n.length - 1; ) aS(n);
    return n.documents;
  }
  function Rg(e, t, n) {
    t !== null && typeof t == 'object' && typeof n > 'u' && ((n = t), (t = null));
    var r = Eg(e, n);
    if (typeof t != 'function') return r;
    for (var i = 0, o = r.length; i < o; i += 1) t(r[i]);
  }
  function Ag(e, t) {
    var n = Eg(e, t);
    if (n.length !== 0) {
      if (n.length === 1) return n[0];
      throw new bg('expected a single document in the stream, but found more');
    }
  }
  function uS(e, t, n) {
    return (
      typeof t == 'object' && t !== null && typeof n > 'u' && ((n = t), (t = null)),
      Rg(e, t, on.extend({ schema: vg }, n))
    );
  }
  function cS(e, t) {
    return Ag(e, on.extend({ schema: vg }, t));
  }
  pi.exports.loadAll = Rg;
  pi.exports.load = Ag;
  pi.exports.safeLoadAll = uS;
  pi.exports.safeLoad = cS;
});
var ey = O((pq, oc) => {
  'use strict';
  var mi = $n(),
    gi = qr(),
    lS = di(),
    fS = Or(),
    jg = Object.prototype.toString,
    Bg = Object.prototype.hasOwnProperty,
    dS = 9,
    hi = 10,
    pS = 13,
    hS = 32,
    mS = 33,
    gS = 34,
    Hg = 35,
    yS = 37,
    bS = 38,
    vS = 39,
    xS = 42,
    zg = 44,
    wS = 45,
    Ug = 58,
    kS = 61,
    _S = 62,
    SS = 63,
    CS = 64,
    Wg = 91,
    Vg = 93,
    TS = 96,
    $g = 123,
    DS = 124,
    Yg = 125,
    at = {};
  at[0] = '\\0';
  at[7] = '\\a';
  at[8] = '\\b';
  at[9] = '\\t';
  at[10] = '\\n';
  at[11] = '\\v';
  at[12] = '\\f';
  at[13] = '\\r';
  at[27] = '\\e';
  at[34] = '\\"';
  at[92] = '\\\\';
  at[133] = '\\N';
  at[160] = '\\_';
  at[8232] = '\\L';
  at[8233] = '\\P';
  var ES = [
    'y',
    'Y',
    'yes',
    'Yes',
    'YES',
    'on',
    'On',
    'ON',
    'n',
    'N',
    'no',
    'No',
    'NO',
    'off',
    'Off',
    'OFF',
  ];
  function RS(e, t) {
    var n, r, i, o, s, a, u;
    if (t === null) return {};
    for (n = {}, r = Object.keys(t), i = 0, o = r.length; i < o; i += 1)
      ((s = r[i]),
        (a = String(t[s])),
        s.slice(0, 2) === '!!' && (s = 'tag:yaml.org,2002:' + s.slice(2)),
        (u = e.compiledTypeMap.fallback[s]),
        u && Bg.call(u.styleAliases, a) && (a = u.styleAliases[a]),
        (n[s] = a));
    return n;
  }
  function Pg(e) {
    var t, n, r;
    if (((t = e.toString(16).toUpperCase()), e <= 255)) ((n = 'x'), (r = 2));
    else if (e <= 65535) ((n = 'u'), (r = 4));
    else if (e <= 4294967295) ((n = 'U'), (r = 8));
    else throw new gi('code point within a string may not be greater than 0xFFFFFFFF');
    return '\\' + n + mi.repeat('0', r - t.length) + t;
  }
  function AS(e) {
    ((this.schema = e.schema || lS),
      (this.indent = Math.max(1, e.indent || 2)),
      (this.noArrayIndent = e.noArrayIndent || !1),
      (this.skipInvalid = e.skipInvalid || !1),
      (this.flowLevel = mi.isNothing(e.flowLevel) ? -1 : e.flowLevel),
      (this.styleMap = RS(this.schema, e.styles || null)),
      (this.sortKeys = e.sortKeys || !1),
      (this.lineWidth = e.lineWidth || 80),
      (this.noRefs = e.noRefs || !1),
      (this.noCompatMode = e.noCompatMode || !1),
      (this.condenseFlow = e.condenseFlow || !1),
      (this.implicitTypes = this.schema.compiledImplicit),
      (this.explicitTypes = this.schema.compiledExplicit),
      (this.tag = null),
      (this.result = ''),
      (this.duplicates = []),
      (this.usedDuplicates = null));
  }
  function Og(e, t) {
    for (var n = mi.repeat(' ', t), r = 0, i = -1, o = '', s, a = e.length; r < a; )
      ((i = e.indexOf(
        `
`,
        r
      )),
        i === -1 ? ((s = e.slice(r)), (r = a)) : ((s = e.slice(r, i + 1)), (r = i + 1)),
        s.length &&
          s !==
            `
` &&
          (o += n),
        (o += s));
    return o;
  }
  function nc(e, t) {
    return (
      `
` + mi.repeat(' ', e.indent * t)
    );
  }
  function qS(e, t) {
    var n, r, i;
    for (n = 0, r = e.implicitTypes.length; n < r; n += 1)
      if (((i = e.implicitTypes[n]), i.resolve(t))) return !0;
    return !1;
  }
  function ic(e) {
    return e === hS || e === dS;
  }
  function Lr(e) {
    return (
      (32 <= e && e <= 126) ||
      (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
      (57344 <= e && e <= 65533 && e !== 65279) ||
      (65536 <= e && e <= 1114111)
    );
  }
  function PS(e) {
    return Lr(e) && !ic(e) && e !== 65279 && e !== pS && e !== hi;
  }
  function Ig(e, t) {
    return (
      Lr(e) &&
      e !== 65279 &&
      e !== zg &&
      e !== Wg &&
      e !== Vg &&
      e !== $g &&
      e !== Yg &&
      e !== Ug &&
      (e !== Hg || (t && PS(t)))
    );
  }
  function OS(e) {
    return (
      Lr(e) &&
      e !== 65279 &&
      !ic(e) &&
      e !== wS &&
      e !== SS &&
      e !== Ug &&
      e !== zg &&
      e !== Wg &&
      e !== Vg &&
      e !== $g &&
      e !== Yg &&
      e !== Hg &&
      e !== bS &&
      e !== xS &&
      e !== mS &&
      e !== DS &&
      e !== kS &&
      e !== _S &&
      e !== vS &&
      e !== gS &&
      e !== yS &&
      e !== CS &&
      e !== TS
    );
  }
  function Gg(e) {
    var t = /^\n* /;
    return t.test(e);
  }
  var Kg = 1,
    Qg = 2,
    Jg = 3,
    Zg = 4,
    ps = 5;
  function IS(e, t, n, r, i) {
    var o,
      s,
      a,
      u = !1,
      c = !1,
      f = r !== -1,
      p = -1,
      m = OS(e.charCodeAt(0)) && !ic(e.charCodeAt(e.length - 1));
    if (t)
      for (o = 0; o < e.length; o++) {
        if (((s = e.charCodeAt(o)), !Lr(s))) return ps;
        ((a = o > 0 ? e.charCodeAt(o - 1) : null), (m = m && Ig(s, a)));
      }
    else {
      for (o = 0; o < e.length; o++) {
        if (((s = e.charCodeAt(o)), s === hi))
          ((u = !0), f && ((c = c || (o - p - 1 > r && e[p + 1] !== ' ')), (p = o)));
        else if (!Lr(s)) return ps;
        ((a = o > 0 ? e.charCodeAt(o - 1) : null), (m = m && Ig(s, a)));
      }
      c = c || (f && o - p - 1 > r && e[p + 1] !== ' ');
    }
    return !u && !c ? (m && !i(e) ? Kg : Qg) : n > 9 && Gg(e) ? ps : c ? Zg : Jg;
  }
  function FS(e, t, n, r) {
    e.dump = (function () {
      if (t.length === 0) return "''";
      if (!e.noCompatMode && ES.indexOf(t) !== -1) return "'" + t + "'";
      var i = e.indent * Math.max(1, n),
        o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - i),
        s = r || (e.flowLevel > -1 && n >= e.flowLevel);
      function a(u) {
        return qS(e, u);
      }
      switch (IS(t, s, e.indent, o, a)) {
        case Kg:
          return t;
        case Qg:
          return "'" + t.replace(/'/g, "''") + "'";
        case Jg:
          return '|' + Fg(t, e.indent) + Ng(Og(t, i));
        case Zg:
          return '>' + Fg(t, e.indent) + Ng(Og(NS(t, o), i));
        case ps:
          return '"' + LS(t, o) + '"';
        default:
          throw new gi('impossible error: invalid scalar style');
      }
    })();
  }
  function Fg(e, t) {
    var n = Gg(e) ? String(t) : '',
      r =
        e[e.length - 1] ===
        `
`,
      i =
        r &&
        (e[e.length - 2] ===
          `
` ||
          e ===
            `
`),
      o = i ? '+' : r ? '' : '-';
    return (
      n +
      o +
      `
`
    );
  }
  function Ng(e) {
    return e[e.length - 1] ===
      `
`
      ? e.slice(0, -1)
      : e;
  }
  function NS(e, t) {
    for (
      var n = /(\n+)([^\n]*)/g,
        r = (function () {
          var c = e.indexOf(`
`);
          return ((c = c !== -1 ? c : e.length), (n.lastIndex = c), Lg(e.slice(0, c), t));
        })(),
        i =
          e[0] ===
            `
` || e[0] === ' ',
        o,
        s;
      (s = n.exec(e));
    ) {
      var a = s[1],
        u = s[2];
      ((o = u[0] === ' '),
        (r +=
          a +
          (!i && !o && u !== ''
            ? `
`
            : '') +
          Lg(u, t)),
        (i = o));
    }
    return r;
  }
  function Lg(e, t) {
    if (e === '' || e[0] === ' ') return e;
    for (var n = / [^ ]/g, r, i = 0, o, s = 0, a = 0, u = ''; (r = n.exec(e)); )
      ((a = r.index),
        a - i > t &&
          ((o = s > i ? s : a),
          (u +=
            `
` + e.slice(i, o)),
          (i = o + 1)),
        (s = a));
    return (
      (u += `
`),
      e.length - i > t && s > i
        ? (u +=
            e.slice(i, s) +
            `
` +
            e.slice(s + 1))
        : (u += e.slice(i)),
      u.slice(1)
    );
  }
  function LS(e) {
    for (var t = '', n, r, i, o = 0; o < e.length; o++) {
      if (
        ((n = e.charCodeAt(o)),
        n >= 55296 && n <= 56319 && ((r = e.charCodeAt(o + 1)), r >= 56320 && r <= 57343))
      ) {
        ((t += Pg((n - 55296) * 1024 + r - 56320 + 65536)), o++);
        continue;
      }
      ((i = at[n]), (t += !i && Lr(n) ? e[o] : i || Pg(n)));
    }
    return t;
  }
  function MS(e, t, n) {
    var r = '',
      i = e.tag,
      o,
      s;
    for (o = 0, s = n.length; o < s; o += 1)
      Jn(e, t, n[o], !1, !1) &&
        (o !== 0 && (r += ',' + (e.condenseFlow ? '' : ' ')), (r += e.dump));
    ((e.tag = i), (e.dump = '[' + r + ']'));
  }
  function jS(e, t, n, r) {
    var i = '',
      o = e.tag,
      s,
      a;
    for (s = 0, a = n.length; s < a; s += 1)
      Jn(e, t + 1, n[s], !0, !0) &&
        ((!r || s !== 0) && (i += nc(e, t)),
        e.dump && hi === e.dump.charCodeAt(0) ? (i += '-') : (i += '- '),
        (i += e.dump));
    ((e.tag = o), (e.dump = i || '[]'));
  }
  function BS(e, t, n) {
    var r = '',
      i = e.tag,
      o = Object.keys(n),
      s,
      a,
      u,
      c,
      f;
    for (s = 0, a = o.length; s < a; s += 1)
      ((f = ''),
        s !== 0 && (f += ', '),
        e.condenseFlow && (f += '"'),
        (u = o[s]),
        (c = n[u]),
        Jn(e, t, u, !1, !1) &&
          (e.dump.length > 1024 && (f += '? '),
          (f += e.dump + (e.condenseFlow ? '"' : '') + ':' + (e.condenseFlow ? '' : ' ')),
          Jn(e, t, c, !1, !1) && ((f += e.dump), (r += f))));
    ((e.tag = i), (e.dump = '{' + r + '}'));
  }
  function HS(e, t, n, r) {
    var i = '',
      o = e.tag,
      s = Object.keys(n),
      a,
      u,
      c,
      f,
      p,
      m;
    if (e.sortKeys === !0) s.sort();
    else if (typeof e.sortKeys == 'function') s.sort(e.sortKeys);
    else if (e.sortKeys) throw new gi('sortKeys must be a boolean or a function');
    for (a = 0, u = s.length; a < u; a += 1)
      ((m = ''),
        (!r || a !== 0) && (m += nc(e, t)),
        (c = s[a]),
        (f = n[c]),
        Jn(e, t + 1, c, !0, !0, !0) &&
          ((p = (e.tag !== null && e.tag !== '?') || (e.dump && e.dump.length > 1024)),
          p && (e.dump && hi === e.dump.charCodeAt(0) ? (m += '?') : (m += '? ')),
          (m += e.dump),
          p && (m += nc(e, t)),
          Jn(e, t + 1, f, !0, p) &&
            (e.dump && hi === e.dump.charCodeAt(0) ? (m += ':') : (m += ': '),
            (m += e.dump),
            (i += m))));
    ((e.tag = o), (e.dump = i || '{}'));
  }
  function Mg(e, t, n) {
    var r, i, o, s, a, u;
    for (i = n ? e.explicitTypes : e.implicitTypes, o = 0, s = i.length; o < s; o += 1)
      if (
        ((a = i[o]),
        (a.instanceOf || a.predicate) &&
          (!a.instanceOf || (typeof t == 'object' && t instanceof a.instanceOf)) &&
          (!a.predicate || a.predicate(t)))
      ) {
        if (((e.tag = n ? a.tag : '?'), a.represent)) {
          if (
            ((u = e.styleMap[a.tag] || a.defaultStyle),
            jg.call(a.represent) === '[object Function]')
          )
            r = a.represent(t, u);
          else if (Bg.call(a.represent, u)) r = a.represent[u](t, u);
          else throw new gi('!<' + a.tag + '> tag resolver accepts not "' + u + '" style');
          e.dump = r;
        }
        return !0;
      }
    return !1;
  }
  function Jn(e, t, n, r, i, o) {
    ((e.tag = null), (e.dump = n), Mg(e, n, !1) || Mg(e, n, !0));
    var s = jg.call(e.dump);
    r && (r = e.flowLevel < 0 || e.flowLevel > t);
    var a = s === '[object Object]' || s === '[object Array]',
      u,
      c;
    if (
      (a && ((u = e.duplicates.indexOf(n)), (c = u !== -1)),
      ((e.tag !== null && e.tag !== '?') || c || (e.indent !== 2 && t > 0)) && (i = !1),
      c && e.usedDuplicates[u])
    )
      e.dump = '*ref_' + u;
    else {
      if ((a && c && !e.usedDuplicates[u] && (e.usedDuplicates[u] = !0), s === '[object Object]'))
        r && Object.keys(e.dump).length !== 0
          ? (HS(e, t, e.dump, i), c && (e.dump = '&ref_' + u + e.dump))
          : (BS(e, t, e.dump), c && (e.dump = '&ref_' + u + ' ' + e.dump));
      else if (s === '[object Array]') {
        var f = e.noArrayIndent && t > 0 ? t - 1 : t;
        r && e.dump.length !== 0
          ? (jS(e, f, e.dump, i), c && (e.dump = '&ref_' + u + e.dump))
          : (MS(e, f, e.dump), c && (e.dump = '&ref_' + u + ' ' + e.dump));
      } else if (s === '[object String]') e.tag !== '?' && FS(e, e.dump, t, o);
      else {
        if (e.skipInvalid) return !1;
        throw new gi('unacceptable kind of an object to dump ' + s);
      }
      e.tag !== null && e.tag !== '?' && (e.dump = '!<' + e.tag + '> ' + e.dump);
    }
    return !0;
  }
  function zS(e, t) {
    var n = [],
      r = [],
      i,
      o;
    for (rc(e, n, r), i = 0, o = r.length; i < o; i += 1) t.duplicates.push(n[r[i]]);
    t.usedDuplicates = new Array(o);
  }
  function rc(e, t, n) {
    var r, i, o;
    if (e !== null && typeof e == 'object')
      if (((i = t.indexOf(e)), i !== -1)) n.indexOf(i) === -1 && n.push(i);
      else if ((t.push(e), Array.isArray(e)))
        for (i = 0, o = e.length; i < o; i += 1) rc(e[i], t, n);
      else for (r = Object.keys(e), i = 0, o = r.length; i < o; i += 1) rc(e[r[i]], t, n);
  }
  function Xg(e, t) {
    t = t || {};
    var n = new AS(t);
    return (
      n.noRefs || zS(e, n),
      Jn(n, 0, e, !0, !0)
        ? n.dump +
          `
`
        : ''
    );
  }
  function US(e, t) {
    return Xg(e, mi.extend({ schema: fS }, t));
  }
  oc.exports.dump = Xg;
  oc.exports.safeDump = US;
});
var ny = O((hq, Ie) => {
  'use strict';
  var hs = qg(),
    ty = ey();
  function ms(e) {
    return function () {
      throw new Error('Function ' + e + ' is deprecated and cannot be used.');
    };
  }
  Ie.exports.Type = We();
  Ie.exports.Schema = Yn();
  Ie.exports.FAILSAFE_SCHEMA = as();
  Ie.exports.JSON_SCHEMA = Qu();
  Ie.exports.CORE_SCHEMA = Ju();
  Ie.exports.DEFAULT_SAFE_SCHEMA = Or();
  Ie.exports.DEFAULT_FULL_SCHEMA = di();
  Ie.exports.load = hs.load;
  Ie.exports.loadAll = hs.loadAll;
  Ie.exports.safeLoad = hs.safeLoad;
  Ie.exports.safeLoadAll = hs.safeLoadAll;
  Ie.exports.dump = ty.dump;
  Ie.exports.safeDump = ty.safeDump;
  Ie.exports.YAMLException = qr();
  Ie.exports.MINIMAL_SCHEMA = as();
  Ie.exports.SAFE_SCHEMA = Or();
  Ie.exports.DEFAULT_SCHEMA = di();
  Ie.exports.scan = ms('scan');
  Ie.exports.parse = ms('parse');
  Ie.exports.compose = ms('compose');
  Ie.exports.addConstructor = ms('addConstructor');
});
var iy = O((mq, ry) => {
  'use strict';
  var WS = ny();
  ry.exports = WS;
});
var sc = O((exports, module) => {
  'use strict';
  var yaml = iy(),
    engines = (exports = module.exports);
  engines.yaml = { parse: yaml.safeLoad.bind(yaml), stringify: yaml.safeDump.bind(yaml) };
  engines.json = {
    parse: JSON.parse.bind(JSON),
    stringify: function (e, t) {
      let n = Object.assign({ replacer: null, space: 2 }, t);
      return JSON.stringify(e, n.replacer, n.space);
    },
  };
  engines.javascript = {
    parse: function parse(str, options, wrap) {
      try {
        return (
          wrap !== !1 &&
            (str =
              `(function() {
return ` +
              str.trim() +
              `;
}());`),
          eval(str) || {}
        );
      } catch (e) {
        if (wrap !== !1 && /(unexpected|identifier)/i.test(e.message))
          return parse(str, options, !1);
        throw new SyntaxError(e);
      }
    },
    stringify: function () {
      throw new Error('stringifying JavaScript is not supported');
    },
  };
});
var sy = O((gq, oy) => {
  'use strict';
  oy.exports = function (e) {
    return typeof e == 'string' && e.charAt(0) === '\uFEFF' ? e.slice(1) : e;
  };
});
var gs = O((sn) => {
  'use strict';
  var ay = sy(),
    uy = li();
  sn.define = function (e, t, n) {
    Reflect.defineProperty(e, t, { enumerable: !1, configurable: !0, writable: !0, value: n });
  };
  sn.isBuffer = function (e) {
    return uy(e) === 'buffer';
  };
  sn.isObject = function (e) {
    return uy(e) === 'object';
  };
  sn.toBuffer = function (e) {
    return typeof e == 'string' ? Buffer.from(e) : e;
  };
  sn.toString = function (e) {
    if (sn.isBuffer(e)) return ay(String(e));
    if (typeof e != 'string') throw new TypeError('expected input to be a string or buffer');
    return ay(e);
  };
  sn.arrayify = function (e) {
    return e ? (Array.isArray(e) ? e : [e]) : [];
  };
  sn.startsWith = function (e, t, n) {
    return (typeof n != 'number' && (n = t.length), e.slice(0, n) === t);
  };
});
var yi = O((bq, cy) => {
  'use strict';
  var VS = sc(),
    $S = gs();
  cy.exports = function (e) {
    let t = Object.assign({}, e);
    return (
      (t.delimiters = $S.arrayify(t.delims || t.delimiters || '---')),
      t.delimiters.length === 1 && t.delimiters.push(t.delimiters[0]),
      (t.language = (t.language || t.lang || 'yaml').toLowerCase()),
      (t.engines = Object.assign({}, VS, t.parsers, t.engines)),
      t
    );
  };
});
var ac = O((vq, ly) => {
  'use strict';
  ly.exports = function (e, t) {
    let n = t.engines[e] || t.engines[YS(e)];
    if (typeof n > 'u') throw new Error('gray-matter engine "' + e + '" is not registered');
    return (typeof n == 'function' && (n = { parse: n }), n);
  };
  function YS(e) {
    switch (e.toLowerCase()) {
      case 'js':
      case 'javascript':
        return 'javascript';
      case 'coffee':
      case 'coffeescript':
      case 'cson':
        return 'coffee';
      case 'yaml':
      case 'yml':
        return 'yaml';
      default:
        return e;
    }
  }
});
var uc = O((xq, fy) => {
  'use strict';
  var GS = li(),
    KS = ac(),
    QS = yi();
  fy.exports = function (e, t, n) {
    if (t == null && n == null)
      switch (GS(e)) {
        case 'object':
          ((t = e.data), (n = {}));
          break;
        case 'string':
          return e;
        default:
          throw new TypeError('expected file to be a string or object');
      }
    let r = e.content,
      i = QS(n);
    if (t == null) {
      if (!i.data) return e;
      t = i.data;
    }
    let o = e.language || i.language,
      s = KS(o, i);
    if (typeof s.stringify != 'function')
      throw new TypeError('expected "' + o + '.stringify" to be a function');
    t = Object.assign({}, e.data, t);
    let a = i.delimiters[0],
      u = i.delimiters[1],
      c = s.stringify(t, n).trim(),
      f = '';
    return (
      c !== '{}' && (f = Mr(a) + Mr(c) + Mr(u)),
      typeof e.excerpt == 'string' &&
        e.excerpt !== '' &&
        r.indexOf(e.excerpt.trim()) === -1 &&
        (f += Mr(e.excerpt) + Mr(u)),
      f + Mr(r)
    );
  };
  function Mr(e) {
    return e.slice(-1) !==
      `
`
      ? e +
          `
`
      : e;
  }
});
var py = O((wq, dy) => {
  'use strict';
  var JS = yi();
  dy.exports = function (e, t) {
    let n = JS(t);
    if ((e.data == null && (e.data = {}), typeof n.excerpt == 'function')) return n.excerpt(e, n);
    let r = e.data.excerpt_separator || n.excerpt_separator;
    if (r == null && (n.excerpt === !1 || n.excerpt == null)) return e;
    let i = typeof n.excerpt == 'string' ? n.excerpt : r || n.delimiters[0],
      o = e.content.indexOf(i);
    return (o !== -1 && (e.excerpt = e.content.slice(0, o)), e);
  };
});
var gy = O((kq, my) => {
  'use strict';
  var hy = li(),
    ZS = uc(),
    jr = gs();
  my.exports = function (e) {
    return (
      hy(e) !== 'object' && (e = { content: e }),
      hy(e.data) !== 'object' && (e.data = {}),
      e.contents && e.content == null && (e.content = e.contents),
      jr.define(e, 'orig', jr.toBuffer(e.content)),
      jr.define(e, 'language', e.language || ''),
      jr.define(e, 'matter', e.matter || ''),
      jr.define(e, 'stringify', function (t, n) {
        return (n && n.language && (e.language = n.language), ZS(e, t, n));
      }),
      (e.content = jr.toString(e.content)),
      (e.isEmpty = !1),
      (e.excerpt = ''),
      e
    );
  };
});
var by = O((_q, yy) => {
  'use strict';
  var XS = ac(),
    eC = yi();
  yy.exports = function (e, t, n) {
    let r = eC(n),
      i = XS(e, r);
    if (typeof i.parse != 'function')
      throw new TypeError('expected "' + e + '.parse" to be a function');
    return i.parse(t, r);
  };
});
var ky = O((Sq, wy) => {
  'use strict';
  var tC = require('fs'),
    nC = pm(),
    cc = yi(),
    rC = uc(),
    vy = py(),
    iC = sc(),
    oC = gy(),
    sC = by(),
    xy = gs();
  function ft(e, t) {
    if (e === '') return { data: {}, content: e, excerpt: '', orig: e };
    let n = oC(e),
      r = ft.cache[n.content];
    if (!t) {
      if (r) return ((n = Object.assign({}, r)), (n.orig = r.orig), n);
      ft.cache[n.content] = n;
    }
    return aC(n, t);
  }
  function aC(e, t) {
    let n = cc(t),
      r = n.delimiters[0],
      i =
        `
` + n.delimiters[1],
      o = e.content;
    n.language && (e.language = n.language);
    let s = r.length;
    if (!xy.startsWith(o, r, s)) return (vy(e, n), e);
    if (o.charAt(s) === r.slice(-1)) return e;
    o = o.slice(s);
    let a = o.length,
      u = ft.language(o, n);
    u.name && ((e.language = u.name), (o = o.slice(u.raw.length)));
    let c = o.indexOf(i);
    return (
      c === -1 && (c = a),
      (e.matter = o.slice(0, c)),
      e.matter.replace(/^\s*#[^\n]+/gm, '').trim() === ''
        ? ((e.isEmpty = !0), (e.empty = e.content), (e.data = {}))
        : (e.data = sC(e.language, e.matter, n)),
      c === a
        ? (e.content = '')
        : ((e.content = o.slice(c + i.length)),
          e.content[0] === '\r' && (e.content = e.content.slice(1)),
          e.content[0] ===
            `
` && (e.content = e.content.slice(1))),
      vy(e, n),
      (n.sections === !0 || typeof n.section == 'function') && nC(e, n.section),
      e
    );
  }
  ft.engines = iC;
  ft.stringify = function (e, t, n) {
    return (typeof e == 'string' && (e = ft(e, n)), rC(e, t, n));
  };
  ft.read = function (e, t) {
    let n = tC.readFileSync(e, 'utf8'),
      r = ft(n, t);
    return ((r.path = e), r);
  };
  ft.test = function (e, t) {
    return xy.startsWith(e, cc(t).delimiters[0]);
  };
  ft.language = function (e, t) {
    let r = cc(t).delimiters[0];
    ft.test(e) && (e = e.slice(r.length));
    let i = e.slice(0, e.search(/\r?\n/));
    return { raw: i, name: i ? i.trim() : '' };
  };
  ft.cache = {};
  ft.clearCache = function () {
    ft.cache = {};
  };
  wy.exports = ft;
});
function lc(e) {
  if (e) throw e;
}
var _y = H(() => {});
var Py = O((Tq, qy) => {
  'use strict';
  var ys = Object.prototype.hasOwnProperty,
    Ay = Object.prototype.toString,
    Sy = Object.defineProperty,
    Cy = Object.getOwnPropertyDescriptor,
    Ty = function (t) {
      return typeof Array.isArray == 'function'
        ? Array.isArray(t)
        : Ay.call(t) === '[object Array]';
    },
    Dy = function (t) {
      if (!t || Ay.call(t) !== '[object Object]') return !1;
      var n = ys.call(t, 'constructor'),
        r =
          t.constructor &&
          t.constructor.prototype &&
          ys.call(t.constructor.prototype, 'isPrototypeOf');
      if (t.constructor && !n && !r) return !1;
      var i;
      for (i in t);
      return typeof i > 'u' || ys.call(t, i);
    },
    Ey = function (t, n) {
      Sy && n.name === '__proto__'
        ? Sy(t, n.name, { enumerable: !0, configurable: !0, value: n.newValue, writable: !0 })
        : (t[n.name] = n.newValue);
    },
    Ry = function (t, n) {
      if (n === '__proto__')
        if (ys.call(t, n)) {
          if (Cy) return Cy(t, n).value;
        } else return;
      return t[n];
    };
  qy.exports = function e() {
    var t,
      n,
      r,
      i,
      o,
      s,
      a = arguments[0],
      u = 1,
      c = arguments.length,
      f = !1;
    for (
      typeof a == 'boolean' && ((f = a), (a = arguments[1] || {}), (u = 2)),
        (a == null || (typeof a != 'object' && typeof a != 'function')) && (a = {});
      u < c;
      ++u
    )
      if (((t = arguments[u]), t != null))
        for (n in t)
          ((r = Ry(a, n)),
            (i = Ry(t, n)),
            a !== i &&
              (f && i && (Dy(i) || (o = Ty(i)))
                ? (o ? ((o = !1), (s = r && Ty(r) ? r : [])) : (s = r && Dy(r) ? r : {}),
                  Ey(a, { name: n, newValue: e(f, s, i) }))
                : typeof i < 'u' && Ey(a, { name: n, newValue: i })));
    return a;
  };
});
function bi(e) {
  if (typeof e != 'object' || e === null) return !1;
  let t = Object.getPrototypeOf(e);
  return (
    (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) &&
    !(Symbol.toStringTag in e) &&
    !(Symbol.iterator in e)
  );
}
var Oy = H(() => {});
function fc() {
  let e = [],
    t = { run: n, use: r };
  return t;
  function n(...i) {
    let o = -1,
      s = i.pop();
    if (typeof s != 'function') throw new TypeError('Expected function as last argument, not ' + s);
    a(null, ...i);
    function a(u, ...c) {
      let f = e[++o],
        p = -1;
      if (u) {
        s(u);
        return;
      }
      for (; ++p < i.length; ) (c[p] === null || c[p] === void 0) && (c[p] = i[p]);
      ((i = c), f ? Iy(f, a)(...c) : s(null, ...c));
    }
  }
  function r(i) {
    if (typeof i != 'function')
      throw new TypeError('Expected `middelware` to be a function, not ' + i);
    return (e.push(i), t);
  }
}
function Iy(e, t) {
  let n;
  return r;
  function r(...s) {
    let a = e.length > s.length,
      u;
    a && s.push(i);
    try {
      u = e.apply(this, s);
    } catch (c) {
      let f = c;
      if (a && n) throw f;
      return i(f);
    }
    a ||
      (u && u.then && typeof u.then == 'function'
        ? u.then(o, i)
        : u instanceof Error
          ? i(u)
          : o(u));
  }
  function i(s, ...a) {
    n || ((n = !0), t(s, ...a));
  }
  function o(s) {
    i(null, s);
  }
}
var Fy = H(() => {});
var Ny = H(() => {
  Fy();
});
function Tn(e) {
  return !e || typeof e != 'object'
    ? ''
    : 'position' in e || 'type' in e
      ? Ly(e.position)
      : 'start' in e || 'end' in e
        ? Ly(e)
        : 'line' in e || 'column' in e
          ? dc(e)
          : '';
}
function dc(e) {
  return My(e && e.line) + ':' + My(e && e.column);
}
function Ly(e) {
  return dc(e && e.start) + '-' + dc(e && e.end);
}
function My(e) {
  return e && typeof e == 'number' ? e : 1;
}
var jy = H(() => {});
var pc = H(() => {
  jy();
});
var Qe,
  By = H(() => {
    pc();
    Qe = class extends Error {
      constructor(t, n, r) {
        (super(), typeof n == 'string' && ((r = n), (n = void 0)));
        let i = '',
          o = {},
          s = !1;
        if (
          (n &&
            ('line' in n && 'column' in n
              ? (o = { place: n })
              : 'start' in n && 'end' in n
                ? (o = { place: n })
                : 'type' in n
                  ? (o = { ancestors: [n], place: n.position })
                  : (o = { ...n })),
          typeof t == 'string'
            ? (i = t)
            : !o.cause && t && ((s = !0), (i = t.message), (o.cause = t)),
          !o.ruleId && !o.source && typeof r == 'string')
        ) {
          let u = r.indexOf(':');
          u === -1 ? (o.ruleId = r) : ((o.source = r.slice(0, u)), (o.ruleId = r.slice(u + 1)));
        }
        if (!o.place && o.ancestors && o.ancestors) {
          let u = o.ancestors[o.ancestors.length - 1];
          u && (o.place = u.position);
        }
        let a = o.place && 'start' in o.place ? o.place.start : o.place;
        ((this.ancestors = o.ancestors || void 0),
          (this.cause = o.cause || void 0),
          (this.column = a ? a.column : void 0),
          (this.fatal = void 0),
          (this.file = ''),
          (this.message = i),
          (this.line = a ? a.line : void 0),
          (this.name = Tn(o.place) || '1:1'),
          (this.place = o.place || void 0),
          (this.reason = this.message),
          (this.ruleId = o.ruleId || void 0),
          (this.source = o.source || void 0),
          (this.stack = s && o.cause && typeof o.cause.stack == 'string' ? o.cause.stack : ''),
          (this.actual = void 0),
          (this.expected = void 0),
          (this.note = void 0),
          (this.url = void 0));
      }
    };
    Qe.prototype.file = '';
    Qe.prototype.name = '';
    Qe.prototype.reason = '';
    Qe.prototype.message = '';
    Qe.prototype.stack = '';
    Qe.prototype.column = void 0;
    Qe.prototype.line = void 0;
    Qe.prototype.ancestors = void 0;
    Qe.prototype.cause = void 0;
    Qe.prototype.fatal = void 0;
    Qe.prototype.place = void 0;
    Qe.prototype.ruleId = void 0;
    Qe.prototype.source = void 0;
  });
var Hy = H(() => {
  By();
});
var Lt,
  zy = H(() => {
    Lt = Nn(require('node:path'), 1);
  });
var hc,
  Uy = H(() => {
    hc = Nn(require('node:process'), 1);
  });
function bs(e) {
  return !!(
    e !== null &&
    typeof e == 'object' &&
    'href' in e &&
    e.href &&
    'protocol' in e &&
    e.protocol &&
    e.auth === void 0
  );
}
var Wy = H(() => {});
var mc,
  Vy = H(() => {
    mc = require('node:url');
    Wy();
  });
function yc(e, t) {
  if (e && e.includes(Lt.default.sep))
    throw new Error('`' + t + '` cannot be a path: did not expect `' + Lt.default.sep + '`');
}
function bc(e, t) {
  if (!e) throw new Error('`' + t + '` cannot be empty');
}
function $y(e, t) {
  if (!e) throw new Error('Setting `' + t + '` requires `path` to be set too');
}
function uC(e) {
  return !!(e && typeof e == 'object' && 'byteLength' in e && 'byteOffset' in e);
}
var gc,
  vi,
  Yy = H(() => {
    Hy();
    zy();
    Uy();
    Vy();
    ((gc = ['history', 'path', 'basename', 'stem', 'extname', 'dirname']),
      (vi = class {
        constructor(t) {
          let n;
          (t
            ? bs(t)
              ? (n = { path: t })
              : typeof t == 'string' || uC(t)
                ? (n = { value: t })
                : (n = t)
            : (n = {}),
            (this.cwd = 'cwd' in n ? '' : hc.default.cwd()),
            (this.data = {}),
            (this.history = []),
            (this.messages = []),
            this.value,
            this.map,
            this.result,
            this.stored);
          let r = -1;
          for (; ++r < gc.length; ) {
            let o = gc[r];
            o in n &&
              n[o] !== void 0 &&
              n[o] !== null &&
              (this[o] = o === 'history' ? [...n[o]] : n[o]);
          }
          let i;
          for (i in n) gc.includes(i) || (this[i] = n[i]);
        }
        get basename() {
          return typeof this.path == 'string' ? Lt.default.basename(this.path) : void 0;
        }
        set basename(t) {
          (bc(t, 'basename'),
            yc(t, 'basename'),
            (this.path = Lt.default.join(this.dirname || '', t)));
        }
        get dirname() {
          return typeof this.path == 'string' ? Lt.default.dirname(this.path) : void 0;
        }
        set dirname(t) {
          ($y(this.basename, 'dirname'), (this.path = Lt.default.join(t || '', this.basename)));
        }
        get extname() {
          return typeof this.path == 'string' ? Lt.default.extname(this.path) : void 0;
        }
        set extname(t) {
          if ((yc(t, 'extname'), $y(this.dirname, 'extname'), t)) {
            if (t.codePointAt(0) !== 46) throw new Error('`extname` must start with `.`');
            if (t.includes('.', 1)) throw new Error('`extname` cannot contain multiple dots');
          }
          this.path = Lt.default.join(this.dirname, this.stem + (t || ''));
        }
        get path() {
          return this.history[this.history.length - 1];
        }
        set path(t) {
          (bs(t) && (t = (0, mc.fileURLToPath)(t)),
            bc(t, 'path'),
            this.path !== t && this.history.push(t));
        }
        get stem() {
          return typeof this.path == 'string'
            ? Lt.default.basename(this.path, this.extname)
            : void 0;
        }
        set stem(t) {
          (bc(t, 'stem'),
            yc(t, 'stem'),
            (this.path = Lt.default.join(this.dirname || '', t + (this.extname || ''))));
        }
        fail(t, n, r) {
          let i = this.message(t, n, r);
          throw ((i.fatal = !0), i);
        }
        info(t, n, r) {
          let i = this.message(t, n, r);
          return ((i.fatal = void 0), i);
        }
        message(t, n, r) {
          let i = new Qe(t, n, r);
          return (
            this.path && ((i.name = this.path + ':' + i.name), (i.file = this.path)),
            (i.fatal = !1),
            this.messages.push(i),
            i
          );
        }
        toString(t) {
          return this.value === void 0
            ? ''
            : typeof this.value == 'string'
              ? this.value
              : new TextDecoder(t || void 0).decode(this.value);
        }
      }));
  });
var Gy = H(() => {
  Yy();
});
var Ky,
  Qy = H(() => {
    Ky = function (e) {
      let r = this.constructor.prototype,
        i = r[e],
        o = function () {
          return i.apply(o, arguments);
        };
      return (Object.setPrototypeOf(o, r), o);
    };
  });
function vc(e, t) {
  if (typeof t != 'function') throw new TypeError('Cannot `' + e + '` without `parser`');
}
function xc(e, t) {
  if (typeof t != 'function') throw new TypeError('Cannot `' + e + '` without `compiler`');
}
function wc(e, t) {
  if (t)
    throw new Error(
      'Cannot call `' +
        e +
        '` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.'
    );
}
function Jy(e) {
  if (!bi(e) || typeof e.type != 'string') throw new TypeError('Expected node, got `' + e + '`');
}
function Zy(e, t, n) {
  if (!n) throw new Error('`' + e + '` finished async. Use `' + t + '` instead');
}
function vs(e) {
  return lC(e) ? e : new vi(e);
}
function lC(e) {
  return !!(e && typeof e == 'object' && 'message' in e && 'messages' in e);
}
function fC(e) {
  return typeof e == 'string' || dC(e);
}
function dC(e) {
  return !!(e && typeof e == 'object' && 'byteLength' in e && 'byteOffset' in e);
}
var xs,
  cC,
  kc,
  Xy,
  eb = H(() => {
    _y();
    xs = Nn(Py(), 1);
    Oy();
    Ny();
    Gy();
    Qy();
    ((cC = {}.hasOwnProperty),
      (kc = class e extends Ky {
        constructor() {
          (super('copy'),
            (this.Compiler = void 0),
            (this.Parser = void 0),
            (this.attachers = []),
            (this.compiler = void 0),
            (this.freezeIndex = -1),
            (this.frozen = void 0),
            (this.namespace = {}),
            (this.parser = void 0),
            (this.transformers = fc()));
        }
        copy() {
          let t = new e(),
            n = -1;
          for (; ++n < this.attachers.length; ) {
            let r = this.attachers[n];
            t.use(...r);
          }
          return (t.data((0, xs.default)(!0, {}, this.namespace)), t);
        }
        data(t, n) {
          return typeof t == 'string'
            ? arguments.length === 2
              ? (wc('data', this.frozen), (this.namespace[t] = n), this)
              : (cC.call(this.namespace, t) && this.namespace[t]) || void 0
            : t
              ? (wc('data', this.frozen), (this.namespace = t), this)
              : this.namespace;
        }
        freeze() {
          if (this.frozen) return this;
          let t = this;
          for (; ++this.freezeIndex < this.attachers.length; ) {
            let [n, ...r] = this.attachers[this.freezeIndex];
            if (r[0] === !1) continue;
            r[0] === !0 && (r[0] = void 0);
            let i = n.call(t, ...r);
            typeof i == 'function' && this.transformers.use(i);
          }
          return ((this.frozen = !0), (this.freezeIndex = Number.POSITIVE_INFINITY), this);
        }
        parse(t) {
          this.freeze();
          let n = vs(t),
            r = this.parser || this.Parser;
          return (vc('parse', r), r(String(n), n));
        }
        process(t, n) {
          let r = this;
          return (
            this.freeze(),
            vc('process', this.parser || this.Parser),
            xc('process', this.compiler || this.Compiler),
            n ? i(void 0, n) : new Promise(i)
          );
          function i(o, s) {
            let a = vs(t),
              u = r.parse(a);
            r.run(u, a, function (f, p, m) {
              if (f || !p || !m) return c(f);
              let h = p,
                A = r.stringify(h, m);
              (fC(A) ? (m.value = A) : (m.result = A), c(f, m));
            });
            function c(f, p) {
              f || !p ? s(f) : o ? o(p) : n(void 0, p);
            }
          }
        }
        processSync(t) {
          let n = !1,
            r;
          return (
            this.freeze(),
            vc('processSync', this.parser || this.Parser),
            xc('processSync', this.compiler || this.Compiler),
            this.process(t, i),
            Zy('processSync', 'process', n),
            r
          );
          function i(o, s) {
            ((n = !0), lc(o), (r = s));
          }
        }
        run(t, n, r) {
          (Jy(t), this.freeze());
          let i = this.transformers;
          return (
            !r && typeof n == 'function' && ((r = n), (n = void 0)),
            r ? o(void 0, r) : new Promise(o)
          );
          function o(s, a) {
            let u = vs(n);
            i.run(t, u, c);
            function c(f, p, m) {
              let h = p || t;
              f ? a(f) : s ? s(h) : r(void 0, h, m);
            }
          }
        }
        runSync(t, n) {
          let r = !1,
            i;
          return (this.run(t, n, o), Zy('runSync', 'run', r), i);
          function o(s, a) {
            (lc(s), (i = a), (r = !0));
          }
        }
        stringify(t, n) {
          this.freeze();
          let r = vs(n),
            i = this.compiler || this.Compiler;
          return (xc('stringify', i), Jy(t), i(t, r));
        }
        use(t, ...n) {
          let r = this.attachers,
            i = this.namespace;
          if ((wc('use', this.frozen), t != null))
            if (typeof t == 'function') u(t, n);
            else if (typeof t == 'object') Array.isArray(t) ? a(t) : s(t);
            else throw new TypeError('Expected usable value, not `' + t + '`');
          return this;
          function o(c) {
            if (typeof c == 'function') u(c, []);
            else if (typeof c == 'object')
              if (Array.isArray(c)) {
                let [f, ...p] = c;
                u(f, p);
              } else s(c);
            else throw new TypeError('Expected usable value, not `' + c + '`');
          }
          function s(c) {
            if (!('plugins' in c) && !('settings' in c))
              throw new Error(
                'Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither'
              );
            (a(c.plugins),
              c.settings && (i.settings = (0, xs.default)(!0, i.settings, c.settings)));
          }
          function a(c) {
            let f = -1;
            if (c != null)
              if (Array.isArray(c))
                for (; ++f < c.length; ) {
                  let p = c[f];
                  o(p);
                }
              else throw new TypeError('Expected a list of plugins, not `' + c + '`');
          }
          function u(c, f) {
            let p = -1,
              m = -1;
            for (; ++p < r.length; )
              if (r[p][0] === c) {
                m = p;
                break;
              }
            if (m === -1) r.push([c, ...f]);
            else if (f.length > 0) {
              let [h, ...A] = f,
                I = r[m][1];
              (bi(I) && bi(h) && (h = (0, xs.default)(!0, I, h)), (r[m] = [c, h, ...A]));
            }
          }
        }
      }),
      (Xy = new kc().freeze()));
  });
var tb = {};
Bi(tb, { unified: () => Xy });
var nb = H(() => {
  eb();
});
function _c(e, t) {
  let n = t || pC,
    r = typeof n.includeImageAlt == 'boolean' ? n.includeImageAlt : !0,
    i = typeof n.includeHtml == 'boolean' ? n.includeHtml : !0;
  return ib(e, r, i);
}
function ib(e, t, n) {
  if (hC(e)) {
    if ('value' in e) return e.type === 'html' && !n ? '' : e.value;
    if (t && 'alt' in e && e.alt) return e.alt;
    if ('children' in e) return rb(e.children, t, n);
  }
  return Array.isArray(e) ? rb(e, t, n) : '';
}
function rb(e, t, n) {
  let r = [],
    i = -1;
  for (; ++i < e.length; ) r[i] = ib(e[i], t, n);
  return r.join('');
}
function hC(e) {
  return !!(e && typeof e == 'object');
}
var pC,
  ob = H(() => {
    pC = {};
  });
var sb = H(() => {
  ob();
});
var Sc,
  ab = H(() => {
    Sc = {
      AElig: '\xC6',
      AMP: '&',
      Aacute: '\xC1',
      Abreve: '\u0102',
      Acirc: '\xC2',
      Acy: '\u0410',
      Afr: '\u{1D504}',
      Agrave: '\xC0',
      Alpha: '\u0391',
      Amacr: '\u0100',
      And: '\u2A53',
      Aogon: '\u0104',
      Aopf: '\u{1D538}',
      ApplyFunction: '\u2061',
      Aring: '\xC5',
      Ascr: '\u{1D49C}',
      Assign: '\u2254',
      Atilde: '\xC3',
      Auml: '\xC4',
      Backslash: '\u2216',
      Barv: '\u2AE7',
      Barwed: '\u2306',
      Bcy: '\u0411',
      Because: '\u2235',
      Bernoullis: '\u212C',
      Beta: '\u0392',
      Bfr: '\u{1D505}',
      Bopf: '\u{1D539}',
      Breve: '\u02D8',
      Bscr: '\u212C',
      Bumpeq: '\u224E',
      CHcy: '\u0427',
      COPY: '\xA9',
      Cacute: '\u0106',
      Cap: '\u22D2',
      CapitalDifferentialD: '\u2145',
      Cayleys: '\u212D',
      Ccaron: '\u010C',
      Ccedil: '\xC7',
      Ccirc: '\u0108',
      Cconint: '\u2230',
      Cdot: '\u010A',
      Cedilla: '\xB8',
      CenterDot: '\xB7',
      Cfr: '\u212D',
      Chi: '\u03A7',
      CircleDot: '\u2299',
      CircleMinus: '\u2296',
      CirclePlus: '\u2295',
      CircleTimes: '\u2297',
      ClockwiseContourIntegral: '\u2232',
      CloseCurlyDoubleQuote: '\u201D',
      CloseCurlyQuote: '\u2019',
      Colon: '\u2237',
      Colone: '\u2A74',
      Congruent: '\u2261',
      Conint: '\u222F',
      ContourIntegral: '\u222E',
      Copf: '\u2102',
      Coproduct: '\u2210',
      CounterClockwiseContourIntegral: '\u2233',
      Cross: '\u2A2F',
      Cscr: '\u{1D49E}',
      Cup: '\u22D3',
      CupCap: '\u224D',
      DD: '\u2145',
      DDotrahd: '\u2911',
      DJcy: '\u0402',
      DScy: '\u0405',
      DZcy: '\u040F',
      Dagger: '\u2021',
      Darr: '\u21A1',
      Dashv: '\u2AE4',
      Dcaron: '\u010E',
      Dcy: '\u0414',
      Del: '\u2207',
      Delta: '\u0394',
      Dfr: '\u{1D507}',
      DiacriticalAcute: '\xB4',
      DiacriticalDot: '\u02D9',
      DiacriticalDoubleAcute: '\u02DD',
      DiacriticalGrave: '`',
      DiacriticalTilde: '\u02DC',
      Diamond: '\u22C4',
      DifferentialD: '\u2146',
      Dopf: '\u{1D53B}',
      Dot: '\xA8',
      DotDot: '\u20DC',
      DotEqual: '\u2250',
      DoubleContourIntegral: '\u222F',
      DoubleDot: '\xA8',
      DoubleDownArrow: '\u21D3',
      DoubleLeftArrow: '\u21D0',
      DoubleLeftRightArrow: '\u21D4',
      DoubleLeftTee: '\u2AE4',
      DoubleLongLeftArrow: '\u27F8',
      DoubleLongLeftRightArrow: '\u27FA',
      DoubleLongRightArrow: '\u27F9',
      DoubleRightArrow: '\u21D2',
      DoubleRightTee: '\u22A8',
      DoubleUpArrow: '\u21D1',
      DoubleUpDownArrow: '\u21D5',
      DoubleVerticalBar: '\u2225',
      DownArrow: '\u2193',
      DownArrowBar: '\u2913',
      DownArrowUpArrow: '\u21F5',
      DownBreve: '\u0311',
      DownLeftRightVector: '\u2950',
      DownLeftTeeVector: '\u295E',
      DownLeftVector: '\u21BD',
      DownLeftVectorBar: '\u2956',
      DownRightTeeVector: '\u295F',
      DownRightVector: '\u21C1',
      DownRightVectorBar: '\u2957',
      DownTee: '\u22A4',
      DownTeeArrow: '\u21A7',
      Downarrow: '\u21D3',
      Dscr: '\u{1D49F}',
      Dstrok: '\u0110',
      ENG: '\u014A',
      ETH: '\xD0',
      Eacute: '\xC9',
      Ecaron: '\u011A',
      Ecirc: '\xCA',
      Ecy: '\u042D',
      Edot: '\u0116',
      Efr: '\u{1D508}',
      Egrave: '\xC8',
      Element: '\u2208',
      Emacr: '\u0112',
      EmptySmallSquare: '\u25FB',
      EmptyVerySmallSquare: '\u25AB',
      Eogon: '\u0118',
      Eopf: '\u{1D53C}',
      Epsilon: '\u0395',
      Equal: '\u2A75',
      EqualTilde: '\u2242',
      Equilibrium: '\u21CC',
      Escr: '\u2130',
      Esim: '\u2A73',
      Eta: '\u0397',
      Euml: '\xCB',
      Exists: '\u2203',
      ExponentialE: '\u2147',
      Fcy: '\u0424',
      Ffr: '\u{1D509}',
      FilledSmallSquare: '\u25FC',
      FilledVerySmallSquare: '\u25AA',
      Fopf: '\u{1D53D}',
      ForAll: '\u2200',
      Fouriertrf: '\u2131',
      Fscr: '\u2131',
      GJcy: '\u0403',
      GT: '>',
      Gamma: '\u0393',
      Gammad: '\u03DC',
      Gbreve: '\u011E',
      Gcedil: '\u0122',
      Gcirc: '\u011C',
      Gcy: '\u0413',
      Gdot: '\u0120',
      Gfr: '\u{1D50A}',
      Gg: '\u22D9',
      Gopf: '\u{1D53E}',
      GreaterEqual: '\u2265',
      GreaterEqualLess: '\u22DB',
      GreaterFullEqual: '\u2267',
      GreaterGreater: '\u2AA2',
      GreaterLess: '\u2277',
      GreaterSlantEqual: '\u2A7E',
      GreaterTilde: '\u2273',
      Gscr: '\u{1D4A2}',
      Gt: '\u226B',
      HARDcy: '\u042A',
      Hacek: '\u02C7',
      Hat: '^',
      Hcirc: '\u0124',
      Hfr: '\u210C',
      HilbertSpace: '\u210B',
      Hopf: '\u210D',
      HorizontalLine: '\u2500',
      Hscr: '\u210B',
      Hstrok: '\u0126',
      HumpDownHump: '\u224E',
      HumpEqual: '\u224F',
      IEcy: '\u0415',
      IJlig: '\u0132',
      IOcy: '\u0401',
      Iacute: '\xCD',
      Icirc: '\xCE',
      Icy: '\u0418',
      Idot: '\u0130',
      Ifr: '\u2111',
      Igrave: '\xCC',
      Im: '\u2111',
      Imacr: '\u012A',
      ImaginaryI: '\u2148',
      Implies: '\u21D2',
      Int: '\u222C',
      Integral: '\u222B',
      Intersection: '\u22C2',
      InvisibleComma: '\u2063',
      InvisibleTimes: '\u2062',
      Iogon: '\u012E',
      Iopf: '\u{1D540}',
      Iota: '\u0399',
      Iscr: '\u2110',
      Itilde: '\u0128',
      Iukcy: '\u0406',
      Iuml: '\xCF',
      Jcirc: '\u0134',
      Jcy: '\u0419',
      Jfr: '\u{1D50D}',
      Jopf: '\u{1D541}',
      Jscr: '\u{1D4A5}',
      Jsercy: '\u0408',
      Jukcy: '\u0404',
      KHcy: '\u0425',
      KJcy: '\u040C',
      Kappa: '\u039A',
      Kcedil: '\u0136',
      Kcy: '\u041A',
      Kfr: '\u{1D50E}',
      Kopf: '\u{1D542}',
      Kscr: '\u{1D4A6}',
      LJcy: '\u0409',
      LT: '<',
      Lacute: '\u0139',
      Lambda: '\u039B',
      Lang: '\u27EA',
      Laplacetrf: '\u2112',
      Larr: '\u219E',
      Lcaron: '\u013D',
      Lcedil: '\u013B',
      Lcy: '\u041B',
      LeftAngleBracket: '\u27E8',
      LeftArrow: '\u2190',
      LeftArrowBar: '\u21E4',
      LeftArrowRightArrow: '\u21C6',
      LeftCeiling: '\u2308',
      LeftDoubleBracket: '\u27E6',
      LeftDownTeeVector: '\u2961',
      LeftDownVector: '\u21C3',
      LeftDownVectorBar: '\u2959',
      LeftFloor: '\u230A',
      LeftRightArrow: '\u2194',
      LeftRightVector: '\u294E',
      LeftTee: '\u22A3',
      LeftTeeArrow: '\u21A4',
      LeftTeeVector: '\u295A',
      LeftTriangle: '\u22B2',
      LeftTriangleBar: '\u29CF',
      LeftTriangleEqual: '\u22B4',
      LeftUpDownVector: '\u2951',
      LeftUpTeeVector: '\u2960',
      LeftUpVector: '\u21BF',
      LeftUpVectorBar: '\u2958',
      LeftVector: '\u21BC',
      LeftVectorBar: '\u2952',
      Leftarrow: '\u21D0',
      Leftrightarrow: '\u21D4',
      LessEqualGreater: '\u22DA',
      LessFullEqual: '\u2266',
      LessGreater: '\u2276',
      LessLess: '\u2AA1',
      LessSlantEqual: '\u2A7D',
      LessTilde: '\u2272',
      Lfr: '\u{1D50F}',
      Ll: '\u22D8',
      Lleftarrow: '\u21DA',
      Lmidot: '\u013F',
      LongLeftArrow: '\u27F5',
      LongLeftRightArrow: '\u27F7',
      LongRightArrow: '\u27F6',
      Longleftarrow: '\u27F8',
      Longleftrightarrow: '\u27FA',
      Longrightarrow: '\u27F9',
      Lopf: '\u{1D543}',
      LowerLeftArrow: '\u2199',
      LowerRightArrow: '\u2198',
      Lscr: '\u2112',
      Lsh: '\u21B0',
      Lstrok: '\u0141',
      Lt: '\u226A',
      Map: '\u2905',
      Mcy: '\u041C',
      MediumSpace: '\u205F',
      Mellintrf: '\u2133',
      Mfr: '\u{1D510}',
      MinusPlus: '\u2213',
      Mopf: '\u{1D544}',
      Mscr: '\u2133',
      Mu: '\u039C',
      NJcy: '\u040A',
      Nacute: '\u0143',
      Ncaron: '\u0147',
      Ncedil: '\u0145',
      Ncy: '\u041D',
      NegativeMediumSpace: '\u200B',
      NegativeThickSpace: '\u200B',
      NegativeThinSpace: '\u200B',
      NegativeVeryThinSpace: '\u200B',
      NestedGreaterGreater: '\u226B',
      NestedLessLess: '\u226A',
      NewLine: `
`,
      Nfr: '\u{1D511}',
      NoBreak: '\u2060',
      NonBreakingSpace: '\xA0',
      Nopf: '\u2115',
      Not: '\u2AEC',
      NotCongruent: '\u2262',
      NotCupCap: '\u226D',
      NotDoubleVerticalBar: '\u2226',
      NotElement: '\u2209',
      NotEqual: '\u2260',
      NotEqualTilde: '\u2242\u0338',
      NotExists: '\u2204',
      NotGreater: '\u226F',
      NotGreaterEqual: '\u2271',
      NotGreaterFullEqual: '\u2267\u0338',
      NotGreaterGreater: '\u226B\u0338',
      NotGreaterLess: '\u2279',
      NotGreaterSlantEqual: '\u2A7E\u0338',
      NotGreaterTilde: '\u2275',
      NotHumpDownHump: '\u224E\u0338',
      NotHumpEqual: '\u224F\u0338',
      NotLeftTriangle: '\u22EA',
      NotLeftTriangleBar: '\u29CF\u0338',
      NotLeftTriangleEqual: '\u22EC',
      NotLess: '\u226E',
      NotLessEqual: '\u2270',
      NotLessGreater: '\u2278',
      NotLessLess: '\u226A\u0338',
      NotLessSlantEqual: '\u2A7D\u0338',
      NotLessTilde: '\u2274',
      NotNestedGreaterGreater: '\u2AA2\u0338',
      NotNestedLessLess: '\u2AA1\u0338',
      NotPrecedes: '\u2280',
      NotPrecedesEqual: '\u2AAF\u0338',
      NotPrecedesSlantEqual: '\u22E0',
      NotReverseElement: '\u220C',
      NotRightTriangle: '\u22EB',
      NotRightTriangleBar: '\u29D0\u0338',
      NotRightTriangleEqual: '\u22ED',
      NotSquareSubset: '\u228F\u0338',
      NotSquareSubsetEqual: '\u22E2',
      NotSquareSuperset: '\u2290\u0338',
      NotSquareSupersetEqual: '\u22E3',
      NotSubset: '\u2282\u20D2',
      NotSubsetEqual: '\u2288',
      NotSucceeds: '\u2281',
      NotSucceedsEqual: '\u2AB0\u0338',
      NotSucceedsSlantEqual: '\u22E1',
      NotSucceedsTilde: '\u227F\u0338',
      NotSuperset: '\u2283\u20D2',
      NotSupersetEqual: '\u2289',
      NotTilde: '\u2241',
      NotTildeEqual: '\u2244',
      NotTildeFullEqual: '\u2247',
      NotTildeTilde: '\u2249',
      NotVerticalBar: '\u2224',
      Nscr: '\u{1D4A9}',
      Ntilde: '\xD1',
      Nu: '\u039D',
      OElig: '\u0152',
      Oacute: '\xD3',
      Ocirc: '\xD4',
      Ocy: '\u041E',
      Odblac: '\u0150',
      Ofr: '\u{1D512}',
      Ograve: '\xD2',
      Omacr: '\u014C',
      Omega: '\u03A9',
      Omicron: '\u039F',
      Oopf: '\u{1D546}',
      OpenCurlyDoubleQuote: '\u201C',
      OpenCurlyQuote: '\u2018',
      Or: '\u2A54',
      Oscr: '\u{1D4AA}',
      Oslash: '\xD8',
      Otilde: '\xD5',
      Otimes: '\u2A37',
      Ouml: '\xD6',
      OverBar: '\u203E',
      OverBrace: '\u23DE',
      OverBracket: '\u23B4',
      OverParenthesis: '\u23DC',
      PartialD: '\u2202',
      Pcy: '\u041F',
      Pfr: '\u{1D513}',
      Phi: '\u03A6',
      Pi: '\u03A0',
      PlusMinus: '\xB1',
      Poincareplane: '\u210C',
      Popf: '\u2119',
      Pr: '\u2ABB',
      Precedes: '\u227A',
      PrecedesEqual: '\u2AAF',
      PrecedesSlantEqual: '\u227C',
      PrecedesTilde: '\u227E',
      Prime: '\u2033',
      Product: '\u220F',
      Proportion: '\u2237',
      Proportional: '\u221D',
      Pscr: '\u{1D4AB}',
      Psi: '\u03A8',
      QUOT: '"',
      Qfr: '\u{1D514}',
      Qopf: '\u211A',
      Qscr: '\u{1D4AC}',
      RBarr: '\u2910',
      REG: '\xAE',
      Racute: '\u0154',
      Rang: '\u27EB',
      Rarr: '\u21A0',
      Rarrtl: '\u2916',
      Rcaron: '\u0158',
      Rcedil: '\u0156',
      Rcy: '\u0420',
      Re: '\u211C',
      ReverseElement: '\u220B',
      ReverseEquilibrium: '\u21CB',
      ReverseUpEquilibrium: '\u296F',
      Rfr: '\u211C',
      Rho: '\u03A1',
      RightAngleBracket: '\u27E9',
      RightArrow: '\u2192',
      RightArrowBar: '\u21E5',
      RightArrowLeftArrow: '\u21C4',
      RightCeiling: '\u2309',
      RightDoubleBracket: '\u27E7',
      RightDownTeeVector: '\u295D',
      RightDownVector: '\u21C2',
      RightDownVectorBar: '\u2955',
      RightFloor: '\u230B',
      RightTee: '\u22A2',
      RightTeeArrow: '\u21A6',
      RightTeeVector: '\u295B',
      RightTriangle: '\u22B3',
      RightTriangleBar: '\u29D0',
      RightTriangleEqual: '\u22B5',
      RightUpDownVector: '\u294F',
      RightUpTeeVector: '\u295C',
      RightUpVector: '\u21BE',
      RightUpVectorBar: '\u2954',
      RightVector: '\u21C0',
      RightVectorBar: '\u2953',
      Rightarrow: '\u21D2',
      Ropf: '\u211D',
      RoundImplies: '\u2970',
      Rrightarrow: '\u21DB',
      Rscr: '\u211B',
      Rsh: '\u21B1',
      RuleDelayed: '\u29F4',
      SHCHcy: '\u0429',
      SHcy: '\u0428',
      SOFTcy: '\u042C',
      Sacute: '\u015A',
      Sc: '\u2ABC',
      Scaron: '\u0160',
      Scedil: '\u015E',
      Scirc: '\u015C',
      Scy: '\u0421',
      Sfr: '\u{1D516}',
      ShortDownArrow: '\u2193',
      ShortLeftArrow: '\u2190',
      ShortRightArrow: '\u2192',
      ShortUpArrow: '\u2191',
      Sigma: '\u03A3',
      SmallCircle: '\u2218',
      Sopf: '\u{1D54A}',
      Sqrt: '\u221A',
      Square: '\u25A1',
      SquareIntersection: '\u2293',
      SquareSubset: '\u228F',
      SquareSubsetEqual: '\u2291',
      SquareSuperset: '\u2290',
      SquareSupersetEqual: '\u2292',
      SquareUnion: '\u2294',
      Sscr: '\u{1D4AE}',
      Star: '\u22C6',
      Sub: '\u22D0',
      Subset: '\u22D0',
      SubsetEqual: '\u2286',
      Succeeds: '\u227B',
      SucceedsEqual: '\u2AB0',
      SucceedsSlantEqual: '\u227D',
      SucceedsTilde: '\u227F',
      SuchThat: '\u220B',
      Sum: '\u2211',
      Sup: '\u22D1',
      Superset: '\u2283',
      SupersetEqual: '\u2287',
      Supset: '\u22D1',
      THORN: '\xDE',
      TRADE: '\u2122',
      TSHcy: '\u040B',
      TScy: '\u0426',
      Tab: '	',
      Tau: '\u03A4',
      Tcaron: '\u0164',
      Tcedil: '\u0162',
      Tcy: '\u0422',
      Tfr: '\u{1D517}',
      Therefore: '\u2234',
      Theta: '\u0398',
      ThickSpace: '\u205F\u200A',
      ThinSpace: '\u2009',
      Tilde: '\u223C',
      TildeEqual: '\u2243',
      TildeFullEqual: '\u2245',
      TildeTilde: '\u2248',
      Topf: '\u{1D54B}',
      TripleDot: '\u20DB',
      Tscr: '\u{1D4AF}',
      Tstrok: '\u0166',
      Uacute: '\xDA',
      Uarr: '\u219F',
      Uarrocir: '\u2949',
      Ubrcy: '\u040E',
      Ubreve: '\u016C',
      Ucirc: '\xDB',
      Ucy: '\u0423',
      Udblac: '\u0170',
      Ufr: '\u{1D518}',
      Ugrave: '\xD9',
      Umacr: '\u016A',
      UnderBar: '_',
      UnderBrace: '\u23DF',
      UnderBracket: '\u23B5',
      UnderParenthesis: '\u23DD',
      Union: '\u22C3',
      UnionPlus: '\u228E',
      Uogon: '\u0172',
      Uopf: '\u{1D54C}',
      UpArrow: '\u2191',
      UpArrowBar: '\u2912',
      UpArrowDownArrow: '\u21C5',
      UpDownArrow: '\u2195',
      UpEquilibrium: '\u296E',
      UpTee: '\u22A5',
      UpTeeArrow: '\u21A5',
      Uparrow: '\u21D1',
      Updownarrow: '\u21D5',
      UpperLeftArrow: '\u2196',
      UpperRightArrow: '\u2197',
      Upsi: '\u03D2',
      Upsilon: '\u03A5',
      Uring: '\u016E',
      Uscr: '\u{1D4B0}',
      Utilde: '\u0168',
      Uuml: '\xDC',
      VDash: '\u22AB',
      Vbar: '\u2AEB',
      Vcy: '\u0412',
      Vdash: '\u22A9',
      Vdashl: '\u2AE6',
      Vee: '\u22C1',
      Verbar: '\u2016',
      Vert: '\u2016',
      VerticalBar: '\u2223',
      VerticalLine: '|',
      VerticalSeparator: '\u2758',
      VerticalTilde: '\u2240',
      VeryThinSpace: '\u200A',
      Vfr: '\u{1D519}',
      Vopf: '\u{1D54D}',
      Vscr: '\u{1D4B1}',
      Vvdash: '\u22AA',
      Wcirc: '\u0174',
      Wedge: '\u22C0',
      Wfr: '\u{1D51A}',
      Wopf: '\u{1D54E}',
      Wscr: '\u{1D4B2}',
      Xfr: '\u{1D51B}',
      Xi: '\u039E',
      Xopf: '\u{1D54F}',
      Xscr: '\u{1D4B3}',
      YAcy: '\u042F',
      YIcy: '\u0407',
      YUcy: '\u042E',
      Yacute: '\xDD',
      Ycirc: '\u0176',
      Ycy: '\u042B',
      Yfr: '\u{1D51C}',
      Yopf: '\u{1D550}',
      Yscr: '\u{1D4B4}',
      Yuml: '\u0178',
      ZHcy: '\u0416',
      Zacute: '\u0179',
      Zcaron: '\u017D',
      Zcy: '\u0417',
      Zdot: '\u017B',
      ZeroWidthSpace: '\u200B',
      Zeta: '\u0396',
      Zfr: '\u2128',
      Zopf: '\u2124',
      Zscr: '\u{1D4B5}',
      aacute: '\xE1',
      abreve: '\u0103',
      ac: '\u223E',
      acE: '\u223E\u0333',
      acd: '\u223F',
      acirc: '\xE2',
      acute: '\xB4',
      acy: '\u0430',
      aelig: '\xE6',
      af: '\u2061',
      afr: '\u{1D51E}',
      agrave: '\xE0',
      alefsym: '\u2135',
      aleph: '\u2135',
      alpha: '\u03B1',
      amacr: '\u0101',
      amalg: '\u2A3F',
      amp: '&',
      and: '\u2227',
      andand: '\u2A55',
      andd: '\u2A5C',
      andslope: '\u2A58',
      andv: '\u2A5A',
      ang: '\u2220',
      ange: '\u29A4',
      angle: '\u2220',
      angmsd: '\u2221',
      angmsdaa: '\u29A8',
      angmsdab: '\u29A9',
      angmsdac: '\u29AA',
      angmsdad: '\u29AB',
      angmsdae: '\u29AC',
      angmsdaf: '\u29AD',
      angmsdag: '\u29AE',
      angmsdah: '\u29AF',
      angrt: '\u221F',
      angrtvb: '\u22BE',
      angrtvbd: '\u299D',
      angsph: '\u2222',
      angst: '\xC5',
      angzarr: '\u237C',
      aogon: '\u0105',
      aopf: '\u{1D552}',
      ap: '\u2248',
      apE: '\u2A70',
      apacir: '\u2A6F',
      ape: '\u224A',
      apid: '\u224B',
      apos: "'",
      approx: '\u2248',
      approxeq: '\u224A',
      aring: '\xE5',
      ascr: '\u{1D4B6}',
      ast: '*',
      asymp: '\u2248',
      asympeq: '\u224D',
      atilde: '\xE3',
      auml: '\xE4',
      awconint: '\u2233',
      awint: '\u2A11',
      bNot: '\u2AED',
      backcong: '\u224C',
      backepsilon: '\u03F6',
      backprime: '\u2035',
      backsim: '\u223D',
      backsimeq: '\u22CD',
      barvee: '\u22BD',
      barwed: '\u2305',
      barwedge: '\u2305',
      bbrk: '\u23B5',
      bbrktbrk: '\u23B6',
      bcong: '\u224C',
      bcy: '\u0431',
      bdquo: '\u201E',
      becaus: '\u2235',
      because: '\u2235',
      bemptyv: '\u29B0',
      bepsi: '\u03F6',
      bernou: '\u212C',
      beta: '\u03B2',
      beth: '\u2136',
      between: '\u226C',
      bfr: '\u{1D51F}',
      bigcap: '\u22C2',
      bigcirc: '\u25EF',
      bigcup: '\u22C3',
      bigodot: '\u2A00',
      bigoplus: '\u2A01',
      bigotimes: '\u2A02',
      bigsqcup: '\u2A06',
      bigstar: '\u2605',
      bigtriangledown: '\u25BD',
      bigtriangleup: '\u25B3',
      biguplus: '\u2A04',
      bigvee: '\u22C1',
      bigwedge: '\u22C0',
      bkarow: '\u290D',
      blacklozenge: '\u29EB',
      blacksquare: '\u25AA',
      blacktriangle: '\u25B4',
      blacktriangledown: '\u25BE',
      blacktriangleleft: '\u25C2',
      blacktriangleright: '\u25B8',
      blank: '\u2423',
      blk12: '\u2592',
      blk14: '\u2591',
      blk34: '\u2593',
      block: '\u2588',
      bne: '=\u20E5',
      bnequiv: '\u2261\u20E5',
      bnot: '\u2310',
      bopf: '\u{1D553}',
      bot: '\u22A5',
      bottom: '\u22A5',
      bowtie: '\u22C8',
      boxDL: '\u2557',
      boxDR: '\u2554',
      boxDl: '\u2556',
      boxDr: '\u2553',
      boxH: '\u2550',
      boxHD: '\u2566',
      boxHU: '\u2569',
      boxHd: '\u2564',
      boxHu: '\u2567',
      boxUL: '\u255D',
      boxUR: '\u255A',
      boxUl: '\u255C',
      boxUr: '\u2559',
      boxV: '\u2551',
      boxVH: '\u256C',
      boxVL: '\u2563',
      boxVR: '\u2560',
      boxVh: '\u256B',
      boxVl: '\u2562',
      boxVr: '\u255F',
      boxbox: '\u29C9',
      boxdL: '\u2555',
      boxdR: '\u2552',
      boxdl: '\u2510',
      boxdr: '\u250C',
      boxh: '\u2500',
      boxhD: '\u2565',
      boxhU: '\u2568',
      boxhd: '\u252C',
      boxhu: '\u2534',
      boxminus: '\u229F',
      boxplus: '\u229E',
      boxtimes: '\u22A0',
      boxuL: '\u255B',
      boxuR: '\u2558',
      boxul: '\u2518',
      boxur: '\u2514',
      boxv: '\u2502',
      boxvH: '\u256A',
      boxvL: '\u2561',
      boxvR: '\u255E',
      boxvh: '\u253C',
      boxvl: '\u2524',
      boxvr: '\u251C',
      bprime: '\u2035',
      breve: '\u02D8',
      brvbar: '\xA6',
      bscr: '\u{1D4B7}',
      bsemi: '\u204F',
      bsim: '\u223D',
      bsime: '\u22CD',
      bsol: '\\',
      bsolb: '\u29C5',
      bsolhsub: '\u27C8',
      bull: '\u2022',
      bullet: '\u2022',
      bump: '\u224E',
      bumpE: '\u2AAE',
      bumpe: '\u224F',
      bumpeq: '\u224F',
      cacute: '\u0107',
      cap: '\u2229',
      capand: '\u2A44',
      capbrcup: '\u2A49',
      capcap: '\u2A4B',
      capcup: '\u2A47',
      capdot: '\u2A40',
      caps: '\u2229\uFE00',
      caret: '\u2041',
      caron: '\u02C7',
      ccaps: '\u2A4D',
      ccaron: '\u010D',
      ccedil: '\xE7',
      ccirc: '\u0109',
      ccups: '\u2A4C',
      ccupssm: '\u2A50',
      cdot: '\u010B',
      cedil: '\xB8',
      cemptyv: '\u29B2',
      cent: '\xA2',
      centerdot: '\xB7',
      cfr: '\u{1D520}',
      chcy: '\u0447',
      check: '\u2713',
      checkmark: '\u2713',
      chi: '\u03C7',
      cir: '\u25CB',
      cirE: '\u29C3',
      circ: '\u02C6',
      circeq: '\u2257',
      circlearrowleft: '\u21BA',
      circlearrowright: '\u21BB',
      circledR: '\xAE',
      circledS: '\u24C8',
      circledast: '\u229B',
      circledcirc: '\u229A',
      circleddash: '\u229D',
      cire: '\u2257',
      cirfnint: '\u2A10',
      cirmid: '\u2AEF',
      cirscir: '\u29C2',
      clubs: '\u2663',
      clubsuit: '\u2663',
      colon: ':',
      colone: '\u2254',
      coloneq: '\u2254',
      comma: ',',
      commat: '@',
      comp: '\u2201',
      compfn: '\u2218',
      complement: '\u2201',
      complexes: '\u2102',
      cong: '\u2245',
      congdot: '\u2A6D',
      conint: '\u222E',
      copf: '\u{1D554}',
      coprod: '\u2210',
      copy: '\xA9',
      copysr: '\u2117',
      crarr: '\u21B5',
      cross: '\u2717',
      cscr: '\u{1D4B8}',
      csub: '\u2ACF',
      csube: '\u2AD1',
      csup: '\u2AD0',
      csupe: '\u2AD2',
      ctdot: '\u22EF',
      cudarrl: '\u2938',
      cudarrr: '\u2935',
      cuepr: '\u22DE',
      cuesc: '\u22DF',
      cularr: '\u21B6',
      cularrp: '\u293D',
      cup: '\u222A',
      cupbrcap: '\u2A48',
      cupcap: '\u2A46',
      cupcup: '\u2A4A',
      cupdot: '\u228D',
      cupor: '\u2A45',
      cups: '\u222A\uFE00',
      curarr: '\u21B7',
      curarrm: '\u293C',
      curlyeqprec: '\u22DE',
      curlyeqsucc: '\u22DF',
      curlyvee: '\u22CE',
      curlywedge: '\u22CF',
      curren: '\xA4',
      curvearrowleft: '\u21B6',
      curvearrowright: '\u21B7',
      cuvee: '\u22CE',
      cuwed: '\u22CF',
      cwconint: '\u2232',
      cwint: '\u2231',
      cylcty: '\u232D',
      dArr: '\u21D3',
      dHar: '\u2965',
      dagger: '\u2020',
      daleth: '\u2138',
      darr: '\u2193',
      dash: '\u2010',
      dashv: '\u22A3',
      dbkarow: '\u290F',
      dblac: '\u02DD',
      dcaron: '\u010F',
      dcy: '\u0434',
      dd: '\u2146',
      ddagger: '\u2021',
      ddarr: '\u21CA',
      ddotseq: '\u2A77',
      deg: '\xB0',
      delta: '\u03B4',
      demptyv: '\u29B1',
      dfisht: '\u297F',
      dfr: '\u{1D521}',
      dharl: '\u21C3',
      dharr: '\u21C2',
      diam: '\u22C4',
      diamond: '\u22C4',
      diamondsuit: '\u2666',
      diams: '\u2666',
      die: '\xA8',
      digamma: '\u03DD',
      disin: '\u22F2',
      div: '\xF7',
      divide: '\xF7',
      divideontimes: '\u22C7',
      divonx: '\u22C7',
      djcy: '\u0452',
      dlcorn: '\u231E',
      dlcrop: '\u230D',
      dollar: '$',
      dopf: '\u{1D555}',
      dot: '\u02D9',
      doteq: '\u2250',
      doteqdot: '\u2251',
      dotminus: '\u2238',
      dotplus: '\u2214',
      dotsquare: '\u22A1',
      doublebarwedge: '\u2306',
      downarrow: '\u2193',
      downdownarrows: '\u21CA',
      downharpoonleft: '\u21C3',
      downharpoonright: '\u21C2',
      drbkarow: '\u2910',
      drcorn: '\u231F',
      drcrop: '\u230C',
      dscr: '\u{1D4B9}',
      dscy: '\u0455',
      dsol: '\u29F6',
      dstrok: '\u0111',
      dtdot: '\u22F1',
      dtri: '\u25BF',
      dtrif: '\u25BE',
      duarr: '\u21F5',
      duhar: '\u296F',
      dwangle: '\u29A6',
      dzcy: '\u045F',
      dzigrarr: '\u27FF',
      eDDot: '\u2A77',
      eDot: '\u2251',
      eacute: '\xE9',
      easter: '\u2A6E',
      ecaron: '\u011B',
      ecir: '\u2256',
      ecirc: '\xEA',
      ecolon: '\u2255',
      ecy: '\u044D',
      edot: '\u0117',
      ee: '\u2147',
      efDot: '\u2252',
      efr: '\u{1D522}',
      eg: '\u2A9A',
      egrave: '\xE8',
      egs: '\u2A96',
      egsdot: '\u2A98',
      el: '\u2A99',
      elinters: '\u23E7',
      ell: '\u2113',
      els: '\u2A95',
      elsdot: '\u2A97',
      emacr: '\u0113',
      empty: '\u2205',
      emptyset: '\u2205',
      emptyv: '\u2205',
      emsp13: '\u2004',
      emsp14: '\u2005',
      emsp: '\u2003',
      eng: '\u014B',
      ensp: '\u2002',
      eogon: '\u0119',
      eopf: '\u{1D556}',
      epar: '\u22D5',
      eparsl: '\u29E3',
      eplus: '\u2A71',
      epsi: '\u03B5',
      epsilon: '\u03B5',
      epsiv: '\u03F5',
      eqcirc: '\u2256',
      eqcolon: '\u2255',
      eqsim: '\u2242',
      eqslantgtr: '\u2A96',
      eqslantless: '\u2A95',
      equals: '=',
      equest: '\u225F',
      equiv: '\u2261',
      equivDD: '\u2A78',
      eqvparsl: '\u29E5',
      erDot: '\u2253',
      erarr: '\u2971',
      escr: '\u212F',
      esdot: '\u2250',
      esim: '\u2242',
      eta: '\u03B7',
      eth: '\xF0',
      euml: '\xEB',
      euro: '\u20AC',
      excl: '!',
      exist: '\u2203',
      expectation: '\u2130',
      exponentiale: '\u2147',
      fallingdotseq: '\u2252',
      fcy: '\u0444',
      female: '\u2640',
      ffilig: '\uFB03',
      fflig: '\uFB00',
      ffllig: '\uFB04',
      ffr: '\u{1D523}',
      filig: '\uFB01',
      fjlig: 'fj',
      flat: '\u266D',
      fllig: '\uFB02',
      fltns: '\u25B1',
      fnof: '\u0192',
      fopf: '\u{1D557}',
      forall: '\u2200',
      fork: '\u22D4',
      forkv: '\u2AD9',
      fpartint: '\u2A0D',
      frac12: '\xBD',
      frac13: '\u2153',
      frac14: '\xBC',
      frac15: '\u2155',
      frac16: '\u2159',
      frac18: '\u215B',
      frac23: '\u2154',
      frac25: '\u2156',
      frac34: '\xBE',
      frac35: '\u2157',
      frac38: '\u215C',
      frac45: '\u2158',
      frac56: '\u215A',
      frac58: '\u215D',
      frac78: '\u215E',
      frasl: '\u2044',
      frown: '\u2322',
      fscr: '\u{1D4BB}',
      gE: '\u2267',
      gEl: '\u2A8C',
      gacute: '\u01F5',
      gamma: '\u03B3',
      gammad: '\u03DD',
      gap: '\u2A86',
      gbreve: '\u011F',
      gcirc: '\u011D',
      gcy: '\u0433',
      gdot: '\u0121',
      ge: '\u2265',
      gel: '\u22DB',
      geq: '\u2265',
      geqq: '\u2267',
      geqslant: '\u2A7E',
      ges: '\u2A7E',
      gescc: '\u2AA9',
      gesdot: '\u2A80',
      gesdoto: '\u2A82',
      gesdotol: '\u2A84',
      gesl: '\u22DB\uFE00',
      gesles: '\u2A94',
      gfr: '\u{1D524}',
      gg: '\u226B',
      ggg: '\u22D9',
      gimel: '\u2137',
      gjcy: '\u0453',
      gl: '\u2277',
      glE: '\u2A92',
      gla: '\u2AA5',
      glj: '\u2AA4',
      gnE: '\u2269',
      gnap: '\u2A8A',
      gnapprox: '\u2A8A',
      gne: '\u2A88',
      gneq: '\u2A88',
      gneqq: '\u2269',
      gnsim: '\u22E7',
      gopf: '\u{1D558}',
      grave: '`',
      gscr: '\u210A',
      gsim: '\u2273',
      gsime: '\u2A8E',
      gsiml: '\u2A90',
      gt: '>',
      gtcc: '\u2AA7',
      gtcir: '\u2A7A',
      gtdot: '\u22D7',
      gtlPar: '\u2995',
      gtquest: '\u2A7C',
      gtrapprox: '\u2A86',
      gtrarr: '\u2978',
      gtrdot: '\u22D7',
      gtreqless: '\u22DB',
      gtreqqless: '\u2A8C',
      gtrless: '\u2277',
      gtrsim: '\u2273',
      gvertneqq: '\u2269\uFE00',
      gvnE: '\u2269\uFE00',
      hArr: '\u21D4',
      hairsp: '\u200A',
      half: '\xBD',
      hamilt: '\u210B',
      hardcy: '\u044A',
      harr: '\u2194',
      harrcir: '\u2948',
      harrw: '\u21AD',
      hbar: '\u210F',
      hcirc: '\u0125',
      hearts: '\u2665',
      heartsuit: '\u2665',
      hellip: '\u2026',
      hercon: '\u22B9',
      hfr: '\u{1D525}',
      hksearow: '\u2925',
      hkswarow: '\u2926',
      hoarr: '\u21FF',
      homtht: '\u223B',
      hookleftarrow: '\u21A9',
      hookrightarrow: '\u21AA',
      hopf: '\u{1D559}',
      horbar: '\u2015',
      hscr: '\u{1D4BD}',
      hslash: '\u210F',
      hstrok: '\u0127',
      hybull: '\u2043',
      hyphen: '\u2010',
      iacute: '\xED',
      ic: '\u2063',
      icirc: '\xEE',
      icy: '\u0438',
      iecy: '\u0435',
      iexcl: '\xA1',
      iff: '\u21D4',
      ifr: '\u{1D526}',
      igrave: '\xEC',
      ii: '\u2148',
      iiiint: '\u2A0C',
      iiint: '\u222D',
      iinfin: '\u29DC',
      iiota: '\u2129',
      ijlig: '\u0133',
      imacr: '\u012B',
      image: '\u2111',
      imagline: '\u2110',
      imagpart: '\u2111',
      imath: '\u0131',
      imof: '\u22B7',
      imped: '\u01B5',
      in: '\u2208',
      incare: '\u2105',
      infin: '\u221E',
      infintie: '\u29DD',
      inodot: '\u0131',
      int: '\u222B',
      intcal: '\u22BA',
      integers: '\u2124',
      intercal: '\u22BA',
      intlarhk: '\u2A17',
      intprod: '\u2A3C',
      iocy: '\u0451',
      iogon: '\u012F',
      iopf: '\u{1D55A}',
      iota: '\u03B9',
      iprod: '\u2A3C',
      iquest: '\xBF',
      iscr: '\u{1D4BE}',
      isin: '\u2208',
      isinE: '\u22F9',
      isindot: '\u22F5',
      isins: '\u22F4',
      isinsv: '\u22F3',
      isinv: '\u2208',
      it: '\u2062',
      itilde: '\u0129',
      iukcy: '\u0456',
      iuml: '\xEF',
      jcirc: '\u0135',
      jcy: '\u0439',
      jfr: '\u{1D527}',
      jmath: '\u0237',
      jopf: '\u{1D55B}',
      jscr: '\u{1D4BF}',
      jsercy: '\u0458',
      jukcy: '\u0454',
      kappa: '\u03BA',
      kappav: '\u03F0',
      kcedil: '\u0137',
      kcy: '\u043A',
      kfr: '\u{1D528}',
      kgreen: '\u0138',
      khcy: '\u0445',
      kjcy: '\u045C',
      kopf: '\u{1D55C}',
      kscr: '\u{1D4C0}',
      lAarr: '\u21DA',
      lArr: '\u21D0',
      lAtail: '\u291B',
      lBarr: '\u290E',
      lE: '\u2266',
      lEg: '\u2A8B',
      lHar: '\u2962',
      lacute: '\u013A',
      laemptyv: '\u29B4',
      lagran: '\u2112',
      lambda: '\u03BB',
      lang: '\u27E8',
      langd: '\u2991',
      langle: '\u27E8',
      lap: '\u2A85',
      laquo: '\xAB',
      larr: '\u2190',
      larrb: '\u21E4',
      larrbfs: '\u291F',
      larrfs: '\u291D',
      larrhk: '\u21A9',
      larrlp: '\u21AB',
      larrpl: '\u2939',
      larrsim: '\u2973',
      larrtl: '\u21A2',
      lat: '\u2AAB',
      latail: '\u2919',
      late: '\u2AAD',
      lates: '\u2AAD\uFE00',
      lbarr: '\u290C',
      lbbrk: '\u2772',
      lbrace: '{',
      lbrack: '[',
      lbrke: '\u298B',
      lbrksld: '\u298F',
      lbrkslu: '\u298D',
      lcaron: '\u013E',
      lcedil: '\u013C',
      lceil: '\u2308',
      lcub: '{',
      lcy: '\u043B',
      ldca: '\u2936',
      ldquo: '\u201C',
      ldquor: '\u201E',
      ldrdhar: '\u2967',
      ldrushar: '\u294B',
      ldsh: '\u21B2',
      le: '\u2264',
      leftarrow: '\u2190',
      leftarrowtail: '\u21A2',
      leftharpoondown: '\u21BD',
      leftharpoonup: '\u21BC',
      leftleftarrows: '\u21C7',
      leftrightarrow: '\u2194',
      leftrightarrows: '\u21C6',
      leftrightharpoons: '\u21CB',
      leftrightsquigarrow: '\u21AD',
      leftthreetimes: '\u22CB',
      leg: '\u22DA',
      leq: '\u2264',
      leqq: '\u2266',
      leqslant: '\u2A7D',
      les: '\u2A7D',
      lescc: '\u2AA8',
      lesdot: '\u2A7F',
      lesdoto: '\u2A81',
      lesdotor: '\u2A83',
      lesg: '\u22DA\uFE00',
      lesges: '\u2A93',
      lessapprox: '\u2A85',
      lessdot: '\u22D6',
      lesseqgtr: '\u22DA',
      lesseqqgtr: '\u2A8B',
      lessgtr: '\u2276',
      lesssim: '\u2272',
      lfisht: '\u297C',
      lfloor: '\u230A',
      lfr: '\u{1D529}',
      lg: '\u2276',
      lgE: '\u2A91',
      lhard: '\u21BD',
      lharu: '\u21BC',
      lharul: '\u296A',
      lhblk: '\u2584',
      ljcy: '\u0459',
      ll: '\u226A',
      llarr: '\u21C7',
      llcorner: '\u231E',
      llhard: '\u296B',
      lltri: '\u25FA',
      lmidot: '\u0140',
      lmoust: '\u23B0',
      lmoustache: '\u23B0',
      lnE: '\u2268',
      lnap: '\u2A89',
      lnapprox: '\u2A89',
      lne: '\u2A87',
      lneq: '\u2A87',
      lneqq: '\u2268',
      lnsim: '\u22E6',
      loang: '\u27EC',
      loarr: '\u21FD',
      lobrk: '\u27E6',
      longleftarrow: '\u27F5',
      longleftrightarrow: '\u27F7',
      longmapsto: '\u27FC',
      longrightarrow: '\u27F6',
      looparrowleft: '\u21AB',
      looparrowright: '\u21AC',
      lopar: '\u2985',
      lopf: '\u{1D55D}',
      loplus: '\u2A2D',
      lotimes: '\u2A34',
      lowast: '\u2217',
      lowbar: '_',
      loz: '\u25CA',
      lozenge: '\u25CA',
      lozf: '\u29EB',
      lpar: '(',
      lparlt: '\u2993',
      lrarr: '\u21C6',
      lrcorner: '\u231F',
      lrhar: '\u21CB',
      lrhard: '\u296D',
      lrm: '\u200E',
      lrtri: '\u22BF',
      lsaquo: '\u2039',
      lscr: '\u{1D4C1}',
      lsh: '\u21B0',
      lsim: '\u2272',
      lsime: '\u2A8D',
      lsimg: '\u2A8F',
      lsqb: '[',
      lsquo: '\u2018',
      lsquor: '\u201A',
      lstrok: '\u0142',
      lt: '<',
      ltcc: '\u2AA6',
      ltcir: '\u2A79',
      ltdot: '\u22D6',
      lthree: '\u22CB',
      ltimes: '\u22C9',
      ltlarr: '\u2976',
      ltquest: '\u2A7B',
      ltrPar: '\u2996',
      ltri: '\u25C3',
      ltrie: '\u22B4',
      ltrif: '\u25C2',
      lurdshar: '\u294A',
      luruhar: '\u2966',
      lvertneqq: '\u2268\uFE00',
      lvnE: '\u2268\uFE00',
      mDDot: '\u223A',
      macr: '\xAF',
      male: '\u2642',
      malt: '\u2720',
      maltese: '\u2720',
      map: '\u21A6',
      mapsto: '\u21A6',
      mapstodown: '\u21A7',
      mapstoleft: '\u21A4',
      mapstoup: '\u21A5',
      marker: '\u25AE',
      mcomma: '\u2A29',
      mcy: '\u043C',
      mdash: '\u2014',
      measuredangle: '\u2221',
      mfr: '\u{1D52A}',
      mho: '\u2127',
      micro: '\xB5',
      mid: '\u2223',
      midast: '*',
      midcir: '\u2AF0',
      middot: '\xB7',
      minus: '\u2212',
      minusb: '\u229F',
      minusd: '\u2238',
      minusdu: '\u2A2A',
      mlcp: '\u2ADB',
      mldr: '\u2026',
      mnplus: '\u2213',
      models: '\u22A7',
      mopf: '\u{1D55E}',
      mp: '\u2213',
      mscr: '\u{1D4C2}',
      mstpos: '\u223E',
      mu: '\u03BC',
      multimap: '\u22B8',
      mumap: '\u22B8',
      nGg: '\u22D9\u0338',
      nGt: '\u226B\u20D2',
      nGtv: '\u226B\u0338',
      nLeftarrow: '\u21CD',
      nLeftrightarrow: '\u21CE',
      nLl: '\u22D8\u0338',
      nLt: '\u226A\u20D2',
      nLtv: '\u226A\u0338',
      nRightarrow: '\u21CF',
      nVDash: '\u22AF',
      nVdash: '\u22AE',
      nabla: '\u2207',
      nacute: '\u0144',
      nang: '\u2220\u20D2',
      nap: '\u2249',
      napE: '\u2A70\u0338',
      napid: '\u224B\u0338',
      napos: '\u0149',
      napprox: '\u2249',
      natur: '\u266E',
      natural: '\u266E',
      naturals: '\u2115',
      nbsp: '\xA0',
      nbump: '\u224E\u0338',
      nbumpe: '\u224F\u0338',
      ncap: '\u2A43',
      ncaron: '\u0148',
      ncedil: '\u0146',
      ncong: '\u2247',
      ncongdot: '\u2A6D\u0338',
      ncup: '\u2A42',
      ncy: '\u043D',
      ndash: '\u2013',
      ne: '\u2260',
      neArr: '\u21D7',
      nearhk: '\u2924',
      nearr: '\u2197',
      nearrow: '\u2197',
      nedot: '\u2250\u0338',
      nequiv: '\u2262',
      nesear: '\u2928',
      nesim: '\u2242\u0338',
      nexist: '\u2204',
      nexists: '\u2204',
      nfr: '\u{1D52B}',
      ngE: '\u2267\u0338',
      nge: '\u2271',
      ngeq: '\u2271',
      ngeqq: '\u2267\u0338',
      ngeqslant: '\u2A7E\u0338',
      nges: '\u2A7E\u0338',
      ngsim: '\u2275',
      ngt: '\u226F',
      ngtr: '\u226F',
      nhArr: '\u21CE',
      nharr: '\u21AE',
      nhpar: '\u2AF2',
      ni: '\u220B',
      nis: '\u22FC',
      nisd: '\u22FA',
      niv: '\u220B',
      njcy: '\u045A',
      nlArr: '\u21CD',
      nlE: '\u2266\u0338',
      nlarr: '\u219A',
      nldr: '\u2025',
      nle: '\u2270',
      nleftarrow: '\u219A',
      nleftrightarrow: '\u21AE',
      nleq: '\u2270',
      nleqq: '\u2266\u0338',
      nleqslant: '\u2A7D\u0338',
      nles: '\u2A7D\u0338',
      nless: '\u226E',
      nlsim: '\u2274',
      nlt: '\u226E',
      nltri: '\u22EA',
      nltrie: '\u22EC',
      nmid: '\u2224',
      nopf: '\u{1D55F}',
      not: '\xAC',
      notin: '\u2209',
      notinE: '\u22F9\u0338',
      notindot: '\u22F5\u0338',
      notinva: '\u2209',
      notinvb: '\u22F7',
      notinvc: '\u22F6',
      notni: '\u220C',
      notniva: '\u220C',
      notnivb: '\u22FE',
      notnivc: '\u22FD',
      npar: '\u2226',
      nparallel: '\u2226',
      nparsl: '\u2AFD\u20E5',
      npart: '\u2202\u0338',
      npolint: '\u2A14',
      npr: '\u2280',
      nprcue: '\u22E0',
      npre: '\u2AAF\u0338',
      nprec: '\u2280',
      npreceq: '\u2AAF\u0338',
      nrArr: '\u21CF',
      nrarr: '\u219B',
      nrarrc: '\u2933\u0338',
      nrarrw: '\u219D\u0338',
      nrightarrow: '\u219B',
      nrtri: '\u22EB',
      nrtrie: '\u22ED',
      nsc: '\u2281',
      nsccue: '\u22E1',
      nsce: '\u2AB0\u0338',
      nscr: '\u{1D4C3}',
      nshortmid: '\u2224',
      nshortparallel: '\u2226',
      nsim: '\u2241',
      nsime: '\u2244',
      nsimeq: '\u2244',
      nsmid: '\u2224',
      nspar: '\u2226',
      nsqsube: '\u22E2',
      nsqsupe: '\u22E3',
      nsub: '\u2284',
      nsubE: '\u2AC5\u0338',
      nsube: '\u2288',
      nsubset: '\u2282\u20D2',
      nsubseteq: '\u2288',
      nsubseteqq: '\u2AC5\u0338',
      nsucc: '\u2281',
      nsucceq: '\u2AB0\u0338',
      nsup: '\u2285',
      nsupE: '\u2AC6\u0338',
      nsupe: '\u2289',
      nsupset: '\u2283\u20D2',
      nsupseteq: '\u2289',
      nsupseteqq: '\u2AC6\u0338',
      ntgl: '\u2279',
      ntilde: '\xF1',
      ntlg: '\u2278',
      ntriangleleft: '\u22EA',
      ntrianglelefteq: '\u22EC',
      ntriangleright: '\u22EB',
      ntrianglerighteq: '\u22ED',
      nu: '\u03BD',
      num: '#',
      numero: '\u2116',
      numsp: '\u2007',
      nvDash: '\u22AD',
      nvHarr: '\u2904',
      nvap: '\u224D\u20D2',
      nvdash: '\u22AC',
      nvge: '\u2265\u20D2',
      nvgt: '>\u20D2',
      nvinfin: '\u29DE',
      nvlArr: '\u2902',
      nvle: '\u2264\u20D2',
      nvlt: '<\u20D2',
      nvltrie: '\u22B4\u20D2',
      nvrArr: '\u2903',
      nvrtrie: '\u22B5\u20D2',
      nvsim: '\u223C\u20D2',
      nwArr: '\u21D6',
      nwarhk: '\u2923',
      nwarr: '\u2196',
      nwarrow: '\u2196',
      nwnear: '\u2927',
      oS: '\u24C8',
      oacute: '\xF3',
      oast: '\u229B',
      ocir: '\u229A',
      ocirc: '\xF4',
      ocy: '\u043E',
      odash: '\u229D',
      odblac: '\u0151',
      odiv: '\u2A38',
      odot: '\u2299',
      odsold: '\u29BC',
      oelig: '\u0153',
      ofcir: '\u29BF',
      ofr: '\u{1D52C}',
      ogon: '\u02DB',
      ograve: '\xF2',
      ogt: '\u29C1',
      ohbar: '\u29B5',
      ohm: '\u03A9',
      oint: '\u222E',
      olarr: '\u21BA',
      olcir: '\u29BE',
      olcross: '\u29BB',
      oline: '\u203E',
      olt: '\u29C0',
      omacr: '\u014D',
      omega: '\u03C9',
      omicron: '\u03BF',
      omid: '\u29B6',
      ominus: '\u2296',
      oopf: '\u{1D560}',
      opar: '\u29B7',
      operp: '\u29B9',
      oplus: '\u2295',
      or: '\u2228',
      orarr: '\u21BB',
      ord: '\u2A5D',
      order: '\u2134',
      orderof: '\u2134',
      ordf: '\xAA',
      ordm: '\xBA',
      origof: '\u22B6',
      oror: '\u2A56',
      orslope: '\u2A57',
      orv: '\u2A5B',
      oscr: '\u2134',
      oslash: '\xF8',
      osol: '\u2298',
      otilde: '\xF5',
      otimes: '\u2297',
      otimesas: '\u2A36',
      ouml: '\xF6',
      ovbar: '\u233D',
      par: '\u2225',
      para: '\xB6',
      parallel: '\u2225',
      parsim: '\u2AF3',
      parsl: '\u2AFD',
      part: '\u2202',
      pcy: '\u043F',
      percnt: '%',
      period: '.',
      permil: '\u2030',
      perp: '\u22A5',
      pertenk: '\u2031',
      pfr: '\u{1D52D}',
      phi: '\u03C6',
      phiv: '\u03D5',
      phmmat: '\u2133',
      phone: '\u260E',
      pi: '\u03C0',
      pitchfork: '\u22D4',
      piv: '\u03D6',
      planck: '\u210F',
      planckh: '\u210E',
      plankv: '\u210F',
      plus: '+',
      plusacir: '\u2A23',
      plusb: '\u229E',
      pluscir: '\u2A22',
      plusdo: '\u2214',
      plusdu: '\u2A25',
      pluse: '\u2A72',
      plusmn: '\xB1',
      plussim: '\u2A26',
      plustwo: '\u2A27',
      pm: '\xB1',
      pointint: '\u2A15',
      popf: '\u{1D561}',
      pound: '\xA3',
      pr: '\u227A',
      prE: '\u2AB3',
      prap: '\u2AB7',
      prcue: '\u227C',
      pre: '\u2AAF',
      prec: '\u227A',
      precapprox: '\u2AB7',
      preccurlyeq: '\u227C',
      preceq: '\u2AAF',
      precnapprox: '\u2AB9',
      precneqq: '\u2AB5',
      precnsim: '\u22E8',
      precsim: '\u227E',
      prime: '\u2032',
      primes: '\u2119',
      prnE: '\u2AB5',
      prnap: '\u2AB9',
      prnsim: '\u22E8',
      prod: '\u220F',
      profalar: '\u232E',
      profline: '\u2312',
      profsurf: '\u2313',
      prop: '\u221D',
      propto: '\u221D',
      prsim: '\u227E',
      prurel: '\u22B0',
      pscr: '\u{1D4C5}',
      psi: '\u03C8',
      puncsp: '\u2008',
      qfr: '\u{1D52E}',
      qint: '\u2A0C',
      qopf: '\u{1D562}',
      qprime: '\u2057',
      qscr: '\u{1D4C6}',
      quaternions: '\u210D',
      quatint: '\u2A16',
      quest: '?',
      questeq: '\u225F',
      quot: '"',
      rAarr: '\u21DB',
      rArr: '\u21D2',
      rAtail: '\u291C',
      rBarr: '\u290F',
      rHar: '\u2964',
      race: '\u223D\u0331',
      racute: '\u0155',
      radic: '\u221A',
      raemptyv: '\u29B3',
      rang: '\u27E9',
      rangd: '\u2992',
      range: '\u29A5',
      rangle: '\u27E9',
      raquo: '\xBB',
      rarr: '\u2192',
      rarrap: '\u2975',
      rarrb: '\u21E5',
      rarrbfs: '\u2920',
      rarrc: '\u2933',
      rarrfs: '\u291E',
      rarrhk: '\u21AA',
      rarrlp: '\u21AC',
      rarrpl: '\u2945',
      rarrsim: '\u2974',
      rarrtl: '\u21A3',
      rarrw: '\u219D',
      ratail: '\u291A',
      ratio: '\u2236',
      rationals: '\u211A',
      rbarr: '\u290D',
      rbbrk: '\u2773',
      rbrace: '}',
      rbrack: ']',
      rbrke: '\u298C',
      rbrksld: '\u298E',
      rbrkslu: '\u2990',
      rcaron: '\u0159',
      rcedil: '\u0157',
      rceil: '\u2309',
      rcub: '}',
      rcy: '\u0440',
      rdca: '\u2937',
      rdldhar: '\u2969',
      rdquo: '\u201D',
      rdquor: '\u201D',
      rdsh: '\u21B3',
      real: '\u211C',
      realine: '\u211B',
      realpart: '\u211C',
      reals: '\u211D',
      rect: '\u25AD',
      reg: '\xAE',
      rfisht: '\u297D',
      rfloor: '\u230B',
      rfr: '\u{1D52F}',
      rhard: '\u21C1',
      rharu: '\u21C0',
      rharul: '\u296C',
      rho: '\u03C1',
      rhov: '\u03F1',
      rightarrow: '\u2192',
      rightarrowtail: '\u21A3',
      rightharpoondown: '\u21C1',
      rightharpoonup: '\u21C0',
      rightleftarrows: '\u21C4',
      rightleftharpoons: '\u21CC',
      rightrightarrows: '\u21C9',
      rightsquigarrow: '\u219D',
      rightthreetimes: '\u22CC',
      ring: '\u02DA',
      risingdotseq: '\u2253',
      rlarr: '\u21C4',
      rlhar: '\u21CC',
      rlm: '\u200F',
      rmoust: '\u23B1',
      rmoustache: '\u23B1',
      rnmid: '\u2AEE',
      roang: '\u27ED',
      roarr: '\u21FE',
      robrk: '\u27E7',
      ropar: '\u2986',
      ropf: '\u{1D563}',
      roplus: '\u2A2E',
      rotimes: '\u2A35',
      rpar: ')',
      rpargt: '\u2994',
      rppolint: '\u2A12',
      rrarr: '\u21C9',
      rsaquo: '\u203A',
      rscr: '\u{1D4C7}',
      rsh: '\u21B1',
      rsqb: ']',
      rsquo: '\u2019',
      rsquor: '\u2019',
      rthree: '\u22CC',
      rtimes: '\u22CA',
      rtri: '\u25B9',
      rtrie: '\u22B5',
      rtrif: '\u25B8',
      rtriltri: '\u29CE',
      ruluhar: '\u2968',
      rx: '\u211E',
      sacute: '\u015B',
      sbquo: '\u201A',
      sc: '\u227B',
      scE: '\u2AB4',
      scap: '\u2AB8',
      scaron: '\u0161',
      sccue: '\u227D',
      sce: '\u2AB0',
      scedil: '\u015F',
      scirc: '\u015D',
      scnE: '\u2AB6',
      scnap: '\u2ABA',
      scnsim: '\u22E9',
      scpolint: '\u2A13',
      scsim: '\u227F',
      scy: '\u0441',
      sdot: '\u22C5',
      sdotb: '\u22A1',
      sdote: '\u2A66',
      seArr: '\u21D8',
      searhk: '\u2925',
      searr: '\u2198',
      searrow: '\u2198',
      sect: '\xA7',
      semi: ';',
      seswar: '\u2929',
      setminus: '\u2216',
      setmn: '\u2216',
      sext: '\u2736',
      sfr: '\u{1D530}',
      sfrown: '\u2322',
      sharp: '\u266F',
      shchcy: '\u0449',
      shcy: '\u0448',
      shortmid: '\u2223',
      shortparallel: '\u2225',
      shy: '\xAD',
      sigma: '\u03C3',
      sigmaf: '\u03C2',
      sigmav: '\u03C2',
      sim: '\u223C',
      simdot: '\u2A6A',
      sime: '\u2243',
      simeq: '\u2243',
      simg: '\u2A9E',
      simgE: '\u2AA0',
      siml: '\u2A9D',
      simlE: '\u2A9F',
      simne: '\u2246',
      simplus: '\u2A24',
      simrarr: '\u2972',
      slarr: '\u2190',
      smallsetminus: '\u2216',
      smashp: '\u2A33',
      smeparsl: '\u29E4',
      smid: '\u2223',
      smile: '\u2323',
      smt: '\u2AAA',
      smte: '\u2AAC',
      smtes: '\u2AAC\uFE00',
      softcy: '\u044C',
      sol: '/',
      solb: '\u29C4',
      solbar: '\u233F',
      sopf: '\u{1D564}',
      spades: '\u2660',
      spadesuit: '\u2660',
      spar: '\u2225',
      sqcap: '\u2293',
      sqcaps: '\u2293\uFE00',
      sqcup: '\u2294',
      sqcups: '\u2294\uFE00',
      sqsub: '\u228F',
      sqsube: '\u2291',
      sqsubset: '\u228F',
      sqsubseteq: '\u2291',
      sqsup: '\u2290',
      sqsupe: '\u2292',
      sqsupset: '\u2290',
      sqsupseteq: '\u2292',
      squ: '\u25A1',
      square: '\u25A1',
      squarf: '\u25AA',
      squf: '\u25AA',
      srarr: '\u2192',
      sscr: '\u{1D4C8}',
      ssetmn: '\u2216',
      ssmile: '\u2323',
      sstarf: '\u22C6',
      star: '\u2606',
      starf: '\u2605',
      straightepsilon: '\u03F5',
      straightphi: '\u03D5',
      strns: '\xAF',
      sub: '\u2282',
      subE: '\u2AC5',
      subdot: '\u2ABD',
      sube: '\u2286',
      subedot: '\u2AC3',
      submult: '\u2AC1',
      subnE: '\u2ACB',
      subne: '\u228A',
      subplus: '\u2ABF',
      subrarr: '\u2979',
      subset: '\u2282',
      subseteq: '\u2286',
      subseteqq: '\u2AC5',
      subsetneq: '\u228A',
      subsetneqq: '\u2ACB',
      subsim: '\u2AC7',
      subsub: '\u2AD5',
      subsup: '\u2AD3',
      succ: '\u227B',
      succapprox: '\u2AB8',
      succcurlyeq: '\u227D',
      succeq: '\u2AB0',
      succnapprox: '\u2ABA',
      succneqq: '\u2AB6',
      succnsim: '\u22E9',
      succsim: '\u227F',
      sum: '\u2211',
      sung: '\u266A',
      sup1: '\xB9',
      sup2: '\xB2',
      sup3: '\xB3',
      sup: '\u2283',
      supE: '\u2AC6',
      supdot: '\u2ABE',
      supdsub: '\u2AD8',
      supe: '\u2287',
      supedot: '\u2AC4',
      suphsol: '\u27C9',
      suphsub: '\u2AD7',
      suplarr: '\u297B',
      supmult: '\u2AC2',
      supnE: '\u2ACC',
      supne: '\u228B',
      supplus: '\u2AC0',
      supset: '\u2283',
      supseteq: '\u2287',
      supseteqq: '\u2AC6',
      supsetneq: '\u228B',
      supsetneqq: '\u2ACC',
      supsim: '\u2AC8',
      supsub: '\u2AD4',
      supsup: '\u2AD6',
      swArr: '\u21D9',
      swarhk: '\u2926',
      swarr: '\u2199',
      swarrow: '\u2199',
      swnwar: '\u292A',
      szlig: '\xDF',
      target: '\u2316',
      tau: '\u03C4',
      tbrk: '\u23B4',
      tcaron: '\u0165',
      tcedil: '\u0163',
      tcy: '\u0442',
      tdot: '\u20DB',
      telrec: '\u2315',
      tfr: '\u{1D531}',
      there4: '\u2234',
      therefore: '\u2234',
      theta: '\u03B8',
      thetasym: '\u03D1',
      thetav: '\u03D1',
      thickapprox: '\u2248',
      thicksim: '\u223C',
      thinsp: '\u2009',
      thkap: '\u2248',
      thksim: '\u223C',
      thorn: '\xFE',
      tilde: '\u02DC',
      times: '\xD7',
      timesb: '\u22A0',
      timesbar: '\u2A31',
      timesd: '\u2A30',
      tint: '\u222D',
      toea: '\u2928',
      top: '\u22A4',
      topbot: '\u2336',
      topcir: '\u2AF1',
      topf: '\u{1D565}',
      topfork: '\u2ADA',
      tosa: '\u2929',
      tprime: '\u2034',
      trade: '\u2122',
      triangle: '\u25B5',
      triangledown: '\u25BF',
      triangleleft: '\u25C3',
      trianglelefteq: '\u22B4',
      triangleq: '\u225C',
      triangleright: '\u25B9',
      trianglerighteq: '\u22B5',
      tridot: '\u25EC',
      trie: '\u225C',
      triminus: '\u2A3A',
      triplus: '\u2A39',
      trisb: '\u29CD',
      tritime: '\u2A3B',
      trpezium: '\u23E2',
      tscr: '\u{1D4C9}',
      tscy: '\u0446',
      tshcy: '\u045B',
      tstrok: '\u0167',
      twixt: '\u226C',
      twoheadleftarrow: '\u219E',
      twoheadrightarrow: '\u21A0',
      uArr: '\u21D1',
      uHar: '\u2963',
      uacute: '\xFA',
      uarr: '\u2191',
      ubrcy: '\u045E',
      ubreve: '\u016D',
      ucirc: '\xFB',
      ucy: '\u0443',
      udarr: '\u21C5',
      udblac: '\u0171',
      udhar: '\u296E',
      ufisht: '\u297E',
      ufr: '\u{1D532}',
      ugrave: '\xF9',
      uharl: '\u21BF',
      uharr: '\u21BE',
      uhblk: '\u2580',
      ulcorn: '\u231C',
      ulcorner: '\u231C',
      ulcrop: '\u230F',
      ultri: '\u25F8',
      umacr: '\u016B',
      uml: '\xA8',
      uogon: '\u0173',
      uopf: '\u{1D566}',
      uparrow: '\u2191',
      updownarrow: '\u2195',
      upharpoonleft: '\u21BF',
      upharpoonright: '\u21BE',
      uplus: '\u228E',
      upsi: '\u03C5',
      upsih: '\u03D2',
      upsilon: '\u03C5',
      upuparrows: '\u21C8',
      urcorn: '\u231D',
      urcorner: '\u231D',
      urcrop: '\u230E',
      uring: '\u016F',
      urtri: '\u25F9',
      uscr: '\u{1D4CA}',
      utdot: '\u22F0',
      utilde: '\u0169',
      utri: '\u25B5',
      utrif: '\u25B4',
      uuarr: '\u21C8',
      uuml: '\xFC',
      uwangle: '\u29A7',
      vArr: '\u21D5',
      vBar: '\u2AE8',
      vBarv: '\u2AE9',
      vDash: '\u22A8',
      vangrt: '\u299C',
      varepsilon: '\u03F5',
      varkappa: '\u03F0',
      varnothing: '\u2205',
      varphi: '\u03D5',
      varpi: '\u03D6',
      varpropto: '\u221D',
      varr: '\u2195',
      varrho: '\u03F1',
      varsigma: '\u03C2',
      varsubsetneq: '\u228A\uFE00',
      varsubsetneqq: '\u2ACB\uFE00',
      varsupsetneq: '\u228B\uFE00',
      varsupsetneqq: '\u2ACC\uFE00',
      vartheta: '\u03D1',
      vartriangleleft: '\u22B2',
      vartriangleright: '\u22B3',
      vcy: '\u0432',
      vdash: '\u22A2',
      vee: '\u2228',
      veebar: '\u22BB',
      veeeq: '\u225A',
      vellip: '\u22EE',
      verbar: '|',
      vert: '|',
      vfr: '\u{1D533}',
      vltri: '\u22B2',
      vnsub: '\u2282\u20D2',
      vnsup: '\u2283\u20D2',
      vopf: '\u{1D567}',
      vprop: '\u221D',
      vrtri: '\u22B3',
      vscr: '\u{1D4CB}',
      vsubnE: '\u2ACB\uFE00',
      vsubne: '\u228A\uFE00',
      vsupnE: '\u2ACC\uFE00',
      vsupne: '\u228B\uFE00',
      vzigzag: '\u299A',
      wcirc: '\u0175',
      wedbar: '\u2A5F',
      wedge: '\u2227',
      wedgeq: '\u2259',
      weierp: '\u2118',
      wfr: '\u{1D534}',
      wopf: '\u{1D568}',
      wp: '\u2118',
      wr: '\u2240',
      wreath: '\u2240',
      wscr: '\u{1D4CC}',
      xcap: '\u22C2',
      xcirc: '\u25EF',
      xcup: '\u22C3',
      xdtri: '\u25BD',
      xfr: '\u{1D535}',
      xhArr: '\u27FA',
      xharr: '\u27F7',
      xi: '\u03BE',
      xlArr: '\u27F8',
      xlarr: '\u27F5',
      xmap: '\u27FC',
      xnis: '\u22FB',
      xodot: '\u2A00',
      xopf: '\u{1D569}',
      xoplus: '\u2A01',
      xotime: '\u2A02',
      xrArr: '\u27F9',
      xrarr: '\u27F6',
      xscr: '\u{1D4CD}',
      xsqcup: '\u2A06',
      xuplus: '\u2A04',
      xutri: '\u25B3',
      xvee: '\u22C1',
      xwedge: '\u22C0',
      yacute: '\xFD',
      yacy: '\u044F',
      ycirc: '\u0177',
      ycy: '\u044B',
      yen: '\xA5',
      yfr: '\u{1D536}',
      yicy: '\u0457',
      yopf: '\u{1D56A}',
      yscr: '\u{1D4CE}',
      yucy: '\u044E',
      yuml: '\xFF',
      zacute: '\u017A',
      zcaron: '\u017E',
      zcy: '\u0437',
      zdot: '\u017C',
      zeetrf: '\u2128',
      zeta: '\u03B6',
      zfr: '\u{1D537}',
      zhcy: '\u0436',
      zigrarr: '\u21DD',
      zopf: '\u{1D56B}',
      zscr: '\u{1D4CF}',
      zwj: '\u200D',
      zwnj: '\u200C',
    };
  });
function Br(e) {
  return mC.call(Sc, e) ? Sc[e] : !1;
}
var mC,
  ws = H(() => {
    ab();
    mC = {}.hasOwnProperty;
  });
function nt(e, t, n, r) {
  let i = e.length,
    o = 0,
    s;
  if ((t < 0 ? (t = -t > i ? 0 : i + t) : (t = t > i ? i : t), (n = n > 0 ? n : 0), r.length < 1e4))
    ((s = Array.from(r)), s.unshift(t, n), e.splice(...s));
  else
    for (n && e.splice(t, n); o < r.length; )
      ((s = r.slice(o, o + 1e4)), s.unshift(t, 0), e.splice(...s), (o += 1e4), (t += 1e4));
}
function dt(e, t) {
  return e.length > 0 ? (nt(e, e.length, 0, t), e) : t;
}
var Dn = H(() => {});
function cb(e) {
  let t = {},
    n = -1;
  for (; ++n < e.length; ) gC(t, e[n]);
  return t;
}
function gC(e, t) {
  let n;
  for (n in t) {
    let i = (ub.call(e, n) ? e[n] : void 0) || (e[n] = {}),
      o = t[n],
      s;
    if (o)
      for (s in o) {
        ub.call(i, s) || (i[s] = []);
        let a = o[s];
        yC(i[s], Array.isArray(a) ? a : a ? [a] : []);
      }
  }
}
function yC(e, t) {
  let n = -1,
    r = [];
  for (; ++n < t.length; ) (t[n].add === 'after' ? e : r).push(t[n]);
  nt(e, 0, 0, r);
}
var ub,
  lb = H(() => {
    Dn();
    ub = {}.hasOwnProperty;
  });
function ks(e, t) {
  let n = Number.parseInt(e, t);
  return n < 9 ||
    n === 11 ||
    (n > 13 && n < 32) ||
    (n > 126 && n < 160) ||
    (n > 55295 && n < 57344) ||
    (n > 64975 && n < 65008) ||
    (n & 65535) === 65535 ||
    (n & 65535) === 65534 ||
    n > 1114111
    ? '\uFFFD'
    : String.fromCodePoint(n);
}
var Cc = H(() => {});
function an(e) {
  return e
    .replace(/[\t\n\r ]+/g, ' ')
    .replace(/^ | $/g, '')
    .toLowerCase()
    .toUpperCase();
}
var _s = H(() => {});
function xi(e) {
  return e !== null && (e < 32 || e === 127);
}
function W(e) {
  return e !== null && e < -2;
}
function Le(e) {
  return e !== null && (e < 0 || e === 32);
}
function ie(e) {
  return e === -2 || e === -1 || e === 32;
}
function En(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
var Et,
  pt,
  fb,
  wi,
  db,
  pb,
  hb,
  mb,
  ke = H(() => {
    ((Et = En(/[A-Za-z]/)), (pt = En(/[\dA-Za-z]/)), (fb = En(/[#-'*+\--9=?A-Z^-~]/)));
    ((wi = En(/\d/)), (db = En(/[\dA-Fa-f]/)), (pb = En(/[!-/:-@[-`{-~]/)));
    ((hb = En(new RegExp('\\p{P}|\\p{S}', 'u'))), (mb = En(/\s/)));
  });
function ae(e, t, n, r) {
  let i = r ? r - 1 : Number.POSITIVE_INFINITY,
    o = 0;
  return s;
  function s(u) {
    return ie(u) ? (e.enter(n), a(u)) : t(u);
  }
  function a(u) {
    return ie(u) && o++ < i ? (e.consume(u), a) : (e.exit(n), t(u));
  }
}
var Je = H(() => {
  ke();
});
function bC(e) {
  let t = e.attempt(this.parser.constructs.contentInitial, r, i),
    n;
  return t;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return (e.enter('lineEnding'), e.consume(a), e.exit('lineEnding'), ae(e, t, 'linePrefix'));
  }
  function i(a) {
    return (e.enter('paragraph'), o(a));
  }
  function o(a) {
    let u = e.enter('chunkText', { contentType: 'text', previous: n });
    return (n && (n.next = u), (n = u), s(a));
  }
  function s(a) {
    if (a === null) {
      (e.exit('chunkText'), e.exit('paragraph'), e.consume(a));
      return;
    }
    return W(a) ? (e.consume(a), e.exit('chunkText'), o) : (e.consume(a), s);
  }
}
var gb,
  yb = H(() => {
    Je();
    ke();
    gb = { tokenize: bC };
  });
function vC(e) {
  let t = this,
    n = [],
    r = 0,
    i,
    o,
    s;
  return a;
  function a(w) {
    if (r < n.length) {
      let N = n[r];
      return ((t.containerState = N[1]), e.attempt(N[0].continuation, u, c)(w));
    }
    return c(w);
  }
  function u(w) {
    if ((r++, t.containerState._closeFlow)) {
      ((t.containerState._closeFlow = void 0), i && S());
      let N = t.events.length,
        V = N,
        P;
      for (; V--; )
        if (t.events[V][0] === 'exit' && t.events[V][1].type === 'chunkFlow') {
          P = t.events[V][1].end;
          break;
        }
      q(r);
      let Z = N;
      for (; Z < t.events.length; ) ((t.events[Z][1].end = { ...P }), Z++);
      return (nt(t.events, V + 1, 0, t.events.slice(N)), (t.events.length = Z), c(w));
    }
    return a(w);
  }
  function c(w) {
    if (r === n.length) {
      if (!i) return m(w);
      if (i.currentConstruct && i.currentConstruct.concrete) return A(w);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return ((t.containerState = {}), e.check(bb, f, p)(w));
  }
  function f(w) {
    return (i && S(), q(r), m(w));
  }
  function p(w) {
    return ((t.parser.lazy[t.now().line] = r !== n.length), (s = t.now().offset), A(w));
  }
  function m(w) {
    return ((t.containerState = {}), e.attempt(bb, h, A)(w));
  }
  function h(w) {
    return (r++, n.push([t.currentConstruct, t.containerState]), m(w));
  }
  function A(w) {
    if (w === null) {
      (i && S(), q(0), e.consume(w));
      return;
    }
    return (
      (i = i || t.parser.flow(t.now())),
      e.enter('chunkFlow', { _tokenizer: i, contentType: 'flow', previous: o }),
      I(w)
    );
  }
  function I(w) {
    if (w === null) {
      (L(e.exit('chunkFlow'), !0), q(0), e.consume(w));
      return;
    }
    return W(w)
      ? (e.consume(w), L(e.exit('chunkFlow')), (r = 0), (t.interrupt = void 0), a)
      : (e.consume(w), I);
  }
  function L(w, N) {
    let V = t.sliceStream(w);
    if (
      (N && V.push(null),
      (w.previous = o),
      o && (o.next = w),
      (o = w),
      i.defineSkip(w.start),
      i.write(V),
      t.parser.lazy[w.start.line])
    ) {
      let P = i.events.length;
      for (; P--; )
        if (
          i.events[P][1].start.offset < s &&
          (!i.events[P][1].end || i.events[P][1].end.offset > s)
        )
          return;
      let Z = t.events.length,
        ye = Z,
        fe,
        ge;
      for (; ye--; )
        if (t.events[ye][0] === 'exit' && t.events[ye][1].type === 'chunkFlow') {
          if (fe) {
            ge = t.events[ye][1].end;
            break;
          }
          fe = !0;
        }
      for (q(r), P = Z; P < t.events.length; ) ((t.events[P][1].end = { ...ge }), P++);
      (nt(t.events, ye + 1, 0, t.events.slice(Z)), (t.events.length = P));
    }
  }
  function q(w) {
    let N = n.length;
    for (; N-- > w; ) {
      let V = n[N];
      ((t.containerState = V[1]), V[0].exit.call(t, e));
    }
    n.length = w;
  }
  function S() {
    (i.write([null]), (o = void 0), (i = void 0), (t.containerState._closeFlow = void 0));
  }
}
function xC(e, t, n) {
  return ae(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    'linePrefix',
    this.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
  );
}
var vb,
  bb,
  xb = H(() => {
    Je();
    ke();
    Dn();
    ((vb = { tokenize: vC }), (bb = { tokenize: xC }));
  });
function Tc(e) {
  if (e === null || Le(e) || mb(e)) return 1;
  if (hb(e)) return 2;
}
var wb = H(() => {
  ke();
});
function Hr(e, t, n) {
  let r = [],
    i = -1;
  for (; ++i < e.length; ) {
    let o = e[i].resolveAll;
    o && !r.includes(o) && ((t = o(t, n)), r.push(o));
  }
  return t;
}
var Ss = H(() => {});
function wC(e, t) {
  let n = -1,
    r,
    i,
    o,
    s,
    a,
    u,
    c,
    f;
  for (; ++n < e.length; )
    if (e[n][0] === 'enter' && e[n][1].type === 'attentionSequence' && e[n][1]._close) {
      for (r = n; r--; )
        if (
          e[r][0] === 'exit' &&
          e[r][1].type === 'attentionSequence' &&
          e[r][1]._open &&
          t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)
        ) {
          if (
            (e[r][1]._close || e[n][1]._open) &&
            (e[n][1].end.offset - e[n][1].start.offset) % 3 &&
            !(
              (e[r][1].end.offset -
                e[r][1].start.offset +
                e[n][1].end.offset -
                e[n][1].start.offset) %
              3
            )
          )
            continue;
          u =
            e[r][1].end.offset - e[r][1].start.offset > 1 &&
            e[n][1].end.offset - e[n][1].start.offset > 1
              ? 2
              : 1;
          let p = { ...e[r][1].end },
            m = { ...e[n][1].start };
          (kb(p, -u),
            kb(m, u),
            (s = {
              type: u > 1 ? 'strongSequence' : 'emphasisSequence',
              start: p,
              end: { ...e[r][1].end },
            }),
            (a = {
              type: u > 1 ? 'strongSequence' : 'emphasisSequence',
              start: { ...e[n][1].start },
              end: m,
            }),
            (o = {
              type: u > 1 ? 'strongText' : 'emphasisText',
              start: { ...e[r][1].end },
              end: { ...e[n][1].start },
            }),
            (i = { type: u > 1 ? 'strong' : 'emphasis', start: { ...s.start }, end: { ...a.end } }),
            (e[r][1].end = { ...s.start }),
            (e[n][1].start = { ...a.end }),
            (c = []),
            e[r][1].end.offset - e[r][1].start.offset &&
              (c = dt(c, [
                ['enter', e[r][1], t],
                ['exit', e[r][1], t],
              ])),
            (c = dt(c, [
              ['enter', i, t],
              ['enter', s, t],
              ['exit', s, t],
              ['enter', o, t],
            ])),
            (c = dt(c, Hr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t))),
            (c = dt(c, [
              ['exit', o, t],
              ['enter', a, t],
              ['exit', a, t],
              ['exit', i, t],
            ])),
            e[n][1].end.offset - e[n][1].start.offset
              ? ((f = 2),
                (c = dt(c, [
                  ['enter', e[n][1], t],
                  ['exit', e[n][1], t],
                ])))
              : (f = 0),
            nt(e, r - 1, n - r + 3, c),
            (n = r + c.length - f - 2));
          break;
        }
    }
  for (n = -1; ++n < e.length; ) e[n][1].type === 'attentionSequence' && (e[n][1].type = 'data');
  return e;
}
function kC(e, t) {
  let n = this.parser.constructs.attentionMarkers.null,
    r = this.previous,
    i = Tc(r),
    o;
  return s;
  function s(u) {
    return ((o = u), e.enter('attentionSequence'), a(u));
  }
  function a(u) {
    if (u === o) return (e.consume(u), a);
    let c = e.exit('attentionSequence'),
      f = Tc(u),
      p = !f || (f === 2 && i) || n.includes(u),
      m = !i || (i === 2 && f) || n.includes(r);
    return (
      (c._open = !!(o === 42 ? p : p && (i || !m))),
      (c._close = !!(o === 42 ? m : m && (f || !p))),
      t(u)
    );
  }
}
function kb(e, t) {
  ((e.column += t), (e.offset += t), (e._bufferIndex += t));
}
var ki,
  _b = H(() => {
    Dn();
    wb();
    Ss();
    ki = { name: 'attention', resolveAll: wC, tokenize: kC };
  });
function _C(e, t, n) {
  let r = 0;
  return i;
  function i(h) {
    return (
      e.enter('autolink'),
      e.enter('autolinkMarker'),
      e.consume(h),
      e.exit('autolinkMarker'),
      e.enter('autolinkProtocol'),
      o
    );
  }
  function o(h) {
    return Et(h) ? (e.consume(h), s) : h === 64 ? n(h) : c(h);
  }
  function s(h) {
    return h === 43 || h === 45 || h === 46 || pt(h) ? ((r = 1), a(h)) : c(h);
  }
  function a(h) {
    return h === 58
      ? (e.consume(h), (r = 0), u)
      : (h === 43 || h === 45 || h === 46 || pt(h)) && r++ < 32
        ? (e.consume(h), a)
        : ((r = 0), c(h));
  }
  function u(h) {
    return h === 62
      ? (e.exit('autolinkProtocol'),
        e.enter('autolinkMarker'),
        e.consume(h),
        e.exit('autolinkMarker'),
        e.exit('autolink'),
        t)
      : h === null || h === 32 || h === 60 || xi(h)
        ? n(h)
        : (e.consume(h), u);
  }
  function c(h) {
    return h === 64 ? (e.consume(h), f) : fb(h) ? (e.consume(h), c) : n(h);
  }
  function f(h) {
    return pt(h) ? p(h) : n(h);
  }
  function p(h) {
    return h === 46
      ? (e.consume(h), (r = 0), f)
      : h === 62
        ? ((e.exit('autolinkProtocol').type = 'autolinkEmail'),
          e.enter('autolinkMarker'),
          e.consume(h),
          e.exit('autolinkMarker'),
          e.exit('autolink'),
          t)
        : m(h);
  }
  function m(h) {
    if ((h === 45 || pt(h)) && r++ < 63) {
      let A = h === 45 ? m : p;
      return (e.consume(h), A);
    }
    return n(h);
  }
}
var Dc,
  Sb = H(() => {
    ke();
    Dc = { name: 'autolink', tokenize: _C };
  });
function SC(e, t, n) {
  return r;
  function r(o) {
    return ie(o) ? ae(e, i, 'linePrefix')(o) : i(o);
  }
  function i(o) {
    return o === null || W(o) ? t(o) : n(o);
  }
}
var Rn,
  Cs = H(() => {
    Je();
    ke();
    Rn = { partial: !0, tokenize: SC };
  });
function CC(e, t, n) {
  let r = this;
  return i;
  function i(s) {
    if (s === 62) {
      let a = r.containerState;
      return (
        a.open || (e.enter('blockQuote', { _container: !0 }), (a.open = !0)),
        e.enter('blockQuotePrefix'),
        e.enter('blockQuoteMarker'),
        e.consume(s),
        e.exit('blockQuoteMarker'),
        o
      );
    }
    return n(s);
  }
  function o(s) {
    return ie(s)
      ? (e.enter('blockQuotePrefixWhitespace'),
        e.consume(s),
        e.exit('blockQuotePrefixWhitespace'),
        e.exit('blockQuotePrefix'),
        t)
      : (e.exit('blockQuotePrefix'), t(s));
  }
}
function TC(e, t, n) {
  let r = this;
  return i;
  function i(s) {
    return ie(s)
      ? ae(
          e,
          o,
          'linePrefix',
          r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
        )(s)
      : o(s);
  }
  function o(s) {
    return e.attempt(Ts, t, n)(s);
  }
}
function DC(e) {
  e.exit('blockQuote');
}
var Ts,
  Cb = H(() => {
    Je();
    ke();
    Ts = { continuation: { tokenize: TC }, exit: DC, name: 'blockQuote', tokenize: CC };
  });
function EC(e, t, n) {
  return r;
  function r(o) {
    return (
      e.enter('characterEscape'),
      e.enter('escapeMarker'),
      e.consume(o),
      e.exit('escapeMarker'),
      i
    );
  }
  function i(o) {
    return pb(o)
      ? (e.enter('characterEscapeValue'),
        e.consume(o),
        e.exit('characterEscapeValue'),
        e.exit('characterEscape'),
        t)
      : n(o);
  }
}
var Ds,
  Tb = H(() => {
    ke();
    Ds = { name: 'characterEscape', tokenize: EC };
  });
function RC(e, t, n) {
  let r = this,
    i = 0,
    o,
    s;
  return a;
  function a(p) {
    return (
      e.enter('characterReference'),
      e.enter('characterReferenceMarker'),
      e.consume(p),
      e.exit('characterReferenceMarker'),
      u
    );
  }
  function u(p) {
    return p === 35
      ? (e.enter('characterReferenceMarkerNumeric'),
        e.consume(p),
        e.exit('characterReferenceMarkerNumeric'),
        c)
      : (e.enter('characterReferenceValue'), (o = 31), (s = pt), f(p));
  }
  function c(p) {
    return p === 88 || p === 120
      ? (e.enter('characterReferenceMarkerHexadecimal'),
        e.consume(p),
        e.exit('characterReferenceMarkerHexadecimal'),
        e.enter('characterReferenceValue'),
        (o = 6),
        (s = db),
        f)
      : (e.enter('characterReferenceValue'), (o = 7), (s = wi), f(p));
  }
  function f(p) {
    if (p === 59 && i) {
      let m = e.exit('characterReferenceValue');
      return s === pt && !Br(r.sliceSerialize(m))
        ? n(p)
        : (e.enter('characterReferenceMarker'),
          e.consume(p),
          e.exit('characterReferenceMarker'),
          e.exit('characterReference'),
          t);
    }
    return s(p) && i++ < o ? (e.consume(p), f) : n(p);
  }
}
var Es,
  Db = H(() => {
    ws();
    ke();
    Es = { name: 'characterReference', tokenize: RC };
  });
function AC(e, t, n) {
  let r = this,
    i = { partial: !0, tokenize: V },
    o = 0,
    s = 0,
    a;
  return u;
  function u(P) {
    return c(P);
  }
  function c(P) {
    let Z = r.events[r.events.length - 1];
    return (
      (o = Z && Z[1].type === 'linePrefix' ? Z[2].sliceSerialize(Z[1], !0).length : 0),
      (a = P),
      e.enter('codeFenced'),
      e.enter('codeFencedFence'),
      e.enter('codeFencedFenceSequence'),
      f(P)
    );
  }
  function f(P) {
    return P === a
      ? (s++, e.consume(P), f)
      : s < 3
        ? n(P)
        : (e.exit('codeFencedFenceSequence'), ie(P) ? ae(e, p, 'whitespace')(P) : p(P));
  }
  function p(P) {
    return P === null || W(P)
      ? (e.exit('codeFencedFence'), r.interrupt ? t(P) : e.check(Eb, I, N)(P))
      : (e.enter('codeFencedFenceInfo'), e.enter('chunkString', { contentType: 'string' }), m(P));
  }
  function m(P) {
    return P === null || W(P)
      ? (e.exit('chunkString'), e.exit('codeFencedFenceInfo'), p(P))
      : ie(P)
        ? (e.exit('chunkString'), e.exit('codeFencedFenceInfo'), ae(e, h, 'whitespace')(P))
        : P === 96 && P === a
          ? n(P)
          : (e.consume(P), m);
  }
  function h(P) {
    return P === null || W(P)
      ? p(P)
      : (e.enter('codeFencedFenceMeta'), e.enter('chunkString', { contentType: 'string' }), A(P));
  }
  function A(P) {
    return P === null || W(P)
      ? (e.exit('chunkString'), e.exit('codeFencedFenceMeta'), p(P))
      : P === 96 && P === a
        ? n(P)
        : (e.consume(P), A);
  }
  function I(P) {
    return e.attempt(i, N, L)(P);
  }
  function L(P) {
    return (e.enter('lineEnding'), e.consume(P), e.exit('lineEnding'), q);
  }
  function q(P) {
    return o > 0 && ie(P) ? ae(e, S, 'linePrefix', o + 1)(P) : S(P);
  }
  function S(P) {
    return P === null || W(P) ? e.check(Eb, I, N)(P) : (e.enter('codeFlowValue'), w(P));
  }
  function w(P) {
    return P === null || W(P) ? (e.exit('codeFlowValue'), S(P)) : (e.consume(P), w);
  }
  function N(P) {
    return (e.exit('codeFenced'), t(P));
  }
  function V(P, Z, ye) {
    let fe = 0;
    return ge;
    function ge(te) {
      return (P.enter('lineEnding'), P.consume(te), P.exit('lineEnding'), Fe);
    }
    function Fe(te) {
      return (
        P.enter('codeFencedFence'),
        ie(te)
          ? ae(
              P,
              ue,
              'linePrefix',
              r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
            )(te)
          : ue(te)
      );
    }
    function ue(te) {
      return te === a ? (P.enter('codeFencedFenceSequence'), $(te)) : ye(te);
    }
    function $(te) {
      return te === a
        ? (fe++, P.consume(te), $)
        : fe >= s
          ? (P.exit('codeFencedFenceSequence'), ie(te) ? ae(P, ee, 'whitespace')(te) : ee(te))
          : ye(te);
    }
    function ee(te) {
      return te === null || W(te) ? (P.exit('codeFencedFence'), Z(te)) : ye(te);
    }
  }
}
function qC(e, t, n) {
  let r = this;
  return i;
  function i(s) {
    return s === null ? n(s) : (e.enter('lineEnding'), e.consume(s), e.exit('lineEnding'), o);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
var Eb,
  Rs,
  Rb = H(() => {
    Je();
    ke();
    ((Eb = { partial: !0, tokenize: qC }),
      (Rs = { concrete: !0, name: 'codeFenced', tokenize: AC }));
  });
function OC(e, t, n) {
  let r = this;
  return i;
  function i(c) {
    return (e.enter('codeIndented'), ae(e, o, 'linePrefix', 5)(c));
  }
  function o(c) {
    let f = r.events[r.events.length - 1];
    return f && f[1].type === 'linePrefix' && f[2].sliceSerialize(f[1], !0).length >= 4
      ? s(c)
      : n(c);
  }
  function s(c) {
    return c === null ? u(c) : W(c) ? e.attempt(PC, s, u)(c) : (e.enter('codeFlowValue'), a(c));
  }
  function a(c) {
    return c === null || W(c) ? (e.exit('codeFlowValue'), s(c)) : (e.consume(c), a);
  }
  function u(c) {
    return (e.exit('codeIndented'), t(c));
  }
}
function IC(e, t, n) {
  let r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line]
      ? n(s)
      : W(s)
        ? (e.enter('lineEnding'), e.consume(s), e.exit('lineEnding'), i)
        : ae(e, o, 'linePrefix', 5)(s);
  }
  function o(s) {
    let a = r.events[r.events.length - 1];
    return a && a[1].type === 'linePrefix' && a[2].sliceSerialize(a[1], !0).length >= 4
      ? t(s)
      : W(s)
        ? i(s)
        : n(s);
  }
}
var _i,
  PC,
  Ab = H(() => {
    Je();
    ke();
    ((_i = { name: 'codeIndented', tokenize: OC }), (PC = { partial: !0, tokenize: IC }));
  });
function FC(e) {
  let t = e.length - 4,
    n = 3,
    r,
    i;
  if (
    (e[n][1].type === 'lineEnding' || e[n][1].type === 'space') &&
    (e[t][1].type === 'lineEnding' || e[t][1].type === 'space')
  ) {
    for (r = n; ++r < t; )
      if (e[r][1].type === 'codeTextData') {
        ((e[n][1].type = 'codeTextPadding'),
          (e[t][1].type = 'codeTextPadding'),
          (n += 2),
          (t -= 2));
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0
      ? r !== t && e[r][1].type !== 'lineEnding' && (i = r)
      : (r === t || e[r][1].type === 'lineEnding') &&
        ((e[i][1].type = 'codeTextData'),
        r !== i + 2 &&
          ((e[i][1].end = e[r - 1][1].end),
          e.splice(i + 2, r - i - 2),
          (t -= r - i - 2),
          (r = i + 2)),
        (i = void 0));
  return e;
}
function NC(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === 'characterEscape';
}
function LC(e, t, n) {
  let r = this,
    i = 0,
    o,
    s;
  return a;
  function a(m) {
    return (e.enter('codeText'), e.enter('codeTextSequence'), u(m));
  }
  function u(m) {
    return m === 96 ? (e.consume(m), i++, u) : (e.exit('codeTextSequence'), c(m));
  }
  function c(m) {
    return m === null
      ? n(m)
      : m === 32
        ? (e.enter('space'), e.consume(m), e.exit('space'), c)
        : m === 96
          ? ((s = e.enter('codeTextSequence')), (o = 0), p(m))
          : W(m)
            ? (e.enter('lineEnding'), e.consume(m), e.exit('lineEnding'), c)
            : (e.enter('codeTextData'), f(m));
  }
  function f(m) {
    return m === null || m === 32 || m === 96 || W(m)
      ? (e.exit('codeTextData'), c(m))
      : (e.consume(m), f);
  }
  function p(m) {
    return m === 96
      ? (e.consume(m), o++, p)
      : o === i
        ? (e.exit('codeTextSequence'), e.exit('codeText'), t(m))
        : ((s.type = 'codeTextData'), f(m));
  }
}
var Ec,
  qb = H(() => {
    ke();
    Ec = { name: 'codeText', previous: NC, resolve: FC, tokenize: LC };
  });
function Si(e, t) {
  let n = 0;
  if (t.length < 1e4) e.push(...t);
  else for (; n < t.length; ) (e.push(...t.slice(n, n + 1e4)), (n += 1e4));
}
var As,
  Pb = H(() => {
    As = class {
      constructor(t) {
        ((this.left = t ? [...t] : []), (this.right = []));
      }
      get(t) {
        if (t < 0 || t >= this.left.length + this.right.length)
          throw new RangeError(
            'Cannot access index `' +
              t +
              '` in a splice buffer of size `' +
              (this.left.length + this.right.length) +
              '`'
          );
        return t < this.left.length
          ? this.left[t]
          : this.right[this.right.length - t + this.left.length - 1];
      }
      get length() {
        return this.left.length + this.right.length;
      }
      shift() {
        return (this.setCursor(0), this.right.pop());
      }
      slice(t, n) {
        let r = n ?? Number.POSITIVE_INFINITY;
        return r < this.left.length
          ? this.left.slice(t, r)
          : t > this.left.length
            ? this.right
                .slice(
                  this.right.length - r + this.left.length,
                  this.right.length - t + this.left.length
                )
                .reverse()
            : this.left
                .slice(t)
                .concat(this.right.slice(this.right.length - r + this.left.length).reverse());
      }
      splice(t, n, r) {
        let i = n || 0;
        this.setCursor(Math.trunc(t));
        let o = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
        return (r && Si(this.left, r), o.reverse());
      }
      pop() {
        return (this.setCursor(Number.POSITIVE_INFINITY), this.left.pop());
      }
      push(t) {
        (this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t));
      }
      pushMany(t) {
        (this.setCursor(Number.POSITIVE_INFINITY), Si(this.left, t));
      }
      unshift(t) {
        (this.setCursor(0), this.right.push(t));
      }
      unshiftMany(t) {
        (this.setCursor(0), Si(this.right, t.reverse()));
      }
      setCursor(t) {
        if (
          !(
            t === this.left.length ||
            (t > this.left.length && this.right.length === 0) ||
            (t < 0 && this.left.length === 0)
          )
        )
          if (t < this.left.length) {
            let n = this.left.splice(t, Number.POSITIVE_INFINITY);
            Si(this.right, n.reverse());
          } else {
            let n = this.right.splice(
              this.left.length + this.right.length - t,
              Number.POSITIVE_INFINITY
            );
            Si(this.left, n.reverse());
          }
      }
    };
  });
function qs(e) {
  let t = {},
    n = -1,
    r,
    i,
    o,
    s,
    a,
    u,
    c,
    f = new As(e);
  for (; ++n < f.length; ) {
    for (; n in t; ) n = t[n];
    if (
      ((r = f.get(n)),
      n &&
        r[1].type === 'chunkFlow' &&
        f.get(n - 1)[1].type === 'listItemPrefix' &&
        ((u = r[1]._tokenizer.events),
        (o = 0),
        o < u.length && u[o][1].type === 'lineEndingBlank' && (o += 2),
        o < u.length && u[o][1].type === 'content'))
    )
      for (; ++o < u.length && u[o][1].type !== 'content'; )
        u[o][1].type === 'chunkText' && ((u[o][1]._isInFirstContentOfListItem = !0), o++);
    if (r[0] === 'enter') r[1].contentType && (Object.assign(t, MC(f, n)), (n = t[n]), (c = !0));
    else if (r[1]._container) {
      for (o = n, i = void 0; o--; )
        if (((s = f.get(o)), s[1].type === 'lineEnding' || s[1].type === 'lineEndingBlank'))
          s[0] === 'enter' &&
            (i && (f.get(i)[1].type = 'lineEndingBlank'), (s[1].type = 'lineEnding'), (i = o));
        else if (!(s[1].type === 'linePrefix' || s[1].type === 'listItemIndent')) break;
      i &&
        ((r[1].end = { ...f.get(i)[1].start }),
        (a = f.slice(i, n)),
        a.unshift(r),
        f.splice(i, n - i + 1, a));
    }
  }
  return (nt(e, 0, Number.POSITIVE_INFINITY, f.slice(0)), !c);
}
function MC(e, t) {
  let n = e.get(t)[1],
    r = e.get(t)[2],
    i = t - 1,
    o = [],
    s = n._tokenizer;
  s ||
    ((s = r.parser[n.contentType](n.start)),
    n._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  let a = s.events,
    u = [],
    c = {},
    f,
    p,
    m = -1,
    h = n,
    A = 0,
    I = 0,
    L = [I];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; );
    (o.push(i),
      h._tokenizer ||
        ((f = r.sliceStream(h)),
        h.next || f.push(null),
        p && s.defineSkip(h.start),
        h._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0),
        s.write(f),
        h._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)),
      (p = h),
      (h = h.next));
  }
  for (h = n; ++m < a.length; )
    a[m][0] === 'exit' &&
      a[m - 1][0] === 'enter' &&
      a[m][1].type === a[m - 1][1].type &&
      a[m][1].start.line !== a[m][1].end.line &&
      ((I = m + 1), L.push(I), (h._tokenizer = void 0), (h.previous = void 0), (h = h.next));
  for (
    s.events = [], h ? ((h._tokenizer = void 0), (h.previous = void 0)) : L.pop(), m = L.length;
    m--;
  ) {
    let q = a.slice(L[m], L[m + 1]),
      S = o.pop();
    (u.push([S, S + q.length - 1]), e.splice(S, 2, q));
  }
  for (u.reverse(), m = -1; ++m < u.length; )
    ((c[A + u[m][0]] = A + u[m][1]), (A += u[m][1] - u[m][0] - 1));
  return c;
}
var Rc = H(() => {
  Dn();
  Pb();
});
function BC(e) {
  return (qs(e), e);
}
function HC(e, t) {
  let n;
  return r;
  function r(a) {
    return (e.enter('content'), (n = e.enter('chunkContent', { contentType: 'content' })), i(a));
  }
  function i(a) {
    return a === null ? o(a) : W(a) ? e.check(jC, s, o)(a) : (e.consume(a), i);
  }
  function o(a) {
    return (e.exit('chunkContent'), e.exit('content'), t(a));
  }
  function s(a) {
    return (
      e.consume(a),
      e.exit('chunkContent'),
      (n.next = e.enter('chunkContent', { contentType: 'content', previous: n })),
      (n = n.next),
      i
    );
  }
}
function zC(e, t, n) {
  let r = this;
  return i;
  function i(s) {
    return (
      e.exit('chunkContent'),
      e.enter('lineEnding'),
      e.consume(s),
      e.exit('lineEnding'),
      ae(e, o, 'linePrefix')
    );
  }
  function o(s) {
    if (s === null || W(s)) return n(s);
    let a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes('codeIndented') &&
      a &&
      a[1].type === 'linePrefix' &&
      a[2].sliceSerialize(a[1], !0).length >= 4
      ? t(s)
      : e.interrupt(r.parser.constructs.flow, n, t)(s);
  }
}
var Ac,
  jC,
  Ob = H(() => {
    Je();
    ke();
    Rc();
    ((Ac = { resolve: BC, tokenize: HC }), (jC = { partial: !0, tokenize: zC }));
  });
function Ps(e, t, n, r, i, o, s, a, u) {
  let c = u || Number.POSITIVE_INFINITY,
    f = 0;
  return p;
  function p(q) {
    return q === 60
      ? (e.enter(r), e.enter(i), e.enter(o), e.consume(q), e.exit(o), m)
      : q === null || q === 32 || q === 41 || xi(q)
        ? n(q)
        : (e.enter(r),
          e.enter(s),
          e.enter(a),
          e.enter('chunkString', { contentType: 'string' }),
          I(q));
  }
  function m(q) {
    return q === 62
      ? (e.enter(o), e.consume(q), e.exit(o), e.exit(i), e.exit(r), t)
      : (e.enter(a), e.enter('chunkString', { contentType: 'string' }), h(q));
  }
  function h(q) {
    return q === 62
      ? (e.exit('chunkString'), e.exit(a), m(q))
      : q === null || q === 60 || W(q)
        ? n(q)
        : (e.consume(q), q === 92 ? A : h);
  }
  function A(q) {
    return q === 60 || q === 62 || q === 92 ? (e.consume(q), h) : h(q);
  }
  function I(q) {
    return !f && (q === null || q === 41 || Le(q))
      ? (e.exit('chunkString'), e.exit(a), e.exit(s), e.exit(r), t(q))
      : f < c && q === 40
        ? (e.consume(q), f++, I)
        : q === 41
          ? (e.consume(q), f--, I)
          : q === null || q === 32 || q === 40 || xi(q)
            ? n(q)
            : (e.consume(q), q === 92 ? L : I);
  }
  function L(q) {
    return q === 40 || q === 41 || q === 92 ? (e.consume(q), I) : I(q);
  }
}
var qc = H(() => {
  ke();
});
function Os(e, t, n, r, i, o) {
  let s = this,
    a = 0,
    u;
  return c;
  function c(h) {
    return (e.enter(r), e.enter(i), e.consume(h), e.exit(i), e.enter(o), f);
  }
  function f(h) {
    return a > 999 ||
      h === null ||
      h === 91 ||
      (h === 93 && !u) ||
      (h === 94 && !a && '_hiddenFootnoteSupport' in s.parser.constructs)
      ? n(h)
      : h === 93
        ? (e.exit(o), e.enter(i), e.consume(h), e.exit(i), e.exit(r), t)
        : W(h)
          ? (e.enter('lineEnding'), e.consume(h), e.exit('lineEnding'), f)
          : (e.enter('chunkString', { contentType: 'string' }), p(h));
  }
  function p(h) {
    return h === null || h === 91 || h === 93 || W(h) || a++ > 999
      ? (e.exit('chunkString'), f(h))
      : (e.consume(h), u || (u = !ie(h)), h === 92 ? m : p);
  }
  function m(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), a++, p) : p(h);
  }
}
var Pc = H(() => {
  ke();
});
function Is(e, t, n, r, i, o) {
  let s;
  return a;
  function a(m) {
    return m === 34 || m === 39 || m === 40
      ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), (s = m === 40 ? 41 : m), u)
      : n(m);
  }
  function u(m) {
    return m === s ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), t) : (e.enter(o), c(m));
  }
  function c(m) {
    return m === s
      ? (e.exit(o), u(s))
      : m === null
        ? n(m)
        : W(m)
          ? (e.enter('lineEnding'), e.consume(m), e.exit('lineEnding'), ae(e, c, 'linePrefix'))
          : (e.enter('chunkString', { contentType: 'string' }), f(m));
  }
  function f(m) {
    return m === s || m === null || W(m)
      ? (e.exit('chunkString'), c(m))
      : (e.consume(m), m === 92 ? p : f);
  }
  function p(m) {
    return m === s || m === 92 ? (e.consume(m), f) : f(m);
  }
}
var Oc = H(() => {
  Je();
  ke();
});
function Zn(e, t) {
  let n;
  return r;
  function r(i) {
    return W(i)
      ? (e.enter('lineEnding'), e.consume(i), e.exit('lineEnding'), (n = !0), r)
      : ie(i)
        ? ae(e, r, n ? 'linePrefix' : 'lineSuffix')(i)
        : t(i);
  }
}
var Ic = H(() => {
  Je();
  ke();
});
function WC(e, t, n) {
  let r = this,
    i;
  return o;
  function o(h) {
    return (e.enter('definition'), s(h));
  }
  function s(h) {
    return Os.call(
      r,
      e,
      a,
      n,
      'definitionLabel',
      'definitionLabelMarker',
      'definitionLabelString'
    )(h);
  }
  function a(h) {
    return (
      (i = an(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))),
      h === 58 ? (e.enter('definitionMarker'), e.consume(h), e.exit('definitionMarker'), u) : n(h)
    );
  }
  function u(h) {
    return Le(h) ? Zn(e, c)(h) : c(h);
  }
  function c(h) {
    return Ps(
      e,
      f,
      n,
      'definitionDestination',
      'definitionDestinationLiteral',
      'definitionDestinationLiteralMarker',
      'definitionDestinationRaw',
      'definitionDestinationString'
    )(h);
  }
  function f(h) {
    return e.attempt(UC, p, p)(h);
  }
  function p(h) {
    return ie(h) ? ae(e, m, 'whitespace')(h) : m(h);
  }
  function m(h) {
    return h === null || W(h) ? (e.exit('definition'), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function VC(e, t, n) {
  return r;
  function r(a) {
    return Le(a) ? Zn(e, i)(a) : n(a);
  }
  function i(a) {
    return Is(e, o, n, 'definitionTitle', 'definitionTitleMarker', 'definitionTitleString')(a);
  }
  function o(a) {
    return ie(a) ? ae(e, s, 'whitespace')(a) : s(a);
  }
  function s(a) {
    return a === null || W(a) ? t(a) : n(a);
  }
}
var Fc,
  UC,
  Ib = H(() => {
    qc();
    Pc();
    Je();
    Oc();
    Ic();
    ke();
    _s();
    ((Fc = { name: 'definition', tokenize: WC }), (UC = { partial: !0, tokenize: VC }));
  });
function $C(e, t, n) {
  return r;
  function r(o) {
    return (e.enter('hardBreakEscape'), e.consume(o), i);
  }
  function i(o) {
    return W(o) ? (e.exit('hardBreakEscape'), t(o)) : n(o);
  }
}
var Nc,
  Fb = H(() => {
    ke();
    Nc = { name: 'hardBreakEscape', tokenize: $C };
  });
function YC(e, t) {
  let n = e.length - 2,
    r = 3,
    i,
    o;
  return (
    e[r][1].type === 'whitespace' && (r += 2),
    n - 2 > r && e[n][1].type === 'whitespace' && (n -= 2),
    e[n][1].type === 'atxHeadingSequence' &&
      (r === n - 1 || (n - 4 > r && e[n - 2][1].type === 'whitespace')) &&
      (n -= r + 1 === n ? 2 : 4),
    n > r &&
      ((i = { type: 'atxHeadingText', start: e[r][1].start, end: e[n][1].end }),
      (o = { type: 'chunkText', start: e[r][1].start, end: e[n][1].end, contentType: 'text' }),
      nt(e, r, n - r + 1, [
        ['enter', i, t],
        ['enter', o, t],
        ['exit', o, t],
        ['exit', i, t],
      ])),
    e
  );
}
function GC(e, t, n) {
  let r = 0;
  return i;
  function i(f) {
    return (e.enter('atxHeading'), o(f));
  }
  function o(f) {
    return (e.enter('atxHeadingSequence'), s(f));
  }
  function s(f) {
    return f === 35 && r++ < 6
      ? (e.consume(f), s)
      : f === null || Le(f)
        ? (e.exit('atxHeadingSequence'), a(f))
        : n(f);
  }
  function a(f) {
    return f === 35
      ? (e.enter('atxHeadingSequence'), u(f))
      : f === null || W(f)
        ? (e.exit('atxHeading'), t(f))
        : ie(f)
          ? ae(e, a, 'whitespace')(f)
          : (e.enter('atxHeadingText'), c(f));
  }
  function u(f) {
    return f === 35 ? (e.consume(f), u) : (e.exit('atxHeadingSequence'), a(f));
  }
  function c(f) {
    return f === null || f === 35 || Le(f) ? (e.exit('atxHeadingText'), a(f)) : (e.consume(f), c);
  }
}
var Lc,
  Nb = H(() => {
    Je();
    ke();
    Dn();
    Lc = { name: 'headingAtx', resolve: YC, tokenize: GC };
  });
var Lb,
  Mc,
  Mb = H(() => {
    ((Lb = [
      'address',
      'article',
      'aside',
      'base',
      'basefont',
      'blockquote',
      'body',
      'caption',
      'center',
      'col',
      'colgroup',
      'dd',
      'details',
      'dialog',
      'dir',
      'div',
      'dl',
      'dt',
      'fieldset',
      'figcaption',
      'figure',
      'footer',
      'form',
      'frame',
      'frameset',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'head',
      'header',
      'hr',
      'html',
      'iframe',
      'legend',
      'li',
      'link',
      'main',
      'menu',
      'menuitem',
      'nav',
      'noframes',
      'ol',
      'optgroup',
      'option',
      'p',
      'param',
      'search',
      'section',
      'summary',
      'table',
      'tbody',
      'td',
      'tfoot',
      'th',
      'thead',
      'title',
      'tr',
      'track',
      'ul',
    ]),
      (Mc = ['pre', 'script', 'style', 'textarea']));
  });
function JC(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === 'enter' && e[t][1].type === 'htmlFlow'); );
  return (
    t > 1 &&
      e[t - 2][1].type === 'linePrefix' &&
      ((e[t][1].start = e[t - 2][1].start),
      (e[t + 1][1].start = e[t - 2][1].start),
      e.splice(t - 2, 2)),
    e
  );
}
function ZC(e, t, n) {
  let r = this,
    i,
    o,
    s,
    a,
    u;
  return c;
  function c(k) {
    return f(k);
  }
  function f(k) {
    return (e.enter('htmlFlow'), e.enter('htmlFlowData'), e.consume(k), p);
  }
  function p(k) {
    return k === 33
      ? (e.consume(k), m)
      : k === 47
        ? (e.consume(k), (o = !0), I)
        : k === 63
          ? (e.consume(k), (i = 3), r.interrupt ? t : v)
          : Et(k)
            ? (e.consume(k), (s = String.fromCharCode(k)), L)
            : n(k);
  }
  function m(k) {
    return k === 45
      ? (e.consume(k), (i = 2), h)
      : k === 91
        ? (e.consume(k), (i = 5), (a = 0), A)
        : Et(k)
          ? (e.consume(k), (i = 4), r.interrupt ? t : v)
          : n(k);
  }
  function h(k) {
    return k === 45 ? (e.consume(k), r.interrupt ? t : v) : n(k);
  }
  function A(k) {
    let Ue = 'CDATA[';
    return k === Ue.charCodeAt(a++)
      ? (e.consume(k), a === Ue.length ? (r.interrupt ? t : ue) : A)
      : n(k);
  }
  function I(k) {
    return Et(k) ? (e.consume(k), (s = String.fromCharCode(k)), L) : n(k);
  }
  function L(k) {
    if (k === null || k === 47 || k === 62 || Le(k)) {
      let Ue = k === 47,
        St = s.toLowerCase();
      return !Ue && !o && Mc.includes(St)
        ? ((i = 1), r.interrupt ? t(k) : ue(k))
        : Lb.includes(s.toLowerCase())
          ? ((i = 6), Ue ? (e.consume(k), q) : r.interrupt ? t(k) : ue(k))
          : ((i = 7), r.interrupt && !r.parser.lazy[r.now().line] ? n(k) : o ? S(k) : w(k));
    }
    return k === 45 || pt(k) ? (e.consume(k), (s += String.fromCharCode(k)), L) : n(k);
  }
  function q(k) {
    return k === 62 ? (e.consume(k), r.interrupt ? t : ue) : n(k);
  }
  function S(k) {
    return ie(k) ? (e.consume(k), S) : ge(k);
  }
  function w(k) {
    return k === 47
      ? (e.consume(k), ge)
      : k === 58 || k === 95 || Et(k)
        ? (e.consume(k), N)
        : ie(k)
          ? (e.consume(k), w)
          : ge(k);
  }
  function N(k) {
    return k === 45 || k === 46 || k === 58 || k === 95 || pt(k) ? (e.consume(k), N) : V(k);
  }
  function V(k) {
    return k === 61 ? (e.consume(k), P) : ie(k) ? (e.consume(k), V) : w(k);
  }
  function P(k) {
    return k === null || k === 60 || k === 61 || k === 62 || k === 96
      ? n(k)
      : k === 34 || k === 39
        ? (e.consume(k), (u = k), Z)
        : ie(k)
          ? (e.consume(k), P)
          : ye(k);
  }
  function Z(k) {
    return k === u ? (e.consume(k), (u = null), fe) : k === null || W(k) ? n(k) : (e.consume(k), Z);
  }
  function ye(k) {
    return k === null ||
      k === 34 ||
      k === 39 ||
      k === 47 ||
      k === 60 ||
      k === 61 ||
      k === 62 ||
      k === 96 ||
      Le(k)
      ? V(k)
      : (e.consume(k), ye);
  }
  function fe(k) {
    return k === 47 || k === 62 || ie(k) ? w(k) : n(k);
  }
  function ge(k) {
    return k === 62 ? (e.consume(k), Fe) : n(k);
  }
  function Fe(k) {
    return k === null || W(k) ? ue(k) : ie(k) ? (e.consume(k), Fe) : n(k);
  }
  function ue(k) {
    return k === 45 && i === 2
      ? (e.consume(k), _e)
      : k === 60 && i === 1
        ? (e.consume(k), De)
        : k === 62 && i === 4
          ? (e.consume(k), ze)
          : k === 63 && i === 3
            ? (e.consume(k), v)
            : k === 93 && i === 5
              ? (e.consume(k), $e)
              : W(k) && (i === 6 || i === 7)
                ? (e.exit('htmlFlowData'), e.check(KC, et, $)(k))
                : k === null || W(k)
                  ? (e.exit('htmlFlowData'), $(k))
                  : (e.consume(k), ue);
  }
  function $(k) {
    return e.check(QC, ee, et)(k);
  }
  function ee(k) {
    return (e.enter('lineEnding'), e.consume(k), e.exit('lineEnding'), te);
  }
  function te(k) {
    return k === null || W(k) ? $(k) : (e.enter('htmlFlowData'), ue(k));
  }
  function _e(k) {
    return k === 45 ? (e.consume(k), v) : ue(k);
  }
  function De(k) {
    return k === 47 ? (e.consume(k), (s = ''), Xe) : ue(k);
  }
  function Xe(k) {
    if (k === 62) {
      let Ue = s.toLowerCase();
      return Mc.includes(Ue) ? (e.consume(k), ze) : ue(k);
    }
    return Et(k) && s.length < 8 ? (e.consume(k), (s += String.fromCharCode(k)), Xe) : ue(k);
  }
  function $e(k) {
    return k === 93 ? (e.consume(k), v) : ue(k);
  }
  function v(k) {
    return k === 62 ? (e.consume(k), ze) : k === 45 && i === 2 ? (e.consume(k), v) : ue(k);
  }
  function ze(k) {
    return k === null || W(k) ? (e.exit('htmlFlowData'), et(k)) : (e.consume(k), ze);
  }
  function et(k) {
    return (e.exit('htmlFlow'), t(k));
  }
}
function XC(e, t, n) {
  let r = this;
  return i;
  function i(s) {
    return W(s) ? (e.enter('lineEnding'), e.consume(s), e.exit('lineEnding'), o) : n(s);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
function eT(e, t, n) {
  return r;
  function r(i) {
    return (e.enter('lineEnding'), e.consume(i), e.exit('lineEnding'), e.attempt(Rn, t, n));
  }
}
var jc,
  KC,
  QC,
  jb = H(() => {
    ke();
    Mb();
    Cs();
    ((jc = { concrete: !0, name: 'htmlFlow', resolveTo: JC, tokenize: ZC }),
      (KC = { partial: !0, tokenize: eT }),
      (QC = { partial: !0, tokenize: XC }));
  });
function tT(e, t, n) {
  let r = this,
    i,
    o,
    s;
  return a;
  function a(v) {
    return (e.enter('htmlText'), e.enter('htmlTextData'), e.consume(v), u);
  }
  function u(v) {
    return v === 33
      ? (e.consume(v), c)
      : v === 47
        ? (e.consume(v), V)
        : v === 63
          ? (e.consume(v), w)
          : Et(v)
            ? (e.consume(v), ye)
            : n(v);
  }
  function c(v) {
    return v === 45
      ? (e.consume(v), f)
      : v === 91
        ? (e.consume(v), (o = 0), A)
        : Et(v)
          ? (e.consume(v), S)
          : n(v);
  }
  function f(v) {
    return v === 45 ? (e.consume(v), h) : n(v);
  }
  function p(v) {
    return v === null
      ? n(v)
      : v === 45
        ? (e.consume(v), m)
        : W(v)
          ? ((s = p), De(v))
          : (e.consume(v), p);
  }
  function m(v) {
    return v === 45 ? (e.consume(v), h) : p(v);
  }
  function h(v) {
    return v === 62 ? _e(v) : v === 45 ? m(v) : p(v);
  }
  function A(v) {
    let ze = 'CDATA[';
    return v === ze.charCodeAt(o++) ? (e.consume(v), o === ze.length ? I : A) : n(v);
  }
  function I(v) {
    return v === null
      ? n(v)
      : v === 93
        ? (e.consume(v), L)
        : W(v)
          ? ((s = I), De(v))
          : (e.consume(v), I);
  }
  function L(v) {
    return v === 93 ? (e.consume(v), q) : I(v);
  }
  function q(v) {
    return v === 62 ? _e(v) : v === 93 ? (e.consume(v), q) : I(v);
  }
  function S(v) {
    return v === null || v === 62 ? _e(v) : W(v) ? ((s = S), De(v)) : (e.consume(v), S);
  }
  function w(v) {
    return v === null
      ? n(v)
      : v === 63
        ? (e.consume(v), N)
        : W(v)
          ? ((s = w), De(v))
          : (e.consume(v), w);
  }
  function N(v) {
    return v === 62 ? _e(v) : w(v);
  }
  function V(v) {
    return Et(v) ? (e.consume(v), P) : n(v);
  }
  function P(v) {
    return v === 45 || pt(v) ? (e.consume(v), P) : Z(v);
  }
  function Z(v) {
    return W(v) ? ((s = Z), De(v)) : ie(v) ? (e.consume(v), Z) : _e(v);
  }
  function ye(v) {
    return v === 45 || pt(v) ? (e.consume(v), ye) : v === 47 || v === 62 || Le(v) ? fe(v) : n(v);
  }
  function fe(v) {
    return v === 47
      ? (e.consume(v), _e)
      : v === 58 || v === 95 || Et(v)
        ? (e.consume(v), ge)
        : W(v)
          ? ((s = fe), De(v))
          : ie(v)
            ? (e.consume(v), fe)
            : _e(v);
  }
  function ge(v) {
    return v === 45 || v === 46 || v === 58 || v === 95 || pt(v) ? (e.consume(v), ge) : Fe(v);
  }
  function Fe(v) {
    return v === 61
      ? (e.consume(v), ue)
      : W(v)
        ? ((s = Fe), De(v))
        : ie(v)
          ? (e.consume(v), Fe)
          : fe(v);
  }
  function ue(v) {
    return v === null || v === 60 || v === 61 || v === 62 || v === 96
      ? n(v)
      : v === 34 || v === 39
        ? (e.consume(v), (i = v), $)
        : W(v)
          ? ((s = ue), De(v))
          : ie(v)
            ? (e.consume(v), ue)
            : (e.consume(v), ee);
  }
  function $(v) {
    return v === i
      ? (e.consume(v), (i = void 0), te)
      : v === null
        ? n(v)
        : W(v)
          ? ((s = $), De(v))
          : (e.consume(v), $);
  }
  function ee(v) {
    return v === null || v === 34 || v === 39 || v === 60 || v === 61 || v === 96
      ? n(v)
      : v === 47 || v === 62 || Le(v)
        ? fe(v)
        : (e.consume(v), ee);
  }
  function te(v) {
    return v === 47 || v === 62 || Le(v) ? fe(v) : n(v);
  }
  function _e(v) {
    return v === 62 ? (e.consume(v), e.exit('htmlTextData'), e.exit('htmlText'), t) : n(v);
  }
  function De(v) {
    return (e.exit('htmlTextData'), e.enter('lineEnding'), e.consume(v), e.exit('lineEnding'), Xe);
  }
  function Xe(v) {
    return ie(v)
      ? ae(
          e,
          $e,
          'linePrefix',
          r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
        )(v)
      : $e(v);
  }
  function $e(v) {
    return (e.enter('htmlTextData'), s(v));
  }
}
var Bc,
  Bb = H(() => {
    Je();
    ke();
    Bc = { name: 'htmlText', tokenize: tT };
  });
function oT(e) {
  let t = -1,
    n = [];
  for (; ++t < e.length; ) {
    let r = e[t][1];
    if (
      (n.push(e[t]), r.type === 'labelImage' || r.type === 'labelLink' || r.type === 'labelEnd')
    ) {
      let i = r.type === 'labelImage' ? 4 : 2;
      ((r.type = 'data'), (t += i));
    }
  }
  return (e.length !== n.length && nt(e, 0, e.length, n), e);
}
function sT(e, t) {
  let n = e.length,
    r = 0,
    i,
    o,
    s,
    a;
  for (; n--; )
    if (((i = e[n][1]), o)) {
      if (i.type === 'link' || (i.type === 'labelLink' && i._inactive)) break;
      e[n][0] === 'enter' && i.type === 'labelLink' && (i._inactive = !0);
    } else if (s) {
      if (
        e[n][0] === 'enter' &&
        (i.type === 'labelImage' || i.type === 'labelLink') &&
        !i._balanced &&
        ((o = n), i.type !== 'labelLink')
      ) {
        r = 2;
        break;
      }
    } else i.type === 'labelEnd' && (s = n);
  let u = {
      type: e[o][1].type === 'labelLink' ? 'link' : 'image',
      start: { ...e[o][1].start },
      end: { ...e[e.length - 1][1].end },
    },
    c = { type: 'label', start: { ...e[o][1].start }, end: { ...e[s][1].end } },
    f = { type: 'labelText', start: { ...e[o + r + 2][1].end }, end: { ...e[s - 2][1].start } };
  return (
    (a = [
      ['enter', u, t],
      ['enter', c, t],
    ]),
    (a = dt(a, e.slice(o + 1, o + r + 3))),
    (a = dt(a, [['enter', f, t]])),
    (a = dt(a, Hr(t.parser.constructs.insideSpan.null, e.slice(o + r + 4, s - 3), t))),
    (a = dt(a, [['exit', f, t], e[s - 2], e[s - 1], ['exit', c, t]])),
    (a = dt(a, e.slice(s + 1))),
    (a = dt(a, [['exit', u, t]])),
    nt(e, o, e.length, a),
    e
  );
}
function aT(e, t, n) {
  let r = this,
    i = r.events.length,
    o,
    s;
  for (; i--; )
    if (
      (r.events[i][1].type === 'labelImage' || r.events[i][1].type === 'labelLink') &&
      !r.events[i][1]._balanced
    ) {
      o = r.events[i][1];
      break;
    }
  return a;
  function a(m) {
    return o
      ? o._inactive
        ? p(m)
        : ((s = r.parser.defined.includes(an(r.sliceSerialize({ start: o.end, end: r.now() })))),
          e.enter('labelEnd'),
          e.enter('labelMarker'),
          e.consume(m),
          e.exit('labelMarker'),
          e.exit('labelEnd'),
          u)
      : n(m);
  }
  function u(m) {
    return m === 40
      ? e.attempt(nT, f, s ? f : p)(m)
      : m === 91
        ? e.attempt(rT, f, s ? c : p)(m)
        : s
          ? f(m)
          : p(m);
  }
  function c(m) {
    return e.attempt(iT, f, p)(m);
  }
  function f(m) {
    return t(m);
  }
  function p(m) {
    return ((o._balanced = !0), n(m));
  }
}
function uT(e, t, n) {
  return r;
  function r(p) {
    return (
      e.enter('resource'),
      e.enter('resourceMarker'),
      e.consume(p),
      e.exit('resourceMarker'),
      i
    );
  }
  function i(p) {
    return Le(p) ? Zn(e, o)(p) : o(p);
  }
  function o(p) {
    return p === 41
      ? f(p)
      : Ps(
          e,
          s,
          a,
          'resourceDestination',
          'resourceDestinationLiteral',
          'resourceDestinationLiteralMarker',
          'resourceDestinationRaw',
          'resourceDestinationString',
          32
        )(p);
  }
  function s(p) {
    return Le(p) ? Zn(e, u)(p) : f(p);
  }
  function a(p) {
    return n(p);
  }
  function u(p) {
    return p === 34 || p === 39 || p === 40
      ? Is(e, c, n, 'resourceTitle', 'resourceTitleMarker', 'resourceTitleString')(p)
      : f(p);
  }
  function c(p) {
    return Le(p) ? Zn(e, f)(p) : f(p);
  }
  function f(p) {
    return p === 41
      ? (e.enter('resourceMarker'), e.consume(p), e.exit('resourceMarker'), e.exit('resource'), t)
      : n(p);
  }
}
function cT(e, t, n) {
  let r = this;
  return i;
  function i(a) {
    return Os.call(r, e, o, s, 'reference', 'referenceMarker', 'referenceString')(a);
  }
  function o(a) {
    return r.parser.defined.includes(
      an(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))
    )
      ? t(a)
      : n(a);
  }
  function s(a) {
    return n(a);
  }
}
function lT(e, t, n) {
  return r;
  function r(o) {
    return (
      e.enter('reference'),
      e.enter('referenceMarker'),
      e.consume(o),
      e.exit('referenceMarker'),
      i
    );
  }
  function i(o) {
    return o === 93
      ? (e.enter('referenceMarker'),
        e.consume(o),
        e.exit('referenceMarker'),
        e.exit('reference'),
        t)
      : n(o);
  }
}
var Xn,
  nT,
  rT,
  iT,
  Fs = H(() => {
    qc();
    Pc();
    Oc();
    Ic();
    ke();
    Dn();
    _s();
    Ss();
    ((Xn = { name: 'labelEnd', resolveAll: oT, resolveTo: sT, tokenize: aT }),
      (nT = { tokenize: uT }),
      (rT = { tokenize: cT }),
      (iT = { tokenize: lT }));
  });
function fT(e, t, n) {
  let r = this;
  return i;
  function i(a) {
    return (
      e.enter('labelImage'),
      e.enter('labelImageMarker'),
      e.consume(a),
      e.exit('labelImageMarker'),
      o
    );
  }
  function o(a) {
    return a === 91
      ? (e.enter('labelMarker'), e.consume(a), e.exit('labelMarker'), e.exit('labelImage'), s)
      : n(a);
  }
  function s(a) {
    return a === 94 && '_hiddenFootnoteSupport' in r.parser.constructs ? n(a) : t(a);
  }
}
var Hc,
  Hb = H(() => {
    Fs();
    Hc = { name: 'labelStartImage', resolveAll: Xn.resolveAll, tokenize: fT };
  });
function dT(e, t, n) {
  let r = this;
  return i;
  function i(s) {
    return (
      e.enter('labelLink'),
      e.enter('labelMarker'),
      e.consume(s),
      e.exit('labelMarker'),
      e.exit('labelLink'),
      o
    );
  }
  function o(s) {
    return s === 94 && '_hiddenFootnoteSupport' in r.parser.constructs ? n(s) : t(s);
  }
}
var zc,
  zb = H(() => {
    Fs();
    zc = { name: 'labelStartLink', resolveAll: Xn.resolveAll, tokenize: dT };
  });
function pT(e, t) {
  return n;
  function n(r) {
    return (e.enter('lineEnding'), e.consume(r), e.exit('lineEnding'), ae(e, t, 'linePrefix'));
  }
}
var Ci,
  Ub = H(() => {
    Je();
    Ci = { name: 'lineEnding', tokenize: pT };
  });
function hT(e, t, n) {
  let r = 0,
    i;
  return o;
  function o(c) {
    return (e.enter('thematicBreak'), s(c));
  }
  function s(c) {
    return ((i = c), a(c));
  }
  function a(c) {
    return c === i
      ? (e.enter('thematicBreakSequence'), u(c))
      : r >= 3 && (c === null || W(c))
        ? (e.exit('thematicBreak'), t(c))
        : n(c);
  }
  function u(c) {
    return c === i
      ? (e.consume(c), r++, u)
      : (e.exit('thematicBreakSequence'), ie(c) ? ae(e, a, 'whitespace')(c) : a(c));
  }
}
var er,
  Uc = H(() => {
    Je();
    ke();
    er = { name: 'thematicBreak', tokenize: hT };
  });
function yT(e, t, n) {
  let r = this,
    i = r.events[r.events.length - 1],
    o = i && i[1].type === 'linePrefix' ? i[2].sliceSerialize(i[1], !0).length : 0,
    s = 0;
  return a;
  function a(h) {
    let A =
      r.containerState.type || (h === 42 || h === 43 || h === 45 ? 'listUnordered' : 'listOrdered');
    if (A === 'listUnordered' ? !r.containerState.marker || h === r.containerState.marker : wi(h)) {
      if (
        (r.containerState.type || ((r.containerState.type = A), e.enter(A, { _container: !0 })),
        A === 'listUnordered')
      )
        return (e.enter('listItemPrefix'), h === 42 || h === 45 ? e.check(er, n, c)(h) : c(h));
      if (!r.interrupt || h === 49)
        return (e.enter('listItemPrefix'), e.enter('listItemValue'), u(h));
    }
    return n(h);
  }
  function u(h) {
    return wi(h) && ++s < 10
      ? (e.consume(h), u)
      : (!r.interrupt || s < 2) &&
          (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46)
        ? (e.exit('listItemValue'), c(h))
        : n(h);
  }
  function c(h) {
    return (
      e.enter('listItemMarker'),
      e.consume(h),
      e.exit('listItemMarker'),
      (r.containerState.marker = r.containerState.marker || h),
      e.check(Rn, r.interrupt ? n : f, e.attempt(mT, m, p))
    );
  }
  function f(h) {
    return ((r.containerState.initialBlankLine = !0), o++, m(h));
  }
  function p(h) {
    return ie(h)
      ? (e.enter('listItemPrefixWhitespace'), e.consume(h), e.exit('listItemPrefixWhitespace'), m)
      : n(h);
  }
  function m(h) {
    return (
      (r.containerState.size = o + r.sliceSerialize(e.exit('listItemPrefix'), !0).length),
      t(h)
    );
  }
}
function bT(e, t, n) {
  let r = this;
  return ((r.containerState._closeFlow = void 0), e.check(Rn, i, o));
  function i(a) {
    return (
      (r.containerState.furtherBlankLines =
        r.containerState.furtherBlankLines || r.containerState.initialBlankLine),
      ae(e, t, 'listItemIndent', r.containerState.size + 1)(a)
    );
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !ie(a)
      ? ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        s(a))
      : ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        e.attempt(gT, t, s)(a));
  }
  function s(a) {
    return (
      (r.containerState._closeFlow = !0),
      (r.interrupt = void 0),
      ae(
        e,
        e.attempt(ut, t, n),
        'linePrefix',
        r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
      )(a)
    );
  }
}
function vT(e, t, n) {
  let r = this;
  return ae(e, i, 'listItemIndent', r.containerState.size + 1);
  function i(o) {
    let s = r.events[r.events.length - 1];
    return s &&
      s[1].type === 'listItemIndent' &&
      s[2].sliceSerialize(s[1], !0).length === r.containerState.size
      ? t(o)
      : n(o);
  }
}
function xT(e) {
  e.exit(this.containerState.type);
}
function wT(e, t, n) {
  let r = this;
  return ae(
    e,
    i,
    'listItemPrefixWhitespace',
    r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 5
  );
  function i(o) {
    let s = r.events[r.events.length - 1];
    return !ie(o) && s && s[1].type === 'listItemPrefixWhitespace' ? t(o) : n(o);
  }
}
var ut,
  mT,
  gT,
  Wb = H(() => {
    Je();
    ke();
    Cs();
    Uc();
    ((ut = { continuation: { tokenize: bT }, exit: xT, name: 'list', tokenize: yT }),
      (mT = { partial: !0, tokenize: wT }),
      (gT = { partial: !0, tokenize: vT }));
  });
function kT(e, t) {
  let n = e.length,
    r,
    i,
    o;
  for (; n--; )
    if (e[n][0] === 'enter') {
      if (e[n][1].type === 'content') {
        r = n;
        break;
      }
      e[n][1].type === 'paragraph' && (i = n);
    } else
      (e[n][1].type === 'content' && e.splice(n, 1),
        !o && e[n][1].type === 'definition' && (o = n));
  let s = {
    type: 'setextHeading',
    start: { ...e[r][1].start },
    end: { ...e[e.length - 1][1].end },
  };
  return (
    (e[i][1].type = 'setextHeadingText'),
    o
      ? (e.splice(i, 0, ['enter', s, t]),
        e.splice(o + 1, 0, ['exit', e[r][1], t]),
        (e[r][1].end = { ...e[o][1].end }))
      : (e[r][1] = s),
    e.push(['exit', s, t]),
    e
  );
}
function _T(e, t, n) {
  let r = this,
    i;
  return o;
  function o(c) {
    let f = r.events.length,
      p;
    for (; f--; )
      if (
        r.events[f][1].type !== 'lineEnding' &&
        r.events[f][1].type !== 'linePrefix' &&
        r.events[f][1].type !== 'content'
      ) {
        p = r.events[f][1].type === 'paragraph';
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || p)
      ? (e.enter('setextHeadingLine'), (i = c), s(c))
      : n(c);
  }
  function s(c) {
    return (e.enter('setextHeadingLineSequence'), a(c));
  }
  function a(c) {
    return c === i
      ? (e.consume(c), a)
      : (e.exit('setextHeadingLineSequence'), ie(c) ? ae(e, u, 'lineSuffix')(c) : u(c));
  }
  function u(c) {
    return c === null || W(c) ? (e.exit('setextHeadingLine'), t(c)) : n(c);
  }
}
var Ns,
  Vb = H(() => {
    Je();
    ke();
    Ns = { name: 'setextUnderline', resolveTo: kT, tokenize: _T };
  });
var Wc = H(() => {
  _b();
  Sb();
  Cs();
  Cb();
  Tb();
  Db();
  Rb();
  Ab();
  qb();
  Ob();
  Ib();
  Fb();
  Nb();
  jb();
  Bb();
  Fs();
  Hb();
  zb();
  Ub();
  Wb();
  Vb();
  Uc();
});
function ST(e) {
  let t = this,
    n = e.attempt(
      Rn,
      r,
      e.attempt(
        this.parser.constructs.flowInitial,
        i,
        ae(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Ac, i)), 'linePrefix')
      )
    );
  return n;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return (
      e.enter('lineEndingBlank'),
      e.consume(o),
      e.exit('lineEndingBlank'),
      (t.currentConstruct = void 0),
      n
    );
  }
  function i(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return (
      e.enter('lineEnding'),
      e.consume(o),
      e.exit('lineEnding'),
      (t.currentConstruct = void 0),
      n
    );
  }
}
var $b,
  Yb = H(() => {
    Wc();
    Je();
    $b = { tokenize: ST };
  });
function Jb(e) {
  return { resolveAll: Zb(e === 'text' ? CT : void 0), tokenize: t };
  function t(n) {
    let r = this,
      i = this.parser.constructs[e],
      o = n.attempt(i, s, a);
    return s;
    function s(f) {
      return c(f) ? o(f) : a(f);
    }
    function a(f) {
      if (f === null) {
        n.consume(f);
        return;
      }
      return (n.enter('data'), n.consume(f), u);
    }
    function u(f) {
      return c(f) ? (n.exit('data'), o(f)) : (n.consume(f), u);
    }
    function c(f) {
      if (f === null) return !0;
      let p = i[f],
        m = -1;
      if (p)
        for (; ++m < p.length; ) {
          let h = p[m];
          if (!h.previous || h.previous.call(r, r.previous)) return !0;
        }
      return !1;
    }
  }
}
function Zb(e) {
  return t;
  function t(n, r) {
    let i = -1,
      o;
    for (; ++i <= n.length; )
      o === void 0
        ? n[i] && n[i][1].type === 'data' && ((o = i), i++)
        : (!n[i] || n[i][1].type !== 'data') &&
          (i !== o + 2 &&
            ((n[o][1].end = n[i - 1][1].end), n.splice(o + 2, i - o - 2), (i = o + 2)),
          (o = void 0));
    return e ? e(n, r) : n;
  }
}
function CT(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === 'lineEnding') && e[n - 1][1].type === 'data') {
      let r = e[n - 1][1],
        i = t.sliceStream(r),
        o = i.length,
        s = -1,
        a = 0,
        u;
      for (; o--; ) {
        let c = i[o];
        if (typeof c == 'string') {
          for (s = c.length; c.charCodeAt(s - 1) === 32; ) (a++, s--);
          if (s) break;
          s = -1;
        } else if (c === -2) ((u = !0), a++);
        else if (c !== -1) {
          o++;
          break;
        }
      }
      if ((t._contentTypeTextTrailing && n === e.length && (a = 0), a)) {
        let c = {
          type: n === e.length || u || a < 2 ? 'lineSuffix' : 'hardBreakTrailing',
          start: {
            _bufferIndex: o ? s : r.start._bufferIndex + s,
            _index: r.start._index + o,
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a,
          },
          end: { ...r.end },
        };
        ((r.end = { ...c.start }),
          r.start.offset === r.end.offset
            ? Object.assign(r, c)
            : (e.splice(n, 0, ['enter', c, t], ['exit', c, t]), (n += 2)));
      }
      n++;
    }
  return e;
}
var Gb,
  Kb,
  Qb,
  Vc = H(() => {
    ((Gb = { resolveAll: Zb() }), (Kb = Jb('string')), (Qb = Jb('text')));
  });
var $c = {};
Bi($c, {
  attentionMarkers: () => OT,
  contentInitial: () => DT,
  disable: () => IT,
  document: () => TT,
  flow: () => RT,
  flowInitial: () => ET,
  insideSpan: () => PT,
  string: () => AT,
  text: () => qT,
});
var TT,
  DT,
  ET,
  RT,
  AT,
  qT,
  PT,
  OT,
  IT,
  Xb = H(() => {
    Wc();
    Vc();
    ((TT = {
      42: ut,
      43: ut,
      45: ut,
      48: ut,
      49: ut,
      50: ut,
      51: ut,
      52: ut,
      53: ut,
      54: ut,
      55: ut,
      56: ut,
      57: ut,
      62: Ts,
    }),
      (DT = { 91: Fc }),
      (ET = { [-2]: _i, [-1]: _i, 32: _i }),
      (RT = { 35: Lc, 42: er, 45: [Ns, er], 60: jc, 61: Ns, 95: er, 96: Rs, 126: Rs }),
      (AT = { 38: Es, 92: Ds }),
      (qT = {
        [-5]: Ci,
        [-4]: Ci,
        [-3]: Ci,
        33: Hc,
        38: Es,
        42: ki,
        60: [Dc, Bc],
        91: zc,
        92: [Nc, Ds],
        93: Xn,
        95: ki,
        96: Ec,
      }),
      (PT = { null: [ki, Gb] }),
      (OT = { null: [42, 95] }),
      (IT = { null: [] }));
  });
function ev(e, t, n) {
  let r = {
      _bufferIndex: -1,
      _index: 0,
      line: (n && n.line) || 1,
      column: (n && n.column) || 1,
      offset: (n && n.offset) || 0,
    },
    i = {},
    o = [],
    s = [],
    a = [],
    u = !0,
    c = {
      attempt: fe(Z),
      check: fe(ye),
      consume: N,
      enter: V,
      exit: P,
      interrupt: fe(ye, { interrupt: !0 }),
    },
    f = {
      code: null,
      containerState: {},
      defineSkip: q,
      events: [],
      now: L,
      parser: e,
      previous: null,
      sliceSerialize: A,
      sliceStream: I,
      write: h,
    },
    p = t.tokenize.call(f, c),
    m;
  return (t.resolveAll && o.push(t), f);
  function h($) {
    return (
      (s = dt(s, $)),
      S(),
      s[s.length - 1] !== null ? [] : (ge(t, 0), (f.events = Hr(o, f.events, f)), f.events)
    );
  }
  function A($, ee) {
    return NT(I($), ee);
  }
  function I($) {
    return FT(s, $);
  }
  function L() {
    let { _bufferIndex: $, _index: ee, line: te, column: _e, offset: De } = r;
    return { _bufferIndex: $, _index: ee, line: te, column: _e, offset: De };
  }
  function q($) {
    ((i[$.line] = $.column), ue());
  }
  function S() {
    let $;
    for (; r._index < s.length; ) {
      let ee = s[r._index];
      if (typeof ee == 'string')
        for (
          $ = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0);
          r._index === $ && r._bufferIndex < ee.length;
        )
          w(ee.charCodeAt(r._bufferIndex));
      else w(ee);
    }
  }
  function w($) {
    ((u = void 0), (m = $), (p = p($)));
  }
  function N($) {
    (W($)
      ? (r.line++, (r.column = 1), (r.offset += $ === -3 ? 2 : 1), ue())
      : $ !== -1 && (r.column++, r.offset++),
      r._bufferIndex < 0
        ? r._index++
        : (r._bufferIndex++,
          r._bufferIndex === s[r._index].length && ((r._bufferIndex = -1), r._index++)),
      (f.previous = $),
      (u = !0));
  }
  function V($, ee) {
    let te = ee || {};
    return ((te.type = $), (te.start = L()), f.events.push(['enter', te, f]), a.push(te), te);
  }
  function P($) {
    let ee = a.pop();
    return ((ee.end = L()), f.events.push(['exit', ee, f]), ee);
  }
  function Z($, ee) {
    ge($, ee.from);
  }
  function ye($, ee) {
    ee.restore();
  }
  function fe($, ee) {
    return te;
    function te(_e, De, Xe) {
      let $e, v, ze, et;
      return Array.isArray(_e) ? Ue(_e) : 'tokenize' in _e ? Ue([_e]) : k(_e);
      function k(Ae) {
        return $t;
        function $t(ht) {
          let mt = ht !== null && Ae[ht],
            Ye = ht !== null && Ae.null,
            fn = [
              ...(Array.isArray(mt) ? mt : mt ? [mt] : []),
              ...(Array.isArray(Ye) ? Ye : Ye ? [Ye] : []),
            ];
          return Ue(fn)(ht);
        }
      }
      function Ue(Ae) {
        return (($e = Ae), (v = 0), Ae.length === 0 ? Xe : St(Ae[v]));
      }
      function St(Ae) {
        return $t;
        function $t(ht) {
          return (
            (et = Fe()),
            (ze = Ae),
            Ae.partial || (f.currentConstruct = Ae),
            Ae.name && f.parser.constructs.disable.null.includes(Ae.name)
              ? Xt(ht)
              : Ae.tokenize.call(ee ? Object.assign(Object.create(f), ee) : f, c, ln, Xt)(ht)
          );
        }
      }
      function ln(Ae) {
        return ((u = !0), $(ze, et), De);
      }
      function Xt(Ae) {
        return ((u = !0), et.restore(), ++v < $e.length ? St($e[v]) : Xe);
      }
    }
  }
  function ge($, ee) {
    ($.resolveAll && !o.includes($) && o.push($),
      $.resolve && nt(f.events, ee, f.events.length - ee, $.resolve(f.events.slice(ee), f)),
      $.resolveTo && (f.events = $.resolveTo(f.events, f)));
  }
  function Fe() {
    let $ = L(),
      ee = f.previous,
      te = f.currentConstruct,
      _e = f.events.length,
      De = Array.from(a);
    return { from: _e, restore: Xe };
    function Xe() {
      ((r = $),
        (f.previous = ee),
        (f.currentConstruct = te),
        (f.events.length = _e),
        (a = De),
        ue());
    }
  }
  function ue() {
    r.line in i && r.column < 2 && ((r.column = i[r.line]), (r.offset += i[r.line] - 1));
  }
}
function FT(e, t) {
  let n = t.start._index,
    r = t.start._bufferIndex,
    i = t.end._index,
    o = t.end._bufferIndex,
    s;
  if (n === i) s = [e[n].slice(r, o)];
  else {
    if (((s = e.slice(n, i)), r > -1)) {
      let a = s[0];
      typeof a == 'string' ? (s[0] = a.slice(r)) : s.shift();
    }
    o > 0 && s.push(e[i].slice(0, o));
  }
  return s;
}
function NT(e, t) {
  let n = -1,
    r = [],
    i;
  for (; ++n < e.length; ) {
    let o = e[n],
      s;
    if (typeof o == 'string') s = o;
    else
      switch (o) {
        case -5: {
          s = '\r';
          break;
        }
        case -4: {
          s = `
`;
          break;
        }
        case -3: {
          s = `\r
`;
          break;
        }
        case -2: {
          s = t ? ' ' : '	';
          break;
        }
        case -1: {
          if (!t && i) continue;
          s = ' ';
          break;
        }
        default:
          s = String.fromCharCode(o);
      }
    ((i = o === -2), r.push(s));
  }
  return r.join('');
}
var tv = H(() => {
  ke();
  Dn();
  Ss();
});
function Yc(e) {
  let r = {
    constructs: cb([$c, ...((e || {}).extensions || [])]),
    content: i(gb),
    defined: [],
    document: i(vb),
    flow: i($b),
    lazy: {},
    string: i(Kb),
    text: i(Qb),
  };
  return r;
  function i(o) {
    return s;
    function s(a) {
      return ev(r, o, a);
    }
  }
}
var nv = H(() => {
  lb();
  yb();
  xb();
  Yb();
  Vc();
  Xb();
  tv();
});
function Gc(e) {
  for (; !qs(e); );
  return e;
}
var rv = H(() => {
  Rc();
});
function Kc() {
  let e = 1,
    t = '',
    n = !0,
    r;
  return i;
  function i(o, s, a) {
    let u = [],
      c,
      f,
      p,
      m,
      h;
    for (
      o = t + (typeof o == 'string' ? o.toString() : new TextDecoder(s || void 0).decode(o)),
        p = 0,
        t = '',
        n && (o.charCodeAt(0) === 65279 && p++, (n = void 0));
      p < o.length;
    ) {
      if (
        ((iv.lastIndex = p),
        (c = iv.exec(o)),
        (m = c && c.index !== void 0 ? c.index : o.length),
        (h = o.charCodeAt(m)),
        !c)
      ) {
        t = o.slice(p);
        break;
      }
      if (h === 10 && p === m && r) (u.push(-3), (r = void 0));
      else
        switch (
          (r && (u.push(-5), (r = void 0)), p < m && (u.push(o.slice(p, m)), (e += m - p)), h)
        ) {
          case 0: {
            (u.push(65533), e++);
            break;
          }
          case 9: {
            for (f = Math.ceil(e / 4) * 4, u.push(-2); e++ < f; ) u.push(-1);
            break;
          }
          case 10: {
            (u.push(-4), (e = 1));
            break;
          }
          default:
            ((r = !0), (e = 1));
        }
      p = m + 1;
    }
    return (a && (r && u.push(-5), t && u.push(t), u.push(null)), u);
  }
}
var iv,
  ov = H(() => {
    iv = /[\0\t\n\r]/g;
  });
var sv = H(() => {
  nv();
  rv();
  ov();
});
function av(e) {
  return e.replace(LT, MT);
}
function MT(e, t, n) {
  if (t) return t;
  if (n.charCodeAt(0) === 35) {
    let i = n.charCodeAt(1),
      o = i === 120 || i === 88;
    return ks(n.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return Br(n) || e;
}
var LT,
  uv = H(() => {
    ws();
    Cc();
    LT = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
  });
function Qc(e, t, n) {
  return (
    typeof t != 'string' && ((n = t), (t = void 0)),
    jT(n)(
      Gc(
        Yc(n)
          .document()
          .write(Kc()(e, t, !0))
      )
    )
  );
}
function jT(e) {
  let t = {
    transforms: [],
    canContainEols: ['emphasis', 'fragment', 'heading', 'paragraph', 'strong'],
    enter: {
      autolink: o(Rt),
      autolinkProtocol: fe,
      autolinkEmail: fe,
      atxHeading: o(Yt),
      blockQuote: o(ht),
      characterEscape: fe,
      characterReference: fe,
      codeFenced: o(mt),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: o(mt, s),
      codeText: o(Ye, s),
      codeTextData: fe,
      data: fe,
      codeFlowValue: fe,
      definition: o(fn),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: o(ir),
      hardBreakEscape: o(On),
      hardBreakTrailing: o(On),
      htmlFlow: o(en, s),
      htmlFlowData: fe,
      htmlText: o(en, s),
      htmlTextData: fe,
      image: o(or),
      label: s,
      link: o(Rt),
      listItem: o(sr),
      listItemValue: m,
      listOrdered: o(jt, p),
      listUnordered: o(jt),
      paragraph: o(ar),
      reference: k,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: o(Yt),
      strong: o(At),
      thematicBreak: o(Fn),
    },
    exit: {
      atxHeading: u(),
      atxHeadingSequence: V,
      autolink: u(),
      autolinkEmail: $t,
      autolinkProtocol: Ae,
      blockQuote: u(),
      characterEscapeValue: ge,
      characterReferenceMarkerHexadecimal: St,
      characterReferenceMarkerNumeric: St,
      characterReferenceValue: ln,
      characterReference: Xt,
      codeFenced: u(L),
      codeFencedFence: I,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: A,
      codeFlowValue: ge,
      codeIndented: u(q),
      codeText: u(te),
      codeTextData: ge,
      data: ge,
      definition: u(),
      definitionDestinationString: N,
      definitionLabelString: S,
      definitionTitleString: w,
      emphasis: u(),
      hardBreakEscape: u(ue),
      hardBreakTrailing: u(ue),
      htmlFlow: u($),
      htmlFlowData: ge,
      htmlText: u(ee),
      htmlTextData: ge,
      image: u(De),
      label: $e,
      labelText: Xe,
      lineEnding: Fe,
      link: u(_e),
      listItem: u(),
      listOrdered: u(),
      listUnordered: u(),
      paragraph: u(),
      referenceString: Ue,
      resourceDestinationString: v,
      resourceTitleString: ze,
      resource: et,
      setextHeading: u(ye),
      setextHeadingLineSequence: Z,
      setextHeadingText: P,
      strong: u(),
      thematicBreak: u(),
    },
  };
  fv(t, (e || {}).mdastExtensions || []);
  let n = {};
  return r;
  function r(E) {
    let B = { type: 'root', children: [] },
      Q = {
        stack: [B],
        tokenStack: [],
        config: t,
        enter: a,
        exit: c,
        buffer: s,
        resume: f,
        data: n,
      },
      y = [],
      D = -1;
    for (; ++D < E.length; )
      if (E[D][1].type === 'listOrdered' || E[D][1].type === 'listUnordered')
        if (E[D][0] === 'enter') y.push(D);
        else {
          let M = y.pop();
          D = i(E, M, D);
        }
    for (D = -1; ++D < E.length; ) {
      let M = t[E[D][0]];
      lv.call(M, E[D][1].type) &&
        M[E[D][1].type].call(Object.assign({ sliceSerialize: E[D][2].sliceSerialize }, Q), E[D][1]);
    }
    if (Q.tokenStack.length > 0) {
      let M = Q.tokenStack[Q.tokenStack.length - 1];
      (M[1] || cv).call(Q, void 0, M[0]);
    }
    for (
      B.position = {
        start: An(E.length > 0 ? E[0][1].start : { line: 1, column: 1, offset: 0 }),
        end: An(E.length > 0 ? E[E.length - 2][1].end : { line: 1, column: 1, offset: 0 }),
      },
        D = -1;
      ++D < t.transforms.length;
    )
      B = t.transforms[D](B) || B;
    return B;
  }
  function i(E, B, Q) {
    let y = B - 1,
      D = -1,
      M = !1,
      U,
      ce,
      pe,
      xe;
    for (; ++y <= Q; ) {
      let le = E[y];
      switch (le[1].type) {
        case 'listUnordered':
        case 'listOrdered':
        case 'blockQuote': {
          (le[0] === 'enter' ? D++ : D--, (xe = void 0));
          break;
        }
        case 'lineEndingBlank': {
          le[0] === 'enter' && (U && !xe && !D && !pe && (pe = y), (xe = void 0));
          break;
        }
        case 'linePrefix':
        case 'listItemValue':
        case 'listItemMarker':
        case 'listItemPrefix':
        case 'listItemPrefixWhitespace':
          break;
        default:
          xe = void 0;
      }
      if (
        (!D && le[0] === 'enter' && le[1].type === 'listItemPrefix') ||
        (D === -1 &&
          le[0] === 'exit' &&
          (le[1].type === 'listUnordered' || le[1].type === 'listOrdered'))
      ) {
        if (U) {
          let ne = y;
          for (ce = void 0; ne--; ) {
            let de = E[ne];
            if (de[1].type === 'lineEnding' || de[1].type === 'lineEndingBlank') {
              if (de[0] === 'exit') continue;
              (ce && ((E[ce][1].type = 'lineEndingBlank'), (M = !0)),
                (de[1].type = 'lineEnding'),
                (ce = ne));
            } else if (
              !(
                de[1].type === 'linePrefix' ||
                de[1].type === 'blockQuotePrefix' ||
                de[1].type === 'blockQuotePrefixWhitespace' ||
                de[1].type === 'blockQuoteMarker' ||
                de[1].type === 'listItemIndent'
              )
            )
              break;
          }
          (pe && (!ce || pe < ce) && (U._spread = !0),
            (U.end = Object.assign({}, ce ? E[ce][1].start : le[1].end)),
            E.splice(ce || y, 0, ['exit', U, le[2]]),
            y++,
            Q++);
        }
        if (le[1].type === 'listItemPrefix') {
          let ne = {
            type: 'listItem',
            _spread: !1,
            start: Object.assign({}, le[1].start),
            end: void 0,
          };
          ((U = ne), E.splice(y, 0, ['enter', ne, le[2]]), y++, Q++, (pe = void 0), (xe = !0));
        }
      }
    }
    return ((E[B][1]._spread = M), Q);
  }
  function o(E, B) {
    return Q;
    function Q(y) {
      (a.call(this, E(y), y), B && B.call(this, y));
    }
  }
  function s() {
    this.stack.push({ type: 'fragment', children: [] });
  }
  function a(E, B, Q) {
    (this.stack[this.stack.length - 1].children.push(E),
      this.stack.push(E),
      this.tokenStack.push([B, Q || void 0]),
      (E.position = { start: An(B.start), end: void 0 }));
  }
  function u(E) {
    return B;
    function B(Q) {
      (E && E.call(this, Q), c.call(this, Q));
    }
  }
  function c(E, B) {
    let Q = this.stack.pop(),
      y = this.tokenStack.pop();
    if (y) y[0].type !== E.type && (B ? B.call(this, E, y[0]) : (y[1] || cv).call(this, E, y[0]));
    else
      throw new Error(
        'Cannot close `' +
          E.type +
          '` (' +
          Tn({ start: E.start, end: E.end }) +
          '): it\u2019s not open'
      );
    Q.position.end = An(E.end);
  }
  function f() {
    return _c(this.stack.pop());
  }
  function p() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(E) {
    if (this.data.expectingFirstListItemValue) {
      let B = this.stack[this.stack.length - 2];
      ((B.start = Number.parseInt(this.sliceSerialize(E), 10)),
        (this.data.expectingFirstListItemValue = void 0));
    }
  }
  function h() {
    let E = this.resume(),
      B = this.stack[this.stack.length - 1];
    B.lang = E;
  }
  function A() {
    let E = this.resume(),
      B = this.stack[this.stack.length - 1];
    B.meta = E;
  }
  function I() {
    this.data.flowCodeInside || (this.buffer(), (this.data.flowCodeInside = !0));
  }
  function L() {
    let E = this.resume(),
      B = this.stack[this.stack.length - 1];
    ((B.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')), (this.data.flowCodeInside = void 0));
  }
  function q() {
    let E = this.resume(),
      B = this.stack[this.stack.length - 1];
    B.value = E.replace(/(\r?\n|\r)$/g, '');
  }
  function S(E) {
    let B = this.resume(),
      Q = this.stack[this.stack.length - 1];
    ((Q.label = B), (Q.identifier = an(this.sliceSerialize(E)).toLowerCase()));
  }
  function w() {
    let E = this.resume(),
      B = this.stack[this.stack.length - 1];
    B.title = E;
  }
  function N() {
    let E = this.resume(),
      B = this.stack[this.stack.length - 1];
    B.url = E;
  }
  function V(E) {
    let B = this.stack[this.stack.length - 1];
    if (!B.depth) {
      let Q = this.sliceSerialize(E).length;
      B.depth = Q;
    }
  }
  function P() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function Z(E) {
    let B = this.stack[this.stack.length - 1];
    B.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
  }
  function ye() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function fe(E) {
    let Q = this.stack[this.stack.length - 1].children,
      y = Q[Q.length - 1];
    ((!y || y.type !== 'text') &&
      ((y = In()), (y.position = { start: An(E.start), end: void 0 }), Q.push(y)),
      this.stack.push(y));
  }
  function ge(E) {
    let B = this.stack.pop();
    ((B.value += this.sliceSerialize(E)), (B.position.end = An(E.end)));
  }
  function Fe(E) {
    let B = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      let Q = B.children[B.children.length - 1];
      ((Q.position.end = An(E.end)), (this.data.atHardBreak = void 0));
      return;
    }
    !this.data.setextHeadingSlurpLineEnding &&
      t.canContainEols.includes(B.type) &&
      (fe.call(this, E), ge.call(this, E));
  }
  function ue() {
    this.data.atHardBreak = !0;
  }
  function $() {
    let E = this.resume(),
      B = this.stack[this.stack.length - 1];
    B.value = E;
  }
  function ee() {
    let E = this.resume(),
      B = this.stack[this.stack.length - 1];
    B.value = E;
  }
  function te() {
    let E = this.resume(),
      B = this.stack[this.stack.length - 1];
    B.value = E;
  }
  function _e() {
    let E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      let B = this.data.referenceType || 'shortcut';
      ((E.type += 'Reference'), (E.referenceType = B), delete E.url, delete E.title);
    } else (delete E.identifier, delete E.label);
    this.data.referenceType = void 0;
  }
  function De() {
    let E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      let B = this.data.referenceType || 'shortcut';
      ((E.type += 'Reference'), (E.referenceType = B), delete E.url, delete E.title);
    } else (delete E.identifier, delete E.label);
    this.data.referenceType = void 0;
  }
  function Xe(E) {
    let B = this.sliceSerialize(E),
      Q = this.stack[this.stack.length - 2];
    ((Q.label = av(B)), (Q.identifier = an(B).toLowerCase()));
  }
  function $e() {
    let E = this.stack[this.stack.length - 1],
      B = this.resume(),
      Q = this.stack[this.stack.length - 1];
    if (((this.data.inReference = !0), Q.type === 'link')) {
      let y = E.children;
      Q.children = y;
    } else Q.alt = B;
  }
  function v() {
    let E = this.resume(),
      B = this.stack[this.stack.length - 1];
    B.url = E;
  }
  function ze() {
    let E = this.resume(),
      B = this.stack[this.stack.length - 1];
    B.title = E;
  }
  function et() {
    this.data.inReference = void 0;
  }
  function k() {
    this.data.referenceType = 'collapsed';
  }
  function Ue(E) {
    let B = this.resume(),
      Q = this.stack[this.stack.length - 1];
    ((Q.label = B),
      (Q.identifier = an(this.sliceSerialize(E)).toLowerCase()),
      (this.data.referenceType = 'full'));
  }
  function St(E) {
    this.data.characterReferenceType = E.type;
  }
  function ln(E) {
    let B = this.sliceSerialize(E),
      Q = this.data.characterReferenceType,
      y;
    Q
      ? ((y = ks(B, Q === 'characterReferenceMarkerNumeric' ? 10 : 16)),
        (this.data.characterReferenceType = void 0))
      : (y = Br(B));
    let D = this.stack[this.stack.length - 1];
    D.value += y;
  }
  function Xt(E) {
    let B = this.stack.pop();
    B.position.end = An(E.end);
  }
  function Ae(E) {
    ge.call(this, E);
    let B = this.stack[this.stack.length - 1];
    B.url = this.sliceSerialize(E);
  }
  function $t(E) {
    ge.call(this, E);
    let B = this.stack[this.stack.length - 1];
    B.url = 'mailto:' + this.sliceSerialize(E);
  }
  function ht() {
    return { type: 'blockquote', children: [] };
  }
  function mt() {
    return { type: 'code', lang: null, meta: null, value: '' };
  }
  function Ye() {
    return { type: 'inlineCode', value: '' };
  }
  function fn() {
    return { type: 'definition', identifier: '', label: null, title: null, url: '' };
  }
  function ir() {
    return { type: 'emphasis', children: [] };
  }
  function Yt() {
    return { type: 'heading', depth: 0, children: [] };
  }
  function On() {
    return { type: 'break' };
  }
  function en() {
    return { type: 'html', value: '' };
  }
  function or() {
    return { type: 'image', title: null, url: '', alt: null };
  }
  function Rt() {
    return { type: 'link', title: null, url: '', children: [] };
  }
  function jt(E) {
    return {
      type: 'list',
      ordered: E.type === 'listOrdered',
      start: null,
      spread: E._spread,
      children: [],
    };
  }
  function sr(E) {
    return { type: 'listItem', spread: E._spread, checked: null, children: [] };
  }
  function ar() {
    return { type: 'paragraph', children: [] };
  }
  function At() {
    return { type: 'strong', children: [] };
  }
  function In() {
    return { type: 'text', value: '' };
  }
  function Fn() {
    return { type: 'thematicBreak' };
  }
}
function An(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function fv(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    let r = t[n];
    Array.isArray(r) ? fv(e, r) : BT(e, r);
  }
}
function BT(e, t) {
  let n;
  for (n in t)
    if (lv.call(t, n))
      switch (n) {
        case 'canContainEols': {
          let r = t[n];
          r && e[n].push(...r);
          break;
        }
        case 'transforms': {
          let r = t[n];
          r && e[n].push(...r);
          break;
        }
        case 'enter':
        case 'exit': {
          let r = t[n];
          r && Object.assign(e[n], r);
          break;
        }
      }
}
function cv(e, t) {
  throw e
    ? new Error(
        'Cannot close `' +
          e.type +
          '` (' +
          Tn({ start: e.start, end: e.end }) +
          '): a different token (`' +
          t.type +
          '`, ' +
          Tn({ start: t.start, end: t.end }) +
          ') is open'
      )
    : new Error(
        'Cannot close document, a token (`' +
          t.type +
          '`, ' +
          Tn({ start: t.start, end: t.end }) +
          ') is still open'
      );
}
var lv,
  dv = H(() => {
    sb();
    sv();
    Cc();
    uv();
    _s();
    ws();
    pc();
    lv = {}.hasOwnProperty;
  });
var pv = H(() => {
  dv();
});
function Jc(e) {
  let t = this;
  t.parser = n;
  function n(r) {
    return Qc(r, {
      ...t.data('settings'),
      ...e,
      extensions: t.data('micromarkExtensions') || [],
      mdastExtensions: t.data('fromMarkdownExtensions') || [],
    });
  }
}
var hv = H(() => {
  pv();
});
var mv = {};
Bi(mv, { default: () => Jc });
var gv = H(() => {
  hv();
});
function HT(e) {
  let t = [],
    n = -1;
  for (; ++n < e.length; ) t[n] = Ls(e[n]);
  return Ms(r);
  function r(...i) {
    let o = -1;
    for (; ++o < t.length; ) if (t[o].apply(this, i)) return !0;
    return !1;
  }
}
function zT(e) {
  let t = e;
  return Ms(n);
  function n(r) {
    let i = r,
      o;
    for (o in e) if (i[o] !== t[o]) return !1;
    return !0;
  }
}
function UT(e) {
  return Ms(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Ms(e) {
  return t;
  function t(n, r, i) {
    return !!(VT(n) && e.call(this, n, typeof r == 'number' ? r : void 0, i || void 0));
  }
}
function WT() {
  return !0;
}
function VT(e) {
  return e !== null && typeof e == 'object' && 'type' in e;
}
var Ls,
  yv = H(() => {
    Ls = function (e) {
      if (e == null) return WT;
      if (typeof e == 'function') return Ms(e);
      if (typeof e == 'object') return Array.isArray(e) ? HT(e) : zT(e);
      if (typeof e == 'string') return UT(e);
      throw new Error('Expected function, string, or object as test');
    };
  });
var bv = H(() => {
  yv();
});
function vv(e) {
  return '\x1B[33m' + e + '\x1B[39m';
}
var xv = H(() => {});
function Zc(e, t, n, r) {
  let i;
  typeof t == 'function' && typeof n != 'function' ? ((r = n), (n = t)) : (i = t);
  let o = Ls(i),
    s = r ? -1 : 1;
  a(e, void 0, [])();
  function a(u, c, f) {
    let p = u && typeof u == 'object' ? u : {};
    if (typeof p.type == 'string') {
      let h =
        typeof p.tagName == 'string' ? p.tagName : typeof p.name == 'string' ? p.name : void 0;
      Object.defineProperty(m, 'name', {
        value: 'node (' + vv(u.type + (h ? '<' + h + '>' : '')) + ')',
      });
    }
    return m;
    function m() {
      let h = wv,
        A,
        I,
        L;
      if ((!t || o(u, c, f[f.length - 1] || void 0)) && ((h = $T(n(u, f))), h[0] === zr)) return h;
      if ('children' in u && u.children) {
        let q = u;
        if (q.children && h[0] !== Di)
          for (
            I = (r ? q.children.length : -1) + s, L = f.concat(q);
            I > -1 && I < q.children.length;
          ) {
            let S = q.children[I];
            if (((A = a(S, I, L)()), A[0] === zr)) return A;
            I = typeof A[1] == 'number' ? A[1] : I + s;
          }
      }
      return h;
    }
  }
}
function $T(e) {
  return Array.isArray(e) ? e : typeof e == 'number' ? [Ti, e] : e == null ? wv : [e];
}
var wv,
  Ti,
  zr,
  Di,
  kv = H(() => {
    bv();
    xv();
    ((wv = []), (Ti = !0), (zr = !1), (Di = 'skip'));
  });
var Xc = H(() => {
  kv();
});
function _v(e, t, n, r) {
  let i, o, s;
  (typeof t == 'function' && typeof n != 'function'
    ? ((o = void 0), (s = t), (i = n))
    : ((o = t), (s = n), (i = r)),
    Zc(e, o, a, i));
  function a(u, c) {
    let f = c[c.length - 1],
      p = f ? f.children.indexOf(u) : void 0;
    return s(u, p, f);
  }
}
var Sv = H(() => {
  Xc();
  Xc();
});
var Cv = {};
Bi(Cv, { CONTINUE: () => Ti, EXIT: () => zr, SKIP: () => Di, visit: () => _v });
var Tv = H(() => {
  Sv();
});
var tl = O((Ur) => {
  'use strict';
  var Dv =
    (Ur && Ur.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(Ur, '__esModule', { value: !0 });
  Ur.parseDocument = JT;
  Ur.parseHttpBlock = n1;
  var YT = Dv(ky()),
    GT = (nb(), Gs(tb)),
    KT = Dv((gv(), Gs(mv))),
    Ev = (Tv(), Gs(Cv)),
    QT = /^omg\.(path|query|headers|body|response|returns|example|type|errors|config)(\.(\d+))?$/,
    el = /\{\{>\s*([^}\s]+)\s*\}\}/g;
  function JT(e, t) {
    let { data: n, content: r } = (0, YT.default)(e),
      i = (0, GT.unified)().use(KT.default).parse(r),
      o = ZT(i),
      s = XT(i, r),
      a = e1(i),
      u = t1(r);
    return {
      filePath: t,
      frontMatter: Object.keys(n).length > 0 ? n : null,
      title: o,
      description: s,
      blocks: a,
      partials: u,
    };
  }
  function ZT(e) {
    let t = null;
    return (
      (0, Ev.visit)(e, 'heading', (n) => {
        n.depth === 1 &&
          !t &&
          (t = n.children
            .filter((r) => r.type === 'text')
            .map((r) => r.value)
            .join(''));
      }),
      t
    );
  }
  function XT(e, t) {
    let n = [],
      r = !1;
    for (let i of e.children) {
      if (i.type === 'heading' && i.depth === 1 && !r) {
        r = !0;
        continue;
      }
      if (i.type !== 'code') {
        if (i.type === 'paragraph') {
          let o = Rv(i);
          if (el.test(o)) continue;
        }
        if (i.position) {
          let o = i.position.start.offset,
            s = i.position.end.offset;
          n.push(t.slice(o, s));
        }
      }
    }
    return n
      .join(
        `

`
      )
      .trim();
  }
  function Rv(e) {
    return e.type === 'text' ? e.value : e.children ? e.children.map(Rv).join('') : '';
  }
  function e1(e) {
    let t = [];
    return (
      (0, Ev.visit)(e, 'code', (n) => {
        let r = n.lang || '',
          i = n.position?.start.line || 0;
        if (r === 'http') {
          t.push({ type: 'http', content: n.value, line: i });
          return;
        }
        let o = r.match(QT);
        if (o) {
          let s = `omg.${o[1]}`,
            a = o[3] ? parseInt(o[3], 10) : void 0;
          t.push({ type: s, statusCode: a, content: n.value, line: i });
        }
      }),
      t
    );
  }
  function t1(e) {
    let t = [];
    return (
      e
        .split(
          `
`
        )
        .forEach((r, i) => {
          let o;
          for (el.lastIndex = 0; (o = el.exec(r)) !== null; ) t.push({ path: o[1], line: i + 1 });
        }),
      t
    );
  }
  function n1(e) {
    let n = e.trim().match(/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+(.+)$/i);
    return n ? { method: n[1].toUpperCase(), path: n[2].trim() } : null;
  }
});
var Ei = O((js) => {
  'use strict';
  Object.defineProperty(js, '__esModule', { value: !0 });
  js.parseSchema = r1;
  js.inferSchemaFromJson = il;
  var nl = class {
      input;
      pos = 0;
      line = 1;
      column = 1;
      constructor(t) {
        this.input = t;
      }
      peek() {
        return this.input[this.pos] || '';
      }
      advance() {
        let t = this.input[this.pos++];
        return (
          t ===
          `
`
            ? (this.line++, (this.column = 1))
            : this.column++,
          t
        );
      }
      skipWhitespace() {
        for (; /\s/.test(this.peek()); ) this.advance();
      }
      skipComment() {
        if (this.peek() === '/' && this.input[this.pos + 1] === '/') {
          for (
            ;
            this.peek() &&
            this.peek() !==
              `
`;
          )
            this.advance();
          return !0;
        }
        return !1;
      }
      readString() {
        let t = this.advance(),
          n = this.line,
          r = this.column,
          i = '';
        for (; this.peek() && this.peek() !== t; )
          if (this.peek() === '\\') {
            this.advance();
            let o = this.advance();
            switch (o) {
              case 'n':
                i += `
`;
                break;
              case 't':
                i += '	';
                break;
              case 'r':
                i += '\r';
                break;
              case '\\':
                i += '\\';
                break;
              case '"':
                i += '"';
                break;
              case "'":
                i += "'";
                break;
              default:
                i += o;
            }
          } else i += this.advance();
        return (this.advance(), { type: 'STRING', value: i, line: n, column: r });
      }
      readNumber() {
        let t = this.line,
          n = this.column,
          r = '';
        for (this.peek() === '-' && (r += this.advance()); /[0-9]/.test(this.peek()); )
          r += this.advance();
        if (this.peek() === '.')
          for (r += this.advance(); /[0-9]/.test(this.peek()); ) r += this.advance();
        if (this.peek() === 'e' || this.peek() === 'E')
          for (
            r += this.advance(),
              (this.peek() === '+' || this.peek() === '-') && (r += this.advance());
            /[0-9]/.test(this.peek());
          )
            r += this.advance();
        return { type: 'NUMBER', value: r, line: t, column: n };
      }
      readIdentifier() {
        let t = this.line,
          n = this.column,
          r = '';
        for (; /[a-zA-Z0-9_]/.test(this.peek()); ) r += this.advance();
        return r === 'true'
          ? { type: 'TRUE', value: r, line: t, column: n }
          : r === 'false'
            ? { type: 'FALSE', value: r, line: t, column: n }
            : r === 'null'
              ? { type: 'NULL', value: r, line: t, column: n }
              : { type: 'IDENTIFIER', value: r, line: t, column: n };
      }
      nextToken() {
        for (;;) {
          if ((this.skipWhitespace(), this.skipComment())) continue;
          if (this.pos >= this.input.length)
            return { type: 'EOF', value: '', line: this.line, column: this.column };
          let t = this.peek(),
            n = this.line,
            r = this.column;
          switch (t) {
            case '{':
              return (this.advance(), { type: 'LBRACE', value: t, line: n, column: r });
            case '}':
              return (this.advance(), { type: 'RBRACE', value: t, line: n, column: r });
            case '[':
              return (this.advance(), { type: 'LBRACKET', value: t, line: n, column: r });
            case ']':
              return (this.advance(), { type: 'RBRACKET', value: t, line: n, column: r });
            case '(':
              return (this.advance(), { type: 'LPAREN', value: t, line: n, column: r });
            case ')':
              return (this.advance(), { type: 'RPAREN', value: t, line: n, column: r });
            case ':':
              return (this.advance(), { type: 'COLON', value: t, line: n, column: r });
            case ',':
              return (this.advance(), { type: 'COMMA', value: t, line: n, column: r });
            case '|':
              return (this.advance(), { type: 'PIPE', value: t, line: n, column: r });
            case '&':
              return (this.advance(), { type: 'AMPERSAND', value: t, line: n, column: r });
            case '?':
              return (this.advance(), { type: 'QUESTION', value: t, line: n, column: r });
            case '@':
              return (this.advance(), { type: 'AT', value: t, line: n, column: r });
            case '"':
            case "'":
              return this.readString();
            default:
              if (/[0-9]/.test(t) || (t === '-' && /[0-9]/.test(this.input[this.pos + 1])))
                return this.readNumber();
              if (/[a-zA-Z_]/.test(t)) return this.readIdentifier();
              throw new Error(`Unexpected character '${t}' at line ${n}, column ${r}`);
          }
        }
      }
    },
    rl = class {
      currentToken;
      lexer;
      constructor(t) {
        ((this.lexer = new nl(t)), (this.currentToken = this.lexer.nextToken()));
      }
      advance() {
        let t = this.currentToken;
        return ((this.currentToken = this.lexer.nextToken()), t);
      }
      check(t) {
        return this.currentToken.type === t;
      }
      checkValue(t) {
        return this.currentToken.value === t;
      }
      expect(t) {
        if (!this.check(t))
          throw new Error(
            `Expected ${t} but got ${this.currentToken.type} at line ${this.currentToken.line}, column ${this.currentToken.column}`
          );
        return this.advance();
      }
      parseAnnotations() {
        let t = [];
        for (; this.check('AT'); ) {
          this.advance();
          let n = this.expect('IDENTIFIER').value,
            r = [];
          if (this.check('LPAREN')) {
            for (this.advance(); !this.check('RPAREN'); ) {
              if (this.check('STRING')) r.push(this.advance().value);
              else if (this.check('NUMBER')) r.push(parseFloat(this.advance().value));
              else if (this.check('TRUE')) (this.advance(), r.push(!0));
              else if (this.check('FALSE')) (this.advance(), r.push(!1));
              else if (this.check('IDENTIFIER')) r.push(this.advance().value);
              else
                throw new Error(`Unexpected token in annotation args: ${this.currentToken.type}`);
              this.check('COMMA') && this.advance();
            }
            this.expect('RPAREN');
          }
          t.push({ name: n, args: r });
        }
        return t;
      }
      parsePrimaryType() {
        let t = this.currentToken;
        if (this.check('STRING')) {
          let n = this.advance().value;
          if (this.check('PIPE')) {
            let r = [n];
            for (; this.check('PIPE'); )
              if ((this.advance(), this.check('STRING'))) r.push(this.advance().value);
              else if (this.check('IDENTIFIER') || this.check('NULL')) {
                if (this.checkValue('null') || this.check('NULL'))
                  return (
                    this.advance(),
                    { kind: 'enum', values: r, nullable: !0, annotations: this.parseAnnotations() }
                  );
                r.push(this.advance().value);
              }
            return { kind: 'enum', values: r, annotations: this.parseAnnotations() };
          }
          return { kind: 'primitive', type: 'string', annotations: [] };
        }
        if (this.check('NUMBER'))
          return {
            kind: 'primitive',
            type: this.advance().value.includes('.') ? 'number' : 'integer',
            annotations: [],
          };
        if (this.check('TRUE') || this.check('FALSE'))
          return (this.advance(), { kind: 'primitive', type: 'boolean', annotations: [] });
        if (this.check('NULL'))
          return (
            this.advance(),
            { kind: 'primitive', type: 'any', nullable: !0, annotations: [] }
          );
        if (this.check('IDENTIFIER')) {
          let n = this.advance().value,
            r = this.check('QUESTION');
          r && this.advance();
          let i = this.parseAnnotations();
          if (
            [
              'string',
              'number',
              'integer',
              'boolean',
              'decimal',
              'date',
              'datetime',
              'uuid',
              'any',
              'int',
              'bool',
            ].includes(n.toLowerCase())
          ) {
            let s = n.toLowerCase();
            return (
              s === 'int' && (s = 'integer'),
              s === 'bool' && (s = 'boolean'),
              { kind: 'primitive', type: s, optional: r, annotations: i }
            );
          }
          return { kind: 'reference', name: n, optional: r, annotations: i };
        }
        if (this.check('LBRACKET')) {
          this.advance();
          let n = this.parseType();
          this.expect('RBRACKET');
          let r = this.check('QUESTION');
          r && this.advance();
          let i = this.parseAnnotations();
          return { kind: 'array', items: n, optional: r, annotations: i };
        }
        if (this.check('LBRACE')) return this.parseObject();
        throw new Error(`Unexpected token: ${t.type} at line ${t.line}, column ${t.column}`);
      }
      parseIntersectionType() {
        let t = this.parsePrimaryType();
        if (this.check('AMPERSAND')) {
          let n = [t];
          for (; this.check('AMPERSAND'); ) (this.advance(), n.push(this.parsePrimaryType()));
          if (n.length > 1) return { kind: 'intersection', types: n, annotations: [] };
        }
        return t;
      }
      parseType() {
        let t = this.parseIntersectionType();
        if (this.check('PIPE') && t.kind !== 'enum') {
          let n = [t],
            r = !1;
          for (; this.check('PIPE'); )
            (this.advance(),
              this.check('NULL') || this.checkValue('null')
                ? (this.advance(), (r = !0))
                : n.push(this.parseIntersectionType()));
          if (n.length > 1) return { kind: 'union', types: n, nullable: r, annotations: [] };
          if (r) return { ...t, nullable: !0 };
        }
        return t;
      }
      parseObject() {
        this.expect('LBRACE');
        let t = {};
        for (; !this.check('RBRACE'); ) {
          let i;
          if (this.check('STRING')) i = this.advance().value;
          else if (this.check('IDENTIFIER')) i = this.advance().value;
          else throw new Error(`Expected property key at line ${this.currentToken.line}`);
          let o = !1;
          (this.check('QUESTION') && (this.advance(), (o = !0)), this.expect('COLON'));
          let s = this.parseType();
          (o && (s.optional = !0), (t[i] = s), this.check('COMMA') && this.advance());
        }
        this.expect('RBRACE');
        let n = this.check('QUESTION');
        n && this.advance();
        let r = this.parseAnnotations();
        return { kind: 'object', properties: t, optional: n, annotations: r };
      }
      parse() {
        let t = this.parseType();
        if (!this.check('EOF'))
          throw new Error(`Unexpected token after schema: ${this.currentToken.type}`);
        return t;
      }
    };
  function r1(e) {
    return new rl(e).parse();
  }
  function il(e) {
    if (e === null) return { kind: 'primitive', type: 'any', nullable: !0, annotations: [] };
    if (typeof e == 'string') return { kind: 'primitive', type: 'string', annotations: [] };
    if (typeof e == 'number')
      return {
        kind: 'primitive',
        type: Number.isInteger(e) ? 'integer' : 'number',
        annotations: [],
      };
    if (typeof e == 'boolean') return { kind: 'primitive', type: 'boolean', annotations: [] };
    if (Array.isArray(e))
      return e.length === 0
        ? {
            kind: 'array',
            items: { kind: 'primitive', type: 'any', annotations: [] },
            annotations: [],
          }
        : { kind: 'array', items: il(e[0]), annotations: [] };
    if (typeof e == 'object') {
      let t = {};
      for (let [n, r] of Object.entries(e)) t[n] = il(r);
      return { kind: 'object', properties: t, annotations: [] };
    }
    return { kind: 'primitive', type: 'any', annotations: [] };
  }
});
var sl = O((ol) => {
  'use strict';
  Object.defineProperty(ol, '__esModule', { value: !0 });
  ol.parseReturnsBlock = o1;
  var i1 = Ei();
  function o1(e) {
    let t = [],
      n = e.split(`
`),
      r = null,
      i = '',
      o = '',
      s = !1;
    for (let a = 0; a < n.length; a++) {
      let c = n[a].trim();
      if (!c || c === '{' || c === '}') continue;
      let f = c.match(/^(\d+)\s*:\s*(.*)$/);
      if (f) {
        (r &&
          r.statusCode !== void 0 &&
          ((r.schema = Av(i.trim())), o && (r.condition = o.trim()), t.push(r)),
          (r = { statusCode: parseInt(f[1], 10) }),
          (i = f[2]),
          (o = ''),
          (s = !1));
        continue;
      }
      let p = c.match(/^when\s+(.*)$/);
      if (p) {
        ((s = !0), (o = p[1]));
        continue;
      }
      let m = c.match(/^["'](.*)["']$/);
      if (m && r) {
        ((r.description = m[1]), (s = !1));
        continue;
      }
      s ? (o += ' ' + c) : r && (i += ' ' + c);
    }
    return (
      r &&
        r.statusCode !== void 0 &&
        ((r.schema = Av(i.trim())), o && (r.condition = o.trim()), t.push(r)),
      { responses: t }
    );
  }
  function Av(e) {
    if (!e || e === 'void') return null;
    try {
      return (0, i1.parseSchema)(e);
    } catch {
      return { kind: 'reference', name: e.split(/\s/)[0], annotations: [] };
    }
  }
});
var Iv = O((Mt) => {
  'use strict';
  var s1 =
      (Mt && Mt.__createBinding) ||
      (Object.create
        ? function (e, t, n, r) {
            r === void 0 && (r = n);
            var i = Object.getOwnPropertyDescriptor(t, n);
            ((!i || ('get' in i ? !t.__esModule : i.writable || i.configurable)) &&
              (i = {
                enumerable: !0,
                get: function () {
                  return t[n];
                },
              }),
              Object.defineProperty(e, r, i));
          }
        : function (e, t, n, r) {
            (r === void 0 && (r = n), (e[r] = t[n]));
          }),
    a1 =
      (Mt && Mt.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, 'default', { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    qv =
      (Mt && Mt.__importStar) ||
      (function () {
        var e = function (t) {
          return (
            (e =
              Object.getOwnPropertyNames ||
              function (n) {
                var r = [];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (r[r.length] = i);
                return r;
              }),
            e(t)
          );
        };
        return function (t) {
          if (t && t.__esModule) return t;
          var n = {};
          if (t != null)
            for (var r = e(t), i = 0; i < r.length; i++) r[i] !== 'default' && s1(n, t, r[i]);
          return (a1(n, t), n);
        };
      })();
  Object.defineProperty(Mt, '__esModule', { value: !0 });
  Mt.resolveDocument = al;
  Mt.extractTypeName = Pv;
  Mt.buildEndpoint = Ov;
  Mt.loadApi = d1;
  var tr = qv(require('fs')),
    Vt = qv(require('path')),
    Bs = tl(),
    u1 = Ei(),
    c1 = sl();
  function al(e, t, n = new Set()) {
    let r = Vt.resolve(t.basePath, e.filePath);
    if (n.has(r)) throw new Error(`Circular partial reference detected: ${r}`);
    n.add(r);
    let i = [...e.blocks];
    for (let o of e.partials) {
      let s = l1(o.path, t.basePath);
      if (!tr.existsSync(s)) throw new Error(`Partial not found: ${o.path} (resolved to ${s})`);
      let a = tr.readFileSync(s, 'utf-8'),
        u = (0, Bs.parseDocument)(a, o.path),
        c = al(u, t, n);
      i.push(...c.resolvedBlocks);
    }
    for (let o of i)
      if (o.type !== 'http') {
        if (o.type === 'omg.returns') {
          try {
            o.parsedResponses = (0, c1.parseReturnsBlock)(o.content);
          } catch (s) {
            throw new Error(`Failed to parse returns block: ${s}`);
          }
          continue;
        }
        if (!o.parsed)
          try {
            o.parsed = (0, u1.parseSchema)(o.content);
          } catch (s) {
            try {
              let a = JSON.parse(o.content);
              o.parsed = f1(a);
            } catch {
              throw s;
            }
          }
      }
    return { ...e, resolvedBlocks: i };
  }
  function l1(e, t) {
    let n = t,
      r = Vt.parse(n).root;
    for (; n !== r; ) {
      let i = [Vt.join(n, 'partials', `${e}.omg.md`), Vt.join(n, 'partials', e, 'index.omg.md')];
      for (let s of i) if (tr.existsSync(s)) return s;
      let o = Vt.join(n, 'partials');
      if (tr.existsSync(o)) return i[0];
      n = Vt.dirname(n);
    }
    return Vt.join(t, 'partials', `${e}.omg.md`);
  }
  function f1(e) {
    let { inferSchemaFromJson: t } = Ei();
    return t(e);
  }
  function Pv(e) {
    let t = e.match(/^\s*type\s+([A-Z][a-zA-Z0-9_]*)/);
    return t ? t[1] : null;
  }
  function Ov(e) {
    let t = e.frontMatter,
      n = null,
      r = null;
    if (t?.method && t?.path) ((n = t.method), (r = t.path));
    else {
      let m = e.resolvedBlocks.find((h) => h.type === 'http');
      if (m) {
        let h = (0, Bs.parseHttpBlock)(m.content);
        h && ((n = h.method), (r = h.path));
      }
    }
    if (!n || !r) return null;
    let i =
        t?.operationId ||
        `${n.toLowerCase()}-${r
          .replace(/[{}\/]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')}`,
      o = e.resolvedBlocks.find((m) => m.type === 'omg.path'),
      s = e.resolvedBlocks.find((m) => m.type === 'omg.query'),
      a = e.resolvedBlocks.find((m) => m.type === 'omg.headers'),
      u = e.resolvedBlocks.find((m) => m.type === 'omg.body'),
      c = e.resolvedBlocks.filter((m) => m.type === 'omg.returns'),
      f = e.resolvedBlocks.filter(
        (m) => m.type === 'omg.response' || m.type.startsWith('omg.response.')
      ),
      p = {};
    for (let m of c)
      if (m.parsedResponses)
        for (let h of m.parsedResponses.responses)
          p[h.statusCode] = {
            schema: h.schema,
            condition: h.condition,
            description: h.description,
          };
    for (let m of f) {
      let h = m.statusCode || 200;
      m.parsed && (p[h] || (p[h] = { schema: m.parsed }));
    }
    return {
      method: n,
      path: r,
      operationId: i,
      tags: t?.tags || [],
      summary: t?.summary || e.title || '',
      description: e.description,
      deprecated: t?.deprecated || !1,
      follows: t?.follows || [],
      webhooks: t?.webhooks || {},
      parameters: { path: o?.parsed || null, query: s?.parsed || null, headers: a?.parsed || null },
      requestBody: u?.parsed || null,
      responses: p,
    };
  }
  function d1(e) {
    let t = Vt.dirname(e),
      n = tr.readFileSync(e, 'utf-8'),
      r = (0, Bs.parseDocument)(n, Vt.basename(e)),
      i = r.frontMatter,
      o = p1(t),
      s = [],
      a = {};
    for (let u of o) {
      let c = tr.readFileSync(u, 'utf-8'),
        f = (0, Bs.parseDocument)(c, Vt.relative(t, u)),
        p = al(f, { basePath: t }),
        m = p.resolvedBlocks.filter((A) => A.type === 'omg.type');
      for (let A of m) {
        let I = Pv(A.content);
        I && A.parsed && (a[I] = A.parsed);
      }
      let h = Ov(p);
      h && s.push(h);
    }
    return {
      name: i?.name || 'API',
      version: i?.version || '1.0.0',
      baseUrl: i?.baseUrl || '',
      description: r.description,
      endpoints: s,
      types: a,
    };
  }
  function p1(e) {
    let t = [];
    function n(r) {
      let i = tr.readdirSync(r, { withFileTypes: !0 });
      for (let o of i) {
        let s = Vt.join(r, o.name);
        o.isDirectory()
          ? o.name !== 'partials' && o.name !== 'node_modules' && n(s)
          : o.name.endsWith('.omg.md') && t.push(s);
      }
    }
    return (n(e), t);
  }
});
var Lv = O((Ze) => {
  'use strict';
  Object.defineProperty(Ze, '__esModule', { value: !0 });
  Ze.loadApi =
    Ze.buildEndpoint =
    Ze.resolveDocument =
    Ze.parseReturnsBlock =
    Ze.inferSchemaFromJson =
    Ze.parseSchema =
    Ze.parseHttpBlock =
    Ze.parseDocument =
      void 0;
  var Fv = tl();
  Object.defineProperty(Ze, 'parseDocument', {
    enumerable: !0,
    get: function () {
      return Fv.parseDocument;
    },
  });
  Object.defineProperty(Ze, 'parseHttpBlock', {
    enumerable: !0,
    get: function () {
      return Fv.parseHttpBlock;
    },
  });
  var Nv = Ei();
  Object.defineProperty(Ze, 'parseSchema', {
    enumerable: !0,
    get: function () {
      return Nv.parseSchema;
    },
  });
  Object.defineProperty(Ze, 'inferSchemaFromJson', {
    enumerable: !0,
    get: function () {
      return Nv.inferSchemaFromJson;
    },
  });
  var h1 = sl();
  Object.defineProperty(Ze, 'parseReturnsBlock', {
    enumerable: !0,
    get: function () {
      return h1.parseReturnsBlock;
    },
  });
  var ul = Iv();
  Object.defineProperty(Ze, 'resolveDocument', {
    enumerable: !0,
    get: function () {
      return ul.resolveDocument;
    },
  });
  Object.defineProperty(Ze, 'buildEndpoint', {
    enumerable: !0,
    get: function () {
      return ul.buildEndpoint;
    },
  });
  Object.defineProperty(Ze, 'loadApi', {
    enumerable: !0,
    get: function () {
      return ul.loadApi;
    },
  });
});
var K = Nn(em(), 1);
var is = class e {
    constructor(t, n, r, i) {
      ((this._uri = t),
        (this._languageId = n),
        (this._version = r),
        (this._content = i),
        (this._lineOffsets = void 0));
    }
    get uri() {
      return this._uri;
    }
    get languageId() {
      return this._languageId;
    }
    get version() {
      return this._version;
    }
    getText(t) {
      if (t) {
        let n = this.offsetAt(t.start),
          r = this.offsetAt(t.end);
        return this._content.substring(n, r);
      }
      return this._content;
    }
    update(t, n) {
      for (let r of t)
        if (e.isIncremental(r)) {
          let i = rm(r.range),
            o = this.offsetAt(i.start),
            s = this.offsetAt(i.end);
          this._content =
            this._content.substring(0, o) +
            r.text +
            this._content.substring(s, this._content.length);
          let a = Math.max(i.start.line, 0),
            u = Math.max(i.end.line, 0),
            c = this._lineOffsets,
            f = tm(r.text, !1, o);
          if (u - a === f.length) for (let m = 0, h = f.length; m < h; m++) c[m + a + 1] = f[m];
          else
            f.length < 1e4
              ? c.splice(a + 1, u - a, ...f)
              : (this._lineOffsets = c = c.slice(0, a + 1).concat(f, c.slice(u + 1)));
          let p = r.text.length - (s - o);
          if (p !== 0) for (let m = a + 1 + f.length, h = c.length; m < h; m++) c[m] = c[m] + p;
        } else if (e.isFull(r)) ((this._content = r.text), (this._lineOffsets = void 0));
        else throw new Error('Unknown change event received');
      this._version = n;
    }
    getLineOffsets() {
      return (
        this._lineOffsets === void 0 && (this._lineOffsets = tm(this._content, !0)),
        this._lineOffsets
      );
    }
    positionAt(t) {
      t = Math.max(Math.min(t, this._content.length), 0);
      let n = this.getLineOffsets(),
        r = 0,
        i = n.length;
      if (i === 0) return { line: 0, character: t };
      for (; r < i; ) {
        let s = Math.floor((r + i) / 2);
        n[s] > t ? (i = s) : (r = s + 1);
      }
      let o = r - 1;
      return ((t = this.ensureBeforeEOL(t, n[o])), { line: o, character: t - n[o] });
    }
    offsetAt(t) {
      let n = this.getLineOffsets();
      if (t.line >= n.length) return this._content.length;
      if (t.line < 0) return 0;
      let r = n[t.line];
      if (t.character <= 0) return r;
      let i = t.line + 1 < n.length ? n[t.line + 1] : this._content.length,
        o = Math.min(r + t.character, i);
      return this.ensureBeforeEOL(o, r);
    }
    ensureBeforeEOL(t, n) {
      for (; t > n && nm(this._content.charCodeAt(t - 1)); ) t--;
      return t;
    }
    get lineCount() {
      return this.getLineOffsets().length;
    }
    static isIncremental(t) {
      let n = t;
      return (
        n != null &&
        typeof n.text == 'string' &&
        n.range !== void 0 &&
        (n.rangeLength === void 0 || typeof n.rangeLength == 'number')
      );
    }
    static isFull(t) {
      let n = t;
      return (
        n != null && typeof n.text == 'string' && n.range === void 0 && n.rangeLength === void 0
      );
    }
  },
  os;
(function (e) {
  function t(i, o, s, a) {
    return new is(i, o, s, a);
  }
  e.create = t;
  function n(i, o, s) {
    if (i instanceof is) return (i.update(o, s), i);
    throw new Error('TextDocument.update: document must be created by TextDocument.create');
  }
  e.update = n;
  function r(i, o) {
    let s = i.getText(),
      a = Yu(o.map(Qw), (f, p) => {
        let m = f.range.start.line - p.range.start.line;
        return m === 0 ? f.range.start.character - p.range.start.character : m;
      }),
      u = 0,
      c = [];
    for (let f of a) {
      let p = i.offsetAt(f.range.start);
      if (p < u) throw new Error('Overlapping edit');
      (p > u && c.push(s.substring(u, p)),
        f.newText.length && c.push(f.newText),
        (u = i.offsetAt(f.range.end)));
    }
    return (c.push(s.substr(u)), c.join(''));
  }
  e.applyEdits = r;
})(os || (os = {}));
function Yu(e, t) {
  if (e.length <= 1) return e;
  let n = (e.length / 2) | 0,
    r = e.slice(0, n),
    i = e.slice(n);
  (Yu(r, t), Yu(i, t));
  let o = 0,
    s = 0,
    a = 0;
  for (; o < r.length && s < i.length; ) t(r[o], i[s]) <= 0 ? (e[a++] = r[o++]) : (e[a++] = i[s++]);
  for (; o < r.length; ) e[a++] = r[o++];
  for (; s < i.length; ) e[a++] = i[s++];
  return e;
}
function tm(e, t, n = 0) {
  let r = t ? [n] : [];
  for (let i = 0; i < e.length; i++) {
    let o = e.charCodeAt(i);
    nm(o) && (o === 13 && i + 1 < e.length && e.charCodeAt(i + 1) === 10 && i++, r.push(n + i + 1));
  }
  return r;
}
function nm(e) {
  return e === 13 || e === 10;
}
function rm(e) {
  let t = e.start,
    n = e.end;
  return t.line > n.line || (t.line === n.line && t.character > n.character)
    ? { start: n, end: t }
    : e;
}
function Qw(e) {
  let t = rm(e.range);
  return t !== e.range ? { newText: e.newText, range: t } : e;
}
var Ys = Nn(Lv(), 1);
var Fi = Nn(require('fs'), 1),
  Gr = Nn(require('path'), 1);
function Xv(e) {
  return typeof e > 'u' || e === null;
}
function m1(e) {
  return typeof e == 'object' && e !== null;
}
function g1(e) {
  return Array.isArray(e) ? e : Xv(e) ? [] : [e];
}
function y1(e, t) {
  var n, r, i, o;
  if (t) for (o = Object.keys(t), n = 0, r = o.length; n < r; n += 1) ((i = o[n]), (e[i] = t[i]));
  return e;
}
function b1(e, t) {
  var n = '',
    r;
  for (r = 0; r < t; r += 1) n += e;
  return n;
}
function v1(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var x1 = Xv,
  w1 = m1,
  k1 = g1,
  _1 = b1,
  S1 = v1,
  C1 = y1,
  Ve = { isNothing: x1, isObject: w1, toArray: k1, repeat: _1, isNegativeZero: S1, extend: C1 };
function e0(e, t) {
  var n = '',
    r = e.reason || '(unknown reason)';
  return e.mark
    ? (e.mark.name && (n += 'in "' + e.mark.name + '" '),
      (n += '(' + (e.mark.line + 1) + ':' + (e.mark.column + 1) + ')'),
      !t &&
        e.mark.snippet &&
        (n +=
          `

` + e.mark.snippet),
      r + ' ' + n)
    : r;
}
function Ai(e, t) {
  (Error.call(this),
    (this.name = 'YAMLException'),
    (this.reason = e),
    (this.mark = t),
    (this.message = e0(this, !1)),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack || ''));
}
Ai.prototype = Object.create(Error.prototype);
Ai.prototype.constructor = Ai;
Ai.prototype.toString = function (t) {
  return this.name + ': ' + e0(this, t);
};
var kt = Ai;
function cl(e, t, n, r, i) {
  var o = '',
    s = '',
    a = Math.floor(i / 2) - 1;
  return (
    r - t > a && ((o = ' ... '), (t = r - a + o.length)),
    n - r > a && ((s = ' ...'), (n = r + a - s.length)),
    { str: o + e.slice(t, n).replace(/\t/g, '\u2192') + s, pos: r - t + o.length }
  );
}
function ll(e, t) {
  return Ve.repeat(' ', t - e.length) + e;
}
function T1(e, t) {
  if (((t = Object.create(t || null)), !e.buffer)) return null;
  (t.maxLength || (t.maxLength = 79),
    typeof t.indent != 'number' && (t.indent = 1),
    typeof t.linesBefore != 'number' && (t.linesBefore = 3),
    typeof t.linesAfter != 'number' && (t.linesAfter = 2));
  for (var n = /\r?\n|\r|\0/g, r = [0], i = [], o, s = -1; (o = n.exec(e.buffer)); )
    (i.push(o.index),
      r.push(o.index + o[0].length),
      e.position <= o.index && s < 0 && (s = r.length - 2));
  s < 0 && (s = r.length - 1);
  var a = '',
    u,
    c,
    f = Math.min(e.line + t.linesAfter, i.length).toString().length,
    p = t.maxLength - (t.indent + f + 3);
  for (u = 1; u <= t.linesBefore && !(s - u < 0); u++)
    ((c = cl(e.buffer, r[s - u], i[s - u], e.position - (r[s] - r[s - u]), p)),
      (a =
        Ve.repeat(' ', t.indent) +
        ll((e.line - u + 1).toString(), f) +
        ' | ' +
        c.str +
        `
` +
        a));
  for (
    c = cl(e.buffer, r[s], i[s], e.position, p),
      a +=
        Ve.repeat(' ', t.indent) +
        ll((e.line + 1).toString(), f) +
        ' | ' +
        c.str +
        `
`,
      a +=
        Ve.repeat('-', t.indent + f + 3 + c.pos) +
        `^
`,
      u = 1;
    u <= t.linesAfter && !(s + u >= i.length);
    u++
  )
    ((c = cl(e.buffer, r[s + u], i[s + u], e.position - (r[s] - r[s + u]), p)),
      (a +=
        Ve.repeat(' ', t.indent) +
        ll((e.line + u + 1).toString(), f) +
        ' | ' +
        c.str +
        `
`));
  return a.replace(/\n$/, '');
}
var D1 = T1,
  E1 = [
    'kind',
    'multi',
    'resolve',
    'construct',
    'instanceOf',
    'predicate',
    'represent',
    'representName',
    'defaultStyle',
    'styleAliases',
  ],
  R1 = ['scalar', 'sequence', 'mapping'];
function A1(e) {
  var t = {};
  return (
    e !== null &&
      Object.keys(e).forEach(function (n) {
        e[n].forEach(function (r) {
          t[String(r)] = n;
        });
      }),
    t
  );
}
function q1(e, t) {
  if (
    ((t = t || {}),
    Object.keys(t).forEach(function (n) {
      if (E1.indexOf(n) === -1)
        throw new kt('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
    }),
    (this.options = t),
    (this.tag = e),
    (this.kind = t.kind || null),
    (this.resolve =
      t.resolve ||
      function () {
        return !0;
      }),
    (this.construct =
      t.construct ||
      function (n) {
        return n;
      }),
    (this.instanceOf = t.instanceOf || null),
    (this.predicate = t.predicate || null),
    (this.represent = t.represent || null),
    (this.representName = t.representName || null),
    (this.defaultStyle = t.defaultStyle || null),
    (this.multi = t.multi || !1),
    (this.styleAliases = A1(t.styleAliases || null)),
    R1.indexOf(this.kind) === -1)
  )
    throw new kt('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var ct = q1;
function Mv(e, t) {
  var n = [];
  return (
    e[t].forEach(function (r) {
      var i = n.length;
      (n.forEach(function (o, s) {
        o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (i = s);
      }),
        (n[i] = r));
    }),
    n
  );
}
function P1() {
  var e = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: { scalar: [], sequence: [], mapping: [], fallback: [] },
    },
    t,
    n;
  function r(i) {
    i.multi
      ? (e.multi[i.kind].push(i), e.multi.fallback.push(i))
      : (e[i.kind][i.tag] = e.fallback[i.tag] = i);
  }
  for (t = 0, n = arguments.length; t < n; t += 1) arguments[t].forEach(r);
  return e;
}
function dl(e) {
  return this.extend(e);
}
dl.prototype.extend = function (t) {
  var n = [],
    r = [];
  if (t instanceof ct) r.push(t);
  else if (Array.isArray(t)) r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    (t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit)));
  else
    throw new kt(
      'Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })'
    );
  (n.forEach(function (o) {
    if (!(o instanceof ct))
      throw new kt(
        'Specified list of YAML types (or a single Type object) contains a non-Type object.'
      );
    if (o.loadKind && o.loadKind !== 'scalar')
      throw new kt(
        'There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.'
      );
    if (o.multi)
      throw new kt(
        'There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.'
      );
  }),
    r.forEach(function (o) {
      if (!(o instanceof ct))
        throw new kt(
          'Specified list of YAML types (or a single Type object) contains a non-Type object.'
        );
    }));
  var i = Object.create(dl.prototype);
  return (
    (i.implicit = (this.implicit || []).concat(n)),
    (i.explicit = (this.explicit || []).concat(r)),
    (i.compiledImplicit = Mv(i, 'implicit')),
    (i.compiledExplicit = Mv(i, 'explicit')),
    (i.compiledTypeMap = P1(i.compiledImplicit, i.compiledExplicit)),
    i
  );
};
var O1 = dl,
  I1 = new ct('tag:yaml.org,2002:str', {
    kind: 'scalar',
    construct: function (e) {
      return e !== null ? e : '';
    },
  }),
  F1 = new ct('tag:yaml.org,2002:seq', {
    kind: 'sequence',
    construct: function (e) {
      return e !== null ? e : [];
    },
  }),
  N1 = new ct('tag:yaml.org,2002:map', {
    kind: 'mapping',
    construct: function (e) {
      return e !== null ? e : {};
    },
  }),
  L1 = new O1({ explicit: [I1, F1, N1] });
function M1(e) {
  if (e === null) return !0;
  var t = e.length;
  return (t === 1 && e === '~') || (t === 4 && (e === 'null' || e === 'Null' || e === 'NULL'));
}
function j1() {
  return null;
}
function B1(e) {
  return e === null;
}
var H1 = new ct('tag:yaml.org,2002:null', {
  kind: 'scalar',
  resolve: M1,
  construct: j1,
  predicate: B1,
  represent: {
    canonical: function () {
      return '~';
    },
    lowercase: function () {
      return 'null';
    },
    uppercase: function () {
      return 'NULL';
    },
    camelcase: function () {
      return 'Null';
    },
    empty: function () {
      return '';
    },
  },
  defaultStyle: 'lowercase',
});
function z1(e) {
  if (e === null) return !1;
  var t = e.length;
  return (
    (t === 4 && (e === 'true' || e === 'True' || e === 'TRUE')) ||
    (t === 5 && (e === 'false' || e === 'False' || e === 'FALSE'))
  );
}
function U1(e) {
  return e === 'true' || e === 'True' || e === 'TRUE';
}
function W1(e) {
  return Object.prototype.toString.call(e) === '[object Boolean]';
}
var V1 = new ct('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: z1,
  construct: U1,
  predicate: W1,
  represent: {
    lowercase: function (e) {
      return e ? 'true' : 'false';
    },
    uppercase: function (e) {
      return e ? 'TRUE' : 'FALSE';
    },
    camelcase: function (e) {
      return e ? 'True' : 'False';
    },
  },
  defaultStyle: 'lowercase',
});
function $1(e) {
  return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
}
function Y1(e) {
  return 48 <= e && e <= 55;
}
function G1(e) {
  return 48 <= e && e <= 57;
}
function K1(e) {
  if (e === null) return !1;
  var t = e.length,
    n = 0,
    r = !1,
    i;
  if (!t) return !1;
  if (((i = e[n]), (i === '-' || i === '+') && (i = e[++n]), i === '0')) {
    if (n + 1 === t) return !0;
    if (((i = e[++n]), i === 'b')) {
      for (n++; n < t; n++)
        if (((i = e[n]), i !== '_')) {
          if (i !== '0' && i !== '1') return !1;
          r = !0;
        }
      return r && i !== '_';
    }
    if (i === 'x') {
      for (n++; n < t; n++)
        if (((i = e[n]), i !== '_')) {
          if (!$1(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== '_';
    }
    if (i === 'o') {
      for (n++; n < t; n++)
        if (((i = e[n]), i !== '_')) {
          if (!Y1(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== '_';
    }
  }
  if (i === '_') return !1;
  for (; n < t; n++)
    if (((i = e[n]), i !== '_')) {
      if (!G1(e.charCodeAt(n))) return !1;
      r = !0;
    }
  return !(!r || i === '_');
}
function Q1(e) {
  var t = e,
    n = 1,
    r;
  if (
    (t.indexOf('_') !== -1 && (t = t.replace(/_/g, '')),
    (r = t[0]),
    (r === '-' || r === '+') && (r === '-' && (n = -1), (t = t.slice(1)), (r = t[0])),
    t === '0')
  )
    return 0;
  if (r === '0') {
    if (t[1] === 'b') return n * parseInt(t.slice(2), 2);
    if (t[1] === 'x') return n * parseInt(t.slice(2), 16);
    if (t[1] === 'o') return n * parseInt(t.slice(2), 8);
  }
  return n * parseInt(t, 10);
}
function J1(e) {
  return (
    Object.prototype.toString.call(e) === '[object Number]' && e % 1 === 0 && !Ve.isNegativeZero(e)
  );
}
var Z1 = new ct('tag:yaml.org,2002:int', {
    kind: 'scalar',
    resolve: K1,
    construct: Q1,
    predicate: J1,
    represent: {
      binary: function (e) {
        return e >= 0 ? '0b' + e.toString(2) : '-0b' + e.toString(2).slice(1);
      },
      octal: function (e) {
        return e >= 0 ? '0o' + e.toString(8) : '-0o' + e.toString(8).slice(1);
      },
      decimal: function (e) {
        return e.toString(10);
      },
      hexadecimal: function (e) {
        return e >= 0
          ? '0x' + e.toString(16).toUpperCase()
          : '-0x' + e.toString(16).toUpperCase().slice(1);
      },
    },
    defaultStyle: 'decimal',
    styleAliases: {
      binary: [2, 'bin'],
      octal: [8, 'oct'],
      decimal: [10, 'dec'],
      hexadecimal: [16, 'hex'],
    },
  }),
  X1 = new RegExp(
    '^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$'
  );
function eD(e) {
  return !(e === null || !X1.test(e) || e[e.length - 1] === '_');
}
function tD(e) {
  var t, n;
  return (
    (t = e.replace(/_/g, '').toLowerCase()),
    (n = t[0] === '-' ? -1 : 1),
    '+-'.indexOf(t[0]) >= 0 && (t = t.slice(1)),
    t === '.inf'
      ? n === 1
        ? Number.POSITIVE_INFINITY
        : Number.NEGATIVE_INFINITY
      : t === '.nan'
        ? NaN
        : n * parseFloat(t, 10)
  );
}
var nD = /^[-+]?[0-9]+e/;
function rD(e, t) {
  var n;
  if (isNaN(e))
    switch (t) {
      case 'lowercase':
        return '.nan';
      case 'uppercase':
        return '.NAN';
      case 'camelcase':
        return '.NaN';
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case 'lowercase':
        return '.inf';
      case 'uppercase':
        return '.INF';
      case 'camelcase':
        return '.Inf';
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case 'lowercase':
        return '-.inf';
      case 'uppercase':
        return '-.INF';
      case 'camelcase':
        return '-.Inf';
    }
  else if (Ve.isNegativeZero(e)) return '-0.0';
  return ((n = e.toString(10)), nD.test(n) ? n.replace('e', '.e') : n);
}
function iD(e) {
  return (
    Object.prototype.toString.call(e) === '[object Number]' && (e % 1 !== 0 || Ve.isNegativeZero(e))
  );
}
var oD = new ct('tag:yaml.org,2002:float', {
    kind: 'scalar',
    resolve: eD,
    construct: tD,
    predicate: iD,
    represent: rD,
    defaultStyle: 'lowercase',
  }),
  sD = L1.extend({ implicit: [H1, V1, Z1, oD] }),
  aD = sD,
  t0 = new RegExp('^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$'),
  n0 = new RegExp(
    '^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$'
  );
function uD(e) {
  return e === null ? !1 : t0.exec(e) !== null || n0.exec(e) !== null;
}
function cD(e) {
  var t,
    n,
    r,
    i,
    o,
    s,
    a,
    u = 0,
    c = null,
    f,
    p,
    m;
  if (((t = t0.exec(e)), t === null && (t = n0.exec(e)), t === null))
    throw new Error('Date resolve error');
  if (((n = +t[1]), (r = +t[2] - 1), (i = +t[3]), !t[4])) return new Date(Date.UTC(n, r, i));
  if (((o = +t[4]), (s = +t[5]), (a = +t[6]), t[7])) {
    for (u = t[7].slice(0, 3); u.length < 3; ) u += '0';
    u = +u;
  }
  return (
    t[9] && ((f = +t[10]), (p = +(t[11] || 0)), (c = (f * 60 + p) * 6e4), t[9] === '-' && (c = -c)),
    (m = new Date(Date.UTC(n, r, i, o, s, a, u))),
    c && m.setTime(m.getTime() - c),
    m
  );
}
function lD(e) {
  return e.toISOString();
}
var fD = new ct('tag:yaml.org,2002:timestamp', {
  kind: 'scalar',
  resolve: uD,
  construct: cD,
  instanceOf: Date,
  represent: lD,
});
function dD(e) {
  return e === '<<' || e === null;
}
var pD = new ct('tag:yaml.org,2002:merge', { kind: 'scalar', resolve: dD }),
  yl = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function hD(e) {
  if (e === null) return !1;
  var t,
    n,
    r = 0,
    i = e.length,
    o = yl;
  for (n = 0; n < i; n++)
    if (((t = o.indexOf(e.charAt(n))), !(t > 64))) {
      if (t < 0) return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function mD(e) {
  var t,
    n,
    r = e.replace(/[\r\n=]/g, ''),
    i = r.length,
    o = yl,
    s = 0,
    a = [];
  for (t = 0; t < i; t++)
    (t % 4 === 0 && t && (a.push((s >> 16) & 255), a.push((s >> 8) & 255), a.push(s & 255)),
      (s = (s << 6) | o.indexOf(r.charAt(t))));
  return (
    (n = (i % 4) * 6),
    n === 0
      ? (a.push((s >> 16) & 255), a.push((s >> 8) & 255), a.push(s & 255))
      : n === 18
        ? (a.push((s >> 10) & 255), a.push((s >> 2) & 255))
        : n === 12 && a.push((s >> 4) & 255),
    new Uint8Array(a)
  );
}
function gD(e) {
  var t = '',
    n = 0,
    r,
    i,
    o = e.length,
    s = yl;
  for (r = 0; r < o; r++)
    (r % 3 === 0 &&
      r &&
      ((t += s[(n >> 18) & 63]),
      (t += s[(n >> 12) & 63]),
      (t += s[(n >> 6) & 63]),
      (t += s[n & 63])),
      (n = (n << 8) + e[r]));
  return (
    (i = o % 3),
    i === 0
      ? ((t += s[(n >> 18) & 63]),
        (t += s[(n >> 12) & 63]),
        (t += s[(n >> 6) & 63]),
        (t += s[n & 63]))
      : i === 2
        ? ((t += s[(n >> 10) & 63]), (t += s[(n >> 4) & 63]), (t += s[(n << 2) & 63]), (t += s[64]))
        : i === 1 && ((t += s[(n >> 2) & 63]), (t += s[(n << 4) & 63]), (t += s[64]), (t += s[64])),
    t
  );
}
function yD(e) {
  return Object.prototype.toString.call(e) === '[object Uint8Array]';
}
var bD = new ct('tag:yaml.org,2002:binary', {
    kind: 'scalar',
    resolve: hD,
    construct: mD,
    predicate: yD,
    represent: gD,
  }),
  vD = Object.prototype.hasOwnProperty,
  xD = Object.prototype.toString;
function wD(e) {
  if (e === null) return !0;
  var t = [],
    n,
    r,
    i,
    o,
    s,
    a = e;
  for (n = 0, r = a.length; n < r; n += 1) {
    if (((i = a[n]), (s = !1), xD.call(i) !== '[object Object]')) return !1;
    for (o in i)
      if (vD.call(i, o))
        if (!s) s = !0;
        else return !1;
    if (!s) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function kD(e) {
  return e !== null ? e : [];
}
var _D = new ct('tag:yaml.org,2002:omap', { kind: 'sequence', resolve: wD, construct: kD }),
  SD = Object.prototype.toString;
function CD(e) {
  if (e === null) return !0;
  var t,
    n,
    r,
    i,
    o,
    s = e;
  for (o = new Array(s.length), t = 0, n = s.length; t < n; t += 1) {
    if (((r = s[t]), SD.call(r) !== '[object Object]' || ((i = Object.keys(r)), i.length !== 1)))
      return !1;
    o[t] = [i[0], r[i[0]]];
  }
  return !0;
}
function TD(e) {
  if (e === null) return [];
  var t,
    n,
    r,
    i,
    o,
    s = e;
  for (o = new Array(s.length), t = 0, n = s.length; t < n; t += 1)
    ((r = s[t]), (i = Object.keys(r)), (o[t] = [i[0], r[i[0]]]));
  return o;
}
var DD = new ct('tag:yaml.org,2002:pairs', { kind: 'sequence', resolve: CD, construct: TD }),
  ED = Object.prototype.hasOwnProperty;
function RD(e) {
  if (e === null) return !0;
  var t,
    n = e;
  for (t in n) if (ED.call(n, t) && n[t] !== null) return !1;
  return !0;
}
function AD(e) {
  return e !== null ? e : {};
}
var qD = new ct('tag:yaml.org,2002:set', { kind: 'mapping', resolve: RD, construct: AD }),
  r0 = aD.extend({ implicit: [fD, pD], explicit: [bD, _D, DD, qD] }),
  Pn = Object.prototype.hasOwnProperty,
  Hs = 1,
  i0 = 2,
  o0 = 3,
  zs = 4,
  fl = 1,
  PD = 2,
  jv = 3,
  OD =
    /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
  ID = /[\x85\u2028\u2029]/,
  FD = /[,\[\]\{\}]/,
  s0 = /^(?:!|!!|![a-z\-]+!)$/i,
  a0 = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Bv(e) {
  return Object.prototype.toString.call(e);
}
function Zt(e) {
  return e === 10 || e === 13;
}
function rr(e) {
  return e === 9 || e === 32;
}
function _t(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Vr(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function ND(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function LD(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function MD(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function Hv(e) {
  return e === 48
    ? '\0'
    : e === 97
      ? '\x07'
      : e === 98
        ? '\b'
        : e === 116 || e === 9
          ? '	'
          : e === 110
            ? `
`
            : e === 118
              ? '\v'
              : e === 102
                ? '\f'
                : e === 114
                  ? '\r'
                  : e === 101
                    ? '\x1B'
                    : e === 32
                      ? ' '
                      : e === 34
                        ? '"'
                        : e === 47
                          ? '/'
                          : e === 92
                            ? '\\'
                            : e === 78
                              ? '\x85'
                              : e === 95
                                ? '\xA0'
                                : e === 76
                                  ? '\u2028'
                                  : e === 80
                                    ? '\u2029'
                                    : '';
}
function jD(e) {
  return e <= 65535
    ? String.fromCharCode(e)
    : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
}
function u0(e, t, n) {
  t === '__proto__'
    ? Object.defineProperty(e, t, { configurable: !0, enumerable: !0, writable: !0, value: n })
    : (e[t] = n);
}
var c0 = new Array(256),
  l0 = new Array(256);
for (nr = 0; nr < 256; nr++) ((c0[nr] = Hv(nr) ? 1 : 0), (l0[nr] = Hv(nr)));
var nr;
function BD(e, t) {
  ((this.input = e),
    (this.filename = t.filename || null),
    (this.schema = t.schema || r0),
    (this.onWarning = t.onWarning || null),
    (this.legacy = t.legacy || !1),
    (this.json = t.json || !1),
    (this.listener = t.listener || null),
    (this.implicitTypes = this.schema.compiledImplicit),
    (this.typeMap = this.schema.compiledTypeMap),
    (this.length = e.length),
    (this.position = 0),
    (this.line = 0),
    (this.lineStart = 0),
    (this.lineIndent = 0),
    (this.firstTabInLine = -1),
    (this.documents = []));
}
function f0(e, t) {
  var n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart,
  };
  return ((n.snippet = D1(n)), new kt(t, n));
}
function G(e, t) {
  throw f0(e, t);
}
function Us(e, t) {
  e.onWarning && e.onWarning.call(null, f0(e, t));
}
var zv = {
  YAML: function (t, n, r) {
    var i, o, s;
    (t.version !== null && G(t, 'duplication of %YAML directive'),
      r.length !== 1 && G(t, 'YAML directive accepts exactly one argument'),
      (i = /^([0-9]+)\.([0-9]+)$/.exec(r[0])),
      i === null && G(t, 'ill-formed argument of the YAML directive'),
      (o = parseInt(i[1], 10)),
      (s = parseInt(i[2], 10)),
      o !== 1 && G(t, 'unacceptable YAML version of the document'),
      (t.version = r[0]),
      (t.checkLineBreaks = s < 2),
      s !== 1 && s !== 2 && Us(t, 'unsupported YAML version of the document'));
  },
  TAG: function (t, n, r) {
    var i, o;
    (r.length !== 2 && G(t, 'TAG directive accepts exactly two arguments'),
      (i = r[0]),
      (o = r[1]),
      s0.test(i) || G(t, 'ill-formed tag handle (first argument) of the TAG directive'),
      Pn.call(t.tagMap, i) &&
        G(t, 'there is a previously declared suffix for "' + i + '" tag handle'),
      a0.test(o) || G(t, 'ill-formed tag prefix (second argument) of the TAG directive'));
    try {
      o = decodeURIComponent(o);
    } catch {
      G(t, 'tag prefix is malformed: ' + o);
    }
    t.tagMap[i] = o;
  },
};
function qn(e, t, n, r) {
  var i, o, s, a;
  if (t < n) {
    if (((a = e.input.slice(t, n)), r))
      for (i = 0, o = a.length; i < o; i += 1)
        ((s = a.charCodeAt(i)),
          s === 9 || (32 <= s && s <= 1114111) || G(e, 'expected valid JSON character'));
    else OD.test(a) && G(e, 'the stream contains non-printable characters');
    e.result += a;
  }
}
function Uv(e, t, n, r) {
  var i, o, s, a;
  for (
    Ve.isObject(n) || G(e, 'cannot merge mappings; the provided source object is unacceptable'),
      i = Object.keys(n),
      s = 0,
      a = i.length;
    s < a;
    s += 1
  )
    ((o = i[s]), Pn.call(t, o) || (u0(t, o, n[o]), (r[o] = !0)));
}
function $r(e, t, n, r, i, o, s, a, u) {
  var c, f;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), c = 0, f = i.length; c < f; c += 1)
      (Array.isArray(i[c]) && G(e, 'nested arrays are not supported inside keys'),
        typeof i == 'object' && Bv(i[c]) === '[object Object]' && (i[c] = '[object Object]'));
  if (
    (typeof i == 'object' && Bv(i) === '[object Object]' && (i = '[object Object]'),
    (i = String(i)),
    t === null && (t = {}),
    r === 'tag:yaml.org,2002:merge')
  )
    if (Array.isArray(o)) for (c = 0, f = o.length; c < f; c += 1) Uv(e, t, o[c], n);
    else Uv(e, t, o, n);
  else
    (!e.json &&
      !Pn.call(n, i) &&
      Pn.call(t, i) &&
      ((e.line = s || e.line),
      (e.lineStart = a || e.lineStart),
      (e.position = u || e.position),
      G(e, 'duplicated mapping key')),
      u0(t, i, o),
      delete n[i]);
  return t;
}
function bl(e) {
  var t;
  ((t = e.input.charCodeAt(e.position)),
    t === 10
      ? e.position++
      : t === 13
        ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++)
        : G(e, 'a line break is expected'),
    (e.line += 1),
    (e.lineStart = e.position),
    (e.firstTabInLine = -1));
}
function He(e, t, n) {
  for (var r = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; rr(i); )
      (i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position),
        (i = e.input.charCodeAt(++e.position)));
    if (t && i === 35)
      do i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Zt(i))
      for (bl(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        (e.lineIndent++, (i = e.input.charCodeAt(++e.position)));
    else break;
  }
  return (n !== -1 && r !== 0 && e.lineIndent < n && Us(e, 'deficient indentation'), r);
}
function $s(e) {
  var t = e.position,
    n;
  return (
    (n = e.input.charCodeAt(t)),
    !!(
      (n === 45 || n === 46) &&
      n === e.input.charCodeAt(t + 1) &&
      n === e.input.charCodeAt(t + 2) &&
      ((t += 3), (n = e.input.charCodeAt(t)), n === 0 || _t(n))
    )
  );
}
function vl(e, t) {
  t === 1
    ? (e.result += ' ')
    : t > 1 &&
      (e.result += Ve.repeat(
        `
`,
        t - 1
      ));
}
function HD(e, t, n) {
  var r,
    i,
    o,
    s,
    a,
    u,
    c,
    f,
    p = e.kind,
    m = e.result,
    h;
  if (
    ((h = e.input.charCodeAt(e.position)),
    _t(h) ||
      Vr(h) ||
      h === 35 ||
      h === 38 ||
      h === 42 ||
      h === 33 ||
      h === 124 ||
      h === 62 ||
      h === 39 ||
      h === 34 ||
      h === 37 ||
      h === 64 ||
      h === 96 ||
      ((h === 63 || h === 45) && ((i = e.input.charCodeAt(e.position + 1)), _t(i) || (n && Vr(i)))))
  )
    return !1;
  for (e.kind = 'scalar', e.result = '', o = s = e.position, a = !1; h !== 0; ) {
    if (h === 58) {
      if (((i = e.input.charCodeAt(e.position + 1)), _t(i) || (n && Vr(i)))) break;
    } else if (h === 35) {
      if (((r = e.input.charCodeAt(e.position - 1)), _t(r))) break;
    } else {
      if ((e.position === e.lineStart && $s(e)) || (n && Vr(h))) break;
      if (Zt(h))
        if (
          ((u = e.line), (c = e.lineStart), (f = e.lineIndent), He(e, !1, -1), e.lineIndent >= t)
        ) {
          ((a = !0), (h = e.input.charCodeAt(e.position)));
          continue;
        } else {
          ((e.position = s), (e.line = u), (e.lineStart = c), (e.lineIndent = f));
          break;
        }
    }
    (a && (qn(e, o, s, !1), vl(e, e.line - u), (o = s = e.position), (a = !1)),
      rr(h) || (s = e.position + 1),
      (h = e.input.charCodeAt(++e.position)));
  }
  return (qn(e, o, s, !1), e.result ? !0 : ((e.kind = p), (e.result = m), !1));
}
function zD(e, t) {
  var n, r, i;
  if (((n = e.input.charCodeAt(e.position)), n !== 39)) return !1;
  for (
    e.kind = 'scalar', e.result = '', e.position++, r = i = e.position;
    (n = e.input.charCodeAt(e.position)) !== 0;
  )
    if (n === 39)
      if ((qn(e, r, e.position, !0), (n = e.input.charCodeAt(++e.position)), n === 39))
        ((r = e.position), e.position++, (i = e.position));
      else return !0;
    else
      Zt(n)
        ? (qn(e, r, i, !0), vl(e, He(e, !1, t)), (r = i = e.position))
        : e.position === e.lineStart && $s(e)
          ? G(e, 'unexpected end of the document within a single quoted scalar')
          : (e.position++, (i = e.position));
  G(e, 'unexpected end of the stream within a single quoted scalar');
}
function UD(e, t) {
  var n, r, i, o, s, a;
  if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
  for (
    e.kind = 'scalar', e.result = '', e.position++, n = r = e.position;
    (a = e.input.charCodeAt(e.position)) !== 0;
  ) {
    if (a === 34) return (qn(e, n, e.position, !0), e.position++, !0);
    if (a === 92) {
      if ((qn(e, n, e.position, !0), (a = e.input.charCodeAt(++e.position)), Zt(a))) He(e, !1, t);
      else if (a < 256 && c0[a]) ((e.result += l0[a]), e.position++);
      else if ((s = LD(a)) > 0) {
        for (i = s, o = 0; i > 0; i--)
          ((a = e.input.charCodeAt(++e.position)),
            (s = ND(a)) >= 0 ? (o = (o << 4) + s) : G(e, 'expected hexadecimal character'));
        ((e.result += jD(o)), e.position++);
      } else G(e, 'unknown escape sequence');
      n = r = e.position;
    } else
      Zt(a)
        ? (qn(e, n, r, !0), vl(e, He(e, !1, t)), (n = r = e.position))
        : e.position === e.lineStart && $s(e)
          ? G(e, 'unexpected end of the document within a double quoted scalar')
          : (e.position++, (r = e.position));
  }
  G(e, 'unexpected end of the stream within a double quoted scalar');
}
function WD(e, t) {
  var n = !0,
    r,
    i,
    o,
    s = e.tag,
    a,
    u = e.anchor,
    c,
    f,
    p,
    m,
    h,
    A = Object.create(null),
    I,
    L,
    q,
    S;
  if (((S = e.input.charCodeAt(e.position)), S === 91)) ((f = 93), (h = !1), (a = []));
  else if (S === 123) ((f = 125), (h = !0), (a = {}));
  else return !1;
  for (
    e.anchor !== null && (e.anchorMap[e.anchor] = a), S = e.input.charCodeAt(++e.position);
    S !== 0;
  ) {
    if ((He(e, !0, t), (S = e.input.charCodeAt(e.position)), S === f))
      return (
        e.position++,
        (e.tag = s),
        (e.anchor = u),
        (e.kind = h ? 'mapping' : 'sequence'),
        (e.result = a),
        !0
      );
    (n
      ? S === 44 && G(e, "expected the node content, but found ','")
      : G(e, 'missed comma between flow collection entries'),
      (L = I = q = null),
      (p = m = !1),
      S === 63 &&
        ((c = e.input.charCodeAt(e.position + 1)),
        _t(c) && ((p = m = !0), e.position++, He(e, !0, t))),
      (r = e.line),
      (i = e.lineStart),
      (o = e.position),
      Yr(e, t, Hs, !1, !0),
      (L = e.tag),
      (I = e.result),
      He(e, !0, t),
      (S = e.input.charCodeAt(e.position)),
      (m || e.line === r) &&
        S === 58 &&
        ((p = !0),
        (S = e.input.charCodeAt(++e.position)),
        He(e, !0, t),
        Yr(e, t, Hs, !1, !0),
        (q = e.result)),
      h ? $r(e, a, A, L, I, q, r, i, o) : p ? a.push($r(e, null, A, L, I, q, r, i, o)) : a.push(I),
      He(e, !0, t),
      (S = e.input.charCodeAt(e.position)),
      S === 44 ? ((n = !0), (S = e.input.charCodeAt(++e.position))) : (n = !1));
  }
  G(e, 'unexpected end of the stream within a flow collection');
}
function VD(e, t) {
  var n,
    r,
    i = fl,
    o = !1,
    s = !1,
    a = t,
    u = 0,
    c = !1,
    f,
    p;
  if (((p = e.input.charCodeAt(e.position)), p === 124)) r = !1;
  else if (p === 62) r = !0;
  else return !1;
  for (e.kind = 'scalar', e.result = ''; p !== 0; )
    if (((p = e.input.charCodeAt(++e.position)), p === 43 || p === 45))
      fl === i ? (i = p === 43 ? jv : PD) : G(e, 'repeat of a chomping mode identifier');
    else if ((f = MD(p)) >= 0)
      f === 0
        ? G(e, 'bad explicit indentation width of a block scalar; it cannot be less than one')
        : s
          ? G(e, 'repeat of an indentation width identifier')
          : ((a = t + f - 1), (s = !0));
    else break;
  if (rr(p)) {
    do p = e.input.charCodeAt(++e.position);
    while (rr(p));
    if (p === 35)
      do p = e.input.charCodeAt(++e.position);
      while (!Zt(p) && p !== 0);
  }
  for (; p !== 0; ) {
    for (
      bl(e), e.lineIndent = 0, p = e.input.charCodeAt(e.position);
      (!s || e.lineIndent < a) && p === 32;
    )
      (e.lineIndent++, (p = e.input.charCodeAt(++e.position)));
    if ((!s && e.lineIndent > a && (a = e.lineIndent), Zt(p))) {
      u++;
      continue;
    }
    if (e.lineIndent < a) {
      i === jv
        ? (e.result += Ve.repeat(
            `
`,
            o ? 1 + u : u
          ))
        : i === fl &&
          o &&
          (e.result += `
`);
      break;
    }
    for (
      r
        ? rr(p)
          ? ((c = !0),
            (e.result += Ve.repeat(
              `
`,
              o ? 1 + u : u
            )))
          : c
            ? ((c = !1),
              (e.result += Ve.repeat(
                `
`,
                u + 1
              )))
            : u === 0
              ? o && (e.result += ' ')
              : (e.result += Ve.repeat(
                  `
`,
                  u
                ))
        : (e.result += Ve.repeat(
            `
`,
            o ? 1 + u : u
          )),
        o = !0,
        s = !0,
        u = 0,
        n = e.position;
      !Zt(p) && p !== 0;
    )
      p = e.input.charCodeAt(++e.position);
    qn(e, n, e.position, !1);
  }
  return !0;
}
function Wv(e, t) {
  var n,
    r = e.tag,
    i = e.anchor,
    o = [],
    s,
    a = !1,
    u;
  if (e.firstTabInLine !== -1) return !1;
  for (
    e.anchor !== null && (e.anchorMap[e.anchor] = o), u = e.input.charCodeAt(e.position);
    u !== 0 &&
    (e.firstTabInLine !== -1 &&
      ((e.position = e.firstTabInLine), G(e, 'tab characters must not be used in indentation')),
    !(u !== 45 || ((s = e.input.charCodeAt(e.position + 1)), !_t(s))));
  ) {
    if (((a = !0), e.position++, He(e, !0, -1) && e.lineIndent <= t)) {
      (o.push(null), (u = e.input.charCodeAt(e.position)));
      continue;
    }
    if (
      ((n = e.line),
      Yr(e, t, o0, !1, !0),
      o.push(e.result),
      He(e, !0, -1),
      (u = e.input.charCodeAt(e.position)),
      (e.line === n || e.lineIndent > t) && u !== 0)
    )
      G(e, 'bad indentation of a sequence entry');
    else if (e.lineIndent < t) break;
  }
  return a ? ((e.tag = r), (e.anchor = i), (e.kind = 'sequence'), (e.result = o), !0) : !1;
}
function $D(e, t, n) {
  var r,
    i,
    o,
    s,
    a,
    u,
    c = e.tag,
    f = e.anchor,
    p = {},
    m = Object.create(null),
    h = null,
    A = null,
    I = null,
    L = !1,
    q = !1,
    S;
  if (e.firstTabInLine !== -1) return !1;
  for (
    e.anchor !== null && (e.anchorMap[e.anchor] = p), S = e.input.charCodeAt(e.position);
    S !== 0;
  ) {
    if (
      (!L &&
        e.firstTabInLine !== -1 &&
        ((e.position = e.firstTabInLine), G(e, 'tab characters must not be used in indentation')),
      (r = e.input.charCodeAt(e.position + 1)),
      (o = e.line),
      (S === 63 || S === 58) && _t(r))
    )
      (S === 63
        ? (L && ($r(e, p, m, h, A, null, s, a, u), (h = A = I = null)),
          (q = !0),
          (L = !0),
          (i = !0))
        : L
          ? ((L = !1), (i = !0))
          : G(
              e,
              'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line'
            ),
        (e.position += 1),
        (S = r));
    else {
      if (((s = e.line), (a = e.lineStart), (u = e.position), !Yr(e, n, i0, !1, !0))) break;
      if (e.line === o) {
        for (S = e.input.charCodeAt(e.position); rr(S); ) S = e.input.charCodeAt(++e.position);
        if (S === 58)
          ((S = e.input.charCodeAt(++e.position)),
            _t(S) ||
              G(
                e,
                'a whitespace character is expected after the key-value separator within a block mapping'
              ),
            L && ($r(e, p, m, h, A, null, s, a, u), (h = A = I = null)),
            (q = !0),
            (L = !1),
            (i = !1),
            (h = e.tag),
            (A = e.result));
        else if (q) G(e, 'can not read an implicit mapping pair; a colon is missed');
        else return ((e.tag = c), (e.anchor = f), !0);
      } else if (q)
        G(e, 'can not read a block mapping entry; a multiline key may not be an implicit key');
      else return ((e.tag = c), (e.anchor = f), !0);
    }
    if (
      ((e.line === o || e.lineIndent > t) &&
        (L && ((s = e.line), (a = e.lineStart), (u = e.position)),
        Yr(e, t, zs, !0, i) && (L ? (A = e.result) : (I = e.result)),
        L || ($r(e, p, m, h, A, I, s, a, u), (h = A = I = null)),
        He(e, !0, -1),
        (S = e.input.charCodeAt(e.position))),
      (e.line === o || e.lineIndent > t) && S !== 0)
    )
      G(e, 'bad indentation of a mapping entry');
    else if (e.lineIndent < t) break;
  }
  return (
    L && $r(e, p, m, h, A, null, s, a, u),
    q && ((e.tag = c), (e.anchor = f), (e.kind = 'mapping'), (e.result = p)),
    q
  );
}
function YD(e) {
  var t,
    n = !1,
    r = !1,
    i,
    o,
    s;
  if (((s = e.input.charCodeAt(e.position)), s !== 33)) return !1;
  if (
    (e.tag !== null && G(e, 'duplication of a tag property'),
    (s = e.input.charCodeAt(++e.position)),
    s === 60
      ? ((n = !0), (s = e.input.charCodeAt(++e.position)))
      : s === 33
        ? ((r = !0), (i = '!!'), (s = e.input.charCodeAt(++e.position)))
        : (i = '!'),
    (t = e.position),
    n)
  ) {
    do s = e.input.charCodeAt(++e.position);
    while (s !== 0 && s !== 62);
    e.position < e.length
      ? ((o = e.input.slice(t, e.position)), (s = e.input.charCodeAt(++e.position)))
      : G(e, 'unexpected end of the stream within a verbatim tag');
  } else {
    for (; s !== 0 && !_t(s); )
      (s === 33 &&
        (r
          ? G(e, 'tag suffix cannot contain exclamation marks')
          : ((i = e.input.slice(t - 1, e.position + 1)),
            s0.test(i) || G(e, 'named tag handle cannot contain such characters'),
            (r = !0),
            (t = e.position + 1))),
        (s = e.input.charCodeAt(++e.position)));
    ((o = e.input.slice(t, e.position)),
      FD.test(o) && G(e, 'tag suffix cannot contain flow indicator characters'));
  }
  o && !a0.test(o) && G(e, 'tag name cannot contain such characters: ' + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    G(e, 'tag name is malformed: ' + o);
  }
  return (
    n
      ? (e.tag = o)
      : Pn.call(e.tagMap, i)
        ? (e.tag = e.tagMap[i] + o)
        : i === '!'
          ? (e.tag = '!' + o)
          : i === '!!'
            ? (e.tag = 'tag:yaml.org,2002:' + o)
            : G(e, 'undeclared tag handle "' + i + '"'),
    !0
  );
}
function GD(e) {
  var t, n;
  if (((n = e.input.charCodeAt(e.position)), n !== 38)) return !1;
  for (
    e.anchor !== null && G(e, 'duplication of an anchor property'),
      n = e.input.charCodeAt(++e.position),
      t = e.position;
    n !== 0 && !_t(n) && !Vr(n);
  )
    n = e.input.charCodeAt(++e.position);
  return (
    e.position === t && G(e, 'name of an anchor node must contain at least one character'),
    (e.anchor = e.input.slice(t, e.position)),
    !0
  );
}
function KD(e) {
  var t, n, r;
  if (((r = e.input.charCodeAt(e.position)), r !== 42)) return !1;
  for (r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !_t(r) && !Vr(r); )
    r = e.input.charCodeAt(++e.position);
  return (
    e.position === t && G(e, 'name of an alias node must contain at least one character'),
    (n = e.input.slice(t, e.position)),
    Pn.call(e.anchorMap, n) || G(e, 'unidentified alias "' + n + '"'),
    (e.result = e.anchorMap[n]),
    He(e, !0, -1),
    !0
  );
}
function Yr(e, t, n, r, i) {
  var o,
    s,
    a,
    u = 1,
    c = !1,
    f = !1,
    p,
    m,
    h,
    A,
    I,
    L;
  if (
    (e.listener !== null && e.listener('open', e),
    (e.tag = null),
    (e.anchor = null),
    (e.kind = null),
    (e.result = null),
    (o = s = a = zs === n || o0 === n),
    r &&
      He(e, !0, -1) &&
      ((c = !0),
      e.lineIndent > t ? (u = 1) : e.lineIndent === t ? (u = 0) : e.lineIndent < t && (u = -1)),
    u === 1)
  )
    for (; YD(e) || GD(e); )
      He(e, !0, -1)
        ? ((c = !0),
          (a = o),
          e.lineIndent > t ? (u = 1) : e.lineIndent === t ? (u = 0) : e.lineIndent < t && (u = -1))
        : (a = !1);
  if (
    (a && (a = c || i),
    (u === 1 || zs === n) &&
      (Hs === n || i0 === n ? (I = t) : (I = t + 1),
      (L = e.position - e.lineStart),
      u === 1
        ? (a && (Wv(e, L) || $D(e, L, I))) || WD(e, I)
          ? (f = !0)
          : ((s && VD(e, I)) || zD(e, I) || UD(e, I)
              ? (f = !0)
              : KD(e)
                ? ((f = !0),
                  (e.tag !== null || e.anchor !== null) &&
                    G(e, 'alias node should not have any properties'))
                : HD(e, I, Hs === n) && ((f = !0), e.tag === null && (e.tag = '?')),
            e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
        : u === 0 && (f = a && Wv(e, L))),
    e.tag === null)
  )
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === '?') {
    for (
      e.result !== null &&
        e.kind !== 'scalar' &&
        G(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'),
        p = 0,
        m = e.implicitTypes.length;
      p < m;
      p += 1
    )
      if (((A = e.implicitTypes[p]), A.resolve(e.result))) {
        ((e.result = A.construct(e.result)),
          (e.tag = A.tag),
          e.anchor !== null && (e.anchorMap[e.anchor] = e.result));
        break;
      }
  } else if (e.tag !== '!') {
    if (Pn.call(e.typeMap[e.kind || 'fallback'], e.tag)) A = e.typeMap[e.kind || 'fallback'][e.tag];
    else
      for (A = null, h = e.typeMap.multi[e.kind || 'fallback'], p = 0, m = h.length; p < m; p += 1)
        if (e.tag.slice(0, h[p].tag.length) === h[p].tag) {
          A = h[p];
          break;
        }
    (A || G(e, 'unknown tag !<' + e.tag + '>'),
      e.result !== null &&
        A.kind !== e.kind &&
        G(
          e,
          'unacceptable node kind for !<' +
            e.tag +
            '> tag; it should be "' +
            A.kind +
            '", not "' +
            e.kind +
            '"'
        ),
      A.resolve(e.result, e.tag)
        ? ((e.result = A.construct(e.result, e.tag)),
          e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
        : G(e, 'cannot resolve a node with !<' + e.tag + '> explicit tag'));
  }
  return (e.listener !== null && e.listener('close', e), e.tag !== null || e.anchor !== null || f);
}
function QD(e) {
  var t = e.position,
    n,
    r,
    i,
    o = !1,
    s;
  for (
    e.version = null,
      e.checkLineBreaks = e.legacy,
      e.tagMap = Object.create(null),
      e.anchorMap = Object.create(null);
    (s = e.input.charCodeAt(e.position)) !== 0 &&
    (He(e, !0, -1), (s = e.input.charCodeAt(e.position)), !(e.lineIndent > 0 || s !== 37));
  ) {
    for (o = !0, s = e.input.charCodeAt(++e.position), n = e.position; s !== 0 && !_t(s); )
      s = e.input.charCodeAt(++e.position);
    for (
      r = e.input.slice(n, e.position),
        i = [],
        r.length < 1 && G(e, 'directive name must not be less than one character in length');
      s !== 0;
    ) {
      for (; rr(s); ) s = e.input.charCodeAt(++e.position);
      if (s === 35) {
        do s = e.input.charCodeAt(++e.position);
        while (s !== 0 && !Zt(s));
        break;
      }
      if (Zt(s)) break;
      for (n = e.position; s !== 0 && !_t(s); ) s = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(n, e.position));
    }
    (s !== 0 && bl(e),
      Pn.call(zv, r) ? zv[r](e, r, i) : Us(e, 'unknown document directive "' + r + '"'));
  }
  if (
    (He(e, !0, -1),
    e.lineIndent === 0 &&
    e.input.charCodeAt(e.position) === 45 &&
    e.input.charCodeAt(e.position + 1) === 45 &&
    e.input.charCodeAt(e.position + 2) === 45
      ? ((e.position += 3), He(e, !0, -1))
      : o && G(e, 'directives end mark is expected'),
    Yr(e, e.lineIndent - 1, zs, !1, !0),
    He(e, !0, -1),
    e.checkLineBreaks &&
      ID.test(e.input.slice(t, e.position)) &&
      Us(e, 'non-ASCII line breaks are interpreted as content'),
    e.documents.push(e.result),
    e.position === e.lineStart && $s(e))
  ) {
    e.input.charCodeAt(e.position) === 46 && ((e.position += 3), He(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1) G(e, 'end of the stream or a document separator is expected');
  else return;
}
function d0(e, t) {
  ((e = String(e)),
    (t = t || {}),
    e.length !== 0 &&
      (e.charCodeAt(e.length - 1) !== 10 &&
        e.charCodeAt(e.length - 1) !== 13 &&
        (e += `
`),
      e.charCodeAt(0) === 65279 && (e = e.slice(1))));
  var n = new BD(e, t),
    r = e.indexOf('\0');
  for (
    r !== -1 && ((n.position = r), G(n, 'null byte is not allowed in input')), n.input += '\0';
    n.input.charCodeAt(n.position) === 32;
  )
    ((n.lineIndent += 1), (n.position += 1));
  for (; n.position < n.length - 1; ) QD(n);
  return n.documents;
}
function JD(e, t, n) {
  t !== null && typeof t == 'object' && typeof n > 'u' && ((n = t), (t = null));
  var r = d0(e, n);
  if (typeof t != 'function') return r;
  for (var i = 0, o = r.length; i < o; i += 1) t(r[i]);
}
function ZD(e, t) {
  var n = d0(e, t);
  if (n.length !== 0) {
    if (n.length === 1) return n[0];
    throw new kt('expected a single document in the stream, but found more');
  }
}
var XD = JD,
  eE = ZD,
  p0 = { loadAll: XD, load: eE },
  h0 = Object.prototype.toString,
  m0 = Object.prototype.hasOwnProperty,
  xl = 65279,
  tE = 9,
  qi = 10,
  nE = 13,
  rE = 32,
  iE = 33,
  oE = 34,
  pl = 35,
  sE = 37,
  aE = 38,
  uE = 39,
  cE = 42,
  g0 = 44,
  lE = 45,
  Ws = 58,
  fE = 61,
  dE = 62,
  pE = 63,
  hE = 64,
  y0 = 91,
  b0 = 93,
  mE = 96,
  v0 = 123,
  gE = 124,
  x0 = 125,
  lt = {};
lt[0] = '\\0';
lt[7] = '\\a';
lt[8] = '\\b';
lt[9] = '\\t';
lt[10] = '\\n';
lt[11] = '\\v';
lt[12] = '\\f';
lt[13] = '\\r';
lt[27] = '\\e';
lt[34] = '\\"';
lt[92] = '\\\\';
lt[133] = '\\N';
lt[160] = '\\_';
lt[8232] = '\\L';
lt[8233] = '\\P';
var yE = [
    'y',
    'Y',
    'yes',
    'Yes',
    'YES',
    'on',
    'On',
    'ON',
    'n',
    'N',
    'no',
    'No',
    'NO',
    'off',
    'Off',
    'OFF',
  ],
  bE = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function vE(e, t) {
  var n, r, i, o, s, a, u;
  if (t === null) return {};
  for (n = {}, r = Object.keys(t), i = 0, o = r.length; i < o; i += 1)
    ((s = r[i]),
      (a = String(t[s])),
      s.slice(0, 2) === '!!' && (s = 'tag:yaml.org,2002:' + s.slice(2)),
      (u = e.compiledTypeMap.fallback[s]),
      u && m0.call(u.styleAliases, a) && (a = u.styleAliases[a]),
      (n[s] = a));
  return n;
}
function xE(e) {
  var t, n, r;
  if (((t = e.toString(16).toUpperCase()), e <= 255)) ((n = 'x'), (r = 2));
  else if (e <= 65535) ((n = 'u'), (r = 4));
  else if (e <= 4294967295) ((n = 'U'), (r = 8));
  else throw new kt('code point within a string may not be greater than 0xFFFFFFFF');
  return '\\' + n + Ve.repeat('0', r - t.length) + t;
}
var wE = 1,
  Pi = 2;
function kE(e) {
  ((this.schema = e.schema || r0),
    (this.indent = Math.max(1, e.indent || 2)),
    (this.noArrayIndent = e.noArrayIndent || !1),
    (this.skipInvalid = e.skipInvalid || !1),
    (this.flowLevel = Ve.isNothing(e.flowLevel) ? -1 : e.flowLevel),
    (this.styleMap = vE(this.schema, e.styles || null)),
    (this.sortKeys = e.sortKeys || !1),
    (this.lineWidth = e.lineWidth || 80),
    (this.noRefs = e.noRefs || !1),
    (this.noCompatMode = e.noCompatMode || !1),
    (this.condenseFlow = e.condenseFlow || !1),
    (this.quotingType = e.quotingType === '"' ? Pi : wE),
    (this.forceQuotes = e.forceQuotes || !1),
    (this.replacer = typeof e.replacer == 'function' ? e.replacer : null),
    (this.implicitTypes = this.schema.compiledImplicit),
    (this.explicitTypes = this.schema.compiledExplicit),
    (this.tag = null),
    (this.result = ''),
    (this.duplicates = []),
    (this.usedDuplicates = null));
}
function Vv(e, t) {
  for (var n = Ve.repeat(' ', t), r = 0, i = -1, o = '', s, a = e.length; r < a; )
    ((i = e.indexOf(
      `
`,
      r
    )),
      i === -1 ? ((s = e.slice(r)), (r = a)) : ((s = e.slice(r, i + 1)), (r = i + 1)),
      s.length &&
        s !==
          `
` &&
        (o += n),
      (o += s));
  return o;
}
function hl(e, t) {
  return (
    `
` + Ve.repeat(' ', e.indent * t)
  );
}
function _E(e, t) {
  var n, r, i;
  for (n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (((i = e.implicitTypes[n]), i.resolve(t))) return !0;
  return !1;
}
function Vs(e) {
  return e === rE || e === tE;
}
function Oi(e) {
  return (
    (32 <= e && e <= 126) ||
    (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
    (57344 <= e && e <= 65533 && e !== xl) ||
    (65536 <= e && e <= 1114111)
  );
}
function $v(e) {
  return Oi(e) && e !== xl && e !== nE && e !== qi;
}
function Yv(e, t, n) {
  var r = $v(e),
    i = r && !Vs(e);
  return (
    ((n ? r : r && e !== g0 && e !== y0 && e !== b0 && e !== v0 && e !== x0) &&
      e !== pl &&
      !(t === Ws && !i)) ||
    ($v(t) && !Vs(t) && e === pl) ||
    (t === Ws && i)
  );
}
function SE(e) {
  return (
    Oi(e) &&
    e !== xl &&
    !Vs(e) &&
    e !== lE &&
    e !== pE &&
    e !== Ws &&
    e !== g0 &&
    e !== y0 &&
    e !== b0 &&
    e !== v0 &&
    e !== x0 &&
    e !== pl &&
    e !== aE &&
    e !== cE &&
    e !== iE &&
    e !== gE &&
    e !== fE &&
    e !== dE &&
    e !== uE &&
    e !== oE &&
    e !== sE &&
    e !== hE &&
    e !== mE
  );
}
function CE(e) {
  return !Vs(e) && e !== Ws;
}
function Ri(e, t) {
  var n = e.charCodeAt(t),
    r;
  return n >= 55296 &&
    n <= 56319 &&
    t + 1 < e.length &&
    ((r = e.charCodeAt(t + 1)), r >= 56320 && r <= 57343)
    ? (n - 55296) * 1024 + r - 56320 + 65536
    : n;
}
function w0(e) {
  var t = /^\n* /;
  return t.test(e);
}
var k0 = 1,
  ml = 2,
  _0 = 3,
  S0 = 4,
  Wr = 5;
function TE(e, t, n, r, i, o, s, a) {
  var u,
    c = 0,
    f = null,
    p = !1,
    m = !1,
    h = r !== -1,
    A = -1,
    I = SE(Ri(e, 0)) && CE(Ri(e, e.length - 1));
  if (t || s)
    for (u = 0; u < e.length; c >= 65536 ? (u += 2) : u++) {
      if (((c = Ri(e, u)), !Oi(c))) return Wr;
      ((I = I && Yv(c, f, a)), (f = c));
    }
  else {
    for (u = 0; u < e.length; c >= 65536 ? (u += 2) : u++) {
      if (((c = Ri(e, u)), c === qi))
        ((p = !0), h && ((m = m || (u - A - 1 > r && e[A + 1] !== ' ')), (A = u)));
      else if (!Oi(c)) return Wr;
      ((I = I && Yv(c, f, a)), (f = c));
    }
    m = m || (h && u - A - 1 > r && e[A + 1] !== ' ');
  }
  return !p && !m
    ? I && !s && !i(e)
      ? k0
      : o === Pi
        ? Wr
        : ml
    : n > 9 && w0(e)
      ? Wr
      : s
        ? o === Pi
          ? Wr
          : ml
        : m
          ? S0
          : _0;
}
function DE(e, t, n, r, i) {
  e.dump = (function () {
    if (t.length === 0) return e.quotingType === Pi ? '""' : "''";
    if (!e.noCompatMode && (yE.indexOf(t) !== -1 || bE.test(t)))
      return e.quotingType === Pi ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, n),
      s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o),
      a = r || (e.flowLevel > -1 && n >= e.flowLevel);
    function u(c) {
      return _E(e, c);
    }
    switch (TE(t, a, e.indent, s, u, e.quotingType, e.forceQuotes && !r, i)) {
      case k0:
        return t;
      case ml:
        return "'" + t.replace(/'/g, "''") + "'";
      case _0:
        return '|' + Gv(t, e.indent) + Kv(Vv(t, o));
      case S0:
        return '>' + Gv(t, e.indent) + Kv(Vv(EE(t, s), o));
      case Wr:
        return '"' + RE(t) + '"';
      default:
        throw new kt('impossible error: invalid scalar style');
    }
  })();
}
function Gv(e, t) {
  var n = w0(e) ? String(t) : '',
    r =
      e[e.length - 1] ===
      `
`,
    i =
      r &&
      (e[e.length - 2] ===
        `
` ||
        e ===
          `
`),
    o = i ? '+' : r ? '' : '-';
  return (
    n +
    o +
    `
`
  );
}
function Kv(e) {
  return e[e.length - 1] ===
    `
`
    ? e.slice(0, -1)
    : e;
}
function EE(e, t) {
  for (
    var n = /(\n+)([^\n]*)/g,
      r = (function () {
        var c = e.indexOf(`
`);
        return ((c = c !== -1 ? c : e.length), (n.lastIndex = c), Qv(e.slice(0, c), t));
      })(),
      i =
        e[0] ===
          `
` || e[0] === ' ',
      o,
      s;
    (s = n.exec(e));
  ) {
    var a = s[1],
      u = s[2];
    ((o = u[0] === ' '),
      (r +=
        a +
        (!i && !o && u !== ''
          ? `
`
          : '') +
        Qv(u, t)),
      (i = o));
  }
  return r;
}
function Qv(e, t) {
  if (e === '' || e[0] === ' ') return e;
  for (var n = / [^ ]/g, r, i = 0, o, s = 0, a = 0, u = ''; (r = n.exec(e)); )
    ((a = r.index),
      a - i > t &&
        ((o = s > i ? s : a),
        (u +=
          `
` + e.slice(i, o)),
        (i = o + 1)),
      (s = a));
  return (
    (u += `
`),
    e.length - i > t && s > i
      ? (u +=
          e.slice(i, s) +
          `
` +
          e.slice(s + 1))
      : (u += e.slice(i)),
    u.slice(1)
  );
}
function RE(e) {
  for (var t = '', n = 0, r, i = 0; i < e.length; n >= 65536 ? (i += 2) : i++)
    ((n = Ri(e, i)),
      (r = lt[n]),
      !r && Oi(n) ? ((t += e[i]), n >= 65536 && (t += e[i + 1])) : (t += r || xE(n)));
  return t;
}
function AE(e, t, n) {
  var r = '',
    i = e.tag,
    o,
    s,
    a;
  for (o = 0, s = n.length; o < s; o += 1)
    ((a = n[o]),
      e.replacer && (a = e.replacer.call(n, String(o), a)),
      (un(e, t, a, !1, !1) || (typeof a > 'u' && un(e, t, null, !1, !1))) &&
        (r !== '' && (r += ',' + (e.condenseFlow ? '' : ' ')), (r += e.dump)));
  ((e.tag = i), (e.dump = '[' + r + ']'));
}
function Jv(e, t, n, r) {
  var i = '',
    o = e.tag,
    s,
    a,
    u;
  for (s = 0, a = n.length; s < a; s += 1)
    ((u = n[s]),
      e.replacer && (u = e.replacer.call(n, String(s), u)),
      (un(e, t + 1, u, !0, !0, !1, !0) || (typeof u > 'u' && un(e, t + 1, null, !0, !0, !1, !0))) &&
        ((!r || i !== '') && (i += hl(e, t)),
        e.dump && qi === e.dump.charCodeAt(0) ? (i += '-') : (i += '- '),
        (i += e.dump)));
  ((e.tag = o), (e.dump = i || '[]'));
}
function qE(e, t, n) {
  var r = '',
    i = e.tag,
    o = Object.keys(n),
    s,
    a,
    u,
    c,
    f;
  for (s = 0, a = o.length; s < a; s += 1)
    ((f = ''),
      r !== '' && (f += ', '),
      e.condenseFlow && (f += '"'),
      (u = o[s]),
      (c = n[u]),
      e.replacer && (c = e.replacer.call(n, u, c)),
      un(e, t, u, !1, !1) &&
        (e.dump.length > 1024 && (f += '? '),
        (f += e.dump + (e.condenseFlow ? '"' : '') + ':' + (e.condenseFlow ? '' : ' ')),
        un(e, t, c, !1, !1) && ((f += e.dump), (r += f))));
  ((e.tag = i), (e.dump = '{' + r + '}'));
}
function PE(e, t, n, r) {
  var i = '',
    o = e.tag,
    s = Object.keys(n),
    a,
    u,
    c,
    f,
    p,
    m;
  if (e.sortKeys === !0) s.sort();
  else if (typeof e.sortKeys == 'function') s.sort(e.sortKeys);
  else if (e.sortKeys) throw new kt('sortKeys must be a boolean or a function');
  for (a = 0, u = s.length; a < u; a += 1)
    ((m = ''),
      (!r || i !== '') && (m += hl(e, t)),
      (c = s[a]),
      (f = n[c]),
      e.replacer && (f = e.replacer.call(n, c, f)),
      un(e, t + 1, c, !0, !0, !0) &&
        ((p = (e.tag !== null && e.tag !== '?') || (e.dump && e.dump.length > 1024)),
        p && (e.dump && qi === e.dump.charCodeAt(0) ? (m += '?') : (m += '? ')),
        (m += e.dump),
        p && (m += hl(e, t)),
        un(e, t + 1, f, !0, p) &&
          (e.dump && qi === e.dump.charCodeAt(0) ? (m += ':') : (m += ': '),
          (m += e.dump),
          (i += m))));
  ((e.tag = o), (e.dump = i || '{}'));
}
function Zv(e, t, n) {
  var r, i, o, s, a, u;
  for (i = n ? e.explicitTypes : e.implicitTypes, o = 0, s = i.length; o < s; o += 1)
    if (
      ((a = i[o]),
      (a.instanceOf || a.predicate) &&
        (!a.instanceOf || (typeof t == 'object' && t instanceof a.instanceOf)) &&
        (!a.predicate || a.predicate(t)))
    ) {
      if (
        (n
          ? a.multi && a.representName
            ? (e.tag = a.representName(t))
            : (e.tag = a.tag)
          : (e.tag = '?'),
        a.represent)
      ) {
        if (
          ((u = e.styleMap[a.tag] || a.defaultStyle), h0.call(a.represent) === '[object Function]')
        )
          r = a.represent(t, u);
        else if (m0.call(a.represent, u)) r = a.represent[u](t, u);
        else throw new kt('!<' + a.tag + '> tag resolver accepts not "' + u + '" style');
        e.dump = r;
      }
      return !0;
    }
  return !1;
}
function un(e, t, n, r, i, o, s) {
  ((e.tag = null), (e.dump = n), Zv(e, n, !1) || Zv(e, n, !0));
  var a = h0.call(e.dump),
    u = r,
    c;
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  var f = a === '[object Object]' || a === '[object Array]',
    p,
    m;
  if (
    (f && ((p = e.duplicates.indexOf(n)), (m = p !== -1)),
    ((e.tag !== null && e.tag !== '?') || m || (e.indent !== 2 && t > 0)) && (i = !1),
    m && e.usedDuplicates[p])
  )
    e.dump = '*ref_' + p;
  else {
    if ((f && m && !e.usedDuplicates[p] && (e.usedDuplicates[p] = !0), a === '[object Object]'))
      r && Object.keys(e.dump).length !== 0
        ? (PE(e, t, e.dump, i), m && (e.dump = '&ref_' + p + e.dump))
        : (qE(e, t, e.dump), m && (e.dump = '&ref_' + p + ' ' + e.dump));
    else if (a === '[object Array]')
      r && e.dump.length !== 0
        ? (e.noArrayIndent && !s && t > 0 ? Jv(e, t - 1, e.dump, i) : Jv(e, t, e.dump, i),
          m && (e.dump = '&ref_' + p + e.dump))
        : (AE(e, t, e.dump), m && (e.dump = '&ref_' + p + ' ' + e.dump));
    else if (a === '[object String]') e.tag !== '?' && DE(e, e.dump, t, o, u);
    else {
      if (a === '[object Undefined]') return !1;
      if (e.skipInvalid) return !1;
      throw new kt('unacceptable kind of an object to dump ' + a);
    }
    e.tag !== null &&
      e.tag !== '?' &&
      ((c = encodeURI(e.tag[0] === '!' ? e.tag.slice(1) : e.tag).replace(/!/g, '%21')),
      e.tag[0] === '!'
        ? (c = '!' + c)
        : c.slice(0, 18) === 'tag:yaml.org,2002:'
          ? (c = '!!' + c.slice(18))
          : (c = '!<' + c + '>'),
      (e.dump = c + ' ' + e.dump));
  }
  return !0;
}
function OE(e, t) {
  var n = [],
    r = [],
    i,
    o;
  for (gl(e, n, r), i = 0, o = r.length; i < o; i += 1) t.duplicates.push(n[r[i]]);
  t.usedDuplicates = new Array(o);
}
function gl(e, t, n) {
  var r, i, o;
  if (e !== null && typeof e == 'object')
    if (((i = t.indexOf(e)), i !== -1)) n.indexOf(i) === -1 && n.push(i);
    else if ((t.push(e), Array.isArray(e))) for (i = 0, o = e.length; i < o; i += 1) gl(e[i], t, n);
    else for (r = Object.keys(e), i = 0, o = r.length; i < o; i += 1) gl(e[r[i]], t, n);
}
function IE(e, t) {
  t = t || {};
  var n = new kE(t);
  n.noRefs || OE(e, n);
  var r = e;
  return (
    n.replacer && (r = n.replacer.call({ '': r }, '', r)),
    un(n, 0, r, !0, !0)
      ? n.dump +
        `
`
      : ''
  );
}
var FE = IE,
  NE = { dump: FE };
function wl(e, t) {
  return function () {
    throw new Error(
      'Function yaml.' +
        e +
        ' is removed in js-yaml 4. Use yaml.' +
        t +
        ' instead, which is now safe by default.'
    );
  };
}
var C0 = p0.load,
  BF = p0.loadAll,
  HF = NE.dump;
var zF = wl('safeLoad', 'load'),
  UF = wl('safeLoadAll', 'loadAll'),
  WF = wl('safeDump', 'dump');
function ME(e) {
  if (!Fi.existsSync(e)) return null;
  let t = Fi.readFileSync(e, 'utf-8');
  return C0(t);
}
function _l(e, t = {}) {
  let n = [],
    r = t.configPath || JE(),
    o = (r ? ME(r) : null)?.rules || kl(),
    s = t.rules ? Object.fromEntries(Object.entries(o).filter(([a]) => t.rules.includes(a))) : o;
  for (let [a, u] of Object.entries(s)) {
    if (u === !1 || u === 'off') continue;
    let c = typeof u == 'string' ? kl()[a] : u;
    if (!c || typeof c != 'object' || (t.severity && !QE(c.severity, t.severity))) continue;
    let f = jE(a, c, e);
    n.push(...f);
  }
  return n;
}
function jE(e, t, n) {
  let r = [],
    i = BE(t.given, n),
    o = Array.isArray(t.then) ? t.then : [t.then];
  for (let s of i)
    for (let a of o)
      zE(a, s.value, n) ||
        r.push({
          rule: e,
          message: KE(t.message || t.description || `Rule ${e} failed`, s.value),
          severity: t.severity,
          path: s.path,
        });
  return r;
}
function BE(e, t) {
  let n = [];
  if ((e.startsWith('#') && (e = HE(e)), e === '$')) return (n.push({ value: t, path: [] }), n);
  if (e === '$.document') {
    let a = t?.document ?? t;
    return (n.push({ value: a, path: ['document'] }), n);
  }
  let r = e
      .replace(/^\$\.?/, '')
      .split('.')
      .filter((s) => s),
    i = t,
    o = [];
  for (let s of r) {
    if (i == null) return n;
    if (s.endsWith('[*]')) {
      let a = s.slice(0, -3);
      if ((a && ((i = i[a]), o.push(a)), Array.isArray(i))) {
        for (let u = 0; u < i.length; u++) n.push({ value: i[u], path: [...o, String(u)] });
        return n;
      }
    } else ((i = i[s]), o.push(s));
  }
  return (i !== void 0 && n.push({ value: i, path: o }), n);
}
function HE(e) {
  return (
    {
      '#OmgDocument': '$.document',
      '#OalDocument': '$.document',
      '#FrontMatter': '$.document.frontMatter',
      '#Blocks': '$.document.resolvedBlocks[*]',
      '#ResponseBlocks': '$.document.resolvedBlocks[*]',
      '#QueryBlocks': '$.document.resolvedBlocks[*]',
      '#BodyBlocks': '$.document.resolvedBlocks[*]',
    }[e] || e.replace('#', '$.')
  );
}
function zE(e, t, n) {
  let r = t;
  switch ((e.field && t && typeof t == 'object' && (r = t[e.field]), e.function)) {
    case 'truthy':
      return !!r;
    case 'falsy':
      return !r;
    case 'defined':
      return r !== void 0;
    case 'undefined':
      return r === void 0;
    case 'enumeration':
      return e.functionOptions?.values?.includes(r) ?? !0;
    case 'pattern': {
      let i = e.functionOptions;
      return typeof r != 'string'
        ? !0
        : !(
            (i?.match && !new RegExp(i.match).test(r)) ||
            (i?.notMatch && new RegExp(i.notMatch).test(r))
          );
    }
    case 'length': {
      let i = e.functionOptions;
      return !(
        (typeof r == 'string' || Array.isArray(r)) &&
        ((i?.min !== void 0 && r.length < i.min) || (i?.max !== void 0 && r.length > i.max))
      );
    }
    case 'casing': {
      let i = e.functionOptions;
      if (typeof r != 'string') return !0;
      switch (i?.type) {
        case 'camel':
          return /^[a-z][a-zA-Z0-9]*$/.test(r);
        case 'pascal':
          return /^[A-Z][a-zA-Z0-9]*$/.test(r);
        case 'kebab':
          return /^[a-z][a-z0-9-]*$/.test(r);
        case 'snake':
          return /^[a-z][a-z0-9_]*$/.test(r);
        case 'constant':
          return /^[A-Z][A-Z0-9_]*$/.test(r);
        default:
          return !0;
      }
    }
    case 'omg-response-required':
      return UE(t, e.functionOptions);
    case 'omg-annotation-valid':
      return WE(t, e.functionOptions);
    case 'omg-path-parameter-defined':
      return VE(t, e.functionOptions);
    case 'omg-property-casing':
    case 'oal-property-casing':
      return T0(t, e.functionOptions);
    case 'omg-enum-values':
      return YE(t, e.functionOptions);
    case 'omg-type-valid':
      return GE(t, e.functionOptions);
    default:
      return !0;
  }
}
function UE(e, t) {
  let n = e,
    r = n?.resolvedBlocks || n?.blocks || [],
    i = r.filter((o) => o.type && o.type.startsWith('omg.response'));
  return !(
    i.length === 0 ||
    (t?.requireSuccess &&
      !i.some((s) => {
        if (s.type === 'omg.response') return !0;
        let a = s.type.match(/omg\.response\.(\d+)/);
        if (a) {
          let u = parseInt(a[1], 10);
          return u >= 200 && u < 300;
        }
        return !1;
      })) ||
    (t?.checkExamples && !r.some((s) => s.type && s.type.startsWith('omg.example')))
  );
}
function WE(e, t) {
  let n = e,
    r = t?.rule;
  if (!r) return !0;
  switch (r) {
    case 'get-no-body': {
      let i = n?.frontMatter?.method,
        s = (n?.resolvedBlocks || n?.blocks || []).some((a) => a.type === 'omg.body');
      return !(i === 'GET' && s);
    }
    case 'post-put-has-body': {
      let i = n?.frontMatter?.method,
        s = (n?.resolvedBlocks || n?.blocks || []).some((a) => a.type === 'omg.body');
      return i === 'POST' || i === 'PUT' ? s : !0;
    }
    case 'list-needs-pagination': {
      if (!(n?.frontMatter?.operationId || '').startsWith('list-')) return !0;
      let s = (n?.resolvedBlocks || n?.blocks || []).find((u) => u.type === 'omg.query');
      if (!s?.parsed) return !1;
      let a = s.parsed.properties || {};
      return 'page' in a && 'pageSize' in a;
    }
    default:
      return !0;
  }
}
function VE(e, t) {
  if (typeof e != 'string') return !0;
  let n = t?.casing,
    r = /\{([^}]+)\}/g,
    i;
  for (; (i = r.exec(e)) !== null; ) {
    let o = i[1];
    if (n === 'camelCase' && !/^[a-z][a-zA-Z0-9]*$/.test(o)) return !1;
  }
  return !0;
}
function T0(e, t) {
  let n = e,
    r = n?.resolvedBlocks || n?.blocks || [],
    i = t?.casing || 'camel';
  for (let o of r) {
    if (!o.parsed) continue;
    if (Ii(o.parsed, i).length > 0) return !1;
  }
  return !0;
}
function Ii(e, t, n = []) {
  let r = [];
  if (!e || typeof e != 'object') return r;
  let i = e;
  if (i.kind === 'object' && i.properties) {
    let o = i.properties;
    for (let s of Object.keys(o)) {
      $E(s, t) || r.push([...n, s].join('.'));
      let a = Ii(o[s], t, [...n, s]);
      r.push(...a);
    }
  }
  if (i.kind === 'array' && i.items) {
    let o = Ii(i.items, t, [...n, '[]']);
    r.push(...o);
  }
  if (i.kind === 'union' && Array.isArray(i.types))
    for (let o = 0; o < i.types.length; o++) {
      let s = Ii(i.types[o], t, [...n, `variant${o + 1}`]);
      r.push(...s);
    }
  if (i.kind === 'intersection' && Array.isArray(i.types))
    for (let o = 0; o < i.types.length; o++) {
      let s = Ii(i.types[o], t, [...n, `part${o + 1}`]);
      r.push(...s);
    }
  return r;
}
function D0(e, t) {
  switch (t) {
    case 'camel':
      return /^[a-z][a-zA-Z0-9]*$/.test(e);
    case 'pascal':
      return /^[A-Z][a-zA-Z0-9]*$/.test(e);
    case 'snake':
      return /^[a-z][a-z0-9_]*$/.test(e);
    case 'kebab':
      return /^[a-z][a-z0-9-]*$/.test(e);
    case 'constant':
      return /^[A-Z][A-Z0-9_]*$/.test(e);
    default:
      return !0;
  }
}
var $E = D0;
function YE(e, t) {
  return !0;
}
function GE(e, t) {
  return !0;
}
function KE(e, t) {
  return e.replace(/\{\{(\w+)\}\}/g, (n, r) =>
    r === 'value'
      ? typeof t == 'string'
        ? t
        : JSON.stringify(t)
      : typeof t == 'object' && t !== null
        ? String(t[r] ?? '')
        : ''
  );
}
function QE(e, t) {
  let n = { error: 3, warn: 2, hint: 1, off: 0 };
  return n[e] >= n[t];
}
function JE() {
  let e = process.cwd(),
    t = Gr.parse(e).root,
    n = ['.spectral-oal.yaml', '.spectral-omg.yaml'];
  for (; e !== t; ) {
    for (let r of n) {
      let i = Gr.join(e, r);
      if (Fi.existsSync(i)) return i;
    }
    e = Gr.dirname(e);
  }
  return null;
}
function kl() {
  return {
    'omg-frontmatter-method-required': {
      description: 'Front matter must include HTTP method',
      message: "Missing 'method' in front matter",
      severity: 'error',
      given: '#FrontMatter',
      then: { field: 'method', function: 'truthy' },
    },
    'omg-frontmatter-path-required': {
      description: 'Front matter must include API path',
      message: "Missing 'path' in front matter",
      severity: 'error',
      given: '#FrontMatter',
      then: { field: 'path', function: 'truthy' },
    },
    'omg-frontmatter-operationid-required': {
      description: 'Front matter must include operationId',
      message: "Missing 'operationId' in front matter",
      severity: 'error',
      given: '#FrontMatter',
      then: { field: 'operationId', function: 'truthy' },
    },
    'omg-frontmatter-tags-required': {
      description: 'Front matter should include tags',
      message: "Missing 'tags' in front matter",
      severity: 'warn',
      given: '#FrontMatter',
      then: { field: 'tags', function: 'truthy' },
    },
    'omg-frontmatter-method-valid': {
      description: 'HTTP method must be valid',
      message: 'Invalid HTTP method',
      severity: 'error',
      given: '#FrontMatter.method',
      then: {
        function: 'enumeration',
        functionOptions: { values: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
      },
    },
    'omg-operationid-kebab-case': {
      description: 'operationId should be kebab-case',
      message: "operationId '{{value}}' should be kebab-case",
      severity: 'warn',
      given: '#FrontMatter.operationId',
      then: { function: 'pattern', functionOptions: { match: '^[a-z][a-z0-9]*(-[a-z0-9]+)*$' } },
    },
    'omg-path-leading-slash': {
      description: 'Path must start with a forward slash',
      message: "Path must start with '/'",
      severity: 'error',
      given: '#FrontMatter.path',
      then: { function: 'pattern', functionOptions: { match: '^/' } },
    },
    'omg-path-no-trailing-slash': {
      description: 'Path should not end with a forward slash',
      message: "Path should not end with '/'",
      severity: 'warn',
      given: '#FrontMatter.path',
      then: { function: 'pattern', functionOptions: { notMatch: '/$' } },
    },
    'omg-response-required': {
      description: 'Endpoint must define at least one response',
      message: 'No response block defined',
      severity: 'error',
      given: '#OmgDocument',
      then: { function: 'omg-response-required' },
    },
    'omg-title-required': {
      description: 'Endpoint must have a title',
      message: 'Missing title (H1 heading)',
      severity: 'error',
      given: '#OmgDocument',
      then: { field: 'title', function: 'truthy' },
    },
    'omg-description-required': {
      description: 'Endpoint should have a description',
      message: 'Missing description',
      severity: 'warn',
      given: '#OmgDocument',
      then: { field: 'description', function: 'truthy' },
    },
    'omg-get-no-body': {
      description: 'GET requests should not have a request body',
      message: 'GET requests should not have a request body',
      severity: 'error',
      given: '#OmgDocument',
      then: { function: 'omg-annotation-valid', functionOptions: { rule: 'get-no-body' } },
    },
    'omg-tags-no-spaces': {
      description: 'Tags should not contain spaces',
      message: 'Tag should not contain spaces',
      severity: 'error',
      given: '#FrontMatter.tags[*]',
      then: { function: 'pattern', functionOptions: { notMatch: '\\s' } },
    },
    'omg-property-casing': {
      description: 'Property names should follow consistent casing convention',
      message: 'Property names should be camelCase',
      severity: 'warn',
      given: '#OmgDocument',
      then: { function: 'omg-property-casing', functionOptions: { casing: 'camel' } },
    },
    'oal-property-casing': {
      description: 'Property names should follow consistent casing convention',
      message: 'Property names should be camelCase',
      severity: 'warn',
      given: '#OalDocument',
      then: { function: 'oal-property-casing', functionOptions: { casing: 'camel' } },
    },
  };
}
var cn = (0, K.createConnection)(K.ProposedFeatures.all),
  Ni = new K.TextDocuments(os);
cn.onInitialize(
  (e) => (
    cn.console.log('OMG Language Server initializing...'),
    {
      capabilities: {
        textDocumentSync: K.TextDocumentSyncKind.Incremental,
        completionProvider: { resolveProvider: !1, triggerCharacters: ['.', '@', '{', ':'] },
        hoverProvider: !0,
      },
    }
  )
);
cn.onInitialized(() => {
  cn.console.log('OMG Language Server initialized');
});
async function E0(e) {
  let t = e.getText(),
    n = [];
  try {
    let r = (0, Ys.parseDocument)(t, e.uri),
      i;
    try {
      i = (0, Ys.resolveDocument)(r, { basePath: '.' });
    } catch {
      i = { ...r, resolvedBlocks: r.blocks };
    }
    let o = _l({ document: i });
    for (let s of o) {
      let a = ZE(s.severity),
        u = s.line ?? 0;
      n.push({
        severity: a,
        range: {
          start: { line: Math.max(0, u - 1), character: 0 },
          end: { line: Math.max(0, u - 1), character: Number.MAX_VALUE },
        },
        message: s.message,
        source: 'omg',
        code: s.rule,
      });
    }
  } catch (r) {
    let i = r instanceof Error ? r.message : String(r),
      o = i.match(/line (\d+)/i),
      s = o ? parseInt(o[1], 10) - 1 : 0;
    n.push({
      severity: K.DiagnosticSeverity.Error,
      range: { start: { line: s, character: 0 }, end: { line: s, character: Number.MAX_VALUE } },
      message: i,
      source: 'omg',
    });
  }
  cn.sendDiagnostics({ uri: e.uri, diagnostics: n });
}
function ZE(e) {
  switch (e) {
    case 'error':
      return K.DiagnosticSeverity.Error;
    case 'warn':
      return K.DiagnosticSeverity.Warning;
    case 'hint':
      return K.DiagnosticSeverity.Hint;
    default:
      return K.DiagnosticSeverity.Information;
  }
}
Ni.onDidChangeContent((e) => {
  E0(e.document);
});
Ni.onDidOpen((e) => {
  E0(e.document);
});
cn.onCompletion((e) => {
  let t = Ni.get(e.textDocument.uri);
  if (!t) return [];
  let n = e.position,
    r = t.getText(),
    i = t.offsetAt(n),
    o =
      r.lastIndexOf(
        `
`,
        i - 1
      ) + 1,
    s = r.substring(o, i),
    a = [];
  return s.match(/^```omg\.?$/)
    ? (a.push(
        { label: 'omg.path', kind: K.CompletionItemKind.Keyword, detail: 'Path parameters' },
        { label: 'omg.query', kind: K.CompletionItemKind.Keyword, detail: 'Query parameters' },
        { label: 'omg.headers', kind: K.CompletionItemKind.Keyword, detail: 'Header parameters' },
        { label: 'omg.body', kind: K.CompletionItemKind.Keyword, detail: 'Request body schema' },
        {
          label: 'omg.response',
          kind: K.CompletionItemKind.Keyword,
          detail: 'Default (200) response',
        },
        {
          label: 'omg.response.201',
          kind: K.CompletionItemKind.Keyword,
          detail: 'Created response',
        },
        {
          label: 'omg.response.400',
          kind: K.CompletionItemKind.Keyword,
          detail: 'Bad request response',
        },
        {
          label: 'omg.response.401',
          kind: K.CompletionItemKind.Keyword,
          detail: 'Unauthorized response',
        },
        {
          label: 'omg.response.404',
          kind: K.CompletionItemKind.Keyword,
          detail: 'Not found response',
        },
        {
          label: 'omg.response.500',
          kind: K.CompletionItemKind.Keyword,
          detail: 'Server error response',
        },
        {
          label: 'omg.returns',
          kind: K.CompletionItemKind.Keyword,
          detail: 'Conditional responses',
        },
        { label: 'omg.type', kind: K.CompletionItemKind.Keyword, detail: 'Type definition' },
        { label: 'omg.example', kind: K.CompletionItemKind.Keyword, detail: 'Example data (JSON)' },
        { label: 'omg.errors', kind: K.CompletionItemKind.Keyword, detail: 'Error definitions' },
        { label: 'omg.config', kind: K.CompletionItemKind.Keyword, detail: 'Configuration block' }
      ),
      a)
    : s.includes('@')
      ? (a.push(
          {
            label: '@min',
            kind: K.CompletionItemKind.Function,
            detail: 'Minimum value',
            insertText: '@min(${1:0})',
          },
          {
            label: '@max',
            kind: K.CompletionItemKind.Function,
            detail: 'Maximum value',
            insertText: '@max(${1:100})',
          },
          {
            label: '@minLength',
            kind: K.CompletionItemKind.Function,
            detail: 'Minimum string length',
            insertText: '@minLength(${1:1})',
          },
          {
            label: '@maxLength',
            kind: K.CompletionItemKind.Function,
            detail: 'Maximum string length',
            insertText: '@maxLength(${1:255})',
          },
          {
            label: '@pattern',
            kind: K.CompletionItemKind.Function,
            detail: 'Regex pattern',
            insertText: '@pattern("${1:.*}")',
          },
          {
            label: '@format',
            kind: K.CompletionItemKind.Function,
            detail: 'Format hint',
            insertText: '@format("${1:email}")',
          },
          {
            label: '@minItems',
            kind: K.CompletionItemKind.Function,
            detail: 'Minimum array items',
            insertText: '@minItems(${1:1})',
          },
          {
            label: '@maxItems',
            kind: K.CompletionItemKind.Function,
            detail: 'Maximum array items',
            insertText: '@maxItems(${1:100})',
          }
        ),
        a)
      : XE(r, i)
        ? (a.push(
            { label: 'string', kind: K.CompletionItemKind.TypeParameter, detail: 'String type' },
            { label: 'integer', kind: K.CompletionItemKind.TypeParameter, detail: 'Integer type' },
            {
              label: 'number',
              kind: K.CompletionItemKind.TypeParameter,
              detail: 'Number (float) type',
            },
            { label: 'decimal', kind: K.CompletionItemKind.TypeParameter, detail: 'Decimal type' },
            { label: 'boolean', kind: K.CompletionItemKind.TypeParameter, detail: 'Boolean type' },
            {
              label: 'date',
              kind: K.CompletionItemKind.TypeParameter,
              detail: 'Date type (YYYY-MM-DD)',
            },
            {
              label: 'datetime',
              kind: K.CompletionItemKind.TypeParameter,
              detail: 'DateTime type (ISO 8601)',
            },
            { label: 'uuid', kind: K.CompletionItemKind.TypeParameter, detail: 'UUID type' },
            { label: 'any', kind: K.CompletionItemKind.TypeParameter, detail: 'Any type' }
          ),
          a)
        : (s.match(/^method:\s*$/) &&
            a.push(
              { label: 'GET', kind: K.CompletionItemKind.EnumMember },
              { label: 'POST', kind: K.CompletionItemKind.EnumMember },
              { label: 'PUT', kind: K.CompletionItemKind.EnumMember },
              { label: 'PATCH', kind: K.CompletionItemKind.EnumMember },
              { label: 'DELETE', kind: K.CompletionItemKind.EnumMember }
            ),
          a);
});
function XE(e, t) {
  let n = e.substring(0, t),
    r = n.lastIndexOf('```omg');
  return r === -1 ? !1 : n.indexOf('```', r + 6) === -1;
}
cn.onHover((e) => {
  let t = Ni.get(e.textDocument.uri);
  if (!t) return null;
  let n = e.position,
    r = t.getText(),
    i = eR(t, n);
  if (!i) return null;
  let o = tR(i);
  if (o) return { contents: { kind: K.MarkupKind.Markdown, value: o } };
  let s = nR(i);
  return s ? { contents: { kind: K.MarkupKind.Markdown, value: s } } : null;
});
function eR(e, t) {
  let n = e.getText(),
    r = e.offsetAt(t),
    i = r,
    o = r;
  for (; i > 0 && /[\w@]/.test(n[i - 1]); ) i--;
  for (; o < n.length && /[\w]/.test(n[o]); ) o++;
  return i === o ? null : n.substring(i, o);
}
function tR(e) {
  return (
    {
      string: '**string**\n\nA text value.\n\n```omg\nname: string\n```',
      integer: '**integer**\n\nA whole number (no decimals).\n\n```omg\ncount: integer\n```',
      number: '**number**\n\nA floating-point number.\n\n```omg\nprice: number\n```',
      decimal:
        '**decimal**\n\nA precise decimal number (for currency, etc.).\n\n```omg\namount: decimal\n```',
      boolean: '**boolean**\n\nA true/false value.\n\n```omg\nisActive: boolean\n```',
      date: '**date**\n\nA date in YYYY-MM-DD format.\n\n```omg\nbirthDate: date\n```',
      datetime: '**datetime**\n\nAn ISO 8601 date-time.\n\n```omg\ncreatedAt: datetime\n```',
      uuid: '**uuid**\n\nA UUID (universally unique identifier).\n\n```omg\nid: uuid\n```',
      any: '**any**\n\nAny JSON value (use sparingly).\n\n```omg\nmetadata: any\n```',
    }[e] || null
  );
}
function nR(e) {
  return (
    {
      '@min': '**@min(value)**\n\nMinimum numeric value.\n\n```omg\nage: integer @min(0)\n```',
      '@max': '**@max(value)**\n\nMaximum numeric value.\n\n```omg\nage: integer @max(150)\n```',
      '@minLength':
        '**@minLength(value)**\n\nMinimum string length.\n\n```omg\nname: string @minLength(1)\n```',
      '@maxLength':
        '**@maxLength(value)**\n\nMaximum string length.\n\n```omg\nname: string @maxLength(100)\n```',
      '@pattern':
        '**@pattern("regex")**\n\nRegular expression pattern.\n\n```omg\nemail: string @pattern("^[^@]+@[^@]+$")\n```',
      '@format':
        '**@format("hint")**\n\nFormat hint (email, uri, etc.).\n\n```omg\nemail: string @format("email")\n```',
      '@minItems':
        '**@minItems(value)**\n\nMinimum array items.\n\n```omg\nitems: Product[] @minItems(1)\n```',
      '@maxItems':
        '**@maxItems(value)**\n\nMaximum array items.\n\n```omg\nitems: Product[] @maxItems(100)\n```',
    }[e] || null
  );
}
Ni.listen(cn);
cn.listen();
/*! Bundled license information:

is-extendable/index.js:
  (*!
   * is-extendable <https://github.com/jonschlinkert/is-extendable>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

strip-bom-string/index.js:
  (*!
   * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT *)
*/
