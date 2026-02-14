'use client';
import * as React from 'react';
import { T_Config } from '../types.d';
import { useDispatch } from '../Uberedux';
import {
  useEchopay,
  setEchoPay,
} from '../EchoPay';
import {
  Flash,
  MovieClip,
} from '../Flash';

export interface I_EchoPay {
  config: T_Config;
}

export default function EchoPay({ config }: I_EchoPay) {

  const dispatch = useDispatch();
  const echoPayState = useEchopay();
  const { initted } = echoPayState;
  const eConfig = config.cartridges?.echopay || {};
  if (!eConfig.enabled) return null;

  React.useEffect(() => {
    if (!initted) {
      dispatch(setEchoPay('initted', true));
    }
  }, [dispatch, initted]);

  return (
    <Flash id="movie_name">
      <MovieClip id="mc_1">
        EchoPay
      </MovieClip>
    </Flash>
  );
}




/*

const handleRestart = () => {
  window.open('/', '_self');
}

<Button
  startIcon={<Icon icon="reset" />}
  color="primary"
  onClick={handleRestart}
>
  Restart
</Button>

<pre>
  {JSON.stringify(echoPayState, null, 2)}
</pre>

*/