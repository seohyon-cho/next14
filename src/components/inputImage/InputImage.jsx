'use client';

import { useGlobalData } from '@/hooks/useGlobalData';
import Flickr from '../flickr/Flickr';
import { useEffect } from 'react';

export default function InputImage({ data }) {
	const { ImgUrl, setImgUrl, setImgPanelOpen } = useGlobalData();

	useEffect(() => {
		setImgUrl('');
	}, [setImgUrl]);

	return (
		<>
			<input
				type='text'
				placeholder='image URL'
				value={ImgUrl !== '' ? ImgUrl : data?.img || ''}
				name='img'
				onChange={e => setImgUrl(e.target.value)}
			/>
			<span onClick={() => setImgPanelOpen(true)}>추천 이미지</span>
			<Flickr />
		</>
	);
}
