import EchoPay from './EchoPay';
import { initPayment } from './actions/initPayment';

import Terminal from './components/Terminal';
import Controls from './components/Controls';
import PayNow from './components/PayNow';

import { setEchoPay } from './actions/setEchoPay';
import { clearTerminal } from './actions/clearTerminal';

import { addTerminalMessage } from './actions/addTerminalMessage';
import { getToken } from './actions/getToken';
import { useEchopay } from './hooks/useEchopay';

export {
    EchoPay,
    Terminal,
    Controls,
    PayNow,
    setEchoPay,
    addTerminalMessage,
    clearTerminal,
    initPayment,
    getToken,
    useEchopay,
};
