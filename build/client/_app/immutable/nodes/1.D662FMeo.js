import '../chunks/DsnmJJEf.js';
import '../chunks/CV76BIMQ.js';
import {
	G as b,
	I as k,
	J as i,
	u as x,
	K as l,
	L as $,
	M as v,
	O as y,
	P as E,
	p as G,
	f as I,
	b as J,
	t as K,
	a as L,
	c as M,
	d as u,
	r as m,
	s as O
} from '../chunks/Dor_A3w4.js';
import { s as g } from '../chunks/KQpmcra8.js';
import { s as P, c as _ } from '../chunks/BpwBI0p8.js';
function j(a = !1) {
	const e = b,
		t = e.l.u;
	if (!t) return;
	let r = () => y(e.s);
	if (a) {
		let o = 0,
			s = {};
		const f = E(() => {
			let p = !1;
			const c = e.s;
			for (const n in c) c[n] !== s[n] && ((s[n] = c[n]), (p = !0));
			return (p && o++, o);
		});
		r = () => v(f);
	}
	(t.b.length &&
		k(() => {
			(d(e, r), l(t.b));
		}),
		i(() => {
			const o = x(() => t.m.map($));
			return () => {
				for (const s of o) typeof s == 'function' && s();
			};
		}),
		t.a.length &&
			i(() => {
				(d(e, r), l(t.a));
			}));
}
function d(a, e) {
	if (a.l.s) for (const t of a.l.s) v(t);
	e();
}
const q = {
	get error() {
		return _.error;
	},
	get status() {
		return _.status;
	}
};
P.updated.check;
const h = q;
var w = I('<h1> </h1> <p> </p>', 1);
function F(a, e) {
	(G(e, !1), j());
	var t = w(),
		r = J(t),
		o = u(r, !0);
	m(r);
	var s = O(r, 2),
		f = u(s, !0);
	(m(s),
		K(() => {
			(g(o, h.status), g(f, h.error?.message));
		}),
		L(a, t),
		M());
}
export { F as component };
