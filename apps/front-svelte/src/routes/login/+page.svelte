<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { LoginSchema, type LoginDTO } from '$lib/auth';
	import { Input } from '$lib/shared/ui';

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

<div class="flex min-h-full flex-col items-center justify-center px-8 py-12 lg:px-12">
	<form method="POST" use:enhance class="grid w-xl max-w-full gap-4">
    <h1 class="text-2xl font-bold">Login</h1>
		<Input label="Username" name="username" type="text" bind:value={$form.username} {errors} />
		<Input label="Password" name="password" type="password" bind:value={$form.password} {errors} />
		<button type="submit">Login</button>
	</form>
</div>
