import React from 'react';
import { CgSearchLoading } from 'react-icons/cg';

export default function Loading() {
	return (
		<section>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', width: '100%', height: '100vh' }}>
				<h1 style={{ fontSize: '1.6rem' }}>Loading for Youtube Page ...</h1>
				<span>
					<CgSearchLoading style={{ fontSize: '2.8rem' }} />
				</span>
			</div>
		</section>
	);
}
