import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// Usuarios
export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	role: text('role').notNull().default('user'),
	status: text('status').notNull().default('active'), // 'active' | 'suspended' | 'deleted'
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at'),
	deletedAt: timestamp('deleted_at')
});

// Sesiones (formato que exige Lucia)
export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true }).notNull()
});

/** Rutas de escalada (CRUD base) */
export const climbRoute = pgTable('climb_route', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	grade: text('grade').notNull(),
	description: text('description'),
	createdBy: uuid('created_by')
		.notNull()
		.references(() => users.id),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
