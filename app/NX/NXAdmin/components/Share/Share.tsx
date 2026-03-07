'use client';
// import type { T_Config } from '../../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Icon, setFeedback } from '../../../DesignSystem';
import { useNXAdmin, TypeScript } from '../../../NXAdmin'
import { useDispatch } from '../../../Uberedux'

export interface I_Share {
  // children?: React.ReactNode;
  // config: T_Config;
};

export default function Share({
  // children,
  // config,
}: I_Share) {

  const nxAdmin = useNXAdmin();
  const dispatch = useDispatch();
  const { CRUDMode } = nxAdmin || {};
  const { typescript, docs } = nxAdmin?.share || {};
  const help = 'Go viral';

  const handleDocClick = (doc: any) => {
    const { title, description } = doc;
    dispatch(setFeedback({
      severity: 'success',
      title,
    }));
  }

  return (
    <>
      <Card>
        <CardHeader
          title="Share"
          subheader={help}
          avatar={<Icon icon="share" />}
          action={<>
            <TypeScript />
            <IconButton
              onClick={() => {
                dispatch(setFeedback({
                  severity: 'success',
                  title: 'Create clicked',
                  description: 'Create share',
                }));
              }}
            >
              <Icon icon="create" />
            </IconButton>
          </>}
        />

        <List>

          {CRUDMode === 'read' && Array.isArray(docs) && docs.length > 0 && (
            docs.map((doc) => (
              <ListItemButton key={doc.id} onClick={() => handleDocClick(doc)}>
                <ListItemText
                  primary={doc.title || doc.id}
                  secondary={doc.description || JSON.stringify(doc, null, 2)}
                />
              </ListItemButton>
            ))
          )}

        </List>

      </Card>
      {/* <pre>typescript: {JSON.stringify(typescript, null, 2)}</pre> */}
    </>
  );
}


/* <pre>docs: {JSON.stringify(docs, null, 2)}</pre> */