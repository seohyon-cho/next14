import clsx from 'clsx';
import styles from './youtubeCard.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useCustomText } from '@/hooks/useText';

export default function YoutubeCard({ data, isPriority }) {
	const shortenText = useCustomText('short');
	const customText = useCustomText('combined');
	const [date, time] = data.snippet.publishedAt.split('T');

	return (
		<article className={clsx(styles.youtubeCard)}>
			<div className={styles.pic}>
				<Link href={`/detail/${data.id}`}>
					{isPriority ? (
						<Image
							src={data.snippet.thumbnails.standard.url}
							alt={data.snippet.title}
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw,33vw'
							priority
						/>
					) : (
						<Image
							src={data.snippet.thumbnails.standard.url}
							alt={data.snippet.title}
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw,33vw'
						/>
					)}
				</Link>
			</div>
			<h2>{shortenText(data.snippet.title, 50)}</h2>
			<div className={styles.txt}>
				<p>{shortenText(data.snippet.description, 250)}</p>
				<div className={styles.infoBox}>
					<span>{customText(date, '.')}</span>
				</div>
			</div>
		</article>
	);
}
