'use client';
import clsx from 'clsx';
import styles from './inputImage.module.scss';
import { useGlobalData } from '@/hooks/useGlobalData';
import Flickr from '../flickr/Flickr';
import { useEffect } from 'react';
import ImageUploader from '@/components/uploadImage/UploadImage';

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
				//ImgUrl(Flickr Panel에서 전달받는 값: 처음 포스트 작성시: Post> Write)
				//data.img (이미작성된 상세페이지 데이터로 부터 전달 받는값: Post> Edit)
				//ImgUrl값이 없으면 수정모드일 때이므로 data.img를 활용
				//ImgUrl값이 있으면 처음 글 작성모드일 때이므로 ImgUrl을 활용
				//삼항연산자의 조건을 data가 아닌 ImgUrl쓰는 이유
				//ImgUrl은 있을수도 있고 없을수도 있는 값이지만 (글쓰기모드, 수정모드)
				//data같은 경우는 수정모드일때 무조건 있는 값이기 때문에 ImgUrl을 쓸수조차 없음
				//data?를 붙인이유 : 글작성모드일때는 data자체가 없으므로 구문에러를 피하기 위함
				//data?.img || ''를 쓴 이유 : 수정모드일때 data모델객체 안에 title,desc는 있지만 img에는 값이 없을 수도 있기 떄문

				value={ImgUrl ? ImgUrl : data?.img || ''}
				name='img'
				id='img'
				onChange={e => setImgUrl(e.target.value)}
			/>
			<div className={clsx(styles.attachImg)}>
				<p onClick={() => setImgPanelOpen(true)}>
					<span>Recommend Image</span>
				</p>
				<ImageUploader />
			</div>
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
