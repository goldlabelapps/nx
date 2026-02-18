// Converts a unix epoch (ms) to a human-readable date string
// Example: makeTime(1771381403123) => "Wed 18th Feb 2026, 11:23am and 23s"

export function makeTime(epoch: number): string {
    const d = new Date(epoch);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = days[d.getDay()];
    const date = d.getDate();
    const dateSuffix = (n: number) => {
        if (n > 3 && n < 21) return 'th';
        switch (n % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };
    const month = months[d.getMonth()];
    const year = String(d.getFullYear());
    let hour = d.getHours();
    const ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    if (hour === 0) hour = 12;
    const min = d.getMinutes().toString().padStart(2, '0');
    const sec = d.getSeconds();
    return `${day} ${date}${dateSuffix(date)} ${month} ${year}, ${hour}:${min}${ampm} and ${sec}s`;
}