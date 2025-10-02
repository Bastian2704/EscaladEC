<script lang="ts">
	export let form: any;
</script>

<h1>Iniciar sesión</h1>
<form method="POST">
	<label>Email <input name="email" type="email" required /></label>
	<label>Password <input name="password" type="password" required /></label>
	{#if form?.message}<p>{form.message}</p>{/if}
	<button type="submit">Entrar</button>
</form>
