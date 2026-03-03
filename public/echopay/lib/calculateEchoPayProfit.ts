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
const testValues = {
    biz: 74.6,
    cto: 8905000,
    atv: 476,
};

export interface I_EchoPayProfit {
    cto?: number;
    atv?: number;
    biz?: number;
};

const calculateEchoPayProfit = (props: I_EchoPayProfit) => {
    const {
        cto = testValues.cto,
        atv = testValues.atv,
        biz = testValues.biz,
    } = props || {};

    /*
    The costs would be for consumer debit .35 and consumer credit .45
    For business debit 1.5 and business credit 1.85
    */

    // Calculate number of transactions per month
    const transactions = cto / atv;
    // Split by business and consumer cards
    const bizTransactions = transactions * (biz / 100);
    const consumerTransactions = transactions * (1 - biz / 100);
    // Typical rates
    const bizRate = 1.5; // £0.7 per business card transaction                  
    const consumerRate = 0.6; // £0.6 per consumer card transaction
    // Calculate costs
    const currentCostPerMonth = Math.round((bizTransactions * bizRate) + (consumerTransactions * consumerRate));
    const echoPayCostPerMonth = Math.round(transactions * 0.5);
    const yearlyProfit = (currentCostPerMonth - echoPayCostPerMonth) * 12;
    return {
        currentCostPerMonth,
        echoPayCostPerMonth,
        yearlyProfit
    };
};

export default calculateEchoPayProfit;