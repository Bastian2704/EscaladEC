<script lang="ts">
	import { type Status } from '$lib/contants/constants';

	export let data: {
		items: Array<{
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
		}>;
		page: number;
		role: string;
		status: string;
	};

	export let form: { message?: string; success?: boolean } | undefined;
</script>

<h1 class="mb-4 text-xl">Climbs</h1>

{#if form?.message}
	<p
		class="mb-3 rounded border p-2 {form.success
			? 'border-green-400 bg-green-50'
			: 'border-red-400 bg-red-50'}"
	>
		{form.message}
	</p>
{/if}

<table class="w-full border-collapse">
	<thead>
		<tr>
			<th class="border p-2 text-left">Nombre</th>
			<th class="border p-2 text-left">Categoría</th>
			<th class="border p-2">Tipo de Escalada</th>
			<th class="border p-2">Equipo Requerido</th>

			<th class="border p-2">Acciones</th>
		</tr>
	</thead>
	<tbody>
		{#each data.items as climb}
			<tr>
				<td class="border p-2">{climb.name}</td>
				<td class="border p-2">{climb.category}</td>
				<td class="border p-2">{climb.climbType}</td>
				<td class="border p-2">{climb.requiredEquipment}</td>
				<td class="border p-2">
					<a href={`climb/${climb.id}/edit`}> Editar </a>
					<form method="POST" class="inline">
						<input type="hidden" name="id" value={climb.id} />
					</form>

					{#if climb.status === 'active'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={climb.id} />
							<button formaction="?/suspend" class="border px-2 py-1">Suspender</button>
						</form>
					{:else if climb.status === 'suspended'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={climb.id} />
							<button formaction="?/resume" class="border px-2 py-1">Reactivar</button>
						</form>
					{/if}

					{#if climb.status !== 'deleted'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={climb.id} />
							<button formaction="?/softDelete" class="border px-2 py-1">Borrar</button>
						</form>
					{:else}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={climb.id} />
							<button formaction="?/restore" class="border px-2 py-1">Restaurar</button>
						</form>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<form method="POST" enctype="multipart/form-data">
	<h2>Crear nuevo Climb</h2>
	<br />

	<label for="name">Nombre:</label>
	<input type="text" name="name" id="name" required />

	<br />

	<label for="category">Categoría:</label>
	<input type="text" name="category" id="category" required />

	<br />

	<label for="climbType">Tipo de Escalada:</label>
	<input type="text" name="climbType" id="climbType" required />

	<br />

	<label for="requiredEquipment">Equipo Requerido:</label>
	<input type="text" name="requiredEquipment" id="requiredEquipment" required />

	<br />

	<button type="submit" formaction="?/createClimb">Crear Climb</button>
</form>
