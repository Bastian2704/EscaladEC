import { db } from '$lib/server/db';
import { users, area, sector, climb, grade, climbingLevelSport } from '$lib/server/db/schema';
import { requireUser } from '$lib/server/auth/guards';
import type { PageServerLoad } from './$types';
import { eq, and, inArray, desc, or } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	requireUser(event);
	const { userId } = event.params;

	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const status = url.searchParams.get('status') ?? 'active';

	const items = await db.select().from(users).where(eq(users.id, userId));
	const userRopeClimbs = await db
		.select({
			areaId: area.id,
			areaName: area.name,
			sectorName: sector.name,
			climbName: climb.name,
			realValue: climb.value,
			proposedValue: grade.value,
			difficulty: grade.difficultyLevel,
			done: grade.accomplished,
			createdAt: grade.createdAt
		})
		.from(grade)
		.leftJoin(climb, eq(climb.id, grade.climbId))
		.leftJoin(sector, eq(sector.id, climb.sectorId))
		.leftJoin(area, eq(area.id, sector.areaId))
		.where(
			and(
				eq(grade.userId, userId),
				inArray(grade.gradeSystem, ["Francesa", "YDS"])
			)
		)
		.orderBy(desc(grade.createdAt));
	const userNoRopeClimbs = await db
		.select({
			areaId: area.id,
			areaName: area.name,
			sectorName: sector.name,
			climbName: climb.name,
			realValue: climb.value,
			proposedValue: grade.value,
			difficulty: grade.difficultyLevel,
			done: grade.accomplished,
			createdAt: grade.createdAt
		})
		.from(grade)
		.leftJoin(climb, eq(climb.id, grade.climbId))
		.leftJoin(sector, eq(sector.id, climb.sectorId))
		.leftJoin(area, eq(area.id, sector.areaId))
		.where(
			and(
				eq(grade.userId, userId),
				inArray(grade.gradeSystem, ["VScale", "Fontainebleau"])
			)
		)
		.orderBy(desc(grade.createdAt));
	const userTradClimbs = await db
		.select({
			areaId: area.id,
			areaName: area.name,
			sectorName: sector.name,
			climbName: climb.name,
			realValue: climb.value,
			proposedValue: grade.value,
			difficulty: grade.difficultyLevel,
			done: grade.accomplished,
			createdAt: grade.createdAt
		})
		.from(grade)
		.leftJoin(climb, eq(climb.id, grade.climbId))
		.leftJoin(sector, eq(sector.id, climb.sectorId))
		.leftJoin(area, eq(area.id, sector.areaId))
		.where(
			and(
				eq(grade.userId, userId),
				eq(grade.gradeSystem, "British")
			)
		)
		.orderBy(desc(grade.createdAt));
	const topSport = await db
		.select({
			areaId: area.id,
			areaName: area.name,
			sectorName: sector.name,
			climbName: climb.name,
			gradeValue: grade.value,
			scaledValue: climbingLevelSport.scaledValue,
			createdAt: grade.createdAt
		})
		.from(grade)
		.leftJoin(climb, eq(climb.id, grade.climbId))
		.leftJoin(sector, eq(sector.id, climb.sectorId))
		.leftJoin(area, eq(area.id, sector.areaId))
		.leftJoin(
			climbingLevelSport,
			or(
				eq(climbingLevelSport.frenchValue, grade.value),
				eq(climbingLevelSport.ydsValue, grade.value)
			)
		)
		.where(
			and(
				eq(grade.userId, userId),
				eq(grade.accomplished, true),
				inArray(grade.gradeSystem, ['Francesa', 'YDS'])
			)
		)
		.orderBy(desc(climbingLevelSport.scaledValue))
		.limit(3);
		const topNoRope = await db
  .select({
    areaId: area.id,
    areaName: area.name,
    sectorName: sector.name,
    climbName: climb.name,
    gradeValue: grade.value,
    scaledValue: climbingLevelNoRope.scaledValue,
    createdAt: grade.createdAt
  })
  .from(grade)
  .leftJoin(climb, eq(climb.id, grade.climbId))
  .leftJoin(sector, eq(sector.id, climb.sectorId))
  .leftJoin(area, eq(area.id, sector.areaId))
  .leftJoin(
    climbingLevelNoRope,
    or(
      eq(climbingLevelNoRope.vScale, grade.value),
      eq(climbingLevelNoRope.fontainebleau, grade.value)
    )
  )
  .where(
    and(
      eq(grade.userId, userId),
      eq(grade.accomplished, true),
      inArray(grade.gradeSystem, ['VScale', 'Fontainebleau'])
    )
  )
  .orderBy(desc(climbingLevelNoRope.scaledValue))
  .limit(3);
const topTrad = await db
  .select({
    areaId: area.id,
    areaName: area.name,
    sectorName: sector.name,
    climbName: climb.name,
    gradeValue: grade.value,
    scaledValue: climbingLevelTrad.scaledValue,
    createdAt: grade.createdAt
  })
  .from(grade)
  .leftJoin(climb, eq(climb.id, grade.climbId))
  .leftJoin(sector, eq(sector.id, climb.sectorId))
  .leftJoin(area, eq(area.id, sector.areaId))
  .leftJoin(
    climbingLevelTrad,
    eq(climbingLevelTrad.british, grade.value)
  )
  .where(
    and(
      eq(grade.userId, userId),
      eq(grade.accomplished, true),
      eq(grade.gradeSystem, 'British')
    )
  )
  .orderBy(desc(climbingLevelTrad.scaledValue))
  .limit(3);



	return {
		items,
		page,
		status,
		userRopeClimbs,
		userTradClimbs,
		userNoRopeClimbs,
	};
};
