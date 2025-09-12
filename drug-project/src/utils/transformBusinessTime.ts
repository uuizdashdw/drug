/**
 * @param time 예: 800, 2200
 * @returns "오전 08:00", "오후 10:00"
 */
export const formatDutyTime = (time: number): string => {
    if (!time && time !== 0) return '-';

    // 네 자리 문자열로 변환 (0800, 2200)
    const str = time.toString().padStart(4, '0');
    const hour = parseInt(str.slice(0, 2), 10);
    const minute = parseInt(str.slice(2, 4), 10);

    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${period} ${displayHour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;
};
