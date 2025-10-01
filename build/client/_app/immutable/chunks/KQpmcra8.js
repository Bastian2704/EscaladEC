import {
	Q as et,
	M as H,
	R as U,
	S as st,
	u as D,
	T as q,
	U as W,
	q as p,
	j as g,
	V as nt,
	W as E,
	i as it,
	w as rt,
	C as Y,
	X as at,
	A as d,
	Y as x,
	Z as O,
	_ as A,
	$ as b,
	a0 as I,
	a1 as ot,
	a2 as w,
	G as u,
	a3 as lt,
	D as F,
	o as C,
	n as ut,
	a4 as ft,
	a5 as L,
	a6 as ct,
	E as ht,
	a7 as _t,
	a8 as dt,
	l as z,
	a9 as pt,
	aa as gt,
	ab as G,
	ac as M,
	v as vt,
	k as yt,
	ad as P,
	m as R,
	ae as mt,
	af as bt,
	ag as Et,
	ah as wt,
	h as Tt,
	p as St,
	y as Rt,
	ai as kt,
	aj as At,
	c as Ct,
	ak as T,
	J as Dt,
	al as Nt,
	am as J,
	an as xt,
	ao as Ot,
	ap as Ft,
	aq as Mt,
	ar as Pt,
	as as Vt,
	at as Yt,
	au as jt
} from './Dor_A3w4.js';
import { r as qt, c as It } from './CPGMAfgJ.js';
function Lt(e) {
	let t = 0,
		s = U(0),
		r;
	return () => {
		et() &&
			(H(s),
			st(
				() => (
					t === 0 && (r = D(() => e(() => q(s)))),
					(t += 1),
					() => {
						W(() => {
							((t -= 1), t === 0 && (r?.(), (r = void 0), q(s)));
						});
					}
				)
			));
	};
}
var $t = ht | _t | dt;
function Bt(e, t, s) {
	new Ht(e, t, s);
}
class Ht {
	parent;
	#n = !1;
	#e;
	#p = g ? p : null;
	#i;
	#f;
	#r;
	#s = null;
	#t = null;
	#a = null;
	#o = null;
	#c = 0;
	#l = 0;
	#h = !1;
	#u = null;
	#v = () => {
		this.#u && nt(this.#u, this.#c);
	};
	#y = Lt(
		() => (
			(this.#u = U(this.#c)),
			() => {
				this.#u = null;
			}
		)
	);
	constructor(t, s, r) {
		((this.#e = t),
			(this.#i = s),
			(this.#f = r),
			(this.parent = E.b),
			(this.#n = !!this.#i.pending),
			(this.#r = it(() => {
				if (((E.b = this), g)) {
					const i = this.#p;
					(rt(), i.nodeType === Y && i.data === at ? this.#b() : this.#m());
				} else {
					try {
						this.#s = d(() => r(this.#e));
					} catch (i) {
						this.error(i);
					}
					this.#l > 0 ? this.#d() : (this.#n = !1);
				}
			}, $t)),
			g && (this.#e = p));
	}
	#m() {
		try {
			this.#s = d(() => this.#f(this.#e));
		} catch (t) {
			this.error(t);
		}
		this.#n = !1;
	}
	#b() {
		const t = this.#i.pending;
		t &&
			((this.#t = d(() => t(this.#e))),
			x.enqueue(() => {
				((this.#s = this.#_(() => (x.ensure(), d(() => this.#f(this.#e))))),
					this.#l > 0
						? this.#d()
						: (O(this.#t, () => {
								this.#t = null;
							}),
							(this.#n = !1)));
			}));
	}
	is_pending() {
		return this.#n || (!!this.parent && this.parent.is_pending());
	}
	has_pending_snippet() {
		return !!this.#i.pending;
	}
	#_(t) {
		var s = E,
			r = w,
			i = u;
		(A(this.#r), b(this.#r), I(this.#r.ctx));
		try {
			return t();
		} catch (n) {
			return (ot(n), null);
		} finally {
			(A(s), b(r), I(i));
		}
	}
	#d() {
		const t = this.#i.pending;
		(this.#s !== null && ((this.#o = document.createDocumentFragment()), Ut(this.#s, this.#o)),
			this.#t === null && (this.#t = d(() => t(this.#e))));
	}
	#g(t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#g(t);
			return;
		}
		((this.#l += t),
			this.#l === 0 &&
				((this.#n = !1),
				this.#t &&
					O(this.#t, () => {
						this.#t = null;
					}),
				this.#o && (this.#e.before(this.#o), (this.#o = null))));
	}
	update_pending_count(t) {
		(this.#g(t), (this.#c += t), lt.add(this.#v));
	}
	get_effect_pending() {
		return (this.#y(), H(this.#u));
	}
	error(t) {
		var s = this.#i.onerror;
		let r = this.#i.failed;
		if (this.#h || (!s && !r)) throw t;
		(this.#s && (F(this.#s), (this.#s = null)),
			this.#t && (F(this.#t), (this.#t = null)),
			this.#a && (F(this.#a), (this.#a = null)),
			g && (C(this.#p), ut(), C(ft())));
		var i = !1,
			n = !1;
		const a = () => {
			if (i) {
				pt();
				return;
			}
			((i = !0),
				n && ct(),
				x.ensure(),
				(this.#c = 0),
				this.#a !== null &&
					O(this.#a, () => {
						this.#a = null;
					}),
				(this.#n = this.has_pending_snippet()),
				(this.#s = this.#_(() => ((this.#h = !1), d(() => this.#f(this.#e))))),
				this.#l > 0 ? this.#d() : (this.#n = !1));
		};
		var f = w;
		try {
			(b(null), (n = !0), s?.(t, a), (n = !1));
		} catch (c) {
			L(c, this.#r && this.#r.parent);
		} finally {
			b(f);
		}
		r &&
			W(() => {
				this.#a = this.#_(() => {
					this.#h = !0;
					try {
						return d(() => {
							r(
								this.#e,
								() => t,
								() => a
							);
						});
					} catch (c) {
						return (L(c, this.#r.parent), null);
					} finally {
						this.#h = !1;
					}
				});
			});
	}
}
function Ut(e, t) {
	for (var s = e.nodes_start, r = e.nodes_end; s !== null; ) {
		var i = s === r ? null : z(s);
		(t.append(s), (s = i));
	}
}
const Wt = ['touchstart', 'touchmove'];
function zt(e) {
	return Wt.includes(e);
}
const Gt = new Set(),
	$ = new Set();
let B = null;
function k(e) {
	var t = this,
		s = t.ownerDocument,
		r = e.type,
		i = e.composedPath?.() || [],
		n = i[0] || e.target;
	B = e;
	var a = 0,
		f = B === e && e.__root;
	if (f) {
		var c = i.indexOf(f);
		if (c !== -1 && (t === document || t === window)) {
			e.__root = t;
			return;
		}
		var v = i.indexOf(t);
		if (v === -1) return;
		c <= v && (a = c);
	}
	if (((n = i[a] || e.target), n !== t)) {
		gt(e, 'currentTarget', {
			configurable: !0,
			get() {
				return n || s;
			}
		});
		var N = w,
			h = E;
		(b(null), A(null));
		try {
			for (var o, l = []; n !== null; ) {
				var y = n.assignedSlot || n.parentNode || n.host || null;
				try {
					var _ = n['__' + r];
					if (_ != null && (!n.disabled || e.target === n))
						if (G(_)) {
							var [K, ...tt] = _;
							K.apply(n, [e, ...tt]);
						} else _.call(n, e);
				} catch (S) {
					o ? l.push(S) : (o = S);
				}
				if (e.cancelBubble || y === t || y === null) break;
				n = y;
			}
			if (o) {
				for (let S of l)
					queueMicrotask(() => {
						throw S;
					});
				throw o;
			}
		} finally {
			((e.__root = t), delete e.currentTarget, b(N), A(h));
		}
	}
}
function re(e, t) {
	var s = t == null ? '' : typeof t == 'object' ? t + '' : t;
	s !== (e.__t ??= e.nodeValue) && ((e.__t = s), (e.nodeValue = s + ''));
}
function Q(e, t) {
	return X(e, t);
}
function Jt(e, t) {
	(M(), (t.intro = t.intro ?? !1));
	const s = t.target,
		r = g,
		i = p;
	try {
		for (var n = vt(s); n && (n.nodeType !== Y || n.data !== yt); ) n = z(n);
		if (!n) throw P;
		(R(!0), C(n));
		const a = X(e, { ...t, anchor: n });
		return (R(!1), a);
	} catch (a) {
		if (
			a instanceof Error &&
			a.message
				.split(
					`
`
				)
				.some((f) => f.startsWith('https://svelte.dev/e/'))
		)
			throw a;
		return (
			a !== P && console.warn('Failed to hydrate: ', a),
			t.recover === !1 && mt(),
			M(),
			bt(s),
			R(!1),
			Q(e, t)
		);
	} finally {
		(R(r), C(i), qt());
	}
}
const m = new Map();
function X(e, { target: t, anchor: s, props: r = {}, events: i, context: n, intro: a = !0 }) {
	M();
	var f = new Set(),
		c = (h) => {
			for (var o = 0; o < h.length; o++) {
				var l = h[o];
				if (!f.has(l)) {
					f.add(l);
					var y = zt(l);
					t.addEventListener(l, k, { passive: y });
					var _ = m.get(l);
					_ === void 0
						? (document.addEventListener(l, k, { passive: y }), m.set(l, 1))
						: m.set(l, _ + 1);
				}
			}
		};
	(c(Et(Gt)), $.add(c));
	var v = void 0,
		N = wt(() => {
			var h = s ?? t.appendChild(Tt());
			return (
				Bt(h, { pending: () => {} }, (o) => {
					if (n) {
						St({});
						var l = u;
						l.c = n;
					}
					if (
						(i && (r.$$events = i),
						g && Rt(o, null),
						(v = e(o, r) || {}),
						g && ((E.nodes_end = p), p === null || p.nodeType !== Y || p.data !== kt))
					)
						throw (At(), P);
					n && Ct();
				}),
				() => {
					for (var o of f) {
						t.removeEventListener(o, k);
						var l = m.get(o);
						--l === 0 ? (document.removeEventListener(o, k), m.delete(o)) : m.set(o, l);
					}
					($.delete(c), h !== s && h.parentNode?.removeChild(h));
				}
			);
		});
	return (V.set(v, N), v);
}
let V = new WeakMap();
function Qt(e, t) {
	const s = V.get(e);
	return s ? (V.delete(e), s(t)) : Promise.resolve();
}
function Xt() {
	return (w === null && Nt(), (w.ac ??= new AbortController()).signal);
}
function Z(e) {
	(u === null && T(),
		xt && u.l !== null
			? j(u).m.push(e)
			: Dt(() => {
					const t = D(e);
					if (typeof t == 'function') return t;
				}));
}
function Zt(e) {
	(u === null && T(), Z(() => () => D(e)));
}
function Kt(e, t, { bubbles: s = !1, cancelable: r = !1 } = {}) {
	return new CustomEvent(e, { detail: t, bubbles: s, cancelable: r });
}
function te() {
	const e = u;
	return (
		e === null && T(),
		(t, s, r) => {
			const i = e.s.$$events?.[t];
			if (i) {
				const n = G(i) ? i.slice() : [i],
					a = Kt(t, s, r);
				for (const f of n) f.call(e.x, a);
				return !a.defaultPrevented;
			}
			return !0;
		}
	);
}
function ee(e) {
	(u === null && T(), u.l === null && J(), j(u).b.push(e));
}
function se(e) {
	(u === null && T(), u.l === null && J(), j(u).a.push(e));
}
function j(e) {
	var t = e.l;
	return (t.u ??= { a: [], b: [], m: [] });
}
const ae = Object.freeze(
	Object.defineProperty(
		{
			__proto__: null,
			afterUpdate: se,
			beforeUpdate: ee,
			createEventDispatcher: te,
			createRawSnippet: It,
			flushSync: Ot,
			getAbortSignal: Xt,
			getAllContexts: Ft,
			getContext: Mt,
			hasContext: Pt,
			hydrate: Jt,
			mount: Q,
			onDestroy: Zt,
			onMount: Z,
			setContext: Vt,
			settled: Yt,
			tick: jt,
			unmount: Qt,
			untrack: D
		},
		Symbol.toStringTag,
		{ value: 'Module' }
	)
);
export { ae as a, Jt as h, Q as m, Z as o, re as s, Qt as u };
