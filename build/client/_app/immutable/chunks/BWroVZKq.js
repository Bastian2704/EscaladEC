import { g as h, u as w } from './Dor_A3w4.js';
import { i as A, a as E, p as L, b as x } from './BpwBI0p8.js';
function M(t, e, l) {
	h(() => {
		var c = w(() => e(t, l?.()) || {});
		if (c?.destroy) return () => c.destroy();
	});
}
function T(t) {
	const e = JSON.parse(t);
	return (e.data && (e.data = L(e.data, x.decoders)), e);
}
function u(t) {
	return HTMLElement.prototype.cloneNode.call(t);
}
function D(t, e = () => {}) {
	const l = async ({ action: a, result: s, reset: o = !0, invalidateAll: i = !0 }) => {
		(s.type === 'success' && (o && HTMLFormElement.prototype.reset.call(t), i && (await A())),
			(location.origin + location.pathname === a.origin + a.pathname ||
				s.type === 'redirect' ||
				s.type === 'error') &&
				(await E(s)));
	};
	async function c(a) {
		if ((a.submitter?.hasAttribute('formmethod') ? a.submitter.formMethod : u(t).method) !== 'post')
			return;
		a.preventDefault();
		const o = new URL(
				a.submitter?.hasAttribute('formaction') ? a.submitter.formAction : u(t).action
			),
			i = a.submitter?.hasAttribute('formenctype') ? a.submitter.formEnctype : u(t).enctype,
			p = new FormData(t, a.submitter),
			d = new AbortController();
		let m = !1;
		const y =
			(await e({
				action: o,
				cancel: () => (m = !0),
				controller: d,
				formData: p,
				formElement: t,
				submitter: a.submitter
			})) ?? l;
		if (m) return;
		let n;
		try {
			const r = new Headers({ accept: 'application/json', 'x-sveltekit-action': 'true' });
			i !== 'multipart/form-data' &&
				r.set(
					'Content-Type',
					/^(:?application\/x-www-form-urlencoded|text\/plain)$/.test(i)
						? i
						: 'application/x-www-form-urlencoded'
				);
			const b = i === 'multipart/form-data' ? p : new URLSearchParams(p),
				f = await fetch(o, {
					method: 'POST',
					headers: r,
					cache: 'no-store',
					body: b,
					signal: d.signal
				});
			((n = T(await f.text())), n.type === 'error' && (n.status = f.status));
		} catch (r) {
			if (r?.name === 'AbortError') return;
			n = { type: 'error', error: r };
		}
		await y({
			action: o,
			formData: p,
			formElement: t,
			update: (r) => l({ action: o, result: n, reset: r?.reset, invalidateAll: r?.invalidateAll }),
			result: n
		});
	}
	return (
		HTMLFormElement.prototype.addEventListener.call(t, 'submit', c),
		{
			destroy() {
				HTMLFormElement.prototype.removeEventListener.call(t, 'submit', c);
			}
		}
	);
}
export { M as a, D as e };
