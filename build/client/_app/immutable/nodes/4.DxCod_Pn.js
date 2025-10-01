import '../chunks/DsnmJJEf.js';
import {
	p as h,
	f as d,
	b as v,
	t as l,
	a as _,
	c as g,
	d as e,
	r as s,
	s as m
} from '../chunks/Dor_A3w4.js';
import { s as i } from '../chunks/KQpmcra8.js';
import { a as b, e as x } from '../chunks/BWroVZKq.js';
var D = d(
	'<h1> </h1> <p> </p> <form method="post" action="?/logout"><button>Sign out</button></form>',
	1
);
function j(n, t) {
	h(t, !0);
	var o = D(),
		a = v(o),
		p = e(a);
	s(a);
	var r = m(a, 2),
		f = e(r);
	s(r);
	var u = m(r, 2);
	(b(u, (c) => x?.(c)),
		l(() => {
			(i(p, `Hi, ${t.data.user.username ?? ''}!`),
				i(f, `Your user ID is ${t.data.user.id ?? ''}.`));
		}),
		_(n, o),
		g());
}
export { j as component };
