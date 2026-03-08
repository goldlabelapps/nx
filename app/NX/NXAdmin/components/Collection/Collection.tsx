'use client';
import * as React from 'react';
import {
  Card,
  Tooltip,
  CardHeader,
  ButtonBase,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
import {
  initCollection,
  useCollection,
  useActive,
  setNXAdmin,
  ReadDoc,
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

  const { mode } = state || {};

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
        {isActive && <>


          {mode === 'read' && <ReadDoc collection={collection} />}

          <CardContent>
            {/* <Typography variant="body1" color="text.secondary">
              {description}
            </Typography> */}
          </CardContent>
        </>}



      </Card>
    </>
  );
}


/* 

  setCRUD,
  CreateDoc,
  UpdateDoc,
  DeleteDoc,

<pre>label: {JSON.stringify(label, null, 2)}</pre> 
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