var Ct = Array.isArray,
	It = Array.prototype.indexOf,
	Rn = Array.from,
	Ge = Object.defineProperty,
	fe = Object.getOwnPropertyDescriptor,
	Ft = Object.getOwnPropertyDescriptors,
	Mt = Object.prototype,
	jt = Array.prototype,
	tt = Object.getPrototypeOf,
	We = Object.isExtensible;
const Sn = () => {};
function On(e) {
	return e();
}
function nt(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function Lt() {
	var e,
		t,
		n = new Promise((r, s) => {
			((e = r), (t = s));
		});
	return { promise: n, resolve: e, reject: t };
}
const k = 2,
	Fe = 4,
	me = 8,
	re = 16,
	C = 32,
	J = 64,
	rt = 128,
	S = 256,
	de = 512,
	E = 1024,
	N = 2048,
	U = 4096,
	L = 8192,
	se = 16384,
	Me = 32768,
	st = 65536,
	$e = 1 << 17,
	qt = 1 << 18,
	ve = 1 << 19,
	at = 1 << 20,
	Ne = 1 << 21,
	je = 1 << 22,
	V = 1 << 23,
	ue = Symbol('$state'),
	Nn = Symbol('legacy props'),
	Le = new (class extends Error {
		name = 'StaleReactionError';
		message = 'The reaction that called `getAbortSignal()` was re-run or destroyed';
	})(),
	Ee = 3,
	it = 8;
function Yt(e) {
	throw new Error('https://svelte.dev/e/lifecycle_outside_component');
}
function Ut() {
	throw new Error('https://svelte.dev/e/async_derived_orphan');
}
function Ht(e) {
	throw new Error('https://svelte.dev/e/effect_in_teardown');
}
function Bt() {
	throw new Error('https://svelte.dev/e/effect_in_unowned_derived');
}
function Vt(e) {
	throw new Error('https://svelte.dev/e/effect_orphan');
}
function Kt() {
	throw new Error('https://svelte.dev/e/effect_update_depth_exceeded');
}
function Dn() {
	throw new Error('https://svelte.dev/e/get_abort_signal_outside_reaction');
}
function Cn() {
	throw new Error('https://svelte.dev/e/hydration_failed');
}
function In(e) {
	throw new Error('https://svelte.dev/e/lifecycle_legacy_only');
}
function Fn(e) {
	throw new Error('https://svelte.dev/e/props_invalid_value');
}
function Gt() {
	throw new Error('https://svelte.dev/e/state_descriptors_fixed');
}
function Wt() {
	throw new Error('https://svelte.dev/e/state_prototype_fixed');
}
function $t() {
	throw new Error('https://svelte.dev/e/state_unsafe_mutation');
}
function Mn() {
	throw new Error('https://svelte.dev/e/svelte_boundary_reset_onerror');
}
const jn = 1,
	Ln = 2,
	qn = 4,
	Yn = 8,
	Un = 16,
	Zt = 1,
	zt = 2,
	Jt = '[',
	Qt = '[!',
	Xt = ']',
	qe = {},
	g = Symbol(),
	Hn = 'http://www.w3.org/1999/xhtml';
function Ye(e) {
	console.warn('https://svelte.dev/e/hydration_mismatch');
}
function Bn() {
	console.warn('https://svelte.dev/e/svelte_boundary_reset_noop');
}
let A = !1;
function lt(e) {
	A = e;
}
let p;
function q(e) {
	if (e === null) throw (Ye(), qe);
	return (p = e);
}
function en() {
	return q(Q(p));
}
function Vn(e) {
	if (A) {
		if (Q(p) !== null) throw (Ye(), qe);
		p = e;
	}
}
function Kn(e = 1) {
	if (A) {
		for (var t = e, n = p; t--; ) n = Q(n);
		p = n;
	}
}
function Gn(e = !0) {
	for (var t = 0, n = p; ; ) {
		if (n.nodeType === it) {
			var r = n.data;
			if (r === Xt) {
				if (t === 0) return n;
				t -= 1;
			} else (r === Jt || r === Qt) && (t += 1);
		}
		var s = Q(n);
		(e && n.remove(), (n = s));
	}
}
function Wn(e) {
	if (!e || e.nodeType !== it) throw (Ye(), qe);
	return e.data;
}
function ft(e) {
	return e === this.v;
}
function tn(e, t) {
	return e != e
		? t == t
		: e !== t || (e !== null && typeof e == 'object') || typeof e == 'function';
}
function ut(e) {
	return !tn(e, this.v);
}
let be = !1;
function $n() {
	be = !0;
}
let y = null;
function pe(e) {
	y = e;
}
function Zn(e) {
	return xe().get(e);
}
function zn(e, t) {
	return (xe().set(e, t), t);
}
function Jn(e) {
	return xe().has(e);
}
function Qn() {
	return xe();
}
function Xn(e, t = !1, n) {
	y = { p: y, c: null, e: null, s: e, x: null, l: be && !t ? { s: null, u: null, $: [] } : null };
}
function er(e) {
	var t = y,
		n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Et(r);
	}
	return ((y = t.p), {});
}
function he() {
	return !be || (y !== null && y.l === null);
}
function xe(e) {
	return (y === null && Yt(), (y.c ??= new Map(nn(y) || void 0)));
}
function nn(e) {
	let t = e.p;
	for (; t !== null; ) {
		const n = t.c;
		if (n !== null) return n;
		t = t.p;
	}
	return null;
}
let F = [],
	we = [];
