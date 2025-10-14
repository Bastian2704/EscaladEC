
import type { RequestHandler } from './$types';
import { lucia } from '$lib/server/auth/lucia';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, cookies }) => {
	try {
		if (locals.session) {
			await lucia.invalidateSession(locals.session.id);
		}
	} finally {
		// web cookie cleaning
		const blank = lucia.createBlankSessionCookie();
		cookies.set(blank.name, blank.value, { ...blank.attributes, path: '/' });
	}
	throw redirect(303, '/login');
};
