#!/usr/bin/env node
'use strict';
var J0 = Object.create;
var Wi = Object.defineProperty;
var Z0 = Object.getOwnPropertyDescriptor;
var X0 = Object.getOwnPropertyNames;
var ex = Object.getPrototypeOf,
  tx = Object.prototype.hasOwnProperty;
var z = (e, t) => () => (e && (t = e((e = 0))), t);
var O = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  $i = (e, t) => {
    for (var n in t) Wi(e, n, { get: t[n], enumerable: !0 });
  },
  Wl = (e, t, n, r) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let i of X0(t))
        !tx.call(e, i) &&
          i !== n &&
          Wi(e, i, { get: () => t[i], enumerable: !(r = Z0(t, i)) || r.enumerable });
    return e;
  };
var hn = (e, t, n) => (
    (n = e != null ? J0(ex(e)) : {}),
    Wl(t || !e || !e.__esModule ? Wi(n, 'default', { value: e, enumerable: !0 }) : n, e)
  ),
  ia = (e) => Wl(Wi({}, '__esModule', { value: !0 }), e);
var Vi = O((je) => {
  'use strict';
  Object.defineProperty(je, '__esModule', { value: !0 });
  je.thenable =
    je.typedArray =
    je.stringArray =
    je.array =
    je.func =
    je.error =
    je.number =
    je.string =
    je.boolean =
      void 0;
  function nx(e) {
    return e === !0 || e === !1;
  }
  je.boolean = nx;
  function $l(e) {
    return typeof e == 'string' || e instanceof String;
  }
  je.string = $l;
  function rx(e) {
    return typeof e == 'number' || e instanceof Number;
  }
  je.number = rx;
  function ix(e) {
    return e instanceof Error;
  }
  je.error = ix;
  function Vl(e) {
    return typeof e == 'function';
  }
  je.func = Vl;
  function Yl(e) {
    return Array.isArray(e);
  }
  je.array = Yl;
  function ox(e) {
    return Yl(e) && e.every((t) => $l(t));
  }
  je.stringArray = ox;
  function sx(e, t) {
    return Array.isArray(e) && e.every(t);
  }
  je.typedArray = sx;
  function ax(e) {
    return e && Vl(e.then);
  }
  je.thenable = ax;
});
var fr = O((rt) => {
  'use strict';
  Object.defineProperty(rt, '__esModule', { value: !0 });
  rt.stringArray = rt.array = rt.func = rt.error = rt.number = rt.string = rt.boolean = void 0;
  function ux(e) {
    return e === !0 || e === !1;
  }
  rt.boolean = ux;
  function Gl(e) {
    return typeof e == 'string' || e instanceof String;
  }
  rt.string = Gl;
  function cx(e) {
    return typeof e == 'number' || e instanceof Number;
  }
  rt.number = cx;
  function lx(e) {
    return e instanceof Error;
  }
  rt.error = lx;
  function fx(e) {
    return typeof e == 'function';
  }
  rt.func = fx;
  function Kl(e) {
    return Array.isArray(e);
  }
  rt.array = Kl;
  function dx(e) {
    return Kl(e) && e.every((t) => Gl(t));
  }
  rt.stringArray = dx;
});
var Ra = O((G) => {
  'use strict';
  Object.defineProperty(G, '__esModule', { value: !0 });
  G.Message =
    G.NotificationType9 =
    G.NotificationType8 =
    G.NotificationType7 =
    G.NotificationType6 =
    G.NotificationType5 =
    G.NotificationType4 =
    G.NotificationType3 =
    G.NotificationType2 =
    G.NotificationType1 =
    G.NotificationType0 =
    G.NotificationType =
    G.RequestType9 =
    G.RequestType8 =
    G.RequestType7 =
    G.RequestType6 =
    G.RequestType5 =
    G.RequestType4 =
    G.RequestType3 =
    G.RequestType2 =
    G.RequestType1 =
    G.RequestType =
    G.RequestType0 =
    G.AbstractMessageSignature =
    G.ParameterStructures =
    G.ResponseError =
    G.ErrorCodes =
      void 0;
  var jn = fr(),
    oa;
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
  })(oa || (G.ErrorCodes = oa = {}));
  var sa = class e extends Error {
    constructor(t, n, r) {
      (super(n),
        (this.code = jn.number(t) ? t : oa.UnknownErrorCode),
        (this.data = r),
        Object.setPrototypeOf(this, e.prototype));
    }
    toJson() {
      let t = { code: this.code, message: this.message };
      return (this.data !== void 0 && (t.data = this.data), t);
    }
  };
  G.ResponseError = sa;
  var yt = class e {
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
  G.ParameterStructures = yt;
  yt.auto = new yt('auto');
  yt.byPosition = new yt('byPosition');
  yt.byName = new yt('byName');
  var De = class {
    constructor(t, n) {
      ((this.method = t), (this.numberOfParams = n));
    }
    get parameterStructures() {
      return yt.auto;
    }
  };
  G.AbstractMessageSignature = De;
  var aa = class extends De {
    constructor(t) {
      super(t, 0);
    }
  };
  G.RequestType0 = aa;
  var ua = class extends De {
    constructor(t, n = yt.auto) {
      (super(t, 1), (this._parameterStructures = n));
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  };
  G.RequestType = ua;
  var ca = class extends De {
    constructor(t, n = yt.auto) {
      (super(t, 1), (this._parameterStructures = n));
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  };
  G.RequestType1 = ca;
  var la = class extends De {
    constructor(t) {
      super(t, 2);
    }
  };
  G.RequestType2 = la;
  var fa = class extends De {
    constructor(t) {
      super(t, 3);
    }
  };
  G.RequestType3 = fa;
  var da = class extends De {
    constructor(t) {
      super(t, 4);
    }
  };
  G.RequestType4 = da;
  var pa = class extends De {
    constructor(t) {
      super(t, 5);
    }
  };
  G.RequestType5 = pa;
  var ha = class extends De {
    constructor(t) {
      super(t, 6);
    }
  };
  G.RequestType6 = ha;
  var ma = class extends De {
    constructor(t) {
      super(t, 7);
    }
  };
  G.RequestType7 = ma;
  var ga = class extends De {
    constructor(t) {
      super(t, 8);
    }
  };
  G.RequestType8 = ga;
  var ya = class extends De {
    constructor(t) {
      super(t, 9);
    }
  };
  G.RequestType9 = ya;
  var ba = class extends De {
    constructor(t, n = yt.auto) {
      (super(t, 1), (this._parameterStructures = n));
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  };
  G.NotificationType = ba;
  var va = class extends De {
    constructor(t) {
      super(t, 0);
    }
  };
  G.NotificationType0 = va;
  var xa = class extends De {
    constructor(t, n = yt.auto) {
      (super(t, 1), (this._parameterStructures = n));
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  };
  G.NotificationType1 = xa;
  var wa = class extends De {
    constructor(t) {
      super(t, 2);
    }
  };
  G.NotificationType2 = wa;
  var ka = class extends De {
    constructor(t) {
      super(t, 3);
    }
  };
  G.NotificationType3 = ka;
  var _a = class extends De {
    constructor(t) {
      super(t, 4);
    }
  };
  G.NotificationType4 = _a;
  var Sa = class extends De {
    constructor(t) {
      super(t, 5);
    }
  };
  G.NotificationType5 = Sa;
  var Ta = class extends De {
    constructor(t) {
      super(t, 6);
    }
  };
  G.NotificationType6 = Ta;
  var Ca = class extends De {
    constructor(t) {
      super(t, 7);
    }
  };
  G.NotificationType7 = Ca;
  var Da = class extends De {
    constructor(t) {
      super(t, 8);
    }
  };
  G.NotificationType8 = Da;
  var Ea = class extends De {
    constructor(t) {
      super(t, 9);
    }
  };
  G.NotificationType9 = Ea;
  var Ql;
  (function (e) {
    function t(i) {
      let o = i;
      return o && jn.string(o.method) && (jn.string(o.id) || jn.number(o.id));
    }
    e.isRequest = t;
    function n(i) {
      let o = i;
      return o && jn.string(o.method) && i.id === void 0;
    }
    e.isNotification = n;
    function r(i) {
      let o = i;
      return (
        o &&
        (o.result !== void 0 || !!o.error) &&
        (jn.string(o.id) || jn.number(o.id) || o.id === null)
      );
    }
    e.isResponse = r;
  })(Ql || (G.Message = Ql = {}));
});
var Pa = O((mn) => {
  'use strict';
  var Jl;
  Object.defineProperty(mn, '__esModule', { value: !0 });
  mn.LRUCache = mn.LinkedMap = mn.Touch = void 0;
  var it;
  (function (e) {
    ((e.None = 0), (e.First = 1), (e.AsOld = e.First), (e.Last = 2), (e.AsNew = e.Last));
  })(it || (mn.Touch = it = {}));
  var Yi = class {
    constructor() {
      ((this[Jl] = 'LinkedMap'),
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
    [((Jl = Symbol.toStringTag), Symbol.iterator)]() {
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
  mn.LinkedMap = Yi;
  var Aa = class extends Yi {
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
  mn.LRUCache = Aa;
});
var Xl = O((Gi) => {
  'use strict';
  Object.defineProperty(Gi, '__esModule', { value: !0 });
  Gi.Disposable = void 0;
  var Zl;
  (function (e) {
    function t(n) {
      return { dispose: n };
    }
    e.create = t;
  })(Zl || (Gi.Disposable = Zl = {}));
});
var gn = O((Ia) => {
  'use strict';
  Object.defineProperty(Ia, '__esModule', { value: !0 });
  var qa;
  function Oa() {
    if (qa === void 0) throw new Error('No runtime abstraction layer installed');
    return qa;
  }
  (function (e) {
    function t(n) {
      if (n === void 0) throw new Error('No runtime abstraction layer provided');
      qa = n;
    }
    e.install = t;
  })(Oa || (Oa = {}));
  Ia.default = Oa;
});
var pr = O((dr) => {
  'use strict';
  Object.defineProperty(dr, '__esModule', { value: !0 });
  dr.Emitter = dr.Event = void 0;
  var px = gn(),
    ef;
  (function (e) {
    let t = { dispose() {} };
    e.None = function () {
      return t;
    };
  })(ef || (dr.Event = ef = {}));
  var Fa = class {
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
            (0, px.default)().console.error(a);
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
    Ki = class e {
      constructor(t) {
        this._options = t;
      }
      get event() {
        return (
          this._event ||
            (this._event = (t, n, r) => {
              (this._callbacks || (this._callbacks = new Fa()),
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
  dr.Emitter = Ki;
  Ki._noop = function () {};
});
var Zi = O((hr) => {
  'use strict';
  Object.defineProperty(hr, '__esModule', { value: !0 });
  hr.CancellationTokenSource = hr.CancellationToken = void 0;
  var hx = gn(),
    mx = fr(),
    Na = pr(),
    Qi;
  (function (e) {
    ((e.None = Object.freeze({
      isCancellationRequested: !1,
      onCancellationRequested: Na.Event.None,
    })),
      (e.Cancelled = Object.freeze({
        isCancellationRequested: !0,
        onCancellationRequested: Na.Event.None,
      })));
    function t(n) {
      let r = n;
      return (
        r &&
        (r === e.None ||
          r === e.Cancelled ||
          (mx.boolean(r.isCancellationRequested) && !!r.onCancellationRequested))
      );
    }
    e.is = t;
  })(Qi || (hr.CancellationToken = Qi = {}));
  var gx = Object.freeze(function (e, t) {
      let n = (0, hx.default)().timer.setTimeout(e.bind(t), 0);
      return {
        dispose() {
          n.dispose();
        },
      };
    }),
    Ji = class {
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
          ? gx
          : (this._emitter || (this._emitter = new Na.Emitter()), this._emitter.event);
      }
      dispose() {
        this._emitter && (this._emitter.dispose(), (this._emitter = void 0));
      }
    },
    La = class {
      get token() {
        return (this._token || (this._token = new Ji()), this._token);
      }
      cancel() {
        this._token ? this._token.cancel() : (this._token = Qi.Cancelled);
      }
      dispose() {
        this._token ? this._token instanceof Ji && this._token.dispose() : (this._token = Qi.None);
      }
    };
  hr.CancellationTokenSource = La;
});
var tf = O((mr) => {
  'use strict';
  Object.defineProperty(mr, '__esModule', { value: !0 });
  mr.SharedArrayReceiverStrategy = mr.SharedArraySenderStrategy = void 0;
  var yx = Zi(),
    ei;
  (function (e) {
    ((e.Continue = 0), (e.Cancelled = 1));
  })(ei || (ei = {}));
  var Ma = class {
    constructor() {
      this.buffers = new Map();
    }
    enableCancellation(t) {
      if (t.id === null) return;
      let n = new SharedArrayBuffer(4),
        r = new Int32Array(n, 0, 1);
      ((r[0] = ei.Continue), this.buffers.set(t.id, n), (t.$cancellationData = n));
    }
    async sendCancellation(t, n) {
      let r = this.buffers.get(n);
      if (r === void 0) return;
      let i = new Int32Array(r, 0, 1);
      Atomics.store(i, 0, ei.Cancelled);
    }
    cleanup(t) {
      this.buffers.delete(t);
    }
    dispose() {
      this.buffers.clear();
    }
  };
  mr.SharedArraySenderStrategy = Ma;
  var ja = class {
      constructor(t) {
        this.data = new Int32Array(t, 0, 1);
      }
      get isCancellationRequested() {
        return Atomics.load(this.data, 0) === ei.Cancelled;
      }
      get onCancellationRequested() {
        throw new Error("Cancellation over SharedArrayBuffer doesn't support cancellation events");
      }
    },
    Ba = class {
      constructor(t) {
        this.token = new ja(t);
      }
      cancel() {}
      dispose() {}
    },
    Ha = class {
      constructor() {
        this.kind = 'request';
      }
      createCancellationTokenSource(t) {
        let n = t.$cancellationData;
        return n === void 0 ? new yx.CancellationTokenSource() : new Ba(n);
      }
    };
  mr.SharedArrayReceiverStrategy = Ha;
});
var Ua = O((Xi) => {
  'use strict';
  Object.defineProperty(Xi, '__esModule', { value: !0 });
  Xi.Semaphore = void 0;
  var bx = gn(),
    za = class {
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
          (0, bx.default)().timer.setImmediate(() => this.doRunNext());
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
  Xi.Semaphore = za;
});
var rf = O((yn) => {
  'use strict';
  Object.defineProperty(yn, '__esModule', { value: !0 });
  yn.ReadableStreamMessageReader = yn.AbstractMessageReader = yn.MessageReader = void 0;
  var $a = gn(),
    gr = fr(),
    Wa = pr(),
    vx = Ua(),
    nf;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        r &&
        gr.func(r.listen) &&
        gr.func(r.dispose) &&
        gr.func(r.onError) &&
        gr.func(r.onClose) &&
        gr.func(r.onPartialMessage)
      );
    }
    e.is = t;
  })(nf || (yn.MessageReader = nf = {}));
  var eo = class {
    constructor() {
      ((this.errorEmitter = new Wa.Emitter()),
        (this.closeEmitter = new Wa.Emitter()),
        (this.partialMessageEmitter = new Wa.Emitter()));
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
            `Reader received error. Reason: ${gr.string(t.message) ? t.message : 'unknown'}`
          );
    }
  };
  yn.AbstractMessageReader = eo;
  var Va;
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
        a === void 0 && ((a = (0, $a.default)().applicationJson.decoder), u.set(a.name, a)),
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
  })(Va || (Va = {}));
  var Ya = class extends eo {
    constructor(t, n) {
      (super(),
        (this.readable = t),
        (this.options = Va.fromOptions(n)),
        (this.buffer = (0, $a.default)().messageBuffer.create(this.options.charset)),
        (this._partialMessageTimeout = 1e4),
        (this.nextMessageLength = -1),
        (this.messageToken = 0),
        (this.readSemaphore = new vx.Semaphore(1)));
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
          (this.partialMessageTimer = (0, $a.default)().timer.setTimeout(
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
  yn.ReadableStreamMessageReader = Ya;
});
var cf = O((bn) => {
  'use strict';
  Object.defineProperty(bn, '__esModule', { value: !0 });
  bn.WriteableStreamMessageWriter = bn.AbstractMessageWriter = bn.MessageWriter = void 0;
  var of = gn(),
    ti = fr(),
    xx = Ua(),
    sf = pr(),
    wx = 'Content-Length: ',
    af = `\r
`,
    uf;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        r && ti.func(r.dispose) && ti.func(r.onClose) && ti.func(r.onError) && ti.func(r.write)
      );
    }
    e.is = t;
  })(uf || (bn.MessageWriter = uf = {}));
  var to = class {
    constructor() {
      ((this.errorEmitter = new sf.Emitter()), (this.closeEmitter = new sf.Emitter()));
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
            `Writer received error. Reason: ${ti.string(t.message) ? t.message : 'unknown'}`
          );
    }
  };
  bn.AbstractMessageWriter = to;
  var Ga;
  (function (e) {
    function t(n) {
      return n === void 0 || typeof n == 'string'
        ? { charset: n ?? 'utf-8', contentTypeEncoder: (0, of.default)().applicationJson.encoder }
        : {
            charset: n.charset ?? 'utf-8',
            contentEncoder: n.contentEncoder,
            contentTypeEncoder: n.contentTypeEncoder ?? (0, of.default)().applicationJson.encoder,
          };
    }
    e.fromOptions = t;
  })(Ga || (Ga = {}));
  var Ka = class extends to {
    constructor(t, n) {
      (super(),
        (this.writable = t),
        (this.options = Ga.fromOptions(n)),
        (this.errorCount = 0),
        (this.writeSemaphore = new xx.Semaphore(1)),
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
              return (i.push(wx, r.byteLength.toString(), af), i.push(af), this.doWrite(t, i, r));
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
  bn.WriteableStreamMessageWriter = Ka;
});
var lf = O((no) => {
  'use strict';
  Object.defineProperty(no, '__esModule', { value: !0 });
  no.AbstractMessageBuffer = void 0;
  var kx = 13,
    _x = 10,
    Sx = `\r
`,
    Qa = class {
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
              case kx:
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
              case _x:
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
          u = this.toString(s, 'ascii').split(Sx);
        if (u.length < 2) return a;
        for (let c = 0; c < u.length - 2; c++) {
          let l = u[c],
            p = l.indexOf(':');
          if (p === -1)
            throw new Error(`Message header must separate key and value using ':'
${l}`);
          let m = l.substr(0, p),
            h = l.substr(p + 1).trim();
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
  no.AbstractMessageBuffer = Qa;
});
var mf = O((se) => {
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
  var ff = gn(),
    Ae = fr(),
    X = Ra(),
    df = Pa(),
    ni = pr(),
    Ja = Zi(),
    oi;
  (function (e) {
    e.type = new X.NotificationType('$/cancelRequest');
  })(oi || (oi = {}));
  var Za;
  (function (e) {
    function t(n) {
      return typeof n == 'string' || typeof n == 'number';
    }
    e.is = t;
  })(Za || (se.ProgressToken = Za = {}));
  var ri;
  (function (e) {
    e.type = new X.NotificationType('$/progress');
  })(ri || (ri = {}));
  var Xa = class {
    constructor() {}
  };
  se.ProgressType = Xa;
  var eu;
  (function (e) {
    function t(n) {
      return Ae.func(n);
    }
    e.is = t;
  })(eu || (eu = {}));
  se.NullLogger = Object.freeze({ error: () => {}, warn: () => {}, info: () => {}, log: () => {} });
  var ke;
  (function (e) {
    ((e[(e.Off = 0)] = 'Off'),
      (e[(e.Messages = 1)] = 'Messages'),
      (e[(e.Compact = 2)] = 'Compact'),
      (e[(e.Verbose = 3)] = 'Verbose'));
  })(ke || (se.Trace = ke = {}));
  var pf;
  (function (e) {
    ((e.Off = 'off'), (e.Messages = 'messages'), (e.Compact = 'compact'), (e.Verbose = 'verbose'));
  })(pf || (se.TraceValues = pf = {}));
  (function (e) {
    function t(r) {
      if (!Ae.string(r)) return e.Off;
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
  })(ke || (se.Trace = ke = {}));
  var Dt;
  (function (e) {
    ((e.Text = 'text'), (e.JSON = 'json'));
  })(Dt || (se.TraceFormat = Dt = {}));
  (function (e) {
    function t(n) {
      return Ae.string(n) ? ((n = n.toLowerCase()), n === 'json' ? e.JSON : e.Text) : e.Text;
    }
    e.fromString = t;
  })(Dt || (se.TraceFormat = Dt = {}));
  var tu;
  (function (e) {
    e.type = new X.NotificationType('$/setTrace');
  })(tu || (se.SetTraceNotification = tu = {}));
  var ro;
  (function (e) {
    e.type = new X.NotificationType('$/logTrace');
  })(ro || (se.LogTraceNotification = ro = {}));
  var ii;
  (function (e) {
    ((e[(e.Closed = 1)] = 'Closed'),
      (e[(e.Disposed = 2)] = 'Disposed'),
      (e[(e.AlreadyListening = 3)] = 'AlreadyListening'));
  })(ii || (se.ConnectionErrors = ii = {}));
  var yr = class e extends Error {
    constructor(t, n) {
      (super(n), (this.code = t), Object.setPrototypeOf(this, e.prototype));
    }
  };
  se.ConnectionError = yr;
  var nu;
  (function (e) {
    function t(n) {
      let r = n;
      return r && Ae.func(r.cancelUndispatched);
    }
    e.is = t;
  })(nu || (se.ConnectionStrategy = nu = {}));
  var io;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        r &&
        (r.kind === void 0 || r.kind === 'id') &&
        Ae.func(r.createCancellationTokenSource) &&
        (r.dispose === void 0 || Ae.func(r.dispose))
      );
    }
    e.is = t;
  })(io || (se.IdCancellationReceiverStrategy = io = {}));
  var ru;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        r &&
        r.kind === 'request' &&
        Ae.func(r.createCancellationTokenSource) &&
        (r.dispose === void 0 || Ae.func(r.dispose))
      );
    }
    e.is = t;
  })(ru || (se.RequestCancellationReceiverStrategy = ru = {}));
  var oo;
  (function (e) {
    e.Message = Object.freeze({
      createCancellationTokenSource(n) {
        return new Ja.CancellationTokenSource();
      },
    });
    function t(n) {
      return io.is(n) || ru.is(n);
    }
    e.is = t;
  })(oo || (se.CancellationReceiverStrategy = oo = {}));
  var so;
  (function (e) {
    e.Message = Object.freeze({
      sendCancellation(n, r) {
        return n.sendNotification(oi.type, { id: r });
      },
      cleanup(n) {},
    });
    function t(n) {
      let r = n;
      return r && Ae.func(r.sendCancellation) && Ae.func(r.cleanup);
    }
    e.is = t;
  })(so || (se.CancellationSenderStrategy = so = {}));
  var ao;
  (function (e) {
    e.Message = Object.freeze({ receiver: oo.Message, sender: so.Message });
    function t(n) {
      let r = n;
      return r && oo.is(r.receiver) && so.is(r.sender);
    }
    e.is = t;
  })(ao || (se.CancellationStrategy = ao = {}));
  var uo;
  (function (e) {
    function t(n) {
      let r = n;
      return r && Ae.func(r.handleMessage);
    }
    e.is = t;
  })(uo || (se.MessageStrategy = uo = {}));
  var hf;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        r &&
        (ao.is(r.cancellationStrategy) || nu.is(r.connectionStrategy) || uo.is(r.messageStrategy))
      );
    }
    e.is = t;
  })(hf || (se.ConnectionOptions = hf = {}));
  var Ut;
  (function (e) {
    ((e[(e.New = 1)] = 'New'),
      (e[(e.Listening = 2)] = 'Listening'),
      (e[(e.Closed = 3)] = 'Closed'),
      (e[(e.Disposed = 4)] = 'Disposed'));
  })(Ut || (Ut = {}));
  function Tx(e, t, n, r) {
    let i = n !== void 0 ? n : se.NullLogger,
      o = 0,
      s = 0,
      a = 0,
      u = '2.0',
      c,
      l = new Map(),
      p,
      m = new Map(),
      h = new Map(),
      R,
      I = new df.LinkedMap(),
      L = new Map(),
      A = new Set(),
      S = new Map(),
      x = ke.Off,
      F = Dt.Text,
      j,
      E = Ut.New,
      Z = new ni.Emitter(),
      ye = new ni.Emitter(),
      fe = new ni.Emitter(),
      ge = new ni.Emitter(),
      Ne = new ni.Emitter(),
      ue = r && r.cancellationStrategy ? r.cancellationStrategy : ao.Message;
    function V(y) {
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
    function Se(y, D) {
      X.Message.isRequest(D)
        ? y.set(V(D.id), D)
        : X.Message.isResponse(D)
          ? y.set(ee(D.id), D)
          : y.set(te(), D);
    }
    function Ee(y) {}
    function Xe() {
      return E === Ut.Listening;
    }
    function Ye() {
      return E === Ut.Closed;
    }
    function v() {
      return E === Ut.Disposed;
    }
    function Ue() {
      (E === Ut.New || E === Ut.Listening) && ((E = Ut.Closed), ye.fire(void 0));
    }
    function et(y) {
      Z.fire([y, void 0, void 0]);
    }
    function k(y) {
      Z.fire(y);
    }
    (e.onClose(Ue), e.onError(et), t.onClose(Ue), t.onError(k));
    function We() {
      R ||
        I.size === 0 ||
        (R = (0, ff.default)().timer.setImmediate(() => {
          ((R = void 0), dn());
        }));
    }
    function Tt(y) {
      X.Message.isRequest(y)
        ? Pe(y)
        : X.Message.isNotification(y)
          ? mt(y)
          : X.Message.isResponse(y)
            ? Kt(y)
            : gt(y);
    }
    function dn() {
      if (I.size === 0) return;
      let y = I.shift();
      try {
        let D = r?.messageStrategy;
        uo.is(D) ? D.handleMessage(y, Tt) : Tt(y);
      } finally {
        We();
      }
    }
    let nn = (y) => {
      try {
        if (X.Message.isNotification(y) && y.method === oi.type.method) {
          let D = y.params.id,
            M = V(D),
            W = I.get(M);
          if (X.Message.isRequest(W)) {
            let pe = r?.connectionStrategy,
              we = pe && pe.cancelUndispatched ? pe.cancelUndispatched(W, Ee) : void 0;
            if (we && (we.error !== void 0 || we.result !== void 0)) {
              (I.delete(M),
                S.delete(D),
                (we.id = W.id),
                Qt(we, y.method, Date.now()),
                t.write(we).catch(() => i.error('Sending response for canceled message failed.')));
              return;
            }
          }
          let ce = S.get(D);
          if (ce !== void 0) {
            (ce.cancel(), rn(y));
            return;
          } else A.add(D);
        }
        Se(I, y);
      } finally {
        We();
      }
    };
    function Pe(y) {
      if (v()) return;
      function D(ne, de, be) {
        let qe = { jsonrpc: u, id: y.id };
        (ne instanceof X.ResponseError
          ? (qe.error = ne.toJson())
          : (qe.result = ne === void 0 ? null : ne),
          Qt(qe, de, be),
          t.write(qe).catch(() => i.error('Sending response failed.')));
      }
      function M(ne, de, be) {
        let qe = { jsonrpc: u, id: y.id, error: ne.toJson() };
        (Qt(qe, de, be), t.write(qe).catch(() => i.error('Sending response failed.')));
      }
      function W(ne, de, be) {
        ne === void 0 && (ne = null);
        let qe = { jsonrpc: u, id: y.id, result: ne };
        (Qt(qe, de, be), t.write(qe).catch(() => i.error('Sending response failed.')));
      }
      Nn(y);
      let ce = l.get(y.method),
        pe,
        we;
      ce && ((pe = ce.type), (we = ce.handler));
      let le = Date.now();
      if (we || c) {
        let ne = y.id ?? String(Date.now()),
          de = io.is(ue.receiver)
            ? ue.receiver.createCancellationTokenSource(ne)
            : ue.receiver.createCancellationTokenSource(y);
        (y.id !== null && A.has(y.id) && de.cancel(), y.id !== null && S.set(ne, de));
        try {
          let be;
          if (we)
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
              be = we(de.token);
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
              be = we(...y.params, de.token);
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
              be = we(y.params, de.token);
            }
          else c && (be = c(y.method, y.params, de.token));
          let qe = be;
          be
            ? qe.then
              ? qe.then(
                  (Ke) => {
                    (S.delete(ne), D(Ke, y.method, le));
                  },
                  (Ke) => {
                    (S.delete(ne),
                      Ke instanceof X.ResponseError
                        ? M(Ke, y.method, le)
                        : Ke && Ae.string(Ke.message)
                          ? M(
                              new X.ResponseError(
                                X.ErrorCodes.InternalError,
                                `Request ${y.method} failed with message: ${Ke.message}`
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
            : (S.delete(ne), W(be, y.method, le));
        } catch (be) {
          (S.delete(ne),
            be instanceof X.ResponseError
              ? D(be, y.method, le)
              : be && Ae.string(be.message)
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
    function Kt(y) {
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
          if ((ar(y, M), M !== void 0)) {
            L.delete(D);
            try {
              if (y.error) {
                let W = y.error;
                M.reject(new X.ResponseError(W.code, W.message, W.data));
              } else if (y.result !== void 0) M.resolve(y.result);
              else throw new Error('Should never happen.');
            } catch (W) {
              W.message
                ? i.error(`Response handler '${M.method}' failed with message: ${W.message}`)
                : i.error(`Response handler '${M.method}' failed unexpectedly.`);
            }
          }
        }
    }
    function mt(y) {
      if (v()) return;
      let D, M;
      if (y.method === oi.type.method) {
        let W = y.params.id;
        (A.delete(W), rn(y));
        return;
      } else {
        let W = m.get(y.method);
        W && ((M = W.handler), (D = W.type));
      }
      if (M || p)
        try {
          if ((rn(y), M))
            if (y.params === void 0)
              (D !== void 0 &&
                D.numberOfParams !== 0 &&
                D.parameterStructures !== X.ParameterStructures.byName &&
                i.error(
                  `Notification ${y.method} defines ${D.numberOfParams} params but received none.`
                ),
                M());
            else if (Array.isArray(y.params)) {
              let W = y.params;
              y.method === ri.type.method && W.length === 2 && Za.is(W[0])
                ? M({ token: W[0], value: W[1] })
                : (D !== void 0 &&
                    (D.parameterStructures === X.ParameterStructures.byName &&
                      i.error(
                        `Notification ${y.method} defines parameters by name but received parameters by position`
                      ),
                    D.numberOfParams !== y.params.length &&
                      i.error(
                        `Notification ${y.method} defines ${D.numberOfParams} params but received ${W.length} arguments`
                      )),
                  M(...W));
            } else
              (D !== void 0 &&
                D.parameterStructures === X.ParameterStructures.byPosition &&
                i.error(
                  `Notification ${y.method} defines parameters by position but received parameters by name`
                ),
                M(y.params));
          else p && p(y.method, y.params);
        } catch (W) {
          W.message
            ? i.error(`Notification handler '${y.method}' failed with message: ${W.message}`)
            : i.error(`Notification handler '${y.method}' failed unexpectedly.`);
        }
      else fe.fire(y);
    }
    function gt(y) {
      if (!y) {
        i.error('Received empty message.');
        return;
      }
      i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(y, null, 4)}`);
      let D = y;
      if (Ae.string(D.id) || Ae.number(D.id)) {
        let M = D.id,
          W = L.get(M);
        W &&
          W.reject(new Error('The received response has neither a result nor an error property.'));
      }
    }
    function Ge(y) {
      if (y != null)
        switch (x) {
          case ke.Verbose:
            return JSON.stringify(y, null, 4);
          case ke.Compact:
            return JSON.stringify(y);
          default:
            return;
        }
    }
    function pn(y) {
      if (!(x === ke.Off || !j))
        if (F === Dt.Text) {
          let D;
          ((x === ke.Verbose || x === ke.Compact) &&
            y.params &&
            (D = `Params: ${Ge(y.params)}

`),
            j.log(`Sending request '${y.method} - (${y.id})'.`, D));
        } else Pt('send-request', y);
    }
    function sr(y) {
      if (!(x === ke.Off || !j))
        if (F === Dt.Text) {
          let D;
          ((x === ke.Verbose || x === ke.Compact) &&
            (y.params
              ? (D = `Params: ${Ge(y.params)}

`)
              : (D = `No parameters provided.

`)),
            j.log(`Sending notification '${y.method}'.`, D));
        } else Pt('send-notification', y);
    }
    function Qt(y, D, M) {
      if (!(x === ke.Off || !j))
        if (F === Dt.Text) {
          let W;
          ((x === ke.Verbose || x === ke.Compact) &&
            (y.error && y.error.data
              ? (W = `Error data: ${Ge(y.error.data)}

`)
              : y.result
                ? (W = `Result: ${Ge(y.result)}

`)
                : y.error === void 0 &&
                  (W = `No result returned.

`)),
            j.log(
              `Sending response '${D} - (${y.id})'. Processing request took ${Date.now() - M}ms`,
              W
            ));
        } else Pt('send-response', y);
    }
    function Nn(y) {
      if (!(x === ke.Off || !j))
        if (F === Dt.Text) {
          let D;
          ((x === ke.Verbose || x === ke.Compact) &&
            y.params &&
            (D = `Params: ${Ge(y.params)}

`),
            j.log(`Received request '${y.method} - (${y.id})'.`, D));
        } else Pt('receive-request', y);
    }
    function rn(y) {
      if (!(x === ke.Off || !j || y.method === ro.type.method))
        if (F === Dt.Text) {
          let D;
          ((x === ke.Verbose || x === ke.Compact) &&
            (y.params
              ? (D = `Params: ${Ge(y.params)}

`)
              : (D = `No parameters provided.

`)),
            j.log(`Received notification '${y.method}'.`, D));
        } else Pt('receive-notification', y);
    }
    function ar(y, D) {
      if (!(x === ke.Off || !j))
        if (F === Dt.Text) {
          let M;
          if (
            ((x === ke.Verbose || x === ke.Compact) &&
              (y.error && y.error.data
                ? (M = `Error data: ${Ge(y.error.data)}

`)
                : y.result
                  ? (M = `Result: ${Ge(y.result)}

`)
                  : y.error === void 0 &&
                    (M = `No result returned.

`)),
            D)
          ) {
            let W = y.error ? ` Request failed: ${y.error.message} (${y.error.code}).` : '';
            j.log(
              `Received response '${D.method} - (${y.id})' in ${Date.now() - D.timerStart}ms.${W}`,
              M
            );
          } else j.log(`Received response ${y.id} without active response promise.`, M);
        } else Pt('receive-response', y);
    }
    function Pt(y, D) {
      if (!j || x === ke.Off) return;
      let M = { isLSPMessage: !0, type: y, message: D, timestamp: Date.now() };
      j.log(M);
    }
    function Bt() {
      if (Ye()) throw new yr(ii.Closed, 'Connection is closed.');
      if (v()) throw new yr(ii.Disposed, 'Connection is disposed.');
    }
    function ur() {
      if (Xe()) throw new yr(ii.AlreadyListening, 'Connection is already listening');
    }
    function cr() {
      if (!Xe()) throw new Error('Call listen() first.');
    }
    function qt(y) {
      return y === void 0 ? null : y;
    }
    function Ln(y) {
      if (y !== null) return y;
    }
    function Mn(y) {
      return y != null && !Array.isArray(y) && typeof y == 'object';
    }
    function P(y, D) {
      switch (y) {
        case X.ParameterStructures.auto:
          return Mn(D) ? Ln(D) : [qt(D)];
        case X.ParameterStructures.byName:
          if (!Mn(D))
            throw new Error('Received parameters by name but param is not an object literal.');
          return Ln(D);
        case X.ParameterStructures.byPosition:
          return [qt(D)];
        default:
          throw new Error(`Unknown parameter structure ${y.toString()}`);
      }
    }
    function H(y, D) {
      let M,
        W = y.numberOfParams;
      switch (W) {
        case 0:
          M = void 0;
          break;
        case 1:
          M = P(y.parameterStructures, D[0]);
          break;
        default:
          M = [];
          for (let ce = 0; ce < D.length && ce < W; ce++) M.push(qt(D[ce]));
          if (D.length < W) for (let ce = D.length; ce < W; ce++) M.push(null);
          break;
      }
      return M;
    }
    let Q = {
      sendNotification: (y, ...D) => {
        Bt();
        let M, W;
        if (Ae.string(y)) {
          M = y;
          let pe = D[0],
            we = 0,
            le = X.ParameterStructures.auto;
          X.ParameterStructures.is(pe) && ((we = 1), (le = pe));
          let ne = D.length,
            de = ne - we;
          switch (de) {
            case 0:
              W = void 0;
              break;
            case 1:
              W = P(le, D[we]);
              break;
            default:
              if (le === X.ParameterStructures.byName)
                throw new Error(
                  `Received ${de} parameters for 'by Name' notification parameter structure.`
                );
              W = D.slice(we, ne).map((be) => qt(be));
              break;
          }
        } else {
          let pe = D;
          ((M = y.method), (W = H(y, pe)));
        }
        let ce = { jsonrpc: u, method: M, params: W };
        return (
          sr(ce),
          t.write(ce).catch((pe) => {
            throw (i.error('Sending notification failed.'), pe);
          })
        );
      },
      onNotification: (y, D) => {
        Bt();
        let M;
        return (
          Ae.func(y)
            ? (p = y)
            : D &&
              (Ae.string(y)
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
      sendProgress: (y, D, M) => Q.sendNotification(ri.type, { token: D, value: M }),
      onUnhandledProgress: ge.event,
      sendRequest: (y, ...D) => {
        (Bt(), cr());
        let M, W, ce;
        if (Ae.string(y)) {
          M = y;
          let ne = D[0],
            de = D[D.length - 1],
            be = 0,
            qe = X.ParameterStructures.auto;
          X.ParameterStructures.is(ne) && ((be = 1), (qe = ne));
          let Ke = D.length;
          Ja.CancellationToken.is(de) && ((Ke = Ke - 1), (ce = de));
          let Ct = Ke - be;
          switch (Ct) {
            case 0:
              W = void 0;
              break;
            case 1:
              W = P(qe, D[be]);
              break;
            default:
              if (qe === X.ParameterStructures.byName)
                throw new Error(
                  `Received ${Ct} parameters for 'by Name' request parameter structure.`
                );
              W = D.slice(be, Ke).map((zi) => qt(zi));
              break;
          }
        } else {
          let ne = D;
          ((M = y.method), (W = H(y, ne)));
          let de = y.numberOfParams;
          ce = Ja.CancellationToken.is(ne[de]) ? ne[de] : void 0;
        }
        let pe = o++,
          we;
        ce &&
          (we = ce.onCancellationRequested(() => {
            let ne = ue.sender.sendCancellation(Q, pe);
            return ne === void 0
              ? (i.log(`Received no promise from cancellation strategy when cancelling id ${pe}`),
                Promise.resolve())
              : ne.catch(() => {
                  i.log(`Sending cancellation messages for id ${pe} failed`);
                });
          }));
        let le = { jsonrpc: u, id: pe, method: M, params: W };
        return (
          pn(le),
          typeof ue.sender.enableCancellation == 'function' && ue.sender.enableCancellation(le),
          new Promise(async (ne, de) => {
            let be = (Ct) => {
                (ne(Ct), ue.sender.cleanup(pe), we?.dispose());
              },
              qe = (Ct) => {
                (de(Ct), ue.sender.cleanup(pe), we?.dispose());
              },
              Ke = { method: M, timerStart: Date.now(), resolve: be, reject: qe };
            try {
              (await t.write(le), L.set(pe, Ke));
            } catch (Ct) {
              throw (
                i.error('Sending request failed.'),
                Ke.reject(
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
        Bt();
        let M = null;
        return (
          eu.is(y)
            ? ((M = void 0), (c = y))
            : Ae.string(y)
              ? ((M = null), D !== void 0 && ((M = y), l.set(y, { handler: D, type: void 0 })))
              : D !== void 0 && ((M = y.method), l.set(y.method, { type: y, handler: D })),
          {
            dispose: () => {
              M !== null && (M !== void 0 ? l.delete(M) : (c = void 0));
            },
          }
        );
      },
      hasPendingResponse: () => L.size > 0,
      trace: async (y, D, M) => {
        let W = !1,
          ce = Dt.Text;
        (M !== void 0 &&
          (Ae.boolean(M)
            ? (W = M)
            : ((W = M.sendNotification || !1), (ce = M.traceFormat || Dt.Text))),
          (x = y),
          (F = ce),
          x === ke.Off ? (j = void 0) : (j = D),
          W && !Ye() && !v() && (await Q.sendNotification(tu.type, { value: ke.toString(y) })));
      },
      onError: Z.event,
      onClose: ye.event,
      onUnhandledNotification: fe.event,
      onDispose: Ne.event,
      end: () => {
        t.end();
      },
      dispose: () => {
        if (v()) return;
        ((E = Ut.Disposed), Ne.fire(void 0));
        let y = new X.ResponseError(
          X.ErrorCodes.PendingResponseRejected,
          'Pending response rejected since connection got disposed'
        );
        for (let D of L.values()) D.reject(y);
        ((L = new Map()),
          (S = new Map()),
          (A = new Set()),
          (I = new df.LinkedMap()),
          Ae.func(t.dispose) && t.dispose(),
          Ae.func(e.dispose) && e.dispose());
      },
      listen: () => {
        (Bt(), ur(), (E = Ut.Listening), e.listen(nn));
      },
      inspect: () => {
        (0, ff.default)().console.log('inspect');
      },
    };
    return (
      Q.onNotification(ro.type, (y) => {
        if (x === ke.Off || !j) return;
        let D = x === ke.Verbose || x === ke.Compact;
        j.log(y.message, D ? y.verbose : void 0);
      }),
      Q.onNotification(ri.type, (y) => {
        let D = h.get(y.token);
        D ? D(y.value) : ge.fire(y);
      }),
      Q
    );
  }
  se.createMessageConnection = Tx;
});
var co = O((q) => {
  'use strict';
  Object.defineProperty(q, '__esModule', { value: !0 });
  q.ProgressType =
    q.ProgressToken =
    q.createMessageConnection =
    q.NullLogger =
    q.ConnectionOptions =
    q.ConnectionStrategy =
    q.AbstractMessageBuffer =
    q.WriteableStreamMessageWriter =
    q.AbstractMessageWriter =
    q.MessageWriter =
    q.ReadableStreamMessageReader =
    q.AbstractMessageReader =
    q.MessageReader =
    q.SharedArrayReceiverStrategy =
    q.SharedArraySenderStrategy =
    q.CancellationToken =
    q.CancellationTokenSource =
    q.Emitter =
    q.Event =
    q.Disposable =
    q.LRUCache =
    q.Touch =
    q.LinkedMap =
    q.ParameterStructures =
    q.NotificationType9 =
    q.NotificationType8 =
    q.NotificationType7 =
    q.NotificationType6 =
    q.NotificationType5 =
    q.NotificationType4 =
    q.NotificationType3 =
    q.NotificationType2 =
    q.NotificationType1 =
    q.NotificationType0 =
    q.NotificationType =
    q.ErrorCodes =
    q.ResponseError =
    q.RequestType9 =
    q.RequestType8 =
    q.RequestType7 =
    q.RequestType6 =
    q.RequestType5 =
    q.RequestType4 =
    q.RequestType3 =
    q.RequestType2 =
    q.RequestType1 =
    q.RequestType0 =
    q.RequestType =
    q.Message =
    q.RAL =
      void 0;
  q.MessageStrategy =
    q.CancellationStrategy =
    q.CancellationSenderStrategy =
    q.CancellationReceiverStrategy =
    q.ConnectionError =
    q.ConnectionErrors =
    q.LogTraceNotification =
    q.SetTraceNotification =
    q.TraceFormat =
    q.TraceValues =
    q.Trace =
      void 0;
  var Ce = Ra();
  Object.defineProperty(q, 'Message', {
    enumerable: !0,
    get: function () {
      return Ce.Message;
    },
  });
  Object.defineProperty(q, 'RequestType', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType;
    },
  });
  Object.defineProperty(q, 'RequestType0', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType0;
    },
  });
  Object.defineProperty(q, 'RequestType1', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType1;
    },
  });
  Object.defineProperty(q, 'RequestType2', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType2;
    },
  });
  Object.defineProperty(q, 'RequestType3', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType3;
    },
  });
  Object.defineProperty(q, 'RequestType4', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType4;
    },
  });
  Object.defineProperty(q, 'RequestType5', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType5;
    },
  });
  Object.defineProperty(q, 'RequestType6', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType6;
    },
  });
  Object.defineProperty(q, 'RequestType7', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType7;
    },
  });
  Object.defineProperty(q, 'RequestType8', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType8;
    },
  });
  Object.defineProperty(q, 'RequestType9', {
    enumerable: !0,
    get: function () {
      return Ce.RequestType9;
    },
  });
  Object.defineProperty(q, 'ResponseError', {
    enumerable: !0,
    get: function () {
      return Ce.ResponseError;
    },
  });
  Object.defineProperty(q, 'ErrorCodes', {
    enumerable: !0,
    get: function () {
      return Ce.ErrorCodes;
    },
  });
  Object.defineProperty(q, 'NotificationType', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType;
    },
  });
  Object.defineProperty(q, 'NotificationType0', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType0;
    },
  });
  Object.defineProperty(q, 'NotificationType1', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType1;
    },
  });
  Object.defineProperty(q, 'NotificationType2', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType2;
    },
  });
  Object.defineProperty(q, 'NotificationType3', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType3;
    },
  });
  Object.defineProperty(q, 'NotificationType4', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType4;
    },
  });
  Object.defineProperty(q, 'NotificationType5', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType5;
    },
  });
  Object.defineProperty(q, 'NotificationType6', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType6;
    },
  });
  Object.defineProperty(q, 'NotificationType7', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType7;
    },
  });
  Object.defineProperty(q, 'NotificationType8', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType8;
    },
  });
  Object.defineProperty(q, 'NotificationType9', {
    enumerable: !0,
    get: function () {
      return Ce.NotificationType9;
    },
  });
  Object.defineProperty(q, 'ParameterStructures', {
    enumerable: !0,
    get: function () {
      return Ce.ParameterStructures;
    },
  });
  var iu = Pa();
  Object.defineProperty(q, 'LinkedMap', {
    enumerable: !0,
    get: function () {
      return iu.LinkedMap;
    },
  });
  Object.defineProperty(q, 'LRUCache', {
    enumerable: !0,
    get: function () {
      return iu.LRUCache;
    },
  });
  Object.defineProperty(q, 'Touch', {
    enumerable: !0,
    get: function () {
      return iu.Touch;
    },
  });
  var Cx = Xl();
  Object.defineProperty(q, 'Disposable', {
    enumerable: !0,
    get: function () {
      return Cx.Disposable;
    },
  });
  var gf = pr();
  Object.defineProperty(q, 'Event', {
    enumerable: !0,
    get: function () {
      return gf.Event;
    },
  });
  Object.defineProperty(q, 'Emitter', {
    enumerable: !0,
    get: function () {
      return gf.Emitter;
    },
  });
  var yf = Zi();
  Object.defineProperty(q, 'CancellationTokenSource', {
    enumerable: !0,
    get: function () {
      return yf.CancellationTokenSource;
    },
  });
  Object.defineProperty(q, 'CancellationToken', {
    enumerable: !0,
    get: function () {
      return yf.CancellationToken;
    },
  });
  var bf = tf();
  Object.defineProperty(q, 'SharedArraySenderStrategy', {
    enumerable: !0,
    get: function () {
      return bf.SharedArraySenderStrategy;
    },
  });
  Object.defineProperty(q, 'SharedArrayReceiverStrategy', {
    enumerable: !0,
    get: function () {
      return bf.SharedArrayReceiverStrategy;
    },
  });
  var ou = rf();
  Object.defineProperty(q, 'MessageReader', {
    enumerable: !0,
    get: function () {
      return ou.MessageReader;
    },
  });
  Object.defineProperty(q, 'AbstractMessageReader', {
    enumerable: !0,
    get: function () {
      return ou.AbstractMessageReader;
    },
  });
  Object.defineProperty(q, 'ReadableStreamMessageReader', {
    enumerable: !0,
    get: function () {
      return ou.ReadableStreamMessageReader;
    },
  });
  var su = cf();
  Object.defineProperty(q, 'MessageWriter', {
    enumerable: !0,
    get: function () {
      return su.MessageWriter;
    },
  });
  Object.defineProperty(q, 'AbstractMessageWriter', {
    enumerable: !0,
    get: function () {
      return su.AbstractMessageWriter;
    },
  });
  Object.defineProperty(q, 'WriteableStreamMessageWriter', {
    enumerable: !0,
    get: function () {
      return su.WriteableStreamMessageWriter;
    },
  });
  var Dx = lf();
  Object.defineProperty(q, 'AbstractMessageBuffer', {
    enumerable: !0,
    get: function () {
      return Dx.AbstractMessageBuffer;
    },
  });
  var tt = mf();
  Object.defineProperty(q, 'ConnectionStrategy', {
    enumerable: !0,
    get: function () {
      return tt.ConnectionStrategy;
    },
  });
  Object.defineProperty(q, 'ConnectionOptions', {
    enumerable: !0,
    get: function () {
      return tt.ConnectionOptions;
    },
  });
  Object.defineProperty(q, 'NullLogger', {
    enumerable: !0,
    get: function () {
      return tt.NullLogger;
    },
  });
  Object.defineProperty(q, 'createMessageConnection', {
    enumerable: !0,
    get: function () {
      return tt.createMessageConnection;
    },
  });
  Object.defineProperty(q, 'ProgressToken', {
    enumerable: !0,
    get: function () {
      return tt.ProgressToken;
    },
  });
  Object.defineProperty(q, 'ProgressType', {
    enumerable: !0,
    get: function () {
      return tt.ProgressType;
    },
  });
  Object.defineProperty(q, 'Trace', {
    enumerable: !0,
    get: function () {
      return tt.Trace;
    },
  });
  Object.defineProperty(q, 'TraceValues', {
    enumerable: !0,
    get: function () {
      return tt.TraceValues;
    },
  });
  Object.defineProperty(q, 'TraceFormat', {
    enumerable: !0,
    get: function () {
      return tt.TraceFormat;
    },
  });
  Object.defineProperty(q, 'SetTraceNotification', {
    enumerable: !0,
    get: function () {
      return tt.SetTraceNotification;
    },
  });
  Object.defineProperty(q, 'LogTraceNotification', {
    enumerable: !0,
    get: function () {
      return tt.LogTraceNotification;
    },
  });
  Object.defineProperty(q, 'ConnectionErrors', {
    enumerable: !0,
    get: function () {
      return tt.ConnectionErrors;
    },
  });
  Object.defineProperty(q, 'ConnectionError', {
    enumerable: !0,
    get: function () {
      return tt.ConnectionError;
    },
  });
  Object.defineProperty(q, 'CancellationReceiverStrategy', {
    enumerable: !0,
    get: function () {
      return tt.CancellationReceiverStrategy;
    },
  });
  Object.defineProperty(q, 'CancellationSenderStrategy', {
    enumerable: !0,
    get: function () {
      return tt.CancellationSenderStrategy;
    },
  });
  Object.defineProperty(q, 'CancellationStrategy', {
    enumerable: !0,
    get: function () {
      return tt.CancellationStrategy;
    },
  });
  Object.defineProperty(q, 'MessageStrategy', {
    enumerable: !0,
    get: function () {
      return tt.MessageStrategy;
    },
  });
  var Ex = gn();
  q.RAL = Ex.default;
});
var wf = O((lu) => {
  'use strict';
  Object.defineProperty(lu, '__esModule', { value: !0 });
  var vf = require('util'),
    sn = co(),
    lo = class e extends sn.AbstractMessageBuffer {
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
        return t instanceof Buffer ? t.toString(n) : new vf.TextDecoder(n).decode(t);
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
  lo.emptyBuffer = Buffer.allocUnsafe(0);
  var au = class {
      constructor(t) {
        this.stream = t;
      }
      onClose(t) {
        return (
          this.stream.on('close', t),
          sn.Disposable.create(() => this.stream.off('close', t))
        );
      }
      onError(t) {
        return (
          this.stream.on('error', t),
          sn.Disposable.create(() => this.stream.off('error', t))
        );
      }
      onEnd(t) {
        return (this.stream.on('end', t), sn.Disposable.create(() => this.stream.off('end', t)));
      }
      onData(t) {
        return (this.stream.on('data', t), sn.Disposable.create(() => this.stream.off('data', t)));
      }
    },
    uu = class {
      constructor(t) {
        this.stream = t;
      }
      onClose(t) {
        return (
          this.stream.on('close', t),
          sn.Disposable.create(() => this.stream.off('close', t))
        );
      }
      onError(t) {
        return (
          this.stream.on('error', t),
          sn.Disposable.create(() => this.stream.off('error', t))
        );
      }
      onEnd(t) {
        return (this.stream.on('end', t), sn.Disposable.create(() => this.stream.off('end', t)));
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
    xf = Object.freeze({
      messageBuffer: Object.freeze({ create: (e) => new lo(e) }),
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
                : Promise.resolve(JSON.parse(new vf.TextDecoder(t.charset).decode(e)));
            } catch (n) {
              return Promise.reject(n);
            }
          },
        }),
      }),
      stream: Object.freeze({
        asReadableStream: (e) => new au(e),
        asWritableStream: (e) => new uu(e),
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
  function cu() {
    return xf;
  }
  (function (e) {
    function t() {
      sn.RAL.install(xf);
    }
    e.install = t;
  })(cu || (cu = {}));
  lu.default = cu;
});
var zn = O((me) => {
  'use strict';
  var Rx =
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
    Ax =
      (me && me.__exportStar) ||
      function (e, t) {
        for (var n in e)
          n !== 'default' && !Object.prototype.hasOwnProperty.call(t, n) && Rx(t, e, n);
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
  var br = wf();
  br.default.install();
  var kf = require('path'),
    Px = require('os'),
    qx = require('crypto'),
    ho = require('net'),
    Et = co();
  Ax(co(), me);
  var fu = class extends Et.AbstractMessageReader {
    constructor(t) {
      (super(), (this.process = t));
      let n = this.process;
      (n.on('error', (r) => this.fireError(r)), n.on('close', () => this.fireClose()));
    }
    listen(t) {
      return (
        this.process.on('message', t),
        Et.Disposable.create(() => this.process.off('message', t))
      );
    }
  };
  me.IPCMessageReader = fu;
  var du = class extends Et.AbstractMessageWriter {
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
  me.IPCMessageWriter = du;
  var pu = class extends Et.AbstractMessageReader {
    constructor(t) {
      (super(),
        (this.onData = new Et.Emitter()),
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
  me.PortMessageReader = pu;
  var hu = class extends Et.AbstractMessageWriter {
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
  me.PortMessageWriter = hu;
  var Bn = class extends Et.ReadableStreamMessageReader {
    constructor(t, n = 'utf-8') {
      super((0, br.default)().stream.asReadableStream(t), n);
    }
  };
  me.SocketMessageReader = Bn;
  var Hn = class extends Et.WriteableStreamMessageWriter {
    constructor(t, n) {
      (super((0, br.default)().stream.asWritableStream(t), n), (this.socket = t));
    }
    dispose() {
      (super.dispose(), this.socket.destroy());
    }
  };
  me.SocketMessageWriter = Hn;
  var fo = class extends Et.ReadableStreamMessageReader {
    constructor(t, n) {
      super((0, br.default)().stream.asReadableStream(t), n);
    }
  };
  me.StreamMessageReader = fo;
  var po = class extends Et.WriteableStreamMessageWriter {
    constructor(t, n) {
      super((0, br.default)().stream.asWritableStream(t), n);
    }
  };
  me.StreamMessageWriter = po;
  var _f = process.env.XDG_RUNTIME_DIR,
    Ox = new Map([
      ['linux', 107],
      ['darwin', 103],
    ]);
  function Ix() {
    let e = (0, qx.randomBytes)(21).toString('hex');
    if (process.platform === 'win32') return `\\\\.\\pipe\\vscode-jsonrpc-${e}-sock`;
    let t;
    _f ? (t = kf.join(_f, `vscode-ipc-${e}.sock`)) : (t = kf.join(Px.tmpdir(), `vscode-${e}.sock`));
    let n = Ox.get(process.platform);
    return (
      n !== void 0 &&
        t.length > n &&
        (0, br.default)().console.warn(
          `WARNING: IPC handle "${t}" is longer than ${n} characters.`
        ),
      t
    );
  }
  me.generateRandomPipeName = Ix;
  function Fx(e, t = 'utf-8') {
    let n,
      r = new Promise((i, o) => {
        n = i;
      });
    return new Promise((i, o) => {
      let s = (0, ho.createServer)((a) => {
        (s.close(), n([new Bn(a, t), new Hn(a, t)]));
      });
      (s.on('error', o),
        s.listen(e, () => {
          (s.removeListener('error', o), i({ onConnected: () => r }));
        }));
    });
  }
  me.createClientPipeTransport = Fx;
  function Nx(e, t = 'utf-8') {
    let n = (0, ho.createConnection)(e);
    return [new Bn(n, t), new Hn(n, t)];
  }
  me.createServerPipeTransport = Nx;
  function Lx(e, t = 'utf-8') {
    let n,
      r = new Promise((i, o) => {
        n = i;
      });
    return new Promise((i, o) => {
      let s = (0, ho.createServer)((a) => {
        (s.close(), n([new Bn(a, t), new Hn(a, t)]));
      });
      (s.on('error', o),
        s.listen(e, '127.0.0.1', () => {
          (s.removeListener('error', o), i({ onConnected: () => r }));
        }));
    });
  }
  me.createClientSocketTransport = Lx;
  function Mx(e, t = 'utf-8') {
    let n = (0, ho.createConnection)(e, '127.0.0.1');
    return [new Bn(n, t), new Hn(n, t)];
  }
  me.createServerSocketTransport = Mx;
  function jx(e) {
    let t = e;
    return t.read !== void 0 && t.addListener !== void 0;
  }
  function Bx(e) {
    let t = e;
    return t.write !== void 0 && t.addListener !== void 0;
  }
  function Hx(e, t, n, r) {
    n || (n = Et.NullLogger);
    let i = jx(e) ? new fo(e) : e,
      o = Bx(t) ? new po(t) : t;
    return (
      Et.ConnectionStrategy.is(r) && (r = { connectionStrategy: r }),
      (0, Et.createMessageConnection)(i, o, n, r)
    );
  }
  me.createMessageConnection = Hx;
});
var mu = O((dA, Sf) => {
  'use strict';
  Sf.exports = zn();
});
var go = O((Tf, mo) => {
  (function (e) {
    if (typeof mo == 'object' && typeof mo.exports == 'object') {
      var t = e(require, Tf);
      t !== void 0 && (mo.exports = t);
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
      function w(_) {
        return typeof _ == 'string';
      }
      d.is = w;
    })(n || (t.DocumentUri = n = {}));
    var r;
    (function (d) {
      function w(_) {
        return typeof _ == 'string';
      }
      d.is = w;
    })(r || (t.URI = r = {}));
    var i;
    (function (d) {
      ((d.MIN_VALUE = -2147483648), (d.MAX_VALUE = 2147483647));
      function w(_) {
        return typeof _ == 'number' && d.MIN_VALUE <= _ && _ <= d.MAX_VALUE;
      }
      d.is = w;
    })(i || (t.integer = i = {}));
    var o;
    (function (d) {
      ((d.MIN_VALUE = 0), (d.MAX_VALUE = 2147483647));
      function w(_) {
        return typeof _ == 'number' && d.MIN_VALUE <= _ && _ <= d.MAX_VALUE;
      }
      d.is = w;
    })(o || (t.uinteger = o = {}));
    var s;
    (function (d) {
      function w(g, f) {
        return (
          g === Number.MAX_VALUE && (g = o.MAX_VALUE),
          f === Number.MAX_VALUE && (f = o.MAX_VALUE),
          { line: g, character: f }
        );
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.objectLiteral(f) && C.uinteger(f.line) && C.uinteger(f.character);
      }
      d.is = _;
    })(s || (t.Position = s = {}));
    var a;
    (function (d) {
      function w(g, f, T, N) {
        if (C.uinteger(g) && C.uinteger(f) && C.uinteger(T) && C.uinteger(N))
          return { start: s.create(g, f), end: s.create(T, N) };
        if (s.is(g) && s.is(f)) return { start: g, end: f };
        throw new Error(
          'Range#create called with invalid arguments['
            .concat(g, ', ')
            .concat(f, ', ')
            .concat(T, ', ')
            .concat(N, ']')
        );
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.objectLiteral(f) && s.is(f.start) && s.is(f.end);
      }
      d.is = _;
    })(a || (t.Range = a = {}));
    var u;
    (function (d) {
      function w(g, f) {
        return { uri: g, range: f };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.objectLiteral(f) && a.is(f.range) && (C.string(f.uri) || C.undefined(f.uri));
      }
      d.is = _;
    })(u || (t.Location = u = {}));
    var c;
    (function (d) {
      function w(g, f, T, N) {
        return { targetUri: g, targetRange: f, targetSelectionRange: T, originSelectionRange: N };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          C.objectLiteral(f) &&
          a.is(f.targetRange) &&
          C.string(f.targetUri) &&
          a.is(f.targetSelectionRange) &&
          (a.is(f.originSelectionRange) || C.undefined(f.originSelectionRange))
        );
      }
      d.is = _;
    })(c || (t.LocationLink = c = {}));
    var l;
    (function (d) {
      function w(g, f, T, N) {
        return { red: g, green: f, blue: T, alpha: N };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          C.objectLiteral(f) &&
          C.numberRange(f.red, 0, 1) &&
          C.numberRange(f.green, 0, 1) &&
          C.numberRange(f.blue, 0, 1) &&
          C.numberRange(f.alpha, 0, 1)
        );
      }
      d.is = _;
    })(l || (t.Color = l = {}));
    var p;
    (function (d) {
      function w(g, f) {
        return { range: g, color: f };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.objectLiteral(f) && a.is(f.range) && l.is(f.color);
      }
      d.is = _;
    })(p || (t.ColorInformation = p = {}));
    var m;
    (function (d) {
      function w(g, f, T) {
        return { label: g, textEdit: f, additionalTextEdits: T };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          C.objectLiteral(f) &&
          C.string(f.label) &&
          (C.undefined(f.textEdit) || j.is(f)) &&
          (C.undefined(f.additionalTextEdits) || C.typedArray(f.additionalTextEdits, j.is))
        );
      }
      d.is = _;
    })(m || (t.ColorPresentation = m = {}));
    var h;
    (function (d) {
      ((d.Comment = 'comment'), (d.Imports = 'imports'), (d.Region = 'region'));
    })(h || (t.FoldingRangeKind = h = {}));
    var R;
    (function (d) {
      function w(g, f, T, N, oe, Oe) {
        var Te = { startLine: g, endLine: f };
        return (
          C.defined(T) && (Te.startCharacter = T),
          C.defined(N) && (Te.endCharacter = N),
          C.defined(oe) && (Te.kind = oe),
          C.defined(Oe) && (Te.collapsedText = Oe),
          Te
        );
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          C.objectLiteral(f) &&
          C.uinteger(f.startLine) &&
          C.uinteger(f.startLine) &&
          (C.undefined(f.startCharacter) || C.uinteger(f.startCharacter)) &&
          (C.undefined(f.endCharacter) || C.uinteger(f.endCharacter)) &&
          (C.undefined(f.kind) || C.string(f.kind))
        );
      }
      d.is = _;
    })(R || (t.FoldingRange = R = {}));
    var I;
    (function (d) {
      function w(g, f) {
        return { location: g, message: f };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.defined(f) && u.is(f.location) && C.string(f.message);
      }
      d.is = _;
    })(I || (t.DiagnosticRelatedInformation = I = {}));
    var L;
    (function (d) {
      ((d.Error = 1), (d.Warning = 2), (d.Information = 3), (d.Hint = 4));
    })(L || (t.DiagnosticSeverity = L = {}));
    var A;
    (function (d) {
      ((d.Unnecessary = 1), (d.Deprecated = 2));
    })(A || (t.DiagnosticTag = A = {}));
    var S;
    (function (d) {
      function w(_) {
        var g = _;
        return C.objectLiteral(g) && C.string(g.href);
      }
      d.is = w;
    })(S || (t.CodeDescription = S = {}));
    var x;
    (function (d) {
      function w(g, f, T, N, oe, Oe) {
        var Te = { range: g, message: f };
        return (
          C.defined(T) && (Te.severity = T),
          C.defined(N) && (Te.code = N),
          C.defined(oe) && (Te.source = oe),
          C.defined(Oe) && (Te.relatedInformation = Oe),
          Te
        );
      }
      d.create = w;
      function _(g) {
        var f,
          T = g;
        return (
          C.defined(T) &&
          a.is(T.range) &&
          C.string(T.message) &&
          (C.number(T.severity) || C.undefined(T.severity)) &&
          (C.integer(T.code) || C.string(T.code) || C.undefined(T.code)) &&
          (C.undefined(T.codeDescription) ||
            C.string((f = T.codeDescription) === null || f === void 0 ? void 0 : f.href)) &&
          (C.string(T.source) || C.undefined(T.source)) &&
          (C.undefined(T.relatedInformation) || C.typedArray(T.relatedInformation, I.is))
        );
      }
      d.is = _;
    })(x || (t.Diagnostic = x = {}));
    var F;
    (function (d) {
      function w(g, f) {
        for (var T = [], N = 2; N < arguments.length; N++) T[N - 2] = arguments[N];
        var oe = { title: g, command: f };
        return (C.defined(T) && T.length > 0 && (oe.arguments = T), oe);
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.defined(f) && C.string(f.title) && C.string(f.command);
      }
      d.is = _;
    })(F || (t.Command = F = {}));
    var j;
    (function (d) {
      function w(T, N) {
        return { range: T, newText: N };
      }
      d.replace = w;
      function _(T, N) {
        return { range: { start: T, end: T }, newText: N };
      }
      d.insert = _;
      function g(T) {
        return { range: T, newText: '' };
      }
      d.del = g;
      function f(T) {
        var N = T;
        return C.objectLiteral(N) && C.string(N.newText) && a.is(N.range);
      }
      d.is = f;
    })(j || (t.TextEdit = j = {}));
    var E;
    (function (d) {
      function w(g, f, T) {
        var N = { label: g };
        return (f !== void 0 && (N.needsConfirmation = f), T !== void 0 && (N.description = T), N);
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          C.objectLiteral(f) &&
          C.string(f.label) &&
          (C.boolean(f.needsConfirmation) || f.needsConfirmation === void 0) &&
          (C.string(f.description) || f.description === void 0)
        );
      }
      d.is = _;
    })(E || (t.ChangeAnnotation = E = {}));
    var Z;
    (function (d) {
      function w(_) {
        var g = _;
        return C.string(g);
      }
      d.is = w;
    })(Z || (t.ChangeAnnotationIdentifier = Z = {}));
    var ye;
    (function (d) {
      function w(T, N, oe) {
        return { range: T, newText: N, annotationId: oe };
      }
      d.replace = w;
      function _(T, N, oe) {
        return { range: { start: T, end: T }, newText: N, annotationId: oe };
      }
      d.insert = _;
      function g(T, N) {
        return { range: T, newText: '', annotationId: N };
      }
      d.del = g;
      function f(T) {
        var N = T;
        return j.is(N) && (E.is(N.annotationId) || Z.is(N.annotationId));
      }
      d.is = f;
    })(ye || (t.AnnotatedTextEdit = ye = {}));
    var fe;
    (function (d) {
      function w(g, f) {
        return { textDocument: g, edits: f };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.defined(f) && Ye.is(f.textDocument) && Array.isArray(f.edits);
      }
      d.is = _;
    })(fe || (t.TextDocumentEdit = fe = {}));
    var ge;
    (function (d) {
      function w(g, f, T) {
        var N = { kind: 'create', uri: g };
        return (
          f !== void 0 &&
            (f.overwrite !== void 0 || f.ignoreIfExists !== void 0) &&
            (N.options = f),
          T !== void 0 && (N.annotationId = T),
          N
        );
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          f &&
          f.kind === 'create' &&
          C.string(f.uri) &&
          (f.options === void 0 ||
            ((f.options.overwrite === void 0 || C.boolean(f.options.overwrite)) &&
              (f.options.ignoreIfExists === void 0 || C.boolean(f.options.ignoreIfExists)))) &&
          (f.annotationId === void 0 || Z.is(f.annotationId))
        );
      }
      d.is = _;
    })(ge || (t.CreateFile = ge = {}));
    var Ne;
    (function (d) {
      function w(g, f, T, N) {
        var oe = { kind: 'rename', oldUri: g, newUri: f };
        return (
          T !== void 0 &&
            (T.overwrite !== void 0 || T.ignoreIfExists !== void 0) &&
            (oe.options = T),
          N !== void 0 && (oe.annotationId = N),
          oe
        );
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          f &&
          f.kind === 'rename' &&
          C.string(f.oldUri) &&
          C.string(f.newUri) &&
          (f.options === void 0 ||
            ((f.options.overwrite === void 0 || C.boolean(f.options.overwrite)) &&
              (f.options.ignoreIfExists === void 0 || C.boolean(f.options.ignoreIfExists)))) &&
          (f.annotationId === void 0 || Z.is(f.annotationId))
        );
      }
      d.is = _;
    })(Ne || (t.RenameFile = Ne = {}));
    var ue;
    (function (d) {
      function w(g, f, T) {
        var N = { kind: 'delete', uri: g };
        return (
          f !== void 0 &&
            (f.recursive !== void 0 || f.ignoreIfNotExists !== void 0) &&
            (N.options = f),
          T !== void 0 && (N.annotationId = T),
          N
        );
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          f &&
          f.kind === 'delete' &&
          C.string(f.uri) &&
          (f.options === void 0 ||
            ((f.options.recursive === void 0 || C.boolean(f.options.recursive)) &&
              (f.options.ignoreIfNotExists === void 0 ||
                C.boolean(f.options.ignoreIfNotExists)))) &&
          (f.annotationId === void 0 || Z.is(f.annotationId))
        );
      }
      d.is = _;
    })(ue || (t.DeleteFile = ue = {}));
    var V;
    (function (d) {
      function w(_) {
        var g = _;
        return (
          g &&
          (g.changes !== void 0 || g.documentChanges !== void 0) &&
          (g.documentChanges === void 0 ||
            g.documentChanges.every(function (f) {
              return C.string(f.kind) ? ge.is(f) || Ne.is(f) || ue.is(f) : fe.is(f);
            }))
        );
      }
      d.is = w;
    })(V || (t.WorkspaceEdit = V = {}));
    var ee = (function () {
        function d(w, _) {
          ((this.edits = w), (this.changeAnnotations = _));
        }
        return (
          (d.prototype.insert = function (w, _, g) {
            var f, T;
            if (
              (g === void 0
                ? (f = j.insert(w, _))
                : Z.is(g)
                  ? ((T = g), (f = ye.insert(w, _, g)))
                  : (this.assertChangeAnnotations(this.changeAnnotations),
                    (T = this.changeAnnotations.manage(g)),
                    (f = ye.insert(w, _, T))),
              this.edits.push(f),
              T !== void 0)
            )
              return T;
          }),
          (d.prototype.replace = function (w, _, g) {
            var f, T;
            if (
              (g === void 0
                ? (f = j.replace(w, _))
                : Z.is(g)
                  ? ((T = g), (f = ye.replace(w, _, g)))
                  : (this.assertChangeAnnotations(this.changeAnnotations),
                    (T = this.changeAnnotations.manage(g)),
                    (f = ye.replace(w, _, T))),
              this.edits.push(f),
              T !== void 0)
            )
              return T;
          }),
          (d.prototype.delete = function (w, _) {
            var g, f;
            if (
              (_ === void 0
                ? (g = j.del(w))
                : Z.is(_)
                  ? ((f = _), (g = ye.del(w, _)))
                  : (this.assertChangeAnnotations(this.changeAnnotations),
                    (f = this.changeAnnotations.manage(_)),
                    (g = ye.del(w, f))),
              this.edits.push(g),
              f !== void 0)
            )
              return f;
          }),
          (d.prototype.add = function (w) {
            this.edits.push(w);
          }),
          (d.prototype.all = function () {
            return this.edits;
          }),
          (d.prototype.clear = function () {
            this.edits.splice(0, this.edits.length);
          }),
          (d.prototype.assertChangeAnnotations = function (w) {
            if (w === void 0)
              throw new Error('Text edit change is not configured to manage change annotations.');
          }),
          d
        );
      })(),
      te = (function () {
        function d(w) {
          ((this._annotations = w === void 0 ? Object.create(null) : w),
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
          (d.prototype.manage = function (w, _) {
            var g;
            if (
              (Z.is(w) ? (g = w) : ((g = this.nextId()), (_ = w)), this._annotations[g] !== void 0)
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
      Se = (function () {
        function d(w) {
          var _ = this;
          ((this._textEditChanges = Object.create(null)),
            w !== void 0
              ? ((this._workspaceEdit = w),
                w.documentChanges
                  ? ((this._changeAnnotations = new te(w.changeAnnotations)),
                    (w.changeAnnotations = this._changeAnnotations.all()),
                    w.documentChanges.forEach(function (g) {
                      if (fe.is(g)) {
                        var f = new ee(g.edits, _._changeAnnotations);
                        _._textEditChanges[g.textDocument.uri] = f;
                      }
                    }))
                  : w.changes &&
                    Object.keys(w.changes).forEach(function (g) {
                      var f = new ee(w.changes[g]);
                      _._textEditChanges[g] = f;
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
          (d.prototype.getTextEditChange = function (w) {
            if (Ye.is(w)) {
              if ((this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0))
                throw new Error('Workspace edit is not configured for document changes.');
              var _ = { uri: w.uri, version: w.version },
                g = this._textEditChanges[_.uri];
              if (!g) {
                var f = [],
                  T = { textDocument: _, edits: f };
                (this._workspaceEdit.documentChanges.push(T),
                  (g = new ee(f, this._changeAnnotations)),
                  (this._textEditChanges[_.uri] = g));
              }
              return g;
            } else {
              if ((this.initChanges(), this._workspaceEdit.changes === void 0))
                throw new Error('Workspace edit is not configured for normal text edit changes.');
              var g = this._textEditChanges[w];
              if (!g) {
                var f = [];
                ((this._workspaceEdit.changes[w] = f),
                  (g = new ee(f)),
                  (this._textEditChanges[w] = g));
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
          (d.prototype.createFile = function (w, _, g) {
            if ((this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0))
              throw new Error('Workspace edit is not configured for document changes.');
            var f;
            E.is(_) || Z.is(_) ? (f = _) : (g = _);
            var T, N;
            if (
              (f === void 0
                ? (T = ge.create(w, g))
                : ((N = Z.is(f) ? f : this._changeAnnotations.manage(f)), (T = ge.create(w, g, N))),
              this._workspaceEdit.documentChanges.push(T),
              N !== void 0)
            )
              return N;
          }),
          (d.prototype.renameFile = function (w, _, g, f) {
            if ((this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0))
              throw new Error('Workspace edit is not configured for document changes.');
            var T;
            E.is(g) || Z.is(g) ? (T = g) : (f = g);
            var N, oe;
            if (
              (T === void 0
                ? (N = Ne.create(w, _, f))
                : ((oe = Z.is(T) ? T : this._changeAnnotations.manage(T)),
                  (N = Ne.create(w, _, f, oe))),
              this._workspaceEdit.documentChanges.push(N),
              oe !== void 0)
            )
              return oe;
          }),
          (d.prototype.deleteFile = function (w, _, g) {
            if ((this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0))
              throw new Error('Workspace edit is not configured for document changes.');
            var f;
            E.is(_) || Z.is(_) ? (f = _) : (g = _);
            var T, N;
            if (
              (f === void 0
                ? (T = ue.create(w, g))
                : ((N = Z.is(f) ? f : this._changeAnnotations.manage(f)), (T = ue.create(w, g, N))),
              this._workspaceEdit.documentChanges.push(T),
              N !== void 0)
            )
              return N;
          }),
          d
        );
      })();
    t.WorkspaceChange = Se;
    var Ee;
    (function (d) {
      function w(g) {
        return { uri: g };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.defined(f) && C.string(f.uri);
      }
      d.is = _;
    })(Ee || (t.TextDocumentIdentifier = Ee = {}));
    var Xe;
    (function (d) {
      function w(g, f) {
        return { uri: g, version: f };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.defined(f) && C.string(f.uri) && C.integer(f.version);
      }
      d.is = _;
    })(Xe || (t.VersionedTextDocumentIdentifier = Xe = {}));
    var Ye;
    (function (d) {
      function w(g, f) {
        return { uri: g, version: f };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.defined(f) && C.string(f.uri) && (f.version === null || C.integer(f.version));
      }
      d.is = _;
    })(Ye || (t.OptionalVersionedTextDocumentIdentifier = Ye = {}));
    var v;
    (function (d) {
      function w(g, f, T, N) {
        return { uri: g, languageId: f, version: T, text: N };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          C.defined(f) &&
          C.string(f.uri) &&
          C.string(f.languageId) &&
          C.integer(f.version) &&
          C.string(f.text)
        );
      }
      d.is = _;
    })(v || (t.TextDocumentItem = v = {}));
    var Ue;
    (function (d) {
      ((d.PlainText = 'plaintext'), (d.Markdown = 'markdown'));
      function w(_) {
        var g = _;
        return g === d.PlainText || g === d.Markdown;
      }
      d.is = w;
    })(Ue || (t.MarkupKind = Ue = {}));
    var et;
    (function (d) {
      function w(_) {
        var g = _;
        return C.objectLiteral(_) && Ue.is(g.kind) && C.string(g.value);
      }
      d.is = w;
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
    var We;
    (function (d) {
      ((d.PlainText = 1), (d.Snippet = 2));
    })(We || (t.InsertTextFormat = We = {}));
    var Tt;
    (function (d) {
      d.Deprecated = 1;
    })(Tt || (t.CompletionItemTag = Tt = {}));
    var dn;
    (function (d) {
      function w(g, f, T) {
        return { newText: g, insert: f, replace: T };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return f && C.string(f.newText) && a.is(f.insert) && a.is(f.replace);
      }
      d.is = _;
    })(dn || (t.InsertReplaceEdit = dn = {}));
    var nn;
    (function (d) {
      ((d.asIs = 1), (d.adjustIndentation = 2));
    })(nn || (t.InsertTextMode = nn = {}));
    var Pe;
    (function (d) {
      function w(_) {
        var g = _;
        return (
          g &&
          (C.string(g.detail) || g.detail === void 0) &&
          (C.string(g.description) || g.description === void 0)
        );
      }
      d.is = w;
    })(Pe || (t.CompletionItemLabelDetails = Pe = {}));
    var Kt;
    (function (d) {
      function w(_) {
        return { label: _ };
      }
      d.create = w;
    })(Kt || (t.CompletionItem = Kt = {}));
    var mt;
    (function (d) {
      function w(_, g) {
        return { items: _ || [], isIncomplete: !!g };
      }
      d.create = w;
    })(mt || (t.CompletionList = mt = {}));
    var gt;
    (function (d) {
      function w(g) {
        return g.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
      }
      d.fromPlainText = w;
      function _(g) {
        var f = g;
        return C.string(f) || (C.objectLiteral(f) && C.string(f.language) && C.string(f.value));
      }
      d.is = _;
    })(gt || (t.MarkedString = gt = {}));
    var Ge;
    (function (d) {
      function w(_) {
        var g = _;
        return (
          !!g &&
          C.objectLiteral(g) &&
          (et.is(g.contents) || gt.is(g.contents) || C.typedArray(g.contents, gt.is)) &&
          (_.range === void 0 || a.is(_.range))
        );
      }
      d.is = w;
    })(Ge || (t.Hover = Ge = {}));
    var pn;
    (function (d) {
      function w(_, g) {
        return g ? { label: _, documentation: g } : { label: _ };
      }
      d.create = w;
    })(pn || (t.ParameterInformation = pn = {}));
    var sr;
    (function (d) {
      function w(_, g) {
        for (var f = [], T = 2; T < arguments.length; T++) f[T - 2] = arguments[T];
        var N = { label: _ };
        return (
          C.defined(g) && (N.documentation = g),
          C.defined(f) ? (N.parameters = f) : (N.parameters = []),
          N
        );
      }
      d.create = w;
    })(sr || (t.SignatureInformation = sr = {}));
    var Qt;
    (function (d) {
      ((d.Text = 1), (d.Read = 2), (d.Write = 3));
    })(Qt || (t.DocumentHighlightKind = Qt = {}));
    var Nn;
    (function (d) {
      function w(_, g) {
        var f = { range: _ };
        return (C.number(g) && (f.kind = g), f);
      }
      d.create = w;
    })(Nn || (t.DocumentHighlight = Nn = {}));
    var rn;
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
    })(rn || (t.SymbolKind = rn = {}));
    var ar;
    (function (d) {
      d.Deprecated = 1;
    })(ar || (t.SymbolTag = ar = {}));
    var Pt;
    (function (d) {
      function w(_, g, f, T, N) {
        var oe = { name: _, kind: g, location: { uri: T, range: f } };
        return (N && (oe.containerName = N), oe);
      }
      d.create = w;
    })(Pt || (t.SymbolInformation = Pt = {}));
    var Bt;
    (function (d) {
      function w(_, g, f, T) {
        return T !== void 0
          ? { name: _, kind: g, location: { uri: f, range: T } }
          : { name: _, kind: g, location: { uri: f } };
      }
      d.create = w;
    })(Bt || (t.WorkspaceSymbol = Bt = {}));
    var ur;
    (function (d) {
      function w(g, f, T, N, oe, Oe) {
        var Te = { name: g, detail: f, kind: T, range: N, selectionRange: oe };
        return (Oe !== void 0 && (Te.children = Oe), Te);
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          f &&
          C.string(f.name) &&
          C.number(f.kind) &&
          a.is(f.range) &&
          a.is(f.selectionRange) &&
          (f.detail === void 0 || C.string(f.detail)) &&
          (f.deprecated === void 0 || C.boolean(f.deprecated)) &&
          (f.children === void 0 || Array.isArray(f.children)) &&
          (f.tags === void 0 || Array.isArray(f.tags))
        );
      }
      d.is = _;
    })(ur || (t.DocumentSymbol = ur = {}));
    var cr;
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
    })(cr || (t.CodeActionKind = cr = {}));
    var qt;
    (function (d) {
      ((d.Invoked = 1), (d.Automatic = 2));
    })(qt || (t.CodeActionTriggerKind = qt = {}));
    var Ln;
    (function (d) {
      function w(g, f, T) {
        var N = { diagnostics: g };
        return (f != null && (N.only = f), T != null && (N.triggerKind = T), N);
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          C.defined(f) &&
          C.typedArray(f.diagnostics, x.is) &&
          (f.only === void 0 || C.typedArray(f.only, C.string)) &&
          (f.triggerKind === void 0 ||
            f.triggerKind === qt.Invoked ||
            f.triggerKind === qt.Automatic)
        );
      }
      d.is = _;
    })(Ln || (t.CodeActionContext = Ln = {}));
    var Mn;
    (function (d) {
      function w(g, f, T) {
        var N = { title: g },
          oe = !0;
        return (
          typeof f == 'string'
            ? ((oe = !1), (N.kind = f))
            : F.is(f)
              ? (N.command = f)
              : (N.edit = f),
          oe && T !== void 0 && (N.kind = T),
          N
        );
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          f &&
          C.string(f.title) &&
          (f.diagnostics === void 0 || C.typedArray(f.diagnostics, x.is)) &&
          (f.kind === void 0 || C.string(f.kind)) &&
          (f.edit !== void 0 || f.command !== void 0) &&
          (f.command === void 0 || F.is(f.command)) &&
          (f.isPreferred === void 0 || C.boolean(f.isPreferred)) &&
          (f.edit === void 0 || V.is(f.edit))
        );
      }
      d.is = _;
    })(Mn || (t.CodeAction = Mn = {}));
    var P;
    (function (d) {
      function w(g, f) {
        var T = { range: g };
        return (C.defined(f) && (T.data = f), T);
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.defined(f) && a.is(f.range) && (C.undefined(f.command) || F.is(f.command));
      }
      d.is = _;
    })(P || (t.CodeLens = P = {}));
    var H;
    (function (d) {
      function w(g, f) {
        return { tabSize: g, insertSpaces: f };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.defined(f) && C.uinteger(f.tabSize) && C.boolean(f.insertSpaces);
      }
      d.is = _;
    })(H || (t.FormattingOptions = H = {}));
    var Q;
    (function (d) {
      function w(g, f, T) {
        return { range: g, target: f, data: T };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.defined(f) && a.is(f.range) && (C.undefined(f.target) || C.string(f.target));
      }
      d.is = _;
    })(Q || (t.DocumentLink = Q = {}));
    var y;
    (function (d) {
      function w(g, f) {
        return { range: g, parent: f };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.objectLiteral(f) && a.is(f.range) && (f.parent === void 0 || d.is(f.parent));
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
    var W;
    (function (d) {
      function w(_) {
        var g = _;
        return (
          C.objectLiteral(g) &&
          (g.resultId === void 0 || typeof g.resultId == 'string') &&
          Array.isArray(g.data) &&
          (g.data.length === 0 || typeof g.data[0] == 'number')
        );
      }
      d.is = w;
    })(W || (t.SemanticTokens = W = {}));
    var ce;
    (function (d) {
      function w(g, f) {
        return { range: g, text: f };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return f != null && a.is(f.range) && C.string(f.text);
      }
      d.is = _;
    })(ce || (t.InlineValueText = ce = {}));
    var pe;
    (function (d) {
      function w(g, f, T) {
        return { range: g, variableName: f, caseSensitiveLookup: T };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          f != null &&
          a.is(f.range) &&
          C.boolean(f.caseSensitiveLookup) &&
          (C.string(f.variableName) || f.variableName === void 0)
        );
      }
      d.is = _;
    })(pe || (t.InlineValueVariableLookup = pe = {}));
    var we;
    (function (d) {
      function w(g, f) {
        return { range: g, expression: f };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return f != null && a.is(f.range) && (C.string(f.expression) || f.expression === void 0);
      }
      d.is = _;
    })(we || (t.InlineValueEvaluatableExpression = we = {}));
    var le;
    (function (d) {
      function w(g, f) {
        return { frameId: g, stoppedLocation: f };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return C.defined(f) && a.is(g.stoppedLocation);
      }
      d.is = _;
    })(le || (t.InlineValueContext = le = {}));
    var ne;
    (function (d) {
      ((d.Type = 1), (d.Parameter = 2));
      function w(_) {
        return _ === 1 || _ === 2;
      }
      d.is = w;
    })(ne || (t.InlayHintKind = ne = {}));
    var de;
    (function (d) {
      function w(g) {
        return { value: g };
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          C.objectLiteral(f) &&
          (f.tooltip === void 0 || C.string(f.tooltip) || et.is(f.tooltip)) &&
          (f.location === void 0 || u.is(f.location)) &&
          (f.command === void 0 || F.is(f.command))
        );
      }
      d.is = _;
    })(de || (t.InlayHintLabelPart = de = {}));
    var be;
    (function (d) {
      function w(g, f, T) {
        var N = { position: g, label: f };
        return (T !== void 0 && (N.kind = T), N);
      }
      d.create = w;
      function _(g) {
        var f = g;
        return (
          (C.objectLiteral(f) &&
            s.is(f.position) &&
            (C.string(f.label) || C.typedArray(f.label, de.is)) &&
            (f.kind === void 0 || ne.is(f.kind)) &&
            f.textEdits === void 0) ||
          (C.typedArray(f.textEdits, j.is) &&
            (f.tooltip === void 0 || C.string(f.tooltip) || et.is(f.tooltip)) &&
            (f.paddingLeft === void 0 || C.boolean(f.paddingLeft)) &&
            (f.paddingRight === void 0 || C.boolean(f.paddingRight)))
        );
      }
      d.is = _;
    })(be || (t.InlayHint = be = {}));
    var qe;
    (function (d) {
      function w(_) {
        return { kind: 'snippet', value: _ };
      }
      d.createSnippet = w;
    })(qe || (t.StringValue = qe = {}));
    var Ke;
    (function (d) {
      function w(_, g, f, T) {
        return { insertText: _, filterText: g, range: f, command: T };
      }
      d.create = w;
    })(Ke || (t.InlineCompletionItem = Ke = {}));
    var Ct;
    (function (d) {
      function w(_) {
        return { items: _ };
      }
      d.create = w;
    })(Ct || (t.InlineCompletionList = Ct = {}));
    var zi;
    (function (d) {
      ((d.Invoked = 0), (d.Automatic = 1));
    })(zi || (t.InlineCompletionTriggerKind = zi = {}));
    var jl;
    (function (d) {
      function w(_, g) {
        return { range: _, text: g };
      }
      d.create = w;
    })(jl || (t.SelectedCompletionInfo = jl = {}));
    var Bl;
    (function (d) {
      function w(_, g) {
        return { triggerKind: _, selectedCompletionInfo: g };
      }
      d.create = w;
    })(Bl || (t.InlineCompletionContext = Bl = {}));
    var Hl;
    ((function (d) {
      function w(_) {
        var g = _;
        return C.objectLiteral(g) && r.is(g.uri) && C.string(g.name);
      }
      d.is = w;
    })(Hl || (t.WorkspaceFolder = Hl = {})),
      (t.EOL = [
        `
`,
        `\r
`,
        '\r',
      ]));
    var zl;
    (function (d) {
      function w(T, N, oe, Oe) {
        return new Q0(T, N, oe, Oe);
      }
      d.create = w;
      function _(T) {
        var N = T;
        return !!(
          C.defined(N) &&
          C.string(N.uri) &&
          (C.undefined(N.languageId) || C.string(N.languageId)) &&
          C.uinteger(N.lineCount) &&
          C.func(N.getText) &&
          C.func(N.positionAt) &&
          C.func(N.offsetAt)
        );
      }
      d.is = _;
      function g(T, N) {
        for (
          var oe = T.getText(),
            Oe = f(N, function (lr, Ui) {
              var Ul = lr.range.start.line - Ui.range.start.line;
              return Ul === 0 ? lr.range.start.character - Ui.range.start.character : Ul;
            }),
            Te = oe.length,
            Ht = Oe.length - 1;
          Ht >= 0;
          Ht--
        ) {
          var zt = Oe[Ht],
            on = T.offsetAt(zt.range.start),
            he = T.offsetAt(zt.range.end);
          if (he <= Te) oe = oe.substring(0, on) + zt.newText + oe.substring(he, oe.length);
          else throw new Error('Overlapping edit');
          Te = on;
        }
        return oe;
      }
      d.applyEdits = g;
      function f(T, N) {
        if (T.length <= 1) return T;
        var oe = (T.length / 2) | 0,
          Oe = T.slice(0, oe),
          Te = T.slice(oe);
        (f(Oe, N), f(Te, N));
        for (var Ht = 0, zt = 0, on = 0; Ht < Oe.length && zt < Te.length; ) {
          var he = N(Oe[Ht], Te[zt]);
          he <= 0 ? (T[on++] = Oe[Ht++]) : (T[on++] = Te[zt++]);
        }
        for (; Ht < Oe.length; ) T[on++] = Oe[Ht++];
        for (; zt < Te.length; ) T[on++] = Te[zt++];
        return T;
      }
    })(zl || (t.TextDocument = zl = {}));
    var Q0 = (function () {
        function d(w, _, g, f) {
          ((this._uri = w),
            (this._languageId = _),
            (this._version = g),
            (this._content = f),
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
          (d.prototype.getText = function (w) {
            if (w) {
              var _ = this.offsetAt(w.start),
                g = this.offsetAt(w.end);
              return this._content.substring(_, g);
            }
            return this._content;
          }),
          (d.prototype.update = function (w, _) {
            ((this._content = w.text), (this._version = _), (this._lineOffsets = void 0));
          }),
          (d.prototype.getLineOffsets = function () {
            if (this._lineOffsets === void 0) {
              for (var w = [], _ = this._content, g = !0, f = 0; f < _.length; f++) {
                g && (w.push(f), (g = !1));
                var T = _.charAt(f);
                ((g =
                  T === '\r' ||
                  T ===
                    `
`),
                  T === '\r' &&
                    f + 1 < _.length &&
                    _.charAt(f + 1) ===
                      `
` &&
                    f++);
              }
              (g && _.length > 0 && w.push(_.length), (this._lineOffsets = w));
            }
            return this._lineOffsets;
          }),
          (d.prototype.positionAt = function (w) {
            w = Math.max(Math.min(w, this._content.length), 0);
            var _ = this.getLineOffsets(),
              g = 0,
              f = _.length;
            if (f === 0) return s.create(0, w);
            for (; g < f; ) {
              var T = Math.floor((g + f) / 2);
              _[T] > w ? (f = T) : (g = T + 1);
            }
            var N = g - 1;
            return s.create(N, w - _[N]);
          }),
          (d.prototype.offsetAt = function (w) {
            var _ = this.getLineOffsets();
            if (w.line >= _.length) return this._content.length;
            if (w.line < 0) return 0;
            var g = _[w.line],
              f = w.line + 1 < _.length ? _[w.line + 1] : this._content.length;
            return Math.max(Math.min(g + w.character, f), g);
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
      C;
    (function (d) {
      var w = Object.prototype.toString;
      function _(he) {
        return typeof he < 'u';
      }
      d.defined = _;
      function g(he) {
        return typeof he > 'u';
      }
      d.undefined = g;
      function f(he) {
        return he === !0 || he === !1;
      }
      d.boolean = f;
      function T(he) {
        return w.call(he) === '[object String]';
      }
      d.string = T;
      function N(he) {
        return w.call(he) === '[object Number]';
      }
      d.number = N;
      function oe(he, lr, Ui) {
        return w.call(he) === '[object Number]' && lr <= he && he <= Ui;
      }
      d.numberRange = oe;
      function Oe(he) {
        return w.call(he) === '[object Number]' && -2147483648 <= he && he <= 2147483647;
      }
      d.integer = Oe;
      function Te(he) {
        return w.call(he) === '[object Number]' && 0 <= he && he <= 2147483647;
      }
      d.uinteger = Te;
      function Ht(he) {
        return w.call(he) === '[object Function]';
      }
      d.func = Ht;
      function zt(he) {
        return he !== null && typeof he == 'object';
      }
      d.objectLiteral = zt;
      function on(he, lr) {
        return Array.isArray(he) && he.every(lr);
      }
      d.typedArray = on;
    })(C || (C = {}));
  });
});
var Re = O((bt) => {
  'use strict';
  Object.defineProperty(bt, '__esModule', { value: !0 });
  bt.ProtocolNotificationType =
    bt.ProtocolNotificationType0 =
    bt.ProtocolRequestType =
    bt.ProtocolRequestType0 =
    bt.RegistrationType =
    bt.MessageDirection =
      void 0;
  var vr = zn(),
    Cf;
  (function (e) {
    ((e.clientToServer = 'clientToServer'),
      (e.serverToClient = 'serverToClient'),
      (e.both = 'both'));
  })(Cf || (bt.MessageDirection = Cf = {}));
  var gu = class {
    constructor(t) {
      this.method = t;
    }
  };
  bt.RegistrationType = gu;
  var yu = class extends vr.RequestType0 {
    constructor(t) {
      super(t);
    }
  };
  bt.ProtocolRequestType0 = yu;
  var bu = class extends vr.RequestType {
    constructor(t) {
      super(t, vr.ParameterStructures.byName);
    }
  };
  bt.ProtocolRequestType = bu;
  var vu = class extends vr.NotificationType0 {
    constructor(t) {
      super(t);
    }
  };
  bt.ProtocolNotificationType0 = vu;
  var xu = class extends vr.NotificationType {
    constructor(t) {
      super(t, vr.ParameterStructures.byName);
    }
  };
  bt.ProtocolNotificationType = xu;
});
var yo = O((Be) => {
  'use strict';
  Object.defineProperty(Be, '__esModule', { value: !0 });
  Be.objectLiteral =
    Be.typedArray =
    Be.stringArray =
    Be.array =
    Be.func =
    Be.error =
    Be.number =
    Be.string =
    Be.boolean =
      void 0;
  function zx(e) {
    return e === !0 || e === !1;
  }
  Be.boolean = zx;
  function Df(e) {
    return typeof e == 'string' || e instanceof String;
  }
  Be.string = Df;
  function Ux(e) {
    return typeof e == 'number' || e instanceof Number;
  }
  Be.number = Ux;
  function Wx(e) {
    return e instanceof Error;
  }
  Be.error = Wx;
  function $x(e) {
    return typeof e == 'function';
  }
  Be.func = $x;
  function Ef(e) {
    return Array.isArray(e);
  }
  Be.array = Ef;
  function Vx(e) {
    return Ef(e) && e.every((t) => Df(t));
  }
  Be.stringArray = Vx;
  function Yx(e, t) {
    return Array.isArray(e) && e.every(t);
  }
  Be.typedArray = Yx;
  function Gx(e) {
    return e !== null && typeof e == 'object';
  }
  Be.objectLiteral = Gx;
});
var Pf = O((bo) => {
  'use strict';
  Object.defineProperty(bo, '__esModule', { value: !0 });
  bo.ImplementationRequest = void 0;
  var Rf = Re(),
    Af;
  (function (e) {
    ((e.method = 'textDocument/implementation'),
      (e.messageDirection = Rf.MessageDirection.clientToServer),
      (e.type = new Rf.ProtocolRequestType(e.method)));
  })(Af || (bo.ImplementationRequest = Af = {}));
});
var If = O((vo) => {
  'use strict';
  Object.defineProperty(vo, '__esModule', { value: !0 });
  vo.TypeDefinitionRequest = void 0;
  var qf = Re(),
    Of;
  (function (e) {
    ((e.method = 'textDocument/typeDefinition'),
      (e.messageDirection = qf.MessageDirection.clientToServer),
      (e.type = new qf.ProtocolRequestType(e.method)));
  })(Of || (vo.TypeDefinitionRequest = Of = {}));
});
var Lf = O((xr) => {
  'use strict';
  Object.defineProperty(xr, '__esModule', { value: !0 });
  xr.DidChangeWorkspaceFoldersNotification = xr.WorkspaceFoldersRequest = void 0;
  var xo = Re(),
    Ff;
  (function (e) {
    ((e.method = 'workspace/workspaceFolders'),
      (e.messageDirection = xo.MessageDirection.serverToClient),
      (e.type = new xo.ProtocolRequestType0(e.method)));
  })(Ff || (xr.WorkspaceFoldersRequest = Ff = {}));
  var Nf;
  (function (e) {
    ((e.method = 'workspace/didChangeWorkspaceFolders'),
      (e.messageDirection = xo.MessageDirection.clientToServer),
      (e.type = new xo.ProtocolNotificationType(e.method)));
  })(Nf || (xr.DidChangeWorkspaceFoldersNotification = Nf = {}));
});
var Bf = O((wo) => {
  'use strict';
  Object.defineProperty(wo, '__esModule', { value: !0 });
  wo.ConfigurationRequest = void 0;
  var Mf = Re(),
    jf;
  (function (e) {
    ((e.method = 'workspace/configuration'),
      (e.messageDirection = Mf.MessageDirection.serverToClient),
      (e.type = new Mf.ProtocolRequestType(e.method)));
  })(jf || (wo.ConfigurationRequest = jf = {}));
});
var Uf = O((wr) => {
  'use strict';
  Object.defineProperty(wr, '__esModule', { value: !0 });
  wr.ColorPresentationRequest = wr.DocumentColorRequest = void 0;
  var ko = Re(),
    Hf;
  (function (e) {
    ((e.method = 'textDocument/documentColor'),
      (e.messageDirection = ko.MessageDirection.clientToServer),
      (e.type = new ko.ProtocolRequestType(e.method)));
  })(Hf || (wr.DocumentColorRequest = Hf = {}));
  var zf;
  (function (e) {
    ((e.method = 'textDocument/colorPresentation'),
      (e.messageDirection = ko.MessageDirection.clientToServer),
      (e.type = new ko.ProtocolRequestType(e.method)));
  })(zf || (wr.ColorPresentationRequest = zf = {}));
});
var Vf = O((kr) => {
  'use strict';
  Object.defineProperty(kr, '__esModule', { value: !0 });
  kr.FoldingRangeRefreshRequest = kr.FoldingRangeRequest = void 0;
  var _o = Re(),
    Wf;
  (function (e) {
    ((e.method = 'textDocument/foldingRange'),
      (e.messageDirection = _o.MessageDirection.clientToServer),
      (e.type = new _o.ProtocolRequestType(e.method)));
  })(Wf || (kr.FoldingRangeRequest = Wf = {}));
  var $f;
  (function (e) {
    ((e.method = 'workspace/foldingRange/refresh'),
      (e.messageDirection = _o.MessageDirection.serverToClient),
      (e.type = new _o.ProtocolRequestType0(e.method)));
  })($f || (kr.FoldingRangeRefreshRequest = $f = {}));
});
var Kf = O((So) => {
  'use strict';
  Object.defineProperty(So, '__esModule', { value: !0 });
  So.DeclarationRequest = void 0;
  var Yf = Re(),
    Gf;
  (function (e) {
    ((e.method = 'textDocument/declaration'),
      (e.messageDirection = Yf.MessageDirection.clientToServer),
      (e.type = new Yf.ProtocolRequestType(e.method)));
  })(Gf || (So.DeclarationRequest = Gf = {}));
});
var Zf = O((To) => {
  'use strict';
  Object.defineProperty(To, '__esModule', { value: !0 });
  To.SelectionRangeRequest = void 0;
  var Qf = Re(),
    Jf;
  (function (e) {
    ((e.method = 'textDocument/selectionRange'),
      (e.messageDirection = Qf.MessageDirection.clientToServer),
      (e.type = new Qf.ProtocolRequestType(e.method)));
  })(Jf || (To.SelectionRangeRequest = Jf = {}));
});
var nd = O((vn) => {
  'use strict';
  Object.defineProperty(vn, '__esModule', { value: !0 });
  vn.WorkDoneProgressCancelNotification =
    vn.WorkDoneProgressCreateRequest =
    vn.WorkDoneProgress =
      void 0;
  var Kx = zn(),
    Co = Re(),
    Xf;
  (function (e) {
    e.type = new Kx.ProgressType();
    function t(n) {
      return n === e.type;
    }
    e.is = t;
  })(Xf || (vn.WorkDoneProgress = Xf = {}));
  var ed;
  (function (e) {
    ((e.method = 'window/workDoneProgress/create'),
      (e.messageDirection = Co.MessageDirection.serverToClient),
      (e.type = new Co.ProtocolRequestType(e.method)));
  })(ed || (vn.WorkDoneProgressCreateRequest = ed = {}));
  var td;
  (function (e) {
    ((e.method = 'window/workDoneProgress/cancel'),
      (e.messageDirection = Co.MessageDirection.clientToServer),
      (e.type = new Co.ProtocolNotificationType(e.method)));
  })(td || (vn.WorkDoneProgressCancelNotification = td = {}));
});
var sd = O((xn) => {
  'use strict';
  Object.defineProperty(xn, '__esModule', { value: !0 });
  xn.CallHierarchyOutgoingCallsRequest =
    xn.CallHierarchyIncomingCallsRequest =
    xn.CallHierarchyPrepareRequest =
      void 0;
  var _r = Re(),
    rd;
  (function (e) {
    ((e.method = 'textDocument/prepareCallHierarchy'),
      (e.messageDirection = _r.MessageDirection.clientToServer),
      (e.type = new _r.ProtocolRequestType(e.method)));
  })(rd || (xn.CallHierarchyPrepareRequest = rd = {}));
  var id;
  (function (e) {
    ((e.method = 'callHierarchy/incomingCalls'),
      (e.messageDirection = _r.MessageDirection.clientToServer),
      (e.type = new _r.ProtocolRequestType(e.method)));
  })(id || (xn.CallHierarchyIncomingCallsRequest = id = {}));
  var od;
  (function (e) {
    ((e.method = 'callHierarchy/outgoingCalls'),
      (e.messageDirection = _r.MessageDirection.clientToServer),
      (e.type = new _r.ProtocolRequestType(e.method)));
  })(od || (xn.CallHierarchyOutgoingCallsRequest = od = {}));
});
var dd = O((vt) => {
  'use strict';
  Object.defineProperty(vt, '__esModule', { value: !0 });
  vt.SemanticTokensRefreshRequest =
    vt.SemanticTokensRangeRequest =
    vt.SemanticTokensDeltaRequest =
    vt.SemanticTokensRequest =
    vt.SemanticTokensRegistrationType =
    vt.TokenFormat =
      void 0;
  var an = Re(),
    ad;
  (function (e) {
    e.Relative = 'relative';
  })(ad || (vt.TokenFormat = ad = {}));
  var si;
  (function (e) {
    ((e.method = 'textDocument/semanticTokens'), (e.type = new an.RegistrationType(e.method)));
  })(si || (vt.SemanticTokensRegistrationType = si = {}));
  var ud;
  (function (e) {
    ((e.method = 'textDocument/semanticTokens/full'),
      (e.messageDirection = an.MessageDirection.clientToServer),
      (e.type = new an.ProtocolRequestType(e.method)),
      (e.registrationMethod = si.method));
  })(ud || (vt.SemanticTokensRequest = ud = {}));
  var cd;
  (function (e) {
    ((e.method = 'textDocument/semanticTokens/full/delta'),
      (e.messageDirection = an.MessageDirection.clientToServer),
      (e.type = new an.ProtocolRequestType(e.method)),
      (e.registrationMethod = si.method));
  })(cd || (vt.SemanticTokensDeltaRequest = cd = {}));
  var ld;
  (function (e) {
    ((e.method = 'textDocument/semanticTokens/range'),
      (e.messageDirection = an.MessageDirection.clientToServer),
      (e.type = new an.ProtocolRequestType(e.method)),
      (e.registrationMethod = si.method));
  })(ld || (vt.SemanticTokensRangeRequest = ld = {}));
  var fd;
  (function (e) {
    ((e.method = 'workspace/semanticTokens/refresh'),
      (e.messageDirection = an.MessageDirection.serverToClient),
      (e.type = new an.ProtocolRequestType0(e.method)));
  })(fd || (vt.SemanticTokensRefreshRequest = fd = {}));
});
var md = O((Do) => {
  'use strict';
  Object.defineProperty(Do, '__esModule', { value: !0 });
  Do.ShowDocumentRequest = void 0;
  var pd = Re(),
    hd;
  (function (e) {
    ((e.method = 'window/showDocument'),
      (e.messageDirection = pd.MessageDirection.serverToClient),
      (e.type = new pd.ProtocolRequestType(e.method)));
  })(hd || (Do.ShowDocumentRequest = hd = {}));
});
var bd = O((Eo) => {
  'use strict';
  Object.defineProperty(Eo, '__esModule', { value: !0 });
  Eo.LinkedEditingRangeRequest = void 0;
  var gd = Re(),
    yd;
  (function (e) {
    ((e.method = 'textDocument/linkedEditingRange'),
      (e.messageDirection = gd.MessageDirection.clientToServer),
      (e.type = new gd.ProtocolRequestType(e.method)));
  })(yd || (Eo.LinkedEditingRangeRequest = yd = {}));
});
var Cd = O((ot) => {
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
  var Ot = Re(),
    vd;
  (function (e) {
    ((e.file = 'file'), (e.folder = 'folder'));
  })(vd || (ot.FileOperationPatternKind = vd = {}));
  var xd;
  (function (e) {
    ((e.method = 'workspace/willCreateFiles'),
      (e.messageDirection = Ot.MessageDirection.clientToServer),
      (e.type = new Ot.ProtocolRequestType(e.method)));
  })(xd || (ot.WillCreateFilesRequest = xd = {}));
  var wd;
  (function (e) {
    ((e.method = 'workspace/didCreateFiles'),
      (e.messageDirection = Ot.MessageDirection.clientToServer),
      (e.type = new Ot.ProtocolNotificationType(e.method)));
  })(wd || (ot.DidCreateFilesNotification = wd = {}));
  var kd;
  (function (e) {
    ((e.method = 'workspace/willRenameFiles'),
      (e.messageDirection = Ot.MessageDirection.clientToServer),
      (e.type = new Ot.ProtocolRequestType(e.method)));
  })(kd || (ot.WillRenameFilesRequest = kd = {}));
  var _d;
  (function (e) {
    ((e.method = 'workspace/didRenameFiles'),
      (e.messageDirection = Ot.MessageDirection.clientToServer),
      (e.type = new Ot.ProtocolNotificationType(e.method)));
  })(_d || (ot.DidRenameFilesNotification = _d = {}));
  var Sd;
  (function (e) {
    ((e.method = 'workspace/didDeleteFiles'),
      (e.messageDirection = Ot.MessageDirection.clientToServer),
      (e.type = new Ot.ProtocolNotificationType(e.method)));
  })(Sd || (ot.DidDeleteFilesNotification = Sd = {}));
  var Td;
  (function (e) {
    ((e.method = 'workspace/willDeleteFiles'),
      (e.messageDirection = Ot.MessageDirection.clientToServer),
      (e.type = new Ot.ProtocolRequestType(e.method)));
  })(Td || (ot.WillDeleteFilesRequest = Td = {}));
});
var Pd = O((wn) => {
  'use strict';
  Object.defineProperty(wn, '__esModule', { value: !0 });
  wn.MonikerRequest = wn.MonikerKind = wn.UniquenessLevel = void 0;
  var Dd = Re(),
    Ed;
  (function (e) {
    ((e.document = 'document'),
      (e.project = 'project'),
      (e.group = 'group'),
      (e.scheme = 'scheme'),
      (e.global = 'global'));
  })(Ed || (wn.UniquenessLevel = Ed = {}));
  var Rd;
  (function (e) {
    ((e.$import = 'import'), (e.$export = 'export'), (e.local = 'local'));
  })(Rd || (wn.MonikerKind = Rd = {}));
  var Ad;
  (function (e) {
    ((e.method = 'textDocument/moniker'),
      (e.messageDirection = Dd.MessageDirection.clientToServer),
      (e.type = new Dd.ProtocolRequestType(e.method)));
  })(Ad || (wn.MonikerRequest = Ad = {}));
});
var Fd = O((kn) => {
  'use strict';
  Object.defineProperty(kn, '__esModule', { value: !0 });
  kn.TypeHierarchySubtypesRequest =
    kn.TypeHierarchySupertypesRequest =
    kn.TypeHierarchyPrepareRequest =
      void 0;
  var Sr = Re(),
    qd;
  (function (e) {
    ((e.method = 'textDocument/prepareTypeHierarchy'),
      (e.messageDirection = Sr.MessageDirection.clientToServer),
      (e.type = new Sr.ProtocolRequestType(e.method)));
  })(qd || (kn.TypeHierarchyPrepareRequest = qd = {}));
  var Od;
  (function (e) {
    ((e.method = 'typeHierarchy/supertypes'),
      (e.messageDirection = Sr.MessageDirection.clientToServer),
      (e.type = new Sr.ProtocolRequestType(e.method)));
  })(Od || (kn.TypeHierarchySupertypesRequest = Od = {}));
  var Id;
  (function (e) {
    ((e.method = 'typeHierarchy/subtypes'),
      (e.messageDirection = Sr.MessageDirection.clientToServer),
      (e.type = new Sr.ProtocolRequestType(e.method)));
  })(Id || (kn.TypeHierarchySubtypesRequest = Id = {}));
});
var Md = O((Tr) => {
  'use strict';
  Object.defineProperty(Tr, '__esModule', { value: !0 });
  Tr.InlineValueRefreshRequest = Tr.InlineValueRequest = void 0;
  var Ro = Re(),
    Nd;
  (function (e) {
    ((e.method = 'textDocument/inlineValue'),
      (e.messageDirection = Ro.MessageDirection.clientToServer),
      (e.type = new Ro.ProtocolRequestType(e.method)));
  })(Nd || (Tr.InlineValueRequest = Nd = {}));
  var Ld;
  (function (e) {
    ((e.method = 'workspace/inlineValue/refresh'),
      (e.messageDirection = Ro.MessageDirection.serverToClient),
      (e.type = new Ro.ProtocolRequestType0(e.method)));
  })(Ld || (Tr.InlineValueRefreshRequest = Ld = {}));
});
var zd = O((_n) => {
  'use strict';
  Object.defineProperty(_n, '__esModule', { value: !0 });
  _n.InlayHintRefreshRequest = _n.InlayHintResolveRequest = _n.InlayHintRequest = void 0;
  var Cr = Re(),
    jd;
  (function (e) {
    ((e.method = 'textDocument/inlayHint'),
      (e.messageDirection = Cr.MessageDirection.clientToServer),
      (e.type = new Cr.ProtocolRequestType(e.method)));
  })(jd || (_n.InlayHintRequest = jd = {}));
  var Bd;
  (function (e) {
    ((e.method = 'inlayHint/resolve'),
      (e.messageDirection = Cr.MessageDirection.clientToServer),
      (e.type = new Cr.ProtocolRequestType(e.method)));
  })(Bd || (_n.InlayHintResolveRequest = Bd = {}));
  var Hd;
  (function (e) {
    ((e.method = 'workspace/inlayHint/refresh'),
      (e.messageDirection = Cr.MessageDirection.serverToClient),
      (e.type = new Cr.ProtocolRequestType0(e.method)));
  })(Hd || (_n.InlayHintRefreshRequest = Hd = {}));
});
var Kd = O((It) => {
  'use strict';
  Object.defineProperty(It, '__esModule', { value: !0 });
  It.DiagnosticRefreshRequest =
    It.WorkspaceDiagnosticRequest =
    It.DocumentDiagnosticRequest =
    It.DocumentDiagnosticReportKind =
    It.DiagnosticServerCancellationData =
      void 0;
  var Gd = zn(),
    Qx = yo(),
    Dr = Re(),
    Ud;
  (function (e) {
    function t(n) {
      let r = n;
      return r && Qx.boolean(r.retriggerRequest);
    }
    e.is = t;
  })(Ud || (It.DiagnosticServerCancellationData = Ud = {}));
  var Wd;
  (function (e) {
    ((e.Full = 'full'), (e.Unchanged = 'unchanged'));
  })(Wd || (It.DocumentDiagnosticReportKind = Wd = {}));
  var $d;
  (function (e) {
    ((e.method = 'textDocument/diagnostic'),
      (e.messageDirection = Dr.MessageDirection.clientToServer),
      (e.type = new Dr.ProtocolRequestType(e.method)),
      (e.partialResult = new Gd.ProgressType()));
  })($d || (It.DocumentDiagnosticRequest = $d = {}));
  var Vd;
  (function (e) {
    ((e.method = 'workspace/diagnostic'),
      (e.messageDirection = Dr.MessageDirection.clientToServer),
      (e.type = new Dr.ProtocolRequestType(e.method)),
      (e.partialResult = new Gd.ProgressType()));
  })(Vd || (It.WorkspaceDiagnosticRequest = Vd = {}));
  var Yd;
  (function (e) {
    ((e.method = 'workspace/diagnostic/refresh'),
      (e.messageDirection = Dr.MessageDirection.serverToClient),
      (e.type = new Dr.ProtocolRequestType0(e.method)));
  })(Yd || (It.DiagnosticRefreshRequest = Yd = {}));
});
var np = O((Ie) => {
  'use strict';
  Object.defineProperty(Ie, '__esModule', { value: !0 });
  Ie.DidCloseNotebookDocumentNotification =
    Ie.DidSaveNotebookDocumentNotification =
    Ie.DidChangeNotebookDocumentNotification =
    Ie.NotebookCellArrayChange =
    Ie.DidOpenNotebookDocumentNotification =
    Ie.NotebookDocumentSyncRegistrationType =
    Ie.NotebookDocument =
    Ie.NotebookCell =
    Ie.ExecutionSummary =
    Ie.NotebookCellKind =
      void 0;
  var ai = go(),
    Wt = yo(),
    Jt = Re(),
    wu;
  (function (e) {
    ((e.Markup = 1), (e.Code = 2));
    function t(n) {
      return n === 1 || n === 2;
    }
    e.is = t;
  })(wu || (Ie.NotebookCellKind = wu = {}));
  var ku;
  (function (e) {
    function t(i, o) {
      let s = { executionOrder: i };
      return ((o === !0 || o === !1) && (s.success = o), s);
    }
    e.create = t;
    function n(i) {
      let o = i;
      return (
        Wt.objectLiteral(o) &&
        ai.uinteger.is(o.executionOrder) &&
        (o.success === void 0 || Wt.boolean(o.success))
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
  })(ku || (Ie.ExecutionSummary = ku = {}));
  var Ao;
  (function (e) {
    function t(o, s) {
      return { kind: o, document: s };
    }
    e.create = t;
    function n(o) {
      let s = o;
      return (
        Wt.objectLiteral(s) &&
        wu.is(s.kind) &&
        ai.DocumentUri.is(s.document) &&
        (s.metadata === void 0 || Wt.objectLiteral(s.metadata))
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
          !ku.equals(o.executionSummary, s.executionSummary) &&
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
      if (Wt.objectLiteral(o) && Wt.objectLiteral(s)) {
        let c = Object.keys(o),
          l = Object.keys(s);
        if (c.length !== l.length || (c.sort(), l.sort(), !i(c, l))) return !1;
        for (let p = 0; p < c.length; p++) {
          let m = c[p];
          if (!i(o[m], s[m])) return !1;
        }
      }
      return !0;
    }
  })(Ao || (Ie.NotebookCell = Ao = {}));
  var Qd;
  (function (e) {
    function t(r, i, o, s) {
      return { uri: r, notebookType: i, version: o, cells: s };
    }
    e.create = t;
    function n(r) {
      let i = r;
      return (
        Wt.objectLiteral(i) &&
        Wt.string(i.uri) &&
        ai.integer.is(i.version) &&
        Wt.typedArray(i.cells, Ao.is)
      );
    }
    e.is = n;
  })(Qd || (Ie.NotebookDocument = Qd = {}));
  var Er;
  (function (e) {
    ((e.method = 'notebookDocument/sync'),
      (e.messageDirection = Jt.MessageDirection.clientToServer),
      (e.type = new Jt.RegistrationType(e.method)));
  })(Er || (Ie.NotebookDocumentSyncRegistrationType = Er = {}));
  var Jd;
  (function (e) {
    ((e.method = 'notebookDocument/didOpen'),
      (e.messageDirection = Jt.MessageDirection.clientToServer),
      (e.type = new Jt.ProtocolNotificationType(e.method)),
      (e.registrationMethod = Er.method));
  })(Jd || (Ie.DidOpenNotebookDocumentNotification = Jd = {}));
  var Zd;
  (function (e) {
    function t(r) {
      let i = r;
      return (
        Wt.objectLiteral(i) &&
        ai.uinteger.is(i.start) &&
        ai.uinteger.is(i.deleteCount) &&
        (i.cells === void 0 || Wt.typedArray(i.cells, Ao.is))
      );
    }
    e.is = t;
    function n(r, i, o) {
      let s = { start: r, deleteCount: i };
      return (o !== void 0 && (s.cells = o), s);
    }
    e.create = n;
  })(Zd || (Ie.NotebookCellArrayChange = Zd = {}));
  var Xd;
  (function (e) {
    ((e.method = 'notebookDocument/didChange'),
      (e.messageDirection = Jt.MessageDirection.clientToServer),
      (e.type = new Jt.ProtocolNotificationType(e.method)),
      (e.registrationMethod = Er.method));
  })(Xd || (Ie.DidChangeNotebookDocumentNotification = Xd = {}));
  var ep;
  (function (e) {
    ((e.method = 'notebookDocument/didSave'),
      (e.messageDirection = Jt.MessageDirection.clientToServer),
      (e.type = new Jt.ProtocolNotificationType(e.method)),
      (e.registrationMethod = Er.method));
  })(ep || (Ie.DidSaveNotebookDocumentNotification = ep = {}));
  var tp;
  (function (e) {
    ((e.method = 'notebookDocument/didClose'),
      (e.messageDirection = Jt.MessageDirection.clientToServer),
      (e.type = new Jt.ProtocolNotificationType(e.method)),
      (e.registrationMethod = Er.method));
  })(tp || (Ie.DidCloseNotebookDocumentNotification = tp = {}));
});
var op = O((Po) => {
  'use strict';
  Object.defineProperty(Po, '__esModule', { value: !0 });
  Po.InlineCompletionRequest = void 0;
  var rp = Re(),
    ip;
  (function (e) {
    ((e.method = 'textDocument/inlineCompletion'),
      (e.messageDirection = rp.MessageDirection.clientToServer),
      (e.type = new rp.ProtocolRequestType(e.method)));
  })(ip || (Po.InlineCompletionRequest = ip = {}));
});
var bh = O((b) => {
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
  var B = Re(),
    sp = go(),
    Qe = yo(),
    Jx = Pf();
  Object.defineProperty(b, 'ImplementationRequest', {
    enumerable: !0,
    get: function () {
      return Jx.ImplementationRequest;
    },
  });
  var Zx = If();
  Object.defineProperty(b, 'TypeDefinitionRequest', {
    enumerable: !0,
    get: function () {
      return Zx.TypeDefinitionRequest;
    },
  });
  var hh = Lf();
  Object.defineProperty(b, 'WorkspaceFoldersRequest', {
    enumerable: !0,
    get: function () {
      return hh.WorkspaceFoldersRequest;
    },
  });
  Object.defineProperty(b, 'DidChangeWorkspaceFoldersNotification', {
    enumerable: !0,
    get: function () {
      return hh.DidChangeWorkspaceFoldersNotification;
    },
  });
  var Xx = Bf();
  Object.defineProperty(b, 'ConfigurationRequest', {
    enumerable: !0,
    get: function () {
      return Xx.ConfigurationRequest;
    },
  });
  var mh = Uf();
  Object.defineProperty(b, 'DocumentColorRequest', {
    enumerable: !0,
    get: function () {
      return mh.DocumentColorRequest;
    },
  });
  Object.defineProperty(b, 'ColorPresentationRequest', {
    enumerable: !0,
    get: function () {
      return mh.ColorPresentationRequest;
    },
  });
  var gh = Vf();
  Object.defineProperty(b, 'FoldingRangeRequest', {
    enumerable: !0,
    get: function () {
      return gh.FoldingRangeRequest;
    },
  });
  Object.defineProperty(b, 'FoldingRangeRefreshRequest', {
    enumerable: !0,
    get: function () {
      return gh.FoldingRangeRefreshRequest;
    },
  });
  var ew = Kf();
  Object.defineProperty(b, 'DeclarationRequest', {
    enumerable: !0,
    get: function () {
      return ew.DeclarationRequest;
    },
  });
  var tw = Zf();
  Object.defineProperty(b, 'SelectionRangeRequest', {
    enumerable: !0,
    get: function () {
      return tw.SelectionRangeRequest;
    },
  });
  var Du = nd();
  Object.defineProperty(b, 'WorkDoneProgress', {
    enumerable: !0,
    get: function () {
      return Du.WorkDoneProgress;
    },
  });
  Object.defineProperty(b, 'WorkDoneProgressCreateRequest', {
    enumerable: !0,
    get: function () {
      return Du.WorkDoneProgressCreateRequest;
    },
  });
  Object.defineProperty(b, 'WorkDoneProgressCancelNotification', {
    enumerable: !0,
    get: function () {
      return Du.WorkDoneProgressCancelNotification;
    },
  });
  var Eu = sd();
  Object.defineProperty(b, 'CallHierarchyIncomingCallsRequest', {
    enumerable: !0,
    get: function () {
      return Eu.CallHierarchyIncomingCallsRequest;
    },
  });
  Object.defineProperty(b, 'CallHierarchyOutgoingCallsRequest', {
    enumerable: !0,
    get: function () {
      return Eu.CallHierarchyOutgoingCallsRequest;
    },
  });
  Object.defineProperty(b, 'CallHierarchyPrepareRequest', {
    enumerable: !0,
    get: function () {
      return Eu.CallHierarchyPrepareRequest;
    },
  });
  var Rr = dd();
  Object.defineProperty(b, 'TokenFormat', {
    enumerable: !0,
    get: function () {
      return Rr.TokenFormat;
    },
  });
  Object.defineProperty(b, 'SemanticTokensRequest', {
    enumerable: !0,
    get: function () {
      return Rr.SemanticTokensRequest;
    },
  });
  Object.defineProperty(b, 'SemanticTokensDeltaRequest', {
    enumerable: !0,
    get: function () {
      return Rr.SemanticTokensDeltaRequest;
    },
  });
  Object.defineProperty(b, 'SemanticTokensRangeRequest', {
    enumerable: !0,
    get: function () {
      return Rr.SemanticTokensRangeRequest;
    },
  });
  Object.defineProperty(b, 'SemanticTokensRefreshRequest', {
    enumerable: !0,
    get: function () {
      return Rr.SemanticTokensRefreshRequest;
    },
  });
  Object.defineProperty(b, 'SemanticTokensRegistrationType', {
    enumerable: !0,
    get: function () {
      return Rr.SemanticTokensRegistrationType;
    },
  });
  var nw = md();
  Object.defineProperty(b, 'ShowDocumentRequest', {
    enumerable: !0,
    get: function () {
      return nw.ShowDocumentRequest;
    },
  });
  var rw = bd();
  Object.defineProperty(b, 'LinkedEditingRangeRequest', {
    enumerable: !0,
    get: function () {
      return rw.LinkedEditingRangeRequest;
    },
  });
  var Un = Cd();
  Object.defineProperty(b, 'FileOperationPatternKind', {
    enumerable: !0,
    get: function () {
      return Un.FileOperationPatternKind;
    },
  });
  Object.defineProperty(b, 'DidCreateFilesNotification', {
    enumerable: !0,
    get: function () {
      return Un.DidCreateFilesNotification;
    },
  });
  Object.defineProperty(b, 'WillCreateFilesRequest', {
    enumerable: !0,
    get: function () {
      return Un.WillCreateFilesRequest;
    },
  });
  Object.defineProperty(b, 'DidRenameFilesNotification', {
    enumerable: !0,
    get: function () {
      return Un.DidRenameFilesNotification;
    },
  });
  Object.defineProperty(b, 'WillRenameFilesRequest', {
    enumerable: !0,
    get: function () {
      return Un.WillRenameFilesRequest;
    },
  });
  Object.defineProperty(b, 'DidDeleteFilesNotification', {
    enumerable: !0,
    get: function () {
      return Un.DidDeleteFilesNotification;
    },
  });
  Object.defineProperty(b, 'WillDeleteFilesRequest', {
    enumerable: !0,
    get: function () {
      return Un.WillDeleteFilesRequest;
    },
  });
  var Ru = Pd();
  Object.defineProperty(b, 'UniquenessLevel', {
    enumerable: !0,
    get: function () {
      return Ru.UniquenessLevel;
    },
  });
  Object.defineProperty(b, 'MonikerKind', {
    enumerable: !0,
    get: function () {
      return Ru.MonikerKind;
    },
  });
  Object.defineProperty(b, 'MonikerRequest', {
    enumerable: !0,
    get: function () {
      return Ru.MonikerRequest;
    },
  });
  var Au = Fd();
  Object.defineProperty(b, 'TypeHierarchyPrepareRequest', {
    enumerable: !0,
    get: function () {
      return Au.TypeHierarchyPrepareRequest;
    },
  });
  Object.defineProperty(b, 'TypeHierarchySubtypesRequest', {
    enumerable: !0,
    get: function () {
      return Au.TypeHierarchySubtypesRequest;
    },
  });
  Object.defineProperty(b, 'TypeHierarchySupertypesRequest', {
    enumerable: !0,
    get: function () {
      return Au.TypeHierarchySupertypesRequest;
    },
  });
  var yh = Md();
  Object.defineProperty(b, 'InlineValueRequest', {
    enumerable: !0,
    get: function () {
      return yh.InlineValueRequest;
    },
  });
  Object.defineProperty(b, 'InlineValueRefreshRequest', {
    enumerable: !0,
    get: function () {
      return yh.InlineValueRefreshRequest;
    },
  });
  var Pu = zd();
  Object.defineProperty(b, 'InlayHintRequest', {
    enumerable: !0,
    get: function () {
      return Pu.InlayHintRequest;
    },
  });
  Object.defineProperty(b, 'InlayHintResolveRequest', {
    enumerable: !0,
    get: function () {
      return Pu.InlayHintResolveRequest;
    },
  });
  Object.defineProperty(b, 'InlayHintRefreshRequest', {
    enumerable: !0,
    get: function () {
      return Pu.InlayHintRefreshRequest;
    },
  });
  var ui = Kd();
  Object.defineProperty(b, 'DiagnosticServerCancellationData', {
    enumerable: !0,
    get: function () {
      return ui.DiagnosticServerCancellationData;
    },
  });
  Object.defineProperty(b, 'DocumentDiagnosticReportKind', {
    enumerable: !0,
    get: function () {
      return ui.DocumentDiagnosticReportKind;
    },
  });
  Object.defineProperty(b, 'DocumentDiagnosticRequest', {
    enumerable: !0,
    get: function () {
      return ui.DocumentDiagnosticRequest;
    },
  });
  Object.defineProperty(b, 'WorkspaceDiagnosticRequest', {
    enumerable: !0,
    get: function () {
      return ui.WorkspaceDiagnosticRequest;
    },
  });
  Object.defineProperty(b, 'DiagnosticRefreshRequest', {
    enumerable: !0,
    get: function () {
      return ui.DiagnosticRefreshRequest;
    },
  });
  var Zt = np();
  Object.defineProperty(b, 'NotebookCellKind', {
    enumerable: !0,
    get: function () {
      return Zt.NotebookCellKind;
    },
  });
  Object.defineProperty(b, 'ExecutionSummary', {
    enumerable: !0,
    get: function () {
      return Zt.ExecutionSummary;
    },
  });
  Object.defineProperty(b, 'NotebookCell', {
    enumerable: !0,
    get: function () {
      return Zt.NotebookCell;
    },
  });
  Object.defineProperty(b, 'NotebookDocument', {
    enumerable: !0,
    get: function () {
      return Zt.NotebookDocument;
    },
  });
  Object.defineProperty(b, 'NotebookDocumentSyncRegistrationType', {
    enumerable: !0,
    get: function () {
      return Zt.NotebookDocumentSyncRegistrationType;
    },
  });
  Object.defineProperty(b, 'DidOpenNotebookDocumentNotification', {
    enumerable: !0,
    get: function () {
      return Zt.DidOpenNotebookDocumentNotification;
    },
  });
  Object.defineProperty(b, 'NotebookCellArrayChange', {
    enumerable: !0,
    get: function () {
      return Zt.NotebookCellArrayChange;
    },
  });
  Object.defineProperty(b, 'DidChangeNotebookDocumentNotification', {
    enumerable: !0,
    get: function () {
      return Zt.DidChangeNotebookDocumentNotification;
    },
  });
  Object.defineProperty(b, 'DidSaveNotebookDocumentNotification', {
    enumerable: !0,
    get: function () {
      return Zt.DidSaveNotebookDocumentNotification;
    },
  });
  Object.defineProperty(b, 'DidCloseNotebookDocumentNotification', {
    enumerable: !0,
    get: function () {
      return Zt.DidCloseNotebookDocumentNotification;
    },
  });
  var iw = op();
  Object.defineProperty(b, 'InlineCompletionRequest', {
    enumerable: !0,
    get: function () {
      return iw.InlineCompletionRequest;
    },
  });
  var _u;
  (function (e) {
    function t(n) {
      let r = n;
      return Qe.string(r) || Qe.string(r.language) || Qe.string(r.scheme) || Qe.string(r.pattern);
    }
    e.is = t;
  })(_u || (b.TextDocumentFilter = _u = {}));
  var Su;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        Qe.objectLiteral(r) &&
        (Qe.string(r.notebookType) || Qe.string(r.scheme) || Qe.string(r.pattern))
      );
    }
    e.is = t;
  })(Su || (b.NotebookDocumentFilter = Su = {}));
  var Tu;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        Qe.objectLiteral(r) &&
        (Qe.string(r.notebook) || Su.is(r.notebook)) &&
        (r.language === void 0 || Qe.string(r.language))
      );
    }
    e.is = t;
  })(Tu || (b.NotebookCellTextDocumentFilter = Tu = {}));
  var Cu;
  (function (e) {
    function t(n) {
      if (!Array.isArray(n)) return !1;
      for (let r of n) if (!Qe.string(r) && !_u.is(r) && !Tu.is(r)) return !1;
      return !0;
    }
    e.is = t;
  })(Cu || (b.DocumentSelector = Cu = {}));
  var ap;
  (function (e) {
    ((e.method = 'client/registerCapability'),
      (e.messageDirection = B.MessageDirection.serverToClient),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(ap || (b.RegistrationRequest = ap = {}));
  var up;
  (function (e) {
    ((e.method = 'client/unregisterCapability'),
      (e.messageDirection = B.MessageDirection.serverToClient),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(up || (b.UnregistrationRequest = up = {}));
  var cp;
  (function (e) {
    ((e.Create = 'create'), (e.Rename = 'rename'), (e.Delete = 'delete'));
  })(cp || (b.ResourceOperationKind = cp = {}));
  var lp;
  (function (e) {
    ((e.Abort = 'abort'),
      (e.Transactional = 'transactional'),
      (e.TextOnlyTransactional = 'textOnlyTransactional'),
      (e.Undo = 'undo'));
  })(lp || (b.FailureHandlingKind = lp = {}));
  var fp;
  (function (e) {
    ((e.UTF8 = 'utf-8'), (e.UTF16 = 'utf-16'), (e.UTF32 = 'utf-32'));
  })(fp || (b.PositionEncodingKind = fp = {}));
  var dp;
  (function (e) {
    function t(n) {
      let r = n;
      return r && Qe.string(r.id) && r.id.length > 0;
    }
    e.hasId = t;
  })(dp || (b.StaticRegistrationOptions = dp = {}));
  var pp;
  (function (e) {
    function t(n) {
      let r = n;
      return r && (r.documentSelector === null || Cu.is(r.documentSelector));
    }
    e.is = t;
  })(pp || (b.TextDocumentRegistrationOptions = pp = {}));
  var hp;
  (function (e) {
    function t(r) {
      let i = r;
      return (
        Qe.objectLiteral(i) && (i.workDoneProgress === void 0 || Qe.boolean(i.workDoneProgress))
      );
    }
    e.is = t;
    function n(r) {
      let i = r;
      return i && Qe.boolean(i.workDoneProgress);
    }
    e.hasWorkDoneProgress = n;
  })(hp || (b.WorkDoneProgressOptions = hp = {}));
  var mp;
  (function (e) {
    ((e.method = 'initialize'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(mp || (b.InitializeRequest = mp = {}));
  var gp;
  (function (e) {
    e.unknownProtocolVersion = 1;
  })(gp || (b.InitializeErrorCodes = gp = {}));
  var yp;
  (function (e) {
    ((e.method = 'initialized'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolNotificationType(e.method)));
  })(yp || (b.InitializedNotification = yp = {}));
  var bp;
  (function (e) {
    ((e.method = 'shutdown'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType0(e.method)));
  })(bp || (b.ShutdownRequest = bp = {}));
  var vp;
  (function (e) {
    ((e.method = 'exit'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolNotificationType0(e.method)));
  })(vp || (b.ExitNotification = vp = {}));
  var xp;
  (function (e) {
    ((e.method = 'workspace/didChangeConfiguration'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolNotificationType(e.method)));
  })(xp || (b.DidChangeConfigurationNotification = xp = {}));
  var wp;
  (function (e) {
    ((e.Error = 1), (e.Warning = 2), (e.Info = 3), (e.Log = 4), (e.Debug = 5));
  })(wp || (b.MessageType = wp = {}));
  var kp;
  (function (e) {
    ((e.method = 'window/showMessage'),
      (e.messageDirection = B.MessageDirection.serverToClient),
      (e.type = new B.ProtocolNotificationType(e.method)));
  })(kp || (b.ShowMessageNotification = kp = {}));
  var _p;
  (function (e) {
    ((e.method = 'window/showMessageRequest'),
      (e.messageDirection = B.MessageDirection.serverToClient),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(_p || (b.ShowMessageRequest = _p = {}));
  var Sp;
  (function (e) {
    ((e.method = 'window/logMessage'),
      (e.messageDirection = B.MessageDirection.serverToClient),
      (e.type = new B.ProtocolNotificationType(e.method)));
  })(Sp || (b.LogMessageNotification = Sp = {}));
  var Tp;
  (function (e) {
    ((e.method = 'telemetry/event'),
      (e.messageDirection = B.MessageDirection.serverToClient),
      (e.type = new B.ProtocolNotificationType(e.method)));
  })(Tp || (b.TelemetryEventNotification = Tp = {}));
  var Cp;
  (function (e) {
    ((e.None = 0), (e.Full = 1), (e.Incremental = 2));
  })(Cp || (b.TextDocumentSyncKind = Cp = {}));
  var Dp;
  (function (e) {
    ((e.method = 'textDocument/didOpen'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolNotificationType(e.method)));
  })(Dp || (b.DidOpenTextDocumentNotification = Dp = {}));
  var Ep;
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
  })(Ep || (b.TextDocumentContentChangeEvent = Ep = {}));
  var Rp;
  (function (e) {
    ((e.method = 'textDocument/didChange'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolNotificationType(e.method)));
  })(Rp || (b.DidChangeTextDocumentNotification = Rp = {}));
  var Ap;
  (function (e) {
    ((e.method = 'textDocument/didClose'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolNotificationType(e.method)));
  })(Ap || (b.DidCloseTextDocumentNotification = Ap = {}));
  var Pp;
  (function (e) {
    ((e.method = 'textDocument/didSave'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolNotificationType(e.method)));
  })(Pp || (b.DidSaveTextDocumentNotification = Pp = {}));
  var qp;
  (function (e) {
    ((e.Manual = 1), (e.AfterDelay = 2), (e.FocusOut = 3));
  })(qp || (b.TextDocumentSaveReason = qp = {}));
  var Op;
  (function (e) {
    ((e.method = 'textDocument/willSave'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolNotificationType(e.method)));
  })(Op || (b.WillSaveTextDocumentNotification = Op = {}));
  var Ip;
  (function (e) {
    ((e.method = 'textDocument/willSaveWaitUntil'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(Ip || (b.WillSaveTextDocumentWaitUntilRequest = Ip = {}));
  var Fp;
  (function (e) {
    ((e.method = 'workspace/didChangeWatchedFiles'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolNotificationType(e.method)));
  })(Fp || (b.DidChangeWatchedFilesNotification = Fp = {}));
  var Np;
  (function (e) {
    ((e.Created = 1), (e.Changed = 2), (e.Deleted = 3));
  })(Np || (b.FileChangeType = Np = {}));
  var Lp;
  (function (e) {
    function t(n) {
      let r = n;
      return (
        Qe.objectLiteral(r) &&
        (sp.URI.is(r.baseUri) || sp.WorkspaceFolder.is(r.baseUri)) &&
        Qe.string(r.pattern)
      );
    }
    e.is = t;
  })(Lp || (b.RelativePattern = Lp = {}));
  var Mp;
  (function (e) {
    ((e.Create = 1), (e.Change = 2), (e.Delete = 4));
  })(Mp || (b.WatchKind = Mp = {}));
  var jp;
  (function (e) {
    ((e.method = 'textDocument/publishDiagnostics'),
      (e.messageDirection = B.MessageDirection.serverToClient),
      (e.type = new B.ProtocolNotificationType(e.method)));
  })(jp || (b.PublishDiagnosticsNotification = jp = {}));
  var Bp;
  (function (e) {
    ((e.Invoked = 1), (e.TriggerCharacter = 2), (e.TriggerForIncompleteCompletions = 3));
  })(Bp || (b.CompletionTriggerKind = Bp = {}));
  var Hp;
  (function (e) {
    ((e.method = 'textDocument/completion'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(Hp || (b.CompletionRequest = Hp = {}));
  var zp;
  (function (e) {
    ((e.method = 'completionItem/resolve'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(zp || (b.CompletionResolveRequest = zp = {}));
  var Up;
  (function (e) {
    ((e.method = 'textDocument/hover'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(Up || (b.HoverRequest = Up = {}));
  var Wp;
  (function (e) {
    ((e.Invoked = 1), (e.TriggerCharacter = 2), (e.ContentChange = 3));
  })(Wp || (b.SignatureHelpTriggerKind = Wp = {}));
  var $p;
  (function (e) {
    ((e.method = 'textDocument/signatureHelp'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })($p || (b.SignatureHelpRequest = $p = {}));
  var Vp;
  (function (e) {
    ((e.method = 'textDocument/definition'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(Vp || (b.DefinitionRequest = Vp = {}));
  var Yp;
  (function (e) {
    ((e.method = 'textDocument/references'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(Yp || (b.ReferencesRequest = Yp = {}));
  var Gp;
  (function (e) {
    ((e.method = 'textDocument/documentHighlight'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(Gp || (b.DocumentHighlightRequest = Gp = {}));
  var Kp;
  (function (e) {
    ((e.method = 'textDocument/documentSymbol'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(Kp || (b.DocumentSymbolRequest = Kp = {}));
  var Qp;
  (function (e) {
    ((e.method = 'textDocument/codeAction'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(Qp || (b.CodeActionRequest = Qp = {}));
  var Jp;
  (function (e) {
    ((e.method = 'codeAction/resolve'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(Jp || (b.CodeActionResolveRequest = Jp = {}));
  var Zp;
  (function (e) {
    ((e.method = 'workspace/symbol'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(Zp || (b.WorkspaceSymbolRequest = Zp = {}));
  var Xp;
  (function (e) {
    ((e.method = 'workspaceSymbol/resolve'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(Xp || (b.WorkspaceSymbolResolveRequest = Xp = {}));
  var eh;
  (function (e) {
    ((e.method = 'textDocument/codeLens'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(eh || (b.CodeLensRequest = eh = {}));
  var th;
  (function (e) {
    ((e.method = 'codeLens/resolve'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(th || (b.CodeLensResolveRequest = th = {}));
  var nh;
  (function (e) {
    ((e.method = 'workspace/codeLens/refresh'),
      (e.messageDirection = B.MessageDirection.serverToClient),
      (e.type = new B.ProtocolRequestType0(e.method)));
  })(nh || (b.CodeLensRefreshRequest = nh = {}));
  var rh;
  (function (e) {
    ((e.method = 'textDocument/documentLink'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(rh || (b.DocumentLinkRequest = rh = {}));
  var ih;
  (function (e) {
    ((e.method = 'documentLink/resolve'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(ih || (b.DocumentLinkResolveRequest = ih = {}));
  var oh;
  (function (e) {
    ((e.method = 'textDocument/formatting'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(oh || (b.DocumentFormattingRequest = oh = {}));
  var sh;
  (function (e) {
    ((e.method = 'textDocument/rangeFormatting'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(sh || (b.DocumentRangeFormattingRequest = sh = {}));
  var ah;
  (function (e) {
    ((e.method = 'textDocument/rangesFormatting'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(ah || (b.DocumentRangesFormattingRequest = ah = {}));
  var uh;
  (function (e) {
    ((e.method = 'textDocument/onTypeFormatting'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(uh || (b.DocumentOnTypeFormattingRequest = uh = {}));
  var ch;
  (function (e) {
    e.Identifier = 1;
  })(ch || (b.PrepareSupportDefaultBehavior = ch = {}));
  var lh;
  (function (e) {
    ((e.method = 'textDocument/rename'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(lh || (b.RenameRequest = lh = {}));
  var fh;
  (function (e) {
    ((e.method = 'textDocument/prepareRename'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(fh || (b.PrepareRenameRequest = fh = {}));
  var dh;
  (function (e) {
    ((e.method = 'workspace/executeCommand'),
      (e.messageDirection = B.MessageDirection.clientToServer),
      (e.type = new B.ProtocolRequestType(e.method)));
  })(dh || (b.ExecuteCommandRequest = dh = {}));
  var ph;
  (function (e) {
    ((e.method = 'workspace/applyEdit'),
      (e.messageDirection = B.MessageDirection.serverToClient),
      (e.type = new B.ProtocolRequestType('workspace/applyEdit')));
  })(ph || (b.ApplyWorkspaceEditRequest = ph = {}));
});
var xh = O((qo) => {
  'use strict';
  Object.defineProperty(qo, '__esModule', { value: !0 });
  qo.createProtocolConnection = void 0;
  var vh = zn();
  function ow(e, t, n, r) {
    return (
      vh.ConnectionStrategy.is(r) && (r = { connectionStrategy: r }),
      (0, vh.createMessageConnection)(e, t, n, r)
    );
  }
  qo.createProtocolConnection = ow;
});
var kh = O((xt) => {
  'use strict';
  var sw =
      (xt && xt.__createBinding) ||
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
    Oo =
      (xt && xt.__exportStar) ||
      function (e, t) {
        for (var n in e)
          n !== 'default' && !Object.prototype.hasOwnProperty.call(t, n) && sw(t, e, n);
      };
  Object.defineProperty(xt, '__esModule', { value: !0 });
  xt.LSPErrorCodes = xt.createProtocolConnection = void 0;
  Oo(zn(), xt);
  Oo(go(), xt);
  Oo(Re(), xt);
  Oo(bh(), xt);
  var aw = xh();
  Object.defineProperty(xt, 'createProtocolConnection', {
    enumerable: !0,
    get: function () {
      return aw.createProtocolConnection;
    },
  });
  var wh;
  (function (e) {
    ((e.lspReservedErrorRangeStart = -32899),
      (e.RequestFailed = -32803),
      (e.ServerCancelled = -32802),
      (e.ContentModified = -32801),
      (e.RequestCancelled = -32800),
      (e.lspReservedErrorRangeEnd = -32800));
  })(wh || (xt.LSPErrorCodes = wh = {}));
});
var Le = O((Xt) => {
  'use strict';
  var uw =
      (Xt && Xt.__createBinding) ||
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
    _h =
      (Xt && Xt.__exportStar) ||
      function (e, t) {
        for (var n in e)
          n !== 'default' && !Object.prototype.hasOwnProperty.call(t, n) && uw(t, e, n);
      };
  Object.defineProperty(Xt, '__esModule', { value: !0 });
  Xt.createProtocolConnection = void 0;
  var cw = mu();
  _h(mu(), Xt);
  _h(kh(), Xt);
  function lw(e, t, n, r) {
    return (0, cw.createMessageConnection)(e, t, n, r);
  }
  Xt.createProtocolConnection = lw;
});
var qu = O((Ft) => {
  'use strict';
  Object.defineProperty(Ft, '__esModule', { value: !0 });
  Ft.generateUuid = Ft.parse = Ft.isUUID = Ft.v4 = Ft.empty = void 0;
  var ci = class {
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
    li = class e extends ci {
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
  li._chars = ['0', '1', '2', '3', '4', '5', '6', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  li._timeHighBits = ['8', '9', 'a', 'b'];
  Ft.empty = new ci('00000000-0000-0000-0000-000000000000');
  function Sh() {
    return new li();
  }
  Ft.v4 = Sh;
  var fw = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  function Th(e) {
    return fw.test(e);
  }
  Ft.isUUID = Th;
  function dw(e) {
    if (!Th(e)) throw new Error('invalid uuid');
    return new ci(e);
  }
  Ft.parse = dw;
  function pw() {
    return Sh().asHex();
  }
  Ft.generateUuid = pw;
});
var Ch = O((Tn) => {
  'use strict';
  Object.defineProperty(Tn, '__esModule', { value: !0 });
  Tn.attachPartialResult = Tn.ProgressFeature = Tn.attachWorkDone = void 0;
  var Sn = Le(),
    hw = qu(),
    Wn = class e {
      constructor(t, n) {
        ((this._connection = t), (this._token = n), e.Instances.set(this._token, this));
      }
      begin(t, n, r, i) {
        let o = { kind: 'begin', title: t, percentage: n, message: r, cancellable: i };
        this._connection.sendProgress(Sn.WorkDoneProgress.type, this._token, o);
      }
      report(t, n) {
        let r = { kind: 'report' };
        (typeof t == 'number'
          ? ((r.percentage = t), n !== void 0 && (r.message = n))
          : (r.message = t),
          this._connection.sendProgress(Sn.WorkDoneProgress.type, this._token, r));
      }
      done() {
        (e.Instances.delete(this._token),
          this._connection.sendProgress(Sn.WorkDoneProgress.type, this._token, { kind: 'end' }));
      }
    };
  Wn.Instances = new Map();
  var Io = class extends Wn {
      constructor(t, n) {
        (super(t, n), (this._source = new Sn.CancellationTokenSource()));
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
    fi = class {
      constructor() {}
      begin() {}
      report() {}
      done() {}
    },
    Fo = class extends fi {
      constructor() {
        (super(), (this._source = new Sn.CancellationTokenSource()));
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
  function mw(e, t) {
    if (t === void 0 || t.workDoneToken === void 0) return new fi();
    let n = t.workDoneToken;
    return (delete t.workDoneToken, new Wn(e, n));
  }
  Tn.attachWorkDone = mw;
  var gw = (e) =>
    class extends e {
      constructor() {
        (super(), (this._progressSupported = !1));
      }
      initialize(t) {
        (super.initialize(t),
          t?.window?.workDoneProgress === !0 &&
            ((this._progressSupported = !0),
            this.connection.onNotification(Sn.WorkDoneProgressCancelNotification.type, (n) => {
              let r = Wn.Instances.get(n.token);
              (r instanceof Io || r instanceof Fo) && r.cancel();
            })));
      }
      attachWorkDoneProgress(t) {
        return t === void 0 ? new fi() : new Wn(this.connection, t);
      }
      createWorkDoneProgress() {
        if (this._progressSupported) {
          let t = (0, hw.generateUuid)();
          return this.connection
            .sendRequest(Sn.WorkDoneProgressCreateRequest.type, { token: t })
            .then(() => new Io(this.connection, t));
        } else return Promise.resolve(new Fo());
      }
    };
  Tn.ProgressFeature = gw;
  var Ou;
  (function (e) {
    e.type = new Sn.ProgressType();
  })(Ou || (Ou = {}));
  var Iu = class {
    constructor(t, n) {
      ((this._connection = t), (this._token = n));
    }
    report(t) {
      this._connection.sendProgress(Ou.type, this._token, t);
    }
  };
  function yw(e, t) {
    if (t === void 0 || t.partialResultToken === void 0) return;
    let n = t.partialResultToken;
    return (delete t.partialResultToken, new Iu(e, n));
  }
  Tn.attachPartialResult = yw;
});
var Dh = O((No) => {
  'use strict';
  Object.defineProperty(No, '__esModule', { value: !0 });
  No.ConfigurationFeature = void 0;
  var bw = Le(),
    vw = Vi(),
    xw = (e) =>
      class extends e {
        getConfiguration(t) {
          return t
            ? vw.string(t)
              ? this._getConfiguration({ section: t })
              : this._getConfiguration(t)
            : this._getConfiguration({});
        }
        _getConfiguration(t) {
          let n = { items: Array.isArray(t) ? t : [t] };
          return this.connection
            .sendRequest(bw.ConfigurationRequest.type, n)
            .then((r) =>
              Array.isArray(r) ? (Array.isArray(t) ? r : r[0]) : Array.isArray(t) ? [] : null
            );
        }
      };
  No.ConfigurationFeature = xw;
});
var Eh = O((Mo) => {
  'use strict';
  Object.defineProperty(Mo, '__esModule', { value: !0 });
  Mo.WorkspaceFoldersFeature = void 0;
  var Lo = Le(),
    ww = (e) =>
      class extends e {
        constructor() {
          (super(), (this._notificationIsAutoRegistered = !1));
        }
        initialize(t) {
          super.initialize(t);
          let n = t.workspace;
          n &&
            n.workspaceFolders &&
            ((this._onDidChangeWorkspaceFolders = new Lo.Emitter()),
            this.connection.onNotification(Lo.DidChangeWorkspaceFoldersNotification.type, (r) => {
              this._onDidChangeWorkspaceFolders.fire(r.event);
            }));
        }
        fillServerCapabilities(t) {
          super.fillServerCapabilities(t);
          let n = t.workspace?.workspaceFolders?.changeNotifications;
          this._notificationIsAutoRegistered = n === !0 || typeof n == 'string';
        }
        getWorkspaceFolders() {
          return this.connection.sendRequest(Lo.WorkspaceFoldersRequest.type);
        }
        get onDidChangeWorkspaceFolders() {
          if (!this._onDidChangeWorkspaceFolders)
            throw new Error("Client doesn't support sending workspace folder change events.");
          return (
            !this._notificationIsAutoRegistered &&
              !this._unregistration &&
              (this._unregistration = this.connection.client.register(
                Lo.DidChangeWorkspaceFoldersNotification.type
              )),
            this._onDidChangeWorkspaceFolders.event
          );
        }
      };
  Mo.WorkspaceFoldersFeature = ww;
});
var Rh = O((jo) => {
  'use strict';
  Object.defineProperty(jo, '__esModule', { value: !0 });
  jo.CallHierarchyFeature = void 0;
  var Fu = Le(),
    kw = (e) =>
      class extends e {
        get callHierarchy() {
          return {
            onPrepare: (t) =>
              this.connection.onRequest(Fu.CallHierarchyPrepareRequest.type, (n, r) =>
                t(n, r, this.attachWorkDoneProgress(n), void 0)
              ),
            onIncomingCalls: (t) => {
              let n = Fu.CallHierarchyIncomingCallsRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
            onOutgoingCalls: (t) => {
              let n = Fu.CallHierarchyOutgoingCallsRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
          };
        }
      };
  jo.CallHierarchyFeature = kw;
});
var Lu = O((Cn) => {
  'use strict';
  Object.defineProperty(Cn, '__esModule', { value: !0 });
  Cn.SemanticTokensBuilder = Cn.SemanticTokensDiff = Cn.SemanticTokensFeature = void 0;
  var Bo = Le(),
    _w = (e) =>
      class extends e {
        get semanticTokens() {
          return {
            refresh: () => this.connection.sendRequest(Bo.SemanticTokensRefreshRequest.type),
            on: (t) => {
              let n = Bo.SemanticTokensRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
            onDelta: (t) => {
              let n = Bo.SemanticTokensDeltaRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
            onRange: (t) => {
              let n = Bo.SemanticTokensRangeRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
          };
        }
      };
  Cn.SemanticTokensFeature = _w;
  var Ho = class {
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
  Cn.SemanticTokensDiff = Ho;
  var Nu = class {
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
        ? { resultId: this.id, edits: new Ho(this._prevData, this._data).computeDiff() }
        : this.build();
    }
  };
  Cn.SemanticTokensBuilder = Nu;
});
var Ah = O((zo) => {
  'use strict';
  Object.defineProperty(zo, '__esModule', { value: !0 });
  zo.ShowDocumentFeature = void 0;
  var Sw = Le(),
    Tw = (e) =>
      class extends e {
        showDocument(t) {
          return this.connection.sendRequest(Sw.ShowDocumentRequest.type, t);
        }
      };
  zo.ShowDocumentFeature = Tw;
});
var Ph = O((Uo) => {
  'use strict';
  Object.defineProperty(Uo, '__esModule', { value: !0 });
  Uo.FileOperationsFeature = void 0;
  var Ar = Le(),
    Cw = (e) =>
      class extends e {
        onDidCreateFiles(t) {
          return this.connection.onNotification(Ar.DidCreateFilesNotification.type, (n) => {
            t(n);
          });
        }
        onDidRenameFiles(t) {
          return this.connection.onNotification(Ar.DidRenameFilesNotification.type, (n) => {
            t(n);
          });
        }
        onDidDeleteFiles(t) {
          return this.connection.onNotification(Ar.DidDeleteFilesNotification.type, (n) => {
            t(n);
          });
        }
        onWillCreateFiles(t) {
          return this.connection.onRequest(Ar.WillCreateFilesRequest.type, (n, r) => t(n, r));
        }
        onWillRenameFiles(t) {
          return this.connection.onRequest(Ar.WillRenameFilesRequest.type, (n, r) => t(n, r));
        }
        onWillDeleteFiles(t) {
          return this.connection.onRequest(Ar.WillDeleteFilesRequest.type, (n, r) => t(n, r));
        }
      };
  Uo.FileOperationsFeature = Cw;
});
var qh = O((Wo) => {
  'use strict';
  Object.defineProperty(Wo, '__esModule', { value: !0 });
  Wo.LinkedEditingRangeFeature = void 0;
  var Dw = Le(),
    Ew = (e) =>
      class extends e {
        onLinkedEditingRange(t) {
          return this.connection.onRequest(Dw.LinkedEditingRangeRequest.type, (n, r) =>
            t(n, r, this.attachWorkDoneProgress(n), void 0)
          );
        }
      };
  Wo.LinkedEditingRangeFeature = Ew;
});
var Oh = O(($o) => {
  'use strict';
  Object.defineProperty($o, '__esModule', { value: !0 });
  $o.TypeHierarchyFeature = void 0;
  var Mu = Le(),
    Rw = (e) =>
      class extends e {
        get typeHierarchy() {
          return {
            onPrepare: (t) =>
              this.connection.onRequest(Mu.TypeHierarchyPrepareRequest.type, (n, r) =>
                t(n, r, this.attachWorkDoneProgress(n), void 0)
              ),
            onSupertypes: (t) => {
              let n = Mu.TypeHierarchySupertypesRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
            onSubtypes: (t) => {
              let n = Mu.TypeHierarchySubtypesRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
          };
        }
      };
  $o.TypeHierarchyFeature = Rw;
});
var Fh = O((Vo) => {
  'use strict';
  Object.defineProperty(Vo, '__esModule', { value: !0 });
  Vo.InlineValueFeature = void 0;
  var Ih = Le(),
    Aw = (e) =>
      class extends e {
        get inlineValue() {
          return {
            refresh: () => this.connection.sendRequest(Ih.InlineValueRefreshRequest.type),
            on: (t) =>
              this.connection.onRequest(Ih.InlineValueRequest.type, (n, r) =>
                t(n, r, this.attachWorkDoneProgress(n))
              ),
          };
        }
      };
  Vo.InlineValueFeature = Aw;
});
var Lh = O((Yo) => {
  'use strict';
  Object.defineProperty(Yo, '__esModule', { value: !0 });
  Yo.FoldingRangeFeature = void 0;
  var Nh = Le(),
    Pw = (e) =>
      class extends e {
        get foldingRange() {
          return {
            refresh: () => this.connection.sendRequest(Nh.FoldingRangeRefreshRequest.type),
            on: (t) => {
              let n = Nh.FoldingRangeRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
          };
        }
      };
  Yo.FoldingRangeFeature = Pw;
});
var Mh = O((Go) => {
  'use strict';
  Object.defineProperty(Go, '__esModule', { value: !0 });
  Go.InlayHintFeature = void 0;
  var ju = Le(),
    qw = (e) =>
      class extends e {
        get inlayHint() {
          return {
            refresh: () => this.connection.sendRequest(ju.InlayHintRefreshRequest.type),
            on: (t) =>
              this.connection.onRequest(ju.InlayHintRequest.type, (n, r) =>
                t(n, r, this.attachWorkDoneProgress(n))
              ),
            resolve: (t) =>
              this.connection.onRequest(ju.InlayHintResolveRequest.type, (n, r) => t(n, r)),
          };
        }
      };
  Go.InlayHintFeature = qw;
});
var jh = O((Ko) => {
  'use strict';
  Object.defineProperty(Ko, '__esModule', { value: !0 });
  Ko.DiagnosticFeature = void 0;
  var di = Le(),
    Ow = (e) =>
      class extends e {
        get diagnostics() {
          return {
            refresh: () => this.connection.sendRequest(di.DiagnosticRefreshRequest.type),
            on: (t) =>
              this.connection.onRequest(di.DocumentDiagnosticRequest.type, (n, r) =>
                t(
                  n,
                  r,
                  this.attachWorkDoneProgress(n),
                  this.attachPartialResultProgress(di.DocumentDiagnosticRequest.partialResult, n)
                )
              ),
            onWorkspace: (t) =>
              this.connection.onRequest(di.WorkspaceDiagnosticRequest.type, (n, r) =>
                t(
                  n,
                  r,
                  this.attachWorkDoneProgress(n),
                  this.attachPartialResultProgress(di.WorkspaceDiagnosticRequest.partialResult, n)
                )
              ),
          };
        }
      };
  Ko.DiagnosticFeature = Ow;
});
var Hu = O((Qo) => {
  'use strict';
  Object.defineProperty(Qo, '__esModule', { value: !0 });
  Qo.TextDocuments = void 0;
  var $n = Le(),
    Bu = class {
      constructor(t) {
        ((this._configuration = t),
          (this._syncedDocuments = new Map()),
          (this._onDidChangeContent = new $n.Emitter()),
          (this._onDidOpen = new $n.Emitter()),
          (this._onDidClose = new $n.Emitter()),
          (this._onDidSave = new $n.Emitter()),
          (this._onWillSave = new $n.Emitter()));
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
        t.__textDocumentSync = $n.TextDocumentSyncKind.Incremental;
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
          $n.Disposable.create(() => {
            n.forEach((r) => r.dispose());
          })
        );
      }
    };
  Qo.TextDocuments = Bu;
});
var Uu = O((Pr) => {
  'use strict';
  Object.defineProperty(Pr, '__esModule', { value: !0 });
  Pr.NotebookDocuments = Pr.NotebookSyncFeature = void 0;
  var Nt = Le(),
    Bh = Hu(),
    Iw = (e) =>
      class extends e {
        get synchronization() {
          return {
            onDidOpenNotebookDocument: (t) =>
              this.connection.onNotification(Nt.DidOpenNotebookDocumentNotification.type, (n) => {
                t(n);
              }),
            onDidChangeNotebookDocument: (t) =>
              this.connection.onNotification(Nt.DidChangeNotebookDocumentNotification.type, (n) => {
                t(n);
              }),
            onDidSaveNotebookDocument: (t) =>
              this.connection.onNotification(Nt.DidSaveNotebookDocumentNotification.type, (n) => {
                t(n);
              }),
            onDidCloseNotebookDocument: (t) =>
              this.connection.onNotification(Nt.DidCloseNotebookDocumentNotification.type, (n) => {
                t(n);
              }),
          };
        }
      };
  Pr.NotebookSyncFeature = Iw;
  var Jo = class e {
    onDidOpenTextDocument(t) {
      return (
        (this.openHandler = t),
        Nt.Disposable.create(() => {
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
        Nt.Disposable.create(() => {
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
        Nt.Disposable.create(() => {
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
  Jo.NULL_DISPOSE = Object.freeze({ dispose: () => {} });
  var zu = class {
    constructor(t) {
      (t instanceof Bh.TextDocuments
        ? (this._cellTextDocuments = t)
        : (this._cellTextDocuments = new Bh.TextDocuments(t)),
        (this.notebookDocuments = new Map()),
        (this.notebookCellMap = new Map()),
        (this._onDidOpen = new Nt.Emitter()),
        (this._onDidChange = new Nt.Emitter()),
        (this._onDidSave = new Nt.Emitter()),
        (this._onDidClose = new Nt.Emitter()));
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
      let n = new Jo(),
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
              l = [],
              p = [],
              m = [];
            if (u.cells !== void 0) {
              let A = u.cells;
              if (A.structure !== void 0) {
                let S = A.structure.array;
                if (
                  (o.cells.splice(S.start, S.deleteCount, ...(S.cells !== void 0 ? S.cells : [])),
                  A.structure.didOpen !== void 0)
                )
                  for (let x of A.structure.didOpen)
                    (n.openTextDocument({ textDocument: x }), c.push(x.uri));
                if (A.structure.didClose)
                  for (let x of A.structure.didClose)
                    (n.closeTextDocument({ textDocument: x }), l.push(x.uri));
              }
              if (A.data !== void 0) {
                let S = new Map(A.data.map((x) => [x.document, x]));
                for (let x = 0; x <= o.cells.length; x++) {
                  let F = S.get(o.cells[x].document);
                  if (F !== void 0) {
                    let j = o.cells.splice(x, 1, F);
                    if ((p.push({ old: j[0], new: F }), S.delete(F.document), S.size === 0)) break;
                  }
                }
              }
              if (A.textContent !== void 0)
                for (let S of A.textContent)
                  (n.changeTextDocument({ textDocument: S.document, contentChanges: S.changes }),
                    m.push(S.document.uri));
            }
            this.updateCellMap(o);
            let h = { notebookDocument: o };
            a && (h.metadata = { old: s, new: o.metadata });
            let R = [];
            for (let A of c) R.push(this.getNotebookCell(A));
            let I = [];
            for (let A of l) I.push(this.getNotebookCell(A));
            let L = [];
            for (let A of m) L.push(this.getNotebookCell(A));
            ((R.length > 0 || I.length > 0 || p.length > 0 || L.length > 0) &&
              (h.cells = { added: R, removed: I, changed: { data: p, textContent: L } }),
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
        Nt.Disposable.create(() => {
          r.forEach((i) => i.dispose());
        })
      );
    }
    updateCellMap(t) {
      for (let n of t.cells) this.notebookCellMap.set(n.document, [n, t]);
    }
  };
  Pr.NotebookDocuments = zu;
});
var Hh = O((Zo) => {
  'use strict';
  Object.defineProperty(Zo, '__esModule', { value: !0 });
  Zo.MonikerFeature = void 0;
  var Fw = Le(),
    Nw = (e) =>
      class extends e {
        get moniker() {
          return {
            on: (t) => {
              let n = Fw.MonikerRequest.type;
              return this.connection.onRequest(n, (r, i) =>
                t(r, i, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(n, r))
              );
            },
          };
        }
      };
  Zo.MonikerFeature = Nw;
});
var Ku = O((ve) => {
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
  var U = Le(),
    Lt = Vi(),
    $u = qu(),
    re = Ch(),
    Lw = Dh(),
    Mw = Eh(),
    jw = Rh(),
    Bw = Lu(),
    Hw = Ah(),
    zw = Ph(),
    Uw = qh(),
    Ww = Oh(),
    $w = Fh(),
    Vw = Lh(),
    Yw = Mh(),
    Gw = jh(),
    Kw = Uu(),
    Qw = Hh();
  function Wu(e) {
    if (e !== null) return e;
  }
  var Vu = class {
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
  ve.ErrorMessageTracker = Vu;
  var Xo = class {
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
        this.send(U.MessageType.Error, t);
      }
      warn(t) {
        this.send(U.MessageType.Warning, t);
      }
      info(t) {
        this.send(U.MessageType.Info, t);
      }
      log(t) {
        this.send(U.MessageType.Log, t);
      }
      debug(t) {
        this.send(U.MessageType.Debug, t);
      }
      send(t, n) {
        this._rawConnection &&
          this._rawConnection
            .sendNotification(U.LogMessageNotification.type, { type: t, message: n })
            .catch(() => {
              (0, U.RAL)().console.error('Sending log message failed');
            });
      }
    },
    Yu = class {
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
        let r = { type: U.MessageType.Error, message: t, actions: n };
        return this.connection.sendRequest(U.ShowMessageRequest.type, r).then(Wu);
      }
      showWarningMessage(t, ...n) {
        let r = { type: U.MessageType.Warning, message: t, actions: n };
        return this.connection.sendRequest(U.ShowMessageRequest.type, r).then(Wu);
      }
      showInformationMessage(t, ...n) {
        let r = { type: U.MessageType.Info, message: t, actions: n };
        return this.connection.sendRequest(U.ShowMessageRequest.type, r).then(Wu);
      }
    },
    zh = (0, Hw.ShowDocumentFeature)((0, re.ProgressFeature)(Yu)),
    Uh;
  (function (e) {
    function t() {
      return new es();
    }
    e.create = t;
  })(Uh || (ve.BulkRegistration = Uh = {}));
  var es = class {
      constructor() {
        ((this._registrations = []), (this._registered = new Set()));
      }
      add(t, n) {
        let r = Lt.string(t) ? t : t.method;
        if (this._registered.has(r)) throw new Error(`${r} is already added to this registration`);
        let i = $u.generateUuid();
        (this._registrations.push({ id: i, method: r, registerOptions: n || {} }),
          this._registered.add(r));
      }
      asRegistrationParams() {
        return { registrations: this._registrations };
      }
    },
    Wh;
  (function (e) {
    function t() {
      return new pi(void 0, []);
    }
    e.create = t;
  })(Wh || (ve.BulkUnregistration = Wh = {}));
  var pi = class {
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
        this._connection.sendRequest(U.UnregistrationRequest.type, n).catch(() => {
          this._connection.console.info('Bulk unregistration failed.');
        });
      }
      disposeSingle(t) {
        let n = Lt.string(t) ? t : t.method,
          r = this._unregistrations.get(n);
        if (!r) return !1;
        let i = { unregisterations: [r] };
        return (
          this._connection.sendRequest(U.UnregistrationRequest.type, i).then(
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
    ts = class {
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
        return t instanceof es
          ? this.registerMany(t)
          : t instanceof pi
            ? this.registerSingle1(t, n, r)
            : this.registerSingle2(t, n);
      }
      registerSingle1(t, n, r) {
        let i = Lt.string(n) ? n : n.method,
          o = $u.generateUuid(),
          s = { registrations: [{ id: o, method: i, registerOptions: r || {} }] };
        return (
          t.isAttached || t.attach(this.connection),
          this.connection.sendRequest(U.RegistrationRequest.type, s).then(
            (a) => (t.add({ id: o, method: i }), t),
            (a) => (
              this.connection.console.info(`Registering request handler for ${i} failed.`),
              Promise.reject(a)
            )
          )
        );
      }
      registerSingle2(t, n) {
        let r = Lt.string(t) ? t : t.method,
          i = $u.generateUuid(),
          o = { registrations: [{ id: i, method: r, registerOptions: n || {} }] };
        return this.connection.sendRequest(U.RegistrationRequest.type, o).then(
          (s) =>
            U.Disposable.create(() => {
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
        return this.connection.sendRequest(U.UnregistrationRequest.type, r).catch(() => {
          this.connection.console.info(`Un-registering request handler for ${t} failed.`);
        });
      }
      registerMany(t) {
        let n = t.asRegistrationParams();
        return this.connection.sendRequest(U.RegistrationRequest.type, n).then(
          () =>
            new pi(
              this._connection,
              n.registrations.map((r) => ({ id: r.id, method: r.method }))
            ),
          (r) => (this.connection.console.info('Bulk registration failed.'), Promise.reject(r))
        );
      }
    },
    Gu = class {
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
        return this.connection.sendRequest(U.ApplyWorkspaceEditRequest.type, r);
      }
    },
    $h = (0, zw.FileOperationsFeature)(
      (0, Mw.WorkspaceFoldersFeature)((0, Lw.ConfigurationFeature)(Gu))
    ),
    ns = class {
      constructor() {
        this._trace = U.Trace.Off;
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
        this._trace !== U.Trace.Off &&
          this.connection
            .sendNotification(U.LogTraceNotification.type, {
              message: t,
              verbose: this._trace === U.Trace.Verbose ? n : void 0,
            })
            .catch(() => {});
      }
    },
    rs = class {
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
        this.connection.sendNotification(U.TelemetryEventNotification.type, t).catch(() => {
          this.connection.console.log('Sending TelemetryEventNotification failed');
        });
      }
    },
    is = class {
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
  ve._LanguagesImpl = is;
  var Vh = (0, Vw.FoldingRangeFeature)(
      (0, Qw.MonikerFeature)(
        (0, Gw.DiagnosticFeature)(
          (0, Yw.InlayHintFeature)(
            (0, $w.InlineValueFeature)(
              (0, Ww.TypeHierarchyFeature)(
                (0, Uw.LinkedEditingRangeFeature)(
                  (0, Bw.SemanticTokensFeature)((0, jw.CallHierarchyFeature)(is))
                )
              )
            )
          )
        )
      )
    ),
    os = class {
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
  ve._NotebooksImpl = os;
  var Yh = (0, Kw.NotebookSyncFeature)(os);
  function Gh(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineConsoleFeatures = Gh;
  function Kh(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineTelemetryFeatures = Kh;
  function Qh(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineTracerFeatures = Qh;
  function Jh(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineClientFeatures = Jh;
  function Zh(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineWindowFeatures = Zh;
  function Xh(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineWorkspaceFeatures = Xh;
  function em(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineLanguagesFeatures = em;
  function tm(e, t) {
    return function (n) {
      return t(e(n));
    };
  }
  ve.combineNotebooksFeatures = tm;
  function Jw(e, t) {
    function n(i, o, s) {
      return i && o ? s(i, o) : i || o;
    }
    return {
      __brand: 'features',
      console: n(e.console, t.console, Gh),
      tracer: n(e.tracer, t.tracer, Qh),
      telemetry: n(e.telemetry, t.telemetry, Kh),
      client: n(e.client, t.client, Jh),
      window: n(e.window, t.window, Zh),
      workspace: n(e.workspace, t.workspace, Xh),
      languages: n(e.languages, t.languages, em),
      notebooks: n(e.notebooks, t.notebooks, tm),
    };
  }
  ve.combineFeatures = Jw;
  function Zw(e, t, n) {
    let r = n && n.console ? new (n.console(Xo))() : new Xo(),
      i = e(r);
    r.rawAttach(i);
    let o = n && n.tracer ? new (n.tracer(ns))() : new ns(),
      s = n && n.telemetry ? new (n.telemetry(rs))() : new rs(),
      a = n && n.client ? new (n.client(ts))() : new ts(),
      u = n && n.window ? new (n.window(zh))() : new zh(),
      c = n && n.workspace ? new (n.workspace($h))() : new $h(),
      l = n && n.languages ? new (n.languages(Vh))() : new Vh(),
      p = n && n.notebooks ? new (n.notebooks(Yh))() : new Yh(),
      m = [r, o, s, a, u, c, l, p];
    function h(S) {
      return S instanceof Promise
        ? S
        : Lt.thenable(S)
          ? new Promise((x, F) => {
              S.then(
                (j) => x(j),
                (j) => F(j)
              );
            })
          : Promise.resolve(S);
    }
    let R,
      I,
      L,
      A = {
        listen: () => i.listen(),
        sendRequest: (S, ...x) => i.sendRequest(Lt.string(S) ? S : S.method, ...x),
        onRequest: (S, x) => i.onRequest(S, x),
        sendNotification: (S, x) => {
          let F = Lt.string(S) ? S : S.method;
          return i.sendNotification(F, x);
        },
        onNotification: (S, x) => i.onNotification(S, x),
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
        onInitialized: (S) => i.onNotification(U.InitializedNotification.type, S),
        onShutdown: (S) => (
          (R = S),
          {
            dispose: () => {
              R = void 0;
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
          return l;
        },
        get notebooks() {
          return p;
        },
        onDidChangeConfiguration: (S) =>
          i.onNotification(U.DidChangeConfigurationNotification.type, S),
        onDidChangeWatchedFiles: (S) =>
          i.onNotification(U.DidChangeWatchedFilesNotification.type, S),
        __textDocumentSync: void 0,
        onDidOpenTextDocument: (S) => i.onNotification(U.DidOpenTextDocumentNotification.type, S),
        onDidChangeTextDocument: (S) =>
          i.onNotification(U.DidChangeTextDocumentNotification.type, S),
        onDidCloseTextDocument: (S) => i.onNotification(U.DidCloseTextDocumentNotification.type, S),
        onWillSaveTextDocument: (S) => i.onNotification(U.WillSaveTextDocumentNotification.type, S),
        onWillSaveTextDocumentWaitUntil: (S) =>
          i.onRequest(U.WillSaveTextDocumentWaitUntilRequest.type, S),
        onDidSaveTextDocument: (S) => i.onNotification(U.DidSaveTextDocumentNotification.type, S),
        sendDiagnostics: (S) => i.sendNotification(U.PublishDiagnosticsNotification.type, S),
        onHover: (S) =>
          i.onRequest(U.HoverRequest.type, (x, F) => S(x, F, (0, re.attachWorkDone)(i, x), void 0)),
        onCompletion: (S) =>
          i.onRequest(U.CompletionRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onCompletionResolve: (S) => i.onRequest(U.CompletionResolveRequest.type, S),
        onSignatureHelp: (S) =>
          i.onRequest(U.SignatureHelpRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), void 0)
          ),
        onDeclaration: (S) =>
          i.onRequest(U.DeclarationRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onDefinition: (S) =>
          i.onRequest(U.DefinitionRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onTypeDefinition: (S) =>
          i.onRequest(U.TypeDefinitionRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onImplementation: (S) =>
          i.onRequest(U.ImplementationRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onReferences: (S) =>
          i.onRequest(U.ReferencesRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onDocumentHighlight: (S) =>
          i.onRequest(U.DocumentHighlightRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onDocumentSymbol: (S) =>
          i.onRequest(U.DocumentSymbolRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onWorkspaceSymbol: (S) =>
          i.onRequest(U.WorkspaceSymbolRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onWorkspaceSymbolResolve: (S) => i.onRequest(U.WorkspaceSymbolResolveRequest.type, S),
        onCodeAction: (S) =>
          i.onRequest(U.CodeActionRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onCodeActionResolve: (S) => i.onRequest(U.CodeActionResolveRequest.type, (x, F) => S(x, F)),
        onCodeLens: (S) =>
          i.onRequest(U.CodeLensRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onCodeLensResolve: (S) => i.onRequest(U.CodeLensResolveRequest.type, (x, F) => S(x, F)),
        onDocumentFormatting: (S) =>
          i.onRequest(U.DocumentFormattingRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), void 0)
          ),
        onDocumentRangeFormatting: (S) =>
          i.onRequest(U.DocumentRangeFormattingRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), void 0)
          ),
        onDocumentOnTypeFormatting: (S) =>
          i.onRequest(U.DocumentOnTypeFormattingRequest.type, (x, F) => S(x, F)),
        onRenameRequest: (S) =>
          i.onRequest(U.RenameRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), void 0)
          ),
        onPrepareRename: (S) => i.onRequest(U.PrepareRenameRequest.type, (x, F) => S(x, F)),
        onDocumentLinks: (S) =>
          i.onRequest(U.DocumentLinkRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onDocumentLinkResolve: (S) =>
          i.onRequest(U.DocumentLinkResolveRequest.type, (x, F) => S(x, F)),
        onDocumentColor: (S) =>
          i.onRequest(U.DocumentColorRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onColorPresentation: (S) =>
          i.onRequest(U.ColorPresentationRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onFoldingRanges: (S) =>
          i.onRequest(U.FoldingRangeRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onSelectionRanges: (S) =>
          i.onRequest(U.SelectionRangeRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), (0, re.attachPartialResult)(i, x))
          ),
        onExecuteCommand: (S) =>
          i.onRequest(U.ExecuteCommandRequest.type, (x, F) =>
            S(x, F, (0, re.attachWorkDone)(i, x), void 0)
          ),
        dispose: () => i.dispose(),
      };
    for (let S of m) S.attach(A);
    return (
      i.onRequest(U.InitializeRequest.type, (S) => {
        (t.initialize(S), Lt.string(S.trace) && (o.trace = U.Trace.fromString(S.trace)));
        for (let x of m) x.initialize(S.capabilities);
        if (I) {
          let x = I(S, new U.CancellationTokenSource().token, (0, re.attachWorkDone)(i, S), void 0);
          return h(x).then((F) => {
            if (F instanceof U.ResponseError) return F;
            let j = F;
            j || (j = { capabilities: {} });
            let E = j.capabilities;
            (E || ((E = {}), (j.capabilities = E)),
              E.textDocumentSync === void 0 || E.textDocumentSync === null
                ? (E.textDocumentSync = Lt.number(A.__textDocumentSync)
                    ? A.__textDocumentSync
                    : U.TextDocumentSyncKind.None)
                : !Lt.number(E.textDocumentSync) &&
                  !Lt.number(E.textDocumentSync.change) &&
                  (E.textDocumentSync.change = Lt.number(A.__textDocumentSync)
                    ? A.__textDocumentSync
                    : U.TextDocumentSyncKind.None));
            for (let Z of m) Z.fillServerCapabilities(E);
            return j;
          });
        } else {
          let x = { capabilities: { textDocumentSync: U.TextDocumentSyncKind.None } };
          for (let F of m) F.fillServerCapabilities(x.capabilities);
          return x;
        }
      }),
      i.onRequest(U.ShutdownRequest.type, () => {
        if (((t.shutdownReceived = !0), R)) return R(new U.CancellationTokenSource().token);
      }),
      i.onNotification(U.ExitNotification.type, () => {
        try {
          L && L();
        } finally {
          t.shutdownReceived ? t.exit(0) : t.exit(1);
        }
      }),
      i.onNotification(U.SetTraceNotification.type, (S) => {
        o.trace = U.Trace.fromString(S.value);
      }),
      A
    );
  }
  ve.createConnection = Zw;
});
var nm = O((wt) => {
  'use strict';
  Object.defineProperty(wt, '__esModule', { value: !0 });
  wt.resolveModulePath =
    wt.FileSystem =
    wt.resolveGlobalYarnPath =
    wt.resolveGlobalNodePath =
    wt.resolve =
    wt.uriToFilePath =
      void 0;
  var Xw = require('url'),
    $t = require('path'),
    Qu = require('fs'),
    ec = require('child_process');
  function ek(e) {
    let t = Xw.parse(e);
    if (t.protocol !== 'file:' || !t.path) return;
    let n = t.path.split('/');
    for (var r = 0, i = n.length; r < i; r++) n[r] = decodeURIComponent(n[r]);
    if (process.platform === 'win32' && n.length > 1) {
      let o = n[0],
        s = n[1];
      o.length === 0 && s.length > 1 && s[1] === ':' && n.shift();
    }
    return $t.normalize(n.join('/'));
  }
  wt.uriToFilePath = ek;
  function Ju() {
    return process.platform === 'win32';
  }
  function ss(e, t, n, r) {
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
      (Object.keys(u).forEach((l) => (c[l] = u[l])),
        t &&
          Qu.existsSync(t) &&
          (c[i] ? (c[i] = t + $t.delimiter + c[i]) : (c[i] = t),
          r && r(`NODE_PATH value is: ${c[i]}`)),
        (c.ELECTRON_RUN_AS_NODE = '1'));
      try {
        let l = (0, ec.fork)('', [], { cwd: n, env: c, execArgv: ['-e', o] });
        if (l.pid === void 0) {
          a(new Error(`Starting process to resolve node module  ${e} failed`));
          return;
        }
        (l.on('error', (m) => {
          a(m);
        }),
          l.on('message', (m) => {
            m.c === 'r' &&
              (l.send({ c: 'e' }), m.s ? s(m.r) : a(new Error(`Failed to resolve module: ${e}`)));
          }));
        let p = { c: 'rs', a: e };
        l.send(p);
      } catch (l) {
        a(l);
      }
    });
  }
  wt.resolve = ss;
  function Zu(e) {
    let t = 'npm',
      n = Object.create(null);
    (Object.keys(process.env).forEach((o) => (n[o] = process.env[o])),
      (n.NO_UPDATE_NOTIFIER = 'true'));
    let r = { encoding: 'utf8', env: n };
    Ju() && ((t = 'npm.cmd'), (r.shell = !0));
    let i = () => {};
    try {
      process.on('SIGPIPE', i);
      let o = (0, ec.spawnSync)(t, ['config', 'get', 'prefix'], r).stdout;
      if (!o) {
        e && e("'npm config get prefix' didn't return a value.");
        return;
      }
      let s = o.trim();
      return (
        e && e(`'npm config get prefix' value is: ${s}`),
        s.length > 0
          ? Ju()
            ? $t.join(s, 'node_modules')
            : $t.join(s, 'lib', 'node_modules')
          : void 0
      );
    } catch {
      return;
    } finally {
      process.removeListener('SIGPIPE', i);
    }
  }
  wt.resolveGlobalNodePath = Zu;
  function tk(e) {
    let t = 'yarn',
      n = { encoding: 'utf8' };
    Ju() && ((t = 'yarn.cmd'), (n.shell = !0));
    let r = () => {};
    try {
      process.on('SIGPIPE', r);
      let i = (0, ec.spawnSync)(t, ['global', 'dir', '--json'], n),
        o = i.stdout;
      if (!o) {
        e && (e("'yarn global dir' didn't return a value."), i.stderr && e(i.stderr));
        return;
      }
      let s = o.trim().split(/\r?\n/);
      for (let a of s)
        try {
          let u = JSON.parse(a);
          if (u.type === 'log') return $t.join(u.data, 'node_modules');
        } catch {}
      return;
    } catch {
      return;
    } finally {
      process.removeListener('SIGPIPE', r);
    }
  }
  wt.resolveGlobalYarnPath = tk;
  var Xu;
  (function (e) {
    let t;
    function n() {
      return (
        t !== void 0 ||
          (process.platform === 'win32'
            ? (t = !1)
            : (t =
                !Qu.existsSync(__filename.toUpperCase()) ||
                !Qu.existsSync(__filename.toLowerCase()))),
        t
      );
    }
    e.isCaseSensitive = n;
    function r(i, o) {
      return n()
        ? $t.normalize(o).indexOf($t.normalize(i)) === 0
        : $t.normalize(o).toLowerCase().indexOf($t.normalize(i).toLowerCase()) === 0;
    }
    e.isParent = r;
  })(Xu || (wt.FileSystem = Xu = {}));
  function nk(e, t, n, r) {
    return n
      ? ($t.isAbsolute(n) || (n = $t.join(e, n)),
        ss(t, n, n, r)
          .then((i) =>
            Xu.isParent(n, i)
              ? i
              : Promise.reject(new Error(`Failed to load ${t} from node path location.`))
          )
          .then(void 0, (i) => ss(t, Zu(r), e, r)))
      : ss(t, Zu(r), e, r);
  }
  wt.resolveModulePath = nk;
});
var tc = O((xP, rm) => {
  'use strict';
  rm.exports = Le();
});
var im = O((as) => {
  'use strict';
  Object.defineProperty(as, '__esModule', { value: !0 });
  as.InlineCompletionFeature = void 0;
  var rk = Le(),
    ik = (e) =>
      class extends e {
        get inlineCompletion() {
          return {
            on: (t) =>
              this.connection.onRequest(rk.InlineCompletionRequest.type, (n, r) =>
                t(n, r, this.attachWorkDoneProgress(n))
              ),
          };
        }
      };
  as.InlineCompletionFeature = ik;
});
var am = O((st) => {
  'use strict';
  var ok =
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
    sm =
      (st && st.__exportStar) ||
      function (e, t) {
        for (var n in e)
          n !== 'default' && !Object.prototype.hasOwnProperty.call(t, n) && ok(t, e, n);
      };
  Object.defineProperty(st, '__esModule', { value: !0 });
  st.ProposedFeatures = st.NotebookDocuments = st.TextDocuments = st.SemanticTokensBuilder = void 0;
  var sk = Lu();
  Object.defineProperty(st, 'SemanticTokensBuilder', {
    enumerable: !0,
    get: function () {
      return sk.SemanticTokensBuilder;
    },
  });
  var ak = im();
  sm(Le(), st);
  var uk = Hu();
  Object.defineProperty(st, 'TextDocuments', {
    enumerable: !0,
    get: function () {
      return uk.TextDocuments;
    },
  });
  var ck = Uu();
  Object.defineProperty(st, 'NotebookDocuments', {
    enumerable: !0,
    get: function () {
      return ck.NotebookDocuments;
    },
  });
  sm(Ku(), st);
  var om;
  (function (e) {
    e.all = { __brand: 'features', languages: ak.InlineCompletionFeature };
  })(om || (st.ProposedFeatures = om = {}));
});
var pm = O((Mt) => {
  'use strict';
  var lk =
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
    fm =
      (Mt && Mt.__exportStar) ||
      function (e, t) {
        for (var n in e)
          n !== 'default' && !Object.prototype.hasOwnProperty.call(t, n) && lk(t, e, n);
      };
  Object.defineProperty(Mt, '__esModule', { value: !0 });
  Mt.createConnection = Mt.Files = void 0;
  var um = require('node:util'),
    nc = Vi(),
    fk = Ku(),
    hi = nm(),
    Vn = tc();
  fm(tc(), Mt);
  fm(am(), Mt);
  var cm;
  (function (e) {
    ((e.uriToFilePath = hi.uriToFilePath),
      (e.resolveGlobalNodePath = hi.resolveGlobalNodePath),
      (e.resolveGlobalYarnPath = hi.resolveGlobalYarnPath),
      (e.resolve = hi.resolve),
      (e.resolveModulePath = hi.resolveModulePath));
  })(cm || (Mt.Files = cm = {}));
  var lm;
  function us() {
    if (lm !== void 0)
      try {
        lm.end();
      } catch {}
  }
  var qr = !1,
    dm;
  function dk() {
    let e = '--clientProcessId';
    function t(n) {
      try {
        let r = parseInt(n);
        isNaN(r) ||
          (dm = setInterval(() => {
            try {
              process.kill(r, 0);
            } catch {
              (us(), process.exit(qr ? 0 : 1));
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
  dk();
  var pk = {
    initialize: (e) => {
      let t = e.processId;
      nc.number(t) &&
        dm === void 0 &&
        setInterval(() => {
          try {
            process.kill(t, 0);
          } catch {
            process.exit(qr ? 0 : 1);
          }
        }, 3e3);
    },
    get shutdownReceived() {
      return qr;
    },
    set shutdownReceived(e) {
      qr = e;
    },
    exit: (e) => {
      (us(), process.exit(e));
    },
  };
  function hk(e, t, n, r) {
    let i, o, s, a;
    return (
      e !== void 0 && e.__brand === 'features' && ((i = e), (e = t), (t = n), (n = r)),
      Vn.ConnectionStrategy.is(e) || Vn.ConnectionOptions.is(e)
        ? (a = e)
        : ((o = e), (s = t), (a = n)),
      mk(o, s, a, i)
    );
  }
  Mt.createConnection = hk;
  function mk(e, t, n, r) {
    let i = !1;
    if (!e && !t && process.argv.length > 2) {
      let u,
        c,
        l = process.argv.slice(2);
      for (let p = 0; p < l.length; p++) {
        let m = l[p];
        if (m === '--node-ipc') {
          ((e = new Vn.IPCMessageReader(process)), (t = new Vn.IPCMessageWriter(process)));
          break;
        } else if (m === '--stdio') {
          ((i = !0), (e = process.stdin), (t = process.stdout));
          break;
        } else if (m === '--socket') {
          u = parseInt(l[p + 1]);
          break;
        } else if (m === '--pipe') {
          c = l[p + 1];
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
        let p = (0, Vn.createServerSocketTransport)(u);
        ((e = p[0]), (t = p[1]));
      } else if (c) {
        let p = (0, Vn.createServerPipeTransport)(c);
        ((e = p[0]), (t = p[1]));
      }
    }
    var s =
      "Use arguments of createConnection or set command line parameters: '--node-ipc', '--stdio' or '--socket={number}'";
    if (!e) throw new Error('Connection input stream is not set. ' + s);
    if (!t) throw new Error('Connection output stream is not set. ' + s);
    if (nc.func(e.read) && nc.func(e.on)) {
      let u = e;
      (u.on('end', () => {
        (us(), process.exit(qr ? 0 : 1));
      }),
        u.on('close', () => {
          (us(), process.exit(qr ? 0 : 1));
        }));
    }
    let a = (u) => {
      let c = (0, Vn.createProtocolConnection)(e, t, u, n);
      return (i && gk(u), c);
    };
    return (0, fk.createConnection)(a, pk, r);
  }
  function gk(e) {
    function t(r) {
      return r.map((i) => (typeof i == 'string' ? i : (0, um.inspect)(i))).join(' ');
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
        e.log((0, um.inspect)(i, o));
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
var mm = O((TP, hm) => {
  'use strict';
  hm.exports = pm();
});
var mi = O((DP, xm) => {
  var bk = Object.prototype.toString;
  xm.exports = function (t) {
    if (t === void 0) return 'undefined';
    if (t === null) return 'null';
    var n = typeof t;
    if (n === 'boolean') return 'boolean';
    if (n === 'string') return 'string';
    if (n === 'number') return 'number';
    if (n === 'symbol') return 'symbol';
    if (n === 'function') return _k(t) ? 'generatorfunction' : 'function';
    if (vk(t)) return 'array';
    if (Ck(t)) return 'buffer';
    if (Tk(t)) return 'arguments';
    if (wk(t)) return 'date';
    if (xk(t)) return 'error';
    if (kk(t)) return 'regexp';
    switch (vm(t)) {
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
    if (Sk(t)) return 'generator';
    switch (((n = bk.call(t)), n)) {
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
  function vm(e) {
    return typeof e.constructor == 'function' ? e.constructor.name : null;
  }
  function vk(e) {
    return Array.isArray ? Array.isArray(e) : e instanceof Array;
  }
  function xk(e) {
    return (
      e instanceof Error ||
      (typeof e.message == 'string' &&
        e.constructor &&
        typeof e.constructor.stackTraceLimit == 'number')
    );
  }
  function wk(e) {
    return e instanceof Date
      ? !0
      : typeof e.toDateString == 'function' &&
          typeof e.getDate == 'function' &&
          typeof e.setDate == 'function';
  }
  function kk(e) {
    return e instanceof RegExp
      ? !0
      : typeof e.flags == 'string' &&
          typeof e.ignoreCase == 'boolean' &&
          typeof e.multiline == 'boolean' &&
          typeof e.global == 'boolean';
  }
  function _k(e, t) {
    return vm(e) === 'GeneratorFunction';
  }
  function Sk(e) {
    return (
      typeof e.throw == 'function' && typeof e.return == 'function' && typeof e.next == 'function'
    );
  }
  function Tk(e) {
    try {
      if (typeof e.length == 'number' && typeof e.callee == 'function') return !0;
    } catch (t) {
      if (t.message.indexOf('callee') !== -1) return !0;
    }
    return !1;
  }
  function Ck(e) {
    return e.constructor && typeof e.constructor.isBuffer == 'function'
      ? e.constructor.isBuffer(e)
      : !1;
  }
});
var km = O((EP, wm) => {
  'use strict';
  wm.exports = function (t) {
    return typeof t < 'u' && t !== null && (typeof t == 'object' || typeof t == 'function');
  };
});
var Tm = O((RP, Sm) => {
  'use strict';
  var _m = km();
  Sm.exports = function (t) {
    _m(t) || (t = {});
    for (var n = arguments.length, r = 1; r < n; r++) {
      var i = arguments[r];
      _m(i) && Dk(t, i);
    }
    return t;
  };
  function Dk(e, t) {
    for (var n in t) Ek(t, n) && (e[n] = t[n]);
  }
  function Ek(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
});
var Em = O((AP, Dm) => {
  'use strict';
  var Rk = mi(),
    Ak = Tm();
  Dm.exports = function (e, t) {
    typeof t == 'function' && (t = { parse: t });
    var n = qk(e),
      r = { section_delimiter: '---', parse: Ik },
      i = Ak({}, r, t),
      o = i.section_delimiter,
      s = n.content.split(/\r?\n/),
      a = null,
      u = Cm(),
      c = [],
      l = [];
    function p(A) {
      ((n.content = A), (a = []), (c = []));
    }
    function m(A) {
      l.length &&
        ((u.key = Ok(l[0], o)),
        (u.content = A),
        i.parse(u, a),
        a.push(u),
        (u = Cm()),
        (c = []),
        (l = []));
    }
    for (var h = 0; h < s.length; h++) {
      var R = s[h],
        I = l.length,
        L = R.trim();
      if (Pk(L, o)) {
        if (L.length === 3 && h !== 0) {
          if (I === 0 || I === 2) {
            c.push(R);
            continue;
          }
          (l.push(L),
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
          l.push(L));
        continue;
      }
      c.push(R);
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
  function Pk(e, t) {
    return !(e.slice(0, t.length) !== t || e.charAt(t.length + 1) === t.slice(-1));
  }
  function qk(e) {
    if (
      (Rk(e) !== 'object' && (e = { content: e }), typeof e.content != 'string' && !Fk(e.content))
    )
      throw new TypeError('expected a buffer or string');
    return ((e.content = e.content.toString()), (e.sections = []), e);
  }
  function Ok(e, t) {
    return e ? e.slice(t.length).trim() : '';
  }
  function Cm() {
    return { key: '', data: '', content: '' };
  }
  function Ik(e) {
    return e;
  }
  function Fk(e) {
    return e && e.constructor && typeof e.constructor.isBuffer == 'function'
      ? e.constructor.isBuffer(e)
      : !1;
  }
});
var Gn = O((PP, Yn) => {
  'use strict';
  function Rm(e) {
    return typeof e > 'u' || e === null;
  }
  function Nk(e) {
    return typeof e == 'object' && e !== null;
  }
  function Lk(e) {
    return Array.isArray(e) ? e : Rm(e) ? [] : [e];
  }
  function Mk(e, t) {
    var n, r, i, o;
    if (t) for (o = Object.keys(t), n = 0, r = o.length; n < r; n += 1) ((i = o[n]), (e[i] = t[i]));
    return e;
  }
  function jk(e, t) {
    var n = '',
      r;
    for (r = 0; r < t; r += 1) n += e;
    return n;
  }
  function Bk(e) {
    return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
  }
  Yn.exports.isNothing = Rm;
  Yn.exports.isObject = Nk;
  Yn.exports.toArray = Lk;
  Yn.exports.repeat = jk;
  Yn.exports.isNegativeZero = Bk;
  Yn.exports.extend = Mk;
});
var Or = O((qP, Am) => {
  'use strict';
  function gi(e, t) {
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
  gi.prototype = Object.create(Error.prototype);
  gi.prototype.constructor = gi;
  gi.prototype.toString = function (t) {
    var n = this.name + ': ';
    return (
      (n += this.reason || '(unknown reason)'),
      !t && this.mark && (n += ' ' + this.mark.toString()),
      n
    );
  };
  Am.exports = gi;
});
var Om = O((OP, qm) => {
  'use strict';
  var Pm = Gn();
  function ic(e, t, n, r, i) {
    ((this.name = e), (this.buffer = t), (this.position = n), (this.line = r), (this.column = i));
  }
  ic.prototype.getSnippet = function (t, n) {
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
      Pm.repeat(' ', t) +
        r +
        a +
        o +
        `
` +
        Pm.repeat(' ', t + this.position - i + r.length) +
        '^'
    );
  };
  ic.prototype.toString = function (t) {
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
  qm.exports = ic;
});
var $e = O((IP, Fm) => {
  'use strict';
  var Im = Or(),
    Hk = [
      'kind',
      'resolve',
      'construct',
      'instanceOf',
      'predicate',
      'represent',
      'defaultStyle',
      'styleAliases',
    ],
    zk = ['scalar', 'sequence', 'mapping'];
  function Uk(e) {
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
  function Wk(e, t) {
    if (
      ((t = t || {}),
      Object.keys(t).forEach(function (n) {
        if (Hk.indexOf(n) === -1)
          throw new Im('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
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
      (this.styleAliases = Uk(t.styleAliases || null)),
      zk.indexOf(this.kind) === -1)
    )
      throw new Im('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
  }
  Fm.exports = Wk;
});
var Kn = O((FP, Lm) => {
  'use strict';
  var Nm = Gn(),
    fs = Or(),
    $k = $e();
  function oc(e, t, n) {
    var r = [];
    return (
      e.include.forEach(function (i) {
        n = oc(i, t, n);
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
  function Vk() {
    var e = { scalar: {}, sequence: {}, mapping: {}, fallback: {} },
      t,
      n;
    function r(i) {
      e[i.kind][i.tag] = e.fallback[i.tag] = i;
    }
    for (t = 0, n = arguments.length; t < n; t += 1) arguments[t].forEach(r);
    return e;
  }
  function Ir(e) {
    ((this.include = e.include || []),
      (this.implicit = e.implicit || []),
      (this.explicit = e.explicit || []),
      this.implicit.forEach(function (t) {
        if (t.loadKind && t.loadKind !== 'scalar')
          throw new fs(
            'There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.'
          );
      }),
      (this.compiledImplicit = oc(this, 'implicit', [])),
      (this.compiledExplicit = oc(this, 'explicit', [])),
      (this.compiledTypeMap = Vk(this.compiledImplicit, this.compiledExplicit)));
  }
  Ir.DEFAULT = null;
  Ir.create = function () {
    var t, n;
    switch (arguments.length) {
      case 1:
        ((t = Ir.DEFAULT), (n = arguments[0]));
        break;
      case 2:
        ((t = arguments[0]), (n = arguments[1]));
        break;
      default:
        throw new fs('Wrong number of arguments for Schema.create function');
    }
    if (
      ((t = Nm.toArray(t)),
      (n = Nm.toArray(n)),
      !t.every(function (r) {
        return r instanceof Ir;
      }))
    )
      throw new fs(
        'Specified list of super schemas (or a single Schema object) contains a non-Schema object.'
      );
    if (
      !n.every(function (r) {
        return r instanceof $k;
      })
    )
      throw new fs(
        'Specified list of YAML types (or a single Type object) contains a non-Type object.'
      );
    return new Ir({ include: t, explicit: n });
  };
  Lm.exports = Ir;
});
var jm = O((NP, Mm) => {
  'use strict';
  var Yk = $e();
  Mm.exports = new Yk('tag:yaml.org,2002:str', {
    kind: 'scalar',
    construct: function (e) {
      return e !== null ? e : '';
    },
  });
});
var Hm = O((LP, Bm) => {
  'use strict';
  var Gk = $e();
  Bm.exports = new Gk('tag:yaml.org,2002:seq', {
    kind: 'sequence',
    construct: function (e) {
      return e !== null ? e : [];
    },
  });
});
var Um = O((MP, zm) => {
  'use strict';
  var Kk = $e();
  zm.exports = new Kk('tag:yaml.org,2002:map', {
    kind: 'mapping',
    construct: function (e) {
      return e !== null ? e : {};
    },
  });
});
var ds = O((jP, Wm) => {
  'use strict';
  var Qk = Kn();
  Wm.exports = new Qk({ explicit: [jm(), Hm(), Um()] });
});
var Vm = O((BP, $m) => {
  'use strict';
  var Jk = $e();
  function Zk(e) {
    if (e === null) return !0;
    var t = e.length;
    return (t === 1 && e === '~') || (t === 4 && (e === 'null' || e === 'Null' || e === 'NULL'));
  }
  function Xk() {
    return null;
  }
  function e_(e) {
    return e === null;
  }
  $m.exports = new Jk('tag:yaml.org,2002:null', {
    kind: 'scalar',
    resolve: Zk,
    construct: Xk,
    predicate: e_,
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
var Gm = O((HP, Ym) => {
  'use strict';
  var t_ = $e();
  function n_(e) {
    if (e === null) return !1;
    var t = e.length;
    return (
      (t === 4 && (e === 'true' || e === 'True' || e === 'TRUE')) ||
      (t === 5 && (e === 'false' || e === 'False' || e === 'FALSE'))
    );
  }
  function r_(e) {
    return e === 'true' || e === 'True' || e === 'TRUE';
  }
  function i_(e) {
    return Object.prototype.toString.call(e) === '[object Boolean]';
  }
  Ym.exports = new t_('tag:yaml.org,2002:bool', {
    kind: 'scalar',
    resolve: n_,
    construct: r_,
    predicate: i_,
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
var Qm = O((zP, Km) => {
  'use strict';
  var o_ = Gn(),
    s_ = $e();
  function a_(e) {
    return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
  }
  function u_(e) {
    return 48 <= e && e <= 55;
  }
  function c_(e) {
    return 48 <= e && e <= 57;
  }
  function l_(e) {
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
            if (!a_(e.charCodeAt(n))) return !1;
            r = !0;
          }
        return r && i !== '_';
      }
      for (; n < t; n++)
        if (((i = e[n]), i !== '_')) {
          if (!u_(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== '_';
    }
    if (i === '_') return !1;
    for (; n < t; n++)
      if (((i = e[n]), i !== '_')) {
        if (i === ':') break;
        if (!c_(e.charCodeAt(n))) return !1;
        r = !0;
      }
    return !r || i === '_' ? !1 : i !== ':' ? !0 : /^(:[0-5]?[0-9])+$/.test(e.slice(n));
  }
  function f_(e) {
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
  function d_(e) {
    return (
      Object.prototype.toString.call(e) === '[object Number]' &&
      e % 1 === 0 &&
      !o_.isNegativeZero(e)
    );
  }
  Km.exports = new s_('tag:yaml.org,2002:int', {
    kind: 'scalar',
    resolve: l_,
    construct: f_,
    predicate: d_,
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
var Xm = O((UP, Zm) => {
  'use strict';
  var Jm = Gn(),
    p_ = $e(),
    h_ = new RegExp(
      '^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$'
    );
  function m_(e) {
    return !(e === null || !h_.test(e) || e[e.length - 1] === '_');
  }
  function g_(e) {
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
  var y_ = /^[-+]?[0-9]+e/;
  function b_(e, t) {
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
    else if (Jm.isNegativeZero(e)) return '-0.0';
    return ((n = e.toString(10)), y_.test(n) ? n.replace('e', '.e') : n);
  }
  function v_(e) {
    return (
      Object.prototype.toString.call(e) === '[object Number]' &&
      (e % 1 !== 0 || Jm.isNegativeZero(e))
    );
  }
  Zm.exports = new p_('tag:yaml.org,2002:float', {
    kind: 'scalar',
    resolve: m_,
    construct: g_,
    predicate: v_,
    represent: b_,
    defaultStyle: 'lowercase',
  });
});
var sc = O((WP, eg) => {
  'use strict';
  var x_ = Kn();
  eg.exports = new x_({ include: [ds()], implicit: [Vm(), Gm(), Qm(), Xm()] });
});
var ac = O(($P, tg) => {
  'use strict';
  var w_ = Kn();
  tg.exports = new w_({ include: [sc()] });
});
var og = O((VP, ig) => {
  'use strict';
  var k_ = $e(),
    ng = new RegExp('^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$'),
    rg = new RegExp(
      '^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$'
    );
  function __(e) {
    return e === null ? !1 : ng.exec(e) !== null || rg.exec(e) !== null;
  }
  function S_(e) {
    var t,
      n,
      r,
      i,
      o,
      s,
      a,
      u = 0,
      c = null,
      l,
      p,
      m;
    if (((t = ng.exec(e)), t === null && (t = rg.exec(e)), t === null))
      throw new Error('Date resolve error');
    if (((n = +t[1]), (r = +t[2] - 1), (i = +t[3]), !t[4])) return new Date(Date.UTC(n, r, i));
    if (((o = +t[4]), (s = +t[5]), (a = +t[6]), t[7])) {
      for (u = t[7].slice(0, 3); u.length < 3; ) u += '0';
      u = +u;
    }
    return (
      t[9] &&
        ((l = +t[10]), (p = +(t[11] || 0)), (c = (l * 60 + p) * 6e4), t[9] === '-' && (c = -c)),
      (m = new Date(Date.UTC(n, r, i, o, s, a, u))),
      c && m.setTime(m.getTime() - c),
      m
    );
  }
  function T_(e) {
    return e.toISOString();
  }
  ig.exports = new k_('tag:yaml.org,2002:timestamp', {
    kind: 'scalar',
    resolve: __,
    construct: S_,
    instanceOf: Date,
    represent: T_,
  });
});
var ag = O((YP, sg) => {
  'use strict';
  var C_ = $e();
  function D_(e) {
    return e === '<<' || e === null;
  }
  sg.exports = new C_('tag:yaml.org,2002:merge', { kind: 'scalar', resolve: D_ });
});
var lg = O((GP, cg) => {
  'use strict';
  var Qn;
  try {
    ((ug = require), (Qn = ug('buffer').Buffer));
  } catch {}
  var ug,
    E_ = $e(),
    uc = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function R_(e) {
    if (e === null) return !1;
    var t,
      n,
      r = 0,
      i = e.length,
      o = uc;
    for (n = 0; n < i; n++)
      if (((t = o.indexOf(e.charAt(n))), !(t > 64))) {
        if (t < 0) return !1;
        r += 6;
      }
    return r % 8 === 0;
  }
  function A_(e) {
    var t,
      n,
      r = e.replace(/[\r\n=]/g, ''),
      i = r.length,
      o = uc,
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
      Qn ? (Qn.from ? Qn.from(a) : new Qn(a)) : a
    );
  }
  function P_(e) {
    var t = '',
      n = 0,
      r,
      i,
      o = e.length,
      s = uc;
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
  function q_(e) {
    return Qn && Qn.isBuffer(e);
  }
  cg.exports = new E_('tag:yaml.org,2002:binary', {
    kind: 'scalar',
    resolve: R_,
    construct: A_,
    predicate: q_,
    represent: P_,
  });
});
var dg = O((KP, fg) => {
  'use strict';
  var O_ = $e(),
    I_ = Object.prototype.hasOwnProperty,
    F_ = Object.prototype.toString;
  function N_(e) {
    if (e === null) return !0;
    var t = [],
      n,
      r,
      i,
      o,
      s,
      a = e;
    for (n = 0, r = a.length; n < r; n += 1) {
      if (((i = a[n]), (s = !1), F_.call(i) !== '[object Object]')) return !1;
      for (o in i)
        if (I_.call(i, o))
          if (!s) s = !0;
          else return !1;
      if (!s) return !1;
      if (t.indexOf(o) === -1) t.push(o);
      else return !1;
    }
    return !0;
  }
  function L_(e) {
    return e !== null ? e : [];
  }
  fg.exports = new O_('tag:yaml.org,2002:omap', { kind: 'sequence', resolve: N_, construct: L_ });
});
var hg = O((QP, pg) => {
  'use strict';
  var M_ = $e(),
    j_ = Object.prototype.toString;
  function B_(e) {
    if (e === null) return !0;
    var t,
      n,
      r,
      i,
      o,
      s = e;
    for (o = new Array(s.length), t = 0, n = s.length; t < n; t += 1) {
      if (((r = s[t]), j_.call(r) !== '[object Object]' || ((i = Object.keys(r)), i.length !== 1)))
        return !1;
      o[t] = [i[0], r[i[0]]];
    }
    return !0;
  }
  function H_(e) {
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
  pg.exports = new M_('tag:yaml.org,2002:pairs', { kind: 'sequence', resolve: B_, construct: H_ });
});
var gg = O((JP, mg) => {
  'use strict';
  var z_ = $e(),
    U_ = Object.prototype.hasOwnProperty;
  function W_(e) {
    if (e === null) return !0;
    var t,
      n = e;
    for (t in n) if (U_.call(n, t) && n[t] !== null) return !1;
    return !0;
  }
  function $_(e) {
    return e !== null ? e : {};
  }
  mg.exports = new z_('tag:yaml.org,2002:set', { kind: 'mapping', resolve: W_, construct: $_ });
});
var Fr = O((ZP, yg) => {
  'use strict';
  var V_ = Kn();
  yg.exports = new V_({
    include: [ac()],
    implicit: [og(), ag()],
    explicit: [lg(), dg(), hg(), gg()],
  });
});
var vg = O((XP, bg) => {
  'use strict';
  var Y_ = $e();
  function G_() {
    return !0;
  }
  function K_() {}
  function Q_() {
    return '';
  }
  function J_(e) {
    return typeof e > 'u';
  }
  bg.exports = new Y_('tag:yaml.org,2002:js/undefined', {
    kind: 'scalar',
    resolve: G_,
    construct: K_,
    predicate: J_,
    represent: Q_,
  });
});
var wg = O((eq, xg) => {
  'use strict';
  var Z_ = $e();
  function X_(e) {
    if (e === null || e.length === 0) return !1;
    var t = e,
      n = /\/([gim]*)$/.exec(e),
      r = '';
    return !(t[0] === '/' && (n && (r = n[1]), r.length > 3 || t[t.length - r.length - 1] !== '/'));
  }
  function eS(e) {
    var t = e,
      n = /\/([gim]*)$/.exec(e),
      r = '';
    return (
      t[0] === '/' && (n && (r = n[1]), (t = t.slice(1, t.length - r.length - 1))),
      new RegExp(t, r)
    );
  }
  function tS(e) {
    var t = '/' + e.source + '/';
    return (e.global && (t += 'g'), e.multiline && (t += 'm'), e.ignoreCase && (t += 'i'), t);
  }
  function nS(e) {
    return Object.prototype.toString.call(e) === '[object RegExp]';
  }
  xg.exports = new Z_('tag:yaml.org,2002:js/regexp', {
    kind: 'scalar',
    resolve: X_,
    construct: eS,
    predicate: nS,
    represent: tS,
  });
});
var Sg = O((tq, _g) => {
  'use strict';
  var ps;
  try {
    ((kg = require), (ps = kg('esprima')));
  } catch {
    typeof window < 'u' && (ps = window.esprima);
  }
  var kg,
    rS = $e();
  function iS(e) {
    if (e === null) return !1;
    try {
      var t = '(' + e + ')',
        n = ps.parse(t, { range: !0 });
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
  function oS(e) {
    var t = '(' + e + ')',
      n = ps.parse(t, { range: !0 }),
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
  function sS(e) {
    return e.toString();
  }
  function aS(e) {
    return Object.prototype.toString.call(e) === '[object Function]';
  }
  _g.exports = new rS('tag:yaml.org,2002:js/function', {
    kind: 'scalar',
    resolve: iS,
    construct: oS,
    predicate: aS,
    represent: sS,
  });
});
var yi = O((nq, Cg) => {
  'use strict';
  var Tg = Kn();
  Cg.exports = Tg.DEFAULT = new Tg({ include: [Fr()], explicit: [vg(), wg(), Sg()] });
});
var Vg = O((rq, bi) => {
  'use strict';
  var un = Gn(),
    Og = Or(),
    uS = Om(),
    Ig = Fr(),
    cS = yi(),
    En = Object.prototype.hasOwnProperty,
    hs = 1,
    Fg = 2,
    Ng = 3,
    ms = 4,
    cc = 1,
    lS = 2,
    Dg = 3,
    fS =
      /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
    dS = /[\x85\u2028\u2029]/,
    pS = /[,\[\]\{\}]/,
    Lg = /^(?:!|!!|![a-z\-]+!)$/i,
    Mg = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function Eg(e) {
    return Object.prototype.toString.call(e);
  }
  function en(e) {
    return e === 10 || e === 13;
  }
  function Zn(e) {
    return e === 9 || e === 32;
  }
  function kt(e) {
    return e === 9 || e === 32 || e === 10 || e === 13;
  }
  function Nr(e) {
    return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
  }
  function hS(e) {
    var t;
    return 48 <= e && e <= 57 ? e - 48 : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
  }
  function mS(e) {
    return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
  }
  function gS(e) {
    return 48 <= e && e <= 57 ? e - 48 : -1;
  }
  function Rg(e) {
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
  function yS(e) {
    return e <= 65535
      ? String.fromCharCode(e)
      : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
  }
  function jg(e, t, n) {
    t === '__proto__'
      ? Object.defineProperty(e, t, { configurable: !0, enumerable: !0, writable: !0, value: n })
      : (e[t] = n);
  }
  var Bg = new Array(256),
    Hg = new Array(256);
  for (Jn = 0; Jn < 256; Jn++) ((Bg[Jn] = Rg(Jn) ? 1 : 0), (Hg[Jn] = Rg(Jn)));
  var Jn;
  function bS(e, t) {
    ((this.input = e),
      (this.filename = t.filename || null),
      (this.schema = t.schema || cS),
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
  function zg(e, t) {
    return new Og(t, new uS(e.filename, e.input, e.position, e.line, e.position - e.lineStart));
  }
  function J(e, t) {
    throw zg(e, t);
  }
  function gs(e, t) {
    e.onWarning && e.onWarning.call(null, zg(e, t));
  }
  var Ag = {
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
        s !== 1 && s !== 2 && gs(t, 'unsupported YAML version of the document'));
    },
    TAG: function (t, n, r) {
      var i, o;
      (r.length !== 2 && J(t, 'TAG directive accepts exactly two arguments'),
        (i = r[0]),
        (o = r[1]),
        Lg.test(i) || J(t, 'ill-formed tag handle (first argument) of the TAG directive'),
        En.call(t.tagMap, i) &&
          J(t, 'there is a previously declared suffix for "' + i + '" tag handle'),
        Mg.test(o) || J(t, 'ill-formed tag prefix (second argument) of the TAG directive'),
        (t.tagMap[i] = o));
    },
  };
  function Dn(e, t, n, r) {
    var i, o, s, a;
    if (t < n) {
      if (((a = e.input.slice(t, n)), r))
        for (i = 0, o = a.length; i < o; i += 1)
          ((s = a.charCodeAt(i)),
            s === 9 || (32 <= s && s <= 1114111) || J(e, 'expected valid JSON character'));
      else fS.test(a) && J(e, 'the stream contains non-printable characters');
      e.result += a;
    }
  }
  function Pg(e, t, n, r) {
    var i, o, s, a;
    for (
      un.isObject(n) || J(e, 'cannot merge mappings; the provided source object is unacceptable'),
        i = Object.keys(n),
        s = 0,
        a = i.length;
      s < a;
      s += 1
    )
      ((o = i[s]), En.call(t, o) || (jg(t, o, n[o]), (r[o] = !0)));
  }
  function Lr(e, t, n, r, i, o, s, a) {
    var u, c;
    if (Array.isArray(i))
      for (i = Array.prototype.slice.call(i), u = 0, c = i.length; u < c; u += 1)
        (Array.isArray(i[u]) && J(e, 'nested arrays are not supported inside keys'),
          typeof i == 'object' && Eg(i[u]) === '[object Object]' && (i[u] = '[object Object]'));
    if (
      (typeof i == 'object' && Eg(i) === '[object Object]' && (i = '[object Object]'),
      (i = String(i)),
      t === null && (t = {}),
      r === 'tag:yaml.org,2002:merge')
    )
      if (Array.isArray(o)) for (u = 0, c = o.length; u < c; u += 1) Pg(e, t, o[u], n);
      else Pg(e, t, o, n);
    else
      (!e.json &&
        !En.call(n, i) &&
        En.call(t, i) &&
        ((e.line = s || e.line), (e.position = a || e.position), J(e, 'duplicated mapping key')),
        jg(t, i, o),
        delete n[i]);
    return t;
  }
  function lc(e) {
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
  function He(e, t, n) {
    for (var r = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
      for (; Zn(i); ) i = e.input.charCodeAt(++e.position);
      if (t && i === 35)
        do i = e.input.charCodeAt(++e.position);
        while (i !== 10 && i !== 13 && i !== 0);
      if (en(i))
        for (lc(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
          (e.lineIndent++, (i = e.input.charCodeAt(++e.position)));
      else break;
    }
    return (n !== -1 && r !== 0 && e.lineIndent < n && gs(e, 'deficient indentation'), r);
  }
  function ys(e) {
    var t = e.position,
      n;
    return (
      (n = e.input.charCodeAt(t)),
      !!(
        (n === 45 || n === 46) &&
        n === e.input.charCodeAt(t + 1) &&
        n === e.input.charCodeAt(t + 2) &&
        ((t += 3), (n = e.input.charCodeAt(t)), n === 0 || kt(n))
      )
    );
  }
  function fc(e, t) {
    t === 1
      ? (e.result += ' ')
      : t > 1 &&
        (e.result += un.repeat(
          `
`,
          t - 1
        ));
  }
  function vS(e, t, n) {
    var r,
      i,
      o,
      s,
      a,
      u,
      c,
      l,
      p = e.kind,
      m = e.result,
      h;
    if (
      ((h = e.input.charCodeAt(e.position)),
      kt(h) ||
        Nr(h) ||
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
          ((i = e.input.charCodeAt(e.position + 1)), kt(i) || (n && Nr(i)))))
    )
      return !1;
    for (e.kind = 'scalar', e.result = '', o = s = e.position, a = !1; h !== 0; ) {
      if (h === 58) {
        if (((i = e.input.charCodeAt(e.position + 1)), kt(i) || (n && Nr(i)))) break;
      } else if (h === 35) {
        if (((r = e.input.charCodeAt(e.position - 1)), kt(r))) break;
      } else {
        if ((e.position === e.lineStart && ys(e)) || (n && Nr(h))) break;
        if (en(h))
          if (
            ((u = e.line), (c = e.lineStart), (l = e.lineIndent), He(e, !1, -1), e.lineIndent >= t)
          ) {
            ((a = !0), (h = e.input.charCodeAt(e.position)));
            continue;
          } else {
            ((e.position = s), (e.line = u), (e.lineStart = c), (e.lineIndent = l));
            break;
          }
      }
      (a && (Dn(e, o, s, !1), fc(e, e.line - u), (o = s = e.position), (a = !1)),
        Zn(h) || (s = e.position + 1),
        (h = e.input.charCodeAt(++e.position)));
    }
    return (Dn(e, o, s, !1), e.result ? !0 : ((e.kind = p), (e.result = m), !1));
  }
  function xS(e, t) {
    var n, r, i;
    if (((n = e.input.charCodeAt(e.position)), n !== 39)) return !1;
    for (
      e.kind = 'scalar', e.result = '', e.position++, r = i = e.position;
      (n = e.input.charCodeAt(e.position)) !== 0;
    )
      if (n === 39)
        if ((Dn(e, r, e.position, !0), (n = e.input.charCodeAt(++e.position)), n === 39))
          ((r = e.position), e.position++, (i = e.position));
        else return !0;
      else
        en(n)
          ? (Dn(e, r, i, !0), fc(e, He(e, !1, t)), (r = i = e.position))
          : e.position === e.lineStart && ys(e)
            ? J(e, 'unexpected end of the document within a single quoted scalar')
            : (e.position++, (i = e.position));
    J(e, 'unexpected end of the stream within a single quoted scalar');
  }
  function wS(e, t) {
    var n, r, i, o, s, a;
    if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
    for (
      e.kind = 'scalar', e.result = '', e.position++, n = r = e.position;
      (a = e.input.charCodeAt(e.position)) !== 0;
    ) {
      if (a === 34) return (Dn(e, n, e.position, !0), e.position++, !0);
      if (a === 92) {
        if ((Dn(e, n, e.position, !0), (a = e.input.charCodeAt(++e.position)), en(a))) He(e, !1, t);
        else if (a < 256 && Bg[a]) ((e.result += Hg[a]), e.position++);
        else if ((s = mS(a)) > 0) {
          for (i = s, o = 0; i > 0; i--)
            ((a = e.input.charCodeAt(++e.position)),
              (s = hS(a)) >= 0 ? (o = (o << 4) + s) : J(e, 'expected hexadecimal character'));
          ((e.result += yS(o)), e.position++);
        } else J(e, 'unknown escape sequence');
        n = r = e.position;
      } else
        en(a)
          ? (Dn(e, n, r, !0), fc(e, He(e, !1, t)), (n = r = e.position))
          : e.position === e.lineStart && ys(e)
            ? J(e, 'unexpected end of the document within a double quoted scalar')
            : (e.position++, (r = e.position));
    }
    J(e, 'unexpected end of the stream within a double quoted scalar');
  }
  function kS(e, t) {
    var n = !0,
      r,
      i = e.tag,
      o,
      s = e.anchor,
      a,
      u,
      c,
      l,
      p,
      m = {},
      h,
      R,
      I,
      L;
    if (((L = e.input.charCodeAt(e.position)), L === 91)) ((u = 93), (p = !1), (o = []));
    else if (L === 123) ((u = 125), (p = !0), (o = {}));
    else return !1;
    for (
      e.anchor !== null && (e.anchorMap[e.anchor] = o), L = e.input.charCodeAt(++e.position);
      L !== 0;
    ) {
      if ((He(e, !0, t), (L = e.input.charCodeAt(e.position)), L === u))
        return (
          e.position++,
          (e.tag = i),
          (e.anchor = s),
          (e.kind = p ? 'mapping' : 'sequence'),
          (e.result = o),
          !0
        );
      (n || J(e, 'missed comma between flow collection entries'),
        (R = h = I = null),
        (c = l = !1),
        L === 63 &&
          ((a = e.input.charCodeAt(e.position + 1)),
          kt(a) && ((c = l = !0), e.position++, He(e, !0, t))),
        (r = e.line),
        Mr(e, t, hs, !1, !0),
        (R = e.tag),
        (h = e.result),
        He(e, !0, t),
        (L = e.input.charCodeAt(e.position)),
        (l || e.line === r) &&
          L === 58 &&
          ((c = !0),
          (L = e.input.charCodeAt(++e.position)),
          He(e, !0, t),
          Mr(e, t, hs, !1, !0),
          (I = e.result)),
        p ? Lr(e, o, m, R, h, I) : c ? o.push(Lr(e, null, m, R, h, I)) : o.push(h),
        He(e, !0, t),
        (L = e.input.charCodeAt(e.position)),
        L === 44 ? ((n = !0), (L = e.input.charCodeAt(++e.position))) : (n = !1));
    }
    J(e, 'unexpected end of the stream within a flow collection');
  }
  function _S(e, t) {
    var n,
      r,
      i = cc,
      o = !1,
      s = !1,
      a = t,
      u = 0,
      c = !1,
      l,
      p;
    if (((p = e.input.charCodeAt(e.position)), p === 124)) r = !1;
    else if (p === 62) r = !0;
    else return !1;
    for (e.kind = 'scalar', e.result = ''; p !== 0; )
      if (((p = e.input.charCodeAt(++e.position)), p === 43 || p === 45))
        cc === i ? (i = p === 43 ? Dg : lS) : J(e, 'repeat of a chomping mode identifier');
      else if ((l = gS(p)) >= 0)
        l === 0
          ? J(e, 'bad explicit indentation width of a block scalar; it cannot be less than one')
          : s
            ? J(e, 'repeat of an indentation width identifier')
            : ((a = t + l - 1), (s = !0));
      else break;
    if (Zn(p)) {
      do p = e.input.charCodeAt(++e.position);
      while (Zn(p));
      if (p === 35)
        do p = e.input.charCodeAt(++e.position);
        while (!en(p) && p !== 0);
    }
    for (; p !== 0; ) {
      for (
        lc(e), e.lineIndent = 0, p = e.input.charCodeAt(e.position);
        (!s || e.lineIndent < a) && p === 32;
      )
        (e.lineIndent++, (p = e.input.charCodeAt(++e.position)));
      if ((!s && e.lineIndent > a && (a = e.lineIndent), en(p))) {
        u++;
        continue;
      }
      if (e.lineIndent < a) {
        i === Dg
          ? (e.result += un.repeat(
              `
`,
              o ? 1 + u : u
            ))
          : i === cc &&
            o &&
            (e.result += `
`);
        break;
      }
      for (
        r
          ? Zn(p)
            ? ((c = !0),
              (e.result += un.repeat(
                `
`,
                o ? 1 + u : u
              )))
            : c
              ? ((c = !1),
                (e.result += un.repeat(
                  `
`,
                  u + 1
                )))
              : u === 0
                ? o && (e.result += ' ')
                : (e.result += un.repeat(
                    `
`,
                    u
                  ))
          : (e.result += un.repeat(
              `
`,
              o ? 1 + u : u
            )),
          o = !0,
          s = !0,
          u = 0,
          n = e.position;
        !en(p) && p !== 0;
      )
        p = e.input.charCodeAt(++e.position);
      Dn(e, n, e.position, !1);
    }
    return !0;
  }
  function qg(e, t) {
    var n,
      r = e.tag,
      i = e.anchor,
      o = [],
      s,
      a = !1,
      u;
    for (
      e.anchor !== null && (e.anchorMap[e.anchor] = o), u = e.input.charCodeAt(e.position);
      u !== 0 && !(u !== 45 || ((s = e.input.charCodeAt(e.position + 1)), !kt(s)));
    ) {
      if (((a = !0), e.position++, He(e, !0, -1) && e.lineIndent <= t)) {
        (o.push(null), (u = e.input.charCodeAt(e.position)));
        continue;
      }
      if (
        ((n = e.line),
        Mr(e, t, Ng, !1, !0),
        o.push(e.result),
        He(e, !0, -1),
        (u = e.input.charCodeAt(e.position)),
        (e.line === n || e.lineIndent > t) && u !== 0)
      )
        J(e, 'bad indentation of a sequence entry');
      else if (e.lineIndent < t) break;
    }
    return a ? ((e.tag = r), (e.anchor = i), (e.kind = 'sequence'), (e.result = o), !0) : !1;
  }
  function SS(e, t, n) {
    var r,
      i,
      o,
      s,
      a = e.tag,
      u = e.anchor,
      c = {},
      l = {},
      p = null,
      m = null,
      h = null,
      R = !1,
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
        (L === 63 || L === 58) && kt(r))
      )
        (L === 63
          ? (R && (Lr(e, c, l, p, m, null), (p = m = h = null)), (I = !0), (R = !0), (i = !0))
          : R
            ? ((R = !1), (i = !0))
            : J(
                e,
                'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line'
              ),
          (e.position += 1),
          (L = r));
      else if (Mr(e, n, Fg, !1, !0))
        if (e.line === o) {
          for (L = e.input.charCodeAt(e.position); Zn(L); ) L = e.input.charCodeAt(++e.position);
          if (L === 58)
            ((L = e.input.charCodeAt(++e.position)),
              kt(L) ||
                J(
                  e,
                  'a whitespace character is expected after the key-value separator within a block mapping'
                ),
              R && (Lr(e, c, l, p, m, null), (p = m = h = null)),
              (I = !0),
              (R = !1),
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
          (Mr(e, t, ms, !0, i) && (R ? (m = e.result) : (h = e.result)),
          R || (Lr(e, c, l, p, m, h, o, s), (p = m = h = null)),
          He(e, !0, -1),
          (L = e.input.charCodeAt(e.position))),
        e.lineIndent > t && L !== 0)
      )
        J(e, 'bad indentation of a mapping entry');
      else if (e.lineIndent < t) break;
    }
    return (
      R && Lr(e, c, l, p, m, null),
      I && ((e.tag = a), (e.anchor = u), (e.kind = 'mapping'), (e.result = c)),
      I
    );
  }
  function TS(e) {
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
      for (; s !== 0 && !kt(s); )
        (s === 33 &&
          (r
            ? J(e, 'tag suffix cannot contain exclamation marks')
            : ((i = e.input.slice(t - 1, e.position + 1)),
              Lg.test(i) || J(e, 'named tag handle cannot contain such characters'),
              (r = !0),
              (t = e.position + 1))),
          (s = e.input.charCodeAt(++e.position)));
      ((o = e.input.slice(t, e.position)),
        pS.test(o) && J(e, 'tag suffix cannot contain flow indicator characters'));
    }
    return (
      o && !Mg.test(o) && J(e, 'tag name cannot contain such characters: ' + o),
      n
        ? (e.tag = o)
        : En.call(e.tagMap, i)
          ? (e.tag = e.tagMap[i] + o)
          : i === '!'
            ? (e.tag = '!' + o)
            : i === '!!'
              ? (e.tag = 'tag:yaml.org,2002:' + o)
              : J(e, 'undeclared tag handle "' + i + '"'),
      !0
    );
  }
  function CS(e) {
    var t, n;
    if (((n = e.input.charCodeAt(e.position)), n !== 38)) return !1;
    for (
      e.anchor !== null && J(e, 'duplication of an anchor property'),
        n = e.input.charCodeAt(++e.position),
        t = e.position;
      n !== 0 && !kt(n) && !Nr(n);
    )
      n = e.input.charCodeAt(++e.position);
    return (
      e.position === t && J(e, 'name of an anchor node must contain at least one character'),
      (e.anchor = e.input.slice(t, e.position)),
      !0
    );
  }
  function DS(e) {
    var t, n, r;
    if (((r = e.input.charCodeAt(e.position)), r !== 42)) return !1;
    for (r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !kt(r) && !Nr(r); )
      r = e.input.charCodeAt(++e.position);
    return (
      e.position === t && J(e, 'name of an alias node must contain at least one character'),
      (n = e.input.slice(t, e.position)),
      En.call(e.anchorMap, n) || J(e, 'unidentified alias "' + n + '"'),
      (e.result = e.anchorMap[n]),
      He(e, !0, -1),
      !0
    );
  }
  function Mr(e, t, n, r, i) {
    var o,
      s,
      a,
      u = 1,
      c = !1,
      l = !1,
      p,
      m,
      h,
      R,
      I;
    if (
      (e.listener !== null && e.listener('open', e),
      (e.tag = null),
      (e.anchor = null),
      (e.kind = null),
      (e.result = null),
      (o = s = a = ms === n || Ng === n),
      r &&
        He(e, !0, -1) &&
        ((c = !0),
        e.lineIndent > t ? (u = 1) : e.lineIndent === t ? (u = 0) : e.lineIndent < t && (u = -1)),
      u === 1)
    )
      for (; TS(e) || CS(e); )
        He(e, !0, -1)
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
      (u === 1 || ms === n) &&
        (hs === n || Fg === n ? (R = t) : (R = t + 1),
        (I = e.position - e.lineStart),
        u === 1
          ? (a && (qg(e, I) || SS(e, I, R))) || kS(e, R)
            ? (l = !0)
            : ((s && _S(e, R)) || xS(e, R) || wS(e, R)
                ? (l = !0)
                : DS(e)
                  ? ((l = !0),
                    (e.tag !== null || e.anchor !== null) &&
                      J(e, 'alias node should not have any properties'))
                  : vS(e, R, hs === n) && ((l = !0), e.tag === null && (e.tag = '?')),
              e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
          : u === 0 && (l = a && qg(e, I))),
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
        En.call(e.typeMap[e.kind || 'fallback'], e.tag)
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
      e.tag !== null || e.anchor !== null || l
    );
  }
  function ES(e) {
    var t = e.position,
      n,
      r,
      i,
      o = !1,
      s;
    for (
      e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = {}, e.anchorMap = {};
      (s = e.input.charCodeAt(e.position)) !== 0 &&
      (He(e, !0, -1), (s = e.input.charCodeAt(e.position)), !(e.lineIndent > 0 || s !== 37));
    ) {
      for (o = !0, s = e.input.charCodeAt(++e.position), n = e.position; s !== 0 && !kt(s); )
        s = e.input.charCodeAt(++e.position);
      for (
        r = e.input.slice(n, e.position),
          i = [],
          r.length < 1 && J(e, 'directive name must not be less than one character in length');
        s !== 0;
      ) {
        for (; Zn(s); ) s = e.input.charCodeAt(++e.position);
        if (s === 35) {
          do s = e.input.charCodeAt(++e.position);
          while (s !== 0 && !en(s));
          break;
        }
        if (en(s)) break;
        for (n = e.position; s !== 0 && !kt(s); ) s = e.input.charCodeAt(++e.position);
        i.push(e.input.slice(n, e.position));
      }
      (s !== 0 && lc(e),
        En.call(Ag, r) ? Ag[r](e, r, i) : gs(e, 'unknown document directive "' + r + '"'));
    }
    if (
      (He(e, !0, -1),
      e.lineIndent === 0 &&
      e.input.charCodeAt(e.position) === 45 &&
      e.input.charCodeAt(e.position + 1) === 45 &&
      e.input.charCodeAt(e.position + 2) === 45
        ? ((e.position += 3), He(e, !0, -1))
        : o && J(e, 'directives end mark is expected'),
      Mr(e, e.lineIndent - 1, ms, !1, !0),
      He(e, !0, -1),
      e.checkLineBreaks &&
        dS.test(e.input.slice(t, e.position)) &&
        gs(e, 'non-ASCII line breaks are interpreted as content'),
      e.documents.push(e.result),
      e.position === e.lineStart && ys(e))
    ) {
      e.input.charCodeAt(e.position) === 46 && ((e.position += 3), He(e, !0, -1));
      return;
    }
    if (e.position < e.length - 1) J(e, 'end of the stream or a document separator is expected');
    else return;
  }
  function Ug(e, t) {
    ((e = String(e)),
      (t = t || {}),
      e.length !== 0 &&
        (e.charCodeAt(e.length - 1) !== 10 &&
          e.charCodeAt(e.length - 1) !== 13 &&
          (e += `
`),
        e.charCodeAt(0) === 65279 && (e = e.slice(1))));
    var n = new bS(e, t),
      r = e.indexOf('\0');
    for (
      r !== -1 && ((n.position = r), J(n, 'null byte is not allowed in input')), n.input += '\0';
      n.input.charCodeAt(n.position) === 32;
    )
      ((n.lineIndent += 1), (n.position += 1));
    for (; n.position < n.length - 1; ) ES(n);
    return n.documents;
  }
  function Wg(e, t, n) {
    t !== null && typeof t == 'object' && typeof n > 'u' && ((n = t), (t = null));
    var r = Ug(e, n);
    if (typeof t != 'function') return r;
    for (var i = 0, o = r.length; i < o; i += 1) t(r[i]);
  }
  function $g(e, t) {
    var n = Ug(e, t);
    if (n.length !== 0) {
      if (n.length === 1) return n[0];
      throw new Og('expected a single document in the stream, but found more');
    }
  }
  function RS(e, t, n) {
    return (
      typeof t == 'object' && t !== null && typeof n > 'u' && ((n = t), (t = null)),
      Wg(e, t, un.extend({ schema: Ig }, n))
    );
  }
  function AS(e, t) {
    return $g(e, un.extend({ schema: Ig }, t));
  }
  bi.exports.loadAll = Wg;
  bi.exports.load = $g;
  bi.exports.safeLoadAll = RS;
  bi.exports.safeLoad = AS;
});
var my = O((iq, mc) => {
  'use strict';
  var xi = Gn(),
    wi = Or(),
    PS = yi(),
    qS = Fr(),
    ey = Object.prototype.toString,
    ty = Object.prototype.hasOwnProperty,
    OS = 9,
    vi = 10,
    IS = 13,
    FS = 32,
    NS = 33,
    LS = 34,
    ny = 35,
    MS = 37,
    jS = 38,
    BS = 39,
    HS = 42,
    ry = 44,
    zS = 45,
    iy = 58,
    US = 61,
    WS = 62,
    $S = 63,
    VS = 64,
    oy = 91,
    sy = 93,
    YS = 96,
    ay = 123,
    GS = 124,
    uy = 125,
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
  var KS = [
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
  function QS(e, t) {
    var n, r, i, o, s, a, u;
    if (t === null) return {};
    for (n = {}, r = Object.keys(t), i = 0, o = r.length; i < o; i += 1)
      ((s = r[i]),
        (a = String(t[s])),
        s.slice(0, 2) === '!!' && (s = 'tag:yaml.org,2002:' + s.slice(2)),
        (u = e.compiledTypeMap.fallback[s]),
        u && ty.call(u.styleAliases, a) && (a = u.styleAliases[a]),
        (n[s] = a));
    return n;
  }
  function Yg(e) {
    var t, n, r;
    if (((t = e.toString(16).toUpperCase()), e <= 255)) ((n = 'x'), (r = 2));
    else if (e <= 65535) ((n = 'u'), (r = 4));
    else if (e <= 4294967295) ((n = 'U'), (r = 8));
    else throw new wi('code point within a string may not be greater than 0xFFFFFFFF');
    return '\\' + n + xi.repeat('0', r - t.length) + t;
  }
  function JS(e) {
    ((this.schema = e.schema || PS),
      (this.indent = Math.max(1, e.indent || 2)),
      (this.noArrayIndent = e.noArrayIndent || !1),
      (this.skipInvalid = e.skipInvalid || !1),
      (this.flowLevel = xi.isNothing(e.flowLevel) ? -1 : e.flowLevel),
      (this.styleMap = QS(this.schema, e.styles || null)),
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
  function Gg(e, t) {
    for (var n = xi.repeat(' ', t), r = 0, i = -1, o = '', s, a = e.length; r < a; )
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
  function dc(e, t) {
    return (
      `
` + xi.repeat(' ', e.indent * t)
    );
  }
  function ZS(e, t) {
    var n, r, i;
    for (n = 0, r = e.implicitTypes.length; n < r; n += 1)
      if (((i = e.implicitTypes[n]), i.resolve(t))) return !0;
    return !1;
  }
  function hc(e) {
    return e === FS || e === OS;
  }
  function jr(e) {
    return (
      (32 <= e && e <= 126) ||
      (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
      (57344 <= e && e <= 65533 && e !== 65279) ||
      (65536 <= e && e <= 1114111)
    );
  }
  function XS(e) {
    return jr(e) && !hc(e) && e !== 65279 && e !== IS && e !== vi;
  }
  function Kg(e, t) {
    return (
      jr(e) &&
      e !== 65279 &&
      e !== ry &&
      e !== oy &&
      e !== sy &&
      e !== ay &&
      e !== uy &&
      e !== iy &&
      (e !== ny || (t && XS(t)))
    );
  }
  function eT(e) {
    return (
      jr(e) &&
      e !== 65279 &&
      !hc(e) &&
      e !== zS &&
      e !== $S &&
      e !== iy &&
      e !== ry &&
      e !== oy &&
      e !== sy &&
      e !== ay &&
      e !== uy &&
      e !== ny &&
      e !== jS &&
      e !== HS &&
      e !== NS &&
      e !== GS &&
      e !== US &&
      e !== WS &&
      e !== BS &&
      e !== LS &&
      e !== MS &&
      e !== VS &&
      e !== YS
    );
  }
  function cy(e) {
    var t = /^\n* /;
    return t.test(e);
  }
  var ly = 1,
    fy = 2,
    dy = 3,
    py = 4,
    bs = 5;
  function tT(e, t, n, r, i) {
    var o,
      s,
      a,
      u = !1,
      c = !1,
      l = r !== -1,
      p = -1,
      m = eT(e.charCodeAt(0)) && !hc(e.charCodeAt(e.length - 1));
    if (t)
      for (o = 0; o < e.length; o++) {
        if (((s = e.charCodeAt(o)), !jr(s))) return bs;
        ((a = o > 0 ? e.charCodeAt(o - 1) : null), (m = m && Kg(s, a)));
      }
    else {
      for (o = 0; o < e.length; o++) {
        if (((s = e.charCodeAt(o)), s === vi))
          ((u = !0), l && ((c = c || (o - p - 1 > r && e[p + 1] !== ' ')), (p = o)));
        else if (!jr(s)) return bs;
        ((a = o > 0 ? e.charCodeAt(o - 1) : null), (m = m && Kg(s, a)));
      }
      c = c || (l && o - p - 1 > r && e[p + 1] !== ' ');
    }
    return !u && !c ? (m && !i(e) ? ly : fy) : n > 9 && cy(e) ? bs : c ? py : dy;
  }
  function nT(e, t, n, r) {
    e.dump = (function () {
      if (t.length === 0) return "''";
      if (!e.noCompatMode && KS.indexOf(t) !== -1) return "'" + t + "'";
      var i = e.indent * Math.max(1, n),
        o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - i),
        s = r || (e.flowLevel > -1 && n >= e.flowLevel);
      function a(u) {
        return ZS(e, u);
      }
      switch (tT(t, s, e.indent, o, a)) {
        case ly:
          return t;
        case fy:
          return "'" + t.replace(/'/g, "''") + "'";
        case dy:
          return '|' + Qg(t, e.indent) + Jg(Gg(t, i));
        case py:
          return '>' + Qg(t, e.indent) + Jg(Gg(rT(t, o), i));
        case bs:
          return '"' + iT(t, o) + '"';
        default:
          throw new wi('impossible error: invalid scalar style');
      }
    })();
  }
  function Qg(e, t) {
    var n = cy(e) ? String(t) : '',
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
  function Jg(e) {
    return e[e.length - 1] ===
      `
`
      ? e.slice(0, -1)
      : e;
  }
  function rT(e, t) {
    for (
      var n = /(\n+)([^\n]*)/g,
        r = (function () {
          var c = e.indexOf(`
`);
          return ((c = c !== -1 ? c : e.length), (n.lastIndex = c), Zg(e.slice(0, c), t));
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
          Zg(u, t)),
        (i = o));
    }
    return r;
  }
  function Zg(e, t) {
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
  function iT(e) {
    for (var t = '', n, r, i, o = 0; o < e.length; o++) {
      if (
        ((n = e.charCodeAt(o)),
        n >= 55296 && n <= 56319 && ((r = e.charCodeAt(o + 1)), r >= 56320 && r <= 57343))
      ) {
        ((t += Yg((n - 55296) * 1024 + r - 56320 + 65536)), o++);
        continue;
      }
      ((i = at[n]), (t += !i && jr(n) ? e[o] : i || Yg(n)));
    }
    return t;
  }
  function oT(e, t, n) {
    var r = '',
      i = e.tag,
      o,
      s;
    for (o = 0, s = n.length; o < s; o += 1)
      Xn(e, t, n[o], !1, !1) &&
        (o !== 0 && (r += ',' + (e.condenseFlow ? '' : ' ')), (r += e.dump));
    ((e.tag = i), (e.dump = '[' + r + ']'));
  }
  function sT(e, t, n, r) {
    var i = '',
      o = e.tag,
      s,
      a;
    for (s = 0, a = n.length; s < a; s += 1)
      Xn(e, t + 1, n[s], !0, !0) &&
        ((!r || s !== 0) && (i += dc(e, t)),
        e.dump && vi === e.dump.charCodeAt(0) ? (i += '-') : (i += '- '),
        (i += e.dump));
    ((e.tag = o), (e.dump = i || '[]'));
  }
  function aT(e, t, n) {
    var r = '',
      i = e.tag,
      o = Object.keys(n),
      s,
      a,
      u,
      c,
      l;
    for (s = 0, a = o.length; s < a; s += 1)
      ((l = ''),
        s !== 0 && (l += ', '),
        e.condenseFlow && (l += '"'),
        (u = o[s]),
        (c = n[u]),
        Xn(e, t, u, !1, !1) &&
          (e.dump.length > 1024 && (l += '? '),
          (l += e.dump + (e.condenseFlow ? '"' : '') + ':' + (e.condenseFlow ? '' : ' ')),
          Xn(e, t, c, !1, !1) && ((l += e.dump), (r += l))));
    ((e.tag = i), (e.dump = '{' + r + '}'));
  }
  function uT(e, t, n, r) {
    var i = '',
      o = e.tag,
      s = Object.keys(n),
      a,
      u,
      c,
      l,
      p,
      m;
    if (e.sortKeys === !0) s.sort();
    else if (typeof e.sortKeys == 'function') s.sort(e.sortKeys);
    else if (e.sortKeys) throw new wi('sortKeys must be a boolean or a function');
    for (a = 0, u = s.length; a < u; a += 1)
      ((m = ''),
        (!r || a !== 0) && (m += dc(e, t)),
        (c = s[a]),
        (l = n[c]),
        Xn(e, t + 1, c, !0, !0, !0) &&
          ((p = (e.tag !== null && e.tag !== '?') || (e.dump && e.dump.length > 1024)),
          p && (e.dump && vi === e.dump.charCodeAt(0) ? (m += '?') : (m += '? ')),
          (m += e.dump),
          p && (m += dc(e, t)),
          Xn(e, t + 1, l, !0, p) &&
            (e.dump && vi === e.dump.charCodeAt(0) ? (m += ':') : (m += ': '),
            (m += e.dump),
            (i += m))));
    ((e.tag = o), (e.dump = i || '{}'));
  }
  function Xg(e, t, n) {
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
            ey.call(a.represent) === '[object Function]')
          )
            r = a.represent(t, u);
          else if (ty.call(a.represent, u)) r = a.represent[u](t, u);
          else throw new wi('!<' + a.tag + '> tag resolver accepts not "' + u + '" style');
          e.dump = r;
        }
        return !0;
      }
    return !1;
  }
  function Xn(e, t, n, r, i, o) {
    ((e.tag = null), (e.dump = n), Xg(e, n, !1) || Xg(e, n, !0));
    var s = ey.call(e.dump);
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
          ? (uT(e, t, e.dump, i), c && (e.dump = '&ref_' + u + e.dump))
          : (aT(e, t, e.dump), c && (e.dump = '&ref_' + u + ' ' + e.dump));
      else if (s === '[object Array]') {
        var l = e.noArrayIndent && t > 0 ? t - 1 : t;
        r && e.dump.length !== 0
          ? (sT(e, l, e.dump, i), c && (e.dump = '&ref_' + u + e.dump))
          : (oT(e, l, e.dump), c && (e.dump = '&ref_' + u + ' ' + e.dump));
      } else if (s === '[object String]') e.tag !== '?' && nT(e, e.dump, t, o);
      else {
        if (e.skipInvalid) return !1;
        throw new wi('unacceptable kind of an object to dump ' + s);
      }
      e.tag !== null && e.tag !== '?' && (e.dump = '!<' + e.tag + '> ' + e.dump);
    }
    return !0;
  }
  function cT(e, t) {
    var n = [],
      r = [],
      i,
      o;
    for (pc(e, n, r), i = 0, o = r.length; i < o; i += 1) t.duplicates.push(n[r[i]]);
    t.usedDuplicates = new Array(o);
  }
  function pc(e, t, n) {
    var r, i, o;
    if (e !== null && typeof e == 'object')
      if (((i = t.indexOf(e)), i !== -1)) n.indexOf(i) === -1 && n.push(i);
      else if ((t.push(e), Array.isArray(e)))
        for (i = 0, o = e.length; i < o; i += 1) pc(e[i], t, n);
      else for (r = Object.keys(e), i = 0, o = r.length; i < o; i += 1) pc(e[r[i]], t, n);
  }
  function hy(e, t) {
    t = t || {};
    var n = new JS(t);
    return (
      n.noRefs || cT(e, n),
      Xn(n, 0, e, !0, !0)
        ? n.dump +
          `
`
        : ''
    );
  }
  function lT(e, t) {
    return hy(e, xi.extend({ schema: qS }, t));
  }
  mc.exports.dump = hy;
  mc.exports.safeDump = lT;
});
var yy = O((oq, Fe) => {
  'use strict';
  var vs = Vg(),
    gy = my();
  function xs(e) {
    return function () {
      throw new Error('Function ' + e + ' is deprecated and cannot be used.');
    };
  }
  Fe.exports.Type = $e();
  Fe.exports.Schema = Kn();
  Fe.exports.FAILSAFE_SCHEMA = ds();
  Fe.exports.JSON_SCHEMA = sc();
  Fe.exports.CORE_SCHEMA = ac();
  Fe.exports.DEFAULT_SAFE_SCHEMA = Fr();
  Fe.exports.DEFAULT_FULL_SCHEMA = yi();
  Fe.exports.load = vs.load;
  Fe.exports.loadAll = vs.loadAll;
  Fe.exports.safeLoad = vs.safeLoad;
  Fe.exports.safeLoadAll = vs.safeLoadAll;
  Fe.exports.dump = gy.dump;
  Fe.exports.safeDump = gy.safeDump;
  Fe.exports.YAMLException = Or();
  Fe.exports.MINIMAL_SCHEMA = ds();
  Fe.exports.SAFE_SCHEMA = Fr();
  Fe.exports.DEFAULT_SCHEMA = yi();
  Fe.exports.scan = xs('scan');
  Fe.exports.parse = xs('parse');
  Fe.exports.compose = xs('compose');
  Fe.exports.addConstructor = xs('addConstructor');
});
var vy = O((sq, by) => {
  'use strict';
  var fT = yy();
  by.exports = fT;
});
var gc = O((exports, module) => {
  'use strict';
  var yaml = vy(),
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
var wy = O((aq, xy) => {
  'use strict';
  xy.exports = function (e) {
    return typeof e == 'string' && e.charAt(0) === '\uFEFF' ? e.slice(1) : e;
  };
});
var ws = O((cn) => {
  'use strict';
  var ky = wy(),
    _y = mi();
  cn.define = function (e, t, n) {
    Reflect.defineProperty(e, t, { enumerable: !1, configurable: !0, writable: !0, value: n });
  };
  cn.isBuffer = function (e) {
    return _y(e) === 'buffer';
  };
  cn.isObject = function (e) {
    return _y(e) === 'object';
  };
  cn.toBuffer = function (e) {
    return typeof e == 'string' ? Buffer.from(e) : e;
  };
  cn.toString = function (e) {
    if (cn.isBuffer(e)) return ky(String(e));
    if (typeof e != 'string') throw new TypeError('expected input to be a string or buffer');
    return ky(e);
  };
  cn.arrayify = function (e) {
    return e ? (Array.isArray(e) ? e : [e]) : [];
  };
  cn.startsWith = function (e, t, n) {
    return (typeof n != 'number' && (n = t.length), e.slice(0, n) === t);
  };
});
var ki = O((cq, Sy) => {
  'use strict';
  var dT = gc(),
    pT = ws();
  Sy.exports = function (e) {
    let t = Object.assign({}, e);
    return (
      (t.delimiters = pT.arrayify(t.delims || t.delimiters || '---')),
      t.delimiters.length === 1 && t.delimiters.push(t.delimiters[0]),
      (t.language = (t.language || t.lang || 'yaml').toLowerCase()),
      (t.engines = Object.assign({}, dT, t.parsers, t.engines)),
      t
    );
  };
});
var yc = O((lq, Ty) => {
  'use strict';
  Ty.exports = function (e, t) {
    let n = t.engines[e] || t.engines[hT(e)];
    if (typeof n > 'u') throw new Error('gray-matter engine "' + e + '" is not registered');
    return (typeof n == 'function' && (n = { parse: n }), n);
  };
  function hT(e) {
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
var bc = O((fq, Cy) => {
  'use strict';
  var mT = mi(),
    gT = yc(),
    yT = ki();
  Cy.exports = function (e, t, n) {
    if (t == null && n == null)
      switch (mT(e)) {
        case 'object':
          ((t = e.data), (n = {}));
          break;
        case 'string':
          return e;
        default:
          throw new TypeError('expected file to be a string or object');
      }
    let r = e.content,
      i = yT(n);
    if (t == null) {
      if (!i.data) return e;
      t = i.data;
    }
    let o = e.language || i.language,
      s = gT(o, i);
    if (typeof s.stringify != 'function')
      throw new TypeError('expected "' + o + '.stringify" to be a function');
    t = Object.assign({}, e.data, t);
    let a = i.delimiters[0],
      u = i.delimiters[1],
      c = s.stringify(t, n).trim(),
      l = '';
    return (
      c !== '{}' && (l = Br(a) + Br(c) + Br(u)),
      typeof e.excerpt == 'string' &&
        e.excerpt !== '' &&
        r.indexOf(e.excerpt.trim()) === -1 &&
        (l += Br(e.excerpt) + Br(u)),
      l + Br(r)
    );
  };
  function Br(e) {
    return e.slice(-1) !==
      `
`
      ? e +
          `
`
      : e;
  }
});
var Ey = O((dq, Dy) => {
  'use strict';
  var bT = ki();
  Dy.exports = function (e, t) {
    let n = bT(t);
    if ((e.data == null && (e.data = {}), typeof n.excerpt == 'function')) return n.excerpt(e, n);
    let r = e.data.excerpt_separator || n.excerpt_separator;
    if (r == null && (n.excerpt === !1 || n.excerpt == null)) return e;
    let i = typeof n.excerpt == 'string' ? n.excerpt : r || n.delimiters[0],
      o = e.content.indexOf(i);
    return (o !== -1 && (e.excerpt = e.content.slice(0, o)), e);
  };
});
var Py = O((pq, Ay) => {
  'use strict';
  var Ry = mi(),
    vT = bc(),
    Hr = ws();
  Ay.exports = function (e) {
    return (
      Ry(e) !== 'object' && (e = { content: e }),
      Ry(e.data) !== 'object' && (e.data = {}),
      e.contents && e.content == null && (e.content = e.contents),
      Hr.define(e, 'orig', Hr.toBuffer(e.content)),
      Hr.define(e, 'language', e.language || ''),
      Hr.define(e, 'matter', e.matter || ''),
      Hr.define(e, 'stringify', function (t, n) {
        return (n && n.language && (e.language = n.language), vT(e, t, n));
      }),
      (e.content = Hr.toString(e.content)),
      (e.isEmpty = !1),
      (e.excerpt = ''),
      e
    );
  };
});
var Oy = O((hq, qy) => {
  'use strict';
  var xT = yc(),
    wT = ki();
  qy.exports = function (e, t, n) {
    let r = wT(n),
      i = xT(e, r);
    if (typeof i.parse != 'function')
      throw new TypeError('expected "' + e + '.parse" to be a function');
    return i.parse(t, r);
  };
});
var xc = O((mq, Ny) => {
  'use strict';
  var kT = require('fs'),
    _T = Em(),
    vc = ki(),
    ST = bc(),
    Iy = Ey(),
    TT = gc(),
    CT = Py(),
    DT = Oy(),
    Fy = ws();
  function ft(e, t) {
    if (e === '') return { data: {}, content: e, excerpt: '', orig: e };
    let n = CT(e),
      r = ft.cache[n.content];
    if (!t) {
      if (r) return ((n = Object.assign({}, r)), (n.orig = r.orig), n);
      ft.cache[n.content] = n;
    }
    return ET(n, t);
  }
  function ET(e, t) {
    let n = vc(t),
      r = n.delimiters[0],
      i =
        `
` + n.delimiters[1],
      o = e.content;
    n.language && (e.language = n.language);
    let s = r.length;
    if (!Fy.startsWith(o, r, s)) return (Iy(e, n), e);
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
        : (e.data = DT(e.language, e.matter, n)),
      c === a
        ? (e.content = '')
        : ((e.content = o.slice(c + i.length)),
          e.content[0] === '\r' && (e.content = e.content.slice(1)),
          e.content[0] ===
            `
` && (e.content = e.content.slice(1))),
      Iy(e, n),
      (n.sections === !0 || typeof n.section == 'function') && _T(e, n.section),
      e
    );
  }
  ft.engines = TT;
  ft.stringify = function (e, t, n) {
    return (typeof e == 'string' && (e = ft(e, n)), ST(e, t, n));
  };
  ft.read = function (e, t) {
    let n = kT.readFileSync(e, 'utf8'),
      r = ft(n, t);
    return ((r.path = e), r);
  };
  ft.test = function (e, t) {
    return Fy.startsWith(e, vc(t).delimiters[0]);
  };
  ft.language = function (e, t) {
    let r = vc(t).delimiters[0];
    ft.test(e) && (e = e.slice(r.length));
    let i = e.slice(0, e.search(/\r?\n/));
    return { raw: i, name: i ? i.trim() : '' };
  };
  ft.cache = {};
  ft.clearCache = function () {
    ft.cache = {};
  };
  Ny.exports = ft;
});
function wc(e) {
  if (e) throw e;
}
var Ly = z(() => {});
var Vy = O((yq, $y) => {
  'use strict';
  var ks = Object.prototype.hasOwnProperty,
    Wy = Object.prototype.toString,
    My = Object.defineProperty,
    jy = Object.getOwnPropertyDescriptor,
    By = function (t) {
      return typeof Array.isArray == 'function'
        ? Array.isArray(t)
        : Wy.call(t) === '[object Array]';
    },
    Hy = function (t) {
      if (!t || Wy.call(t) !== '[object Object]') return !1;
      var n = ks.call(t, 'constructor'),
        r =
          t.constructor &&
          t.constructor.prototype &&
          ks.call(t.constructor.prototype, 'isPrototypeOf');
      if (t.constructor && !n && !r) return !1;
      var i;
      for (i in t);
      return typeof i > 'u' || ks.call(t, i);
    },
    zy = function (t, n) {
      My && n.name === '__proto__'
        ? My(t, n.name, { enumerable: !0, configurable: !0, value: n.newValue, writable: !0 })
        : (t[n.name] = n.newValue);
    },
    Uy = function (t, n) {
      if (n === '__proto__')
        if (ks.call(t, n)) {
          if (jy) return jy(t, n).value;
        } else return;
      return t[n];
    };
  $y.exports = function e() {
    var t,
      n,
      r,
      i,
      o,
      s,
      a = arguments[0],
      u = 1,
      c = arguments.length,
      l = !1;
    for (
      typeof a == 'boolean' && ((l = a), (a = arguments[1] || {}), (u = 2)),
        (a == null || (typeof a != 'object' && typeof a != 'function')) && (a = {});
      u < c;
      ++u
    )
      if (((t = arguments[u]), t != null))
        for (n in t)
          ((r = Uy(a, n)),
            (i = Uy(t, n)),
            a !== i &&
              (l && i && (Hy(i) || (o = By(i)))
                ? (o ? ((o = !1), (s = r && By(r) ? r : [])) : (s = r && Hy(r) ? r : {}),
                  zy(a, { name: n, newValue: e(l, s, i) }))
                : typeof i < 'u' && zy(a, { name: n, newValue: i })));
    return a;
  };
});
function _i(e) {
  if (typeof e != 'object' || e === null) return !1;
  let t = Object.getPrototypeOf(e);
  return (
    (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) &&
    !(Symbol.toStringTag in e) &&
    !(Symbol.iterator in e)
  );
}
var Yy = z(() => {});
function kc() {
  let e = [],
    t = { run: n, use: r };
  return t;
  function n(...i) {
    let o = -1,
      s = i.pop();
    if (typeof s != 'function') throw new TypeError('Expected function as last argument, not ' + s);
    a(null, ...i);
    function a(u, ...c) {
      let l = e[++o],
        p = -1;
      if (u) {
        s(u);
        return;
      }
      for (; ++p < i.length; ) (c[p] === null || c[p] === void 0) && (c[p] = i[p]);
      ((i = c), l ? Gy(l, a)(...c) : s(null, ...c));
    }
  }
  function r(i) {
    if (typeof i != 'function')
      throw new TypeError('Expected `middelware` to be a function, not ' + i);
    return (e.push(i), t);
  }
}
function Gy(e, t) {
  let n;
  return r;
  function r(...s) {
    let a = e.length > s.length,
      u;
    a && s.push(i);
    try {
      u = e.apply(this, s);
    } catch (c) {
      let l = c;
      if (a && n) throw l;
      return i(l);
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
var Ky = z(() => {});
var Qy = z(() => {
  Ky();
});
function Rn(e) {
  return !e || typeof e != 'object'
    ? ''
    : 'position' in e || 'type' in e
      ? Jy(e.position)
      : 'start' in e || 'end' in e
        ? Jy(e)
        : 'line' in e || 'column' in e
          ? _c(e)
          : '';
}
function _c(e) {
  return Zy(e && e.line) + ':' + Zy(e && e.column);
}
function Jy(e) {
  return _c(e && e.start) + '-' + _c(e && e.end);
}
function Zy(e) {
  return e && typeof e == 'number' ? e : 1;
}
var Xy = z(() => {});
var Sc = z(() => {
  Xy();
});
var Je,
  eb = z(() => {
    Sc();
    Je = class extends Error {
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
          (this.name = Rn(o.place) || '1:1'),
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
    Je.prototype.file = '';
    Je.prototype.name = '';
    Je.prototype.reason = '';
    Je.prototype.message = '';
    Je.prototype.stack = '';
    Je.prototype.column = void 0;
    Je.prototype.line = void 0;
    Je.prototype.ancestors = void 0;
    Je.prototype.cause = void 0;
    Je.prototype.fatal = void 0;
    Je.prototype.place = void 0;
    Je.prototype.ruleId = void 0;
    Je.prototype.source = void 0;
  });
var tb = z(() => {
  eb();
});
var jt,
  nb = z(() => {
    jt = hn(require('node:path'), 1);
  });
var Tc,
  rb = z(() => {
    Tc = hn(require('node:process'), 1);
  });
function _s(e) {
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
var ib = z(() => {});
var Cc,
  ob = z(() => {
    Cc = require('node:url');
    ib();
  });
function Ec(e, t) {
  if (e && e.includes(jt.default.sep))
    throw new Error('`' + t + '` cannot be a path: did not expect `' + jt.default.sep + '`');
}
function Rc(e, t) {
  if (!e) throw new Error('`' + t + '` cannot be empty');
}
function sb(e, t) {
  if (!e) throw new Error('Setting `' + t + '` requires `path` to be set too');
}
function RT(e) {
  return !!(e && typeof e == 'object' && 'byteLength' in e && 'byteOffset' in e);
}
var Dc,
  Si,
  ab = z(() => {
    tb();
    nb();
    rb();
    ob();
    ((Dc = ['history', 'path', 'basename', 'stem', 'extname', 'dirname']),
      (Si = class {
        constructor(t) {
          let n;
          (t
            ? _s(t)
              ? (n = { path: t })
              : typeof t == 'string' || RT(t)
                ? (n = { value: t })
                : (n = t)
            : (n = {}),
            (this.cwd = 'cwd' in n ? '' : Tc.default.cwd()),
            (this.data = {}),
            (this.history = []),
            (this.messages = []),
            this.value,
            this.map,
            this.result,
            this.stored);
          let r = -1;
          for (; ++r < Dc.length; ) {
            let o = Dc[r];
            o in n &&
              n[o] !== void 0 &&
              n[o] !== null &&
              (this[o] = o === 'history' ? [...n[o]] : n[o]);
          }
          let i;
          for (i in n) Dc.includes(i) || (this[i] = n[i]);
        }
        get basename() {
          return typeof this.path == 'string' ? jt.default.basename(this.path) : void 0;
        }
        set basename(t) {
          (Rc(t, 'basename'),
            Ec(t, 'basename'),
            (this.path = jt.default.join(this.dirname || '', t)));
        }
        get dirname() {
          return typeof this.path == 'string' ? jt.default.dirname(this.path) : void 0;
        }
        set dirname(t) {
          (sb(this.basename, 'dirname'), (this.path = jt.default.join(t || '', this.basename)));
        }
        get extname() {
          return typeof this.path == 'string' ? jt.default.extname(this.path) : void 0;
        }
        set extname(t) {
          if ((Ec(t, 'extname'), sb(this.dirname, 'extname'), t)) {
            if (t.codePointAt(0) !== 46) throw new Error('`extname` must start with `.`');
            if (t.includes('.', 1)) throw new Error('`extname` cannot contain multiple dots');
          }
          this.path = jt.default.join(this.dirname, this.stem + (t || ''));
        }
        get path() {
          return this.history[this.history.length - 1];
        }
        set path(t) {
          (_s(t) && (t = (0, Cc.fileURLToPath)(t)),
            Rc(t, 'path'),
            this.path !== t && this.history.push(t));
        }
        get stem() {
          return typeof this.path == 'string'
            ? jt.default.basename(this.path, this.extname)
            : void 0;
        }
        set stem(t) {
          (Rc(t, 'stem'),
            Ec(t, 'stem'),
            (this.path = jt.default.join(this.dirname || '', t + (this.extname || ''))));
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
          let i = new Je(t, n, r);
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
var ub = z(() => {
  ab();
});
var cb,
  lb = z(() => {
    cb = function (e) {
      let r = this.constructor.prototype,
        i = r[e],
        o = function () {
          return i.apply(o, arguments);
        };
      return (Object.setPrototypeOf(o, r), o);
    };
  });
function Ac(e, t) {
  if (typeof t != 'function') throw new TypeError('Cannot `' + e + '` without `parser`');
}
function Pc(e, t) {
  if (typeof t != 'function') throw new TypeError('Cannot `' + e + '` without `compiler`');
}
function qc(e, t) {
  if (t)
    throw new Error(
      'Cannot call `' +
        e +
        '` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.'
    );
}
function fb(e) {
  if (!_i(e) || typeof e.type != 'string') throw new TypeError('Expected node, got `' + e + '`');
}
function db(e, t, n) {
  if (!n) throw new Error('`' + e + '` finished async. Use `' + t + '` instead');
}
function Ss(e) {
  return PT(e) ? e : new Si(e);
}
function PT(e) {
  return !!(e && typeof e == 'object' && 'message' in e && 'messages' in e);
}
function qT(e) {
  return typeof e == 'string' || OT(e);
}
function OT(e) {
  return !!(e && typeof e == 'object' && 'byteLength' in e && 'byteOffset' in e);
}
var Ts,
  AT,
  Oc,
  pb,
  hb = z(() => {
    Ly();
    Ts = hn(Vy(), 1);
    Yy();
    Qy();
    ub();
    lb();
    ((AT = {}.hasOwnProperty),
      (Oc = class e extends cb {
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
            (this.transformers = kc()));
        }
        copy() {
          let t = new e(),
            n = -1;
          for (; ++n < this.attachers.length; ) {
            let r = this.attachers[n];
            t.use(...r);
          }
          return (t.data((0, Ts.default)(!0, {}, this.namespace)), t);
        }
        data(t, n) {
          return typeof t == 'string'
            ? arguments.length === 2
              ? (qc('data', this.frozen), (this.namespace[t] = n), this)
              : (AT.call(this.namespace, t) && this.namespace[t]) || void 0
            : t
              ? (qc('data', this.frozen), (this.namespace = t), this)
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
          let n = Ss(t),
            r = this.parser || this.Parser;
          return (Ac('parse', r), r(String(n), n));
        }
        process(t, n) {
          let r = this;
          return (
            this.freeze(),
            Ac('process', this.parser || this.Parser),
            Pc('process', this.compiler || this.Compiler),
            n ? i(void 0, n) : new Promise(i)
          );
          function i(o, s) {
            let a = Ss(t),
              u = r.parse(a);
            r.run(u, a, function (l, p, m) {
              if (l || !p || !m) return c(l);
              let h = p,
                R = r.stringify(h, m);
              (qT(R) ? (m.value = R) : (m.result = R), c(l, m));
            });
            function c(l, p) {
              l || !p ? s(l) : o ? o(p) : n(void 0, p);
            }
          }
        }
        processSync(t) {
          let n = !1,
            r;
          return (
            this.freeze(),
            Ac('processSync', this.parser || this.Parser),
            Pc('processSync', this.compiler || this.Compiler),
            this.process(t, i),
            db('processSync', 'process', n),
            r
          );
          function i(o, s) {
            ((n = !0), wc(o), (r = s));
          }
        }
        run(t, n, r) {
          (fb(t), this.freeze());
          let i = this.transformers;
          return (
            !r && typeof n == 'function' && ((r = n), (n = void 0)),
            r ? o(void 0, r) : new Promise(o)
          );
          function o(s, a) {
            let u = Ss(n);
            i.run(t, u, c);
            function c(l, p, m) {
              let h = p || t;
              l ? a(l) : s ? s(h) : r(void 0, h, m);
            }
          }
        }
        runSync(t, n) {
          let r = !1,
            i;
          return (this.run(t, n, o), db('runSync', 'run', r), i);
          function o(s, a) {
            (wc(s), (i = a), (r = !0));
          }
        }
        stringify(t, n) {
          this.freeze();
          let r = Ss(n),
            i = this.compiler || this.Compiler;
          return (Pc('stringify', i), fb(t), i(t, r));
        }
        use(t, ...n) {
          let r = this.attachers,
            i = this.namespace;
          if ((qc('use', this.frozen), t != null))
            if (typeof t == 'function') u(t, n);
            else if (typeof t == 'object') Array.isArray(t) ? a(t) : s(t);
            else throw new TypeError('Expected usable value, not `' + t + '`');
          return this;
          function o(c) {
            if (typeof c == 'function') u(c, []);
            else if (typeof c == 'object')
              if (Array.isArray(c)) {
                let [l, ...p] = c;
                u(l, p);
              } else s(c);
            else throw new TypeError('Expected usable value, not `' + c + '`');
          }
          function s(c) {
            if (!('plugins' in c) && !('settings' in c))
              throw new Error(
                'Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither'
              );
            (a(c.plugins),
              c.settings && (i.settings = (0, Ts.default)(!0, i.settings, c.settings)));
          }
          function a(c) {
            let l = -1;
            if (c != null)
              if (Array.isArray(c))
                for (; ++l < c.length; ) {
                  let p = c[l];
                  o(p);
                }
              else throw new TypeError('Expected a list of plugins, not `' + c + '`');
          }
          function u(c, l) {
            let p = -1,
              m = -1;
            for (; ++p < r.length; )
              if (r[p][0] === c) {
                m = p;
                break;
              }
            if (m === -1) r.push([c, ...l]);
            else if (l.length > 0) {
              let [h, ...R] = l,
                I = r[m][1];
              (_i(I) && _i(h) && (h = (0, Ts.default)(!0, I, h)), (r[m] = [c, h, ...R]));
            }
          }
        }
      }),
      (pb = new Oc().freeze()));
  });
var mb = {};
$i(mb, { unified: () => pb });
var gb = z(() => {
  hb();
});
function Ic(e, t) {
  let n = t || IT,
    r = typeof n.includeImageAlt == 'boolean' ? n.includeImageAlt : !0,
    i = typeof n.includeHtml == 'boolean' ? n.includeHtml : !0;
  return bb(e, r, i);
}
function bb(e, t, n) {
  if (FT(e)) {
    if ('value' in e) return e.type === 'html' && !n ? '' : e.value;
    if (t && 'alt' in e && e.alt) return e.alt;
    if ('children' in e) return yb(e.children, t, n);
  }
  return Array.isArray(e) ? yb(e, t, n) : '';
}
function yb(e, t, n) {
  let r = [],
    i = -1;
  for (; ++i < e.length; ) r[i] = bb(e[i], t, n);
  return r.join('');
}
function FT(e) {
  return !!(e && typeof e == 'object');
}
var IT,
  vb = z(() => {
    IT = {};
  });
var xb = z(() => {
  vb();
});
var Fc,
  wb = z(() => {
    Fc = {
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
function zr(e) {
  return NT.call(Fc, e) ? Fc[e] : !1;
}
var NT,
  Cs = z(() => {
    wb();
    NT = {}.hasOwnProperty;
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
var An = z(() => {});
function _b(e) {
  let t = {},
    n = -1;
  for (; ++n < e.length; ) LT(t, e[n]);
  return t;
}
function LT(e, t) {
  let n;
  for (n in t) {
    let i = (kb.call(e, n) ? e[n] : void 0) || (e[n] = {}),
      o = t[n],
      s;
    if (o)
      for (s in o) {
        kb.call(i, s) || (i[s] = []);
        let a = o[s];
        MT(i[s], Array.isArray(a) ? a : a ? [a] : []);
      }
  }
}
function MT(e, t) {
  let n = -1,
    r = [];
  for (; ++n < t.length; ) (t[n].add === 'after' ? e : r).push(t[n]);
  nt(e, 0, 0, r);
}
var kb,
  Sb = z(() => {
    An();
    kb = {}.hasOwnProperty;
  });
function Ds(e, t) {
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
var Nc = z(() => {});
function ln(e) {
  return e
    .replace(/[\t\n\r ]+/g, ' ')
    .replace(/^ | $/g, '')
    .toLowerCase()
    .toUpperCase();
}
var Es = z(() => {});
function Ti(e) {
  return e !== null && (e < 32 || e === 127);
}
function $(e) {
  return e !== null && e < -2;
}
function Me(e) {
  return e !== null && (e < 0 || e === 32);
}
function ie(e) {
  return e === -2 || e === -1 || e === 32;
}
function Pn(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
var Rt,
  pt,
  Tb,
  Ci,
  Cb,
  Db,
  Eb,
  Rb,
  _e = z(() => {
    ((Rt = Pn(/[A-Za-z]/)), (pt = Pn(/[\dA-Za-z]/)), (Tb = Pn(/[#-'*+\--9=?A-Z^-~]/)));
    ((Ci = Pn(/\d/)), (Cb = Pn(/[\dA-Fa-f]/)), (Db = Pn(/[!-/:-@[-`{-~]/)));
    ((Eb = Pn(new RegExp('\\p{P}|\\p{S}', 'u'))), (Rb = Pn(/\s/)));
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
var Ze = z(() => {
  _e();
});
function jT(e) {
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
    return $(a) ? (e.consume(a), e.exit('chunkText'), o) : (e.consume(a), s);
  }
}
var Ab,
  Pb = z(() => {
    Ze();
    _e();
    Ab = { tokenize: jT };
  });
function BT(e) {
  let t = this,
    n = [],
    r = 0,
    i,
    o,
    s;
  return a;
  function a(x) {
    if (r < n.length) {
      let F = n[r];
      return ((t.containerState = F[1]), e.attempt(F[0].continuation, u, c)(x));
    }
    return c(x);
  }
  function u(x) {
    if ((r++, t.containerState._closeFlow)) {
      ((t.containerState._closeFlow = void 0), i && S());
      let F = t.events.length,
        j = F,
        E;
      for (; j--; )
        if (t.events[j][0] === 'exit' && t.events[j][1].type === 'chunkFlow') {
          E = t.events[j][1].end;
          break;
        }
      A(r);
      let Z = F;
      for (; Z < t.events.length; ) ((t.events[Z][1].end = { ...E }), Z++);
      return (nt(t.events, j + 1, 0, t.events.slice(F)), (t.events.length = Z), c(x));
    }
    return a(x);
  }
  function c(x) {
    if (r === n.length) {
      if (!i) return m(x);
      if (i.currentConstruct && i.currentConstruct.concrete) return R(x);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return ((t.containerState = {}), e.check(qb, l, p)(x));
  }
  function l(x) {
    return (i && S(), A(r), m(x));
  }
  function p(x) {
    return ((t.parser.lazy[t.now().line] = r !== n.length), (s = t.now().offset), R(x));
  }
  function m(x) {
    return ((t.containerState = {}), e.attempt(qb, h, R)(x));
  }
  function h(x) {
    return (r++, n.push([t.currentConstruct, t.containerState]), m(x));
  }
  function R(x) {
    if (x === null) {
      (i && S(), A(0), e.consume(x));
      return;
    }
    return (
      (i = i || t.parser.flow(t.now())),
      e.enter('chunkFlow', { _tokenizer: i, contentType: 'flow', previous: o }),
      I(x)
    );
  }
  function I(x) {
    if (x === null) {
      (L(e.exit('chunkFlow'), !0), A(0), e.consume(x));
      return;
    }
    return $(x)
      ? (e.consume(x), L(e.exit('chunkFlow')), (r = 0), (t.interrupt = void 0), a)
      : (e.consume(x), I);
  }
  function L(x, F) {
    let j = t.sliceStream(x);
    if (
      (F && j.push(null),
      (x.previous = o),
      o && (o.next = x),
      (o = x),
      i.defineSkip(x.start),
      i.write(j),
      t.parser.lazy[x.start.line])
    ) {
      let E = i.events.length;
      for (; E--; )
        if (
          i.events[E][1].start.offset < s &&
          (!i.events[E][1].end || i.events[E][1].end.offset > s)
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
      for (A(r), E = Z; E < t.events.length; ) ((t.events[E][1].end = { ...ge }), E++);
      (nt(t.events, ye + 1, 0, t.events.slice(Z)), (t.events.length = E));
    }
  }
  function A(x) {
    let F = n.length;
    for (; F-- > x; ) {
      let j = n[F];
      ((t.containerState = j[1]), j[0].exit.call(t, e));
    }
    n.length = x;
  }
  function S() {
    (i.write([null]), (o = void 0), (i = void 0), (t.containerState._closeFlow = void 0));
  }
}
function HT(e, t, n) {
  return ae(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    'linePrefix',
    this.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
  );
}
var Ob,
  qb,
  Ib = z(() => {
    Ze();
    _e();
    An();
    ((Ob = { tokenize: BT }), (qb = { tokenize: HT }));
  });
function Lc(e) {
  if (e === null || Me(e) || Rb(e)) return 1;
  if (Eb(e)) return 2;
}
var Fb = z(() => {
  _e();
});
function Ur(e, t, n) {
  let r = [],
    i = -1;
  for (; ++i < e.length; ) {
    let o = e[i].resolveAll;
    o && !r.includes(o) && ((t = o(t, n)), r.push(o));
  }
  return t;
}
var Rs = z(() => {});
function zT(e, t) {
  let n = -1,
    r,
    i,
    o,
    s,
    a,
    u,
    c,
    l;
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
          (Nb(p, -u),
            Nb(m, u),
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
            (c = dt(c, Ur(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t))),
            (c = dt(c, [
              ['exit', o, t],
              ['enter', a, t],
              ['exit', a, t],
              ['exit', i, t],
            ])),
            e[n][1].end.offset - e[n][1].start.offset
              ? ((l = 2),
                (c = dt(c, [
                  ['enter', e[n][1], t],
                  ['exit', e[n][1], t],
                ])))
              : (l = 0),
            nt(e, r - 1, n - r + 3, c),
            (n = r + c.length - l - 2));
          break;
        }
    }
  for (n = -1; ++n < e.length; ) e[n][1].type === 'attentionSequence' && (e[n][1].type = 'data');
  return e;
}
function UT(e, t) {
  let n = this.parser.constructs.attentionMarkers.null,
    r = this.previous,
    i = Lc(r),
    o;
  return s;
  function s(u) {
    return ((o = u), e.enter('attentionSequence'), a(u));
  }
  function a(u) {
    if (u === o) return (e.consume(u), a);
    let c = e.exit('attentionSequence'),
      l = Lc(u),
      p = !l || (l === 2 && i) || n.includes(u),
      m = !i || (i === 2 && l) || n.includes(r);
    return (
      (c._open = !!(o === 42 ? p : p && (i || !m))),
      (c._close = !!(o === 42 ? m : m && (l || !p))),
      t(u)
    );
  }
}
function Nb(e, t) {
  ((e.column += t), (e.offset += t), (e._bufferIndex += t));
}
var Di,
  Lb = z(() => {
    An();
    Fb();
    Rs();
    Di = { name: 'attention', resolveAll: zT, tokenize: UT };
  });
function WT(e, t, n) {
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
    return Rt(h) ? (e.consume(h), s) : h === 64 ? n(h) : c(h);
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
      : h === null || h === 32 || h === 60 || Ti(h)
        ? n(h)
        : (e.consume(h), u);
  }
  function c(h) {
    return h === 64 ? (e.consume(h), l) : Tb(h) ? (e.consume(h), c) : n(h);
  }
  function l(h) {
    return pt(h) ? p(h) : n(h);
  }
  function p(h) {
    return h === 46
      ? (e.consume(h), (r = 0), l)
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
      let R = h === 45 ? m : p;
      return (e.consume(h), R);
    }
    return n(h);
  }
}
var Mc,
  Mb = z(() => {
    _e();
    Mc = { name: 'autolink', tokenize: WT };
  });
function $T(e, t, n) {
  return r;
  function r(o) {
    return ie(o) ? ae(e, i, 'linePrefix')(o) : i(o);
  }
  function i(o) {
    return o === null || $(o) ? t(o) : n(o);
  }
}
var qn,
  As = z(() => {
    Ze();
    _e();
    qn = { partial: !0, tokenize: $T };
  });
function VT(e, t, n) {
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
function YT(e, t, n) {
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
    return e.attempt(Ps, t, n)(s);
  }
}
function GT(e) {
  e.exit('blockQuote');
}
var Ps,
  jb = z(() => {
    Ze();
    _e();
    Ps = { continuation: { tokenize: YT }, exit: GT, name: 'blockQuote', tokenize: VT };
  });
function KT(e, t, n) {
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
    return Db(o)
      ? (e.enter('characterEscapeValue'),
        e.consume(o),
        e.exit('characterEscapeValue'),
        e.exit('characterEscape'),
        t)
      : n(o);
  }
}
var qs,
  Bb = z(() => {
    _e();
    qs = { name: 'characterEscape', tokenize: KT };
  });
function QT(e, t, n) {
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
      : (e.enter('characterReferenceValue'), (o = 31), (s = pt), l(p));
  }
  function c(p) {
    return p === 88 || p === 120
      ? (e.enter('characterReferenceMarkerHexadecimal'),
        e.consume(p),
        e.exit('characterReferenceMarkerHexadecimal'),
        e.enter('characterReferenceValue'),
        (o = 6),
        (s = Cb),
        l)
      : (e.enter('characterReferenceValue'), (o = 7), (s = Ci), l(p));
  }
  function l(p) {
    if (p === 59 && i) {
      let m = e.exit('characterReferenceValue');
      return s === pt && !zr(r.sliceSerialize(m))
        ? n(p)
        : (e.enter('characterReferenceMarker'),
          e.consume(p),
          e.exit('characterReferenceMarker'),
          e.exit('characterReference'),
          t);
    }
    return s(p) && i++ < o ? (e.consume(p), l) : n(p);
  }
}
var Os,
  Hb = z(() => {
    Cs();
    _e();
    Os = { name: 'characterReference', tokenize: QT };
  });
function JT(e, t, n) {
  let r = this,
    i = { partial: !0, tokenize: j },
    o = 0,
    s = 0,
    a;
  return u;
  function u(E) {
    return c(E);
  }
  function c(E) {
    let Z = r.events[r.events.length - 1];
    return (
      (o = Z && Z[1].type === 'linePrefix' ? Z[2].sliceSerialize(Z[1], !0).length : 0),
      (a = E),
      e.enter('codeFenced'),
      e.enter('codeFencedFence'),
      e.enter('codeFencedFenceSequence'),
      l(E)
    );
  }
  function l(E) {
    return E === a
      ? (s++, e.consume(E), l)
      : s < 3
        ? n(E)
        : (e.exit('codeFencedFenceSequence'), ie(E) ? ae(e, p, 'whitespace')(E) : p(E));
  }
  function p(E) {
    return E === null || $(E)
      ? (e.exit('codeFencedFence'), r.interrupt ? t(E) : e.check(zb, I, F)(E))
      : (e.enter('codeFencedFenceInfo'), e.enter('chunkString', { contentType: 'string' }), m(E));
  }
  function m(E) {
    return E === null || $(E)
      ? (e.exit('chunkString'), e.exit('codeFencedFenceInfo'), p(E))
      : ie(E)
        ? (e.exit('chunkString'), e.exit('codeFencedFenceInfo'), ae(e, h, 'whitespace')(E))
        : E === 96 && E === a
          ? n(E)
          : (e.consume(E), m);
  }
  function h(E) {
    return E === null || $(E)
      ? p(E)
      : (e.enter('codeFencedFenceMeta'), e.enter('chunkString', { contentType: 'string' }), R(E));
  }
  function R(E) {
    return E === null || $(E)
      ? (e.exit('chunkString'), e.exit('codeFencedFenceMeta'), p(E))
      : E === 96 && E === a
        ? n(E)
        : (e.consume(E), R);
  }
  function I(E) {
    return e.attempt(i, F, L)(E);
  }
  function L(E) {
    return (e.enter('lineEnding'), e.consume(E), e.exit('lineEnding'), A);
  }
  function A(E) {
    return o > 0 && ie(E) ? ae(e, S, 'linePrefix', o + 1)(E) : S(E);
  }
  function S(E) {
    return E === null || $(E) ? e.check(zb, I, F)(E) : (e.enter('codeFlowValue'), x(E));
  }
  function x(E) {
    return E === null || $(E) ? (e.exit('codeFlowValue'), S(E)) : (e.consume(E), x);
  }
  function F(E) {
    return (e.exit('codeFenced'), t(E));
  }
  function j(E, Z, ye) {
    let fe = 0;
    return ge;
    function ge(te) {
      return (E.enter('lineEnding'), E.consume(te), E.exit('lineEnding'), Ne);
    }
    function Ne(te) {
      return (
        E.enter('codeFencedFence'),
        ie(te)
          ? ae(
              E,
              ue,
              'linePrefix',
              r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
            )(te)
          : ue(te)
      );
    }
    function ue(te) {
      return te === a ? (E.enter('codeFencedFenceSequence'), V(te)) : ye(te);
    }
    function V(te) {
      return te === a
        ? (fe++, E.consume(te), V)
        : fe >= s
          ? (E.exit('codeFencedFenceSequence'), ie(te) ? ae(E, ee, 'whitespace')(te) : ee(te))
          : ye(te);
    }
    function ee(te) {
      return te === null || $(te) ? (E.exit('codeFencedFence'), Z(te)) : ye(te);
    }
  }
}
function ZT(e, t, n) {
  let r = this;
  return i;
  function i(s) {
    return s === null ? n(s) : (e.enter('lineEnding'), e.consume(s), e.exit('lineEnding'), o);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
var zb,
  Is,
  Ub = z(() => {
    Ze();
    _e();
    ((zb = { partial: !0, tokenize: ZT }),
      (Is = { concrete: !0, name: 'codeFenced', tokenize: JT }));
  });
function eC(e, t, n) {
  let r = this;
  return i;
  function i(c) {
    return (e.enter('codeIndented'), ae(e, o, 'linePrefix', 5)(c));
  }
  function o(c) {
    let l = r.events[r.events.length - 1];
    return l && l[1].type === 'linePrefix' && l[2].sliceSerialize(l[1], !0).length >= 4
      ? s(c)
      : n(c);
  }
  function s(c) {
    return c === null ? u(c) : $(c) ? e.attempt(XT, s, u)(c) : (e.enter('codeFlowValue'), a(c));
  }
  function a(c) {
    return c === null || $(c) ? (e.exit('codeFlowValue'), s(c)) : (e.consume(c), a);
  }
  function u(c) {
    return (e.exit('codeIndented'), t(c));
  }
}
function tC(e, t, n) {
  let r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line]
      ? n(s)
      : $(s)
        ? (e.enter('lineEnding'), e.consume(s), e.exit('lineEnding'), i)
        : ae(e, o, 'linePrefix', 5)(s);
  }
  function o(s) {
    let a = r.events[r.events.length - 1];
    return a && a[1].type === 'linePrefix' && a[2].sliceSerialize(a[1], !0).length >= 4
      ? t(s)
      : $(s)
        ? i(s)
        : n(s);
  }
}
var Ei,
  XT,
  Wb = z(() => {
    Ze();
    _e();
    ((Ei = { name: 'codeIndented', tokenize: eC }), (XT = { partial: !0, tokenize: tC }));
  });
function nC(e) {
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
function rC(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === 'characterEscape';
}
function iC(e, t, n) {
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
          : $(m)
            ? (e.enter('lineEnding'), e.consume(m), e.exit('lineEnding'), c)
            : (e.enter('codeTextData'), l(m));
  }
  function l(m) {
    return m === null || m === 32 || m === 96 || $(m)
      ? (e.exit('codeTextData'), c(m))
      : (e.consume(m), l);
  }
  function p(m) {
    return m === 96
      ? (e.consume(m), o++, p)
      : o === i
        ? (e.exit('codeTextSequence'), e.exit('codeText'), t(m))
        : ((s.type = 'codeTextData'), l(m));
  }
}
var jc,
  $b = z(() => {
    _e();
    jc = { name: 'codeText', previous: rC, resolve: nC, tokenize: iC };
  });
function Ri(e, t) {
  let n = 0;
  if (t.length < 1e4) e.push(...t);
  else for (; n < t.length; ) (e.push(...t.slice(n, n + 1e4)), (n += 1e4));
}
var Fs,
  Vb = z(() => {
    Fs = class {
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
        return (r && Ri(this.left, r), o.reverse());
      }
      pop() {
        return (this.setCursor(Number.POSITIVE_INFINITY), this.left.pop());
      }
      push(t) {
        (this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t));
      }
      pushMany(t) {
        (this.setCursor(Number.POSITIVE_INFINITY), Ri(this.left, t));
      }
      unshift(t) {
        (this.setCursor(0), this.right.push(t));
      }
      unshiftMany(t) {
        (this.setCursor(0), Ri(this.right, t.reverse()));
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
            Ri(this.right, n.reverse());
          } else {
            let n = this.right.splice(
              this.left.length + this.right.length - t,
              Number.POSITIVE_INFINITY
            );
            Ri(this.left, n.reverse());
          }
      }
    };
  });
function Ns(e) {
  let t = {},
    n = -1,
    r,
    i,
    o,
    s,
    a,
    u,
    c,
    l = new Fs(e);
  for (; ++n < l.length; ) {
    for (; n in t; ) n = t[n];
    if (
      ((r = l.get(n)),
      n &&
        r[1].type === 'chunkFlow' &&
        l.get(n - 1)[1].type === 'listItemPrefix' &&
        ((u = r[1]._tokenizer.events),
        (o = 0),
        o < u.length && u[o][1].type === 'lineEndingBlank' && (o += 2),
        o < u.length && u[o][1].type === 'content'))
    )
      for (; ++o < u.length && u[o][1].type !== 'content'; )
        u[o][1].type === 'chunkText' && ((u[o][1]._isInFirstContentOfListItem = !0), o++);
    if (r[0] === 'enter') r[1].contentType && (Object.assign(t, oC(l, n)), (n = t[n]), (c = !0));
    else if (r[1]._container) {
      for (o = n, i = void 0; o--; )
        if (((s = l.get(o)), s[1].type === 'lineEnding' || s[1].type === 'lineEndingBlank'))
          s[0] === 'enter' &&
            (i && (l.get(i)[1].type = 'lineEndingBlank'), (s[1].type = 'lineEnding'), (i = o));
        else if (!(s[1].type === 'linePrefix' || s[1].type === 'listItemIndent')) break;
      i &&
        ((r[1].end = { ...l.get(i)[1].start }),
        (a = l.slice(i, n)),
        a.unshift(r),
        l.splice(i, n - i + 1, a));
    }
  }
  return (nt(e, 0, Number.POSITIVE_INFINITY, l.slice(0)), !c);
}
function oC(e, t) {
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
    l,
    p,
    m = -1,
    h = n,
    R = 0,
    I = 0,
    L = [I];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; );
    (o.push(i),
      h._tokenizer ||
        ((l = r.sliceStream(h)),
        h.next || l.push(null),
        p && s.defineSkip(h.start),
        h._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0),
        s.write(l),
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
    let A = a.slice(L[m], L[m + 1]),
      S = o.pop();
    (u.push([S, S + A.length - 1]), e.splice(S, 2, A));
  }
  for (u.reverse(), m = -1; ++m < u.length; )
    ((c[R + u[m][0]] = R + u[m][1]), (R += u[m][1] - u[m][0] - 1));
  return c;
}
var Bc = z(() => {
  An();
  Vb();
});
function aC(e) {
  return (Ns(e), e);
}
function uC(e, t) {
  let n;
  return r;
  function r(a) {
    return (e.enter('content'), (n = e.enter('chunkContent', { contentType: 'content' })), i(a));
  }
  function i(a) {
    return a === null ? o(a) : $(a) ? e.check(sC, s, o)(a) : (e.consume(a), i);
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
function cC(e, t, n) {
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
    if (s === null || $(s)) return n(s);
    let a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes('codeIndented') &&
      a &&
      a[1].type === 'linePrefix' &&
      a[2].sliceSerialize(a[1], !0).length >= 4
      ? t(s)
      : e.interrupt(r.parser.constructs.flow, n, t)(s);
  }
}
var Hc,
  sC,
  Yb = z(() => {
    Ze();
    _e();
    Bc();
    ((Hc = { resolve: aC, tokenize: uC }), (sC = { partial: !0, tokenize: cC }));
  });
function Ls(e, t, n, r, i, o, s, a, u) {
  let c = u || Number.POSITIVE_INFINITY,
    l = 0;
  return p;
  function p(A) {
    return A === 60
      ? (e.enter(r), e.enter(i), e.enter(o), e.consume(A), e.exit(o), m)
      : A === null || A === 32 || A === 41 || Ti(A)
        ? n(A)
        : (e.enter(r),
          e.enter(s),
          e.enter(a),
          e.enter('chunkString', { contentType: 'string' }),
          I(A));
  }
  function m(A) {
    return A === 62
      ? (e.enter(o), e.consume(A), e.exit(o), e.exit(i), e.exit(r), t)
      : (e.enter(a), e.enter('chunkString', { contentType: 'string' }), h(A));
  }
  function h(A) {
    return A === 62
      ? (e.exit('chunkString'), e.exit(a), m(A))
      : A === null || A === 60 || $(A)
        ? n(A)
        : (e.consume(A), A === 92 ? R : h);
  }
  function R(A) {
    return A === 60 || A === 62 || A === 92 ? (e.consume(A), h) : h(A);
  }
  function I(A) {
    return !l && (A === null || A === 41 || Me(A))
      ? (e.exit('chunkString'), e.exit(a), e.exit(s), e.exit(r), t(A))
      : l < c && A === 40
        ? (e.consume(A), l++, I)
        : A === 41
          ? (e.consume(A), l--, I)
          : A === null || A === 32 || A === 40 || Ti(A)
            ? n(A)
            : (e.consume(A), A === 92 ? L : I);
  }
  function L(A) {
    return A === 40 || A === 41 || A === 92 ? (e.consume(A), I) : I(A);
  }
}
var zc = z(() => {
  _e();
});
function Ms(e, t, n, r, i, o) {
  let s = this,
    a = 0,
    u;
  return c;
  function c(h) {
    return (e.enter(r), e.enter(i), e.consume(h), e.exit(i), e.enter(o), l);
  }
  function l(h) {
    return a > 999 ||
      h === null ||
      h === 91 ||
      (h === 93 && !u) ||
      (h === 94 && !a && '_hiddenFootnoteSupport' in s.parser.constructs)
      ? n(h)
      : h === 93
        ? (e.exit(o), e.enter(i), e.consume(h), e.exit(i), e.exit(r), t)
        : $(h)
          ? (e.enter('lineEnding'), e.consume(h), e.exit('lineEnding'), l)
          : (e.enter('chunkString', { contentType: 'string' }), p(h));
  }
  function p(h) {
    return h === null || h === 91 || h === 93 || $(h) || a++ > 999
      ? (e.exit('chunkString'), l(h))
      : (e.consume(h), u || (u = !ie(h)), h === 92 ? m : p);
  }
  function m(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), a++, p) : p(h);
  }
}
var Uc = z(() => {
  _e();
});
function js(e, t, n, r, i, o) {
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
        : $(m)
          ? (e.enter('lineEnding'), e.consume(m), e.exit('lineEnding'), ae(e, c, 'linePrefix'))
          : (e.enter('chunkString', { contentType: 'string' }), l(m));
  }
  function l(m) {
    return m === s || m === null || $(m)
      ? (e.exit('chunkString'), c(m))
      : (e.consume(m), m === 92 ? p : l);
  }
  function p(m) {
    return m === s || m === 92 ? (e.consume(m), l) : l(m);
  }
}
var Wc = z(() => {
  Ze();
  _e();
});
function er(e, t) {
  let n;
  return r;
  function r(i) {
    return $(i)
      ? (e.enter('lineEnding'), e.consume(i), e.exit('lineEnding'), (n = !0), r)
      : ie(i)
        ? ae(e, r, n ? 'linePrefix' : 'lineSuffix')(i)
        : t(i);
  }
}
var $c = z(() => {
  Ze();
  _e();
});
function fC(e, t, n) {
  let r = this,
    i;
  return o;
  function o(h) {
    return (e.enter('definition'), s(h));
  }
  function s(h) {
    return Ms.call(
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
      (i = ln(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))),
      h === 58 ? (e.enter('definitionMarker'), e.consume(h), e.exit('definitionMarker'), u) : n(h)
    );
  }
  function u(h) {
    return Me(h) ? er(e, c)(h) : c(h);
  }
  function c(h) {
    return Ls(
      e,
      l,
      n,
      'definitionDestination',
      'definitionDestinationLiteral',
      'definitionDestinationLiteralMarker',
      'definitionDestinationRaw',
      'definitionDestinationString'
    )(h);
  }
  function l(h) {
    return e.attempt(lC, p, p)(h);
  }
  function p(h) {
    return ie(h) ? ae(e, m, 'whitespace')(h) : m(h);
  }
  function m(h) {
    return h === null || $(h) ? (e.exit('definition'), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function dC(e, t, n) {
  return r;
  function r(a) {
    return Me(a) ? er(e, i)(a) : n(a);
  }
  function i(a) {
    return js(e, o, n, 'definitionTitle', 'definitionTitleMarker', 'definitionTitleString')(a);
  }
  function o(a) {
    return ie(a) ? ae(e, s, 'whitespace')(a) : s(a);
  }
  function s(a) {
    return a === null || $(a) ? t(a) : n(a);
  }
}
var Vc,
  lC,
  Gb = z(() => {
    zc();
    Uc();
    Ze();
    Wc();
    $c();
    _e();
    Es();
    ((Vc = { name: 'definition', tokenize: fC }), (lC = { partial: !0, tokenize: dC }));
  });
function pC(e, t, n) {
  return r;
  function r(o) {
    return (e.enter('hardBreakEscape'), e.consume(o), i);
  }
  function i(o) {
    return $(o) ? (e.exit('hardBreakEscape'), t(o)) : n(o);
  }
}
var Yc,
  Kb = z(() => {
    _e();
    Yc = { name: 'hardBreakEscape', tokenize: pC };
  });
function hC(e, t) {
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
function mC(e, t, n) {
  let r = 0;
  return i;
  function i(l) {
    return (e.enter('atxHeading'), o(l));
  }
  function o(l) {
    return (e.enter('atxHeadingSequence'), s(l));
  }
  function s(l) {
    return l === 35 && r++ < 6
      ? (e.consume(l), s)
      : l === null || Me(l)
        ? (e.exit('atxHeadingSequence'), a(l))
        : n(l);
  }
  function a(l) {
    return l === 35
      ? (e.enter('atxHeadingSequence'), u(l))
      : l === null || $(l)
        ? (e.exit('atxHeading'), t(l))
        : ie(l)
          ? ae(e, a, 'whitespace')(l)
          : (e.enter('atxHeadingText'), c(l));
  }
  function u(l) {
    return l === 35 ? (e.consume(l), u) : (e.exit('atxHeadingSequence'), a(l));
  }
  function c(l) {
    return l === null || l === 35 || Me(l) ? (e.exit('atxHeadingText'), a(l)) : (e.consume(l), c);
  }
}
var Gc,
  Qb = z(() => {
    Ze();
    _e();
    An();
    Gc = { name: 'headingAtx', resolve: hC, tokenize: mC };
  });
var Jb,
  Kc,
  Zb = z(() => {
    ((Jb = [
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
      (Kc = ['pre', 'script', 'style', 'textarea']));
  });
function bC(e) {
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
function vC(e, t, n) {
  let r = this,
    i,
    o,
    s,
    a,
    u;
  return c;
  function c(k) {
    return l(k);
  }
  function l(k) {
    return (e.enter('htmlFlow'), e.enter('htmlFlowData'), e.consume(k), p);
  }
  function p(k) {
    return k === 33
      ? (e.consume(k), m)
      : k === 47
        ? (e.consume(k), (o = !0), I)
        : k === 63
          ? (e.consume(k), (i = 3), r.interrupt ? t : v)
          : Rt(k)
            ? (e.consume(k), (s = String.fromCharCode(k)), L)
            : n(k);
  }
  function m(k) {
    return k === 45
      ? (e.consume(k), (i = 2), h)
      : k === 91
        ? (e.consume(k), (i = 5), (a = 0), R)
        : Rt(k)
          ? (e.consume(k), (i = 4), r.interrupt ? t : v)
          : n(k);
  }
  function h(k) {
    return k === 45 ? (e.consume(k), r.interrupt ? t : v) : n(k);
  }
  function R(k) {
    let We = 'CDATA[';
    return k === We.charCodeAt(a++)
      ? (e.consume(k), a === We.length ? (r.interrupt ? t : ue) : R)
      : n(k);
  }
  function I(k) {
    return Rt(k) ? (e.consume(k), (s = String.fromCharCode(k)), L) : n(k);
  }
  function L(k) {
    if (k === null || k === 47 || k === 62 || Me(k)) {
      let We = k === 47,
        Tt = s.toLowerCase();
      return !We && !o && Kc.includes(Tt)
        ? ((i = 1), r.interrupt ? t(k) : ue(k))
        : Jb.includes(s.toLowerCase())
          ? ((i = 6), We ? (e.consume(k), A) : r.interrupt ? t(k) : ue(k))
          : ((i = 7), r.interrupt && !r.parser.lazy[r.now().line] ? n(k) : o ? S(k) : x(k));
    }
    return k === 45 || pt(k) ? (e.consume(k), (s += String.fromCharCode(k)), L) : n(k);
  }
  function A(k) {
    return k === 62 ? (e.consume(k), r.interrupt ? t : ue) : n(k);
  }
  function S(k) {
    return ie(k) ? (e.consume(k), S) : ge(k);
  }
  function x(k) {
    return k === 47
      ? (e.consume(k), ge)
      : k === 58 || k === 95 || Rt(k)
        ? (e.consume(k), F)
        : ie(k)
          ? (e.consume(k), x)
          : ge(k);
  }
  function F(k) {
    return k === 45 || k === 46 || k === 58 || k === 95 || pt(k) ? (e.consume(k), F) : j(k);
  }
  function j(k) {
    return k === 61 ? (e.consume(k), E) : ie(k) ? (e.consume(k), j) : x(k);
  }
  function E(k) {
    return k === null || k === 60 || k === 61 || k === 62 || k === 96
      ? n(k)
      : k === 34 || k === 39
        ? (e.consume(k), (u = k), Z)
        : ie(k)
          ? (e.consume(k), E)
          : ye(k);
  }
  function Z(k) {
    return k === u ? (e.consume(k), (u = null), fe) : k === null || $(k) ? n(k) : (e.consume(k), Z);
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
      Me(k)
      ? j(k)
      : (e.consume(k), ye);
  }
  function fe(k) {
    return k === 47 || k === 62 || ie(k) ? x(k) : n(k);
  }
  function ge(k) {
    return k === 62 ? (e.consume(k), Ne) : n(k);
  }
  function Ne(k) {
    return k === null || $(k) ? ue(k) : ie(k) ? (e.consume(k), Ne) : n(k);
  }
  function ue(k) {
    return k === 45 && i === 2
      ? (e.consume(k), Se)
      : k === 60 && i === 1
        ? (e.consume(k), Ee)
        : k === 62 && i === 4
          ? (e.consume(k), Ue)
          : k === 63 && i === 3
            ? (e.consume(k), v)
            : k === 93 && i === 5
              ? (e.consume(k), Ye)
              : $(k) && (i === 6 || i === 7)
                ? (e.exit('htmlFlowData'), e.check(gC, et, V)(k))
                : k === null || $(k)
                  ? (e.exit('htmlFlowData'), V(k))
                  : (e.consume(k), ue);
  }
  function V(k) {
    return e.check(yC, ee, et)(k);
  }
  function ee(k) {
    return (e.enter('lineEnding'), e.consume(k), e.exit('lineEnding'), te);
  }
  function te(k) {
    return k === null || $(k) ? V(k) : (e.enter('htmlFlowData'), ue(k));
  }
  function Se(k) {
    return k === 45 ? (e.consume(k), v) : ue(k);
  }
  function Ee(k) {
    return k === 47 ? (e.consume(k), (s = ''), Xe) : ue(k);
  }
  function Xe(k) {
    if (k === 62) {
      let We = s.toLowerCase();
      return Kc.includes(We) ? (e.consume(k), Ue) : ue(k);
    }
    return Rt(k) && s.length < 8 ? (e.consume(k), (s += String.fromCharCode(k)), Xe) : ue(k);
  }
  function Ye(k) {
    return k === 93 ? (e.consume(k), v) : ue(k);
  }
  function v(k) {
    return k === 62 ? (e.consume(k), Ue) : k === 45 && i === 2 ? (e.consume(k), v) : ue(k);
  }
  function Ue(k) {
    return k === null || $(k) ? (e.exit('htmlFlowData'), et(k)) : (e.consume(k), Ue);
  }
  function et(k) {
    return (e.exit('htmlFlow'), t(k));
  }
}
function xC(e, t, n) {
  let r = this;
  return i;
  function i(s) {
    return $(s) ? (e.enter('lineEnding'), e.consume(s), e.exit('lineEnding'), o) : n(s);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
function wC(e, t, n) {
  return r;
  function r(i) {
    return (e.enter('lineEnding'), e.consume(i), e.exit('lineEnding'), e.attempt(qn, t, n));
  }
}
var Qc,
  gC,
  yC,
  Xb = z(() => {
    _e();
    Zb();
    As();
    ((Qc = { concrete: !0, name: 'htmlFlow', resolveTo: bC, tokenize: vC }),
      (gC = { partial: !0, tokenize: wC }),
      (yC = { partial: !0, tokenize: xC }));
  });
function kC(e, t, n) {
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
        ? (e.consume(v), j)
        : v === 63
          ? (e.consume(v), x)
          : Rt(v)
            ? (e.consume(v), ye)
            : n(v);
  }
  function c(v) {
    return v === 45
      ? (e.consume(v), l)
      : v === 91
        ? (e.consume(v), (o = 0), R)
        : Rt(v)
          ? (e.consume(v), S)
          : n(v);
  }
  function l(v) {
    return v === 45 ? (e.consume(v), h) : n(v);
  }
  function p(v) {
    return v === null
      ? n(v)
      : v === 45
        ? (e.consume(v), m)
        : $(v)
          ? ((s = p), Ee(v))
          : (e.consume(v), p);
  }
  function m(v) {
    return v === 45 ? (e.consume(v), h) : p(v);
  }
  function h(v) {
    return v === 62 ? Se(v) : v === 45 ? m(v) : p(v);
  }
  function R(v) {
    let Ue = 'CDATA[';
    return v === Ue.charCodeAt(o++) ? (e.consume(v), o === Ue.length ? I : R) : n(v);
  }
  function I(v) {
    return v === null
      ? n(v)
      : v === 93
        ? (e.consume(v), L)
        : $(v)
          ? ((s = I), Ee(v))
          : (e.consume(v), I);
  }
  function L(v) {
    return v === 93 ? (e.consume(v), A) : I(v);
  }
  function A(v) {
    return v === 62 ? Se(v) : v === 93 ? (e.consume(v), A) : I(v);
  }
  function S(v) {
    return v === null || v === 62 ? Se(v) : $(v) ? ((s = S), Ee(v)) : (e.consume(v), S);
  }
  function x(v) {
    return v === null
      ? n(v)
      : v === 63
        ? (e.consume(v), F)
        : $(v)
          ? ((s = x), Ee(v))
          : (e.consume(v), x);
  }
  function F(v) {
    return v === 62 ? Se(v) : x(v);
  }
  function j(v) {
    return Rt(v) ? (e.consume(v), E) : n(v);
  }
  function E(v) {
    return v === 45 || pt(v) ? (e.consume(v), E) : Z(v);
  }
  function Z(v) {
    return $(v) ? ((s = Z), Ee(v)) : ie(v) ? (e.consume(v), Z) : Se(v);
  }
  function ye(v) {
    return v === 45 || pt(v) ? (e.consume(v), ye) : v === 47 || v === 62 || Me(v) ? fe(v) : n(v);
  }
  function fe(v) {
    return v === 47
      ? (e.consume(v), Se)
      : v === 58 || v === 95 || Rt(v)
        ? (e.consume(v), ge)
        : $(v)
          ? ((s = fe), Ee(v))
          : ie(v)
            ? (e.consume(v), fe)
            : Se(v);
  }
  function ge(v) {
    return v === 45 || v === 46 || v === 58 || v === 95 || pt(v) ? (e.consume(v), ge) : Ne(v);
  }
  function Ne(v) {
    return v === 61
      ? (e.consume(v), ue)
      : $(v)
        ? ((s = Ne), Ee(v))
        : ie(v)
          ? (e.consume(v), Ne)
          : fe(v);
  }
  function ue(v) {
    return v === null || v === 60 || v === 61 || v === 62 || v === 96
      ? n(v)
      : v === 34 || v === 39
        ? (e.consume(v), (i = v), V)
        : $(v)
          ? ((s = ue), Ee(v))
          : ie(v)
            ? (e.consume(v), ue)
            : (e.consume(v), ee);
  }
  function V(v) {
    return v === i
      ? (e.consume(v), (i = void 0), te)
      : v === null
        ? n(v)
        : $(v)
          ? ((s = V), Ee(v))
          : (e.consume(v), V);
  }
  function ee(v) {
    return v === null || v === 34 || v === 39 || v === 60 || v === 61 || v === 96
      ? n(v)
      : v === 47 || v === 62 || Me(v)
        ? fe(v)
        : (e.consume(v), ee);
  }
  function te(v) {
    return v === 47 || v === 62 || Me(v) ? fe(v) : n(v);
  }
  function Se(v) {
    return v === 62 ? (e.consume(v), e.exit('htmlTextData'), e.exit('htmlText'), t) : n(v);
  }
  function Ee(v) {
    return (e.exit('htmlTextData'), e.enter('lineEnding'), e.consume(v), e.exit('lineEnding'), Xe);
  }
  function Xe(v) {
    return ie(v)
      ? ae(
          e,
          Ye,
          'linePrefix',
          r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
        )(v)
      : Ye(v);
  }
  function Ye(v) {
    return (e.enter('htmlTextData'), s(v));
  }
}
var Jc,
  ev = z(() => {
    Ze();
    _e();
    Jc = { name: 'htmlText', tokenize: kC };
  });
function CC(e) {
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
function DC(e, t) {
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
    l = { type: 'labelText', start: { ...e[o + r + 2][1].end }, end: { ...e[s - 2][1].start } };
  return (
    (a = [
      ['enter', u, t],
      ['enter', c, t],
    ]),
    (a = dt(a, e.slice(o + 1, o + r + 3))),
    (a = dt(a, [['enter', l, t]])),
    (a = dt(a, Ur(t.parser.constructs.insideSpan.null, e.slice(o + r + 4, s - 3), t))),
    (a = dt(a, [['exit', l, t], e[s - 2], e[s - 1], ['exit', c, t]])),
    (a = dt(a, e.slice(s + 1))),
    (a = dt(a, [['exit', u, t]])),
    nt(e, o, e.length, a),
    e
  );
}
function EC(e, t, n) {
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
        : ((s = r.parser.defined.includes(ln(r.sliceSerialize({ start: o.end, end: r.now() })))),
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
      ? e.attempt(_C, l, s ? l : p)(m)
      : m === 91
        ? e.attempt(SC, l, s ? c : p)(m)
        : s
          ? l(m)
          : p(m);
  }
  function c(m) {
    return e.attempt(TC, l, p)(m);
  }
  function l(m) {
    return t(m);
  }
  function p(m) {
    return ((o._balanced = !0), n(m));
  }
}
function RC(e, t, n) {
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
    return Me(p) ? er(e, o)(p) : o(p);
  }
  function o(p) {
    return p === 41
      ? l(p)
      : Ls(
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
    return Me(p) ? er(e, u)(p) : l(p);
  }
  function a(p) {
    return n(p);
  }
  function u(p) {
    return p === 34 || p === 39 || p === 40
      ? js(e, c, n, 'resourceTitle', 'resourceTitleMarker', 'resourceTitleString')(p)
      : l(p);
  }
  function c(p) {
    return Me(p) ? er(e, l)(p) : l(p);
  }
  function l(p) {
    return p === 41
      ? (e.enter('resourceMarker'), e.consume(p), e.exit('resourceMarker'), e.exit('resource'), t)
      : n(p);
  }
}
function AC(e, t, n) {
  let r = this;
  return i;
  function i(a) {
    return Ms.call(r, e, o, s, 'reference', 'referenceMarker', 'referenceString')(a);
  }
  function o(a) {
    return r.parser.defined.includes(
      ln(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))
    )
      ? t(a)
      : n(a);
  }
  function s(a) {
    return n(a);
  }
}
function PC(e, t, n) {
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
var tr,
  _C,
  SC,
  TC,
  Bs = z(() => {
    zc();
    Uc();
    Wc();
    $c();
    _e();
    An();
    Es();
    Rs();
    ((tr = { name: 'labelEnd', resolveAll: CC, resolveTo: DC, tokenize: EC }),
      (_C = { tokenize: RC }),
      (SC = { tokenize: AC }),
      (TC = { tokenize: PC }));
  });
function qC(e, t, n) {
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
var Zc,
  tv = z(() => {
    Bs();
    Zc = { name: 'labelStartImage', resolveAll: tr.resolveAll, tokenize: qC };
  });
function OC(e, t, n) {
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
var Xc,
  nv = z(() => {
    Bs();
    Xc = { name: 'labelStartLink', resolveAll: tr.resolveAll, tokenize: OC };
  });
function IC(e, t) {
  return n;
  function n(r) {
    return (e.enter('lineEnding'), e.consume(r), e.exit('lineEnding'), ae(e, t, 'linePrefix'));
  }
}
var Ai,
  rv = z(() => {
    Ze();
    Ai = { name: 'lineEnding', tokenize: IC };
  });
function FC(e, t, n) {
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
      : r >= 3 && (c === null || $(c))
        ? (e.exit('thematicBreak'), t(c))
        : n(c);
  }
  function u(c) {
    return c === i
      ? (e.consume(c), r++, u)
      : (e.exit('thematicBreakSequence'), ie(c) ? ae(e, a, 'whitespace')(c) : a(c));
  }
}
var nr,
  el = z(() => {
    Ze();
    _e();
    nr = { name: 'thematicBreak', tokenize: FC };
  });
function MC(e, t, n) {
  let r = this,
    i = r.events[r.events.length - 1],
    o = i && i[1].type === 'linePrefix' ? i[2].sliceSerialize(i[1], !0).length : 0,
    s = 0;
  return a;
  function a(h) {
    let R =
      r.containerState.type || (h === 42 || h === 43 || h === 45 ? 'listUnordered' : 'listOrdered');
    if (R === 'listUnordered' ? !r.containerState.marker || h === r.containerState.marker : Ci(h)) {
      if (
        (r.containerState.type || ((r.containerState.type = R), e.enter(R, { _container: !0 })),
        R === 'listUnordered')
      )
        return (e.enter('listItemPrefix'), h === 42 || h === 45 ? e.check(nr, n, c)(h) : c(h));
      if (!r.interrupt || h === 49)
        return (e.enter('listItemPrefix'), e.enter('listItemValue'), u(h));
    }
    return n(h);
  }
  function u(h) {
    return Ci(h) && ++s < 10
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
      e.check(qn, r.interrupt ? n : l, e.attempt(NC, m, p))
    );
  }
  function l(h) {
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
function jC(e, t, n) {
  let r = this;
  return ((r.containerState._closeFlow = void 0), e.check(qn, i, o));
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
        e.attempt(LC, t, s)(a));
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
function BC(e, t, n) {
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
function HC(e) {
  e.exit(this.containerState.type);
}
function zC(e, t, n) {
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
  NC,
  LC,
  iv = z(() => {
    Ze();
    _e();
    As();
    el();
    ((ut = { continuation: { tokenize: jC }, exit: HC, name: 'list', tokenize: MC }),
      (NC = { partial: !0, tokenize: zC }),
      (LC = { partial: !0, tokenize: BC }));
  });
function UC(e, t) {
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
function WC(e, t, n) {
  let r = this,
    i;
  return o;
  function o(c) {
    let l = r.events.length,
      p;
    for (; l--; )
      if (
        r.events[l][1].type !== 'lineEnding' &&
        r.events[l][1].type !== 'linePrefix' &&
        r.events[l][1].type !== 'content'
      ) {
        p = r.events[l][1].type === 'paragraph';
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
    return c === null || $(c) ? (e.exit('setextHeadingLine'), t(c)) : n(c);
  }
}
var Hs,
  ov = z(() => {
    Ze();
    _e();
    Hs = { name: 'setextUnderline', resolveTo: UC, tokenize: WC };
  });
var tl = z(() => {
  Lb();
  Mb();
  As();
  jb();
  Bb();
  Hb();
  Ub();
  Wb();
  $b();
  Yb();
  Gb();
  Kb();
  Qb();
  Xb();
  ev();
  Bs();
  tv();
  nv();
  rv();
  iv();
  ov();
  el();
});
function $C(e) {
  let t = this,
    n = e.attempt(
      qn,
      r,
      e.attempt(
        this.parser.constructs.flowInitial,
        i,
        ae(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Hc, i)), 'linePrefix')
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
var sv,
  av = z(() => {
    tl();
    Ze();
    sv = { tokenize: $C };
  });
function fv(e) {
  return { resolveAll: dv(e === 'text' ? VC : void 0), tokenize: t };
  function t(n) {
    let r = this,
      i = this.parser.constructs[e],
      o = n.attempt(i, s, a);
    return s;
    function s(l) {
      return c(l) ? o(l) : a(l);
    }
    function a(l) {
      if (l === null) {
        n.consume(l);
        return;
      }
      return (n.enter('data'), n.consume(l), u);
    }
    function u(l) {
      return c(l) ? (n.exit('data'), o(l)) : (n.consume(l), u);
    }
    function c(l) {
      if (l === null) return !0;
      let p = i[l],
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
function dv(e) {
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
function VC(e, t) {
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
var uv,
  cv,
  lv,
  nl = z(() => {
    ((uv = { resolveAll: dv() }), (cv = fv('string')), (lv = fv('text')));
  });
var rl = {};
$i(rl, {
  attentionMarkers: () => e1,
  contentInitial: () => GC,
  disable: () => t1,
  document: () => YC,
  flow: () => QC,
  flowInitial: () => KC,
  insideSpan: () => XC,
  string: () => JC,
  text: () => ZC,
});
var YC,
  GC,
  KC,
  QC,
  JC,
  ZC,
  XC,
  e1,
  t1,
  pv = z(() => {
    tl();
    nl();
    ((YC = {
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
      62: Ps,
    }),
      (GC = { 91: Vc }),
      (KC = { [-2]: Ei, [-1]: Ei, 32: Ei }),
      (QC = { 35: Gc, 42: nr, 45: [Hs, nr], 60: Qc, 61: Hs, 95: nr, 96: Is, 126: Is }),
      (JC = { 38: Os, 92: qs }),
      (ZC = {
        [-5]: Ai,
        [-4]: Ai,
        [-3]: Ai,
        33: Zc,
        38: Os,
        42: Di,
        60: [Mc, Jc],
        91: Xc,
        92: [Yc, qs],
        93: tr,
        95: Di,
        96: jc,
      }),
      (XC = { null: [Di, uv] }),
      (e1 = { null: [42, 95] }),
      (t1 = { null: [] }));
  });
function hv(e, t, n) {
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
      consume: F,
      enter: j,
      exit: E,
      interrupt: fe(ye, { interrupt: !0 }),
    },
    l = {
      code: null,
      containerState: {},
      defineSkip: A,
      events: [],
      now: L,
      parser: e,
      previous: null,
      sliceSerialize: R,
      sliceStream: I,
      write: h,
    },
    p = t.tokenize.call(l, c),
    m;
  return (t.resolveAll && o.push(t), l);
  function h(V) {
    return (
      (s = dt(s, V)),
      S(),
      s[s.length - 1] !== null ? [] : (ge(t, 0), (l.events = Ur(o, l.events, l)), l.events)
    );
  }
  function R(V, ee) {
    return r1(I(V), ee);
  }
  function I(V) {
    return n1(s, V);
  }
  function L() {
    let { _bufferIndex: V, _index: ee, line: te, column: Se, offset: Ee } = r;
    return { _bufferIndex: V, _index: ee, line: te, column: Se, offset: Ee };
  }
  function A(V) {
    ((i[V.line] = V.column), ue());
  }
  function S() {
    let V;
    for (; r._index < s.length; ) {
      let ee = s[r._index];
      if (typeof ee == 'string')
        for (
          V = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0);
          r._index === V && r._bufferIndex < ee.length;
        )
          x(ee.charCodeAt(r._bufferIndex));
      else x(ee);
    }
  }
  function x(V) {
    ((u = void 0), (m = V), (p = p(V)));
  }
  function F(V) {
    ($(V)
      ? (r.line++, (r.column = 1), (r.offset += V === -3 ? 2 : 1), ue())
      : V !== -1 && (r.column++, r.offset++),
      r._bufferIndex < 0
        ? r._index++
        : (r._bufferIndex++,
          r._bufferIndex === s[r._index].length && ((r._bufferIndex = -1), r._index++)),
      (l.previous = V),
      (u = !0));
  }
  function j(V, ee) {
    let te = ee || {};
    return ((te.type = V), (te.start = L()), l.events.push(['enter', te, l]), a.push(te), te);
  }
  function E(V) {
    let ee = a.pop();
    return ((ee.end = L()), l.events.push(['exit', ee, l]), ee);
  }
  function Z(V, ee) {
    ge(V, ee.from);
  }
  function ye(V, ee) {
    ee.restore();
  }
  function fe(V, ee) {
    return te;
    function te(Se, Ee, Xe) {
      let Ye, v, Ue, et;
      return Array.isArray(Se) ? We(Se) : 'tokenize' in Se ? We([Se]) : k(Se);
      function k(Pe) {
        return Kt;
        function Kt(mt) {
          let gt = mt !== null && Pe[mt],
            Ge = mt !== null && Pe.null,
            pn = [
              ...(Array.isArray(gt) ? gt : gt ? [gt] : []),
              ...(Array.isArray(Ge) ? Ge : Ge ? [Ge] : []),
            ];
          return We(pn)(mt);
        }
      }
      function We(Pe) {
        return ((Ye = Pe), (v = 0), Pe.length === 0 ? Xe : Tt(Pe[v]));
      }
      function Tt(Pe) {
        return Kt;
        function Kt(mt) {
          return (
            (et = Ne()),
            (Ue = Pe),
            Pe.partial || (l.currentConstruct = Pe),
            Pe.name && l.parser.constructs.disable.null.includes(Pe.name)
              ? nn(mt)
              : Pe.tokenize.call(ee ? Object.assign(Object.create(l), ee) : l, c, dn, nn)(mt)
          );
        }
      }
      function dn(Pe) {
        return ((u = !0), V(Ue, et), Ee);
      }
      function nn(Pe) {
        return ((u = !0), et.restore(), ++v < Ye.length ? Tt(Ye[v]) : Xe);
      }
    }
  }
  function ge(V, ee) {
    (V.resolveAll && !o.includes(V) && o.push(V),
      V.resolve && nt(l.events, ee, l.events.length - ee, V.resolve(l.events.slice(ee), l)),
      V.resolveTo && (l.events = V.resolveTo(l.events, l)));
  }
  function Ne() {
    let V = L(),
      ee = l.previous,
      te = l.currentConstruct,
      Se = l.events.length,
      Ee = Array.from(a);
    return { from: Se, restore: Xe };
    function Xe() {
      ((r = V),
        (l.previous = ee),
        (l.currentConstruct = te),
        (l.events.length = Se),
        (a = Ee),
        ue());
    }
  }
  function ue() {
    r.line in i && r.column < 2 && ((r.column = i[r.line]), (r.offset += i[r.line] - 1));
  }
}
function n1(e, t) {
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
function r1(e, t) {
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
var mv = z(() => {
  _e();
  An();
  Rs();
});
function il(e) {
  let r = {
    constructs: _b([rl, ...((e || {}).extensions || [])]),
    content: i(Ab),
    defined: [],
    document: i(Ob),
    flow: i(sv),
    lazy: {},
    string: i(cv),
    text: i(lv),
  };
  return r;
  function i(o) {
    return s;
    function s(a) {
      return hv(r, o, a);
    }
  }
}
var gv = z(() => {
  Sb();
  Pb();
  Ib();
  av();
  nl();
  pv();
  mv();
});
function ol(e) {
  for (; !Ns(e); );
  return e;
}
var yv = z(() => {
  Bc();
});
function sl() {
  let e = 1,
    t = '',
    n = !0,
    r;
  return i;
  function i(o, s, a) {
    let u = [],
      c,
      l,
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
        ((bv.lastIndex = p),
        (c = bv.exec(o)),
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
            for (l = Math.ceil(e / 4) * 4, u.push(-2); e++ < l; ) u.push(-1);
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
var bv,
  vv = z(() => {
    bv = /[\0\t\n\r]/g;
  });
var xv = z(() => {
  gv();
  yv();
  vv();
});
function wv(e) {
  return e.replace(i1, o1);
}
function o1(e, t, n) {
  if (t) return t;
  if (n.charCodeAt(0) === 35) {
    let i = n.charCodeAt(1),
      o = i === 120 || i === 88;
    return Ds(n.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return zr(n) || e;
}
var i1,
  kv = z(() => {
    Cs();
    Nc();
    i1 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
  });
function al(e, t, n) {
  return (
    typeof t != 'string' && ((n = t), (t = void 0)),
    s1(n)(
      ol(
        il(n)
          .document()
          .write(sl()(e, t, !0))
      )
    )
  );
}
function s1(e) {
  let t = {
    transforms: [],
    canContainEols: ['emphasis', 'fragment', 'heading', 'paragraph', 'strong'],
    enter: {
      autolink: o(Pt),
      autolinkProtocol: fe,
      autolinkEmail: fe,
      atxHeading: o(Qt),
      blockQuote: o(mt),
      characterEscape: fe,
      characterReference: fe,
      codeFenced: o(gt),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: o(gt, s),
      codeText: o(Ge, s),
      codeTextData: fe,
      data: fe,
      codeFlowValue: fe,
      definition: o(pn),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: o(sr),
      hardBreakEscape: o(Nn),
      hardBreakTrailing: o(Nn),
      htmlFlow: o(rn, s),
      htmlFlowData: fe,
      htmlText: o(rn, s),
      htmlTextData: fe,
      image: o(ar),
      label: s,
      link: o(Pt),
      listItem: o(ur),
      listItemValue: m,
      listOrdered: o(Bt, p),
      listUnordered: o(Bt),
      paragraph: o(cr),
      reference: k,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: o(Qt),
      strong: o(qt),
      thematicBreak: o(Mn),
    },
    exit: {
      atxHeading: u(),
      atxHeadingSequence: j,
      autolink: u(),
      autolinkEmail: Kt,
      autolinkProtocol: Pe,
      blockQuote: u(),
      characterEscapeValue: ge,
      characterReferenceMarkerHexadecimal: Tt,
      characterReferenceMarkerNumeric: Tt,
      characterReferenceValue: dn,
      characterReference: nn,
      codeFenced: u(L),
      codeFencedFence: I,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: R,
      codeFlowValue: ge,
      codeIndented: u(A),
      codeText: u(te),
      codeTextData: ge,
      data: ge,
      definition: u(),
      definitionDestinationString: F,
      definitionLabelString: S,
      definitionTitleString: x,
      emphasis: u(),
      hardBreakEscape: u(ue),
      hardBreakTrailing: u(ue),
      htmlFlow: u(V),
      htmlFlowData: ge,
      htmlText: u(ee),
      htmlTextData: ge,
      image: u(Ee),
      label: Ye,
      labelText: Xe,
      lineEnding: Ne,
      link: u(Se),
      listItem: u(),
      listOrdered: u(),
      listUnordered: u(),
      paragraph: u(),
      referenceString: We,
      resourceDestinationString: v,
      resourceTitleString: Ue,
      resource: et,
      setextHeading: u(ye),
      setextHeadingLineSequence: Z,
      setextHeadingText: E,
      strong: u(),
      thematicBreak: u(),
    },
  };
  Tv(t, (e || {}).mdastExtensions || []);
  let n = {};
  return r;
  function r(P) {
    let H = { type: 'root', children: [] },
      Q = {
        stack: [H],
        tokenStack: [],
        config: t,
        enter: a,
        exit: c,
        buffer: s,
        resume: l,
        data: n,
      },
      y = [],
      D = -1;
    for (; ++D < P.length; )
      if (P[D][1].type === 'listOrdered' || P[D][1].type === 'listUnordered')
        if (P[D][0] === 'enter') y.push(D);
        else {
          let M = y.pop();
          D = i(P, M, D);
        }
    for (D = -1; ++D < P.length; ) {
      let M = t[P[D][0]];
      Sv.call(M, P[D][1].type) &&
        M[P[D][1].type].call(Object.assign({ sliceSerialize: P[D][2].sliceSerialize }, Q), P[D][1]);
    }
    if (Q.tokenStack.length > 0) {
      let M = Q.tokenStack[Q.tokenStack.length - 1];
      (M[1] || _v).call(Q, void 0, M[0]);
    }
    for (
      H.position = {
        start: On(P.length > 0 ? P[0][1].start : { line: 1, column: 1, offset: 0 }),
        end: On(P.length > 0 ? P[P.length - 2][1].end : { line: 1, column: 1, offset: 0 }),
      },
        D = -1;
      ++D < t.transforms.length;
    )
      H = t.transforms[D](H) || H;
    return H;
  }
  function i(P, H, Q) {
    let y = H - 1,
      D = -1,
      M = !1,
      W,
      ce,
      pe,
      we;
    for (; ++y <= Q; ) {
      let le = P[y];
      switch (le[1].type) {
        case 'listUnordered':
        case 'listOrdered':
        case 'blockQuote': {
          (le[0] === 'enter' ? D++ : D--, (we = void 0));
          break;
        }
        case 'lineEndingBlank': {
          le[0] === 'enter' && (W && !we && !D && !pe && (pe = y), (we = void 0));
          break;
        }
        case 'linePrefix':
        case 'listItemValue':
        case 'listItemMarker':
        case 'listItemPrefix':
        case 'listItemPrefixWhitespace':
          break;
        default:
          we = void 0;
      }
      if (
        (!D && le[0] === 'enter' && le[1].type === 'listItemPrefix') ||
        (D === -1 &&
          le[0] === 'exit' &&
          (le[1].type === 'listUnordered' || le[1].type === 'listOrdered'))
      ) {
        if (W) {
          let ne = y;
          for (ce = void 0; ne--; ) {
            let de = P[ne];
            if (de[1].type === 'lineEnding' || de[1].type === 'lineEndingBlank') {
              if (de[0] === 'exit') continue;
              (ce && ((P[ce][1].type = 'lineEndingBlank'), (M = !0)),
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
          (pe && (!ce || pe < ce) && (W._spread = !0),
            (W.end = Object.assign({}, ce ? P[ce][1].start : le[1].end)),
            P.splice(ce || y, 0, ['exit', W, le[2]]),
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
          ((W = ne), P.splice(y, 0, ['enter', ne, le[2]]), y++, Q++, (pe = void 0), (we = !0));
        }
      }
    }
    return ((P[H][1]._spread = M), Q);
  }
  function o(P, H) {
    return Q;
    function Q(y) {
      (a.call(this, P(y), y), H && H.call(this, y));
    }
  }
  function s() {
    this.stack.push({ type: 'fragment', children: [] });
  }
  function a(P, H, Q) {
    (this.stack[this.stack.length - 1].children.push(P),
      this.stack.push(P),
      this.tokenStack.push([H, Q || void 0]),
      (P.position = { start: On(H.start), end: void 0 }));
  }
  function u(P) {
    return H;
    function H(Q) {
      (P && P.call(this, Q), c.call(this, Q));
    }
  }
  function c(P, H) {
    let Q = this.stack.pop(),
      y = this.tokenStack.pop();
    if (y) y[0].type !== P.type && (H ? H.call(this, P, y[0]) : (y[1] || _v).call(this, P, y[0]));
    else
      throw new Error(
        'Cannot close `' +
          P.type +
          '` (' +
          Rn({ start: P.start, end: P.end }) +
          '): it\u2019s not open'
      );
    Q.position.end = On(P.end);
  }
  function l() {
    return Ic(this.stack.pop());
  }
  function p() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(P) {
    if (this.data.expectingFirstListItemValue) {
      let H = this.stack[this.stack.length - 2];
      ((H.start = Number.parseInt(this.sliceSerialize(P), 10)),
        (this.data.expectingFirstListItemValue = void 0));
    }
  }
  function h() {
    let P = this.resume(),
      H = this.stack[this.stack.length - 1];
    H.lang = P;
  }
  function R() {
    let P = this.resume(),
      H = this.stack[this.stack.length - 1];
    H.meta = P;
  }
  function I() {
    this.data.flowCodeInside || (this.buffer(), (this.data.flowCodeInside = !0));
  }
  function L() {
    let P = this.resume(),
      H = this.stack[this.stack.length - 1];
    ((H.value = P.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')), (this.data.flowCodeInside = void 0));
  }
  function A() {
    let P = this.resume(),
      H = this.stack[this.stack.length - 1];
    H.value = P.replace(/(\r?\n|\r)$/g, '');
  }
  function S(P) {
    let H = this.resume(),
      Q = this.stack[this.stack.length - 1];
    ((Q.label = H), (Q.identifier = ln(this.sliceSerialize(P)).toLowerCase()));
  }
  function x() {
    let P = this.resume(),
      H = this.stack[this.stack.length - 1];
    H.title = P;
  }
  function F() {
    let P = this.resume(),
      H = this.stack[this.stack.length - 1];
    H.url = P;
  }
  function j(P) {
    let H = this.stack[this.stack.length - 1];
    if (!H.depth) {
      let Q = this.sliceSerialize(P).length;
      H.depth = Q;
    }
  }
  function E() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function Z(P) {
    let H = this.stack[this.stack.length - 1];
    H.depth = this.sliceSerialize(P).codePointAt(0) === 61 ? 1 : 2;
  }
  function ye() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function fe(P) {
    let Q = this.stack[this.stack.length - 1].children,
      y = Q[Q.length - 1];
    ((!y || y.type !== 'text') &&
      ((y = Ln()), (y.position = { start: On(P.start), end: void 0 }), Q.push(y)),
      this.stack.push(y));
  }
  function ge(P) {
    let H = this.stack.pop();
    ((H.value += this.sliceSerialize(P)), (H.position.end = On(P.end)));
  }
  function Ne(P) {
    let H = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      let Q = H.children[H.children.length - 1];
      ((Q.position.end = On(P.end)), (this.data.atHardBreak = void 0));
      return;
    }
    !this.data.setextHeadingSlurpLineEnding &&
      t.canContainEols.includes(H.type) &&
      (fe.call(this, P), ge.call(this, P));
  }
  function ue() {
    this.data.atHardBreak = !0;
  }
  function V() {
    let P = this.resume(),
      H = this.stack[this.stack.length - 1];
    H.value = P;
  }
  function ee() {
    let P = this.resume(),
      H = this.stack[this.stack.length - 1];
    H.value = P;
  }
  function te() {
    let P = this.resume(),
      H = this.stack[this.stack.length - 1];
    H.value = P;
  }
  function Se() {
    let P = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      let H = this.data.referenceType || 'shortcut';
      ((P.type += 'Reference'), (P.referenceType = H), delete P.url, delete P.title);
    } else (delete P.identifier, delete P.label);
    this.data.referenceType = void 0;
  }
  function Ee() {
    let P = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      let H = this.data.referenceType || 'shortcut';
      ((P.type += 'Reference'), (P.referenceType = H), delete P.url, delete P.title);
    } else (delete P.identifier, delete P.label);
    this.data.referenceType = void 0;
  }
  function Xe(P) {
    let H = this.sliceSerialize(P),
      Q = this.stack[this.stack.length - 2];
    ((Q.label = wv(H)), (Q.identifier = ln(H).toLowerCase()));
  }
  function Ye() {
    let P = this.stack[this.stack.length - 1],
      H = this.resume(),
      Q = this.stack[this.stack.length - 1];
    if (((this.data.inReference = !0), Q.type === 'link')) {
      let y = P.children;
      Q.children = y;
    } else Q.alt = H;
  }
  function v() {
    let P = this.resume(),
      H = this.stack[this.stack.length - 1];
    H.url = P;
  }
  function Ue() {
    let P = this.resume(),
      H = this.stack[this.stack.length - 1];
    H.title = P;
  }
  function et() {
    this.data.inReference = void 0;
  }
  function k() {
    this.data.referenceType = 'collapsed';
  }
  function We(P) {
    let H = this.resume(),
      Q = this.stack[this.stack.length - 1];
    ((Q.label = H),
      (Q.identifier = ln(this.sliceSerialize(P)).toLowerCase()),
      (this.data.referenceType = 'full'));
  }
  function Tt(P) {
    this.data.characterReferenceType = P.type;
  }
  function dn(P) {
    let H = this.sliceSerialize(P),
      Q = this.data.characterReferenceType,
      y;
    Q
      ? ((y = Ds(H, Q === 'characterReferenceMarkerNumeric' ? 10 : 16)),
        (this.data.characterReferenceType = void 0))
      : (y = zr(H));
    let D = this.stack[this.stack.length - 1];
    D.value += y;
  }
  function nn(P) {
    let H = this.stack.pop();
    H.position.end = On(P.end);
  }
  function Pe(P) {
    ge.call(this, P);
    let H = this.stack[this.stack.length - 1];
    H.url = this.sliceSerialize(P);
  }
  function Kt(P) {
    ge.call(this, P);
    let H = this.stack[this.stack.length - 1];
    H.url = 'mailto:' + this.sliceSerialize(P);
  }
  function mt() {
    return { type: 'blockquote', children: [] };
  }
  function gt() {
    return { type: 'code', lang: null, meta: null, value: '' };
  }
  function Ge() {
    return { type: 'inlineCode', value: '' };
  }
  function pn() {
    return { type: 'definition', identifier: '', label: null, title: null, url: '' };
  }
  function sr() {
    return { type: 'emphasis', children: [] };
  }
  function Qt() {
    return { type: 'heading', depth: 0, children: [] };
  }
  function Nn() {
    return { type: 'break' };
  }
  function rn() {
    return { type: 'html', value: '' };
  }
  function ar() {
    return { type: 'image', title: null, url: '', alt: null };
  }
  function Pt() {
    return { type: 'link', title: null, url: '', children: [] };
  }
  function Bt(P) {
    return {
      type: 'list',
      ordered: P.type === 'listOrdered',
      start: null,
      spread: P._spread,
      children: [],
    };
  }
  function ur(P) {
    return { type: 'listItem', spread: P._spread, checked: null, children: [] };
  }
  function cr() {
    return { type: 'paragraph', children: [] };
  }
  function qt() {
    return { type: 'strong', children: [] };
  }
  function Ln() {
    return { type: 'text', value: '' };
  }
  function Mn() {
    return { type: 'thematicBreak' };
  }
}
function On(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function Tv(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    let r = t[n];
    Array.isArray(r) ? Tv(e, r) : a1(e, r);
  }
}
function a1(e, t) {
  let n;
  for (n in t)
    if (Sv.call(t, n))
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
function _v(e, t) {
  throw e
    ? new Error(
        'Cannot close `' +
          e.type +
          '` (' +
          Rn({ start: e.start, end: e.end }) +
          '): a different token (`' +
          t.type +
          '`, ' +
          Rn({ start: t.start, end: t.end }) +
          ') is open'
      )
    : new Error(
        'Cannot close document, a token (`' +
          t.type +
          '`, ' +
          Rn({ start: t.start, end: t.end }) +
          ') is still open'
      );
}
var Sv,
  Cv = z(() => {
    xb();
    xv();
    Nc();
    kv();
    Es();
    Cs();
    Sc();
    Sv = {}.hasOwnProperty;
  });
var Dv = z(() => {
  Cv();
});
function ul(e) {
  let t = this;
  t.parser = n;
  function n(r) {
    return al(r, {
      ...t.data('settings'),
      ...e,
      extensions: t.data('micromarkExtensions') || [],
      mdastExtensions: t.data('fromMarkdownExtensions') || [],
    });
  }
}
var Ev = z(() => {
  Dv();
});
var Rv = {};
$i(Rv, { default: () => ul });
var Av = z(() => {
  Ev();
});
function u1(e) {
  let t = [],
    n = -1;
  for (; ++n < e.length; ) t[n] = zs(e[n]);
  return Us(r);
  function r(...i) {
    let o = -1;
    for (; ++o < t.length; ) if (t[o].apply(this, i)) return !0;
    return !1;
  }
}
function c1(e) {
  let t = e;
  return Us(n);
  function n(r) {
    let i = r,
      o;
    for (o in e) if (i[o] !== t[o]) return !1;
    return !0;
  }
}
function l1(e) {
  return Us(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Us(e) {
  return t;
  function t(n, r, i) {
    return !!(d1(n) && e.call(this, n, typeof r == 'number' ? r : void 0, i || void 0));
  }
}
function f1() {
  return !0;
}
function d1(e) {
  return e !== null && typeof e == 'object' && 'type' in e;
}
var zs,
  Pv = z(() => {
    zs = function (e) {
      if (e == null) return f1;
      if (typeof e == 'function') return Us(e);
      if (typeof e == 'object') return Array.isArray(e) ? u1(e) : c1(e);
      if (typeof e == 'string') return l1(e);
      throw new Error('Expected function, string, or object as test');
    };
  });
var qv = z(() => {
  Pv();
});
function Ov(e) {
  return '\x1B[33m' + e + '\x1B[39m';
}
var Iv = z(() => {});
function cl(e, t, n, r) {
  let i;
  typeof t == 'function' && typeof n != 'function' ? ((r = n), (n = t)) : (i = t);
  let o = zs(i),
    s = r ? -1 : 1;
  a(e, void 0, [])();
  function a(u, c, l) {
    let p = u && typeof u == 'object' ? u : {};
    if (typeof p.type == 'string') {
      let h =
        typeof p.tagName == 'string' ? p.tagName : typeof p.name == 'string' ? p.name : void 0;
      Object.defineProperty(m, 'name', {
        value: 'node (' + Ov(u.type + (h ? '<' + h + '>' : '')) + ')',
      });
    }
    return m;
    function m() {
      let h = Fv,
        R,
        I,
        L;
      if ((!t || o(u, c, l[l.length - 1] || void 0)) && ((h = p1(n(u, l))), h[0] === Wr)) return h;
      if ('children' in u && u.children) {
        let A = u;
        if (A.children && h[0] !== qi)
          for (
            I = (r ? A.children.length : -1) + s, L = l.concat(A);
            I > -1 && I < A.children.length;
          ) {
            let S = A.children[I];
            if (((R = a(S, I, L)()), R[0] === Wr)) return R;
            I = typeof R[1] == 'number' ? R[1] : I + s;
          }
      }
      return h;
    }
  }
}
function p1(e) {
  return Array.isArray(e) ? e : typeof e == 'number' ? [Pi, e] : e == null ? Fv : [e];
}
var Fv,
  Pi,
  Wr,
  qi,
  Nv = z(() => {
    qv();
    Iv();
    ((Fv = []), (Pi = !0), (Wr = !1), (qi = 'skip'));
  });
var ll = z(() => {
  Nv();
});
function Lv(e, t, n, r) {
  let i, o, s;
  (typeof t == 'function' && typeof n != 'function'
    ? ((o = void 0), (s = t), (i = n))
    : ((o = t), (s = n), (i = r)),
    cl(e, o, a, i));
  function a(u, c) {
    let l = c[c.length - 1],
      p = l ? l.children.indexOf(u) : void 0;
    return s(u, p, l);
  }
}
var Mv = z(() => {
  ll();
  ll();
});
var jv = {};
$i(jv, { CONTINUE: () => Pi, EXIT: () => Wr, SKIP: () => qi, visit: () => Lv });
var Bv = z(() => {
  Mv();
});
var Ws = O(($r) => {
  'use strict';
  var Hv =
    ($r && $r.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty($r, '__esModule', { value: !0 });
  $r.parseDocument = v1;
  $r.parseHttpBlock = S1;
  var h1 = Hv(xc()),
    m1 = (gb(), ia(mb)),
    g1 = Hv((Av(), ia(Rv))),
    zv = (Bv(), ia(jv)),
    y1 = /^omg\.(path|query|headers|body|response|returns|example|type|errors|config)(\.(\d+))?$/,
    b1 = /@when\((\w+)\s*=\s*"([^"]+)"\)/,
    fl = /\{\{>\s*([^}\s]+)\s*\}\}/g;
  function v1(e, t) {
    let { data: n, content: r } = (0, h1.default)(e),
      i = (0, m1.unified)().use(g1.default).parse(r),
      o = x1(i),
      s = w1(i, r),
      a = k1(i),
      u = _1(r);
    return {
      filePath: t,
      frontMatter: Object.keys(n).length > 0 ? n : null,
      title: o,
      description: s,
      blocks: a,
      partials: u,
    };
  }
  function x1(e) {
    let t = null;
    return (
      (0, zv.visit)(e, 'heading', (n) => {
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
  function w1(e, t) {
    let n = [],
      r = !1;
    for (let i of e.children) {
      if (i.type === 'heading' && i.depth === 1 && !r) {
        r = !0;
        continue;
      }
      if (i.type !== 'code') {
        if (i.type === 'paragraph') {
          let o = Uv(i);
          if (fl.test(o)) continue;
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
  function Uv(e) {
    return e.type === 'text' ? e.value : e.children ? e.children.map(Uv).join('') : '';
  }
  function k1(e) {
    let t = [];
    return (
      (0, zv.visit)(e, 'code', (n) => {
        let r = n.lang || '',
          i = n.position?.start.line || 0;
        if (r === 'http') {
          t.push({ type: 'http', content: n.value, line: i });
          return;
        }
        let o = r.match(y1);
        if (o) {
          let s = `omg.${o[1]}`,
            a = o[3] ? parseInt(o[3], 10) : void 0,
            u;
          if (n.meta) {
            let c = n.meta.match(b1);
            c && (u = { field: c[1], value: c[2] });
          }
          t.push({ type: s, statusCode: a, content: n.value, line: i, whenCondition: u });
        }
      }),
      t
    );
  }
  function _1(e) {
    let t = [];
    return (
      e
        .split(
          `
`
        )
        .forEach((r, i) => {
          let o;
          for (fl.lastIndex = 0; (o = fl.exec(r)) !== null; ) t.push({ path: o[1], line: i + 1 });
        }),
      t
    );
  }
  function S1(e) {
    let n = e.trim().match(/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+(.+)$/i);
    return n ? { method: n[1].toUpperCase(), path: n[2].trim() } : null;
  }
});
var Vs = O(($s) => {
  'use strict';
  Object.defineProperty($s, '__esModule', { value: !0 });
  $s.parseSchema = T1;
  $s.inferSchemaFromJson = hl;
  var dl = class {
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
    pl = class {
      currentToken;
      lexer;
      constructor(t) {
        ((this.lexer = new dl(t)), (this.currentToken = this.lexer.nextToken()));
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
                throw new Error(
                  `Unexpected token in annotation args: ${this.currentToken.type} at line ${this.currentToken.line}, column ${this.currentToken.column}. Expected string, number, boolean, or identifier.`
                );
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
          let n = this.advance().value;
          if (this.check('LBRACKET')) {
            (this.advance(), this.expect('RBRACKET'));
            let s = this.check('QUESTION');
            s && this.advance();
            let a = this.parseAnnotations(),
              u = [
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
              ],
              c;
            if (u.includes(n.toLowerCase())) {
              let l = n.toLowerCase();
              (l === 'int' && (l = 'integer'),
                l === 'bool' && (l = 'boolean'),
                (c = { kind: 'primitive', type: l, annotations: [] }));
            } else c = { kind: 'reference', name: n, annotations: [] };
            return { kind: 'array', items: c, optional: s, annotations: a };
          }
          let r = this.check('QUESTION');
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
          else
            throw new Error(
              `Expected property key (string or identifier) at line ${this.currentToken.line}, column ${this.currentToken.column}, but found '${this.currentToken.type}'`
            );
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
  function T1(e) {
    return new pl(e).parse();
  }
  function hl(e) {
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
        : { kind: 'array', items: hl(e[0]), annotations: [] };
    if (typeof e == 'object') {
      let t = {};
      for (let [n, r] of Object.entries(e)) t[n] = hl(r);
      return { kind: 'object', properties: t, annotations: [] };
    }
    return { kind: 'primitive', type: 'any', annotations: [] };
  }
});
var gl = O((ml) => {
  'use strict';
  Object.defineProperty(ml, '__esModule', { value: !0 });
  ml.parseReturnsBlock = D1;
  var C1 = Vs();
  function D1(e) {
    let t = [],
      n = [],
      r = e.split(`
`),
      i = null,
      o = '',
      s = '',
      a = !1,
      u = 0,
      c = () => {
        if (i && i.statusCode !== void 0) {
          let l = E1(o.trim());
          ((i.schema = l.schema),
            l.warning && ((l.warning.line = u), n.push(l.warning)),
            s && (i.condition = s.trim()),
            t.push(i));
        }
      };
    for (let l = 0; l < r.length; l++) {
      let m = r[l].trim();
      if (!m || m === '{' || m === '}') continue;
      let h = m.match(/^(\d+)\s*:\s*(.*)$/);
      if (h) {
        (c(),
          (i = { statusCode: parseInt(h[1], 10) }),
          (o = h[2]),
          (s = ''),
          (a = !1),
          (u = l + 1));
        continue;
      }
      let R = m.match(/^when\s+(.*)$/);
      if (R) {
        ((a = !0), (s = R[1]));
        continue;
      }
      let I = m.match(/^["'](.*)["']$/);
      if (I && i) {
        ((i.description = I[1]), (a = !1));
        continue;
      }
      a ? (s += ' ' + m) : i && (o += ' ' + m);
    }
    return (c(), { block: { responses: t }, warnings: n });
  }
  function E1(e) {
    if (!e || e === 'void') return { schema: null };
    try {
      return { schema: (0, C1.parseSchema)(e) };
    } catch (t) {
      let n = e.split(/\s/)[0];
      return {
        schema: { kind: 'reference', name: n, annotations: [] },
        warning: {
          message: `Failed to parse type '${e}', treating as reference '${n}'. Error: ${t.message}`,
          context: e,
        },
      };
    }
  }
});
var vl = O((At) => {
  'use strict';
  var R1 =
      (At && At.__createBinding) ||
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
    A1 =
      (At && At.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, 'default', { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    $v =
      (At && At.__importStar) ||
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
            for (var r = e(t), i = 0; i < r.length; i++) r[i] !== 'default' && R1(n, t, r[i]);
          return (A1(n, t), n);
        };
      })();
  Object.defineProperty(At, '__esModule', { value: !0 });
  At.resolveDocument = yl;
  At.extractTypeName = Vv;
  At.buildEndpoint = O1;
  At.buildEndpoints = bl;
  At.loadApi = N1;
  var rr = $v(require('fs')),
    Vt = $v(require('path')),
    Ys = Ws(),
    Wv = Vs(),
    P1 = gl();
  function yl(e, t, n = new Set()) {
    let r = Vt.resolve(t.basePath, e.filePath),
      i = [];
    if (n.has(r)) throw new Error(`Circular partial reference detected: ${r}`);
    n.add(r);
    let o = [...e.blocks];
    for (let s of e.partials) {
      let a = q1(s.path, t.basePath);
      if (!rr.existsSync(a)) throw new Error(`Partial not found: ${s.path} (resolved to ${a})`);
      let u = rr.readFileSync(a, 'utf-8'),
        c = (0, Ys.parseDocument)(u, s.path),
        l = yl(c, t, n);
      (o.push(...l.resolvedBlocks), i.push(...l.warnings));
    }
    for (let s of o)
      if (s.type !== 'http') {
        if (s.type === 'omg.returns') {
          try {
            let a = (0, P1.parseReturnsBlock)(s.content);
            s.parsedResponses = a.block;
            for (let u of a.warnings)
              i.push({ ...u, message: `[${s.type} at line ${s.line}] ${u.message}` });
          } catch (a) {
            throw new Error(`Failed to parse returns block at line ${s.line}: ${a.message}`);
          }
          continue;
        }
        if (!s.parsed) {
          if (!s.content || s.content.trim() === '') continue;
          let a = s.content;
          if (s.type === 'omg.type') {
            let u = a.match(/^\s*type\s+[A-Za-z_][A-Za-z0-9_]*\s*=\s*/);
            u && (a = a.slice(u[0].length));
          }
          try {
            s.parsed = (0, Wv.parseSchema)(a);
          } catch (u) {
            try {
              let c = JSON.parse(a);
              s.parsed = (0, Wv.inferSchemaFromJson)(c);
            } catch {
              throw new Error(`Failed to parse ${s.type} block at line ${s.line}: ${u.message}`);
            }
          }
        }
      }
    return { ...e, resolvedBlocks: o, warnings: i };
  }
  function q1(e, t) {
    let n = t,
      r = Vt.parse(n).root;
    for (; n !== r; ) {
      let i = [Vt.join(n, 'partials', `${e}.omg.md`), Vt.join(n, 'partials', e, 'index.omg.md')];
      for (let s of i) if (rr.existsSync(s)) return s;
      let o = Vt.join(n, 'partials');
      if (rr.existsSync(o)) return i[0];
      n = Vt.dirname(n);
    }
    return Vt.join(t, 'partials', `${e}.omg.md`);
  }
  function Vv(e) {
    let t = e.match(/^\s*type\s+([A-Z][a-zA-Z0-9_]*)/);
    return t ? t[1] : null;
  }
  function O1(e) {
    let t = bl(e);
    return t.length > 0 ? t[0] : null;
  }
  function bl(e) {
    let t = e.frontMatter,
      n = null,
      r = null;
    if (t?.method && t?.path) ((n = t.method), (r = t.path));
    else {
      let o = e.resolvedBlocks.find((s) => s.type === 'http');
      if (o) {
        let s = (0, Ys.parseHttpBlock)(o.content);
        s && ((n = s.method), (r = s.path));
      }
    }
    if (!n || !r) return [];
    let i = t?.expandVariants;
    return i ? I1(e, n, r, i, t) : [F1(e, n, r, t)];
  }
  function I1(e, t, n, r, i) {
    let o = new Set();
    for (let a of e.resolvedBlocks)
      a.whenCondition && a.whenCondition.field === r && o.add(a.whenCondition.value);
    if (o.size === 0) return [];
    let s = [];
    for (let a of o) {
      let u = e.resolvedBlocks.filter((j) =>
          j.whenCondition ? j.whenCondition.field === r && j.whenCondition.value === a : !0
        ),
        l = `${
          i?.operationId ||
          `${t.toLowerCase()}-${n
            .replace(/[{}\/]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')}`
        }-${a}`,
        p = `${n}#${a}`,
        m = i?.summary || e.title || '',
        h = m ? `${m} (${a})` : a,
        R = u.find((j) => j.type === 'omg.path'),
        I = u.find((j) => j.type === 'omg.query'),
        L = u.find((j) => j.type === 'omg.headers'),
        A = u.find((j) => j.type === 'omg.body'),
        S = u.filter((j) => j.type === 'omg.returns'),
        x = u.filter((j) => j.type === 'omg.response' || j.type.startsWith('omg.response.')),
        F = {};
      for (let j of S)
        if (j.parsedResponses)
          for (let E of j.parsedResponses.responses)
            F[E.statusCode] = {
              schema: E.schema,
              condition: E.condition,
              description: E.description,
            };
      for (let j of x) {
        let E = j.statusCode || 200;
        j.parsed && (F[E] || (F[E] = { schema: j.parsed }));
      }
      s.push({
        method: t,
        path: p,
        operationId: l,
        tags: i?.tags || [],
        summary: h,
        description: e.description,
        deprecated: i?.deprecated || !1,
        follows: i?.follows || [],
        webhooks: i?.webhooks || {},
        parameters: {
          path: R?.parsed || null,
          query: I?.parsed || null,
          headers: L?.parsed || null,
        },
        requestBody: A?.parsed || null,
        responses: F,
      });
    }
    return s;
  }
  function F1(e, t, n, r) {
    let i =
        r?.operationId ||
        `${t.toLowerCase()}-${n
          .replace(/[{}\/]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')}`,
      o = e.resolvedBlocks.find((m) => m.type === 'omg.path'),
      s = e.resolvedBlocks.find((m) => m.type === 'omg.query'),
      a = e.resolvedBlocks.find((m) => m.type === 'omg.headers'),
      u = e.resolvedBlocks.find((m) => m.type === 'omg.body'),
      c = e.resolvedBlocks.filter((m) => m.type === 'omg.returns'),
      l = e.resolvedBlocks.filter(
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
    for (let m of l) {
      let h = m.statusCode || 200;
      m.parsed && (p[h] || (p[h] = { schema: m.parsed }));
    }
    return {
      method: t,
      path: n,
      operationId: i,
      tags: r?.tags || [],
      summary: r?.summary || e.title || '',
      description: e.description,
      deprecated: r?.deprecated || !1,
      follows: r?.follows || [],
      webhooks: r?.webhooks || {},
      parameters: { path: o?.parsed || null, query: s?.parsed || null, headers: a?.parsed || null },
      requestBody: u?.parsed || null,
      responses: p,
      security: r?.security,
      servers: r?.servers,
      externalDocs: r?.externalDocs,
      extensions: r?.extensions,
    };
  }
  function N1(e) {
    let t = Vt.dirname(e),
      n = rr.readFileSync(e, 'utf-8'),
      r = (0, Ys.parseDocument)(n, Vt.basename(e)),
      i = r.frontMatter,
      o = L1(t),
      s = [],
      a = {};
    for (let u of o) {
      let c = rr.readFileSync(u, 'utf-8'),
        l = (0, Ys.parseDocument)(c, Vt.relative(t, u)),
        p = yl(l, { basePath: t }),
        m = p.resolvedBlocks.filter((R) => R.type === 'omg.type');
      for (let R of m) {
        let I = Vv(R.content);
        I && R.parsed && (a[I] = R.parsed);
      }
      let h = bl(p);
      s.push(...h);
    }
    return {
      name: i?.name || 'API',
      version: i?.version || '1.0.0',
      baseUrl: i?.baseUrl || '',
      description: r.description,
      endpoints: s,
      types: a,
      contact: i?.contact,
      servers: i?.servers,
      security: i?.security,
      securitySchemes: i?.securitySchemes,
      license: i?.license,
      termsOfService: i?.termsOfService,
      externalDocs: i?.externalDocs,
      tags: i?.tags,
      extensions: i?.extensions,
    };
  }
  function L1(e) {
    let t = [];
    function n(r) {
      let i = rr.readdirSync(r, { withFileTypes: !0 });
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
var Yv = O((Oi) => {
  'use strict';
  var M1 =
    (Oi && Oi.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(Oi, '__esModule', { value: !0 });
  Oi.formatDocument = H1;
  var j1 = M1(xc()),
    B1 = [
      'method',
      'path',
      'operationId',
      'tags',
      'summary',
      'deprecated',
      'auth',
      'follows',
      'webhooks',
    ];
  function H1(e, t = {}) {
    let n = t.indent ?? 2,
      r = t.sortFrontmatter ?? !0,
      i = t.frontmatterOrder ?? B1,
      o = (0, j1.default)(e),
      s = o.data,
      a = o.content,
      u = z1(s, r, i),
      c = U1(a, n);
    return Object.keys(s).length > 0
      ? `---
${u}---
${c}`
      : c;
  }
  function z1(e, t, n) {
    if (Object.keys(e).length === 0) return '';
    let r = Object.keys(e);
    t &&
      (r = r.sort((o, s) => {
        let a = n.indexOf(o),
          u = n.indexOf(s);
        return a !== -1 && u !== -1 ? a - u : a !== -1 ? -1 : u !== -1 ? 1 : o.localeCompare(s);
      }));
    let i = [];
    for (let o of r) {
      let s = e[o];
      i.push(xl(o, s, 0));
    }
    return (
      i.join(`
`) +
      `
`
    );
  }
  function xl(e, t, n) {
    let r = '  '.repeat(n);
    if (t == null) return `${r}${e}:`;
    if (typeof t == 'string')
      return t.includes(':') ||
        t.includes('#') ||
        t.includes(`
`) ||
        t === ''
        ? `${r}${e}: "${t.replace(/"/g, '\\"')}"`
        : `${r}${e}: ${t}`;
    if (typeof t == 'number' || typeof t == 'boolean') return `${r}${e}: ${t}`;
    if (Array.isArray(t)) {
      if (t.every((o) => typeof o == 'string' || typeof o == 'number')) {
        let o = t.map((s) => (typeof s == 'string' ? s : String(s)));
        return `${r}${e}: [${o.join(', ')}]`;
      }
      let i = t.map((o) => {
        if (typeof o == 'object' && o !== null) {
          let s = Object.entries(o).map(([a, u]) => xl(a, u, n + 2));
          return `${r}  -
${s.join(`
`)}`;
        }
        return `${r}  - ${o}`;
      });
      return `${r}${e}:
${i.join(`
`)}`;
    }
    if (typeof t == 'object') {
      let i = Object.entries(t).map(([o, s]) => xl(o, s, n + 1));
      return `${r}${e}:
${i.join(`
`)}`;
    }
    return `${r}${e}: ${String(t)}`;
  }
  function U1(e, t) {
    let n = e.split(`
`),
      r = [],
      i = !1,
      o = '',
      s = [];
    for (let a of n) {
      let u = a.match(/^```(\S*)/);
      if (u && !i) {
        ((i = !0), (o = u[1]), (s = []), r.push(a));
        continue;
      }
      if (a.trim() === '```' && i) {
        if (W1(o)) {
          let c = $1(
            s.join(`
`),
            t
          );
          r.push(c);
        } else if (o === 'omg.example' || o === 'json') {
          let c = Y1(
            s.join(`
`),
            t
          );
          r.push(c);
        } else r.push(...s);
        (r.push('```'), (i = !1), (o = ''), (s = []));
        continue;
      }
      i ? s.push(a) : r.push(a);
    }
    return r.join(`
`);
  }
  function W1(e) {
    return e.startsWith('omg.') && e !== 'omg.example' && e !== 'omg.config';
  }
  function $1(e, t) {
    let n = e.trim();
    if (!n) return '';
    try {
      return V1(n, t);
    } catch {
      return e;
    }
  }
  function V1(e, t) {
    let n = ' '.repeat(t),
      r = [],
      i = 0,
      o = 0,
      s = '',
      a = e.split('');
    for (; o < a.length; ) {
      let c = a[o];
      if (c === '"' || c === "'") {
        let l = c;
        for (s += c, o++; o < a.length && a[o] !== l; )
          a[o] === '\\' && o + 1 < a.length
            ? ((s += a[o] + a[o + 1]), (o += 2))
            : ((s += a[o]), o++);
        o < a.length && ((s += a[o]), o++);
        continue;
      }
      if (c === '/' && a[o + 1] === '/') {
        for (
          ;
          o < a.length &&
          a[o] !==
            `
`;
        )
          ((s += a[o]), o++);
        continue;
      }
      if (c === '{' || c === '[') {
        s += c;
        let l = s.trim();
        (l && r.push(n.repeat(i) + l), i++, (s = ''), o++);
        continue;
      }
      if (c === '}' || c === ']') {
        let l = s.trim();
        for (l && r.push(n.repeat(i) + l), i = Math.max(0, i - 1), s = c, o++; o < a.length; ) {
          let p = a[o];
          if (p === '?' || p === '@' || p === ',') {
            if (((s += p), o++, p === '@'))
              for (
                ;
                o < a.length &&
                a[o] !== ',' &&
                a[o] !==
                  `
` &&
                a[o] !== '}' &&
                a[o] !== ']';
              )
                ((s += a[o]), o++);
          } else if (p === ' ' || p === '	') o++;
          else break;
        }
        (r.push(n.repeat(i) + s.trim()), (s = ''));
        continue;
      }
      if (c === ',') {
        s += c;
        let l = s.trim();
        (l && r.push(n.repeat(i) + l), (s = ''), o++);
        continue;
      }
      if (
        c ===
        `
`
      ) {
        let l = s.trim();
        (l && (r.push(n.repeat(i) + l), (s = '')), o++);
        continue;
      }
      ((s += c), o++);
    }
    let u = s.trim();
    return (
      u && r.push(n.repeat(i) + u),
      r.join(`
`)
    );
  }
  function Y1(e, t) {
    let n = e.trim();
    if (!n) return '';
    try {
      let r = JSON.parse(n);
      return JSON.stringify(r, null, t);
    } catch {
      return e;
    }
  }
});
var Jv = O((Yt) => {
  'use strict';
  var G1 =
      (Yt && Yt.__createBinding) ||
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
    K1 =
      (Yt && Yt.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, 'default', { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    Kv =
      (Yt && Yt.__importStar) ||
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
            for (var r = e(t), i = 0; i < r.length; i++) r[i] !== 'default' && G1(n, t, r[i]);
          return (K1(n, t), n);
        };
      })();
  Object.defineProperty(Yt, '__esModule', { value: !0 });
  Yt.buildTypeIndex = J1;
  Yt.findTypeDefinition = Z1;
  Yt.getTypeNames = X1;
  var Qv = Kv(require('fs')),
    wl = Kv(require('path')),
    Q1 = Ws(),
    Gv = vl();
  function J1(e) {
    let t = new Map(),
      n = eD(e);
    for (let r of n)
      try {
        let i = Qv.readFileSync(r, 'utf-8'),
          o = (0, Q1.parseDocument)(i, wl.relative(e, r)),
          s = o.blocks;
        try {
          s = (0, Gv.resolveDocument)(o, { basePath: wl.dirname(r) }).resolvedBlocks;
        } catch {}
        for (let a of s)
          if (a.type === 'omg.type' && a.parsed) {
            let u = (0, Gv.extractTypeName)(a.content);
            u && t.set(u, { name: u, schema: a.parsed, filePath: r, line: a.line });
          }
      } catch {}
    return { types: t };
  }
  function Z1(e, t) {
    return e.types.get(t);
  }
  function X1(e) {
    return Array.from(e.types.keys());
  }
  function eD(e) {
    let t = [];
    function n(r) {
      let i;
      try {
        i = Qv.readdirSync(r, { withFileTypes: !0 });
      } catch {
        return;
      }
      for (let o of i) {
        let s = wl.join(r, o.name);
        o.isDirectory()
          ? o.name !== 'node_modules' &&
            o.name !== '.git' &&
            o.name !== 'dist' &&
            o.name !== 'build' &&
            n(s)
          : o.name.endsWith('.omg.md') && t.push(s);
      }
    }
    return (n(e), t);
  }
});
var Zv = O((Gs) => {
  'use strict';
  Object.defineProperty(Gs, '__esModule', { value: !0 });
  Gs.serializeType = Yr;
  Gs.formatTypeForHover = iD;
  function Yr(e, t = 0) {
    let n = '  '.repeat(t);
    switch (e.kind) {
      case 'primitive':
        return tD(e.type, e);
      case 'reference':
        return Vr(e.name, e);
      case 'array':
        return Vr(`${Yr(e.items)}[]`, e);
      case 'enum':
        let r = e.values.map((s) => (typeof s == 'string' ? `"${s}"` : String(s)));
        return Vr(r.join(' | '), e);
      case 'union':
        let i = e.types.map((s) => Yr(s));
        return Vr(i.join(' | '), e);
      case 'intersection':
        let o = e.types.map((s) => Yr(s));
        return Vr(o.join(' & '), e);
      case 'object':
        return rD(e, t);
      default:
        return 'unknown';
    }
  }
  function tD(e, t) {
    return Vr(e, t);
  }
  function Vr(e, t) {
    let n = e;
    if ((t.optional, t.annotations.length > 0)) {
      let r = t.annotations.map(nD);
      n += ' ' + r.join(' ');
    }
    return n;
  }
  function nD(e) {
    if (e.args.length === 0) return `@${e.name}`;
    let t = e.args.map((n) => (typeof n == 'string' ? `"${n}"` : String(n)));
    return `@${e.name}(${t.join(', ')})`;
  }
  function rD(e, t) {
    let n = Object.entries(e.properties);
    if (n.length === 0) return '{}';
    let r = '  '.repeat(t),
      i = '  '.repeat(t + 1);
    return `{
${n.map(([s, a]) => {
  let u = a.optional ? '?' : '',
    c = Yr(a, t + 1),
    l = a.description ? `  // ${a.description}` : '';
  return `${i}${s}${u}: ${c}${l}`;
}).join(`,
`)}
${r}}`;
  }
  function iD(e, t, n) {
    let r = [`**${e}**`];
    if (n) {
      let i = n.split('/').pop() || n;
      r.push(`
Defined in \`${i}\``);
    }
    return (
      r.push(`
\`\`\`omg
${Yr(t)}
\`\`\``),
      r.join('')
    );
  }
});
var n0 = O((xe) => {
  'use strict';
  Object.defineProperty(xe, '__esModule', { value: !0 });
  xe.formatTypeForHover =
    xe.serializeType =
    xe.getTypeNames =
    xe.findTypeDefinition =
    xe.buildTypeIndex =
    xe.formatDocument =
    xe.loadApi =
    xe.buildEndpoints =
    xe.buildEndpoint =
    xe.resolveDocument =
    xe.parseReturnsBlock =
    xe.inferSchemaFromJson =
    xe.parseSchema =
    xe.parseHttpBlock =
    xe.parseDocument =
      void 0;
  var Xv = Ws();
  Object.defineProperty(xe, 'parseDocument', {
    enumerable: !0,
    get: function () {
      return Xv.parseDocument;
    },
  });
  Object.defineProperty(xe, 'parseHttpBlock', {
    enumerable: !0,
    get: function () {
      return Xv.parseHttpBlock;
    },
  });
  var e0 = Vs();
  Object.defineProperty(xe, 'parseSchema', {
    enumerable: !0,
    get: function () {
      return e0.parseSchema;
    },
  });
  Object.defineProperty(xe, 'inferSchemaFromJson', {
    enumerable: !0,
    get: function () {
      return e0.inferSchemaFromJson;
    },
  });
  var oD = gl();
  Object.defineProperty(xe, 'parseReturnsBlock', {
    enumerable: !0,
    get: function () {
      return oD.parseReturnsBlock;
    },
  });
  var Ks = vl();
  Object.defineProperty(xe, 'resolveDocument', {
    enumerable: !0,
    get: function () {
      return Ks.resolveDocument;
    },
  });
  Object.defineProperty(xe, 'buildEndpoint', {
    enumerable: !0,
    get: function () {
      return Ks.buildEndpoint;
    },
  });
  Object.defineProperty(xe, 'buildEndpoints', {
    enumerable: !0,
    get: function () {
      return Ks.buildEndpoints;
    },
  });
  Object.defineProperty(xe, 'loadApi', {
    enumerable: !0,
    get: function () {
      return Ks.loadApi;
    },
  });
  var sD = Yv();
  Object.defineProperty(xe, 'formatDocument', {
    enumerable: !0,
    get: function () {
      return sD.formatDocument;
    },
  });
  var kl = Jv();
  Object.defineProperty(xe, 'buildTypeIndex', {
    enumerable: !0,
    get: function () {
      return kl.buildTypeIndex;
    },
  });
  Object.defineProperty(xe, 'findTypeDefinition', {
    enumerable: !0,
    get: function () {
      return kl.findTypeDefinition;
    },
  });
  Object.defineProperty(xe, 'getTypeNames', {
    enumerable: !0,
    get: function () {
      return kl.getTypeNames;
    },
  });
  var t0 = Zv();
  Object.defineProperty(xe, 'serializeType', {
    enumerable: !0,
    get: function () {
      return t0.serializeType;
    },
  });
  Object.defineProperty(xe, 'formatTypeForHover', {
    enumerable: !0,
    get: function () {
      return t0.formatTypeForHover;
    },
  });
});
var Y = hn(mm(), 1);
var cs = class e {
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
          let i = bm(r.range),
            o = this.offsetAt(i.start),
            s = this.offsetAt(i.end);
          this._content =
            this._content.substring(0, o) +
            r.text +
            this._content.substring(s, this._content.length);
          let a = Math.max(i.start.line, 0),
            u = Math.max(i.end.line, 0),
            c = this._lineOffsets,
            l = gm(r.text, !1, o);
          if (u - a === l.length) for (let m = 0, h = l.length; m < h; m++) c[m + a + 1] = l[m];
          else
            l.length < 1e4
              ? c.splice(a + 1, u - a, ...l)
              : (this._lineOffsets = c = c.slice(0, a + 1).concat(l, c.slice(u + 1)));
          let p = r.text.length - (s - o);
          if (p !== 0) for (let m = a + 1 + l.length, h = c.length; m < h; m++) c[m] = c[m] + p;
        } else if (e.isFull(r)) ((this._content = r.text), (this._lineOffsets = void 0));
        else throw new Error('Unknown change event received');
      this._version = n;
    }
    getLineOffsets() {
      return (
        this._lineOffsets === void 0 && (this._lineOffsets = gm(this._content, !0)),
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
      for (; t > n && ym(this._content.charCodeAt(t - 1)); ) t--;
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
  ls;
(function (e) {
  function t(i, o, s, a) {
    return new cs(i, o, s, a);
  }
  e.create = t;
  function n(i, o, s) {
    if (i instanceof cs) return (i.update(o, s), i);
    throw new Error('TextDocument.update: document must be created by TextDocument.create');
  }
  e.update = n;
  function r(i, o) {
    let s = i.getText(),
      a = rc(o.map(yk), (l, p) => {
        let m = l.range.start.line - p.range.start.line;
        return m === 0 ? l.range.start.character - p.range.start.character : m;
      }),
      u = 0,
      c = [];
    for (let l of a) {
      let p = i.offsetAt(l.range.start);
      if (p < u) throw new Error('Overlapping edit');
      (p > u && c.push(s.substring(u, p)),
        l.newText.length && c.push(l.newText),
        (u = i.offsetAt(l.range.end)));
    }
    return (c.push(s.substr(u)), c.join(''));
  }
  e.applyEdits = r;
})(ls || (ls = {}));
function rc(e, t) {
  if (e.length <= 1) return e;
  let n = (e.length / 2) | 0,
    r = e.slice(0, n),
    i = e.slice(n);
  (rc(r, t), rc(i, t));
  let o = 0,
    s = 0,
    a = 0;
  for (; o < r.length && s < i.length; ) t(r[o], i[s]) <= 0 ? (e[a++] = r[o++]) : (e[a++] = i[s++]);
  for (; o < r.length; ) e[a++] = r[o++];
  for (; s < i.length; ) e[a++] = i[s++];
  return e;
}
function gm(e, t, n = 0) {
  let r = t ? [n] : [];
  for (let i = 0; i < e.length; i++) {
    let o = e.charCodeAt(i);
    ym(o) && (o === 13 && i + 1 < e.length && e.charCodeAt(i + 1) === 10 && i++, r.push(n + i + 1));
  }
  return r;
}
function ym(e) {
  return e === 13 || e === 10;
}
function bm(e) {
  let t = e.start,
    n = e.end;
  return t.line > n.line || (t.line === n.line && t.character > n.character)
    ? { start: n, end: t }
    : e;
}
function yk(e) {
  let t = bm(e.range);
  return t !== e.range ? { newText: e.newText, range: t } : e;
}
var ra = require('url'),
  Y0 = hn(require('path'), 1),
  Gt = hn(n0(), 1);
var Bi = hn(require('fs'), 1),
  Zr = hn(require('path'), 1);
function b0(e) {
  return typeof e > 'u' || e === null;
}
function aD(e) {
  return typeof e == 'object' && e !== null;
}
function uD(e) {
  return Array.isArray(e) ? e : b0(e) ? [] : [e];
}
function cD(e, t) {
  var n, r, i, o;
  if (t) for (o = Object.keys(t), n = 0, r = o.length; n < r; n += 1) ((i = o[n]), (e[i] = t[i]));
  return e;
}
function lD(e, t) {
  var n = '',
    r;
  for (r = 0; r < t; r += 1) n += e;
  return n;
}
function fD(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var dD = b0,
  pD = aD,
  hD = uD,
  mD = lD,
  gD = fD,
  yD = cD,
  Ve = { isNothing: dD, isObject: pD, toArray: hD, repeat: mD, isNegativeZero: gD, extend: yD };
function v0(e, t) {
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
function Fi(e, t) {
  (Error.call(this),
    (this.name = 'YAMLException'),
    (this.reason = e),
    (this.mark = t),
    (this.message = v0(this, !1)),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack || ''));
}
Fi.prototype = Object.create(Error.prototype);
Fi.prototype.constructor = Fi;
Fi.prototype.toString = function (t) {
  return this.name + ': ' + v0(this, t);
};
var _t = Fi;
function _l(e, t, n, r, i) {
  var o = '',
    s = '',
    a = Math.floor(i / 2) - 1;
  return (
    r - t > a && ((o = ' ... '), (t = r - a + o.length)),
    n - r > a && ((s = ' ...'), (n = r + a - s.length)),
    { str: o + e.slice(t, n).replace(/\t/g, '\u2192') + s, pos: r - t + o.length }
  );
}
function Sl(e, t) {
  return Ve.repeat(' ', t - e.length) + e;
}
function bD(e, t) {
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
    l = Math.min(e.line + t.linesAfter, i.length).toString().length,
    p = t.maxLength - (t.indent + l + 3);
  for (u = 1; u <= t.linesBefore && !(s - u < 0); u++)
    ((c = _l(e.buffer, r[s - u], i[s - u], e.position - (r[s] - r[s - u]), p)),
      (a =
        Ve.repeat(' ', t.indent) +
        Sl((e.line - u + 1).toString(), l) +
        ' | ' +
        c.str +
        `
` +
        a));
  for (
    c = _l(e.buffer, r[s], i[s], e.position, p),
      a +=
        Ve.repeat(' ', t.indent) +
        Sl((e.line + 1).toString(), l) +
        ' | ' +
        c.str +
        `
`,
      a +=
        Ve.repeat('-', t.indent + l + 3 + c.pos) +
        `^
`,
      u = 1;
    u <= t.linesAfter && !(s + u >= i.length);
    u++
  )
    ((c = _l(e.buffer, r[s + u], i[s + u], e.position - (r[s] - r[s + u]), p)),
      (a +=
        Ve.repeat(' ', t.indent) +
        Sl((e.line + u + 1).toString(), l) +
        ' | ' +
        c.str +
        `
`));
  return a.replace(/\n$/, '');
}
var vD = bD,
  xD = [
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
  wD = ['scalar', 'sequence', 'mapping'];
function kD(e) {
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
function _D(e, t) {
  if (
    ((t = t || {}),
    Object.keys(t).forEach(function (n) {
      if (xD.indexOf(n) === -1)
        throw new _t('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
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
    (this.styleAliases = kD(t.styleAliases || null)),
    wD.indexOf(this.kind) === -1)
  )
    throw new _t('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var ct = _D;
function r0(e, t) {
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
function SD() {
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
function Cl(e) {
  return this.extend(e);
}
Cl.prototype.extend = function (t) {
  var n = [],
    r = [];
  if (t instanceof ct) r.push(t);
  else if (Array.isArray(t)) r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    (t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit)));
  else
    throw new _t(
      'Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })'
    );
  (n.forEach(function (o) {
    if (!(o instanceof ct))
      throw new _t(
        'Specified list of YAML types (or a single Type object) contains a non-Type object.'
      );
    if (o.loadKind && o.loadKind !== 'scalar')
      throw new _t(
        'There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.'
      );
    if (o.multi)
      throw new _t(
        'There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.'
      );
  }),
    r.forEach(function (o) {
      if (!(o instanceof ct))
        throw new _t(
          'Specified list of YAML types (or a single Type object) contains a non-Type object.'
        );
    }));
  var i = Object.create(Cl.prototype);
  return (
    (i.implicit = (this.implicit || []).concat(n)),
    (i.explicit = (this.explicit || []).concat(r)),
    (i.compiledImplicit = r0(i, 'implicit')),
    (i.compiledExplicit = r0(i, 'explicit')),
    (i.compiledTypeMap = SD(i.compiledImplicit, i.compiledExplicit)),
    i
  );
};
var TD = Cl,
  CD = new ct('tag:yaml.org,2002:str', {
    kind: 'scalar',
    construct: function (e) {
      return e !== null ? e : '';
    },
  }),
  DD = new ct('tag:yaml.org,2002:seq', {
    kind: 'sequence',
    construct: function (e) {
      return e !== null ? e : [];
    },
  }),
  ED = new ct('tag:yaml.org,2002:map', {
    kind: 'mapping',
    construct: function (e) {
      return e !== null ? e : {};
    },
  }),
  RD = new TD({ explicit: [CD, DD, ED] });
function AD(e) {
  if (e === null) return !0;
  var t = e.length;
  return (t === 1 && e === '~') || (t === 4 && (e === 'null' || e === 'Null' || e === 'NULL'));
}
function PD() {
  return null;
}
function qD(e) {
  return e === null;
}
var OD = new ct('tag:yaml.org,2002:null', {
  kind: 'scalar',
  resolve: AD,
  construct: PD,
  predicate: qD,
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
function ID(e) {
  if (e === null) return !1;
  var t = e.length;
  return (
    (t === 4 && (e === 'true' || e === 'True' || e === 'TRUE')) ||
    (t === 5 && (e === 'false' || e === 'False' || e === 'FALSE'))
  );
}
function FD(e) {
  return e === 'true' || e === 'True' || e === 'TRUE';
}
function ND(e) {
  return Object.prototype.toString.call(e) === '[object Boolean]';
}
var LD = new ct('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: ID,
  construct: FD,
  predicate: ND,
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
function MD(e) {
  return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
}
function jD(e) {
  return 48 <= e && e <= 55;
}
function BD(e) {
  return 48 <= e && e <= 57;
}
function HD(e) {
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
          if (!MD(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== '_';
    }
    if (i === 'o') {
      for (n++; n < t; n++)
        if (((i = e[n]), i !== '_')) {
          if (!jD(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== '_';
    }
  }
  if (i === '_') return !1;
  for (; n < t; n++)
    if (((i = e[n]), i !== '_')) {
      if (!BD(e.charCodeAt(n))) return !1;
      r = !0;
    }
  return !(!r || i === '_');
}
function zD(e) {
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
function UD(e) {
  return (
    Object.prototype.toString.call(e) === '[object Number]' && e % 1 === 0 && !Ve.isNegativeZero(e)
  );
}
var WD = new ct('tag:yaml.org,2002:int', {
    kind: 'scalar',
    resolve: HD,
    construct: zD,
    predicate: UD,
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
  $D = new RegExp(
    '^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$'
  );
function VD(e) {
  return !(e === null || !$D.test(e) || e[e.length - 1] === '_');
}
function YD(e) {
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
var GD = /^[-+]?[0-9]+e/;
function KD(e, t) {
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
  return ((n = e.toString(10)), GD.test(n) ? n.replace('e', '.e') : n);
}
function QD(e) {
  return (
    Object.prototype.toString.call(e) === '[object Number]' && (e % 1 !== 0 || Ve.isNegativeZero(e))
  );
}
var JD = new ct('tag:yaml.org,2002:float', {
    kind: 'scalar',
    resolve: VD,
    construct: YD,
    predicate: QD,
    represent: KD,
    defaultStyle: 'lowercase',
  }),
  ZD = RD.extend({ implicit: [OD, LD, WD, JD] }),
  XD = ZD,
  x0 = new RegExp('^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$'),
  w0 = new RegExp(
    '^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$'
  );
function eE(e) {
  return e === null ? !1 : x0.exec(e) !== null || w0.exec(e) !== null;
}
function tE(e) {
  var t,
    n,
    r,
    i,
    o,
    s,
    a,
    u = 0,
    c = null,
    l,
    p,
    m;
  if (((t = x0.exec(e)), t === null && (t = w0.exec(e)), t === null))
    throw new Error('Date resolve error');
  if (((n = +t[1]), (r = +t[2] - 1), (i = +t[3]), !t[4])) return new Date(Date.UTC(n, r, i));
  if (((o = +t[4]), (s = +t[5]), (a = +t[6]), t[7])) {
    for (u = t[7].slice(0, 3); u.length < 3; ) u += '0';
    u = +u;
  }
  return (
    t[9] && ((l = +t[10]), (p = +(t[11] || 0)), (c = (l * 60 + p) * 6e4), t[9] === '-' && (c = -c)),
    (m = new Date(Date.UTC(n, r, i, o, s, a, u))),
    c && m.setTime(m.getTime() - c),
    m
  );
}
function nE(e) {
  return e.toISOString();
}
var rE = new ct('tag:yaml.org,2002:timestamp', {
  kind: 'scalar',
  resolve: eE,
  construct: tE,
  instanceOf: Date,
  represent: nE,
});
function iE(e) {
  return e === '<<' || e === null;
}
var oE = new ct('tag:yaml.org,2002:merge', { kind: 'scalar', resolve: iE }),
  Pl = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function sE(e) {
  if (e === null) return !1;
  var t,
    n,
    r = 0,
    i = e.length,
    o = Pl;
  for (n = 0; n < i; n++)
    if (((t = o.indexOf(e.charAt(n))), !(t > 64))) {
      if (t < 0) return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function aE(e) {
  var t,
    n,
    r = e.replace(/[\r\n=]/g, ''),
    i = r.length,
    o = Pl,
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
function uE(e) {
  var t = '',
    n = 0,
    r,
    i,
    o = e.length,
    s = Pl;
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
function cE(e) {
  return Object.prototype.toString.call(e) === '[object Uint8Array]';
}
var lE = new ct('tag:yaml.org,2002:binary', {
    kind: 'scalar',
    resolve: sE,
    construct: aE,
    predicate: cE,
    represent: uE,
  }),
  fE = Object.prototype.hasOwnProperty,
  dE = Object.prototype.toString;
function pE(e) {
  if (e === null) return !0;
  var t = [],
    n,
    r,
    i,
    o,
    s,
    a = e;
  for (n = 0, r = a.length; n < r; n += 1) {
    if (((i = a[n]), (s = !1), dE.call(i) !== '[object Object]')) return !1;
    for (o in i)
      if (fE.call(i, o))
        if (!s) s = !0;
        else return !1;
    if (!s) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function hE(e) {
  return e !== null ? e : [];
}
var mE = new ct('tag:yaml.org,2002:omap', { kind: 'sequence', resolve: pE, construct: hE }),
  gE = Object.prototype.toString;
function yE(e) {
  if (e === null) return !0;
  var t,
    n,
    r,
    i,
    o,
    s = e;
  for (o = new Array(s.length), t = 0, n = s.length; t < n; t += 1) {
    if (((r = s[t]), gE.call(r) !== '[object Object]' || ((i = Object.keys(r)), i.length !== 1)))
      return !1;
    o[t] = [i[0], r[i[0]]];
  }
  return !0;
}
function bE(e) {
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
var vE = new ct('tag:yaml.org,2002:pairs', { kind: 'sequence', resolve: yE, construct: bE }),
  xE = Object.prototype.hasOwnProperty;
function wE(e) {
  if (e === null) return !0;
  var t,
    n = e;
  for (t in n) if (xE.call(n, t) && n[t] !== null) return !1;
  return !0;
}
function kE(e) {
  return e !== null ? e : {};
}
var _E = new ct('tag:yaml.org,2002:set', { kind: 'mapping', resolve: wE, construct: kE }),
  k0 = XD.extend({ implicit: [rE, oE], explicit: [lE, mE, vE, _E] }),
  Fn = Object.prototype.hasOwnProperty,
  Qs = 1,
  _0 = 2,
  S0 = 3,
  Js = 4,
  Tl = 1,
  SE = 2,
  i0 = 3,
  TE =
    /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
  CE = /[\x85\u2028\u2029]/,
  DE = /[,\[\]\{\}]/,
  T0 = /^(?:!|!!|![a-z\-]+!)$/i,
  C0 = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function o0(e) {
  return Object.prototype.toString.call(e);
}
function tn(e) {
  return e === 10 || e === 13;
}
function or(e) {
  return e === 9 || e === 32;
}
function St(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Kr(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function EE(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function RE(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function AE(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function s0(e) {
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
function PE(e) {
  return e <= 65535
    ? String.fromCharCode(e)
    : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
}
function D0(e, t, n) {
  t === '__proto__'
    ? Object.defineProperty(e, t, { configurable: !0, enumerable: !0, writable: !0, value: n })
    : (e[t] = n);
}
var E0 = new Array(256),
  R0 = new Array(256);
for (ir = 0; ir < 256; ir++) ((E0[ir] = s0(ir) ? 1 : 0), (R0[ir] = s0(ir)));
var ir;
function qE(e, t) {
  ((this.input = e),
    (this.filename = t.filename || null),
    (this.schema = t.schema || k0),
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
function A0(e, t) {
  var n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart,
  };
  return ((n.snippet = vD(n)), new _t(t, n));
}
function K(e, t) {
  throw A0(e, t);
}
function Zs(e, t) {
  e.onWarning && e.onWarning.call(null, A0(e, t));
}
var a0 = {
  YAML: function (t, n, r) {
    var i, o, s;
    (t.version !== null && K(t, 'duplication of %YAML directive'),
      r.length !== 1 && K(t, 'YAML directive accepts exactly one argument'),
      (i = /^([0-9]+)\.([0-9]+)$/.exec(r[0])),
      i === null && K(t, 'ill-formed argument of the YAML directive'),
      (o = parseInt(i[1], 10)),
      (s = parseInt(i[2], 10)),
      o !== 1 && K(t, 'unacceptable YAML version of the document'),
      (t.version = r[0]),
      (t.checkLineBreaks = s < 2),
      s !== 1 && s !== 2 && Zs(t, 'unsupported YAML version of the document'));
  },
  TAG: function (t, n, r) {
    var i, o;
    (r.length !== 2 && K(t, 'TAG directive accepts exactly two arguments'),
      (i = r[0]),
      (o = r[1]),
      T0.test(i) || K(t, 'ill-formed tag handle (first argument) of the TAG directive'),
      Fn.call(t.tagMap, i) &&
        K(t, 'there is a previously declared suffix for "' + i + '" tag handle'),
      C0.test(o) || K(t, 'ill-formed tag prefix (second argument) of the TAG directive'));
    try {
      o = decodeURIComponent(o);
    } catch {
      K(t, 'tag prefix is malformed: ' + o);
    }
    t.tagMap[i] = o;
  },
};
function In(e, t, n, r) {
  var i, o, s, a;
  if (t < n) {
    if (((a = e.input.slice(t, n)), r))
      for (i = 0, o = a.length; i < o; i += 1)
        ((s = a.charCodeAt(i)),
          s === 9 || (32 <= s && s <= 1114111) || K(e, 'expected valid JSON character'));
    else TE.test(a) && K(e, 'the stream contains non-printable characters');
    e.result += a;
  }
}
function u0(e, t, n, r) {
  var i, o, s, a;
  for (
    Ve.isObject(n) || K(e, 'cannot merge mappings; the provided source object is unacceptable'),
      i = Object.keys(n),
      s = 0,
      a = i.length;
    s < a;
    s += 1
  )
    ((o = i[s]), Fn.call(t, o) || (D0(t, o, n[o]), (r[o] = !0)));
}
function Qr(e, t, n, r, i, o, s, a, u) {
  var c, l;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), c = 0, l = i.length; c < l; c += 1)
      (Array.isArray(i[c]) && K(e, 'nested arrays are not supported inside keys'),
        typeof i == 'object' && o0(i[c]) === '[object Object]' && (i[c] = '[object Object]'));
  if (
    (typeof i == 'object' && o0(i) === '[object Object]' && (i = '[object Object]'),
    (i = String(i)),
    t === null && (t = {}),
    r === 'tag:yaml.org,2002:merge')
  )
    if (Array.isArray(o)) for (c = 0, l = o.length; c < l; c += 1) u0(e, t, o[c], n);
    else u0(e, t, o, n);
  else
    (!e.json &&
      !Fn.call(n, i) &&
      Fn.call(t, i) &&
      ((e.line = s || e.line),
      (e.lineStart = a || e.lineStart),
      (e.position = u || e.position),
      K(e, 'duplicated mapping key')),
      D0(t, i, o),
      delete n[i]);
  return t;
}
function ql(e) {
  var t;
  ((t = e.input.charCodeAt(e.position)),
    t === 10
      ? e.position++
      : t === 13
        ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++)
        : K(e, 'a line break is expected'),
    (e.line += 1),
    (e.lineStart = e.position),
    (e.firstTabInLine = -1));
}
function ze(e, t, n) {
  for (var r = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; or(i); )
      (i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position),
        (i = e.input.charCodeAt(++e.position)));
    if (t && i === 35)
      do i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (tn(i))
      for (ql(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        (e.lineIndent++, (i = e.input.charCodeAt(++e.position)));
    else break;
  }
  return (n !== -1 && r !== 0 && e.lineIndent < n && Zs(e, 'deficient indentation'), r);
}
function ta(e) {
  var t = e.position,
    n;
  return (
    (n = e.input.charCodeAt(t)),
    !!(
      (n === 45 || n === 46) &&
      n === e.input.charCodeAt(t + 1) &&
      n === e.input.charCodeAt(t + 2) &&
      ((t += 3), (n = e.input.charCodeAt(t)), n === 0 || St(n))
    )
  );
}
function Ol(e, t) {
  t === 1
    ? (e.result += ' ')
    : t > 1 &&
      (e.result += Ve.repeat(
        `
`,
        t - 1
      ));
}
function OE(e, t, n) {
  var r,
    i,
    o,
    s,
    a,
    u,
    c,
    l,
    p = e.kind,
    m = e.result,
    h;
  if (
    ((h = e.input.charCodeAt(e.position)),
    St(h) ||
      Kr(h) ||
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
      ((h === 63 || h === 45) && ((i = e.input.charCodeAt(e.position + 1)), St(i) || (n && Kr(i)))))
  )
    return !1;
  for (e.kind = 'scalar', e.result = '', o = s = e.position, a = !1; h !== 0; ) {
    if (h === 58) {
      if (((i = e.input.charCodeAt(e.position + 1)), St(i) || (n && Kr(i)))) break;
    } else if (h === 35) {
      if (((r = e.input.charCodeAt(e.position - 1)), St(r))) break;
    } else {
      if ((e.position === e.lineStart && ta(e)) || (n && Kr(h))) break;
      if (tn(h))
        if (
          ((u = e.line), (c = e.lineStart), (l = e.lineIndent), ze(e, !1, -1), e.lineIndent >= t)
        ) {
          ((a = !0), (h = e.input.charCodeAt(e.position)));
          continue;
        } else {
          ((e.position = s), (e.line = u), (e.lineStart = c), (e.lineIndent = l));
          break;
        }
    }
    (a && (In(e, o, s, !1), Ol(e, e.line - u), (o = s = e.position), (a = !1)),
      or(h) || (s = e.position + 1),
      (h = e.input.charCodeAt(++e.position)));
  }
  return (In(e, o, s, !1), e.result ? !0 : ((e.kind = p), (e.result = m), !1));
}
function IE(e, t) {
  var n, r, i;
  if (((n = e.input.charCodeAt(e.position)), n !== 39)) return !1;
  for (
    e.kind = 'scalar', e.result = '', e.position++, r = i = e.position;
    (n = e.input.charCodeAt(e.position)) !== 0;
  )
    if (n === 39)
      if ((In(e, r, e.position, !0), (n = e.input.charCodeAt(++e.position)), n === 39))
        ((r = e.position), e.position++, (i = e.position));
      else return !0;
    else
      tn(n)
        ? (In(e, r, i, !0), Ol(e, ze(e, !1, t)), (r = i = e.position))
        : e.position === e.lineStart && ta(e)
          ? K(e, 'unexpected end of the document within a single quoted scalar')
          : (e.position++, (i = e.position));
  K(e, 'unexpected end of the stream within a single quoted scalar');
}
function FE(e, t) {
  var n, r, i, o, s, a;
  if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
  for (
    e.kind = 'scalar', e.result = '', e.position++, n = r = e.position;
    (a = e.input.charCodeAt(e.position)) !== 0;
  ) {
    if (a === 34) return (In(e, n, e.position, !0), e.position++, !0);
    if (a === 92) {
      if ((In(e, n, e.position, !0), (a = e.input.charCodeAt(++e.position)), tn(a))) ze(e, !1, t);
      else if (a < 256 && E0[a]) ((e.result += R0[a]), e.position++);
      else if ((s = RE(a)) > 0) {
        for (i = s, o = 0; i > 0; i--)
          ((a = e.input.charCodeAt(++e.position)),
            (s = EE(a)) >= 0 ? (o = (o << 4) + s) : K(e, 'expected hexadecimal character'));
        ((e.result += PE(o)), e.position++);
      } else K(e, 'unknown escape sequence');
      n = r = e.position;
    } else
      tn(a)
        ? (In(e, n, r, !0), Ol(e, ze(e, !1, t)), (n = r = e.position))
        : e.position === e.lineStart && ta(e)
          ? K(e, 'unexpected end of the document within a double quoted scalar')
          : (e.position++, (r = e.position));
  }
  K(e, 'unexpected end of the stream within a double quoted scalar');
}
function NE(e, t) {
  var n = !0,
    r,
    i,
    o,
    s = e.tag,
    a,
    u = e.anchor,
    c,
    l,
    p,
    m,
    h,
    R = Object.create(null),
    I,
    L,
    A,
    S;
  if (((S = e.input.charCodeAt(e.position)), S === 91)) ((l = 93), (h = !1), (a = []));
  else if (S === 123) ((l = 125), (h = !0), (a = {}));
  else return !1;
  for (
    e.anchor !== null && (e.anchorMap[e.anchor] = a), S = e.input.charCodeAt(++e.position);
    S !== 0;
  ) {
    if ((ze(e, !0, t), (S = e.input.charCodeAt(e.position)), S === l))
      return (
        e.position++,
        (e.tag = s),
        (e.anchor = u),
        (e.kind = h ? 'mapping' : 'sequence'),
        (e.result = a),
        !0
      );
    (n
      ? S === 44 && K(e, "expected the node content, but found ','")
      : K(e, 'missed comma between flow collection entries'),
      (L = I = A = null),
      (p = m = !1),
      S === 63 &&
        ((c = e.input.charCodeAt(e.position + 1)),
        St(c) && ((p = m = !0), e.position++, ze(e, !0, t))),
      (r = e.line),
      (i = e.lineStart),
      (o = e.position),
      Jr(e, t, Qs, !1, !0),
      (L = e.tag),
      (I = e.result),
      ze(e, !0, t),
      (S = e.input.charCodeAt(e.position)),
      (m || e.line === r) &&
        S === 58 &&
        ((p = !0),
        (S = e.input.charCodeAt(++e.position)),
        ze(e, !0, t),
        Jr(e, t, Qs, !1, !0),
        (A = e.result)),
      h ? Qr(e, a, R, L, I, A, r, i, o) : p ? a.push(Qr(e, null, R, L, I, A, r, i, o)) : a.push(I),
      ze(e, !0, t),
      (S = e.input.charCodeAt(e.position)),
      S === 44 ? ((n = !0), (S = e.input.charCodeAt(++e.position))) : (n = !1));
  }
  K(e, 'unexpected end of the stream within a flow collection');
}
function LE(e, t) {
  var n,
    r,
    i = Tl,
    o = !1,
    s = !1,
    a = t,
    u = 0,
    c = !1,
    l,
    p;
  if (((p = e.input.charCodeAt(e.position)), p === 124)) r = !1;
  else if (p === 62) r = !0;
  else return !1;
  for (e.kind = 'scalar', e.result = ''; p !== 0; )
    if (((p = e.input.charCodeAt(++e.position)), p === 43 || p === 45))
      Tl === i ? (i = p === 43 ? i0 : SE) : K(e, 'repeat of a chomping mode identifier');
    else if ((l = AE(p)) >= 0)
      l === 0
        ? K(e, 'bad explicit indentation width of a block scalar; it cannot be less than one')
        : s
          ? K(e, 'repeat of an indentation width identifier')
          : ((a = t + l - 1), (s = !0));
    else break;
  if (or(p)) {
    do p = e.input.charCodeAt(++e.position);
    while (or(p));
    if (p === 35)
      do p = e.input.charCodeAt(++e.position);
      while (!tn(p) && p !== 0);
  }
  for (; p !== 0; ) {
    for (
      ql(e), e.lineIndent = 0, p = e.input.charCodeAt(e.position);
      (!s || e.lineIndent < a) && p === 32;
    )
      (e.lineIndent++, (p = e.input.charCodeAt(++e.position)));
    if ((!s && e.lineIndent > a && (a = e.lineIndent), tn(p))) {
      u++;
      continue;
    }
    if (e.lineIndent < a) {
      i === i0
        ? (e.result += Ve.repeat(
            `
`,
            o ? 1 + u : u
          ))
        : i === Tl &&
          o &&
          (e.result += `
`);
      break;
    }
    for (
      r
        ? or(p)
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
      !tn(p) && p !== 0;
    )
      p = e.input.charCodeAt(++e.position);
    In(e, n, e.position, !1);
  }
  return !0;
}
function c0(e, t) {
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
      ((e.position = e.firstTabInLine), K(e, 'tab characters must not be used in indentation')),
    !(u !== 45 || ((s = e.input.charCodeAt(e.position + 1)), !St(s))));
  ) {
    if (((a = !0), e.position++, ze(e, !0, -1) && e.lineIndent <= t)) {
      (o.push(null), (u = e.input.charCodeAt(e.position)));
      continue;
    }
    if (
      ((n = e.line),
      Jr(e, t, S0, !1, !0),
      o.push(e.result),
      ze(e, !0, -1),
      (u = e.input.charCodeAt(e.position)),
      (e.line === n || e.lineIndent > t) && u !== 0)
    )
      K(e, 'bad indentation of a sequence entry');
    else if (e.lineIndent < t) break;
  }
  return a ? ((e.tag = r), (e.anchor = i), (e.kind = 'sequence'), (e.result = o), !0) : !1;
}
function ME(e, t, n) {
  var r,
    i,
    o,
    s,
    a,
    u,
    c = e.tag,
    l = e.anchor,
    p = {},
    m = Object.create(null),
    h = null,
    R = null,
    I = null,
    L = !1,
    A = !1,
    S;
  if (e.firstTabInLine !== -1) return !1;
  for (
    e.anchor !== null && (e.anchorMap[e.anchor] = p), S = e.input.charCodeAt(e.position);
    S !== 0;
  ) {
    if (
      (!L &&
        e.firstTabInLine !== -1 &&
        ((e.position = e.firstTabInLine), K(e, 'tab characters must not be used in indentation')),
      (r = e.input.charCodeAt(e.position + 1)),
      (o = e.line),
      (S === 63 || S === 58) && St(r))
    )
      (S === 63
        ? (L && (Qr(e, p, m, h, R, null, s, a, u), (h = R = I = null)),
          (A = !0),
          (L = !0),
          (i = !0))
        : L
          ? ((L = !1), (i = !0))
          : K(
              e,
              'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line'
            ),
        (e.position += 1),
        (S = r));
    else {
      if (((s = e.line), (a = e.lineStart), (u = e.position), !Jr(e, n, _0, !1, !0))) break;
      if (e.line === o) {
        for (S = e.input.charCodeAt(e.position); or(S); ) S = e.input.charCodeAt(++e.position);
        if (S === 58)
          ((S = e.input.charCodeAt(++e.position)),
            St(S) ||
              K(
                e,
                'a whitespace character is expected after the key-value separator within a block mapping'
              ),
            L && (Qr(e, p, m, h, R, null, s, a, u), (h = R = I = null)),
            (A = !0),
            (L = !1),
            (i = !1),
            (h = e.tag),
            (R = e.result));
        else if (A) K(e, 'can not read an implicit mapping pair; a colon is missed');
        else return ((e.tag = c), (e.anchor = l), !0);
      } else if (A)
        K(e, 'can not read a block mapping entry; a multiline key may not be an implicit key');
      else return ((e.tag = c), (e.anchor = l), !0);
    }
    if (
      ((e.line === o || e.lineIndent > t) &&
        (L && ((s = e.line), (a = e.lineStart), (u = e.position)),
        Jr(e, t, Js, !0, i) && (L ? (R = e.result) : (I = e.result)),
        L || (Qr(e, p, m, h, R, I, s, a, u), (h = R = I = null)),
        ze(e, !0, -1),
        (S = e.input.charCodeAt(e.position))),
      (e.line === o || e.lineIndent > t) && S !== 0)
    )
      K(e, 'bad indentation of a mapping entry');
    else if (e.lineIndent < t) break;
  }
  return (
    L && Qr(e, p, m, h, R, null, s, a, u),
    A && ((e.tag = c), (e.anchor = l), (e.kind = 'mapping'), (e.result = p)),
    A
  );
}
function jE(e) {
  var t,
    n = !1,
    r = !1,
    i,
    o,
    s;
  if (((s = e.input.charCodeAt(e.position)), s !== 33)) return !1;
  if (
    (e.tag !== null && K(e, 'duplication of a tag property'),
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
      : K(e, 'unexpected end of the stream within a verbatim tag');
  } else {
    for (; s !== 0 && !St(s); )
      (s === 33 &&
        (r
          ? K(e, 'tag suffix cannot contain exclamation marks')
          : ((i = e.input.slice(t - 1, e.position + 1)),
            T0.test(i) || K(e, 'named tag handle cannot contain such characters'),
            (r = !0),
            (t = e.position + 1))),
        (s = e.input.charCodeAt(++e.position)));
    ((o = e.input.slice(t, e.position)),
      DE.test(o) && K(e, 'tag suffix cannot contain flow indicator characters'));
  }
  o && !C0.test(o) && K(e, 'tag name cannot contain such characters: ' + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    K(e, 'tag name is malformed: ' + o);
  }
  return (
    n
      ? (e.tag = o)
      : Fn.call(e.tagMap, i)
        ? (e.tag = e.tagMap[i] + o)
        : i === '!'
          ? (e.tag = '!' + o)
          : i === '!!'
            ? (e.tag = 'tag:yaml.org,2002:' + o)
            : K(e, 'undeclared tag handle "' + i + '"'),
    !0
  );
}
function BE(e) {
  var t, n;
  if (((n = e.input.charCodeAt(e.position)), n !== 38)) return !1;
  for (
    e.anchor !== null && K(e, 'duplication of an anchor property'),
      n = e.input.charCodeAt(++e.position),
      t = e.position;
    n !== 0 && !St(n) && !Kr(n);
  )
    n = e.input.charCodeAt(++e.position);
  return (
    e.position === t && K(e, 'name of an anchor node must contain at least one character'),
    (e.anchor = e.input.slice(t, e.position)),
    !0
  );
}
function HE(e) {
  var t, n, r;
  if (((r = e.input.charCodeAt(e.position)), r !== 42)) return !1;
  for (r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !St(r) && !Kr(r); )
    r = e.input.charCodeAt(++e.position);
  return (
    e.position === t && K(e, 'name of an alias node must contain at least one character'),
    (n = e.input.slice(t, e.position)),
    Fn.call(e.anchorMap, n) || K(e, 'unidentified alias "' + n + '"'),
    (e.result = e.anchorMap[n]),
    ze(e, !0, -1),
    !0
  );
}
function Jr(e, t, n, r, i) {
  var o,
    s,
    a,
    u = 1,
    c = !1,
    l = !1,
    p,
    m,
    h,
    R,
    I,
    L;
  if (
    (e.listener !== null && e.listener('open', e),
    (e.tag = null),
    (e.anchor = null),
    (e.kind = null),
    (e.result = null),
    (o = s = a = Js === n || S0 === n),
    r &&
      ze(e, !0, -1) &&
      ((c = !0),
      e.lineIndent > t ? (u = 1) : e.lineIndent === t ? (u = 0) : e.lineIndent < t && (u = -1)),
    u === 1)
  )
    for (; jE(e) || BE(e); )
      ze(e, !0, -1)
        ? ((c = !0),
          (a = o),
          e.lineIndent > t ? (u = 1) : e.lineIndent === t ? (u = 0) : e.lineIndent < t && (u = -1))
        : (a = !1);
  if (
    (a && (a = c || i),
    (u === 1 || Js === n) &&
      (Qs === n || _0 === n ? (I = t) : (I = t + 1),
      (L = e.position - e.lineStart),
      u === 1
        ? (a && (c0(e, L) || ME(e, L, I))) || NE(e, I)
          ? (l = !0)
          : ((s && LE(e, I)) || IE(e, I) || FE(e, I)
              ? (l = !0)
              : HE(e)
                ? ((l = !0),
                  (e.tag !== null || e.anchor !== null) &&
                    K(e, 'alias node should not have any properties'))
                : OE(e, I, Qs === n) && ((l = !0), e.tag === null && (e.tag = '?')),
            e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
        : u === 0 && (l = a && c0(e, L))),
    e.tag === null)
  )
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === '?') {
    for (
      e.result !== null &&
        e.kind !== 'scalar' &&
        K(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'),
        p = 0,
        m = e.implicitTypes.length;
      p < m;
      p += 1
    )
      if (((R = e.implicitTypes[p]), R.resolve(e.result))) {
        ((e.result = R.construct(e.result)),
          (e.tag = R.tag),
          e.anchor !== null && (e.anchorMap[e.anchor] = e.result));
        break;
      }
  } else if (e.tag !== '!') {
    if (Fn.call(e.typeMap[e.kind || 'fallback'], e.tag)) R = e.typeMap[e.kind || 'fallback'][e.tag];
    else
      for (R = null, h = e.typeMap.multi[e.kind || 'fallback'], p = 0, m = h.length; p < m; p += 1)
        if (e.tag.slice(0, h[p].tag.length) === h[p].tag) {
          R = h[p];
          break;
        }
    (R || K(e, 'unknown tag !<' + e.tag + '>'),
      e.result !== null &&
        R.kind !== e.kind &&
        K(
          e,
          'unacceptable node kind for !<' +
            e.tag +
            '> tag; it should be "' +
            R.kind +
            '", not "' +
            e.kind +
            '"'
        ),
      R.resolve(e.result, e.tag)
        ? ((e.result = R.construct(e.result, e.tag)),
          e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
        : K(e, 'cannot resolve a node with !<' + e.tag + '> explicit tag'));
  }
  return (e.listener !== null && e.listener('close', e), e.tag !== null || e.anchor !== null || l);
}
function zE(e) {
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
    (ze(e, !0, -1), (s = e.input.charCodeAt(e.position)), !(e.lineIndent > 0 || s !== 37));
  ) {
    for (o = !0, s = e.input.charCodeAt(++e.position), n = e.position; s !== 0 && !St(s); )
      s = e.input.charCodeAt(++e.position);
    for (
      r = e.input.slice(n, e.position),
        i = [],
        r.length < 1 && K(e, 'directive name must not be less than one character in length');
      s !== 0;
    ) {
      for (; or(s); ) s = e.input.charCodeAt(++e.position);
      if (s === 35) {
        do s = e.input.charCodeAt(++e.position);
        while (s !== 0 && !tn(s));
        break;
      }
      if (tn(s)) break;
      for (n = e.position; s !== 0 && !St(s); ) s = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(n, e.position));
    }
    (s !== 0 && ql(e),
      Fn.call(a0, r) ? a0[r](e, r, i) : Zs(e, 'unknown document directive "' + r + '"'));
  }
  if (
    (ze(e, !0, -1),
    e.lineIndent === 0 &&
    e.input.charCodeAt(e.position) === 45 &&
    e.input.charCodeAt(e.position + 1) === 45 &&
    e.input.charCodeAt(e.position + 2) === 45
      ? ((e.position += 3), ze(e, !0, -1))
      : o && K(e, 'directives end mark is expected'),
    Jr(e, e.lineIndent - 1, Js, !1, !0),
    ze(e, !0, -1),
    e.checkLineBreaks &&
      CE.test(e.input.slice(t, e.position)) &&
      Zs(e, 'non-ASCII line breaks are interpreted as content'),
    e.documents.push(e.result),
    e.position === e.lineStart && ta(e))
  ) {
    e.input.charCodeAt(e.position) === 46 && ((e.position += 3), ze(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1) K(e, 'end of the stream or a document separator is expected');
  else return;
}
function P0(e, t) {
  ((e = String(e)),
    (t = t || {}),
    e.length !== 0 &&
      (e.charCodeAt(e.length - 1) !== 10 &&
        e.charCodeAt(e.length - 1) !== 13 &&
        (e += `
`),
      e.charCodeAt(0) === 65279 && (e = e.slice(1))));
  var n = new qE(e, t),
    r = e.indexOf('\0');
  for (
    r !== -1 && ((n.position = r), K(n, 'null byte is not allowed in input')), n.input += '\0';
    n.input.charCodeAt(n.position) === 32;
  )
    ((n.lineIndent += 1), (n.position += 1));
  for (; n.position < n.length - 1; ) zE(n);
  return n.documents;
}
function UE(e, t, n) {
  t !== null && typeof t == 'object' && typeof n > 'u' && ((n = t), (t = null));
  var r = P0(e, n);
  if (typeof t != 'function') return r;
  for (var i = 0, o = r.length; i < o; i += 1) t(r[i]);
}
function WE(e, t) {
  var n = P0(e, t);
  if (n.length !== 0) {
    if (n.length === 1) return n[0];
    throw new _t('expected a single document in the stream, but found more');
  }
}
var $E = UE,
  VE = WE,
  q0 = { loadAll: $E, load: VE },
  O0 = Object.prototype.toString,
  I0 = Object.prototype.hasOwnProperty,
  Il = 65279,
  YE = 9,
  Ni = 10,
  GE = 13,
  KE = 32,
  QE = 33,
  JE = 34,
  Dl = 35,
  ZE = 37,
  XE = 38,
  eR = 39,
  tR = 42,
  F0 = 44,
  nR = 45,
  Xs = 58,
  rR = 61,
  iR = 62,
  oR = 63,
  sR = 64,
  N0 = 91,
  L0 = 93,
  aR = 96,
  M0 = 123,
  uR = 124,
  j0 = 125,
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
var cR = [
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
  lR = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function fR(e, t) {
  var n, r, i, o, s, a, u;
  if (t === null) return {};
  for (n = {}, r = Object.keys(t), i = 0, o = r.length; i < o; i += 1)
    ((s = r[i]),
      (a = String(t[s])),
      s.slice(0, 2) === '!!' && (s = 'tag:yaml.org,2002:' + s.slice(2)),
      (u = e.compiledTypeMap.fallback[s]),
      u && I0.call(u.styleAliases, a) && (a = u.styleAliases[a]),
      (n[s] = a));
  return n;
}
function dR(e) {
  var t, n, r;
  if (((t = e.toString(16).toUpperCase()), e <= 255)) ((n = 'x'), (r = 2));
  else if (e <= 65535) ((n = 'u'), (r = 4));
  else if (e <= 4294967295) ((n = 'U'), (r = 8));
  else throw new _t('code point within a string may not be greater than 0xFFFFFFFF');
  return '\\' + n + Ve.repeat('0', r - t.length) + t;
}
var pR = 1,
  Li = 2;
function hR(e) {
  ((this.schema = e.schema || k0),
    (this.indent = Math.max(1, e.indent || 2)),
    (this.noArrayIndent = e.noArrayIndent || !1),
    (this.skipInvalid = e.skipInvalid || !1),
    (this.flowLevel = Ve.isNothing(e.flowLevel) ? -1 : e.flowLevel),
    (this.styleMap = fR(this.schema, e.styles || null)),
    (this.sortKeys = e.sortKeys || !1),
    (this.lineWidth = e.lineWidth || 80),
    (this.noRefs = e.noRefs || !1),
    (this.noCompatMode = e.noCompatMode || !1),
    (this.condenseFlow = e.condenseFlow || !1),
    (this.quotingType = e.quotingType === '"' ? Li : pR),
    (this.forceQuotes = e.forceQuotes || !1),
    (this.replacer = typeof e.replacer == 'function' ? e.replacer : null),
    (this.implicitTypes = this.schema.compiledImplicit),
    (this.explicitTypes = this.schema.compiledExplicit),
    (this.tag = null),
    (this.result = ''),
    (this.duplicates = []),
    (this.usedDuplicates = null));
}
function l0(e, t) {
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
function El(e, t) {
  return (
    `
` + Ve.repeat(' ', e.indent * t)
  );
}
function mR(e, t) {
  var n, r, i;
  for (n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (((i = e.implicitTypes[n]), i.resolve(t))) return !0;
  return !1;
}
function ea(e) {
  return e === KE || e === YE;
}
function Mi(e) {
  return (
    (32 <= e && e <= 126) ||
    (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
    (57344 <= e && e <= 65533 && e !== Il) ||
    (65536 <= e && e <= 1114111)
  );
}
function f0(e) {
  return Mi(e) && e !== Il && e !== GE && e !== Ni;
}
function d0(e, t, n) {
  var r = f0(e),
    i = r && !ea(e);
  return (
    ((n ? r : r && e !== F0 && e !== N0 && e !== L0 && e !== M0 && e !== j0) &&
      e !== Dl &&
      !(t === Xs && !i)) ||
    (f0(t) && !ea(t) && e === Dl) ||
    (t === Xs && i)
  );
}
function gR(e) {
  return (
    Mi(e) &&
    e !== Il &&
    !ea(e) &&
    e !== nR &&
    e !== oR &&
    e !== Xs &&
    e !== F0 &&
    e !== N0 &&
    e !== L0 &&
    e !== M0 &&
    e !== j0 &&
    e !== Dl &&
    e !== XE &&
    e !== tR &&
    e !== QE &&
    e !== uR &&
    e !== rR &&
    e !== iR &&
    e !== eR &&
    e !== JE &&
    e !== ZE &&
    e !== sR &&
    e !== aR
  );
}
function yR(e) {
  return !ea(e) && e !== Xs;
}
function Ii(e, t) {
  var n = e.charCodeAt(t),
    r;
  return n >= 55296 &&
    n <= 56319 &&
    t + 1 < e.length &&
    ((r = e.charCodeAt(t + 1)), r >= 56320 && r <= 57343)
    ? (n - 55296) * 1024 + r - 56320 + 65536
    : n;
}
function B0(e) {
  var t = /^\n* /;
  return t.test(e);
}
var H0 = 1,
  Rl = 2,
  z0 = 3,
  U0 = 4,
  Gr = 5;
function bR(e, t, n, r, i, o, s, a) {
  var u,
    c = 0,
    l = null,
    p = !1,
    m = !1,
    h = r !== -1,
    R = -1,
    I = gR(Ii(e, 0)) && yR(Ii(e, e.length - 1));
  if (t || s)
    for (u = 0; u < e.length; c >= 65536 ? (u += 2) : u++) {
      if (((c = Ii(e, u)), !Mi(c))) return Gr;
      ((I = I && d0(c, l, a)), (l = c));
    }
  else {
    for (u = 0; u < e.length; c >= 65536 ? (u += 2) : u++) {
      if (((c = Ii(e, u)), c === Ni))
        ((p = !0), h && ((m = m || (u - R - 1 > r && e[R + 1] !== ' ')), (R = u)));
      else if (!Mi(c)) return Gr;
      ((I = I && d0(c, l, a)), (l = c));
    }
    m = m || (h && u - R - 1 > r && e[R + 1] !== ' ');
  }
  return !p && !m
    ? I && !s && !i(e)
      ? H0
      : o === Li
        ? Gr
        : Rl
    : n > 9 && B0(e)
      ? Gr
      : s
        ? o === Li
          ? Gr
          : Rl
        : m
          ? U0
          : z0;
}
function vR(e, t, n, r, i) {
  e.dump = (function () {
    if (t.length === 0) return e.quotingType === Li ? '""' : "''";
    if (!e.noCompatMode && (cR.indexOf(t) !== -1 || lR.test(t)))
      return e.quotingType === Li ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, n),
      s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o),
      a = r || (e.flowLevel > -1 && n >= e.flowLevel);
    function u(c) {
      return mR(e, c);
    }
    switch (bR(t, a, e.indent, s, u, e.quotingType, e.forceQuotes && !r, i)) {
      case H0:
        return t;
      case Rl:
        return "'" + t.replace(/'/g, "''") + "'";
      case z0:
        return '|' + p0(t, e.indent) + h0(l0(t, o));
      case U0:
        return '>' + p0(t, e.indent) + h0(l0(xR(t, s), o));
      case Gr:
        return '"' + wR(t) + '"';
      default:
        throw new _t('impossible error: invalid scalar style');
    }
  })();
}
function p0(e, t) {
  var n = B0(e) ? String(t) : '',
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
function h0(e) {
  return e[e.length - 1] ===
    `
`
    ? e.slice(0, -1)
    : e;
}
function xR(e, t) {
  for (
    var n = /(\n+)([^\n]*)/g,
      r = (function () {
        var c = e.indexOf(`
`);
        return ((c = c !== -1 ? c : e.length), (n.lastIndex = c), m0(e.slice(0, c), t));
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
        m0(u, t)),
      (i = o));
  }
  return r;
}
function m0(e, t) {
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
function wR(e) {
  for (var t = '', n = 0, r, i = 0; i < e.length; n >= 65536 ? (i += 2) : i++)
    ((n = Ii(e, i)),
      (r = lt[n]),
      !r && Mi(n) ? ((t += e[i]), n >= 65536 && (t += e[i + 1])) : (t += r || dR(n)));
  return t;
}
function kR(e, t, n) {
  var r = '',
    i = e.tag,
    o,
    s,
    a;
  for (o = 0, s = n.length; o < s; o += 1)
    ((a = n[o]),
      e.replacer && (a = e.replacer.call(n, String(o), a)),
      (fn(e, t, a, !1, !1) || (typeof a > 'u' && fn(e, t, null, !1, !1))) &&
        (r !== '' && (r += ',' + (e.condenseFlow ? '' : ' ')), (r += e.dump)));
  ((e.tag = i), (e.dump = '[' + r + ']'));
}
function g0(e, t, n, r) {
  var i = '',
    o = e.tag,
    s,
    a,
    u;
  for (s = 0, a = n.length; s < a; s += 1)
    ((u = n[s]),
      e.replacer && (u = e.replacer.call(n, String(s), u)),
      (fn(e, t + 1, u, !0, !0, !1, !0) || (typeof u > 'u' && fn(e, t + 1, null, !0, !0, !1, !0))) &&
        ((!r || i !== '') && (i += El(e, t)),
        e.dump && Ni === e.dump.charCodeAt(0) ? (i += '-') : (i += '- '),
        (i += e.dump)));
  ((e.tag = o), (e.dump = i || '[]'));
}
function _R(e, t, n) {
  var r = '',
    i = e.tag,
    o = Object.keys(n),
    s,
    a,
    u,
    c,
    l;
  for (s = 0, a = o.length; s < a; s += 1)
    ((l = ''),
      r !== '' && (l += ', '),
      e.condenseFlow && (l += '"'),
      (u = o[s]),
      (c = n[u]),
      e.replacer && (c = e.replacer.call(n, u, c)),
      fn(e, t, u, !1, !1) &&
        (e.dump.length > 1024 && (l += '? '),
        (l += e.dump + (e.condenseFlow ? '"' : '') + ':' + (e.condenseFlow ? '' : ' ')),
        fn(e, t, c, !1, !1) && ((l += e.dump), (r += l))));
  ((e.tag = i), (e.dump = '{' + r + '}'));
}
function SR(e, t, n, r) {
  var i = '',
    o = e.tag,
    s = Object.keys(n),
    a,
    u,
    c,
    l,
    p,
    m;
  if (e.sortKeys === !0) s.sort();
  else if (typeof e.sortKeys == 'function') s.sort(e.sortKeys);
  else if (e.sortKeys) throw new _t('sortKeys must be a boolean or a function');
  for (a = 0, u = s.length; a < u; a += 1)
    ((m = ''),
      (!r || i !== '') && (m += El(e, t)),
      (c = s[a]),
      (l = n[c]),
      e.replacer && (l = e.replacer.call(n, c, l)),
      fn(e, t + 1, c, !0, !0, !0) &&
        ((p = (e.tag !== null && e.tag !== '?') || (e.dump && e.dump.length > 1024)),
        p && (e.dump && Ni === e.dump.charCodeAt(0) ? (m += '?') : (m += '? ')),
        (m += e.dump),
        p && (m += El(e, t)),
        fn(e, t + 1, l, !0, p) &&
          (e.dump && Ni === e.dump.charCodeAt(0) ? (m += ':') : (m += ': '),
          (m += e.dump),
          (i += m))));
  ((e.tag = o), (e.dump = i || '{}'));
}
function y0(e, t, n) {
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
          ((u = e.styleMap[a.tag] || a.defaultStyle), O0.call(a.represent) === '[object Function]')
        )
          r = a.represent(t, u);
        else if (I0.call(a.represent, u)) r = a.represent[u](t, u);
        else throw new _t('!<' + a.tag + '> tag resolver accepts not "' + u + '" style');
        e.dump = r;
      }
      return !0;
    }
  return !1;
}
function fn(e, t, n, r, i, o, s) {
  ((e.tag = null), (e.dump = n), y0(e, n, !1) || y0(e, n, !0));
  var a = O0.call(e.dump),
    u = r,
    c;
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  var l = a === '[object Object]' || a === '[object Array]',
    p,
    m;
  if (
    (l && ((p = e.duplicates.indexOf(n)), (m = p !== -1)),
    ((e.tag !== null && e.tag !== '?') || m || (e.indent !== 2 && t > 0)) && (i = !1),
    m && e.usedDuplicates[p])
  )
    e.dump = '*ref_' + p;
  else {
    if ((l && m && !e.usedDuplicates[p] && (e.usedDuplicates[p] = !0), a === '[object Object]'))
      r && Object.keys(e.dump).length !== 0
        ? (SR(e, t, e.dump, i), m && (e.dump = '&ref_' + p + e.dump))
        : (_R(e, t, e.dump), m && (e.dump = '&ref_' + p + ' ' + e.dump));
    else if (a === '[object Array]')
      r && e.dump.length !== 0
        ? (e.noArrayIndent && !s && t > 0 ? g0(e, t - 1, e.dump, i) : g0(e, t, e.dump, i),
          m && (e.dump = '&ref_' + p + e.dump))
        : (kR(e, t, e.dump), m && (e.dump = '&ref_' + p + ' ' + e.dump));
    else if (a === '[object String]') e.tag !== '?' && vR(e, e.dump, t, o, u);
    else {
      if (a === '[object Undefined]') return !1;
      if (e.skipInvalid) return !1;
      throw new _t('unacceptable kind of an object to dump ' + a);
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
function TR(e, t) {
  var n = [],
    r = [],
    i,
    o;
  for (Al(e, n, r), i = 0, o = r.length; i < o; i += 1) t.duplicates.push(n[r[i]]);
  t.usedDuplicates = new Array(o);
}
function Al(e, t, n) {
  var r, i, o;
  if (e !== null && typeof e == 'object')
    if (((i = t.indexOf(e)), i !== -1)) n.indexOf(i) === -1 && n.push(i);
    else if ((t.push(e), Array.isArray(e))) for (i = 0, o = e.length; i < o; i += 1) Al(e[i], t, n);
    else for (r = Object.keys(e), i = 0, o = r.length; i < o; i += 1) Al(e[r[i]], t, n);
}
function CR(e, t) {
  t = t || {};
  var n = new hR(t);
  n.noRefs || TR(e, n);
  var r = e;
  return (
    n.replacer && (r = n.replacer.call({ '': r }, '', r)),
    fn(n, 0, r, !0, !0)
      ? n.dump +
        `
`
      : ''
  );
}
var DR = CR,
  ER = { dump: DR };
function Fl(e, t) {
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
var W0 = q0.load,
  IN = q0.loadAll,
  FN = ER.dump;
var NN = Fl('safeLoad', 'load'),
  LN = Fl('safeLoadAll', 'loadAll'),
  MN = Fl('safeDump', 'dump');
function AR(e) {
  if (!Bi.existsSync(e)) return null;
  let t = Bi.readFileSync(e, 'utf-8');
  return W0(t);
}
function Ll(e, t = {}) {
  let n = [],
    r = t.configPath || UR(),
    o = (r ? AR(r) : null)?.rules || Nl(),
    s = t.rules ? Object.fromEntries(Object.entries(o).filter(([a]) => t.rules.includes(a))) : o;
  for (let [a, u] of Object.entries(s)) {
    if (u === !1 || u === 'off') continue;
    let c = typeof u == 'string' ? Nl()[a] : u;
    if (!c || typeof c != 'object' || (t.severity && !zR(c.severity, t.severity))) continue;
    let l = PR(a, c, e);
    n.push(...l);
  }
  return n;
}
function PR(e, t, n) {
  let r = [],
    i = qR(t.given, n),
    o = Array.isArray(t.then) ? t.then : [t.then];
  for (let s of i)
    for (let a of o)
      IR(a, s.value, n) ||
        r.push({
          rule: e,
          message: HR(t.message || t.description || `Rule ${e} failed`, s.value),
          severity: t.severity,
          path: s.path,
        });
  return r;
}
function qR(e, t) {
  let n = [];
  if ((e.startsWith('#') && (e = OR(e)), e === '$')) return (n.push({ value: t, path: [] }), n);
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
function OR(e) {
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
function IR(e, t, n) {
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
      return FR(t, e.functionOptions);
    case 'omg-annotation-valid':
      return NR(t, e.functionOptions);
    case 'omg-path-parameter-defined':
      return LR(t, e.functionOptions);
    case 'omg-property-casing':
    case 'oal-property-casing':
      return $0(t, e.functionOptions);
    case 'omg-enum-values':
      return jR(t, e.functionOptions);
    case 'omg-type-valid':
      return BR(t, e.functionOptions);
    default:
      return !0;
  }
}
function FR(e, t) {
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
function NR(e, t) {
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
function LR(e, t) {
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
function $0(e, t) {
  let n = e,
    r = n?.resolvedBlocks || n?.blocks || [],
    i = t?.casing || 'camel';
  for (let o of r) {
    if (!o.parsed) continue;
    if (ji(o.parsed, i).length > 0) return !1;
  }
  return !0;
}
function ji(e, t, n = []) {
  let r = [];
  if (!e || typeof e != 'object') return r;
  let i = e;
  if (i.kind === 'object' && i.properties) {
    let o = i.properties;
    for (let s of Object.keys(o)) {
      MR(s, t) || r.push([...n, s].join('.'));
      let a = ji(o[s], t, [...n, s]);
      r.push(...a);
    }
  }
  if (i.kind === 'array' && i.items) {
    let o = ji(i.items, t, [...n, '[]']);
    r.push(...o);
  }
  if (i.kind === 'union' && Array.isArray(i.types))
    for (let o = 0; o < i.types.length; o++) {
      let s = ji(i.types[o], t, [...n, `variant${o + 1}`]);
      r.push(...s);
    }
  if (i.kind === 'intersection' && Array.isArray(i.types))
    for (let o = 0; o < i.types.length; o++) {
      let s = ji(i.types[o], t, [...n, `part${o + 1}`]);
      r.push(...s);
    }
  return r;
}
function V0(e, t) {
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
var MR = V0;
function jR(e, t) {
  return !0;
}
function BR(e, t) {
  return !0;
}
function HR(e, t) {
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
function zR(e, t) {
  let n = { error: 3, warn: 2, hint: 1, off: 0 };
  return n[e] >= n[t];
}
function UR() {
  let e = process.cwd(),
    t = Zr.parse(e).root,
    n = ['.spectral-oal.yaml', '.spectral-omg.yaml'];
  for (; e !== t; ) {
    for (let r of n) {
      let i = Zr.join(e, r);
      if (Bi.existsSync(i)) return i;
    }
    e = Zr.dirname(e);
  }
  return null;
}
function Nl() {
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
var ht = (0, Y.createConnection)(Y.ProposedFeatures.all),
  Xr = new Y.TextDocuments(ls),
  na = null,
  Hi = null;
function Ml() {
  if (!Hi && na)
    try {
      ((Hi = (0, Gt.buildTypeIndex)(na)),
        ht.console.log(`Built type index with ${Hi.types.size} types`));
    } catch (e) {
      ht.console.error(`Failed to build type index: ${e}`);
    }
  return Hi;
}
ht.onInitialize((e) => {
  if ((ht.console.log('OMG Language Server initializing...'), e.rootUri))
    try {
      ((na = (0, ra.fileURLToPath)(e.rootUri)), ht.console.log(`Workspace root: ${na}`));
    } catch {}
  return {
    capabilities: {
      textDocumentSync: Y.TextDocumentSyncKind.Incremental,
      completionProvider: { resolveProvider: !1, triggerCharacters: ['.', '@', '{', ':'] },
      hoverProvider: !0,
      definitionProvider: !0,
    },
  };
});
ht.onInitialized(() => {
  ht.console.log('OMG Language Server initialized');
});
ht.onDidChangeWatchedFiles(() => {
  ((Hi = null), ht.console.log('Type index invalidated due to file changes'));
});
async function G0(e) {
  let t = e.getText(),
    n = [];
  try {
    let r = (0, Gt.parseDocument)(t, e.uri),
      i;
    try {
      i = (0, Gt.resolveDocument)(r, { basePath: '.' });
    } catch {
      i = { ...r, resolvedBlocks: r.blocks };
    }
    let o = Ll({ document: i });
    for (let s of o) {
      let a = WR(s.severity),
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
      severity: Y.DiagnosticSeverity.Error,
      range: { start: { line: s, character: 0 }, end: { line: s, character: Number.MAX_VALUE } },
      message: i,
      source: 'omg',
    });
  }
  ht.sendDiagnostics({ uri: e.uri, diagnostics: n });
}
function WR(e) {
  switch (e) {
    case 'error':
      return Y.DiagnosticSeverity.Error;
    case 'warn':
      return Y.DiagnosticSeverity.Warning;
    case 'hint':
      return Y.DiagnosticSeverity.Hint;
    default:
      return Y.DiagnosticSeverity.Information;
  }
}
Xr.onDidChangeContent((e) => {
  G0(e.document);
});
Xr.onDidOpen((e) => {
  G0(e.document);
});
ht.onCompletion((e) => {
  let t = Xr.get(e.textDocument.uri);
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
  if (s.match(/^```omg\.?$/))
    return (
      a.push(
        { label: 'omg.path', kind: Y.CompletionItemKind.Keyword, detail: 'Path parameters' },
        { label: 'omg.query', kind: Y.CompletionItemKind.Keyword, detail: 'Query parameters' },
        { label: 'omg.headers', kind: Y.CompletionItemKind.Keyword, detail: 'Header parameters' },
        { label: 'omg.body', kind: Y.CompletionItemKind.Keyword, detail: 'Request body schema' },
        {
          label: 'omg.response',
          kind: Y.CompletionItemKind.Keyword,
          detail: 'Default (200) response',
        },
        {
          label: 'omg.response.201',
          kind: Y.CompletionItemKind.Keyword,
          detail: 'Created response',
        },
        {
          label: 'omg.response.400',
          kind: Y.CompletionItemKind.Keyword,
          detail: 'Bad request response',
        },
        {
          label: 'omg.response.401',
          kind: Y.CompletionItemKind.Keyword,
          detail: 'Unauthorized response',
        },
        {
          label: 'omg.response.404',
          kind: Y.CompletionItemKind.Keyword,
          detail: 'Not found response',
        },
        {
          label: 'omg.response.500',
          kind: Y.CompletionItemKind.Keyword,
          detail: 'Server error response',
        },
        {
          label: 'omg.returns',
          kind: Y.CompletionItemKind.Keyword,
          detail: 'Conditional responses',
        },
        { label: 'omg.type', kind: Y.CompletionItemKind.Keyword, detail: 'Type definition' },
        { label: 'omg.example', kind: Y.CompletionItemKind.Keyword, detail: 'Example data (JSON)' },
        { label: 'omg.errors', kind: Y.CompletionItemKind.Keyword, detail: 'Error definitions' },
        { label: 'omg.config', kind: Y.CompletionItemKind.Keyword, detail: 'Configuration block' }
      ),
      a
    );
  if (s.includes('@'))
    return (
      a.push(
        {
          label: '@min',
          kind: Y.CompletionItemKind.Function,
          detail: 'Minimum value',
          insertText: '@min(${1:0})',
        },
        {
          label: '@max',
          kind: Y.CompletionItemKind.Function,
          detail: 'Maximum value',
          insertText: '@max(${1:100})',
        },
        {
          label: '@minLength',
          kind: Y.CompletionItemKind.Function,
          detail: 'Minimum string length',
          insertText: '@minLength(${1:1})',
        },
        {
          label: '@maxLength',
          kind: Y.CompletionItemKind.Function,
          detail: 'Maximum string length',
          insertText: '@maxLength(${1:255})',
        },
        {
          label: '@pattern',
          kind: Y.CompletionItemKind.Function,
          detail: 'Regex pattern',
          insertText: '@pattern("${1:.*}")',
        },
        {
          label: '@format',
          kind: Y.CompletionItemKind.Function,
          detail: 'Format hint',
          insertText: '@format("${1:email}")',
        },
        {
          label: '@minItems',
          kind: Y.CompletionItemKind.Function,
          detail: 'Minimum array items',
          insertText: '@minItems(${1:1})',
        },
        {
          label: '@maxItems',
          kind: Y.CompletionItemKind.Function,
          detail: 'Maximum array items',
          insertText: '@maxItems(${1:100})',
        }
      ),
      a
    );
  if ($R(r, i)) {
    a.push(
      { label: 'string', kind: Y.CompletionItemKind.TypeParameter, detail: 'String type' },
      { label: 'integer', kind: Y.CompletionItemKind.TypeParameter, detail: 'Integer type' },
      { label: 'number', kind: Y.CompletionItemKind.TypeParameter, detail: 'Number (float) type' },
      { label: 'decimal', kind: Y.CompletionItemKind.TypeParameter, detail: 'Decimal type' },
      { label: 'boolean', kind: Y.CompletionItemKind.TypeParameter, detail: 'Boolean type' },
      { label: 'date', kind: Y.CompletionItemKind.TypeParameter, detail: 'Date type (YYYY-MM-DD)' },
      {
        label: 'datetime',
        kind: Y.CompletionItemKind.TypeParameter,
        detail: 'DateTime type (ISO 8601)',
      },
      { label: 'uuid', kind: Y.CompletionItemKind.TypeParameter, detail: 'UUID type' },
      { label: 'any', kind: Y.CompletionItemKind.TypeParameter, detail: 'Any type' }
    );
    let u = Ml();
    if (u)
      for (let [c, l] of u.types)
        a.push({
          label: c,
          kind: Y.CompletionItemKind.Class,
          detail: `Type from ${Y0.basename(l.filePath)}`,
        });
    return a;
  }
  return (
    s.match(/^method:\s*$/) &&
      a.push(
        { label: 'GET', kind: Y.CompletionItemKind.EnumMember },
        { label: 'POST', kind: Y.CompletionItemKind.EnumMember },
        { label: 'PUT', kind: Y.CompletionItemKind.EnumMember },
        { label: 'PATCH', kind: Y.CompletionItemKind.EnumMember },
        { label: 'DELETE', kind: Y.CompletionItemKind.EnumMember }
      ),
    a
  );
});
function $R(e, t) {
  let n = e.substring(0, t),
    r = n.lastIndexOf('```omg');
  return r === -1 ? !1 : n.indexOf('```', r + 6) === -1;
}
ht.onHover((e) => {
  let t = Xr.get(e.textDocument.uri);
  if (!t) return null;
  let n = e.position,
    r = t.getText(),
    i = K0(t, n);
  if (!i) return null;
  let o = VR(i);
  if (o) return { contents: { kind: Y.MarkupKind.Markdown, value: o } };
  let s = YR(i);
  if (s) return { contents: { kind: Y.MarkupKind.Markdown, value: s } };
  if (/^[A-Z][a-zA-Z0-9]*$/.test(i)) {
    let a = Ml();
    if (a) {
      let u = (0, Gt.findTypeDefinition)(a, i);
      if (u)
        return {
          contents: {
            kind: Y.MarkupKind.Markdown,
            value: (0, Gt.formatTypeForHover)(u.name, u.schema, u.filePath),
          },
        };
    }
  }
  return null;
});
ht.onDefinition((e) => {
  let t = Xr.get(e.textDocument.uri);
  if (!t) return null;
  let n = K0(t, e.position);
  if (!n || !/^[A-Z][a-zA-Z0-9]*$/.test(n)) return null;
  let r = Ml();
  if (!r) return null;
  let i = (0, Gt.findTypeDefinition)(r, n);
  return i
    ? {
        uri: (0, ra.pathToFileURL)(i.filePath).toString(),
        range: {
          start: { line: i.line - 1, character: 0 },
          end: { line: i.line - 1, character: 0 },
        },
      }
    : null;
});
function K0(e, t) {
  let n = e.getText(),
    r = e.offsetAt(t),
    i = r,
    o = r;
  for (; i > 0 && /[\w@]/.test(n[i - 1]); ) i--;
  for (; o < n.length && /[\w]/.test(n[o]); ) o++;
  return i === o ? null : n.substring(i, o);
}
function VR(e) {
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
function YR(e) {
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
Xr.listen(ht);
ht.listen();
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
