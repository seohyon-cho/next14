import clsx from 'clsx';
import styles from './youtubeCard.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useCustomText } from '@/hooks/useText';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';

export default function YoutubeCard({ data, isPriority, isPrefetch }) {
	const shortenText = useCustomText('short');
	const customText = useCustomText('combined');
	const [date, time] = data.snippet.publishedAt.split('T');
	return (
		<article className={clsx(styles.youtubeCard)}>
			<h2>{shortenText(data.snippet.title, 45)}</h2>
			<div className={clsx(styles.pic)}>
				<Link href={`/youtube/${data.id}`} prefetch={isPrefetch}>
					<Image
						src={data.snippet.thumbnails.standard.url}
						alt={data.snippet.title}
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						priority={isPriority}
					/>
				</Link>
			</div>
			<div className={clsx(styles.txt)}>
				<span>{customText(date, '.')}</span>
				<p>{shortenText(data.snippet.description, 160)}</p>
			</div>
			<Link href={`/youtube/${data.id}`} prefetch={isPrefetch}>
				<div className={clsx(styles.btnDetail)}>
					<span>
						<FaArrowRightLong className={clsx(styles.icon)} />
						<IoSearch className={clsx(styles.icon2)} />
					</span>
					<p>Learn more</p>
				</div>
			</Link>
		</article>
	);
}
