
<script lang="ts">
	import '$lib/styles/users.css'
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

	export let form: { message?: string } | undefined;
</script>

<h1>Usuarios</h1>

{#if form?.message}
	<p>{form.message}</p>
{/if}

<form method="GET">
	<label
		>Rol:
		<select name="role">
			<option value="all" selected={data.role === 'all'}>Todos</option>
			<option value="user" selected={data.role === 'user'}>user</option>
			<option value="admin" selected={data.role === 'admin'}>admin</option>
		</select>
	</label>
	<label
		>Estado:
		<select name="status">
			<option value="active" selected={data.status === 'active'}>active</option>
			<option value="suspended" selected={data.status === 'suspended'}>suspended</option>
			<option value="deleted" selected={data.status === 'deleted'}>deleted</option>
		</select>
	</label>
	<button>Filtrar</button> <!--TODO: Button not filtering with Status and Role, only with role-->
</form>

<table>
	<thead>
		<tr>
			<th>Email</th>
			<th>Rol</th>
			<th>Estado</th>
			<th>Acciones</th>
		</tr>
	</thead>
	<tbody class="custom-table">
		{#each data.items as u}
			<tr class="custom-row">
				<td class="custom-row">{u.email} </td>
				<td class="custom-row">{u.role} </td>
				<td class="custom-row">{u.status}</td>
				<td class="custom-row-actions">
					<!-- Rol change -->
					<form method="POST">
						<input type="hidden" name="id" value={u.id} />
						<select name="role">
							<option value="user" selected={u.role === 'user'}>user</option>
							<option value="admin" selected={u.role === 'admin'}>admin</option>
						</select>
						<button formaction="?/setRole" class="custom-button">
							<p class="button-text">Guardar</p>
						</button>
					</form>

					<!-- Suspend / Activate -->
					{#if u.status === 'active'}
						<form method="POST">
							<input type="hidden" name="id" value={u.id} />
							<button formaction="?/suspend" class="custom-button">
								<p class="button-text">Suspender</p>
							</button>
						</form>
					{:else if u.status === 'suspended'}
						<form method="POST">
							<input type="hidden" name="id" value={u.id} />
							<button formaction="?/resume" class="custom-button">
								<p class="button-text">Reactivar</p>
							</button>
						</form>
					{/if}

					<!-- Delete (soft) / Restore -->
					{#if u.status !== 'deleted'}
						<form method="POST">
							<input type="hidden" name="id" value={u.id} />
							<button formaction="?/softDelete" class="custom-button">
								<p class="button-text">Borrar</p>
							</button>
						</form>
					{:else}
						<form method="POST">
							<input type="hidden" name="id" value={u.id} />
							<button formaction="?/restore">
								<p class="button-text">Restaurar</p>
							</button>
						</form>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
