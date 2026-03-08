'use client';
import * as React from 'react';
import {
  Card,
  CardHeader,
  ButtonBase,
  CardContent,
  Typography,
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


  return (
    <ButtonBase
      onClick={() => handleActivate(collection)}
      sx={{
        display: 'block',
        textAlign: 'left',
        width: '100%',
        border: isActive ? '1px solid' : '1px solid',
        borderColor: isActive ? 'primary.main' : 'divider',
        borderRadius: 1,
        '&:hover': {
          borderColor: 'primary.main',
        },
      }}
    >
      <Card variant="outlined">
        <CardHeader
          title={title}
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
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
            <pre>collectionState: {JSON.stringify(collectionState, null, 2)}</pre>
          </CardContent>
        </>}

      </Card>
    </ButtonBase>
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