function ot() {
	var e = F;
	((F = []), nt(e));
}
function rn() {
	var e = we;
	((we = []), nt(e));
}
function sn() {
	return F.length > 0 || we.length > 0;
}
function an(e) {
	if (F.length === 0 && !oe) {
		var t = F;
		queueMicrotask(() => {
			t === F && ot();
		});
	}
	F.push(e);
}
function ln() {
	(F.length > 0 && ot(), we.length > 0 && rn());
}
const fn = new WeakMap();
function un(e) {
	var t = _;
	if (t === null) return ((c.f |= V), e);
	if ((t.f & Me) === 0) {
		if ((t.f & rt) === 0) throw (!t.parent && e instanceof Error && ct(e), e);
		t.b.error(e);
	} else ye(e, t);
}
function ye(e, t) {
	for (; t !== null; ) {
		if ((t.f & rt) !== 0)
			try {
				t.b.error(e);
				return;
			} catch (n) {
				e = n;
			}
		t = t.parent;
	}
	throw (e instanceof Error && ct(e), e);
}
function ct(e) {
	const t = fn.get(e);
	t && (Ge(e, 'message', { value: t.message }), Ge(e, 'stack', { value: t.stack }));
}
const Se = new Set();
let m = null,
	Ze = new Set(),
	W = [],
	Te = null,
	Pe = !1,
	oe = !1;
