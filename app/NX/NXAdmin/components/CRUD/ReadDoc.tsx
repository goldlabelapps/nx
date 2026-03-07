'use client';
// import type { T_Config } from '../../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
} from '@mui/material';

export interface I_ReadDoc {
  // children?: React.ReactNode;
  // config: T_Config;
};

export default function ReadDoc({
  // children,
  // config,
}: I_ReadDoc) {

  return (
    <>
      <Card>
        ReadDoc
      </Card>
    </>
  );
}
