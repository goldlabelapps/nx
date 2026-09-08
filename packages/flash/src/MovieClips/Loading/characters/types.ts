export type CharacterName =
  | 'biker'
  | 'chix'
  | 'dapper'
  | 'hippy'
  | 'hipster'
  | 'mumma'
  | 'punk'
  | 'rasta'
  | 'rocker';

export const CHARACTER_NAMES: CharacterName[] = [
  'biker',
  'chix',
  'dapper',
  'hippy',
  'hipster',
  'mumma',
  'punk',
  'rasta',
  'rocker',
];

export interface CharacterAvatarProps extends React.SVGProps<SVGSVGElement> {
  name: CharacterName;
  size?: number | string;
  badge?: boolean;
  glowColor?: string;
}
