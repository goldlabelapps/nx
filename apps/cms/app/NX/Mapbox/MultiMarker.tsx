'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import type { T_Geo } from '../NXAdmin/types';
import { 
  Box,
  Avatar,
  useTheme,
} from '@mui/material';
import Map, { Marker } from 'react-map-gl/mapbox';
import AvaFlag from '../NXAdmin/components/Fingerprints/components/AvaFlag';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type T_MultiMarker = {
  markers?: Array<{
    id?: string;
    geo?: T_Geo | null;
    avatarUrl?: string;
    countryCode?: string | null;
  } | null | undefined>;
  geos?: Array<T_Geo | null | undefined>;
  focusGeo?: T_Geo | null;
  focusZoom?: number;
};

const toCoordinate = (value?: string | number) => {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : NaN;
  }

  return NaN;
};

export default function MultiMarker({ markers = [], geos = [], focusGeo, focusZoom = 8 }: T_MultiMarker) {

  const router = useRouter();
  const theme = useTheme();
  const mapRef = React.useRef<any>(null);
  const points = (markers.length > 0
    ? markers.map((marker) => ({
      id: marker?.id,
      latitude: toCoordinate(marker?.geo?.latitude),
      longitude: toCoordinate(marker?.geo?.longitude),
      avatarUrl: marker?.avatarUrl || '',
      countryCode: marker?.countryCode || null,
    }))
    : geos.map((geo, index) => ({
      id: `geo_${index}`,
      latitude: toCoordinate(geo?.latitude),
      longitude: toCoordinate(geo?.longitude),
      avatarUrl: '',
      countryCode: geo?.country_code2 || null,
    })))
    .filter((point) => Number.isFinite(point.latitude) && Number.isFinite(point.longitude));

  const focusedPoint = React.useMemo(() => {
    const latitude = toCoordinate(focusGeo?.latitude);
    const longitude = toCoordinate(focusGeo?.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return null;
    }

    return { latitude, longitude };
  }, [focusGeo]);

  const fitToPoints = React.useCallback(() => {
    if (!mapRef.current || points.length === 0) {
      return;
    }

    const map = mapRef.current;

    if (points.length === 1) {
      map.easeTo({
        center: [points[0].longitude, points[0].latitude],
        zoom: 4,
        duration: 0,
      });
      return;
    }

    let minLng = points[0].longitude;
    let minLat = points[0].latitude;
    let maxLng = points[0].longitude;
    let maxLat = points[0].latitude;

    for (const point of points) {
      minLng = Math.min(minLng, point.longitude);
      minLat = Math.min(minLat, point.latitude);
      maxLng = Math.max(maxLng, point.longitude);
      maxLat = Math.max(maxLat, point.latitude);
    }

    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: 40,
        duration: 0,
        maxZoom: 6,
      }
    );
  }, [points]);

  React.useEffect(() => {
    fitToPoints();
  }, [fitToPoints]);

  React.useEffect(() => {
    if (!focusedPoint || !mapRef.current) {
      return;
    }

    const map = mapRef.current;
    const flyToTarget = typeof map.flyTo === 'function' ? map : map.getMap?.();
    if (!flyToTarget || typeof flyToTarget.flyTo !== 'function') {
      return;
    }

    flyToTarget.flyTo({
      center: [focusedPoint.longitude, focusedPoint.latitude],
      zoom: focusZoom,
      duration: 1800,
      essential: true,
      curve: 1.45,
      speed: 0.8,
    });
  }, [focusedPoint]);

  const handleMarkerClick = React.useCallback((point: {
    id?: string;
    latitude: number;
    longitude: number;
    countryCode?: string | null;
  }) => {
    if (point.id) {
      router.push(`/fingerprints/${point.id}`);
      return;
    }

    console.log('Map marker clicked', point);
  }, [router]);

  const mapTheme = theme.palette.mode === 'dark' 
    ? 'mapbox://styles/listingslab/cmogziipx002f01qle2bxfgc9' 
    : 'mapbox://styles/listingslab/cmogzklar000a01s720ri58qh';

  if (points.length === 0) {
    return <Box>No locations available</Box>;
  }

  if (!MAPBOX_TOKEN) {
    return <Box>Map unavailable: missing Mapbox token</Box>;
  }

  return (
    <Box
      sx={{ 
        height: 250, 
        width: '100%', 
        borderRadius: 1, 
        overflow: 'hidden', 
        position: 'relative'
      }}
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          latitude: 51.5074,
          longitude: -0.1278,
          zoom: 1.25,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapTheme}
        interactive={false}
        onLoad={fitToPoints}
      >
        {points.map((point, index) => (
          (() => {
            const isFocused = !!focusedPoint
              && Math.abs(point.latitude - focusedPoint.latitude) < 0.000001
              && Math.abs(point.longitude - focusedPoint.longitude) < 0.000001;

            return (
              <Marker
                key={point.id || `multi_marker_${point.latitude}_${point.longitude}_${index}`}
                longitude={point.longitude}
                latitude={point.latitude}
                anchor="bottom"
              >
                <Box
                  onClick={() => handleMarkerClick(point)}
                  sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    filter: isFocused
                      ? 'drop-shadow(0 0 8px rgba(255,255,255,0.85)) drop-shadow(0 2px 6px rgba(0,0,0,0.5))'
                      : 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                    transform: 'translateY(2px)',
                    '@keyframes markerPulse': {
                      '0%': {
                        transform: 'translateX(-50%) scale(0.9)',
                        opacity: 0.65,
                      },
                      '100%': {
                        transform: 'translateX(-50%) scale(2.3)',
                        opacity: 0,
                      },
                    },
                  }}
                >
                  {isFocused ? (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '50%',
                        top: 8,
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.secondary.main,
                        animation: 'markerPulse 1.1s ease-out infinite',
                        pointerEvents: 'none',
                      }}
                    />
                  ) : null}
                  {point.countryCode ? (
                    <AvaFlag
                      avatarUrl={point.avatarUrl}
                      countryCode={point.countryCode}
                      size={isFocused ? 72 : 60}
                      position="bottom-right"
                    />
                  ) : (
                    <Avatar
                      src={point.avatarUrl}
                      sx={{
                        width: isFocused ? 72 : 60,
                        height: isFocused ? 72 : 60,
                        border: `2px solid ${theme.palette.secondary.main}`,
                      }}
                    />
                  )}
                </Box>
              </Marker>
            );
          })()
        ))}
      </Map>
    </Box>
  );
}
