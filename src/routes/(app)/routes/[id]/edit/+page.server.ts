import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { climbRoute } from '$lib/server/db/schema';
import { requireUser } from '$lib/server/auth/guards';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

function assertOwnerOrAdmin(user: { id: string; role: string }, item: { createdBy: string }) {
	if (user.role === 'admin') return;
	if (item.createdBy !== user.id) throw error(403, 'No autorizado');
}

export const load: PageServerLoad = async (event) => {
	const u = requireUser(event);
	const { id } = event.params;

	const [item] = await db.select().from(climbRoute).where(eq(climbRoute.id, id));
	if (!item) throw error(404);

	// 🔒 Bloquea ver el form si no eres owner ni admin
	assertOwnerOrAdmin(u, item);

	return { item };
};

export const actions: Actions = {
	save: async (event) => {
		const u = requireUser(event);
		const { id } = event.params;

		// 1) Leo el registro
		const [item] = await db.select().from(climbRoute).where(eq(climbRoute.id, id));
		if (!item) throw error(404);

		// 2) Verifico ownership/admin
		assertOwnerOrAdmin(u, item);

		// 3) Actualizo
		const d = await event.request.formData();
		const name = String(d.get('name') ?? '').trim();
		const grade = String(d.get('grade') ?? '').trim();
		const description = String(d.get('description') ?? '').trim();
		if (!name || !grade) return fail(400, { message: 'Datos inválidos' });

		await db.update(climbRoute).set({ name, grade, description }).where(eq(climbRoute.id, id));
		throw redirect(303, '/routes');
	},

	delete: async (event) => {
		const u = requireUser(event);
		const { id } = event.params;

		const [item] = await db.select().from(climbRoute).where(eq(climbRoute.id, id));
		if (!item) throw error(404);

		assertOwnerOrAdmin(u, item);

		await db.delete(climbRoute).where(eq(climbRoute.id, id));
		throw redirect(303, '/routes');
	}
};
