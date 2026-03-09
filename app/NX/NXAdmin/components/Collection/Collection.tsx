'use client';
import * as React from 'react';
import {
  Card,
  Tooltip,
  CardHeader,
  Button,
  CardContent,
  IconButton,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
import {
  initCollection,
  useCollection,
  useActive,
  setNXAdmin,
  CreateDoc,
  ReadDoc,
  UpdateDoc,
  DeleteDoc,
  setCRUD,
} from '../../../NXAdmin'
import { useDispatch } from '../../../Uberedux'

export interface I_Collection {
  collection: string;
  title: string;
  description?: string;
  icon: string;
};

export default function Collection({
  collection,
  title,
  description,
  icon,
}: I_Collection) {

  const collectionState = useCollection(collection);
  const state = collectionState[collection];

  const { mode, selected } = state || {};

  const dispatch = useDispatch();
  const active = useActive();
  const isActive = active === collection;

  React.useEffect(() => {
    if (!collectionState?.[collection]?.initted) {
      dispatch(initCollection(collection));
    }
  }, [dispatch, collection, collectionState]);

  const activate = (collection: string) => {
    dispatch(setNXAdmin('active', collection));
  };

  const handleNew = (collection: string) => {
    console.log('New Doc in', collection);
    // Set CRUD status for this collection to 'create'
    dispatch(setCRUD(collection, 'mode', 'create'));
  };

  if (!isActive) return <>
    <Tooltip title={title} placement="right">
      <IconButton onClick={() => activate(collection)}>
        <Icon icon={icon as any} color="primary" />
      </IconButton>
    </Tooltip>
  </>;

  return (
    <>
      <Card variant="outlined">
        <CardHeader
          action={<IconButton
            color="primary"
            onClick={() => handleNew(collection)}
          >
            <Icon icon="new" />
          </IconButton>}
          title={title}
          subheader={description}
          avatar={<Icon icon={icon as any} color="primary" />}
          sx={{
            '& .MuiCardHeader-subheader': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'block',
            },
          }}
        />
        <CardContent>
          {isActive && <>
            {mode === 'read' && <ReadDoc collection={collection} />}
            {mode === 'create' && <CreateDoc collection={collection} />}
            {mode === 'update' && <UpdateDoc collection={collection} />}
            {mode === 'delete' && <DeleteDoc collection={collection} />}
          </>}
        </CardContent>
        {/* <pre>state: {JSON.stringify(state, null, 2)}</pre> */}
      </Card>
    </>
  );
}


/* 


<pre>mode: {JSON.stringify(mode, null, 2)}</pre>
    {/* action={
      <>
        {/* <TypeScript /> 
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

*/