import '../chunks/DsnmJJEf.js';
import {
	p as u,
	f as m,
	s,
	b,
	t as l,
	a as d,
	c as p,
	d as c,
	r as f
} from '../chunks/Dor_A3w4.js';
import { s as g } from '../chunks/KQpmcra8.js';
import { a as h, e as w } from '../chunks/BWroVZKq.js';
var x = m(
	'<h1>Login/Register</h1> <form method="post" action="?/login"><label>Username <input name="username" class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"/></label> <label>Password <input type="password" name="password" class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"/></label> <button class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">Login</button> <button formaction="?/register" class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">Register</button></form> <p style="color: red"> </p>',
	1
);
function R(a, e) {
	u(e, !0);
	var o = x(),
		r = s(b(o), 2);
	h(r, (i) => w?.(i));
	var t = s(r, 2),
		n = c(t, !0);
	(f(t), l(() => g(n, e.form?.message ?? '')), d(a, o), p());
}
export { R as component };
