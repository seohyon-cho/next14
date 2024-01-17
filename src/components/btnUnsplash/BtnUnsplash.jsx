'use client';
import clsx from 'clsx';
import styles from './btnUnsplash.module.scss';
import { useGlobalData } from '@/hooks/useGlobalData';

export default function BtnUnsplash() {
	const { setImgPanelOpen } = useGlobalData();
	return (
		<span className={clsx(styles.btnUnsplash)} onClick={() => setImgPanelOpen(true)}>
			추천 이미지
		</span>
	);
}
