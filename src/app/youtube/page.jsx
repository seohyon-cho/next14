import clsx from 'clsx';
import styles from './youtube.module.scss';
import { useCustomText } from '@/hooks/useText';
import Link from 'next/link';
import Image from 'next/image';

async function fetchYoutube() {
	const api_key = 'AIzaSyDwxSLXdnfN8bTNC5fnycohdatm0Qk4dLM';
	const pid = 'PLIenA9X9sYejBz8kBsdDV-BbZTeDJeTEH';
	const num = 10;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

	const data = await fetch(baseURL);
	const resultData = await data.json();
	return resultData;
}

export default async function Youtube() {
	const shortenText = useCustomText('short');
	const customText = useCustomText('combined');
	const data = await fetchYoutube();
	return (
		<section className={clsx(styles.youtube)}>
			<h1>Youtube</h1>
			{data.items.map((data, idx) => {
				const [date, time] = data.snippet.publishedAt.split('T');

				return (
					<article key={data.id}>
						<h2>{shortenText(data.snippet.title, 50)}</h2>

						<div className={styles.txt}>
							<p>{shortenText(data.snippet.description, 250)}</p>
							<div className={styles.infoBox}>
								<span>{customText(date, '.')}</span>
								<em>{time.split('Z')[0]}</em>
							</div>
						</div>

						<div className={styles.pic}>
							<Link href={`/detail/${data.id}`}>
								{/* 외부 이미지 연결 시, next.config.js 파일에 이미지 protocol 과 hostname 을 등록하고, <Image /> 컴포넌트에 fill, sizes, priority 속성 부여를 해야 함.  */}
								{/* fill 속성 적용 시, 무조건 부모 요소에 position 값 (relative, absolute, fixed 중 하나) 이 무조건 설정되어 있어야 함.  */}
								<Image
									src={data.snippet.thumbnails.standard.url}
									alt={data.snippet.title}
									fill
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw,33vw'
								/>
							</Link>
						</div>
					</article>
				);
			})}
		</section>
	);
}
