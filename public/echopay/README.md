# Echopay NX

Gamify getting paid

## Dev password

```sh
cY?2LkhiDlCWVIb1#4tM
```

```typescript
"commerce": {
    "enabled": true,
    "ads": [
        {
            "title": "Start Again",
            "type": "link",
            "url": "/",
            "icon": "reset"
        },
        {
            "title": "echopay.co.uk",
            "type": "link",
            "url": "https://echopay.co.uk",
            "icon": "link"
        },
        {
            "title": "Merchant Dashboard",
            "type": "link",
            "url": "https://dev-dashboard.a2apay.co.uk",
            "icon": "dashboard"
        }
    ]
},
```

## Do the maths

```typescript

    return `If **${name}** has a monthly card turnover of **${ctoDisplay}** with an 
        average transaction value of **${atvDisplay}**. 
        The ratio of those transactions being business versus consumer cards is **${bizDisplay}**. They 
        have a card acquisiion cost of ${currentCostPerMonthDisplay} per month. With **EchoPay** that drops 
        to **${echoPayCostPerMonthDisplay}**. Simply plugging EchoPay in creates extra profit 
        of **${yearlyProfitDisplay}** per year`;
```

Assuming a 
    const bizRate = 0.7; // £0.7 per business card transaction                  
    const consumerRate = 0.6; // £0.6 per consumer card transaction


> More Docs and resources for the Echopay project

## Auth

If a password is needed, try this `cY?2LkhiDlCWVIb1#4tM`


## Colours 

Primary `#012867`
Secondary `#12418C`


## Markdown 

- **markdown/**: Main documentation folder, organized by topic and platform.
  - `example.md`, `free-ipad.md`, `index.md`: General documentation and examples.
  - **api/**: API documentation and guides.
    - `index.md`: API overview.
    - **connecting/**: Guides for connecting to the API using different tools.
      - `curl.md`: Using cURL.
      - `php.md`: Using PHP.
      - `postman.md`: Using Postman.
      - `index.md`: Connecting overview.
  - **magento/**: Documentation for Magento integration and usage.
    - `admin.md`: Admin panel usage.
    - `cli.md`: Command-line interface usage.
    - `index.md`: Magento overview.
    - `modules.md`: Magento modules information.
    - `ssh.md`: SSH access and usage.

## Usage

- Browse the `markdown/` folder for guides and reference material.
- Use the `api/` and `magento/` subfolders for platform-specific documentation.
- Refer to design files for branding or UI assets.