import { db } from '$lib/server/db';
import { sector, area } from '$lib/server/db/schema';
import { requireUser, requireAdmin } from '$lib/server/auth/guards';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { Status } from '$lib/contants/constants';

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
	const areaInfo = await db.select().from(area).where(eq(area.id, areaId));

	return {
		items,
		page,
		status,
		areaInfo
	};
};

export const actions: Actions = {
	createSector: async (event) => {
		requireAdmin(event);
		const { areaId } = event.params;
		const user = event.locals.user;
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
			updatedAt: new Date(),
			createdBy: user?.id,
			updatedBy: user?.id
		} as any);

		return { success: true, message: `Sector: ${name}, creado correctamente.` };
	},

	suspend: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		const user = event.locals.user;
		if (!id) return fail(400, { message: 'Sin id' });

		await db
			.update(sector)
			.set({ status: Status.suspended, updatedAt: new Date(), updatedBy: user?.id })
			.where(eq(sector.id, id));

		throw redirect(303, event.url.pathname);
	},

	resume: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		const user = event.locals.user;
		if (!id) return fail(400, { message: 'Sin id' });

		await db
			.update(sector)
			.set({ status: Status.active, updatedAt: new Date(), updatedBy: user?.id })
			.where(eq(sector.id, id));

		throw redirect(303, event.url.pathname);
	},

	softDelete: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		const user = event.locals.user;
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await db
			.update(sector)
			.set({
				status: Status.deleted,
				updatedAt: new Date(),
				deletedAt: new Date(),
				updatedBy: user?.id
			})
			.where(eq(sector.id, id));

		throw redirect(303, event.url.pathname);
	},

	restore: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		const user = event.locals.user;
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await db
			.update(sector)
			.set({ status: Status.active, updatedAt: new Date(), updatedBy: user?.id })
			.where(eq(sector.id, id));

		throw redirect(303, event.url.pathname);
	}
};
