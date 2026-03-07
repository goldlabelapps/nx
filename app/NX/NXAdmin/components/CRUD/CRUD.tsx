'use client';
// import type { T_Config } from '../../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  useTheme,
  Card,
  CardHeader,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
import { useNXAdmin, setNXAdmin } from '../../../NXAdmin'
import { useDispatch } from '../../../Uberedux'

export interface I_CRUD {
  // children?: React.ReactNode;
  // config: T_Config;
};

export default function CRUD({
  // children,
  // config,
}: I_CRUD) {


  const nxAdmin = useNXAdmin();
  const dispatch = useDispatch();
  const { CRUDMode } = nxAdmin;
  const help = 'Create, Read, Update, Delete - a common set of operations for managing data in applications.';
  const router = useRouter();
  const t = useTheme();

  const updateCRUDKey = (key: string, value: any) => {
    dispatch(setNXAdmin(key, value));
  }

  if (CRUDMode === 'read') return null;

  return (
    <>
      <Card>
        <CardHeader
          title="Firebase"
          subheader={help}
          avatar={<Icon icon="firebase" />}
        />
        <pre>CRUDMode: {JSON.stringify(CRUDMode, null, 2)}</pre>
      </Card>
    </>
  );
}
