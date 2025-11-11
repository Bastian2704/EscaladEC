<script lang="ts">
	import { type Status } from '$lib/contants/constants';

	export let data: {
		item: {
			id: string;
			areaId: string;
			sectorId: string;
			name: string;
			category: string;
			climbType: string;
			requiredEquipment: string;
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

<h1 class="mb-4 text-xl">Climb {data.item.name}</h1>

<form method="POST" class="space-y-3">
	<label>
		Nombre:
		<input type="text" name="name" value={data.item.name} required />
	</label>

	<label>
		Categoría:
		<input type="text" name="category" value={data.item.category} required />
	</label>
	<label>
		Tipo de Escalada:
		<input type="text" name="climbType" value={data.item.climbType} required />
	</label>
	<label>
		Equipo Requerido:
		<input type="text" name="requiredEquipment" value={data.item.requiredEquipment} required />
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
<!--<h1 class="">Climbs de {data.item.name}</h1>
<a href={`/area/${data.item.areaId}/sector/${data.item.id}/climbs/`}> Visualizar </a>-->
