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
	const { sectorId } = event.params;

	const [item] = await db.select().from(sector).where(eq(sector.id, sectorId));
	if (!item) throw error(404);

	assertOwnerOrAdmin(user, item);

	return { item, sectorId };
};

export const actions: Actions = {
	save: async (event) => {
		const user = requireUser(event);

		const { sectorId } = event.params;

		const [item] = await db.select().from(sector).where(eq(sector.id, sectorId));
		if (!item) throw error(404);

		assertOwnerOrAdmin(user, item);

		const data = await event.request.formData();
		const name = String(data.get('name') ?? '').trim();
		const orientation = String(data.get('orientation') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();
		const status = String(data.get('status') ?? '');

		if (!name || !orientation || !description) return fail(400, { message: 'Datos inválidos' });

		await db
			.update(sector)
			.set({ name, orientation, description, status })
			.where(eq(sector.id, sectorId));

		const referer = event.request.headers.get('referer');
		throw redirect(303, referer ?? `/area/${event.params.areaId}/sector`);
	},

	softDelete: async (event) => {
		const u = requireUser(event);
		const { sectorId } = event.params;

		const [item] = await db.select().from(sector).where(eq(sector.id, sectorId));
		if (!item) throw error(404);

		assertOwnerOrAdmin(u, item);

		await db.update(sector).set({ status: 'deleted' }).where(eq(sector.id, sectorId));
		throw redirect(303, event.url.pathname);
	}
};
