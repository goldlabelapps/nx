## Echopay NX

If a password is needed, try this `cY?2LkhiDlCWVIb1#4tM` or `echopay`

```sh
cY?2LkhiDlCWVIb1#4tM
```

#### AI Prompt

```typescript
return `If **${name}** has a monthly card turnover of **${ctoDisplay}** with an 
    average transaction value of **${atvDisplay}**. 
    The ratio of those transactions being business versus consumer cards is **${bizDisplay}**. They 
    have a card acquisiion cost of ${currentCostPerMonthDisplay} per month. With **EchoPay** that drops 
    to **${echoPayCostPerMonthDisplay}**. Simply plugging EchoPay in creates extra profit 
    of **${yearlyProfitDisplay}** per year`;
```

- Browse the `markdown/` folder for guides and reference material.
- Use the `api/` and `magento/` subfolders for platform-specific documentation.
- Refer to design files for branding or UI assets.

#### Typical rates

const bizRate = 1.5; // £0.7 per business card transaction                  
const consumerRate = 0.6; // £0.6 per consumer card transaction

#### Colours 

```
"dark": {
    "mode": "dark",
    "primary": "#A5C7FF",
    "secondary": "#FFF",
    "background": "#184791",
    "paper": "#1D3B6B",
    "text": "#fff",
    "border": "#275296"
},
"light": {
    "mode": "light",
    "primary": "#012867",
    "secondary": "#12418C",
    "background": "#fff",
    "paper": "#E7EBF2",
    "text": "#000",
    "border": "#C6CAD1"
}
```
