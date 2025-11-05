import { db } from '$lib/server/db';
import { sector } from '$lib/server/db/schema';
import { requireUser } from '$lib/server/auth/guards';
import { requireAdmin } from '$lib/server/auth/guards';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

const PAGE_SIZE = 10;

export const load: PageServerLoad = async (event) => {
	requireUser(event);

	const { areaId } = event.params;
	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const status = url.searchParams.get('status') ?? 'active';
	const offset = (page - 1) * PAGE_SIZE;

	const items = await db
		.select()
		.from(sector)
		.where(eq(sector.areaId, areaId))
		.limit(PAGE_SIZE)
		.offset(offset);

	return {
		items,
		page,
		status
	};
};

export const actions: Actions = {
	createSector: async (event) => {
		requireAdmin(event);
		const { areaId } = event.params;

		const data = await event.request.formData();
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

		return { success: true, message: `Sector: ${name}, creado correctamente.` };
	},

	suspend: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await db.update(sector).set({ status: 'suspended' }).where(eq(sector.id, id));

		throw redirect(303, event.url.pathname);
	},

	resume: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await db.update(sector).set({ status: 'active' }).where(eq(sector.id, id));

		throw redirect(303, event.url.pathname);
	},

	softDelete: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await db.update(sector).set({ status: 'deleted' }).where(eq(sector.id, id));

		throw redirect(303, event.url.pathname);
	},

	restore: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await db.update(sector).set({ status: 'active' }).where(eq(sector.id, id));

		throw redirect(303, event.url.pathname);
	}
};
