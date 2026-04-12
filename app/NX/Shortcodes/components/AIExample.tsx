'use client';
import React from 'react';
import {Prompt} from '../../Prompt';

export default function AIExample({
  url = null,
  icon = 'link',
  title = null,
  description = null
}: {
  url?: string | null;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
}) {
  return <Prompt 
            title={title} 
            description={description} 
            url={url} 
            icon={icon} 
          />;
}
