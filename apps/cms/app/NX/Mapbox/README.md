# Mapbox Cartridge

Client-side map cartridge for rendering a non-interactive location snapshot with:

- a themed Mapbox basemap (dark/light style per MUI theme)
- an optional country flag + label overlay
- a centered custom pin marker

This cartridge is intended for read-only context displays (for example in admin detail views), not for full map interaction workflows.

## What Is Included

- Mapbox.tsx: Main map component and public types
- MapPin.tsx: Inline SVG pin component
- index.tsx: Cartridge exports
- mapboxDark.json / mapboxLight.json: Local style JSON assets (currently not wired into runtime mapStyle)

## Public API

### Types

```ts
import type { T_Geo } from '../NXAdmin/types';
```

### Component

```ts
type T_MapboxProps = {
	geo?: T_Geo | null;
};
```

```tsx
import { Mapbox } from '../Mapbox';

<Mapbox
	geo={{
		country_code2: 'GB',
		city: 'London',
		state_prov: 'England',
		country_name: 'United Kingdom',
		latitude: '51.5074',
		longitude: '-0.1278',
	}}
/>
```

If latitude or longitude are missing or invalid, the component renders a fallback message: No location available.

## Runtime Behavior

- Render mode: client-only (`use client`)
- Interactivity: disabled (`interactive={false}`)
- Height: fixed at 250px
- Initial zoom: 4
- Theme switching:
	- dark mode -> `mapbox://styles/listingslab/cmogziipx002f01qle2bxfgc9`
	- light mode -> `mapbox://styles/listingslab/cmogzklar000a01s720ri58qh`
- Overlays:
	- top overlay (flag + label) when `label` exists
	- centered `MapPin` marker always shown when map renders

## Setup Requirements

### 1) Host app dependencies

Install in the app that consumes this cartridge:

```bash
npm install react-map-gl mapbox-gl
```

or

```bash
yarn add react-map-gl mapbox-gl
```

### 2) Environment variable

Add a public token to your environment file:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_public_token
```

The component reads this at:

```ts
process.env.NEXT_PUBLIC_MAPBOX_TOKEN
```

Use a Mapbox public token with access to the configured style IDs.

### 3) Optional Mapbox CSS

Depending on your app shell and Mapbox/React-Map-GL version, you may need global CSS:

```ts
import 'mapbox-gl/dist/mapbox-gl.css';
```

If the map appears unstyled or controls/layers render incorrectly elsewhere, add this once in your root client entry/layout.

## Imports

From cartridge index:

```ts
import { Mapbox, MapPin } from '../Mapbox';
```

## Data Contract Notes

- `country_code` is expected as ISO alpha-2 (for example `US`, `GB`).
- `latitude` and `longitude` are read from fingerprint-style geo fields and can be string or number values.
- Flag source path is:

```txt
/shared/svg/flags/{country_code_lower}.svg
```

If the flag asset does not exist, Avatar will render without an image.

## Known Limitations

- Not interactive by design.
- Uses hardcoded remote style URLs.
- Uses `initialViewState` only (no controlled viewport updates after mount).
- `mapboxDark.json` and `mapboxLight.json` are present but not currently used.

## Suggested Enhancements

1. Add props for `zoom`, `height`, and `interactive`.
2. Add optional support for local style JSON (`mapboxDark.json`/`mapboxLight.json`).
3. Add better empty/error states for invalid tokens or style load failure.
4. Add optional click callback to open full map.
5. Add unit tests for:
	 - no coordinates fallback
	 - overlay rendering conditions
	 - theme style selection

## Troubleshooting

### Map is blank

- Confirm `NEXT_PUBLIC_MAPBOX_TOKEN` is set and available to the running client bundle.
- Verify token has access to the configured style IDs.
- Check browser console for Mapbox auth/style errors.

### Always seeing No location available

- Ensure both `lat` and `lon` are non-zero numbers.
- The current guard treats `0` as unavailable.

### Flag not visible

- Confirm `country_code` is valid and lowercased filename exists in `/shared/svg/flags/`.

## Quick Dev Checklist

- Dependency installed in host app
- Public token configured
- Coordinates supplied as numbers
- Theme mode tested (light + dark)
- Flag asset exists for provided country code
