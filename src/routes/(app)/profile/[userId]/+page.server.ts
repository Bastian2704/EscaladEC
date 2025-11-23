import { db } from '$lib/server/db';
import { users, area, sector, climb, grade, climbingLevelSport, climbingLevelNoRope, climbingLevelTrad } from '$lib/server/db/schema';
import { requireUser } from '$lib/server/auth/guards';
import type { PageServerLoad } from './$types';
import { eq, and, inArray, desc, or, notInArray } from 'drizzle-orm';

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
		gradeSystem: climb.gradeSystem,
		userGrade: climb.value,
		scaledValue: climbingLevelSport.scaledValue,
		frenchEquivalent: climbingLevelSport.frenchValue,
		ydsEquivalent: climbingLevelSport.ydsValue,
		sectorId: sector.id,
		areaId: area.id
	})
	.from(grade)
	.leftJoin(climb, eq(climb.id, grade.climbId))
	.leftJoin(sector, eq(sector.id, climb.sectorId))
	.leftJoin(area, eq(area.id, sector.areaId))
	.leftJoin(
		climbingLevelSport,
		or(
			and(
				eq(climb.gradeSystem, 'Francesa'),
				eq(climbingLevelSport.frenchValue, climb.value)
			),
			and(
				eq(climb.gradeSystem, 'YDS'),
				eq(climbingLevelSport.ydsValue, climb.value)
			)
		)
	)
	.where(
		and(
			eq(grade.userId, userId),
			eq(grade.accomplished, true),
			inArray(climb.gradeSystem, ['Francesa', 'YDS'])
		)
	)
	.orderBy(desc(climbingLevelSport.scaledValue))
	.limit(3);

console.log(topSport);
let avgScaled = 0;
if (topSport.length === 0) {
	console.log('Usuario sin ascensos completados en deportiva');
} else {
	avgScaled =
		topSport.reduce((sum, row) => sum + (row.scaledValue ?? 0), 0) /
		topSport.length;
}
	const roundedAvg = Math.round(avgScaled);
	console.log('Promedio scaledValue (top 3):', roundedAvg);
	const baseSectorId = topSport[0].sectorId;
	const baseAreaId = topSport[0].areaId;

	const completed = await db
	.select({ climbId: grade.climbId })
	.from(grade)
	.where(and(eq(grade.userId, userId), eq(grade.accomplished, true)));

	const completedIds = completed.map((r) => r.climbId);

	async function findRecommendationsWithScope(scope: 'sector' | 'area' | 'global') {
	const whereParts: any[] = [
		inArray(climb.gradeSystem, ['Francesa', 'YDS']),
		eq(climbingLevelSport.scaledValue, roundedAvg),
		eq(climb.status, 'active'),
		eq(climb.climbType, 'sport')
	];
	console.log("WhereParts"+whereParts);

	// excluir los climbs que el usuario ya hizo
	if (completedIds.length > 0) {
		whereParts.push(notInArray(climb.id, completedIds));
	}

	// prioridad por alcance
	if (scope === 'sector' && baseSectorId) {
		whereParts.push(eq(sector.id, baseSectorId));
		console.log("Entro a sector");
	}


	if (scope === 'area' && baseAreaId) {
		whereParts.push(eq(area.id, baseAreaId));
		console.log("Entro a Area");
	}

	// scope === 'global' → no agregamos nada extra

	return db
		.select({
			climbId: climb.id,
			areaName: area.name,
			sectorName: sector.name,
			climbName: climb.name,
			gradeSystem: climb.gradeSystem,
			gradeValue: climb.value,
			scaledValue: climbingLevelSport.scaledValue
		})
		.from(climb)
		.leftJoin(sector, eq(sector.id, climb.sectorId))
		.leftJoin(area, eq(area.id, sector.areaId))
		.leftJoin(
			climbingLevelSport,
			or(
				and(
					eq(climb.gradeSystem, 'Francesa'),
					eq(climbingLevelSport.frenchValue, climb.value)
				),
				and(
					eq(climb.gradeSystem, 'YDS'),
					eq(climbingLevelSport.ydsValue, climb.value)
				)
			)
		)
		.where(eq(climbingLevelSport.scaledValue, roundedAvg))
		.limit(10); // o el número de sugerencias que quieras
}
	let recommendations = await findRecommendationsWithScope('sector');

if (recommendations.length === 0) {
	recommendations = await findRecommendationsWithScope('area');
}

if (recommendations.length === 0) {
	recommendations = await findRecommendationsWithScope('global');
}

console.log('Recomendaciones:', recommendations);
const debugRecs = await db
	.select({
		climbId: climb.id,
		areaName: area.name,
		sectorName: sector.name,
		climbName: climb.name,
		gradeSystem: climb.gradeSystem,
		gradeValue: climb.value,
		scaledValue: climbingLevelSport.scaledValue
	})
	.from(climb)
	.leftJoin(sector, eq(sector.id, climb.sectorId))
	.leftJoin(area, eq(area.id, sector.areaId))
	.leftJoin(
		climbingLevelSport,
		or(
			and(
				eq(climb.gradeSystem, 'Francesa'),
				eq(climbingLevelSport.frenchValue, climb.value)
			),
			and(
				eq(climb.gradeSystem, 'YDS'),
				eq(climbingLevelSport.ydsValue, climb.value)
			)
		)
	)
	.where(eq(climbingLevelSport.scaledValue, roundedAvg)); // solo este filtro
console.log('DEBUG recs scaled = avg:', debugRecs);




		/*const topNoRope = await db
  .select({
    gradeValue: grade.value,
    scaledValue: climbingLevelNoRope.scaledValue
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
    gradeValue: grade.value,
    scaledValue: climbingLevelTrad.scaledValue
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
  .limit(3);*/
	return {
		items,
		page,
		status,
		userRopeClimbs,
		userTradClimbs,
		userNoRopeClimbs,
		//topTrad,
		//topNoRope,
		topSport,
		recommendations,
	};
};
