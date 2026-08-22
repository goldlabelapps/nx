'use client';
import * as React from 'react';
import {
  MegaDash,
  Fingerprints,
  Prospects,
  Tenants,
} from '../../NXAdmin';

interface I_PageRouter {
  active: string | null;
}

export default function PageRouter({ active }: I_PageRouter) {
    if (!active) return <MegaDash />;
    switch (active) {
      case 'fingerprints':
        return <Fingerprints />;
      case 'prospects':
        return <Prospects />;
      case 'tenants':
        return <Tenants />;
      default:
        return <MegaDash />;
    }
}
