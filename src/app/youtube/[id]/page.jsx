import clsx from 'clsx';
import styles from './detail.module.scss';
import Link from 'next/link';
import { useCustomText } from '@/hooks/useText';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { RiArrowGoBackFill } from 'react-icons/ri';
import Image from 'next/image';

async function fetchYoutubeById(id) {
	const api_key = process.env.NEXT_PUBLIC_YOUTUBE_API;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;
	const data = await fetch(baseURL);
	const json = await data.json();
	return json.items[0].snippet;
}

async function fetchYoutube() {
	const api_key = process.env.NEXT_PUBLIC_YOUTUBE_API;
	const pid = 'PLYOPkdUKSFgUJeKpDIbI0H1wwgQO-hCZF';
	const num = 3;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
	const data = await fetch(baseURL);
	const resultData = await data.json();
	return resultData;
}

export default async function Detail({ params }) {
	const { id } = params;
	const dataById = await fetchYoutubeById(id);
	const dataByMain = await fetchYoutube();
	const [date, time] = dataById.publishedAt.split('T');
	const customText = useCustomText('combined');
	const shortenText = useCustomText('short');

	return (
		<section className={clsx(styles.detail)}>
			<Link href={`/youtube`}>
				<div className={clsx(styles.backBtn)}>
					<RiArrowGoBackFill />
				</div>
			</Link>
			<div className={clsx(styles.content)}>
				<article className={clsx(styles.left)}>
					<div className={clsx(styles.inner)}>
						<div className={clsx(styles.videoBox)}>
							<iframe src={`https://www.youtube.com/embed/${dataById.resourceId.videoId}`} title={dataById.title}></iframe>
						</div>
						<div className={clsx(styles.infoBox)}>
							<h3>{dataById.title}</h3>
							<span>{customText(date, '.')}</span>
							<p>{shortenText(dataById.description, 500)}</p>
						</div>
						<p>&copy; Blog.</p>
					</div>
				</article>
				<article className={clsx(styles.right)}>
					<div className={clsx(styles.inner)}>
						<h2>PEOPLE ARE WATCHING WITH ...</h2>
						{dataByMain.items.map((data, idx) => {
							return (
								<div className={clsx(styles.singleContent)}>
									<div className={clsx(styles.thumb)}>
										<Link href={`/youtube/${data.id}`}>
											<FaRegCirclePlay className={clsx(styles.playIcon)} />
											<Image className={clsx(styles.image)} src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} fill sizes='100%' />
										</Link>
									</div>
									<p>{data.snippet.title}</p>
								</div>
							);
						})}
					</div>
				</article>
			</div>
		</section>
	);
}
