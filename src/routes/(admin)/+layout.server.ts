import type { LayoutServerLoad } from './$types';
import { requireAdmin } from '$lib/server/auth/guards';
export const load: LayoutServerLoad = async (event) => {
	const user = requireAdmin(event);
	return { user };
};
