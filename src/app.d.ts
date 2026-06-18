/// <reference types="@sveltejs/kit" />
import type { DefaultSession } from '@auth/core/types';

declare global {
	namespace App {
		interface Locals {
			user: { id: string; email: string; role: 'user' | 'admin' } | null;
			session: { id: string } | null;
		}
	}
}

declare module '@auth/core/types' {
	interface Session {
		error?: string;
		user: DefaultSession['user'] & {
			roles?: string[];
		};
	}
}

declare module '@auth/core/jwt' {
	interface JWT {
		accessToken?: string;
		refreshToken?: string;
		expiresAt?: number;
		roles?: string[];
		error?: string;
	}
}

export {};
