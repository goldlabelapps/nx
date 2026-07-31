'use client';
import * as React from 'react';
import type { T_Geo } from '../NXAdmin/types';
import { 
  Box, 
  Paper,
  useTheme,
  Typography,
  Avatar,
} from '@mui/material';
import Map from 'react-map-gl/mapbox';
import MapPin from './MapPin';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type T_MapboxProps = {
  geo?: T_Geo | null;
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

export default function Mapbox({ geo }: T_MapboxProps) {
  
  const theme = useTheme();
  const latitude = toCoordinate(geo?.latitude);
  const longitude = toCoordinate(geo?.longitude);
  const countryCode = geo?.country_code2;
  const label = [geo?.city, geo?.state_prov, geo?.country_name]
    .filter(Boolean)
    .join(', ');

  const mapTheme = theme.palette.mode === 'dark' 
    ? 'mapbox://styles/listingslab/cmogziipx002f01qle2bxfgc9' 
    : 'mapbox://styles/listingslab/cmogzklar000a01s720ri58qh';

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return <Box>No location available</Box>;
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
      {/* Label overlay at top center */}
      {label && (
        <Paper
          variant="outlined"
          sx={{
            m:1,
            position: 'absolute',
            top: 8,
            background: theme.palette.background.default,
            padding: 0.5,
            borderRadius: 1,
            zIndex: 2,
          }}
        >
          <Box sx={{display: 'flex'}}>
            <Box sx={{mr:1}}>
              <Avatar 
                sx={{
                  m:1,
                  width: 16,
                  height: 16,
                }}
                src={countryCode ? `/shared/svg/flags/${countryCode.toLowerCase()}.svg` : undefined} />
            </Box>
            <Box sx={{mt: 0.5, pr:1}}>
              <Typography variant="caption" component="div">
                {label}
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude,
          latitude,
          zoom: 4,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapTheme}
        interactive={false}
      >
        {/* Marker pin overlay */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
          }}
        >
          <MapPin size={50} color={theme.palette.mode 
            === 'dark' ? theme.palette.common.white 
            : theme.palette.common.black} />
        </div>
      </Map>
    </Box>
  );
}
