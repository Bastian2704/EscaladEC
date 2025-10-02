import {
	s as sessionCookieName,
	v as validateSessionToken,
	a as setSessionTokenCookie,
	d as deleteSessionTokenCookie
} from './auth-DkysO6-p.js';
import 'postgres';
import './shared-server-Bik9M81L.js';

const handleAuth = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(sessionCookieName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}
	const { session, user } = await validateSessionToken(sessionToken);
	if (session) {
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}
	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};
const handle = handleAuth;

export { handle };
//# sourceMappingURL=hooks.server-1_4zHLfB.js.map
