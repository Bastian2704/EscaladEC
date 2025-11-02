import { db } from '$lib/server/db';
import { area, sector } from '$lib/server/db/schema';
import { requireUser } from '$lib/server/auth/guards';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from '../../$types';
const PAGE_SIZE = 10;

function assertOwnerOrAdmin(user: { id: string; role: string }, item: { createdBy: string }) {
	if (user.role === 'admin') return;
	if (item.createdBy !== user.id) throw error(403, 'No autorizado');
}

export const load: PageServerLoad = async (event) => {
	const user = requireUser(event);
	const { id } = event.params as { id: string };

	const [item] = await db.select().from(area).where(eq(area.id, id));
	if (!item) throw error(404);

	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const offset = (page - 1) * PAGE_SIZE;

	const sectors = await db.select().from(sector).limit(PAGE_SIZE).offset(offset);

	console.log(sector.id);
	if (!item) throw error(404);

	assertOwnerOrAdmin(user, item);

	return { item, sectors };
};

export const actions: Actions = {
	save: async (event) => {
		const u = requireUser(event);
		const { id } = event.params as { id: string };

		const [item] = await db.select().from(area).where(eq(area.id, id));
		if (!item) throw error(404);

		assertOwnerOrAdmin(u, item);

		const data = await event.request.formData();
		const name = String(data.get('name') ?? '').trim();
		const province = String(data.get('province') ?? '').trim();
		const city = String(data.get('city') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();
		const latitude = Number(data.get('latitude') ?? '');
		const longitude = Number(data.get('longitude') ?? '');
		const status = String(data.get('status') ?? '');

		if (!province || !city || !description) return fail(400, { message: 'Datos inválidos' });

		await db
			.update(area)
			.set({ name, province, city, description, latitude, longitude, status })
			.where(eq(area.id, id));
		throw redirect(303, '/area');
	},

	delete: async (event) => {
		const u = requireUser(event);
		const { id } = event.params as { id: string };

		const [item] = await db.select().from(area).where(eq(area.id, id));
		if (!item) throw error(404);

		assertOwnerOrAdmin(u, item);

		await db.delete(area).where(eq(area.id, id));
		throw redirect(303, '/area');
	},
	createSector: async (event) => {
		const { id } = event.params as { id: string };

		const data = await event.request.formData();
		const areaId = id;
		const name = String(data.get('name') ?? '').trim();
		const orientation = String(data.get('orientation') ?? '').trim();
		const description = String(data.get('description') ?? '');

		if (!name || !orientation || !description) {
			return fail(400, {
				message: 'Nombre del Sector, Orientación y Descripción son Obligatorias'
			});
		}

		await db.insert(sector).values({
			areaId,
			name,
			orientation,
			description,
			status: 'active',
			createdAt: new Date(),
			createdBy: 'user',
			updatedBy: 'user'
		} as any);

		return { success: true, message: `Area: ${name}, creado correctamente.` };
	}
};
