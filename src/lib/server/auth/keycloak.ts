import { SvelteKitAuth } from '@auth/sveltekit';
import Keycloak from '@auth/sveltekit/providers/keycloak';
import {
	AUTH_KEYCLOAK_ID,
	AUTH_KEYCLOAK_SECRET,
	AUTH_KEYCLOAK_ISSUER,
	AUTH_SECRET
} from '$env/static/private';
import type { JWT } from '@auth/core/jwt';

export const { handle, signIn, signOut } = SvelteKitAuth({
	secret: AUTH_SECRET,
	trustHost: true,
	providers: [
		Keycloak({
			clientId: AUTH_KEYCLOAK_ID,
			clientSecret: AUTH_KEYCLOAK_SECRET,
			issuer: AUTH_KEYCLOAK_ISSUER
		})
	],
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account && profile) {
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
				token.expiresAt = account.expires_at;
				// Extraer roles del client 'escaladaec' en el access_token de Keycloak
				const p = profile as Record<string, unknown>;
				const resourceAccess = p['resource_access'] as Record<
					string,
					{ roles?: string[] }
				> | undefined;
				token.roles = resourceAccess?.['escaladaec']?.roles ?? [];
			}

			// Renovar token si está por vencer (más de 60 segundos de diferencia)
			const expiresAt = token.expiresAt as number | undefined;
			if (expiresAt && Date.now() / 1000 < expiresAt - 60) {
				return token;
			}

			// Refresh automático
			try {
				const refreshed = await refreshAccessToken(token);
				return refreshed;
			} catch {
				return { ...token, error: 'RefreshAccessTokenError' };
			}
		},
		async session({ session, token }) {
			const t = token as JWT & { roles?: string[]; error?: string };
			(session.user as unknown as Record<string, unknown>).roles = t.roles ?? [];
			(session as unknown as Record<string, unknown>).error = t.error;
			return session;
		}
	}
});

async function refreshAccessToken(token: JWT) {
	const t = token as JWT & {
		refreshToken?: string;
		roles?: string[];
		expiresAt?: number;
	};
	const issuer = AUTH_KEYCLOAK_ISSUER;
	const url = `${issuer}/protocol/openid-connect/token`;

	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			client_id: AUTH_KEYCLOAK_ID,
			client_secret: AUTH_KEYCLOAK_SECRET,
			refresh_token: t.refreshToken ?? ''
		})
	});

	const refreshed = await response.json();

	if (!response.ok) throw refreshed;

	return {
		...token,
		accessToken: refreshed.access_token,
		refreshToken: refreshed.refresh_token ?? t.refreshToken,
		expiresAt: Math.floor(Date.now() / 1000) + refreshed.expires_in,
		roles: t.roles
	};
}
