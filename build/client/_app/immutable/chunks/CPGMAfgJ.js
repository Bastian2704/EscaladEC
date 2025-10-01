import {
	h as y,
	i as c,
	H as m,
	j as d,
	C as v,
	k as E,
	l as _,
	m as l,
	o as h,
	q as o,
	v as p,
	w as T,
	x as g,
	y as A,
	z as w,
	E as x,
	A as C,
	B as N,
	D as R
} from './Dor_A3w4.js';
let e;
function D() {
	e = void 0;
}
function F(s) {
	let n = null,
		i = d;
	var t;
	if (d) {
		for (
			n = o, e === void 0 && (e = p(document.head));
			e !== null && (e.nodeType !== v || e.data !== E);

		)
			e = _(e);
		e === null ? l(!1) : (e = h(_(e)));
	}
	d || (t = document.head.appendChild(y()));
	try {
		c(() => s(t), m);
	} finally {
		i && (l(!0), (e = o), h(n));
	}
}
function H(s, n, ...i) {
	var t = s,
		a = N,
		r;
	(c(() => {
		a !== (a = n()) && (r && (R(r), (r = null)), (r = C(() => a(t, ...i))));
	}, x),
		d && (t = o));
}
function O(s) {
	return (n, ...i) => {
		var t = s(...i),
			a;
		if (d) ((a = o), T());
		else {
			var r = t.render().trim(),
				u = g(r);
			((a = p(u)), n.before(a));
		}
		const f = t.setup?.(a);
		(A(a, a), typeof f == 'function' && w(f));
	};
}
export { O as c, F as h, D as r, H as s };
