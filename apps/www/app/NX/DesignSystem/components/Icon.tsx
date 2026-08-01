'use client';

import * as React from 'react';
import { Icon as SharedIcon, type IconProps as SharedIconProps } from '@nx/design-system';

import { I_Icon } from '../../types';

export default function Icon(props: I_Icon) {
  return <SharedIcon {...(props as SharedIconProps)} />;
}
