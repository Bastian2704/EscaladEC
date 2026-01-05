import type { Status } from '$lib/server/domain/types';

export function parseStatus(value: unknown, fallback: Status = 'active'): Status {
	return value === 'active' || value === 'suspended' || value === 'deleted' ? value : fallback;
}
