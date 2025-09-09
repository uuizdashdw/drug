/**
 * @params 예) 20090604
 * @returns 예) 2009.06.04
 */
export const tranformDateYYYYMMDD = (dateStr: string) => {
    if (!dateStr || dateStr.length !== 8) return dateStr ?? '';

    const year = parseInt(dateStr.slice(0, 4), 10);
    const month = parseInt(dateStr.slice(4, 6), 10) - 1; // JS는 0부터 시작
    const day = parseInt(dateStr.slice(6, 8), 10);

    const d = new Date(year, month, day);

    return d
        .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        .replace(/-/g, '.');
};
