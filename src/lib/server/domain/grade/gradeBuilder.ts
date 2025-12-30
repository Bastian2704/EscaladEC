import type { NewGradeRow } from '$lib/server/repositories/grade.repository';
import type { SessionUser, Status } from '$lib/server/domain/types';
import { isValidGradeSystem, isValidGradeSystemValue, Status as StatusConst } from '$lib/contants/constants';

type CreateGradeInput = {
	climbId: string;
	climbCategory: string; // viene del form hidden
	gradeSystem: string;
	value: string;
	difficultyLevel: number;
	accomplished: boolean;
};

export class GradeBuilder {
	private input!: CreateGradeInput;
	private user!: SessionUser;

	withUser(user: SessionUser) {
		this.user = user;
		return this;
	}

	fromInput(input: CreateGradeInput) {
		this.input = input;
		return this;
	}

	validate() {
		const { climbCategory, gradeSystem, value, difficultyLevel } = this.input;

		if (!gradeSystem) throw new Error('Sistema de grado requerido');
		if (!value) throw new Error('Valor requerido');

		if (!isValidGradeSystem(climbCategory, gradeSystem)) {
			throw new Error('Sistema de grado inválido.');
		}
		if (!isValidGradeSystemValue(climbCategory, gradeSystem, value)) {
			throw new Error('Valor de grado no coincide con el sistema seleccionado.');
		}
		if (!Number.isFinite(difficultyLevel) || difficultyLevel < 1 || difficultyLevel > 10) {
			throw new Error('La dificultad percibida debe estar entre 1 y 10.');
		}

		return this;
	}

	build(): NewGradeRow {
		const now = new Date();

		// Usamos tu enum Status del archivo constants para mantener consistencia con tu DB actual
		// (si prefieres usar el union type, cambia StatusConst.active por 'active')
		const status: Status = StatusConst.active as Status;

		return {
			climbId: this.input.climbId,
			userId: this.user.id,
			gradeSystem: this.input.gradeSystem.trim(),
			value: this.input.value.trim(),
			difficultyLevel: this.input.difficultyLevel,
			accomplished: this.input.accomplished,
			status,
			createdAt: now,
			updatedAt: now,
			publishedBy: this.user.id,
			updatedBy: this.user.id
			// deletedAt -> null/undefined por default
			// likes -> default 0 en DB
		} as NewGradeRow;
	}
}
