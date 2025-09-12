import { BusinessHourProps } from '@/types/pharmacy';
import { formatDutyTime } from '@/utils/transformBusinessTime';

export default function BusinessHour({ pharmacy }: BusinessHourProps) {
    const dayMap: Record<number, string> = {
        1: '월요일',
        2: '화요일',
        3: '수요일',
        4: '목요일',
        5: '금요일',
        6: '토요일',
        7: '일요일',
        8: '공휴일',
    };
    return (
        <section className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">영업 시간</h2>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((day) => {
                const start = pharmacy[`dutyTime${day}s` as keyof typeof pharmacy] as
                    | number
                    | undefined;
                const end = pharmacy[`dutyTime${day}c` as keyof typeof pharmacy] as
                    | number
                    | undefined;
                return (
                    <p key={day} className="mb-1">
                        <strong className={day > 5 ? 'text-red-500' : ''}>{dayMap[day]}</strong>{' '}
                        <b>: </b>
                        {start && end
                            ? `${formatDutyTime(start)} ~ ${formatDutyTime(end)}`
                            : '휴무'}
                    </p>
                );
            })}
        </section>
    );
}
