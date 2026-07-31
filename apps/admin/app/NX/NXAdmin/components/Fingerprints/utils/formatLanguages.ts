const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });

export const formatLanguages = (languages: string[]): string => {
    const seen = new Set<string>();
    const result: string[] = [];

    for (const tag of languages) {
        const base = tag.split('-')[0].toLowerCase();
        if (seen.has(base)) continue;
        seen.add(base);

        try {
            const label = displayNames.of(base);
            if (label) result.push(label);
        } catch {
            result.push(base);
        }
    }

    return result.join(', ');
}