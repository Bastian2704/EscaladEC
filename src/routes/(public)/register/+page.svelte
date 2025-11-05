<script lang="ts">
	export let form: any;
</script>

<h1>Crear cuenta</h1>
<form method="POST">
	<label>Email <input name="email" type="email" required /></label>
	<label>Password <input name="password" type="password" minlength="8" required /></label>
	<label>Username <input name="username" type="username" required /></label>
	<label>Age <input name="age" type="age" required /></label>
	{#if form?.message}<p>{form.message}</p>{/if}
	<button type="submit">Registrarme</button>
</form>
