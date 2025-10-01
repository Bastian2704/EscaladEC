import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { climbRoute } from '$lib/server/db/schema';
import { requireUser } from '$lib/server/auth/guards';
import { fail, redirect } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';
export const load: PageServerLoad = async () => {
	const items = await db.select().from(climbRoute).orderBy(desc(climbRoute.createdAt));
	return { items };
};
export const actions: Actions = {
	create: async (event) => {
		const u = requireUser(event);
		const d = await event.request.formData();
		const name = String(d.get('name') ?? '').trim();
		const grade = String(d.get('grade') ?? '').trim();
		const description = String(d.get('description') ?? '').trim();
		if (!name || !grade) return fail(400, { message: 'Nombre y grado son obligatorios' });
		await db.insert(climbRoute).values({ name, grade, description, createdBy: u.id });
		throw redirect(303, '/routes');
	}
};
