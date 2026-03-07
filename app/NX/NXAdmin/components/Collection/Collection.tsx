'use client';
import * as React from 'react';
import {
  Card,
  CardHeader,
  IconButton,
} from '@mui/material';
import { Icon, setFeedback } from '../../../DesignSystem';
import {
  initCollection,
  useCRUD,
  // TypeScript,
} from '../../../NXAdmin'
import { useDispatch } from '../../../Uberedux'

export interface I_Collection {
  collection: string;
  label: string;
  icon: string;
};

export default function Collection({
  collection,
  label,
  icon,
}: I_Collection) {

  const crud = useCRUD();

  const dispatch = useDispatch();
  // const { typescript, docs } = nxAdmin?.[collection] || {};

  React.useEffect(() => {
    // Only init collection if not already initted
    if (!crud?.[collection]?.initted) {
      dispatch(initCollection(collection));
    }
  }, [dispatch, collection, crud]);

  return (
    <>
      <Card variant="outlined">
        <CardHeader
          title={label}
          avatar={<Icon icon={icon as any} color="primary" />}
          action={<>
            {/* <TypeScript /> */}
            <IconButton
              onClick={() => {
                dispatch(setFeedback({
                  severity: 'success',
                  title: `${collection}`,
                  description: 'Create Doc',
                }));
              }}
            >
              <Icon icon="create" />
            </IconButton>
          </>}
        />
      </Card>
    </>
  );
}

/* 

  setCRUD,
  CreateDoc,
  ReadDoc,
  UpdateDoc,
  DeleteDoc,

<pre>label: {JSON.stringify(label, null, 2)}</pre> 

*/