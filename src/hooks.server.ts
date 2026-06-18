import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { handle as authHandle } from '$lib/server/auth/keycloak';

const populateLocals: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();

	if (session?.user) {
		const roles = (session.user as Record<string, unknown>).roles as string[] | undefined;
		// Mapeo de roles Keycloak → roles internos
		// escalador (Keycloak) → admin | visitante (Keycloak) → user
		event.locals.user = {
			id: session.user.email ?? '',
			email: session.user.email ?? '',
			role: roles?.includes('escalador') ? 'admin' : 'user'
		};
	} else {
		event.locals.user = null;
	}

	event.locals.session = session ? { id: 'keycloak' } : null;

	return resolve(event);
};

export const handle = sequence(authHandle, populateLocals);
