'use client';
import clsx from 'clsx';
import styles from './flickr.module.scss';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useGlobalData } from '@/hooks/useGlobalData';

export default function Flickr() {
	const inputEl = useRef(null);

	const { ImgPanelOpen, setImgPanelOpen, setImgUrl } = useGlobalData();
	const [Pics, setPics] = useState([]);

	const fetchFlickr = async opt => {
		const num = 18;
		const flickr_api = process.env.NEXT_PUBLIC_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		let url = '';
		if (opt.type === 'interest') url = `${baseURL}${method_interest}`;
		if (opt.type === 'search') url = `${baseURL}${method_search}&tags=${opt.tag}`;
		const data = await fetch(url);
		const response = await data.json();
		setPics(response.photos.photo);
	};

	const handleSearch = e => {
		e.preventDefault();
		const tag = inputEl.current.value.trim();
		if (!tag) return;
		fetchFlickr({ type: 'search', tag: tag });
	};

	useEffect(() => {
		fetchFlickr({ type: 'interest' });
	}, []);

	return (
		<>
			{ImgPanelOpen && (
				<aside className={clsx(styles.unsplash)}>
					<h1>Unsplash</h1>
					<button onClick={() => setImgPanelOpen(false)}>close</button>

					<div>
						<input type='text' placeholder='search' ref={inputEl} />
						<button onClick={handleSearch}>search</button>
					</div>

					<div>
						{Pics.map((pic, idx) => {
							return (
								<p key={pic.id}>
									<Image
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
										alt={pic.title}
										priority
										fill
										onClick={() => {
											setImgUrl(`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`);
										}}
									/>
								</p>
							);
						})}
					</div>
				</aside>
			)}
		</>
	);
}
