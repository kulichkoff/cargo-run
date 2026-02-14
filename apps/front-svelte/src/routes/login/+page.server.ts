import { fail, message, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { LoginSchema } from '$lib/auth';

export const load = async () => {
	const form = await superValidate(valibot(LoginSchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, valibot(LoginSchema));
		console.log(form);

		if (!form.valid) {
			// Return { form } and things will just work.
			return fail(400, { form });
		}

		return message(form, 'Login successful!');
	}
};
