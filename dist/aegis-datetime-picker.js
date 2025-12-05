var Kt = Object.defineProperty;
var Jt = (t, e, n) => e in t ? Kt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var q = (t, e, n) => Jt(t, typeof e != "symbol" ? e + "" : e, n);
function W() {
}
function st(t) {
  return t();
}
function Le() {
  return /* @__PURE__ */ Object.create(null);
}
function ne(t) {
  t.forEach(st);
}
function rt(t) {
  return typeof t == "function";
}
function Qt(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function Gt(t) {
  return Object.keys(t).length === 0;
}
function h(t, e) {
  t.appendChild(e);
}
function Wt(t, e, n) {
  const l = Xt(t);
  if (!l.getElementById(e)) {
    const o = v("style");
    o.id = e, o.textContent = n, Zt(l, o);
  }
}
function Xt(t) {
  if (!t) return document;
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
  return e && /** @type {ShadowRoot} */
  e.host ? (
    /** @type {ShadowRoot} */
    e
  ) : t.ownerDocument;
}
function Zt(t, e) {
  return h(
    /** @type {Document} */
    t.head || t,
    e
  ), e.sheet;
}
function C(t, e, n) {
  t.insertBefore(e, n || null);
}
function x(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function ze(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function v(t) {
  return document.createElement(t);
}
function O(t) {
  return document.createTextNode(t);
}
function A() {
  return O(" ");
}
function at() {
  return O("");
}
function M(t, e, n, l) {
  return t.addEventListener(e, n, l), () => t.removeEventListener(e, n, l);
}
function u(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function en(t) {
  return Array.from(t.childNodes);
}
function U(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function G(t, e) {
  t.value = e ?? "";
}
function P(t, e, n) {
  t.classList.toggle(e, !!n);
}
function tn(t, e, { bubbles: n = !1, cancelable: l = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: n, cancelable: l });
}
function nn(t) {
  const e = {};
  return t.childNodes.forEach(
    /** @param {Element} node */
    (n) => {
      e[n.slot || "default"] = !0;
    }
  ), e;
}
let ve;
function be(t) {
  ve = t;
}
function Pe() {
  if (!ve) throw new Error("Function called outside component initialization");
  return ve;
}
function ln(t) {
  Pe().$$.on_mount.push(t);
}
function on(t) {
  Pe().$$.on_destroy.push(t);
}
function sn() {
  const t = Pe();
  return (e, n, { cancelable: l = !1 } = {}) => {
    const o = t.$$.callbacks[e];
    if (o) {
      const i = tn(
        /** @type {string} */
        e,
        n,
        { cancelable: l }
      );
      return o.slice().forEach((s) => {
        s.call(t, i);
      }), !i.defaultPrevented;
    }
    return !0;
  };
}
const re = [], ae = [];
let ue = [];
const Be = [], rn = /* @__PURE__ */ Promise.resolve();
let Ve = !1;
function an() {
  Ve || (Ve = !0, rn.then(K));
}
function Fe(t) {
  ue.push(t);
}
const Ne = /* @__PURE__ */ new Set();
let se = 0;
function K() {
  if (se !== 0)
    return;
  const t = ve;
  do {
    try {
      for (; se < re.length; ) {
        const e = re[se];
        se++, be(e), un(e.$$);
      }
    } catch (e) {
      throw re.length = 0, se = 0, e;
    }
    for (be(null), re.length = 0, se = 0; ae.length; ) ae.pop()();
    for (let e = 0; e < ue.length; e += 1) {
      const n = ue[e];
      Ne.has(n) || (Ne.add(n), n());
    }
    ue.length = 0;
  } while (re.length);
  for (; Be.length; )
    Be.pop()();
  Ve = !1, Ne.clear(), be(t);
}
function un(t) {
  if (t.fragment !== null) {
    t.update(), ne(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Fe);
  }
}
function fn(t) {
  const e = [], n = [];
  ue.forEach((l) => t.indexOf(l) === -1 ? e.push(l) : n.push(l)), n.forEach((l) => l()), ue = e;
}
const dn = /* @__PURE__ */ new Set();
function cn(t, e) {
  t && t.i && (dn.delete(t), t.i(e));
}
function Ie(t) {
  return (t == null ? void 0 : t.length) !== void 0 ? t : Array.from(t);
}
function pn(t, e, n) {
  const { fragment: l, after_update: o } = t.$$;
  l && l.m(e, n), Fe(() => {
    const i = t.$$.on_mount.map(st).filter(rt);
    t.$$.on_destroy ? t.$$.on_destroy.push(...i) : ne(i), t.$$.on_mount = [];
  }), o.forEach(Fe);
}
function hn(t, e) {
  const n = t.$$;
  n.fragment !== null && (fn(n.after_update), ne(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function gn(t, e) {
  t.$$.dirty[0] === -1 && (re.push(t), an(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function mn(t, e, n, l, o, i, s = null, r = [-1]) {
  const f = ve;
  be(t);
  const d = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: i,
    update: W,
    not_equal: o,
    bound: Le(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (f ? f.$$.context : [])),
    // everything else
    callbacks: Le(),
    dirty: r,
    skip_bound: !1,
    root: e.target || f.$$.root
  };
  s && s(d.root);
  let p = !1;
  if (d.ctx = n ? n(t, e.props || {}, (c, _, ...$) => {
    const Y = $.length ? $[0] : _;
    return d.ctx && o(d.ctx[c], d.ctx[c] = Y) && (!d.skip_bound && d.bound[c] && d.bound[c](Y), p && gn(t, c)), _;
  }) : [], d.update(), p = !0, ne(d.before_update), d.fragment = l ? l(d.ctx) : !1, e.target) {
    if (e.hydrate) {
      const c = en(e.target);
      d.fragment && d.fragment.l(c), c.forEach(x);
    } else
      d.fragment && d.fragment.c();
    e.intro && cn(t.$$.fragment), pn(t, e.target, e.anchor), K();
  }
  be(f);
}
let ut;
typeof HTMLElement == "function" && (ut = class extends HTMLElement {
  constructor(e, n, l) {
    super();
    /** The Svelte component constructor */
    q(this, "$$ctor");
    /** Slots */
    q(this, "$$s");
    /** The Svelte component instance */
    q(this, "$$c");
    /** Whether or not the custom element is connected */
    q(this, "$$cn", !1);
    /** Component props data */
    q(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    q(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    q(this, "$$p_d", {});
    /** @type {Record<string, Function[]>} Event listeners */
    q(this, "$$l", {});
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    q(this, "$$l_u", /* @__PURE__ */ new Map());
    this.$$ctor = e, this.$$s = n, l && this.attachShadow({ mode: "open" });
  }
  addEventListener(e, n, l) {
    if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(n), this.$$c) {
      const o = this.$$c.$on(e, n);
      this.$$l_u.set(n, o);
    }
    super.addEventListener(e, n, l);
  }
  removeEventListener(e, n, l) {
    if (super.removeEventListener(e, n, l), this.$$c) {
      const o = this.$$l_u.get(n);
      o && (o(), this.$$l_u.delete(n));
    }
    if (this.$$l[e]) {
      const o = this.$$l[e].indexOf(n);
      o >= 0 && this.$$l[e].splice(o, 1);
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let e = function(i) {
        return () => {
          let s;
          return {
            c: function() {
              s = v("slot"), i !== "default" && u(s, "name", i);
            },
            /**
             * @param {HTMLElement} target
             * @param {HTMLElement} [anchor]
             */
            m: function(d, p) {
              C(d, s, p);
            },
            d: function(d) {
              d && x(s);
            }
          };
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const n = {}, l = nn(this);
      for (const i of this.$$s)
        i in l && (n[i] = [e(i)]);
      for (const i of this.attributes) {
        const s = this.$$g_p(i.name);
        s in this.$$d || (this.$$d[s] = Me(s, i.value, this.$$p_d, "toProp"));
      }
      for (const i in this.$$p_d)
        !(i in this.$$d) && this[i] !== void 0 && (this.$$d[i] = this[i], delete this[i]);
      this.$$c = new this.$$ctor({
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: n,
          $$scope: {
            ctx: []
          }
        }
      });
      const o = () => {
        this.$$r = !0;
        for (const i in this.$$p_d)
          if (this.$$d[i] = this.$$c.$$.ctx[this.$$c.$$.props[i]], this.$$p_d[i].reflect) {
            const s = Me(
              i,
              this.$$d[i],
              this.$$p_d,
              "toAttribute"
            );
            s == null ? this.removeAttribute(this.$$p_d[i].attribute || i) : this.setAttribute(this.$$p_d[i].attribute || i, s);
          }
        this.$$r = !1;
      };
      this.$$c.$$.after_update.push(o), o();
      for (const i in this.$$l)
        for (const s of this.$$l[i]) {
          const r = this.$$c.$on(i, s);
          this.$$l_u.set(s, r);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  attributeChangedCallback(e, n, l) {
    var o;
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = Me(e, l, this.$$p_d, "toProp"), (o = this.$$c) == null || o.$set({ [e]: this.$$d[e] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$c = void 0);
    });
  }
  $$g_p(e) {
    return Object.keys(this.$$p_d).find(
      (n) => this.$$p_d[n].attribute === e || !this.$$p_d[n].attribute && n.toLowerCase() === e
    ) || e;
  }
});
function Me(t, e, n, l) {
  var i;
  const o = (i = n[t]) == null ? void 0 : i.type;
  if (e = o === "Boolean" && typeof e != "boolean" ? e != null : e, !l || !n[t])
    return e;
  if (l === "toAttribute")
    switch (o) {
      case "Object":
      case "Array":
        return e == null ? null : JSON.stringify(e);
      case "Boolean":
        return e ? "" : null;
      case "Number":
        return e ?? null;
      default:
        return e;
    }
  else
    switch (o) {
      case "Object":
      case "Array":
        return e && JSON.parse(e);
      case "Boolean":
        return e;
      case "Number":
        return e != null ? +e : e;
      default:
        return e;
    }
}
function bn(t, e, n, l, o, i) {
  let s = class extends ut {
    constructor() {
      super(t, n, o), this.$$p_d = e;
    }
    static get observedAttributes() {
      return Object.keys(e).map(
        (r) => (e[r].attribute || r).toLowerCase()
      );
    }
  };
  return Object.keys(e).forEach((r) => {
    Object.defineProperty(s.prototype, r, {
      get() {
        return this.$$c && r in this.$$c ? this.$$c[r] : this.$$d[r];
      },
      set(f) {
        var d;
        f = Me(r, f, e), this.$$d[r] = f, (d = this.$$c) == null || d.$set({ [r]: f });
      }
    });
  }), l.forEach((r) => {
    Object.defineProperty(s.prototype, r, {
      get() {
        var f;
        return (f = this.$$c) == null ? void 0 : f[r];
      }
    });
  }), t.element = /** @type {any} */
  s, s;
}
class vn {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    q(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    q(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    hn(this, 1), this.$destroy = W;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!rt(n))
      return W;
    const l = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return l.push(n), () => {
      const o = l.indexOf(n);
      o !== -1 && l.splice(o, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(e) {
    this.$$set && !Gt(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const _n = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(_n);
function T(t, e = 2) {
  return String(t).padStart(e, "0");
}
function De(t) {
  if (!t) return null;
  const e = t.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!e) return null;
  const [, n, l, o, i, s] = e.map(Number), r = new Date(n, l - 1, o, i, s, 0, 0);
  return r.getFullYear() !== n || r.getMonth() !== l - 1 || r.getDate() !== o ? null : r;
}
function Re(t) {
  if (!t || !(t instanceof Date) || isNaN(t.getTime())) return "";
  const e = t.getFullYear(), n = T(t.getMonth() + 1), l = T(t.getDate()), o = T(t.getHours()), i = T(t.getMinutes());
  return `${e}-${n}-${l}T${o}:${i}`;
}
function Ue(t) {
  return !t || !(t instanceof Date) || isNaN(t.getTime()) ? "" : `${t.getFullYear()}-${T(t.getMonth() + 1)}-${T(t.getDate())}`;
}
function Ke(t) {
  return !t || !(t instanceof Date) || isNaN(t.getTime()) ? "" : `${T(t.getHours())}:${T(t.getMinutes())}`;
}
function fe(t, e) {
  return !t || !(t instanceof Date) || isNaN(t.getTime()) ? "" : e.replace("YYYY", String(t.getFullYear())).replace("MM", T(t.getMonth() + 1)).replace("DD", T(t.getDate()));
}
function de(t, e) {
  if (!t || !(t instanceof Date) || isNaN(t.getTime())) return "";
  const n = t.getHours(), l = n % 12 || 12, o = n < 12 ? "AM" : "PM";
  return e.replace("HH", T(n)).replace("hh", T(l)).replace("mm", T(t.getMinutes())).replace("A", o);
}
function yn(t, e) {
  if (!t || !e) return null;
  let n = e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace("YYYY", "(\\d{4})").replace("MM", "(\\d{1,2})").replace("DD", "(\\d{1,2})");
  const l = [], o = e;
  ["YYYY", "MM", "DD"].forEach((p) => {
    const c = o.indexOf(p);
    c !== -1 && l.push({ token: p, idx: c });
  }), l.sort((p, c) => p.idx - c.idx);
  const i = t.match(new RegExp(`^${n}$`));
  if (!i) return null;
  let s, r, f;
  if (l.forEach((p, c) => {
    const _ = parseInt(i[c + 1], 10);
    p.token === "YYYY" ? s = _ : p.token === "MM" ? r = _ : p.token === "DD" && (f = _);
  }), s === void 0 || r === void 0 || f === void 0 || r < 1 || r > 12 || f < 1 || f > 31) return null;
  const d = new Date(s, r - 1, f);
  return d.getFullYear() !== s || d.getMonth() !== r - 1 || d.getDate() !== f ? null : { year: s, month: r, day: f };
}
function kn(t, e) {
  if (!t || !e) return null;
  const n = e.includes("hh"), l = e.includes("A");
  let o = e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace("HH", "(\\d{1,2})").replace("hh", "(\\d{1,2})").replace("mm", "(\\d{1,2})").replace("A", "(AM|PM|am|pm)");
  const i = t.match(new RegExp(`^${o}$`, "i"));
  if (!i) return null;
  const s = [];
  ["HH", "hh", "mm", "A"].forEach((p) => {
    const c = e.indexOf(p);
    c !== -1 && s.push({ token: p, idx: c });
  }), s.sort((p, c) => p.idx - c.idx);
  let r = 0, f = 0, d = "";
  if (s.forEach((p, c) => {
    const _ = i[c + 1];
    p.token === "HH" || p.token === "hh" ? r = parseInt(_, 10) : p.token === "mm" ? f = parseInt(_, 10) : p.token === "A" && (d = _.toUpperCase());
  }), n) {
    if (r < 1 || r > 12) return null;
  } else if (r < 0 || r > 23) return null;
  return f < 0 || f > 59 ? null : (n && l && (d === "AM" ? r === 12 && (r = 0) : d === "PM" && r !== 12 && (r += 12)), { hours: r, minutes: f });
}
function _e() {
  const t = /* @__PURE__ */ new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
}
function wn() {
  const t = _e();
  return t.setDate(t.getDate() - 1), t;
}
function Dn() {
  const t = _e(), e = t.getMonth() + 1, n = t.getFullYear() + Math.floor(e / 12), l = e % 12, o = new Date(n, l + 1, 0).getDate(), i = Math.min(t.getDate(), o);
  return new Date(n, l, i, 0, 0, 0, 0);
}
function Mn() {
  const t = _e(), e = t.getFullYear() + 1, n = t.getMonth(), l = new Date(e, n + 1, 0).getDate(), o = Math.min(t.getDate(), l);
  return new Date(e, n, o, 0, 0, 0, 0);
}
function $n(t, e) {
  return new Date(t, e + 1, 0).getDate();
}
function En(t, e) {
  return new Date(t, e, 1).getDay();
}
function Je(t, e) {
  return !t || !e ? !1 : t.getFullYear() === e.getFullYear() && t.getMonth() === e.getMonth() && t.getDate() === e.getDate();
}
function me(t) {
  return new Date(t.getTime());
}
function An(t, e) {
  const n = me(t);
  return n.setFullYear(e.getFullYear(), e.getMonth(), e.getDate()), n;
}
function Te(t, e, n) {
  return !(!t || e && t < e || n && t > n);
}
const Qe = [
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
  "December"
], Yn = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function xn(t) {
  Wt(t, "svelte-1d0of32", ":host{--aegis-dtp-bg:#ffffff;--aegis-dtp-text:#1a1a2e;--aegis-dtp-accent:#3b82f6;--aegis-dtp-hover-bg:#dbeafe;--aegis-dtp-border-radius:6px;--aegis-dtp-border:#cbd5e1;--aegis-dtp-invalid:#ef4444;display:inline-block;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;font-size:14px}.aegis-dtp-root.svelte-1d0of32.svelte-1d0of32{background:var(--aegis-dtp-bg);color:var(--aegis-dtp-text);border-radius:var(--aegis-dtp-border-radius)}.aegis-dtp-root.invalid.svelte-1d0of32.svelte-1d0of32{outline:2px solid var(--aegis-dtp-invalid)}.trigger.svelte-1d0of32.svelte-1d0of32{display:flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid var(--aegis-dtp-border);border-radius:var(--aegis-dtp-border-radius);background:var(--aegis-dtp-bg);color:var(--aegis-dtp-text);cursor:pointer;min-width:150px;text-align:left;font-size:14px}.trigger.svelte-1d0of32.svelte-1d0of32:hover{background:var(--aegis-dtp-hover-bg)}.trigger.svelte-1d0of32 .placeholder.svelte-1d0of32{color:#94a3b8}.panel.svelte-1d0of32.svelte-1d0of32{padding:12px;border:1px solid var(--aegis-dtp-border);border-radius:var(--aegis-dtp-border-radius);background:var(--aegis-dtp-bg)}.popup-panel.svelte-1d0of32.svelte-1d0of32{position:absolute;z-index:1000;margin-top:4px;box-shadow:0 4px 12px rgba(0, 0, 0, 0.15)}.popup-mode.svelte-1d0of32.svelte-1d0of32{position:relative}.input-row.svelte-1d0of32.svelte-1d0of32{margin-bottom:12px}.date-input.svelte-1d0of32.svelte-1d0of32,.time-input.svelte-1d0of32.svelte-1d0of32{width:100%;padding:8px 10px;border:1px solid var(--aegis-dtp-border);border-radius:var(--aegis-dtp-border-radius);font-size:14px;box-sizing:border-box;color:var(--aegis-dtp-text);background:var(--aegis-dtp-bg)}.date-input.svelte-1d0of32.svelte-1d0of32:focus,.time-input.svelte-1d0of32.svelte-1d0of32:focus{outline:none;border-color:var(--aegis-dtp-accent);box-shadow:0 0 0 2px rgba(59, 130, 246, 0.2)}.date-input.invalid.svelte-1d0of32.svelte-1d0of32,.time-input.invalid.svelte-1d0of32.svelte-1d0of32{border-color:var(--aegis-dtp-invalid)}.calendar-nav.svelte-1d0of32.svelte-1d0of32{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}.nav-btn.svelte-1d0of32.svelte-1d0of32{padding:4px 10px;border:1px solid var(--aegis-dtp-border);border-radius:var(--aegis-dtp-border-radius);background:var(--aegis-dtp-bg);color:var(--aegis-dtp-accent);cursor:pointer;font-size:14px;font-weight:bold}.nav-btn.svelte-1d0of32.svelte-1d0of32:hover{background:var(--aegis-dtp-hover-bg)}.month-year.svelte-1d0of32.svelte-1d0of32{font-weight:600;color:var(--aegis-dtp-text)}.calendar.svelte-1d0of32.svelte-1d0of32{width:100%}.calendar.svelte-1d0of32.svelte-1d0of32:focus{outline:2px solid var(--aegis-dtp-accent);outline-offset:2px}.weekdays.svelte-1d0of32.svelte-1d0of32{display:grid;grid-template-columns:repeat(7, 1fr);gap:2px;margin-bottom:4px}.weekday.svelte-1d0of32.svelte-1d0of32{text-align:center;font-size:11px;font-weight:600;color:#64748b;padding:4px 0}.days.svelte-1d0of32.svelte-1d0of32{display:grid;grid-template-columns:repeat(7, 1fr);gap:2px}.day.svelte-1d0of32.svelte-1d0of32{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border:none;border-radius:var(--aegis-dtp-border-radius);background:transparent;color:var(--aegis-dtp-text);cursor:pointer;font-size:13px;min-width:32px;min-height:32px}.day.svelte-1d0of32.svelte-1d0of32:hover:not(.disabled):not(.selected){background:var(--aegis-dtp-hover-bg)}.day.empty.svelte-1d0of32.svelte-1d0of32{cursor:default}.day.today.svelte-1d0of32.svelte-1d0of32{border:2px solid var(--aegis-dtp-accent)}.day.selected.svelte-1d0of32.svelte-1d0of32{background:var(--aegis-dtp-accent);color:white}.day.disabled.svelte-1d0of32.svelte-1d0of32{color:#cbd5e1;cursor:not-allowed}.date-section.svelte-1d0of32.svelte-1d0of32{margin-bottom:12px}.time-section.svelte-1d0of32.svelte-1d0of32{border-top:1px solid var(--aegis-dtp-border);padding-top:12px;margin-bottom:12px}.time-controls.svelte-1d0of32.svelte-1d0of32{display:flex;align-items:center;justify-content:center;gap:4px}.time-field.svelte-1d0of32.svelte-1d0of32{display:flex;flex-direction:column;align-items:center;gap:2px}.spinner-btn.svelte-1d0of32.svelte-1d0of32{width:32px;height:24px;border:1px solid var(--aegis-dtp-border);border-radius:4px;background:var(--aegis-dtp-bg);color:var(--aegis-dtp-accent);cursor:pointer;font-size:14px;font-weight:bold;display:flex;align-items:center;justify-content:center}.spinner-btn.svelte-1d0of32.svelte-1d0of32:hover{background:var(--aegis-dtp-hover-bg)}.time-value.svelte-1d0of32.svelte-1d0of32{width:40px;text-align:center;padding:6px 4px;border:1px solid var(--aegis-dtp-border);border-radius:4px;font-size:16px;font-weight:600;color:var(--aegis-dtp-text);background:var(--aegis-dtp-bg)}.time-value.svelte-1d0of32.svelte-1d0of32:focus{outline:none;border-color:var(--aegis-dtp-accent)}.time-separator.svelte-1d0of32.svelte-1d0of32{font-size:20px;font-weight:bold;color:var(--aegis-dtp-text);padding:0 4px;align-self:center}.ampm-btn.svelte-1d0of32.svelte-1d0of32{padding:6px 10px;border:1px solid var(--aegis-dtp-border);border-radius:4px;background:var(--aegis-dtp-accent);color:white;cursor:pointer;font-size:12px;font-weight:600;margin-left:8px;align-self:center}.ampm-btn.svelte-1d0of32.svelte-1d0of32:hover{opacity:0.9}.quick-dates.svelte-1d0of32.svelte-1d0of32{display:flex;flex-wrap:wrap;gap:6px;border-top:1px solid var(--aegis-dtp-border);padding-top:12px}.quick-btn.svelte-1d0of32.svelte-1d0of32{flex:1;min-width:80px;padding:6px 8px;border:1px solid var(--aegis-dtp-accent);border-radius:var(--aegis-dtp-border-radius);background:var(--aegis-dtp-bg);color:var(--aegis-dtp-accent);cursor:pointer;font-size:12px;font-weight:500;white-space:nowrap}.quick-btn.svelte-1d0of32.svelte-1d0of32:hover{background:var(--aegis-dtp-accent);color:white}.validation-message.svelte-1d0of32.svelte-1d0of32{margin-top:8px;padding:6px 8px;background:#fef2f2;border:1px solid var(--aegis-dtp-invalid);border-radius:4px;color:var(--aegis-dtp-invalid);font-size:12px}");
}
function Ge(t, e, n) {
  const l = t.slice();
  return l[93] = e[n].day, l[94] = e[n].isToday, l[95] = e[n].isSelected, l[96] = e[n].isDisabled, l[98] = n, l;
}
function Cn(t, e, n) {
  const l = t.slice();
  return l[93] = e[n], l;
}
function We(t) {
  let e, n;
  return {
    c() {
      e = v("input"), u(e, "type", "hidden"), u(
        e,
        "name",
        /*name*/
        t[1]
      ), e.value = n = /*canonicalValue*/
      t[25] || "";
    },
    m(l, o) {
      C(l, e, o);
    },
    p(l, o) {
      o[0] & /*name*/
      2 && u(
        e,
        "name",
        /*name*/
        l[1]
      ), o[0] & /*canonicalValue*/
      33554432 && n !== (n = /*canonicalValue*/
      l[25] || "") && (e.value = n);
    },
    d(l) {
      l && x(e);
    }
  };
}
function Xe(t) {
  let e, n, l;
  function o(r, f) {
    return (
      /*canonicalValue*/
      r[25] ? In : Nn
    );
  }
  let i = o(t), s = i(t);
  return {
    c() {
      e = v("button"), s.c(), u(e, "type", "button"), u(e, "class", "trigger svelte-1d0of32"), u(e, "aria-haspopup", "dialog"), u(
        e,
        "aria-expanded",
        /*isPopupOpen*/
        t[9]
      );
    },
    m(r, f) {
      C(r, e, f), s.m(e, null), t[53](e), n || (l = M(
        e,
        "click",
        /*togglePopup*/
        t[44]
      ), n = !0);
    },
    p(r, f) {
      i === (i = o(r)) && s ? s.p(r, f) : (s.d(1), s = i(r), s && (s.c(), s.m(e, null))), f[0] & /*isPopupOpen*/
      512 && u(
        e,
        "aria-expanded",
        /*isPopupOpen*/
        r[9]
      );
    },
    d(r) {
      r && x(e), s.d(), t[53](null), n = !1, l();
    }
  };
}
function Nn(t) {
  let e, n, l;
  return {
    c() {
      e = v("span"), n = O("Select "), l = O(
        /*mode*/
        t[0]
      ), u(e, "class", "placeholder svelte-1d0of32");
    },
    m(o, i) {
      C(o, e, i), h(e, n), h(e, l);
    },
    p(o, i) {
      i[0] & /*mode*/
      1 && U(
        l,
        /*mode*/
        o[0]
      );
    },
    d(o) {
      o && x(e);
    }
  };
}
function In(t) {
  let e;
  function n(i, s) {
    return (
      /*showDateUI*/
      i[8] && /*showTimeUI*/
      i[27] ? Fn : (
        /*showDateUI*/
        i[8] ? Vn : Tn
      )
    );
  }
  let l = n(t), o = l(t);
  return {
    c() {
      o.c(), e = at();
    },
    m(i, s) {
      o.m(i, s), C(i, e, s);
    },
    p(i, s) {
      l === (l = n(i)) && o ? o.p(i, s) : (o.d(1), o = l(i), o && (o.c(), o.m(e.parentNode, e)));
    },
    d(i) {
      i && x(e), o.d(i);
    }
  };
}
function Tn(t) {
  let e = de(
    /*internalDate*/
    t[3],
    /*timeFormat*/
    t[7]
  ) + "", n;
  return {
    c() {
      n = O(e);
    },
    m(l, o) {
      C(l, n, o);
    },
    p(l, o) {
      o[0] & /*internalDate, timeFormat*/
      136 && e !== (e = de(
        /*internalDate*/
        l[3],
        /*timeFormat*/
        l[7]
      ) + "") && U(n, e);
    },
    d(l) {
      l && x(n);
    }
  };
}
function Vn(t) {
  let e = fe(
    /*internalDate*/
    t[3],
    /*dateFormat*/
    t[24]
  ) + "", n;
  return {
    c() {
      n = O(e);
    },
    m(l, o) {
      C(l, n, o);
    },
    p(l, o) {
      o[0] & /*internalDate, dateFormat*/
      16777224 && e !== (e = fe(
        /*internalDate*/
        l[3],
        /*dateFormat*/
        l[24]
      ) + "") && U(n, e);
    },
    d(l) {
      l && x(n);
    }
  };
}
function Fn(t) {
  let e = fe(
    /*internalDate*/
    t[3],
    /*dateFormat*/
    t[24]
  ) + "", n, l, o = de(
    /*internalDate*/
    t[3],
    /*timeFormat*/
    t[7]
  ) + "", i;
  return {
    c() {
      n = O(e), l = A(), i = O(o);
    },
    m(s, r) {
      C(s, n, r), C(s, l, r), C(s, i, r);
    },
    p(s, r) {
      r[0] & /*internalDate, dateFormat*/
      16777224 && e !== (e = fe(
        /*internalDate*/
        s[3],
        /*dateFormat*/
        s[24]
      ) + "") && U(n, e), r[0] & /*internalDate, timeFormat*/
      136 && o !== (o = de(
        /*internalDate*/
        s[3],
        /*timeFormat*/
        s[7]
      ) + "") && U(i, o);
    },
    d(s) {
      s && (x(n), x(l), x(i));
    }
  };
}
function Ze(t) {
  let e, n, l, o, i, s, r = (
    /*showDateUI*/
    t[8] && et(t)
  ), f = (
    /*showTimeUI*/
    t[27] && nt(t)
  ), d = (
    /*showQuickDates*/
    t[26] && it(t)
  ), p = !/*isValid*/
  t[10] && /*validationMessage*/
  t[11] && ot(t);
  return {
    c() {
      e = v("div"), r && r.c(), n = A(), f && f.c(), l = A(), d && d.c(), o = A(), p && p.c(), u(e, "class", "panel svelte-1d0of32"), u(e, "role", i = /*popup*/
      t[2] ? "dialog" : void 0), u(e, "aria-modal", s = /*popup*/
      t[2] ? "true" : void 0), P(
        e,
        "popup-panel",
        /*popup*/
        t[2]
      );
    },
    m(c, _) {
      C(c, e, _), r && r.m(e, null), h(e, n), f && f.m(e, null), h(e, l), d && d.m(e, null), h(e, o), p && p.m(e, null), t[68](e);
    },
    p(c, _) {
      /*showDateUI*/
      c[8] ? r ? r.p(c, _) : (r = et(c), r.c(), r.m(e, n)) : r && (r.d(1), r = null), /*showTimeUI*/
      c[27] ? f ? f.p(c, _) : (f = nt(c), f.c(), f.m(e, l)) : f && (f.d(1), f = null), /*showQuickDates*/
      c[26] ? d ? d.p(c, _) : (d = it(c), d.c(), d.m(e, o)) : d && (d.d(1), d = null), !/*isValid*/
      c[10] && /*validationMessage*/
      c[11] ? p ? p.p(c, _) : (p = ot(c), p.c(), p.m(e, null)) : p && (p.d(1), p = null), _[0] & /*popup*/
      4 && i !== (i = /*popup*/
      c[2] ? "dialog" : void 0) && u(e, "role", i), _[0] & /*popup*/
      4 && s !== (s = /*popup*/
      c[2] ? "true" : void 0) && u(e, "aria-modal", s), _[0] & /*popup*/
      4 && P(
        e,
        "popup-panel",
        /*popup*/
        c[2]
      );
    },
    d(c) {
      c && x(e), r && r.d(), f && f.d(), d && d.d(), p && p.d(), t[68](null);
    }
  };
}
function et(t) {
  let e, n, l, o, i, s, r, f, d = Qe[
    /*viewMonth*/
    t[5]
  ] + "", p, c, _, $, Y, N, E, H, I, L, S, J, m = Ie(Yn), V = [];
  for (let g = 0; g < m.length; g += 1)
    V[g] = Pn(Cn(t, m, g));
  let w = Ie(
    /*calendarDays*/
    t[6]
  ), y = [];
  for (let g = 0; g < w.length; g += 1)
    y[g] = tt(Ge(t, w, g));
  return {
    c() {
      e = v("div"), n = v("div"), l = v("input"), o = A(), i = v("div"), s = v("button"), s.textContent = "<", r = A(), f = v("span"), p = O(d), c = A(), _ = O(
        /*viewYear*/
        t[4]
      ), $ = A(), Y = v("button"), Y.textContent = ">", N = A(), E = v("div"), H = v("div");
      for (let g = 0; g < V.length; g += 1)
        V[g].c();
      I = A(), L = v("div");
      for (let g = 0; g < y.length; g += 1)
        y[g].c();
      u(l, "type", "text"), u(l, "class", "date-input svelte-1d0of32"), u(
        l,
        "placeholder",
        /*dateFormat*/
        t[24]
      ), u(l, "aria-label", "Date"), u(
        l,
        "aria-invalid",
        /*dateInputInvalid*/
        t[14]
      ), P(
        l,
        "invalid",
        /*dateInputInvalid*/
        t[14]
      ), u(n, "class", "input-row svelte-1d0of32"), u(s, "type", "button"), u(s, "class", "nav-btn svelte-1d0of32"), u(s, "aria-label", "Previous month"), u(f, "class", "month-year svelte-1d0of32"), u(Y, "type", "button"), u(Y, "class", "nav-btn svelte-1d0of32"), u(Y, "aria-label", "Next month"), u(i, "class", "calendar-nav svelte-1d0of32"), u(H, "class", "weekdays svelte-1d0of32"), u(H, "role", "row"), u(L, "class", "days svelte-1d0of32"), u(E, "class", "calendar svelte-1d0of32"), u(E, "role", "grid"), u(E, "aria-label", "Calendar"), u(E, "tabindex", "0"), u(e, "class", "date-section svelte-1d0of32");
    },
    m(g, D) {
      C(g, e, D), h(e, n), h(n, l), G(
        l,
        /*dateInputValue*/
        t[12]
      ), h(e, o), h(e, i), h(i, s), h(i, r), h(i, f), h(f, p), h(f, c), h(f, _), h(i, $), h(i, Y), h(e, N), h(e, E), h(E, H);
      for (let k = 0; k < V.length; k += 1)
        V[k] && V[k].m(H, null);
      h(E, I), h(E, L);
      for (let k = 0; k < y.length; k += 1)
        y[k] && y[k].m(L, null);
      t[56](E), S || (J = [
        M(
          l,
          "input",
          /*input_input_handler*/
          t[54]
        ),
        M(
          l,
          "blur",
          /*handleDateInputBlur*/
          t[28]
        ),
        M(
          l,
          "keydown",
          /*handleDateInputKeydown*/
          t[29]
        ),
        M(
          s,
          "click",
          /*prevMonth*/
          t[39]
        ),
        M(
          Y,
          "click",
          /*nextMonth*/
          t[40]
        ),
        M(
          E,
          "keydown",
          /*handleCalendarKeydown*/
          t[42]
        )
      ], S = !0);
    },
    p(g, D) {
      if (D[0] & /*dateFormat*/
      16777216 && u(
        l,
        "placeholder",
        /*dateFormat*/
        g[24]
      ), D[0] & /*dateInputInvalid*/
      16384 && u(
        l,
        "aria-invalid",
        /*dateInputInvalid*/
        g[14]
      ), D[0] & /*dateInputValue*/
      4096 && l.value !== /*dateInputValue*/
      g[12] && G(
        l,
        /*dateInputValue*/
        g[12]
      ), D[0] & /*dateInputInvalid*/
      16384 && P(
        l,
        "invalid",
        /*dateInputInvalid*/
        g[14]
      ), D[0] & /*viewMonth*/
      32 && d !== (d = Qe[
        /*viewMonth*/
        g[5]
      ] + "") && U(p, d), D[0] & /*viewYear*/
      16 && U(
        _,
        /*viewYear*/
        g[4]
      ), D[0] & /*calendarDays*/
      64 | D[1] & /*selectDay*/
      1024) {
        w = Ie(
          /*calendarDays*/
          g[6]
        );
        let k;
        for (k = 0; k < w.length; k += 1) {
          const z = Ge(g, w, k);
          y[k] ? y[k].p(z, D) : (y[k] = tt(z), y[k].c(), y[k].m(L, null));
        }
        for (; k < y.length; k += 1)
          y[k].d(1);
        y.length = w.length;
      }
    },
    d(g) {
      g && x(e), ze(V, g), ze(y, g), t[56](null), S = !1, ne(J);
    }
  };
}
function Pn(t) {
  let e;
  return {
    c() {
      e = v("span"), e.textContent = `${/*day*/
      t[93]}`, u(e, "class", "weekday svelte-1d0of32"), u(e, "role", "columnheader");
    },
    m(n, l) {
      C(n, e, l);
    },
    p: W,
    d(n) {
      n && x(e);
    }
  };
}
function Sn(t) {
  let e, n = (
    /*day*/
    t[93] + ""
  ), l, o, i, s, r, f, d, p;
  function c() {
    return (
      /*click_handler*/
      t[55](
        /*day*/
        t[93]
      )
    );
  }
  return {
    c() {
      e = v("button"), l = O(n), o = A(), u(e, "type", "button"), u(e, "class", "day svelte-1d0of32"), u(e, "role", "gridcell"), u(e, "aria-selected", i = /*isSelected*/
      t[95]), u(e, "aria-current", s = /*isToday*/
      t[94] ? "date" : void 0), u(e, "aria-disabled", r = /*isDisabled*/
      t[96]), e.disabled = f = /*isDisabled*/
      t[96], u(e, "tabindex", "-1"), P(
        e,
        "today",
        /*isToday*/
        t[94]
      ), P(
        e,
        "selected",
        /*isSelected*/
        t[95]
      ), P(
        e,
        "disabled",
        /*isDisabled*/
        t[96]
      );
    },
    m(_, $) {
      C(_, e, $), h(e, l), h(e, o), d || (p = M(e, "click", c), d = !0);
    },
    p(_, $) {
      t = _, $[0] & /*calendarDays*/
      64 && n !== (n = /*day*/
      t[93] + "") && U(l, n), $[0] & /*calendarDays*/
      64 && i !== (i = /*isSelected*/
      t[95]) && u(e, "aria-selected", i), $[0] & /*calendarDays*/
      64 && s !== (s = /*isToday*/
      t[94] ? "date" : void 0) && u(e, "aria-current", s), $[0] & /*calendarDays*/
      64 && r !== (r = /*isDisabled*/
      t[96]) && u(e, "aria-disabled", r), $[0] & /*calendarDays*/
      64 && f !== (f = /*isDisabled*/
      t[96]) && (e.disabled = f), $[0] & /*calendarDays*/
      64 && P(
        e,
        "today",
        /*isToday*/
        t[94]
      ), $[0] & /*calendarDays*/
      64 && P(
        e,
        "selected",
        /*isSelected*/
        t[95]
      ), $[0] & /*calendarDays*/
      64 && P(
        e,
        "disabled",
        /*isDisabled*/
        t[96]
      );
    },
    d(_) {
      _ && x(e), d = !1, p();
    }
  };
}
function Hn(t) {
  let e;
  return {
    c() {
      e = v("span"), u(e, "class", "day empty svelte-1d0of32"), u(e, "role", "gridcell");
    },
    m(n, l) {
      C(n, e, l);
    },
    p: W,
    d(n) {
      n && x(e);
    }
  };
}
function tt(t) {
  let e;
  function n(i, s) {
    return (
      /*day*/
      i[93] === null ? Hn : Sn
    );
  }
  let l = n(t), o = l(t);
  return {
    c() {
      o.c(), e = at();
    },
    m(i, s) {
      o.m(i, s), C(i, e, s);
    },
    p(i, s) {
      l === (l = n(i)) && o ? o.p(i, s) : (o.d(1), o = l(i), o && (o.c(), o.m(e.parentNode, e)));
    },
    d(i) {
      i && x(e), o.d(i);
    }
  };
}
function nt(t) {
  let e, n, l, o, i, s, r, f, d, p, c, _, $, Y, N, E, H, I, L, S, J, m, V, w = (
    /*hasAmPm*/
    t[23] && lt(t)
  );
  return {
    c() {
      e = v("div"), n = v("div"), l = v("input"), o = A(), i = v("div"), s = v("div"), r = v("button"), r.textContent = "+", f = A(), d = v("input"), p = A(), c = v("button"), c.textContent = "−", _ = A(), $ = v("span"), $.textContent = ":", Y = A(), N = v("div"), E = v("button"), E.textContent = "+", H = A(), I = v("input"), L = A(), S = v("button"), S.textContent = "−", J = A(), w && w.c(), u(l, "type", "text"), u(l, "class", "time-input svelte-1d0of32"), u(
        l,
        "placeholder",
        /*timeFormat*/
        t[7]
      ), u(l, "aria-label", "Time"), u(
        l,
        "aria-invalid",
        /*timeInputInvalid*/
        t[15]
      ), P(
        l,
        "invalid",
        /*timeInputInvalid*/
        t[15]
      ), u(n, "class", "input-row svelte-1d0of32"), u(r, "type", "button"), u(r, "class", "spinner-btn svelte-1d0of32"), u(r, "aria-label", "Increase hour"), u(d, "type", "text"), u(d, "class", "time-value svelte-1d0of32"), u(d, "aria-label", "Hour"), u(d, "maxlength", "2"), u(c, "type", "button"), u(c, "class", "spinner-btn svelte-1d0of32"), u(c, "aria-label", "Decrease hour"), u(s, "class", "time-field svelte-1d0of32"), u($, "class", "time-separator svelte-1d0of32"), u(E, "type", "button"), u(E, "class", "spinner-btn svelte-1d0of32"), u(E, "aria-label", "Increase minute"), u(I, "type", "text"), u(I, "class", "time-value svelte-1d0of32"), u(I, "aria-label", "Minute"), u(I, "maxlength", "2"), u(S, "type", "button"), u(S, "class", "spinner-btn svelte-1d0of32"), u(S, "aria-label", "Decrease minute"), u(N, "class", "time-field svelte-1d0of32"), u(i, "class", "time-controls svelte-1d0of32"), u(e, "class", "time-section svelte-1d0of32");
    },
    m(y, g) {
      C(y, e, g), h(e, n), h(n, l), G(
        l,
        /*timeInputValue*/
        t[13]
      ), h(e, o), h(e, i), h(i, s), h(s, r), h(s, f), h(s, d), G(
        d,
        /*hourValue*/
        t[16]
      ), h(s, p), h(s, c), h(i, _), h(i, $), h(i, Y), h(i, N), h(N, E), h(N, H), h(N, I), G(
        I,
        /*minuteValue*/
        t[17]
      ), h(N, L), h(N, S), h(i, J), w && w.m(i, null), m || (V = [
        M(
          l,
          "input",
          /*input0_input_handler*/
          t[57]
        ),
        M(
          l,
          "blur",
          /*handleTimeInputBlur*/
          t[30]
        ),
        M(
          l,
          "keydown",
          /*handleTimeInputKeydown*/
          t[31]
        ),
        M(
          r,
          "click",
          /*click_handler_1*/
          t[58]
        ),
        M(
          d,
          "input",
          /*input1_input_handler*/
          t[59]
        ),
        M(
          d,
          "keydown",
          /*handleHourKeydown*/
          t[35]
        ),
        M(
          d,
          "blur",
          /*handleHourBlur*/
          t[37]
        ),
        M(
          c,
          "click",
          /*click_handler_2*/
          t[60]
        ),
        M(
          E,
          "click",
          /*click_handler_3*/
          t[61]
        ),
        M(
          I,
          "input",
          /*input2_input_handler*/
          t[62]
        ),
        M(
          I,
          "keydown",
          /*handleMinuteKeydown*/
          t[36]
        ),
        M(
          I,
          "blur",
          /*handleMinuteBlur*/
          t[38]
        ),
        M(
          S,
          "click",
          /*click_handler_4*/
          t[63]
        )
      ], m = !0);
    },
    p(y, g) {
      g[0] & /*timeFormat*/
      128 && u(
        l,
        "placeholder",
        /*timeFormat*/
        y[7]
      ), g[0] & /*timeInputInvalid*/
      32768 && u(
        l,
        "aria-invalid",
        /*timeInputInvalid*/
        y[15]
      ), g[0] & /*timeInputValue*/
      8192 && l.value !== /*timeInputValue*/
      y[13] && G(
        l,
        /*timeInputValue*/
        y[13]
      ), g[0] & /*timeInputInvalid*/
      32768 && P(
        l,
        "invalid",
        /*timeInputInvalid*/
        y[15]
      ), g[0] & /*hourValue*/
      65536 && d.value !== /*hourValue*/
      y[16] && G(
        d,
        /*hourValue*/
        y[16]
      ), g[0] & /*minuteValue*/
      131072 && I.value !== /*minuteValue*/
      y[17] && G(
        I,
        /*minuteValue*/
        y[17]
      ), /*hasAmPm*/
      y[23] ? w ? w.p(y, g) : (w = lt(y), w.c(), w.m(i, null)) : w && (w.d(1), w = null);
    },
    d(y) {
      y && x(e), w && w.d(), m = !1, ne(V);
    }
  };
}
function lt(t) {
  let e, n, l, o;
  return {
    c() {
      e = v("button"), n = O(
        /*ampmValue*/
        t[18]
      ), u(e, "type", "button"), u(e, "class", "ampm-btn svelte-1d0of32"), u(e, "aria-label", "Toggle AM/PM");
    },
    m(i, s) {
      C(i, e, s), h(e, n), l || (o = M(
        e,
        "click",
        /*toggleAmPm*/
        t[34]
      ), l = !0);
    },
    p(i, s) {
      s[0] & /*ampmValue*/
      262144 && U(
        n,
        /*ampmValue*/
        i[18]
      );
    },
    d(i) {
      i && x(e), l = !1, o();
    }
  };
}
function it(t) {
  let e, n, l, o, i, s, r, f, d, p;
  return {
    c() {
      e = v("div"), n = v("button"), n.textContent = "Yesterday", l = A(), o = v("button"), o.textContent = "Today", i = A(), s = v("button"), s.textContent = "Next Month", r = A(), f = v("button"), f.textContent = "Next Year", u(n, "type", "button"), u(n, "class", "quick-btn svelte-1d0of32"), u(o, "type", "button"), u(o, "class", "quick-btn svelte-1d0of32"), u(s, "type", "button"), u(s, "class", "quick-btn svelte-1d0of32"), u(f, "type", "button"), u(f, "class", "quick-btn svelte-1d0of32"), u(e, "class", "quick-dates svelte-1d0of32");
    },
    m(c, _) {
      C(c, e, _), h(e, n), h(e, l), h(e, o), h(e, i), h(e, s), h(e, r), h(e, f), d || (p = [
        M(
          n,
          "click",
          /*click_handler_5*/
          t[64]
        ),
        M(
          o,
          "click",
          /*click_handler_6*/
          t[65]
        ),
        M(
          s,
          "click",
          /*click_handler_7*/
          t[66]
        ),
        M(
          f,
          "click",
          /*click_handler_8*/
          t[67]
        )
      ], d = !0);
    },
    p: W,
    d(c) {
      c && x(e), d = !1, ne(p);
    }
  };
}
function ot(t) {
  let e, n;
  return {
    c() {
      e = v("div"), n = O(
        /*validationMessage*/
        t[11]
      ), u(e, "class", "validation-message svelte-1d0of32"), u(e, "role", "alert");
    },
    m(l, o) {
      C(l, e, o), h(e, n);
    },
    p(l, o) {
      o[0] & /*validationMessage*/
      2048 && U(
        n,
        /*validationMessage*/
        l[11]
      );
    },
    d(l) {
      l && x(e);
    }
  };
}
function On(t) {
  let e, n, l, o = (
    /*name*/
    t[1] && We(t)
  ), i = (
    /*popup*/
    t[2] && Xe(t)
  ), s = (!/*popup*/
  t[2] || /*isPopupOpen*/
  t[9]) && Ze(t);
  return {
    c() {
      e = v("div"), o && o.c(), n = A(), i && i.c(), l = A(), s && s.c(), u(e, "class", "aegis-dtp-root svelte-1d0of32"), P(
        e,
        "popup-mode",
        /*popup*/
        t[2]
      ), P(e, "invalid", !/*isValid*/
      t[10]);
    },
    m(r, f) {
      C(r, e, f), o && o.m(e, null), h(e, n), i && i.m(e, null), h(e, l), s && s.m(e, null), t[69](e);
    },
    p(r, f) {
      /*name*/
      r[1] ? o ? o.p(r, f) : (o = We(r), o.c(), o.m(e, n)) : o && (o.d(1), o = null), /*popup*/
      r[2] ? i ? i.p(r, f) : (i = Xe(r), i.c(), i.m(e, l)) : i && (i.d(1), i = null), !/*popup*/
      r[2] || /*isPopupOpen*/
      r[9] ? s ? s.p(r, f) : (s = Ze(r), s.c(), s.m(e, null)) : s && (s.d(1), s = null), f[0] & /*popup*/
      4 && P(
        e,
        "popup-mode",
        /*popup*/
        r[2]
      ), f[0] & /*isValid*/
      1024 && P(e, "invalid", !/*isValid*/
      r[10]);
    },
    i: W,
    o: W,
    d(r) {
      r && x(e), o && o.d(), i && i.d(), s && s.d(), t[69](null);
    }
  };
}
let jn = "YYYY-MM-DD", qn = "HH:mm", Ln = !1;
function zn(t, e, n) {
  let l, o, i, s, r, f, d, p, c, _, $, { mode: Y = "datetime" } = e, { value: N = null } = e, { min: E = null } = e, { max: H = null } = e, { required: I = !1 } = e, { name: L = "" } = e, { popup: S = !1 } = e;
  const J = sn();
  let m = null, V = !1, w = !0, y = "", g = (/* @__PURE__ */ new Date()).getFullYear(), D = (/* @__PURE__ */ new Date()).getMonth(), k = "", z = "", le = !1, ie = !1, B = "00", R = "00", X = "AM", Q, $e, Ee, Ae, j = -1, oe = null;
  function ye() {
    return m ? Re(m) : null;
  }
  function ft() {
    return m ? Ue(m) : null;
  }
  function dt() {
    return m ? Ke(m) : null;
  }
  ln(() => {
    if (N) {
      const a = De(N);
      a && (n(3, m = a), oe = N, ke(), we());
    }
    document.addEventListener("click", je), document.addEventListener("keydown", qe);
  }), on(() => {
    document.removeEventListener("click", je), document.removeEventListener("keydown", qe);
  });
  function ct(a) {
    if (a === oe) return;
    const b = ye();
    if (a === b) {
      oe = a;
      return;
    }
    if (a) {
      const F = De(a);
      F && (n(3, m = F), oe = a, ke(), we(), Ye());
    } else
      n(3, m = null), oe = null, we(), Ye();
  }
  function ke() {
    m && (n(4, g = m.getFullYear()), n(5, D = m.getMonth()));
  }
  function we() {
    m ? (n(12, k = fe(m, l)), n(13, z = de(m, o)), n(16, B = T(i ? m.getHours() % 12 || 12 : m.getHours())), n(17, R = T(m.getMinutes())), n(18, X = m.getHours() < 12 ? "AM" : "PM")) : (n(12, k = ""), n(13, z = ""), n(16, B = "00"), n(17, R = "00"), n(18, X = "AM")), n(14, le = !1), n(15, ie = !1);
  }
  function Ye() {
    return n(11, y = ""), I && !m ? (n(10, w = !1), n(11, y = "This field is required"), !1) : m && !Te(m, p, c) ? (n(10, w = !1), n(11, y = "Value is out of range"), !1) : (n(10, w = !0), !0);
  }
  function Z(a) {
    if (a && !Te(a, p, c))
      return n(10, w = !1), n(11, y = "Value is out of range"), !1;
    n(3, m = a), we(), Ye();
    const b = ye();
    return oe = b, n(45, N = b), !0;
  }
  function ee() {
    const b = { value: ye() };
    J("input", b), J("change", b), Q && (Q.dispatchEvent(new CustomEvent("input", { bubbles: !0, composed: !0, detail: b })), Q.dispatchEvent(new CustomEvent("change", { bubbles: !0, composed: !0, detail: b })));
  }
  function Se() {
    if (!k.trim()) {
      Y === "date" && (Z(null), ee()), n(14, le = !1);
      return;
    }
    const a = yn(k, l);
    if (a) {
      const b = m ? me(m) : new Date(1970, 0, 1, 0, 0);
      b.setFullYear(a.year, a.month - 1, a.day), Z(b) ? (ke(), ee(), n(14, le = !1)) : n(14, le = !0);
    } else
      n(14, le = !0), n(12, k = m ? fe(m, l) : "");
  }
  function pt(a) {
    a.key === "Enter" && Se();
  }
  function He() {
    if (!z.trim()) {
      Y === "time" && (Z(null), ee()), n(15, ie = !1);
      return;
    }
    const a = kn(z, o);
    if (a) {
      const b = m ? me(m) : new Date(1970, 0, 1, 0, 0);
      b.setHours(a.hours, a.minutes, 0, 0), Z(b) ? (ee(), n(15, ie = !1)) : n(15, ie = !0);
    } else
      n(15, ie = !0), n(13, z = m ? de(m, o) : "");
  }
  function ht(a) {
    a.key === "Enter" && He();
  }
  function ce(a) {
    let b = parseInt(B, 10) || 0;
    i ? (b += a, b > 12 && (b = 1), b < 1 && (b = 12)) : (b += a, b > 23 && (b = 0), b < 0 && (b = 23)), n(16, B = T(b)), he();
  }
  function pe(a) {
    let b = parseInt(R, 10) || 0;
    b += a, b > 59 && (b = 0), b < 0 && (b = 59), n(17, R = T(b)), he();
  }
  function gt() {
    n(18, X = X === "AM" ? "PM" : "AM"), he();
  }
  function he() {
    let a = parseInt(B, 10) || 0;
    const b = parseInt(R, 10) || 0;
    i && s && (X === "AM" && a === 12 ? a = 0 : X === "PM" && a !== 12 && (a += 12));
    const F = m ? me(m) : new Date(1970, 0, 1, 0, 0);
    F.setHours(a, b, 0, 0), Z(F) && ee();
  }
  function mt(a) {
    a.key === "ArrowUp" ? (a.preventDefault(), ce(1)) : a.key === "ArrowDown" && (a.preventDefault(), ce(-1));
  }
  function bt(a) {
    a.key === "ArrowUp" ? (a.preventDefault(), pe(1)) : a.key === "ArrowDown" && (a.preventDefault(), pe(-1));
  }
  function vt() {
    let a = parseInt(B, 10);
    isNaN(a) && (a = 0), i ? a = Math.max(1, Math.min(12, a)) : a = Math.max(0, Math.min(23, a)), n(16, B = T(a)), he();
  }
  function _t() {
    let a = parseInt(R, 10);
    isNaN(a) && (a = 0), a = Math.max(0, Math.min(59, a)), n(17, R = T(a)), he();
  }
  function yt() {
    n(5, D--, D), D < 0 && (n(5, D = 11), n(4, g--, g));
  }
  function kt() {
    n(5, D++, D), D > 11 && (n(5, D = 0), n(4, g++, g));
  }
  function xe(a) {
    const b = m ? me(m) : new Date(1970, 0, 1, 0, 0);
    b.setFullYear(g, D, a), Z(b) && ee();
  }
  function wt() {
    const a = $n(g, D), b = En(g, D), F = [];
    for (let te = 0; te < b; te++)
      F.push({
        day: null,
        isToday: !1,
        isSelected: !1
      });
    const Ut = _e();
    for (let te = 1; te <= a; te++) {
      const Ce = new Date(g, D, te);
      F.push({
        day: te,
        isToday: Je(Ce, Ut),
        isSelected: m && Je(Ce, m),
        isDisabled: !Te(Ce, p, c)
      });
    }
    return F;
  }
  function Dt(a) {
    const b = $.filter((F) => F.day !== null && !F.isDisabled);
    b.length !== 0 && (j < 0 && (j = 0), a.key === "ArrowRight" ? (a.preventDefault(), j = (j + 1) % b.length) : a.key === "ArrowLeft" ? (a.preventDefault(), j = (j - 1 + b.length) % b.length) : a.key === "ArrowDown" ? (a.preventDefault(), j = Math.min(j + 7, b.length - 1)) : a.key === "ArrowUp" ? (a.preventDefault(), j = Math.max(j - 7, 0)) : (a.key === "Enter" || a.key === " ") && (a.preventDefault(), b[j] && xe(b[j].day)));
  }
  function ge(a) {
    const b = a();
    let F;
    m && Y === "datetime" ? F = An(m, b) : F = b, Z(F) && (ke(), ee());
  }
  function Oe() {
    n(9, V = !1);
  }
  function Mt() {
    n(9, V = !V);
  }
  function je(a) {
    !S || !V || Q && !Q.contains(a.target) && Oe();
  }
  function qe(a) {
    a.key === "Escape" && V && Oe();
  }
  function $t() {
    return ye();
  }
  function Et() {
    return ft();
  }
  function At() {
    return dt();
  }
  function Yt() {
    return w;
  }
  function xt(a) {
    ae[a ? "unshift" : "push"](() => {
      Ee = a, n(21, Ee);
    });
  }
  function Ct() {
    k = this.value, n(12, k);
  }
  const Nt = (a) => xe(a);
  function It(a) {
    ae[a ? "unshift" : "push"](() => {
      Ae = a, n(22, Ae);
    });
  }
  function Tt() {
    z = this.value, n(13, z);
  }
  const Vt = () => ce(1);
  function Ft() {
    B = this.value, n(16, B);
  }
  const Pt = () => ce(-1), St = () => pe(1);
  function Ht() {
    R = this.value, n(17, R);
  }
  const Ot = () => pe(-1), jt = () => ge(wn), qt = () => ge(_e), Lt = () => ge(Dn), zt = () => ge(Mn);
  function Bt(a) {
    ae[a ? "unshift" : "push"](() => {
      $e = a, n(20, $e);
    });
  }
  function Rt(a) {
    ae[a ? "unshift" : "push"](() => {
      Q = a, n(19, Q);
    });
  }
  return t.$$set = (a) => {
    "mode" in a && n(0, Y = a.mode), "value" in a && n(45, N = a.value), "min" in a && n(46, E = a.min), "max" in a && n(47, H = a.max), "required" in a && n(48, I = a.required), "name" in a && n(1, L = a.name), "popup" in a && n(2, S = a.popup);
  }, t.$$.update = () => {
    t.$$.dirty[0] & /*timeFormat*/
    128 && (i = o.includes("hh")), t.$$.dirty[0] & /*timeFormat*/
    128 && n(23, s = o.includes("A")), t.$$.dirty[0] & /*mode*/
    1 && n(8, r = Y === "date" || Y === "datetime"), t.$$.dirty[0] & /*mode*/
    1 && n(27, f = Y === "time" || Y === "datetime"), t.$$.dirty[0] & /*showDateUI, mode*/
    257 && n(26, d = r || Ln), t.$$.dirty[1] & /*min*/
    32768 && (p = E ? De(E) : null), t.$$.dirty[1] & /*max*/
    65536 && (c = H ? De(H) : null), t.$$.dirty[0] & /*internalDate*/
    8 && n(25, _ = m ? Re(m) : null), t.$$.dirty[0] & /*internalDate*/
    8 && m && Ue(m), t.$$.dirty[0] & /*internalDate*/
    8 && m && Ke(m), t.$$.dirty[1] & /*value*/
    16384 && ct(N), t.$$.dirty[0] & /*calendarDays, viewYear, viewMonth, internalDate*/
    120;
  }, n(24, l = jn), n(7, o = qn), n(6, $ = wt()), [
    Y,
    L,
    S,
    m,
    g,
    D,
    $,
    o,
    r,
    V,
    w,
    y,
    k,
    z,
    le,
    ie,
    B,
    R,
    X,
    Q,
    $e,
    Ee,
    Ae,
    s,
    l,
    _,
    d,
    f,
    Se,
    pt,
    He,
    ht,
    ce,
    pe,
    gt,
    mt,
    bt,
    vt,
    _t,
    yt,
    kt,
    xe,
    Dt,
    ge,
    Mt,
    N,
    E,
    H,
    I,
    $t,
    Et,
    At,
    Yt,
    xt,
    Ct,
    Nt,
    It,
    Tt,
    Vt,
    Ft,
    Pt,
    St,
    Ht,
    Ot,
    jt,
    qt,
    Lt,
    zt,
    Bt,
    Rt
  ];
}
class Bn extends vn {
  constructor(e) {
    super(), mn(
      this,
      e,
      zn,
      On,
      Qt,
      {
        mode: 0,
        value: 45,
        min: 46,
        max: 47,
        required: 48,
        name: 1,
        popup: 2,
        getValue: 49,
        fetchDateValue: 50,
        fetchTimeValue: 51,
        getIsValid: 52
      },
      xn,
      [-1, -1, -1, -1]
    );
  }
  get mode() {
    return this.$$.ctx[0];
  }
  set mode(e) {
    this.$$set({ mode: e }), K();
  }
  get value() {
    return this.$$.ctx[45];
  }
  set value(e) {
    this.$$set({ value: e }), K();
  }
  get min() {
    return this.$$.ctx[46];
  }
  set min(e) {
    this.$$set({ min: e }), K();
  }
  get max() {
    return this.$$.ctx[47];
  }
  set max(e) {
    this.$$set({ max: e }), K();
  }
  get required() {
    return this.$$.ctx[48];
  }
  set required(e) {
    this.$$set({ required: e }), K();
  }
  get name() {
    return this.$$.ctx[1];
  }
  set name(e) {
    this.$$set({ name: e }), K();
  }
  get popup() {
    return this.$$.ctx[2];
  }
  set popup(e) {
    this.$$set({ popup: e }), K();
  }
  get getValue() {
    return this.$$.ctx[49];
  }
  get fetchDateValue() {
    return this.$$.ctx[50];
  }
  get fetchTimeValue() {
    return this.$$.ctx[51];
  }
  get getIsValid() {
    return this.$$.ctx[52];
  }
}
customElements.define("aegis-datetime-picker", bn(Bn, { mode: {}, value: {}, min: {}, max: {}, required: { type: "Boolean" }, name: {}, popup: { type: "Boolean" } }, [], ["getValue", "fetchDateValue", "fetchTimeValue", "getIsValid"], !0));
export {
  Bn as AegisDateTimePicker
};
