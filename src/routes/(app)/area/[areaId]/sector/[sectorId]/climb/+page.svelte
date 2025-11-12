<script lang="ts">
	import { type Status } from '$lib/contants/constants';

	export let data: {
		items: Array<{
			id: string;
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
		categoryGroups: string[];
		categoryOptions: Record<string, string[]>;
	};
	// estado del form
	const groups = data.categoryGroups ?? [];
	const optionsMap = data.categoryOptions ?? {};

	let selectedGroup: string = groups[0] ?? '';
	$: typesForGroup = optionsMap[selectedGroup] ?? [];

	let formCategory = selectedGroup;
	let formClimbType = optionsMap[selectedGroup]?.[0] ?? '';

	let name = '';
	let requiredEquipment = '';

	function onGroupChange() {
		selectedGroup = formCategory;
		formClimbType = optionsMap[selectedGroup]?.[0] ?? '';
	}

	$: if (typesForGroup.length && !typesForGroup.includes(formClimbType)) {
		formClimbType = typesForGroup[0] ?? '';
	}

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

<form method="POST" class="mt-6 space-y-3">
	<h2 class="font-semibold">Crear nuevo Climb</h2>

	<div>
		<label for="name" class="mb-1 block">Nombre</label>
		<input id="name" name="name" bind:value={name} required class="border px-2 py-1" />
	</div>

	<div>
		<label for="category" class="mb-1 block">Categoría</label>
		<select
			id="category"
			name="category"
			bind:value={formCategory}
			on:change={onGroupChange}
			required
			class="border px-2 py-1"
			disabled={!groups.length}
		>
			{#each groups as g}
				<option value={g}>{g}</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="climbType" class="mb-1 block">Tipo de Escalada</label>
		{#if typesForGroup.length}
			<select
				id="climbType"
				name="climbType"
				bind:value={formClimbType}
				required
				class="border px-2 py-1"
			>
				{#each typesForGroup as t}
					<option value={t}>{t}</option>
				{/each}
			</select>
		{:else}
			<input
				id="climbType"
				name="climbType"
				value=""
				class="border bg-gray-100 px-2 py-1"
				disabled
			/>
		{/if}
	</div>

	<div>
		<label for="requiredEquipment" class="mb-1 block">Equipo Requerido</label>
		<input
			id="requiredEquipment"
			name="requiredEquipment"
			bind:value={requiredEquipment}
			required
			class="border px-2 py-1"
		/>
	</div>

	<button type="submit" formaction="?/createClimb" class="border px-3 py-1">Crear Climb</button>
</form>
