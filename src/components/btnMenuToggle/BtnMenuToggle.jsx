'use client';
import clsx from 'clsx';
import styles from './btnMenuToggle.module.scss';
import { FaBarsStaggered } from 'react-icons/fa6';
import { useGlobalData } from '@/hooks/useGlobalData';

export default function BtnMenuToggle() {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	return <FaBarsStaggered size={20} color={'#333'} className={clsx(styles.btnMenuToggle)} onClick={() => setMenuOpen(!MenuOpen)} />;
}
