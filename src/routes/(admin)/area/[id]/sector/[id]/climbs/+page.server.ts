import { db } from '$lib/server/db';
import { climb } from '$lib/server/db/schema';
import { requireUser } from '$lib/server/auth/guards';
import { requireAdmin } from '$lib/server/auth/guards';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

const PAGE_SIZE = 10;

export const load: PageServerLoad = async (event) => {
	requireUser(event);

	const { id } = event.params;
	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const status = url.searchParams.get('status') ?? 'active';
	const offset = (page - 1) * PAGE_SIZE;

	const items = await db
		.select()
		.from(climb)
		.where(eq(climb.sectorId, id))
		.limit(PAGE_SIZE)
		.offset(offset);

	return {
		items,
		page,
		status
	};
};
export const actions: Actions = {
	createClimb: async (event) => {
		requireAdmin(event);
		const { id } = event.params as { id: string };
        const user = event.locals.user;
		const data = await event.request.formData();
		const sectorId = id;
		const name = String(data.get('name') ?? '').trim();
		//TODO select
		const category = String(data.get('category') ?? '').trim();
		//TODO select
		const climbType = String(data.get('climbType') ?? '').trim();
		const requiredEquipment = String(data.get('requiredEquipment') ?? '').trim();

		if (!name || !category || !climbType || !requiredEquipment) {
			return fail(400, {
				message: 'Nombre del Climb, Categoria, Tipo de Escalada Y Equipo Requerido son Obligatorias'
			});
		}

		await db.insert(climb).values({
			sectorId,
            userId: user.id,
			name,
			category,
			climbType,
			requiredEquipment,
			status: 'active',
			createdAt: new Date(),
			createdBy: 'user',
			updatedBy: 'user'
		} as any);

		return { success: true, message: `Climb: ${name}, creado correctamente.` };
	},

	suspend: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await db.update(climb).set({ status: 'suspended' }).where(eq(climb.id, id));

		throw redirect(303, event.url.pathname);
	},

	resume: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await db.update(climb).set({ status: 'active' }).where(eq(climb.id, id));

		throw redirect(303, event.url.pathname);
	},

	softDelete: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await db.update(climb).set({ status: 'deleted' }).where(eq(climb.id, id));

		throw redirect(303, event.url.pathname);
	},

	restore: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await db.update(climb).set({ status: 'active' }).where(eq(climb.id, id));

		throw redirect(303, event.url.pathname);
	}
};
