import { o as We, a as Tt } from './KQpmcra8.js';
import { B as be, aS as It, aP as U, M as L, aG as P, au as ze } from './Dor_A3w4.js';
const q = [];
function Ce(e, t = be) {
	let n = null;
	const r = new Set();
	function a(o) {
		if (It(e, o) && ((e = o), n)) {
			const c = !q.length;
			for (const l of r) (l[1](), q.push(l, e));
			if (c) {
				for (let l = 0; l < q.length; l += 2) q[l][0](q[l + 1]);
				q.length = 0;
			}
		}
	}
	function s(o) {
		a(o(e));
	}
	function i(o, c = be) {
		const l = [o, c];
		return (
			r.add(l),
			r.size === 1 && (n = t(a, s) || be),
			o(e),
			() => {
				(r.delete(l), r.size === 0 && n && (n(), (n = null)));
			}
		);
	}
	return { set: a, update: s, subscribe: i };
}
class he {
	constructor(t, n) {
		((this.status = t),
			typeof n == 'string'
				? (this.body = { message: n })
				: n
					? (this.body = n)
					: (this.body = { message: `Error: ${t}` }));
	}
	toString() {
		return JSON.stringify(this.body);
	}
}
class Ne {
	constructor(t, n) {
		((this.status = t), (this.location = n));
	}
}
class Oe extends Error {
	constructor(t, n, r) {
		(super(r), (this.status = t), (this.text = n));
	}
}
new URL('sveltekit-internal://');
function Ut(e, t) {
	return e === '/' || t === 'ignore'
		? e
		: t === 'never'
			? e.endsWith('/')
				? e.slice(0, -1)
				: e
			: t === 'always' && !e.endsWith('/')
				? e + '/'
				: e;
}
function Lt(e) {
	return e.split('%25').map(decodeURI).join('%25');
}
function Pt(e) {
	for (const t in e) e[t] = decodeURIComponent(e[t]);
	return e;
}
function ke({ href: e }) {
	return e.split('#')[0];
}
function xt(e, t, n, r = !1) {
	const a = new URL(e);
	Object.defineProperty(a, 'searchParams', {
		value: new Proxy(a.searchParams, {
			get(i, o) {
				if (o === 'get' || o === 'getAll' || o === 'has') return (l) => (n(l), i[o](l));
				t();
				const c = Reflect.get(i, o);
				return typeof c == 'function' ? c.bind(i) : c;
			}
		}),
		enumerable: !0,
		configurable: !0
	});
	const s = ['href', 'pathname', 'search', 'toString', 'toJSON'];
	r && s.push('hash');
	for (const i of s)
		Object.defineProperty(a, i, {
			get() {
				return (t(), e[i]);
			},
			enumerable: !0,
			configurable: !0
		});
	return a;
}
function Ct(...e) {
	let t = 5381;
	for (const n of e)
		if (typeof n == 'string') {
			let r = n.length;
			for (; r; ) t = (t * 33) ^ n.charCodeAt(--r);
		} else if (ArrayBuffer.isView(n)) {
			const r = new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
			let a = r.length;
			for (; a; ) t = (t * 33) ^ r[--a];
		} else throw new TypeError('value must be a string or TypedArray');
	return (t >>> 0).toString(36);
}
new TextEncoder();
const Nt = new TextDecoder();
function Ot(e) {
	const t = atob(e),
		n = new Uint8Array(t.length);
	for (let r = 0; r < t.length; r++) n[r] = t.charCodeAt(r);
	return n;
}
const $t = window.fetch;
window.fetch = (e, t) => (
	(e instanceof Request ? e.method : t?.method || 'GET') !== 'GET' && Y.delete($e(e)),
	$t(e, t)
);
const Y = new Map();
function jt(e, t) {
	const n = $e(e, t),
		r = document.querySelector(n);
	if (r?.textContent) {
		r.remove();
		let { body: a, ...s } = JSON.parse(r.textContent);
		const i = r.getAttribute('data-ttl');
		return (
			i && Y.set(n, { body: a, init: s, ttl: 1e3 * Number(i) }),
			r.getAttribute('data-b64') !== null && (a = Ot(a)),
			Promise.resolve(new Response(a, s))
		);
	}
	return window.fetch(e, t);
}
function Dt(e, t, n) {
	if (Y.size > 0) {
		const r = $e(e, n),
			a = Y.get(r);
		if (a) {
			if (
				performance.now() < a.ttl &&
				['default', 'force-cache', 'only-if-cached', void 0].includes(n?.cache)
			)
				return new Response(a.body, a.init);
			Y.delete(r);
		}
	}
	return window.fetch(t, n);
}
function $e(e, t) {
	let r = `script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request ? e.url : e)}]`;
	if (t?.headers || t?.body) {
		const a = [];
		(t.headers && a.push([...new Headers(t.headers)].join(',')),
			t.body && (typeof t.body == 'string' || ArrayBuffer.isView(t.body)) && a.push(t.body),
			(r += `[data-hash="${Ct(...a)}"]`));
	}
	return r;
}
const qt = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function Bt(e) {
	const t = [];
	return {
		pattern:
			e === '/'
				? /^\/$/
				: new RegExp(
						`^${Mt(e)
							.map((r) => {
								const a = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);
								if (a)
									return (
										t.push({ name: a[1], matcher: a[2], optional: !1, rest: !0, chained: !0 }),
										'(?:/([^]*))?'
									);
								const s = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);
								if (s)
									return (
										t.push({ name: s[1], matcher: s[2], optional: !0, rest: !1, chained: !0 }),
										'(?:/([^/]+))?'
									);
								if (!r) return;
								const i = r.split(/\[(.+?)\](?!\])/);
								return (
									'/' +
									i
										.map((c, l) => {
											if (l % 2) {
												if (c.startsWith('x+'))
													return Se(String.fromCharCode(parseInt(c.slice(2), 16)));
												if (c.startsWith('u+'))
													return Se(
														String.fromCharCode(
															...c
																.slice(2)
																.split('-')
																.map((w) => parseInt(w, 16))
														)
													);
												const d = qt.exec(c),
													[, p, u, f, h] = d;
												return (
													t.push({
														name: f,
														matcher: h,
														optional: !!p,
														rest: !!u,
														chained: u ? l === 1 && i[0] === '' : !1
													}),
													u ? '([^]*?)' : p ? '([^/]*)?' : '([^/]+?)'
												);
											}
											return Se(c);
										})
										.join('')
								);
							})
							.join('')}/?$`
					),
		params: t
	};
}
function Ft(e) {
	return e !== '' && !/^\([^)]+\)$/.test(e);
}
function Mt(e) {
	return e.slice(1).split('/').filter(Ft);
}
function Vt(e, t, n) {
	const r = {},
		a = e.slice(1),
		s = a.filter((o) => o !== void 0);
	let i = 0;
	for (let o = 0; o < t.length; o += 1) {
		const c = t[o];
		let l = a[o - i];
		if (
			(c.chained &&
				c.rest &&
				i &&
				((l = a
					.slice(o - i, o + 1)
					.filter((d) => d)
					.join('/')),
				(i = 0)),
			l === void 0)
		) {
			c.rest && (r[c.name] = '');
			continue;
		}
		if (!c.matcher || n[c.matcher](l)) {
			r[c.name] = l;
			const d = t[o + 1],
				p = a[o + 1];
			(d && !d.rest && d.optional && p && c.chained && (i = 0),
				!d && !p && Object.keys(r).length === s.length && (i = 0));
			continue;
		}
		if (c.optional && c.chained) {
			i++;
			continue;
		}
		return;
	}
	if (!i) return r;
}
function Se(e) {
	return e
		.normalize()
		.replace(/[[\]]/g, '\\$&')
		.replace(/%/g, '%25')
		.replace(/\//g, '%2[Ff]')
		.replace(/\?/g, '%3[Ff]')
		.replace(/#/g, '%23')
		.replace(/[.*+?^${}()|\\]/g, '\\$&');
}
function Gt({ nodes: e, server_loads: t, dictionary: n, matchers: r }) {
	const a = new Set(t);
	return Object.entries(n).map(([o, [c, l, d]]) => {
		const { pattern: p, params: u } = Bt(o),
			f = {
				id: o,
				exec: (h) => {
					const w = p.exec(h);
					if (w) return Vt(w, u, r);
				},
				errors: [1, ...(d || [])].map((h) => e[h]),
				layouts: [0, ...(l || [])].map(i),
				leaf: s(c)
			};
		return ((f.errors.length = f.layouts.length = Math.max(f.errors.length, f.layouts.length)), f);
	});
	function s(o) {
		const c = o < 0;
		return (c && (o = ~o), [c, e[o]]);
	}
	function i(o) {
		return o === void 0 ? o : [a.has(o), e[o]];
	}
}
function at(e, t = JSON.parse) {
	try {
		return t(sessionStorage[e]);
	} catch {}
}
function Je(e, t, n = JSON.stringify) {
	const r = n(t);
	try {
		sessionStorage[e] = r;
	} catch {}
}
const I = globalThis.__sveltekit_59fxsq?.base ?? '',
	Ht = globalThis.__sveltekit_59fxsq?.assets ?? I ?? '',
	Kt = '1759255671887',
	ot = 'sveltekit:snapshot',
	st = 'sveltekit:scroll',
	it = 'sveltekit:states',
	Yt = 'sveltekit:pageurl',
	F = 'sveltekit:history',
	J = 'sveltekit:navigation',
	j = { tap: 1, hover: 2, viewport: 3, eager: 4, off: -1, false: -1 },
	pe = location.origin;
function ct(e) {
	if (e instanceof URL) return e;
	let t = document.baseURI;
	if (!t) {
		const n = document.getElementsByTagName('base');
		t = n.length ? n[0].href : document.URL;
	}
	return new URL(e, t);
}
function ge() {
	return { x: pageXOffset, y: pageYOffset };
}
function B(e, t) {
	return e.getAttribute(`data-sveltekit-${t}`);
}
const Xe = { ...j, '': j.hover };
function lt(e) {
	let t = e.assignedSlot ?? e.parentNode;
	return (t?.nodeType === 11 && (t = t.host), t);
}
function ft(e, t) {
	for (; e && e !== t; ) {
		if (e.nodeName.toUpperCase() === 'A' && e.hasAttribute('href')) return e;
		e = lt(e);
	}
}
function Te(e, t, n) {
	let r;
	try {
		if (
			((r = new URL(e instanceof SVGAElement ? e.href.baseVal : e.href, document.baseURI)),
			n && r.hash.match(/^#[^/]/))
		) {
			const o = location.hash.split('#')[1] || '/';
			r.hash = `#${o}${r.hash}`;
		}
	} catch {}
	const a = e instanceof SVGAElement ? e.target.baseVal : e.target,
		s = !r || !!a || _e(r, t, n) || (e.getAttribute('rel') || '').split(/\s+/).includes('external'),
		i = r?.origin === pe && e.hasAttribute('download');
	return { url: r, external: s, target: a, download: i };
}
function oe(e) {
	let t = null,
		n = null,
		r = null,
		a = null,
		s = null,
		i = null,
		o = e;
	for (; o && o !== document.documentElement; )
		(r === null && (r = B(o, 'preload-code')),
			a === null && (a = B(o, 'preload-data')),
			t === null && (t = B(o, 'keepfocus')),
			n === null && (n = B(o, 'noscroll')),
			s === null && (s = B(o, 'reload')),
			i === null && (i = B(o, 'replacestate')),
			(o = lt(o)));
	function c(l) {
		switch (l) {
			case '':
			case 'true':
				return !0;
			case 'off':
			case 'false':
				return !1;
			default:
				return;
		}
	}
	return {
		preload_code: Xe[r ?? 'off'],
		preload_data: Xe[a ?? 'off'],
		keepfocus: c(t),
		noscroll: c(n),
		reload: c(s),
		replace_state: c(i)
	};
}
function Ze(e) {
	const t = Ce(e);
	let n = !0;
	function r() {
		((n = !0), t.update((i) => i));
	}
	function a(i) {
		((n = !1), t.set(i));
	}
	function s(i) {
		let o;
		return t.subscribe((c) => {
			(o === void 0 || (n && c !== o)) && i((o = c));
		});
	}
	return { notify: r, set: a, subscribe: s };
}
const ut = { v: () => {} };
function Wt() {
	const { set: e, subscribe: t } = Ce(!1);
	let n;
	async function r() {
		clearTimeout(n);
		try {
			const a = await fetch(`${Ht}/_app/version.json`, {
				headers: { pragma: 'no-cache', 'cache-control': 'no-cache' }
			});
			if (!a.ok) return !1;
			const i = (await a.json()).version !== Kt;
			return (i && (e(!0), ut.v(), clearTimeout(n)), i);
		} catch {
			return !1;
		}
	}
	return { subscribe: t, check: r };
}
function _e(e, t, n) {
	return e.origin !== pe || !e.pathname.startsWith(t)
		? !0
		: n
			? !(
					e.pathname === t + '/' ||
					e.pathname === t + '/index.html' ||
					(e.protocol === 'file:' && e.pathname.replace(/\/[^/]+\.html?$/, '') === t)
				)
			: !1;
}
function Pn(e) {}
function zt(e) {
	const t = Xt(e),
		n = new ArrayBuffer(t.length),
		r = new DataView(n);
	for (let a = 0; a < n.byteLength; a++) r.setUint8(a, t.charCodeAt(a));
	return n;
}
const Jt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function Xt(e) {
	e.length % 4 === 0 && (e = e.replace(/==?$/, ''));
	let t = '',
		n = 0,
		r = 0;
	for (let a = 0; a < e.length; a++)
		((n <<= 6),
			(n |= Jt.indexOf(e[a])),
			(r += 6),
			r === 24 &&
				((t += String.fromCharCode((n & 16711680) >> 16)),
				(t += String.fromCharCode((n & 65280) >> 8)),
				(t += String.fromCharCode(n & 255)),
				(n = r = 0)));
	return (
		r === 12
			? ((n >>= 4), (t += String.fromCharCode(n)))
			: r === 18 &&
				((n >>= 2),
				(t += String.fromCharCode((n & 65280) >> 8)),
				(t += String.fromCharCode(n & 255))),
		t
	);
}
const Zt = -1,
	Qt = -2,
	en = -3,
	tn = -4,
	nn = -5,
	rn = -6;
function xn(e, t) {
	return dt(JSON.parse(e), t);
}
function dt(e, t) {
	if (typeof e == 'number') return a(e, !0);
	if (!Array.isArray(e) || e.length === 0) throw new Error('Invalid input');
	const n = e,
		r = Array(n.length);
	function a(s, i = !1) {
		if (s === Zt) return;
		if (s === en) return NaN;
		if (s === tn) return 1 / 0;
		if (s === nn) return -1 / 0;
		if (s === rn) return -0;
		if (i || typeof s != 'number') throw new Error('Invalid input');
		if (s in r) return r[s];
		const o = n[s];
		if (!o || typeof o != 'object') r[s] = o;
		else if (Array.isArray(o))
			if (typeof o[0] == 'string') {
				const c = o[0],
					l = t?.[c];
				if (l) return (r[s] = l(a(o[1])));
				switch (c) {
					case 'Date':
						r[s] = new Date(o[1]);
						break;
					case 'Set':
						const d = new Set();
						r[s] = d;
						for (let f = 1; f < o.length; f += 1) d.add(a(o[f]));
						break;
					case 'Map':
						const p = new Map();
						r[s] = p;
						for (let f = 1; f < o.length; f += 2) p.set(a(o[f]), a(o[f + 1]));
						break;
					case 'RegExp':
						r[s] = new RegExp(o[1], o[2]);
						break;
					case 'Object':
						r[s] = Object(o[1]);
						break;
					case 'BigInt':
						r[s] = BigInt(o[1]);
						break;
					case 'null':
						const u = Object.create(null);
						r[s] = u;
						for (let f = 1; f < o.length; f += 2) u[o[f]] = a(o[f + 1]);
						break;
					case 'Int8Array':
					case 'Uint8Array':
					case 'Uint8ClampedArray':
					case 'Int16Array':
					case 'Uint16Array':
					case 'Int32Array':
					case 'Uint32Array':
					case 'Float32Array':
					case 'Float64Array':
					case 'BigInt64Array':
					case 'BigUint64Array': {
						const f = globalThis[c],
							h = new f(a(o[1]));
						r[s] = o[2] !== void 0 ? h.subarray(o[2], o[3]) : h;
						break;
					}
					case 'ArrayBuffer': {
						const f = o[1],
							h = zt(f);
						r[s] = h;
						break;
					}
					case 'Temporal.Duration':
					case 'Temporal.Instant':
					case 'Temporal.PlainDate':
					case 'Temporal.PlainTime':
					case 'Temporal.PlainDateTime':
					case 'Temporal.PlainMonthDay':
					case 'Temporal.PlainYearMonth':
					case 'Temporal.ZonedDateTime': {
						const f = c.slice(9);
						r[s] = Temporal[f].from(o[1]);
						break;
					}
					case 'URL': {
						const f = new URL(o[1]);
						r[s] = f;
						break;
					}
					case 'URLSearchParams': {
						const f = new URLSearchParams(o[1]);
						r[s] = f;
						break;
					}
					default:
						throw new Error(`Unknown type ${c}`);
				}
			} else {
				const c = new Array(o.length);
				r[s] = c;
				for (let l = 0; l < o.length; l += 1) {
					const d = o[l];
					d !== Qt && (c[l] = a(d));
				}
			}
		else {
			const c = {};
			r[s] = c;
			for (const l in o) {
				if (l === '__proto__')
					throw new Error('Cannot parse an object with a `__proto__` property');
				const d = o[l];
				c[l] = a(d);
			}
		}
		return r[s];
	}
	return a(0);
}
const ht = new Set(['load', 'prerender', 'csr', 'ssr', 'trailingSlash', 'config']);
[...ht];
const an = new Set([...ht]);
[...an];
function on(e) {
	return e.filter((t) => t != null);
}
const sn = 'x-sveltekit-invalidated',
	cn = 'x-sveltekit-trailing-slash';
function se(e) {
	return e instanceof he || e instanceof Oe ? e.status : 500;
}
function ln(e) {
	return e instanceof Oe ? e.text : 'Internal Error';
}
let S, X, Ae;
const fn = We.toString().includes('$$') || /function \w+\(\) \{\}/.test(We.toString());
fn
	? ((S = {
			data: {},
			form: null,
			error: null,
			params: {},
			route: { id: null },
			state: {},
			status: -1,
			url: new URL('https://example.com')
		}),
		(X = { current: null }),
		(Ae = { current: !1 }))
	: ((S = new (class {
			#e = U({});
			get data() {
				return L(this.#e);
			}
			set data(t) {
				P(this.#e, t);
			}
			#t = U(null);
			get form() {
				return L(this.#t);
			}
			set form(t) {
				P(this.#t, t);
			}
			#n = U(null);
			get error() {
				return L(this.#n);
			}
			set error(t) {
				P(this.#n, t);
			}
			#r = U({});
			get params() {
				return L(this.#r);
			}
			set params(t) {
				P(this.#r, t);
			}
			#a = U({ id: null });
			get route() {
				return L(this.#a);
			}
			set route(t) {
				P(this.#a, t);
			}
			#o = U({});
			get state() {
				return L(this.#o);
			}
			set state(t) {
				P(this.#o, t);
			}
			#s = U(-1);
			get status() {
				return L(this.#s);
			}
			set status(t) {
				P(this.#s, t);
			}
			#i = U(new URL('https://example.com'));
			get url() {
				return L(this.#i);
			}
			set url(t) {
				P(this.#i, t);
			}
		})()),
		(X = new (class {
			#e = U(null);
			get current() {
				return L(this.#e);
			}
			set current(t) {
				P(this.#e, t);
			}
		})()),
		(Ae = new (class {
			#e = U(!1);
			get current() {
				return L(this.#e);
			}
			set current(t) {
				P(this.#e, t);
			}
		})()),
		(ut.v = () => (Ae.current = !0)));
function je(e) {
	Object.assign(S, e);
}
const un = '/__data.json',
	dn = '.html__data.json';
function hn(e) {
	return e.endsWith('.html') ? e.replace(/\.html$/, dn) : e.replace(/\/$/, '') + un;
}
const Qe = {
		spanContext() {
			return pn;
		},
		setAttribute() {
			return this;
		},
		setAttributes() {
			return this;
		},
		addEvent() {
			return this;
		},
		setStatus() {
			return this;
		},
		updateName() {
			return this;
		},
		end() {
			return this;
		},
		isRecording() {
			return !1;
		},
		recordException() {
			return this;
		},
		addLink() {
			return this;
		},
		addLinks() {
			return this;
		}
	},
	pn = { traceId: '', spanId: '', traceFlags: 0 },
	{ tick: De } = Tt,
	gn = new Set(['icon', 'shortcut icon', 'apple-touch-icon']),
	D = at(st) ?? {},
	Z = at(ot) ?? {},
	$ = { url: Ze({}), page: Ze({}), navigating: Ce(null), updated: Wt() };
function qe(e) {
	D[e] = ge();
}
function _n(e, t) {
	let n = e + 1;
	for (; D[n]; ) (delete D[n], (n += 1));
	for (n = t + 1; Z[n]; ) (delete Z[n], (n += 1));
}
function G(e, t = !1) {
	return (t ? location.replace(e.href) : (location.href = e.href), new Promise(() => {}));
}
async function pt() {
	if ('serviceWorker' in navigator) {
		const e = await navigator.serviceWorker.getRegistration(I || '/');
		e && (await e.update());
	}
}
function Ie() {}
let Be, Ue, ie, C, Le, v;
const ce = [],
	le = [];
let x = null;
const ae = new Map(),
	gt = new Set(),
	mn = new Set(),
	W = new Set();
let _ = { branch: [], error: null, url: null },
	Fe = !1,
	fe = !1,
	et = !0,
	Q = !1,
	K = !1,
	_t = !1,
	te = !1,
	H,
	E,
	T,
	N;
const z = new Set();
let Ee;
const ue = new Map();
async function $n(e, t, n) {
	(globalThis.__sveltekit_59fxsq?.data && globalThis.__sveltekit_59fxsq.data,
		document.URL !== location.href && (location.href = location.href),
		(v = e),
		await e.hooks.init?.(),
		(Be = Gt(e)),
		(C = document.documentElement),
		(Le = t),
		(Ue = e.nodes[0]),
		(ie = e.nodes[1]),
		Ue(),
		ie(),
		(E = history.state?.[F]),
		(T = history.state?.[J]),
		E || ((E = T = Date.now()), history.replaceState({ ...history.state, [F]: E, [J]: T }, '')));
	const r = D[E];
	function a() {
		r && ((history.scrollRestoration = 'manual'), scrollTo(r.x, r.y));
	}
	(n
		? (a(), await Tn(Le, n))
		: (await M({
				type: 'enter',
				url: ct(v.hash ? In(new URL(location.href)) : location.href),
				replace_state: !0
			}),
			a()),
		Rn());
}
async function yn(e = !0, t = !0) {
	if ((await (Ee ||= Promise.resolve()), !Ee)) return;
	Ee = null;
	const n = (N = {}),
		r = await ne(_.url, !0);
	if (
		((x = null),
		te &&
			ue.forEach(({ resource: a }) => {
				a.refresh?.();
			}),
		e)
	) {
		const a = S.state,
			s = r && (await He(r));
		if (!s || n !== N) return;
		if (s.type === 'redirect')
			return Me(new URL(s.location, _.url).href, { replaceState: !0 }, 1, n);
		(t || (s.props.page.state = a), je(s.props.page), (_ = s.state), Pe(), H.$set(s.props));
	} else Pe();
	await Promise.all([...ue.values()].map(({ resource: a }) => a)).catch(Ie);
}
function Pe() {
	((ce.length = 0), (te = !1));
}
function mt(e) {
	le.some((t) => t?.snapshot) && (Z[e] = le.map((t) => t?.snapshot?.capture()));
}
function yt(e) {
	Z[e]?.forEach((t, n) => {
		le[n]?.snapshot?.restore(t);
	});
}
function tt() {
	(qe(E), Je(st, D), mt(T), Je(ot, Z));
}
async function Me(e, t, n, r) {
	let a;
	(t.invalidateAll && (x = null),
		await M({
			type: 'goto',
			url: ct(e),
			keepfocus: t.keepFocus,
			noscroll: t.noScroll,
			replace_state: t.replaceState,
			state: t.state,
			redirect_count: n,
			nav_token: r,
			accept: () => {
				(t.invalidateAll && ((te = !0), (a = [...ue.keys()])),
					t.invalidate && t.invalidate.forEach(An));
			}
		}),
		t.invalidateAll &&
			ze()
				.then(ze)
				.then(() => {
					ue.forEach(({ resource: s }, i) => {
						a?.includes(i) && s.refresh?.();
					});
				}));
}
async function wn(e) {
	if (e.id !== x?.id) {
		const t = {};
		(z.add(t),
			(x = {
				id: e.id,
				token: t,
				promise: He({ ...e, preload: t }).then(
					(n) => (z.delete(t), n.type === 'loaded' && n.state.error && (x = null), n)
				)
			}));
	}
	return x.promise;
}
async function Re(e) {
	const t = (await ne(e, !1))?.route;
	t && (await Promise.all([...t.layouts, t.leaf].map((n) => n?.[1]())));
}
function wt(e, t, n) {
	_ = e.state;
	const r = document.querySelector('style[data-sveltekit]');
	if (
		(r && r.remove(),
		Object.assign(S, e.props.page),
		(H = new v.root({
			target: t,
			props: { ...e.props, stores: $, components: le },
			hydrate: n,
			sync: !1
		})),
		yt(T),
		n)
	) {
		const a = {
			from: null,
			to: { params: _.params, route: { id: _.route?.id ?? null }, url: new URL(location.href) },
			willUnload: !1,
			type: 'enter',
			complete: Promise.resolve()
		};
		W.forEach((s) => s(a));
	}
	fe = !0;
}
function ee({ url: e, params: t, branch: n, status: r, error: a, route: s, form: i }) {
	let o = 'never';
	if (I && (e.pathname === I || e.pathname === I + '/')) o = 'always';
	else for (const f of n) f?.slash !== void 0 && (o = f.slash);
	((e.pathname = Ut(e.pathname, o)), (e.search = e.search));
	const c = {
		type: 'loaded',
		state: { url: e, params: t, branch: n, error: a, route: s },
		props: { constructors: on(n).map((f) => f.node.component), page: ye(S) }
	};
	i !== void 0 && (c.props.form = i);
	let l = {},
		d = !S,
		p = 0;
	for (let f = 0; f < Math.max(n.length, _.branch.length); f += 1) {
		const h = n[f],
			w = _.branch[f];
		(h?.data !== w?.data && (d = !0),
			h && ((l = { ...l, ...h.data }), d && (c.props[`data_${p}`] = l), (p += 1)));
	}
	return (
		(!_.url || e.href !== _.url.href || _.error !== a || (i !== void 0 && i !== S.form) || d) &&
			(c.props.page = {
				error: a,
				params: t,
				route: { id: s?.id ?? null },
				state: {},
				status: r,
				url: new URL(e),
				form: i ?? null,
				data: d ? l : S.data
			}),
		c
	);
}
async function Ve({ loader: e, parent: t, url: n, params: r, route: a, server_data_node: s }) {
	let i = null,
		o = !0;
	const c = {
			dependencies: new Set(),
			params: new Set(),
			parent: !1,
			route: !1,
			url: !1,
			search_params: new Set()
		},
		l = await e();
	if (l.universal?.load) {
		let d = function (...u) {
			for (const f of u) {
				const { href: h } = new URL(f, n);
				c.dependencies.add(h);
			}
		};
		const p = {
			tracing: { enabled: !1, root: Qe, current: Qe },
			route: new Proxy(a, { get: (u, f) => (o && (c.route = !0), u[f]) }),
			params: new Proxy(r, { get: (u, f) => (o && c.params.add(f), u[f]) }),
			data: s?.data ?? null,
			url: xt(
				n,
				() => {
					o && (c.url = !0);
				},
				(u) => {
					o && c.search_params.add(u);
				},
				v.hash
			),
			async fetch(u, f) {
				u instanceof Request &&
					(f = {
						body: u.method === 'GET' || u.method === 'HEAD' ? void 0 : await u.blob(),
						cache: u.cache,
						credentials: u.credentials,
						headers: [...u.headers].length > 0 ? u?.headers : void 0,
						integrity: u.integrity,
						keepalive: u.keepalive,
						method: u.method,
						mode: u.mode,
						redirect: u.redirect,
						referrer: u.referrer,
						referrerPolicy: u.referrerPolicy,
						signal: u.signal,
						...f
					});
				const { resolved: h, promise: w } = vt(u, f, n);
				return (o && d(h.href), w);
			},
			setHeaders: () => {},
			depends: d,
			parent() {
				return (o && (c.parent = !0), t());
			},
			untrack(u) {
				o = !1;
				try {
					return u();
				} finally {
					o = !0;
				}
			}
		};
		i = (await l.universal.load.call(null, p)) ?? null;
	}
	return {
		node: l,
		loader: e,
		server: s,
		universal: l.universal?.load ? { type: 'data', data: i, uses: c } : null,
		data: i ?? s?.data ?? null,
		slash: l.universal?.trailingSlash ?? s?.slash
	};
}
function vt(e, t, n) {
	let r = e instanceof Request ? e.url : e;
	const a = new URL(r, n);
	a.origin === n.origin && (r = a.href.slice(n.origin.length));
	const s = fe ? Dt(r, a.href, t) : jt(r, t);
	return { resolved: a, promise: s };
}
function nt(e, t, n, r, a, s) {
	if (te) return !0;
	if (!a) return !1;
	if ((a.parent && e) || (a.route && t) || (a.url && n)) return !0;
	for (const i of a.search_params) if (r.has(i)) return !0;
	for (const i of a.params) if (s[i] !== _.params[i]) return !0;
	for (const i of a.dependencies) if (ce.some((o) => o(new URL(i)))) return !0;
	return !1;
}
function Ge(e, t) {
	return e?.type === 'data' ? e : e?.type === 'skip' ? (t ?? null) : null;
}
function vn(e, t) {
	if (!e) return new Set(t.searchParams.keys());
	const n = new Set([...e.searchParams.keys(), ...t.searchParams.keys()]);
	for (const r of n) {
		const a = e.searchParams.getAll(r),
			s = t.searchParams.getAll(r);
		a.every((i) => s.includes(i)) && s.every((i) => a.includes(i)) && n.delete(r);
	}
	return n;
}
function rt({ error: e, url: t, route: n, params: r }) {
	return {
		type: 'loaded',
		state: { error: e, url: t, route: n, params: r, branch: [] },
		props: { page: ye(S), constructors: [] }
	};
}
async function He({ id: e, invalidating: t, url: n, params: r, route: a, preload: s }) {
	if (x?.id === e) return (z.delete(x.token), x.promise);
	const { errors: i, layouts: o, leaf: c } = a,
		l = [...o, c];
	(i.forEach((y) => y?.().catch(() => {})), l.forEach((y) => y?.[1]().catch(() => {})));
	let d = null;
	const p = _.url ? e !== de(_.url) : !1,
		u = _.route ? a.id !== _.route.id : !1,
		f = vn(_.url, n);
	let h = !1;
	const w = l.map((y, g) => {
		const b = _.branch[g],
			k = !!y?.[0] && (b?.loader !== y[1] || nt(h, u, p, f, b.server?.uses, r));
		return (k && (h = !0), k);
	});
	if (w.some(Boolean)) {
		try {
			d = await At(n, w);
		} catch (y) {
			const g = await V(y, { url: n, params: r, route: { id: e } });
			return z.has(s)
				? rt({ error: g, url: n, params: r, route: a })
				: me({ status: se(y), error: g, url: n, route: a });
		}
		if (d.type === 'redirect') return d;
	}
	const A = d?.nodes;
	let m = !1;
	const O = l.map(async (y, g) => {
		if (!y) return;
		const b = _.branch[g],
			k = A?.[g];
		if ((!k || k.type === 'skip') && y[1] === b?.loader && !nt(m, u, p, f, b.universal?.uses, r))
			return b;
		if (((m = !0), k?.type === 'error')) throw k;
		return Ve({
			loader: y[1],
			url: n,
			params: r,
			route: a,
			parent: async () => {
				const we = {};
				for (let ve = 0; ve < g; ve += 1) Object.assign(we, (await O[ve])?.data);
				return we;
			},
			server_data_node: Ge(
				k === void 0 && y[0] ? { type: 'skip' } : (k ?? null),
				y[0] ? b?.server : void 0
			)
		});
	});
	for (const y of O) y.catch(() => {});
	const R = [];
	for (let y = 0; y < l.length; y += 1)
		if (l[y])
			try {
				R.push(await O[y]);
			} catch (g) {
				if (g instanceof Ne) return { type: 'redirect', location: g.location };
				if (z.has(s))
					return rt({
						error: await V(g, { params: r, url: n, route: { id: a.id } }),
						url: n,
						params: r,
						route: a
					});
				let b = se(g),
					k;
				if (A?.includes(g)) ((b = g.status ?? b), (k = g.error));
				else if (g instanceof he) k = g.body;
				else {
					if (await $.updated.check()) return (await pt(), await G(n));
					k = await V(g, { params: r, url: n, route: { id: a.id } });
				}
				const re = await bt(y, R, i);
				return re
					? ee({
							url: n,
							params: r,
							branch: R.slice(0, re.idx).concat(re.node),
							status: b,
							error: k,
							route: a
						})
					: await St(n, { id: a.id }, k, b);
			}
		else R.push(void 0);
	return ee({
		url: n,
		params: r,
		branch: R,
		status: 200,
		error: null,
		route: a,
		form: t ? void 0 : null
	});
}
async function bt(e, t, n) {
	for (; e--; )
		if (n[e]) {
			let r = e;
			for (; !t[r]; ) r -= 1;
			try {
				return {
					idx: r + 1,
					node: { node: await n[e](), loader: n[e], data: {}, server: null, universal: null }
				};
			} catch {
				continue;
			}
		}
}
async function me({ status: e, error: t, url: n, route: r }) {
	const a = {};
	let s = null;
	if (v.server_loads[0] === 0)
		try {
			const o = await At(n, [!0]);
			if (o.type !== 'data' || (o.nodes[0] && o.nodes[0].type !== 'data')) throw 0;
			s = o.nodes[0] ?? null;
		} catch {
			(n.origin !== pe || n.pathname !== location.pathname || Fe) && (await G(n));
		}
	try {
		const o = await Ve({
				loader: Ue,
				url: n,
				params: a,
				route: r,
				parent: () => Promise.resolve({}),
				server_data_node: Ge(s)
			}),
			c = { node: await ie(), loader: ie, universal: null, server: null, data: null };
		return ee({ url: n, params: a, branch: [o, c], status: e, error: t, route: null });
	} catch (o) {
		if (o instanceof Ne) return Me(new URL(o.location, location.href), {}, 0);
		throw o;
	}
}
async function bn(e) {
	const t = e.href;
	if (ae.has(t)) return ae.get(t);
	let n;
	try {
		const r = (async () => {
			let a =
				(await v.hooks.reroute({ url: new URL(e), fetch: async (s, i) => vt(s, i, e).promise })) ??
				e;
			if (typeof a == 'string') {
				const s = new URL(e);
				(v.hash ? (s.hash = a) : (s.pathname = a), (a = s));
			}
			return a;
		})();
		(ae.set(t, r), (n = await r));
	} catch {
		ae.delete(t);
		return;
	}
	return n;
}
async function ne(e, t) {
	if (e && !_e(e, I, v.hash)) {
		const n = await bn(e);
		if (!n) return;
		const r = kn(n);
		for (const a of Be) {
			const s = a.exec(r);
			if (s) return { id: de(e), invalidating: t, route: a, params: Pt(s), url: e };
		}
	}
}
function kn(e) {
	return (
		Lt(v.hash ? e.hash.replace(/^#/, '').replace(/[?#].+/, '') : e.pathname.slice(I.length)) || '/'
	);
}
function de(e) {
	return (v.hash ? e.hash.replace(/^#/, '') : e.pathname) + e.search;
}
function kt({ url: e, type: t, intent: n, delta: r, event: a }) {
	let s = !1;
	const i = Ye(_, n, e, t);
	(r !== void 0 && (i.navigation.delta = r), a !== void 0 && (i.navigation.event = a));
	const o = {
		...i.navigation,
		cancel: () => {
			((s = !0), i.reject(new Error('navigation cancelled')));
		}
	};
	return (Q || gt.forEach((c) => c(o)), s ? null : i);
}
async function M({
	type: e,
	url: t,
	popped: n,
	keepfocus: r,
	noscroll: a,
	replace_state: s,
	state: i = {},
	redirect_count: o = 0,
	nav_token: c = {},
	accept: l = Ie,
	block: d = Ie,
	event: p
}) {
	const u = N;
	N = c;
	const f = await ne(t, !1),
		h =
			e === 'enter'
				? Ye(_, f, t, e)
				: kt({ url: t, type: e, delta: n?.delta, intent: f, event: p });
	if (!h) {
		(d(), N === c && (N = u));
		return;
	}
	const w = E,
		A = T;
	(l(),
		(Q = !0),
		fe && h.navigation.type !== 'enter' && $.navigating.set((X.current = h.navigation)));
	let m = f && (await He(f));
	if (!m) {
		if (_e(t, I, v.hash)) return await G(t, s);
		m = await St(
			t,
			{ id: null },
			await V(new Oe(404, 'Not Found', `Not found: ${t.pathname}`), {
				url: t,
				params: {},
				route: { id: null }
			}),
			404,
			s
		);
	}
	if (((t = f?.url || t), N !== c)) return (h.reject(new Error('navigation aborted')), !1);
	if (m.type === 'redirect') {
		if (o < 20) {
			(await M({
				type: e,
				url: new URL(m.location, t),
				popped: n,
				keepfocus: r,
				noscroll: a,
				replace_state: s,
				state: i,
				redirect_count: o + 1,
				nav_token: c
			}),
				h.fulfil(void 0));
			return;
		}
		m = await me({
			status: 500,
			error: await V(new Error('Redirect loop'), { url: t, params: {}, route: { id: null } }),
			url: t,
			route: { id: null }
		});
	} else m.props.page.status >= 400 && (await $.updated.check()) && (await pt(), await G(t, s));
	if (
		(Pe(),
		qe(w),
		mt(A),
		m.props.page.url.pathname !== t.pathname && (t.pathname = m.props.page.url.pathname),
		(i = n ? n.state : i),
		!n)
	) {
		const g = s ? 0 : 1,
			b = { [F]: (E += g), [J]: (T += g), [it]: i };
		((s ? history.replaceState : history.pushState).call(history, b, '', t), s || _n(E, T));
	}
	if (((x = null), (m.props.page.state = i), fe)) {
		const g = (await Promise.all(Array.from(mn, (b) => b(h.navigation)))).filter(
			(b) => typeof b == 'function'
		);
		if (g.length > 0) {
			let b = function () {
				g.forEach((k) => {
					W.delete(k);
				});
			};
			(g.push(b),
				g.forEach((k) => {
					W.add(k);
				}));
		}
		((_ = m.state),
			m.props.page && (m.props.page.url = t),
			H.$set(m.props),
			je(m.props.page),
			(_t = !0));
	} else wt(m, Le, !1);
	const { activeElement: O } = document;
	await De();
	const R = n ? n.scroll : a ? ge() : null;
	if (et) {
		const g = t.hash && document.getElementById(Rt(t));
		R ? scrollTo(R.x, R.y) : g ? g.scrollIntoView() : scrollTo(0, 0);
	}
	const y = document.activeElement !== O && document.activeElement !== document.body;
	(!r && !y && Ke(t),
		(et = !0),
		m.props.page && Object.assign(S, m.props.page),
		(Q = !1),
		e === 'popstate' && yt(T),
		h.fulfil(void 0),
		W.forEach((g) => g(h.navigation)),
		$.navigating.set((X.current = null)));
}
async function St(e, t, n, r, a) {
	return e.origin === pe && e.pathname === location.pathname && !Fe
		? await me({ status: r, error: n, url: e, route: t })
		: await G(e, a);
}
function Sn() {
	let e, t, n;
	C.addEventListener('mousemove', (o) => {
		const c = o.target;
		(clearTimeout(e),
			(e = setTimeout(() => {
				s(c, j.hover);
			}, 20)));
	});
	function r(o) {
		o.defaultPrevented || s(o.composedPath()[0], j.tap);
	}
	(C.addEventListener('mousedown', r), C.addEventListener('touchstart', r, { passive: !0 }));
	const a = new IntersectionObserver(
		(o) => {
			for (const c of o) c.isIntersecting && (Re(new URL(c.target.href)), a.unobserve(c.target));
		},
		{ threshold: 0 }
	);
	async function s(o, c) {
		const l = ft(o, C),
			d = l === t && c >= n;
		if (!l || d) return;
		const { url: p, external: u, download: f } = Te(l, I, v.hash);
		if (u || f) return;
		const h = oe(l),
			w = p && de(_.url) === de(p);
		if (!(h.reload || w))
			if (c <= h.preload_data) {
				((t = l), (n = j.tap));
				const A = await ne(p, !1);
				if (!A) return;
				wn(A);
			} else c <= h.preload_code && ((t = l), (n = c), Re(p));
	}
	function i() {
		a.disconnect();
		for (const o of C.querySelectorAll('a')) {
			const { url: c, external: l, download: d } = Te(o, I, v.hash);
			if (l || d) continue;
			const p = oe(o);
			p.reload ||
				(p.preload_code === j.viewport && a.observe(o), p.preload_code === j.eager && Re(c));
		}
	}
	(W.add(i), i());
}
function V(e, t) {
	if (e instanceof he) return e.body;
	const n = se(e),
		r = ln(e);
	return v.hooks.handleError({ error: e, event: t, status: n, message: r }) ?? { message: r };
}
function An(e) {
	if (typeof e == 'function') ce.push(e);
	else {
		const { href: t } = new URL(e, location.href);
		ce.push((n) => n.href === t);
	}
}
function jn() {
	return ((te = !0), yn());
}
async function Dn(e) {
	e.type === 'error'
		? await En(e.error, e.status)
		: e.type === 'redirect'
			? await Me(e.location, { invalidateAll: !0 }, 0)
			: ((S.form = e.data),
				(S.status = e.status),
				H.$set({ form: null, page: ye(S) }),
				await De(),
				H.$set({ form: e.data }),
				e.type === 'success' && Ke(S.url));
}
async function En(e, t = 500) {
	const n = new URL(location.href),
		{ branch: r, route: a } = _;
	if (!a) return;
	const s = await bt(_.branch.length, r, a.errors);
	if (s) {
		const i = ee({
			url: n,
			params: _.params,
			branch: r.slice(0, s.idx).concat(s.node),
			status: t,
			error: e,
			route: a
		});
		((_ = i.state), H.$set(i.props), je(i.props.page), De().then(() => Ke(_.url)));
	}
}
function Rn() {
	((history.scrollRestoration = 'manual'),
		addEventListener('beforeunload', (t) => {
			let n = !1;
			if ((tt(), !Q)) {
				const r = Ye(_, void 0, null, 'leave'),
					a = {
						...r.navigation,
						cancel: () => {
							((n = !0), r.reject(new Error('navigation cancelled')));
						}
					};
				gt.forEach((s) => s(a));
			}
			n ? (t.preventDefault(), (t.returnValue = '')) : (history.scrollRestoration = 'auto');
		}),
		addEventListener('visibilitychange', () => {
			document.visibilityState === 'hidden' && tt();
		}),
		navigator.connection?.saveData || Sn(),
		C.addEventListener('click', async (t) => {
			if (
				t.button ||
				t.which !== 1 ||
				t.metaKey ||
				t.ctrlKey ||
				t.shiftKey ||
				t.altKey ||
				t.defaultPrevented
			)
				return;
			const n = ft(t.composedPath()[0], C);
			if (!n) return;
			const { url: r, external: a, target: s, download: i } = Te(n, I, v.hash);
			if (!r) return;
			if (s === '_parent' || s === '_top') {
				if (window.parent !== window) return;
			} else if (s && s !== '_self') return;
			const o = oe(n);
			if (
				(!(n instanceof SVGAElement) &&
					r.protocol !== location.protocol &&
					!(r.protocol === 'https:' || r.protocol === 'http:')) ||
				i
			)
				return;
			const [l, d] = (v.hash ? r.hash.replace(/^#/, '') : r.href).split('#'),
				p = l === ke(location);
			if (a || (o.reload && (!p || !d))) {
				kt({ url: r, type: 'link', event: t }) ? (Q = !0) : t.preventDefault();
				return;
			}
			if (d !== void 0 && p) {
				const [, u] = _.url.href.split('#');
				if (u === d) {
					if (
						(t.preventDefault(),
						d === '' || (d === 'top' && n.ownerDocument.getElementById('top') === null))
					)
						window.scrollTo({ top: 0 });
					else {
						const f = n.ownerDocument.getElementById(decodeURIComponent(d));
						f && (f.scrollIntoView(), f.focus());
					}
					return;
				}
				if (((K = !0), qe(E), e(r), !o.replace_state)) return;
				K = !1;
			}
			(t.preventDefault(),
				await new Promise((u) => {
					(requestAnimationFrame(() => {
						setTimeout(u, 0);
					}),
						setTimeout(u, 100));
				}),
				await M({
					type: 'link',
					url: r,
					keepfocus: o.keepfocus,
					noscroll: o.noscroll,
					replace_state: o.replace_state ?? r.href === location.href,
					event: t
				}));
		}),
		C.addEventListener('submit', (t) => {
			if (t.defaultPrevented) return;
			const n = HTMLFormElement.prototype.cloneNode.call(t.target),
				r = t.submitter;
			if ((r?.formTarget || n.target) === '_blank' || (r?.formMethod || n.method) !== 'get') return;
			const i = new URL((r?.hasAttribute('formaction') && r?.formAction) || n.action);
			if (_e(i, I, !1)) return;
			const o = t.target,
				c = oe(o);
			if (c.reload) return;
			(t.preventDefault(), t.stopPropagation());
			const l = new FormData(o, r);
			((i.search = new URLSearchParams(l).toString()),
				M({
					type: 'form',
					url: i,
					keepfocus: c.keepfocus,
					noscroll: c.noscroll,
					replace_state: c.replace_state ?? i.href === location.href,
					event: t
				}));
		}),
		addEventListener('popstate', async (t) => {
			if (!xe) {
				if (t.state?.[F]) {
					const n = t.state[F];
					if (((N = {}), n === E)) return;
					const r = D[n],
						a = t.state[it] ?? {},
						s = new URL(t.state[Yt] ?? location.href),
						i = t.state[J],
						o = _.url ? ke(location) === ke(_.url) : !1;
					if (i === T && (_t || o)) {
						(a !== S.state && (S.state = a), e(s), (D[E] = ge()), r && scrollTo(r.x, r.y), (E = n));
						return;
					}
					const l = n - E;
					await M({
						type: 'popstate',
						url: s,
						popped: { state: a, scroll: r, delta: l },
						accept: () => {
							((E = n), (T = i));
						},
						block: () => {
							history.go(-l);
						},
						nav_token: N,
						event: t
					});
				} else if (!K) {
					const n = new URL(location.href);
					(e(n), v.hash && location.reload());
				}
			}
		}),
		addEventListener('hashchange', () => {
			K &&
				((K = !1), history.replaceState({ ...history.state, [F]: ++E, [J]: T }, '', location.href));
		}));
	for (const t of document.querySelectorAll('link')) gn.has(t.rel) && (t.href = t.href);
	addEventListener('pageshow', (t) => {
		t.persisted && $.navigating.set((X.current = null));
	});
	function e(t) {
		((_.url = S.url = t), $.page.set(ye(S)), $.page.notify());
	}
}
async function Tn(
	e,
	{ status: t = 200, error: n, node_ids: r, params: a, route: s, server_route: i, data: o, form: c }
) {
	Fe = !0;
	const l = new URL(location.href);
	let d;
	(({ params: a = {}, route: s = { id: null } } = (await ne(l, !1)) || {}),
		(d = Be.find(({ id: f }) => f === s.id)));
	let p,
		u = !0;
	try {
		const f = r.map(async (w, A) => {
				const m = o[A];
				return (
					m?.uses && (m.uses = Et(m.uses)),
					Ve({
						loader: v.nodes[w],
						url: l,
						params: a,
						route: s,
						parent: async () => {
							const O = {};
							for (let R = 0; R < A; R += 1) Object.assign(O, (await f[R]).data);
							return O;
						},
						server_data_node: Ge(m)
					})
				);
			}),
			h = await Promise.all(f);
		if (d) {
			const w = d.layouts;
			for (let A = 0; A < w.length; A++) w[A] || h.splice(A, 0, void 0);
		}
		p = ee({ url: l, params: a, branch: h, status: t, error: n, form: c, route: d ?? null });
	} catch (f) {
		if (f instanceof Ne) {
			await G(new URL(f.location, location.href));
			return;
		}
		((p = await me({
			status: se(f),
			error: await V(f, { url: l, params: a, route: s }),
			url: l,
			route: s
		})),
			(e.textContent = ''),
			(u = !1));
	}
	(p.props.page && (p.props.page.state = {}), wt(p, e, u));
}
async function At(e, t) {
	const n = new URL(e);
	((n.pathname = hn(e.pathname)),
		e.pathname.endsWith('/') && n.searchParams.append(cn, '1'),
		n.searchParams.append(sn, t.map((s) => (s ? '1' : '0')).join('')));
	const r = window.fetch,
		a = await r(n.href, {});
	if (!a.ok) {
		let s;
		throw (
			a.headers.get('content-type')?.includes('application/json')
				? (s = await a.json())
				: a.status === 404
					? (s = 'Not Found')
					: a.status === 500 && (s = 'Internal Error'),
			new he(a.status, s)
		);
	}
	return new Promise(async (s) => {
		const i = new Map(),
			o = a.body.getReader();
		function c(d) {
			return dt(d, {
				...v.decoders,
				Promise: (p) =>
					new Promise((u, f) => {
						i.set(p, { fulfil: u, reject: f });
					})
			});
		}
		let l = '';
		for (;;) {
			const { done: d, value: p } = await o.read();
			if (d && !l) break;
			for (
				l +=
					!p && l
						? `
`
						: Nt.decode(p, { stream: !0 });
				;

			) {
				const u = l.indexOf(`
`);
				if (u === -1) break;
				const f = JSON.parse(l.slice(0, u));
				if (((l = l.slice(u + 1)), f.type === 'redirect')) return s(f);
				if (f.type === 'data')
					(f.nodes?.forEach((h) => {
						h?.type === 'data' && ((h.uses = Et(h.uses)), (h.data = c(h.data)));
					}),
						s(f));
				else if (f.type === 'chunk') {
					const { id: h, data: w, error: A } = f,
						m = i.get(h);
					(i.delete(h), A ? m.reject(c(A)) : m.fulfil(c(w)));
				}
			}
		}
	});
}
function Et(e) {
	return {
		dependencies: new Set(e?.dependencies ?? []),
		params: new Set(e?.params ?? []),
		parent: !!e?.parent,
		route: !!e?.route,
		url: !!e?.url,
		search_params: new Set(e?.search_params ?? [])
	};
}
let xe = !1;
function Ke(e) {
	const t = document.querySelector('[autofocus]');
	if (t) t.focus();
	else {
		const n = Rt(e);
		if (n && document.getElementById(n)) {
			const { x: a, y: s } = ge();
			setTimeout(() => {
				const i = history.state;
				((xe = !0),
					location.replace(`#${n}`),
					v.hash && location.replace(e.hash),
					history.replaceState(i, '', e.hash),
					scrollTo(a, s),
					(xe = !1));
			});
		} else {
			const a = document.body,
				s = a.getAttribute('tabindex');
			((a.tabIndex = -1),
				a.focus({ preventScroll: !0, focusVisible: !1 }),
				s !== null ? a.setAttribute('tabindex', s) : a.removeAttribute('tabindex'));
		}
		const r = getSelection();
		if (r && r.type !== 'None') {
			const a = [];
			for (let s = 0; s < r.rangeCount; s += 1) a.push(r.getRangeAt(s));
			setTimeout(() => {
				if (r.rangeCount === a.length) {
					for (let s = 0; s < r.rangeCount; s += 1) {
						const i = a[s],
							o = r.getRangeAt(s);
						if (
							i.commonAncestorContainer !== o.commonAncestorContainer ||
							i.startContainer !== o.startContainer ||
							i.endContainer !== o.endContainer ||
							i.startOffset !== o.startOffset ||
							i.endOffset !== o.endOffset
						)
							return;
					}
					r.removeAllRanges();
				}
			});
		}
	}
}
function Ye(e, t, n, r) {
	let a, s;
	const i = new Promise((c, l) => {
		((a = c), (s = l));
	});
	return (
		i.catch(() => {}),
		{
			navigation: {
				from: { params: e.params, route: { id: e.route?.id ?? null }, url: e.url },
				to: n && { params: t?.params ?? null, route: { id: t?.route?.id ?? null }, url: n },
				willUnload: !t,
				type: r,
				complete: i
			},
			fulfil: a,
			reject: s
		}
	);
}
function ye(e) {
	return {
		data: e.data,
		error: e.error,
		form: e.form,
		params: e.params,
		route: e.route,
		state: e.state,
		status: e.status,
		url: e.url
	};
}
function In(e) {
	const t = new URL(e);
	return ((t.hash = decodeURIComponent(e.hash)), t);
}
function Rt(e) {
	let t;
	if (v.hash) {
		const [, , n] = e.hash.split('#', 3);
		t = n ?? '';
	} else t = e.hash.slice(1);
	return decodeURIComponent(t);
}
export { Dn as a, v as b, S as c, $n as d, jn as i, Pn as l, xn as p, $ as s };
