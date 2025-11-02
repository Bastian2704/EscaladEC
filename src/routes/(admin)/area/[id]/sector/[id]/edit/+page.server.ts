import { db } from '$lib/server/db';
import { sector } from '$lib/server/db/schema';
import { requireUser } from '$lib/server/auth/guards';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
function assertOwnerOrAdmin(user: { id: string; role: string }, item: { createdBy: string }) {
	if (user.role === 'admin') return;
	if (item.createdBy !== user.id) throw error(403, 'No autorizado');
}

export const load: PageServerLoad = async (event) => {
	const user = requireUser(event);
	const { id } = event.params as { id: string };

	const [item] = await db.select().from(sector).where(eq(sector.id, id));
	if (!item) throw error(404);

	assertOwnerOrAdmin(user, item);

	return { item };
};

export const actions: Actions = {
	save: async (event) => {
		const u = requireUser(event);
		const { id } = event.params as { id: string };

		const [item] = await db.select().from(sector).where(eq(sector.id, id));
		if (!item) throw error(404);

		assertOwnerOrAdmin(u, item);

		const data = await event.request.formData();
		const name = String(data.get('province') ?? '').trim();
		const orientation = String(data.get('city') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();
		const status = String(data.get('status') ?? '');

		if (!name || !orientation || !description) return fail(400, { message: 'Datos inválidos' });

		await db
			.update(sector)
			.set({ name, orientation, description, status })
			.where(eq(sector.id, id));
		throw redirect(303, '/area/');
	},

	delete: async (event) => {
		const u = requireUser(event);
		const { id } = event.params as { id: string };

		const [item] = await db.select().from(sector).where(eq(sector.id, id));
		if (!item) throw error(404);
		const redirectDir = '/area/' + sector.areaId; //+'/sector/'+sector.id

		assertOwnerOrAdmin(u, item);

		await db.delete(sector).where(eq(sector.id, id));
		throw redirect(303, redirectDir);
	}
};
