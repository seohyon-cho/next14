'use client';

import { useFormStatus } from 'react-dom';

export default function BtnSubmit() {
	const { pending } = useFormStatus();

	return (
		<button type='submit' disabled={pending}>
			{pending ? 'loading..' : 'write'}
		</button>
	);
}
