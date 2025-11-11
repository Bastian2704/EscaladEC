import { db } from '$lib/server/db';
import { grade } from '$lib/server/db/schema';
import { requireUser } from '$lib/server/auth/guards';
import { requireAdmin } from '$lib/server/auth/guards';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

const PAGE_SIZE = 10;
//TODO Select Logic

export const load: PageServerLoad = async (event) => {
    requireUser(event);

    const { areaId, sectorId, climbId } = event.params;

    const url = event.url;
    const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
    const status = url.searchParams.get('status') ?? 'active';
    const offset = (page - 1) * PAGE_SIZE;

    const items = await db
        .select()
        .from(grade)
        .where(eq(grade.climbId, climbId))
        .limit(PAGE_SIZE)
        .offset(offset);

    return {
        items,
        page,
        status,
        sectorId,
        areaId,
        climbId
    };
};
export const actions: Actions = {
    createGrade: async (event) => {
        requireUser(event);
        const { climbId } = event.params;
        const user = event.locals.user;
        const data = await event.request.formData();
        //TODO select
        const gradeSystem = String(data.get('gradeSystem') ?? '').trim();
        //TODO select according to gradeSystem
        const value = String(data.get('value') ?? '').trim();
        const difficultyLevel = Number(data.get('difficultyLevel') ?? '');
        const accomplished = Boolean(data.get('accomplished') ?? '');


        if (!gradeSystem || !value || !difficultyLevel) {
            return fail(400, {
                message: 'Sistema de Grado, Valor y Dificultad Percibida son Requerido son Obligatorias'
            });
        }

        await db.insert(grade).values({
            climbId,
            userId: user.id,
            gradeSystem,
            value,
            difficultyLevel,
            accomplished,
            status:'active',
            publishedAt: new Date(),
            publishedBy: 'user',
            updatedBy: 'user'
        } as any);

        return { success: true, message: `Grade creado correctamente.` };
    },

    suspend: async (event) => {
        requireAdmin(event);
        const data = await event.request.formData();
        const id = String(data.get('id') ?? '');
        if (!id) return fail(400, { message: 'Sin id' });

        await db.update(grade).set({ status: 'suspended' }).where(eq(grade.id, id));

        throw redirect(303, event.url.pathname);
    },

    resume: async (event) => {
        requireAdmin(event);
        const data = await event.request.formData();
        const id = String(data.get('id') ?? '');
        if (!id) return fail(400, { message: 'Sin id' });

        await db.update(grade).set({ status: 'active' }).where(eq(grade.id, id));

        throw redirect(303, event.url.pathname);
    },

    softDelete: async (event) => {
        requireAdmin(event);
        const data = await event.request.formData();
        const id = String(data.get('id') ?? '');
        if (!id) return fail(400, { message: 'No se ha enviado un ID' });

        await db.update(grade).set({ status: 'deleted' }).where(eq(grade.id, id));

        throw redirect(303, event.url.pathname);
    },

    restore: async (event) => {
        requireAdmin(event);
        const data = await event.request.formData();
        const id = String(data.get('id') ?? '');
        if (!id) return fail(400, { message: 'No se ha enviado un ID' });

        await db.update(grade).set({ status: 'active' }).where(eq(grade.id, id));

        throw redirect(303, event.url.pathname);
    }
};
