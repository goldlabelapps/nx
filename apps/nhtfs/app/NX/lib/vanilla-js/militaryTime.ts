// Returns military time (HH:mm) from a unix epoch (Date.now())

export function militaryTime(
    unixepoch: number,
) {
    const date = new Date(unixepoch);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
