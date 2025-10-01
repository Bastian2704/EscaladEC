<script lang="ts">
	export let data: { items: Array<{ id: string; name: string; grade: string; createdAt: string }> };
</script>

<h1>Rutas</h1>

<form method="POST">
	<input name="name" placeholder="Nombre" required />
	<input name="grade" placeholder="Grado (5.10b / 6b / V4)" required />
	<textarea name="description" placeholder="Descripción"></textarea>
	<button formaction="?/create">Crear</button>
</form>

<ul>
	{#each data.items as r}
		<li><a href={`/routes/${r.id}/edit`}>{r.name}</a> · {r.grade}</li>
	{/each}
</ul>
