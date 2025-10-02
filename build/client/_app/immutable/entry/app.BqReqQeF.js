const __vite__mapDeps = (
	i,
	m = __vite__mapDeps,
	d = m.f ||
		(m.f = [
			'../nodes/0.DyXRaVZb.js',
			'../chunks/DsnmJJEf.js',
			'../chunks/Dor_A3w4.js',
			'../chunks/CPGMAfgJ.js',
			'../assets/0.o15-gu61.css',
			'../nodes/1.D662FMeo.js',
			'../chunks/CV76BIMQ.js',
			'../chunks/KQpmcra8.js',
			'../chunks/BpwBI0p8.js',
			'../nodes/2.DqotnbQG.js',
			'../nodes/3.CH3PxgrB.js',
			'../nodes/4.DxCod_Pn.js',
			'../chunks/BWroVZKq.js',
			'../nodes/5.ByO2h7kz.js'
		])
) => i.map((i) => d[i]);
import {
	j as A,
	w as V,
	i as Y,
	E as Z,
	av as ae,
	X as ne,
	a4 as se,
	o as ie,
	m as q,
	h as z,
	A as M,
	aw as j,
	ax as oe,
	ay as G,
	az as ce,
	Z as H,
	q as J,
	g as fe,
	S as ue,
	u as W,
	U as le,
	aA as K,
	aB as de,
	aC as _e,
	aD as ve,
	M as b,
	P as me,
	aE as he,
	aF as ge,
	aG as O,
	aH as Ee,
	W as ye,
	aI as be,
	aJ as Pe,
	an as Re,
	aK as Se,
	aL as Ie,
	aM as Ae,
	aN as Q,
	ao as Oe,
	aa as Te,
	aO as Le,
	p as we,
	I as De,
	J as ke,
	aP as w,
	au as xe,
	f as X,
	b as T,
	s as pe,
	a as S,
	c as Ne,
	F as D,
	d as Ce,
	r as Me,
	aQ as k,
	aR as je,
	t as Ue
} from '../chunks/Dor_A3w4.js';
import { h as qe, m as Be, u as Fe, o as Ve, s as Ye } from '../chunks/KQpmcra8.js';
import '../chunks/DsnmJJEf.js';
function x(a, e, s = !1) {
	A && V();
	var o = a,
		n = null,
		t = null,
		r = oe,
		i = s ? Z : 0,
		m = !1;
	const y = (d, u = !0) => {
		((m = !0), v(u, d));
	};
	var c = null;
	function h() {
		c !== null && (c.lastChild.remove(), o.before(c), (c = null));
		var d = r ? n : t,
			u = r ? t : n;
		(d && ce(d),
			u &&
				H(u, () => {
					r ? (t = null) : (n = null);
				}));
	}
	const v = (d, u) => {
		if (r === (r = d)) return;
		let l = !1;
		if (A) {
			const R = ae(o) === ne;
			!!r === R && ((o = se()), ie(o), q(!1), (l = !0));
		}
		var g = G(),
			_ = o;
		if (
			(g && ((c = document.createDocumentFragment()), c.append((_ = z()))),
			r ? (n ??= u && M(() => u(_))) : (t ??= u && M(() => u(_))),
			g)
		) {
			var P = j,
				f = r ? n : t,
				E = r ? t : n;
			(f && P.skipped_effects.delete(f), E && P.skipped_effects.add(E), P.add_callback(h));
		} else h();
		l && q(!0);
	};
	(Y(() => {
		((m = !1), e(y), m || v(null, null));
	}, i),
		A && (o = J));
}
function p(a, e, s) {
	A && V();
	var o = a,
		n,
		t,
		r = null,
		i = null;
	function m() {
		(t && (H(t), (t = null)),
			r && (r.lastChild.remove(), o.before(r), (r = null)),
			(t = i),
			(i = null));
	}
	(Y(() => {
		if (n !== (n = e())) {
			var y = G();
			if (n) {
				var c = o;
				(y &&
					((r = document.createDocumentFragment()),
					r.append((c = z())),
					t && j.skipped_effects.add(t)),
					(i = M(() => s(c, n))));
			}
			y ? j.add_callback(m) : m();
		}
	}, Z),
		A && (o = J));
}
function B(a, e) {
	return a === e || a?.[K] === e;
}
function N(a = {}, e, s, o) {
	return (
		fe(() => {
			var n, t;
			return (
				ue(() => {
					((n = t),
						(t = []),
						W(() => {
							a !== s(...t) && (e(a, ...t), n && B(s(...n), a) && e(null, ...n));
						}));
				}),
				() => {
					le(() => {
						t && B(s(...t), a) && e(null, ...t);
					});
				}
			);
		}),
		a
	);
}
let L = !1;
function Ze(a) {
	var e = L;
	try {
		return ((L = !1), [a(), L]);
	} finally {
		L = e;
	}
}
function C(a, e, s, o) {
	var n = !Re || (s & Se) !== 0,
		t = (s & Pe) !== 0,
		r = (s & Ae) !== 0,
		i = o,
		m = !0,
		y = () => (m && ((m = !1), (i = r ? W(o) : o)), i),
		c;
	if (t) {
		var h = K in a || Q in a;
		c = de(a, e)?.set ?? (h && e in a ? (f) => (a[e] = f) : void 0);
	}
	var v,
		d = !1;
	(t ? ([v, d] = Ze(() => a[e])) : (v = a[e]),
		v === void 0 && o !== void 0 && ((v = y()), c && (n && _e(), c(v))));
	var u;
	if (
		(n
			? (u = () => {
					var f = a[e];
					return f === void 0 ? y() : ((m = !0), f);
				})
			: (u = () => {
					var f = a[e];
					return (f !== void 0 && (i = void 0), f === void 0 ? i : f);
				}),
		n && (s & ve) === 0)
	)
		return u;
	if (c) {
		var l = a.$$legacy;
		return function (f, E) {
			return arguments.length > 0 ? ((!n || !E || l || d) && c(E ? u() : f), f) : u();
		};
	}
	var g = !1,
		_ = ((s & Ie) !== 0 ? me : he)(() => ((g = !1), u()));
	t && b(_);
	var P = ye;
	return function (f, E) {
		if (arguments.length > 0) {
			const R = E ? b(_) : n && t ? ge(f) : f;
			return (O(_, R), (g = !0), i !== void 0 && (i = R), f);
		}
		return (Ee && g) || (P.f & be) !== 0 ? _.v : b(_);
	};
}
function ze(a) {
	return class extends Ge {
		constructor(e) {
			super({ component: a, ...e });
		}
	};
}
class Ge {
	#t;
	#e;
	constructor(e) {
		var s = new Map(),
			o = (t, r) => {
				var i = Le(r, !1, !1);
				return (s.set(t, i), i);
			};
		const n = new Proxy(
			{ ...(e.props || {}), $$events: {} },
			{
				get(t, r) {
					return b(s.get(r) ?? o(r, Reflect.get(t, r)));
				},
				has(t, r) {
					return r === Q ? !0 : (b(s.get(r) ?? o(r, Reflect.get(t, r))), Reflect.has(t, r));
				},
				set(t, r, i) {
					return (O(s.get(r) ?? o(r, i), i), Reflect.set(t, r, i));
				}
			}
		);
		((this.#e = (e.hydrate ? qe : Be)(e.component, {
			target: e.target,
			anchor: e.anchor,
			props: n,
			context: e.context,
			intro: e.intro ?? !1,
			recover: e.recover
		})),
			(!e?.props?.$$host || e.sync === !1) && Oe(),
			(this.#t = n.$$events));
		for (const t of Object.keys(this.#e))
			t === '$set' ||
				t === '$destroy' ||
				t === '$on' ||
				Te(this, t, {
					get() {
						return this.#e[t];
					},
					set(r) {
						this.#e[t] = r;
					},
					enumerable: !0
				});
		((this.#e.$set = (t) => {
			Object.assign(n, t);
		}),
			(this.#e.$destroy = () => {
				Fe(this.#e);
			}));
	}
	$set(e) {
		this.#e.$set(e);
	}
	$on(e, s) {
		this.#t[e] = this.#t[e] || [];
		const o = (...n) => s.call(this, ...n);
		return (
			this.#t[e].push(o),
			() => {
				this.#t[e] = this.#t[e].filter((n) => n !== o);
			}
		);
	}
	$destroy() {
		this.#e.$destroy();
	}
}
const He = 'modulepreload',
	Je = function (a, e) {
		return new URL(a, e).href;
	},
	F = {},
	I = function (e, s, o) {
		let n = Promise.resolve();
		if (s && s.length > 0) {
			let y = function (c) {
				return Promise.all(
					c.map((h) =>
						Promise.resolve(h).then(
							(v) => ({ status: 'fulfilled', value: v }),
							(v) => ({ status: 'rejected', reason: v })
						)
					)
				);
			};
			const r = document.getElementsByTagName('link'),
				i = document.querySelector('meta[property=csp-nonce]'),
				m = i?.nonce || i?.getAttribute('nonce');
			n = y(
				s.map((c) => {
					if (((c = Je(c, o)), c in F)) return;
					F[c] = !0;
					const h = c.endsWith('.css'),
						v = h ? '[rel="stylesheet"]' : '';
					if (o)
						for (let u = r.length - 1; u >= 0; u--) {
							const l = r[u];
							if (l.href === c && (!h || l.rel === 'stylesheet')) return;
						}
					else if (document.querySelector(`link[href="${c}"]${v}`)) return;
					const d = document.createElement('link');
					if (
						((d.rel = h ? 'stylesheet' : He),
						h || (d.as = 'script'),
						(d.crossOrigin = ''),
						(d.href = c),
						m && d.setAttribute('nonce', m),
						document.head.appendChild(d),
						h)
					)
						return new Promise((u, l) => {
							(d.addEventListener('load', u),
								d.addEventListener('error', () => l(new Error(`Unable to preload CSS for ${c}`))));
						});
				})
			);
		}
		function t(r) {
			const i = new Event('vite:preloadError', { cancelable: !0 });
			if (((i.payload = r), window.dispatchEvent(i), !i.defaultPrevented)) throw r;
		}
		return n.then((r) => {
			for (const i of r || []) i.status === 'rejected' && t(i.reason);
			return e().catch(t);
		});
	},
	nt = {};
var We = X(
		'<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'
	),
	Ke = X('<!> <!>', 1);
function Qe(a, e) {
	we(e, !0);
	let s = C(e, 'components', 23, () => []),
		o = C(e, 'data_0', 3, null),
		n = C(e, 'data_1', 3, null);
	(De(() => e.stores.page.set(e.page)),
		ke(() => {
			(e.stores, e.page, e.constructors, s(), e.form, o(), n(), e.stores.page.notify());
		}));
	let t = w(!1),
		r = w(!1),
		i = w(null);
	Ve(() => {
		const l = e.stores.page.subscribe(() => {
			b(t) &&
				(O(r, !0),
				xe().then(() => {
					O(i, document.title || 'untitled page', !0);
				}));
		});
		return (O(t, !0), l);
	});
	const m = k(() => e.constructors[1]);
	var y = Ke(),
		c = T(y);
	{
		var h = (l) => {
				const g = k(() => e.constructors[0]);
				var _ = D(),
					P = T(_);
				(p(
					P,
					() => b(g),
					(f, E) => {
						N(
							E(f, {
								get data() {
									return o();
								},
								get form() {
									return e.form;
								},
								get params() {
									return e.page.params;
								},
								children: (R, et) => {
									var U = D(),
										$ = T(U);
									(p(
										$,
										() => b(m),
										(ee, te) => {
											N(
												te(ee, {
													get data() {
														return n();
													},
													get form() {
														return e.form;
													},
													get params() {
														return e.page.params;
													}
												}),
												(re) => (s()[1] = re),
												() => s()?.[1]
											);
										}
									),
										S(R, U));
								},
								$$slots: { default: !0 }
							}),
							(R) => (s()[0] = R),
							() => s()?.[0]
						);
					}
				),
					S(l, _));
			},
			v = (l) => {
				const g = k(() => e.constructors[0]);
				var _ = D(),
					P = T(_);
				(p(
					P,
					() => b(g),
					(f, E) => {
						N(
							E(f, {
								get data() {
									return o();
								},
								get form() {
									return e.form;
								},
								get params() {
									return e.page.params;
								}
							}),
							(R) => (s()[0] = R),
							() => s()?.[0]
						);
					}
				),
					S(l, _));
			};
		x(c, (l) => {
			e.constructors[1] ? l(h) : l(v, !1);
		});
	}
	var d = pe(c, 2);
	{
		var u = (l) => {
			var g = We(),
				_ = Ce(g);
			{
				var P = (f) => {
					var E = je();
					(Ue(() => Ye(E, b(i))), S(f, E));
				};
				x(_, (f) => {
					b(r) && f(P);
				});
			}
			(Me(g), S(l, g));
		};
		x(d, (l) => {
			b(t) && l(u);
		});
	}
	(S(a, y), Ne());
}
const st = ze(Qe),
	it = [
		() =>
			I(() => import('../nodes/0.DyXRaVZb.js'), __vite__mapDeps([0, 1, 2, 3, 4]), import.meta.url),
		() =>
			I(
				() => import('../nodes/1.D662FMeo.js'),
				__vite__mapDeps([5, 1, 6, 2, 7, 3, 8]),
				import.meta.url
			),
		() => I(() => import('../nodes/2.DqotnbQG.js'), __vite__mapDeps([9, 1, 6, 2]), import.meta.url),
		() =>
			I(() => import('../nodes/3.CH3PxgrB.js'), __vite__mapDeps([10, 1, 6, 2]), import.meta.url),
		() =>
			I(
				() => import('../nodes/4.DxCod_Pn.js'),
				__vite__mapDeps([11, 1, 2, 7, 3, 12, 8]),
				import.meta.url
			),
		() =>
			I(
				() => import('../nodes/5.ByO2h7kz.js'),
				__vite__mapDeps([13, 1, 2, 7, 3, 12, 8]),
				import.meta.url
			)
	],
	ot = [],
	ct = { '/': [2], '/demo': [3], '/demo/lucia': [-5], '/demo/lucia/login': [-6] },
	Xe = {
		handleError: ({ error: a }) => {
			console.error(a);
		},
		reroute: () => {},
		transport: {}
	},
	$e = Object.fromEntries(Object.entries(Xe.transport).map(([a, e]) => [a, e.decode])),
	ft = !1,
	ut = (a, e) => $e[a](e);
export {
	ut as decode,
	$e as decoders,
	ct as dictionary,
	ft as hash,
	Xe as hooks,
	nt as matchers,
	it as nodes,
	st as root,
	ot as server_loads
};
