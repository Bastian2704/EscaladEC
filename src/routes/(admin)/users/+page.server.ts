import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { requireAdmin } from '$lib/server/auth/guards';
import { lucia } from '$lib/server/auth/lucia';
import { error, fail, redirect } from '@sveltejs/kit';
import { and, eq, isNull } from 'drizzle-orm';
import { hash } from 'argon2';

const PAGE_SIZE = 10;

const ROLE_VALUES = ['user', 'admin'] as const;
type Role = (typeof ROLE_VALUES)[number];

function isRole(value: string): value is Role {
	return (ROLE_VALUES as readonly string[]).includes(value);
}

export const load: PageServerLoad = async (event) => {
	const admin = requireAdmin(event);

	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const role = url.searchParams.get('role') ?? '';
	const status = url.searchParams.get('status') ?? 'active';
	const filters = [];
	if (role && isRole(role)) {
		filters.push(eq(users.role, role));
	}
	if (status !== 'deleted') filters.push(isNull(users.deletedAt));

	const where = filters.length ? and(...filters) : undefined;
	const offset = (page - 1) * PAGE_SIZE;

	const items = await db.select().from(users).where(where).limit(PAGE_SIZE).offset(offset);

	return { user: admin, items, page, role: role || 'all', status };
};

function ensureNotSelf(currentUserId: string | undefined, targetId: string) {
	if (currentUserId && currentUserId === targetId) {
		return fail(400, { message: 'No puedes modificarte a ti mismo' });
	}
	return null;
}

async function assertNotLastAdmin(targetUserId: string) {
	const target = await db.query.users.findFirst({ where: eq(users.id, targetUserId) });
	if (!target) throw error(404, 'Usuario no encontrado');
	if (target.role !== 'admin') return null;

	const admins = await db
		.select({ id: users.id })
		.from(users)
		.where(and(eq(users.role, 'admin'), isNull(users.deletedAt)));

	if (admins.length <= 1) {
		return fail(400, { message: 'No puedes quitar el último admin del sistema' });
	}
	return null;
}

export const actions: Actions = {
	createUser: async (event) => {
		requireAdmin(event);

		const data = await event.request.formData();
		const email = String(data.get('email') ?? '')
			.toLowerCase()
			.trim();
		const password = String(data.get('password') ?? '');
		const username = String(data.get('username') ?? '');
		const age = String(data.get('age') ?? '');
		const role = String(data.get('role') ?? 'user').toLowerCase();

		if (!email || password.length < 8) {
			return fail(400, { message: 'Email y contraseña son requeridos (mínimo 8 caracteres)' });
		}

		if (!isRole(role)) {
			return fail(400, { message: 'Rol inválido' });
		}

		const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
		if (existing) {
			return fail(400, { message: 'Ya existe un usuario con ese email' });
		}

		const passwordHash = await hash(password);
		await db.insert(users).values({
			email,
			username,
			age,
			passwordHash,
			role,
			status: 'active',
			createdAt: new Date(),
			updatedAt: new Date()
		});

		return { success: true, message: `Usuario ${email} creado correctamente como ${role}` };
	},
	setRole: async (event) => {
		const admin = requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		const newRole = String(data.get('role') ?? '').toLowerCase();

		if (!id || !isRole(newRole)) {
			return fail(400, { message: 'Datos inválidos' });
		}

		const selfErr = ensureNotSelf(admin.id, id);
		if (selfErr) return selfErr;

		if (newRole !== 'admin') {
			const lastErr = await assertNotLastAdmin(id);
			if (lastErr) return lastErr;
		}

		await db.update(users).set({ role: newRole, updatedAt: new Date() }).where(eq(users.id, id));
		throw redirect(303, '/users');
	},

	suspend: async (event) => {
		const admin = requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		const selfErr = ensureNotSelf(admin.id, id);
		if (selfErr) return selfErr;

		const lastErr = await assertNotLastAdmin(id);
		if (lastErr) return lastErr;

		await db
			.update(users)
			.set({ status: 'suspended', updatedAt: new Date() })
			.where(eq(users.id, id));
		await lucia.invalidateUserSessions(id);
		throw redirect(303, '/users');
	},

	resume: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await db
			.update(users)
			.set({ status: 'active', deletedAt: null, updatedAt: new Date() })
			.where(eq(users.id, id));
		throw redirect(303, '/users');
	},

	softDelete: async (event) => {
		const admin = requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		const selfErr = ensureNotSelf(admin.id, id);
		if (selfErr) return selfErr;

		const lastErr = await assertNotLastAdmin(id);
		if (lastErr) return lastErr;

		await db
			.update(users)
			.set({ status: 'deleted', deletedAt: new Date(), updatedAt: new Date() })
			.where(eq(users.id, id));

		await lucia.invalidateUserSessions(id);
		throw redirect(303, '/users?status=deleted');
	},

	restore: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await db
			.update(users)
			.set({ status: 'active', deletedAt: null, updatedAt: new Date() })
			.where(eq(users.id, id));
		throw redirect(303, '/users');
	}
};
