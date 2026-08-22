"use client";
import React from 'react';
import { 
  Typography,
  Box,
} from '@mui/material';


const README = () => {

  return (
    <Box sx={{  }}>
      <Typography variant="h6" sx={{mb:2}}>
        README
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        A modular, extensible admin cartridge for NX°.
        It provides a top-level admin component, a barrel export for all features, 
        and a folder structure supporting scalable feature modules
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Notes
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        TypeScript-first: all modules and types are in TS/TSX. 
        Prompts for AI/LLM integrations, 
        module currently present. 
        For details, see each feature module's README or index file
      </Typography>
    </Box>
  );
};

export default README;