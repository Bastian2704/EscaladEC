<script lang="ts">
	export let data: { user: { email: string; role: string } };
</script>

<h1>Dashboard</h1>
<p>Sesión: {data.user.email} · Rol: {data.user.role}</p>
<form method="POST" action="/logout"><button>Salir</button></form>
