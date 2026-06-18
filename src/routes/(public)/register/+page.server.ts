import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

// El registro de usuarios ahora se gestiona desde Keycloak.
export const load: PageServerLoad = async () => {
	throw redirect(303, '/login');
};
