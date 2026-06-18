import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { signIn } from '$lib/server/auth/keycloak';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/area');
	}
	return {};
};

// signIn es directamente un action handler de @auth/sveltekit.
// El provider viene del campo oculto "provider" en el formulario.
export const actions: Actions = { default: signIn };
