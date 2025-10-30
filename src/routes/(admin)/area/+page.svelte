<script lang="ts">
	import { provinces, type Status } from '$lib/contants/constants';

	export let data: {
		items: Array<{
			id: string;
			province: string;
			city: string;
			description: string;
			latitude: number;
			longitude: number;
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

<h1 class="mb-4 text-xl">Areas</h1>

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
			<th class="border p-2 text-left">Provincia</th>
			<th class="border p-2">Ciudad</th>
			<th class="border p-2">Descripción</th>
			<th class="border p-2">Latitud</th>
			<th class="border p-2">Longitud</th>

			<th class="border p-2">Acciones</th>
		</tr>
	</thead>
	<tbody>
		{#each data.items as area}
			<tr>
				<td class="border p-2">{area.province}</td>
				<td class="border p-2">{area.city}</td>
				<td class="border p-2">{area.description}</td>
				<td class="border p-2">{area.latitude}</td>
				<td class="border p-2">{area.longitude}</td>
				<td class="border p-2">
					<a href={`/area/${area.id}/edit`}> Editar </a>
					<form method="POST" class="inline">
						<input type="hidden" name="id" value={area.id} />
						<select name="role" class="border p-1">
							{#each provinces as province}
								<option value={province} selected={province === province}>{province}</option>
							{/each}
						</select>
						<button formaction="?/setProvince" class="ml-1 border px-2 py-1">Guardar</button>
					</form>

					{#if area.status === 'active'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={area.id} />
							<button formaction="?/suspend" class="border px-2 py-1">Suspender</button>
						</form>
					{:else if area.status === 'suspended'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={area.id} />
							<button formaction="?/resume" class="border px-2 py-1">Reactivar</button>
						</form>
					{/if}

					{#if area.status !== 'deleted'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={area.id} />
							<button formaction="?/softDelete" class="border px-2 py-1">Borrar</button>
						</form>
					{:else}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={area.id} />
							<button formaction="?/restore" class="border px-2 py-1">Restaurar</button>
						</form>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
<!-- Formulario para crear una nueva área -->
<form method="POST" enctype="multipart/form-data">
	<h2>Crear nueva área</h2>

	<label for="province">Provincia:</label>
	<select name="province" id="province" required>
		{#each provinces as province}
			<option value={province}>{province}</option>
		{/each}
	</select>

	<br />

	<label for="city">Ciudad:</label>
	<input type="text" name="city" id="city" required />

	<br />

	<label for="description">Descripción:</label>
	<input type="text" name="description" id="description" required />

	<br />

	<label for="latitude">Latitud:</label>
	<input type="text" name="latitude" id="latitude" />

	<br />

	<label for="longitude">Longitud:</label>
	<input type="text" name="longitude" id="longitude" />

	<br />

	<button type="submit" formaction="?/createArea">Crear área</button>
</form>
