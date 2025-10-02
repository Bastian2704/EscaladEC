import { i as invalidateSession, d as deleteSessionTokenCookie } from './auth-DkysO6-p.js';
import { f as fail, r as redirect } from './shared-server-Bik9M81L.js';
import { d as getRequestEvent } from './utils-CrtNAE_M.js';
import 'postgres';

const load = async () => {
	const user = requireLogin();
	return { user };
};
const actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
		return redirect(302, '/demo/lucia/login');
	}
};
function requireLogin() {
	const { locals } = getRequestEvent();
	if (!locals.user) {
		return redirect(302, '/demo/lucia/login');
	}
	return locals.user;
}

var _page_server_ts = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 4;
let component_cache;
const component = async () =>
	(component_cache ??= (await import('./_page.svelte-BD1hMHOg.js')).default);
const server_id = 'src/routes/demo/lucia/+page.server.ts';
const imports = [
	'_app/immutable/nodes/4.DxCod_Pn.js',
	'_app/immutable/chunks/DsnmJJEf.js',
	'_app/immutable/chunks/Dor_A3w4.js',
	'_app/immutable/chunks/KQpmcra8.js',
	'_app/immutable/chunks/CPGMAfgJ.js',
	'_app/immutable/chunks/BWroVZKq.js',
	'_app/immutable/chunks/BpwBI0p8.js'
];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-CZ9h6rss.js.map
