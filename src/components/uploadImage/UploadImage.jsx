'use client';
const { UploadButton } = require('@/utils/uploadthing');

export default function ImageUploader() {
	return (
		<div>
			<UploadButton
				endpoint='imageUploader'
				onClientUploadComplete={res => {
					console.log('Files: ', res);
					alert('Upload Completed');
				}}
				onUploadError={error => {
					alert(`ERROR! ${error.message}`);
				}}
			/>
		</div>
	);
}
