---
title: "Geo"
featuredImage: "/images/example-featured.jpg"
description: "This is an example markdown page."
date: "2025-01-18"
---

Your component is a good starting point, but we can enhance it to fully leverage Mapbox for rendering maps. Below is a modified version of your `Geo` component. This version integrates Mapbox GL JS to display a map and updates the map state based on your `Uberedux` store.

### Updated Geo Component

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import mapboxgl from "mapbox-gl"; // Import Mapbox GL JS
import { geoAS } from "./";
import { useUbereduxSelect, selectGeo } from "../Uberedux";

export interface IGeo {
  id?: string;
}

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOXTOKEN;

const Geo: React.FC<IGeo> = ({ id = "map" }) => {
  const geo = useUbereduxSelect(selectGeo);
  const { initted, latitude = 0, longitude = 0, zoom = 2 } = geo;

  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<mapboxgl.Map | null>(null);

  React.useEffect(() => {
    if (!initted) {
      geoAS();
    }

    if (mapboxToken && mapContainerRef.current && !mapRef.current) {
      mapboxgl.accessToken = mapboxToken;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11", // You can customize the map style
        center: [longitude, latitude],
        zoom,
      });

      // Add navigation controls
      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Handle map events or markers if needed
    }

    // Cleanup the map instance on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [initted, latitude, longitude, zoom]);

  return (
    <div id={id} style={{ width: "100%", height: "100%" }}>
      <div
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid #ccc",
        }}
      />
      <pre style={{ marginTop: "10px" }}>
        geo: {JSON.stringify(geo, null, 2)}
      </pre>
    </div>
  );
};

export default Geo;
```

### Key Enhancements:

1. **Mapbox GL Integration**:
   - The `mapboxgl` library is used to render the map.
   - The `mapboxToken` is set for authentication.

2. **Dynamic Map Centering**:
   - The map centers itself based on `latitude` and `longitude` from the `geo` state.
   - The `zoom` level is also controlled dynamically.

3. **Lifecycle Management**:
   - The `useEffect` ensures the map is initialized only once and properly cleaned up to avoid memory leaks.

4. **Navigation Controls**:
   - Added Mapbox navigation controls (`zoom in`, `zoom out`, `rotate`).

5. **Refactor to TypeScript**:
   - Used `React.FC<IGeo>` for better type safety and optional `id` prop.

6. **Styling**:
   - The map container is styled to occupy the full width and height of the parent `div`.

### Next Steps:

- Customize the `mapbox://styles/mapbox/streets-v11` style or use a custom Mapbox style.
- Add interactivity, such as markers or popups, based on the `geo` state or user actions.
- If your `Uberedux` state updates frequently, you may need to programmatically update the map's center or zoom when the state changes. This can be done using `mapRef.current?.flyTo()` or `mapRef.current?.setCenter()`.
