"use client";
import React from 'react';
import { Avatar, Box } from '@mui/material';

interface I_AvaFlag {
  countryCode: any;
  avatarUrl: string;
  size?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const AvaFlag: React.FC<I_AvaFlag> = ({
  countryCode,
  avatarUrl,
  size = 40,
  position = 'top-right'
}) => {
  const flagSrc = `/shared/svg/flags/${countryCode.toLowerCase()}.svg`;

  const getPositionStyles = () => {
    const flagSize = size * 0.3;
    switch (position) {
      case 'top-left':
        return { top: 0, left: 0 };
      case 'top-right':
        return { top: 0, right: 0 };
      case 'bottom-left':
        return { bottom: 0, left: 0 };
      case 'bottom-right':
        return { bottom: 0, right: 0 };
      default:
        return { top: 0, right: 0 };
    }
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Avatar src={avatarUrl} sx={{ width: size, height: size }} />
      <Box
        component="img"
        src={flagSrc}
        alt={`${countryCode} flag`}
        sx={{
          position: 'absolute',
          width: size * 0.3,
          height: size * 0.3,
          ...getPositionStyles(),
        }}
      />
    </Box>
  );
};

export default AvaFlag;
