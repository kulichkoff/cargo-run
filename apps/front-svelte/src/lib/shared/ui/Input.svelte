<script lang="ts" generics="T extends Record<string, unknown>">
	import type { SuperFormErrors } from 'sveltekit-superforms/client';

	let {
		label,
		name,
		type = 'text',
		placeholder,
		value = $bindable(''),
		errors
	}: {
		label: string;
		name: string;
		type?: string;
		placeholder?: string;
		value?: string;
		errors: SuperFormErrors<T>;
	} = $props();
</script>

<div class="sm:col-span-4">
	<label for={name} class="block text-sm font-medium text-foreground">{label}</label>
	<div class="mt-2">
		<div
			class="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
		>
			<input
				{type}
				id={name}
				{name}
				{placeholder}
				bind:value
				autocomplete="off"
				class="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-foreground placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
			/>
		</div>
	</div>
	<p class="mt-3 text-sm/6 text-danger">{$errors[name]}</p>
</div>
