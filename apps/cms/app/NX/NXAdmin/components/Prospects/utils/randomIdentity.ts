const pick = <T,>(items: readonly T[]): T => {
    return items[Math.floor(Math.random() * items.length)];
};

export const identityCharacters = [
    'biker',
    'chix',
    'dapper',
    'hippy',
    'hipster',
    'mumma',
    'punk',
    'rasta',
    'rocker',
] as const;

export type T_IdentityCharacter = (typeof identityCharacters)[number];

const namePrefixes = [
    'Amber',
    'Atlas',
    'Blaze',
    'Cinder',
    'Echo',
    'Ivy',
    'Jade',
    'Nova',
    'Pixel',
    'River',
    'Sky',
    'Zion',
] as const;

const nameSuffixes = [
    'Aurora',
    'Drift',
    'Forge',
    'Glyph',
    'Harbor',
    'Marble',
    'Signal',
    'Stone',
    'Vale',
    'Wave',
] as const;

export const randomIdentityProfile = () => {
    const first = pick(namePrefixes);
    const second = pick(nameSuffixes);

    return {
        name: `${first} ${second}`,
        character: pick(identityCharacters),
    };
};