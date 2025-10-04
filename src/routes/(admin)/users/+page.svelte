<script lang="ts">
	export let data: {
		items: Array<{
			id: string;
			email: string;
			role: 'user' | 'admin';
			status: 'active' | 'suspended' | 'deleted';
			createdAt: string;
			updatedAt?: string | null;
			deletedAt?: string | null;
		}>;
		page: number;
		role: string;
		status: string;
	};

	// SvelteKit inyecta `form` con el resultado de la última acción (si hubo error con fail)
	export let form: { message?: string } | undefined;
</script>

<h1 class="mb-4 text-xl">Usuarios</h1>

{#if form?.message}
	<p class="mb-3 rounded border border-red-400 bg-red-50 p-2">{form.message}</p>
{/if}

<form method="GET" class="mb-4 flex items-center gap-2">
	<label
		>Rol:
		<select name="role" class="border p-1">
			<option value="all" selected={data.role === 'all'}>Todos</option>
			<option value="user" selected={data.role === 'user'}>user</option>
			<option value="admin" selected={data.role === 'admin'}>admin</option>
		</select>
	</label>
	<label
		>Estado:
		<select name="status" class="border p-1">
			<option value="active" selected={data.status === 'active'}>active</option>
			<option value="suspended" selected={data.status === 'suspended'}>suspended</option>
			<option value="deleted" selected={data.status === 'deleted'}>deleted</option>
		</select>
	</label>
	<button class="border px-2 py-1">Filtrar</button>
</form>

<table class="w-full border-collapse">
	<thead>
		<tr>
			<th class="border p-2 text-left">Email</th>
			<th class="border p-2">Rol</th>
			<th class="border p-2">Estado</th>
			<th class="border p-2">Acciones</th>
		</tr>
	</thead>
	<tbody>
		{#each data.items as u}
			<tr>
				<td class="border p-2">{u.email}</td>
				<td class="border p-2">{u.role}</td>
				<td class="border p-2">{u.status}</td>
				<td class="border p-2">
					<!-- Cambiar rol -->
					<form method="POST" class="inline">
						<input type="hidden" name="id" value={u.id} />
						<select name="role" class="border p-1">
							<option value="user" selected={u.role === 'user'}>user</option>
							<option value="admin" selected={u.role === 'admin'}>admin</option>
						</select>
						<button formaction="?/setRole" class="ml-1 border px-2 py-1">Guardar</button>
					</form>

					<!-- Suspender / Reanudar -->
					{#if u.status === 'active'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={u.id} />
							<button formaction="?/suspend" class="border px-2 py-1">Suspender</button>
						</form>
					{:else if u.status === 'suspended'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={u.id} />
							<button formaction="?/resume" class="border px-2 py-1">Reactivar</button>
						</form>
					{/if}

					<!-- Borrar (soft) / Restaurar -->
					{#if u.status !== 'deleted'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={u.id} />
							<button formaction="?/softDelete" class="border px-2 py-1">Borrar</button>
						</form>
					{:else}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={u.id} />
							<button formaction="?/restore" class="border px-2 py-1">Restaurar</button>
						</form>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
