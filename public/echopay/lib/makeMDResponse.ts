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
    const bizDisplay = biz !== undefined ? `${biz}%` : '';




    return `Here is a bunch of **markdown** ${bizDisplay}`;
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