import type { Status } from '$lib/server/domain/types';
import type { climb } from '$lib/server/db/schema';

export type ClimbRow = typeof climb.$inferSelect;
export type NewClimbRow = typeof climb.$inferInsert;

export type ListClimbsParams = {
	sectorId: string;
	page: number;
	pageSize: number;
	status?: Status | 'all';
};

export type StatusMeta = {
	updatedAt: Date;
	updatedBy?: string | null;
	deletedAt?: Date | null;
};

export interface IClimbRepository {
	findById(id: string): Promise<ClimbRow | null>;
	listBySectorId(params: ListClimbsParams): Promise<ClimbRow[]>;
	insert(newClimb: NewClimbRow): Promise<ClimbRow>;
	update(id: string, patch: Partial<NewClimbRow>): Promise<void>;
	setStatus(id: string, status: Status, meta: StatusMeta): Promise<void>;
}
