import type { Status } from '$lib/server/domain/types';
import type { grade } from '$lib/server/db/schema';

// Drizzle infers
export type GradeRow = typeof grade.$inferSelect;
export type NewGradeRow = typeof grade.$inferInsert;

export type ListParams = {
	climbId: string;
	page: number;
	pageSize: number;
	status?: Status | 'all'; // por ahora no filtramos por status en DB, pero lo dejamos listo
};

export type StatusMeta = {
	updatedAt: Date;
	updatedBy?: string | null;
	deletedAt?: Date | null;
};

export interface IGradeRepository {
	findById(id: string): Promise<GradeRow | null>;

	listByClimbId(params: ListParams): Promise<GradeRow[]>;

	insert(newGrade: NewGradeRow): Promise<GradeRow>;

	update(id: string, patch: Partial<NewGradeRow>): Promise<void>;

	setStatus(id: string, status: Status, meta: StatusMeta): Promise<void>;
}
