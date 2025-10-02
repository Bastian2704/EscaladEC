// src/app.d.ts
/// <reference types="@sveltejs/kit" />
declare global {
	namespace App {
		interface Locals {
			user: { id: string; email: string; role: 'user' | 'admin' } | null;
			session: { id: string } | null; // si en hooks guardas solo { id }; si guardas la sesión completa, cambia a: import('lucia').Session | null
		}
	}
}

// Augmentación de Lucia: atributos extra que expones en getUserAttributes
declare module 'lucia' {
	interface Register {
		DatabaseUserAttributes: { email: string; role: 'user' | 'admin' };
	}
}

export {};
