<script lang="ts">
	import '$lib/styles/profile.css';
	import logo from '$lib/assets/smallLogo.png';
	import fullLogo from '$lib/assets/aeLogo.png';
	export let data: {
		items: {
			id: string;
			email: string;
			username: string;
			climbingLevelSport: number;
			climbingLevelNoRope: number;
			climbingLevelTrad: number;
			age: number;
			createdAt: string;
			updatedAt?: string | null;
			deletedAt?: string | null;
		}[];
		page: number;
		role: string;
		status: string;
	};

	export let form: { message?: string; success?: boolean } | undefined;
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
					<li><a class="menu__item" href="/profile/{data.items[0].id}">Mi Perfil</a></li>
				</ul>
			</nav>
		</header>
	</section>

	<main>
		<section class="main">
			<section class="main__title-container">
				<section class="main__parent-description">
					<h1 class="main-title">Perfil</h1>
					<p class="main__profile-info">Nombre de usuario: {data.items[0].username}</p>
					<p class="main__profile-info">Email registrado: {data.items[0].email}</p>
					<p class="main__profile-info">
						Nivel de Escalada Deportiva: {data.items[0].climbingLevelSport}
					</p>
					<p class="main__profile-info">
						Nivel de Escalada Sin Cuerda: {data.items[0].climbingLevelNoRope}
					</p>
					<p class="main__profile-info">
						Nivel de Escalada Tradicional: {data.items[0].climbingLevelTrad}
					</p>
				</section>
			</section>
			{#if form?.message}
				<p
					class="mb-3 rounded border p-2 {form.success
						? 'border-green-400 bg-green-50'
						: 'border-red-400 bg-red-50'}"
				>
					{form.message}
				</p>
			{/if}
		</section>
	</main>
	<footer class="footer">
		<img class="smallLogo" alt="logo" src={fullLogo} />

		<section class="footer__links">
			<a href="/dashboard">Inicio</a>
			<a href="/area">Áreas</a>
			<a href="/profile/{data.items[0].id}">Mi Perfil</a>
			<!--TODO: Add This Pages-->
			<a href="/contact">Contacto</a>
		</section>
		<p class="footer__text">
			© {new Date().getFullYear()} Urqu Ascents
		</p>
	</footer>
</section>
