'use client';

import * as React from 'react';
import {
  Box,
  MenuItem,
  IconButton,
  Menu,
  ListItemIcon,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { setLang } from '../../Lingua/actions/setLang';

type LangData = {
  default: string;
  local: string;
  switch: string;
};

type LinguaState = {
  cartridge: string;
  lang: string;
  langs: Record<string, LangData>;
};

type RootState = {
  redux: {
    lingua: LinguaState;
  };
};

export default function SelectLang() {
  const dispatch = useDispatch();
  const lingua = useSelector((state: RootState) => state.redux.lingua) ?? {};
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const currentLang = lingua.lang ?? 'de';
  console.log('lingua.langs:', lingua.langs);
  if (lingua.langs) {
    console.log('Object.entries(lingua.langs):', Object.entries(lingua.langs));
  }

  const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLangSelect = (code: string) => {
    // dispatch({ type: 'LINGUA/SET_LANG', payload: code });
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'inline-block', overflow: 'visible' }}>
      <IconButton onClick={handleIconClick} size="small">
        <img
          src={`/shared/svg/flags/${currentLang}.svg`}
          alt={lingua.langs?.[currentLang]?.default || currentLang}
          style={{ width: 24, height: 24, objectFit: 'contain' }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{ sx: { zIndex: 1500 } }}
      >
        {Object.entries(lingua.langs ?? {}).map(([code, data]) => (
          <MenuItem key={code} onClick={() => handleLangSelect(code)} selected={code === currentLang}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <img
                src={`/shared/svg/flags/${code}.svg`}
                alt={data.default}
                style={{ width: 24, height: 24, objectFit: 'contain' }}
              />
            </ListItemIcon>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
