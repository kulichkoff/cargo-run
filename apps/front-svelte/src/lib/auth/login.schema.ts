import * as v from 'valibot';

export const LoginSchema = v.object({
	username: v.pipe(v.string(), v.nonEmpty('validation_required_field')),
	password: v.pipe(v.string(), v.nonEmpty('validation_required_field'))
});

export type LoginDTO = v.InferOutput<typeof LoginSchema>;
