'use client';
// import type { T_Config } from '../../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
} from '@mui/material';

export interface I_DeleteDoc {
  // children?: React.ReactNode;
  // config: T_Config;
};

export default function DeleteDoc({
  // children,
  // config,
}: I_DeleteDoc) {

  return (
    <>
      <Card>
        DeleteDoc
      </Card>
    </>
  );
}
