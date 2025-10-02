import type { Actions } from './$types';
import { lucia } from '$lib/server/auth/lucia';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { hash } from 'argon2';
import { redirect, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '')
			.toLowerCase()
			.trim();
		const password = String(data.get('password') ?? '');
		if (!email || password.length < 8) return fail(400, { message: 'Datos inválidos' });

		const exists = await db.query.users.findFirst({ where: eq(users.email, email) });
		if (exists) return fail(400, { message: 'Email ya registrado' });

		const passwordHash = await hash(password);
		const [u] = await db.insert(users).values({ email, passwordHash }).returning();
		const session = await lucia.createSession(u.id, {});
		const cookie = lucia.createSessionCookie(session.id);
		cookies.set(cookie.name, cookie.value, { ...cookie.attributes, path: '/' });
		throw redirect(303, '/dashboard');
	}
};
