import { calculateEchoPayProfit } from '../'

const testValues = {
    biz: 74.6,
    cto: 8905000,
    atv: 476,
};

export interface I_MDResponse {
    name?: string;
    cto?: number;
    atv?: number;
    biz?: number;
};

const makeMDResponse = (props: I_MDResponse) => {
    const { name, cto, atv, biz } = props;

    const result = calculateEchoPayProfit({ cto, atv, biz });
    console.log('result', result);
    const bizDisplay = biz !== undefined ? `${biz}%` : '';

    // Format pound values
    const formatGBP = (value?: number) =>
        value !== undefined ? `£${Math.round(value).toLocaleString('en-GB')}` : '';

    const ctoDisplay = formatGBP(cto);
    const atvDisplay = formatGBP(atv);

    const currentCostPerMonthDisplay = formatGBP(result?.currentCostPerMonth || 0);
    const echoPayCostPerMonthDisplay = formatGBP(result?.echoPayCostPerMonth || 0);
    const yearlyProfitDisplay = formatGBP(result?.yearlyProfit || 0);

    return `If **${name}** has a monthly card turnover of **${ctoDisplay}** with an 
        average transaction value of **${atvDisplay}**. 
        The ratio of those transactions being business versus consumer cards is **${bizDisplay}**. They 
        have a card acquisiion cost of ${currentCostPerMonthDisplay} per month. With **EchoPay** that drops 
        to **${echoPayCostPerMonthDisplay}**. Simply plugging EchoPay in creates extra profit 
        of **${yearlyProfitDisplay}** per year`;
};

export default makeMDResponse;


/* ## calculateEchoPayProfit
   
    > Calculates the profit from switching to EchoPay 
    based on current transaction costs and volumes

    In
        cto - Card acquired turnover per month
        atv - Average transaction value
        biz - Percentage of cards which are business cards

    Out
        currentCostPerMonth - Current monthly cost of card transactions
        echoPayCostPerMonth - Monthly cost with EchoPay
        yearlyProfit - Annual profit from switching to EchoPay      

*/