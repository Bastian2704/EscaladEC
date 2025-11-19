import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { requireUser } from '$lib/server/auth/guards';
import type { PageServerLoad, Actions } from '../[userId]/$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	requireUser(event);
	const { userId } = event.params;

	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const status = url.searchParams.get('status') ?? 'active';

	const items = await db.select().from(users).where(eq(users.id, userId));

	return {
		items,
		page,
		status
	};
};
