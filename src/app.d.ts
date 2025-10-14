// src/app.d.ts
/// <reference types="@sveltejs/kit" />
declare global {
	namespace App {
		interface Locals {
			user: { id: string; email: string; role: 'user' | 'admin' } | null;
			session: { id: string } | null; 
		}
	}
}

// Augmentation of Lucia: Extra attributes on getUserAttributes
declare module 'lucia' {
	interface Register {
		DatabaseUserAttributes: { email: string; role: 'user' | 'admin' };
	}
}

export {};
