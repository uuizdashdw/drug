/**
 * @params 예) "2021-01-29 00:00:00"
 * @returns 예) "2021.01.29"
 */
export const transformDateYYYYMMDD = (dateStr: string) => {
    if (!dateStr) return '';

    // "2021-01-29 00:00:00" → "2021-01-29"
    const dateOnly = dateStr.split(' ')[0];

    // "2021-01-29" → "2021.01.29"
    return dateOnly.replace(/-/g, '.');
};
