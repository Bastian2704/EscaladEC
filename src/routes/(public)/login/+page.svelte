<script lang="ts">
	import logo from '$lib/assets/smallLogo.png';
	import '$lib/styles/login.css';
</script>

<section class="login-background">
	<section class="login-split">
		<!-- Lado izquierdo: logo y nombre -->
		<div class="login-left">
			<img class="logo-left" src={logo} alt="logo Urqu Ascents" />
			<h1 class="logo-text">Urqu Ascents</h1>
		</div>

		<!-- Lado derecho: login -->
		<div class="login-card">
			<h1 class="login-title">Iniciar sesión</h1>
			<p class="login-subtitle">Accede con tu cuenta institucional</p>

			<form method="POST" class="login-form">
				<input type="hidden" name="provider" value="keycloak" />
				<input type="hidden" name="redirectTo" value="/area" />
				<button type="submit" class="login-button">Continuar con Keycloak</button>
			</form>
		</div>
	</section>
</section>
