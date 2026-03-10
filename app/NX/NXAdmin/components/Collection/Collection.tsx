'use client';
import * as React from 'react';
import {
  Box,
  Button,
  Card,
  Tooltip,
  CardHeader,
  IconButton,
  Typography,
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
  TypeScript,
} from '../../../NXAdmin'
import { useDispatch } from '../../../Uberedux';

export interface I_Collection {
  collection: string;
  title: string;
  description?: string;
  icon: string;
  single?: string;
  btnMode?: 'icon' | 'button';
};

export default function Collection({
  collection,
  title,
  description,
  icon,
  single,
  btnMode = 'icon',
}: I_Collection) {

  const collectionState = useCollection(collection);
  const state = collectionState[collection];
  // btnMode is now a prop

  let cardTitle: string = `${title}`;
  let cardSubheader: string = `${description}`;

  // Ensure cardTitle and cardSubheader are always strings at runtime
  if (typeof cardTitle !== 'string') {
    cardTitle = JSON.stringify(cardTitle);
  }
  if (typeof cardSubheader !== 'string') {
    cardSubheader = JSON.stringify(cardSubheader);
  }

  const {
    mode,
    typescript,
  } = state || {};

  if (mode === 'create') {
    cardTitle = `New ${single}`;
  };


  const dispatch = useDispatch();
  const active = useActive();
  const isActive = active === collection;

  const activate = (collection: string) => {
    dispatch(setNXAdmin('active', collection));
  };

  const handleNew = (collection: string) => {
    console.log('New Doc in', collection);
    dispatch(setCRUD(collection, 'mode', 'create'));
  };

  const handleCollectionReset = () => {
    dispatch(setCRUD(collection, 'mode', 'read'));
    dispatch(setCRUD(collection, 'selected', null));
  };

  React.useEffect(() => {
    if (!collectionState?.[collection]?.initted) {
      dispatch(initCollection(collection));
    }
  }, [dispatch, collection, collectionState]);

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
          title={<Typography variant="h5">{cardTitle}</Typography>}
          // subheader={mode}
          avatar={<IconButton color="primary" onClick={handleCollectionReset}>
            <Icon icon={icon as any} />
          </IconButton>}
          action={<Box sx={{ display: 'flex', gap: 0 }}>
            <TypeScript 
              btnMode={btnMode}
              typescript={typescript}
              collection={collection}
              cardSubheader={cardSubheader}
            />
            { mode !== 'create' ? <>
              <Button
                variant="outlined"
                endIcon={<Icon icon="new" />}
                color="primary"
                onClick={() => handleNew(collection)}
              >
                New {single}
              </Button></> : null}

          </Box>}
          
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
          {mode === 'create' && <CreateDoc collection={collection} />}
          {mode === 'update' && <UpdateDoc collection={collection} />}
          {mode === 'delete' && <DeleteDoc collection={collection} />}
        </>}
        {/* <pre>docs: {JSON.stringify(docs, null, 2)}</pre> */}
      </Card>
    </>
  );
}
