import type { ISessionManager } from './sessionManager';

// Las sesiones ahora las gestiona Keycloak. Esta clase es un stub
// que mantiene la interfaz sin depender de Lucia.
export class KeycloakSessionManager implements ISessionManager {
	async invalidateUserSessions(_userId: string): Promise<void> {
		// Keycloak gestiona la expiración de tokens; no se puede invalidar
		// desde aquí sin la Admin API. Se deja como no-op para el demo.
	}
}
