'use client';
import * as React from 'react';
import {
  Card,
  CardHeader,
  IconButton,
  List,
} from '@mui/material';
import { Icon, setFeedback } from '../../../DesignSystem';
import {
  initCollection,
  useCRUD,
  useNXAdmin,
  setCRUD,
  TypeScript,
  CreateDoc,
  ReadDoc,
  UpdateDoc,
  DeleteDoc,
} from '../../../NXAdmin'
import { useDispatch } from '../../../Uberedux'

export interface I_Share {
};

export default function Share({
}: I_Share) {
  const collection = 'share';
  const crud = useCRUD();

  const nxAdmin = useNXAdmin();
  const dispatch = useDispatch();
  const { CRUDMode } = nxAdmin || {};
  const { typescript, docs } = nxAdmin?.share || {};

  React.useEffect(() => {
    // Only init collection if not already initted
    if (!nxAdmin?.crud?.[collection]?.initted) {
      dispatch(initCollection(collection, typescript));
    }
  }, [dispatch, collection, nxAdmin, typescript]);

  return (
    <>
      <Card>
        <CardHeader
          title="Share"
          avatar={<Icon icon="share" color="primary" />}
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
        <pre>crud: {JSON.stringify(crud, null, 2)}</pre>

        {CRUDMode === 'create' && (
          <CreateDoc collection={'share'} />
        )}
        {CRUDMode === 'read' && Array.isArray(docs) && docs.length > 0 && (
          docs.map((doc, i) => (
            <ReadDoc key={`share_doc_${i}`} doc={doc} typescript={typescript} />
          ))
        )}
        {CRUDMode === 'update' && (
          <UpdateDoc collection={collection} />
        )}
        {CRUDMode === 'delete' && (
          <DeleteDoc collection={collection} />
        )}
      </Card>

    </>
  );
}
