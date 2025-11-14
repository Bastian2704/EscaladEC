<script lang="ts">
	import { type Status } from '$lib/contants/constants';
	import logo from '$lib/assets/smallLogo.png';
	import fullLogo from '$lib/assets/aeLogo.png';
	import { page } from '$app/state';
	import '$lib/styles/sector.css';

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
		climbInfo: {
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
		}[];
		areaId: string;
		sectorId: string;
		page: number;
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

	let messageVisible = false;

	let showForm = false;

	function toggleForm() {
		showForm = !showForm;
	}
	$: if (form?.message) {
		messageVisible = true;
		setTimeout(() => {
			messageVisible = false;
		}, 3000);
	}
</script>

<section class="background">
	<section class="header__container">
		<header class="header">
			<section class="header__logo-container">
				<img class="logo" alt="logo" src={logo} />
				<h1 class="header-text">Urqu Ascents</h1>
			</section>
			<nav class="menu">
				<ul class="menu__list header-text">
					<li><a class="menu__item" href="/dashboard">Menú Principal</a></li>
					<li><a class="menu__item" href="/area">Áreas</a></li>
					<!--Add Navigation to User Profile -->
					<li><a class="menu__item" href="/area">Mi Perfil</a></li>
				</ul>
			</nav>
		</header>
	</section>

	<main>
		<section class="main">
			<section class="main__parent-description">
				<h2 class="main__subtitle">{data.climbInfo[0].name}</h2>
				<p class="main__area-info">{data.climbInfo[0].category}-{data.climbInfo[0].climbType}</p>
				<p class="main__area-info">{data.climbInfo[0].requiredEquipment}</p>
			</section>
			<section class="main__title-container">
				<section class="main__title-left-container">
					<a class="main__title button" href={`/area/${data.areaId}/sector/${data.sectorId}/climb`}
						>←</a
					>
					<h1 class="main__title">Grades</h1>
				</section>
				<button class="main__title-create" on:click={toggleForm}>
					{showForm ? '×' : '+'}
				</button>
			</section>
			<!-- Check-->

			{#if form?.message}
				<p
					class="mb-3 rounded border p-2 {form.success
						? 'border-green-400 bg-green-50'
						: 'border-red-400 bg-red-50'}"
				>
					{form.message}
				</p>
			{/if}

			<button formaction="">Filtros</button>

			<!--TODO: ADD FILTERS-->

			<table class="main__table">
				<thead class="main__table-head">
					<tr>
						<th class="main__table-item">Sistema de grado</th>
						<th class="main__table-item">Valor</th>
						<th class="main__table-item">Logrado</th>
						<th class="main__table-item">Dificultad percibida (1-10)</th>
						<!--TODO: Verify if this is neccessary
						<th class="main__table-item">Acciones</th>
						-->
					</tr>
				</thead>
				<tbody class="main__table-tbody">
					{#each data.items as grade}
						<tr
							class="main__table-body"
							on:click={() => (window.location.href = `grade/${grade.id}/edit`)}
						>
							<td class="main__table-td">{grade.gradeSystem}</td>
							<td class="main__table-td">{grade.value}</td>
							<td class="main__table-td">{grade.accomplished ? '✅' : '❌'}</td>
							<td class="main__table-td">{grade.difficultyLevel}</td>
							{#if page.data.role == 'admin'}
							<td on:click|stopPropagation>

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
							{/if}
							<td class="main__table-td-arrow">Editar →</td>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if showForm}
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
							<select
								id="value"
								name="value"
								bind:value={formValue}
								required
								class="border px-2 py-1"
							>
								{#each valuesForSystem as v}
									<option value={v}>{v}</option>
								{/each}
							</select>
						{:else}
							<input
								id="value"
								name="value"
								class="border bg-gray-100 px-2 py-1"
								value=""
								disabled
							/>
						{/if}
					</div>

					<div class="flex items-center gap-2">
						<input
							id="accomplished"
							name="accomplished"
							type="checkbox"
							bind:checked={accomplished}
						/>
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

					<button type="submit" formaction="?/createGrade" class="border px-3 py-1"
						>Publicar Grado</button
					>
				</form>
			{/if}
		</section>
	</main>
	<footer class="footer">
		<img class="smallLogo" alt="logo" src={fullLogo} />

		<section class="footer__links">
			<a href="/dashboard">Inicio</a>
			<a href="/area">Áreas</a>
			<!--TODO: Add This Pages-->
			<a href="/profile">Mi Perfil</a>
			<a href="/contact">Contacto</a>
		</section>
		<p class="footer__text">
			© {new Date().getFullYear()} Urqu Ascents
		</p>
	</footer>
</section>
