import EchoPay from './EchoPay';
import { init } from './actions/init';

import Terminal from './components/Terminal';
import Controls from './components/Controls';
import { setEchoPay } from './actions/setEchoPay';
import { addTerminalMessage } from './actions/addTerminalMessage';
import { getToken } from './actions/getToken';
import { useEchopay } from './hooks/useEchopay';

export {
    EchoPay,
    Terminal,
    Controls,
    setEchoPay,
    addTerminalMessage,
    init,
    getToken,
    useEchopay,
};
