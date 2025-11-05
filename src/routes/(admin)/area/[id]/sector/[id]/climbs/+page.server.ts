import { db } from '$lib/server/db';
import { climb } from '$lib/server/db/schema';
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

	const [item] = await db.select().from(climb).where(eq(climb.id, id));
	if (!item) throw error(404);

	assertOwnerOrAdmin(user, item);

	return { item };
};
export const actions: Actions = {
	save: async (event) => {
		const u = requireUser(event);
		const { id } = event.params as { id: string };

		const [item] = await db.select().from(climb).where(eq(climb.id, id));
		if (!item) throw error(404);

		assertOwnerOrAdmin(u, item);

		const data = await event.request.formData();
		const name = String(data.get('province') ?? '').trim();
		//select
		const category = String(data.get('category') ?? '').trim();
		//select
		const climbType = String(data.get('climbType') ?? '').trim();
		const requiredEquipment = String(data.get('requiredEquipment') ?? '').trim();
		const status = String(data.get('status') ?? '');

		if (!name || !category || !climbType || !requiredEquipment)
			return fail(400, { message: 'Datos inválidos' });

		await db
			.update(climb)
			.set({ name, category, climbType, requiredEquipment, status })
			.where(eq(climb.id, id));
		throw redirect(303, '/area/sector');
	},

	delete: async (event) => {
		const u = requireUser(event);
		const { id } = event.params as { id: string };

		const [item] = await db.select().from(sector).where(eq(climb.id, id));
		if (!item) throw error(404);
		const redirectDir = '/area/sector' + climb.sectorId; //+'/sector/'+sector.id

		assertOwnerOrAdmin(u, item);

		await db.delete(climb).where(eq(climb.id, id));
		throw redirect(303, redirectDir);
	}
};
