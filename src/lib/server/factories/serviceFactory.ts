import { db } from '$lib/server/db';

import { DrizzleGradeRepository } from '$lib/server/repositories/drizzle/drizzleGradeRepository';
import { GradeService } from '$lib/server/services/grade.service';

import { DrizzleClimbRepository } from '$lib/server/repositories/drizzle/drizzleClimbRepository';
import { ClimbService } from '$lib/server/services/climb.service';

export type EntityServiceName = 'grade' | 'area' | 'sector' | 'climb' | 'user';

export class ServiceFactory {
	static create(name: 'grade'): GradeService;
	static create(name: 'climb'): ClimbService;

	static create(name: EntityServiceName) {
		switch (name) {
			case 'grade': {
				const repo = new DrizzleGradeRepository(db);
				return new GradeService(repo);
			}
			case 'climb': {
				const repo = new DrizzleClimbRepository(db);
				return new ClimbService(repo);
			}
			default:
				throw new Error(`Service not implemented for entity: ${name}`);
		}
	}
}