class $ {
	current = new Map();
	#f = new Map();
	#s = new Set();
	#e = 0;
	#u = null;
	#o = !1;
	#n = [];
	#a = [];
	#r = [];
	#t = [];
	#i = [];
	#c = [];
	#_ = [];
	skipped_effects = new Set();
	process(t) {
		W = [];
		for (const s of t) this.#h(s);
		if (this.#n.length === 0 && this.#e === 0) {
			this.#v();
			var n = this.#r,
				r = this.#t;
			((this.#r = []),
				(this.#t = []),
				(this.#i = []),
				(m = null),
				ze(n),
				ze(r),
				m === null ? (m = this) : Se.delete(this),
				this.#u?.resolve());
		} else (this.#l(this.#r), this.#l(this.#t), this.#l(this.#i));
		for (const s of this.#n) ee(s);
		for (const s of this.#a) ee(s);
		((this.#n = []), (this.#a = []));
	}
	#h(t) {
		t.f ^= E;
		for (var n = t.first; n !== null; ) {
			var r = n.f,
				s = (r & (C | J)) !== 0,
				i = s && (r & E) !== 0,
				l = i || (r & L) !== 0 || this.skipped_effects.has(n);
			if (!l && n.fn !== null) {
				if (s) n.f ^= E;
				else if ((r & Fe) !== 0) this.#t.push(n);
				else if ((r & E) === 0)
					if ((r & je) !== 0) {
						var u = n.b?.is_pending() ? this.#a : this.#n;
						u.push(n);
					} else ke(n) && ((n.f & re) !== 0 && this.#i.push(n), ee(n));
				var a = n.first;
				if (a !== null) {
					n = a;
					continue;
				}
			}
			var f = n.parent;
			for (n = n.next; n === null && f !== null; ) ((n = f.next), (f = f.parent));
		}
	}
	#l(t) {
		for (const n of t) (((n.f & N) !== 0 ? this.#c : this.#_).push(n), x(n, E));
		t.length = 0;
	}
	capture(t, n) {
		(this.#f.has(t) || this.#f.set(t, n), this.current.set(t, t.v));
	}
	activate() {
		m = this;
	}
	deactivate() {
		m = null;
		for (const t of Ze) if ((Ze.delete(t), t(), m !== null)) break;
	}
	neuter() {
		this.#o = !0;
	}
	flush() {
		(W.length > 0 ? De() : this.#v(),
			m === this && (this.#e === 0 && Se.delete(this), this.deactivate()));
	}
	#v() {
		if (!this.#o) for (const t of this.#s) t();
		this.#s.clear();
	}
	increment() {
		this.#e += 1;
	}
	decrement() {
		if (((this.#e -= 1), this.#e === 0)) {
			for (const t of this.#c) (x(t, N), te(t));
			for (const t of this.#_) (x(t, U), te(t));
			((this.#r = []), (this.#t = []), this.flush());
		} else this.deactivate();
	}
	add_callback(t) {
		this.#s.add(t);
	}
	settled() {
		return (this.#u ??= Lt()).promise;
	}
	static ensure() {
		if (m === null) {
			const t = (m = new $());
			(Se.add(m),
				oe ||
					$.enqueue(() => {
						m === t && t.flush();
					}));
		}
		return m;
	}
	static enqueue(t) {
		an(t);
	}
}
function on(e) {
	var t = oe;
	oe = !0;
	try {
		var n;
		for (e && (De(), (n = e())); ; ) {
			if ((ln(), W.length === 0 && !sn() && (m?.flush(), W.length === 0))) return ((Te = null), n);
			De();
		}
	} finally {
		oe = t;
	}
}
function De() {
	var e = X;
	Pe = !0;
	try {
		var t = 0;
		for (Qe(!0); W.length > 0; ) {
			var n = $.ensure();
			if (t++ > 1e3) {
				var r, s;
				cn();
			}
			(n.process(W), j.clear());
		}
	} finally {
		((Pe = !1), Qe(e), (Te = null));
	}
}
function cn() {
	try {
		Kt();
	} catch (e) {
		ye(e, Te);
	}
}
let B = null;
function ze(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t; ) {
			var r = e[n++];
			if (
				(r.f & (se | L)) === 0 &&
				ke(r) &&
				((B = []),
				ee(r),
				r.deps === null &&
					r.first === null &&
					r.nodes_start === null &&
					(r.teardown === null && r.ac === null ? Tt(r) : (r.fn = null)),
				B?.length > 0)
			) {
				j.clear();
				for (const s of B) ee(s);
				B = [];
			}
		}
		B = null;
	}
}
function te(e) {
	for (var t = (Te = e); t.parent !== null; ) {
		t = t.parent;
		var n = t.f;
		if (Pe && t === _ && (n & re) !== 0) return;
		if ((n & (J | C)) !== 0) {
			if ((n & E) === 0) return;
			t.f ^= E;
		}
	}
	W.push(t);
}
function _n(e, t, n) {
	const r = he() ? Ue : dn;
	if (t.length === 0) {
		n(e.map(r));
		return;
	}
	var s = m,
		i = _,
		l = vn(),
		u = A;
	Promise.all(t.map((a) => hn(a)))
		.then((a) => {
			(s?.activate(), l());
			try {
				n([...e.map(r), ...a]);
			} catch (f) {
				(i.f & se) === 0 && ye(f, i);
			}
			(u && lt(!1), s?.deactivate(), _t());
		})
		.catch((a) => {
			ye(a, i);
		});
}
function vn() {
	var e = _,
		t = c,
		n = y,
		r = m,
		s = A;
	if (s) var i = p;
	return function () {
		(ne(e), Y(t), pe(n), r?.activate(), s && (lt(!0), q(i)));
	};
}
function _t() {
	(ne(null), Y(null), pe(null));
}
function Ue(e) {
	var t = k | N,
		n = c !== null && (c.f & k) !== 0 ? c : null;
	return (
		_ === null || (n !== null && (n.f & S) !== 0) ? (t |= S) : (_.f |= ve),
		{
			ctx: y,
			deps: null,
			effects: null,
			equals: ft,
			f: t,
			fn: e,
			reactions: null,
			rv: 0,
			v: g,
			wv: 0,
			parent: n ?? _,
			ac: null
		}
	);
}
function hn(e, t) {
	let n = _;
	n === null && Ut();
	var r = n.b,
		s = void 0,
		i = Be(g),
		l = null,
		u = !c;
	return (
		yn(() => {
			try {
				var a = e();
				l && Promise.resolve(a).catch(() => {});
			} catch (h) {
				a = Promise.reject(h);
			}
			var f = () => a;
			((s = l?.then(f, f) ?? Promise.resolve(a)), (l = s));
			var o = m,
				v = r.is_pending();
			u && (r.update_pending_count(1), v || o.increment());
			const w = (h, d = void 0) => {
				((l = null),
					v || o.activate(),
					d ? d !== Le && ((i.f |= V), Ce(i, d)) : ((i.f & V) !== 0 && (i.f ^= V), Ce(i, h)),
					u && (r.update_pending_count(-1), v || o.decrement()),
					_t());
			};
			if ((s.then(w, (h) => w(null, h || 'unknown')), o))
				return () => {
					queueMicrotask(() => o.neuter());
				};
		}),
		new Promise((a) => {
			function f(o) {
				function v() {
					o === s ? a(i) : f(s);
				}
				o.then(v, v);
			}
			f(s);
		})
	);
}
function tr(e) {
	const t = Ue(e);
	return (Rt(t), t);
}
function dn(e) {
	const t = Ue(e);
	return ((t.equals = ut), t);
}
function vt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) z(t[n]);
	}
}
function pn(e) {
	for (var t = e.parent; t !== null; ) {
		if ((t.f & k) === 0) return t;
		t = t.parent;
	}
	return null;
}
function He(e) {
	var t,
		n = _;
	ne(pn(e));
	try {
		(vt(e), (t = Pt(e)));
	} finally {
		ne(n);
	}
	return t;
}
function ht(e) {
	var t = He(e);
	if ((e.equals(t) || ((e.v = t), (e.wv = Ot())), !ae)) {
		var n = (M || (e.f & S) !== 0) && e.deps !== null ? U : E;
		x(e, n);
	}
}
const j = new Map();
function Be(e, t) {
	var n = { f: 0, v: e, reactions: null, equals: ft, rv: 0, wv: 0 };
	return n;
}
function I(e, t) {
	const n = Be(e);
	return (Rt(n), n);
}
function nr(e, t = !1, n = !0) {
	const r = Be(e);
	return (t || (r.equals = ut), be && n && y !== null && y.l !== null && (y.l.s ??= []).push(r), r);
}
function H(e, t, n = !1) {
	c !== null &&
		(!O || (c.f & $e) !== 0) &&
		he() &&
		(c.f & (k | re | je | $e)) !== 0 &&
		!D?.includes(e) &&
		$t();
	let r = n ? ie(t) : t;
	return Ce(e, r);
}
function Ce(e, t) {
	if (!e.equals(t)) {
		var n = e.v;
		(ae ? j.set(e, t) : j.set(e, n), (e.v = t));
		var r = $.ensure();
		(r.capture(e, n),
			(e.f & k) !== 0 && ((e.f & N) !== 0 && He(e), x(e, (e.f & S) === 0 ? E : U)),
			(e.wv = Ot()),
			dt(e, N),
			he() &&
				_ !== null &&
				(_.f & E) !== 0 &&
				(_.f & (C | J)) === 0 &&
				(R === null ? xn([e]) : R.push(e)));
	}
	return t;
}
function Oe(e) {
	H(e, e.v + 1);
}
function dt(e, t) {
	var n = e.reactions;
	if (n !== null)
		for (var r = he(), s = n.length, i = 0; i < s; i++) {
			var l = n[i],
				u = l.f;
			if (!(!r && l === _)) {
				var a = (u & N) === 0;
				(a && x(l, t),
					(u & k) !== 0 ? dt(l, U) : a && ((u & re) !== 0 && B !== null && B.push(l), te(l)));
			}
		}
}
function ie(e) {
	if (typeof e != 'object' || e === null || ue in e) return e;
	const t = tt(e);
	if (t !== Mt && t !== jt) return e;
	var n = new Map(),
		r = Ct(e),
		s = I(0),
		i = K,
		l = (u) => {
			if (K === i) return u();
			var a = c,
				f = K;
			(Y(null), et(i));
			var o = u();
			return (Y(a), et(f), o);
		};
	return (
		r && n.set('length', I(e.length)),
		new Proxy(e, {
			defineProperty(u, a, f) {
				(!('value' in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) &&
					Gt();
				var o = n.get(a);
				return (
					o === void 0
						? (o = l(() => {
								var v = I(f.value);
								return (n.set(a, v), v);
							}))
						: H(o, f.value, !0),
					!0
				);
			},
			deleteProperty(u, a) {
				var f = n.get(a);
				if (f === void 0) {
					if (a in u) {
						const o = l(() => I(g));
						(n.set(a, o), Oe(s));
					}
				} else (H(f, g), Oe(s));
				return !0;
			},
			get(u, a, f) {
				if (a === ue) return e;
				var o = n.get(a),
					v = a in u;
				if (
					(o === void 0 &&
						(!v || fe(u, a)?.writable) &&
						((o = l(() => {
							var h = ie(v ? u[a] : g),
								d = I(h);
							return d;
						})),
						n.set(a, o)),
					o !== void 0)
				) {
					var w = le(o);
					return w === g ? void 0 : w;
				}
				return Reflect.get(u, a, f);
			},
			getOwnPropertyDescriptor(u, a) {
				var f = Reflect.getOwnPropertyDescriptor(u, a);
				if (f && 'value' in f) {
					var o = n.get(a);
					o && (f.value = le(o));
				} else if (f === void 0) {
					var v = n.get(a),
						w = v?.v;
					if (v !== void 0 && w !== g)
						return { enumerable: !0, configurable: !0, value: w, writable: !0 };
				}
				return f;
			},
			has(u, a) {
				if (a === ue) return !0;
				var f = n.get(a),
					o = (f !== void 0 && f.v !== g) || Reflect.has(u, a);
				if (f !== void 0 || (_ !== null && (!o || fe(u, a)?.writable))) {
					f === void 0 &&
						((f = l(() => {
							var w = o ? ie(u[a]) : g,
								h = I(w);
							return h;
						})),
						n.set(a, f));
					var v = le(f);
					if (v === g) return !1;
				}
				return o;
			},
			set(u, a, f, o) {
				var v = n.get(a),
					w = a in u;
				if (r && a === 'length')
					for (var h = f; h < v.v; h += 1) {
						var d = n.get(h + '');
						d !== void 0 ? H(d, g) : h in u && ((d = l(() => I(g))), n.set(h + '', d));
					}
				if (v === void 0)
					(!w || fe(u, a)?.writable) && ((v = l(() => I(void 0))), H(v, ie(f)), n.set(a, v));
				else {
					w = v.v !== g;
					var Ae = l(() => ie(f));
					H(v, Ae);
				}
				var Ve = Reflect.getOwnPropertyDescriptor(u, a);
				if ((Ve?.set && Ve.set.call(o, f), !w)) {
					if (r && typeof a == 'string') {
						var Ke = n.get('length'),
							Re = Number(a);
						Number.isInteger(Re) && Re >= Ke.v && H(Ke, Re + 1);
					}
					Oe(s);
				}
				return !0;
			},
			ownKeys(u) {
				le(s);
				var a = Reflect.ownKeys(u).filter((v) => {
					var w = n.get(v);
					return w === void 0 || w.v !== g;
				});
				for (var [f, o] of n) o.v !== g && !(f in u) && a.push(f);
				return a;
			},
			setPrototypeOf() {
				Wt();
			}
		})
	);
}
var Je, pt, wt, yt;
function rr() {
	if (Je === void 0) {
		((Je = window), (pt = /Firefox/.test(navigator.userAgent)));
		var e = Element.prototype,
			t = Node.prototype,
			n = Text.prototype;
		((wt = fe(t, 'firstChild').get),
			(yt = fe(t, 'nextSibling').get),
			We(e) &&
				((e.__click = void 0),
				(e.__className = void 0),
				(e.__attributes = null),
				(e.__style = void 0),
				(e.__e = void 0)),
			We(n) && (n.__t = void 0));
	}
}
function Z(e = '') {
	return document.createTextNode(e);
}
function ce(e) {
	return wt.call(e);
}
function Q(e) {
	return yt.call(e);
}
function sr(e, t) {
	if (!A) return ce(e);
	var n = ce(p);
	if (n === null) n = p.appendChild(Z());
	else if (t && n.nodeType !== Ee) {
		var r = Z();
		return (n?.before(r), q(r), r);
	}
	return (q(n), n);
}
function ar(e, t = !1) {
	if (!A) {
		var n = ce(e);
		return n instanceof Comment && n.data === '' ? Q(n) : n;
	}
	if (t && p?.nodeType !== Ee) {
		var r = Z();
		return (p?.before(r), q(r), r);
	}
	return p;
}
function ir(e, t = 1, n = !1) {
	let r = A ? p : e;
	for (var s; t--; ) ((s = r), (r = Q(r)));
	if (!A) return r;
	if (n && r?.nodeType !== Ee) {
		var i = Z();
		return (r === null ? s?.after(i) : r.before(i), q(i), i);
	}
	return (q(r), r);
}
function lr(e) {
	e.textContent = '';
}
function fr() {
	return !1;
}
function gt(e) {
	var t = c,
		n = _;
	(Y(null), ne(null));
	try {
		return e();
	} finally {
		(Y(t), ne(n));
	}
}
function mt(e) {
	(_ === null && c === null && Vt(),
		c !== null && (c.f & S) !== 0 && _ === null && Bt(),
		ae && Ht());
}
function wn(e, t) {
	var n = t.last;
	n === null ? (t.last = t.first = e) : ((n.next = e), (e.prev = n), (t.last = e));
}
function P(e, t, n, r = !0) {
	var s = _;
	s !== null && (s.f & L) !== 0 && (e |= L);
	var i = {
		ctx: y,
		deps: null,
		nodes_start: null,
		nodes_end: null,
		f: e | N,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: s,
		b: s && s.b,
		prev: null,
		teardown: null,
		transitions: null,
		wv: 0,
		ac: null
	};
	if (n)
		try {
			(ee(i), (i.f |= Me));
		} catch (a) {
			throw (z(i), a);
		}
	else t !== null && te(i);
	if (r) {
		var l = i;
		if (
			(n &&
				l.deps === null &&
				l.teardown === null &&
				l.nodes_start === null &&
				l.first === l.last &&
				(l.f & ve) === 0 &&
				(l = l.first),
			l !== null &&
				((l.parent = s), s !== null && wn(l, s), c !== null && (c.f & k) !== 0 && (e & J) === 0))
		) {
			var u = c;
			(u.effects ??= []).push(l);
		}
	}
	return i;
}
function ur() {
	return c !== null && !O;
}
function or(e) {
	const t = P(me, null, !1);
	return (x(t, E), (t.teardown = e), t);
}
function cr(e) {
	mt();
	var t = _.f,
		n = !c && (t & C) !== 0 && (t & Me) === 0;
	if (n) {
		var r = y;
		(r.e ??= []).push(e);
	} else return Et(e);
}
function Et(e) {
	return P(Fe | at, e, !1);
}
function _r(e) {
	return (mt(), P(me | at, e, !0));
}
function vr(e) {
	$.ensure();
	const t = P(J | ve, e, !0);
	return (n = {}) =>
		new Promise((r) => {
			n.outro
				? En(t, () => {
						(z(t), r(void 0));
					})
				: (z(t), r(void 0));
		});
}
function hr(e) {
	return P(Fe, e, !1);
}
function yn(e) {
	return P(je | ve, e, !0);
}
function dr(e, t = 0) {
	return P(me | t, e, !0);
}
function pr(e, t = [], n = []) {
	_n(t, n, (r) => {
		P(me, () => e(...r.map(le)), !0);
	});
}
function wr(e, t = 0) {
	var n = P(re | t, e, !0);
	return n;
}
function yr(e, t = !0) {
	return P(C | ve, e, !0, t);
}
function bt(e) {
	var t = e.teardown;
	if (t !== null) {
		const n = ae,
			r = c;
		(Xe(!0), Y(null));
		try {
			t.call(null);
		} finally {
			(Xe(n), Y(r));
		}
	}
}
function xt(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null; ) {
		const s = n.ac;
		s !== null &&
			gt(() => {
				s.abort(Le);
			});
		var r = n.next;
		((n.f & J) !== 0 ? (n.parent = null) : z(n, t), (n = r));
	}
}
function gn(e) {
	for (var t = e.first; t !== null; ) {
		var n = t.next;
		((t.f & C) === 0 && z(t), (t = n));
	}
}
function z(e, t = !0) {
	var n = !1;
	((t || (e.f & qt) !== 0) &&
		e.nodes_start !== null &&
		e.nodes_end !== null &&
		(mn(e.nodes_start, e.nodes_end), (n = !0)),
		xt(e, t && !n),
		ge(e, 0),
		x(e, se));
	var r = e.transitions;
	if (r !== null) for (const i of r) i.stop();
	bt(e);
	var s = e.parent;
	(s !== null && s.first !== null && Tt(e),
		(e.next =
			e.prev =
			e.teardown =
			e.ctx =
			e.deps =
			e.fn =
			e.nodes_start =
			e.nodes_end =
			e.ac =
				null));
}
function mn(e, t) {
	for (; e !== null; ) {
		var n = e === t ? null : Q(e);
		(e.remove(), (e = n));
	}
}
function Tt(e) {
	var t = e.parent,
		n = e.prev,
		r = e.next;
	(n !== null && (n.next = r),
		r !== null && (r.prev = n),
		t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n)));
}
function En(e, t) {
	var n = [];
	(kt(e, n, !0),
		bn(n, () => {
			(z(e), t && t());
		}));
}
function bn(e, t) {
	var n = e.length;
	if (n > 0) {
		var r = () => --n || t();
		for (var s of e) s.out(r);
	} else t();
}
function kt(e, t, n) {
	if ((e.f & L) === 0) {
		if (((e.f ^= L), e.transitions !== null))
			for (const l of e.transitions) (l.is_global || n) && t.push(l);
		for (var r = e.first; r !== null; ) {
			var s = r.next,
				i = (r.f & st) !== 0 || (r.f & C) !== 0;
			(kt(r, t, i ? n : !1), (r = s));
		}
	}
}
function gr(e) {
	At(e, !0);
}
function At(e, t) {
	if ((e.f & L) !== 0) {
		((e.f ^= L), (e.f & E) === 0 && (x(e, N), te(e)));
		for (var n = e.first; n !== null; ) {
			var r = n.next,
				s = (n.f & st) !== 0 || (n.f & C) !== 0;
			(At(n, s ? t : !1), (n = r));
		}
		if (e.transitions !== null) for (const i of e.transitions) (i.is_global || t) && i.in();
	}
}
let X = !1;
function Qe(e) {
	X = e;
}
let ae = !1;
function Xe(e) {
	ae = e;
}
let c = null,
	O = !1;
function Y(e) {
	c = e;
}
let _ = null;
function ne(e) {
	_ = e;
}
let D = null;
function Rt(e) {
	c !== null && (D === null ? (D = [e]) : D.push(e));
}
let b = null,
	T = 0,
	R = null;
function xn(e) {
	R = e;
}
let St = 1,
	_e = 0,
	K = _e;
function et(e) {
	K = e;
}
let M = !1;
function Ot() {
	return ++St;
}
function ke(e) {
	var t = e.f;
	if ((t & N) !== 0) return !0;
	if ((t & U) !== 0) {
		var n = e.deps,
			r = (t & S) !== 0;
		if (n !== null) {
			var s,
				i,
				l = (t & de) !== 0,
				u = r && _ !== null && !M,
				a = n.length;
			if ((l || u) && (_ === null || (_.f & se) === 0)) {
				var f = e,
					o = f.parent;
				for (s = 0; s < a; s++)
					((i = n[s]), (l || !i?.reactions?.includes(f)) && (i.reactions ??= []).push(f));
				(l && (f.f ^= de), u && o !== null && (o.f & S) === 0 && (f.f ^= S));
			}
			for (s = 0; s < a; s++) if (((i = n[s]), ke(i) && ht(i), i.wv > e.wv)) return !0;
		}
		(!r || (_ !== null && !M)) && x(e, E);
	}
	return !1;
}
function Nt(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !D?.includes(e))
		for (var s = 0; s < r.length; s++) {
			var i = r[s];
			(i.f & k) !== 0 ? Nt(i, t, !1) : t === i && (n ? x(i, N) : (i.f & E) !== 0 && x(i, U), te(i));
		}
}
function Pt(e) {
	var t = b,
		n = T,
		r = R,
		s = c,
		i = M,
		l = D,
		u = y,
		a = O,
		f = K,
		o = e.f;
	((b = null),
		(T = 0),
		(R = null),
		(M = (o & S) !== 0 && (O || !X || c === null)),
		(c = (o & (C | J)) === 0 ? e : null),
		(D = null),
		pe(e.ctx),
		(O = !1),
		(K = ++_e),
		e.ac !== null &&
			(gt(() => {
				e.ac.abort(Le);
			}),
			(e.ac = null)));
	try {
		e.f |= Ne;
		var v = e.fn,
			w = v(),
			h = e.deps;
		if (b !== null) {
			var d;
			if ((ge(e, T), h !== null && T > 0))
				for (h.length = T + b.length, d = 0; d < b.length; d++) h[T + d] = b[d];
			else e.deps = h = b;
			if (!M || ((o & k) !== 0 && e.reactions !== null))
				for (d = T; d < h.length; d++) (h[d].reactions ??= []).push(e);
		} else h !== null && T < h.length && (ge(e, T), (h.length = T));
		if (he() && R !== null && !O && h !== null && (e.f & (k | U | N)) === 0)
			for (d = 0; d < R.length; d++) Nt(R[d], e);
		return (
			s !== null && s !== e && (_e++, R !== null && (r === null ? (r = R) : r.push(...R))),
			(e.f & V) !== 0 && (e.f ^= V),
			w
		);
	} catch (Ae) {
		return un(Ae);
	} finally {
		((e.f ^= Ne), (b = t), (T = n), (R = r), (c = s), (M = i), (D = l), pe(u), (O = a), (K = f));
	}
}
function Tn(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = It.call(n, e);
		if (r !== -1) {
			var s = n.length - 1;
			s === 0 ? (n = t.reactions = null) : ((n[r] = n[s]), n.pop());
		}
	}
	n === null &&
		(t.f & k) !== 0 &&
		(b === null || !b.includes(t)) &&
		(x(t, U), (t.f & (S | de)) === 0 && (t.f ^= de), vt(t), ge(t, 0));
}
function ge(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Tn(e, n[r]);
}
function ee(e) {
	var t = e.f;
	if ((t & se) === 0) {
		x(e, E);
		var n = _,
			r = X;
		((_ = e), (X = !0));
		try {
			((t & re) !== 0 ? gn(e) : xt(e), bt(e));
			var s = Pt(e);
			((e.teardown = typeof s == 'function' ? s : null), (e.wv = St));
			var i;
		} finally {
			((X = r), (_ = n));
		}
	}
}
async function mr() {
	(await Promise.resolve(), on());
}
function Er() {
	return $.ensure().settled();
}
function le(e) {
	var t = e.f,
		n = (t & k) !== 0;
	if (c !== null && !O) {
		var r = _ !== null && (_.f & se) !== 0;
		if (!r && !D?.includes(e)) {
			var s = c.deps;
			if ((c.f & Ne) !== 0)
				e.rv < _e &&
					((e.rv = _e),
					b === null && s !== null && s[T] === e
						? T++
						: b === null
							? (b = [e])
							: (!M || !b.includes(e)) && b.push(e));
			else {
				(c.deps ??= []).push(e);
				var i = e.reactions;
				i === null ? (e.reactions = [c]) : i.includes(c) || i.push(c);
			}
		}
	} else if (n && e.deps === null && e.effects === null) {
		var l = e,
			u = l.parent;
		u !== null && (u.f & S) === 0 && (l.f ^= S);
	}
	if (ae) {
		if (j.has(e)) return j.get(e);
		if (n) {
			l = e;
			var a = l.v;
			return ((((l.f & E) === 0 && l.reactions !== null) || Dt(l)) && (a = He(l)), j.set(l, a), a);
		}
	} else n && ((l = e), ke(l) && ht(l));
	if ((e.f & V) !== 0) throw e.v;
	return e.v;
}
function Dt(e) {
	if (e.v === g) return !0;
	if (e.deps === null) return !1;
	for (const t of e.deps) if (j.has(t) || ((t.f & k) !== 0 && Dt(t))) return !0;
	return !1;
}
function br(e) {
	var t = O;
	try {
		return ((O = !0), e());
	} finally {
		O = t;
	}
}
const kn = -7169;
function x(e, t) {
	e.f = (e.f & kn) | t;
}
function xr(e) {
	if (!(typeof e != 'object' || !e || e instanceof EventTarget)) {
		if (ue in e) Ie(e);
		else if (!Array.isArray(e))
			for (let t in e) {
				const n = e[t];
				typeof n == 'object' && n && ue in n && Ie(n);
			}
	}
}
function Ie(e, t = new Set()) {
	if (typeof e == 'object' && e !== null && !(e instanceof EventTarget) && !t.has(e)) {
		(t.add(e), e instanceof Date && e.getTime());
		for (let r in e)
			try {
				Ie(e[r], t);
			} catch {}
		const n = tt(e);
		if (
			n !== Object.prototype &&
			n !== Array.prototype &&
			n !== Map.prototype &&
			n !== Set.prototype &&
			n !== Date.prototype
		) {
			const r = Ft(n);
			for (let s in r) {
				const i = r[s].get;
				if (i)
					try {
						i.call(e);
					} catch {}
			}
		}
	}
}
function An(e) {
	var t = document.createElement('template');
	return ((t.innerHTML = e.replaceAll('<!>', '<!---->')), t.content);
}
function G(e, t) {
	var n = _;
	n.nodes_start === null && ((n.nodes_start = e), (n.nodes_end = t));
}
function Tr(e, t) {
	var n = (t & Zt) !== 0,
		r = (t & zt) !== 0,
		s,
		i = !e.startsWith('<!>');
	return () => {
		if (A) return (G(p, null), p);
		s === void 0 && ((s = An(i ? e : '<!>' + e)), n || (s = ce(s)));
		var l = r || pt ? document.importNode(s, !0) : s.cloneNode(!0);
		if (n) {
			var u = ce(l),
				a = l.lastChild;
			G(u, a);
		} else G(l, l);
		return l;
	};
}
function kr(e = '') {
	if (!A) {
		var t = Z(e + '');
		return (G(t, t), t);
	}
	var n = p;
	return (n.nodeType !== Ee && (n.before((n = Z())), q(n)), G(n, n), n);
}
function Ar() {
	if (A) return (G(p, null), p);
	var e = document.createDocumentFragment(),
		t = document.createComment(''),
		n = Z();
	return (e.append(t, n), G(t, n), e);
}
function Rr(e, t) {
	if (A) {
		((_.nodes_end = p), en());
		return;
	}
	e !== null && e.before(t);
}
export {
	Y as $,
	yr as A,
	Sn as B,
	it as C,
	z as D,
	st as E,
	Ar as F,
	y as G,
	qt as H,
	_r as I,
	cr as J,
	nt as K,
	On as L,
	le as M,
	Hn as N,
	xr as O,
	Ue as P,
	ur as Q,
	Be as R,
	dr as S,
	Oe as T,
	an as U,
	Ce as V,
	_ as W,
	Qt as X,
	$ as Y,
	En as Z,
	ne as _,
	Rr as a,
	pe as a0,
	un as a1,
	c as a2,
	Ze as a3,
	Gn as a4,
	ye as a5,
	Mn as a6,
	ve as a7,
	rt as a8,
	Bn as a9,
	ue as aA,
	fe as aB,
	Fn as aC,
	qn as aD,
	dn as aE,
	ie as aF,
	H as aG,
	ae as aH,
	se as aI,
	Yn as aJ,
	Ln as aK,
	jn as aL,
	Un as aM,
	Nn as aN,
	nr as aO,
	I as aP,
	tr as aQ,
	kr as aR,
	tn as aS,
	Ge as aa,
	Ct as ab,
	rr as ac,
	qe as ad,
	Cn as ae,
	lr as af,
	Rn as ag,
	vr as ah,
	Xt as ai,
	Ye as aj,
	Yt as ak,
	Dn as al,
	In as am,
	be as an,
	on as ao,
	Qn as ap,
	Zn as aq,
	Jn as ar,
	zn as as,
	Er as at,
	mr as au,
	Wn as av,
	m as aw,
	g as ax,
	fr as ay,
	gr as az,
	ar as b,
	er as c,
	sr as d,
	$n as e,
	Tr as f,
	hr as g,
	Z as h,
	wr as i,
	A as j,
	Jt as k,
	Q as l,
	lt as m,
	Kn as n,
	q as o,
	Xn as p,
	p as q,
	Vn as r,
	ir as s,
	pr as t,
	br as u,
	ce as v,
	en as w,
	An as x,
	G as y,
	or as z
};
