export const identityCharacters = [
  "biker",
  "chix",
  "dapper",
  "hippy",
  "hipster",
  "mumma",
  "punk",
  "rasta",
  "rocker",
] as const;

export type VirusIdentityCharacter = (typeof identityCharacters)[number];

export type VirusRandomIdentity = {
  character: VirusIdentityCharacter;
  label: string;
  svg: string;
  name: string;
};

type IdentityProfile = {
  label: string;
  lead: string[];
  tail: string[];
};

const identityProfiles: Record<VirusIdentityCharacter, IdentityProfile> = {
  biker: {
    label: "Biker",
    lead: ["Chrome", "Dust", "Throttle", "Axle", "Rider", "Torque"],
    tail: ["Vega", "Rook", "Blaze", "Riot", "Vale", "Stone"],
  },
  chix: {
    label: "Chix",
    lead: ["Candy", "Nova", "Velvet", "Lola", "Cherry", "Disco"],
    tail: ["Star", "Bloom", "Fever", "Jet", "Dawn", "Muse"],
  },
  dapper: {
    label: "Dapper",
    lead: ["Sterling", "Marlow", "Velour", "Cinder", "Basil", "Crispin"],
    tail: ["Fox", "Monroe", "Locke", "Saint", "Vale", "Beau"],
  },
  hippy: {
    label: "Hippy",
    lead: ["Saffron", "River", "Clover", "Sage", "Lotus", "Willow"],
    tail: ["Skye", "Meadow", "Bloom", "Rain", "Echo", "Sun"],
  },
  hipster: {
    label: "Hipster",
    lead: ["Indie", "Polaroid", "Cedar", "Juniper", "Miso", "Pixel"],
    tail: ["North", "Ray", "Atlas", "Lane", "Lowe", "Quill"],
  },
  mumma: {
    label: "Mumma",
    lead: ["Honey", "Sunny", "Mabel", "Coco", "Peaches", "Ruby"],
    tail: ["Belle", "Joy", "Rose", "Dove", "Pearl", "Love"],
  },
  punk: {
    label: "Punk",
    lead: ["Static", "Razor", "Chaos", "Neon", "Spike", "Vandal"],
    tail: ["Hex", "Crash", "Zero", "Fang", "Riot", "Vice"],
  },
  rasta: {
    label: "Rasta",
    lead: ["Lion", "Zion", "Marley", "Irie", "Dread", "Mellow"],
    tail: ["Wave", "Soul", "Sun", "Groove", "Root", "Drift"],
  },
  rocker: {
    label: "Rocker",
    lead: ["Amp", "Vinyl", "Jett", "Slash", "Echo", "Reverb"],
    tail: ["Steel", "Storm", "Knox", "Crow", "Rush", "Flint"],
  },
};

const symbolPool = ["!", "@", "#", "$"] as const;
const fillerPool = ["x", "z", "q", "k"] as const;

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomItem = <T,>(items: readonly T[]): T => items[randomInt(0, items.length - 1)];

const toTitleCase = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

const applyLeetSubstitution = (value: string): string => {
  const map: Record<string, string> = {
    a: "@",
    e: "3",
    i: "1",
    o: "0",
    s: "$",
  };

  const matchIndex = value.toLowerCase().search(/[aeios]/);
  if (matchIndex < 0) return value;

  const sourceChar = value.charAt(matchIndex);
  const replacement = map[sourceChar.toLowerCase()];
  if (!replacement) return value;

  return `${value.slice(0, matchIndex)}${replacement}${value.slice(matchIndex + 1)}`;
};

const buildHumanPasswordName = (characterLabel: string, tail: string): string => {
  const styledLead = applyLeetSubstitution(toTitleCase(characterLabel));
  const styledTail = toTitleCase(tail);
  const symbol = randomItem(symbolPool);
  const digits = String(randomInt(10, 99));

  let name = `${styledLead}${styledTail}${symbol}${digits}`;

  while (name.length < 12) {
    name += randomItem(fillerPool);
  }

  return name;
};

export function randomIdentityProfile(character?: VirusIdentityCharacter): VirusRandomIdentity {
  const resolvedCharacter = character ?? randomItem(identityCharacters);
  const profile = identityProfiles[resolvedCharacter];
  const name = buildHumanPasswordName(profile.label, randomItem(profile.tail));

  return {
    character: resolvedCharacter,
    label: profile.label,
    svg: `/shared/svg/characters/${resolvedCharacter}.svg`,
    name,
  };
}

export function randomIdentity(character?: VirusIdentityCharacter): string {
  return randomIdentityProfile(character).name;
}
