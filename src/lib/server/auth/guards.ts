import { error, redirect, type RequestEvent } from '@sveltejs/kit';

export function requireUser(event: RequestEvent) {
	if (!event.locals.user) throw redirect(303, '/login');
	return event.locals.user;
}
export function requireAdmin(event: RequestEvent) {
	const u = requireUser(event);
	if (u.role !== 'admin') throw error(403, 'Forbidden');
	return u;
}
