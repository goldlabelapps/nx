'use client';
import * as React from 'react';
import {
  Card,
  CardHeader,
  ButtonBase,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
import {
  initCollection,
  useCollection,
  useActive,
  setNXAdmin,
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
  const dispatch = useDispatch();
  const active = useActive();
  const isActive = active === collection;

  const handleActivate = (collection: string) => {
    dispatch(setNXAdmin('active', collection));
  }

  React.useEffect(() => {
    // Only init collection if not already initted
    if (!collectionState?.[collection]?.initted) {
      dispatch(initCollection(collection));
    }
  }, [dispatch, collection, collectionState]);



  if (!isActive) {
    return (
      <ButtonBase
        onClick={() => handleActivate(collection)}
        sx={{
          display: 'block',
          textAlign: 'left',
          width: '100%',
          mb: 2
        }}
      >
        <Card variant="outlined">
          <CardHeader
            title={title}
            subheader={description}
            avatar={<Icon icon={icon as any} color="primary" />}
          />
          {/* <pre>collectionState: {JSON.stringify(collectionState, null, 2)}</pre> */}
        </Card>
      </ButtonBase>
    );
  }

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardHeader
        title={title}
        subheader={description}
        avatar={<Icon icon={icon as any} color="primary" />}
      />
      {/* <pre>collectionState: {JSON.stringify(collectionState, null, 2)}</pre> */}
    </Card>
  );

}

/* 

  setCRUD,
  CreateDoc,
  ReadDoc,
  UpdateDoc,
  DeleteDoc,

<pre>label: {JSON.stringify(label, null, 2)}</pre> 

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