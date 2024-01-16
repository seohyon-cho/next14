import { useRef } from 'react';
export const useThrottle = () => {
	const eventBlocker = useRef(null);

	// 해당 throttle 적용 함수가, 핸들러나 useEffect 안쪽에서 호출될 수 있으므로
	// throttling을 적용시켜주는 함수 자체를 리턴하도록 코드 구조 변경
	return (func, gap = 500) => {
		return () => {
			if (eventBlocker.current) return;
			eventBlocker.current = setTimeout(() => {
				func();
				eventBlocker.current = null;
			}, gap);
		};
	};
};
