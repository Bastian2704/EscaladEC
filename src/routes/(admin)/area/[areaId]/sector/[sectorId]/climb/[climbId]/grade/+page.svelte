<script lang="ts">
	import { type Status } from '$lib/contants/constants';
	export let data: {
		items: Array<{
			id: string;
			climbId: string;
			gradeSystem: string;
			value: string;
			accomplished: boolean;
			difficultyLevel: number;
			status: Status;
			publishedAt: string;
			updatedAt?: string | null;
			deletedAt?: string | null;
		}>;
		page: number;
		role: string;
		status: string;
		systems?: string[];
		gradeOptions?: Record<string, string[]>;
	};
	// 1) Fallbacks seguros
	const systems = data.systems ?? []; // o  Object.keys(fallbackMap)
	const optionsMap: Record<string, string[]> = data.gradeOptions ?? {}; // o fallbackMap

	// 2) Estado base
	let selectedSystem: string = systems[0] ?? '';

	// ¡NO indexar todavía a valuesForSystem!
	$: valuesForSystem = optionsMap[selectedSystem] ?? [];

	let formGradeSystem: string = selectedSystem;

	// ⬅️ Usa optional chaining: ?.[] evita el crash en SSR
	let formValue: string = optionsMap[selectedSystem]?.[0] ?? '';

	let accomplished = false;
	let difficultyLevel: number = 5;

	// 3) Al cambiar sistema, vuelve a tomar el primer valor de ese sistema
	function onSystemChange() {
		selectedSystem = formGradeSystem;
		formValue = optionsMap[selectedSystem]?.[0] ?? '';
	}

	// 4) Si cambia valuesForSystem y formValue queda inválido, corrígelo
	$: if (valuesForSystem.length && !valuesForSystem.includes(formValue)) {
		formValue = valuesForSystem[0] ?? '';
	}

	export let form: { message?: string; success?: boolean } | undefined;
</script>

<h1 class="mb-4 text-xl">Grades</h1>

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
			<th class="border p-2 text-left">Sistema de grado</th>
			<th class="border p-2 text-left">Valor</th>
			<th class="border p-2">Logrado</th>
			<th class="border p-2">Dificultad percibida (1–10)</th>
			<th class="border p-2">Acciones</th>
		</tr>
	</thead>
	<tbody>
		{#each data.items as g}
			<tr>
				<td class="border p-2">{g.gradeSystem}</td>
				<td class="border p-2">{g.value}</td>
				<td class="border p-2">{g.accomplished ? '✅' : '❌'}</td>
				<td class="border p-2">{g.difficultyLevel}</td>
				<td class="border p-2">
					<a href={`grade/${g.id}/edit`}>Editar</a>
					{#if g.status === 'active'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={g.id} />
							<button formaction="?/suspend" class="border px-2 py-1">Suspender</button>
						</form>
					{:else if g.status === 'suspended'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={g.id} />
							<button formaction="?/resume" class="border px-2 py-1">Reactivar</button>
						</form>
					{/if}

					{#if g.status !== 'deleted'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={g.id} />
							<button formaction="?/softDelete" class="border px-2 py-1">Borrar</button>
						</form>
					{:else}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={g.id} />
							<button formaction="?/restore" class="border px-2 py-1">Restaurar</button>
						</form>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<!-- FORM ALINEADO CON EL BACK -->
<form method="POST" class="mt-6 space-y-3">
	<h2 class="font-semibold">Crear nuevo grade</h2>

	<div>
		<label for="gradeSystem" class="mb-1 block">Sistema de grado</label>
		<select
			id="gradeSystem"
			name="gradeSystem"
			bind:value={formGradeSystem}
			on:change={onSystemChange}
			required
			class="border px-2 py-1"
			disabled={!systems.length}
		>
			{#each systems as sys}
				<option value={sys}>{sys}</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="value" class="mb-1 block">Valor</label>
		{#if valuesForSystem.length}
			<select id="value" name="value" bind:value={formValue} required class="border px-2 py-1">
				{#each valuesForSystem as v}
					<option value={v}>{v}</option>
				{/each}
			</select>
		{:else}
			<input id="value" name="value" class="border bg-gray-100 px-2 py-1" value="" disabled />
		{/if}
	</div>

	<div class="flex items-center gap-2">
		<input id="accomplished" name="accomplished" type="checkbox" bind:checked={accomplished} />
		<label for="accomplished">Logrado</label>
	</div>

	<div>
		<label for="difficultyLevel" class="mb-1 block">Dificultad percibida</label>
		<select
			id="difficultyLevel"
			name="difficultyLevel"
			bind:value={difficultyLevel}
			required
			class="border px-2 py-1"
		>
			{#each Array.from({ length: 10 }, (_, i) => i + 1) as n}
				<option value={n}>{n}</option>
			{/each}
		</select>
	</div>

	<button type="submit" formaction="?/createGrade" class="border px-3 py-1">Publicar Grado</button>
</form>
