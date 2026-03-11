'use client';
import * as React from 'react';
import {
  Box,
  IconButton,
  Card,
  Tooltip,
  CardHeader,
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

  const {
    mode,
    typescript,
    selected,
  } = state || {};

  if (mode === 'read') cardTitle = `${title}`;
  if (mode === 'create') cardTitle = `New ${single}`;
  if (mode === 'update') cardTitle = `Update ${single}`;
  if (mode === 'delete') cardTitle = `Delete ${single}?`;

  const dispatch = useDispatch();
  const active = useActive();
  const isActive = active === collection;

  const activate = (collection: string) => {
    dispatch(setNXAdmin('active', collection));
  };

  const handleNew = (collection: string) => {
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
          title={<Typography variant="body1">{cardTitle}</Typography>}
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
              <IconButton
                color="primary"
                onClick={() => handleNew(collection)}
              >
                <Icon icon="new" />
              </IconButton></> : null}

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
          {mode === 'create' && <CreateDoc collection={collection} icon={icon} />}
          {mode === 'update' && <UpdateDoc collection={collection} />}
          {mode === 'delete' && <DeleteDoc collection={collection} />}
        </>}
      </Card>
    </>
  );
}
