<script lang="ts">
	import { type Status } from '$lib/contants/constants';

	export let data: {
		items: Array<{
			id: string;
			areaId: string;
			name: string;
			orientation: string;
			description: string;
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

<h1 class="mb-4 text-xl">Sectores</h1>

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
			<th class="border p-2 text-left">Orientación</th>
			<th class="border p-2">Descripción</th>

			<th class="border p-2">Acciones</th>
		</tr>
	</thead>
	<tbody>
		{#each data.items as sector}
			<tr>
				<td class="border p-2">{sector.name}</td>
				<td class="border p-2">{sector.orientation}</td>
				<td class="border p-2">{sector.description}</td>
				<td class="border p-2">
					<a href={`/area/${sector.areaId}/sector/${sector.id}/edit`}> Editar </a>
					<form method="POST" class="inline">
						<input type="hidden" name="id" value={sector.id} />
					</form>

					{#if sector.status === 'active'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={sector.id} />
							<button formaction="?/suspend" class="border px-2 py-1">Suspender</button>
						</form>
					{:else if sector.status === 'suspended'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={sector.id} />
							<button formaction="?/resume" class="border px-2 py-1">Reactivar</button>
						</form>
					{/if}

					{#if sector.status !== 'deleted'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={sector.id} />
							<button formaction="?/softDelete" class="border px-2 py-1">Borrar</button>
						</form>
					{:else}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={sector.id} />
							<button formaction="?/restore" class="border px-2 py-1">Restaurar</button>
						</form>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<form method="POST" enctype="multipart/form-data">
	<h2>Crear nuevo sector</h2>
	<br />

	<label for="name">Nombre:</label>
	<input type="text" name="name" id="name" required />

	<br />

	<label for="orientation">Orientación:</label>
	<input type="text" name="orientation" id="orientation" required />

	<br />

	<label for="description">Descripción:</label>
	<input type="text" name="description" id="description" required />

	<br />

	<button type="submit" formaction="?/createSector">Crear Sector</button>
</form>
