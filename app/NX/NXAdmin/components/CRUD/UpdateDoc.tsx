'use client';
// import type { T_Config } from '../../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
} from '@mui/material';

export interface I_UpdateDoc {
  // children?: React.ReactNode;
  // config: T_Config;
};

export default function UpdateDoc({
  // children,
  // config,
}: I_UpdateDoc) {

  return (
    <>
      <Card>
        UpdateDoc
      </Card>
    </>
  );
}
