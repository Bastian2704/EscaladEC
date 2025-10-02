<script lang="ts">
	export let data: { item: { id: string; name: string; grade: string; description: string } };
</script>

<h1>Editar ruta</h1>
<form method="POST">
	<input name="name" value={data.item.name} required />
	<input name="grade" value={data.item.grade} required />
	<textarea name="description">{data.item.description}</textarea>
	<button formaction="?/save">Guardar</button>
	<button formaction="?/delete">Eliminar</button>
</form>
