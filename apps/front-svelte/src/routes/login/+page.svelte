<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { LoginSchema, type LoginDTO } from '$lib/auth';
	import { Input } from '$lib/shared/ui';
	import * as m from '$lib/paraglide/messages';

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
		<h1 class="text-2xl font-bold">{m.login_title()}</h1>
		<Input
			label={m.login_username()}
			name="username"
			type="text"
			bind:value={$form.username}
			{errors}
		/>
		<Input
			label={m.login_password()}
			name="password"
			type="password"
			bind:value={$form.password}
			{errors}
		/>
		<button type="submit">{m.login_login()}</button>
	</form>
</div>
