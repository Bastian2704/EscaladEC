<script lang="ts">
	import { type Status } from '$lib/contants/constants';

	export let data: {
		items: Array<{
			id: string;
			areaId: string;
			sectorId: string;
            climbId: string;
            //select
			gradeSystem: string;
            //options acording to select of GradeSystem
			value: number;
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
	};

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
            <!--Sistema de grado -> Select
                Valor relacionado a Sistema de Grado -> Select
                Logrado -> boolean
                Nivel de dificultad -> select (1-5)
            -->
			<th class="border p-2 text-left">Sistema de grado</th>
			<th class="border p-2 text-left">Valor</th>
			<th class="border p-2">Logrado</th>
			<th class="border p-2">Nivel de dificultad percibido</th>

			<th class="border p-2">Acciones</th>
		</tr>
	</thead>
	<tbody>
		{#each data.items as grade}
			<tr>
				<td class="border p-2">{grade.gradeSystem}</td>
				<td class="border p-2">{grade.value}</td>
				<td class="border p-2">{grade.accomplished}</td>
				<td class="border p-2">{grade.difficultyLevel}</td>
				<td class="border p-2">
					<a href={`grade/${grade.id}/edit`}> Editar </a>
					<form method="POST" class="inline">
						<input type="hidden" name="id" value={grade.id} />
					</form>

					{#if grade.status === 'active'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={grade.id} />
							<button formaction="?/suspend" class="border px-2 py-1">Suspender</button>
						</form>
					{:else if grade.status === 'suspended'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={grade.id} />
							<button formaction="?/resume" class="border px-2 py-1">Reactivar</button>
						</form>
					{/if}

					{#if grade.status !== 'deleted'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={grade.id} />
							<button formaction="?/softDelete" class="border px-2 py-1">Borrar</button>
						</form>
					{:else}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={grade.id} />
							<button formaction="?/restore" class="border px-2 py-1">Restaurar</button>
						</form>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<form method="POST" enctype="multipart/form-data">
	<h2>Crear nuevo grade</h2>
	<br />

	<label for="gradeSystem">Sistema de grado:</label>
	<input type="text" name="gradeSystem" id="gradeSystem" required />

	<br />

	<label for="value">Valor:</label>
	<input type="number" name="value" id="value" required />

	<br />

	<label for="accomplished">Logrado:</label>
	<input type="boolean" name="accomplished" id="accomplished" required />

	<br />

    <label for="difficultyLevel">Nivel de dificultad percibido:</label>
	<input type="number" name="difficultyLevel" id="difficultyLevel" required />

	<br />

	<button type="submit" formaction="?/createGrade">Publicar Grado</button>
</form>
