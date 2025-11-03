<script lang="ts">
	import { provinces, type Status } from '$lib/contants/constants';

	export let data: {
		item: {
			id: string;
			name: string;
			province: string;
			city: string;
			description: string;
			latitude: number;
			longitude: number;
			status: Status;
		};
		sectors: {
			id: string;
			name: string;
			orientation: string;
			description: string;
			status: Status;
			createdBy: string;
			createdAt: string;
		}[];
	};
</script>

<h1 class="">Sectores de {data.item.name}</h1>

<h1 class="">Editar área</h1>

<form method="POST" class="space-y-3">
	<label>
		Nombre del Área:
		<input type="text" name="name" value={data.item.name} required />
	</label>
	<label>
		Provincia:
		<select name="province" required>
			{#each provinces as province}
				<option value={province} selected={province === data.item.province}>
					{province}
				</option>
			{/each}
		</select>
	</label>

	<label>
		Ciudad:
		<input type="text" name="city" value={data.item.city} required />
	</label>

	<label>
		Descripción:
		<textarea name="description" rows="3">{data.item.description}</textarea>
	</label>

	<label>
		Latitud:
		<input type="number" step="any" name="latitude" value={data.item.latitude} />
	</label>

	<label>
		Longitud:
		<input type="number" step="any" name="longitude" value={data.item.longitude} />
	</label>

	<label>
		Estado:
		<select name="status">
			<option value="active" selected={data.item.status === 'active'}>Activa</option>
			<option value="suspended" selected={data.item.status === 'suspended'}>Suspendida</option>
			<option value="deleted" selected={data.item.status === 'deleted'}>Eliminada</option>
		</select>
	</label>

	<div class="">
		<button formaction="?/save" class="border bg-green-100 px-3 py-1">Guardar</button>
		<button formaction="?/delete" class="border bg-red-100 px-3 py-1">Eliminar</button>
	</div>
</form>

<table class="">
	<thead>
		<tr>
			<th class="border p-2 text-left">Nombre</th>
			<th class="border p-2">Orientación</th>
			<th class="border p-2">Descripción</th>

			<th class="border p-2">Acciones</th>
		</tr>
	</thead>
	<tbody>
		{#each data.sectors as sector}
			<tr>
				<td class="border p-2">{sector.name}</td>
				<td class="border p-2">{sector.orientation}</td>
				<td class="border p-2">{sector.description}</td>
				<td class="border p-2">
					<a href={`/area/${data.item.id}/sector/${sector.id}/edit`}> Editar </a>
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
