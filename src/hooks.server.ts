import type { Handle } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth/lucia';
import type { Session } from 'lucia';

type SessionMaybeFresh = Session & { fresh?: boolean };

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session') ?? null;

	// limpia cookie si no hay sesión
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		const blank = lucia.createBlankSessionCookie();
		event.cookies.set(blank.name, blank.value, { ...blank.attributes, path: '/' });
		return resolve(event);
	}

	const { session, user } = await lucia
		.validateSession(sessionId)
		.catch(() => ({ session: null, user: null }));

	const s = session as SessionMaybeFresh | null;

	if (s?.fresh) {
		const cookie = lucia.createSessionCookie(s.id);
		event.cookies.set(cookie.name, cookie.value, { ...cookie.attributes, path: '/' });
	} else if (!session) {
		const blank = lucia.createBlankSessionCookie();
		event.cookies.set(blank.name, blank.value, { ...blank.attributes, path: '/' });
	}

	// ⚠️ Mapeo explícito al shape que definiste en App.Locals
	event.locals.user = user
		? {
				id: user.id,
				email: user.email,
				role: user.role
			}
		: null;

	event.locals.session = session ? { id: session.id } : null;

	return resolve(event);
};
