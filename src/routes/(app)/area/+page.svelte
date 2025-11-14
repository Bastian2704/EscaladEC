<script lang="ts">
	import { provinces, type Status } from '$lib/contants/constants';
	import logo from '$lib/assets/smallLogo.png';
	import fullLogo from '$lib/assets/aeLogo.png'
	import '$lib/styles/area.css';

	let messageVisible = false;

	export let data: {
		items: Array<{
			id: string;
			name: string;
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
			<section class="main__title-container">
				<h1 class="main-title">Areas</h1>
				<button class="main__title-create" on:click={toggleForm}>
					{showForm ? '×' : '+'}
				</button>
			</section>
			<!-- Check-->

			{#if form?.message && messageVisible}
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
						<th class="main__table-item">Nombre</th>
						<th class="main__table-item">Provincia</th>
						<th class="main__table-item">Ciudad</th>
						<th class="main__table-item">Descripción</th>
						<th class="main__table-item">Latitud</th>
						<th class="main__table-item">Longitud</th>
						<!--TODO: Show only if admin
						<th class="main__table-item">Acciones</th>
						-->
					</tr>
				</thead>
				<tbody class="main__table-tbody">
					{#each data.items as area}
						<tr
							class="main__table-body"
							on:click={() => (window.location.href = `/area/${area.id}/sector`)}
						>
							<td class="main__table-td">{area.name}</td>
							<td class="main__table-td">{area.province}</td>
							<td class="main__table-td">{area.city}</td>
							<td class="main__table-td">{area.description}</td>
							<td class="main__table-td">{area.latitude}</td>
							<td class="main__table-td">{area.longitude}</td>
							<td>→</td>
							<!--TODO: Show only if admin

							<td>
								<a href={`/area/${area.id}/edit`}> Editar </a>
								<form method="POST" class="inline">
									<input type="hidden" name="id" value={area.id} />
									<select name="role" class="border p-1">
										{#each provinces as province}
											<option value={province} selected={province === province}>{province}</option>
										{/each}
									</select> 
									TODO: THIS AIN'T WORKING
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
													-->
						</tr>
					{/each}
				</tbody>
			</table>

			{#if showForm}
				<form method="POST" enctype="multipart/form-data">
					<h1 class="main-title">Crear Nueva Area</h1>
					<br />
					<label for="name">Nombre:</label>
					<input type="text" name="name" id="name" required />

					<br />
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
