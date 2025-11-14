import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
export const load: LayoutServerLoad = async ({ locals }) => {
	const user = locals.user;
	if (!locals.user) throw redirect(303, '/login');
	return { user: locals.user, role: user?.role ?? 'guest' };
};
