<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>Dashboard</h1>
<p>Sesión: {page.data.user.email} · Rol: {page.data.role}</p>
<form method="POST" action="/logout"><button>Salir</button></form>

<a href={`/area`}> Ver Áreas </a>
