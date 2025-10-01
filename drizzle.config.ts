import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

export default defineConfig({
	schema: './src/lib/server/db/schema.ts', // apunta al archivo con users, sessions, climbRoute
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL as string
	},
	verbose: true,
	strict: true
});
