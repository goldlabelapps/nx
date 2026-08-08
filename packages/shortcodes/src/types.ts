export type ShortcodeScalar = string | number | boolean;

export type ShortcodeAttributes = Record<string, ShortcodeScalar>;

export interface ShortcodeMatch {
  name: string;
  attrs: ShortcodeAttributes;
  raw: string;
  index: number;
}

export interface ShortcodeBlockMatch extends ShortcodeMatch {
  content: string;
}

export interface ShortcodeTextNode {
  type: 'text';
  value: string;
}

export interface ShortcodeNode {
  type: 'shortcode';
  value: ShortcodeMatch;
}

export type ShortcodeToken = ShortcodeTextNode | ShortcodeNode;

export type ShortcodeResolver<T> = (match: ShortcodeMatch) => T;

export type ShortcodeResolverMap<T> = Record<string, ShortcodeResolver<T>>;
