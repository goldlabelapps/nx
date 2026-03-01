import { calculateEchoPayProfit } from '../'

export const testValues = {
    name: 'Example Company Ltd',
    biz: 79.6,
    cto: 8965000,
    atv: 646,
};

export interface I_MDResponse {
    name?: string;
    cto?: number;
    atv?: number;
    biz?: number;
};

const makeMDResponse = (props: I_MDResponse) => {

    const name = props.name ?? testValues.name;
    const cto = props.cto ?? testValues.cto;
    const atv = props.atv ?? testValues.atv;
    const biz = props.biz ?? testValues.biz;
    const result = calculateEchoPayProfit({ cto, atv, biz });
    const bizDisplay = `${biz}%`;

    const formatGBP = (value?: number) =>
        value !== undefined ? `£${Math.round(value).toLocaleString('en-GB')}` : '';

    const ctoDisplay = formatGBP(cto);
    const atvDisplay = formatGBP(atv);
    const currentCostPerMonthDisplay = formatGBP(result?.currentCostPerMonth || 0);
    const echoPayCostPerMonthDisplay = formatGBP(result?.echoPayCostPerMonth || 0);
    const yearlyProfitDisplay = formatGBP(result?.yearlyProfit || 0);

    return `Imagine **${name}** has a monthly card turnover of **${ctoDisplay}** with an 
        average transaction value of **${atvDisplay}**. 
        The ratio of business vs consumer cards is **${bizDisplay}**. 
        They have a card acquisiion cost of **${currentCostPerMonthDisplay}** per month. 
        With **EchoPay** that drops to **${echoPayCostPerMonthDisplay}**. 
        Simply plugging EchoPay in creates extra profit of **${yearlyProfitDisplay}** per year`;
};

export default makeMDResponse;
