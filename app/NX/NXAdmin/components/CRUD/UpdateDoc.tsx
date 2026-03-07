'use client';
import * as React from 'react';
import {
  Card,
} from '@mui/material';

export interface I_UpdateDoc {
  collection: string;
}

export default function UpdateDoc({ collection }: I_UpdateDoc) {

  return (
    <>
      <Card>
        Update Doc {collection}
      </Card>
    </>
  );
}
