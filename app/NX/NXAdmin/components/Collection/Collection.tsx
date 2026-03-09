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

  let cardTitle: string = `TITLE ${title}`;
  let cardSubheader: string = `DES ${description}`;

  // Ensure cardTitle and cardSubheader are always strings at runtime
  if (typeof cardTitle !== 'string') {
    cardTitle = JSON.stringify(cardTitle);
  }
  if (typeof cardSubheader !== 'string') {
    cardSubheader = JSON.stringify(cardSubheader);
  }

  const {
    mode,
    selected,
    // typescript,
  } = state || {};

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

  const handleCancel = () => {
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
          title={cardTitle}
          subheader={cardSubheader}
          action={<IconButton
            color="primary"
            onClick={() => handleNew(collection)}
          >
            <Icon icon="new" />
          </IconButton>}
          // action={
          //   <>
          //     {mode !== 'create' && <>

          //     </>}
          //     {selected || mode === "create" && <>
          //       <IconButton
          //         color="primary"
          //         onClick={handleCancel}
          //       >
          //         <Icon icon="close" />
          //       </IconButton>
          //     </>}
          //   </>}
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
          {mode === 'create' && <CreateDoc collection={collection} />}
          {mode === 'update' && <UpdateDoc collection={collection} />}
          {mode === 'delete' && <DeleteDoc collection={collection} />}
        </>}
        <pre>selected: {JSON.stringify(selected, null, 2)}</pre>
      </Card>
    </>
  );
}
