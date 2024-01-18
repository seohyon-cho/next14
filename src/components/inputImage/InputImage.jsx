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

/*
	추천 Flickr 이미지 URL 등록 로직 흐름

	1. image URL이 담길 전역 state 추가 (useGlobalData.js)
	2. InputImage 컴포넌트 생성 (이미지 URL 등록할 input 요소, FlickrPanel 호출 버튼, FlickrPanel 컴포넌트)
	3. FlickrPanel 호출 버튼 클릭 시, flickrPanel 호출
	4. FlickrPanel 컴포넌트 마운트 시, Flickr data fetching 후, 썸네일 출력
	5. 출력된 썸네일에 클릭 이벤트 발생 시, 해당 img의 URL을 전역 state에 담아줌. 
	6. 부모 컴포넌트 InputImage의 input 요소에는 전역 state에 의해서, 클릭한 Flickr 썸네일 이미지의 URL 전달
	7. 상위 부모인 Page/write, Page/edit 컴포넌트에서, action 이벤트 발생 시 전달된 imgURL 값을 Post Model에 저장. 
*/
