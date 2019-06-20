export function minutesToHours(min: number): string {
    const minutes = min % 60;

    return `${(min - minutes) / 60} ч. ${minutes} мин`;
}
