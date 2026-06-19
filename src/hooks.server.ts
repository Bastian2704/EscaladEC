import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { handle as authHandle } from '$lib/server/auth/keycloak';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const populateLocals: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();

	if (session?.user) {
		const email = session.user.email ?? '';
		const roles = (session.user as Record<string, unknown>).roles as string[] | undefined;
		// Mapeo de roles Keycloak → roles internos
		// escalador (Keycloak) → admin | visitante (Keycloak) → user
		const role = roles?.includes('escalador') ? 'admin' : 'user';

		// Buscar el registro en la DB para obtener el UUID real del usuario
		const dbUser = await db.query.users
			.findFirst({ where: eq(users.email, email), columns: { id: true } })
			.catch(() => null);

		event.locals.user = {
			id: dbUser?.id ?? email,
			email,
			role
		};
	} else {
		event.locals.user = null;
	}

	event.locals.session = session ? { id: 'keycloak' } : null;

	return resolve(event);
};

export const handle = sequence(authHandle, populateLocals);
