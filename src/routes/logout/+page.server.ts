import type { Actions } from './$types';
import { signOut } from '$lib/server/auth/keycloak';

export const actions: Actions = { default: signOut };
