import type { SessionUser, Status } from '$lib/server/domain/types';
import type { NewClimbRow } from '$lib/server/repositories/climb.repository';
import { Status as StatusConst } from '$lib/contants/constants';

type CreateClimbInput = {
	sectorId: string;
	name: string;
	category: string;
	climbType?: string; 
	gradeSystem: string;
	value: string;
	requiredEquipment: string;
};

export class ClimbBuilder {
	private input!: CreateClimbInput;
	private user!: SessionUser;

	withUser(user: SessionUser) {
		this.user = user;
		return this;
	}

	fromInput(input: CreateClimbInput) {
		this.input = input;
		return this;
	}

	validate() {
		const { name, category, gradeSystem, value, requiredEquipment } = this.input;

		if (!name?.trim()) throw new Error('Nombre requerido');
		if (!category?.trim()) throw new Error('Categoría requerida');
		if (!gradeSystem?.trim()) throw new Error('Sistema de grado requerido');
		if (!value?.trim()) throw new Error('Valor requerido');
		if (!requiredEquipment?.trim()) throw new Error('Equipo requerido');

		return this;
	}

	build(): NewClimbRow {
		const now = new Date();
		const status: Status = StatusConst.active as Status;

		return {
			sectorId: this.input.sectorId,
			userId: this.user.id,
			name: this.input.name.trim(),
			category: this.input.category.trim(),
			climbType: (this.input.climbType ?? 'sport').trim(),
			gradeSystem: this.input.gradeSystem.trim(),
			value: this.input.value.trim(),
			requiredEquipment: this.input.requiredEquipment.trim(),
			status,
			createdBy: this.user.id,
			createdAt: now,
			updatedBy: this.user.id,
			updatedAt: now
		} as NewClimbRow;
	}
}
