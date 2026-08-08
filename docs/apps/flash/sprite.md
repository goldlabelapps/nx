<div>
    <h1 style="display: flex; align-items: center; gap: 4px;">
        <a href="https://goldlabel.pro" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center;">
        <img
            src="https://goldlabel.pro/favicons/favicon_dark.png"
            width="32"
            height="32"
        />
        </a>
        <span>NX° Sprite</span>
    </h1>
</div>

NX repository documentation

> Tags: docs, apps, flash, sprite

# Sprite

This folder contains a reusable SVG character sprite with 8-direction facing and a 4-frame walk cycle.

## What this is

The sprite is designed to look blocky (Minecraft-like) while still being scalable SVG, not pixel/raster art.

It currently supports:

- 8 directions: `N`, `NE`, `E`, `SE`, `S`, `SW`, `W`, `NW`
- 2 states: `idle`, `walking`
- 4 internal frames for walking
- internal timer-based animation by default
- optional parent-controlled frame via `frame` prop

## File structure

- `Sprite.tsx`: React-facing component API + animation timing/frame selection
- `SpriteArtwork.tsx`: SVG geometry and pose logic
- `direction.ts`: vector-to-direction helper (`getDirection`)
- `index.ts`: public exports for this module

Public types are centralized in the package root declarations file:

- `../../../types` (actual file: `types.d.ts` at package root)

## How rendering works

`Sprite` computes the active state and active frame, then renders `SpriteArtwork`.

1. Resolve state:
- `state` prop wins when provided
- otherwise `moving=true` maps to `walking`, `moving=false` maps to `idle`

2. Resolve frame source:
- if `frame` prop is provided, component is controlled
- otherwise component advances its own internal frame with `setInterval`

3. Resolve frame rate:
- `fps` for walking (default `8`)
- `idleFps` for idle (default `2`)
- `animateIdle` controls whether idle ticks or remains static

## How artwork works

`SpriteArtwork` uses reusable SVG primitives (rectangles/ellipse) for:

- shadow
- legs + boots
- torso
- arms
- head + facial features

Direction is converted into vector traits:

- side view (`E/W`)
- diagonal view (`NE/NW/SE/SW`)
- north-facing vs south-facing
- mirrored transform for westward facings

The walking cycle is driven by small numeric patterns:

- stride offsets for legs/arms
- slight bobbing
- tiny lean based on facing

This creates motion that reads as walking rather than sliding.

## Direction utility

`getDirection(dx, dy, fallback)` in `direction.ts` maps a movement vector to the nearest of 8 octants.

Convention used here:

- `+x` is right
- `+y` is down (screen coordinates)

If `dx=0` and `dy=0`, it returns `fallback` (default `"S"`).

## Usage

From package exports:

```tsx
import { Sprite, getDirection } from '@nx/flash';

const direction = getDirection(vx, vy);

<Sprite
  direction={direction}
  state={isMoving ? 'walking' : 'idle'}
  size={64}
/>
```

Shorthand using `moving`:

```tsx
<Sprite direction="NE" moving size={64} />
```

Controlled frame mode:

```tsx
<Sprite direction="E" state="walking" frame={tick % 4} />
```

Palette override:

```tsx
<Sprite
  direction="S"
  state="walking"
  colors={{
    shirt: '#4f7f2b',
    shirtShadow: '#32541a',
    accessory: '#c5dc65',
  }}
/>
```

## Extension notes

Good next steps if you want more features without rewriting the core:

- add extra states (`running`, `attacking`) by adding frame sequences
- add character presets as named palette sets
- add optional accessories as toggled artwork layers
- expose a `frameCount`/`animation` config if multiple clips are introduced

Keep `Sprite` focused on timing/state and keep pose geometry in `SpriteArtwork`.
That split is what makes this easy to evolve.
