import { db } from '$lib/server/db';
import { area } from '$lib/server/db/schema';
import { requireAdmin } from '$lib/server/auth/guards';
import { lucia } from '$lib/server/auth/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { provinces, Status } from '$lib/contants/constants';
import type { PageServerLoad, Actions } from './$types';

const PAGE_SIZE = 10;

const provincess = provinces;
type Province = (typeof provincess)[number];

function isProvince(value: string): value is Province {
	return provincess.includes(value);
}

export const load: PageServerLoad = async (event) => {
	requireAdmin(event);

	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const province = url.searchParams.get('province') ?? '';
	const status = url.searchParams.get('status') ?? 'active';

	const filters = [];
	if (province && isProvince(province)) {
		filters.push(eq(area.province, province));
	}

	const where = filters.length ? and(...filters) : undefined;
	const offset = (page - 1) * PAGE_SIZE;

	const items = await db.select().from(area).where(where).limit(PAGE_SIZE).offset(offset);

	return {
		items,
		page,
		status,
		province
	};
};
export const actions: Actions = {
	createArea: async (event) => {
		//const admin = requireAdmin(event);

		const data = await event.request.formData();
		const user = event.locals.user;

		//TODO: Change this to validate select options
		const province = String(data.get('province') ?? '').trim();
		const name = String(data.get('name') ?? '').trim();
		const city = String(data.get('city') ?? '');
		const description = String(data.get('description') ?? '');
		const latitude = String(data.get('latitude') ?? '');
		const longitude = String(data.get('longitude') ?? '');
		//const status = String(data.get('status') ?? Status.active);

		if (!name || !province || !city || !description) {
			return fail(400, {
				message: 'Nombre del Area, Ciudad, Provincia y Descripción son Obligatorias'
			});
		}

		if (!isProvince(province)) {
			return fail(400, { message: 'Provincia inválida' });
		}

		await db.insert(area).values({
			name,
			province,
			city,
			description,
			latitude,
			longitude,
			status: 'active',
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: user.id,
			updatedBy: user.id
		} as any);

		return { success: true, message: `Area: ${name}, creado correctamente.` };
	},

	suspend: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });
		const user = event.locals.user;

		await db
			.update(area)
			.set({ status: Status.suspended, updatedAt: new Date(), updatedBy: user.id })
			.where(eq(area.id, id));
		await lucia.invalidateUserSessions(id);
		throw redirect(303, event.url.pathname);
	},

	resume: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });
		const user = event.locals.user;

		await db
			.update(area)
			.set({ status: Status.active, updatedAt: new Date(), updatedBy: user.id })
			.where(eq(area.id, id));
		throw redirect(303, event.url.pathname);
	},

	softDelete: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });
		const user = event.locals.user;

		await db
			.update(area)
			.set({
				status: Status.deleted,
				updatedAt: new Date(),
				deletedAt: new Date(),
				updatedBy: user.id
			})
			.where(eq(area.id, id));

		throw redirect(303, event.url.pathname);
	},

	restore: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });
		const user = event.locals.user;

		await db
			.update(area)
			.set({ status: Status.active, updatedAt: new Date(), updatedBy: user.id })
			.where(eq(area.id, id));
		throw redirect(303, event.url.pathname);
	}
};
