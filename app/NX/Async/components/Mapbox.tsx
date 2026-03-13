'use client';
import * as React from 'react';
import { 
  Box, 
  Paper,
  useTheme,
  Typography,
  Avatar,
} from '@mui/material';
import Map from 'react-map-gl/mapbox';
import MapPin from './MapPin';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

export type T_Map = {
  country_code: string;
  label: string;
  lat: number;
  lon: number;
}


export default function Mapbox(map: T_Map) {
  const theme = useTheme();
  const latitude = map?.lat ?? 0;
  const longitude = map?.lon ?? 0;
  const {country_code} = map || {};

  if (!latitude || !longitude) {
    return <Box>No location available</Box>;
  }

  return (
    <Box
      sx={{ 
        height: 300, 
        width: '100%', 
        borderRadius: 1, 
        overflow: 'hidden', 
        position: 'relative'
      }}
    >
      {/* Label overlay at top center */}
      {map.label && (
        <Paper
          variant="outlined"
          sx={{
            m:1,
            position: 'absolute',
            top: 8,
            background: theme.palette.background.paper,
            padding: 1,
            borderRadius: 1,
            zIndex: 2,
          }}
        >
          <Box sx={{display: 'flex'}}>
            <Box sx={{mr:1}}>
              <Avatar 
                sx={{
                  m:1,
                  width: 24,
                  height: 24,
                }}
                src={`/shared/svg/flags/${country_code.toLowerCase()}.svg`} />
            </Box>
            <Box sx={{mt: 0.75, pr:1}}>
              <Typography variant="caption" component="div">
                {map.label}
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
          zoom: 8,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
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
          <MapPin size={32} color={theme.palette.primary.main} />
        </div>
      </Map>
    </Box>
  );
}
