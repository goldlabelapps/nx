// /Users/goldlabel/GitHub/example-app/gl-core/features/Shortcodes/components/LinkOut.tsx
'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Alert } from '@mui/material';
import { normalizeTenant } from '../../lib/normalizeTenant';

type HiddenMessageItem = {
  slug: string;
  name: string;
  message: string;
};

export default function HiddenMessage({
  slug,
}: {
  slug?: string;
}) {
  return (
    <React.Suspense fallback={null}>
      <HiddenMessageInner slug={slug} />
    </React.Suspense>
  );
}

function HiddenMessageInner({
  slug,
}: {
  slug?: string;
}) {
  const tenant = normalizeTenant();
  const [hiddenMessages, setHiddenMessages] = React.useState<HiddenMessageItem[]>([]);
  const searchParams = useSearchParams();
  const querySlug = searchParams.get('slug');

  React.useEffect(() => {
    let isMounted = true;

    const loadHiddenMessages = async () => {
      try {
        const response = await fetch(`/${tenant}/json/hiddenMessages.json`);
        if (!response.ok) return;
        const data = (await response.json()) as HiddenMessageItem[];
        if (isMounted) {
          setHiddenMessages(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) {
          setHiddenMessages([]);
        }
      }
    };

    loadHiddenMessages();

    return () => {
      isMounted = false;
    };
  }, [tenant]);

  if (querySlug !== null) {
    return (
      <Alert severity="error">
        Hey you! <strong>{querySlug}</strong> is not a valid slug. You looking for easter eggs?
      </Alert>
    );
  }

  const slugToken = (slug || '').replace(/^\/+|\/+$/g, '').split('/').pop() || '';
  const matchedMessage = hiddenMessages.find((entry) => entry.slug === slugToken);

  if (!matchedMessage) return null;

  return (
    <pre>{JSON.stringify(matchedMessage, null, 2)}</pre>
  );
}
