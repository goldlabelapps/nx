'use client';
import * as React from 'react';
import {
  Card,
} from '@mui/material';

export interface I_DeleteDoc {
  collection: string;
};

export default function DeleteDoc({ collection }: I_DeleteDoc) {

  return (
    <>
      <Card>
        Delete from {collection}
      </Card>
    </>
  );
}
