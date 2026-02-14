<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { LoginSchema, type LoginDTO } from '$lib/auth';

	let { data }: { data: { form: SuperValidated<LoginDTO> } } = $props();
	const { form, errors, enhance } = superForm(data.form, {
		validators: valibotClient(LoginSchema)
	});

	function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		console.log(username, password);
	}
</script>

<form method="POST" use:enhance>
	<input type="text" name="username" bind:value={$form.username} />
	{#if $errors.username}
		<p>{$errors.username}</p>
	{/if}
	<input type="password" name="password" bind:value={$form.password} />
	{#if $errors.password}
		<p>{$errors.password}</p>
	{/if}
	<button type="submit">Login</button>
</form>
