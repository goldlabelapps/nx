'use client';
// import type { T_Config } from '../../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
} from '@mui/material';

export interface I_CreateDoc {
  collection: string;
}

export default function CreateDoc({ collection }: I_CreateDoc) {

  return (
    <>
      <Card>
        Create New Doc in {collection}
      </Card>
    </>
  );
}
