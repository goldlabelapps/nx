'use client';
import * as React from 'react';
import {
  Box,
  Typography,
  List,
  Pagination,
} from '@mui/material';
import { MultiMarker } from '../../../Mapbox';
import { setNXAdmin, useNXAdmin } from '../../../NXAdmin';
import { useDispatch } from '../../../Uberedux';
import {
  initFingerprints,
  useSubscription,
  useFingerprint,
  useDoc,
} from '../Fingerprints';
import { Panel, Detail } from './components/Fingerprint';

export default function Fingerprints() {
  const dispatch = useDispatch();
  const nxAdmin = useNXAdmin();
  const mapSectionRef = React.useRef<HTMLDivElement | null>(null);
  const didInit = React.useRef(false);
  const pageSize = 5;
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [selectedFingerprintId, setSelectedFingerprintId] = React.useState<string | null>(null);
  const [focusedGeo, setFocusedGeo] = React.useState<any>(null);
  const { fingerprints, loading } = useSubscription(pageSize, page, setTotal);
  const fingerprintId = useFingerprint();
  const doc = useDoc();

  React.useEffect(() => {
    if (!didInit.current) {
      if (!nxAdmin || !nxAdmin.fingerprints) {
        dispatch(initFingerprints());
      }
      didInit.current = true;
    }
  }, [dispatch, nxAdmin]);

  React.useEffect(() => {
    dispatch(setNXAdmin('header', {
      title: 'Fingerprints°',
      icon: 'fingerprint',
    }));
  }, [dispatch]);

  if (fingerprintId && doc) {
    return <Detail fingerprint={doc as any} />;
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleFingerprintMapFocus = (fingerprintId: string, geo: any) => {
    mapSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedFingerprintId(fingerprintId);
    setFocusedGeo(geo || null);
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ p: 2 }}>
          {loading ? (
            <Typography variant="body2">...</Typography>
          ) : fingerprints.length === 0 ? (
            <Typography variant="body2">doh.</Typography>
          ) : (
            <>
              <Box ref={mapSectionRef}>
                <MultiMarker
                  markers={fingerprints.slice(0, 50).map((fp: any) => ({
                    id: fp.id,
                    geo: fp.geo,
                    avatarUrl: `https://goldlabel.pro/shared/svg/characters/${fp.avatar}.svg`,
                    countryCode: fp.geo?.country_code2 || null,
                  }))}
                  geos={fingerprints.slice(0, 50).map((fp: any) => fp.geo)}
                  focusGeo={focusedGeo}
                  focusZoom={10}
                />
              </Box>
              <Box sx={{ height: 16 }} />
              {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                  count={Math.max(1, Math.ceil(total / pageSize))}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Box> */}
              <List disablePadding>
                {fingerprints.map((v: any) => (
                  <Panel
                    key={v.id}
                    fingerprint={v}
                    selected={selectedFingerprintId === v.id}
                    disabled={selectedFingerprintId === v.id}
                    onClick={() => handleFingerprintMapFocus(v.id, v.geo)}
                  />
                ))}
              </List>
              
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

