<script lang="ts">
	import { type Status } from '$lib/contants/constants';

	export let data: {
		item: {
			id: string;
			areaId: string;
			sectorId: string;
			buildId: string;
			gradeSystem: string;
			value: string;
			accomplished: boolean;
			difficultyLevel: number;
			likes: number;
			status: Status;
			createdAt: string;
			updatedAt?: string | null;
			deletedAt?: string | null;
		};
		page: number;
		role: string;
		status: string;
	};
</script>

<h1 class="mb-4 text-xl">Grado</h1>

<form method="POST" class="space-y-3">
	<label>
		Nombre:
		<input type="text" name="gradeSystem" value={data.item.gradeSystem} required />
	</label>

	<label>
		Categoría:
		<input type="text" name="value" value={data.item.value} required />
	</label>
	<label>
		Tipo de Escalada:
		<input type="boolean" name="accomplished" value={data.item.accomplished} required />
	</label>
	<label>
		Equipo Requerido:
		<input type="number" name="difficultyLevel" value={data.item.difficultyLevel} required />
	</label>

	<label>
		Estado:
		<select name="status">
			<option value="active" selected={data.item.status === 'active'}>Activa</option>
			<option value="suspended" selected={data.item.status === 'suspended'}>Suspendida</option>
			<option value="deleted" selected={data.item.status === 'deleted'}>Eliminada</option>
		</select>
	</label>

	<div class="mt-4 flex gap-2">
		<button formaction="?/save" class="border bg-green-100 px-3 py-1">Guardar</button>
		<button formaction="?/softDelete" class="border bg-red-100 px-3 py-1">Eliminar</button>
		<a href="../" class="inline-block border bg-blue-100 px-3 py-1">Salir</a>
	</div>
</form>
