'use client';
import React from 'react';
import { CleverText } from './CleverText';

export function CleverTextShortcode({
  text = null,
  style,
}: {
  text?: string | null;
  style?: React.CSSProperties;
}) {
  if (!text) return null;

  return (
    <CleverText
      text={text}
      style={{ fontFamily: 'inherit', ...style }}
    />
  );
}

export default CleverTextShortcode;
